import { ipcRenderer } from 'electron';
import * as types from './mutation-types';

export const updateSettings = ({ commit, state }, data) => {
  commit(types.UPDATE_SETTINGS, data);
};
