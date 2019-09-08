import request from 'request'
import Promise from 'bluebird'
import _ from 'lodash'
import moment from 'moment'
import qs from 'qs'
import { generateResult } from '../utils/generateResult'
import * as Firestore from './Firestere'

export default class InstagramApi {
  constructor() {
    this.name = 'instagram'

    this.API_URI = 'https://api.instagram.com/v1/'
    this.API_KEY = ''
  }

  fetchItems() {
    const params = {
      url: `${this.API_URI}users/self/media/recent/?${qs.stringify({
        access_token: this.API_KEY
      })}`,
      method: 'GET'
    }

    return new Promise((resolve, reject) => {
      request(params, (err, response, body) => {
        if (!err && response.statusCode === 200) {
          return resolve(JSON.parse(body))
        }
        console.error(err)
        return reject(err)
      })
    })
  }

  saveEntries() {
    return this.fetchItems()
      .then(({ data }) => {
        if (!_.size(data)) {
          return
        }
        const items = _.map(
          data,
          ({
            link,
            caption,
            created_time: created,
            user: { username: userId },
            images: {
              low_resolution: {
                width: thumbnailWidth,
                height: thumbnailHeight,
                url: thumbnail
              },
              standard_resolution: {
                width: imgWidth,
                height: imgHeight,
                url: img
              }
            },
            tags
          }) => ({
            uuid: link.split('/')[4],
            userId,
            created: moment(parseInt(created, 10) * 1000).unix(),
            body: caption && caption.text,
            thumbnail,
            thumbnailWidth,
            thumbnailHeight,
            img,
            imgWidth,
            imgHeight,
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
        console.error(err)
      })
  }
}
