const FieldFactory = require("./FieldFactory");

class Form {
  action = "";
  fields = [];
  data = {};
  cancelUrl = "";

  constructor(url, fields = [], cancelUrl, data = {}) {
    this.action = url;
    this.fields = fields;
    this.data = data;
    this.cancelUrl = cancelUrl;
  }

  // build html form structure
  dsp = async () => {
    // open form tag
    let html = `<form`;
    html += ` method="post"`;
    html += ` action="${this.action}"`;
    html += `>`;

    // add fields
    html += `<div class="row">`;
    for (let index = 0; index < this.fields.length; index++) {
      let field = this.fields[index];
      let objField = FieldFactory.getField(field);

      // check if field has value
      if (field.name in this.data) {
        objField.setValue(this.data[field.name]);
      } else {
        objField.setValue(field.default_value);
      }

      html += await objField.dsp();
    }
    html += `</div>`;
    // add submit button
    html += `<div class="text-end">`;
    html += `<a class="btn btn-danger me-2" href="${this.cancelUrl}">Cancel</a>`;
    html += `<button class="btn btn-primary">Save</button>`;
    html += `</div>`;
    // close form tag
    html += `</form>`;
    return html;
  };

  // get field object
  // getField = (a) => {
  //   switch (a.type) {
  //     case "Password":
  //       return new Password(a);
  //     default:
  //       return new Text(a);
  //   }
  // };
}

module.exports = Form;
