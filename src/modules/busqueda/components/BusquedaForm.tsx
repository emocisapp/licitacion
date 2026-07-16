import { useState } from "react";
import type { FormEvent } from "react";
import type { BusquedaFiltros } from "../types";

interface BusquedaFormProps {
  filtrosIniciales: BusquedaFiltros;
  loading: boolean;
  onBuscar: (filtros: BusquedaFiltros) => void;
}

export function BusquedaForm({ filtrosIniciales, loading, onBuscar }: BusquedaFormProps) {
  const [departamento, setDepartamento] = useState(filtrosIniciales.departamento);
  const [municipio, setMunicipio] = useState(filtrosIniciales.municipio);
  const [palabrasTexto, setPalabrasTexto] = useState(filtrosIniciales.palabrasClave.join(", "));

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const palabrasClave = palabrasTexto
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    onBuscar({ departamento, municipio, palabrasClave });
  }

  return (
    <form className="busqueda-form" onSubmit={handleSubmit}>
      <div className="busqueda-form__campo">
        <label htmlFor="departamento">Departamento</label>
        <input
          id="departamento"
          type="text"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
        />
      </div>
      <div className="busqueda-form__campo">
        <label htmlFor="municipio">Municipio</label>
        <input
          id="municipio"
          type="text"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
        />
      </div>
      <div className="busqueda-form__campo busqueda-form__campo--ancho">
        <label htmlFor="palabras">Palabras clave (separadas por coma)</label>
        <textarea
          id="palabras"
          value={palabrasTexto}
          onChange={(e) => setPalabrasTexto(e.target.value)}
          rows={2}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
