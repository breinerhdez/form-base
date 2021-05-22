$(document).on("click", ".deleteOption", function (e) {
  return confirm("¿Está seguro de eliminar el registro?\nSe perderán todos los datos relacionados.");
});

/**
 * Fieldsets management
 */
var deleteFieldsetAction = false;
// create modal information
$("#btnAddFieldset").click(function () {
  $("#fieldsetModalLabel").text("Nuevo grupo de campos");
});

// edit modal information
$(document).on("click", ".btnEditFieldset", function () {
  // set modal title
  $("#fieldsetModalLabel").text("Modificar grupo de campos");
  // get fieldset information
  var idFieldset = $(this).attr("data-fieldset-id");
  var legend = $(this).attr("data-fieldset-legend");
  $("#tmpFieldsetId").val(idFieldset);

  $("#legendInput").val(legend);
  $("#fieldsetModal").modal("show");
});

// delete modal information
$(document).on("click", ".btnDeleteFieldset", function () {
  deleteFieldsetAction = true;
  $(".deleteAction").removeClass("app-hidden");
  $(".createUpdateAction").addClass("app-hidden");
  $(".modalSaveAction").addClass("btn-danger").removeClass("btn-primary").text("Eliminar");
  // set modal title
  $("#fieldsetModalLabel").text("Eliminar grupo de campos");
  // get fieldset information
  let idFieldset = $(this).attr("data-fieldset-id");
  let legend = $(this).attr("data-fieldset-legend");
  $("#tmpFieldsetId").val(idFieldset);

  let deleteInformation = `Todos los datos de configuración del grupo de campos <strong>${legend}</strong> se perderán.
  <br/><br/>¿Desea continuar?`;
  $(".deleteAction p").html(deleteInformation);
  $("#fieldsetModal").modal("show");
});

// reload table
const reloadTable = () => {
  $.ajax({
    url: "/admin/form-config/get-fieldsets/" + $("#formId").val(),
  }).done(function (res) {
    if (!res.ok) {
      console.log("No fue posible obtener los datos del servidor");
    }
    $("#tableBodyFieldsets").html("");

    res.result.map((item) => {
      let rowHtml = `<tr>
        <td>${item.legend}</td>
        <td>
          <span class="fa fa-edit fa-2x cursor-pointer btnEditFieldset" data-fieldset-id=${item._id} data-fieldset-legend="${item.legend}"></span>
          <span class="fa fa-trash fa-2x cursor-pointer btnDeleteFieldset" data-fieldset-id=${item._id} data-fieldset-legend="${item.legend}"></span>
        </td>
      </tr>`;
      $("#tableBodyFieldsets").append(rowHtml);
    });
  });
};

// reset modal form
$("#fieldsetModal").on("hidden.bs.modal", function (event) {
  $("#tmpFieldsetId").val("");
  $("#legendInput").val("");
  $(".deleteAction").addClass("app-hidden");
  $(".createUpdateAction").removeClass("app-hidden");
  $(".modalSaveAction").addClass("btn-primary").removeClass("btn-danger").text("Guardar");
  deleteFieldsetAction = false;
});

// handle save action
$(".modalSaveAction").click(function () {
  let legend = $("#legendInput").val();
  if (!deleteFieldsetAction && (!legend || legend.length < 1)) {
    $("#legendInput").focus();
    return alert("El Legend es obligatorio");
  }

  let idFieldset = $("#tmpFieldsetId").val();
  let url = "";
  let data = {};

  if (deleteFieldsetAction) {
    url = "/admin/form-config/v2/delete/fieldset";
    data = {
      idFieldset,
    };
  } else if (idFieldset) {
    url = "/admin/form-config/v2/update/fieldset";
    data = {
      legend,
      idFieldset,
    };
  } else {
    url = "/admin/form-config/v2/fieldset/" + $("#formId").val();
    data = {
      legend,
    };
  }

  $.ajax({
    url,
    data,
    method: "post",
  }).done(function (res) {
    $("#fieldsetModal").modal("hide");
    reloadTable();
  });
});
