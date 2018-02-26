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
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
