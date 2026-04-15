const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🚀 Executing Supabase migration...');
  
  try {
    // Test connection first
    const { data: test, error: testError } = await supabase
      .from('_prisma_migrations')
      .select('*')
      .limit(1);
    
    console.log('✅ Connected to Supabase successfully');
    
    // Since we can't execute raw SQL directly through the JS client,
    // let's create the table using individual operations
    
    // First, let's check if the table already exists
    const { data: existingTable, error: checkError } = await supabase
      .from('audit_requests')
      .select('*')
      .limit(1);
    
    if (!checkError || checkError.code !== 'PGRST116') {
      console.log('⚠️  Table audit_requests might already exist');
      return;
    }
    
    console.log('❌ Cannot create table directly via JS client.');
    console.log('📋 Please run the following SQL in Supabase SQL Editor:');
    console.log('\nDirect link to SQL Editor:');
    console.log(`https://supabase.com/dashboard/project/${supabaseUrl.split('.')[0].replace('https://', '')}/sql/new`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

runMigration();