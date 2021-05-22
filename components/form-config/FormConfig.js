import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { FieldsComponent } from "./FieldsComponent";

export const FormConfig = () => {
  const urlBase = `http://localhost:5000`;
  const formId = document.getElementById("formId").value;

  const [fieldsets, setFieldsets] = useState([]);

  const [modal, setModal] = useState({});

  // const [currentFieldset, setCurrentFieldset] = useState(false);

  const [fieldsetForm, setFieldsetForm] = useState({
    legend: "",
    idFieldset: "",
  });
  const { legend, idFieldset } = fieldsetForm;

  const getFieldsets = async () => {
    let url = `${urlBase}/admin/form-config/get-fieldsets/${formId}`;
    const response = await fetch(url);
    const data = await response.json();
    setFieldsets(data.result);
    console.log("Se refrescaron los Fieldsets");
  };

  useEffect(() => {
    getFieldsets();
  }, []);

  const handleFormNew = () => {
    setModal({
      title: "Crear fieldset",
      action: `${urlBase}/admin/form-config/v2/fieldset/${formId}`,
      btnSubmit: "Guardar",
    });
    setFieldsetForm({
      ...fieldsetForm,
      legend: "",
    });
    $("#exampleModal").modal("show");
  };

  const handleFormEdit = (fieldset) => {
    setModal({
      title: "Modificar fieldset",
      action: `${urlBase}/admin/form-config/v2/update/fieldset`,
      btnSubmit: "Modificar",
    });
    setFieldsetForm({
      ...fieldsetForm,
      legend: fieldset.legend,
      idFieldset: fieldset._id,
    });
    $("#exampleModal").modal("show");
  };

  const handleFormDelete = (fieldset) => {
    setModal({
      title: "Eliminar fieldset",
      action: `${urlBase}/admin/form-config/v2/delete/fieldset`,
      btnSubmit: "Eliminar",
    });
    setFieldsetForm({
      ...fieldsetForm,
      legend: fieldset.legend,
      idFieldset: fieldset._id,
    });
    $("#exampleModal").modal("show");
  };

  const handleInputChange = (e) => {
    setFieldsetForm({
      ...fieldsetForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFieldsetSubmit = async (e) => {
    e.preventDefault();
    $("#exampleModal").modal("hide");

    let url = e.target.action;
    let data = fieldsetForm;
    data["form_id"] = formId;
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
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h3>Fieldsets</h3>
        <div className="buttons-up">
          <button className="btn btn-primary" onClick={handleFormNew}>
            Nuevos
          </button>
        </div>
        <ul className="simple-list">
          {fieldsets.map((fieldset) => (
            <li className="row" key={fieldset._id}>
              <div className="col-md-6 col-sm-12 col-lg-10">{fieldset.legend}</div>
              <div className="col-md-6 col-sm-12 col-lg-2 text-right actions">
                <span className="fa fa-edit fa-2x" onClick={() => handleFormEdit(fieldset)}></span>
                <span className="fa fa-trash fa-2x" onClick={() => handleFormDelete(fieldset)}></span>
                <a href={`/admin/form-config/fields/${fieldset._id}`}>
                  <span className="fa fa-building-o fa-2x"></span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form action={modal.action} method="post" onSubmit={handleFieldsetSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {modal.title}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modal.btnSubmit == "Eliminar" ? (
                  <div className="form-group col-md-12">
                    <p className="alert alert-danger">
                      La información se borrará de forma definitiva y no podrá recuperarla después. ¿Desea continuar?
                    </p>
                    <label htmlFor="legendInput">Legend</label>
                    <span id="legendInput" className="form-control">
                      {legend}
                    </span>
                    <input type="hidden" id="idFieldset" className="form-control" name="idFieldset" value={idFieldset} />
                  </div>
                ) : (
                  <div className="form-group col-md-12">
                    <label htmlFor="legendInput">Legend</label>
                    <input
                      type="text"
                      id="legendInput"
                      className="form-control"
                      name="legend"
                      value={legend}
                      onChange={handleInputChange}
                    />
                    <input type="hidden" id="idFieldset" className="form-control" name="idFieldset" value={idFieldset} />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Cancelar
                </button>
                <button type="submit" className={modal.btnSubmit == "Eliminar" ? "btn btn-danger" : "btn btn-primary"}>
                  {modal.btnSubmit}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

if (document.getElementById("main-react-container")) {
  ReactDOM.render(<FormConfig />, document.getElementById("main-react-container"));
}
