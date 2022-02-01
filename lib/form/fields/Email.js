const Field = require("../Field");

class Email extends Field {
  type = "email";

  constructor(confInput) {
    super(confInput);
  }
}

module.exports = Email;
