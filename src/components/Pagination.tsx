interface PaginationProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
}

function paginasVisibles(actual: number, total: number): (number | "...")[] {
  const delta = 1;
  const rango: number[] = [];
  for (let i = Math.max(2, actual - delta); i <= Math.min(total - 1, actual + delta); i++) {
    rango.push(i);
  }

  const paginas: (number | "...")[] = [1];
  if (rango[0] > 2) paginas.push("...");
  paginas.push(...rango);
  if (rango.length > 0 && rango[rango.length - 1] < total - 1) paginas.push("...");
  if (total > 1) paginas.push(total);
  return paginas;
}

const botonBase = "rounded-md px-3 py-1.5 text-sm font-medium";
const botonInactivo = `${botonBase} border border-slate-300 bg-white text-slate-600 hover:bg-slate-50`;
const botonActivo = `${botonBase} bg-indigo-600 text-white`;
const botonDeshabilitado = `${botonBase} border border-slate-200 bg-white text-slate-300 cursor-not-allowed`;

export function Pagination({ paginaActual, totalPaginas, onCambiarPagina }: PaginationProps) {
  if (totalPaginas <= 1) return null;

  return (
    <nav className="mt-4 flex flex-wrap items-center gap-1">
      <button
        type="button"
        disabled={paginaActual === 1}
        onClick={() => onCambiarPagina(paginaActual - 1)}
        className={paginaActual === 1 ? botonDeshabilitado : botonInactivo}
      >
        Anterior
      </button>

      {paginasVisibles(paginaActual, totalPaginas).map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onCambiarPagina(p)}
            className={p === paginaActual ? botonActivo : botonInactivo}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        disabled={paginaActual === totalPaginas}
        onClick={() => onCambiarPagina(paginaActual + 1)}
        className={paginaActual === totalPaginas ? botonDeshabilitado : botonInactivo}
      >
        Siguiente
      </button>
    </nav>
  );
}
