$(document).ready(function () {
  // alert flash message auto hide
  setTimeout(() => {
    $(".alert .btn-close").click();
  }, 30000);

  $("#app-table").dataTable({
    language: {
      url: "/libs/es-ES.json",
    },
    responsive: true,
  });

  // verify if check all options for API services
  checkOptions();

  var MULTI_OPTIONS_FIELDS = ["checkbox", "radio"];
  $("form").validate({
    ignore: [],
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

  loadTooltips();

  loadIntroFields();
});

function loadTooltips() {
  $("[title]").each(function () {
    $(this).prop("data-bs-toggle", "tooltip");
    new bootstrap.Tooltip(this);
  });
}

$(document).on("click", ".btn-help-app", function () {
  introJs()
    .setOptions({
      nextLabel: "Siguiente",
      prevLabel: "Anterior",
      doneLabel: "Finalizar",
      // skipLabel: "Saltar",
      // tooltipClass: "customTooltip", // opcional para estilos personalizados
    })
    .start();
});

// event click for close flash message
$(".alert .btn-close").click(function () {
  let parent = $(this).parents(".alert");
  parent.hide(1000, function () {
    $(this).remove();
  });
});

// confirm alert for delete option
$("a.delete-button").click(function () {
  return confirm("¿Está seguro que quiere eliminar el objeto?");
});
$("a.delete-button-user").click(function () {
  return confirm(
    "¿Desea eliminar este usuario? Esta acción es permanente. También puede inactivarlo mediante la modificación."
  );
});

// check all options for API services
const checkOptions = function () {
  let allOk = true;
  $(".api-check").each((index, value) => {
    if (!allOk) return;
    allOk = value.checked;
  });
  $("#opt-all").prop("checked", allOk);
};
// enable/unenable all options for API services
$("#opt-all").on("change", () => {
  $(".api-check").prop("checked", $("#opt-all").prop("checked"));
});
// verify if check all options for API services when enable/unenable single option
$(".api-check").on("change", checkOptions);

$("#app-table, #fieldsTable").on("draw.dt", function () {
  let firstTrUsers = $(".table-users tbody tr").first();
  let firstTrCollections = $(".table-collections tbody tr").first();
  let firstTrFields = $(".table-fields tbody tr");

  if (firstTrUsers.find(".edit-button-user").length > 0) {
    firstTrUsers
      .find(".edit-button-user")
      .attr("data-intro", $("#dataLang").attr("data-btn-edit"));
  }
  if (firstTrUsers.find(".delete-button-user").length > 0) {
    firstTrUsers
      .find(".delete-button-user")
      .attr("data-intro", $("#dataLang").attr("data-btn-delete"));
  }

  if (firstTrCollections.find(".edit-button-collection").length > 0) {
    firstTrCollections
      .find(".edit-button-collection")
      .attr("data-intro", $("#dataLang").attr("data-btn-edit"));
  }
  if (firstTrCollections.find(".delete-button-collection").length > 0) {
    firstTrCollections
      .find(".delete-button-collection")
      .attr("data-intro", $("#dataLang").attr("data-btn-delete"));
  }
  if (firstTrCollections.find(".apidoc-button-collection").length > 0) {
    firstTrCollections
      .find(".apidoc-button-collection")
      .attr("data-intro", $("#dataLang").attr("data-btn-apidoc"));
  }
  if (firstTrCollections.find(".fields-button-collection").length > 0) {
    firstTrCollections
      .find(".fields-button-collection")
      .attr("data-intro", $("#dataLang").attr("data-btn-fields"));
  }

  if (firstTrFields.find(".fieldNameRow").length > 0) {
    firstTrFields
      .find(".fieldNameRow")
      .attr("data-intro", $("#dataLang").attr("data-btn-attr-name"));
  }
});

function loadIntroFields() {
  let firstTrFields = $("#fieldsTable.table-fields tbody tr").first();
  if (firstTrFields.find(".fieldNameRow").length > 0) {
    firstTrFields
      .find(".fieldNameRow")
      .attr("data-intro", $("#dataLang").attr("data-btn-attr-name"));
  }
  if (firstTrFields.find(".btn-move").length > 0) {
    firstTrFields
      .find(".btn-move")
      .attr("data-intro", $("#dataLang").attr("data-btn-attr-move"));
  }
  if (firstTrFields.find(".fieldNameRow").length > 0) {
    firstTrFields
      .find(".btn-removeField")
      .attr("data-intro", $("#dataLang").attr("data-btn-attr-delete"));
  }
}
