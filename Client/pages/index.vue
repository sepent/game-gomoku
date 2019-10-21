<template>
  <div class="content-container">
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
    <div class="finding" v-if="isNone">
      <button class="find-match" @click="onClickFind">Tìm trận</button>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
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
      this.$store.commit("match/status", "finding");

      // Example for founded
      window.setTimeout(() => {
        // Set info of match
        this.$store.commit("match/info", {
          me: {
            name: "Toi"
          },
          rival: {
            name: "Player"
          }
        });

        // Set status waiting
        this.$store.commit("match/status", "waiting");
      }, 1000);
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
     * Is have no the action
     */
    isNone() {
      return this.$store.state.match.status == "none";
    },

    /**
     * Is finding the match
     */
    isFinding() {
      return this.$store.state.match.status == "finding";
    },

    /**
     * Is waiting accept or cancel the match
     */
    isWaiting() {
      return this.$store.state.match.status == "waiting";
    },

    /**
     * Is joined to the match
     */
    isPlaying() {
      return this.$store.state.match.status == "playing";
    }
  }
};
</script>

<style lang="scss">
.content-container {
  margin: 10px;

  .game-board {
    width: 700px;
    border: 1px solid #dddddd;
    margin: 0 auto;
    height: 700px;
    overflow: auto;
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