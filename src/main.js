// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import 'normalize.css';
import 'vue-awesome/icons/question-circle';
import 'vue-awesome/icons/angle-left';
import 'vue-awesome/icons/angle-right';
import App from './App';
import router from './router';
import store from './store';
import '../mock/mock';
import loadingIcon from './assets/icon/loading-icon.svg';
import loadingError from './assets/icon/loading-error.svg';

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  loading: loadingIcon,
  error: loadingError
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
