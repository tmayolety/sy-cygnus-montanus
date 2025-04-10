components.listValveControls = {
    props: [
      'feedbackOpenSignalId', 'feedbackCloseSignalId',
      'commandOpenSignalId', 'commandCloseSignalId',
      'title', 'zeroText', 'oneText', 'zeroColor', 'oneColor', 'transitionText',
      'writeMode'
    ],
    template: /*html*/ `
      <li>
        <div class="col-200">
          <div class="ui col" style="text-align: left;">
            <span>{{ title }}</span>
          </div>
        </div>
  
        <div class="col-90 align-middle-center" :class="[valueTextColor]">
          <span class="font-bold glow" :class="[valueCellColor]">{{ valueText }}</span>
        </div>
  
        <div class="col align-middle-center">
          <button class="ui btn sm " @click="write('open')">OPEN</button>
        </div>
        <div class="col align-middle-center">
          <button class="ui btn sm " @click="write('close')">CLOSE</button>
        </div>
        <div class="col align-middle-center">
          <button class="ui btn sm " @click="locationAction">FIND</button>
        </div>
  
        <span style="display: none;">{{ valueOpen }}</span>
        <span style="display: none;">{{ valueClose }}</span>
      </li>
    `,
  
    data() {
      return {
        valueOpen: valueRaw[this.feedbackOpenSignalId],
        valueClose: valueRaw[this.feedbackCloseSignalId],
        valueText: 'N/A',
        valueTextColor: null,
        valueCellColor: null,
      };
    },
  
    mounted() {
      this.evaluateState();
    },
  
    updated() {
      this.evaluateState();
    },
  
    methods: {
      evaluateState() {
        const value = this.valueOpen;
        const value2 = this.valueClose;
  
        if (value == 1 && value2 == 0) {
          this.valueText = this.oneText;
          this.valueTextColor = 'color-text-type-' + this.oneColor;
          this.valueCellColor = '';
        } else if (value == 0 && value2 == 1) {
          this.valueText = this.zeroText;
          this.valueTextColor = 'color-text-type-' + this.zeroColor;
          this.valueCellColor = '';
        } else if ((value == 0 && value2 == 0) || (value == 1 && value2 == 1)) {
          this.valueText = this.transitionText;
          this.valueTextColor = 'color-text-type-' + this.zeroColor;
          this.valueCellColor = 'blinking-element';
        } else {
          this.valueText = 'N/A';
          this.valueTextColor = null;
          this.valueCellColor = null;
        }
      },
  
      write(action) {
        console.log(`Boton pulsado: ${action.toUpperCase()}`);
  
        let writeSignalId = null;
        let valueToWrite = 1;
  
        if (action == "open" && this.valueOpen == 0) {
          writeSignalId = this.commandOpenSignalId;
        } else if (action == "close" && this.valueClose == 0) {
          writeSignalId = this.commandCloseSignalId;
        }
  
        if (writeSignalId) {
          const payload = {
            SignalId: parseInt(writeSignalId),
            Value: valueToWrite,
            Mode: parseInt(this.writeMode),
          };
  
          console.log("Intentando enviar comando:", payload);
  
          if (helpers.profileCheck()) {
            const settings = {
              async: true,
              crossDomain: true,
              url: ACTIVE_SERVER + ":" + API.Port + "/writeBySignalId",
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              processData: false,
              data: JSON.stringify(payload),
            };
  
            $.ajax(settings).done(function (response) {
              console.log("Respuesta del servidor:", response);
            });
          } else {
            console.log("Privilegios insuficientes para escribir.");
            helpers.privilegesPopUp();
          }
        } else {
          console.log("Condiciones no válidas para enviar comando. writeSignalId:", writeSignalId);
        }
      },
  
      locationAction() {
        const wrapperId = 'valve-wrapper-' + this.feedbackOpenSignalId;
        const el = document.getElementById(wrapperId);
        if (el) {
          el.classList.add('highlight-valve');
          setTimeout(() => {
            el.classList.remove('highlight-valve');
          }, 2000);
        } else {
          console.warn("No se encontró el icono con ID:", wrapperId);
        }
      },
    }
  };
  