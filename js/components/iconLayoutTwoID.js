components.iconLayoutTwoID = {
  props: ['signalId', 'signalIdTwo', 'x', 'y', 'oneColor', 'zeroColor', 'transitionColor', 'size', 'icon'],

  template: /*html*/`
    <div :id="'valve-wrapper-' + signalId" class="valve-wrapper" :style="styleWrapper">
      <i class="ui" :class="['icon-size-' + size, iconColor]" :style="styleIcon" :id="svgId"></i>
      <span style="display: none;">{{value}}</span> 
      <span style="display: none;">{{value2}}</span> 
    </div>
  `,

  data() {
    return {
      value: valueRaw[this.signalId],
      value2: valueRaw[this.signalIdTwo],
      svgId: Date.now() + '_svg_' + this.signalId,
      iconColor: 'color-fill-type-dark',
      styleWrapper: {
        position: 'absolute',
        top: this.y + '%',
        left: this.x + '%',
        transition: 'box-shadow 0.4s ease',
      },
      styleIcon: {
        position: 'relative',
        zIndex: 2,
      }
    };
  },

  mounted() {
    this.evaluateState();
    const svgContent = iconRegistry[this.icon];
    $("#" + this.svgId).html(svgContent);
  },

  updated() {
    this.evaluateState();
  },

  methods: {
    evaluateState() {
      this.value = valueRaw[this.signalId];
      this.value2 = valueRaw[this.signalIdTwo];

      if (this.value == 1 && this.value2 == 0) {
        this.iconColor = 'glow color-fill-type-' + this.oneColor;
      } else if (this.value == 0 && this.value2 == 1) {
        this.iconColor = 'glow color-fill-type-' + this.zeroColor;
      } else if ((this.value == 0 && this.value2 == 0) || (this.value == 1 && this.value2 == 1)) {
        this.iconColor = 'glow color-fill-type-' + this.transitionColor + ' blinking-element';
      } else {
        this.iconColor = 'color-fill-type-dark';
      }
    }
  }
};
