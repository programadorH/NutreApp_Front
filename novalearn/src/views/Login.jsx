import { useState } from "react";
import { Campo, CampoContrasena } from "../components/Campo.jsx";
import PlantillaAuth from "../components/PlantillaAuth.jsx";
import { CUENTA_DEMO } from "../data/datos.js";

export default function Login({ onEntrar, onIrRegistro }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [alerta, setAlerta] = useState("");

  async function entrar(correoIngresado, contrasenaIngresada) {
    setAlerta("");
    if (!correoIngresado.trim() || !contrasenaIngresada) {
      setAlerta("Escribe tu correo y tu contraseña.");
      return;
    }
    // onEntrar vive en App: devuelve un mensaje si los datos no coinciden
    const error = await onEntrar(correoIngresado, contrasenaIngresada);
    if (error) setAlerta(error);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    entrar(correo, contrasena);
  }

  function entrarConDemo() {
    setCorreo(CUENTA_DEMO.correo);
    setContrasena(CUENTA_DEMO.contrasena);
    entrar(CUENTA_DEMO.correo, CUENTA_DEMO.contrasena);
  }

  return (
    <PlantillaAuth>
      <h2>Inicia sesión</h2>
      <p className="tarjeta-form__bajada">Continúa con tus cursos.</p>

      <form className="formulario" onSubmit={manejarEnvio} noValidate>
        <Campo id="correo" etiqueta="Correo corporativo">
          <input
            className="campo__control"
            id="correo"
            name="correo"
            type="email"
            autoComplete="email"
            placeholder="ana@empresa.com"
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
          />
        </Campo>

        <CampoContrasena
          id="contrasena"
          etiqueta="Contraseña"
          autoComplete="current-password"
          placeholder="Tu contraseña"
          value={contrasena}
          onChange={(evento) => setContrasena(evento.target.value)}
        />

        {alerta && (
          <p className="alerta" role="alert">
            {alerta}
          </p>
        )}

        <button className="boton boton--primario boton--ancho" type="submit">
          Iniciar sesión
        </button>
        <button className="boton boton--secundario boton--ancho" type="button" onClick={entrarConDemo}>
          Entrar con la cuenta de prueba
        </button>
      </form>

      <p className="auth__cambio">
        ¿Aún no tienes cuenta?{" "}
        <button className="enlace" type="button" onClick={onIrRegistro}>
          Regístrate
        </button>
      </p>
    </PlantillaAuth>
  );
}
