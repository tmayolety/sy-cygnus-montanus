$.getScript("js/tanks.js");

$("#FuelTanks_layout").load("src/ga/tanks/fuelTanks.svg", function () {
  initFuelChart(); // Solo se ejecuta una vez
});

var screen = {
  renderData: function (msg) {
    var json = JSONH.parse(msg);
    json.forEach(function (item) {});
  },
};

function initFuelChart() {
  // Previene inicialización múltiple
  if (window.fuelChartInitialized) return;
  window.fuelChartInitialized = true;

  // === CONFIGURACIÓN GENERAL ===
  const chartElFuel = document.getElementById("totalFuel");
  const LOCAL_STORAGE_KEY_FUEL = "totalFuelData";
  const MAX_AGE_MS_FUEL = 3 * 24 * 60 * 60 * 1000; // 3 días

  // === CREACIÓN DEL GRÁFICO ===
  const totalFuelChart = new Chart(chartElFuel, {
    type: "line",
    data: {
      datasets: [{
        label: "Total Fuel",
        pointRadius: 0,
        borderWidth: 1.3,
        backgroundColor: "rgba(235,208,132,0.2)",
        borderColor: "rgba(235,208,132,1)",
        fill: true,
        data: [],
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      animation: { duration: 0 },
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "hour",
            tooltipFormat: "HH:mm",
          },
          ticks: { maxTicksLimit: 8 },
          min: Date.now() - MAX_AGE_MS_FUEL,
          max: Date.now(),
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 85000,
        },
      },
    },
  });

  // === SUMA DE SEÑALES DE COMBUSTIBLE ===
  function getCurrentFuelSum() {
    return (
      (valueEscalated[455]?.value || 0) +
      (valueEscalated[456]?.value || 0) +
      (valueEscalated[491]?.value || 0)
    );
  }

  // === GUARDAR EN LOCALSTORAGE ===
  function saveFuelDataToLocalStorage(newDataPoint) {
    let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FUEL)) || [];
    data.push(newDataPoint);
    const now = Date.now();
    data = data.filter(item => now - item.timestamp < MAX_AGE_MS_FUEL);
    localStorage.setItem(LOCAL_STORAGE_KEY_FUEL, JSON.stringify(data));
  }

  // === CARGAR DESDE LOCALSTORAGE ===
  function loadFuelDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FUEL)) || [];
    totalFuelChart.data.datasets[0].data = data.map(item => ({
      x: new Date(item.timestamp),
      y: item.value,
    }));
    const now = Date.now();
    totalFuelChart.options.scales.x.min = now - MAX_AGE_MS_FUEL;
    totalFuelChart.options.scales.x.max = now;
    totalFuelChart.update();
  }

  // === AÑADIR NUEVO PUNTO DE DATOS ===
  function addCurrentFuelDataPoint() {
    const sum = getCurrentFuelSum();
    const now = Date.now();
    const newPoint = {
      timestamp: now,
      value: Math.floor(sum),
    };
    saveFuelDataToLocalStorage(newPoint);
    loadFuelDataFromLocalStorage();
  }

  // === INICIALIZACIÓN ===
  loadFuelDataFromLocalStorage();
  setInterval(addCurrentFuelDataPoint, 30 * 60 * 1000); // Cada 30 minutos
}
