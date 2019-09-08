import request from 'request'
import _ from 'lodash'
import moment from 'moment'
import Promise from 'bluebird'
import marked from 'marked'
import { generateResult } from '../utils/generateResult'
import * as Firestore from './Firestere'

const folderName = 'clover.blue'

export default class DropboxApi {
  constructor() {
    this.name = 'dropbox_paper'

    this.API_URI = 'https://api.dropboxapi.com/2/'
    this.API_KEY = ''
  }

  getFolderInfo(id) {
    const params = {
      url: `${this.API_URI}paper/docs/get_folder_info`,
      method: 'POST',
      json: true,
      followRedirect: false,
      headers: {
        Authorization: `Bearer ${this.API_KEY}`
      },
      body: {
        doc_id: id
      }
    }

    return new Promise((resolve, reject) => {
      request(params, (err, r, body) => {
        if (!err) {
          return resolve({ id, ...body })
        }
        console.error(err)
        reject(err)
      })
    })
  }

  getMetadata(id) {
    const params = {
      url: `${this.API_URI}paper/docs/get_metadata`,
      method: 'POST',
      json: true,
      followRedirect: false,
      headers: {
        Authorization: `Bearer ${this.API_KEY}`
      },
      body: {
        doc_id: id
      }
    }

    return new Promise((resolve, reject) => {
      request(params, (err, r, body) => {
        if (!err) {
          return resolve({ id, ...body })
        }
        console.error(err)
        reject(err)
      })
    })
  }

  downloadDoc(id, tags, metaData) {
    const params = {
      url: `${this.API_URI}paper/docs/download`,
      method: 'POST',
      json: true,
      followRedirect: false,
      headers: {
        Authorization: `Bearer ${this.API_KEY}`,
        'Dropbox-API-Arg': JSON.stringify({
          doc_id: id,
          export_format: 'markdown'
        })
      }
    }

    return new Promise((resolve, reject) => {
      request(params, (err, r, body) => {
        if (!err) {
          return resolve({
            id,
            headers: r.headers,
            metaData,
            body,
            tags
          })
        }
        console.error(err)
        reject(err)
      })
    })
  }

  fetchItems() {
    const params = {
      url: `${this.API_URI}paper/docs/list`,
      method: 'POST',
      json: true,
      followRedirect: false,
      headers: {
        Authorization: `Bearer ${this.API_KEY}`
      },
      body: {}
    }

    return new Promise((resolve, reject) => {
      request(params, (err, response, body) => {
        if (err) {
          console.error(err)
          reject(err)
        }

        const docsFolderInfo = Promise.map(body.doc_ids, id =>
          this.getFolderInfo(id)
        )

        const docsMetadata = Promise.map(body.doc_ids, id =>
          this.getMetadata(id)
        )

        Promise.all([docsFolderInfo, docsMetadata]).then(
          ([folderInfoValues, metadataValues]) => {
            const docsPromises = _.chain(folderInfoValues)
              .filter(({ folders }) => _.some(folders, { name: folderName }))
              .reject(
                ({ id }) =>
                  _.find(metadataValues, { id }).status['.tag'] === 'deleted'
              )
              .map(({ id, folders }) => {
                const tags = _.chain(folders)
                  .reject({ name: folderName })
                  .map('name')
                  .value()
                const metaData = _.find(metadataValues, { id })
                return this.downloadDoc(id, tags, metaData)
              })
              .value()

            Promise.all(docsPromises).then(values => {
              resolve(values)
            })
          }
        )
      })
    })
  }

  saveEntries() {
    return this.fetchItems()
      .then(responseBody => {
        const items = _.map(
          responseBody,
          ({
            id,
            headers: { 'dropbox-api-result': resilt },
            metaData: {
              created_date: created,
              last_updated_date: updated,
              owner: userId
            },
            body,
            tags
          }) => ({
            uuid: id,
            userId,
            created: moment(created).unix(),
            updated: moment(updated).unix(),
            title: JSON.parse(resilt).title,
            body: marked(
              body.replace(/^#.*\n/, '').replace(/\*\*(.+)\*\*/g, '### $1')
            ),
            tags
          })
        )

        return Promise.all([
          Firestore.saveEntriesEvents(items, this.name),
          Firestore.removeItems(items, this.name, undefined, {
            key: 'userId',
            option: '==',
            value: _.get(items, '[0].userId')
          })
        ]).then(values => generateResult(values))
      })
      .catch(err => {
        console.log(err)
      })
  }
}
