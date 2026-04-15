import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

async function fetchPageContent(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      }
    });

    if (!response.ok) {
      return { error: `HTTP error! status: ${response.status}` };
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Remover scripts y estilos
    $('script').remove();
    $('style').remove();
    
    // Extraer información
    const title = $('title').text().trim();
    const h1 = $('h1').first().text().trim();
    const metaDescription = $('meta[name="description"]').attr('content');
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 500);
    
    // Obtener una muestra del HTML raw
    const htmlSample = html.substring(0, 1000);
    
    // Contar elementos
    const headingsCount = $('h1, h2, h3').length;
    const paragraphsCount = $('p').length;
    const linksCount = $('a').length;
    
    // Buscar indicadores de SPA
    const hasReactRoot = $('#root, #__next, .app').length > 0;
    const scriptTags = $('script[src]').map((_, el) => $(el).attr('src')).get();
    const hasNextData = $('script#__NEXT_DATA__').length > 0;
    
    return {
      success: true,
      url,
      title,
      h1,
      metaDescription,
      bodyTextSample: bodyText,
      htmlSample,
      stats: {
        headingsCount,
        paragraphsCount,
        linksCount,
        htmlLength: html.length,
        isSPA: hasReactRoot || hasNextData,
        hasReactRoot,
        hasNextData,
        scriptCount: scriptTags.length
      }
    };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Unknown error',
      url 
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }
    
    const result = await fetchPageContent(url);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Debug extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to debug extraction' },
      { status: 500 }
    );
  }
}