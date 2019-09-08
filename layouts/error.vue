<template>
  <Content>
    <template slot="title" v-if="error.statusCode === 404">"{{error.statusCode}}"ページが見つかりません</template>
    <template slot="title" v-else>"{{error.statusCode}}"エラーが発生しました</template>
  </Content>
</template>

<script>
import Content from '~/components/Content.vue'

export default {
  head() {return { title: this.error.statusCode }},
  components: {
    Content,
  },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>
</style>
