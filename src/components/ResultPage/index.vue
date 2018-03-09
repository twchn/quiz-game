<template>
  <div class="result-page">
    <Icon class="back-btn" name="angle-left" @click.native="goHome" />
    <img class="result-img" :src="iconSrc" alt="result">
    <h1 class="title">{{ title }}</h1>
    <p class="text">{{ message }}</p>
    <Button
      :propsStyle="{ backgroundColor: '#198cf9', color: '#fff' }"
    >
      再玩一局
    </Button>
    <Button
      :propsStyle="{ backgroundColor: '#fd5b96', color: '#fff' }"
    >
      <router-link to="/share" tag="span">
        邀请好友
      </router-link>
    </Button>
    <router-link to="/prize" class="tip">
      去查看我的奖金&nbsp;
      <Icon name="angle-right" />
      <Icon name="angle-right" />
    </router-link>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import Button from '../../components/Button';
import successIcon from '../../assets/icon/success.svg';
import failIcon from '../../assets/icon/fail.svg';

export default {
  name: 'ResultPage',
  components: {
    Icon,
    Button
  },
  props: {
    result: Boolean, // true代表成功，false代表失败
    title: String,
    message: String
  },
  computed: {
    iconSrc() {
      return this.result ? successIcon : failIcon;
    }
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
