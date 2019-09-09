<template>
  <ul :class="theme" @click="changeSelectedCards({ name: 'spede', num: 1 })">
    <Card
      v-for="{ mark, name, num } in cards"
      :ref="`card_${name}_${num}`"
      :key="`${name}${num}`"
      :mark="mark"
      :name="name"
      :num="num"
      :selected="selected(name, num)"
      @click="changeSelectedCards({ name, num })"
    />
  </ul>
</template>

<script>
import _ from 'lodash'
import Card from '~/components/Card/Card.vue'

export default {
  components: {
    Card
  },
  props: {
    cards: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedCards: []
    }
  },
  computed: {},
  methods: {
    selected(name, num) {
      return _.some(this.selectedCards, { name, num })
    },
    changeSelectedCards({ name, num }) {
      const isReject = this.selected(name, num)
      this.selectedCards = _.chain(this.selectedCards)
        [isReject ? 'reject' : 'concat']({ name, num })
        .value()
    }
  }
}
</script>

<style scoped>
.list {
  padding-top: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  margin: 8px;
}
</style>
