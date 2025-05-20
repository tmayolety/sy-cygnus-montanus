var screen = {
    renderData: function (msg) {
    }
};


if (typeof emotionBatteriesMounted == 'undefined') {

    const emotionBatteriesApp = Vue.createApp({})
    emotionBatteriesApp.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
    emotionBatteriesApp.component('gauge-render', components.gauge)
     emotionBatteriesApp.component('icon-text-value-digital-line-render', components.iconTextValueDigitalLine)
    emotionBatteriesApp.mount('.emotionBatteriesApp')
    emotionBatteriesMounted = true;

}



