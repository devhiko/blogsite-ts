// required libs
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
// const purgecss = require('gulp-purgecss'); // for production

// main build function
function buildStyles() {
  return src('./src/sass/**/*.scss')
    .pipe(sass())
    // .pipe(purgecss({ content: ['./**/*.html'] }))
    .pipe(dest('./public/css'))
}

// watching tasks
function watchTask() {
  watch(['./src/sass/**/*.scss', '*./**/.html'], buildStyles)
}

// export 
exports.default = series(buildStyles, watchTask)