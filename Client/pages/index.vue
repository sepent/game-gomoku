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
      }
    };
  },

  methods: {
    onClickFind() {
      this.$game.finding();
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

      this.$game.chosen({x, y});
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
        // audio.playing.play();
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

    nodes(){
      return this.$store.state.match.gameboard
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