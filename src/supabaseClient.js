import { createClient } from "@supabase/supabase-js";

// Note: All tables in the LRR database should have RLS enabled with read access for the "anon" role, so that the app can read from them without authentication
const supabaseUrl = "https://vsumrxhpkzegrktbtcui.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdW1yeGhwa3plZ3JrdGJ0Y3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3OTU2NzUsImV4cCI6MjAwMDM3MTY3NX0.9lafalZT9FJW1D8DAuIMrsRX0Gs6204nV8ETfGslrqI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
