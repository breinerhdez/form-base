class Field {
  className = false; // input
  classNameFullCon = "form-group"; // container label + input
  classNameLabel = ""; // label
  classNameInCon = ""; // container input - horizontal view
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
  }

  getInput() {
    let html = `<input type="${this.type}"`;
    html += this.id ? ` id="${this.id}"` : "";
    html += this.className ? ` class="${this.className}"` : "";
    html += this.name ? ` name="${this.name}"` : "";
    html += ` />`;
    return html;
  }

  getLabel() {
    return `<label for="${this.id}">${this.label}</label>`;
  }

  getFullInput() {
    let html = ``;
    html += ``;
    return html;
  }
}

module.exports = Field;
