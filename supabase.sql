-- Viza so'rovlari jadvali
CREATE TABLE visa_requests (
  id BIGSERIAL PRIMARY KEY,
  phone TEXT NOT NULL,
  barcode TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Aviabilet so'rovlari jadvali
CREATE TABLE flight_requests (
  id BIGSERIAL PRIMARY KEY,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  date DATE NOT NULL,
  passengers TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
