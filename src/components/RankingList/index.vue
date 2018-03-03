<template>
  <transition name="slide-fade">
    <div class="list-container">
      <header class="header">
        <img class="close-icon" src="../../assets/icon/close-white.svg" alt="close" @click="goHome">
        <h1 class="heading">排行榜</h1>
      </header>
      <div class="content">
        <nav>
          <button>本周</button>
          <button class="active">总榜</button>
        </nav>
        <div class="top-list">
          <div
            class="top-list-box"
            v-for="(item, index) in rankingList"
            v-if="index <= 2"
            :key="item.userId"
          >
            <img class="avatar" :src="item.headImgUrl" alt="avatar">
            <p class="user-name">{{ item.nickname }}</p>
            <p class="score">{{ item.score }}分</p>
          </div>
        </div>
        <div class="list">
          <div
            class="list-box"
            v-for="(item, index) in rankingList"
            v-if="index > 2"
            :key="item.userId"
          >
            <span class="rank">{{ index + 1 }}</span>
            <img class="avatar" :src="item.headImgUrl" alt="avatar">
            <div class="user-name">{{ item.nickname }}</div>
            <div class="score">{{ item.score }}分</div>
          </div>
        </div>
        <div class="self list">
          <div class="list-box">
            <span class="rank">{{ rank }}</span>
            <img class="avatar" :src="headImgUrl" alt="avatar">
            <div class="user-name">{{ nickname }}</div>
            <div class="score">{{ score }}分</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import { getRankingList } from '../../api';

export default {
  name: 'RankingList',
  data() {
    return {
      rankingList: []
    };
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  },
  computed: mapState([
    'nickname',
    'headImgUrl',
    'score',
    'rank'
  ]),
  created() {
    getRankingList().then(({ data }) => {
      this.rankingList = data.rankingList;
    });
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
