-- Agregar campos de pago a la tabla prospects
ALTER TABLE prospects
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS program_type TEXT,
ADD COLUMN IF NOT EXISTS workshop_id TEXT,
ADD COLUMN IF NOT EXISTS workshop_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_amount INTEGER,
ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP WITH TIME ZONE;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_workshop_id ON prospects(workshop_id);
CREATE INDEX IF NOT EXISTS idx_prospects_payment_id ON prospects(payment_id);

-- Agregar comentarios para documentación
COMMENT ON COLUMN prospects.program_type IS 'Tipo de programa: REGULAR o CIRCULO_INTERNO';
COMMENT ON COLUMN prospects.status IS 'Estado del prospecto: pending, pending_payment, paid, cancelled';
COMMENT ON COLUMN prospects.payment_amount IS 'Monto del pago en centavos (MXN)';