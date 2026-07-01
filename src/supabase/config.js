// Supabase initialization.
// Credentials are read from environment variables (see .env.example) — the
// "anon" key is safe to ship to the browser by design (Supabase's equivalent
// of Firebase's web API key); real protection comes from Row Level Security
// policies on the table (see schema.sql).

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const REGISTRATIONS_TABLE = 'registrations';
