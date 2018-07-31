import * as types from '../mutation-types';

const state = {
  settings: {
    language: 'en'
  }
};

const mutations = {
  [types.UPDATE_SETTINGS](state, settings) {
    state.settings = Object.assign(state, settings);
  }
};

export default {
  state,
  mutations
};
