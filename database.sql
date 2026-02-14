
-- 1. საიტის გლობალური კონტენტის ცხრილი (ფასები, ფოტოები, ტექსტები)
CREATE TABLE IF NOT EXISTS site_content (
    id INT PRIMARY KEY,
    ka_data JSONB DEFAULT '{}'::jsonb,
    en_data JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ექიმების ცხრილი (ორენოვანი ბიოგრაფიით და განათლებით)
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    role_ka TEXT NOT NULL,
    role_en TEXT NOT NULL,
    image_url TEXT,
    bio_ka TEXT,
    bio_en TEXT,
    education_ka TEXT,
    education_en TEXT,
    specialization_ka TEXT,
    specialization_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ბლოგების ცხრილი
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title_ka TEXT NOT NULL,
    title_en TEXT NOT NULL,
    content_ka TEXT NOT NULL,
    content_en TEXT NOT NULL,
    category_ka TEXT NOT NULL,
    category_en TEXT NOT NULL,
    excerpt_ka TEXT,
    excerpt_en TEXT,
    image_url TEXT,
    post_date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ჯავშნების ცხრილი (Leads)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    doctor TEXT,
    concern TEXT,
    message TEXT,
    date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. საწყისი მონაცემის ჩამატება (საჭიროა CMS-ის მუშაობისთვის)
INSERT INTO site_content (id, ka_data, en_data) 
VALUES (1, '{}', '{}') 
ON CONFLICT (id) DO NOTHING;

-- 6. წვდომის უფლებების გახსნა (RLS - Row Level Security)
-- შენიშვნა: მარტივი ტესტირებისთვის შეგიძლიათ გათიშოთ RLS Supabase-ში, 
-- ან გამოიყენოთ ეს ბრძანებები პოლიტიკების შესაქმნელად:

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON site_content FOR UPDATE USING (true);
CREATE POLICY "Allow public insert" ON site_content FOR INSERT WITH CHECK (true);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public all team" ON team_members FOR ALL USING (true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read blog" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public all blog" ON blog_posts FOR ALL USING (true);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read leads" ON leads FOR SELECT USING (true);
CREATE POLICY "Allow public delete leads" ON leads FOR DELETE USING (true);
