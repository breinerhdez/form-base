/**
 * add row with fields - max 2 fields by column
 */

class Fieldset {
  legend = "";
  rows = [];

  constructor(legend) {
    this.legend = legend;
  }

  getRows = () => {
    return this.rows;
  };

  addRow = (row) => {
    this.rows.push(row);
  };
}

module.exports = Fieldset;
