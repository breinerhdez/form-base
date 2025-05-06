const Field = require("../Field");

class Number extends Field {
  type = "number";

  constructor(confInput) {
    super(confInput);
  }

  getTitleValue() {
    return this.config.others.rules.required
      ? `Este campo es obligatorio y debe ser numérico.`
      : `Este campo debe ser numérico.`;
  }
}

module.exports = Number;
