const Input = require("./Input");

class Email extends Input {
  type = "email";

  constructor(confInput) {
    super(confInput);
  }
}

module.exports = Email;
