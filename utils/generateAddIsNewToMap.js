import _ from 'lodash'

export const generateAddIsNewToMap = (items, visitedDate) => {
  return _.map(items, item => {
    return Object.assign({}, item, {
      isNew: item.updated > visitedDate
    })
  })
}
