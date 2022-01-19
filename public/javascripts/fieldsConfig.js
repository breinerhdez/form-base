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

// event handler for change value in name input and replace value for projection input
$(document).on("change", ".fieldNameRow", function () {
  let prjCheckbox = $(this).parents("tr").find(".projectionCheckboxRow");
  prjCheckbox.attr("value", $(this).val());
});
