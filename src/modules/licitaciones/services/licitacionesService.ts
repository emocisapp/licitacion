import { supabase } from "../../../services/supabaseClient";
import type { Licitacion } from "../../../types/licitacion";

export async function fetchLicitaciones(): Promise<Licitacion[]> {
  const { data, error } = await supabase
    .from("licitaciones_secop")
    .select("*")
    .order("fecha_cierre", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
