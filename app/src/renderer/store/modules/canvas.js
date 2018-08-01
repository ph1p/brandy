import * as types from '../mutation-types';

const state = {
  language: 'en',
  selectedFilterPreset: null,
  selectedPreset: null,
  loading: false,
  stroke: {
    width: 0,
    color: '#fff'
  },
  filter: {
    blur: 0,
    filters: []
  },
  logo: {
    image: 'b1w',
    directionH: 'center',
    directionV: 'bottom',
    color: '#fff'
  },
  texts: {
    title: '',
    subtitle: ''
  },
  measurements: {
    width: 0,
    height: 0
  },
  font: {
    size: 0,
    color: '#fff',
    align: 'center'
  },
  preset: {
    icon: "facebook",
    title: "Facebook ad",
    width: 1200,
    height: 628,
    logo: 160,
    logo2: 95,
    fontSize: 110
  },
  backgroundPath: '',
  backgroundBuffer: null
};

const mutations = {
  [types.UPDATE_SETTINGS](state, settings) {
    state = Object.assign(state, settings);
  },
  ['START_LOADING'](state, settings) {
    state = Object.assign(state, {
      loading: true
    });
  },
  ['STOP_LOADING'](state, settings) {
    state = Object.assign(state, {
      loading: false
    });
  }
};

const actions = {
  updateSettings({ commit, state, getters }, settings) {
    commit(types.UPDATE_SETTINGS, settings);
  },
  startLoading({ commit, state, getters }) {
    commit('START_LOADING');
  },
  stopLoading({ commit, state, getters }) {
    commit('STOP_LOADING');
  },
}

const getters = {
  settings: state => state,
  setting: state => part => state[part],
  isLoading: state => state.loading
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
