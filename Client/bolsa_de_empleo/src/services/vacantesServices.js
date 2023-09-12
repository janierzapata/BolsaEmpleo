import { server } from "../constants/url.js";
import axios from "axios";

const getVacantes = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}Vacante/GetVacantes`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const aplicarVacante = (vacante, documento) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${server}Vacante/postularCiudadano?codigoVacante=${vacante}&numeroIdentificacion=${documento}`
      )
      .then((data) => {
        console.log("respondio el aplicar", data);
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const cancelarVacante = (vacante, documento) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${server}Vacante/cencelarPostulacion?codigoVacante=${vacante}&numeroIdentificacion=${documento}`
      )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const vacantesService = {
  getVacantes,
  cancelarVacante,
  aplicarVacante
};
