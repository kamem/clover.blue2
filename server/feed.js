import { getItems } from './api/api/Firestere'

const domain = `https://${process.env.npm_package_name}/`
const options = {
  title: process.env.npm_package_name,
  description: process.env.npm_package_description
}

const createFeedObject = (item, link) => {
  return {
    title: item.title,
    id: item.uuid,
    link,
    content: item.body,
    published: new Date(item.created * 1000),
    date: new Date(item.updated * 1000)
  }
}

export default async feed => {
  feed.options = Object.assign({}, options, {
    link: `${domain}feed/weblog.xml`
  })
  const qiitaItems = await getItems('qiita')
  qiitaItems.forEach(item => {
    feed.addItem(createFeedObject(item, `${domain}items/${item.uuid}`))
  })
  const dropboxItems = await getItems('dropbox_paper')
  dropboxItems.forEach(item => {
    feed.addItem(createFeedObject(item, `${domain}doc/${item.uuid}`))
  })

  feed.addCategory('blog')
  feed.addContributor({
    name: process.env.npm_package_author,
    link: domain
  })
}

export const instagram = async feed => {
  feed.options = Object.assign({}, options, {
    link: `${domain}feed/photos.xml`
  })
  const instagramItems = await getItems('instagram', 'created')

  instagramItems.forEach(item => {
    const link = `${domain}p/${item.uuid}`
    feed.addItem({
      title: item.body,
      id: item.uuid,
      link,
      content: `<figure><a href="${link}"><img src="${item.thumbnail}" /></a></figure>`,
      published: new Date(item.created * 1000),
      date: new Date(item.created * 1000)
    })
  })

  feed.addCategory('blog')
  feed.addContributor({
    name: process.env.npm_package_author,
    link: domain
  })
}
