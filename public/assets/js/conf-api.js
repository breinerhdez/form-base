/**
 * Validar si todas están habilitadas y habilitar la opción de todos
 */
var checkOptions = function () {
  var allOk = true;
  $("form .form-check-input").each((index, value) => {
    if (!allOk) return;
    allOk = value.checked;
  });
  $("#opt-all").prop("checked", allOk);
};

$(document).ready(() => {
  // verificar al cargar por primera vez si se requiere activar la opción "todos"
  checkOptions();
  // habilitar/deshabilitar todos según el valor de la opción "todos"
  $("#opt-all").on("change", () => {
    $("form .form-check-input").prop("checked", $("#opt-all").prop("checked"));
  });
  // escuchar los cambios de las opciones y validar si se habilita la opción "todos"
  $("form .form-check-input").on("change", checkOptions);
});
