/* Funciones de apoyo: no dependen de React, por eso viven aparte. */

export function etiquetaDe(lista, valor) {
  const encontrado = lista.find((item) => item.valor === valor);
  return encontrado ? encontrado.etiqueta : valor;
}

export function iniciales(nombre) {
  return nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");
}

export function formatoTiempo(segundos) {
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------
   Almacén: simula la base de datos del backend con localStorage.
   Si el navegador no lo permite, todo sigue funcionando en memoria.
   ------------------------------------------------------------------ */

const respaldo = {};

export const almacen = {
  leer(clave, porDefecto) {
    try {
      const texto = localStorage.getItem(clave);
      if (texto !== null) return JSON.parse(texto);
    } catch (error) {
      /* se usa el respaldo en memoria */
    }
    return clave in respaldo ? respaldo[clave] : porDefecto;
  },
  guardar(clave, valor) {
    respaldo[clave] = valor;
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      /* se usa el respaldo en memoria */
    }
  },
};

export function generarId() {
  if (window.crypto && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID(); // equivalente al UUID.randomUUID() de Java
  }
  return "id-" + Date.now() + "-" + Math.random().toString(16).slice(2);
}

/**
 * Convierte la contraseña en un hash (texto irreversible).
 * OJO: solo para la demostración. En el proyecto real el hash se calcula
 * en el BACKEND con un algoritmo lento como BCrypt.
 */
export async function hashear(texto) {
  try {
    const bytes = new TextEncoder().encode(texto);
    const resultado = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(resultado))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    let h = 5381;
    for (let i = 0; i < texto.length; i++) h = (h * 33) ^ texto.charCodeAt(i);
    return "local-" + (h >>> 0).toString(16);
  }
}
