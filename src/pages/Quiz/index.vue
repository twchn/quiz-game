<template>
  <main class="main">
    <header class="header"></header>
    <svg
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
  </main>
</template>

<script>
import { mapState } from 'vuex';
import CountdownTimer from '../../components/CountdownTimer';
import Option from '../../components/Option';
import { getQuestion } from '../../api';

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
      totalTime: 10, // 总共答题时间
      restTime: 10, // 剩余答题时间
      isAnswered: false,
      isRight: false, // 本题是否答对
      optionsInfo: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
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
        if (this.restTime === 0) {
          this.optionsInfo = [
            { selected: true },
            { selected: true },
            { selected: true },
            { selected: true }
          ];
          clearInterval(this.countdownInterval);
          return;
        }
        this.restTime -= 1;
      }, 1000);
    },
    // 展示问题
    showQuestion() {
      // 重置之前的数据
      this.resetData();
      // 获取题目
      getQuestion({ openid: this.openid }).then(({ data }) => {
        this.question = data;
        this.show = true;
        this.countdown();
      });
    },
    // 判断选择是否正确
    judgeResult(index) {
      if (this.isAnswered) {
        return;
      }
      if (this.question.questionTitle.length % this.question.questionOptions.length === index) {
        // 是否作答和是否答对同步更新
        this.isRight = true;
        this.$set(this.optionsInfo, index, {
          selected: true,
          state: true
        });
        // 答对暂停倒计时
        clearInterval(this.countdownInterval);
        // 播放动画后继续下一题
        setTimeout(() => {
          this.showQuestion();
        }, 1500);
      } else {
        this.$set(this.optionsInfo, index, {
          selected: true,
          state: false
        });
        // 答错则暂停出题和倒计时
        clearInterval(this.countdownInterval);
      }
    }
  },
  created() {
    this.showQuestion();
  },
  watch: {
    optionsInfo() {
      this.isAnswered = this.optionsInfo.some(element => element.selected);
    }
  },
  computed: mapState([
    'openid'
  ]),
  components: {
    CountdownTimer,
    Option
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
