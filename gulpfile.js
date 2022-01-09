const gulp = require('gulp');
plugins = require('gulp-load-plugins')({
    pattern: '*',
    rename: {
        jshint: 'jslint'
    }
});
// new run sequence adapt with gulp 4
//const runSequence = require('gulp4-run-sequence');

plugins.browserSync.create();

/* 2- Setting tasks */
async function debug() {
    await console.log(plugins);
}


const imagemin = require('gulp-imagemin');

const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

const sass = require('gulp-sass');

const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const { src, series, parallel, dest, watch } = require('gulp');
const { AST_Export } = require('terser');

const jsPath = "js/**/mainFunctions.js";
const cssPath = "css/**/*.css";

const distRoot = './dist';

function copyHtml() {
    return src('*.html').pipe(gulp.dest('dist'));
}

function copyCommon() {
    return src('common/**/*.html').pipe(gulp.dest('dist/common'));
}

function copyFonts() {
    return src('fonts/**/*').pipe(gulp.dest('dist/fonts'));
}

function scssTask() {
    return gulp.src('scss/mainStyles.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/scss'));
}

function imgTask() {
    return src('img/*').pipe(imagemin()).pipe(gulp.dest('dist/img'));
}


function jqueryTask() {
    // to minify later
    return src('js/jquery.js').pipe(gulp.dest('dist/js'));
}

function uikitIconsTask() {
    // to minify later
    return src('js/uikit-icons.js').pipe(gulp.dest('dist/js'));
}

function uikitTask() {
    // to minify later
    return src('js/uikit.js').pipe(gulp.dest('dist/js'));
}

function swiperjsTask() {
    // to minify later
    return src('js/swiper-bundle.js').pipe(gulp.dest('dist/js'));
}

function threeTask() {
    // to minify later
    return src('js/three.js').pipe(gulp.dest('dist/js'));
}

function slickTask() {
    // to minify later
    return src('js/slick.min.js').pipe(gulp.dest('dist/js'));
}

function aosTask() {
    // to minify later
    return src('js/aos.js').pipe(gulp.dest('dist/js'));
}

function navbarTask() {
    // to minify later
    return src('js/navbar.js').pipe(gulp.dest('dist/js'));
}

function workAnimationTask() {
    // to minify later
    return src('js/workAnimation.js').pipe(gulp.dest('dist/js'));
}

function dataTask() {
    // to minify later
    return src('./data.json').pipe(gulp.dest('dist/'));
}

function certificationsTask() {
    // to minify later
    return src('./certifications.json').pipe(gulp.dest('dist/'));
}



function jsTask() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('mainFunctions.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'));
}

function cssTask() {
    return src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'));
}


function watchTask() {
    watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, scssTask, aosTask, slickTask, jqueryTask, uikitTask, uikitIconsTask, swiperjsTask, threeTask, jsTask, navbarTask, workAnimationTask, jsonTask, dataTask, certificationsTask));
}
exports.cssTask = cssTask;
exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.jqueryTask = jqueryTask;
exports.uikitTask = uikitTask;
exports.uikitIconsTask = uikitIconsTask;
exports.swiperjsTask = swiperjsTask;
exports.threeTask = threeTask;
exports.slickTask = slickTask;
exports.aosTask = aosTask;
exports.navbarTask = navbarTask;
exports.workAnimationTask = workAnimationTask;
exports.dataTask = dataTask;
exports.certificationsTask = certificationsTask;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.copyCommon = copyCommon;
exports.copyFonts = copyFonts;


gulp.task('serve', gulp.series(parallel(copyHtml, copyFonts, copyCommon, imgTask, jqueryTask, uikitTask, uikitIconsTask, swiperjsTask, threeTask, aosTask, slickTask, navbarTask, workAnimationTask, dataTask, certificationsTask, jsTask, cssTask, scssTask), function() {
    // Static server & Autoreload
    plugins.browserSync.init({
        port: 3010,
        server: {

            baseDir: distRoot,
            https: true
        }
    });
    watchTask
}));

// exports.build = compileScripts
gulp.task('default', gulp.parallel('serve'));