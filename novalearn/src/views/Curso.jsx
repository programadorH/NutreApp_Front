import { useEffect, useState } from "react";
import Cabecera from "../components/Cabecera.jsx";
import Icono from "../components/Icono.jsx";
import { formatoTiempo } from "../lib/utilidades.js";

// Reproducción simulada: cada lección "dura" 8 segundos reales.
// Aquí irá la etiqueta <video> cuando el backend entregue los archivos.
const SEGUNDOS_DEMO = 8;

export default function Curso({ usuario, curso, vistas, onMarcar, onVolver, onSalir, avisar }) {
  // Abre en la primera lección que falte por ver
  const [leccion, setLeccion] = useState(() => {
    const pendiente = curso.lecciones.findIndex((_, i) => !vistas.includes(i));
    return pendiente === -1 ? 0 : pendiente;
  });
  const [avance, setAvance] = useState(0); // de 0 a 1
  const [reproduciendo, setReproduciendo] = useState(false);

  const actual = curso.lecciones[leccion];
  const duracion = actual.minutos * 60; // en segundos
  const yaVista = vistas.includes(leccion);

  function elegirLeccion(indice) {
    setLeccion(indice);
    setAvance(0);
    setReproduciendo(false);
  }

  function alternar() {
    if (!reproduciendo && avance >= 1) setAvance(0);
    setReproduciendo(!reproduciendo);
  }

  // EFECTO 1: mientras se reproduce, un intervalo hace avanzar la barra.
  // La función que se devuelve "limpia" el intervalo al pausar o al salir.
  useEffect(() => {
    if (!reproduciendo) return;
    const intervalo = setInterval(() => {
      setAvance((a) => Math.min(a + 0.1 / SEGUNDOS_DEMO, 1));
    }, 100);
    return () => clearInterval(intervalo);
  }, [reproduciendo]);

  // EFECTO 2: cuando la barra llega al final, se completa la lección
  useEffect(() => {
    if (!reproduciendo || avance < 1) return;
    onMarcar(curso.id, leccion, true);
    avisar("Lección completada.");
    if (leccion < curso.lecciones.length - 1) {
      elegirLeccion(leccion + 1);
    } else {
      setReproduciendo(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avance, reproduciendo]);

  return (
    <div>
      <Cabecera usuario={usuario} onSalir={onSalir} />

      <main className="contenido">
        <button className="boton boton--secundario volver" type="button" onClick={onVolver}>
          <Icono nombre="flecha" />
          Volver a los cursos
        </button>

        <div className="detalle">
          <section className="detalle__principal">
            <p className="etiqueta-chica">
              {curso.categoria} · {curso.nivel}
            </p>
            <h1>{curso.titulo}</h1>

            <div className="reproductor">
              <div className="reproductor__pantalla" style={{ "--tono": curso.tono }}>
                <span className="reproductor__nota">Reproducción simulada</span>
                <div className="reproductor__centro">
                  <button
                    className="reproductor__play"
                    type="button"
                    aria-label={reproduciendo ? "Pausar lección" : "Reproducir lección"}
                    onClick={alternar}
                  >
                    <Icono nombre={reproduciendo ? "pausa" : "play"} />
                  </button>
                  <p className="reproductor__leccion">
                    {leccion + 1}. {actual.titulo}
                  </p>
                </div>
              </div>
              <div className="reproductor__controles">
                <div className="reproductor__pista">
                  <div className="reproductor__relleno" style={{ width: `${avance * 100}%` }} />
                </div>
                <span className="reproductor__tiempo">
                  {formatoTiempo(avance * duracion)} / {formatoTiempo(duracion)}
                </span>
              </div>
            </div>

            <div className="detalle__acciones">
              <button
                className="boton boton--secundario"
                type="button"
                onClick={() => onMarcar(curso.id, leccion, !yaVista)}
              >
                {yaVista ? "Marcar como no vista" : "Marcar como vista"}
              </button>
            </div>

            <p className="curso__descripcion">{curso.descripcion}</p>
          </section>

          <aside className="temario">
            <h2>Contenido del curso</h2>
            <p className="avance__texto">
              {vistas.length} de {curso.lecciones.length} lecciones vistas
            </p>
            <ol className="temario__lista">
              {curso.lecciones.map((l, i) => {
                const vista = vistas.includes(i);
                const clases = ["leccion", vista && "leccion--vista", i === leccion && "leccion--actual"]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <li key={l.titulo}>
                    <button
                      className={clases}
                      type="button"
                      aria-current={i === leccion ? "true" : undefined}
                      onClick={() => elegirLeccion(i)}
                    >
                      <span className="leccion__estado">{vista ? <Icono nombre="check" /> : i + 1}</span>
                      <span className="leccion__titulo">{l.titulo}</span>
                      <span className="leccion__duracion">{l.minutos} min</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      </main>
    </div>
  );
}
