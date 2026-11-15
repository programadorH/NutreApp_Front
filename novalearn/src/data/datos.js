// Datos de ejemplo. En el proyecto real llegarán del backend con fetch().

// "valor" imita las constantes de los enum de Java (Departamento y Rol)
export const DEPARTAMENTOS = [
  { valor: "TECNOLOGIA", etiqueta: "Tecnología" },
  { valor: "RECURSOS_HUMANOS", etiqueta: "Recursos Humanos" },
  { valor: "VENTAS", etiqueta: "Ventas" },
  { valor: "MARKETING", etiqueta: "Marketing" },
  { valor: "FINANZAS", etiqueta: "Finanzas" },
  { valor: "OPERACIONES", etiqueta: "Operaciones" },
];

export const ROLES = [
  { valor: "EMPLEADO", etiqueta: "Empleado", detalle: "Veo y completo cursos" },
  { valor: "INSTRUCTOR", etiqueta: "Instructor", detalle: "Publico cursos" },
];

// Cursos de ejemplo. En el proyecto real llegarán del backend con fetch().
export const CURSOS = [
  {
    id: "seguridad",
    titulo: "Seguridad de la información para todos",
    categoria: "Cumplimiento",
    nivel: "Básico",
    tono: 190,
    departamentos: ["TECNOLOGIA", "FINANZAS", "OPERACIONES"],
    descripcion: "Contraseñas, phishing y manejo de datos sensibles en el día a día.",
    lecciones: [
      { titulo: "Por qué la seguridad es tarea de todos", minutos: 6 },
      { titulo: "Cómo reconocer un correo de phishing", minutos: 9 },
      { titulo: "Contraseñas y doble factor", minutos: 8 },
      { titulo: "Qué hacer ante un incidente", minutos: 7 },
    ],
  },
  {
    id: "liderazgo",
    titulo: "Liderazgo de equipos híbridos",
    categoria: "Liderazgo",
    nivel: "Intermedio",
    tono: 265,
    departamentos: ["RECURSOS_HUMANOS", "OPERACIONES"],
    descripcion: "Acuerdos, rituales y confianza cuando el equipo no comparte oficina.",
    lecciones: [
      { titulo: "El reto de liderar a distancia", minutos: 7 },
      { titulo: "Acuerdos de equipo que sí se cumplen", minutos: 11 },
      { titulo: "Reuniones uno a uno efectivas", minutos: 10 },
      { titulo: "Medir resultados, no horas", minutos: 8 },
    ],
  },
  {
    id: "ventas",
    titulo: "Ventas consultivas B2B",
    categoria: "Ventas",
    nivel: "Intermedio",
    tono: 28,
    departamentos: ["VENTAS", "MARKETING"],
    descripcion: "Descubre la necesidad real del cliente antes de presentar tu oferta.",
    lecciones: [
      { titulo: "Vender es diagnosticar", minutos: 6 },
      { titulo: "Preguntas que abren conversaciones", minutos: 12 },
      { titulo: "Cómo presentar valor y no precio", minutos: 10 },
      { titulo: "Manejo de objeciones", minutos: 9 },
    ],
  },
  {
    id: "datos",
    titulo: "Análisis de datos con hojas de cálculo",
    categoria: "Herramientas",
    nivel: "Básico",
    tono: 150,
    departamentos: ["FINANZAS", "OPERACIONES", "MARKETING"],
    descripcion: "Tablas dinámicas, fórmulas clave y gráficos que cuentan una historia.",
    lecciones: [
      { titulo: "Ordenar y limpiar los datos", minutos: 8 },
      { titulo: "Fórmulas que usarás cada semana", minutos: 12 },
      { titulo: "Tablas dinámicas paso a paso", minutos: 14 },
      { titulo: "Gráficos claros para tu informe", minutos: 9 },
    ],
  },
  {
    id: "feedback",
    titulo: "Comunicación efectiva y feedback",
    categoria: "Comunicación",
    nivel: "Básico",
    tono: 330,
    departamentos: ["RECURSOS_HUMANOS", "VENTAS"],
    descripcion: "Di lo que piensas con claridad y respeto, y aprende a recibirlo también.",
    lecciones: [
      { titulo: "Escuchar antes de responder", minutos: 6 },
      { titulo: "Feedback: situación, conducta, impacto", minutos: 10 },
      { titulo: "Conversaciones difíciles", minutos: 11 },
    ],
  },
  {
    id: "git",
    titulo: "Git y trabajo colaborativo",
    categoria: "Tecnología",
    nivel: "Básico",
    tono: 215,
    departamentos: ["TECNOLOGIA"],
    descripcion: "Ramas, commits y pull requests para trabajar en equipo sin pisarse.",
    lecciones: [
      { titulo: "Qué problema resuelve Git", minutos: 7 },
      { titulo: "Commits con buenos mensajes", minutos: 9 },
      { titulo: "Ramas: main, develop y feature", minutos: 12 },
      { titulo: "Pull requests y revisión de código", minutos: 10 },
    ],
  },
];

export const CUENTA_DEMO = {
  nombre: "Ana María Restrepo",
  correo: "demo@novalearn.co",
  departamento: "TECNOLOGIA",
  rol: "EMPLEADO",
  contrasena: "demo1234",
};
