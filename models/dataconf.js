module.exports = {
  action: "processForm/",
  config: {
    btn_submit: {
      show: true,
      value: "Enviar",
      // className: "btn-success"
    },
  },

  fieldsets: [
    {
      config: { legend: "Datos personales" },
      fields: [
        [
          {
            name: "nombre",
            label: "Nombre (s)",
            required: true,
            classNameFullCon: "col-md-6",
          },
          {
            type: "text",
            name: "apellido",
            label: "Apellido (s)",
            classNameFullCon: "col-md-6",
          },
        ],
        [
          {
            type: "email",
            name: "email",
            label: "Correo electrónico",
          },
        ],
      ],
    },
    {
      config: { legend: "Residencia" },
      fields: [
        [
          {
            name: "ciudad",
            label: "Ciudad",
            // required: true,
            // classNameFullCon: "col-md-6",
          },
          {
            name: "pais",
            label: "País",
            // required: true,
            // classNameFullCon: "col-md-6",
          },
        ],
      ],
    },
    {
      config: { legend: "Educación" },
      fields: [
        [
          {
            name: "titulo",
            label: "Título obtenido",
            // required: true,
            // classNameFullCon: "col-md-6",
          },
          {
            name: "universidad",
            label: "Universidad",
            // required: true,
            // classNameFullCon: "col-md-6",
          },
        ],
      ],
    },
  ],
};
