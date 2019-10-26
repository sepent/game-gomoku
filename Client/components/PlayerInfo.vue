<template>
  <div class="player-info" :class="{innings: isInnings}">
    <h3>{{info.name}}</h3>
    <div>Quân cờ: <div class="chessman" :class="chessman"/></div>
  </div>
</template>

<style lang="scss" scoped>
  .player-info{
    border: 1px solid #eee;
    padding: 8px;
    border-radius: 8px;

    &.innings{
      border-color: red;
    }

    h3{
      margin: 0;
      color: #047fc7;
    }

    > div{
      display: flex;
      align-items: center;
    }
  }
</style>

<script>
export default {
  props: ['match', 'player'],

  computed: {
    chessman(){
      let setting = this.$store.state.setting.display.chessman[this.player];
      return 'chessman-' + setting;
    },

    /**
     * Get player info in match
     * @return {Object}
     */
    info(){
      return this.match.info[this.player];
    },

    /**
     * Check if is innings
     * @return {boolean}
     */
    isInnings(){
      return this.match.info.innings === this.info.id;
    }
  }
}
</script>