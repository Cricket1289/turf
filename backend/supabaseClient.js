import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

console.log('Loaded ENV keys:', Object.keys(process.env).filter(key => key.includes('SUPABASE')));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and Key are required in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
