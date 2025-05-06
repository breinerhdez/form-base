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
    ignore: ".ignore",
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
