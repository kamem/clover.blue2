<template>
  <div class="container">
    <Tags :tags="TAGS" />
    <Entries v-for="entry in ENTRIES" :key="entry.title" :title="entry.title">
      <component
        :is="getListComponent(entry)"
        :items="entry.items.slice(0, 8)"
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

export default {
  head() {
    return { title: process.env.TITLE, titleTemplate: '' }
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
          path: 'items'
        },
        {
          title: 'Paper',
          items: this.dropboxItems,
          path: 'doc'
        },
        {
          title: 'Instagram',
          items: this.instagramItems,
          path: 'p',
          component: Photos
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
