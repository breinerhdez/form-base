class Field {
  formName = "frmDflt";
  id = false; // frmDflt
  label = false;
  name = false;
  type = "Text"; // text
  value = null;
  config = {};

  constructor(confInput) {
    this.id = confInput.idHtml
      ? confInput.idHtml
      : this.formName + "_" + confInput.name;
    this.name = confInput.name ? confInput.name : "tmp_name";
    this.type = confInput.type ? confInput.type : "text";
    this.label = confInput.label ? confInput.label : "LABEL NO DEFINIDO";
    this.cols = confInput.cols ? confInput.cols : "col-md-12";
    this.config = confInput;
  }

  // set value
  setValue(value) {
    this.value = value;
    return this;
  }

  // get input html structure
  getInput() {
    let html = `<input type="${this.type}"`;
    html += this.id ? ` id="${this.id}"` : "";
    html += ` class="form-control"`;
    html += this.name ? ` name="${this.name}"` : "";
    html += this.config.others.rules.required ? ` required` : "";
    html += this.value ? ` value="${this.value}"` : "";
    html += ` />`;
    return html;
  }

  // get label html structure
  getLabel() {
    let html = `<label for="${this.id}" class="form-label">${this.label}`;
    html += this.config.others.rules.required ? ` *` : "";
    html += `</label>`;
    return html;
  }

  // build html field structure
  dsp = () => {
    let html = `<div class="mb-3 ${this.cols}">`;
    html += this.getLabel();
    html += this.getInput();
    html += `</div>`;
    return html;
  };
}

module.exports = Field;
