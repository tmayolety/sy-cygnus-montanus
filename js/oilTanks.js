$.getScript("js/tanks.js");

$("#OilTanks_layout").load("src/ga/tanks/tanks.svg", function () {
  initOilChart(); // Se ejecuta solo una vez
});

var screen = {
  renderData: function (msg) {
    var json = JSONH.parse(msg);
    json.forEach(function (item) {});
  },
};

function initOilChart() {
  // Evita reinicialización si ya fue cargado
  if (window.oilChartInitialized) return;
  window.oilChartInitialized = true;

  // === CONFIGURACIÓN ===
  const chartElOil = document.getElementById("totalOil");
  const LOCAL_STORAGE_KEY_OIL = "totalOilData";
  const MAX_AGE_MS_OIL = 3 * 24 * 60 * 60 * 1000; // 3 días

  // === CREAR GRÁFICO DE ACEITE ===
  const totalOilChart = new Chart(chartElOil, {
    type: "line",
    data: {
      datasets: [{
        label: "Total Oil",
        pointRadius: 0,
        borderWidth: 1.3,
        backgroundColor: "rgba(235,208,132,0.5)",
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
          time: { unit: "hour", tooltipFormat: "HH:mm" },
          ticks: { maxTicksLimit: 8 },
          min: Date.now() - MAX_AGE_MS_OIL,
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

  // === FUNCIÓN PARA OBTENER TOTAL DE ACEITE ===
  function getCurrentOilSum() {
    return (
      (valueEscalated[453]?.value || 0) +
      (valueEscalated[454]?.value || 0)
    );
  }

  // === GUARDAR EN LOCALSTORAGE ===
  function saveOilDataToLocalStorage(newDataPoint) {
    let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_OIL)) || [];
    data.push(newDataPoint);
    const now = Date.now();
    data = data.filter(item => now - item.timestamp < MAX_AGE_MS_OIL);
    localStorage.setItem(LOCAL_STORAGE_KEY_OIL, JSON.stringify(data));
  }

  // === CARGAR DESDE LOCALSTORAGE ===
  function loadOilDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_OIL)) || [];
    totalOilChart.data.datasets[0].data = data.map(item => ({
      x: new Date(item.timestamp),
      y: item.value,
    }));
    const now = Date.now();
    totalOilChart.options.scales.x.min = now - MAX_AGE_MS_OIL;
    totalOilChart.options.scales.x.max = now;
    totalOilChart.update();
  }

  // === AÑADIR NUEVO PUNTO DE DATOS ===
  function addCurrentOilDataPoint() {
    const sum = getCurrentOilSum();
    const now = Date.now();
    const newPoint = {
      timestamp: now,
      value: Math.floor(sum),
    };
    saveOilDataToLocalStorage(newPoint);
    loadOilDataFromLocalStorage();
  }

  // === INICIALIZACIÓN ===
  loadOilDataFromLocalStorage();
  setInterval(addCurrentOilDataPoint, 1 * 60 * 100); // Cada 30 minutos
}
