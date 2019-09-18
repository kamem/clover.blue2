import items from './items.json'
export default {
  get({ values }) {
    return [200, items]
  }
}
