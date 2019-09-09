<template>
  <Cards :cards="ALL_CARDS" theme="list" />
</template>

<script>
import Cards from '~/components/Card/Cards'
import { ALL_CARDS } from '~/utils/const'
// import createCards from '~/utils/card'

export default {
  head() {
    return { title: 'トランプ' }
  },
  components: {
    Cards
  },
  computed: {
    ALL_CARDS: () => ALL_CARDS
  }
}
</script>
