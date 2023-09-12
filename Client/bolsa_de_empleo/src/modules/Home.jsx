import React, { useEffect, useRef, useState } from "react";
import { tipoDocumentoService } from "../services/documentoService";
import { ciudadanosService } from "../services/ciudadanosService";
import Swal from "sweetalert2";

const initialForm = {
  apellidos: "",
  aspiracionSalarial: "",
  email: "",
  fechaNacimiento: "",
  nombres: "",
  numeroDocumento: "",
  profesion: "",
  tipoDocumento: {},
};

export const Home = () => {
  const [ciudadano, setCiudadano] = useState(initialForm);
  const [tipoDocumentos, setTipoDocumento] = useState([]);

  useEffect(() => {
    getTipoDocumento();
  }, []);

  const selectRef = useRef();

  const onChange = ({ target }) => {
    let value = target.value;
    let name = target.name;

    if (name === "tipoDocumento") {
      value = {
        id: target.value,
      };
    }
    setCiudadano({
      ...ciudadano,
      [name]: value,
    });
  };

  const getTipoDocumento = () => {
    setTipoDocumento([]);
    tipoDocumentoService
      .getTipoDocumentos()
      .then((response) => {
        setTipoDocumento(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const validateForm = () => {
    if (
      ciudadano.nombres === "" ||
      ciudadano.apellidos === "" ||
      ciudadano.tipoDocumento.id === "" ||
      ciudadano.numeroDocumento === "" ||
      ciudadano.email === "" ||
      ciudadano.fechaNacimiento === "" ||
      ciudadano.profesion === "" ||
      ciudadano.aspiracionSalarial === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    ciudadanosService
      .registrarCiudadano(ciudadano)
      .then((response) => {
        response.status === 200 &&
          Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            showConfirmButton: false,
            timer: 1500,
          });

        setCiudadano(initialForm);
        selectRef.current.value = 0;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="container  mt-5 ">
      <h1 className="text-center mb-4"> Registro de Usuarios </h1>

      <div className="row justify-content-center">
        <form className="col-5">
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
            <label htmlFor="tipoDocumento" className="form-label">
              Tipo documento
            </label>
            <select
              ref={selectRef}
              name="tipoDocumento"
              onChange={onChange}
              className="form-select"
              aria-label="Default select example"
            >
              <option disabled selected key={0} value={0}>
                Seleccione una opcion
              </option>
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
            <label htmlFor="numeroDocumento" className="form-label">
              Número de documento
            </label>
            <input
              type="text"
              className="form-control"
              id="numeroDocumento"
              name="numeroDocumento"
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
              Fecha Nacimiento (dd/mm/aaaa)
            </label>
            <input
              type="fechaNacimiento"
              className="form-control"
              id="fechaNacimiento"
              name="fechaNacimiento"
              onChange={onChange}
              aria-describedby="fechaNacimiento"
              value={ciudadano.fechaNacimiento}
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
          <div className="row justify-content-end ">
            <button
              type="button"
              onClick={handleSubmit}
              className="  btn btn-primary col-5"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
