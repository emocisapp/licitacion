export interface BusquedaFiltros {
  departamento: string;
  municipio: string;
  palabrasClave: string[];
}

export const FILTROS_INICIALES: BusquedaFiltros = {
  departamento: "Valle del Cauca",
  municipio: "Palmira",
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
