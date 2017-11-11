// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../src/main/webapp/banma/index.html'),
    assetsRoot: path.resolve(__dirname, '../src/main/webapp/banma/'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/banma/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  mock: {
    proxyTable: {
      '/mock': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/mock'
        }
      },
      '/partner': {
        target: 'https://mdev.insaic.com',
        changeOrigin: true,
        pathRewrite: {
          '^/partner': '/partner'
        }
      },
      '/auto': {
        target: 'https://mdev.insaic.com',
        changeOrigin: true,
        pathRewrite: {
          '^/auto': '/auto'
        }
      },
      '/ubi': {
        target: 'https://mdev.insaic.com',
        changeOrigin: true,
        pathRewrite: {
          '^/ubi': '/ubi'
        }
      },
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      }
    }
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/partner': {
        // target: 'https://mdev.insaic.com',
        // target: 'http://10.118.22.91:8020',
        target: 'http://112.65.104.117:7443',
        changeOrigin: true,
        pathRewrite: {
          '^/partner': '/partner'
        }
      },
      '/auto': {
        // target: 'https://mdev.insaic.com',
        // target: 'http://10.118.22.91:8020',
        target: 'http://112.65.104.117:7443',
        changeOrigin: true,
        pathRewrite: {
          '^/auto': '/auto'
        }
      },
      '/ubi': {
        // target: 'https://mdev.insaic.com',
        // target: 'http://10.118.22.91:8020',
        target: 'http://112.65.104.117:7443',
        changeOrigin: true,
        pathRewrite: {
          '^/ubi': '/ubi'
        }
      },
      '/auth': {
        // target: 'https://mdev.insaic.com',
        // target: 'http://10.118.22.91:8020',
        target: 'http://112.65.104.117:7443',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/product': {
        // target: 'https://mdev.insaic.com',
        // target: 'http://10.118.22.91:8020',
        target: 'http://112.65.104.117:7443',
        changeOrigin: true,
        pathRewrite: {
          '^/product': '/product'
        }
      },
      '/order': {
        // target: 'https://mdev.insaic.com',
        // target: 'http://10.118.22.91:8020',
        target: 'http://112.65.104.117:7443',
        changeOrigin: true,
        pathRewrite: {
          '^/order': '/order'
        }
      },
      '/vouchers': {
        // target: 'https://mdev.insaic.com',
        // target: 'http://10.118.22.91:8020',
        target: 'http://112.65.104.117:7443',
        changeOrigin: true,
        pathRewrite: {
          '^/vouchers': '/vouchers'
        }
      },
      '/staticpage': {
        // target: 'https://mdev.insaic.com',
        // target: 'http://10.118.22.91:8020',
        target: 'http://112.65.104.117:7443',
        changeOrigin: true,
        pathRewrite: {
          '^/staticpage': '/staticpage'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
