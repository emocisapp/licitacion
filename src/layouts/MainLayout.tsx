import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  nav?: ReactNode;
}

export function MainLayout({ children, nav }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Licitaciones Palmira</h2>
          {nav}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
