$(document).ready(function () {
  // alert flash message auto hide
  setTimeout(() => {
    $(".alert .btn-close").click();
  }, 15000);

  // verify if check all options for API services
  checkOptions();
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
  return confirm("Are you sure you want to delete this object?");
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
