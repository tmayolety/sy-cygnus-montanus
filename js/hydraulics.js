var screen = {
    renderData: function (msg) {
    }
}

if (typeof hydraulicsMounted == 'undefined') {
    const hydraulicsApp = Vue.createApp({})
    hydraulicsApp.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
    hydraulicsApp.component('icon-text-value-analogue-line-render', components.iconTextValueAnalogueLine)
    hydraulicsApp.component('icon-text-value-digital-line-render', components.iconTextValueDigitalLine)
    hydraulicsApp.component('gauge-render', components.gauge)
    hydraulicsApp.mount('.hydraulicsApp')
    hydraulicsMounted = true;
}

