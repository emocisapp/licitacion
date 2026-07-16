import { useState } from "react";
import type { LicitacionResumen } from "../../../types/licitacion";
import type { BusquedaFiltros } from "../types";
import { buscarEnSecop } from "../services/secopService";

interface UseBusquedaSecopResult {
  resultados: LicitacionResumen[];
  loading: boolean;
  error: string | null;
  buscado: boolean;
  buscar: (filtros: BusquedaFiltros) => Promise<void>;
}

export function useBusquedaSecop(): UseBusquedaSecopResult {
  const [resultados, setResultados] = useState<LicitacionResumen[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buscado, setBuscado] = useState(false);

  async function buscar(filtros: BusquedaFiltros) {
    setLoading(true);
    setError(null);
    try {
      const datos = await buscarEnSecop(filtros);
      setResultados(datos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al buscar en SECOP");
    } finally {
      setBuscado(true);
      setLoading(false);
    }
  }

  return { resultados, loading, error, buscado, buscar };
}
