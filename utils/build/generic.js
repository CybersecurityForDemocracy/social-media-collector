const { resolve } = require('path');

const insertEnvironmentVariables = require('../insertEnvironmentVariables');

const generic = ({
  buildTemplate,
  buildFolder,
  key,
  isFirefox,
  isChrome,
  isQA,
  isDebug,
  apiUrl,
  config
}, name, entry) => ({
  ...buildTemplate,
  name: `${key}-${name}`,
  entry: { [name]: entry },
  output: {
    path: resolve(__dirname, '..', '..', buildFolder, key, name),
    filename: 'bundle.js'
  },
  optimization: {
    // see https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    insertEnvironmentVariables({
      isFirefox,
      isChrome,
      isQA,
      isDebug,
      apiUrl,
      config
    })
  ]
})

module.exports = generic;
