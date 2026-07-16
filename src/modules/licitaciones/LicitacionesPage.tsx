import { useEffect, useMemo, useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { CargarMas } from "../../components/CargarMas";
import { normalizarTexto } from "../../utils/format";
import { useLicitaciones } from "./hooks/useLicitaciones";
import { LicitacionesTable } from "./components/LicitacionesTable";
import { LicitacionesFiltros } from "./components/LicitacionesFiltros";
import { FILTROS_LICITACIONES_INICIALES } from "./types";

const TAMANO_PAGINA = 25;

export function LicitacionesPage() {
  const { licitaciones, loading, error } = useLicitaciones();
  const [filtros, setFiltros] = useState(FILTROS_LICITACIONES_INICIALES);
  const [visibles, setVisibles] = useState(TAMANO_PAGINA);

  const estadosDisponibles = useMemo(() => {
    const estados = new Set<string>();
    licitaciones.forEach((l) => {
      if (l.estado) estados.add(l.estado);
    });
    return Array.from(estados).sort();
  }, [licitaciones]);

  const filtradas = useMemo(() => {
    const texto = normalizarTexto(filtros.texto.trim());
    const cuantiaMin = filtros.cuantiaMin ? Number(filtros.cuantiaMin) : null;
    const cuantiaMax = filtros.cuantiaMax ? Number(filtros.cuantiaMax) : null;

    return licitaciones.filter((l) => {
      if (texto) {
        const enEntidad = normalizarTexto(l.entidad_compradora ?? "").includes(texto);
        const enObjeto = normalizarTexto(l.objeto ?? "").includes(texto);
        if (!enEntidad && !enObjeto) return false;
      }
      if (filtros.estado && l.estado !== filtros.estado) return false;
      if (cuantiaMin != null && (l.cuantia ?? -Infinity) < cuantiaMin) return false;
      if (cuantiaMax != null && (l.cuantia ?? Infinity) > cuantiaMax) return false;
      return true;
    });
  }, [licitaciones, filtros]);

  useEffect(() => {
    setVisibles(TAMANO_PAGINA);
  }, [filtros]);

  const pagina = filtradas.slice(0, visibles);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">
        Licitaciones SECOP II — Obra Civil, Palmira (Valle del Cauca)
      </h1>
      {loading && <LoadingSpinner />}
      {error && <p className="text-sm text-red-600">Error al cargar licitaciones: {error}</p>}
      {!loading && !error && (
        <>
          <LicitacionesFiltros filtros={filtros} estadosDisponibles={estadosDisponibles} onChange={setFiltros} />
          <p className="mb-2 text-sm text-slate-500">
            {filtradas.length} resultado(s){filtradas.length !== licitaciones.length && ` de ${licitaciones.length}`}
          </p>
          <LicitacionesTable licitaciones={pagina} />
          <CargarMas visibles={visibles} total={filtradas.length} onCargarMas={() => setVisibles((v) => v + TAMANO_PAGINA)} />
        </>
      )}
    </section>
  );
}
