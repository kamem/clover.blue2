import request from 'request'
import Promise from 'bluebird'
import _ from 'lodash'
import moment from 'moment'
import qs from 'qs'
import { generateResult } from '../utils/generateResult'
import * as Firestore from './Firestere'

export default class YoutubeApi {
  constructor() {
    this.name = 'youtube'

    this.API_URI = 'https://www.googleapis.com/youtube/v3'
    this.API_KEY = ''
    this.CHANNEL_ID = ''
  }

  getChannel() {
    const params = {
      url: `${this.API_URI}/channels/?${qs.stringify({
        id: this.CHANNEL_ID,
        key: this.API_KEY,
        part: 'contentDetails'
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

  async fetchItems() {
    const data = await this.getChannel()
    const params = {
      url: `${this.API_URI}/playlistItems/?${qs.stringify({
        playlistId: data.items[0].contentDetails.relatedPlaylists.uploads,
        key: this.API_KEY,
        part: 'snippet',
        maxResults: 50
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
      .then(responseBody => {
        if (!_.size(responseBody)) {
          return
        }
        const items = _.map(
          responseBody.items,
          ({
            id: uuid,
            snippet: {
              channelId,
              channelTitle,
              description,
              publishedAt: created,
              title,
              thumbnails,
              resourceId: {
                videoId
              }
            }
          }) => ({
            uuid,
            channelId,
            channelTitle,
            description,
            created: moment(created).unix(),
            title,
            videoId,
            thumbnails,
          })
        )

        return Promise.all([
          Firestore.saveEntriesEvents(items, this.name),
          Firestore.removeItems(items, this.name, undefined, {
            key: 'channelId',
            option: '==',
            value: _.get(items, '[0].channelId')
          })
        ]).then(values => generateResult(values))
      })
      .catch(err => {
        console.error(err)
      })
  }
}
