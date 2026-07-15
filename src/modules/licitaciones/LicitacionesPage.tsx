import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useLicitaciones } from "./hooks/useLicitaciones";
import { LicitacionesTable } from "./components/LicitacionesTable";

export function LicitacionesPage() {
  const { licitaciones, loading, error } = useLicitaciones();

  return (
    <section>
      <h1>Licitaciones SECOP II — Obra Civil, Palmira (Valle del Cauca)</h1>
      {loading && <LoadingSpinner />}
      {error && <p role="alert">Error al cargar licitaciones: {error}</p>}
      {!loading && !error && <LicitacionesTable licitaciones={licitaciones} />}
    </section>
  );
}
