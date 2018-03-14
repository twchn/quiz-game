<template>
  <main class="main">
    <transition name="scale-fade">
      <img
        v-if="ready"
        class="countdown-img"
        :src="imgSrc"
        alt="countdown"
      >
    </transition>
    <audio src="../../assets/audio/countdown.mp3" ref="audio">浏览器版本过低，请尽快升级</audio>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { END_GAME } from '../../store/mutation-types';
import img1 from '../../assets/countdown/1.svg';
import img2 from '../../assets/countdown/2.svg';
import img3 from '../../assets/countdown/3.svg';

export default {
  name: 'Countdown',
  data() {
    return {
      ready: false,
      count: 0,
      imgs: [img3, img2, img1]
    };
  },
  computed: {
    imgSrc() {
      return this.imgs[this.count];
    },
    ...mapState([
      'mute',
      'gameMode'
    ])
  },
  methods: {
    playCountdown() {
      if (this.count === 3) {
        clearInterval(this.interval);
        // 使路由在quiz页返回直接跳到首页
        this.$router.replace('/quiz');
        return;
      }
      this.ready = true;
      if (!this.mute) {
        this.$refs.audio.play();
      }
      setTimeout(() => {
        this.ready = false;
        this.count += 1;
      }, 1000);
    },
    ...mapMutations({
      endGame: END_GAME
    })
  },
  created() {
    // 避免直接输入url进入
    if (!this.gameMode) {
      this.$router.push('/');
      return;
    }
    this.$nextTick(() => {
      this.interval = setInterval(() => {
        this.playCountdown();
      }, 1300);
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
