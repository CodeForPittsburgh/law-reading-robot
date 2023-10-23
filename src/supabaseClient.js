import { createClient } from "@supabase/supabase-js";

// Note: All tables in the LRR database should have RLS enabled with read access for the "anon" role, so that the app can read from them without authentication
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
