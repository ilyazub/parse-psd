// Generated by CoffeeScript 1.4.0
var PsdHeader, PsdHeaderParser, PsdHeaderSpec, PsdHeaderValidator, PsdInputStream, headerParser,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

PsdHeader = (function() {

  function PsdHeader() {
    this.channels = 1;
    this.height = 1;
    this.width = 1;
    this.depth = 1;
    this.colorMode = 0;
  }

  return PsdHeader;

})();

PsdInputStream = (function() {

  function PsdInputStream(stream, descriptor) {
    this.stream = stream;
    this.descriptor = descriptor;
    this.pos = 0;
  }

  PsdInputStream.prototype.read = function(length) {
    var buffer;
    buffer = new Buffer(length);
    this.pos += this.stream.readSync(this.descriptor, buffer, 0, length, this.pos);
    return buffer;
  };

  PsdInputStream.prototype.readShort = function() {
    var buffer;
    buffer = this.read(2);
    return buffer[1] & 0xFF | (buffer[0] & 0xFF) << 8;
  };

  PsdInputStream.prototype.readString = function(length) {
    if (length > 0) {
      return this.read(length).toString('UTF-8');
    }
  };

  PsdInputStream.prototype.skip = function(length) {
    if (length == null) {
      length = 1;
    }
    if (length > 0) {
      return this.pos += length;
    }
  };

  PsdInputStream.prototype.readInt = function() {
    var buffer;
    buffer = this.read(4);
    return buffer[3] | (buffer[2] & 0xFF) << 8 | (buffer[1] & 0xFF) << 16 | (buffer[0] & 0xFF) << 24;
  };

  return PsdInputStream;

})();

PsdHeaderSpec = {
  signature: '8BPS',
  supportedVersions: [1, 2],
  supportedDepths: [1, 8, 16, 32],
  supportedColorModes: [0, 1, 2, 3, 4, 7, 8, 9],
  colorModes: {
    Bitmap: 0,
    Grayscale: 1,
    Indexed: 2,
    RGB: 3,
    CMYK: 4,
    Multichannel: 7,
    Duotone: 8,
    Lab: 9
  }
};

PsdHeaderValidator = (function() {

  function PsdHeaderValidator() {
    this.assert = require('assert');
    this.spec = PsdHeaderSpec;
    this.version = -1;
  }

  PsdHeaderValidator.prototype.assert = function(condition, failMessage) {
    return this.assert(condition, failMessage);
  };

  PsdHeaderValidator.prototype.assertSignature = function(signature) {
    return this.assert(signature === this.spec.signature, "Signature: always equal to '" + this.spec.signature + "'. Your value: " + signature);
  };

  PsdHeaderValidator.prototype.assertVersion = function(version) {
    var _ref;
    this.version = version;
    return this.assert((_ref = this.version, __indexOf.call(this.spec.supportedVersions, _ref) >= 0), "Supported version: always equal to " + this.spec.supportedVersions[0] + " (**PSB** version is " + this.spec.supportedVersions[1] + ".). Your value: " + this.spec.version);
  };

  PsdHeaderValidator.prototype.assertChannels = function(channels) {
    return this.assert((1 < channels && channels < 56), "Number of channels range is 1 to 56. Your value: " + channels);
  };

  PsdHeaderValidator.prototype.assertHeight = function(height) {
    return this.assert((this.version === 1 && (1 < height && height < 30000)) || (this.version === 2 && (1 < height && height < 300000)), "Supported height range is 1 to 30,000 (**PSB** max of 300,000.). Your value: " + height);
  };

  PsdHeaderValidator.prototype.assertWidth = function(width) {
    return this.assert((this.version === 1 && (1 < width && width < 30000)) || (this.version === 2 && (1 < width && width < 300000)), "Supported width range is 1 to 30,000 (**PSB** max of 300,000.). Your value: " + width);
  };

  PsdHeaderValidator.prototype.assertDepth = function(depth) {
    return this.assert(__indexOf.call(this.spec.supportedDepths, depth) >= 0, "Supported depths are " + this.spec.supportedDepths + ". Your value: " + depth);
  };

  PsdHeaderValidator.prototype.assertColorMode = function(colorMode) {
    return this.assert(__indexOf.call(this.spec.supportedColorModes, colorMode) >= 0, "Supported color modes: " + this.spec.supportedColorModes);
  };

  return PsdHeaderValidator;

})();

PsdHeaderParser = (function() {

  function PsdHeaderParser(fileName) {
    this.fs = require('fs');
    this.psdHeader = new PsdHeader;
    if (typeof fileName === 'string' && fileName.length > 0) {
      this.parse(fileName);
    }
  }

  PsdHeaderParser.prototype.parse = function(fileName) {
    var _this = this;
    return this.fs.open(fileName, 'r', '0666', function(err, fd) {
      var channels, colorMode, depth, height, psdStream, psdValidator, signature, version, width;
      if (err === void 0) {
        throw "File reading error: " + err;
      }
      psdStream = new PsdInputStream(_this.fs, fd);
      psdValidator = new PsdHeaderValidator;
      signature = psdStream.readString(4);
      psdValidator.assertSignature(signature);
      version = psdStream.readShort();
      psdValidator.assertVersion(version);
      psdStream.skip(6);
      channels = psdStream.readShort();
      psdValidator.assertChannels(channels);
      _this.psdHeader.channels = channels;
      height = psdStream.readInt();
      psdValidator.assertHeight(height);
      _this.psdHeader.height = height;
      width = psdStream.readInt();
      psdValidator.assertWidth(width);
      _this.psdHeader.width = width;
      depth = psdStream.readShort();
      psdValidator.assertDepth(depth);
      _this.psdHeader.depth = depth;
      colorMode = psdStream.readShort();
      psdValidator.assertColorMode(colorMode);
      _this.psdHeader.colorMode = colorMode;
      console.log(_this.psdHeader);
      return _this.fs.close(fd);
    });
  };

  return PsdHeaderParser;

})();

headerParser = new PsdHeaderParser("" + __dirname + "\\psd\\test.psd");
