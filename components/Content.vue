<template>
  <article class="content">
    <h1 class="content-title">
      <slot name="title" />
      <span v-if="item">{{ item.title }}</span>
    </h1>
    <dl v-if="item" class="content-data">
      <dt>Data</dt>
      <dd>{{ UPDATED }}</dd>
      <dt>Tag</dt>
      <dd><Tags :tags="item.tags" class="none" /></dd>
    </dl>
    <div ref="content-body" class="content-body">
      <TableOfContents
        v-if="tableOfContents"
        :table-of-contents="tableOfContents"
      />
      <slot name="body" />
      <div v-if="item && !$slots.body" v-html="item.body" />
      <adsbygoogle
        ad-slot="9719828766"
        ad-format="auto"
        full-width-responsive="true"
      />
    </div>
  </article>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import Tags from '~/components/Tags.vue'
import TableOfContents from '~/components/TableOfContents/TableOfContents.vue'
import { createTableOfContents } from '~/utils/createTableOfContents'

export default {
  components: {
    Tags,
    TableOfContents
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableOfContents: undefined
    }
  },
  computed: {
    UPDATED() {
      return moment
        .unix(this.item.updated || this.item.created)
        .format('YYYY/MM/DD')
    }
  },
  watch: {
    item() {
      setTimeout(this.prettyPrint, 0)
    }
  },
  mounted() {
    this.prettyPrint()
    const body = this.$refs['content-body']
    const h = body.querySelectorAll('h2,h3,h4,h5,h6')
    this.tableOfContents = _.size(h) && createTableOfContents(h)
  },
  methods: {
    prettyPrint() {
      const body = this.$refs['content-body']
      body.querySelectorAll('pre').forEach(pre => {
        pre.setAttribute('class', 'prettyprint')
      })
      PR.prettyPrint()
    }
  }
}
</script>

<style scoped>
.content {
  padding-bottom: 1px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background-color: var(--main-bg-color);
}

.content-title {
  margin: 0 auto 40px;
  padding: 64px 4%;
  color: var(--main-color);
  font-weight: normal;
  font-size: 32px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.content-data {
  padding: 8px 4%;
  margin: 0 auto;
  position: relative;
  height: 0;
  top: -80px;
  margin-top: -16px;
  text-align: center;
  font-size: 12px;
  color: #999;
  max-width: var(--content--max-width);
  & dt,
  & dd {
    display: inline-block;
  }

  & dt {
    display: none;
    margin-right: 8px;
  }

  & dd {
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }
  }
}

.adsbygoogle {
  margin-bottom: 16px;
  width: 100%;
  overflow: auto;
}
</style>
