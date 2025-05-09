$.getScript("js/tanks.js");

$("#WaterTanks_layout").load("src/ga/tanks/waterTanks.svg");
var screen = {
  renderData: function (msg) {
    var json = JSONH.parse(msg);
    json.forEach(function (item) {});
  },
};

var WaterTotalRender = true;
var WaterTotalRenderDiv = document.getElementById("totalWater");

if (!isNaN(parseInt(WaterTotalRenderDiv.getAttribute("width")))) {
  var WaterTotalRender = false;
}
var WaterInterval;

if (WaterTotalRender == true) {
  const dataWater = {
    datasets: [
      {
        label: "Total Water",
        pointRadius: 0,
        borderWidth: 1.3,
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        borderColor: "rgba(52, 152, 219, 1)",
        fill: true,
        data: [],
      },
    ],
  };

  const totalWater = new Chart(WaterTotalRenderDiv, {
    type: "line",
    data: dataWater,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      animation: {
        duration: 0,
      },
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
            major: {
              enabled: true,
            },
            maxTicksLimit: 8,
          },
        },
        y: {
          display: true,
          beginAtZero: true,
          min: 0,
          max: 7224,
        },
      },
    },
  });

  getTimelineData(totalWater, "-2d", "20m");
  WaterInterval = setInterval(
    () => getTimelineData(totalWater, "-2d", "20m"),
    300000
  );

  document.getElementById("btn1WaterTanks").addEventListener("click", function () {
      clearInterval(WaterInterval);
      updateButtonClass(this);
      getTimelineData(totalWater, "-12h", "5m");
      WaterInterval = setInterval(
        () => getTimelineData(totalWater, "-12h", "5m"),
        300000
      );
    });

  document.getElementById("btn2WaterTanks").addEventListener("click", function () {
      clearInterval(WaterInterval);
      updateButtonClass(this);
      getTimelineData(totalWater, "-24h", "10m");
      WaterInterval = setInterval(
        () => getTimelineData(totalWater, "-24h", "10m"),
        300000
      );
    });

  document.getElementById("btn3WaterTanks").addEventListener("click", function () {
      clearInterval(WaterInterval);
      updateButtonClass(this);
      getTimelineData(totalWater, "-2d", "20m");
      WaterInterval = setInterval(
        () => getTimelineData(totalWater, "-2d", "20m"),
        300000
      );
    });

  document.getElementById("btn4WaterTanks").addEventListener("click", function () {
      clearInterval(WaterInterval);
      updateButtonClass(this);
      getTimelineData(totalWater, "-3d", "30m");
      WaterInterval = setInterval(
        () => getTimelineData(totalWater, "-3d", "30m"),
        600000
      );
    });

  function updateButtonClass(clickedButton) {
    const isActive = clickedButton.classList.contains("active");
    if (isActive) {
      clickedButton.disabled = true;
      return;
    }
    document.querySelectorAll(".timeLineButtonWaterTanks").forEach(function (button) {
        button.classList.remove("active");
        button.disabled = false;
      });
    clickedButton.classList.add("active");
  }

  function getTimelineData(chart, time, rate) {
    var data = JSON.stringify({
      SignalId: [442, 441, 300, 299],
      Time: time,
      Rate: rate,
    });
    var settings = {
      async: true,
      crossDomain: true,
      url: ACTIVE_SERVER + ":" + API.Port + "/totalsBySignalId",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      processData: false,
      data: data,
    };

    $.ajax(settings)
      .done((response) => {
        chart.data.datasets.forEach((dataset) => {
          dataset.data = [];
        });

        if (response.length == 0) {
          drawNoData(chart);
        } else {
          response.forEach(function (entry) {
            var isoDate = entry.Name;
            var date = new Date(isoDate);
            var oldData = { x: date, y: Math.floor(entry.Value) };
            chart.data.datasets.forEach((dataset) => {
              dataset.data.push(oldData);
            });
          });
          chart.update("quiet");
        }
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        drawNoData(chart);
        console.error("Request failed: " + textStatus + ", " + errorThrown);
        console.log("Response status: " + jqXHR.status);
        console.log("Response text: " + jqXHR.responseText);
      });
  }

  function drawNoData(chart) {
    setTimeout(() => {
      const ctx = chart.ctx;
      const htmlElement = document.getElementById('schemeSelector');
      const scheme = htmlElement.getAttribute('data-scheme');
  
      if (scheme == 'scheme1') {
        ctx.fillStyle = "rgb(255, 255, 255)";
      } else if (scheme == 'scheme2') {
        ctx.fillStyle = "rgb(0, 0, 0)";
      }
  
      ctx.clearRect(0, 0, chart.width, chart.height);
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "25px Lato, sans-serif";
      ctx.fillText("NO DATA", chart.width / 2, chart.height / 2);
      ctx.restore();
    }, 100);
  }
}

