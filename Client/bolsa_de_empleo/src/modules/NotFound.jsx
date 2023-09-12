import React from "react";
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link className="linkReturn" to="/">Ir a la página de inicio</Link>
    </div>
  );
};
