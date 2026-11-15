import Icono from "./Icono.jsx";
import Marca from "./Marca.jsx";

const BENEFICIOS = [
  ["Cursos en video a tu ritmo", "Retoma cada lección donde la dejaste."],
  ["Rutas por departamento", "Contenido pensado para lo que tu equipo necesita."],
  ["Progreso medible", "Sigue tu avance curso por curso."],
];

/** Estructura compartida por registro y login. El formulario llega en "children". */
export default function PlantillaAuth({ children }) {
  return (
    <main className="auth">
      <section className="auth__presentacion">
        <Marca />
        <div>
          <p className="etiqueta-chica">Entrenamiento corporativo</p>
          <h1 className="auth__titulo">
            Aprende hoy lo que tu equipo <em>necesitará mañana</em>
          </h1>
          <p className="auth__bajada">
            La plataforma de video donde tu empresa capacita, mide y hace crecer
            a su gente.
          </p>
          <ul className="beneficios">
            {BENEFICIOS.map(([titulo, texto]) => (
              <li key={titulo}>
                <Icono nombre="check" />
                <div>
                  <strong>{titulo}</strong>
                  <span>{texto}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="auth__pie">
          © {new Date().getFullYear()} NovaLearn · Formación para equipos
        </p>
      </section>

      <section className="auth__zona-form">
        <div className="tarjeta-form">{children}</div>
      </section>
    </main>
  );
}
