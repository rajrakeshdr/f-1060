// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ykkbxlbonywjmvbyfvwo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra2J4bGJvbnl3am12YnlmdndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NTA2NjIsImV4cCI6MjA1NTUyNjY2Mn0.2BZul_igHKmZtQGhbwV3PvRsCikxviL8ogTKPD3XhuU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);