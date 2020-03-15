<template>
  <div class="loading-mask" v-if="show">
    <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
    <p>加载中...</p>
    <p>{{ percentage }}%</p>
  </div>
</template>

<script>
export default {
  name: 'PreloadImage',
  data() {
    return {
      loadedCount: 0,
      show: true
    };
  },
  methods: {
    // 无序加载图片
    unorderedPreload() {
      const imagesContext = require.context('@/assets/', true, /\.(png|jpeg|jpg|gif)$/);
      this.imgArr = imagesContext.keys().map(imagesContext);
      this.imgArr.forEach((imgUrl) => {
        const imgObj = new Image();
        imgObj.addEventListener('load', this.imageLoaded);
        imgObj.addEventListener('error', this.imageLoaded);
        imgObj.src = imgUrl;
      });
    },
    // 加载完成后执行的回调
    imageLoaded() {
      this.loadedCount += 1;
      if (this.loadedCount >= this.imgArr.length) {
        this.show = false;
      }
    }
  },
  computed: {
    percentage() {
      return Math.round((this.loadedCount / this.imgArr.length) * 100);
    }
  },
  created() {
    this.unorderedPreload();
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
