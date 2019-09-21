import _ from 'lodash'
import { generateDescription } from '~/utils/format.js'

export const createTableOfContents = h => {
  const section = []
  _.each(h, (el, i) => {
    const lebel = parseInt(el.tagName.replace('H', ''))

    const h2LebelLatest = section[section.length - 1] || { items: [] }
    let h3LebelLatest = { items: [] }
    let h4LebelLatest = { items: [] }
    if (lebel === 2) {
      section.push({ el })
    } else if (lebel === 3) {
      h2LebelLatest.items = h2LebelLatest.items || []
      h2LebelLatest.items.push({ el })
    } else if (lebel === 4) {
      h2LebelLatest.items = h2LebelLatest.items || []
      h3LebelLatest = h2LebelLatest.items[h2LebelLatest.items.length - 1] || {}
      h3LebelLatest.items = h3LebelLatest.items || []
      h3LebelLatest.items.push({ el })
    } else if (lebel === 5) {
      h4LebelLatest = h3LebelLatest.items[h3LebelLatest.items.length - 1] || {}
      h4LebelLatest.items = h4LebelLatest.items || []
      h4LebelLatest.items.push({ el })
    } else if (lebel === 6) {
      const h5LebelLatest =
        h4LebelLatest.items[h4LebelLatest.items.length - 1] || {}
      h5LebelLatest.items = h5LebelLatest.items || []
      h5LebelLatest.items.push({ el })
    }
  })
  return createSection(section)
}

const createSection = (section, num) => {
  return _.map(section, (s, i) => {
    const item = {
      title: generateDescription(s.el.innerHTML),
      id: getId(s.el, num, i)
    }

    if (s.items) {
      item.items = createSection(s.items, i + 1)
    }

    return item
  })
}

const getId = (el, num, i) => {
  const childFirstContent = el.querySelector('*') || {}
  return el.id || childFirstContent.id || `#h${num ? `${num}_` : ''}${i + 1}`
}
