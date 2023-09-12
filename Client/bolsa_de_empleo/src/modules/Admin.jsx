import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { Modal } from "../components/modal/Modal";

import { ciudadanosService } from "../services/ciudadanosService";
import { tipoDocumentoService } from "../services/documentoService";
import { formatDate, formatPrice } from "../utils/functions";

export const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [ciudadanos, setCiudadanos] = useState([]);
  const [ciudadano, setCiudadano] = useState({});
  const [tipoDocumentos, setTipoDocumento] = useState([]);

  useEffect(() => {
    getCiudadanos();
    getTipoDocumento();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      Swal.close();
    }, 2000);
  }, [ciudadanos]);

  const getCiudadanos = async () => {
    ciudadanosService.getCiudadanos().then((response) => {
      setCiudadanos(response.data);
    });
  };

  const getTipoDocumento = () => {
    tipoDocumentoService
      .getTipoDocumentos()
      .then((response) => {
        setTipoDocumento(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onClose = () => {
    setCiudadano({});
  };

  const onChange = ({ target }) => {
    if (target.name === "numeroDocument") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede editar el número de documento",
      });
      return;
    }

    setCiudadano({
      ...ciudadano,
      [target.name]: target.value,
    });
  };

  const handleUpdate = () => {
    ciudadanosService.actualizarCiudadano(ciudadano).then((response) => {
      response.status === 200 &&
        Swal.fire({
          icon: "success",
          title: "Ciudadano actualizado correctamente",
        });

      getCiudadanos();
    });
  };

  const handleDelete = () => {
    ciudadanosService
      .eliminarCiudadano(ciudadano.numeroDocumento)
      .then((response) => {
        response.status === 200 &&
          Swal.fire({
            icon: "success",
            title: "Ciudadano eliminado correctamente",
          });

        getCiudadanos();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  if (loading) {
    Swal.fire({
      title: "Cargando datos",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  return (
    <div className="container  mt-5">
      <h1 className="text-center mb-5"> Usuarios Registrados</h1>

      {ciudadanos.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <h5 className="text-center">No hay datos para mostrar</h5>
        </div>
      ) : (
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">cedula</th>
              <th scope="col">Nombres</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Fecha nacimiento</th>
              <th scope="col">Correo</th>
              <th scope="col">aspiracion</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {ciudadanos.map((ciudadano) => (
              <tr key={ciudadano.id}>
                <td>{ciudadano.numeroDocumento}</td>
                <td>{ciudadano.nombres}</td>
                <td>{ciudadano.apellidos}</td>
                <td>{formatDate(ciudadano.fechaNacimiento)}</td>
                <td>{ciudadano.email}</td>
                <td>{ciudadano.aspiracionSalarial}</td>
                <td className=" row justify-content-evenly">
                  <button
                    id="editModal"
                    onClick={() => setCiudadano(ciudadano)}
                    type="button"
                    className="btn btn-primary col-5"
                    data-bs-toggle="modal"
                    data-bs-target="#edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setCiudadano(ciudadano)}
                    type="button"
                    className="btn btn-danger col-5"
                    data-bs-toggle="modal"
                    data-bs-target="#delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        confirmAction={handleUpdate}
        action="edit"
        title="Editar Ciudadano"
        btnConfirm="Editar"
        color="primary"
        onClose={onClose}
      >
        <form>
          <div className="mb-3">
            <label htmlFor="nombres" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              className="form-control"
              id="nombres"
              name="nombres"
              onChange={onChange}
              aria-describedby="nombres"
              value={ciudadano.nombres}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className="form-control"
              id="apellidos"
              name="apellidos"
              onChange={onChange}
              aria-describedby="apellidos"
              value={ciudadano.apellidos}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="numeroDocument" className="form-label">
              Tipo documento
            </label>
            <select className="form-select" aria-label="Default select example">
              {tipoDocumentos.map((tipoDocumento) => {
                return (
                  <option key={tipoDocumento.id} value={tipoDocumento.id}>
                    {tipoDocumento.tipo}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="numeroDocument" className="form-label">
              Número de documento
            </label>
            <input
              disabled
              type="text"
              className="form-control"
              id="numeroDocument"
              name="numeroDocument"
              onChange={onChange}
              aria-describedby="numeroDocumento"
              value={ciudadano.numeroDocumento}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="email"
              value={ciudadano.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">
              Fecha Nacimiento (aaaa/mm/dd)
            </label>
            <input
              type="fechaNacimiento"
              className="form-control"
              id="fechaNacimiento"
              name="fechaNacimiento"
              onChange={onChange}
              aria-describedby="fechaNacimiento"
              value={ciudadano.fechaNacimiento?.substring(0, 10)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profesion" className="form-label">
              Profesion
            </label>
            <input
              type="profesion"
              className="form-control"
              id="profesion"
              name="profesion"
              onChange={onChange}
              aria-describedby="profesion"
              value={ciudadano.profesion}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="aspiracionSalarial" className="form-label">
              Aspiracion Salarial
            </label>
            <input
              type="aspiracionSalarial"
              className="form-control"
              id="aspiracionSalarial"
              name="aspiracionSalarial"
              onChange={onChange}
              aria-describedby="aspiracionSalarial"
              value={ciudadano.aspiracionSalarial}
            />
          </div>
        </form>
      </Modal>

      <Modal
        confirmAction={handleDelete}
        onClose={onClose}
        btnConfirm="Eliminar"
        color="danger"
        action="delete"
        title="Eliminar Ciudadano"
      >
        <h4>¿Está seguro que desea eliminar el ciudadano?</h4>
        <p> {`${ciudadano.nombres} ${ciudadano.apellidos}`}</p>
      </Modal>
    </div>
  );
};
