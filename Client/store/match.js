export const state = {
  info: null,
  status: 'none'
};

export const mutations = {
  /**
   * Data of match
   * @param {*} state 
   * @param {*} data 
   */
  info(state, data) {
    state.info = data;
  },

  /**
   * Clear data
   * @param {*} state 
   */
  clear(state) {
    state.info = null;
    state.status = 'none';
  },

  /**
   * Update status
   * @param {Object} state 
   * @param {string} data 
   */
  status(state, data){
    state.status = data;
  }
};