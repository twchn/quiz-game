<template>
  <transition name="slide-up">
    <div class="result-page">
      <router-link to="/">
        <img src="../../assets/icon/close.svg" class="back-btn" />
      </router-link>
      <img class="result-img" :src="iconSrc" alt="result">
      <h1 class="title">{{ title }}</h1>
      <p class="text">
        {{ text + '本场分数：' }}
        <span class="score">{{ score }}</span>
      </p>
      <BeginButton
        :propsStyle="{ backgroundColor: '#198cf9', color: '#fff' }"
        @click.native="play"
      >
        再玩一局
      </BeginButton>
      <BeginButton
        :propsStyle="{ backgroundColor: '#fd5b96', color: '#fff' }"
      >
        <router-link to="/share" class="btn">
          邀请好友
        </router-link>
      </BeginButton>
      <router-link to="/prize" class="tip">
        去首页查看我的奖金&nbsp;
        <Icon name="angle-right" class="icon" />
        <Icon name="angle-right" class="icon" />
      </router-link>
    </div>
  </transition>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import { mapState, mapMutations } from 'vuex';
import { PLAY_GAME } from '../../store/mutation-types';
import BeginButton from '../../components/BeginButton';
import successIcon from '../../assets/icon/success.svg';
import failIcon from '../../assets/icon/fail.svg';
import { playGame } from '../../api';

export default {
  name: 'ResultPage',
  components: {
    Icon,
    BeginButton
  },
  props: {
    result: Boolean, // true代表成功，false代表失败
    title: String,
    text: String,
    score: {
      type: Number,
      required: true
    }
  },
  computed: {
    iconSrc() {
      return this.result ? successIcon : failIcon;
    },
    ...mapState([
      'openid',
      'gameNumber',
      'practiceNumber',
      'previousGameMode'
    ])
  },
  methods: {
    play() {
      const type = this.previousGameMode;
      switch (type) {
        case 'normal':
          if (this.gameNumber[0] <= 0) {
            this.goHomeWithMessage('游戏次数不够，尝试填写邀请码吧！');
            return;
          }
          break;
        case 'practice':
          if (this.practiceNumber <= 0) {
            this.goHomeWithMessage('今日练习次数已用完，试试游戏模式吧！');
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
            this.goHomeWithMessage(res.data.msg);
          }
        })
        .catch(() => {
          this.goHomeWithMessage('抱歉，暂时无法答题');
        });
    },
    goHomeWithMessage(message) {
      this.$router.push({ name: 'HomePage', params: { message } });
    },
    ...mapMutations({
      commitPlayGame: PLAY_GAME
    })
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
