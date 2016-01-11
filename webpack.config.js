var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');

/**
 * Get configuration for Webpack.
 *
 * @param {boolean} production True if configuration is intended to be used in
 * production mode, false otherwise
 * @return {object} Webpack configuration
 */
module.exports = function(production) {
  var babelCachePath = path.join(__dirname, '.babel-cache');

  // Ensure babel-cache exists.
  if (!fs.existsSync(babelCachePath)) {
    fs.mkdirSync(babelCachePath);
  }

  var config = {
    entry: {
      app: [
        './src/app.js'
      ]
    },

    output: {
      filename: '[name].js',
      publicPath: '/'
    },

    cache: false,
    debug: false,
    devtool: false,

    plugins: [
    ],

    resolve: {
      extensions: ['', '.js', '.json'],
      root: __dirname,
      alias: {
      }
    },

    module: {
      noParse: [
      ],

      preLoaders: [
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules|bower_components/,
        //   loader: 'eslint-loader'
        // }
      ],

      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            cacheDirectory: babelCachePath,
            presets: ['es2015'],
            plugins: [
              'angular2-annotations',
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-flow-strip-types'
            ]
          }
        },
        {
          test: /\.gif/,
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        },
        {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        },
        {
          test: /\.png/,
          loader: 'url-loader?limit=10000&mimetype=image/png'
        },
        {
          test: /\.svg/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        },
        {
          test: /\.html/,
          loader: 'raw-loader'
          // loader: 'html?minimize=false'
        }
      ]
    }
  };

  var cssLoaders = [
    'style-loader',
    'css-loader',
    'autoprefixer-loader?browsers=last 1 version'
  ];

  if (production === false) {
    config.entry.app.unshift('webpack/hot/dev-server');

    config.cache = true;
    config.debug = true;
    config.devtool = 'eval-sourcemap';

    config.output.path = path.join(__dirname, './src');
    config.output.publicPath = '/';

    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({'__DEV__': true}),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]);

    config.module.loaders = config.module.loaders.concat([
      {
        test: /\.css$/,
        loader: cssLoaders.join('!')
      },
      {
        test: /\.less$/,
        loader: cssLoaders.concat('less-loader').join('!')
      }
    ]);
  }

  if (production === true) {
    config.output.path = path.join(__dirname, './dist');

    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        '__DEV__': false
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: false,
        comments: false
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new ExtractTextPlugin('main.css', {
        allChunks: true
      })
    ]);

    var styleLoader = cssLoaders.shift();

    config.module.loaders = config.module.loaders.concat([
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(styleLoader, cssLoaders.join('!'))
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(styleLoader, cssLoaders.concat('less-loader').join('!'))
      }
    ]);
  }

  return config;
};
