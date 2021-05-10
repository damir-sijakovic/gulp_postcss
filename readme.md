# Gulp, PostCSS and BrowserSync Example

Tutorial describing how Gulp works with PostCss and BrowserSync.    
Basically, Gulp is used to monitor file changes. On change, PostCSS(and addons)    
are processing all files from ./pcss directory. After that new files are    
compiled into ./css directory.    


### Install Gulp as terminal command

            sudo npm install gulp-cli -g

### Project install

            npm install --save-dev gulp gulp-postcss browser-sync


### List of PostCSS plugins

            https://github.com/postcss/postcss/blob/main/docs/plugins.md


### Install plugin

            npm install --save-dev autoprefixer

### Run inside project dir

            mkdir ./pcss
            touch ./pcss/style.css
            touch ./gulpfile.js
        
### Add to './pcss/style.css' 

            ::placeholder {
              color: gray;
            }

            .image {
              background-image: url(image@1x.png);
            }
            @media (min-resolution: 2dppx) {
              .image {
                background-image: url(image@2x.png);
              }
            }

### Add to './gulpfile.js' 

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


### That creates ./css directory with newly compiled file

            ::-moz-placeholder {
              color: gray;
            }

            :-ms-input-placeholder {
              color: gray;
            }

            ::placeholder {
              color: gray;
            }

            .image {
              background-image: url(image@1x.png);
            }
            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
              .image {
                background-image: url(image@2x.png);
              }
            }

### Run BrowserSync as service

            gulp 
    
    
This will automatically watch files for changes process/compile and move them to './css'.

### Have Fun!
