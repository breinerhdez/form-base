$(document).ready(function () {
  showConfigForm();
});

function showConfigForm() {
  $(".text-end button").remove();
  $(".text-end a").removeClass("me-2");
  $("input, select, textarea, button").prop("disabled", true);
}
