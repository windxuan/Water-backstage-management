import Vue from 'vue';
import Router from 'vue-router';
import Tabsheet from './components/Tabsheet.vue';
import Login from './components/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/tab',
      name: 'Tabsheet',
      component: Tabsheet,
    },
  ],
});

export default router;
