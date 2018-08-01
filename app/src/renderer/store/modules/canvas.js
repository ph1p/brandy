import * as types from '../mutation-types';

const state = {
  language: 'en',
  selectedFilterPreset: null,
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
  text: {
    align: 'center',
    title: '',
    subtitle: ''
  },
  measurements: {
    width: 0,
    height: 0,
  },
  font: {
    size: 0,
    color: '#ffffff',
  },
  presetInfo: {},
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
  },
  ['SET_FONT'](state, options) {
    state.font = Object.assign(state.font, options);
  },
  ['SET_TEXT'](state, options) {
    state.text = Object.assign(state.text, options);
  },
  ['SET_PRESETINFO'](state, options) {
    state.presetInfo = Object.assign(state.presetInfo, options);
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
  },
  setFont({ commit, state, getters }, options) {
    commit('SET_FONT', options);
  },
  setText({ commit, state, getters }, options) {
    commit('SET_TEXT', options);
  },
  setPresetInfo({ commit, state, getters }, options) {
    commit('SET_PRESETINFO', options);
  }
}

const getters = {
  settings: state => state,
  setting: state => part => state[part],
  isLoading: state => state.loading,
  stroke: state => state.stroke,
  font: state => state.font,
  text: state => state.text,
  measurements: state => state.measurements,
  preset: state => ({
    info: state.presetInfo,
    measurements: state.measurements,
    font: state.font
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
