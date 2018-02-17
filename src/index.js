import through from 'through2'
import PluginError from 'plugin-error'

import svgJsTemp from './template'

const PLUGIN_NAME = 'fez-gulp-svg-symbols-tojs';

export default (options) => {
  options = options || {};
  let stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }
    // we don't handle streams :,(
    // use https://github.com/nfroidure/gulp-streamify if you're reading this
    // next versions should use https://www.npmjs.com/package/bufferstreams
    if (file.isStream()) {
      const errorReason = `Streaming is not supported`;
      this.emit(`error`, new PluginError(PLUGIN_NAME, errorReason));
      return cb();
    }
    if (file.isBuffer()) {
      const oldSvgTxt = String(file.contents).replace(/[\r\n]/g, '');
      const svgTxt = svgJsTemp({
        svg: oldSvgTxt,
        className: options.className || 'svgicon'
      });
      file.contents = new Buffer(svgTxt)
    }
    cb(null, file);
  });
  return stream;
}
