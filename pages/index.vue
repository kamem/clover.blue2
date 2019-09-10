<template>
  <div class="container">
    <Tags :tags="TAGS" />
    <Entries v-for="entry in ENTRIES" :id="entry.title" :key="entry.title" :title="entry.title">
      <component
        :is="getListComponent(entry)"
        :items="entry.items.slice(0, entry.num)"
        :path="entry.path"
      />
    </Entries>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import Tags from '~/components/Tags.vue'
import List from '~/components/List.vue'
import Entries from '~/components/Entries.vue'
import Photos from '~/components/Photos.vue'
import { jsonld } from '~/utils/const'
import { fetch } from '~/utils/ssrFetch'

export default {
  fetch,
  head: {
    title: process.env.TITLE,
    titleTemplate: '',
    meta: [
      { hid:'og:title', property: 'og:title', content: process.env.TITLE },
      { hid:'og:type', property: 'og:type', content: 'website' },
      { hid:'og:url', property: 'og:url', content: process.env.HOST },
      { hid:'og:description', property: 'og:description', content: process.env.DESCRIPTION },
    ]
  },
  components: {
    Tags,
    List,
    Entries,
    Photos
  },
  computed: {
    TAGS() {
      return _.chain([
        ...this.qiitaItems,
        ...this.dropboxItems,
        ...this.instagramItems
      ])
        .map('tags')
        .flatten()
        .uniq()
        .value()
    },
    ENTRIES() {
      return [
        {
          title: 'Qiita',
          items: this.qiitaItems,
          path: 'items',
          num: 5
        },
        {
          title: 'Paper',
          items: this.dropboxItems,
          path: 'doc',
          num: 5
        },
        {
          title: 'Instagram',
          items: this.instagramItems,
          path: 'p',
          component: Photos,
          num: 6
        }
      ]
    },
    ...mapState({
      qiitaItems: state => state.api.qiitaItems,
      dropboxItems: state => state.api.dropboxItems,
      instagramItems: state => state.api.instagramItems
    })
  },
  methods: {
    getListComponent(entry) {
      return entry.component || List
    }
  },
  jsonld() {
    return jsonld
  }
}
</script>

<style scoped>
.container {
}
</style>
