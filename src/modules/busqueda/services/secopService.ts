import type { LicitacionResumen } from "../../../types/licitacion";
import type { BusquedaFiltros } from "../types";

const SECOP_ENDPOINT = "https://www.datos.gov.co/resource/p6dx-8zbt.json";

interface SecopProceso {
  id_del_proceso?: string;
  entidad?: string;
  descripci_n_del_procedimiento?: string;
  nombre_del_procedimiento?: string;
  precio_base?: string;
  estado_del_procedimiento?: string;
  fecha_de_publicacion_del?: string;
  fecha_de_recepcion_de?: string;
  urlproceso?: { url?: string };
}

function escapeSoql(value: string): string {
  return value.replace(/'/g, "''");
}

function construirWhere(filtros: BusquedaFiltros): string {
  const clausulas: string[] = [];

  if (filtros.departamento.trim()) {
    clausulas.push(`departamento_entidad = '${escapeSoql(filtros.departamento.trim())}'`);
  }
  if (filtros.municipio.trim()) {
    clausulas.push(`ciudad_entidad = '${escapeSoql(filtros.municipio.trim())}'`);
  }

  const palabras = filtros.palabrasClave.map((p) => p.trim()).filter(Boolean);
  if (palabras.length > 0) {
    const porPalabra = palabras.flatMap((palabra) => {
      const escapada = escapeSoql(palabra.toUpperCase());
      return [
        `upper(descripci_n_del_procedimiento) like '%${escapada}%'`,
        `upper(nombre_del_procedimiento) like '%${escapada}%'`,
      ];
    });
    clausulas.push(`(${porPalabra.join(" OR ")})`);
  }

  return clausulas.join(" AND ");
}

function mapProceso(p: SecopProceso): LicitacionResumen | null {
  if (!p.id_del_proceso) return null;
  return {
    id_proceso: p.id_del_proceso,
    entidad_compradora: p.entidad ?? null,
    objeto: p.descripci_n_del_procedimiento || p.nombre_del_procedimiento || null,
    cuantia: p.precio_base ? Number(p.precio_base) : null,
    estado: p.estado_del_procedimiento ?? null,
    fecha_publicacion: p.fecha_de_publicacion_del ?? null,
    fecha_cierre: p.fecha_de_recepcion_de ?? null,
    enlace: p.urlproceso?.url ?? null,
  };
}

export async function buscarEnSecop(filtros: BusquedaFiltros): Promise<LicitacionResumen[]> {
  const params = new URLSearchParams();
  params.set("$limit", "1000");
  params.set("$order", "fecha_de_publicacion_del DESC");
  const where = construirWhere(filtros);
  if (where) params.set("$where", where);

  const res = await fetch(`${SECOP_ENDPOINT}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`SECOP respondió con error ${res.status}`);
  }

  const datos: SecopProceso[] = await res.json();

  const vistos = new Map<string, LicitacionResumen>();
  for (const p of datos) {
    const mapeado = mapProceso(p);
    if (mapeado && !vistos.has(mapeado.id_proceso)) {
      vistos.set(mapeado.id_proceso, mapeado);
    }
  }
  return Array.from(vistos.values());
}
