components.valveLayout = {
  props: [
    "openSignalId",
    "closeSignalId",
    "openCommandSignalId",
    "closeCommandSignalId",
    "writeMode",
    "name",
    "x",
    "y",
    "openColor",
    "closeColor",
  ],
  template: /*html*/ `
    <div ref="valveLayoutElement">
    <button
    class="ui btn mini"
    :style="styleObject"
    v-bind="{ id: svgId }"
    @click="openPopUp"
  >
    {{ name }}
  </button>
  
      
      <div class="ui modal open size-mini" v-bind="{ id: popUpId }" :style="stylePopUp" style="display: none; width: 300px;">
        <div class="ui grid type1 cols-1 pad-no gap-no">
          <div class="ui grid cols-1 col sm-1 gap-no pad-no has-header">
            <header class="ui col" style="font-size: 18px;">
              <font style="margin-right: 30px;">{{ name }}</font>
              <span class="gradients">
                <span class="gradient-left"></span>
                <span class="gradient-right"></span>
              </span>
              <button class="ui btn sm icon primary icon-only" style="border-width: 0px;" v-on:click="closePopUp">
                <svg class="ui icon" id="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  <path d="M98.74,81.26q2.52,2.14,0,4.47l-13,13q-2.33,2.33-4.47,0L50,67.67,18.74,98.74q-2.14,2.52-4.47,0l-13-13q-2.33-2.33,0-4.47L32.33,50,1.26,18.93q-2.33-2.33,0-4.47l13-13.2q2.32-2.33,4.47,0L50,32.33,81.26,1.26c1.56-1.68,3-1.68,4.47,0l13,13q2.33,2.32,0,4.47L67.67,50Z"></path>
                </svg>
              </button>
            </header>
            
            <div class="ui col sm-1 pad-no">
                <div class="col-content modal-content" style="display: flex; justify-content: center; align-items: center;">
                  <div class="btn-group" style="display: flex; gap: 10px;">
                    <button class="ui btn sm gutter-sm colored danger" :class="[statusOpen]" v-on:click="write('open')" style="border-width: 0px;">OPEN</button>
                    <button class="ui btn sm gutter-sm colored success" :class="[statusClose]" v-on:click="write('close')" style="border-width: 0px;">CLOSE</button>
                  </div>
                </div>
            </div>
          
          </div>
        </div>
      </div>
  
      <span style="display: none;">{{ valueOpen }}</span>
      <span style="display: none;">{{ valueClose }}</span>
    </div>
    `,
  data() {
    return {
      valueOpen: null,
      valueClose: null,
      svgId:
        Math.floor(Math.random() * (1000 - 100)) +
        Date.now() +
        "_" +
        this.openSignalId,
      popUpId:
        Math.floor(Math.random() * (1000 - 100)) +
        Date.now() +
        "_" +
        this.openSignalId +
        "_popUp",
      styleObject: {
        position: "absolute",
        top: this.y + "%", // para alinearlo mejor sobre las válvulas
        left: this.x + "%",
        transform: "translate(-50%, -50%)",
      },
      stylePopUp: {
        position: "absolute",
        top: this.y + 3 + "%",
        left: this.x + "%",
        transform: "translate(-50%, 0)", 
        zIndex: 1000,
      },
      statusOpen: null,
      statusClose: null,
    };
  },

  mounted() {
    if (
      this.valueOpen == null ||
      this.valueClose == null
    ) {
      this.statusOpen = "";
      this.statusClose = "";
    }

    const updateValue = (signalId, valueProperty) => {
      if (!isNaN(this[valueProperty])) {
        this[valueProperty] = valueRaw[signalId];
      }
    };

    updateValue(this.openSignalId, "valueOpen");
    updateValue(this.closeSignalId, "valueClose");

    this.updateStatus(
      this.valueOpen,
      this.valueClose
    );
  },

  updated() {
    const updateValue = (signalId, valueProperty) => {
      if (!isNaN(this[valueProperty])) {
        this[valueProperty] = valueRaw[signalId];
      }
    };

    updateValue(this.openSignalId, "valueOpen");
    updateValue(this.closeSignalId, "valueClose");

    this.updateStatus(
      this.valueOpen,
      this.valueClose
    );
  },

  methods: {
    openPopUp() {
      let el = $("#" + this.svgId);
      let distance = $(window).width() - (el.offset().left + el.outerWidth());
      if (distance < 350) {
        $("#" + this.popUpId).css({ left: this.x - 16.3 + "%" });
      }
      $("#" + this.popUpId).show();
    },

    closePopUp() {
      $("#" + this.popUpId).hide();
    },

    write(action) {
      if (typeof this.writeMode !== "undefined") {
        let writeSignalId, valueToWrite;

        if (action == "open" && this.valueOpen == 0) {
          writeSignalId = this.openCommandSignalId;
          valueToWrite = 1;
        } else if (action == "close" && this.valueClose == 0) {
          writeSignalId = this.closeCommandSignalId;
          valueToWrite = 1;
        }

        if (writeSignalId) {
          const data = JSON.stringify({
            SignalId: parseInt(writeSignalId),
            Value: parseInt(valueToWrite),
            Mode: parseInt(this.writeMode),
          });

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
              data: data,
            };

            $.ajax(settings).done(function (response) {
              console.log(response);
            });
          } else {
            helpers.privilegesPopUp();
          }
        }
      }
    },

    updateStatus(valueOpen, valueClose) {
      $("#" + this.svgId).removeClass("blink");

      if (valueOpen == 1) {
        this.statusOpen = "active";
        this.statusClose = "";
      } else if (valueClose == 1) {
        this.statusClose = "active";
        this.statusOpen = "";
      }
    },
  },
};
