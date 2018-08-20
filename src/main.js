import Vue from 'vue';
import ElementUI from 'element-ui';

// 静态资源引入
import 'element-ui/lib/theme-chalk/index.css';

// 引入模块
import App from './App.vue';
import router from './router';
import store from './store';

// 组件化
Vue.use(ElementUI);

// 关闭消息提示
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');