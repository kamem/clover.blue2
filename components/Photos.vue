<template>
  <ul class="photos">
    <li v-for="{ thumbnail, uuid } in items" :key="uuid" class="photo">
      <nuxt-link :to="`/${path}/${uuid}`">
        <img :src="thumbnail" />
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
.photos {
  margin: 0 auto;
  max-width: var(--content--max-width);
  text-align: center;
  position: relative;
}

.photo {
  margin: 8px 8px 0 8px;
  width: 140px;
  display: inline-block;
  & img {
    width: 100%;
    display: block;
    border-radius: 4px;
  }

  & a {
    display: block;
    transition-property: all;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
