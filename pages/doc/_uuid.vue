<template>
<Content v-if="ITEM" :item="ITEM" />
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import Content from '~/components/Content.vue'
import { generateDescription } from '~/utils/format.js'
import { jsonld } from '~/utils/const'

export default {
  head() {return { title: this.ITEM.title }},
  components: {
    Content,
  },
  computed: {
    ITEM() {
      return _.find(this.dropboxItems, { uuid: this.$route.params.uuid }) || {}
    },
    ...mapState({
      dropboxItems: state => state.api.dropboxItems,
    })
  },
  jsonld() {
    return Object.assign({}, jsonld, {
      "@type": "NewsArticle",
      "mainEntityOfPage":{
        "@type": "WebPage",
        "@id": `https://${process.env.TITLE}/doc/${this.$route.params.uuid}`
      },
      "headline": this.ITEM.title,
      "description": generateDescription(this.ITEM.body || ''),
      "datePublished": new Date(this.ITEM.created * 1000),
      "dateModified": new Date(this.ITEM.updated * 1000),
      "author": {
        "@type": "Person",
        "name": this.ITEM.userId,
      },
    })
  },
}
</script>