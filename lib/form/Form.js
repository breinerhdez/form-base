/**
 * add fieldsets
 * dsp
 */

const Fieldset = require("./Fieldset");
const Text = require("./fields/Text");
const Password = require("./fields/Password");
const Email = require("./fields/Email");
const File = require("./fields/File");

class Form {
  fieldsets = [];
  files = false;
  config = {};
  data = {};

  constructor(url, config = {}, data = {}) {
    this.files = config.files ? config.files : false;
    this.method = config.method ? config.method : "POST";
    this.action = url;
    this.config = config;
    this.data = data;
  }

  addFieldset = (fieldset) => {
    this.fieldsets.push(fieldset);
  };

  getFieldsets = () => {
    return this.fieldsets;
  };

  dsp = () => {
    let html = `<form`;
    html += ` method="${this.method}"`;
    html += ` action="${this.action}"`;
    html += this.config.className ? ` class="${this.config.className}"` : ``;
    html += `>`;
    // solicitar los fieldsets
    this.getFieldsets().forEach((fieldset) => {
      html += fieldset.dsp();
    });
    // html += ``;
    html += `<div class="form-button-list text-center">`;

    // verifica si se muestra el botón submit
    if (this.config.btn_submit.show === true) {
      html += `<input type="submit"`;
      html += this.config.btn_submit.className ? ` class="btn ${this.config.btn_submit.className}"` : ` class="btn btn-primary"`;
      html += this.config.btn_submit.value ? ` value="${this.config.btn_submit.value}"` : ` value="Send"`;
      html += ` />`;
    }

    html += `</div>`;
    html += `</form>`;
    return html;
  };

  build = (content) => {
    let fieldset;
    let row;
    let field;
    content.fieldsets.forEach((fieldsetConf) => {
      // creando los fieldsets
      fieldset = new Fieldset(fieldsetConf.config);
      fieldsetConf.fields.forEach((rowFieldConfig) => {
        row = [];
        rowFieldConfig.forEach((fieldConfig) => {
          field = this.getField(fieldConfig)
          field.setValue(this.data[field.name])
          // console.log(field)
          // row.push(this.getField(fieldConfig));
          row.push(field);
        });
        fieldset.addRow(row);
      });
      // asignando los fieldsets al formulario
      this.addFieldset(fieldset);
    });
  };

  getField = (fieldConfig) => {
    return new Text(fieldConfig);
  };
}

module.exports = Form;
