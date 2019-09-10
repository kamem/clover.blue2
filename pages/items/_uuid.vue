<template>
  <Content v-if="ITEM" :item="ITEM" />
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import Content from '~/components/Content.vue'
import { generateDescription } from '~/utils/format.js'
import { jsonld } from '~/utils/const'
import { fetch } from '~/utils/ssrFetch'

export default {
  fetch,
  head() {
    return { title: this.ITEM.title }
  },
  components: {
    Content
  },
  computed: {
    ITEM() {
      return _.find(this.qiitaItems, { uuid: this.$route.params.uuid }) || {}
    },
    ...mapState({
      qiitaItems: state => state.api.qiitaItems
    })
  },
  jsonld() {
    return Object.assign({}, jsonld, {
      '@type': 'NewsArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://${process.env.TITLE}/items/${this.$route.params.uuid}`
      },
      headline: this.ITEM.title,
      description: generateDescription(this.ITEM.body || ''),
      datePublished: new Date(this.ITEM.created * 1000),
      dateModified: new Date(this.ITEM.updated * 1000),
      author: {
        '@type': 'Person',
        name: this.ITEM.userId
      }
    })
  }
}
</script>
