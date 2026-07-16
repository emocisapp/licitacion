import type { FiltrosLicitaciones } from "../types";

interface LicitacionesFiltrosProps {
  filtros: FiltrosLicitaciones;
  estadosDisponibles: string[];
  onChange: (filtros: FiltrosLicitaciones) => void;
}

export function LicitacionesFiltros({ filtros, estadosDisponibles, onChange }: LicitacionesFiltrosProps) {
  function set<K extends keyof FiltrosLicitaciones>(campo: K, valor: FiltrosLicitaciones[K]) {
    onChange({ ...filtros, [campo]: valor });
  }

  return (
    <div className="licitaciones-filtros">
      <div className="licitaciones-filtros__campo licitaciones-filtros__campo--ancho">
        <label htmlFor="filtro-texto">Buscar (entidad u objeto)</label>
        <input
          id="filtro-texto"
          type="text"
          value={filtros.texto}
          onChange={(e) => set("texto", e.target.value)}
          placeholder="Ej: alcaldía, pavimentación..."
        />
      </div>
      <div className="licitaciones-filtros__campo">
        <label htmlFor="filtro-estado">Estado</label>
        <select id="filtro-estado" value={filtros.estado} onChange={(e) => set("estado", e.target.value)}>
          <option value="">Todos</option>
          {estadosDisponibles.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>
      <div className="licitaciones-filtros__campo">
        <label htmlFor="filtro-cuantia-min">Cuantía mín.</label>
        <input
          id="filtro-cuantia-min"
          type="number"
          min="0"
          value={filtros.cuantiaMin}
          onChange={(e) => set("cuantiaMin", e.target.value)}
        />
      </div>
      <div className="licitaciones-filtros__campo">
        <label htmlFor="filtro-cuantia-max">Cuantía máx.</label>
        <input
          id="filtro-cuantia-max"
          type="number"
          min="0"
          value={filtros.cuantiaMax}
          onChange={(e) => set("cuantiaMax", e.target.value)}
        />
      </div>
    </div>
  );
}
