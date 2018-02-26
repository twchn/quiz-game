<template>
  <PopupModal>
    <img class="close-btn" @click="back" src="../../assets/icon/close.svg" alt="close">
    <div class="prize-container">
      <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
      <p class="user-name">用户某某某123</p>
      <p class="text">获得奖金</p>
      <p class="money">&yen;&nbsp;1.00</p>
      <h1 class="title">提现规则</h1>
      <ul class="rules">
        <li>截图本页发送到公众号 <strong>HUSTEI资委会</strong>（HUSTEIZW）后台</li>
        <li>工作人员与后台数据核对后会在48小时之内发送奖金</li>
        <li>由于微信权限限制，奖金会以支付宝口令红包的形式发送</li>
        <li>每人只有一次提现机会</li>
        <li>奖金兑换截止时间为2018年3月某日</li>
      </ul>
    </div>
  </PopupModal>
</template>

<script>
import PopupModal from '../PopupModal';

export default {
  name: 'PrizePage',
  components: {
    PopupModal
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
