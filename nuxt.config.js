const axios = require('axios');
import shrinkRay from 'shrink-ray-current'

export default {
  // Target Deployment
  target: 'server',

  // SSR
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cms-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-LPQW2T7W2D',
        async: true
      },
      {
        hid: 'gtag',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LPQW2T7W2D');
        `,
        type: 'text/javascript',
        charset: 'utf-8'
      },
      // Other Scripts
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', async: true },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js', async: true },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.1.0/js/adminlte.min.js', async: true },
    ],
    __dangerouslyDisableSanitizersByTagID: {
      gtag: ['innerHTML']
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/fontawesome-free/css/all.min.css',
    '@/assets/css/adminlte.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/google-analytics.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://github.com/maulayyacyber/nuxt-vue-multiselect
    'nuxt-multiselect',
    // https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
    // Simple Usage
    ['nuxt-highlightjs', { style: 'obsidian' }],
    // sitemap
    '@nuxtjs/sitemap',
    // simple robots.txt
    '@nuxtjs/robots',
    // google tag manager
    '@nuxtjs/gtm',
    // nuxtImage
    '@nuxt/image',
    // nuxt-purge
    'nuxt-purgecss',
    // purge css
    // ['@fullhuman/postcss-purgecss', {
    //   content: ['./pages/**/*.vue', './layouts/**/*.vue', './components/**/*.vue'],
    //   safelist: ['html', 'body']
    // }]
  ],

  robots: {
    userAgent: '*',
    allow: '/'
  },

  // Sitemap Configuration
  sitemap: {
    hostname: 'https://www.pejuangpemrograman.com',
    cacheTime: 1,
    exclude: [
      '/admin/**',
      '/login'
    ],
    routes: async () => {
      let page = 1;
      let routes = ['/'];
      let hasMoreData = true;
      while (hasMoreData) {
        try {
          let response = await axios.get(`https://api.pejuangpemrograman.com/api/web/posts?page=${page}`);
          let data = response.data.data.data;

          if (data.length === 0) {
            hasMoreData = false;
            break;
          }

          data.forEach(post => {
            routes.push(`/post/${post.slug}`);
          });
        } catch (error) {
          console.error(error);
        }

        page++;
      }
      return routes;
    },
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },

  gtm: {
    id: 'GTM-N8TSDW59',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/api/admin/login', method: 'post' },
          logout: { url: '/api/admin/logout', method: 'post' },
          user: { url: '/api/admin/user', method: 'get' }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/admin/dashboard'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.pejuangpemrograman.com'
  },

  // purgecss
  purgeCSS: {
    mode: 'postcss', // You can choose 'webpack' or 'postcss' mode
    enabled: ({ isDev, isClient }) => (!isDev && isClient), // Enable in production mode
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js'
    ],
    styleExtensions: ['.css'],
    safelist: ['body', 'html', 'nuxt-progress'],
    extractors: [
      {
        extractor: content => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js']
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {
  //   extractCSS: true,
  //   optimizeCSS: true,
  //   splitChunks: {
  //     layouts: true,
  //     pages: true,
  //     commons: true
  //   },
  //   terser: {
  //     terserOptions: {
  //       compress: {
  //         drop_console: true,
  //       },
  //     },
  //   },
  //   transpile: ['bootstrap-vue'],
  //   babel: {
  //     compact: true,
  //   },
  //   middleware: [
  //     'compression'
  //   ],
  //   extend(config, { isDev, isClient }) {
  //     if (!isDev && isClient) {
  //       config.optimization.splitChunks.maxSize = 250000;
  //       config.plugins.push({
  //         resolve: 'compression-webpack-plugin',
  //         options: {
  //           algorithm: require('node-zopfli-es').brotliCompress,
  //           compressionOptions: { level: 11 },
  //           filename: '[path].br[query]',
  //           threshold: 10240,
  //           minRatio: 0.8
  //         }
  //       });
  //     }
  //   },
  // },
  build: {},
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    },
    compressor: shrinkRay()
  }
}
