<template>
  <main class="main">
    <header class="header"></header>
      <CountdownTimer
        class="clock"
        :rotateDeg="180"
        text="3"
      />
      <div class="background"></div>
    <div class="question">98年春晚上表演《健康歌》的明星是谁？</div>
    <ul class="options">
      <li>王菲</li>
      <li>冯巩</li>
      <li>范晓霞</li>
      <li>我自己</li>
    </ul>
  </main>
</template>

<script>
import CountdownTimer from '../CountdownTimer';

export default {
  name: 'Quiz',
  components: {
    CountdownTimer
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
