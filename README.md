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
│   └── licitaciones/
│       ├── components/  # LicitacionesTable
│       ├── hooks/       # useLicitaciones
│       ├── services/    # licitacionesService (consulta a Supabase)
│       └── LicitacionesPage.tsx
├── pages/           # DashboardPage: combina layout + módulo
├── services/        # supabaseClient.ts
├── store/           # (reservado para estado global futuro)
├── theme/           # Variables de tema (theme.css)
├── types/           # Interfaces (Licitacion)
├── utils/           # format.ts (formateo de moneda/fechas)
└── App.tsx
```

`docs/` contiene los artefactos de la automatización: el esquema SQL de
Supabase (`supabase_schema.sql`) y el workflow de n8n
(`n8n_workflow_secop_palmira.json`).

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
