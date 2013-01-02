(function() {
  var BlockParser, ImageResource, InputStream, Parser;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  ImageResource = require('./imageResource');
  InputStream = require('../../extensions/inputStream');
  BlockParser = require('./blocks/parser');
  Parser = (function() {
    function Parser(fileName, position, callback) {
      this.fs = require('fs');
      this.parse(fileName, position, callback);
    }
    Parser.prototype.parse = function(fileName, position, callback) {
      return this.fs.open(fileName, 'r', '0666', __bind(function(err, fd) {
        var blocksParser, length, stream;
        if (err) {
          throw err;
        }
        stream = new InputStream(this.fs, fd, position);
        length = stream.readInt();
        this.imageResource = new ImageResource(length);
        if (length > 0) {
          blocksParser = new BlockParser(fileName, stream.position);
        }
        return callback(null, stream.position);
      }, this));
    };
    return Parser;
  })();
  module.exports = Parser;
}).call(this);
