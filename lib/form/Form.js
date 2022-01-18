const Text = require("./fields/Text");
const Password = require("./fields/Password");
// const Email = require("./fields/Email");
// const File = require("./fields/File");

class Form {
  action = "";
  fields = [];
  data = {};

  constructor(url, fields = [], data = {}) {
    this.action = url;
    this.fields = fields;
    this.data = data;
  }

  // build html form structure
  dsp = () => {
    // open form tag
    let html = `<form`;
    html += ` method="post"`;
    html += ` action="${this.action}"`;
    html += `>`;

    // add fields
    html += `<div class="row">`;
    this.fields.forEach((field) => {
      let objField = this.getField(field);
      html += objField.dsp();
    });
    html += `</div>`;
    // add submit button
    html += `<div class="text-end">`;
    html += `<button class="btn btn-primary">Save</button>`;
    html += `</div>`;
    // close form tag
    html += `</form>`;
    return html;
  };

  // get field object
  getField = (a) => {
    switch (a.type) {
      case "Password":
        return new Password(a);
      default:
        return new Text(a);
    }
  };
}

module.exports = Form;
