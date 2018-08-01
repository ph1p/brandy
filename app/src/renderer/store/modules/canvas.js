import * as types from '../mutation-types';

const state = {
  language: 'en',
  stroke: {},
  settings: {},
  loading: false,
  canvas: null,
  filter: {},
  texts: {},
  logo: {},
  measurements: {},
  preset: {},
  background: ''
};

const mutations = {
  [types.UPDATE_SETTINGS](state, settings) {
    state.settings = Object.assign(state, settings);
  }
};

const actions = {
  updateSettings({ commit, state, getters }, settings) {
    commit(types.UPDATE_SETTINGS, settings);
  }
}

const getters = {
  settings: state => state,
  setting: state => part => state[part]
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions: {}
};
