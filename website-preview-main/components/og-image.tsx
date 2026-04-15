import React from 'react';
import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';

/**
 * Genera una imagen de Open Graph estática para SEO
 * 
 * Nota: Esta es una versión simplificada que genera imágenes estáticas.
 * Para una implementación completa con generación dinámica, se recomienda
 * usar @vercel/og o una solución similar.
 */
export async function generateStaticOgImage(
  outputPath: string,
  options: {
    title: string;
    description: string;
    siteName?: string;
    logoPath?: string;
  }
) {
  // Configuración
  const width = 1200;
  const height = 630;
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
  const titleLines = getLines(ctx, options.title, width - 200);
  let y = height / 2 - (titleLines.length * 70) / 2;
  
  titleLines.forEach(line => {
    ctx.fillText(line, width / 2, y);
    y += 70;
  });
  
  // Descripción
  ctx.font = '30px Arial';
  ctx.fillStyle = '#4a5568';
  
  // Dividir la descripción en líneas
  const descLines = getLines(ctx, options.description, width - 300);
  y += 40;
  
  descLines.forEach(line => {
    ctx.fillText(line, width / 2, y);
    y += 40;
  });
  
  // Sitio web
  ctx.font = '24px Arial';
  ctx.fillStyle = '#718096';
  ctx.fillText(options.siteName || 'utopica.io', width / 2, height - 50);
  
  // Guardar la imagen
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  
  return outputPath;
}

// Función auxiliar para dividir texto en líneas
function getLines(ctx: any, text: string, maxWidth: number) {
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
