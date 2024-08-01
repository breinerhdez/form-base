const Field = require("../Field");

class Number extends Field {
  type = "number";

  constructor(confInput) {
    super(confInput);
  }
}

module.exports = Number;
