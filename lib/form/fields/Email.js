const Field = require("../Field");

class Email extends Field {
  type = "email";

  constructor(confInput) {
    super(confInput);
  }

  // get input html structure
  getInput() {
    let html = `<input type="${this.type}"`;
    html += this.id ? ` id="${this.id}"` : "";
    html += ` class="form-control"`;
    html += this.name ? ` name="${this.name}"` : "";
    html += this.config.others.rules.required ? ` required` : "";
    html += this.value ? ` value="${this.value}"` : "";
    html += ` placeholder="${this.label}"`;
    html += ` title="${this.getTitleValue()}"`;
    // html += ` pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$"`;

    html += ` />`;
    return html;
  }

  getTitleValue() {
    return this.config.others.rules.required
      ? `Este campo es obligatorio y debe ser un correo electrónico válido.`
      : `Ingrese un correo electrónico válido.`;
  }
}

module.exports = Email;
