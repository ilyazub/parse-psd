(function() {
  var Block;
  Block = (function() {
    function Block(id, name, size, resourceData) {
      this.id = id;
      this.name = name;
      this.size = size;
      this.resourceData = resourceData;
    }
    return Block;
  })();
  module.exports = Block;
}).call(this);
