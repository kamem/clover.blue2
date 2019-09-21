<template>
  <Content v-if="ITEM" :item="ITEM">
    <template slot="title">
      {{ ITEM.body }}
    </template>
    <template slot="body">
      <p>
        <img :src="ITEM.img" />
      </p>
    </template>
  </Content>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import Content from '~/components/Content.vue'
import { jsonld } from '~/utils/const'
import { fetch } from '~/utils/ssrFetch'

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
      title: this.ITEM.body,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.TITLE },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.HOST}/p/${this.$route.params.uuid}`
        },
        { hid: 'og:image', property: 'og:image', content: this.ITEM.img },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.TITLE
        }
      ]
    }
  },
  computed: {
    ITEM() {
      const instagramItem =
        _.find(this.instagramItems, { uuid: this.$route.params.uuid }) || {}
      return instagramItem
    },
    TITLE() {
      return `${this.ITEM.body} - ${process.env.TITLE}`
    },
    ...mapState({
      instagramItems: state => state.api.instagramItems
    })
  },
  fetch,
  jsonld() {
    return Object.assign({}, jsonld, {
      '@type': 'ImageObject',
      caption: this.TITLE,
      representativeOfPage: 'http://schema.org/True',
      description: this.ITEM.body,
      mainEntityofPage: {
        '@type': 'ItemPage',
        '@id': `https://${process.env.TITLE}/p/${this.$route.params.uuid}`
      },
      uploadDate: new Date(this.ITEM.created * 1000)
    })
  }
}
</script>
