// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'normalize.css';
import 'vue-awesome/icons/question-circle';
import 'vue-awesome/icons/angle-right';
import App from './App';
import router from './router';
import store from './store';
import '../mock/mock';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
