import mock0 from './api/dropbox/items'
import mock1 from './api/instagram/items'
import mock2 from './api/qiita/items'
import mock3 from './api/youtube/items'

export default [
  {
    path: '/api/dropbox/items',
    methods: mock0
  },
  {
    path: '/api/instagram/items',
    methods: mock1
  },
  {
    path: '/api/qiita/items',
    methods: mock2
  },
  {
    path: '/api/youtube/items',
    methods: mock3
  }
]
