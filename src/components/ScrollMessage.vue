<template>
  <ul class="container">
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
    messages: Array,
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
  created() {
    // 判断是否需要滚动
    if (this.messages.length <= 1) {
      return;
    }
    // 将定时器赋给this实例方便清除
    this.timer = setInterval(() => {
      this.scroll();
    }, this.switchDelay);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.animation {
  transform: translateY(-100%);
  transition: all 1s;
}
.container {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    height: 100%;
  }
}
</style>
