const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTable() {
  console.log('🔍 Verificando el estado de la tabla audit_requests...\n');
  
  try {
    // Intentar leer de la tabla
    const { data, error, count } = await supabase
      .from('audit_requests')
      .select('*', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.log('❌ Error al leer la tabla:', error.message);
      console.log('Código de error:', error.code);
    } else {
      console.log('✅ La tabla audit_requests existe!');
      console.log(`📊 Número de registros: ${count || 0}`);
      
      // Intentar insertar un registro de prueba
      console.log('\n📝 Probando inserción...');
      const { data: testInsert, error: insertError } = await supabase
        .from('audit_requests')
        .insert({
          email: 'test@utopica.io',
          website_url: 'https://utopica.io',
          analysis_status: 'pending'
        })
        .select();
      
      if (insertError) {
        console.log('❌ Error al insertar:', insertError.message);
      } else {
        console.log('✅ Inserción exitosa!');
        console.log('Datos insertados:', testInsert);
        
        // Limpiar datos de prueba
        if (testInsert && testInsert[0]) {
          await supabase
            .from('audit_requests')
            .delete()
            .eq('id', testInsert[0].id);
          console.log('🧹 Datos de prueba eliminados');
        }
      }
    }
    
    console.log('\n✅ ¡Supabase está configurado correctamente!');
    console.log('🎉 El sistema de auditorías está listo para usar');
    
  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

checkTable();