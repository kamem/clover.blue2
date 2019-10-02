<template>
  <Content v-if="ITEM" :item="ITEM">
    <template slot="body">
      <youtube ref="youtube" class="video" :video-id="ITEM.videoId" />
      <noscript>
        <figure>
          <a
            :href="`https://youtube.com/watch?v=${ITEM.videoId}`"
            target="youtube"
            class="imgLink"
          >
            <img :src="ITEM.thumbnails.high.url" />
          </a>
        </figure>
      </noscript>
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
      title: this.ITEM.title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.TITLE },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.HOST}/watch/${this.$route.params.uuid}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.ITEM.thumbnails.standard.url
        },
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
      const youtubeItem =
        _.find(this.youtubeItems, { uuid: this.$route.params.uuid }) || {}
      return youtubeItem
    },
    TITLE() {
      return `${this.ITEM.title} - ${process.env.TITLE}`
    },
    ...mapState({
      youtubeItems: state => state.api.youtubeItems
    })
  },
  fetch,
  jsonld() {
    return Object.assign({}, jsonld, {
      '@type': 'ImageObject',
      caption: this.TITLE,
      representativeOfPage: 'http://schema.org/True',
      description: this.ITEM.description,
      mainEntityofPage: {
        '@type': 'ItemPage',
        '@id': `https://${process.env.TITLE}/watch/${this.$route.params.uuid}`
      },
      uploadDate: new Date(this.ITEM.created * 1000)
    })
  }
}
</script>

<style>
.video {
  width: 100%;
}
</style>
