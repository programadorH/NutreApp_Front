import { useState } from "react";
import Cabecera from "../components/Cabecera.jsx";
import TarjetaCurso from "../components/TarjetaCurso.jsx";
import { CURSOS } from "../data/datos.js";

const CATEGORIAS = ["Todos", ...new Set(CURSOS.map((c) => c.categoria))];

function Dato({ valor, nombre }) {
  return (
    <div className="dato">
      <p className="dato__valor">{valor}</p>
      <p className="dato__nombre">{nombre}</p>
    </div>
  );
}

export default function Cursos({ usuario, vistasDe, onAbrirCurso, onSalir }) {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Resumen: todo se calcula a partir de los datos, sin estado propio
  const totalLecciones = CURSOS.reduce((suma, c) => suma + c.lecciones.length, 0);
  const vistas = CURSOS.reduce((suma, c) => suma + vistasDe(c.id).length, 0);
  const terminados = CURSOS.filter((c) => vistasDe(c.id).length === c.lecciones.length).length;

  const esDeSuArea = (curso) => curso.departamentos.includes(usuario.departamento);

  // La lista visible también es estado derivado: filtro + búsqueda + orden
  const texto = busqueda.trim().toLowerCase();
  const visibles = CURSOS.filter((c) => {
    const pasaFiltro = filtro === "Todos" || c.categoria === filtro;
    const pasaBusqueda = !texto || (c.titulo + " " + c.descripcion).toLowerCase().includes(texto);
    return pasaFiltro && pasaBusqueda;
  }).sort((a, b) => Number(esDeSuArea(b)) - Number(esDeSuArea(a)));

  return (
    <div>
      <Cabecera usuario={usuario} onSalir={onSalir} />

      <main className="contenido">
        <section className="saludo">
          <p className="etiqueta-chica">Tu aprendizaje</p>
          <h1>Hola, {usuario.nombre.split(" ")[0]}</h1>
          <p>Elige un curso y avanza a tu ritmo. Arriba verás los recomendados para tu área.</p>
        </section>

        <section className="resumen" aria-label="Resumen de tu avance">
          <Dato valor={`${vistas} / ${totalLecciones}`} nombre="Lecciones vistas" />
          <Dato valor={`${terminados} / ${CURSOS.length}`} nombre="Cursos terminados" />
          <Dato valor={`${Math.round((vistas / totalLecciones) * 100)} %`} nombre="Avance general" />
        </section>

        <section className="herramientas">
          <input
            className="campo__control buscador"
            id="buscar"
            type="search"
            placeholder="Buscar un curso…"
            aria-label="Buscar un curso"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
          <div className="filtros" role="group" aria-label="Filtrar por categoría">
            {CATEGORIAS.map((nombre) => (
              <button
                key={nombre}
                className={nombre === filtro ? "filtro filtro--activo" : "filtro"}
                type="button"
                aria-pressed={nombre === filtro}
                onClick={() => setFiltro(nombre)}
              >
                {nombre}
              </button>
            ))}
          </div>
        </section>

        <div className="cursos">
          {visibles.length > 0 ? (
            visibles.map((curso) => (
              <TarjetaCurso
                key={curso.id}
                curso={curso}
                vistas={vistasDe(curso.id).length}
                paraSuArea={esDeSuArea(curso)}
                onAbrir={onAbrirCurso}
              />
            ))
          ) : (
            <p className="vacio">No encontramos cursos con esa búsqueda. Prueba con otra palabra.</p>
          )}
        </div>
      </main>
    </div>
  );
}
