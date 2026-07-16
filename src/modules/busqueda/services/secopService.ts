import type { LicitacionResumen } from "../../../types/licitacion";
import type { BusquedaFiltros } from "../types";

const SECOP_ENDPOINT = "https://www.datos.gov.co/resource/p6dx-8zbt.json";
const ANOS_ATRAS_PUBLICACION = 1;

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

function fechaCorte(): string {
  const fecha = new Date();
  fecha.setFullYear(fecha.getFullYear() - ANOS_ATRAS_PUBLICACION);
  return fecha.toISOString().slice(0, 10);
}

function construirWhere(filtros: BusquedaFiltros): string {
  const clausulas: string[] = [];

  const departamentos = filtros.departamentos.map((d) => d.trim()).filter(Boolean);
  if (departamentos.length > 0) {
    const porDepartamento = departamentos.map(
      (d) => `departamento_entidad = '${escapeSoql(d)}'`
    );
    clausulas.push(`(${porDepartamento.join(" OR ")})`);
  }

  clausulas.push(`fecha_de_publicacion_del >= '${fechaCorte()}'`);

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
