// var currentItem = {};

// <input type="text" name="others[input_name][rules][required]" placeholder="others.rules.required" value="" />
// <input type="text" name="others[input_name][config][database_type]" placeholder="others.config.database_type" />
// <input type="text" name="others[input_name][options][type]" value="CUSTOM" placeholder="others.options.type" />
// <input type="text" name="others[input_name][options][values]" value="Option 1,Option 2,Option 3" placeholder="others.options.values" />
// <input type="text" name="others[input_name][options][collection_name]" value="" placeholder="others.options.collection_name" />

// form for new field
const newFieldForm = `<tr class="row-move-class">
  <td class="row">
    <div class="col-md-1 center-item">
      <span class="fa fa-arrows"></span>
    </div>
    <div class="col-md-11">
      <input type="text" name="field[label][]" class="form-control fieldNameRow" placeholder="Etiqueta" required data-rule-required="true" title="Todos los nombres de campo son obligatorios" autocomplete="off" value="">
      <div class="otherElements" style="display:none">
        <input type="text" name="field[name][]" placeholder="field.name" />
        <input type="text" name="field[type][]" placeholder="field.type" />
        <input type="text" name="field[cols][]" placeholder="field.cols" value="col-md-6" />
        <input type="checkbox" name="field[projection][]" />
        
        <input type="text" name="others_rules_required[]" placeholder="others.rules.required" />
        <input type="text" name="others_config_database_type[]" placeholder="others.config.database_type" />
        <input type="text" name="others_options_type[]" placeholder="others.options.type" />
        <input type="text" name="others_options_values[]" placeholder="others.options.values" />
        <input type="text" name="others_options_collection_name[]" placeholder="others.options.collection_name" />
             
        <input type="text" name="field[default_value][]" placeholder="Default value" />
      </div>
    </div>
  </td>
  <!--<td>
     <input type="text" name="field[label][]" placeholder="Label field" required>
  </td>-->
  <!--  <td>
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
  </td>-->
  <!--<td>
    <input type="text" name="field[default_value][]" placeholder="Default value">
  </td>-->
  <!--<td>
    <div class="form-check form-switch">
      <input type="checkbox" role="switch" name="field[projection][]" class="projectionCheckboxRow form-check-input">
    </div>
  </td>-->
  <!--<td>
    <button type="button" class="btn btn-primary buttonAdvancedModal" data-bs-toggle="modal" data-bs-target="#advancedModal">Configurar</button>
  </td>-->
  <td class="col-md-1 center-item">
    <span class="fa fa-trash-o btn-removeField btn btn-danger" title="Eliminar"></span>
  </td>
</tr>`;

$(document).ready(function () {
  // sortable for fields rows
  $("#rowFieldsSortable").sortable();
  showOptionsSection();
  setHelpMessageOptions();
  $(".fieldNameRow").first().click();
  aplicarValidacionCamposDinamicos();

  $("form").validate().destroy();

  var MULTI_OPTIONS_FIELDS = ["checkbox", "radio"];
  $("form").validate({
    ignore: [],
    rules: {
      "field[name][]": {
        required: true,
      },
    },
    highlight: function (element) {
      if (!MULTI_OPTIONS_FIELDS.includes(element.type)) {
        $(element).addClass("is-invalid").removeClass("is-valid");
      }
    },
    unhighlight: function (element) {
      if (!MULTI_OPTIONS_FIELDS.includes(element.type)) {
        $(element).removeClass("is-invalid").addClass("is-valid");
      }
    },
  });

  $("form").valid();
});

// event handler for add field
$("#btnAddField").on("click", function () {
  let nuevoCampo = $(newFieldForm);
  $("#fieldsTable tbody").append(nuevoCampo);

  nuevoCampo.rules("add", {
    required: true,
  });

  // nuevoCampo.val("");

  // $("input[name='field[name][]']").each(function () {
  //   if ($(this).val() == null || $(this).val() == "") {
  //     $(this).valid(false);
  //   } else {
  //     $(this).valid(true);
  //   }
  // });

  // $("#fieldsTable tbody").append(newFieldForm);
  $("#fieldsTable tbody tr")
    .last()
    .find('input[name="field[label][]"]')
    .click()
    .focus();
  aplicarValidacionCamposDinamicos();
  $("[title]").each(function () {
    const tooltip = bootstrap.Tooltip.getInstance(this);
    if (tooltip) {
      tooltip.dispose(); // elimina la instancia
    }
  });
  loadTooltips();
});

// event handler for remove field
$(document).on("click", ".btn-removeField", function () {
  if (confirm("¿Está seguro que quiere eliminar el campo?")) {
    let row = $(this).parents("tr");
    row.find(".fieldNameRow").rules("remove");
    row.hide(800, function () {
      $(this).remove();
      aplicarValidacionCamposDinamicos();
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
$(document).on(
  "click change keyup",
  ".buttonAdvancedModal, #rowFieldsSortable td",
  function () {
    currentRow.row = $(this).parents("tr");
    getValuesFromRow();
    setValuesForModal();
    setStyleCurrentFieldRow();
    showOptionsSection();
    setHelpMessageOptions();
  }
);

function setStyleCurrentFieldRow() {
  $("#fieldsTable tr").removeClass("field-selected");
  currentRow.row.addClass("field-selected");
}

// display or hide options section
function showOptionsSection() {
  let allowTypes = ["Select", "Radio", "Checkbox"];
  let fieldType = $("#field-type").val();
  if (allowTypes.includes(fieldType)) {
    $(".options-section").css("display", "block");
  } else {
    $(".options-section").css("display", "none");
  }
}

$(document).on("change", "#field-type", showOptionsSection);

// display or hide collection_name in options section
function setHelpMessageOptions() {
  if ($("#field-options_type").val() == "COLLECTION") {
    $(".collection_name_input_container").removeClass("d-none");
    $(".card-body-helpping").text(
      "Ingresar el nombre del atributo a guardar, luego una coma y finalmente el valor a mostrar. Ejemplo: si quiere guardar 'id' y mostrar 'username' se ingresa 'id,username'"
    );
  } else {
    $(".collection_name_input_container").addClass("d-none");
    $(".card-body-helpping").text(
      "Ingresar valores separados por coma. Ejemplo: 'Verde,Rojo,Naranja,Blanco,Negro'"
    );
  }
}
$("#field-options_type").change(setHelpMessageOptions);

// $("#field-options_type").change(function () {
//   if ($(this).val() == "COLLECTION") {
//     $(".collection_name_input_container").css("display", "block");
//     $(".card-body-helpping").text(
//       "Ingresar el nombre del atributo a guardar, luego una coma y finalmente el valor a mostrar. Ejemplo: 'id,username'"
//     );
//   } else {
//     $(".collection_name_input_container").css("display", "none");
//     $(".card-body-helpping").text(
//       "Ingresar valores separados por coma. Ejemplo: 'Verde,Rojo,Naranja,Blanco,Negro'"
//     );
//   }
// });

// get values from hide form
function getValuesFromRow() {
  // name
  currentRow.name = currentRow.row.find('input[name="field[name][]"]').val();
  // label
  currentRow.label = currentRow.row.find('input[name="field[label][]"]').val();
  // type
  currentRow.type = currentRow.row.find('input[name="field[type][]"]').val();
  // projection
  currentRow.projection = currentRow.row
    .find('input[name="field[projection][]"]')
    .prop("checked");
  // title
  currentRow.title = `Configuración avanzada para: ${currentRow.row
    .find('input[name="field[name][]"]')
    .val()}::${currentRow.row.find('input[name="field[label][]"]').val()}`;
  // cols
  currentRow.cols = currentRow.row.find('input[name="field[cols][]"]').val();
  // required
  currentRow.rules.required =
    currentRow.row.find(`input[name="others_rules_required[]"]`).val() == "true"
      ? true
      : false;
  // database type
  currentRow.config.database_type = currentRow.row
    .find(`input[name="others_config_database_type[]"]`)
    .val();
  // Options config
  // options type
  currentRow.options.type = currentRow.row
    .find(`input[name="others_options_type[]"]`)
    .val();
  // options values
  currentRow.options.values = currentRow.row
    .find(`input[name="others_options_values[]"]`)
    .val();
  // options collection_name
  currentRow.options.collection_name = currentRow.row
    .find(`input[name="others_options_collection_name[]"]`)
    .val();

  // currentItem = currentRow;
}

// set data to right form
function setValuesForModal() {
  console.log("Asignando valores a formulario visible");
  // title
  // $("#advancedConfModalTitle").text(currentRow.title);
  // name
  $("#field-name").val(currentRow.name);
  // label
  $("#field-label").val(currentRow.label);
  // type
  $("#field-type").val(currentRow.type);
  // projection
  $("#field-projection").prop("checked", currentRow.projection);
  // cols
  $("#field-cols").val(currentRow.cols);
  // required
  $("#field-required").prop("checked", currentRow.rules.required);
  // database type
  $("#field-database_type").val(currentRow.config.database_type || "String");
  // options type
  $("#field-options_type").val(currentRow.options.type);
  // $("#field-options_type").change(); // trigger
  // options values
  // $("#field-options_values").val(currentRow.options.values);
  // options collection_name
  $("#field-options_collection_name").val(currentRow.options.collection_name);

  if (currentRow.options.type == "COLLECTION") {
    $("#field-options_collection_name").change();
  } else {
    $("#field-options_values_input").val(currentRow.options.values);
  }
  $("#field-options_type").change();
}

function changeDetails() {
  console.log("Asignando valores a campos ocultos");

  // close modal
  // $(".btn-close-modal").click();

  // set name
  currentRow.row
    .find('input[name="field[name][]"]')
    .val($("#field-name").val());
  // set label
  currentRow.row
    .find('input[name="field[label][]"]')
    .val($("#field-label").val());
  // console.log("#field-label", $("#field-label").val());
  // set type
  currentRow.row
    .find('input[name="field[type][]"]')
    .val($("#field-type").val());
  // set projection
  currentRow.row
    .find('input[name="field[projection][]"]')
    .prop("checked", $("#field-projection").prop("checked"));
  // set cols
  // currentRow.row
  //   .find('input[name="field[cols][]"]')
  //   .val($("#field-cols").val());
  // required
  currentRow.row
    .find(`input[name="others_rules_required[]"]`)
    .val($("#field-required").prop("checked") == true ? "true" : "");
  // database type
  currentRow.row
    .find(`input[name="others_config_database_type[]"]`)
    .val($("#field-database_type").val());
  // Options config
  // Options type
  currentRow.row
    .find(`input[name="others_options_type[]"]`)
    .val($("#field-options_type").val());
  // Options values
  // currentRow.row
  //   .find(`input[name="others_options_values[]"]`)
  //   .val($("#field-options_values").val());
  // Options collection_name
  currentRow.row
    .find(`input[name="others_options_collection_name[]"]`)
    .val($("#field-options_collection_name").val());

  console.log(currentRow);
}

$(document).on(
  "change keyup",
  "#fieldsTableDetail select, #fieldsTableDetail input, #fieldsTableDetail checkbox, #optionsTable select, #optionsTable input",
  changeDetails
);

$(document).on("keyup", "#fieldsTableDetail input", changeDetails);

// Esta función puedes llamarla cada vez que agregues elementos nuevos
function aplicarValidacionCamposDinamicos() {
  let flag = true;
  let submitButton = $("button[type='submit']");
  $("input[name='field[name][]']").each(function () {
    if ($(this).val() == null || $(this).val() == "") {
      $(this).valid(false);
      flag = false;
      submitButton.prop("disabled", true);
    } else {
      $(this).valid(true);
    }
  });
  if (flag) submitButton.prop("disabled", false);
}

$(document).on(
  "change keyup focus click",
  ".fieldNameRow",
  aplicarValidacionCamposDinamicos
);
// function aplicarValidacionCamposDinamicosOnChangeItem() {
//   console.log("onChange", $(this).val());
//   // if (!$(this).val().length) {
//   //   $(this).data("validated", false);
//   // } else {
//   //   $(this).data("validated", true);
//   // }
//   $("form").valid();
// }

$(document).on("change keyup", ".fieldNameRow", function () {
  $(this).parents("tr").find("");

  let fieldName = toLowerCamelCase($(this).val());

  currentRow.row.find('input[name="field[name][]"]').val(fieldName);

  currentRow.row
    .find('input[name="field[projection][]"]')
    .prop("value", fieldName);
});

function toLowerCamelCase(texto) {
  const mapaReemplazo = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "a",
    É: "e",
    Í: "i",
    Ó: "o",
    Ú: "u",
    ñ: "n",
    Ñ: "n",
  };

  const normalizado = texto
    .split("")
    .map((c) => mapaReemplazo[c] || c)
    .join("")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase()
    .trim();

  return normalizado
    .split(/\s+/)
    .map((palabra, index) =>
      index === 0 ? palabra : palabra.charAt(0).toUpperCase() + palabra.slice(1)
    )
    .join("");
}

$(document).on("change", "#field-options_collection_name", async function () {
  let collectionName = $(this).val();
  let url = `/admin/fields/getFields/${collectionName}`;
  try {
    let response = await fetch(url);
    if (!response.ok)
      throw new Error(
        `Error en la petición: ${response.status} - ${response.statusText}`
      );
    let responseData = await response.json();
    if (!responseData.status)
      throw new Error(`Error en la petición: ${responseData.msg}`);

    let dbOptions = responseData.data;
    dbOptions = dbOptions.sort((a, b) => a["label"].localeCompare(b["label"]));

    let options = [];
    options.push(`<option value="">Seleccione una opción</option>`);

    let value = currentRow.options.values;
    for (const item of dbOptions) {
      let option = `<option value="${item.name}"`;
      option += value == item.name ? ` selected` : "";
      option += `>${item.label}</option>`;
      options.push(option);
    }
    $("select#field-options_values_select").html(options.join(""));
  } catch (error) {
    console.log(error);
  }
});

$(document).on("change", "select#field-options_values_select", function () {
  console.log(
    "select#field-options_values_select ha cambiado",
    `[${$(this).val()}]`
  );
  currentRow.row
    .find(`input[name="others_options_values[]"]`)
    .val($(this).val());
});

$(document).on("change keyup", "input#field-options_values_input", function () {
  console.log(
    "input#field-options_values_input ha cambiado",
    `[${$(this).val()}]`
  );
  currentRow.row
    .find(`input[name="others_options_values[]"]`)
    .val($(this).val());
});

$(document).on("change", "#field-options_type", function () {
  let manual = $("#fromManualConfig");
  let collec = $("#fromCollectionConfig");
  collec.addClass("dsp-none");
  manual.addClass("dsp-none");
  if ($(this).val() == "COLLECTION") {
    collec.removeClass("dsp-none");
  } else {
    manual.removeClass("dsp-none");
  }
});
