var screen = {
    renderData: function (msg) {
    }
};


if (typeof generators4Mounted == 'undefined') {

    const generatorsApp4 = Vue.createApp({})
    generatorsApp4.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
    generatorsApp4.component('basic-text-with-digital-line-render', components.basicTextWithTitleDigital)
    generatorsApp4.component('gauge-render', components.gauge)
    generatorsApp4.component('multi-gauge-render', components.multiGauge)
    generatorsApp4.component('bar-render', components.bar)
    generatorsApp4.mount('.generators4App')
    generators4Mounted = true;

}