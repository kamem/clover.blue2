import { generateAddIsNewToMap } from '../utils/generateAddIsNewToMap'

export const state = () => ({
  qiitaItem: {},
  dropboxItem: {},
  qiitaItems: [],
  dropboxItems: [],
  instagramItems: [],
  youtubeItems: []
})

export const getters = {
  qiitaItems: (state, getters, { common }) =>
    generateAddIsNewToMap(state.qiitaItems, parseInt(common.visitedDate)),
  dropboxItems: (state, getters, { common }) =>
    generateAddIsNewToMap(state.dropboxItems, parseInt(common.visitedDate))
}

export const mutations = {
  QIITA_ITEM(state, data) {
    state.qiitaItem = data.item
  },
  DROPBOX_ITEM(state, data) {
    state.dropboxItem = data.item
  },
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
  async getQiitaItem({ commit }, id) {
    const { data } = await this.$axios.get(`/api/qiita/item?id=${id}`)
    commit('QIITA_ITEM', data)
  },
  async getDropboxItem({ commit }, id) {
    const { data } = await this.$axios.get(`/api/dropbox/item?id=${id}`)
    commit('DROPBOX_ITEM', data)
  },
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
