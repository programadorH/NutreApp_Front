import { useState } from "react";
import { Campo, CampoContrasena } from "../components/Campo.jsx";
import PlantillaAuth from "../components/PlantillaAuth.jsx";
import { DEPARTAMENTOS, ROLES } from "../data/datos.js";

const FORM_INICIAL = {
  nombre: "",
  correo: "",
  departamento: "",
  rol: "EMPLEADO",
  contrasena: "",
  confirmar: "",
};

// Cada validador recibe el valor y devuelve el mensaje de error ("" si está bien)
const VALIDADORES = {
  nombre: (v) => (v.trim().length < 3 ? "Escribe tu nombre completo (mínimo 3 caracteres)." : ""),
  correo: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Ingresa un correo válido, por ejemplo ana@empresa.com.",
  departamento: (v) => (v ? "" : "Selecciona tu departamento."),
  contrasena: (v) => (v.length < 8 ? "La contraseña debe tener al menos 8 caracteres." : ""),
  confirmar: (v, form) => (v === form.contrasena ? "" : "Las contraseñas no coinciden."),
};

const TEXTOS_FUERZA = ["Sin escribir", "Débil", "Aceptable", "Buena", "Fuerte"];

function medirFuerza(contrasena) {
  if (!contrasena) return 0;
  let puntos = 0;
  if (contrasena.length >= 8) puntos++;
  if (/[a-z]/.test(contrasena) && /[A-Z]/.test(contrasena)) puntos++;
  if (/\d/.test(contrasena)) puntos++;
  if (/[^A-Za-z0-9]/.test(contrasena)) puntos++;
  return Math.max(puntos, 1);
}

export default function Registro({ onRegistrar, onIrLogin }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  // Estado DERIVADO: se calcula a partir de form, no necesita su propio useState
  const fuerza = medirFuerza(form.contrasena);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    const nuevoForm = { ...form, [name]: value };
    setForm(nuevoForm);

    // Si el campo ya tenía un error, se revisa de nuevo mientras escribe
    if (errores[name]) {
      setErrores({ ...errores, [name]: VALIDADORES[name](value, nuevoForm) });
    }
  }

  // Valida un campo cuando la persona sale de él
  function manejarSalida(evento) {
    const { name, value } = evento.target;
    if (name in VALIDADORES && value !== "") {
      setErrores({ ...errores, [name]: VALIDADORES[name](value, form) });
    }
  }

  async function manejarEnvio(evento) {
    evento.preventDefault(); // evita que el navegador recargue la página

    const encontrados = {};
    for (const campo of Object.keys(VALIDADORES)) {
      encontrados[campo] = VALIDADORES[campo](form[campo], form);
    }
    setErrores(encontrados);

    const primeroConError = Object.keys(encontrados).find((campo) => encontrados[campo]);
    if (primeroConError) {
      document.getElementById(primeroConError)?.focus();
      return;
    }

    setEnviando(true);
    // onRegistrar vive en App: devuelve un mensaje si el correo ya existe
    const errorCorreo = await onRegistrar(form);
    if (errorCorreo) {
      setErrores({ ...encontrados, correo: errorCorreo });
      setEnviando(false);
      document.getElementById("correo")?.focus();
    }
    // Si todo salió bien, App cambia de vista y este componente desaparece
  }

  return (
    <PlantillaAuth>
      <h2>Crea tu cuenta</h2>
      <p className="tarjeta-form__bajada">Te toma menos de un minuto.</p>

      <form className="formulario" onSubmit={manejarEnvio} noValidate>
        <Campo id="nombre" etiqueta="Nombre completo" error={errores.nombre}>
          <input
            className="campo__control"
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            placeholder="Ana María Restrepo"
            value={form.nombre}
            onChange={manejarCambio}
            onBlur={manejarSalida}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? "nombre-error" : undefined}
          />
        </Campo>

        <Campo id="correo" etiqueta="Correo corporativo" error={errores.correo}>
          <input
            className="campo__control"
            id="correo"
            name="correo"
            type="email"
            autoComplete="email"
            placeholder="ana@empresa.com"
            value={form.correo}
            onChange={manejarCambio}
            onBlur={manejarSalida}
            aria-invalid={Boolean(errores.correo)}
            aria-describedby={errores.correo ? "correo-error" : undefined}
          />
        </Campo>

        <Campo id="departamento" etiqueta="Departamento" error={errores.departamento}>
          <select
            className="campo__control"
            id="departamento"
            name="departamento"
            value={form.departamento}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.departamento)}
            aria-describedby={errores.departamento ? "departamento-error" : undefined}
          >
            <option value="">Selecciona una opción</option>
            {DEPARTAMENTOS.map((d) => (
              <option key={d.valor} value={d.valor}>
                {d.etiqueta}
              </option>
            ))}
          </select>
        </Campo>

        <fieldset className="campo">
          <legend>Rol</legend>
          <div className="roles">
            {ROLES.map((r) => (
              <label key={r.valor} className={form.rol === r.valor ? "rol rol--activo" : "rol"}>
                <input
                  type="radio"
                  name="rol"
                  id={`rol-${r.valor}`}
                  value={r.valor}
                  checked={form.rol === r.valor}
                  onChange={manejarCambio}
                />
                <strong>{r.etiqueta}</strong>
                <span>{r.detalle}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <CampoContrasena
          id="contrasena"
          etiqueta="Contraseña"
          error={errores.contrasena}
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres"
          value={form.contrasena}
          onChange={manejarCambio}
          onBlur={manejarSalida}
        />

        <div className="fuerza" data-nivel={fuerza}>
          <div className="fuerza__barras" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="fuerza__texto">{TEXTOS_FUERZA[fuerza]}</span>
        </div>

        <CampoContrasena
          id="confirmar"
          etiqueta="Confirmar contraseña"
          error={errores.confirmar}
          autoComplete="new-password"
          placeholder="Repite tu contraseña"
          value={form.confirmar}
          onChange={manejarCambio}
          onBlur={manejarSalida}
        />

        <button className="boton boton--primario boton--ancho" type="submit" disabled={enviando}>
          {enviando ? "Creando cuenta…" : "Crear cuenta"}
        </button>
      </form>

      <p className="auth__cambio">
        ¿Ya tienes cuenta?{" "}
        <button className="enlace" type="button" onClick={onIrLogin}>
          Inicia sesión
        </button>
      </p>
    </PlantillaAuth>
  );
}
