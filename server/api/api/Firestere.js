import _ from 'lodash'
import moment from 'moment'
import Promise from 'bluebird'

import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

const db = admin.firestore()
const format = 'YYYY年MM月DD日 HH:mm:ss'

const showError = err => console.error(err)

// 取得
export const getItem = (uuid = null, itemsName) => {
  const docRef = db.collection(itemsName).doc(uuid)
  return docRef
    .get()
    .then(doc => (doc.exists ? doc.data() : undefined))
    .catch(showError)
}
// 複数取得
export const getItems = (itemsName, orderBy = 'updated', sort = 'desc', where) => {
  let collection = db.collection(itemsName)

  if(where) {
    collection = collection.where(where.key, where.option, where.value)
  }
  
  return collection
    .orderBy(orderBy, sort)
    .get()
    .then(data => {
      const ary = []
      data.forEach(doc => {
        ary.push(doc.data())
      })
      return ary
    })
    .catch(showError)
}

// 作成・更新処理
export const saveEntry = (item, itemsName, message) => {
  const docRef = db.collection(itemsName).doc(item.uuid)
  return docRef
    .set(item, { merge: true })
    .then(() => message && console.info(message))
    .then(() => item)
    .catch(showError)
}

// 削除
export const removeItem = (item, itemsName) => {
  const docRef = db.collection(itemsName).doc(item.uuid)
  return docRef
    .delete()
    .then(() => {
      console.log('remove item!', item.uuid, item.title)
      return item
    })
    .catch(showError)
}

// 新規 or 変更箇所があったら データを更新するそれ以外はそのまま帰す
export const setItem = (item, itemsName) =>
  getItem(item.uuid, itemsName)
    .then((res = {}) => {
      const isCreated = !_.size(res)
      const contentName = `${item.uuid} ${item.title}`
      const message = isCreated
        ? `created item! ${contentName}`
        : `updated item! ${contentName}【${moment.unix(res.updated).format(format)} > ${moment.unix(item.updated).format(format)}】`

      if (!_.isEqual(res, item)) {
        return saveEntry(item, itemsName, message).then(data =>
          Object.assign({}, data, {
            [isCreated ? 'isCreated' : 'isUpdated']: true
          })
        )
      }
      console.info('nochange item!', item.uuid, item.title)
      return item
    })
    .catch(showError)

export const saveEntriesEvents = (items, itemsName) => {
  const saveEvents = _.map(items, item => setItem(item, itemsName))

  return Promise.all(saveEvents)
    .then(values => {
      const updatedEntries = _.chain(values)
        .filter(item => item && item.isUpdated)
        .map(item => {
          delete item.isUpdated
          return item
        })
        .value()
      const createdEntries = _.chain(values)
        .filter(item => item && item.isCreated)
        .map(item => {
          delete item.isCreated
          return item
        })
        .value()

      return [updatedEntries, createdEntries]
    })
    .catch(showError)
}

export const removeItems = (items, itemsName, target = 'uuid', where) =>
  getItems(itemsName, undefined, undefined, where)
    .then(data => {
      const ary = []

      data.forEach(doc => {
        if (!_.includes(_.map(items, target), doc[target])) {
          ary.push(removeItem(doc, itemsName))
        }
      })

      return Promise.all(ary).then(res => _.compact(res))
    })
    .catch(showError)
