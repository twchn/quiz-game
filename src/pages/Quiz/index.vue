<template>
  <main class="main">
    <header class="header"></header>
    <svg
      class="animation clock"
      v-if="isAnswered && isRight"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2">
      <circle
        class="path circle"
        fill="none"
        stroke="#73AF55"
        stroke-width="6"
        stroke-miterlimit="10"
        cx="65.1" cy="65.1"
        r="62.1"
      >
      </circle>
      <polyline
        class="path check"
        fill="none"
        stroke="#73AF55"
        stroke-width="10"
        stroke-linecap="round"
        stroke-miterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      >
      </polyline>
    </svg>
    <svg
      class="animation clock"
      v-else-if="isAnswered"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2">
      <circle
        class="path circle"
        fill="none"
        stroke="#D06079"
        stroke-width="6"
        stroke-miterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      >
      </circle>
      <line
        class="path line"
        fill="none"
        stroke="#D06079"
        stroke-width="10"
        stroke-linecap="round"
        stroke-miterlimit="10"
        x1="34.4"
        y1="37.9"
        x2="95.8"
        y2="92.3">
      </line>
      <line
        class="path line"
        fill="none"
        stroke="#D06079"
        stroke-width="10"
        stroke-linecap="round"
        stroke-miterlimit="10"
        x1="95.8"
        y1="38"
        x2="34.4"
        y2="92.2">
      </line>
    </svg>
    <CountdownTimer
      v-else
      class="clock"
      :rotateDeg="(totalTime - restTime) / totalTime * 360"
      :text="restTime"
    />
    <div class="background"></div>
    <transition name="slide">
      <div class="question" v-if="show">{{ question.questionTitle }}</div>
    </transition>
    <ul class="options">
      <Option
        v-if="show"
        v-for="(item, index) in question.questionOptions"
        :key="question.questionId + index"
        :optionsInfo="optionsInfo[index]"
        :rate="item.rate"
        @click.native.once="judgeResult(index)"
      >
        {{ item.content }}
      </Option>
    </ul>
    <StatusBar
      class="bottom-bar"
      :count="questionCount"
      :current="currentQuestion"
    />
    <ResultPage
      v-if="isEnd"
      :result="isRight"
      :title="showMessage.title"
      :text="showMessage.text"
      :score="totalScore"
    />
    <audio ref="timeout" src="../../assets/audio/timeout.wav">浏览器版本过低，请尽快升级</audio>
    <audio ref="wrong" src="../../assets/audio/wrong.mp3">浏览器版本过低，请尽快升级</audio>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { END_GAME } from '../../store/mutation-types';
import CountdownTimer from '../../components/CountdownTimer';
import Option from '../../components/Option';
import ResultPage from '../../components/ResultPage';
import StatusBar from '../../components/StatusBar';
import { getQuestion, getScore } from '../../api';

export default {
  name: 'Quiz',
  data() {
    return {
      show: false,
      question: {
        questionTitle: '',
        questionOptions: [],
        questionId: ''
      },
      questionCount: 10, // 总题数
      currentQuestion: 0, // 当前第几题
      totalTime: 10, // 总共答题时间
      restTime: 10, // 剩余答题时间
      isAnswered: false,
      isRight: false, // 本题是否答对
      isEnd: false, // 是否结束（全部答对或答错一题）
      optionsInfo: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      costTime: [], // 花费的时间，第一位开始时间，第二位结束时间
      totalScore: 0, // 总分
      showMessage: {}, // 要展示的消息
      successMessage: [
        {
          title: 'YOU WIN！！！',
          text: 'CHEERS, YOU GOT IT! '
        }, {
          title: '恭喜你，闯关成功！',
          text: '分享给好友，刷新奖金上限！'
        }, {
          title: '大吉大利，今晚吃鸡！',
          text: '什么时候我才能像你一样优秀！'
        }, {
          title: '恭喜你，闯关成功！',
          text: '一看你就是自带学神buff的人。'
        }
      ],
      failMessage: [
        {
          title: '很遗憾，闯关失败',
          text: '快去邀请好友，获得更多答题机会。'
        }, {
          title: '智者千虑，必有一失',
          text: '你已经很不错了，再加把劲！'
        }, {
          title: '很遗憾，闯关失败',
          text: '人不丑也要多读书！'
        }, {
          title: '很遗憾，闯关失败',
          text: '快去资助手册小程序里复习一波吧！'
        }, {
          title: '很遗憾，闯关失败',
          text: '每天都来练习模式练一练吧！'
        }
      ]
    };
  },
  methods: {
    // 重置数据
    resetData() {
      this.show = false;
      this.optionsInfo = [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ];
      this.isRight = false;
      this.restTime = 10;
    },
    // 倒计时
    countdown() {
      clearInterval(this.countdownInterval);
      this.countdownInterval = setInterval(() => {
        if (this.restTime === 1) {
          this.playAudio('timeout');
        }
        if (this.restTime === 0) {
          this.optionsInfo = [
            { selected: true },
            { selected: true },
            { selected: true },
            { selected: true }
          ];
          clearInterval(this.countdownInterval);
          this.showResult();
          return;
        }
        this.restTime -= 1;
      }, 1000);
    },
    showQuestion() {
      // 重置之前的数据
      this.resetData();
      // 获取题目
      getQuestion({ openid: this.openid, type: this.gameMode })
        .then(({ data }) => {
          this.currentQuestion += 1;
          this.question = data;
          this.show = true;
          this.countdown();
          // 开始计时
          this.costTime[0] = new Date().getTime();
        });
    },
    // 判断答案
    judgeAnswer(index) {
      return index === 3;
    },
    // 判断选择是否正确
    judgeResult(index) {
      if (this.isAnswered) return;
      this.costTime[1] = new Date().getTime();
      if (this.judgeAnswer(index)) {
        // 是否作答和是否答对同步更新
        this.isRight = true;
        this.$set(this.optionsInfo, index, {
          selected: true,
          state: true
        });
        this.computeScore();
        // 答对停止倒计时
        clearInterval(this.countdownInterval);
        // 判断结束或者进行下一题
        if (this.currentQuestion === this.questionCount) {
          // 播放动画后展示结果
          this.showResult();
        } else {
          // 播放动画后继续下一题
          setTimeout(() => {
            this.showQuestion();
          }, 1500);
        }
      } else {
        // 答错则停止倒计时
        clearInterval(this.countdownInterval);
        this.$set(this.optionsInfo, index, {
          selected: true,
          state: false
        });
        this.playAudio('wrong');
        this.showResult();
      }
    },
    // 计算分数，答对每少用一秒加10分，答错则不调用（得0分）
    computeScore() {
      getScore({ openid: this.openid, costTime: this.costTime })
        .then(({ data }) => {
          this.totalScore += data;
        });
      this.costTime = [];
    },
    showResult() {
      // 结束游戏
      this.endGame();
      // 播放动画后展示结果
      setTimeout(() => {
        // 随机获取提示文本
        this.getRandomMessage(this.isRight ? this.successMessage : this.failMessage);
        this.isEnd = true;
      }, 2000);
    },
    getRandomMessage(array) {
      this.showMessage = array[Math.floor(Math.random() * array.length)];
    },
    playAudio(type) {
      if (this.mute) return;
      switch (type) {
        case 'wrong':
          this.$refs.wrong.play();
          break;
        case 'timeout':
          this.$refs.timeout.play();
          break;
        default:
      }
    },
    ...mapMutations({
      endGame: END_GAME
    })
  },
  created() {
    // 避免直接通过url访问这个页面
    if (!this.gameMode) {
      this.$router.push('/');
    }
  },
  mounted() {
    this.showQuestion();
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
    this.endGame();
  },
  watch: {
    optionsInfo() {
      this.isAnswered = this.optionsInfo.some(element => element.selected);
    }
  },
  computed: mapState([
    'openid',
    'mute',
    'gameMode'
  ]),
  components: {
    CountdownTimer,
    Option,
    ResultPage,
    StatusBar
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
