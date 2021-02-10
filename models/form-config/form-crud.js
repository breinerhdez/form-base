module.exports = {
  action: "/",
  config: {
    btn_submit: {
      show: true,
      value: "Guardar",
    },
    projection: ["title", "path_name", "collection_name"],
    schema: {
      collection_name: {
        type: "String",
        required: [true, "El nombre de la colección es obligatoria"],
      },
      path_name: {
        type: "String",
        required: [true, "La URI es obligatoria"],
      },
      title: {
        type: "String",
        required: [true, "El título principal es obligatorio"],
      },
    },
  },
  fieldsets: [
    {
      config: {
        legend: "Datos de la colección",
      },
      fields: [
        [
          {
            type: "text",
            name: "path_name",
            label: "URI",
          },
          {
            type: "text",
            name: "collection_name",
            label: "Nombre de la colección de datos",
          },
          {
            type: "text",
            name: "title",
            label: "Título principal",
          },
        ],
      ],
    },
  ],
};
