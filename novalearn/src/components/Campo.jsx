import { useState } from "react";

/**
 * Campo: etiqueta + control + mensaje de error.
 * El control llega como "children", así sirve para input, select, etc.
 */
export function Campo({ id, etiqueta, error, children }) {
  return (
    <div className={error ? "campo campo--error" : "campo"}>
      <label htmlFor={id}>{etiqueta}</label>
      {children}
      {error && (
        <p className="campo__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Campo de contraseña con su propio estado: visible u oculta */
export function CampoContrasena({ id, etiqueta, error, ...propsDelInput }) {
  const [visible, setVisible] = useState(false);

  return (
    <Campo id={id} etiqueta={etiqueta} error={error}>
      <div className="campo__fila">
        <input
          className="campo__control"
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...propsDelInput}
        />
        <button
          className="campo__ver"
          type="button"
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </Campo>
  );
}
