<template>
  <ul class="scroll-message">
    <li
      v-for="message in messages"
      :key="message"
      :class="{ animation : animate }"
    >{{message}}</li>
  </ul>
</template>

<script>
export default {
  name: 'ScrollMessage',
  props: {
    messages: {
      type: Array,
      default() {
        return [
          '小提示：页面右上角有音效开关哦~',
          '小提示：点击页面最下方按钮可查看详细规则'
        ];
      }
    },
    switchDelay: {
      default: 3000,
      type: Number
    }
  },
  data() {
    return {
      animate: false
    };
  },
  methods: {
    scroll() {
      this.animate = true;
      setTimeout(() => {
        this.animate = false;
        this.messages.push(this.messages.shift());
      }, 1200);
    }
  },
  watch: {
    messages() {
      // 判断是否需要滚动
      if (this.messages.length <= 1) return;
      clearInterval(this.interval);
      // 将定时器赋给this实例方便清除
      this.interval = setInterval(() => {
        this.scroll();
      }, this.switchDelay);
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
