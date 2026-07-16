import { useState } from "react";
import type { FormEvent } from "react";
import type { BusquedaFiltros } from "../types";

interface BusquedaFormProps {
  filtrosIniciales: BusquedaFiltros;
  loading: boolean;
  onBuscar: (filtros: BusquedaFiltros) => void;
}

const campoLabel = "mb-1 block text-xs font-medium text-slate-500";
const campoInput =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

export function BusquedaForm({ filtrosIniciales, loading, onBuscar }: BusquedaFormProps) {
  const [departamentosTexto, setDepartamentosTexto] = useState(filtrosIniciales.departamentos.join(", "));
  const [palabrasTexto, setPalabrasTexto] = useState(filtrosIniciales.palabrasClave.join(", "));

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const departamentos = departamentosTexto
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);
    const palabrasClave = palabrasTexto
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    onBuscar({ departamentos, palabrasClave });
  }

  return (
    <form
      className="mb-5 flex flex-wrap items-end gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="min-w-[220px]">
        <label htmlFor="departamentos" className={campoLabel}>
          Departamentos (separados por coma)
        </label>
        <input
          id="departamentos"
          type="text"
          value={departamentosTexto}
          onChange={(e) => setDepartamentosTexto(e.target.value)}
          className={campoInput}
        />
      </div>
      <div className="min-w-[280px] flex-1 basis-full">
        <label htmlFor="palabras" className={campoLabel}>
          Palabras clave (separadas por coma)
        </label>
        <textarea
          id="palabras"
          value={palabrasTexto}
          onChange={(e) => setPalabrasTexto(e.target.value)}
          rows={2}
          className={`${campoInput} resize-y`}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
