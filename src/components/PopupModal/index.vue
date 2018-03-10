<template>
  <transition name="slide-fade">
    <div class="modal-container" @click.self="goHome">
      <div class="modal">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopupModal',
  methods: {
    goHomeWithMessage() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
