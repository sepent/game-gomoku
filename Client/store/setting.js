import {SETTING_KEY} from '~/config/constants';

// Get setting from localstorage
let oldSetting = localStorage.getItem(SETTING_KEY);

try {
  oldSetting = JSON.parse(oldSetting);
} catch (e) {
  oldSetting = null;
}

if (!oldSetting) {
  oldSetting = {
    audio: {
      foundMatch: {volume: 1},
      acceptMatch: {volume: 1},
      finding: {volume: 1},
      chosen: {volume: 1},
      playing: {volume: 1}
    },

    display: {
      chessman: {
        me: 'x',
        rival: 'o'
      }
    }
  };

  localStorage.setItem(SETTING_KEY, JSON.stringify(oldSetting));
}

// State of store
export const state = oldSetting;

// Mutations
export const mutations = {
  /**
   * Change setting for audio
   * @param {*} state 
   * @param {*} data 
   */
  audio(state, data){
    // Save to store
    for (let name in data) {
      state.audio[name].volume = data[name].volume;
    }

    // Apply setting of audio
    window.audio.update(data);
  },

  /**
   * Change setting for display
   * @param {*} state 
   * @param {*} data 
   */
  display(state, data){
    state.display.chessman.me = data.chessman.me;
    state.display.chessman.rival = data.chessman.rival;
  },

  /**
   * Save setting state to localstorage
   * @param {*} state 
   */
  save(state){
    localStorage.setItem(SETTING_KEY, JSON.stringify(state));
  }
};