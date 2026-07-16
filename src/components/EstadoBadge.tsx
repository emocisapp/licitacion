const ESTILOS_ESTADO: Record<string, string> = {
  publicado: "bg-emerald-100 text-emerald-700",
  abierto: "bg-emerald-100 text-emerald-700",
  "en evaluación": "bg-amber-100 text-amber-700",
  evaluación: "bg-amber-100 text-amber-700",
  seleccionado: "bg-slate-100 text-slate-600",
  adjudicado: "bg-slate-100 text-slate-600",
  cancelado: "bg-red-100 text-red-700",
  borrador: "bg-slate-100 text-slate-500",
};

const ESTILO_DEFAULT = "bg-slate-100 text-slate-500";

interface EstadoBadgeProps {
  estado: string | null;
}

export function EstadoBadge({ estado }: EstadoBadgeProps) {
  if (!estado) return <span className="text-slate-400">—</span>;
  const clase = ESTILOS_ESTADO[estado.trim().toLowerCase()] ?? ESTILO_DEFAULT;
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${clase}`}>
      {estado}
    </span>
  );
}
