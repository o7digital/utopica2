import FirecrawlApp from '@mendable/firecrawl-js';

const firecrawlApiKey = process.env.FIRECRAWL_API_KEY || '';

interface FirecrawlContent {
  title: string;
  description: string;
  markdown: string;
  html?: string;
  links?: string[];
}

export async function extractWebsiteWithFirecrawl(url: string): Promise<FirecrawlContent | null> {
  if (!firecrawlApiKey) {
    console.warn('Firecrawl API key not configured');
    return null;
  }

  try {
    const app = new FirecrawlApp({ apiKey: firecrawlApiKey });
    
    console.log('Scraping website with Firecrawl:', url);
    console.log('Using API key:', firecrawlApiKey.substring(0, 10) + '...');
    
    // Scrape a single page with minimal options for v1 API
    const scrapedData = await app.scrapeUrl(url);

    console.log('Firecrawl response:', scrapedData);

    if (scrapedData.success) {
      return {
        title: scrapedData.metadata?.title || '',
        description: scrapedData.metadata?.description || '',
        markdown: scrapedData.markdown || '',
        html: scrapedData.html,
        links: scrapedData.links
      };
    }

    console.log('Firecrawl scrape was not successful');
    return null;
  } catch (error) {
    console.error('Firecrawl error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return null;
  }
}

export async function crawlWebsiteWithFirecrawl(url: string, maxPages: number = 5): Promise<FirecrawlContent[]> {
  if (!firecrawlApiKey) {
    console.warn('Firecrawl API key not configured');
    return [];
  }

  try {
    // Por ahora, solo retornamos un array vacío ya que el crawl tiene problemas con la API actual
    // El scraping individual funciona bien, así que usaremos solo eso
    console.log('Crawl functionality temporarily disabled due to API changes');
    return [];
  } catch (error) {
    console.error('Firecrawl crawl error:', error);
    return [];
  }
}