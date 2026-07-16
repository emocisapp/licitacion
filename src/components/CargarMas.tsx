interface CargarMasProps {
  visibles: number;
  total: number;
  onCargarMas: () => void;
}

export function CargarMas({ visibles, total, onCargarMas }: CargarMasProps) {
  if (visibles >= total) return null;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={onCargarMas}
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
      >
        Cargar más ({total - visibles} restantes)
      </button>
    </div>
  );
}
