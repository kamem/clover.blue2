import { getItems } from './api/Firestere'

import Qiita from './api/Qiita'
import DropboxApi from './api/Dropbox'
import InstagramApi from './api/Instagram'
import YoutubeApi from './api/Youtube'
const qiita = new Qiita()
const dropbox = new DropboxApi()
const instagram = new InstagramApi()
const youtube = new YoutubeApi()

const qiitaRouter = (req, res) => {
  if (!req.query.api_key || !req.query.user_name) {
    return res.status(500).send('パラメーターが間違ってるよ')
  }

  qiita.API_KEY = req.query.api_key
  qiita.USER_NAME = req.query.user_name
  qiita
    .saveEntries()
    .then(values => {
      console.log('complated!!')
      res.json(values)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send('Something broke!')
    })
}
const dropboxRouter = (req, res) => {
  if (!req.query.api_key) {
    return res.status(400).send('パラメーターが間違ってるよ')
  }

  dropbox.API_KEY = req.query.api_key
  dropbox
    .saveEntries()
    .then(values => {
      console.log('complated!!')
      res.json(values)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send('Something broke!')
    })
}
const instagramRouter = (req, res) => {
  if (!req.query.api_key) {
    return res.status(400).send('パラメーターが間違ってるよ')
  }

  instagram.API_KEY = req.query.api_key
  instagram
    .saveEntries()
    .then(values => {
      console.log('complated!!')
      res.json(values)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send('Something broke!')
    })
}
const youtubeRouter = (req, res) => {
  if (!req.query.api_key || !req.query.channel_id) {
    return res.status(500).send('パラメーターが間違ってるよ')
  }
  youtube.API_KEY = req.query.api_key
  youtube.CHANNEL_ID = req.query.channel_id
  youtube.saveEntries()
  .then(values => {
    console.log('complated!!')
    res.json(values)
  })
  .catch(err => {
    console.log(err)
    return res.status(500).send('Something broke!')
  })
}

const pages = [
  {
    method: 'get',
    url: '/update/qiita',
    complete: qiitaRouter
  },
  {
    method: 'get',
    url: '/update/dropbox',
    complete: dropboxRouter
  },
  {
    method: 'get',
    url: '/update/instagram',
    complete: instagramRouter
  },
  {
    method: 'get',
    url: '/update/youtube',
    complete: youtubeRouter
  },
  {
    method: 'get',
    url: '/qiita/items',
    complete: async (req, res) => {
      res.json({
        items: await getItems('qiita')
      })
    }
  },
  {
    method: 'get',
    url: '/dropbox/items',
    complete: async (req, res) => {
      res.json({
        items: await getItems('dropbox_paper')
      })
    }
  },
  {
    method: 'get',
    url: '/instagram/items',
    complete: async (req, res) => {
      res.json({
        items: await getItems('instagram', 'created')
      })
    }
  },
  {
    method: 'get',
    url: '/youtube/items',
    complete: async (req, res) => {
      res.json({
        items: await getItems('youtube', 'created')
      })
    }
  }
]

export default pages
