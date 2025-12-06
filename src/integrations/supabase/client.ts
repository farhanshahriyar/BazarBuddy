import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Check if environment variables are loaded
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Environment variables not loaded!');
    console.log('Available env:', import.meta.env);
    throw new Error(
        'Missing Supabase environment variables. Make sure your .env file has:\n' +
        'VITE_SUPABASE_URL=your-url\n' +
        'VITE_SUPABASE_ANON_KEY=your-key'
    );
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);