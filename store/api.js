import axios from 'axios'

export const state = () => ({
  qiitaItems: [],
  dropboxItems: [],
  instagramItems: []
})

export const mutations = {
  QIITA_ITEMS(state, data) {
    state.qiitaItems = data.items
  },
  DROPBOX_ITEMS(state, data) {
    state.dropboxItems = data.items
  },
  INSTAGRAM_ITEMS(state, data) {
    state.instagramItems = data.items
  }
}

export const actions = {
  async getQiita({ commit }) {
    const { data } = await axios.get('/api/qiita/items')
    commit('QIITA_ITEMS', data)
  },
  async getDropbox({ commit }) {
    const { data } = await axios.get('/api/dropbox/items')
    commit('DROPBOX_ITEMS', data)
  },
  async getInstagram({ commit }) {
    const { data } = await axios.get('/api/instagram/items')
    commit('INSTAGRAM_ITEMS', data)
  }
}
