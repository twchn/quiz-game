<template>
<div>
  <div v-if="loading" class="loading">
    <img src="../../assets/loading.gif" alt="loading">
    <p>加载中...</p>
  </div>
  <PromptBox v-show="showPrompt" :promptMessage="promptMessage" />
  <main class="main" :class="{ blur: whetherBlur}">
    <div class="mask"></div>
    <img
      @click="switchBackgroundMusic"
      class="music"
      :src="musicIconSrc"
      alt="music"
    />
    <router-link to="/invitation">
      <button class="invite-code head-btn">填写邀请码</button>
    </router-link>
    <router-link to="/rank">
      <button class="rank-list head-btn">排行榜&nbsp;<Icon name="angle-right" /></button>
    </router-link>
    <!--中间的信息栏-->
    <section class="info-panel">
      <img class="avatar" v-lazy="headImgUrl" alt="头像">
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
      <button class="begin-btn practice-btn" @click="practice">
        <span class="border"></span>
        <span class="border">
          练习模式 (每天三次机会)
        </span>
      </button>
      <button class="begin-btn" @click="playGame">
        <span class="border"></span>
        <span class="border">
          <img class="begin" src="../../assets/icon/begin.svg" alt="begin">
          开始答题
        </span>
      </button>
      <button class="begin-btn limit-time-btn" @click="playActivity">
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
          <p>&yen;&nbsp;{{ trailerPrize }}&nbsp;奖金</p>
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
  <router-view @showPromptBox="showPromptBox"></router-view>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Icon from 'vue-awesome/components/Icon';
import ScrollMessage from '../../components/ScrollMessage';
import PromptBox from '../../components/PromptBox';
import { getUserInfo, beginPlay, beginPractice, beginActivity } from '../../api';
import musicIcon from '../../assets/icon/background-music.svg';
import muteMusicIcon from '../../assets/icon/background-music-mute.svg';

export default {
  name: 'HomePage',
  data() {
    return {
      loading: false,
      showPrompt: false,
      whetherBlur: false,
      promptMessage: '',
      trailerTime: '',
      trailerPrize: 0,
      messages: []
    };
  },
  methods: {
    playGame() {
      if (this.gameNumber[0] <= 0) {
        this.showPromptBox('游戏次数不够，尝试填写邀请码吧！');
        return;
      }
      beginPlay({ openid: this.openid })
        .then((res) => {
          if (res.data.state) {
            this.$store.commit('PLAY_GAME');
            this.$router.push('/countdown');
          } else {
            this.showPromptBox('抱歉，暂时无法答题');
          }
        })
        .catch(() => {
          this.showPromptBox('抱歉，暂时无法答题');
        });
    },
    practice() {
      if (this.practiceNumber <= 0) {
        this.showPromptBox('今日练习次数已用完，试试游戏模式吧！');
        return;
      }
      beginPractice({ openid: this.openid })
        .then((res) => {
          if (res.data.state) {
            this.$store.commit('PRACTICE');
            this.$router.push('/countdown');
          } else {
            this.showPromptBox('抱歉，暂时无法答题');
          }
        })
        .catch(() => {
          this.showPromptBox('抱歉，暂时无法答题');
        });
    },
    playActivity() {
      beginActivity({ openid: this.openid })
        .then((res) => {
          if (res.data.state) {
            this.$router.push('/countdown');
          } else {
            this.showPromptBox('抱歉，暂时无法答题');
          }
        })
        .catch(() => {
          this.showPromptBox('抱歉，暂时无法答题');
        });
    },
    showPromptBox(msg) {
      if (msg === '') return;
      this.promptMessage = msg;
      this.showPrompt = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showPrompt = false;
      }, 2500);
    },
    judgeBlur() {
      this.whetherBlur = ['/invitation', '/share', '/prize'].indexOf(this.$route.path) > -1;
    },
    switchBackgroundMusic() {
      this.switchMusic();
      // 如果静音
      if (this.mute) {
        this.showPromptBox('音效已关闭');
      } else {
        this.showPromptBox('音效已开启');
      }
    },
    ...mapMutations({
      getCache: 'GET_CACHE',
      setUserInfo: 'SET_USER_INFO',
      switchMusic: 'SWITCH_MUSIC'
    })
  },
  computed: {
    musicIconSrc() {
      return this.mute ? muteMusicIcon : musicIcon;
    },
    ...mapState([
      'openid',
      'headImgUrl',
      'gameNumber',
      'practiceNumber',
      'prize',
      'mute'
    ])
  },
  watch: {
    $route() {
      this.judgeBlur();
    }
  },
  components: {
    Icon,
    ScrollMessage,
    PromptBox
  },
  created() {
    // 获取缓存
    this.getCache();
    // 避免刷新后失去背景模糊
    this.judgeBlur();
    getUserInfo().then(({ data }) => {
      this.setUserInfo(data);
      // this.headImgUrl = data.headImgUrl;
      // this.gameNumber = data.gameNumber;
      // this.prize = data.prize.toFixed(2);
      this.messages = data.messages;
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
