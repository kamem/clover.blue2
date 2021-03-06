<template>
  <div class="container tag-name-page">
    <Tags :tags="TAGS" :active-id="$route.params.tagName" />
    <Entries
      v-for="entry in ENTRIES"
      v-if="entry.items.length"
      :key="entry.title"
      :title="entry.title"
    >
      <component
        :is="getListComponent(entry)"
        :items="entry.items"
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

export default {
  components: {
    Tags,
    List,
    Entries,
    Photos
  },
  transition: {
    name: 'page',
    mode: ''
  },
  head() {
    return { title: this.$route.params.tagName }
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
          items: this.filteredQiita,
          path: 'items'
        },
        {
          title: 'Paper',
          items: this.filteredDropboxItems,
          path: 'doc'
        },
        {
          title: 'Instagram',
          items: this.filteredInstagram,
          path: 'p',
          component: Photos
        }
      ]
    },

    filteredQiita() {
      return _.filter(this.qiitaItems, ({ tags }) =>
        _.includes(tags, this.$route.params.tagName)
      )
    },
    filteredDropboxItems() {
      return _.chain(this.dropboxItems)
        .filter(({ tags }) => _.includes(tags, this.$route.params.tagName))
        .sortBy(item => {
          if (this.$route.params.tagName === 'Javascript講座') {
            return parseInt(item.title.match(/[+-]?\d+/))
          }
        })
        .value()
    },
    filteredInstagram() {
      return _.filter(this.instagramItems, ({ tags }) =>
        _.includes(tags, this.$route.params.tagName)
      )
    },

    ...mapState({
      instagramItems: state => state.api.instagramItems
    }),
    ...mapGetters({
      qiitaItems: 'api/qiitaItems',
      dropboxItems: 'api/dropboxItems'
    })
  },
  methods: {
    getListComponent(entry) {
      return entry.component || List
    }
  }
}
</script>
