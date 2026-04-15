const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🚀 Starting Supabase setup...');
  
  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_create_audit_requests.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📝 Running migration...');
    
    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    }).single();

    if (error) {
      // If exec_sql doesn't exist, try direct query (this might not work with service role)
      console.log('⚠️  exec_sql not available, please run the migration manually in Supabase SQL Editor');
      console.log('\n📋 Copy this SQL and run it in your Supabase SQL Editor:\n');
      console.log(migrationSQL);
      return;
    }

    console.log('✅ Migration completed successfully!');
    
    // Verify the table was created
    const { data: tables, error: tablesError } = await supabase
      .from('audit_requests')
      .select('*')
      .limit(1);
    
    if (tablesError) {
      console.error('❌ Error verifying table:', tablesError);
    } else {
      console.log('✅ Table audit_requests verified successfully!');
    }
    
  } catch (error) {
    console.error('❌ Error during setup:', error);
    process.exit(1);
  }
}

runMigration();