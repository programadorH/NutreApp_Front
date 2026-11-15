import Icono from "./Icono.jsx";
import Marca from "./Marca.jsx";
import { DEPARTAMENTOS, ROLES } from "../data/datos.js";
import { etiquetaDe, iniciales } from "../lib/utilidades.js";

export default function Cabecera({ usuario, onSalir }) {
  return (
    <header className="cabecera">
      <Marca />
      <div className="cabecera__usuario">
        <span className="avatar" aria-hidden="true">
          {iniciales(usuario.nombre)}
        </span>
        <div className="cabecera__datos">
          <strong>{usuario.nombre}</strong>
          <span>
            {etiquetaDe(DEPARTAMENTOS, usuario.departamento)} ·{" "}
            {etiquetaDe(ROLES, usuario.rol)}
          </span>
        </div>
        <button className="boton boton--secundario" type="button" onClick={onSalir}>
          <Icono nombre="salir" />
          Salir
        </button>
      </div>
    </header>
  );
}
