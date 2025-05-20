var screen = {
    renderData: function (msg) {

    }
};
if (typeof batteriesMounted == 'undefined') {
    const batteryApp = Vue.createApp({})
    batteryApp.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
    batteryApp.component('gauge-render', components.gauge)
    batteryApp.component('icon-text-value-analogue-line-render', components.iconTextValueAnalogueLine)
    batteryApp.component('icon-text-value-digital-line-render', components.iconTextValueDigitalLine)
    batteryApp.mount('.batteryApp')
    batteriesMounted = true;
}