var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('lint', function () {
  return gulp.src([
      'src/**/*.js'
    ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe($.useref())
    .pipe(gulp.dest('./dist'))
    .pipe($.size());
});

gulp.task('clean', require('del').bind(null, ['dist', '.publish']));

gulp.task('server', function(cb) {
  var httpServer = require('http-server');
  httpServer.createServer({
    root: './src/',
    cors: true
  }).listen(8080, cb);
});

var webpackSettings = {
  stats: {
    colors: true,
    reasons: false,
    errorDetails: true,
    hash: false,
    version: false,
    timings: true,
    chunkModules: false,
    modules: true,
    cached: false,
    source: true
  }
};

function webpackTask(cb) {
  var started = false;
  var config = require('./webpack.config')(true);
  var bundler = require('webpack')(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    $.util.log('[webpack]', stats.toString(webpackSettings.stats));

    if (!started) {
      started = true;
      return cb();
    }
  }

  bundler.run(bundle);
}

gulp.task('webpack', webpackTask);

gulp.task('webpack-dev-server', function(cb) {
  var WebpackDevServer = require('webpack-dev-server');
  var webpack = require('webpack');

  var compiler = webpack(require('./webpack.config')(false));

  new WebpackDevServer(compiler, {
    contentBase: './src',
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    watchDelay: 300,
    stats: webpackSettings.stats
  }).listen(8080, '0.0.0.0', cb);
});

gulp.task('watch', ['webpack-dev-server']);

gulp.task('build', ['lint', 'html', 'webpack'], function() {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});
