(function() {
  var Block, InputStream, Parser, Validator;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Block = require('./block');
  Validator = require('./validator');
  InputStream = require('../../../extensions/inputStream');
  Parser = (function() {
    function Parser(fileName, position) {
      this.fs = require('fs');
      this.parse(fileName, position);
    }
    Parser.prototype.parse = function(fileName, position) {
      return this.fs.open(fileName, 'r', '0666', __bind(function(err, fd) {
        var block, blocks, id, name, resourceBlockSize, resourceData, stream, validator, _results;
        if (err) {
          throw err;
        }
        stream = new InputStream(this.fs, fd, position);
        validator = new Validator;
        blocks = [];
        _results = [];
        while (this.parseSignature(stream, validator)) {
          stream.skip(4);
          id = stream.readShort();
          name = stream.readShort();
          resourceBlockSize = stream.readInt();
          resourceData = stream.readString(resourceBlockSize);
          block = new Block(id, name, resourceBlockSize, resourceData);
          _results.push(blocks.push(block));
        }
        return _results;
      }, this));
    };
    Parser.prototype.parseSignature = function(stream, validator) {
      var signature;
      try {
        signature = stream.readString(4, {
          shiftPosition: false
        });
        validator.assertSignature(signature);
        return true;
      } catch (e) {
        return false;
      }
    };
    return Parser;
  })();
  module.exports = Parser;
}).call(this);
