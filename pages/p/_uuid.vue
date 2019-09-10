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
  fetch,
  head() {
    return { title: this.ITEM.body }
  },
  components: {
    Content
  },
  computed: {
    ITEM() {
      const instagramItem =
        _.find(this.instagramItems, { uuid: this.$route.params.uuid }) || {}
      return instagramItem
    },
    ...mapState({
      instagramItems: state => state.api.instagramItems
    })
  },
  jsonld() {
    return Object.assign({}, jsonld, {
      '@type': 'ImageObject',
      caption: this.ITEM.body,
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
