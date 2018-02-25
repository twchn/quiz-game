<template>
  <transition name="slide-fade">
    <div class="code-container" @click.self="back">
      <div class="modal">
        <img class="close-btn" @click="back" src="../../assets/icon/close.svg" alt="close">
        <h1>请输入邀请码</h1>
        <div class="input">
          <input
            type="number"
            pattern="[0-9]"
            maxlength="6"
            min="0"
            max="999999"
            placeholder="6位邀请码"
            autofocus
          >
          <button>确定</button>
        </div>
        <h2>我的邀请码</h2>
        <p>150247</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'InvitationCode',
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
