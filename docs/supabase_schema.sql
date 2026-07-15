-- Tabla para almacenar licitaciones SECOP II filtradas
-- (obra civil / parques / alumbrado / vías / pavimentación en Palmira, Valle del Cauca)

create table if not exists public.licitaciones_secop (
  id_proceso           text primary key,          -- id_del_proceso de SECOP II (clave para upsert)
  entidad_compradora   text,
  objeto               text,
  cuantia              numeric,
  estado               text,
  fecha_publicacion    timestamptz,
  fecha_cierre         timestamptz,
  enlace               text,
  creado_en            timestamptz not null default now(),
  actualizado_en       timestamptz not null default now()
);

-- Mantiene actualizado_en al día en cada upsert/update
create or replace function public.set_actualizado_en()
returns trigger as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_licitaciones_secop_actualizado_en on public.licitaciones_secop;
create trigger trg_licitaciones_secop_actualizado_en
  before update on public.licitaciones_secop
  for each row
  execute function public.set_actualizado_en();

-- Índices útiles para el panel (ordenar por cierre, filtrar por estado)
create index if not exists idx_licitaciones_secop_fecha_cierre on public.licitaciones_secop (fecha_cierre desc);
create index if not exists idx_licitaciones_secop_estado on public.licitaciones_secop (estado);

-- RLS: lectura pública (solo SELECT) para el panel en React,
-- las escrituras (upsert desde n8n) deben usar la service_role key, que ignora RLS.
alter table public.licitaciones_secop enable row level security;

create policy "Lectura pública de licitaciones"
  on public.licitaciones_secop
  for select
  using (true);
