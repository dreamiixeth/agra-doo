-- =============================================
-- AGRA d.o.o. - ČISTA BAZA
-- =============================================
-- Zaženi v Supabase SQL Editor (supabase.com → SQL Editor)

-- 1. IZBRIŠI STARE TABELE (če obstajajo)
DROP TABLE IF EXISTS models CASCADE;
DROP TABLE IF EXISTS types CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS machines CASCADE;
DROP TABLE IF EXISTS brands CASCADE;

-- 2. USTVARI KATEGORIJE
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    brand_name TEXT NOT NULL,
    brand_logo TEXT,
    icon TEXT DEFAULT '🔧',
    description TEXT,
    has_prices BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USTVARI VRSTE (TYPES)
CREATE TABLE types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    image_url TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(category_id, slug)
);

-- 4. USTVARI MODELE
CREATE TABLE models (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type_id UUID REFERENCES types(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    specifications JSONB DEFAULT '{}',
    optional_equipment TEXT[] DEFAULT '{}',
    image_url TEXT,
    gallery TEXT[] DEFAULT '{}',
    price DECIMAL(10,2),
    price_with_vat DECIMAL(10,2),
    pdf_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(type_id, slug)
);

-- 5. INDEKSI ZA HITROST
CREATE INDEX idx_types_category ON types(category_id);
CREATE INDEX idx_models_type ON models(type_id);
CREATE INDEX idx_models_active ON models(is_active);

-- 6. RLS POLITIKE (Row Level Security)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE types ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;

-- Dovoli branje vsem
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read types" ON types FOR SELECT USING (true);
CREATE POLICY "Allow public read models" ON models FOR SELECT USING (true);

-- =============================================
-- 7. VNESI KATEGORIJE
-- =============================================
INSERT INTO categories (name, slug, brand_name, brand_logo, icon, description, has_prices, sort_order) VALUES
('Traktorji', 'traktorji', 'Steyr', 'https://www.steyr-traktoren.com/themes/flavour/img/steyr_logo.svg', '🚜', 'Zanesljivi traktorji za vse vrste dela', false, 1),
('Kosilnice', 'kosilnice', 'Pöttinger', 'https://www.poettinger.at/img/logo.svg', '🌿', 'Diskaste in bobenske kosilnice', false, 2),
('Obračalniki', 'obracalniki', 'Pöttinger', 'https://www.poettinger.at/img/logo.svg', '🔄', 'Obračalniki sena za optimalno sušenje', false, 3),
('Zgrabljalniki', 'zgrabljalniki', 'Pöttinger', 'https://www.poettinger.at/img/logo.svg', '🌾', 'Zgrabljalniki za učinkovito zbiranje', false, 4),
('Samonakladalne prikolice', 'samonakladalne-prikolice', 'Pöttinger', 'https://www.poettinger.at/img/logo.svg', '🚛', 'Prikolice za transport krme', false, 5),
('Balirke', 'balirke', 'Pöttinger', 'https://www.poettinger.at/img/logo.svg', '📦', 'Balirke za okrogle in kvadratne bale', false, 6),
('Avto prikolice', 'avto-prikolice', 'Vesta', '/images/vesta-logo.png', '🚗', 'Kvalitetne prikolice za osebna vozila', true, 7);

-- =============================================
-- 8. VNESI VRSTE TRAKTORJEV (Steyr)
-- =============================================
INSERT INTO types (category_id, name, slug, description, sort_order)
SELECT id, 'Kompakt S', 'kompakt-s', 'Kompaktni traktorji za manjše kmetije', 1 FROM categories WHERE slug = 'traktorji'
UNION ALL
SELECT id, 'Kompakt', 'kompakt', 'Vsestranski kompaktni traktorji', 2 FROM categories WHERE slug = 'traktorji'
UNION ALL
SELECT id, 'Multi', 'multi', 'Večnamenski traktorji', 3 FROM categories WHERE slug = 'traktorji'
UNION ALL
SELECT id, 'Absolut CVT', 'absolut-cvt', 'Traktorji z brezstopenskim menjalnikom', 4 FROM categories WHERE slug = 'traktorji'
UNION ALL
SELECT id, 'Profi', 'profi', 'Profesionalni traktorji', 5 FROM categories WHERE slug = 'traktorji'
UNION ALL
SELECT id, 'Profi CVT', 'profi-cvt', 'Profesionalni CVT traktorji', 6 FROM categories WHERE slug = 'traktorji'
UNION ALL
SELECT id, 'Expert CVT', 'expert-cvt', 'Ekspertni razred traktorjev', 7 FROM categories WHERE slug = 'traktorji'
UNION ALL
SELECT id, 'Impuls CVT', 'impuls-cvt', 'Zmogljivi Impuls traktorji', 8 FROM categories WHERE slug = 'traktorji'
UNION ALL
SELECT id, 'Terrus CVT', 'terrus-cvt', 'Najmočnejši Steyr traktorji', 9 FROM categories WHERE slug = 'traktorji';

-- =============================================
-- 9. VNESI VRSTE PRIKOLIC (Vesta)
-- =============================================
INSERT INTO types (category_id, name, slug, description, sort_order)
SELECT id, 'Light', 'light', 'Lahke prikolice do 750 kg', 1 FROM categories WHERE slug = 'avto-prikolice'
UNION ALL
SELECT id, 'Cargo', 'cargo', 'Tovorne prikolice', 2 FROM categories WHERE slug = 'avto-prikolice'
UNION ALL
SELECT id, 'Plato', 'plato', 'Prikolice s platformo', 3 FROM categories WHERE slug = 'avto-prikolice'
UNION ALL
SELECT id, 'Marine', 'marine', 'Prikolice za čolne', 4 FROM categories WHERE slug = 'avto-prikolice'
UNION ALL
SELECT id, 'Moto', 'moto', 'Prikolice za motocikle', 5 FROM categories WHERE slug = 'avto-prikolice'
UNION ALL
SELECT id, 'Craft', 'craft', 'Obrtniške prikolice', 6 FROM categories WHERE slug = 'avto-prikolice'
UNION ALL
SELECT id, 'Transporter', 'transporter', 'Transportne prikolice', 7 FROM categories WHERE slug = 'avto-prikolice';

-- =============================================
-- 10. PRIMER MODELA (za test)
-- =============================================
INSERT INTO models (type_id, name, slug, description, specifications, price, price_with_vat, is_active)
SELECT 
    t.id,
    'Vesta Light 750',
    'vesta-light-750',
    'Lahka prikolica za splošno uporabo',
    '{"dolzina": "2500 mm", "sirina": "1300 mm", "nosilnost": "750 kg", "masa": "180 kg"}',
    890.00,
    1086.90,
    true
FROM types t
JOIN categories c ON t.category_id = c.id
WHERE c.slug = 'avto-prikolice' AND t.slug = 'light';

-- =============================================
-- KONČANO! Preveri z:
-- SELECT * FROM categories ORDER BY sort_order;
-- SELECT t.*, c.name as category_name FROM types t JOIN categories c ON t.category_id = c.id ORDER BY c.sort_order, t.sort_order;
-- =============================================
