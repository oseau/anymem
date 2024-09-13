-- this is a backup from the supabase sql editor

CREATE TABLE
  books (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    word_count INTEGER DEFAULT 0
  );

ALTER TABLE books ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  units (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    book_id BIGINT REFERENCES books (id),
    word_count INTEGER DEFAULT 0
  );

ALTER TABLE units ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  words (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    spell TEXT,
    interpretation TEXT,
    unit_id BIGINT REFERENCES units (id)
  );

ALTER TABLE words ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  users (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    clerk_user_id TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  flashcards (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT REFERENCES users (id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    front_content TEXT,
    back_content TEXT,
    meta jsonb
  );

ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  schedules (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    flashcard_id BIGINT REFERENCES flashcards (id),
    revisit_date TIMESTAMP WITH TIME ZONE,
    correct BOOLEAN,
    seconds_taken INTERVAL,
    is_done BOOLEAN DEFAULT FALSE
  );

ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;


-- Indexes for books
CREATE INDEX idx_books_title_fts ON public.books USING gin (to_tsvector('simple', title));

-- Indexes for units
CREATE INDEX idx_units_book_id ON public.units USING btree (book_id);

-- Indexes for words
CREATE INDEX idx_words_unit_id ON public.words USING btree (unit_id);
CREATE INDEX idx_words_spell ON public.words USING btree (spell);

-- Indexes for schedules
CREATE INDEX idx_schedules_word_id ON public.schedules USING btree (flashcard_id);
CREATE INDEX idx_schedules_revisit_date ON public.schedules USING btree (revisit_date);
CREATE INDEX idx_schedules_flashcard_id ON public.schedules USING btree (flashcard_id);
CREATE INDEX idx_schedules_flashcard_id_revisit_date ON public.schedules USING btree (flashcard_id, revisit_date);

-- Indexes for flashcards
CREATE INDEX idx_flashcards_user_id ON public.flashcards USING btree (user_id);
CREATE INDEX idx_flashcards_meta ON public.flashcards USING gin (meta);