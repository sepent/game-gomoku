export default {
  foundMatch: new Audio('/audio/found_the_match.mp3'),
  acceptMatch: new Audio('/audio/accept_match.mp3'),
  finding: new Audio('/audio/finding.mp3'),
  chosen: new Audio('/audio/chosen.wav'),
  playing: new Audio('/audio/playing.mp3'),

  stopAudio(name){
    this[name].pause();
    this[name].currentTime = 0;
  }
};
