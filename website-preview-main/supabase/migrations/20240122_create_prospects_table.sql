-- Crear tabla prospects si no existe
CREATE TABLE IF NOT EXISTS prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  website_url TEXT,
  
  -- Campos de auditoría
  audit_score_clarity INTEGER,
  audit_score_relevance INTEGER,
  audit_score_uniqueness INTEGER,
  audit_recommendations TEXT,
  
  -- Campos de información personal
  name TEXT,
  phone TEXT,
  
  -- Campos de programa y taller
  program_type TEXT, -- REGULAR o CIRCULO_INTERNO
  workshop_id TEXT,
  workshop_date TIMESTAMP WITH TIME ZONE,
  
  -- Campos de estado y pago
  status TEXT DEFAULT 'pending', -- pending, pending_payment, paid, cancelled
  payment_id TEXT,
  payment_amount INTEGER, -- en centavos
  payment_date TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_prospects_email ON prospects(email);
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_workshop_id ON prospects(workshop_id);
CREATE INDEX IF NOT EXISTS idx_prospects_payment_id ON prospects(payment_id);
CREATE INDEX IF NOT EXISTS idx_prospects_created_at ON prospects(created_at DESC);

-- Agregar comentarios para documentación
COMMENT ON TABLE prospects IS 'Tabla de prospectos y clientes del Sprint de Claridad Comercial';
COMMENT ON COLUMN prospects.program_type IS 'Tipo de programa: REGULAR o CIRCULO_INTERNO';
COMMENT ON COLUMN prospects.status IS 'Estado del prospecto: pending, pending_payment, paid, cancelled';
COMMENT ON COLUMN prospects.payment_amount IS 'Monto del pago en centavos (MXN)';

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_prospects_updated_at 
  BEFORE UPDATE ON prospects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserción anónima (para auditorías)
CREATE POLICY "Allow anonymous insert" ON prospects
  FOR INSERT
  WITH CHECK (true);

-- Crear política para lectura solo con service role
CREATE POLICY "Service role full access" ON prospects
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);