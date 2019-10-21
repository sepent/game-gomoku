<template>
  <div class="container">
    <header>
      <div>
        <h1>
          GAME CARO
        </h1>
        <div class="right-content">
        <span v-if="isPlaying" class="timer">{{timer}}</span>
        <button @click="onOpenSetting" class="btn-setting"></button>
        </div>
      </div>
    </header>
    <main>
      <nuxt />
    </main>
    <footer>game caro</footer>
    <find-match
      :show="isShowDialog"
      :match="matchData"
      :status="status"
      @accept="onAcceptMatch"
      @cancel="onCancelMatch"
    />
    <setting-dialog v-model="isShowSetting" />
  </div>
</template>

<script>
import FindMatch from "~/components/FindMatch.vue";
import SettingDialog from "~/components/SettingDialog.vue";

export default {
  components: { FindMatch, SettingDialog },
  data() {
    return {
      time: 0,
      interval: null,
      isShowSetting: false
    };
  },

  methods: {
    /**
     * Event when click on accept button
     */
    onAcceptMatch() {
      this.$store.commit("match/status", "playing");
      audio.acceptMatch.play();
    },

    /**
     * Event when click on cancel button
     */
    onCancelMatch() {
      this.$store.commit("match/clear");
    },

    /**
     * Setting for game
     */
    onOpenSetting() {
      this.isShowSetting = true;
    }
  },

  watch: {
    /**
     * When status is changed
     */
    status(newVal) {
      if (newVal == "playing") {
        this.interval = window.setInterval(() => {
          this.time++;
        }, 1000);
      } else {
        window.clearInterval(this.interval);
      }
    }
  },

  computed: {
    /**
     * Is show dialog
     */
    isShowDialog() {
      return (
        this.$store.state.match.status == "finding" ||
        this.$store.state.match.status == "waiting"
      );
    },

    /**
     * Is playing
     */
    isPlaying() {
      return this.$store.state.match.status == "playing";
    },

    /**
     * Status of match store
     */
    status() {
      return this.$store.state.match.status;
    },

    /**
     * Data of match
     */
    matchData() {
      return this.$store.state.match.info;
    },

    /**
     * Timer of playing
     */
    timer() {
      let seconds = 0;
      let minutes = 0;

      minutes = parseInt(this.time / 60);
      seconds = this.time - minutes * 60;

      // Convert to format H:i
      return (
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)
      );
    }
  }
};
</script>

<style lang="scss">
// Reset CSS
html,
body {
  padding: 0;
  margin: 0;
}

html,
body,
#__nuxt,
#__layout,
#__layout > div,
.container {
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  flex: 1;

  // CSS for header
  header {
    height: 50px;
    background-color: #ce3800;
    color: #ffffff;
    display: flex;
    align-content: center;
    align-items: center;
    padding: 5px 10px;
    justify-content: center;

    > div{
      width: 700px;
      margin: 0 auto;
      display: flex;

      h1 {
        margin: 0;
        display: inline
      }

      div.right-content{
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;

        .timer{
          margin-right: 20px;
        }

        .btn-setting {
          background-image: url(/images/settings.png);
          height: 30px;
          width: 30px;
          background-position: center;
          background-size: contain;
          background-color: transparent;
          border: 0;
          cursor: pointer;

          &:focus {
            outline: 0;
          }
        }
      }

      &:after{
        display: block;
        content: '';
        clear: both;
      }
    }

    
  }

  // CSS for main
  main {
    flex: 1;
  }

  // CSS for footer
  footer {
    height: 50px;
    border-top: 1px solid #dddddd;
    padding: 5px 10px;
    background-color: #585858;
    color: #ffffff;
  }
}
</style>
