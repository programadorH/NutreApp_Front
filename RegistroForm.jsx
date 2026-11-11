import { useState } from "react";

/* ------------------------------------------------------------------
   CONFIGURACIÓN — ajusta estos valores a tu backend de Spring Boot
   ------------------------------------------------------------------ */

// Endpoint que recibirá el registro (cámbialo por el de tu @RestController)
const API_URL = "http://localhost:8080/api/usuarios/registro";

// "valor" debe coincidir EXACTAMENTE con las constantes de tus enum en Java.
// "etiqueta" es lo que lee la persona en pantalla.
const DEPARTAMENTOS = [
  { valor: "TECNOLOGIA", etiqueta: "Tecnología" },
  { valor: "RECURSOS_HUMANOS", etiqueta: "Recursos Humanos" },
  { valor: "VENTAS", etiqueta: "Ventas" },
  { valor: "MARKETING", etiqueta: "Marketing" },
  { valor: "FINANZAS", etiqueta: "Finanzas" },
  { valor: "OPERACIONES", etiqueta: "Operaciones" },
];

const ROLES = [
  { valor: "EMPLEADO", etiqueta: "Empleado", detalle: "Veo y completo cursos" },
  { valor: "INSTRUCTOR", etiqueta: "Instructor", detalle: "Publico cursos" },
];

const FORM_INICIAL = {
  nombre: "",
  correo: "",
  departamento: "",
  rol: "EMPLEADO",
  contrasena: "",
  confirmarContrasena: "",
};

/* ------------------------------------------------------------------
   VALIDACIÓN — función pura: recibe datos, devuelve errores
   ------------------------------------------------------------------ */

function validar(form) {
  const errores = {};

  if (form.nombre.trim().length < 3) {
    errores.nombre = "Escribe tu nombre completo (mínimo 3 caracteres).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
    errores.correo = "Ingresa un correo válido, por ejemplo ana@empresa.com.";
  }
  if (!form.departamento) {
    errores.departamento = "Selecciona tu departamento.";
  }
  if (form.contrasena.length < 8) {
    errores.contrasena = "La contraseña debe tener al menos 8 caracteres.";
  }
  if (form.confirmarContrasena !== form.contrasena) {
    errores.confirmarContrasena = "Las contraseñas no coinciden.";
  }

  return errores;
}

/* ------------------------------------------------------------------
   ESTILOS REUTILIZABLES
   ------------------------------------------------------------------ */

const estiloInput =
  "w-full rounded-xl border bg-slate-900/60 px-4 py-3 text-base text-slate-100 " +
  "placeholder:text-slate-500 outline-none transition " +
  "focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30";

function bordeSegunError(hayError) {
  return hayError ? "border-rose-400/70" : "border-slate-700";
}

/* ------------------------------------------------------------------
   SUBCOMPONENTE: Campo (etiqueta + control + mensaje de error)
   ------------------------------------------------------------------ */

function Campo({ id, etiqueta, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {etiqueta}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   SUBCOMPONENTE: Panel que presenta la plataforma
   ------------------------------------------------------------------ */

function PanelPresentacion() {
  const beneficios = [
    {
      titulo: "Cursos en video a tu ritmo",
      texto: "Retoma cada lección justo donde la dejaste.",
    },
    {
      titulo: "Rutas por departamento",
      texto: "Contenido pensado para lo que tu equipo necesita.",
    },
    {
      titulo: "Progreso medible",
      texto: "Sigue tu avance y el de tu área en tiempo real.",
    },
  ];

  return (
    <section className="relative flex flex-col justify-between gap-12 overflow-hidden p-8 sm:p-12 lg:w-1/2 lg:p-16">
      {/* Luces de fondo decorativas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
      />

      {/* Marca */}
      <header className="relative flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-slate-950" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5-11-6.5z" />
          </svg>
        </span>
        <span className="text-xl font-semibold tracking-tight text-white">
          NovaLearn
        </span>
      </header>

      {/* Mensaje principal */}
      <div className="relative">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-cyan-300">
          Entrenamiento corporativo
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          Aprende hoy lo que tu equipo{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
            necesitará mañana
          </span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
          La plataforma de video donde tu empresa capacita, mide y hace crecer
          a su gente.
        </p>

        <ul className="mt-10 space-y-5">
          {beneficios.map((b) => (
            <li key={b.titulo} className="flex gap-4">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 ring-1 ring-cyan-400/40">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 fill-none stroke-cyan-300"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <div>
                <p className="font-medium text-white">{b.titulo}</p>
                <p className="text-slate-400">{b.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-sm text-slate-500">
        © {new Date().getFullYear()} NovaLearn · Formación para equipos
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------
   COMPONENTE PRINCIPAL
   ------------------------------------------------------------------ */

export default function RegistroForm() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [verContrasena, setVerContrasena] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null); // { tipo: "exito" | "error", texto }

  // Un solo manejador para todos los campos: usa el atributo "name" del input
  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
    // Al corregir un campo, se borra su error
    if (errores[name]) {
      setErrores((anterior) => ({ ...anterior, [name]: undefined }));
    }
  }

  async function manejarEnvio(evento) {
    evento.preventDefault(); // evita que el navegador recargue la página
    setResultado(null);

    const erroresEncontrados = validar(form);
    setErrores(erroresEncontrados);
    if (Object.keys(erroresEncontrados).length > 0) return;

    // Lo que viaja al backend. Fíjate en lo que NO va:
    //  - id: lo genera el servidor (UUID)
    //  - contrasena_hash: el servidor calcula el hash a partir de "contrasena"
    //  - confirmarContrasena: solo sirve para la validación en pantalla
    const cuerpo = {
      nombre: form.nombre.trim(),
      correo: form.correo.trim().toLowerCase(),
      departamento: form.departamento,
      rol: form.rol,
      contrasena: form.contrasena,
    };

    setEnviando(true);
    try {
      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
      });

      if (!respuesta.ok) {
        throw new Error(
          respuesta.status === 409
            ? "Ya existe una cuenta con ese correo."
            : "No pudimos crear tu cuenta. Inténtalo de nuevo."
        );
      }

      setResultado({
        tipo: "exito",
        texto: "¡Cuenta creada! Ya puedes iniciar sesión.",
      });
      setForm(FORM_INICIAL);
    } catch (error) {
      setResultado({
        tipo: "error",
        texto:
          error instanceof TypeError
            ? "No hay conexión con el servidor. Verifica que el backend esté encendido."
            : error.message,
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased lg:flex">
      <PanelPresentacion />

      <section className="flex items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl shadow-cyan-500/5 backdrop-blur sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-slate-400">
            Te toma menos de un minuto.
          </p>

          <form onSubmit={manejarEnvio} noValidate className="mt-8 space-y-5">
            <Campo id="nombre" etiqueta="Nombre completo" error={errores.nombre}>
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                placeholder="Ana María Restrepo"
                value={form.nombre}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={errores.nombre ? "nombre-error" : undefined}
                className={`${estiloInput} ${bordeSegunError(errores.nombre)}`}
              />
            </Campo>

            <Campo id="correo" etiqueta="Correo corporativo" error={errores.correo}>
              <input
                id="correo"
                name="correo"
                type="email"
                autoComplete="email"
                placeholder="ana@empresa.com"
                value={form.correo}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.correo)}
                aria-describedby={errores.correo ? "correo-error" : undefined}
                className={`${estiloInput} ${bordeSegunError(errores.correo)}`}
              />
            </Campo>

            <Campo
              id="departamento"
              etiqueta="Departamento"
              error={errores.departamento}
            >
              <select
                id="departamento"
                name="departamento"
                value={form.departamento}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.departamento)}
                aria-describedby={
                  errores.departamento ? "departamento-error" : undefined
                }
                className={`${estiloInput} ${bordeSegunError(errores.departamento)}`}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {DEPARTAMENTOS.map((d) => (
                  <option key={d.valor} value={d.valor}>
                    {d.etiqueta}
                  </option>
                ))}
              </select>
            </Campo>

            {/* Rol: pocas opciones → botones visibles en vez de un desplegable */}
            <fieldset>
              <legend className="mb-2 block text-sm font-medium text-slate-300">
                Rol
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((r) => {
                  const activo = form.rol === r.valor;
                  return (
                    <label
                      key={r.valor}
                      className={`cursor-pointer rounded-xl border px-4 py-3 transition focus-within:ring-2 focus-within:ring-cyan-400/30 ${
                        activo
                          ? "border-cyan-400 bg-cyan-400/10"
                          : "border-slate-700 bg-slate-900/60 hover:border-slate-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="rol"
                        value={r.valor}
                        checked={activo}
                        onChange={manejarCambio}
                        className="sr-only"
                      />
                      <span className="block font-medium text-white">
                        {r.etiqueta}
                      </span>
                      <span className="block text-sm text-slate-400">
                        {r.detalle}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Campo id="contrasena" etiqueta="Contraseña" error={errores.contrasena}>
              <div className="relative">
                <input
                  id="contrasena"
                  name="contrasena"
                  type={verContrasena ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  value={form.contrasena}
                  onChange={manejarCambio}
                  aria-invalid={Boolean(errores.contrasena)}
                  aria-describedby={
                    errores.contrasena ? "contrasena-error" : undefined
                  }
                  className={`${estiloInput} pr-24 ${bordeSegunError(errores.contrasena)}`}
                />
                <button
                  type="button"
                  onClick={() => setVerContrasena((v) => !v)}
                  aria-pressed={verContrasena}
                  className="absolute inset-y-0 right-2 my-auto h-9 rounded-lg px-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                >
                  {verContrasena ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </Campo>

            <Campo
              id="confirmarContrasena"
              etiqueta="Confirmar contraseña"
              error={errores.confirmarContrasena}
            >
              <input
                id="confirmarContrasena"
                name="confirmarContrasena"
                type={verContrasena ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
                value={form.confirmarContrasena}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.confirmarContrasena)}
                aria-describedby={
                  errores.confirmarContrasena
                    ? "confirmarContrasena-error"
                    : undefined
                }
                className={`${estiloInput} ${bordeSegunError(errores.confirmarContrasena)}`}
              />
            </Campo>

            {resultado && (
              <p
                role="status"
                className={`rounded-xl border px-4 py-3 text-sm ${
                  resultado.tipo === "exito"
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                    : "border-rose-400/40 bg-rose-400/10 text-rose-200"
                }`}
              >
                {resultado.texto}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3.5 text-base font-semibold text-slate-950 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enviando ? "Creando cuenta…" : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400">
            ¿Ya tienes cuenta?{" "}
            <a
              href="/login"
              className="font-medium text-cyan-300 underline-offset-4 hover:underline"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
