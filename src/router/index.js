import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import RulesPage from '@/components/RulesPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: 'rules',
          component: RulesPage
        }
      ]
    }
  ]
});
