-- Migration: Add preferred_language to profiles
-- This column might already exist in your local schema, but this SQL ensures it's present and has the correct default.

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'profiles' 
                   AND column_name = 'preferred_language') THEN
        ALTER TABLE public.profiles ADD COLUMN preferred_language TEXT DEFAULT 'en';
    END IF;
END $$;

-- Ensure default value for existing rows if needed
UPDATE public.profiles SET preferred_language = 'en' WHERE preferred_language IS NULL;
