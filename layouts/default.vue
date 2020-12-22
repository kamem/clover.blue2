<template>
  <div>
    <Header />
    <main>
      <nuxt />
    </main>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import Header from '../components/Header'

export default {
  components: {
    Header
  },
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapState({
      mode: state => state.common.mode
    })
  },
  start() {
    this.loading = true
  },
  mounted() {
    if (process.client) {
      Promise.all([this.getQiita(), this.getDropbox(), this.getYoutube()]).then(
        () => {
          this.loading = false
        }
      )
    }

    this.changeVisitedDate(Math.floor(new Date().getTime() / 1000))
    this.changeMode(localStorage.mode)
  },
  methods: {
    ...mapActions({
      getQiita: 'api/getQiita',
      getDropbox: 'api/getDropbox',
      getYoutube: 'api/getYoutube',
      changeVisitedDate: 'common/changeVisitedDate',
      changeMode: 'common/changeMode'
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
  background-color: var(--main-bg-color);
}

.page-leave-active,
.page-enter-active {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

.page-leave-active + .page-enter-active {
  z-index: 1;
}

.tag-name-page.page-leave-active,
.tag-name-page.page-enter-active,
.index.page-leave-active,
.index.page-enter-active {
  transition-duration: 0.3s;
}
.tag-name-page.page-leave-active,
.index.page-leave-active {
  opacity: 0;
}

.content.page-leave-active {
  z-index: 999;
  animation: bounce-out 0.3s ease;
  & + .tag-name-page.page-enter-active {
    transition-duration: 0.3s;
  }
}

.content.page-enter-active {
  animation: bounce-in 0.3s ease;
}

@keyframes bounce-in {
  0% {
    transform: translateY(80px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes bounce-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(80px);
    opacity: 0;
  }
}
</style>
