// // sensitive information
// import { createClient } from '@supabase/supabase-js';
// import type { Database } from './types';
// import 'dotenv/config'; // OR require('dotenv').config();

// const SUPABASE_URL = "https://wcrwwulyhkkbuhmlzqzn.supabase.co";
// const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjcnd3dWx5aGtrYnVobWx6cXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNzE3ODIsImV4cCI6MjA2MTk0Nzc4Mn0.BZRYh9hP7uw44bKEIiRFKOeoyFL0AIkThLzOfvdUmcY";

// // Import the supabase client like this:
// // import { supabase } from "@/integrations/supabase/client";

// export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';


// const SUPABASE_URL = process.env.SUPABASE_URL!;
// const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY!;

// export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
