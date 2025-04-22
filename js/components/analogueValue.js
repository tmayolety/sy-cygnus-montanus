components.analogueValue = {
    props: ['signalId', 'valueMode', 'valueDecimals', 'x', 'y', 'buttonSize'],
    template:/*html*/`
              
                <button class="ui btn colored" :class= '[buttonSize, valueCellColor]' :style="styleObject"><span>{{valueToShow}}</span></button>
            
                <span style="display: none;">{{value}}</span>
                <span style="display: none;">{{LL}}</span>
                <span style="display: none;">{{L}}</span>
                <span style="display: none;">{{HH}}</span>
                <span style="display: none;">{{H}}</span>`,
    data() {
        return {
            value: null,
            valueToShow: null,
            valueCellColor: null,
            LL: null,
            L: null,
            H: null,
            HH: null,
            hasLimits: true,
        }
    },
    computed: {
        styleObject() {
            if (this.x != null && this.y != null) {
                return {
                    position: 'absolute',
                    top: this.y + '%',
                    left: this.x + '%'
                };
            }
            return {
                position: 'relative'
            };
        }
    },
    updated()
    {
      if (!isNaN(this.value)) {
          this.valueToShow = parseFloat(this.value).toFixed(this.decimals)
      }


      let result = {};
      result.HH = false;
      result.H = false;
      result.L = false;
      result.LL = false;

      if ( parseFloat(this.value) >=  parseFloat(this.HH)) { result.HH = true; }
      if ( parseFloat(this.value) >=  parseFloat(this.H) &&  ( (parseFloat(this.value) <  parseFloat(this.HH) || this.HH == null)) ) { result.H = true; }
      if ( parseFloat(this.value) <=  parseFloat(this.L) &&  ( (parseFloat(this.value) >  parseFloat(this.LL)) || this.LL == null) ) { result.L = true; }
      if ( parseFloat(this.value) <=  parseFloat(this.LL) ) { result.LL = true; }

      if (result.HH || result.LL ) { this.valueCellColor = 'danger'; } else
      if (result.H || result.L ) { this.valueCellColor = 'warning'; } else
      if (!result.H || !result.L || !result.HH || !result.LL) { this.valueCellColor = 'primary';  }

    },
    mounted()
    {
        switch (this.valueMode) {
            case "filtered":
                this.value = valueFiltered[this.signalId];
                break;
            case "escalated":
                this.value = valueEscalated[this.signalId];
                break;
            default:
            case "raw":
                this.value = valueRaw[this.signalId];
                break;
        }
        if (this.value == null){ this.valueToShow = 'N/A' }

        

        if (typeof this.valueDecimals === 'undefined') {
            this.decimals = 0
        } else {
            this.decimals = this.valueDecimals
        }

        if (typeof limits[this.signalId] !== 'undefined') {
            if (limits[this.signalId].L.value != '-')  {  this.L = limits[this.signalId].L } else {  this.L = null;  }
            if (limits[this.signalId].LL.value != '-') {  this.LL = limits[this.signalId].LL } else {  this.LL = null;  }
            if (limits[this.signalId].H.value != '-')  {  this.H = limits[this.signalId].H } else {  this.H = null;  }
            if (limits[this.signalId].HH.value != '-') {  this.HH = limits[this.signalId].HH } else {  this.HH = null;  }
        } else { this.hasLimits = false }

        
    }
};

