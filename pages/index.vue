<template>
  <div class="container index">
    <Tags :tags="TAGS" />
    <Entries
      v-for="entry in ENTRIES"
      :id="entry.title"
      :key="entry.title"
      :title="entry.title"
    >
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
import { mapState, mapGetters } from 'vuex'
import Tags from '~/components/Tags.vue'
import List from '~/components/List.vue'
import Entries from '~/components/Entries.vue'
import Photos from '~/components/Photos.vue'
import { jsonld } from '~/utils/const'
import { fetch } from '~/utils/ssrFetch'
import Field from '~/components/Form/Field.vue'
import SwitchButton from '~/components/Form/SwitchButton.vue'

export default {
  components: {
    Tags,
    List,
    Entries,
    Photos,
    SwitchButton,
    Field
  },
  data() {
    return {
      selected: true
    }
  },
  transition: {
    name: 'page',
    mode: ''
  },
  head: {
    title: process.env.TITLE,
    titleTemplate: '',
    meta: [
      { hid: 'og:title', property: 'og:title', content: process.env.TITLE },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.HOST },
      {
        hid: 'og:description',
        property: 'og:description',
        content: process.env.DESCRIPTION
      }
    ]
  },
  computed: {
    TAGS() {
      return _.chain([...this.qiitaItems, ...this.dropboxItems])
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
          title: 'Youtube',
          items: _.map(this.youtubeItems, data =>
            Object.assign({}, data, {
              thumbnail: data.thumbnails.standard.url
            })
          ),
          path: 'watch',
          component: Photos,
          num: 5
        }
      ]
    },
    ...mapState({
      instagramItems: state => state.api.instagramItems,
      youtubeItems: state => state.api.youtubeItems
    }),
    ...mapGetters({
      qiitaItems: 'api/qiitaItems',
      dropboxItems: 'api/dropboxItems'
    })
  },
  fetch,
  methods: {
    getListComponent(entry) {
      return entry.component || List
    },
    changeDarkMode() {
      this.selected = !this.selected
    }
  },
  jsonld() {
    return jsonld
  }
}
</script>
