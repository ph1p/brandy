import Vue from 'vue';
import Router from 'vue-router';
import crypto from 'crypto';
import fs from 'fs';
import { ipcRenderer } from 'electron';

import App from './App';
import routes from './routes';
// import store from 'renderer/vuex/store';
// import config from '../config';
import feather from 'feather-icons';

Vue.use(Router);

Vue.mixin({
  data() {
    return {
      feather
    };
  }
});

Vue.config.debug = true;

const router = new Router({
  hashbang: false,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: routes()
});

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app');
