const Field = require("../Field");

class Text extends Field {
  type = "text";

  constructor(confInput) {
    super(confInput);
  }
}

module.exports = Text;
