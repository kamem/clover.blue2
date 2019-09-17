<template>
  <ul :class="['table-of-contents', `lebel${lebel}`]">
    <li
      v-for="content in tableOfContents"
      :key="content.id"
      class="table-of-content"
    >
      <a :href="`#${content.id}`">{{ content.title }}</a>
      <TableOfContents v-if="content.items" :tableOfContents="content.items" :lebel="lebel + 1" />
    </li>
  </ul>
</template>

<script>
import TableOfContents from '~/components/TableOfContents/TableOfContents.vue'

export default {
  name: 'TableOfContents',
  components: {
    TableOfContents
  },
  props: {
    tableOfContents: {
      type: Array,
      default: () => []
    },
    lebel: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.lebel0 {
  margin: 0 0 8px 0!important;
  margin-bottom: 24px;
  color: #666;
  box-sizing: border-box;
  padding: 8px !important;
  letter-spacing: 0;
  width: 190px;
  position: fixed;
  top: 200px;
  right: 0;
  bottom: 0;
  overflow: auto;
  z-index: 1;
  background-color: rgba(240, 240, 240, 0.3);
  @media all and (max-width: 1020px) {
    display: none;
  }
}
.table-of-contents {
  padding-bottom: 0;
}
.table-of-content {
  margin: 0 !important;
  padding: 2px 0 4px 0;
  list-style-type: none;
  line-height: 1.5;
  & .table-of-content {
    padding-bottom: 0;
    margin: 0 0 4px 8% !important;
  }
  & a {
    font-size: 11.5px;
    display: block;
    color: #999;
  }
  &:before {
    display: none !important;
  }
}
</style>
