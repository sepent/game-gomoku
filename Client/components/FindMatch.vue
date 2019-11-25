<template>
  <div class="match-dialog" v-if="show">
    <div class="dialog-content finding" v-if="status == 'finding'">
      <loading />
      <div class="timer">
        {{timer}}
      </div>
    </div>

    <div class="dialog-content" v-if="status == 'waiting'">
      <div class="progress" :class="{active: activeProgress}">
        <div class="progress-value"></div>
      </div>

      Đối thủ: {{match.rival.name}}
      <button class="accept" @click="onClickAccept">Chấp nhận</button>
      <button  @click="onClickCancel">Hủy</button>
    </div>
  </div>
</template>

<style lang="scss">
.match-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .progress{
    height: 10px;
    border: 1px solid #eee;
    overflow: hidden;

    .progress-value{
      height: 100%;
      width: 2%;
      background-color: red;
    }

    &.active{
      .progress-value{
        width: 100%;
        transition: width 4.9s linear;
      }
    }
  }

  .dialog-content {
    width: 500px;
    margin: 30px auto;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;

    // CSS for finding content
    &.finding{
      text-align: center;
      .timer{
        font-size: 1.5rem;
      }
    }

    button {
      margin: 5px;
      border: 1px solid #bdbdbd;
      color: #4e4e4e;
      background: #dcdcdc;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;

      &:focus{
        outline: 0;
      }

      &.accept{
        border: 1px solid #09c;
        background: #09c;
        color: #ffffff;
      }

      &:hover{
        opacity: .8;
      }
    }
  }
}
</style>

<script>
import Loading from "~/components/icons/Loading.vue";

export default {
  props: ["show", "match", "status"],
  data(){
    return {
      timeout: null,
      interval: null,
      activeProgress: false,
      time: 120
    }
  },

  components: {
    Loading
  },

  watch: {
    /**
     * When match info changed
     */
    match(newData){
      if (newData) {
        this.activeProgress = false;

        // Todo
        window.setTimeout(() => {
          this.activeProgress = true;
        }, 100);
      }
    },

    /**
     * When status is changed
     */
    status(newVal){
      if (newVal == 'finding') {
        this.interval = window.setInterval(() => {
          this.time++;
        }, 1000);
      } else {
        window.clearInterval(this.interval);
      }
    }
  },

  computed: {
    timer(){
      let seconds = 0;
      let minutes = 0;

      minutes = parseInt(this.time/60);
      seconds = this.time - (minutes * 60);

      // Convert to format H:i
      return  (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
  },

  methods: {
    /**
     * When when click on accept button
     */
    onClickAccept(){
      window.clearTimeout(this.timeout);
      this.$emit('accept');
    },

    /**
     * Event when click on cancel button
     */
    onClickCancel(){
      window.clearTimeout(this.timeout);
      this.$emit('cancel');
    }
  }
};
</script>