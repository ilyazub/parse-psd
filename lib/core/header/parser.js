(function() {
  var Header, InputStream, Parser, Validator;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  InputStream = require('../../extensions/inputStream');
  Validator = require('./validator');
  Header = require('./header');
  Parser = (function() {
    function Parser(fileName, callback) {
      this.fs = require('fs');
      this.header = new Header;
      if (typeof fileName === 'string' && fileName.length > 0) {
        this.parse(fileName, callback);
      }
    }
    Parser.prototype.parse = function(fileName, callback) {
      return this.fs.open(fileName, 'r', '0666', __bind(function(err, fd) {
        var channels, colorMode, depth, height, signature, stream, validator, version, width;
        if (err === void 0) {
          throw new Error("File reading error: " + err);
        }
        stream = new InputStream(this.fs, fd, 0);
        validator = new Validator;
        signature = stream.readString(4);
        validator.assertSignature(signature);
        version = stream.readShort();
        validator.assertVersion(version);
        stream.skip(6);
        channels = stream.readShort();
        validator.assertChannels(channels);
        this.header.channels = channels;
        height = stream.readInt();
        validator.assertHeight(height);
        this.header.height = height;
        width = stream.readInt();
        validator.assertWidth(width);
        this.header.width = width;
        depth = stream.readShort();
        validator.assertDepth(depth);
        this.header.depth = depth;
        colorMode = stream.readShort();
        validator.assertColorMode(colorMode);
        this.header.colorMode = colorMode;
        callback(null, this.header, stream.position);
        return this.fs.close(fd);
      }, this));
    };
    return Parser;
  })();
  module.exports = Parser;
}).call(this);
