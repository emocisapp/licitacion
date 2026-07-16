import { LoadingSpinner } from "../../components/LoadingSpinner";
import { LicitacionesTable } from "../licitaciones/components/LicitacionesTable";
import { BusquedaForm } from "./components/BusquedaForm";
import { useBusquedaSecop } from "./hooks/useBusquedaSecop";
import { FILTROS_INICIALES } from "./types";

export function BusquedaPage() {
  const { resultados, loading, error, buscado, buscar } = useBusquedaSecop();

  return (
    <section>
      <h1>Búsqueda personalizada en SECOP II</h1>
      <p className="busqueda-descripcion">
        Define tus propios criterios y consulta directamente la API de Datos Abiertos.
        Estos resultados son en vivo y no se guardan.
      </p>
      <BusquedaForm filtrosIniciales={FILTROS_INICIALES} loading={loading} onBuscar={buscar} />
      {loading && <LoadingSpinner />}
      {error && <p role="alert">Error al buscar: {error}</p>}
      {!loading && !error && buscado && <LicitacionesTable licitaciones={resultados} />}
    </section>
  );
}
