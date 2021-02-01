const { htmlPrefilter } = require("jquery");

class Fieldset {
  config = {};
  rows = [];

  constructor(config) {
    this.config = config;
  }

  getRows = () => {
    return this.rows;
  };

  addRow = (row) => {
    this.rows.push(row);
  };

  dsp = () => {
    let html = `<fieldset>`;
    html += this.config.legend ? `<legend>${this.config.legend}</legend>` : ``;
    // solicitar los campos
    this.getRows().forEach((fields) => {
      html += `<div class="form-row">`;

      fields.forEach((field) => {
        if (typeof field === "string") {
          html += field;
        } else {
          html += field.dsp();
        }
      });
      html += `</div>`;
    });

    html += `</fieldset>`;
    return html;
  };
}

module.exports = Fieldset;
