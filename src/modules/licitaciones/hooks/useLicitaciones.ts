import { useEffect, useState } from "react";
import type { Licitacion } from "../../../types/licitacion";
import { fetchLicitaciones } from "../services/licitacionesService";

interface UseLicitacionesResult {
  licitaciones: Licitacion[];
  loading: boolean;
  error: string | null;
}

export function useLicitaciones(): UseLicitacionesResult {
  const [licitaciones, setLicitaciones] = useState<Licitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchLicitaciones()
      .then((data) => {
        if (isMounted) setLicitaciones(data);
      })
      .catch((err: Error) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { licitaciones, loading, error };
}
