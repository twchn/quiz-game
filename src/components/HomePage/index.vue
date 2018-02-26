<template>
<div>
  <div v-if="loading" class="loading">
    <img src="../../assets/loading.gif" alt="loading">
    <p>加载中...</p>
  </div>
  <main class="main" :class="{ blur: whetherBlur}">
    <div class="mask"></div>
    <router-link to="/invitation">
      <button class="invite-code head-btn">填写邀请码</button>
    </router-link>
    <router-link to="/list">
      <button class="rank-list head-btn">排行榜&nbsp;<Icon name="angle-right" /></button>
    </router-link>
    <!--中间的信息栏-->
    <section class="info-panel">
      <img class="avatar" src="../../assets/avatar.jpg" alt="头像">
      <div class="text-info">
        <div>
          <p class="title">剩余游戏次数</p>
          <router-link to="/share">
            <p class="content">1/5&nbsp;<Icon class="icon" name="angle-right" /></p>
          </router-link>
        </div>
        <div></div>
        <div>
          <p class="title">已获得奖金</p>
          <router-link to="prize">
            <p class="content">&yen;&nbsp;1.00&nbsp;<Icon class="icon" name="angle-right" /></p>
          </router-link>
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
          <img class="begin" src="../../assets/icon/begin.svg" alt="begin">
          开始答题
        </span>
      </button>
      <button class="begin-btn limit-time-btn">
        <span class="border"></span>
        <span class="border">
          <img class="limit-time-img" src="../../assets/limit-time-answer.png" alt="begin">
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
import ScrollMessage from '../ScrollMessage';

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
  },
  watch: {
    $route() {
      this.whetherBlur = ['/invitation', '/share', '/prize'].indexOf(this.$route.path) > -1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
