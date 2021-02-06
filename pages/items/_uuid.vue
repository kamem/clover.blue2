<template>
  <Content v-if="ITEM" :item="ITEM" />
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapState } from 'vuex'
import Content from '~/components/Content.vue'
import { generateDescription } from '~/utils/format.js'
import { jsonld } from '~/utils/const'

export default {
  components: {
    Content
  },
  scrollToTop: false,
  transition: {
    name: 'page',
    mode: ''
  },
  head() {
    return {
      title: this.ITEM.title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.TITLE },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.HOST}/items/${this.$route.params.uuid}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.DESCRIPTION
        }
      ]
    }
  },
  computed: {
    ITEM() {
      return (
        this.qiitaItem ||
        _.find(this.qiitaItems, { uuid: this.$route.params.uuid }) ||
        {}
      )
    },
    TITLE() {
      return `${this.ITEM.title} - ${process.env.TITLE}`
    },
    DESCRIPTION() {
      return generateDescription(this.ITEM.body || '')
    },
    ...mapState({
      qiitaItem: state => state.api.qiitaItem
    }),
    ...mapGetters({
      qiitaItems: 'api/qiitaItems'
    })
  },
  async fetch({ store, route }) {
    await store.dispatch('api/getQiitaItem', route.params.uuid)
  },
  jsonld() {
    return Object.assign({}, jsonld, {
      '@type': 'NewsArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://${process.env.TITLE}/items/${this.$route.params.uuid}`
      },
      headline: this.TITLE,
      description: this.DESCRIPTION,
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
