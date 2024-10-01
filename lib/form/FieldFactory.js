const Checkbox = require("./fields/Checkbox");
const Email = require("./fields/Email");
const Number = require("./fields/Number");
const Password = require("./fields/Password");
const Radio = require("./fields/Radio");
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
      case "Radio":
        return new Radio(field);
      case "Checkbox":
        return new Checkbox(field);
      default:
        return new Text(field);
    }
  }
}
module.exports = FieldFactory;
