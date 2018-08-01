import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import modules from './modules';

Vue.use(Vuex);

const storageName = 'brandy';

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      key: storageName,
      paths: ['canvas']
    })
  ],
  strict: process.env.NODE_ENV !== 'production'
});
