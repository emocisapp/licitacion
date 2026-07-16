interface TabOption {
  value: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  active: string;
  onChange: (value: string) => void;
}

export function Tabs({ options, active, onChange }: TabsProps) {
  return (
    <nav className="mt-4 flex gap-2">
      {options.map((option) => {
        const isActive = option.value === active;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={
              isActive
                ? "rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm"
                : "rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            }
          >
            {option.label}
          </button>
        );
      })}
    </nav>
  );
}
