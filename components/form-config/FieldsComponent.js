import React, { useEffect, useState } from "react";

export const FieldsComponent = ({ fieldset, urlBase, getFieldsets }) => {
  const initialState = {
    classNameFullCon: "",
    label: "",
    name: "",
    required: false,
    type: "text",
  };

  const initialFields = [
    {
      classNameFullCon: "col-md-6",
      label: "ASDF label",
      name: "asdf",
      required: false,
      type: "text",
    },
    {
      classNameFullCon: "col-md-6",
      label: "QWER label",
      name: "qwer",
      required: true,
      type: "password",
    },
  ];

  // console.log(fieldset.fields)
  // console.log(typeof fieldset.fields, fieldset.fields, fieldset.fields.length)

  const [fields, setFields] = useState(initialFields);

  const [values, setValues] = useState(initialState);

  const { classNameFullCon, label, name, type, required } = values;
  const [confModal, setConfModal] = useState({});

  // useEffect(() => {
  //   setFields(fieldset.fields);
  //   // console.log(fieldset.fields);
  //   console.log("montado")
  // }, [fieldset]);

  // const [currentField, setCurrentField] = useState(initialState);

  const handleInputChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setValues({
      ...values,
      [target.name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    setFields([...fields, values]);

    $("#modalField").modal("hide");

    // setTimeout(async () => {
    let url = e.target.action;
    let data = fields;
    // data['fieldsetId'] = fieldset._id;
    let conf = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, conf);
    const result = await response.json();
    if (result.ok) {
      getFieldsets();
    }
    // }, 1000);
  };

  const handleFormNew = () => {
    setValues(initialState);
    setConfModal({
      title: "Crear campo",
      action: `${urlBase}/admin/form-config/field/${fieldset._id}`,
      btnSubmit: "Guardar",
    });
    $("#modalField").modal("show");
  };

  return (
    <>
      <h3>Configuración de campos</h3>
      {!fieldset ? (
        <p className="alert alert-info">No se ha seleccionado un Fieldset para configurar los campos</p>
      ) : (
        <>
          <div className="row">
            <div className="col-md-3 col-sm-12 buttons-up">
              <button className="btn btn-primary" onClick={handleFormNew}>
                Nuevo
              </button>
            </div>
            <div className="col-md-9 col-sm-12">
              <p>
                <strong>Fieldset: {fieldset.legend}</strong>
              </p>
            </div>
          </div>
          <ul className="simple-list">
            {fields.map((field, i) => (
              <li className="row" key={i}>
                <div className="col-md-6 col-sm-12 col-lg-9">{field.label}</div>
                <div className="col-md-6 col-sm-12 col-lg-3 actions">
                  <span className="fa fa-edit fa-2x"></span>
                  <span className="fa fa-trash fa-2x"></span>
                </div>
              </li>
            ))}
          </ul>

          <div className="modal fade" id="modalField" tabindex="-1" aria-labelledby="modalFieldLabel" aria-hidden="true">
            <div className="modal-dialog">
              <form action={confModal.action} method="post" onSubmit={handleFormSubmit}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalFieldLabel">
                      {confModal.title}
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {confModal.btnSubmit == "Eliminar" ? (
                      <div className="form-group col-md-12">
                        <p className="alert alert-danger">
                          La información se borrará de forma definitiva y no podrá recuperarla después. ¿Desea continuar?
                        </p>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="form-group col-md-12">
                          <label for="classFullCon">Label</label>
                          <input
                            type="text"
                            id="inputLabel"
                            className="form-control"
                            name="label"
                            value={label}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <label for="inputName">Nombre</label>
                          <input
                            type="text"
                            id="inputName"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              id="inputRequired"
                              className="custom-control-input"
                              name="required"
                              value={required}
                              onChange={handleInputChange}
                              checked={required}
                            />
                            <label className="custom-control-label" for="inputRequired">
                              Requerido
                            </label>
                          </div>
                        </div>

                        <div className="form-group col-md-12">
                          <label for="inputType">Tipo</label>
                          <select id="inputType" className="form-control" name="type" value={type} onChange={handleInputChange}>
                            <option value="text">Text</option>
                            <option value="password">Password</option>
                          </select>
                        </div>

                        <div className="form-group col-md-12">
                          <label for="inputClassFullCon">Clases del contenedor</label>
                          <input
                            type="text"
                            id="inputClassFullCon"
                            className="form-control"
                            name="classNameFullCon"
                            value={classNameFullCon}
                            onChange={handleInputChange}
                          />
                        </div>

                        <input type="hidden" id="idFieldset" className="form-control" name="idFieldset" value={fieldset._id} />
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                      Cancelar
                    </button>
                    <button type="submit" className={confModal.btnSubmit == "Eliminar" ? "btn btn-danger" : "btn btn-primary"}>
                      {confModal.btnSubmit}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
