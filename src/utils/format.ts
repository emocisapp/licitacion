export function formatMoney(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const DIACRITICOS = new RegExp(
  "[" + String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036f) + "]",
  "g"
);

export function normalizarTexto(valor: string): string {
  return valor.normalize("NFD").replace(DIACRITICOS, "").toLowerCase();
}

export type UrgenciaCierre = "vencida" | "proxima" | "normal" | "sin_fecha";

const DIAS_CIERRE_PROXIMO = 5;

export function urgenciaCierre(fechaCierre: string | null): UrgenciaCierre {
  if (!fechaCierre) return "sin_fecha";
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const cierre = new Date(fechaCierre);
  const dias = (cierre.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
  if (dias < 0) return "vencida";
  if (dias <= DIAS_CIERRE_PROXIMO) return "proxima";
  return "normal";
}
