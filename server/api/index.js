import express from 'express'
import pages from './pages'

const app = express()

app.get('/test', (req, res) => {
  res.send('API server works fine')
})
pages.forEach(page => {
  app[page.method](page.url, page.complete)
})

export default {
  path: '/api',
  handler: app
}
