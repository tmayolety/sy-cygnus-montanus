var screen = {
    renderData: function (msg) {
    }
};


if (typeof emotionBatteriesMounted == 'undefined') {

    const emotionBatteriesApp = Vue.createApp({})
    emotionBatteriesApp.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
    emotionBatteriesApp.component('gauge-render', components.gauge)
    emotionBatteriesApp.mount('.emotionBatteriesApp')
    emotionBatteriesMounted = true;

}



