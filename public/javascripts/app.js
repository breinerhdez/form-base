$(document).ready(function () {
  setTimeout(() => {
    $(".alert .btn-close").click();
  }, 15000);
});

$(".alert .btn-close").click(function () {
  let parent = $(this).parents(".alert");
  parent.hide(1000, function () {
    $(this).remove();
  });
});

$("a.delete-button").click(function () {
  return confirm("Are you sure you want to delete this object?");
});
