<template>
  <section class="entry-item">
    <h2 class="entry-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.entry-item {
  max-width: calc(var(--content--max-width) + 7.5%);
  margin: 0 auto 24px;
  padding: 32px 0 40px;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
  &:last-child {
    margin-bottom: 0;
  }
}

.entry-title {
  display: block;
  font-size: 120px;
  font-weight: bold;
  color: #f5f5f5;
  position: absolute;
  bottom: -30px;
  line-height: 1;
  width: 100%;
}

.about {
  padding: 1px 0;
  box-sizing: border-box;
  height: 700px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
