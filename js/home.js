document.addEventListener('DOMContentLoaded', function() {
    if (typeof homeMounted == 'undefined') {
      const homeApp = Vue.createApp({})
      homeApp.config.compilerOptions.isCustomElement = tag => tag.startsWith('font')
      homeApp.component('gauge-render', components.gauge)
      homeApp.mount('.homeApp')
      homeMounted = true;
    }
  });
  