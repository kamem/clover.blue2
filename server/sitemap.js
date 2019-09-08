import _ from 'lodash'
import { getItems } from './api/api/Firestere'

export default async () => {
  const qiitaItems = await getItems('qiita')
  const dropboxItems = await getItems('dropbox_paper')
  const instagramItems = await getItems('instagram', 'created')

  const tags = _.chain([...qiitaItems, ...dropboxItems, ...instagramItems])
    .map('tags')
    .flatten()
    .uniq()
    .value()

  return [].concat(
    '/',
    'about',
    qiitaItems.map(item => ({
      url: `/items/${item.uuid}`,
      lastmod: new Date(item.updated * 1000)
    })),
    dropboxItems.map(item => ({
      url: `/doc/${item.uuid}`,
      lastmod: new Date(item.updated * 1000)
    })),
    instagramItems.map(item => ({
      url: `/p/${item.uuid}`,
      lastmod: new Date(item.created * 1000)
    })),
    tags.map(name => `tags/${name}`)
  )
}
