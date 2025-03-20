var screen = {
    renderData: function (msg) {
    }
}

if (typeof wideScreenMounted == 'undefined') {
    const wideScreenApp = Vue.createApp({})
    wideScreenApp.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
    wideScreenApp.component('gauge-render', components.gauge)
    wideScreenApp.mount('.wideScreenApp')
    wideScreenMounted = true;
}

