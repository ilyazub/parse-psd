(function() {
  var InputStream;
  InputStream = (function() {
    function InputStream(stream, descriptor, position) {
      this.stream = stream;
      this.descriptor = descriptor;
      this.position = position != null ? position : 0;
    }
    InputStream.prototype.read = function(length, options) {
      var buffer, bufferLength;
      if (options == null) {
        options = {
          shiftPosition: true
        };
      }
      buffer = new Buffer(length);
      bufferLength = this.stream.readSync(this.descriptor, buffer, 0, length, this.position);
      if (options.shiftPosition) {
        this._shiftPosition(bufferLength);
      }
      return buffer;
    };
    InputStream.prototype.readShort = function(options) {
      var buffer;
      if (options == null) {
        options = {
          shiftPosition: true
        };
      }
      buffer = this.read(2, options);
      return buffer[1] & 0xFF | (buffer[0] & 0xFF) << 8;
    };
    InputStream.prototype.readString = function(length, options) {
      if (length == null) {
        length = 0;
      }
      if (options == null) {
        options = {
          shiftPosition: true,
          encoding: "UTF-8"
        };
      }
      if (length === 0) {
        return "";
      }
      return this.read(length, options).toString(options.encoding);
    };
    InputStream.prototype.skip = function(length) {
      if (length > 0) {
        return this._shiftPosition(length);
      }
    };
    InputStream.prototype.readInt = function(options) {
      var buffer;
      if (options == null) {
        options = {
          shiftPosition: true
        };
      }
      buffer = this.read(4, options);
      return buffer[3] | (buffer[2] & 0xFF) << 8 | (buffer[1] & 0xFF) << 16 | (buffer[0] & 0xFF) << 24;
    };
    InputStream.prototype._shiftPosition = function(length) {
      if (length > 0) {
        return this.position += length;
      }
    };
    return InputStream;
  })();
  module.exports = InputStream;
}).call(this);
