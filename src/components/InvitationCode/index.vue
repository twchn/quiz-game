<template>
  <transition appear name="slide-fade">
    <div class="code-container" @click.self="goHome">
      <div class="modal">
        <router-link to="/">
          <img class="close-btn" src="../../assets/icon/close.svg" alt="close">
        </router-link>
        <h1>请输入邀请码</h1>
        <div class="input">
          <input
            v-model="filledCode"
            type="number"
            pattern="[0-9]"
            maxlength="6"
            min="0"
            max="999999"
            placeholder="6位邀请码"
            autofocus
          >
          <button
            :class="{ active: filledCode.length === 6}"
            @click="submitCode"
          >
            确定
          </button>
        </div>
        <h2>我的邀请码</h2>
        <p>{{ invitationCode }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import { invite } from '@/api';

export default {
  name: 'InvitationCode',
  computed: mapState([
    'invitationCode'
  ]),
  data() {
    return {
      filledCode: ''
    };
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    submitCode() {
      if (this.filledCode.length !== 6) return;
      invite({
        code: this.filledCode,
        openid: this.$store.state.openid
      })
        .then((res) => {
          if (res.data.state) {
            this.$emit('showPromptBox', '邀请成功！');
            this.$store.commit('INVITE');
            this.goHome();
          } else {
            this.$emit('showPromptBox', '邀请码无效！');
            this.goHome();
          }
        })
        .catch(() => {
          this.$emit('showPromptBox', '网络错误，请重试！');
          this.goHome();
        });
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
