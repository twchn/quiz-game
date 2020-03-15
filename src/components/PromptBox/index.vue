<template>
  <transition appear name="fade">
    <div class="prompt-box">{{promptMessage}}</div>
  </transition>
</template>

<script>
export default {
  name: 'PromptBox',
  props: {
    promptMessage: {
      type: String,
      default: '请稍等！'
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
