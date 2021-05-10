const { src, dest, watch, series } = require('gulp');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const browsersync = require('browser-sync').create();

function cssTask(){
  return src('./pcss/*.css', { sourcemaps: true })
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('css', { sourcemaps: '.' }));
}

function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['./pcss/**/*.css', './js/**/*.js'], series(cssTask, browsersyncReload));
}

exports.default = series(
  cssTask,
  browsersyncServe,
  watchTask
);
