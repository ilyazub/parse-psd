#!/usr/bin/env node

var HeaderParser = require('./lib/core/header/parser');
var ColorModeParser = require('./lib/core/colorMode/parser');
var ImageResourceParser = require('./lib/core/image-resources/parser');

var fileName = __dirname + "/psd/test.psd";

var headerParser = new HeaderParser(fileName, function (err, header, position) {
  if (err) throw new Error(err);

  var cmParser = new ColorModeParser(fileName, header, position, function (err, position) {
    if (err) throw new Error(err);

    var imParser = new ImageResourceParser(fileName, position, function (err, position) {
      if (err) throw new Error(err);
    });
  });
});
