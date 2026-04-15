const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testSupabase() {
  console.log('🔍 Testing Supabase connection and tables...\n');
  
  try {
    // Try to insert a test record
    console.log('📝 Attempting to insert a test audit request...');
    const { data: insertData, error: insertError } = await supabase
      .from('audit_requests')
      .insert({
        email: 'test@example.com',
        website_url: 'https://example.com',
        analysis_status: 'pending'
      })
      .select();
    
    if (insertError) {
      if (insertError.code === '42P01') {
        console.log('❌ Table audit_requests does not exist');
        console.log('📋 Please create it using the SQL Editor');
      } else {
        console.log('❌ Insert error:', insertError.message);
      }
    } else {
      console.log('✅ Test insert successful!');
      console.log('📊 Inserted data:', insertData);
      
      // Clean up test data
      if (insertData && insertData[0]) {
        const { error: deleteError } = await supabase
          .from('audit_requests')
          .delete()
          .eq('id', insertData[0].id);
        
        if (!deleteError) {
          console.log('🧹 Test data cleaned up');
        }
      }
    }
    
    // Try to read from the table
    console.log('\n📖 Attempting to read from audit_requests...');
    const { data: readData, error: readError, count } = await supabase
      .from('audit_requests')
      .select('*', { count: 'exact' })
      .limit(5);
    
    if (readError) {
      console.log('❌ Read error:', readError.message);
    } else {
      console.log('✅ Table exists and is readable');
      console.log(`📊 Total records: ${count || 0}`);
      if (readData && readData.length > 0) {
        console.log('📋 Recent records:', readData);
      }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
  
  console.log('\n🔗 Direct link to SQL Editor:');
  console.log(`https://supabase.com/dashboard/project/xpyqvgwbecnkoosjcesh/sql/new`);
}

testSupabase();