<template>
  <ul class="tags">
    <li v-for="tagName in tags" :key="tagName" :class="{'tagName': true, active: activeId === tagName}">
      <nuxt-link :to="`/tags/${tagName}`">{{tagName}}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scope>
.tags:not(.none) {
  margin: 0 auto;
  max-width: var(--content--max-width);
  padding: calc(40px + 8px) 0 calc(40px - 8px);
  text-align: center;
}

.tagName {
  display: inline-block;
  margin-bottom: 8px;
  & a {
    font-size: 14px;
    color: #999;
    margin-right: 8px;
    display: inline-block;
    padding: 4px 10px;
    background-color: rgba(255,255,255, 0.8);
    text-decoration: none;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    transition-property: all;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;

    &:hover {
      opacity: 0.7;
    }
  }

  &:last-child a {
    margin-right: 0;
  }
}

.active a {
  background-color: var(--main-color);
  color: #fff;
}
</style>