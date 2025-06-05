$(document).on("change keyup", "#title", autocompleteFields);

function autocompleteFields() {
  let titleCammelCase = toLowerCamelCaseForCollection($(this).val());
  $("#path_name").val(titleCammelCase);
  $("#collection_name").val(`collection-${titleCammelCase}`);
}

function toLowerCamelCaseForCollection(texto) {
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
    .replace(/[^a-zA-Z0-9\s]/g, "") // elimina caracteres especiales
    .toLowerCase()
    .trim();

  return normalizado
    .split(/\s+/) // separa por espacios
    .join("-"); // une con guiones
}
