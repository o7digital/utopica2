const fs = require('fs');
const path = require('path');

console.log('📋 Supabase Migration SQL\n');
console.log('Instructions:');
console.log('1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/xpyqvgwbecnkoosjcesh');
console.log('2. Click on "SQL Editor" in the left sidebar');
console.log('3. Click "New query"');
console.log('4. Copy and paste the SQL below');
console.log('5. Click "Run"\n');
console.log('========== COPY SQL BELOW THIS LINE ==========\n');

const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_create_audit_requests.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

console.log(migrationSQL);

console.log('\n========== END OF SQL ==========\n');
console.log('✅ After running this SQL, your Supabase will be ready to store audit requests!');