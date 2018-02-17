# fez-gulp-svg-symbols-tojs
生成`svg-symbols`JS文件，供页面直接引用。

## 安装

```
npm install fez-gulp-svg-symbols-tojs --save-dev
```

## 使用

```
import svgSymbols from 'gulp-svg-symbols'
import svgmin from 'gulp-svgmin'
import filter from 'gulp-filter'
import rename from 'gulp-rename'

import svgSymbolsToJs from 'fez-gulp-svg-symbols-tojs'

gulp.src('**/*.svg')
  .pipe(svgmin())
  .pipe(svgSymbols())
  .pipe(filter("**/*.svg"))
  .pipe(svgSymbolsToJs())
  .pipe(rename({
    extname: ".js"
  }))
  .pipe(gulp.dest(config.paths.dev.lib))
```