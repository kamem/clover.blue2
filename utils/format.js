import _ from 'lodash'
export const generateDescription = (str, num = 1) => {
  return _.compact(
    _.map((str).split('\n'), (value) => value.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''))
  )
  .slice(0, num)
  .join('')
}