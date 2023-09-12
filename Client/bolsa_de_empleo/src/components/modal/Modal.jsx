import React from "react";

export const Modal = (props) => {
  return (
    <div
      className="modal fade"
      id={`${props.action}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`${props.action}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${props.action}Label`}>
              {props.title}
            </h1>
            <button
              onClick={props.onClose}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button
              onClose={props.onClose}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                props.confirmAction();
              }}
              data-bs-dismiss="modal"
              type="button"
              className={`btn btn-${props.color}`}
            >
              {props.btnConfirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
