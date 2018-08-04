import * as types from '../mutation-types';

const state = {
  language: 'en',
  selectedFilterPreset: null,
  loading: false,
  stroke: {
    width: 0,
    color: '#ffffff'
  },
  filter: {
    blur: 0,
    filters: []
  },
  logo: {
    current: '',
    directionH: 'center',
    directionV: 'bottom',
    color: '#ffffff',
    logos: [
      {
        name: 'logo_appcom1',
        default: true,
        data:
          '<svg xmlns="http://www.w3.org/2000/svg" id="logo1" viewBox="0 0 706.6 146"><path d="M132.3 26.3C126.4 20.4 77 0 68.6 0S10.8 20.4 4.9 26.3C1.7 29.5 0 33.7 0 38.2v69.6c0 4.5 1.7 8.7 4.9 11.9 5.9 5.9 55.3 26.3 63.7 26.3s57.8-20.4 63.7-26.3c3.2-3.2 4.9-7.4 4.9-11.9V38.2c0-4.5-1.7-8.7-4.9-11.9zM11 39.7c0-2.1.8-4.2 2.4-5.7 4.1-4.1 49.5-22.8 55.3-22.8 1.6 0 8.7 2.3 17.3 5.5l2.3.9-2.3.7c-11 3.4-16 9.5-18 12.8L35.4 87.9h-.5c-4.5-.4-19.6-3.4-23.9-26.6V39.7zm80.3 48.8H47l22.4-38.2 21.9 38.2zm-12.1 43.2c-8.1 2.8-10.3 3.1-10.6 3.1-5.8 0-51.2-18.8-55.3-22.8-1.5-1.5-2.4-3.5-2.4-5.7V86.7l1.5 1.6c9.2 10.1 21.2 10.3 21.3 10.3h61.4l.2.6c2 7.3 2.6 21.1-16.1 32.5zm44.7-19.7c-1.3 1.3-9.2 5.2-18.9 9.5l-2.1.9 1-2.1c6.2-12.8 2.3-24.6 2.3-24.8l-.9-2.9-30-52 .3-.4c3.6-5.2 11.7-13.8 25.5-13.8 4.1 0 8.6.8 13.1 2.4 7.5 3.6 9.3 5 9.7 5.3 1.5 1.5 2.4 3.6 2.4 5.7v66.6c-.1 2-.9 4.1-2.4 5.6zM706.6 62.3c0-8.9-5-17.4-12.8-21.7-7.6-4.2-16.9-4.1-24.4.2-2.1 1.2-4 2.7-5.7 4.4-.9.9-1.7 1.9-2.4 2.9-.5.7-1.6 2-1.6 2.8-3.1-6-8.7-10.6-15.1-12.4-6.3-1.8-13.2-1.1-19 2.1-3.2 1.8-5.9 4.2-8.1 7.2v-8.2h-11.6V105h11.6V82.4 75v-5c0-2.4 0-4.9.1-7.2.5-7.9 6.8-14.5 14.6-15.6 7.7-1 15.2 3.7 17.8 10.9 1.5 4 1 8.9 1 13.2v33.8h11.5V88.6 66v-7.4l.1.2c2.9-8.6 12.4-13.5 21-10.7 7.2 2.3 11.7 9.1 11.7 16.5v40.7h11.3V91 68.7v-6.4zM488.2 95.7c-6.1 0-12-2.2-16.4-6.4-4.3-4.2-6.7-10-6.9-16-.2-6 1.6-12.1 5.5-16.7 3.8-4.5 9.3-7.1 15.1-7.7 7.8-.8 15.9 2 20.8 8.3l10-5.8C509 40.9 496 36.2 483.6 37.7c-10.7 1.3-20.5 7.4-25.9 16.8-5.5 9.6-6.1 21.8-1.7 32 4.2 9.8 13.1 17 23.4 19.5 12 2.9 25.3-.4 34-9.4 1.1-1.1 2-2.3 2.9-3.5l-9.9-5.8c-4.1 5.3-10.6 8.4-18.2 8.4zM279.3 68.3c-1.6-14.4-12.3-26.4-26.4-29.8-11.7-2.8-24.4.2-33.2 8.6-8.1 7.7-11.8 19-10.3 30 1.4 10.8 8 20.4 17.6 25.6 11.3 6.1 25.7 5.7 36.6-1.2 1.5-1 3-2.1 4.3-3.3v8.8h11.6V94.4v-19c0-2.4 0-4.8-.2-7.1zM244.2 96c-9.9 0-18.9-6-22.2-15.5-3.2-9.4-.6-20.5 7.1-26.8 7.7-6.2 19.2-6.9 27.6-1.8 8.6 5.2 12.5 15.5 10.6 25.2s-9.6 17.1-19.4 18.5c-1.1.3-2.4.4-3.7.4zM560.2 37.5c-14.6 0-28.1 9-33.1 22.8s-.7 29.8 10.8 39.1c11.5 9.2 28.3 10.2 40.9 2.6 12.6-7.5 18.9-22.5 16-36.8s-14.7-25.2-29-27.3c-1.9-.3-3.7-.4-5.6-.4zm0 58.5c-9.9 0-18.9-6-22.2-15.5-3.2-9.4-.6-20.5 7.1-26.8 7.7-6.2 19.2-6.9 27.6-1.8 8.6 5.2 12.5 15.5 10.6 25.2s-9.6 17.1-19.4 18.5c-1.1.3-2.4.4-3.7.4zM442.8 73c0-14.1-8-27.9-21.5-32.9-7.7-2.9-16-3.7-24-1.4-6.9 2-13 6-17.6 11.5-5 6-7.9 13.6-8.2 21.4-.1 1.9 0 3.9 0 5.8v48.1l11.6-4.4V99.5c9.2 8.4 22.3 11.4 34.2 7.9 4.8-1.4 9.2-3.3 13.1-6.6 3.7-3.1 6.7-7 8.8-11.4 2.5-5.2 3.6-10.8 3.6-16.4zm-35.7 24.2c-10.1 0-19.3-6-22.6-15.7-3.2-9.5-.7-21 7.2-27.5 7.8-6.3 19.8-6.9 28.3-1.7 8.8 5.3 12.5 15.9 10.7 25.8C428.8 88 421 95.5 411 97c-1.2.1-2.6.2-3.9.2zM361.2 73c0-14.1-8-27.9-21.5-32.9-7.7-2.9-16-3.7-24-1.4-6.9 2-13 6-17.6 11.5-5 6-7.9 13.6-8.2 21.4-.1 2 0 4 0 5.9v47.9l11.6-4.4V99.4c9.1 8.3 22.2 11.4 34 7.9 4.8-1.4 9.3-3.3 13.2-6.5 3.7-3.1 6.7-6.9 8.8-11.2 2.4-5.2 3.7-10.9 3.7-16.6zm-35.8 24.2c-10.1 0-19.3-6-22.6-15.7-3.2-9.5-.7-21 7.2-27.5 7.8-6.3 19.8-6.9 28.3-1.7 8.8 5.3 12.5 15.9 10.7 25.8-1.9 9.9-9.7 17.4-19.7 18.9-1.2.1-2.5.2-3.9.2z" class="st0"/></svg>'
      },
      {
        name: 'logo_appcom2',
        default: true,
        data:
          '<svg xmlns="http://www.w3.org/2000/svg" id="logo2" viewBox="0 0 269.5 232.7"><path d="M198.4 26.3C192.5 20.4 143.1 0 134.7 0 126.3 0 76.9 20.4 71 26.3c-3.2 3.2-4.9 7.4-4.9 11.9v69.6c0 4.5 1.7 8.7 4.9 11.9 5.9 5.9 55.3 26.3 63.7 26.3s57.8-20.4 63.7-26.3c3.2-3.2 4.9-7.4 4.9-11.9V38.2c0-4.5-1.7-8.7-4.9-11.9zM77.1 39.7c0-2.1.8-4.2 2.4-5.7 4.1-4.1 49.5-22.8 55.3-22.8 1.6 0 8.7 2.3 17.3 5.5l2.3.9-2.3.7c-11 3.4-16 9.5-18 12.8l-32.6 56.8h-.5c-4.5-.4-19.6-3.4-23.9-26.6V39.7zm80.3 48.8h-44.3l22.4-38.2 21.9 38.2zm-12.1 43.2c-8.1 2.8-10.3 3.1-10.6 3.1-5.8 0-51.2-18.8-55.3-22.8-1.5-1.5-2.4-3.5-2.4-5.7V86.7l1.5 1.6c9.2 10.1 21.2 10.3 21.3 10.3h61.4l.2.6c2 7.3 2.6 21.1-16.1 32.5zM190 112c-1.3 1.3-9.2 5.2-18.9 9.5l-2.1.9 1-2.1c6.2-12.8 2.3-24.6 2.3-24.8l-.9-2.9-30-52 .3-.4c3.6-5.2 11.7-13.8 25.5-13.8 4.1 0 8.6.8 13.1 2.4 7.5 3.6 9.3 5 9.7 5.3 1.5 1.5 2.4 3.6 2.4 5.7v66.6c-.1 2-.9 4.1-2.4 5.6zM269.5 198.5c0-4.8-2.7-9.4-6.9-11.8-4.1-2.3-9.2-2.2-13.2.1-1.1.6-2.2 1.5-3.1 2.4-.5.5-.9 1-1.3 1.6-.3.4-.9 1.1-.9 1.5-1.7-3.2-4.7-5.7-8.2-6.7-3.4-1-7.1-.6-10.3 1.1-1.7 1-3.2 2.3-4.4 3.9v-4.4h-6.3v35.4h6.3v-12.2-4-2.7c0-1.3 0-2.7.1-3.9.3-4.3 3.7-7.9 7.9-8.4s8.2 2 9.6 5.9c.8 2.2.5 4.8.5 7.1v18.3h6.2v-8.9-12.2-4l.1.1c1.6-4.7 6.7-7.3 11.4-5.8 3.9 1.2 6.3 4.9 6.3 8.9v22h6.1v-7.7V202c.1-1.3.1-2.4.1-3.5zM151.2 216.6c-3.3 0-6.5-1.2-8.9-3.5-2.3-2.3-3.6-5.4-3.7-8.7-.1-3.2.9-6.6 3-9 2.1-2.4 5-3.8 8.2-4.2 4.2-.4 8.6 1.1 11.3 4.5l5.4-3.1c-4-5.7-11-8.2-17.7-7.4-5.8.7-11.1 4-14 9.1-3 5.2-3.3 11.8-.9 17.3 2.3 5.3 7.1 9.2 12.7 10.6 6.5 1.6 13.7-.2 18.4-5.1.6-.6 1.1-1.2 1.6-1.9L161 212c-2.2 2.9-5.7 4.6-9.8 4.6zM38 201.7c-.9-7.8-6.7-14.3-14.3-16.1-6.3-1.5-13.2.1-18 4.7-4.4 4.2-6.4 10.3-5.6 16.2.8 5.8 4.3 11 9.5 13.9 6.1 3.3 13.9 3.1 19.8-.6.8-.5 1.6-1.1 2.3-1.8v4.8H38V216v-10.3c.1-1.4.1-2.7 0-4zm-19 15c-5.4 0-10.2-3.2-12-8.4-1.7-5.1-.3-11.1 3.8-14.5 4.2-3.4 10.4-3.7 14.9-1 4.7 2.8 6.8 8.4 5.7 13.6-1 5.3-5.2 9.3-10.5 10-.5.3-1.2.3-1.9.3zM190.2 185.1c-7.9 0-15.2 4.9-17.9 12.3-2.7 7.5-.4 16.1 5.8 21.2 6.2 5 15.3 5.5 22.2 1.4 6.8-4.1 10.2-12.2 8.7-19.9-1.6-7.7-8-13.6-15.7-14.8-1.1-.2-2.1-.2-3.1-.2zm0 31.6c-5.4 0-10.2-3.2-12-8.4-1.7-5.1-.3-11.1 3.8-14.5 4.2-3.4 10.4-3.7 14.9-1 4.7 2.8 6.8 8.4 5.7 13.6-1 5.3-5.2 9.3-10.5 10-.5.3-1.2.3-1.9.3zM126.6 204.3c0-7.6-4.3-15.1-11.6-17.8-4.2-1.6-8.7-2-13-.8-3.7 1.1-7 3.2-9.5 6.2-2.7 3.2-4.3 7.4-4.4 11.6-.1 1 0 2.1 0 3.1V232.7l6.3-2.4v-11.7c5 4.5 12.1 6.2 18.5 4.3 2.6-.8 5-1.8 7.1-3.6 2-1.7 3.6-3.8 4.8-6.2 1.2-2.8 1.8-5.8 1.8-8.8zm-19.3 13.1c-5.5 0-10.5-3.2-12.2-8.5-1.7-5.1-.4-11.4 3.9-14.9 4.2-3.4 10.7-3.7 15.3-.9 4.8 2.9 6.8 8.6 5.8 14s-5.3 9.4-10.7 10.2c-.7 0-1.4.1-2.1.1zM82.4 204.3c0-7.6-4.3-15.1-11.6-17.8-4.2-1.6-8.7-2-13-.8-3.7 1.1-7 3.2-9.5 6.2-2.7 3.2-4.3 7.4-4.4 11.6-.1 1.1 0 2.2 0 3.2v25.9l6.3-2.4v-11.7c4.9 4.5 12 6.2 18.4 4.3 2.6-.8 5-1.8 7.1-3.5 2-1.7 3.6-3.7 4.8-6.1 1.2-2.7 1.9-5.8 1.9-8.9zM63 217.4c-5.5 0-10.5-3.2-12.2-8.5-1.7-5.1-.4-11.4 3.9-14.9 4.2-3.4 10.7-3.7 15.3-.9 4.8 2.9 6.8 8.6 5.8 14s-5.3 9.4-10.7 10.2c-.6 0-1.3.1-2.1.1z" class="st0"/></svg>'
      }
    ]
  },
  text: {
    align: 'center',
    title: '',
    subtitle: ''
  },
  measurements: {
    width: 0,
    height: 0
  },
  font: {
    size: 0,
    color: '#ffffff'
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
  },
  ['SET_LOGO'](state, options) {
    state.logo = Object.assign(state.logo, options);
  },
  ['SET_BACKGROUND_PATH'](state, path) {
    state.backgroundPath = path;
  },
  ['SET_FILTER_BLUR'](state, blur) {
    state.filter.blur = blur;
  },
  ['ADD_FILTER'](state, filter) {
    state.filter.filters = state.filter.filters.concat(filter);
  },
  ['UPDATE_FILTER'](state, filter) {
    state.filter.filters[filter.index] = Object.assign(state.filter.filters[filter.index], filter);
  },
  ['REMOVE_FILTER'](state, index) {
    state.filter.filters = state.filter.filters.filter((f, k) => k !== index);
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
  },
  setLogo({ commit, state, getters }, options) {
    commit('SET_LOGO', options);
  },
  setBackgroundPath({ commit, state, getters }, path) {
    commit('SET_BACKGROUND_PATH', path);
  },
  setFilterBlur({ commit, state, getters }, blur) {
    commit('SET_FILTER_BLUR', blur);
  },
  addFilter({ commit, state, getters }, filter) {
    commit('ADD_FILTER', {
      mode: filter.mode,
      color: filter.color,
      opacity: filter.opacity
    });
  },
  updateFilter({ commit, state, getters }, filter) {
    commit('UPDATE_FILTER', filter);
  },
  removeFilter({ commit, state, getters }, index) {
    commit('REMOVE_FILTER', index);
  }
};

const getters = {
  settings: state => state,
  setting: state => part => state[part],
  isLoading: state => state.loading,
  stroke: state => state.stroke,
  font: state => state.font,
  text: state => state.text,
  measurements: state => state.measurements,
  logo: state => state.logo,
  backgroundPath: state => state.backgroundPath,
  filterBlur: state => state.filter.blur,
  filters: state => state.filter.filters,
  currentLogo: state => state.logo.logos.filter(l => l.name === state.logo.current)[0],
  logos: state => state.logo.logos,
  preset: state => ({
    info: state.presetInfo,
    measurements: state.measurements,
    font: state.font
  })
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
