export const state = () => ({
  qiitaItems: [],
  dropboxItems: [],
  instagramItems: [],
  youtubeItems: []
})

export const getters = {
  qiitaItems: state => state.qiitaItems
}

export const mutations = {
  QIITA_ITEMS(state, data) {
    state.qiitaItems = data.items
  },
  DROPBOX_ITEMS(state, data) {
    state.dropboxItems = data.items
  },
  INSTAGRAM_ITEMS(state, data) {
    state.instagramItems = data.items
  },
  YOUTUBE_ITEMS(state, data) {
    state.youtubeItems = data.items
  }
}

export const actions = {
  async getQiita({ commit }) {
    const { data } = await this.$axios.get(`/api/qiita/items`)
    commit('QIITA_ITEMS', data)
  },
  async getDropbox({ commit }) {
    const { data } = await this.$axios.get(`/api/dropbox/items`)
    commit('DROPBOX_ITEMS', data)
  },
  async getInstagram({ commit }) {
    const { data } = await this.$axios.get(`/api/instagram/items`)
    commit('INSTAGRAM_ITEMS', data)
  },
  async getYoutube({ commit }) {
    const { data } = await this.$axios.get(`/api/youtube/items`)
    commit('YOUTUBE_ITEMS', data)
  }
}
