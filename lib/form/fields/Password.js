const Field = require("../Field");

class Password extends Field {
  type = "password";

  constructor(confInput) {
    super(confInput);
  }
}

module.exports = Password;
