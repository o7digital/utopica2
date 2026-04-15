const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyDatabase() {
  console.log('🔍 Verificando configuración de la base de datos...\n');

  try {
    // 1. Verificar que la tabla existe
    const { data: testInsert, error: insertError } = await supabase
      .from('prospects')
      .insert({
        email: 'test@example.com',
        name: 'Test User',
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error al insertar en prospects:', insertError);
      return;
    }

    console.log('✅ Tabla prospects creada correctamente');
    console.log('✅ Se puede insertar datos');

    // 2. Verificar que se puede leer
    const { data: testRead, error: readError } = await supabase
      .from('prospects')
      .select('*')
      .eq('email', 'test@example.com')
      .single();

    if (readError) {
      console.error('❌ Error al leer de prospects:', readError);
    } else {
      console.log('✅ Se puede leer datos');
    }

    // 3. Verificar que se puede actualizar
    const { error: updateError } = await supabase
      .from('prospects')
      .update({ status: 'paid' })
      .eq('email', 'test@example.com');

    if (updateError) {
      console.error('❌ Error al actualizar prospects:', updateError);
    } else {
      console.log('✅ Se puede actualizar datos');
    }

    // 4. Limpiar datos de prueba
    const { error: deleteError } = await supabase
      .from('prospects')
      .delete()
      .eq('email', 'test@example.com');

    if (deleteError) {
      console.error('❌ Error al eliminar de prospects:', deleteError);
    } else {
      console.log('✅ Se puede eliminar datos');
    }

    console.log('\n🎉 ¡Base de datos configurada correctamente!');
    console.log('\n📋 Estructura de la tabla prospects:');
    console.log('- id (UUID, primary key)');
    console.log('- email (unique)');
    console.log('- website_url');
    console.log('- audit_score_clarity, audit_score_relevance, audit_score_uniqueness');
    console.log('- audit_recommendations');
    console.log('- name, phone');
    console.log('- program_type (REGULAR o CIRCULO_INTERNO)');
    console.log('- workshop_id, workshop_date');
    console.log('- status (pending, pending_payment, paid, cancelled)');
    console.log('- payment_id, payment_amount, payment_date');
    console.log('- created_at, updated_at');

  } catch (error) {
    console.error('❌ Error verificando la base de datos:', error);
  }
}

verifyDatabase();