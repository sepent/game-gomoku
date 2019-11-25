import io from 'socket.io-client';

export default ({app, route}, inject) => {
  let user = {
    id: parseInt(route.query.id),
    username: 'tranlamtoi',
    displayName: 'Tran Lam Toi'
  };

  const handler = {
    io: io('http://localhost'),

    /**
     * Trigger event finding to server
     */
    finding(){
      this.io.emit('client::finding', user);
      app.store.commit("match/status", "finding");
      audio.play('finding');
    },

    /**
     * Accept
     */
    accept(){
      this.io.emit('client::accept');
    },

    /**
     * Cancel
     */
    cancel(){
      this.io.emit('client::cancel');
    },

    /**
     * Chosen chessman
     * @param {*} data 
     */
    chosen(data){
      if (app.store.state.match.info.innings === user.id) {
        this.io.emit('client::chosen', data);
      }
    },

    /**
     * On event found match
     */
    onFound(){
      this.io.on('server::found', function(data){
        app.store.commit("match/info", data);
        app.store.commit("match/status", "waiting");
        audio.play('foundMatch');
      });
    },

    /**
     * On playing
     */
    onPlaying(){
      this.io.on('server::playing', function(){
        app.store.commit("match/status", "playing");
        audio.play('playing');
      });
    },

    /**
     * On cancel
     */
    onCancel(){
      this.io.on('server::cancel', function(){
        app.store.commit("match/clear");
        audio.stop();
      });
    },

    /**
     * Event when rival play
     */
    onChosen(){
      this.io.on('server::chosen', function(data){
        let {x, y} = data.chessman;
        let nodes = Object.assign({}, app.store.state.match.gameboard);

        if (!nodes[x]) {
          nodes[x] = {};
        }

        nodes[x][y] = {
          player: data.player === user.id ? 'me' : 'rival'
        };

        app.store.commit('match/gameboard', nodes);
        app.store.commit('match/innings', data.innings);
        audio.play('chosen', false);
      });
    },

    /**
     * Event end game
     */
    onEndgame(){
      this.io.on('endgame', function(data){
        app.store.commit("match/clear");
        audio.stop();
        alert(data.type === 'win' ? 'You are win!' : 'Overgame !!!');
      });
    },

    /**
     * Event end game
     */
    onRivalDisconnect(){
      this.io.on('rival-disconnect', function(){
        alert('Rival disconnect');
      });
    },
  };

  // server
  handler.onFound();
  handler.onPlaying();
  handler.onCancel();
  handler.onChosen();
  handler.onEndgame();
  handler.onRivalDisconnect();

  inject('game', handler);
};
