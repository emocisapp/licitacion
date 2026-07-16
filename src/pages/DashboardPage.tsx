import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Tabs } from "../components/Tabs";
import { LicitacionesPage } from "../modules/licitaciones/LicitacionesPage";
import { BusquedaPage } from "../modules/busqueda/BusquedaPage";

const TABS = [
  { value: "guardadas", label: "Licitaciones guardadas" },
  { value: "busqueda", label: "Búsqueda personalizada" },
];

export function DashboardPage() {
  const [tab, setTab] = useState("guardadas");

  return (
    <MainLayout nav={<Tabs options={TABS} active={tab} onChange={setTab} />}>
      {tab === "guardadas" ? <LicitacionesPage /> : <BusquedaPage />}
    </MainLayout>
  );
}
