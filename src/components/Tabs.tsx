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
    <nav className="tabs">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`tabs__item ${option.value === active ? "tabs__item--active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </nav>
  );
}
