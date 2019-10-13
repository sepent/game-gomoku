export const state = {
  accept: false,
  info: null,
  isFinding: false
};


export const mutations = {
  info(state, data) {
    state.info = data;
  },

  finding(state, data) {
    state.isFinding = data;
  },

  accept(state, data){
    state.accept = data;
  },

  clear(state) {
    state.info = null;
    state.isFinding = false;
    state.accept = false;
  }
};