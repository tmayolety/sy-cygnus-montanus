components.iconTextValueDigitalLine = {
    props: ['signalId', 'icon', 'title', 'size', 'countingHoursSignalId', 'zeroText', 'oneText', 'zeroColor', 'oneColor', 'valueMode', 'sizeWidthTitle'],
    template: /*html*/`<li>
                <div class="col-40 align-middle-center">
                <i class="ui" :class= '[iconSize, iconColor]' :id="svgId"></i>
                </div>
                <div class="col-150-min">

                    <div class="ui col " style=" text-align: left;" :class='[sizeWidth]'>
                        <span>{{title}}</span>
                    </div>

                </div>

                <div v-if="countingHours" className="col-100 align-middle-center "><span className="font-bold">{{countingHoursValue}}</span>&nbsp;<span>h</span></div>
                <div class="col-80 align-middle-left " :class= '[valueTextColor, valueCellColor]'><span class="font-bold glow">{{valueText}}</span></div>
                
                <span style="display: none;">{{value}}</span> 
                </li>`,

    data() {
        return {
                value: valueRaw[this.signalId],
                countingHoursValue: valueRaw[this.countingHoursSignalId],
                iconSize: 'icon-size-' + this.size,
                svgId:  (Math.floor(Math.random() * (1000 - 100)))  + Date.now() + '_svg_' + this.signalId,
                valueText: 'N/A',
                iconColor: null,
                valueTextColor: null,
                countingHours: false,
                valueCellColor: null,
                sizeWidth: null,
        }
    },
    mounted(){

        this.getSize()

        if (!isNaN(this.value)) {
            this.evaluate(this.value)
        }

        const svgContent = iconRegistry[this.icon]
        $( "#"+this.svgId).html(svgContent)
        
    },
    updated(){
        
        if (!isNaN(this.value)) {
            this.evaluate(this.value)
        }

    },
    methods: {

        evaluate(value){

            if (this.countingHoursValue != null){ this.countingHours = true }
            if (value  == 1) {
                this.valueText = this.oneText;
                this.iconColor = 'color-fill-type-' + this.oneColor; this.valueTextColor = 'color-text-type-' + this.oneColor;
            } else if (value  == 0) {
                this.valueText = this.zeroText;
                this.iconColor = 'color-fill-type-'+ this.zeroColor; this.valueTextColor = 'color-text-type-'+ this.zeroColor;
            } else {
                this.valueText = 'N/A'
                this.iconColor = null
            }
        },
        getSize(){
            if(!this.sizeWidthTitle){
                this.sizeWidth = 'col-200-min';
            }else if(this.sizeWidthTitle == 'regular'){
                this.sizeWidth = 'col-200-min';
            }else if(this.sizeWidthTitle == 'small'){
                this.sizeWidth = 'col-220-min';
            }else if(this.sizeWidthTitle == 'med'){
                this.sizeWidth = 'col-240-min';
            }else if(this.sizeWidthTitle == 'large'){
                this.sizeWidth = 'col-400-min';
            }else if(this.sizeWidthTitle == 'xl'){
                this.sizeWidth = 'col-450-min';
            }
        },
       

    }
};

