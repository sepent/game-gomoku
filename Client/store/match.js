export const state = {
  info: null,
  status: 'none',
  gameboard: [] // [x][y]
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
   * Update innings info
   */
  innings(state, data){
    state.info.innings = data;
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
  },

  /**
   * Update gameboard
   * @param {*} state 
   * @param {*} data 
   */
  gameboard(state, data){
    state.gameboard = data;
  }
};