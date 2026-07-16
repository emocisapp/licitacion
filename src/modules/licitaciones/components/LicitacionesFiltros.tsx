import type { FiltrosLicitaciones } from "../types";

interface LicitacionesFiltrosProps {
  filtros: FiltrosLicitaciones;
  estadosDisponibles: string[];
  onChange: (filtros: FiltrosLicitaciones) => void;
}

const campoLabel = "mb-1 block text-xs font-medium text-slate-500";
const campoInput =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

export function LicitacionesFiltros({ filtros, estadosDisponibles, onChange }: LicitacionesFiltrosProps) {
  function set<K extends keyof FiltrosLicitaciones>(campo: K, valor: FiltrosLicitaciones[K]) {
    onChange({ ...filtros, [campo]: valor });
  }

  return (
    <div className="mb-4 flex flex-wrap items-end gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="min-w-[240px] flex-1">
        <label htmlFor="filtro-texto" className={campoLabel}>
          Buscar (entidad u objeto)
        </label>
        <input
          id="filtro-texto"
          type="text"
          value={filtros.texto}
          onChange={(e) => set("texto", e.target.value)}
          placeholder="Ej: alcaldía, pavimentación..."
          className={campoInput}
        />
      </div>
      <div>
        <label htmlFor="filtro-estado" className={campoLabel}>
          Estado
        </label>
        <select
          id="filtro-estado"
          value={filtros.estado}
          onChange={(e) => set("estado", e.target.value)}
          className={campoInput}
        >
          <option value="">Todos</option>
          {estadosDisponibles.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filtro-cuantia-min" className={campoLabel}>
          Cuantía mín.
        </label>
        <input
          id="filtro-cuantia-min"
          type="number"
          min="0"
          value={filtros.cuantiaMin}
          onChange={(e) => set("cuantiaMin", e.target.value)}
          className={`${campoInput} w-32`}
        />
      </div>
      <div>
        <label htmlFor="filtro-cuantia-max" className={campoLabel}>
          Cuantía máx.
        </label>
        <input
          id="filtro-cuantia-max"
          type="number"
          min="0"
          value={filtros.cuantiaMax}
          onChange={(e) => set("cuantiaMax", e.target.value)}
          className={`${campoInput} w-32`}
        />
      </div>
    </div>
  );
}
