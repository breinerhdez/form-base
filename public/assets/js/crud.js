var formId = false;
const endpoints = {
  fieldsets: "/admin/form-config/v2/fieldset",
  fields: "/admin/form-config/v2/fields",
};

let data = {
  fieldsets: [],
  fields: [],
  formId: false,
};

let current = {
  fieldset: {},
  field: {},
};

function getFieldset(idFieldset) {
  return data.fieldsets.find((element) => element._id == idFieldset);
}

function getField(idField) {
  return data.fields.find((element) => element._id == idField);
}

// load fieldsets
const loadFieldsets = () => {
  $.ajax({
    url: endpoints.fieldsets,
    data: { form_id: data.formId },
  }).done(function (res) {
    if (!res.ok) {
      console.log("No fue posible obtener los datos del servidor");
    }

    data.fieldsets = res.result;

    $(".fieldset-list").html("");

    res.result.map((item) => {
      let rowHtml = `<div class="col-md-12 item-fieldset">
        <span>
          <button class="btn btn-primary mr-1 fa fa-edit btnEditFieldset" data-fieldset-id=${item._id} data-fieldset-legend="${item.legend}"></button>
          <button class="btn btn-danger mr-1 fa fa-trash btnDeleteFieldset" data-fieldset-id=${item._id} data-fieldset-legend="${item.legend}"></button>
        </span>
        <span>${item.legend}</span>
      </div>`;
      $(".fieldset-list").append(rowHtml);
    });
  });
};

$(document).on("click", ".item-fieldset", function () {
  $(".item-fieldset").removeClass("active");
  $(this).addClass("active");

  current.fieldset = getFieldset(
    $(this).find(".btnEditFieldset").attr("data-fieldset-id")
  );

  updateHeaderFields(true);
  loadFields();
  $("#btnAddField").attr("disabled", false);
});

function onChangeFieldsetData(name, value) {
  current.fieldset = {
    ...current.fieldset,
    [name]: value,
  };
  console.log(current.fieldset);
}

$("#btnAddFieldset").click(function () {
  $("#form-fieldset").trigger("reset");
  current.fieldset = { legend: "", form_id: data.formId };
  $("#fieldsetModal .modal-title").text("Crear grupo de campos");
});

$("#form-fieldset").submit(function (e) {
  e.preventDefault();

  let method = false;

  if ($("#fieldsetModal .modal-title").text() == "Crear grupo de campos") {
    method = "post";
  } else {
    method = "put";
  }
  if (!method) {
    return alert("No se puede realizar la operación");
  }
  $("#fieldsetModal").modal("hide");

  $.ajax({
    method,
    url: endpoints.fieldsets,
    data: current.fieldset,
    success: (res) => {
      if (res.ok) {
        loadFieldsets();
        updateHeaderFields();
      }
    },
  });
});

$(document).on("click", ".btnEditFieldset", function () {
  $(this).parents(".item-fieldset").click();

  $("#fieldsetModal").modal("show");
  setFormFields(current.fieldset, "#fieldsetModal");

  $("#fieldsetModal .modal-title").text("Editar grupo de campos");
});

$(document).on("click", ".btnDeleteFieldset", function () {
  $.ajax({
    method: "delete",
    url: endpoints.fieldsets,
    data: { idFieldset: $(this).attr("data-fieldset-id") },
    success: (res) => {
      if (res.ok) {
        loadFieldsets();
        updateHeaderFields();
      }
    },
  });
});

function updateHeaderFields(selected = false) {
  let title = "Campos";
  if (selected) {
    title = `Campos <i>[${current.fieldset.legend}]</i>`;
  }

  $(".section-fields h3 span").html(title);
}

function onChangeFieldData(name, value) {
  current.field = {
    ...current.field,
    [name]: value,
  };
  console.log(current.field);
}

// load fields
const loadFields = () => {
  console.log(current.fieldset._id);
  $.ajax({
    url: endpoints.fields,
    data: { fieldset_id: current.fieldset._id },
  }).done(function (res) {
    console.log(res);
    if (!res.ok) {
      console.log("No fue posible obtener los datos del servidor");
    }

    data.fields = res.result;

    $(".field-list").html("");

    res.result.map((item) => {
      let rowHtml = `<div class="col-md-12 item-field">
        <span>
          <button class="btn btn-primary mr-1 fa fa-edit btnEditField" data-field-id=${item._id} data-fieldset-legend="${item.legend}"></button>
          <button class="btn btn-danger mr-1 fa fa-trash btnDeleteField" data-field-id=${item._id} data-fieldset-legend="${item.legend}"></button>
        </span>
        <span>${item.label}</span>
      </div>`;
      $(".field-list").append(rowHtml);
    });

    if (res.result.length == 0) {
      $(".field-list").html("No hay campos");
    }
  });
};

$(document).ready(function () {
  data.formId = $("#formId").val();
  loadFieldsets();
});

/**
 * Función encargada de asignar los valores de un objeto a un formulario
 * @param {object} _obj Objeto con los atributos del registro
 * @param {String} _parent Elemento padre donde se encuentran los campos
 */
function setFormFields(_obj, _parent) {
  Object.entries(_obj).forEach(([attr, value]) => {
    $(_parent).find(`*[name=${attr}]`).val(value);
  });
}
