<template>
  <transition
    name="slide"
  >
    <li
      :class="{ [optionsInfo.state ? 'right' : 'wrong']: optionsInfo.selected }"
      :style="wrongClass"
    >
      <slot />
      <span class="rate">{{ optionsInfo.selected ? rate : '' }}</span>
    </li>
  </transition>
</template>

<script>
export default {
  name: 'Option',
  props: {
    optionsInfo: Object,
    rate: {
      default: '100%',
      type: String
    }
  },
  computed: {
    wrongClass() {
      return {
        backgroundSize: this.optionsInfo.selected && !this.optionsInfo.state ? `${this.rate} 100%` : ''
      };
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
