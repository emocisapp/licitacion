import { MainLayout } from "../layouts/MainLayout";
import { LicitacionesPage } from "../modules/licitaciones/LicitacionesPage";

export function DashboardPage() {
  return (
    <MainLayout>
      <LicitacionesPage />
    </MainLayout>
  );
}
