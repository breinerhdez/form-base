const Field = require("../Field");

class Checkbox extends Field {
  type = "checkbox";

  constructor(confInput) {
    super(confInput);
  }

  // build html field structure
  dsp = async () => {
    let html = `<div class="mb-3 ${this.cols}">`;


    html += this.multiple ? await this.getLabel(): "";
    html += await this.getOptions();

    html += `</div>`;
    return html;
  };

  // get input html structure
  // async getInput() {
  //   let html = `<select`;
  //   html += this.id ? ` id="${this.id}"` : "";
  //   html += ` class="form-select"`;
  //   html += this.name ? ` name="${this.name}"` : "";
  //   html += this.config.others.rules.required ? ` required` : "";
  //   html += `/>`;
  //   html += await this.getOptions();
  //   html += `</select>`;
  //   return html;
  // }

  async getOptions() {
    let {
      type: typeOption,
      values,
      collection_name,
    } = this.config.others.options;
    let htmlOption = ``;
    let count = 0;
    if (typeOption == "CUSTOM") {
      values
        .split(",")
        .sort()
        .forEach((option) => {
          let item = count++;
          htmlOption += `<div class="form-check">`;
          htmlOption += `<input class="form-check-input" type="checkbox" value="${option}"`;
          htmlOption += this.id ? ` id="${this.id + item}"` : "";
          htmlOption += this.name ? ` name="${this.name}"` : "";
          htmlOption += this.value == option ? ` checked="checked"` : "";
          htmlOption += `>`;

          htmlOption += `<label class="form-check-label" for="${
            this.id + item
          }">${this.label}</label>`;
          htmlOption += `</div>`;
        });
    } else {
      // get databaseOption
      htmlOption += await this.getCollectionOption(collection_name, values);
    }
    return htmlOption;
  }

  // build options for select
  async getCollectionOption(collection_name, attributes) {
    let collectionObjects = await this.getCollectionData(collection_name);
    let htmlOption = "";
    let [val, label] = attributes.split(",");
    let count = 0;
    for (let i = 0; i < collectionObjects.length; i++) {
      // htmlOption += `<option value="${collectionObjects[i][val]}"`;
      // htmlOption +=
      //   this.value == collectionObjects[i][val] ? ` checked="checked"` : "";
      // htmlOption += `>${collectionObjects[i][label]}</option>`;

      let item = count++;
      htmlOption += `<div class="form-check">`;
      htmlOption += `<input class="form-check-input" type="checkbox" value="${collectionObjects[i][val]}"`;
      htmlOption += this.id ? ` id="${this.id + item}"` : "";
      htmlOption += this.name ? ` name="${this.name}"` : "";
      
      if (this.multiple){
        console.log("------------------------> VALUE: ",this.value);

htmlOption += this.value.includes(collectionObjects[i][val]) ? ` checked="checked"` : "";

      }else{
        htmlOption +=
        this.value == collectionObjects[i][val] ? ` checked="checked"` : "";
      }
      
      htmlOption += `>`;
      htmlOption += `<label class="form-check-label" for="${this.id + item}">${
        collectionObjects[i][label]
      }</label>`;
      htmlOption += `</div>`;
    }
    return htmlOption;
  }
}

module.exports = Checkbox;
