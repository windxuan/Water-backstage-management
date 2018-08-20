import Vue from 'vue';
import Router from 'vue-router';
import Tabsheet from './components/Tabsheet.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Tabsheet',
      component: Tabsheet,
    },
  ],
});

export default router;
