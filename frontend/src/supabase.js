import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ksohuzxlvcraxseecyze.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzb2h1enhsdmNyYXhzZWVjeXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDUyMzksImV4cCI6MjA5MDMyMTIzOX0.Xp_XHVEj1lX-dtM7AEgXPBQNm82QZsbGa_svKeYR-mc';

export const supabase = createClient(supabaseUrl, supabaseKey);
