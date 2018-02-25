<template>
  <transition name="slide-fade">
    <div class="code-container">
      <div class="modal">
        <img class="close-btn" @click="back" src="../assets/close.svg" alt="close">
        <h1>请输入邀请码</h1>
        <div class="input">
          <input type="text" placeholder="6位邀请码" autofocus>
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

<style lang="scss" scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
.code-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  .modal {
    width: 88%;
    margin: 16vh auto 0;
    padding: 12px 0 20px;
    background-color: #fff;
    border-radius: 6px;
    .close-btn {
      float: right;
      margin-right: 12px;
      width: 10px;
      height: 10px;
    }
    h1 {
      margin: 12px 0 24px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: #2861a5;
    }
    h2 {
      margin: 26px 0 20px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      color: #2861a5;
    }
    p {
      margin: 0;
      text-align: center;
      font-size: 28px;
      color: #20064a;
      letter-spacing: 2px;
    }
    .input {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      input {
        width: calc(100% - 140px);
        height: 36px;
        border-radius: 18px;
        background-color: #f9f8f9;
        border: 2px solid #d0cfd0;
        outline: none;
        padding: 0 14px;
      }
      button {
        width: 60px;
        height: 40px;
        border-radius: 18px;
        border-style: none;
        outline: none;
        background-color: #fb648c;
        color: #fff;
      }
    }
  }
}
</style>
