import type { LicitacionResumen } from "../../../types/licitacion";
import { formatDate, formatMoney, urgenciaCierre } from "../../../utils/format";
import { EstadoBadge } from "../../../components/EstadoBadge";

interface LicitacionesTableProps {
  licitaciones: LicitacionResumen[];
}

const CLASE_FILA_URGENCIA: Record<string, string> = {
  proxima: "bg-amber-50",
  vencida: "opacity-60",
  normal: "",
  sin_fecha: "",
};

export function LicitacionesTable({ licitaciones }: LicitacionesTableProps) {
  if (licitaciones.length === 0) {
    return <p className="text-sm text-slate-500">No hay licitaciones para mostrar.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">Entidad</th>
            <th className="px-4 py-3">Objeto</th>
            <th className="px-4 py-3">Cuantía</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Publicación</th>
            <th className="px-4 py-3">Cierre</th>
            <th className="px-4 py-3">Enlace</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {licitaciones.map((lic) => {
            const urgencia = urgenciaCierre(lic.fecha_cierre);
            return (
              <tr key={lic.id_proceso} className={CLASE_FILA_URGENCIA[urgencia]}>
                <td className="px-4 py-3 align-top text-slate-700">{lic.entidad_compradora}</td>
                <td className="px-4 py-3 align-top text-slate-700">{lic.objeto}</td>
                <td className="px-4 py-3 align-top whitespace-nowrap text-slate-700">
                  {formatMoney(lic.cuantia)}
                </td>
                <td className="px-4 py-3 align-top">
                  <EstadoBadge estado={lic.estado} />
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap text-slate-500">
                  {formatDate(lic.fecha_publicacion)}
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap text-slate-500">
                  {formatDate(lic.fecha_cierre)}
                </td>
                <td className="px-4 py-3 align-top">
                  {lic.enlace && (
                    <a
                      href={lic.enlace}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      Ver proceso
                    </a>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
