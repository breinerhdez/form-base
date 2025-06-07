const Field = require("../Field");

class Select extends Field {
  type = "select";

  constructor(confInput) {
    super(confInput);
  }

  async getInput() {
    let html = `<select`;
    html += this.id ? ` id="${this.id}"` : "";
    html += ` class="form-select"`;
    html += this.name ? ` name="${this.name}"` : "";
    html += this.config.others.rules.required ? ` required` : "";
    html += ` title="${this.getTitleValue()}"`;
    html += `/>`;
    html += await this.getOptions();
    html += `</select>`;
    return html;
  }

  getLabel() {
    let html = `<label for="${this.id}" class="form-label">${this.label}`;
    html += this.config.others.rules.required ? ` *` : "";
    html += `</label>`;
    html += `<label id="frmDflt_${this.name}-error" for="frmDflt_${this.name}" class="error"></label>`;
    return html;
  }

  async getOptions() {
    let {
      type: typeOption,
      values,
      collection_name,
    } = this.config.others.options;
    let htmlOption = `<option value="">Seleccione una opción</option>`;
    if (typeOption == "CUSTOM") {
      values
        .split(",")
        .sort()
        .forEach((option) => {
          htmlOption += `<option value="${option}"`;
          htmlOption += this.value == option ? ` selected="selected"` : "";
          htmlOption += `>${option}</option>`;
        });
    } else {
      // get databaseOption
      htmlOption += await this.getCollectionOption(collection_name, values);
    }
    return htmlOption;
  }

  // build options for select
  async getCollectionOption(collection_name, attribute) {
    let collectionObjects = await this.getCollectionData(collection_name);
    let htmlOption = "";
    collectionObjects = collectionObjects.sort((a, b) =>
      a[attribute].localeCompare(b[attribute])
    );
    for (let i = 0; i < collectionObjects.length; i++) {
      htmlOption += `<option value="${collectionObjects[i][attribute]}"`;
      htmlOption +=
        this.value == collectionObjects[i][attribute]
          ? ` selected="selected"`
          : "";
      htmlOption += `>${collectionObjects[i][attribute]}</option>`;
    }
    return htmlOption;
  }
}

module.exports = Select;
