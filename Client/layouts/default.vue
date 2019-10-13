<template>
  <div class="container">
    <header>
      <span>GAME CARO</span>
    </header>
    <main>
      <nuxt />
    </main>
    <footer>game caro</footer>
    <find-match :is-finding="isFinding" :match="matchData" @accept="onAcceptMatch" @cancel="onCancelMatch"/>
  </div>
</template>

<script>
import FindMatch from "~/components/FindMatch.vue";
import audio from '~/config/audio';

export default {
  components: { FindMatch },
  methods: {
    onAcceptMatch(){
      this.$store.commit('match/accept', true);
      this.$store.commit('match/finding', false);
      audio.acceptMatch.play();
    },
    onCancelMatch(){
      this.$store.commit('match/clear');
    }
  },

  computed: {
    isFinding() {
      return this.$store.state.match.isFinding;
    },

    matchData() {
      return this.$store.state.match.info;
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
