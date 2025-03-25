$.getScript("js/tanks.js");

$("#WaterTanks_layout").load("src/ga/tanks/waterTanks.svg");
var screen = {
  renderData: function (msg) {
    var json = JSONH.parse(msg);
    json.forEach(function (item) {});
  },
};

const chartEl = document.getElementById("totalWater");
const LOCAL_STORAGE_KEY = "totalWaterData";
const MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000; // 3 días

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
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 85000,
      },
    },
  },
});

function getCurrentSum() {

  return valueEscalated[154].value + valueEscalated[155].value + valueEscalated[156].value;
}

function saveDataToLocalStorage(newDataPoint) {
  let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

  // Agregar nuevo punto
  data.push(newDataPoint);

  // Filtrar puntos viejos (> 3 días)
  const now = Date.now();
  data = data.filter(item => now - item.timestamp < MAX_AGE_MS);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

function loadDataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  totalWaterChart.data.datasets[0].data = data.map(item => ({
    x: new Date(item.timestamp),
    y: item.value,
  }));
  totalWaterChart.update();
}

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

// Inicializar el gráfico con datos guardados
loadDataFromLocalStorage();

// Añadir nuevo punto cada 30 minutos
setInterval(addCurrentDataPoint, 30 * 60 * 1000);
