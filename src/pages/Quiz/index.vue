<template>
  <main class="main">
    <header class="header"></header>
    <CountdownTimer
      class="clock"
      :rotateDeg="(totalTime - restTime) / totalTime * 360"
      :text="restTime.toString()"
    />
    <div class="background"></div>
    <transition name="slide">
      <div class="question" v-if="show">{{ questionTitle }}</div>
    </transition>
    <ul
      class="options"
    >
      <transition
        name="slide"
        v-for="(item, index) in questionOptions"
        :key="questionId + index"
      >
        <li
          v-if="show"
          @click.once="judgeResult(index, $event)"
        >
        {{ item.content }}
      </li>
      </transition>
    </ul>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import CountdownTimer from '../../components/CountdownTimer';
import { getQuestion } from '../../api';

export default {
  name: 'Quiz',
  data() {
    return {
      show: false,
      questionTitle: '',
      questionOptions: [],
      questionId: '',
      totalTime: 10,
      restTime: 10,
      isAnswered: false
    };
  },
  methods: {
    countdown() {
      clearInterval(this.countdownInterval);
      this.countdownInterval = setInterval(() => {
        if (this.restTime === 0) {
          clearInterval(this.countdownInterval);
          return;
        }
        this.restTime -= 1;
      }, 1000);
    },
    showQuestion() {
      getQuestion({ openid: this.openid }).then(({ data }) => {
        this.questionTitle = data.questionTitle;
        this.questionId = data.questionId;
        this.questionOptions = data.questionOptions;
        this.show = true;
        this.isAnswered = false;
        this.restTime = 10;
        this.countdown();
      });
    },
    judgeResult(index, event) {
      if (this.isAnswered) {
        return;
      }
      this.isAnswered = true;
      /* eslint no-param-reassign: ["error", { "props": false }] */
      if (this.questionTitle.length % this.questionOptions.length === index) {
        event.target.className = 'right';
      } else {
        event.target.className = 'wrong';
      }
    }
  },
  created() {
    this.showQuestion();
    this.questionInterval = setInterval(() => {
      this.show = false;
      this.showQuestion();
    }, 11000);
  },
  computed: mapState([
    'openid'
  ]),
  components: {
    CountdownTimer
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
