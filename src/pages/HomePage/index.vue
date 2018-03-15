<template>
<div>
  <PreloadImage
    :imgArr="imgArr"
  />
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
      <button class="rank-list head-btn">排行榜&nbsp;<Icon class="icon" name="angle-right" /></button>
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
      <BeginButton
        class="practice-btn"
        @click.native="play('practice')"
      >
        <span class="text">练习模式 (每天三次机会)</span>
      </BeginButton>
      <BeginButton
        class="normal-btn"
        @click.native="play('normal')"
      >
        <img class="begin" src="../../assets/icon/begin.svg" alt="begin">
        <span class="text">开始答题</span>
      </BeginButton>
      <BeginButton
        class="activity-btn"
        @click.native="play('activity')"
        :propsStyle="{ backgroundColor: '#198cf9' }"
      >
        <img class="activity-img" src="../../assets/activity.png" alt="begin">
        <span class="activity-intro">
          <span>定期开启</span>
          <span>十分钟限时答题</span>
        </span>
      </BeginButton>
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
  <router-view @showPromptBox="showPromptBox" />
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Icon from 'vue-awesome/components/Icon';
import ScrollMessage from '../../components/ScrollMessage';
import PromptBox from '../../components/PromptBox';
import BeginButton from '../../components/BeginButton';
import PreloadImage from '../../components/PreloadImage';
import { GET_CACHE, SET_USER_INFO, SWITCH_MUSIC, PLAY_GAME, END_GAME } from '../../store/mutation-types';
import { getUserInfo, playGame } from '../../api';
import musicIcon from '../../assets/icon/background-music.svg';
import muteMusicIcon from '../../assets/icon/background-music-mute.svg';
import imageList from './image-list';

export default {
  name: 'HomePage',
  data() {
    return {
      imgArr: imageList,
      showPrompt: false,
      whetherBlur: false,
      promptMessage: '',
      trailerTime: '',
      trailerPrize: 0,
      messages: []
    };
  },
  methods: {
    play(type) {
      switch (type) {
        case 'normal':
          if (this.gameNumber[0] <= 0) {
            this.showPromptBox('游戏次数不够，尝试填写邀请码吧！');
            return;
          }
          break;
        case 'practice':
          if (this.practiceNumber <= 0) {
            this.showPromptBox('今日练习次数已用完，试试游戏模式吧！');
            return;
          }
          break;
        case 'activity':
          break;
        default:
      }
      playGame({ openid: this.openid, type })
        .then((res) => {
          if (res.data.state) {
            this.commitPlayGame(type);
            this.$router.push('/countdown');
          } else {
            this.showPromptBox(res.data.msg);
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
    loadUserInfo() {
      getUserInfo().then(({ data }) => {
        this.setUserInfo(data);
        this.messages = data.messages;
        this.trailerPrize = data.trailer.prize || 0;
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
            this.trailerTime = `${trailerTime.getMonth() + 1 || 0}月${trailerTime.getDate() || 0}日 ${trailerTime.getHours() || 0}:${trailerTime.getMinutes() || 0}`;
        }
      });
    },
    ...mapMutations({
      getCache: GET_CACHE,
      setUserInfo: SET_USER_INFO,
      switchMusic: SWITCH_MUSIC,
      commitPlayGame: PLAY_GAME,
      endGame: END_GAME
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
    PromptBox,
    BeginButton,
    PreloadImage
  },
  created() {
    // 获取缓存
    this.getCache();
    // 避免刷新后失去背景模糊
    this.judgeBlur();
    this.loadUserInfo();
    // 防止后退回主页再次通过url进入答题页
    this.endGame();
    if (this.$route.params.message) {
      this.$nextTick(() => {
        this.showPromptBox(this.$route.params.message);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./style.scss"></style>
