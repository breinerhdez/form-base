const Email = require("./fields/Email");
const Password = require("./fields/Password");
const Select = require("./fields/Select");
const Text = require("./fields/Text");

const FieldFactory = (field) => {
  switch (field.type) {
    case "Email":
      return new Email(field);
    case "Password":
      return new Password(field);
    case "Select":
      return new Select(field);
    default:
      return new Text(field);
  }
};

module.exports = { FieldFactory };
