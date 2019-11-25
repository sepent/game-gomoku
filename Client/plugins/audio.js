window.audio = {
  foundMatch: new Audio('/audio/found_the_match.mp3'),
  acceptMatch: new Audio('/audio/accept_match.mp3'),
  finding: new Audio('/audio/finding.mp3'),
  chosen: new Audio('/audio/chosen.wav'),
  playing: new Audio('/audio/playing.mp3'),
  currentRunning: null,

  /**
   * Stop audio
   * @param {*} name 
   */
  stop(){
    if (this.currentRunning) {
      this[this.currentRunning].pause();
      this.currentRunning = null;
    }
  },

  /**
   * Play audio
   * @param {*} name 
   */
  play(name, clearCurrent){
    clearCurrent = clearCurrent !== false ? true : false;

    if (clearCurrent) {
      this.stop();
    }
    
    this.currentRunning = name;
    this[name].currentTime = 0;
    this[name].play();
  },

  /**
   * Update source, volume for audio
   * @param {*} data 
   */
  update(data){
    for (let name in data) {
      this[name].volume = data[name].volume;
    }
  }
};
