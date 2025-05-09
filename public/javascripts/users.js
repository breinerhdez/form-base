//TODO: pasar al app.js y que sea genérico para evitar reescrituras

$("#app-table").on("draw.dt", function () {
  let primerTr = $(".table-users tbody tr").first();
  let editBtn = primerTr.find(".edit-button-user");
  let deleteBtn = primerTr.find(".delete-button-user");

  if (editBtn.length > 0) {
    editBtn.attr("data-intro", $("#dataLang").attr("data-btn-edit"));
  }
  if (deleteBtn.length > 0) {
    deleteBtn.attr("data-intro", $("#dataLang").attr("data-btn-delete"));
  }
});
