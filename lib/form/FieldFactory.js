const Email = require("./fields/Email");
const Number = require("./fields/Number");
const Password = require("./fields/Password");
const Select = require("./fields/Select");
const Text = require("./fields/Text");

class FieldFactory {
  static getField(field) {
    switch (field.type) {
      case "Email":
        return new Email(field);
      case "Number":
        return new Number(field);
      case "Password":
        return new Password(field);
      case "Select":
        return new Select(field);
      default:
        return new Text(field);
    }
  }
}
module.exports = FieldFactory;
