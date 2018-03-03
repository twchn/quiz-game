<template>
<div>
  <div v-if="loading" class="loading">
    <img src="../../assets/loading.gif" alt="loading">
    <p>加载中...</p>
  </div>
  <PromptBox v-show="showPrompt" :promptMessage="promptMessage" />
  <main class="main" :class="{ blur: whetherBlur}">
    <div class="mask"></div>
    <router-link to="/invitation">
      <button class="invite-code head-btn">填写邀请码</button>
    </router-link>
    <router-link to="/rank">
      <button class="rank-list head-btn">排行榜&nbsp;<Icon name="angle-right" /></button>
    </router-link>
    <!--中间的信息栏-->
    <section class="info-panel">
      <img class="avatar" :src="headImgUrl" alt="头像">
      <div class="text-info">
        <div>
          <p class="title">剩余游戏次数</p>
          <router-link to="/share">
            <p class="content">
              {{ gameNumber[0] }}/{{ gameNumber[1] }}&nbsp;
              <Icon class="icon" name="angle-right" />
            </p>
          </router-link>
        </div>
        <div></div>
        <div>
          <p class="title">已获得奖金</p>
          <router-link to="prize">
            <p class="content">
              &yen;&nbsp;{{ prize }}&nbsp;
              <Icon class="icon" name="angle-right" />
            </p>
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
          <p>{{ trailerTime }}</p>
          <div></div>
          <p>&yen;{{ trailerPrize }}&nbsp;奖金</p>
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
import PromptBox from '../PromptBox';
import { getUserInfo } from '../../api';

export default {
  name: 'HomePage',
  data() {
    return {
      loading: false,
      showPrompt: false,
      whetherBlur: false,
      promptMessage: '',
      headImgUrl: '',
      gameNumber: [],
      prize: 0,
      trailerTime: '',
      trailerPrize: 0,
      messages: ['提示：邀请一名好友获得一次游戏机会', '小技巧：所有答案都在资委手册微信小程序里哦~', '限时答题答对者平分所有奖金']
    };
  },
  components: {
    Icon,
    ScrollMessage,
    PromptBox
  },
  methods: {
    showPromptBox(msg) {
      this.promptMessage = msg;
      this.showPrompt = true;
      setTimeout(() => {
        this.showPrompt = false;
      }, 2500);
    },
    judgeBlur() {
      this.whetherBlur = ['/invitation', '/share', '/prize'].indexOf(this.$route.path) > -1;
    }
  },
  watch: {
    $route() {
      this.judgeBlur();
    }
  },
  created() {
    // 避免刷新后失去背景模糊
    this.judgeBlur();
    getUserInfo().then(({ data }) => {
      this.messages = data.messages;
      this.headImgUrl = data.headImgUrl;
      this.gameNumber = data.gameNumber;
      this.prize = data.prize.toFixed(2);
      this.trailerPrize = data.trailer.prize;
      const trailerTime = new Date(data.trailer.time);
      const restDay = trailerTime.getDate() - new Date().getDate();
      switch (restDay) {
        case 0:
          this.trailerTime = `今天 ${trailerTime.getHours()}:${trailerTime.getMinutes()}`;
          break;
        case 1:
          this.trailerTime = `明天 ${trailerTime.getHours()}:${trailerTime.getMinutes()}`;
          break;
        case 2:
          this.trailerTime = `后天 ${trailerTime.getHours()}:${trailerTime.getMinutes()}`;
          break;
        default:
          this.trailerTime = `${trailerTime.getMonth() + 1}月${trailerTime.getDate()}日 ${trailerTime.getHours()}:${trailerTime.getMinutes()}`;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
