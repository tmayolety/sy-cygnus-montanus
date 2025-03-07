var screen = {
    renderData: function (msg) {
    }
};


if (typeof generators34Mounted == 'undefined') {

    const generatorsApp34 = Vue.createApp({})
    generatorsApp34.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
    generatorsApp34.component('basic-text-with-title-render', components.basicTextWithTitle)
    generatorsApp34.component('icon-text-value-digital-line-render', components.iconTextValueDigitalLine)
    generatorsApp34.component('multi-gauge-render', components.multiGauge)
    generatorsApp34.component('bar-render', components.bar)
    generatorsApp34.mount('.generators34App')
    generators34Mounted = true;

}


