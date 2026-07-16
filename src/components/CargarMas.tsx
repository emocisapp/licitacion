interface CargarMasProps {
  visibles: number;
  total: number;
  onCargarMas: () => void;
}

export function CargarMas({ visibles, total, onCargarMas }: CargarMasProps) {
  if (visibles >= total) return null;

  return (
    <div className="cargar-mas">
      <button type="button" onClick={onCargarMas}>
        Cargar más ({total - visibles} restantes)
      </button>
    </div>
  );
}
