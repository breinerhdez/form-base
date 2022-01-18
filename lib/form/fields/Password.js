const Input = require("./Input");

class Password extends Input {
  type = "password";

  constructor(confInput) {
    super(confInput);
  }
}

module.exports = Password;
