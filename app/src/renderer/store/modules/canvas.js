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
    color: '#ffffff'
  },
  texts: {
    title: '',
    subtitle: ''
  },
  measurements: {
    width: 1200,
    height: 628,
  },
  font: {
    size: 0,
    color: '#ffffff',
    align: 'center'
  },
  preset: {
    icon: "facebook",
    title: "Facebook ad",
    logo: 160,
    logo2: 95
  },
  backgroundPath: '',
  backgroundBuffer: null
};

const mutations = {
  [types.UPDATE_SETTINGS](state, settings) {
    state = Object.assign(state, settings);
  },
  ['START_LOADING'](state, settings) {
    state.loading = true;
  },
  ['STOP_LOADING'](state, settings) {
    state.loading = false;
  },
  ['SET_MEASUREMENTS'](state, options) {
    state.measurements = Object.assign(state.measurements, options);
  },
  ['SET_STROKE'](state, options) {
    state.stroke = Object.assign(state.stroke, options);
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
  setMeasurements({ commit, state, getters }, options) {
    commit('SET_MEASUREMENTS', options);
  },
  setStroke({ commit, state, getters }, options) {
    commit('SET_STROKE', options);
  }
}

const getters = {
  settings: state => state,
  setting: state => part => state[part],
  isLoading: state => state.loading,
  stroke: state => state.stroke
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
