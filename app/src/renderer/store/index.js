import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import * as actions from './actions';
import * as getters from './getters';
import modules from './modules';

Vue.use(Vuex);

const storageName = 'brandy';

export default new Vuex.Store({
  actions,
  getters,
  modules,
  plugins: [
    createPersistedState({
      key: storageName,
      paths: ['settings']
    })
  ],
  strict: process.env.NODE_ENV !== 'production'
});
