import URL from 'url-parse'
import siteConfig from './_siteConfig'
let url = false
if (process.env.URL && process.argv[2] === 'generate') {
  url = new URL(process.env.URL)
}

export const modules = [
  // Doc: https://axios.nuxtjs.org/usage
  '@nuxtjs/axios',
  '@nuxtjs/pwa',
  '@nuxtjs/eslint-module',
  '@nuxtjs/style-resources',
  'nuxt-fontawesome',
  'nuxt-responsive-loader'
]
if (siteConfig.googleAnalytics.on && siteConfig.googleAnalytics.id) {
  modules.push('@nuxtjs/google-analytics')
}

export const modulesSettings = {
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faTimes', 'faSearch', 'faEnvelope', 'faUser', 'faBriefcase']
      }
    ]
  },
  styleResources: {
    scss: ['./assets/scss/_vars.scss']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    https: url ? url.protocol === 'https:' : null,
    host: url ? url.hostname : null,
    port: url ? url.port : null
  },
  responsiveLoader: {
    name: 'uploads/[hash:7]-[width].[ext]',
    min: 640, // minimum image width generated
    max: 1800, // maximum image width generated
    steps: 4, // five sizes per image will be generated
    placeholder: false, // no placeholder will be generated
    quality: 65, // images are compressed with medium quality
    adapter: require('responsive-loader/sharp')
  },
  googleAnalytics: {
    id: siteConfig.googleAnalytics.id
  }
}
