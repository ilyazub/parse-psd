// Generated by CoffeeScript 1.4.0
(function() {
  var Header, InputStream, Parser, Validator;

  InputStream = require('../../extensions/inputStream');

  Validator = require('./validator');

  Header = require('./header');

  Parser = (function() {

    function Parser(fileName) {
      this.fs = require('fs');
      this.header = new Header;
      if (typeof fileName === 'string' && fileName.length > 0) {
        this.parse(fileName);
      }
    }

    Parser.prototype.parse = function(fileName) {
      var _this = this;
      return this.fs.open(fileName, 'r', '0666', function(err, fd) {
        var channels, colorMode, depth, height, signature, stream, validator, version, width;
        if (err === void 0) {
          throw new Error("File reading error: " + err);
        }
        stream = new InputStream(_this.fs, fd);
        validator = new Validator;
        signature = stream.readString(4);
        validator.assertSignature(signature);
        version = stream.readShort();
        validator.assertVersion(version);
        stream.skip(6);
        channels = stream.readShort();
        validator.assertChannels(channels);
        _this.header.channels = channels;
        height = stream.readInt();
        validator.assertHeight(height);
        _this.header.height = height;
        width = stream.readInt();
        validator.assertWidth(width);
        _this.header.width = width;
        depth = stream.readShort();
        validator.assertDepth(depth);
        _this.header.depth = depth;
        colorMode = stream.readShort();
        validator.assertColorMode(colorMode);
        _this.header.colorMode = colorMode;
        console.log(_this.header);
        return _this.fs.close(fd);
      });
    };

    return Parser;

  })();

  module.exports = Parser;

}).call(this);