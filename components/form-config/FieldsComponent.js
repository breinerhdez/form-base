import React, { useState } from "react";

export const FieldsComponent = ({ fieldset, urlBase }) => {
  const initialState = {
    classNameFullCon: "",
    label: "",
    name: "",
    required: "",
    type: "",
  };

  const [values, setValues] = useState(initialState);

  const { classNameFullCon, label, name, type, required } = values;
  const [confModal, setConfModal] = useState({});

  // const [currentField, setCurrentField] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    $("#modalField").modal("hide");
  };

  const handleFormNew = () => {
    setValues(initialState);
    setConfModal({
      title: "Crear campo",
      action: `${urlBase}/admin/form-config/field/${fieldset._id}`,
      btnSubmit: "Guardar",
    });
    // setFieldsetForm({
    //   ...fieldsetForm,
    //   legend: fieldset.legend,
    //   idFieldset: fieldset._id,
    // });
    $("#modalField").modal("show");
  };

  return (
    <>
      <h3>Configuración de campos</h3>
      {!fieldset ? (
        <p className="alert alert-info">No se ha seleccionado un Fieldset para configurar los campos</p>
      ) : (
        <div>
          <div className="row">
            <div className="col-md-3 col-sm-12">
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
          <div className="row">
            <ul className="simple-list">
              {fieldset.fields.map((field, i) => (
                <li className="row" key={i}>
                  <div className="col-md-6 col-sm-12 col-lg-9">{field.label}</div>
                  <div className="col-md-6 col-sm-12 col-lg-3 actions">
                    <span className="fa fa-edit fa-2x"></span>
                    <span className="fa fa-trash fa-2x"></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

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
                          <label for="inputRequired">Requerido</label>
                          <input
                            type="text"
                            id="inputRequired"
                            className="form-control"
                            name="required"
                            value={required}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group col-md-12">
                          <label for="inputType">Tipo</label>
                          <input
                            type="text"
                            id="inputType"
                            className="form-control"
                            name="type"
                            value={type}
                            onChange={handleInputChange}
                          />
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
        </div>
      )}
    </>
  );
};
