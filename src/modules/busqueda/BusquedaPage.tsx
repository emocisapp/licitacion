import { LoadingSpinner } from "../../components/LoadingSpinner";
import { LicitacionesTable } from "../licitaciones/components/LicitacionesTable";
import { BusquedaForm } from "./components/BusquedaForm";
import { useBusquedaSecop } from "./hooks/useBusquedaSecop";
import { FILTROS_INICIALES } from "./types";

export function BusquedaPage() {
  const { resultados, loading, error, buscado, buscar } = useBusquedaSecop();

  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold text-slate-900">Búsqueda personalizada en SECOP II</h1>
      <p className="mb-4 text-sm text-slate-500">
        Define tus propios criterios y consulta directamente la API de Datos Abiertos.
        Estos resultados son en vivo y no se guardan.
      </p>
      <BusquedaForm filtrosIniciales={FILTROS_INICIALES} loading={loading} onBuscar={buscar} />
      {loading && <LoadingSpinner />}
      {error && <p className="text-sm text-red-600">Error al buscar: {error}</p>}
      {!loading && !error && buscado && (
        <>
          <p className="mb-2 text-sm text-slate-500">{resultados.length} resultado(s)</p>
          <LicitacionesTable licitaciones={resultados} />
        </>
      )}
    </section>
  );
}
