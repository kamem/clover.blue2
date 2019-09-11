const server = process.env.NODE_ENV === 'development' ? 'server' : 'server_dist'
const create = require(`./${server}/feed`).default
const instagram = require(`./${server}/feed`).instagram
const routes = require(`./${server}/sitemap`).default

const feedCacheTime = 1000 * 60 * 15

const PORT = process.env.PORT || 1341

const HOST = {
  development: `http://localhost:${PORT}`,
  production: 'https://clover.blue'
}

const baseURL = HOST[process.env.NODE_ENV]

module.exports = {
  mode: 'universal',
  server: {
    port: PORT
  },
  serverMiddleware: [{ path: '/api', handler: `~/${server}/api/` }],
  env: {
    APP_ENV: process.env.NODE_ENV,
    TITLE: process.env.npm_package_name,
    DESCRIPTION: process.env.npm_package_description,
    AUTHOR_NAME: process.env.npm_package_author_name,
    HOST: baseURL
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s - ${process.env.npm_package_name}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { property: 'og:image', content: `${baseURL}/icons/512.png` }
    ],
    script: [{ src: '/prettify.js' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: '/feed.xml',
        title: 'Qiita And Paper'
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: '/instagram.xml',
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
  plugins: ['~/plugins/jsonld'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules:
    process.env.NODE_ENV !== 'development'
      ? [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
        ]
      : [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
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
      path: '/feed.xml', // The route to your feed.
      create,
      cacheTime: feedCacheTime, // How long should the feed be cached
      type: 'atom1' // Can be: rss2, atom1, json1
    },

    {
      path: '/instagram.xml',
      create: instagram,
      cacheTime: feedCacheTime,
      type: 'atom1'
    }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: baseURL,
    cacheTime: feedCacheTime,
    gzip: true,
    generate: false,
    exclude: [],
    routes
  },
  manifest: {
    name: process.env.npm_package_name,
    short_name: process.env.npm_package_name,
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
    Sitemap: `${baseURL}/sitemap.xml`
  }
}
