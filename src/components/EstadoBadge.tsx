const ESTILOS_ESTADO: Record<string, string> = {
  publicado: "estado-badge--abierto",
  abierto: "estado-badge--abierto",
  "en evaluación": "estado-badge--evaluacion",
  evaluación: "estado-badge--evaluacion",
  seleccionado: "estado-badge--cerrado",
  adjudicado: "estado-badge--cerrado",
  cancelado: "estado-badge--cancelado",
  borrador: "estado-badge--borrador",
};

interface EstadoBadgeProps {
  estado: string | null;
}

export function EstadoBadge({ estado }: EstadoBadgeProps) {
  if (!estado) return <span>—</span>;
  const clase = ESTILOS_ESTADO[estado.trim().toLowerCase()] ?? "estado-badge--default";
  return <span className={`estado-badge ${clase}`}>{estado}</span>;
}
