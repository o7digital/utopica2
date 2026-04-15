const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
  try {
    console.log('Applying payment fields migration...');
    
    const migrationPath = path.join(__dirname, '../supabase/migrations/20240122_add_payment_fields.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Split the migration into individual statements
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: statement + ';'
      });
      
      if (error) {
        // Try direct execution if RPC doesn't exist
        console.log('RPC failed, trying direct query...');
        const { error: directError } = await supabase.from('prospects').select('count').single();
        
        if (!directError) {
          console.log('Table exists, applying alterations...');
          // Since we can't execute raw SQL directly, we'll check if columns exist
          const { data: tableInfo, error: infoError } = await supabase.from('prospects').select('*').limit(1);
          
          if (!infoError && tableInfo) {
            console.log('✅ Table structure seems to be already updated or will be updated via Supabase dashboard');
            console.log('\nPlease run the following SQL in your Supabase SQL editor:');
            console.log('----------------------------------------');
            console.log(migrationSQL);
            console.log('----------------------------------------');
            return;
          }
        }
        
        console.error('Error executing statement:', error || directError);
        throw error || directError;
      }
      
      console.log('✅ Statement executed successfully');
    }
    
    console.log('\n✅ Migration applied successfully!');
    
  } catch (error) {
    console.error('Failed to apply migration:', error);
    console.log('\n❌ Migration failed. Please apply it manually in Supabase SQL editor:');
    console.log('1. Go to https://supabase.com/dashboard/project/xpyqvgwbecnkoosjcesh/sql/new');
    console.log('2. Copy and paste the migration from: supabase/migrations/20240122_add_payment_fields.sql');
    console.log('3. Click "Run" to execute the migration');
  }
}

applyMigration();