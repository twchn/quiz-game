import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
// import actions from './actions';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  state,
  mutations
  // actions
});
