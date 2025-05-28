components.alarmSystem = {
  props: [],
  template: /*html*/ `
    <div class="ui col mini-1 bg-no h-xl-290 h-mini-650">
      <div class="col-content overflow">
        <ul class="ui table size-sm resp">
          <li class="thead" id="activeAlarmHeader">
            <div class="col-60 align-middle-center hidden-phone"><span>Reset</span></div>
            <div class="col-50 align-middle-center"><span>ID</span></div>
            <div class="col-170 align-middle-center hidden-phone"><span>Time (GMT)</span></div>
            <div class="col-170 align-middle-center"><span>Group</span></div>
            <div class="col-320-min align-middle-center"><span>Description</span></div>
            <div class="col-110 align-middle-center hidden-phone"><span>Acknowledged</span></div>
            <div class="col-110 align-middle-center hidden-phone"><span>Muted</span></div>
          </li>
          <li v-for="alarm in alarms" :key="alarm.alarmId">
            <div class="col-60 align-middle-center glow pad-no hidden-phone">
              <button class="ui btn sm info radius-no resp" v-on:click="resetAlarm(alarm.alarmId, alarm.Status)">Reset</button>
            </div>
            <div class="col-50 glow align-middle-center" :class="colorStatus(alarm.alarmType, alarm.alarmTriggered)"><span>{{alarm.alarmId}}</span></div>
            <div class="col-170 align-middle-center glow hidden-phone" :class="colorStatus(alarm.alarmType, alarm.alarmTriggered)"><span>{{alarm.alarmTime}}</span></div>
            <div class="col-170 glow align-middle-center" :class="colorStatus(alarm.alarmType, alarm.alarmTriggered)"><span>{{getGroupName(alarm.Group)}}</span></div>
            <div class="col-300-min align-middle-center glow" :class="colorStatus(alarm.alarmType, alarm.alarmTriggered)"><span>{{getAlarmName(alarm.alarmId)}}</span></div>
            <div class="col-110 align-middle-center dev-statusChange glow pad-no hidden-phone">
              <button :class="[colorAck(alarm.Status)]" v-on:click="statusModify(alarm.alarmId, alarm.Status, 3)" :id="'ack_' + alarm.alarmId">Acknowledge</button>
            </div>
            <div class="col-110 align-middle-center dev-statusChange glow pad-no hidden-phone">
              <button :class="[colorMute(alarm.Status)]" :style="[statusWarning(alarm)]" v-on:click="statusModify(alarm.alarmId, alarm.Status, 2)" :id="'mute_' + alarm.alarmId">Mute</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  data() {
    return {
      alarms: ActiveAlarmList,
      colors: {
        color1: "color-bg-type-danger",
        color2: "color-bg-type-danger-dark",
        color3: "color-bg-type-warning2",
        color4: "color-bg-type-warning2-dark",
      },
      statusAck: {
        statusAct: "ui btn sm primary radius-no resp active",
        statusNoAct: "ui btn sm primary radius-no resp"
      },
      statusMute: {
        statusOnMute: "ui btn sm secondary radius-no resp active",
        statusNoMute: "ui btn sm secondary radius-no resp"
      },
      warningMute: {
        warningOn: "display:none",
        warningOff: "display: unset"
      }
    };
  },
  updated() {
    clearTimeout(refreshAlarmLogTimeout);
    refreshAlarmLogTimeout = setTimeout(() => {
      alarms.updateAlarmLog();
    }, 1500 + Math.floor(Math.random() * 2000 + 100));
  },
  mounted() {
    alarms.activeAlarmShow();
  },
  methods: {
    colorStatus(type, trigger) {
      switch (`${type}-${trigger}`) {
        case '0-0': return this.colors.color2;
        case '0-1': return this.colors.color1;
        case '1-0': return this.colors.color4;
        case '1-1': return this.colors.color3;
        default: return null;
      }
    },
    colorAck(status) {
      return status == 3 ? this.statusAck.statusAct : this.statusAck.statusNoAct;
    },
    colorMute(status) {
      return (status == 2 || status == 3) ? this.statusMute.statusOnMute : this.statusMute.statusNoMute;
    },
    statusWarning(alarm) {
      return alarm.alarmType == 1 ? this.warningMute.warningOn : this.warningMute.warningOff;
    },
    getAlarmName(id) {
      if (alarmData[parseInt(id)]) return alarmData[parseInt(id)].alarmDescription;
      return parseInt(id) == 0 ? "ALL" : "NOT DEFINED IN DATABASE";
    },
    getGroupName(id) {
      return groupList[parseInt(id)] ? groupList[parseInt(id)].Name : "NOT DEFINED IN DATABASE";
    },
    statusModify(alarmId, actualStatus, targetStatus) {
      let sendRequest = true;

      if (targetStatus == 2 && (actualStatus == 2 || actualStatus == 3)) sendRequest = false;
      if (targetStatus == 3 && (actualStatus !== 2 || actualStatus == 3)) sendRequest = false;
      if (!helpers.profileCheck()) { helpers.privilegesPopUp(); sendRequest = false; }
      if (actualStatus !== 3 && targetStatus == 0) { helpers.resetPopUp(); sendRequest = false; }

      if (sendRequest) {
        const element = document.getElementById((targetStatus == 2 ? 'mute_' : 'ack_') + alarmId);
        if (element) {
          element.classList.add('active-provisional');
          setTimeout(() => element.classList.remove('active-provisional'), 2000);
        }

        const data = JSON.stringify({
          Id: parseInt(alarmId),
          Status: parseInt(targetStatus),
          Source: parseInt($('#ScreenLocationId').val())
        });

        $.ajax({
          async: true,
          crossDomain: true,
          url: `${ACTIVE_SERVER}:${API.Port}/updateAlarmStatus`,
          method: "POST",
          headers: { "content-type": "application/json" },
          processData: false,
          data: data
        }).done((response) => {
          console.log(response);
        });
      }
    },
    resetAlarm(alarmId, actualStatus) {
      let sendRequest = true;
      if (isNaN(alarmId)) sendRequest = false;
      if (!helpers.profileCheck()) { helpers.privilegesPopUp(); sendRequest = false; }
      if (actualStatus !== 3) { helpers.resetPopUp(); sendRequest = false; }

      if (sendRequest) {
        const data = JSON.stringify({
          alarmId: parseInt(alarmId),
          source: parseInt($('#ScreenLocationId').val())
        });

        $.ajax({
          async: true,
          crossDomain: true,
          url: `${ACTIVE_SERVER}:${API.Port}/resetActiveAlarm`,
          method: "POST",
          headers: { "content-type": "application/json" },
          processData: false,
          data: data
        }).done((response) => {
          console.log(response);
        });
      }
    }
  }
};
