import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const FieldsComponent = () => {
  const urlBase = `http://localhost:5000`;

  const fieldsetId = document.getElementById("fieldsetId").value;

  const initialState = {
    classNameFullCon: "",
    label: "",
    name: "",
    required: true,
    type: "text",
    fieldset_id: fieldsetId,
    _id: "",
    projection: false,
  };

  const [fieldset, setFieldset] = useState([]);
  const [fields, setFields] = useState([]);

  const getFieldset = async () => {
    let url = `${urlBase}/admin/form-config/get-fieldset/${fieldsetId}`;
    const response = await fetch(url);
    const data = await response.json();
    setFieldset(data.result);
    console.log("Se refrescó el Fieldset");
  };

  const getFields = async () => {
    let url = `${urlBase}/admin/form-config/get-fields/${fieldsetId}`;
    const response = await fetch(url);
    const data = await response.json();
    setFields(data.result);
    console.log("Se refrescaron los Fields");
  };

  useEffect(() => {
    getFieldset();
    getFields();
  }, []);

  const [values, setValues] = useState(initialState);

  const { classNameFullCon, label, name, type, required, _id: field_id, projection } = values;
  const [confModal, setConfModal] = useState({});

  const handleInputChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setValues({
      ...values,
      [target.name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    $("#modalField").modal("hide");

    let url = e.target.action;
    let data = values;

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
      getFields();
    }
  };

  const handleFormNew = () => {
    setValues(initialState);
    setConfModal({
      title: "Crear campo",
      action: `${urlBase}/admin/form-config/fields/create`,
      btnSubmit: "Guardar",
    });
    $("#modalField").modal("show");
  };

  const handleFormEdit = (field) => {
    setValues(field);
    setConfModal({
      title: "Modificar campo",
      action: `${urlBase}/admin/form-config/fields/update`,
      btnSubmit: "Modificar",
    });
    $("#modalField").modal("show");
  };

  const handleFormDelete = (field) => {
    setValues(field);
    setConfModal({
      title: "Eliminar campo",
      action: `${urlBase}/admin/form-config/fields/delete`,
      btnSubmit: "Eliminar",
    });
    $("#modalField").modal("show");
  };

  return (
    <>
      <h3>Fieldset: {fieldset.legend}</h3>
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
          </div>
          <ul className="simple-list">
            {fields.map((field, i) => (
              <li className="row" key={i}>
                <div className="col-md-6 col-sm-12 col-lg-9">{field.label}</div>
                <div className="col-md-6 col-sm-12 col-lg-9">{field.type}</div>
                <div className="col-md-6 col-sm-12 col-lg-3 actions">
                  <span className="fa fa-edit fa-2x" onClick={() => handleFormEdit(field)}></span>
                  <span className="fa fa-trash fa-2x" onClick={() => handleFormDelete(field)}></span>
                </div>
              </li>
            ))}
          </ul>

          <div className="modal fade" id="modalField" tabIndex="-1" aria-labelledby="modalFieldLabel" aria-hidden="true">
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
                        <label htmlFor="labelInput">Label</label>
                        <span id="labelInput" className="form-control">
                          {label}
                        </span>
                        <input type="hidden" id="idField" className="form-control" name="idField" value={field_id} />
                      </div>
                    ) : (
                      <div className="row">
                        <div className="form-group col-md-12">
                          <label htmlFor="classFullCon">Label</label>
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
                          <label htmlFor="inputName">Nombre</label>
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
                            <label className="custom-control-label" htmlFor="inputRequired">
                              Requerido
                            </label>
                          </div>
                        </div>

                        <div className="form-group col-md-12">
                          <label htmlFor="inputType">Tipo</label>
                          <select id="inputType" className="form-control" name="type" value={type} onChange={handleInputChange}>
                            <option value="text">Text</option>
                            <option value="password">Password</option>
                          </select>
                        </div>

                        <div className="form-group col-md-12">
                          <label htmlFor="inputClassFullCon">Clases del contenedor</label>
                          <input
                            type="text"
                            id="inputClassFullCon"
                            className="form-control"
                            name="classNameFullCon"
                            value={classNameFullCon}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              id="inputProjection"
                              className="custom-control-input"
                              name="projection"
                              value={projection}
                              onChange={handleInputChange}
                              checked={projection}
                            />
                            <label className="custom-control-label" htmlFor="inputProjection">
                              Aparecer en el listado
                            </label>
                          </div>
                        </div>
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

if (document.getElementById("main-react-fields-container")) {
  ReactDOM.render(<FieldsComponent />, document.getElementById("main-react-fields-container"));
}
