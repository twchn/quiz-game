<template>
  <transition appear name="slide-fade">
    <div class="list-container">
      <header class="header">
        <router-link to="/">
          <img class="close-icon" src="../../assets/icon/close-white.svg" alt="close">
        </router-link>
        <h1 class="heading">排行榜</h1>
      </header>
      <div class="content">
        <nav>
          <button
            :class="{ active: rankingType === 'week' }"
            @click="rankingType = 'week'"
          >
            本周</button>
          <button
            :class="{ active: rankingType === 'total' }"
            @click="rankingType = 'total'"
          >
            总榜
          </button>
        </nav>
        <div class="top-list">
          <div
            class="top-list-box"
            v-for="(item, index) in rankingList"
            v-if="index <= 2"
            :key="item.userId"
          >
            <img class="avatar" v-lazy="item.headImgUrl" alt="avatar">
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
            :class="{ active: index +1 === rank }"
          >
            <span class="rank">{{ index + 1 }}</span>
            <img class="avatar" v-lazy="item.headImgUrl" alt="avatar">
            <div class="user-name">{{ item.nickname }}</div>
            <div class="score">{{ item.score }}分</div>
          </div>
        </div>
        <div class="self list">
          <div class="list-box">
            <span class="rank">{{ rank }}</span>
            <img class="avatar" v-lazy="headImgUrl" alt="avatar">
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
import { getRankingList } from '@/api';

export default {
  name: 'RankingList',
  data() {
    return {
      rankingType: 'week', // 排行榜类别，total为总榜，week为周榜
      rankingList: []
    };
  },
  computed: mapState([
    'nickname',
    'headImgUrl',
    'score',
    'rank'
  ]),
  watch: {
    rankingType(newType) {
      getRankingList({ type: newType })
        .then(({ data }) => {
          this.rankingList = data.rankingList;
        });
    }
  },
  created() {
    getRankingList({ type: this.rankingType })
      .then(({ data }) => {
        this.rankingList = data.rankingList;
      });
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
