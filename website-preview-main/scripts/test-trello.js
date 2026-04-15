// Script para probar la conexión con Trello y ver la estructura de datos
require('dotenv').config({ path: '.env.local' });

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const TRELLO_BOARD_ID = process.env.TRELLO_BOARD_ID;

async function testTrello() {
  if (!TRELLO_API_KEY || !TRELLO_TOKEN || !TRELLO_BOARD_ID) {
    console.error('❌ Faltan credenciales de Trello');
    return;
  }

  console.log('🔍 Probando conexión con Trello...\n');
  
  try {
    // 1. Obtener información del tablero
    const boardUrl = `https://api.trello.com/1/boards/${TRELLO_BOARD_ID}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
    const boardResponse = await fetch(boardUrl);
    const board = await boardResponse.json();
    
    console.log('📋 Tablero:', board.name);
    console.log('🔗 URL:', board.url);
    console.log('\n');

    // 2. Obtener listas del tablero
    const listsUrl = `https://api.trello.com/1/boards/${TRELLO_BOARD_ID}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
    const listsResponse = await fetch(listsUrl);
    const lists = await listsResponse.json();
    
    console.log('📑 Listas encontradas:');
    lists.forEach(list => {
      console.log(`  - ${list.name} (ID: ${list.id})`);
    });
    console.log('\n');

    // 3. Obtener tarjetas de cada lista
    for (const list of lists) {
      console.log(`\n📌 Tarjetas en "${list.name}":`);
      
      const cardsUrl = `https://api.trello.com/1/lists/${list.id}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
      const cardsResponse = await fetch(cardsUrl);
      const cards = await cardsResponse.json();
      
      if (cards.length === 0) {
        console.log('  (sin tarjetas)');
        continue;
      }
      
      for (const card of cards) {
        console.log(`\n  🎯 ${card.name}`);
        console.log(`     ID: ${card.id}`);
        if (card.desc) {
          console.log(`     Descripción: ${card.desc.substring(0, 100)}...`);
        }
        if (card.due) {
          console.log(`     Fecha de vencimiento: ${new Date(card.due).toLocaleDateString('es-ES')}`);
        }
        if (card.labels && card.labels.length > 0) {
          console.log(`     Etiquetas: ${card.labels.map(l => l.name || l.color).join(', ')}`);
        }
        
        // Obtener campos personalizados si existen
        const customFieldsUrl = `https://api.trello.com/1/cards/${card.id}/customFieldItems?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
        const customFieldsResponse = await fetch(customFieldsUrl);
        const customFields = await customFieldsResponse.json();
        
        if (customFields.length > 0) {
          console.log('     Campos personalizados:', JSON.stringify(customFields, null, 2));
        }
      }
    }

    // 4. Obtener campos personalizados del tablero
    console.log('\n\n📊 Campos personalizados del tablero:');
    const customFieldDefsUrl = `https://api.trello.com/1/boards/${TRELLO_BOARD_ID}/customFields?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
    const customFieldDefsResponse = await fetch(customFieldDefsUrl);
    const customFieldDefs = await customFieldDefsResponse.json();
    
    customFieldDefs.forEach(field => {
      console.log(`  - ${field.name} (Tipo: ${field.type}, ID: ${field.id})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testTrello();