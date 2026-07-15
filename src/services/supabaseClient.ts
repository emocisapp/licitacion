import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Copia .env.example a .env y complétalo."
  );
}

// Cliente compartido: usa siempre la anon key en el frontend, nunca la service_role key.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
