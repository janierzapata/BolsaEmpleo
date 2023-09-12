import axios from "axios";
import { server } from "../constants/url.js";

const getTipoDocumentos = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}TipoDocumento/GetTipoDocumentos`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        console.error("error 000000", error);
        reject(error);
      });
  });
};

export const tipoDocumentoService = {
  getTipoDocumentos,
};
