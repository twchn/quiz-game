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
    <audio :src="audioSrc" ref="audio">浏览器版本过低，请尽快升级</audio>
  </main>
</template>

<script>
import img1 from '../../assets/countdown/1.png';
import img2 from '../../assets/countdown/2.png';
import img3 from '../../assets/countdown/3.png';
import audioSrc from '../../assets/countdown/countdown.mp3';

export default {
  name: 'Countdown',
  data() {
    return {
      ready: false,
      count: 0,
      imgs: [img3, img2, img1],
      audioSrc
    };
  },
  computed: {
    imgSrc() {
      return this.imgs[this.count];
    }
  },
  methods: {
    playCountdown() {
      if (this.count === 3) {
        clearInterval(this.interval);
        this.$router.push({ path: '/' });
        return;
      }
      this.ready = true;
      this.$refs.audio.play();
      setTimeout(() => {
        this.ready = false;
        this.count += 1;
      }, 1000);
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.playCountdown();
    }, 1500);
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
