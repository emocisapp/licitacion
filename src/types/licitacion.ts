export interface Licitacion {
  id_proceso: string;
  entidad_compradora: string | null;
  objeto: string | null;
  cuantia: number | null;
  estado: string | null;
  fecha_publicacion: string | null;
  fecha_cierre: string | null;
  enlace: string | null;
  creado_en: string;
  actualizado_en: string;
}
