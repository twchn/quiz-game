<template>
  <transition name="slide-fade">
    <div class="list-container">
      <header class="header">
        <img class="close-icon" src="../../assets/icon/close-white.svg" alt="close" @click="back">
        <h1 class="heading">排行榜</h1>
      </header>
      <div class="content">
        <nav>
          <button class="active">本周</button>
          <button>总榜</button>
        </nav>
        <div class="top-list">
          <div class="top-list-box">
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <p class="user-name">用户一</p>
            <p class="score">320分</p>
          </div>
          <div class="top-list-box">
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <p class="user-name">用户二</p>
            <p class="score">320分</p>
          </div>
          <div class="top-list-box">
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <p class="user-name">用户三</p>
            <p class="score">320分</p>
          </div>
        </div>
        <div class="list">
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">4</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
          <div class="list-box">
            <span class="rank">999</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">123分</div>
          </div>
        </div>
        <div class="self list">
          <div class="list-box">
            <span class="rank">520</span>
            <img class="avatar" src="../../assets/avatar.jpg" alt="avatar">
            <div class="user-name">手机用户123412342</div>
            <div class="score">88分</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'RankingList',
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
