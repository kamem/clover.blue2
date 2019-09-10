import axios from 'axios'
const HOST = process.env.HOST

export const state = () => ({
  qiitaItems: [],
  dropboxItems: [],
  instagramItems: []
})

export const getters = {
  qiitaItems: (state) => state.qiitaItems
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
  }
}

export const actions = {
  async getQiita({ commit }) {
    const { data } = await axios.get(`${HOST}/api/qiita/items`)
    commit('QIITA_ITEMS', data)
  },
  async getDropbox({ commit }) {
    const { data } = await axios.get(`${HOST}/api/dropbox/items`)
    commit('DROPBOX_ITEMS', data)
  },
  async getInstagram({ commit }) {
    const { data } = await axios.get(`${HOST}/api/instagram/items`)
    commit('INSTAGRAM_ITEMS', data)
  }
}
