components.multiTextAndId = {
  inheritAttrs: false,
  props: [
    "signalIdOptionOne",
    "signalIdOptionTwo",
    "signalIdOptionThree",
    "signalIdOptionFour",
    "valueStyle",
    "valueAlign",
    "colStyle",
    "backgroundFlag",
    "oneText",
    "twoText",
    "threeText",
    "fourText",
  ],
  template: /*html*/ `
    <div class="ui col reset-w-align" :class="[colStyle]">
      <div class="ui col-content w-resp">
        <div :class="[valueStyle, 'color-text-type-white']">{{ valueText }}</div>

        <span style="display: none;">{{ valueOne }}</span>
        <span style="display: none;">{{ valueTwo }}</span>
        <span style="display: none;">{{ valueThree }}</span>
        <span style="display: none;">{{ valueFour }}</span>
      </div>
    </div>
  `,
  data() {
    return {
      valueOne: valueRaw[this.signalIdOptionOne],
      valueTwo: valueRaw[this.signalIdOptionTwo],
      valueThree: valueRaw[this.signalIdOptionThree],
      valueFour: valueRaw[this.signalIdOptionFour],
      valueText: null,
    };
  },
  mounted() {
    this.evaluate();
  },
  updated() {
    this.valueOne = valueRaw[this.signalIdOptionOne];
    this.valueTwo = valueRaw[this.signalIdOptionTwo];
    this.valueThree = valueRaw[this.signalIdOptionThree];
    this.valueFour = valueRaw[this.signalIdOptionFour];
    this.evaluate();
  },
  methods: {
    evaluate() {
      const mapping = [
        { id: this.signalIdOptionOne, text: this.oneText },
        { id: this.signalIdOptionTwo, text: this.twoText },
        { id: this.signalIdOptionThree, text: this.threeText },
        { id: this.signalIdOptionFour, text: this.fourText },
      ];

      const found = mapping.find((entry) => valueRaw[entry.id] == 1);
      this.valueText = found ? found.text : "N/A";
    },
  },
};
