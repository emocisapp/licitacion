# Licitaciones SECOP II — Palmira, Valle del Cauca

Panel para monitorear licitaciones públicas de obra civil (parques, alumbrado,
calles, vías, pavimentación) en Palmira, Valle del Cauca, extraídas de SECOP II
(Datos Abiertos Colombia) vía n8n y almacenadas en Supabase.

## Estructura del proyecto

```
src/
├── assets/          # Imágenes, fuentes, iconos globales
├── components/      # Componentes universales (LoadingSpinner, etc.)
├── hooks/           # Custom hooks globales
├── layouts/         # Envolturas de página (MainLayout)
├── modules/
│   ├── licitaciones/
│   │   ├── components/  # LicitacionesTable (compartida con busqueda/)
│   │   ├── hooks/       # useLicitaciones
│   │   ├── services/    # licitacionesService (consulta a Supabase)
│   │   └── LicitacionesPage.tsx
│   └── busqueda/
│       ├── components/  # BusquedaForm
│       ├── hooks/       # useBusquedaSecop
│       ├── services/    # secopService (llama a SECOP directo desde el navegador)
│       └── BusquedaPage.tsx
├── pages/           # DashboardPage: pestañas entre ambos módulos
├── services/        # supabaseClient.ts
├── store/           # (reservado para estado global futuro)
├── theme/           # (reservado; el tema vive en Tailwind, ver abajo)
├── types/           # Interfaces (Licitacion, LicitacionResumen)
├── utils/           # format.ts (moneda/fechas/urgencia de cierre)
└── App.tsx
```

`docs/` contiene los artefactos de la automatización: el esquema SQL de
Supabase (`supabase_schema.sql`) y el workflow de n8n
(`n8n_workflow_secop_palmira.json`).

## Los dos modos de búsqueda

- **Licitaciones guardadas** (`modules/licitaciones`): lee lo que n8n ya
  guardó en Supabase (corre automáticamente todos los días a las 6 AM).
- **Búsqueda personalizada** (`modules/busqueda`): la persona define
  departamento, municipio y palabras clave desde el panel, y el navegador
  llama **directamente** a la API de Datos Abiertos (SECOP soporta CORS
  público). No pasa por n8n ni se guarda en Supabase — es solo para
  explorar en el momento.

## Estilos

La interfaz usa [Tailwind CSS v4](https://tailwindcss.com/) (vía `@tailwindcss/vite`,
configurado en `vite.config.ts`) con una paleta clara (slate/indigo). Todo el
estilo vive como clases utilitarias directamente en los componentes — no hay
hojas de estilo separadas por módulo. `src/index.css` solo contiene el
`@import "tailwindcss";`.

## Configuración

1. Copia `.env.example` a `.env` y completa con los datos de tu proyecto
   Supabase (URL y **anon key** — nunca la service_role key aquí):

   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```

2. Ejecuta `docs/supabase_schema.sql` en el SQL Editor de Supabase.
3. Importa `docs/n8n_workflow_secop_palmira.json` en n8n y configura la
   `service_role key` de Supabase en el nodo "Supabase Upsert".

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
