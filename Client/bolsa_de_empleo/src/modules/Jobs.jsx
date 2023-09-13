import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { vacantesService } from "../services/vacantesServices";
import Swal from "sweetalert2";
import { formatPrice } from "../utils/functions";
import { Modal } from "../components/modal/Modal";
import { ciudadanosService } from "../services/ciudadanosService";

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [ciudadanos, setCiudadanos] = useState([]);
  const [ciudadano, setCiudadano] = useState({});

  useEffect(() => {
    getJobs();
    getCiudadanos();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      Swal.close();
    }, 2000);
  }, [jobs]);

  const selectRef = useRef();

  const getJobs = () => {
    setJobs([]);
    vacantesService
      .getVacantes()
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getCiudadanos = () => {
    setCiudadanos([]);
    ciudadanosService
      .getCiudadanos()
      .then((response) => {
        setCiudadanos(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleApply = () => {
    vacantesService
      .aplicarVacante(job.codigo, ciudadano.numeroDocumento)
      .then((response) => {
        response.status === 200
          ? response.data.msg ===
            "El ciudadano ya esta postulado en una vacante"
            ? Swal.fire({
                icon: "error",
                title: "Oops...",
                showConfirmButton: false,
                timer: 3000,
                text: response.data.msg,
              })
            : Swal.fire({
                icon: "success",
                title: "Se ha aplicado a la vacante",
                showConfirmButton: false,
                timer: 1500,
              })
          : Swal.fire({
              icon: "error",
              title: "Oops...",
              timer: 1500,
              text: response.msg,
            });

        selectRef.current.value = 0;
        setCiudadano({});
        setJob({});
        getJobs();
        getCiudadanos();
      });
  };

  const handleApplyCancel = () => {
    vacantesService
      .cancelarVacante(job.codigo, ciudadano.numeroDocumento)
      .then((response) => {
        response.status === 200
          ? Swal.fire({
              icon: "success",
              title: "Se ha cancelado la aplicacion",
              showConfirmButton: false,
              timer: 1500,
            })
          : Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.msg,
            });
        setCiudadano({});
        setJob({});
        getJobs();
        getCiudadanos();
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
    <>
      <div className="container  mt-5">
        <h1 className="text-center mb-5"> Vacantes Posteadas</h1>

        {jobs.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            <h5>No hay vacantes posteadas</h5>
          </div>
        ) : (
          <div className="row justify-content-center">
            {jobs.map((job) => (
              <div key={job.id} className="col-5 m-3">
                <div className="card">
                  <div className="card-body">
                    <div className="description">
                      <h5 className="card-title">{job.cargo}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {job.empresa}
                      </h6>
                      <p className="card-text">{job.descripcion}</p>
                      <p className="card-text text-muted">
                        {formatPrice(job.salario)}
                      </p>
                    </div>
                    <div className="row px-3 btn-job">
                      {job.ciudadano.numeroDocumento !== 0 ? (
                        <button
                          onClick={() => {
                            setCiudadano(job.ciudadano);
                            setJob(job);
                          }}
                          className="btn btn-warning text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#cancelApply"
                        >
                          Cancelar aplicacion
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setCiudadano(job.ciudadano);
                            setJob(job);
                          }}
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#apply"
                        >
                          Aplicar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        confirmAction={handleApplyCancel}
        onClose={() => {}}
        btnConfirm="Cancelar aplicacion"
        color="danger"
        action="cancelApply"
        title="Cancelar aplicacion"
      >
        <h4>¿Está seguro que desea cancelar aplicacion?</h4>
        <p>
          {`Se cancelara la aplicacion a la vacante para ${ciudadano.nombres} ${ciudadano.apellidos}`}
        </p>
      </Modal>
      <Modal
        confirmAction={handleApply}
        onClose={() => {}}
        btnConfirm="Aplicar"
        color="success"
        action="apply"
        title="Aplicar a vacante"
      >
        <h4>Seleccione la persona que aplicara a la vacante</h4>
        <p>
          <select
            ref={selectRef}
            onChange={(e) => {
              let ciud = ciudadanos.find(
                (ciudadano) => ciudadano.id === parseInt(e.target.value)
              );
              setCiudadano(ciud);
            }}
            className="form-select"
            aria-label="Default select example"
          >
            <option disabled selected key={0} value={0}>
              Seleccione una opcion
            </option>
            {ciudadanos.map((ciudadano) => {
              return (
                <option key={ciudadano.id} value={ciudadano.id}>
                  {ciudadano.nombres} {ciudadano.apellidos}
                </option>
              );
            })}
          </select>
        </p>
      </Modal>
    </>
  );
};
