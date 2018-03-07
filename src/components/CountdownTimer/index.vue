<template>
  <div class="timer-container">
    <div
      class="semicircle"
      :class="{ left: lessThanFive, right: !lessThanFive}"
      :style="leftStyle"
    >
    </div>
    <div
      class="semicircle right"
      :style="rightStyle"
    >
    </div>
    <div
      class="text"
      :class="{ msg: text === 0 }"
    >
      {{ text === 0 ? '未作答' : text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',
  props: {
    rotateDeg: {
      type: Number,
      default: 0
    },
    text: Number
  },
  data() {
    return {};
  },
  computed: {
    lessThanFive() {
      return this.rotateDeg < 180;
    },
    rightStyle() {
      return {
        transform: `rotate(${this.rotateDeg}deg)`
      };
    },
    leftStyle() {
      return {
        backgroundColor: this.lessThanFive ? '#fff' : '#5cc7e4',
        zIndex: 1
      };
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
