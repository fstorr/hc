const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

const paths = {
  dev : 'site/',
  prod : 'docs/',
  pages : {
    dev : 'site/pages/**/*.html',
    prod : 'docs/'
  },
  styles : {
    dev : 'site/css/*.scss',
    prod : 'docs/css/'
  }
}

gulp.task('styles', function() {
  return gulp.src(paths.styles.dev)
    .pipe(sass({outputStyle: 'expanded'}))
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.styles.prod))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('pages', function() {
  return gulp.src(paths.pages.dev)
  .pipe(gulp.dest(paths.pages.prod))
  .pipe(browserSync.reload({stream: true}));
});

// browser-sync serving
gulp.task('serve', function() {
  return browserSync({
    server: {
      baseDir: './docs'
    }
  });
});

gulp.task('watch', function() { 
  gulp.watch(paths.pages.dev, gulp.series('pages'));
  gulp.watch(paths.styles.dev, gulp.series('styles'));
});

gulp.task('default', gulp.parallel('serve', 'watch'));

