import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  nav?: ReactNode;
}

export function MainLayout({ children, nav }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h2>Licitaciones Palmira</h2>
        {nav}
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
