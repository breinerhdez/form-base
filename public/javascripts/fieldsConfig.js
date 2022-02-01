// form for new field
const newFieldForm = `<tr>
<td>
    <input type="text" name="field[name][]" class="fieldNameRow" placeholder="name_field" required>
</td>
<td>
    <input type="text" name="field[label][]" placeholder="Label field" required>
</td>
<td>
    <select name="field[type][]" required>
        <option value="">Select an option</option>
        <option value="Email">Email</option>
        <option value="Number">Number</option>
        <option value="Password">Password</option>
        <option value="Text">Text</option>
    </select>
</td>
<td>
    <input type="text" name="field[default_value][]" placeholder="Default value">
</td>
<td>
    <input type="text" name="field[cols][]" placeholder="col-md-12" required>
</td>
<td>
    <input type="checkbox" name="field[projection][]" class="projectionCheckboxRow">
</td>
<td>
    <span class="btn btn-danger fa fa-trash btn-removeField" title="Delete"></span>
</td>
</tr>`;

$(document).ready(function () {
  // sortable for fields rows
  $("#rowFieldsSortable").sortable();
});

// event handler for add field
$("#btnAddField").on("click", function () {
  $("#fieldsTable tbody").append(newFieldForm);
});

// event handler for remove field
$(document).on("click", ".btn-removeField", function () {
  if (confirm("Are you sure you want to delete this object?")) {
    let row = $(this).parents("tr");
    row.hide(800, function () {
      $(this).remove();
    });
  }
});

// event handler for change value in name input
$(document).on("change", ".fieldNameRow", function () {
  let nameInput = $(this).val();

  // replace value for projection input
  let prjCheckbox = $(this).parents("tr").find(".projectionCheckboxRow");
  prjCheckbox.attr("value", nameInput);

  // replace name attribute in others attributes
  let regex = /others\[[a-z1-9A-Z_]+\]/;
  $(this)
    .parents("tr")
    .find(".otherElements input")
    .each(function () {
      let oldName = $(this).attr("name");
      let newName = oldName.replace(regex, `others[${nameInput}]`);
      $(this).attr("name", newName);
    });
});

var currentRow = { rules: {}, config: {} };
// get field information for current field/row
$(document).on("click", ".buttonAdvancedModal", function () {
  currentRow.row = $(this).parents("tr");
  getValuesFromRow();
  setValuesForModal();
});

// get values for modal
function getValuesFromRow() {
  // name
  currentRow.name = currentRow.row.find('input[name="field[name][]"]').val();
  // title
  currentRow.title = `Advanced configuration for ${currentRow.row
    .find('input[name="field[name][]"]')
    .val()}:${currentRow.row.find('input[name="field[label][]"]').val()}`;
  // cols
  currentRow.cols = currentRow.row.find('input[name="field[cols][]"]').val();
  // required
  currentRow.rules.required =
    currentRow.row
      .find(`input[name="others[${currentRow.name}][rules][required]"]`)
      .val() == "true"
      ? true
      : false;
  // database type
  currentRow.config.database_type = currentRow.row
    .find(`input[name="others[${currentRow.name}][config][database_type]"]`)
    .val();
}

// set data for modal
function setValuesForModal() {
  // title
  $("#advancedConfModalTitle").text(currentRow.title);
  // cols
  $("#modalConf-cols").val(currentRow.cols);
  // required
  $("#modalConf-required").prop("checked", currentRow.rules.required);
  // database type
  $("#modalConf-database_type").val(currentRow.config.database_type);
}

// save changes
$("#modalSaveButton").click(submitConfAdvance);
function submitConfAdvance() {
  // close modal
  $(".btn-close-modal").click();
  // set cols
  currentRow.row
    .find('input[name="field[cols][]"]')
    .val($("#modalConf-cols").val());
  // required
  currentRow.row
    .find(`input[name="others[${currentRow.name}][rules][required]"]`)
    .val($("#modalConf-required").prop("checked"));
  // database type
  currentRow.row
    .find(`input[name="others[${currentRow.name}][config][database_type]"]`)
    .val($("#modalConf-database_type").val());
}
