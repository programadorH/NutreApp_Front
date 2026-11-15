const TRAZOS = {
  play: { d: "M8 5.5v13l11-6.5z", relleno: true },
  pausa: { d: "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z", relleno: true },
  check: { d: "M5 12.5l4.5 4.5L19 7.5" },
  flecha: { d: "M15 6l-6 6 6 6" },
  salir: { d: "M15 4h4v16h-4M10 8l-4 4 4 4M6 12h9" },
};

export default function Icono({ nombre }) {
  const trazo = TRAZOS[nombre];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={trazo.relleno ? "icono icono--relleno" : "icono"}
    >
      <path d={trazo.d} />
    </svg>
  );
}
