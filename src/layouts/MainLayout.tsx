import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h2>Licitaciones Palmira</h2>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
