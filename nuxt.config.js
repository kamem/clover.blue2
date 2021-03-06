const server = process.env.NODE_ENV === 'development' ? 'server' : 'server_dist'
const create = require(`./${server}/feed`).default
const instagram = require(`./${server}/feed`).instagram
const routes = require(`./${server}/sitemap`).default
const pkg = require('./package.json')

const feedCacheTime = 1000 * 60 * 15

const PORT = process.env.PORT || 1341

const HOST = {
  development: `http://localhost:${PORT}`,
  production: pkg.host
}

const baseURL = HOST[process.env.NODE_ENV]

const dataAdClient = 'ca-pub-9059007378327558'

module.exports = {
  mode: 'universal',
  server: {
    port: PORT
  },
  serverMiddleware: [{ path: '/api', handler: `~/${server}/api/` }],
  env: {
    APP_ENV: process.env.NODE_ENV,
    TITLE: pkg.name,
    DESCRIPTION: pkg.description,
    AUTHOR_NAME: pkg.author,
    HOST: baseURL
  },
  router: {
    middleware: ['wwwRedirect']
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s - ${pkg.name}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary' },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description || ''
      },
      { property: 'og:image', content: `${baseURL}/icons/512.png` }
    ],
    script: [{ src: '/prettify.js' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: '/feed/weblog.xml',
        title: 'Qiita And Paper'
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: '/feed/photos.xml',
        title: 'Instagram'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
        integrity:
          'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/prettify.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://jmblog.github.io/color-themes-for-google-code-prettify/themes/github-v2.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=M+PLUS+1p'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3bbfce'
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/common.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/jsonld',
    { src: '~/plugins/youtube', ssr: false },
    { src: '~/plugins/touch-events', ssr: false }
  ].concat(process.env.MOCK ? '~/plugins/mock' : []),
  /*
   ** Nuxt.js dev-modules
   */
  buildModules:
    process.env.NODE_ENV !== 'development' ? ['@nuxtjs/eslint-module'] : [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    [
      '@nuxtjs/google-adsense',
      {
        id: dataAdClient
      }
    ],
    [
      '@nuxtjs/google-tag-manager',
      {
        id: 'GTM-M3V4J4L',
        pageTracking: true
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL,
    browserBaseURL: baseURL
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    postcss: {
      plugins: {
        'postcss-for': {},
        'postcss-extend': {},
        'postcss-each-variables': {},
        'postcss-each': {},
        'postcss-preset-env': {
          stage: 0
        }
      },
      preset: {
        autoprefixer: {}
      }
    }
  },
  generate: {
    routes: ['/about']
  },
  feed: [
    {
      path: '/feed/weblog.xml', // The route to your feed.
      create,
      cacheTime: feedCacheTime, // How long should the feed be cached
      type: 'rss2' // Can be: rss2, atom1, json1
    },

    {
      path: '/feed/photos.xml',
      create: instagram,
      cacheTime: feedCacheTime,
      type: 'rss2'
    }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: baseURL,
    cacheTime: feedCacheTime,
    generate: false,
    exclude: [],
    routes
  },
  manifest: {
    name: pkg.name,
    short_name: pkg.name,
    version: 1,
    icons: [
      {
        src: '/icons/48.png',
        type: 'image/png',
        sizes: '48x48'
      },
      {
        src: '/icons/96.png',
        type: 'image/png',
        sizes: '96x96'
      },
      {
        src: '/icons/192.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: '/icons/512.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ],
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#3bbfce',
    theme_color: '#3bbfce',
    description: 'とあるフロントエンドの技術日記',
    dir: 'ltr',
    lang: 'ja-jp',
    related_applications: [],
    prefer_related_applications: false
  },
  robots: {
    UserAgent: '*',
    Disallow: '/api/',
    Sitemap: `${baseURL}/sitemap.xml`
  }
}
