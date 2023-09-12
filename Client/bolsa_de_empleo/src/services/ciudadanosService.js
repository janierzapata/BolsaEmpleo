import { server } from "../constants/url.js";

import axios from "axios";

const getCiudadanos = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}Ciudadano/GetCiudadanos`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const registrarCiudadano = (ciudadano) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${server}Ciudadano/Registrar`, ciudadano)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const actualizarCiudadano = (ciudadano) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${server}Ciudadano/actualizar?identificacion=${ciudadano.numeroDocumento}`,
        ciudadano
      )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const eliminarCiudadano = (documento) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${server}Ciudadano/Eliminar?identificacion=${documento}`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const ciudadanosService = {
  registrarCiudadano,
  getCiudadanos,
  actualizarCiudadano,
  eliminarCiudadano,
};
