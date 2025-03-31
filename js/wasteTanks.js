$.getScript("js/tanks.js");

$("#WasteTanks_layout").load("src/ga/tanks/wasteTanks.svg", function () {
  initWasteChart(); // Ejecutar solo una vez
});

var screen = {
  renderData: function (msg) {}
};

function initWasteChart() {
  // Evita reinicialización
  if (window.wasteChartInitialized) return;
  window.wasteChartInitialized = true;

  const chartElWaste = document.getElementById("totalWaste");
  const LOCAL_STORAGE_KEY_WASTE = "totalWasteData";
  const MAX_AGE_MS_WASTE = 3 * 24 * 60 * 60 * 1000; // 3 días

  if (!chartElWaste || isNaN(parseInt(chartElWaste.getAttribute("width")))) return;

  const totalWasteChart = new Chart(chartElWaste, {
    type: "line",
    data: {
      datasets: [{
        label: "Total Waste",
        pointRadius: 0,
        borderWidth: 1.3,
        backgroundColor: "rgba(167, 176, 177, 0.5)",
        borderColor: "rgba(167, 176, 177, 1)",
        fill: true,
        data: [],
      }],
    },
    options: {
      plugins: {
        legend: { display: false },
      },
      animation: { duration: 0 },
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "hour",
            stepSize: 1,
            tooltipFormat: "HH:mm",
            displayFormats: {
              second: "HH:mm:ss",
              minute: "HH:mm",
              hour: "HH:mm",
            },
          },
          ticks: {
            major: { enabled: true },
            maxTicksLimit: 8,
          },
          min: Date.now() - MAX_AGE_MS_WASTE,
          max: Date.now(),
        },
        y: {
          display: true,
          beginAtZero: true,
          min: parseInt(signalsData[453]?.SignalMin || "0") + parseInt(signalsData[454]?.SignalMin || "0"),
          max: 85000,
        },
      },
    },
  });

  // === SUMA DE SEÑALES DE RESIDUOS ===
  function getCurrentWasteSum() {
    return (
      (valueEscalated[453]?.value || 0) +
      (valueEscalated[454]?.value || 0)
    );
  }

  // === GUARDAR EN LOCALSTORAGE ===
  function saveWasteDataToLocalStorage(newDataPoint) {
    let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_WASTE)) || [];
    data.push(newDataPoint);
    const now = Date.now();
    data = data.filter(item => now - item.timestamp < MAX_AGE_MS_WASTE);
    localStorage.setItem(LOCAL_STORAGE_KEY_WASTE, JSON.stringify(data));
  }

  // === CARGAR DESDE LOCALSTORAGE ===
  function loadWasteDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_WASTE)) || [];
    totalWasteChart.data.datasets[0].data = data.map(item => ({
      x: new Date(item.timestamp),
      y: item.value,
    }));
    const now = Date.now();
    totalWasteChart.options.scales.x.min = now - MAX_AGE_MS_WASTE;
    totalWasteChart.options.scales.x.max = now;
    totalWasteChart.update();
  }

  // === AÑADIR NUEVO PUNTO DE DATOS ===
  function addCurrentWasteDataPoint() {
    const sum = getCurrentWasteSum();
    const now = Date.now();
    const newPoint = {
      timestamp: now,
      value: Math.floor(sum),
    };
    saveWasteDataToLocalStorage(newPoint);
    loadWasteDataFromLocalStorage();
  }

  // === INICIALIZACIÓN ===
  loadWasteDataFromLocalStorage();
  setInterval(addCurrentWasteDataPoint, 30 * 60 * 1000); // Cada 30 minutos
}
