import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import RulesPage from '@/components/RulesPage';
import InvitationCode from '@/components/InvitationCode';
import RankingList from '@/components/RankingList';
import SharePage from '@/components/SharePage';

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
        },
        {
          path: 'invitation',
          component: InvitationCode
        },
        {
          path: 'list',
          component: RankingList
        },
        {
          path: 'share',
          component: SharePage
        }
      ]
    }
  ]
});
