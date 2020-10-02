import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

Vue.config.productionTip = false

router.afterEach((to) => {
  Vue.nextTick(() => {
      document.title = to.meta.title;
  });
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
