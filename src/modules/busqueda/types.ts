export interface BusquedaFiltros {
  departamentos: string[];
  palabrasClave: string[];
}

export const FILTROS_INICIALES: BusquedaFiltros = {
  departamentos: ["Valle del Cauca", "Cauca"],
  palabrasClave: [
    "OBRA CIVIL",
    "OBRAS CIVILES",
    "PAVIMENTA",
    "ALUMBRADO PUBLICO",
    "MALLA VIAL",
    "INFRAESTRUCTURA VIAL",
    "CONSTRUCCION DE VIA",
    "MEJORAMIENTO DE VIA",
    "MANTENIMIENTO DE VIA",
    "CONSTRUCCION DE PARQUE",
    "ADECUACION DE PARQUE",
    "MANTENIMIENTO DE PARQUE",
    "ESPACIO PUBLICO",
  ],
};
