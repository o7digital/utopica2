#!/usr/bin/env node

/**
 * Script de verificación del sistema de blog con rutas dinámicas
 * Valida que todas las funciones de generateStaticParams funcionen correctamente
 */

const path = require('path');

// Simular entorno Next.js para testing
process.env.NODE_ENV = 'development';
process.env.NEXT_PUBLIC_SITE_URL = 'https://utopica.io';

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log(`\n${colors.bold}${colors.blue}=== ${title} ===${colors.reset}`);
}

async function verifyBlogSystem() {
  logSection('🔍 Verificando Sistema de Blog con Rutas Dinámicas');
  
  let errors = [];
  let warnings = [];
  let success = [];

  try {
    // Importar el sistema de blog
    const blogSystem = await import('../lib/blog/index.js');
    
    // 1. Verificar exports principales
    logSection('📦 Verificando Exports del Sistema');
    
    const requiredExports = [
      'getBlogArticles',
      'getBlogArticleBySlug', 
      'getBlogCategories',
      'getBlogArticleSlugs',
      'getBlogCategorySlugs',
      'generateBlogArticleMetadata',
      'generateBlogCategoryMetadata',
      'BLOG_CONFIG',
      'blogUtils'
    ];
    
    for (const exportName of requiredExports) {
      if (blogSystem[exportName]) {
        success.push(`✅ ${exportName} exportado correctamente`);
      } else {
        errors.push(`❌ ${exportName} no encontrado en exports`);
      }
    }
    
    // 2. Verificar data layer
    logSection('🗄️ Verificando Data Layer');
    
    try {
      const articles = await blogSystem.getBlogArticles();
      if (Array.isArray(articles) && articles.length > 0) {
        success.push(`✅ getBlogArticles() retorna ${articles.length} artículos`);
        
        // Verificar estructura de artículos
        const firstArticle = articles[0];
        const requiredFields = ['slug', 'title', 'excerpt', 'content', 'date', 'author', 'categories'];
        
        for (const field of requiredFields) {
          if (firstArticle[field]) {
            success.push(`✅ Artículo tiene campo: ${field}`);
          } else {
            errors.push(`❌ Artículo falta campo: ${field}`);
          }
        }
      } else {
        errors.push('❌ getBlogArticles() no retorna array válido');
      }
    } catch (error) {
      errors.push(`❌ Error en getBlogArticles(): ${error.message}`);
    }
    
    try {
      const categories = await blogSystem.getBlogCategories();
      if (Array.isArray(categories) && categories.length > 0) {
        success.push(`✅ getBlogCategories() retorna ${categories.length} categorías`);
      } else {
        errors.push('❌ getBlogCategories() no retorna array válido');
      }
    } catch (error) {
      errors.push(`❌ Error en getBlogCategories(): ${error.message}`);
    }
    
    // 3. Verificar generateStaticParams
    logSection('⚡ Verificando generateStaticParams');
    
    try {
      const articleSlugs = await blogSystem.getBlogArticleSlugs();
      if (Array.isArray(articleSlugs) && articleSlugs.length > 0) {
        success.push(`✅ getBlogArticleSlugs() retorna ${articleSlugs.length} slugs`);
        log(colors.blue, `   Slugs: ${articleSlugs.slice(0, 3).join(', ')}${articleSlugs.length > 3 ? '...' : ''}`);
      } else {
        errors.push('❌ getBlogArticleSlugs() no retorna array válido');
      }
    } catch (error) {
      errors.push(`❌ Error en getBlogArticleSlugs(): ${error.message}`);
    }
    
    try {
      const categorySlugs = await blogSystem.getBlogCategorySlugs();
      if (Array.isArray(categorySlugs) && categorySlugs.length > 0) {
        success.push(`✅ getBlogCategorySlugs() retorna ${categorySlugs.length} categorías`);
        log(colors.blue, `   Categorías: ${categorySlugs.join(', ')}`);
      } else {
        errors.push('❌ getBlogCategorySlugs() no retorna array válido');
      }
    } catch (error) {
      errors.push(`❌ Error en getBlogCategorySlugs(): ${error.message}`);
    }
    
    // 4. Verificar cache system
    logSection('🚀 Verificando Sistema de Cache');
    
    try {
      const articleSlugs = await blogSystem.getBlogArticleSlugs();
      if (articleSlugs.length > 0) {
        const metadata = await blogSystem.generateBlogArticleMetadata(articleSlugs[0]);
        if (metadata && metadata.title) {
          success.push(`✅ generateBlogArticleMetadata() funciona`);
          log(colors.blue, `   Título generado: ${metadata.title}`);
        } else {
          errors.push('❌ generateBlogArticleMetadata() no retorna metadata válida');
        }
      }
    } catch (error) {
      errors.push(`❌ Error en generateBlogArticleMetadata(): ${error.message}`);
    }
    
    try {
      const categorySlugs = await blogSystem.getBlogCategorySlugs();
      if (categorySlugs.length > 0) {
        const metadata = await blogSystem.generateBlogCategoryMetadata(categorySlugs[0]);
        if (metadata && metadata.title) {
          success.push(`✅ generateBlogCategoryMetadata() funciona`);
          log(colors.blue, `   Título generado: ${metadata.title}`);
        } else {
          errors.push('❌ generateBlogCategoryMetadata() no retorna metadata válida');
        }
      }
    } catch (error) {
      errors.push(`❌ Error en generateBlogCategoryMetadata(): ${error.message}`);
    }
    
    // 5. Verificar utilidades
    logSection('🛠️ Verificando Utilidades');
    
    try {
      const articleUrl = blogSystem.blogUtils.getArticleUrl('test-slug');
      if (articleUrl.includes('/_blog/test-slug')) {
        success.push(`✅ blogUtils.getArticleUrl() funciona`);
      } else {
        errors.push('❌ blogUtils.getArticleUrl() genera URL incorrecta');
      }
    } catch (error) {
      errors.push(`❌ Error en blogUtils.getArticleUrl(): ${error.message}`);
    }
    
    try {
      const readingTime = blogSystem.blogUtils.calculateReadingTime('Este es un texto de prueba con varias palabras para calcular el tiempo de lectura estimado.');
      if (readingTime.includes('min')) {
        success.push(`✅ blogUtils.calculateReadingTime() funciona`);
      } else {
        errors.push('❌ blogUtils.calculateReadingTime() no retorna formato correcto');
      }
    } catch (error) {
      errors.push(`❌ Error en blogUtils.calculateReadingTime(): ${error.message}`);
    }
    
    // 6. Verificar archivos de rutas dinámicas
    logSection('📁 Verificando Archivos de Rutas');
    
    const fs = require('fs');
    const routeFiles = [
      'app/_blog/[slug]/page.server.tsx',
      'app/_blog/categoria/[categoria]/page.server.tsx'
    ];
    
    for (const file of routeFiles) {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes('generateStaticParams')) {
          success.push(`✅ ${file} tiene generateStaticParams`);
        } else {
          errors.push(`❌ ${file} falta generateStaticParams`);
        }
        
        if (content.includes('export const dynamic = \'force-static\'')) {
          success.push(`✅ ${file} configurado como force-static`);
        } else {
          warnings.push(`⚠️ ${file} podría beneficiarse de force-static`);
        }
        
        if (content.includes('export const revalidate')) {
          success.push(`✅ ${file} tiene configuración de revalidate`);
        } else {
          warnings.push(`⚠️ ${file} podría beneficiarse de revalidate config`);
        }
      } else {
        errors.push(`❌ Archivo no encontrado: ${file}`);
      }
    }
    
  } catch (error) {
    errors.push(`❌ Error general del sistema: ${error.message}`);
  }
  
  // Resumen final
  logSection('📊 Resumen de Verificación');
  
  if (success.length > 0) {
    log(colors.green, `\n✅ ÉXITOS (${success.length}):`);
    success.forEach(msg => log(colors.green, `  ${msg}`));
  }
  
  if (warnings.length > 0) {
    log(colors.yellow, `\n⚠️ ADVERTENCIAS (${warnings.length}):`);
    warnings.forEach(msg => log(colors.yellow, `  ${msg}`));
  }
  
  if (errors.length > 0) {
    log(colors.red, `\n❌ ERRORES (${errors.length}):`);
    errors.forEach(msg => log(colors.red, `  ${msg}`));
  }
  
  const total = success.length + warnings.length + errors.length;
  const successRate = ((success.length + warnings.length) / total) * 100;
  
  log(colors.bold, `\n📈 TASA DE ÉXITO: ${successRate.toFixed(1)}%`);
  
  if (errors.length === 0) {
    log(colors.green, '\n🎉 ¡Sistema de blog verificado exitosamente!');
    log(colors.blue, '   Todas las rutas dinámicas están listas para optimización en build time.');
    return true;
  } else {
    log(colors.red, '\n❌ Se encontraron errores que deben corregirse.');
    return false;
  }
}

// Ejecutar verificación
if (require.main === module) {
  verifyBlogSystem()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      log(colors.red, `\n💥 Error fatal: ${error.message}`);
      console.error(error);
      process.exit(1);
    });
}

module.exports = verifyBlogSystem;