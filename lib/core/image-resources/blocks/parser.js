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
        var blocks, id, nullName, resourceBlockSize, signature, stream, validator;
        if (err) {
          throw err;
        }
        stream = new InputStream(this.fs, fd, position);
        validator = new Validator;
        blocks = [];
        signature = stream.readString(4);
        validator.assertSignature(signature);
        id = stream.readShort();
        nullName = stream.readShort({
          shiftPosition: false
        });
        if (nullName === 0) {
          stream.skip(2);
        }
        return resourceBlockSize = stream.readInt();
      }, this));
    };
    return Parser;
  })();
  module.exports = Parser;
}).call(this);
