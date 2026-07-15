import type { Licitacion } from "../../../types/licitacion";
import { formatDate, formatMoney } from "../../../utils/format";

interface LicitacionesTableProps {
  licitaciones: Licitacion[];
}

export function LicitacionesTable({ licitaciones }: LicitacionesTableProps) {
  if (licitaciones.length === 0) {
    return <p>No hay licitaciones registradas todavía.</p>;
  }

  return (
    <div className="licitaciones-table-wrapper">
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
          {licitaciones.map((lic) => (
            <tr key={lic.id_proceso}>
              <td>{lic.entidad_compradora}</td>
              <td>{lic.objeto}</td>
              <td>{formatMoney(lic.cuantia)}</td>
              <td>{lic.estado}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
