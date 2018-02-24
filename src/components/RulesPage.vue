<template>
  <transition name="slide-fade">
    <div class="rules-container">
      <header class="header">
        <img class="close-icon" src="../assets/close.svg" alt="close" @click="back">
        <h1 class="heading">游戏规则</h1>
      </header>
      <div class="content">
        <div class="title">
          <img src="../assets/tips.svg" alt="tips">
          <h2>玩法介绍</h2>
        </div>
        <p class="details">
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
          这里是内容
        </p>
        <div class="title">
          <img src="../assets/question.svg" alt="question">
          <h2>常见问题</h2>
        </div>
        <p class="details">
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
          这里是内容<br>
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'RulesPage',
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
  transform: translateY(100%);
  opacity: 0;
}
.rules-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    .close-icon {
      position: absolute;
      left: 10px;
      width: 12px;
      height: 12px;
    }
    .heading {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: normal;
    }
  }
  .content {
    margin-top: 37px;
    height: calc(100vh - 37px);
    overflow: auto;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      h2 {
        margin: 0;
        font-size: 14px;
        font-weight: normal;
        color: #15277b;
      }
      img {
        margin: 8px;
        width: 30px;
        height: 30px;
      }
    }
    .details {
      margin: 6px 16px 12px;
      font-size: 12px;
      color: #555;
    }
  }
}
</style>
