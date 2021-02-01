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

  constructor(url, config = {}) {
    this.files = config.files ? config.files : false;
    this.method = config.method ? config.method : "POST";
    this.action = url;
    this.config = config;
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
    html += `</form>`;
    return html;
  };

  build = (content) => {
    let fieldset;
    let row;
    content.fieldsets.forEach((fieldsetConf) => {
      // creando los fieldsets
      fieldset = new Fieldset(fieldsetConf.config);
      fieldsetConf.fields.forEach((rowFieldConfig) => {
        row = [];
        rowFieldConfig.forEach((fieldConfig) => {
          row.push(this.getField(fieldConfig));
        });
        fieldset.addRow(row)
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
