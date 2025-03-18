// form for new field
const newFieldForm = `<tr>
  <td>
    <input type="text" name="field[name][]" class="fieldNameRow" placeholder="name_field" required>
    <div class="otherElements" style="display:none">
      <input type="text" name="field[cols][]" />
      <input type="text" name="others[input_name][rules][required]" />
      <input type="text" name="others[input_name][config][database_type]" />
      <input type="text" name="others[input_name][options][type]" value="CUSTOM" />
      <input type="text" name="others[input_name][options][values]" value="Option 1,Option 2,Option 3" />
      <input type="text" name="others[input_name][options][collection_name]" value="" />
    </div>
  </td>
  <td>
    <input type="text" name="field[label][]" placeholder="Label field" required>
  </td>
  <td>
    <select name="field[type][]" required>
      <option value="">Seleccione una opción</option>
      <option value="Checkbox">Checkbox</option>
      <option value="Email">Email</option>
      <option value="Number">Number</option>
      <option value="Password">Password</option>
      <option value="Radio">Radio</option>
      <option value="Select">Select</option>
      <option value="Text">Text</option>
    </select>
  </td>
  <td>
    <input type="text" name="field[default_value][]" placeholder="Default value">
  </td>
  <td>
    <div class="form-check form-switch">
      <input type="checkbox" role="switch" name="field[projection][]" class="projectionCheckboxRow form-check-input">
    </div>
  </td>
  <td>
    <button type="button" class="btn btn-primary buttonAdvancedModal" data-bs-toggle="modal" data-bs-target="#advancedModal">Configurar</button>
  </td>
  <td>
    <span class="btn btn-default fa fa-trash-o btn-removeField" title="Eliminar"></span>
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
  if (confirm("¿Está seguro que quiere eliminar el objeto?")) {
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

var currentRow = { rules: {}, config: {}, options: {} };
// get field information for current field/row
$(document).on("click", ".buttonAdvancedModal", function () {
  currentRow.row = $(this).parents("tr");
  showOptionsSection();
  getValuesFromRow();
  setValuesForModal();
});

// display or hide options section
function showOptionsSection() {
  let allowTypes = ["Select", "Radio", "Checkbox"];
  let fieldType = currentRow.row.find('select[name="field[type][]"]').val();
  if (allowTypes.includes(fieldType)) {
    $(".options-section").css("display", "block");
  } else {
    $(".options-section").css("display", "none");
  }
}

// display or hide collection_name in options section
$("#modalConf-options_type").change(function () {
  if ($(this).val() == "COLLECTION") {
    $(".collection_name_input_container").css("display", "block");
    $(".card-body-helpping").text(
      "Ingresar el nombre del atributo a guardar, luego una coma y finalmente el valor a mostrar. Ejemplo: 'id,username'"
    );
  } else {
    $(".collection_name_input_container").css("display", "none");
    $(".card-body-helpping").text(
      "Ingresar valores separados por coma. Ejemplo: 'Verde,Rojo,Naranja,Blanco,Negro'"
    );
  }
});

// get values for modal
function getValuesFromRow() {
  // name
  currentRow.name = currentRow.row.find('input[name="field[name][]"]').val();
  // title
  currentRow.title = `Configuración avanzada para: ${currentRow.row
    .find('input[name="field[name][]"]')
    .val()}::${currentRow.row.find('input[name="field[label][]"]').val()}`;
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
  // Options config
  // options type
  currentRow.options.type = currentRow.row
    .find(`input[name="others[${currentRow.name}][options][type]"]`)
    .val();
  // options values
  currentRow.options.values = currentRow.row
    .find(`input[name="others[${currentRow.name}][options][values]"]`)
    .val();
  // options collection_name
  currentRow.options.collection_name = currentRow.row
    .find(`input[name="others[${currentRow.name}][options][collection_name]"]`)
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
  $("#modalConf-database_type").val(
    currentRow.config.database_type || "String"
  );
  // options type
  $("#modalConf-options_type").val(currentRow.options.type);
  $("#modalConf-options_type").change(); // trigger
  // options values
  $("#modalConf-options_values").val(currentRow.options.values);
  // options collection_name
  $("#modalConf-options_collection_name").val(
    currentRow.options.collection_name
  );
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
  // Options config
  // Options type
  currentRow.row
    .find(`input[name="others[${currentRow.name}][options][type]"]`)
    .val($("#modalConf-options_type").val());
  // Options values
  currentRow.row
    .find(`input[name="others[${currentRow.name}][options][values]"]`)
    .val($("#modalConf-options_values").val());
  // Options collection_name
  currentRow.row
    .find(`input[name="others[${currentRow.name}][options][collection_name]"]`)
    .val($("#modalConf-options_collection_name").val());
}
