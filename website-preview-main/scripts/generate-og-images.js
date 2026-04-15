const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuración
const width = 1200;
const height = 630;

// Asegurarse de que el directorio existe
const ogDir = path.join(__dirname, '../public/images/og');
if (!fs.existsSync(ogDir)) {
  fs.mkdirSync(ogDir, { recursive: true });
}

// Función para generar una imagen OG
async function generateOgImage(options) {
  const { title, description, filename, siteName = 'utopica.io' } = options;
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fondo
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // Gradiente
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f0f4f8');
  gradient.addColorStop(1, '#ffffff');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Título
  ctx.font = 'bold 60px Arial';
  ctx.fillStyle = '#1a202c';
  ctx.textAlign = 'center';
  
  // Dividir el título en líneas
  const titleLines = getLines(ctx, title, width - 200);
  let y = height / 2 - (titleLines.length * 70) / 2;
  
  titleLines.forEach(line => {
    ctx.fillText(line, width / 2, y);
    y += 70;
  });
  
  // Descripción
  ctx.font = '30px Arial';
  ctx.fillStyle = '#4a5568';
  
  // Dividir la descripción en líneas
  const descLines = getLines(ctx, description, width - 300);
  y += 40;
  
  descLines.forEach(line => {
    ctx.fillText(line, width / 2, y);
    y += 40;
  });
  
  // Sitio web
  ctx.font = '24px Arial';
  ctx.fillStyle = '#718096';
  ctx.fillText(siteName, width / 2, height - 50);
  
  // Guardar la imagen
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(ogDir, filename);
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`Imagen OG generada: ${outputPath}`);
  return outputPath;
}

// Función auxiliar para dividir texto en líneas
function getLines(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

// Generar imágenes para las páginas principales
async function generateAllOgImages() {
  const pages = [
    {
      title: 'Utópica | Libertad Comercial para Fundadores B2B',
      description: 'Alcanza la libertad comercial con sistemas de venta que funcionan sin depender de ti.',
      filename: 'default.png'
    },
    {
      title: 'Sprint de Claridad Comercial',
      description: 'Transforma tu mensaje confuso en un imán de leads premium en solo 4 semanas.',
      filename: 'sprint-claridad.png'
    },
    {
      title: 'Auditoría Express de Claridad Comercial',
      description: 'Descubre qué tan CLARO, RELEVANTE y ÚNICO es tu mensaje comercial en 5 minutos.',
      filename: 'auditoria.png'
    },
    {
      title: 'Nuestro Equipo',
      description: 'Conoce al equipo de expertos que te ayudarán a alcanzar tu libertad comercial.',
      filename: 'equipo.png'
    },
    {
      title: 'Demo | Sistema de Información de Eventos',
      description: 'Descubre cómo revolucionar la experiencia de tus asistentes con tecnología inteligente.',
      filename: 'demo.png'
    }
  ];

  for (const page of pages) {
    await generateOgImage(page);
  }
  
  console.log('Todas las imágenes OG han sido generadas correctamente.');
}

// Ejecutar el script
generateAllOgImages().catch(console.error);
