<template>
  <div>
    <Header />
    <main>
      <nuxt />
    </main>
  </div>
</template>
<script>
import Promise from 'bluebird'
import { mapState, mapActions } from 'vuex'
import Header from '../components/Header'

export default {
  components: {
    Header
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      Promise.all([
        this.getQiita(),
        this.getDropbox(),
        this.getInstagram(),
      ]).then(() => this.$nuxt.$loading.finish())
    })
  },
  methods: {
    ...mapActions({
      getQiita: 'api/getQiita',
      getDropbox: 'api/getDropbox',
      getInstagram: 'api/getInstagram'
    })
  }
}
</script>

<style>
@import '../assets/css/common.css';
@import '../assets/css/_variables.css';
.container {
  position: relative;
  z-index: 0;
  padding-bottom: 56px;
}
</style>
