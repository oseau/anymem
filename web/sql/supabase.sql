-- this is a backup from the supabase sql editor

CREATE TABLE IF NOT EXISTS
  users (
    clerk_user_id TEXT PRIMARY KEY,
    email TEXT, -- this can be changed if users change their primary email at clerk
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS
  decks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    clerk_user_id TEXT REFERENCES users (clerk_user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

ALTER TABLE decks ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS
  cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deck_id UUID REFERENCES decks (id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    due TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    front TEXT,
    back TEXT,
    meta jsonb
  );

ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS
  reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID REFERENCES cards (id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta jsonb
  );

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
