var refreshAlarmLogTimeout;
var refreshEventLogTimeout;
var alarmActiveCache = [];
var ActiveAlarmList = Vue.reactive([]);
var screen = {
    renderData: function (msg) {

    }
};

var alarms = {
  activeAlarmShow() {
    $.ajax({
      url: ACTIVE_SERVER + ":" + API.Port + "/alarms",
    }).then(function (data) {
      var json = JSON.parse(data);
      if (json.length) {
        alarms.activeAlarmRegister(json);
      }
    });
  },
  allActiveAlarms: function (status, buttonObject) {
    var activeAlarmNumber = document.getElementById("activeAlarmNumber").value;
    var button = buttonObject;
    sendRequest = true;

    if (status == 0 && !button.hasClass("innactive")) {
      //PROFILE CHECK
      if (!helpers.profileCheck()) {
        helpers.privilegesPopUp();
        sendRequest = false;
      }

      //UNNATENDED ACK CHECK
      //if (!helpers.ackCheck()) {
      //    helpers.ackPopUp();
      //    sendRequest = false;
      //}

      if (sendRequest) {
        $.ajax({
          url:
            ACTIVE_SERVER +
            ":" +
            API.Port +
            "/resetAllActiveAlarms/" +
            parseInt($("#ScreenLocationId").val()),
        }).done(function () {
          $("#activeAlarmList")
            .children("li")
            .each(function () {
              if (
                $(this).attr("data-status") == 3 &&
                $(this).attr("data-triggered") == 0
              ) {
                $(this).remove();
              }
            });
        });
      }
    }

    if (status == 2 && !button.hasClass("innactive")) {
      if (helpers.profileCheck()) {
        sendRequest = true;
      } else {
        sendRequest = false;
        helpers.privilegesPopUp();
      }

      if (sendRequest && activeAlarmNumber > 0) {
        $.ajax({
          url:
            ACTIVE_SERVER +
            ":" +
            API.Port +
            "/muteAllPushButton/" +
            parseInt($("#ScreenLocationId").val()),
        });
      } else {
        sendRequest = false;
      }
    }

    if (button.hasClass("active") && sendRequest) {
      button.removeClass("active");
      button.addClass("innactive");

      if (status == 2) {
        $(".dev-mute-button").removeClass("active");
        $(".dev-mute-button").addClass("innactive");
      }
    }

    setTimeout(function () {
      button.addClass("active");
      button.removeClass("innactive");
      $(".dev-mute-button").removeClass("innactive");
      $(".dev-mute-button").addClass("active");
    }, 1400);
  },
  statusModifyRequest: function (status, alarmId, object) {
    var sendRequest = true;

    //BLOCK MUTE IF MUTED OR ACK
    if (
      parseInt(status) == 2 &&
      ($(object).find(".btn").hasClass("active") || object.Status == 3)
    ) {
      sendRequest = false;
    }

    //BLOCK ACK IF NOT MUTED OR IS ACK
    if (
      parseInt(status) == 3 &&
      (!$("#muteAlarm_" + alarmId)
        .find(".btn")
        .hasClass("active") ||
        $(object).find(".btn").hasClass("active"))
    ) {
      sendRequest = false;
    }

    //PROFILE CHECK
    if (!helpers.profileCheck()) {
      helpers.privilegesPopUp();
      sendRequest = false;
    }

    //UNNATENDED ACK CHECK
    //if (!helpers.ackCheck() && (status == 3 || status == 2 || status == 0)) {
    //    helpers.ackPopUp();
    //    sendRequest = false;
    //}

    if ($("#activeAlarm_" + alarmId).attr("data-status") != 3 && status == 0) {
      helpers.resetPopUp();
      sendRequest = false;
    }

    if (sendRequest) {
      var data = JSON.stringify({
        Id: parseInt(alarmId),
        Status: parseInt(status),
        Source: parseInt($("#ScreenLocationId").val()),
      });

      var settings = {
        async: true,
        crossDomain: true,
        url: ACTIVE_SERVER + ":" + API.Port + "/updateAlarmStatus",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        processData: false,
        data: data,
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }
  },
  resetAlarm: function (alarmId) {
    var sendRequest = true;

    //BLOCK MUTE IF MUTED OR ACK
    if (isNaN(alarmId)) {
      sendRequest = false;
    }

    //PROFILE CHECK
    if (!helpers.profileCheck()) {
      helpers.privilegesPopUp();
      sendRequest = false;
    }

    //UNNATENDED ACK CHECK
    //if (!helpers.ackCheck()) {
    //    helpers.ackPopUp();
    //    sendRequest = false;
    //}

    if ($("#activeAlarm_" + alarmId).attr("data-status") != 3) {
      helpers.resetPopUp();
      sendRequest = false;
    }

    if (sendRequest) {
      var data = JSON.stringify({
        alarmId: parseInt(alarmId),
        source: parseInt($("#ScreenLocationId").val()),
      });

      var settings = {
        async: true,
        crossDomain: true,
        url: ACTIVE_SERVER + ":" + API.Port + "/resetActiveAlarm",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        processData: false,
        data: data,
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }
  },
  typeModifyRequest: function (type, alarmId, device) {
    var sendRequest = true;

    //PROFILE CHECK
    if (!helpers.profileCheck()) {
      helpers.privilegesPopUp();
      sendRequest = false;
    }

    if (sendRequest) {
      if (parseInt(type) == 0) {
        type = 1;
      } else {
        type = 0;
      }

      var data = JSON.stringify({
        Id: parseInt(alarmId),
        Status: parseInt(type),
        Source: parseInt($("#ScreenLocationId").val()),
      });

      var settings = {
        async: true,
        crossDomain: true,
        url: ACTIVE_SERVER + ":" + API.Port + "/updateAlarmType",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        processData: false,
        data: data,
      };

      $.ajax(settings).done(function (response) {
        $("#alarmType_" + alarmId).removeClass(typeAClass);

        if (type == 0) {
          alarms.alarmTypeAlarm(alarmId);
        } else {
          alarms.alarmTypePreAlarm(alarmId);
        }
        helpers.bringCollector(device);
      });
    }
  },
  alarmTypeAlarm: function (alarmId) {
    $("#alarmType_" + alarmId).addClass(typeAClass);
    if ($("#alarmType_" + alarmId).hasClass("warning2")) {
      $("#alarmType_" + alarmId).addClass("danger");
      $("#alarmType_" + alarmId).removeClass("warning2");
    }
    $("#alarmType_" + alarmId).html(typeIcon);
    $("#alarmType_" + alarmId)
      .parent()
      .attr("data-type", 0);
  },
  alarmTypePreAlarm: function (alarmId) {
    $("#alarmType_" + alarmId).addClass(typePreClass);
    $("#alarmType_" + alarmId).html("Pre");
    if ($("#alarmType_" + alarmId).hasClass("danger")) {
      $("#alarmType_" + alarmId).addClass("warning2");
      $("#alarmType_" + alarmId).removeClass("danger");
    }
    $("#alarmType_" + alarmId)
      .parent()
      .attr("data-type", 1);
  },
  activeAlarmSubscribe: function () {
    //ALARMS MONITORING
    sock.on("alarmsToFront", function (msg) {
      var json = JSON.parse(msg);
      alarms.activeAlarmRegister(json);
    });

    //EVENTS MONITORING
    sock.on("eventsToFront", function (msg) {
      var json = JSON.parse(msg);
      // events.printHeaderEvents(json);
      // events.updateEventsList(json);
      helpers.activeEventPulse();
    });
  },
// activeAlarmRegister(json) {
//   json.forEach(function (item) {
//     if (item.alarmId == 0) {
//       alarms.plcAlarm(item);
//     }
//
//     if (
//       typeof alarmActiveCache[parseInt(item.alarmId)] == "undefined" ||
//       alarmActiveCache[parseInt(item.alarmId)].Status != item.Status ||
//       alarmActiveCache[parseInt(item.alarmId)].alarmTriggered !=
//         item.alarmTriggered
//     ) {
//       alarmActiveCache[parseInt(item.alarmId)] = item;
//
//       if (
//         item.Status == 1 ||
//         item.Status == 0 ||
//         (parseInt(item.alarmTriggered) == 0 && parseInt(item.Status) == 2)
//       ) {
//         delete ActiveAlarmList[item.alarmId];
//       } else {
//         item.Group = parseInt(alarmData[parseInt(item.alarmId)].Group) - 1;
//
//         //NEW ACTIVE ALARM
//         if (typeof ActiveAlarmList[parseInt(item.alarmId)] == "undefined") {
//           ActiveAlarmList[item.alarmId] = item;
//           //var alarmName = alarmData[parseInt(item.alarmId)].alarmDescription;
//
//           //STATUS CHANGED
//         } else if (
//           item.Status != ActiveAlarmList[item.alarmId].Status ||
//           item.alarmTriggered != ActiveAlarmList[item.alarmId].alarmTriggered
//         ) {
//           ActiveAlarmList[item.alarmId] = item;
//         }
//       }
//       inhibits.inhibitStatusChange(item.alarmId, item.Status);
//       notifications.pupUpNotification(item);
//       inhibits.inhibitUpdateTriggered(item);
//     }
//   });
// },

activeAlarmRegister(json) {

  json.forEach((item) => {
    if (item.alarmId == 0) {
      alarms.plcAlarm(item);
      return;
    }

    const id = parseInt(item.alarmId);
    const previous = alarmActiveCache[id];
    const statusChanged =
      !previous ||
      previous.Status !== item.Status ||
      previous.alarmTriggered !== item.alarmTriggered;

    if (!statusChanged) return;

    alarmActiveCache[id] = item;

    const shouldRemove =
      item.Status == 1 ||
      item.Status == 0 ||
      (parseInt(item.alarmTriggered) == 0 && parseInt(item.Status) == 2);

    const idx = ActiveAlarmList.findIndex((a) => a.alarmId == id);

    if (shouldRemove && idx !== -1) {
      ActiveAlarmList.splice(idx, 1);
      console.log(`❌ Eliminada alarma ${id}`);
    }

    if (!shouldRemove) {
      item.Group = parseInt(alarmData[id]?.Group || 0) - 1;

      if (idx === -1) {
        ActiveAlarmList.push(item);
        console.log(`➕ Añadida nueva alarma ${id}`);
      } else {
        ActiveAlarmList.splice(idx, 1, item);
        console.log(`🔁 Actualizada alarma ${id}`);
      }

      inhibits.inhibitStatusChange(id, item.Status);
      notifications.pupUpNotification(item);
      inhibits.inhibitUpdateTriggered(item);
    }
  });

  // Ordenar al final (si hay cambios)
  ActiveAlarmList.sort((a, b) => {
    return new Date(b.alarmTime).getTime() - new Date(a.alarmTime).getTime();
  });

  console.log(
    "📋 ActiveAlarmList actualizado y ordenado por alarmTime DESC:",
    ActiveAlarmList.map((a) => a.alarmId)
  );
},


  plcAlarm(item) {
    switch (item.alarmTriggered) {
      case 1:
        $("#popUpAlarmTitle").html("ALARM PLC CONNECTION LOST");
        $("#popUpAlarmMessage").html(
          "The connection between the server and the PLC has been lost."
        );
        $("#alarmPLC").addClass("open");
        break;
      case 0:
        $("#alarmPLC").removeClass("open");
        break;
    }
  },
  refreshAlarmLog() {
    var query = {
      Section: "alarm2",
      Limit: 80,
      //Filter: 1
    };

    $.ajax({
      url: ACTIVE_SERVER + ":" + API.Port + "/systemLog",
      type: "post",
      data: JSON.stringify(query),
    }).then(function (data) {
      $("#alarmLogList").html("");
      var json = JSON.parse(data);
      json.forEach(function (item) {
        alarms.printAlarmLog(item);
      });
    });
  },
  updateAlarmLog() {
    var query = {
      Section: "alarm2",
      Limit: 20,
      //Filter: 1
    };

    $.ajax({
      url: ACTIVE_SERVER + ":" + API.Port + "/systemLog",
      type: "post",
      data: JSON.stringify(query),
    }).then(function (data) {
      $("#alarmLogListHeader").remove();
      var json = JSON.parse(data);
      json.reverse();
      json.forEach(function (item) {
        alarms.printAlarmLog(item, 1);
      });
    });
  },
  printAlarmLog(item, mode = 0) {
    if (!$("#alarmLog_" + item.Id).length) {
      let alarmDescription;
      if (typeof alarmData[parseInt(item.ObjectId)] !== "undefined") {
        alarmDescription = alarmData[parseInt(item.ObjectId)].alarmDescription;
      } else {
        alarmDescription = "NOT DEFINED IN DATABASE";
      }
      if (parseInt(item.ObjectId) == 0) {
        alarmDescription = "ALL";
      }
      let alarmOrigin;
      if (typeof locationsData[parseInt(item.Origin)] !== "undefined") {
        alarmOrigin = locationsData[parseInt(item.Origin)].Name;
      } else if (parseInt(item.Origin) == 0) {
        alarmOrigin = "BLUEWAVE SYSTEM";
      } else {
        alarmOrigin = "NOT DECLARED";
      }

      if (item.ObjectId == null) {
        item.ObjectId = item.alarmId;
      }

      var html =
        '<li id="alarmLog_' +
        item.Id +
        '">' +
        '<div class="col-80 align-middle-center hidden-phone"><span>' +
        item.Id +
        "</span></div>" +
        '<div class="col-170 align-middle-center"><span>' +
        item.Date +
        "</span></div>" +
        '<div class="col-120 align-middle-center"><span>' +
        statusData[parseInt(item.Status)] +
        "</span></div>" +
        '<div class="col-80 align-middle-center"><span>' +
        item.ObjectId +
        "</span></div>" +
        '<div class="col-270-min align-middle-center hidden-phone"><span>' +
        alarmDescription +
        "</span></div>" +
        '<div class="col-180 align-middle-center hidden-phone"><span>' +
        alarmOrigin +
        "</span></div>" +
        "</li>";

      if (mode == 0) {
        $("#alarmLogList").append(html);
      } else {
        $("#alarmLogList").prepend(html);
        $("#alarmLogList").children().last().remove();
      }
    }
  },

  crewCall(id, value, mode) {
    const data = JSON.stringify({
      SignalId: id,
      Value: value, 
      Mode: mode,
    });

    if (helpers.profileCheck()) {
      $.ajax({
        async: true,
        crossDomain: true,
        url: ACTIVE_SERVER + ":" + API.Port + "/writeRedundancyBySignalId",
        method: "POST",
        headers: { "content-type": "application/json" },
        processData: false,
        data: data,
      }).done((response) => {
        console.log("Crew Call triggered:", response);
      });
    } else {
      helpers.privilegesPopUp();
    }
  },
};

