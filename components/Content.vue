<template>
  <article class="content">
    <h1 class="content-title">
      <slot name="title" />
      <span v-if="item">{{item.title}}</span>
    </h1>
    <dl v-if="item" class="content-data">
      <dt>Data</dt>
      <dd>{{UPDATED}}</dd>
      <dt>Tag</dt>
      <dd><Tags :tags="item.tags" class="none" /></dd>
    </dl>
    <div class="content-body" ref="content-body">
      <slot name="body" />
      <div v-if="item && !$slots.body" v-html="item.body" />
    </div>
  </article>
</template>

<script>
import moment from 'moment'
import Tags from '~/components/Tags.vue'

export default {
  components: {
    Tags,
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    UPDATED() {return moment.unix(this.item.updated || this.item.created).format('YYYY/MM/DD')}
  },
  methods: {
    prettyPrint() {
      const body = this.$refs['content-body']
      body.querySelectorAll('pre').forEach((pre) => {
        pre.setAttribute('class', 'prettyprint')
      })
      PR.prettyPrint()
    },
  },
  mounted() {
    this.prettyPrint()
  },
  watch: {
    item() {
    setTimeout(this.prettyPrint, 0)
    }
  }
}
</script>

<style scope>
.content {
  padding-bottom: 1px;
}

.content-title {
  margin: 0 auto 40px;
  padding: 64px 4%;
  color: var(--main-color);
  font-weight: normal;
  font-size: 32px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0,0,0,0.04);
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
</style>