class Field {
  className = false; // input
  classNameFullCon = "col-md-12"; // container label + input
  classNameLabel = false; // label
  classNameInCon = false; // container input - horizontal view
  formName = "frmDflt";
  id = false; // frmDflt
  label = false;
  name = false;
  type = false; // text
  orientation = "VERTICAL"; // VERTICAL | HORIZONTAL
  value;

  constructor(confInput) {
    this.id = confInput.id ? confInput.id : this.formName + "_" + confInput.name;
    this.name = confInput.name ? confInput.name : false;
    this.type = confInput.type ? confInput.type : false;
    this.label = confInput.label ? confInput.label : "LABEL NO DEFINIDO";
    this.className = confInput.className ? confInput.className : false;
    this.config = confInput;
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  getInput() {
    let html = `<input type="${this.type}"`;
    html += this.id ? ` id="${this.id}"` : "";
    html += this.className ? ` class="form-control ${this.className}"` : ` class="form-control"`;
    html += this.name ? ` name="${this.name}"` : "";
    html += this.config.required ? ` required` : "";
    html += this.value ? ` value="${this.value}"` : "";
    html += ` />`;
    return html;
  }

  getLabel() {
    let html = `<label for="${this.id}">${this.label}`;
    html += this.config.required ? ` *` : "";
    html += `</label>`;
    return html;
  }

  dsp = () => {
    let html = `<div`;
    html += this.config.classNameFullCon
      ? ` class="form-group ${this.config.classNameFullCon}">`
      : ` class="form-group ${this.classNameFullCon}">`;
    html += this.getLabel();
    html += this.getInput();
    html += `</div>`;
    return html;
  };
}

module.exports = Field;
