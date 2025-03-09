var screen = {
    renderData: function (msg) {
    }
};


if (typeof generators12Mounted == 'undefined') {

    const generatorsApp12 = Vue.createApp({})
    generatorsApp12.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
    generatorsApp12.component('gauge-render', components.gauge)
    generatorsApp12.component('multi-text-state-render', components.multiTextState)
    generatorsApp12.mount('.generators12App')
    generators12Mounted = true;

}



