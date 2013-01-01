var HeaderParser = require('./lib/core/header/parser');
var ColorModeParser = require('./lib/core/colorMode/parser');

var fileName = __dirname + "/psd/test.psd";

var headerParser = new HeaderParser(fileName, function (err, header, bufferPosition) {
  var cmParser = new ColorModeParser(fileName, header, bufferPosition, function (err, colorMode) {

  });
});
