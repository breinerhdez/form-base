const Field = require("../Field");

class Number extends Field {
  type = "text";

  constructor(confInput) {
    super(confInput);
  }
}

module.exports = Number;
