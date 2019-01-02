'use strict';

/* ========================================================================== */
/* Модули */
/*========================================================================== */ 
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    rename = require("gulp-rename"),
    reload = browserSync.reload;

   
function onError(err) {
   console.log(err);
}



/* ========================================================================== */
/* Пути файлов */
/*========================================================================== */ 
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        php: 'build/php/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/custom.js', //Скрипты
        style: 'src/css/style.css', //Стили
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        php: 'src/php/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.*',
        img: 'src/img/**/*.*',
        php: 'src/php/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};




/* ========================================================================== */
/* Конфиг LiveReload */
/*========================================================================== */ 
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Samura"
};

gulp.task('webserver', function () {
    browserSync(config);
});




/* ========================================================================== */
/* jQuery 3.2.1 */
/*========================================================================== */ 
gulp.task('jquery', function () {
    return gulp.src('bower_components/jquery/dist/jquery.min.js')
    	.pipe(rename('jquery-3.2.1.min.js'))
      .pipe(gulp.dest('build/js/'));
});

/* ========================================================================== */
/* удалить папку build (комманда: gulp clean) */
/*========================================================================== */ 
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});





/* ========================================================================== */
/* Сборщик */
/*========================================================================== */ 

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
    .pipe(plumber())
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        })) //Прогоним через fileinclude
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('php:build', function () {
    gulp.src(path.src.php) //Выберем файлы по нужному пути
    .pipe(plumber())
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        })) //Прогоним через fileinclude
        .pipe(gulp.dest(path.build.php)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});


gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
    		.pipe(plumber())
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        })) //Прогоним через fileinclude
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        // .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});




gulp.task('css:build', function () {
	
    gulp.src(path.src.style) //Выберем наш main.scss
    .pipe(plumber())
        // .pipe(sourcemaps.init()) //То же самое что и с js
        // .pipe(less()) //Скомпилируем
        .pipe(prefix({
					browsers: ['last 5 versions'],
					cascade: true
				}))
				.pipe(autoprefixer({
				            browsers: ['last 2 versions'],
				            cascade: false
				        }))
        // .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
    // .pipe(plumber())
    		// .pipe(gulp.dest(path.build.img)) //И бросим в build
         .pipe(imagemin({ //Сожмем их
             progressive: true,
             svgoPlugins: [{removeViewBox: false}],
             use: [pngquant()],
             interlaced: true
         }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

 

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
    .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
});

/* ========================================================================== */
/* //Сборщик */
/*========================================================================== */ 


 


/* ========================================================================== */
/* Автообновление */
/*========================================================================== */ 

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.html], function(event, cb) {
        gulp.start('php:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

/* ========================================================================== */
/* //Автообновление */
/*========================================================================== */ 




gulp.task('build', [
    'html:build',
    'php:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build',
    'jquery'
]);





gulp.task('default', ['build', 'webserver', 'watch']);
