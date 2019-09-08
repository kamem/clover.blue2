<template>
  <Content>
    <template v-if="error.statusCode === 404" slot="title"
      >"{{ error.statusCode }}"ページが見つかりません</template
    >
    <template v-else slot="title"
      >"{{ error.statusCode }}"エラーが発生しました</template
    >
  </Content>
</template>

<script>
import Content from '~/components/Content.vue'

export default {
  head() {
    return { title: this.error.statusCode }
  },
  components: {
    Content
  },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style></style>
