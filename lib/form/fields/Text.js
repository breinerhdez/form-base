const Input = require("./Input");

class Text extends Input {
  type = "text";

  constructor(confInput) {
    super(confInput);
  }
}

module.exports = Text;
