<template>
  <div class="content-container">
    <div class="game-player-info" v-if="isPlaying">
      <player-info :match="match" player="me"/>
    </div>
    <div class="game-board" v-if="isPlaying">
      <div class="content found">
        <div v-for="y in board.rows" :key="y" class="row">
          <div
            v-for="x in board.columns"
            :key="x"
            class="column"
            @click="onClickColumn(x, y)"
            :class="chessman(x, y)"
          />
        </div>
      </div>
    </div>
    <div class="game-player-info" v-if="isPlaying">
      <player-info :match="match" player="rival"/>
    </div>
    <div class="finding" v-if="isNone">
      <button class="find-match" @click="onClickFind">Tìm trận</button>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import PlayerInfo from '~/components/PlayerInfo.vue';

export default {
  components: {
    Logo,
    PlayerInfo
  },

  data() {
    return {
      board: {
        columns: 50,
        rows: 50
      },
      nodes: {}
    };
  },

  methods: {
    onClickFind() {
      // Set status to finding
      // this.$store.commit("match/status", "finding");

      // Example for founded
      // window.setTimeout(() => {
      //   // Set info of match
        // this.$store.commit("match/info", {
        //   me: {
        //     id: 1,
        //     name: "Toi"
        //   },
        //   rival: {
        //     id: 2,
        //     name: "Player"
        //   },
        //   innings: 1
        // });

      //   // Set status waiting
      //   this.$store.commit("match/status", "waiting");
      // }, 1000);
      this.$socket.finding();
    },

    /**
     * Event when click cell
     * @param x
     * @param y
     */
    onClickColumn(x, y) {
      if (this.nodes[x] && this.nodes[x][y]) {
        return;
      }

      let nodes = Object.assign({}, this.nodes);

      if (!nodes[x]) {
        nodes[x] = {};
      }

      nodes[x][y] = {
        player: "me" // rival
      };

      this.nodes = nodes;
      audio.chosen.play();

      // this.onChangeInnings(this.match.info.rival.id);
      this.$socket.chosen({x, y});
    },

    /**
     * On change innings
     * @param {number} id
     */
    onChangeInnings(id){
      // this.$store.commit('match/innings', id);
    },

    /**
     * Get chessman
     */
    chessman(x, y) {
      if (this.nodes[x] && this.nodes[x][y]) {
        return 'active-' + this.$store.state.setting.display.chessman[this.nodes[x][y].player];
      }

      return '';
    }
  },

  watch: {
    /**
     * When isPlaying changed
     */
    isPlaying(value) {
      if (value) {
        audio.playing.play();
      }
    }
  },

  computed: {
    /**
     * Get match info
     * @return {Object}
     */
    match(){
      return this.$store.state.match;
    },

    /**
     * Is have no the action
     */
    isNone() {
      return this.match.status == "none";
    },

    /**
     * Is finding the match
     */
    isFinding() {
      return this.match.status == "finding";
    },

    /**
     * Is waiting accept or cancel the match
     */
    isWaiting() {
      return this.match.status == "waiting";
    },

    /**
     * Is joined to the match
     */
    isPlaying() {
      return this.match.status == "playing";
    }
  }
};
</script>

<style lang="scss">
.content-container {
  margin: 10px;
  display: flex;
  width: 1130px;
  margin: 0 auto;

  // CSS for player info
  .game-player-info{
    flex: 0 0 200px;
    margin-top: 15px;
  }

  .game-board {
    border: 1px solid #dddddd;
    height: 700px;
    overflow: auto;
    flex: 1 0 0;
    margin: 0 15px;
    margin-top: 15px;
  }

  .content {
    .row {
      display: flex;
      width: fit-content;

      .column {
        height: 20px;
        width: 20px;
        background: #ffffff;
        display: inline-block;
        border: 1px solid #eee;
        cursor: pointer;

        &.active-x,
        &.active-o {
          background-position: center;
          background-size: contain;
        }

        &.active-o {
          background-image: url("/images/o.png");
        }

        &.active-x {
          background-image: url("/images/x.png");
        }

        &:hover {
          background-color: #eee;
        }
      }
    }
  }

  .finding {
    text-align: center;
    width: 100%;
    margin-top: 15px;

    button {
      border: 1px solid #09c;
      border-radius: 5px;
      padding: 5px 10px;
      background: #ffffff;
      cursor: pointer;
      font-size: 30px;
      margin: auto;
      display: block;

      &:focus {
        outline: 0;
      }

      &:hover {
        background-color: #09c;
        color: #ffffff;
      }
    }
  }
}
</style>