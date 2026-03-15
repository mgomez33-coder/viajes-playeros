-- Crear tabla de reservas
CREATE TABLE reservas (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  fecha_llegada TEXT NOT NULL,
  fecha_salida TEXT NOT NULL,
  huespedes TEXT NOT NULL,
  tipo_hotel TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permitir que cualquiera inserte reservas (el formulario público)
CREATE POLICY "Cualquiera puede insertar reservas"
ON reservas FOR INSERT
TO anon
WITH CHECK (true);

-- Solo los autenticados pueden leer
CREATE POLICY "Solo autenticados leen reservas"
ON reservas FOR SELECT
TO authenticated
USING (true);

-- Habilitar RLS
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
