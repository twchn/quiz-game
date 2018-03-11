<template>
  <button class="begin-btn">
    <span class="border"></span>
    <span class="border" :style="propsStyle">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'BeginButton',
  props: {
    propsStyle: Object
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
