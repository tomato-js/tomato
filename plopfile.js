const utilGenerator = require("./plop-templates/generator");

module.exports = function(plop) {
  plop.setGenerator("util", utilGenerator);
};
