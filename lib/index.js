'use strict';

exports.__esModule = true;

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _pluginError = require('plugin-error');

var _pluginError2 = _interopRequireDefault(_pluginError);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLUGIN_NAME = 'fez-gulp-svg-symbols-tojs';

exports.default = function (options) {
  options = options || {};
  var stream = _through2.default.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }
    // we don't handle streams :,(
    // use https://github.com/nfroidure/gulp-streamify if you're reading this
    // next versions should use https://www.npmjs.com/package/bufferstreams
    if (file.isStream()) {
      var errorReason = 'Streaming is not supported';
      this.emit('error', new _pluginError2.default(PLUGIN_NAME, errorReason));
      return cb();
    }
    if (file.isBuffer()) {
      var oldSvgTxt = String(file.contents).replace(/[\r\n]/g, '');
      var svgTxt = (0, _template2.default)({
        svg: oldSvgTxt,
        className: options.className || 'svgicon'
      });
      file.contents = new Buffer(svgTxt);
    }
    cb(null, file);
  });
  return stream;
};

module.exports = exports['default'];