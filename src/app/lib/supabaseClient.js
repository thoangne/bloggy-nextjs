import { createClient } from "@supabase/supabase-js";
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabaseClient = createClient(supabase, supabaseAnonKey);
