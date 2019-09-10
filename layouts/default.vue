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
import { mapActions } from 'vuex'
import Header from '../components/Header'

export default {
  components: {
    Header
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
