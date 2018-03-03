<template>
  <transition name="slide-fade">
    <div class="modal-container" @click.self="back">
      <div class="modal">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopupModal',
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
