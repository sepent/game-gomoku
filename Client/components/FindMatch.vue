<template>
  <div class="match-dialog" v-if="isFinding">
    <div class="dialog-content" v-if="!match">
      <loading />
    </div>

    <div class="dialog-content" v-if="match">
      <div class="progress" :class="{active: activeProgress}">
        <div class="progress-value"></div>
      </div>

      Đối thủ: {{match.player.name}}
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
import audio from '~/config/audio';

export default {
  props: ["isFinding", "match"],
  data(){
    return {
      timeout: null,
      activeProgress: false
    }
  },

  components: {
    Loading
  },

  watch: {
    match(newData, oldData){
      if (newData && newData !== oldData) {
        this.activeProgress = false;

        window.setTimeout(() => {
          this.activeProgress = true;
        }, 100);

        this.timeout = window.setTimeout(() => {
          this.$emit('cancel');
        }, 5000);

        // Create new sound
        audio.stopAudio('finding');
        audio.foundMatch.play();
      }
    },

    isFinding(newVal){
      if (newVal && !this.match) {
        audio.finding.play();
      }
    }
  },

  methods: {
    onClickAccept(){
      window.clearTimeout(this.timeout);
      this.$emit('accept');
      audio.stopAudio('foundMatch');
    },

    onClickCancel(){
      window.clearTimeout(this.timeout);
      this.$emit('cancel');
      audio.stopAudio('foundMatch');
    }
  }
};
</script>