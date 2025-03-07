
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jfoxlnxwtrdhdguexzex.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb3hsbnh3dHJkaGRndWV4emV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyOTAyODcsImV4cCI6MjA1Njg2NjI4N30.U5aDG2B18qcrksZUqPg7m5ovKvdUhi1dMywM1B2MuSE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
