<template>
  <ul class="list">
    <li v-for="{ title, uuid } in items" :key="uuid" class="list-item">
      <nuxt-link :to="`/${path}/${uuid}`">
        {{ title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.list {
  margin: 0 auto;
  max-width: var(--content--max-width);
}

.list-tags {
  text-align: right;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.3;
  opacity: 0.2;
  width: 180px;
  pointer-events: none;
  display: none;
}

.list-tag {
  display: inline-block;
  margin: 0 2px;
  padding: 0 8px;
  font-size: 10px;
  color: #fff;
  background-color: var(--main-color);
}

.list-item {
  list-style-type: none;
  line-height: 1.8;
  position: relative;
  padding-left: 30px;
  margin: 1px 0;
  &:before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: var(--main-color);
    display: block;
    position: absolute;
    top: 1.1em;
    left: 10px;
    margin: auto 0;
  }
  &:hover {
    .tags {
      opacity: 1;
    }
  }
  & a {
    margin-right: 3%;
    padding: 6px 0;
    display: inline-block;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 15px;
    letter-spacing: 0.05em;
    text-decoration: none;
    color: var(--text-color);
    &:hover {
      opacity: 0.6;
      .tags {
        opacity: 1;
      }
    }
  }
}
</style>
