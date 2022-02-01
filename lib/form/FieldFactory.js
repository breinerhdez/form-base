const Email = require("./fields/Email");
const Password = require("./fields/Password");
const Text = require("./fields/Text");

const FieldFactory = (field) => {
  switch (field.type) {
    case "Email":
      return new Email(field);
    case "Password":
      return new Password(field);
    default:
      return new Text(field);
  }
};

module.exports = { FieldFactory };
