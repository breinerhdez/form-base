module.exports = {
  collection_id: "601953b3c47b0000c6000d22",
  action: "/admin/process",
  config: {
    btn_submit: {
      show: true,
      value: "Guardar",
    },
  },

  fieldsets: [
    {
      config: { legend: "Datos de la nueva colección" },
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
