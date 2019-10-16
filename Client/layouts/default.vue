<template>
  <div class="container">
    <header>
      <span>GAME CARO <span v-if="isPlaying">{{timer}}</span></span>
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
  </div>
</template>

<script>
import FindMatch from "~/components/FindMatch.vue";
import audio from "~/config/audio";

export default {
  components: { FindMatch },
  data(){
    return {
      time: 0,
      interval: null
    }
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
    }
  },

  watch: {
    /**
     * When status is changed
     */
    status(newVal){
      if (newVal == 'playing') {
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
    isPlaying(){
      return this.$store.state.match.status == 'playing';
    },

    /**
     * Status of match store
     */
    status(){
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
    timer(){
      let seconds = 0;
      let minutes = 0;

      minutes = parseInt(this.time/60);
      seconds = this.time - (minutes * 60);

      // Convert to format H:i
      return  (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
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
