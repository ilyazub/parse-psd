(function() {
  var ColorMode, InputStream, Parser, Validator;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  InputStream = require('../../extensions/inputStream');
  ColorMode = require('./colorMode');
  Validator = require('./validator');
  Parser = (function() {
    function Parser(fileName, header, position, callback) {
      this.fs = require('fs');
      this.parse(fileName, header.colorMode, position, callback);
    }
    Parser.prototype.parse = function(fileName, colorMode, position, callback) {
      return this.fs.open(fileName, 'r', '0666', __bind(function(err, fd) {
        var colorData, colorDataLength, stream, validator;
        if (err) {
          throw err;
        }
        validator = new Validator;
        stream = new InputStream(this.fs, fd, position);
        colorDataLength = stream.readInt();
        validator.assertColorDataLength(colorDataLength);
        colorData = stream.readString(colorDataLength);
        this._colorMode = new ColorMode(colorDataLength, colorData);
        return callback(null, stream.position);
      }, this));
    };
    return Parser;
  })();
  module.exports = Parser;
}).call(this);
