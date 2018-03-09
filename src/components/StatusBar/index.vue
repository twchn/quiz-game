<template>
  <ul class="status-bar">
    <li
      class="number"
      :class="{ active: n === current, next: n === current + 1 }"
      v-for="n in count"
      :key="n"
    >
      {{ n }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'StatusBar',
  props: {
    count: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
