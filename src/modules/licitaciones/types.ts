export interface FiltrosLicitaciones {
  texto: string;
  estado: string;
  cuantiaMin: string;
  cuantiaMax: string;
}

export const FILTROS_LICITACIONES_INICIALES: FiltrosLicitaciones = {
  texto: "",
  estado: "",
  cuantiaMin: "",
  cuantiaMax: "",
};
