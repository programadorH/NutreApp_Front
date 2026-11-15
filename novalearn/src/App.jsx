import { useEffect, useState } from "react";
import { CUENTA_DEMO, CURSOS } from "./data/datos.js";
import { almacen, generarId, hashear } from "./lib/utilidades.js";
import Curso from "./views/Curso.jsx";
import Cursos from "./views/Cursos.jsx";
import Login from "./views/Login.jsx";
import Registro from "./views/Registro.jsx";

/* App es el "dueño" del estado global: usuarios, sesión y progreso.
   Las vistas reciben datos y funciones por props (los datos bajan,
   los eventos suben). */

async function construirUsuario({ nombre, correo, departamento, rol, contrasena }) {
  // Mismos atributos que la clase Usuario de Java
  return {
    id: generarId(),
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    departamento,
    rol,
    contrasena_hash: await hashear(contrasena),
  };
}

export default function App() {
  // La función dentro de useState se ejecuta solo la primera vez
  const [usuarios, setUsuarios] = useState(() => almacen.leer("nova_usuarios", []));
  const [sesionId, setSesionId] = useState(() => almacen.leer("nova_sesion", null));
  const [progreso, setProgreso] = useState(() => almacen.leer("nova_progreso", {}));
  const [ruta, setRuta] = useState("registro");
  const [cursoId, setCursoId] = useState(null);
  const [avisos, setAvisos] = useState([]);

  // Cada vez que cambia un dato, se guarda (simula la base de datos)
  useEffect(() => {
    almacen.guardar("nova_usuarios", usuarios);
  }, [usuarios]);

  useEffect(() => {
    almacen.guardar("nova_sesion", sesionId);
  }, [sesionId]);

  useEffect(() => {
    almacen.guardar("nova_progreso", progreso);
  }, [progreso]);

  // Al arrancar: crea la cuenta de prueba si todavía no existe
  useEffect(() => {
    construirUsuario(CUENTA_DEMO).then((demo) => {
      setUsuarios((anteriores) =>
        anteriores.some((u) => u.correo === demo.correo) ? anteriores : [...anteriores, demo]
      );
    });
  }, []);

  const usuario = usuarios.find((u) => u.id === sesionId) || null;
  const curso = CURSOS.find((c) => c.id === cursoId) || null;

  function avisar(texto) {
    const id = generarId();
    setAvisos((lista) => [...lista, { id, texto }]);
    setTimeout(() => setAvisos((lista) => lista.filter((a) => a.id !== id)), 3200);
  }

  /** Devuelve un mensaje de error, o null si la cuenta se creó */
  async function registrar(datos) {
    const correo = datos.correo.trim().toLowerCase();
    if (usuarios.some((u) => u.correo === correo)) {
      return "Ya existe una cuenta con ese correo. Inicia sesión.";
    }
    const nuevo = await construirUsuario(datos);
    setUsuarios((anteriores) => [...anteriores, nuevo]); // nunca usuarios.push()
    setSesionId(nuevo.id);
    setRuta("cursos");
    avisar(`¡Bienvenido, ${nuevo.nombre.split(" ")[0]}! Tu cuenta está lista.`);
    return null;
  }

  /** Devuelve un mensaje de error, o null si entró */
  async function entrar(correo, contrasena) {
    const encontrado = usuarios.find((u) => u.correo === correo.trim().toLowerCase());
    const hash = await hashear(contrasena);
    // Mismo mensaje para "no existe" y "clave errada": así no se revela
    // a un atacante qué correos están registrados.
    if (!encontrado || encontrado.contrasena_hash !== hash) {
      return "Correo o contraseña incorrectos.";
    }
    setSesionId(encontrado.id);
    setRuta("cursos");
    return null;
  }

  function salir() {
    setSesionId(null);
    setRuta("login");
  }

  function vistasDe(idCurso) {
    return progreso[sesionId]?.[idCurso] ?? [];
  }

  function marcarLeccion(idCurso, indice, vista) {
    // Se crea un objeto NUEVO en cada nivel: React detecta el cambio por referencia
    setProgreso((anterior) => {
      const delUsuario = anterior[sesionId] ?? {};
      const conjunto = new Set(delUsuario[idCurso] ?? []);
      if (vista) conjunto.add(indice);
      else conjunto.delete(indice);
      return {
        ...anterior,
        [sesionId]: { ...delUsuario, [idCurso]: [...conjunto].sort((a, b) => a - b) },
      };
    });
  }

  function abrirCurso(idCurso) {
    setCursoId(idCurso);
    setRuta("curso");
    window.scrollTo(0, 0);
  }

  // Guardas: las rutas privadas piden sesión; con sesión no se muestra el registro
  let vista = ruta;
  if (!usuario && (vista === "cursos" || vista === "curso")) vista = "login";
  if (usuario && (vista === "registro" || vista === "login")) vista = "cursos";
  if (vista === "curso" && !curso) vista = "cursos";

  return (
    <>
      {vista === "registro" && <Registro onRegistrar={registrar} onIrLogin={() => setRuta("login")} />}

      {vista === "login" && <Login onEntrar={entrar} onIrRegistro={() => setRuta("registro")} />}

      {vista === "cursos" && (
        <Cursos usuario={usuario} vistasDe={vistasDe} onAbrirCurso={abrirCurso} onSalir={salir} />
      )}

      {vista === "curso" && (
        <Curso
          key={curso.id}
          usuario={usuario}
          curso={curso}
          vistas={vistasDe(curso.id)}
          onMarcar={marcarLeccion}
          onVolver={() => setRuta("cursos")}
          onSalir={salir}
          avisar={avisar}
        />
      )}

      <div className="avisos" role="status" aria-live="polite">
        {avisos.map((aviso) => (
          <p key={aviso.id} className="aviso">
            {aviso.texto}
          </p>
        ))}
      </div>
    </>
  );
}
