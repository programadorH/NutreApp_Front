import Icono from "./Icono.jsx";

/** Tarjeta de un curso dentro del catálogo */
export default function TarjetaCurso({ curso, vistas, paraSuArea, onAbrir }) {
  const total = curso.lecciones.length;
  const porcentaje = Math.round((vistas / total) * 100);
  const minutos = curso.lecciones.reduce((suma, l) => suma + l.minutos, 0);

  let textoBoton = "Empezar curso";
  if (vistas === total) textoBoton = "Repasar curso";
  else if (vistas > 0) textoBoton = "Continuar";

  return (
    <article className="curso">
      {/* Cada curso define su color con la variable CSS --tono */}
      <div className="miniatura" style={{ "--tono": curso.tono }}>
        {paraSuArea && <span className="miniatura__sello">Para tu área</span>}
        <span className="miniatura__play">
          <Icono nombre="play" />
        </span>
      </div>

      <div className="curso__cuerpo">
        <span className="curso__categoria">{curso.categoria}</span>
        <h3>{curso.titulo}</h3>
        <p className="curso__descripcion">{curso.descripcion}</p>
        <p className="curso__meta">
          {total} lecciones · {minutos} min · {curso.nivel}
        </p>

        <div className="avance">
          <div className="avance__pista">
            <div className="avance__relleno" style={{ width: `${porcentaje}%` }} />
          </div>
          <span className="avance__texto">
            {vistas} de {total} lecciones vistas
          </span>
        </div>

        <button
          className="boton boton--secundario boton--ancho"
          type="button"
          onClick={() => onAbrir(curso.id)}
        >
          {textoBoton}
        </button>
      </div>
    </article>
  );
}
