<template>
  <div class="setting-dialog" v-if="value">
    <div class="dialog-content finding">
      <div class="dialog-header">Cài đặt</div>
      <div class="dialog-body">
        <h3>Cài đặt âm thanh</h3>
        <div class="setting-content">
          <!-- Setting for found match -->
          <div>
            <label>Found match:</label>
            <input type="range" min="0" max="1" step="0.1" v-model="audio.foundMatch.volume" />
            <img src="/images/muted.png" v-if="audio.foundMatch.volume == 0" />
            <span v-else>{{audio.foundMatch.volume}}</span>
          </div>

          <!-- Setting for acceptMatch -->
          <div>
            <label>Accept match:</label>
            <input type="range" min="0" max="1" step="0.1" v-model="audio.acceptMatch.volume" />
            <img src="/images/muted.png" v-if="audio.acceptMatch.volume == 0" />
            <span v-else>{{audio.acceptMatch.volume}}</span>
          </div>

          <!-- Setting for finding -->
          <div>
            <label>Finding:</label>
            <input type="range" min="0" max="1" step="0.1" v-model="audio.finding.volume" />
            <img src="/images/muted.png" v-if="audio.finding.volume == 0" />
            <span v-else>{{audio.finding.volume}}</span>
          </div>

          <!-- Setting for chosen -->
          <div>
            <label>Chosen:</label>
            <input type="range" min="0" max="1" step="0.1" v-model="audio.chosen.volume" />
            <img src="/images/muted.png" v-if="audio.chosen.volume == 0" />
            <span v-else>{{audio.chosen.volume}}</span>
          </div>

          <!-- Setting for playing -->
          <div>
            <label>Playing:</label>
            <input type="range" min="0" max="1" step="0.1" v-model="audio.playing.volume" />
            <img src="/images/muted.png" v-if="audio.playing.volume == 0" />
            <span v-else>{{audio.playing.volume}}</span>
          </div>
        </div>
        <h3>Cài đặt hiển thị</h3>
        <div class="setting-content">
          <div>
            <label>Cờ của bạn:</label>
            <input type="radio" v-model="display.chessman.me" value="x" @change="onChangeChessman" /><img src="/images/x.png"/>
            <input type="radio" v-model="display.chessman.me" value="o" @change="onChangeChessman" /><img src="/images/o.png"/>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="accept" @click="onClickApply">Áp dụng</button>
        <button @click="onClickCancel">Hủy</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.setting-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .dialog-header,
  .dialog-body,
  .dialog-footer {
    padding: 8px 15px;
  }

  // CSS for header
  .dialog-header {
    border-bottom: 1px solid #eee;
    font-size: 1.5rem;
    background: #09c;
    color: #fff;
  }

  .dialog-footer {
    border-top: 1px solid #eee;
  }

  .dialog-content {
    width: 500px;
    margin: 30px auto;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;

    h3 {
      margin: 0;
    }

    .setting-content {
      margin-top: 5px;
      margin-bottom: 15px;
      > div {
        display: flex;
        align-items: center;
      }

      img {
        height: 20px;
      }

      label {
        width: 120px;
        display: inline-block;
      }

      input[type="range"] {
        -webkit-appearance: none;
        height: 20px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: 0.2s;
        transition: opacity 0.2s;
        margin-right: 10px;

        &:hover {
          opacity: 1;
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #4caf50;
          cursor: pointer;
        }

        &::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #4caf50;
          cursor: pointer;
        }
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

      &:focus {
        outline: 0;
      }

      &.accept {
        border: 1px solid #09c;
        background: #09c;
        color: #ffffff;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>

<script>
import { SETTING_KEY } from "~/config/constants";

export default {
  props: ["value"],

  data() {
    return {
      audio: {
        foundMatch: Object.assign(
          {},
          this.$store.state.setting.audio.foundMatch
        ),
        acceptMatch: Object.assign(
          {},
          this.$store.state.setting.audio.acceptMatch
        ),
        finding: Object.assign({}, this.$store.state.setting.audio.finding),
        chosen: Object.assign({}, this.$store.state.setting.audio.chosen),
        playing: Object.assign({}, this.$store.state.setting.audio.playing)
      },
      display: {
        chessman: {
          me: this.$store.state.setting.display.chessman.me,
          rival: this.$store.state.setting.display.chessman.rival
        }
      }
    };
  },

  methods: {
    /**
     * Event when click on cancel button
     */
    onClickCancel() {
      this.$emit("input", false);
    },

    /**
     * Event when click on apply button
     */
    onClickApply() {
      this.$store.commit("setting/audio", this.audio);
      this.$store.commit("setting/display", this.display);
      this.$store.commit("setting/save");
      this.$emit("input", false);
    },

    /**
     * Event when change chessman
     */
    onChangeChessman(){
      if (this.display.chessman.me == 'x') {
        this.display.chessman.rival = 'o';
      } else {
        this.display.chessman.rival = 'x';
      }
    }
  },

  mounted() {
    audio.update(this.audio);
  }
};
</script>