var screen = {
    renderData: function (msg) {
    }
};


if (typeof generators34Mounted == 'undefined') {

    const generatorsApp34 = Vue.createApp({})
    generatorsApp34.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
    generatorsApp34.component('gauge-render', components.gauge)
    generatorsApp34.mount('.generators34App')
    generators34Mounted = true;

}


