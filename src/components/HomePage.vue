<template>
<div>
  <div v-if="loading" class="loading">
    <img src="../assets/loading.gif" alt="loading">
    <p>加载中...</p>
  </div>
  <main class="main" :class="{ blur: whetherBlur}">
    <div class="mask"></div>
    <router-link to="/invitation">
      <button class="invite-code head-btn" @click="blur">填写邀请码</button>
    </router-link>
    <button class="rank-list head-btn">排行榜&nbsp;&gt;</button>
    <!--中间的信息栏-->
    <section class="info-panel">
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
      <!--活动预告-->
      <div class="trailer">
        <div class="title">限时答题活动预告</div>
        <div class="content">
          <p>今天21:00</p>
          <div></div>
          <p>&yen;100&nbsp;奖金</p>
        </div>
      </div>
      <!--分割线-->
      <div class="divider"></div>
      <!--滚动消息-->
      <ScrollMessage class="message" :messages="messages" />
    </section>
    <div class="help">
      <Icon name="question-circle" class="help-icon" />
      <router-link to="/rules">游戏规则</router-link>
    </div>
  </main>
  <router-view></router-view>
</div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import ScrollMessage from './ScrollMessage';

export default {
  name: 'HomePage',
  data() {
    return {
      loading: false,
      whetherBlur: false,
      messages: ['提示：邀请一名好友获得一次游戏机会', '小技巧：所有答案都在资委手册微信小程序里哦~']
    };
  },
  components: {
    Icon,
    ScrollMessage
  },
  methods: {
    blur() {
      this.whetherBlur = true;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === '/invitation') {
        this.whetherBlur = true;
      }
      if (from.path === '/invitation') {
        this.whetherBlur = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  width: 100%;
  height: 69vh;
  background: url("../assets/background.png") no-repeat center center;
  background-size: 100% 100%;
  padding-top: 31vh;
  // 头部按钮
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
    position: relative;
    width: 88%;
    height: 400px;
    margin: auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    // 头像
    .avatar {
      margin-top: 14px;
      width: 48px;
      height: 48px;
      border-radius: 24px;
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
        color: #333;
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
      margin: 7px 0 13px;
      width: 150px;
      height: 32px;
      position: relative;
      border-style: none;
      background-color: #fff;
      outline: none;
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
    // 练习模式按钮
    .practice-btn {
      .border {
        font-size: 12px;
      }
    }
    // 限时答题按钮
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
    // 限时答题活动预告
    .trailer {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      /*justify-content: center;*/
      .title {
        font-size: 12px;
        color: #444;
      }
      .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        div {
          margin: 0 16px;
          width: 1px;
          height: 16px;
          background-color: #eee;
        }
        p {
          margin: 10px 0;
        }
      }
    }
    // 分割线
    .divider {
      position: absolute;
      bottom: 32px;
      width: 88%;
      height: 1px;
      background-color: #eee;
    }
    // 滚动消息
    .message {
      position: absolute;
      bottom: 0;
      height: 32px;
      font-size: 12px;
    }
  }
  // 游戏规则
  .help {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 15px;
    color: #fff;
    font-size: 12px;
    text-decoration: underline;
    display: flex;
    align-items: center;
    .help-icon {
      height: 12px;
    }
    a {
      color: #fff;
    }
  }
}
// 模糊
.blur {
  filter: blur(4px);
  .mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
}
// 加载动画
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
  color: #000;
}
</style>
