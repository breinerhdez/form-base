const Input = require("./Input");

class File extends Input {
  type = "file";

  constructor(confInput) {
    super(confInput);
  }
}

module.exports = File;
