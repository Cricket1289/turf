# Ottobon Box Cricket Tournament Database Schema

## 1. Tables

### `admins`
Admin access for the dashboard.
- `id`: UUID (Primary Key)
- `username`: TEXT (Unique)
- `password_hash`: TEXT
- `role`: TEXT (Default: 'admin')
- `created_at`: TIMESTAMP

### `players`
Player registration data and document links.
- `id`: UUID (Primary Key)
- `full_name`: TEXT
- `phone_number`: TEXT (10-digit validation)
- `college_name`: TEXT
- `team_name`: TEXT
- `course`: TEXT
- `student_id_url`: TEXT
- `marks_memo_url`: TEXT (Optional/Removed)
- `payment_screenshot_url`: TEXT
- `registration_status`: TEXT ('Pending', 'Approved', 'Rejected')
- `team_id`: UUID (Foreign Key to `teams`)
- `is_captain`: BOOLEAN
- `created_at`: TIMESTAMP

### `teams`
Team details and linkage to players.
- `id`: UUID (Primary Key)
- `team_name`: TEXT (Unique)
- `team_code`: TEXT (Unique, 6-char)
- `captain_id`: UUID (Foreign Key to `players`)
- `created_at`: TIMESTAMP

### `matches`
Tournament bracket management.
- `id`: UUID (Primary Key)
- `round`: TEXT ('Quarter-Final', 'Semi-Final', 'Final')
- `team_a`: UUID (Foreign Key to `teams`)
- `team_b`: UUID (Foreign Key to `teams`)
- `score_a`: TEXT (e.g., '20/2 (6.0)')
- `score_b`: TEXT
- `winner_id`: UUID (Foreign Key to `teams`)
- `is_completed`: BOOLEAN
- `match_number`: INTEGER
- `scheduled_at`: TIMESTAMP
- `created_at`: TIMESTAMP

## 2. Storage Buckets

### `registrations`
- Public access: Enabled
- Folders: `ids/`, `memos/`, `payments/`

## 3. SQL for Supabase (Setup)

```sql
-- ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TEAMS TABLE
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_name TEXT UNIQUE NOT NULL,
  team_code TEXT UNIQUE NOT NULL,
  captain_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PLAYERS TABLE
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL CHECK (phone_number ~ '^[0-9]{10}$'),
  college_name TEXT NOT NULL,
  team_name TEXT NOT NULL,
  course TEXT NOT NULL,
  student_id_url TEXT NOT NULL,
  marks_memo_url TEXT,
  payment_screenshot_url TEXT NOT NULL,
  registration_status TEXT DEFAULT 'Pending' CHECK (registration_status IN ('Pending', 'Approved', 'Rejected')),
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  is_captain BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. LINK TEAMS AND PLAYERS
ALTER TABLE teams ADD CONSTRAINT fk_captain FOREIGN KEY (captain_id) REFERENCES players(id) ON DELETE SET NULL;

-- 4. MATCHES TABLE
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  round TEXT NOT NULL CHECK (round IN ('Quarter-Final', 'Semi-Final', 'Final', 'League')),
  team_a UUID REFERENCES teams(id),
  team_b UUID REFERENCES teams(id),
  score_a TEXT DEFAULT '0/0 (0.0)',
  score_b TEXT DEFAULT '0/0 (0.0)',
  winner_id UUID REFERENCES teams(id),
  is_completed BOOLEAN DEFAULT FALSE,
  match_number INTEGER NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ADMINS TABLE
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. STORAGE BUCKET POLICIES
INSERT INTO storage.buckets (id, name, public) 
VALUES ('registrations', 'registrations', true) 
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Insert registrations" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'registrations');
CREATE POLICY "Public Select registrations" ON storage.objects FOR SELECT USING (bucket_id = 'registrations');

-- Insert a default admin (password is 'admin123' hashed with bcrypt)
-- You can change this later
INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2b$10$YourHashedPasswordHere');
## Storage Buckets
Create two public storage buckets in Supabase:
1. `student-ids`
2. `marks-memos`
