import type { LicitacionResumen } from "../../../types/licitacion";
import { formatDate, formatMoney, urgenciaCierre } from "../../../utils/format";
import { EstadoBadge } from "../../../components/EstadoBadge";

interface LicitacionesTableProps {
  licitaciones: LicitacionResumen[];
}

export function LicitacionesTable({ licitaciones }: LicitacionesTableProps) {
  if (licitaciones.length === 0) {
    return <p>No hay licitaciones para mostrar.</p>;
  }

  return (
    <div className="licitaciones-table-wrapper">
      <p className="licitaciones-count">{licitaciones.length} resultado(s)</p>
      <table className="licitaciones-table">
        <thead>
          <tr>
            <th>Entidad</th>
            <th>Objeto</th>
            <th>Cuantía</th>
            <th>Estado</th>
            <th>Publicación</th>
            <th>Cierre</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          {licitaciones.map((lic) => {
            const urgencia = urgenciaCierre(lic.fecha_cierre);
            return (
              <tr key={lic.id_proceso} className={`fila-urgencia--${urgencia}`}>
                <td>{lic.entidad_compradora}</td>
                <td>{lic.objeto}</td>
                <td>{formatMoney(lic.cuantia)}</td>
                <td>
                  <EstadoBadge estado={lic.estado} />
                </td>
                <td>{formatDate(lic.fecha_publicacion)}</td>
                <td>{formatDate(lic.fecha_cierre)}</td>
                <td>
                  {lic.enlace && (
                    <a href={lic.enlace} target="_blank" rel="noreferrer">
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
