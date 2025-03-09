components.multiTextState = {
    inheritAttrs: false,
    props: [
        'signalId',
        'valueStyle',
        'valueAlign',
        'colStyle',
        'backgroundFlag',
        'zeroText',
        'oneText',
        'twoText',
        'threeText',
    ],
    template: /*html*/`
        <div class="ui col reset-w-align" :class="[colStyle]" ref="basicTextTitleDigitalElement">
            <div class="ui col-content w-resp">
                <div :class="[valueStyle, 'color-text-type-white']">{{ valueText }}</div>
                <span style="display: none;">{{ value }}</span>
            </div>
        </div>`,
    data() {
        return {
            value: valueRaw[this.signalId],
            valueText: null
        };
    },
    updated() {
        if (!isNaN(this.value)) {
            this.value = valueRaw[this.signalId];
            this.evaluate(this.value);
        }
    },
    mounted() {
        this.evaluate(this.value);
    
    },
    methods: {
        evaluate(value) {
            switch (value) {
                case 0:
                    this.valueText = this.zeroText;
                    break;
                case 1:
                    this.valueText = this.oneText;
                    break;
                case 2:
                    this.valueText = this.twoText;
                    break;
                case 3:
                    this.valueText = this.threeText;
                    break;
                default:
                    this.valueText = 'N/A';
            }
        }
    }
};
