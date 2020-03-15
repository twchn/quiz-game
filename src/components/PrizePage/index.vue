<template>
  <PopupModal>
    <router-link to="/">
      <img class="close-btn" src="../../assets/icon/close.svg" alt="close">
    </router-link>
    <div class="prize-container">
      <img class="avatar" v-lazy="headImgUrl" alt="avatar">
      <p class="user-name">{{ nickname }}</p>
      <p class="text">获得奖金</p>
      <p class="money">&yen;&nbsp;{{ prize }}</p>
      <h1 class="title">提现规则</h1>
      <ul class="rules">
        <li>截图本页发送到公众号 <strong>公众号名称</strong>（公众号ID）后台</li>
        <li>工作人员与后台数据核对后会在48小时之内发送奖金</li>
        <li>由于微信权限限制，奖金会以支付宝口令红包的形式发送</li>
        <li>每人只有一次提现机会</li>
        <li>奖金兑换截止时间为2018年3月某日</li>
      </ul>
    </div>
  </PopupModal>
</template>

<script>
import { mapState } from 'vuex';
import PopupModal from '../PopupModal';

export default {
  name: 'PrizePage',
  components: {
    PopupModal
  },
  computed: mapState([
    'nickname',
    'headImgUrl',
    'prize'
  ])
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
