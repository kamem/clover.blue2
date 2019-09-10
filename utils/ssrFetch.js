export const fetch = async ({ store }) => {
  if (store.getters['api/qiitaItems'].length) {
      return
  }
  await Promise.all([
    store.dispatch('api/getQiita'),
    store.dispatch('api/getDropbox'),
    store.dispatch('api/getInstagram')
  ])
}
