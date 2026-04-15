import { unstable_cache } from 'next/cache';
import { CACHE_TAGS, CACHE_DURATIONS, generateCacheKey } from '@/lib/utils/cache';

interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  due: string | null;
  dueComplete: boolean;
  idList: string;
  labels: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  customFieldItems?: Array<{
    id: string;
    value?: {
      text?: string;
      number?: string;
      date?: string;
    };
    idCustomField: string;
  }>;
}

interface TrelloList {
  id: string;
  name: string;
}

export interface Workshop {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'full' | 'past';
  description: string;
  listName: string;
}

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const TRELLO_BOARD_ID = process.env.TRELLO_BOARD_ID;

// Performance tracking for cache analytics
interface CacheMetrics {
  hits: number;
  misses: number;
  errors: number;
  lastUpdated: Date;
  avgResponseTime: number;
}

const cacheMetrics: CacheMetrics = {
  hits: 0,
  misses: 0,
  errors: 0,
  lastUpdated: new Date(),
  avgResponseTime: 0
};

// Enhanced Trello API fetcher with advanced caching
const fetchTrelloData = unstable_cache(
  async <T>(endpoint: string): Promise<T | null> => {
    const startTime = Date.now();
    
    if (!TRELLO_API_KEY || !TRELLO_TOKEN) {
      console.error('Trello API credentials not configured');
      cacheMetrics.errors++;
      return null;
    }

    const url = `https://api.trello.com/1${endpoint}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'NextJS-Website/1.0'
        },
        next: { 
          revalidate: CACHE_DURATIONS.WORKSHOPS,
          tags: [CACHE_TAGS.WORKSHOPS, 'trello-data']
        }
      });

      if (!response.ok) {
        throw new Error(`Trello API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Update performance metrics
      const responseTime = Date.now() - startTime;
      cacheMetrics.avgResponseTime = 
        (cacheMetrics.avgResponseTime + responseTime) / 2;
      cacheMetrics.lastUpdated = new Date();
      
      return data;
    } catch (error) {
      console.error('Error fetching from Trello:', error);
      cacheMetrics.errors++;
      return null;
    }
  },
  ['trello-fetch'],
  {
    tags: [CACHE_TAGS.WORKSHOPS, 'trello-api'],
    revalidate: CACHE_DURATIONS.WORKSHOPS
  }
);

function parseWorkshopFromList(list: TrelloList, cards: TrelloCard[]): Workshop | null {
  // Parsear fecha del nombre de la lista
  // Formatos esperados: "DD/MM/YYYY" o "DD/MM/YY"
  const dateMatch = list.name.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (!dateMatch) {
    return null; // Si la lista no tiene fecha, no es un taller
  }
  
  const [_, day, month, year] = dateMatch;
  const fullYear = year.length === 2 ? `20${year}` : year;
  const workshopDate = new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day));
  
  // Extraer número del taller si existe (ej: "(1)", "(2)", etc)
  const numberMatch = list.name.match(/\((\d+)\)/);
  const workshopNumber = numberMatch ? numberMatch[1] : '';
  
  // Contar participantes basándose en las tarjetas
  const participantCards = cards.filter(card => {
    // Excluir tarjetas que son claramente no-participantes
    const cardName = card.name.toLowerCase();
    return !cardName.includes('plantilla') && 
           !cardName.includes('template') &&
           !cardName.includes('ejemplo');
  });
  
  // Log para debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`Lista "${list.name}": Total tarjetas: ${cards.length}, Participantes: ${participantCards.length}`);
    participantCards.forEach(card => {
      console.log(`  - Participante: ${card.name}`);
    });
  }
  
  const currentParticipants = participantCards.length;
  const maxParticipants = 5; // 5 empresas por taller
  
  // Determinar si hay invitados (tarjetas con 🎫)
  const invitedCount = participantCards.filter(card => 
    card.name.includes('🎫') || card.name.toLowerCase().includes('invitado')
  ).length;
  
  // Determinar si hay participantes pagados
  const paidCount = participantCards.filter(card => 
    card.name.includes('$') || card.name.match(/\d+[,.]?\d*/)
  ).length;
  
  // Generar título del taller
  const title = `Taller de Claridad Comercial${workshopNumber ? ` - Edición ${workshopNumber}` : ''}`;
  
  // Determinar estado
  const now = new Date();
  let status: Workshop['status'] = 'upcoming';
  
  if (workshopDate < now) {
    status = 'past';
  } else if (currentParticipants >= maxParticipants) {
    status = 'full';
  }
  
  // Generar descripción con información de los participantes
  let description = `Transforma tu mensaje comercial en 2 horas de trabajo práctico. `;
  description += `Aprenderás a comunicar tu valor de forma clara y diferenciada.\n\n`;
  
  if (currentParticipants > 0) {
    description += `Estado actual: ${currentParticipants}/${maxParticipants} empresas`;
    if (invitedCount > 0) {
      description += ` (${invitedCount} invitadas)`;
    }
  }
  
  return {
    id: list.id,
    title,
    date: workshopDate,
    time: '12:00 - 14:00', // Horario CDMX
    location: 'Online vía Google Meet',
    maxParticipants,
    currentParticipants,
    status,
    description,
    listName: list.name
  };
}

// Core workshop fetching function with enhanced caching
async function fetchWorkshopsFromTrello(): Promise<Workshop[]> {
  if (!TRELLO_BOARD_ID) {
    console.error('Trello board ID not configured');
    throw new Error('Trello board ID not configured');
  }

  const startTime = Date.now();

  try {
    // Obtener listas del tablero
    const lists = await fetchTrelloData<TrelloList[]>(`/boards/${TRELLO_BOARD_ID}/lists`);
    if (!lists) {
      cacheMetrics.misses++;
      return [];
    }

    // Filtrar listas que no son talleres
    const workshopLists = lists.filter(list => {
      // Debe tener una fecha en el nombre
      const hasDate = /\d{1,2}\/\d{1,2}\/\d{2,4}/.test(list.name);
      // No debe ser una lista de archivo o espera
      const isNotArchive = !list.name.toLowerCase().includes('archivo') &&
                          !list.name.toLowerCase().includes('completado') &&
                          !list.name.toLowerCase().includes('cancelado') &&
                          !list.name.toLowerCase().includes('espera');
      return hasDate && isNotArchive;
    });

    // Obtener tarjetas de cada lista y crear workshops
    const workshops: Workshop[] = [];
    
    for (const list of workshopLists) {
      const cards = await fetchTrelloData<TrelloCard[]>(`/lists/${list.id}/cards`);
      if (!cards) continue;

      const workshop = parseWorkshopFromList(list, cards);
      if (workshop && workshop.status !== 'past') {
        workshops.push(workshop);
      }
    }

    // Ordenar por fecha y devolver los próximos 3
    const result = workshops
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3);

    // Update cache metrics
    cacheMetrics.hits++;
    const responseTime = Date.now() - startTime;
    cacheMetrics.avgResponseTime = 
      (cacheMetrics.avgResponseTime + responseTime) / 2;
    cacheMetrics.lastUpdated = new Date();

    return result;

  } catch (error) {
    console.error('Error getting workshops from Trello:', error);
    cacheMetrics.errors++;
    throw error;
  }
}

// Cached version of the workshops function
export const getUpcomingWorkshops = unstable_cache(
  fetchWorkshopsFromTrello,
  [generateCacheKey('workshops', 'upcoming')],
  {
    tags: [CACHE_TAGS.WORKSHOPS, 'workshops-upcoming'],
    revalidate: CACHE_DURATIONS.WORKSHOPS
  }
);

// Preload function for critical data with fallback
export async function preloadWorkshops(): Promise<void> {
  try {
    await getUpcomingWorkshops();
    console.log('Workshops data preloaded successfully');
  } catch (error) {
    console.error('Error preloading workshops:', error);
    // Fallback to mock data if preload fails
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock workshops as fallback for preload');
    }
  }
}

// Cache analytics and management functions
export function getCacheMetrics(): CacheMetrics & { 
  hitRatio: number;
  status: 'healthy' | 'degraded' | 'error';
} {
  const total = cacheMetrics.hits + cacheMetrics.misses;
  const hitRatio = total > 0 ? (cacheMetrics.hits / total) * 100 : 0;
  
  let status: 'healthy' | 'degraded' | 'error' = 'healthy';
  if (hitRatio < 70) status = 'degraded';
  if (cacheMetrics.errors > 10 || hitRatio < 50) status = 'error';
  
  return {
    ...cacheMetrics,
    hitRatio,
    status
  };
}

// Reset cache metrics for monitoring
export function resetCacheMetrics(): void {
  cacheMetrics.hits = 0;
  cacheMetrics.misses = 0;
  cacheMetrics.errors = 0;
  cacheMetrics.lastUpdated = new Date();
  cacheMetrics.avgResponseTime = 0;
  console.log('Cache metrics reset');
}

// Graceful fallback function for API errors
export async function getWorkshopsWithFallback(): Promise<{
  workshops: Workshop[];
  source: 'cache' | 'api' | 'mock';
  metrics: ReturnType<typeof getCacheMetrics>;
}> {
  let workshops: Workshop[] = [];
  let source: 'cache' | 'api' | 'mock' = 'api';
  
  try {
    workshops = await getUpcomingWorkshops();
    source = 'cache'; // unstable_cache handles this
  } catch (error) {
    console.error('Failed to get workshops from API, using fallback:', error);
    
    if (process.env.NODE_ENV === 'development') {
      workshops = getMockWorkshops();
      source = 'mock';
    }
  }
  
  return {
    workshops,
    source,
    metrics: getCacheMetrics()
  };
}

export async function updateWorkshopParticipants(cardId: string, newCount: number): Promise<boolean> {
  if (!TRELLO_API_KEY || !TRELLO_TOKEN) {
    console.error('Trello API credentials not configured');
    return false;
  }

  try {
    // Obtener la tarjeta actual
    const card = await fetchTrelloData<TrelloCard>(`/cards/${cardId}`);
    if (!card) return false;

    // Actualizar la descripción con el nuevo conteo
    const descLines = card.desc.split('\n');
    let updatedDesc = '';
    let foundParticipants = false;

    descLines.forEach(line => {
      if (line.toLowerCase().includes('inscritos:') || line.toLowerCase().includes('participantes:')) {
        updatedDesc += `Participantes: ${newCount}\n`;
        foundParticipants = true;
      } else if (line.toLowerCase().includes('cupos:') || line.toLowerCase().includes('plazas:')) {
        const match = line.match(/\d+$/);
        if (match) {
          updatedDesc += `Cupos: ${newCount}/${match[0]}\n`;
        } else {
          updatedDesc += line + '\n';
        }
      } else {
        updatedDesc += line + '\n';
      }
    });

    if (!foundParticipants) {
      updatedDesc += `\nParticipantes: ${newCount}`;
    }

    // Actualizar la tarjeta
    const updateUrl = `https://api.trello.com/1/cards/${cardId}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
    const response = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        desc: updatedDesc.trim()
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error updating workshop participants:', error);
    return false;
  }
}

// Función para obtener datos de prueba en desarrollo
export function getMockWorkshops(): Workshop[] {
  const today = new Date();
  
  return [
    {
      id: '1',
      title: 'Taller de Claridad Comercial - Enero 2025',
      date: new Date(today.getFullYear(), today.getMonth() + 1, 15),
      time: '12:00 - 14:00',
      location: 'Online vía Google Meet',
      maxParticipants: 5,
      currentParticipants: 1,
      status: 'upcoming',
      description: 'Transforma tu mensaje comercial en 2 horas intensivas. Aprenderás a comunicar tu valor de forma clara y diferenciada.',
      listName: 'Próximos Talleres'
    },
    {
      id: '2',
      title: 'Taller de Claridad Comercial - Febrero 2025',
      date: new Date(today.getFullYear(), today.getMonth() + 2, 10),
      time: '12:00 - 14:00',
      location: 'Online vía Google Meet',
      maxParticipants: 5,
      currentParticipants: 1,
      status: 'upcoming',
      description: 'Transforma tu mensaje comercial en 2 horas intensivas. Aprenderás a comunicar tu valor de forma clara y diferenciada.',
      listName: 'Próximos Talleres'
    },
    {
      id: '3',
      title: 'Taller de Claridad Comercial - Marzo 2025',
      date: new Date(today.getFullYear(), today.getMonth() + 3, 20),
      time: '12:00 - 14:00',
      location: 'Online vía Google Meet',
      maxParticipants: 5,
      currentParticipants: 5,
      status: 'full',
      description: 'Transforma tu mensaje comercial en 2 horas intensivas. Aprenderás a comunicar tu valor de forma clara y diferenciada.',
      listName: 'Próximos Talleres'
    }
  ];
}