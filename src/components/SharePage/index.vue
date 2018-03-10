<template>
  <PopupModal>
    <router-link to="/">
      <img class="close-btn" src="../../assets/icon/close.svg" alt="close">
    </router-link>
    <p class="invitation-code">{{ invitationCode }}</p>
    <h1 class="title">邀请好友填写邀请码，获得游戏机会</h1>
    <ul class="rules">
      <li>填写好友邀请码或者向好友分享你的邀请码</li>
      <li>好友填写你的邀请码参与答题后，双方均获得一次游戏机会</li>
      <li>每人每天邀请的人数没有限制</li>
    </ul>
    <div class="share-btns">
      <div class="icon">
        <img src="../../assets/icon/wechat.svg" alt="wechat">
      </div>
      <div class="icon">
        <img src="../../assets/icon/friendster.svg" alt="friendster">
      </div>
    </div>
  </PopupModal>
</template>

<script>
import { mapState } from 'vuex';
import PopupModal from '../PopupModal';

export default {
  name: 'SharePage',
  components: {
    PopupModal
  },
  computed: mapState([
    'invitationCode'
  ])
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
