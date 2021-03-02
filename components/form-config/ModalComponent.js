import React, { useEffect, useState } from "react";

export const ModalComponent = ({ fieldset, confModal, values }) => {
  // const [modal, setModal] = useState(false);
  const [fields, setFields] = useState(false);

  const { classNameFullCon } = values;

  useEffect(() => {
    confModal.setValues(values);
  }, [values]);

  return (
    <div className="modal fade" id="modalField" tabindex="-1" aria-labelledby="modalFieldLabel" aria-hidden="true">
      <div className="modal-dialog">
        <form action={confModal.action} method="post" onSubmit={confModal.onSubmit}>
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
                    <label for="classFullCon">Clases del contenedor</label>
                    <input
                      type="text"
                      id="classFullCon"
                      className="form-control"
                      name="classNameFullCon"
                      value={classNameFullCon}
                      onChange={(e) => confModal.onInputChange(e)}
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
  );
};
