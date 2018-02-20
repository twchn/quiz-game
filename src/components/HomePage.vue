<template>
  <main class="main">
    <button class="invite-code head-btn">填写邀请码</button>
    <button class="rank-list head-btn">排行榜&nbsp;&gt;</button>
    <section class="info-panel">  <!--中间的信息栏-->
      <img class="avatar" src="../assets/avatar.jpg" alt="头像">
      <div class="text-info">
        <div>
          <p class="title">剩余游戏次数</p>
          <p>1/5</p>
        </div>
        <div></div>
        <div>
          <p class="title">已获得奖金</p>
          <p>&yen;&nbsp;1.00</p>
        </div>
      </div>
      <!--三个按钮-->
      <button class="begin-btn practice-btn">
        <span class="border"></span>
        <span class="border">
          练习模式 (每天三次机会)
        </span>
      </button>
      <button class="begin-btn">
        <span class="border"></span>
        <span class="border">
          <img class="begin" src="../assets/begin.svg" alt="begin">
          开始答题
        </span>
      </button>
      <button class="begin-btn limit-time-btn">
        <span class="border"></span>
        <span class="border">
          <img class="limit-time-img" src="../assets/limit-time-answer.png" alt="begin">
          <span class="limit-time-intro">
            <span>定期开启</span>
            <span>十分钟限时答题</span>
          </span>
        </span>
      </button>
    </section>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  height: 69vh;
  background: url("../assets/background.png") no-repeat center center;
  background-size: 100% 100%;
  padding-top: 31vh;
  .head-btn {
    position: absolute;
    top: 24%;
    border-style: none;
    border-radius: calc(0.5em + 4px);
    padding: 4px 10px;
    font-size: 12px;
    outline: none;
  }
  .rank-list {
    left: 30%;
    background-color: #f9d74a;
  }
  .invite-code {
    right: 25%;
    background-color: #e5f0fa;
  }
  // 信息栏
  .info-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 88%;
    height: 80%;
    margin: auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    .avatar {
      margin-top: 18px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }
    // 剩余游戏次数和奖金
    .text-info {
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .title {
        font-size: 12px;
      }
      div p {
        text-align: center;
      }
      div:nth-child(2) {
        width: 1px;
        height: 1em;
        background-color: #eee;
      }
    }
    // 开始按钮
    .begin-btn {
      margin: 10px 10px;
      width: 150px;
      height: 32px;
      position: relative;
      border-style: none;
      background-color: #fff;
      .border {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 30px;
        border: 0.1em solid #00152c;
        border-radius: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      }
      .border:nth-child(1) {
        top: 4px;
        background-color: #4866f1;
      }
      .border:nth-child(2) {
        top: 0;
        background-color: #fff;
      }
      .begin {
        width: 16px;
        height: 16px;
        margin-right: 16px;
      }
    }
    .practice-btn {
      .border {
        font-size: 12px;
      }
    }
    .limit-time-btn {
      .border {
        width: 90%;
        padding: 0 5%;
        justify-content: space-around;
        color: #eee;
      }
      .border:nth-child(2) {
        background-color: #198cf9;
      }
      .limit-time-img {
        height: 100%;
      }
      .limit-time-intro {
        display: flex;
        flex-direction: column;
        line-height: 15px;
        font-size: 0.7em;
      }
    }
  }
}
</style>
