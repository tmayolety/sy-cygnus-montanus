$.getScript("js/tanks.js");

$("#OilTanks_layout").load("src/ga/tanks/oilTanks.svg");

//var totalOilId, WasteTotal
var screen = {
    renderData: function (msg) {
    }
};

var WasteTotalRender = true;
var WasteTotalRenderDiv = document.getElementById('totalOil')

if (!isNaN(parseInt(WasteTotalRenderDiv.getAttribute('width')))){
  var WasteTotalRender = false;
}

var WasteInterval

if (WasteTotalRender == true) {

    const dataWaste = {
          datasets: [
              {
                  label: 'Total Clean Lub Oil',
                  pointRadius: 0,
                  borderWidth: 1.3,
                  backgroundColor: "rgba(235,208,132,0.5)",
                  borderColor: "rgba(235,208,132,1)",
                  fill: true,
                  data: []
              }
          ]
    };
  
    const totalOil = new Chart(WasteTotalRenderDiv, {
          type: 'line',
          data: dataWaste,
          options: {
            plugins: {
                legend: {
                  display: false
                }
              },
            animation:{
                duration:0
            },
              maintainAspectRatio : false,
              scales: {
                  x: {
                    type: "time",
                    time: {
                        unit: 'hour',
                        stepSize: 1, 
                        tooltipFormat: 'HH:mm',
                        displayFormats: {
                            second: 'HH:mm:ss',
                            minute: 'HH:mm',
                            hour: 'HH:mm'
                        }
                    },
                    ticks: {
                        major: {
                           enabled: true,
                        },
                        maxTicksLimit: 8
                    }
                  },
                  y: {
                      display: true,
                      beginAtZero: true,
                      min: 0,
                      max: 2800
                  }
              }
          }
         
    });

    getTimelineData(totalOil, "-2d", "20m");
    WasteInterval = setInterval(()=> getTimelineData(totalOil, "-2d", "20m"), 300000)
     
    document.getElementById('btn1OilTanks').addEventListener('click', function () {
        clearInterval(WasteInterval)
        updateButtonClass(this);
        getTimelineData(totalOil, "-12h", "5m");
        WasteInterval = setInterval(()=> getTimelineData(totalOil, "-12h", "5m"), 300000)
    });

    document.getElementById('btn2OilTanks').addEventListener('click', function () {
        clearInterval(WasteInterval)
        updateButtonClass(this);
        getTimelineData(totalOil, "-24h", "10m");
        WasteInterval = setInterval(()=> getTimelineData(totalOil, "-24h", "10m"), 300000)
    });

    document.getElementById('btn3OilTanks').addEventListener('click', function () {
        clearInterval(WasteInterval)
        updateButtonClass(this);
        getTimelineData(totalOil, "-2d", "20m");
        WasteInterval = setInterval(()=> getTimelineData(totalOil, "-2d", "20m"), 300000)
    });

    document.getElementById('btn4OilTanks').addEventListener('click', function () {
        clearInterval(WasteInterval)
        updateButtonClass(this);
        getTimelineData(totalOil, "-3d", "30m");
        WasteInterval = setInterval(()=> getTimelineData(totalOil, "-3d", "30m"), 600000)
    });

    function updateButtonClass(clickedButton) {

          const isActive = clickedButton.classList.contains('active');
          if (isActive) {
              clickedButton.disabled = true;
              return;
          }
          document.querySelectorAll('.timeLineButtonOilTanks').forEach(function (button) {
              button.classList.remove('active');
              button.disabled = false;
          });
          clickedButton.classList.add('active');
      
    }

    function getTimelineData(chart, time, rate) {
            
        var data = JSON.stringify({
            "SignalId": [297],
            "Time": time,
            "Rate": rate
        });
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": ACTIVE_SERVER + ":" + API.Port +"/totalsBySignalId",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
            },
            "processData": false,
            "data": data
        }
        
        $.ajax(settings).done((response) => {
                chart.data.datasets.forEach((dataset) => {
                    dataset.data = [];
                });
               if(response.length === 0){
                drawNoData(chart);
               }else{
                response.forEach(function(entry, index) {
                    var isoDate = entry.Name;
                    var date = new Date(isoDate);
                    
                    var oldData = { x: date, y: Math.floor(entry.Value) };

                    chart.data.datasets.forEach((dataset) => {
                        dataset.data.push(oldData);
                    });
                });
              
                chart.update('quiet');
               }

        }).fail((jqXHR, textStatus, errorThrown)=>{
            drawNoData(chart);
            console.error("Request failed: " + textStatus + ", " + errorThrown);
            console.log("Response status: " + jqXHR.status);
            console.log("Response text: " + jqXHR.responseText);
        })
    }

    function drawNoData(chart) {
        setTimeout(() => {
          const ctx = chart.ctx;
          const htmlElement = document.getElementById('schemeSelector');
          const scheme = htmlElement.getAttribute('data-scheme');
      
          if (scheme === 'scheme1') {
            ctx.fillStyle = "rgb(255, 255, 255)";
          } else if (scheme === 'scheme2') {
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