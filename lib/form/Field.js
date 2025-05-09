const CoreCollectionsModel = require("../../models/CoreCollectionsModel");
const { getObjectsAndModel } = require("../../utils/dynamicResources");

class Field {
  formName = "frmDflt";
  id = false; // frmDflt
  label = false;
  name = false;
  type = "text"; // text
  value = null;
  config = {};
  cols = "";

  constructor(confInput) {
    this.id = confInput.idHtml
      ? confInput.idHtml
      : this.formName + "_" + confInput.name;
    this.name = confInput.name ? confInput.name : "tmp_name";
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
    html += ` placeholder="${this.label}"`;
    html += ` title="${this.getTitleValue()}"`;
    html += ` autocomplete="off"`;
    html += ` />`;
    return html;
  }

  // get label html structure
  getLabel() {
    let html = `<label for="${this.id}" class="form-label">${this.label}`;
    html += this.config.others.rules.required ? ` *` : "";
    html += `</label>`;
    html += `<label id="${this.name}-error" for="${this.name}" class="error"></label>`;
    html += `<label id="frmDflt_${this.name}-error" for="frmDflt_${this.name}" class="error"></label>`;
    return html;
  }

  // build html field structure
  dsp = async () => {
    let html = `<div class="mb-3 ${this.cols}">`;
    html += await this.getLabel();
    html += await this.getInput();
    html += `</div>`;
    return html;
  };

  // get collection information by collection_name
  async getCollectionData(collection_name) {
    try {
      let collection = await CoreCollectionsModel.findOne({ collection_name });
      let result = await getObjectsAndModel(collection.path_name, null);
      if (!result) {
        throw "NO DATA";
      }
      let { dynamicModel } = result;
      let collectionObjects = await dynamicModel.find({});
      return collectionObjects;
    } catch (error) {
      return error.message;
    }
  }

  getTitleValue() {
    return "";
  }
}

module.exports = Field;
