import io from 'socket.io-client';

export default ({app}, inject) => {
  console.log(app);
  const handler = {
    io: io('http://localhost'),

    /**
     * Trigger event finding to server
     */
    finding(){
      this.io.emit('client::finding');
      app.store.commit("match/status", "finding");
    },

    /**
     * Trigger event start and send user info to server
     */
    start(){
      this.io.emit('client::start', {
        username: 'tranlamtoi',
        displayName: 'Tran Lam Toi'
      });
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
      app.store.commit("match/clear");
    },

    /**
     * Chosen chessman
     * @param {*} data 
     */
    chosen(data){
      this.io.emit('client::chosen', data);
    },

    /**
     * On event found match
     */
    onFound(){
      this.io.on('server::found', function(data){
        app.store.commit("match/info", data);
        app.store.commit("match/status", "waiting");
      });
    },

    /**
     * On playing
     */
    onPlaying(){
      this.io.on('server::playing', function(){
        app.store.commit("match/status", "playing");
      });
    },

    /**
     * On cancel
     */
    onCancel(){
      this.io.on('server::cancel', function(){
        app.store.commit("match/clear");
      });
    }
  };

  // Init
  handler.start();

  // server
  handler.onFound();
  handler.onPlaying();
  handler.onCancel();

  inject('socket', handler);
};
