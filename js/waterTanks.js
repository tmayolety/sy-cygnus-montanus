$.getScript("js/tanks.js");

$("#WaterTanks_layout").load("src/ga/tanks/waterTanks.svg", function () {
  initWaterChart(); // Se llama solo una vez al cargar el layout
});

var screen = {
  renderData: function (msg) {
    var json = JSONH.parse(msg);
    json.forEach(function (item) {});
  },
};

function initWaterChart() {
  // Evitar doble ejecución
  if (window.waterChartInitialized) return;
  window.waterChartInitialized = true;

  // === CONFIGURACIÓN GENERAL ===
  const chartEl = document.getElementById("totalWater");
  const LOCAL_STORAGE_KEY = "totalWaterData";
  const MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000; // 3 días

  // === CREACIÓN DEL GRÁFICO ===
  const totalWaterChart = new Chart(chartEl, {
    type: "line",
    data: {
      datasets: [{
        label: "Total Water",
        pointRadius: 0,
        borderWidth: 1.3,
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        borderColor: "rgba(52, 152, 219, 1)",
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
          time: { unit: "hour", tooltipFormat: "HH:mm" },
          ticks: { maxTicksLimit: 8 },
          min: Date.now() - MAX_AGE_MS,
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

  // === SUMA DE SEÑALES DE AGUA ===
  function getCurrentSum() {
    return (
      (valueEscalated[154]?.value || 0) +
      (valueEscalated[155]?.value || 0) +
      (valueEscalated[156]?.value || 0)
    );
  }

  // === GUARDAR EN LOCALSTORAGE ===
  function saveDataToLocalStorage(newDataPoint) {
    let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    data.push(newDataPoint);
    const now = Date.now();
    data = data.filter(item => now - item.timestamp < MAX_AGE_MS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  // === CARGAR DESDE LOCALSTORAGE ===
  function loadDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    totalWaterChart.data.datasets[0].data = data.map(item => ({
      x: new Date(item.timestamp),
      y: item.value,
    }));
    const now = Date.now();
    totalWaterChart.options.scales.x.min = now - MAX_AGE_MS;
    totalWaterChart.options.scales.x.max = now;
    totalWaterChart.update();
  }

  // === AÑADIR NUEVO PUNTO DE DATOS ===
  function addCurrentDataPoint() {
    const sum = getCurrentSum();
    const now = Date.now();
    const newPoint = {
      timestamp: now,
      value: Math.floor(sum),
    };
    saveDataToLocalStorage(newPoint);
    loadDataFromLocalStorage();
  }

  // === INICIALIZACIÓN ===
  loadDataFromLocalStorage();
  setInterval(addCurrentDataPoint, 30 * 60 * 1000); // Cada 30 minutos
}
