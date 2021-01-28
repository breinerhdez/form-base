/**
 * add fieldsets
 * dsp
 */

class Form {
  fieldsets = [];
  files = false;

  constructor(url, method, files = false) {
    this.files = files;
    this.method = method;
    this.url = url;
  }

  addFieldset = (fieldset) => {
    this.fieldsets.push(fieldset);
  };

  getFieldsets = () => {
    return this.fieldsets;
  };
}

module.exports = Form;
