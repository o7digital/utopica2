#!/usr/bin/env node

/**
 * Cache Warming Script
 * 
 * A comprehensive script for cache warming operations.
 * Supports multiple warming strategies and can be used for:
 * - Manual warming operations
 * - CI/CD post-deployment warming
 * - Scheduled warming via cron
 * - Emergency cache warming
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  API_TOKEN: process.env.CACHE_WARMING_TOKEN,
  WEBHOOK_SECRET: process.env.CACHE_WARMING_WEBHOOK_SECRET,
  TIMEOUT: 30000, // 30 seconds
  RETRIES: 3,
  RETRY_DELAY: 2000, // 2 seconds
  VERBOSE: process.env.VERBOSE === 'true' || process.argv.includes('--verbose'),
  DRY_RUN: process.argv.includes('--dry-run')
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Logger utility
 */
class Logger {
  static info(message, data = null) {
    console.log(`${colors.blue}ℹ${colors.reset} ${message}`);
    if (data && CONFIG.VERBOSE) {
      console.log('  ', JSON.stringify(data, null, 2));
    }
  }

  static success(message, data = null) {
    console.log(`${colors.green}✅${colors.reset} ${message}`);
    if (data && CONFIG.VERBOSE) {
      console.log('  ', JSON.stringify(data, null, 2));
    }
  }

  static warning(message, data = null) {
    console.log(`${colors.yellow}⚠️${colors.reset} ${message}`);
    if (data && CONFIG.VERBOSE) {
      console.log('  ', JSON.stringify(data, null, 2));
    }
  }

  static error(message, error = null) {
    console.error(`${colors.red}❌${colors.reset} ${message}`);
    if (error && CONFIG.VERBOSE) {
      console.error('  ', error);
    }
  }

  static debug(message, data = null) {
    if (CONFIG.VERBOSE) {
      console.log(`${colors.cyan}🔍${colors.reset} ${message}`);
      if (data) {
        console.log('  ', JSON.stringify(data, null, 2));
      }
    }
  }
}

/**
 * HTTP client utility
 */
class HttpClient {
  static async request(options, data = null) {
    return new Promise((resolve, reject) => {
      const url = new URL(options.url || options.path, CONFIG.BASE_URL);
      const isHttps = url.protocol === 'https:';
      const client = isHttps ? https : http;

      const requestOptions = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'Cache-Warmer-Script/1.0',
          'Content-Type': 'application/json',
          ...options.headers
        },
        timeout: CONFIG.TIMEOUT
      };

      if (CONFIG.API_TOKEN) {
        requestOptions.headers.Authorization = `Bearer ${CONFIG.API_TOKEN}`;
      }

      const req = client.request(requestOptions, (res) => {
        let responseData = '';
        
        res.on('data', chunk => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const parsed = responseData ? JSON.parse(responseData) : null;
            resolve({
              status: res.statusCode,
              headers: res.headers,
              data: parsed
            });
          } catch (error) {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              data: responseData
            });
          }
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.abort();
        reject(new Error('Request timeout'));
      });

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  static async get(path, headers = {}) {
    return this.request({ path, method: 'GET', headers });
  }

  static async post(path, data, headers = {}) {
    return this.request({ path, method: 'POST', headers }, data);
  }
}

/**
 * Cache warming operations
 */
class CacheWarmer {
  constructor() {
    this.stats = {
      operations: 0,
      successful: 0,
      failed: 0,
      startTime: Date.now()
    };
  }

  async executeWithRetry(operation, retries = CONFIG.RETRIES) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        Logger.debug(`Attempt ${attempt}/${retries} failed`, error.message);
        
        if (attempt === retries) {
          throw error;
        }
        
        await this.delay(CONFIG.RETRY_DELAY * attempt);
      }
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async warmCritical() {
    Logger.info('🔥 Starting critical cache warming...');
    
    if (CONFIG.DRY_RUN) {
      Logger.warning('DRY RUN: Would execute critical warming');
      return { success: true, dryRun: true };
    }

    try {
      this.stats.operations++;
      const response = await this.executeWithRetry(async () => {
        return await HttpClient.post('/api/cache-warming', {
          action: 'critical'
        });
      });

      if (response.status === 200 && response.data?.success) {
        this.stats.successful++;
        Logger.success('Critical caches warmed successfully');
        Logger.debug('Warming result', response.data.result);
        return response.data;
      } else {
        throw new Error(`API returned ${response.status}: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.stats.failed++;
      Logger.error('Critical warming failed', error);
      throw error;
    }
  }

  async warmSmart() {
    Logger.info('🧠 Starting smart cache warming...');
    
    if (CONFIG.DRY_RUN) {
      Logger.warning('DRY RUN: Would execute smart warming');
      return { success: true, dryRun: true };
    }

    try {
      this.stats.operations++;
      const response = await this.executeWithRetry(async () => {
        return await HttpClient.post('/api/cache-warming', {
          action: 'smart'
        });
      });

      if (response.status === 200 && response.data?.success) {
        this.stats.successful++;
        Logger.success('Smart warming completed successfully');
        Logger.debug('Warming result', response.data.result);
        return response.data;
      } else {
        throw new Error(`API returned ${response.status}: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.stats.failed++;
      Logger.error('Smart warming failed', error);
      throw error;
    }
  }

  async warmDeployment() {
    Logger.info('🚀 Starting post-deployment cache warming...');
    
    if (CONFIG.DRY_RUN) {
      Logger.warning('DRY RUN: Would execute deployment warming');
      return { success: true, dryRun: true };
    }

    try {
      this.stats.operations++;
      const response = await this.executeWithRetry(async () => {
        return await HttpClient.post('/api/cache-warming', {
          action: 'deployment'
        });
      });

      if (response.status === 200 && response.data?.success) {
        this.stats.successful++;
        Logger.success('Post-deployment warming completed successfully');
        Logger.debug('Warming result', response.data.result);
        return response.data;
      } else {
        throw new Error(`API returned ${response.status}: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.stats.failed++;
      Logger.error('Deployment warming failed', error);
      throw error;
    }
  }

  async getHealth() {
    Logger.info('🏥 Checking cache warming health...');
    
    try {
      const response = await this.executeWithRetry(async () => {
        return await HttpClient.get('/api/cache-warming?action=health');
      });

      if (response.status === 200) {
        Logger.success('Health check completed');
        Logger.info(`Status: ${response.data.warming?.status || 'unknown'}`);
        Logger.info(`Success Rate: ${response.data.warming?.successRate || 0}%`);
        Logger.info(`Avg Response Time: ${response.data.warming?.averageResponseTime || 0}ms`);
        
        if (response.data.warming?.failedTargets?.length > 0) {
          Logger.warning(`Failed targets: ${response.data.warming.failedTargets.join(', ')}`);
        }
        
        return response.data;
      } else {
        throw new Error(`Health check failed: ${response.status}`);
      }
    } catch (error) {
      Logger.error('Health check failed', error);
      throw error;
    }
  }

  async manageScheduler(action) {
    Logger.info(`📅 ${action}ing cache warming scheduler...`);
    
    if (CONFIG.DRY_RUN) {
      Logger.warning(`DRY RUN: Would ${action} scheduler`);
      return { success: true, dryRun: true };
    }

    try {
      const response = await this.executeWithRetry(async () => {
        return await HttpClient.post('/api/cache-warming', {
          action: 'scheduler',
          schedulerAction: action
        });
      });

      if (response.status === 200 && response.data?.success) {
        Logger.success(`Scheduler ${action}ed successfully`);
        Logger.debug('Scheduler status', response.data.result);
        return response.data;
      } else {
        throw new Error(`API returned ${response.status}: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      Logger.error(`Scheduler ${action} failed`, error);
      throw error;
    }
  }

  printStats() {
    const duration = Date.now() - this.stats.startTime;
    console.log('\n' + '='.repeat(50));
    console.log(`${colors.bright}📊 Cache Warming Statistics${colors.reset}`);
    console.log('='.repeat(50));
    console.log(`Total Operations: ${this.stats.operations}`);
    console.log(`Successful: ${colors.green}${this.stats.successful}${colors.reset}`);
    console.log(`Failed: ${colors.red}${this.stats.failed}${colors.reset}`);
    console.log(`Duration: ${(duration / 1000).toFixed(2)}s`);
    console.log(`Success Rate: ${this.stats.operations > 0 ? ((this.stats.successful / this.stats.operations) * 100).toFixed(1) : 0}%`);
    console.log('='.repeat(50));
  }
}

/**
 * Command line interface
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  Logger.info(`Cache Warming Script - ${new Date().toISOString()}`);
  
  if (!CONFIG.API_TOKEN && !CONFIG.DRY_RUN) {
    Logger.warning('CACHE_WARMING_TOKEN not set - some operations may fail');
  }
  
  const warmer = new CacheWarmer();
  
  try {
    switch (command) {
      case 'critical':
        await warmer.warmCritical();
        break;
        
      case 'smart':
        await warmer.warmSmart();
        break;
        
      case 'deployment':
      case 'deploy':
        await warmer.warmDeployment();
        break;
        
      case 'health':
        await warmer.getHealth();
        break;
        
      case 'start-scheduler':
        await warmer.manageScheduler('start');
        break;
        
      case 'stop-scheduler':
        await warmer.manageScheduler('stop');
        break;
        
      case 'all':
        Logger.info('🔥 Running comprehensive warming sequence...');
        await warmer.warmDeployment();
        await warmer.delay(2000);
        await warmer.warmSmart();
        await warmer.delay(1000);
        await warmer.getHealth();
        break;
        
      case 'help':
      default:
        console.log(`
${colors.bright}Cache Warming Script${colors.reset}

${colors.bright}Usage:${colors.reset}
  node cache-warming.js <command> [options]

${colors.bright}Commands:${colors.reset}
  critical           Warm critical caches only
  smart              Smart warming based on traffic patterns
  deployment         Post-deployment warming sequence
  health             Check warming system health
  start-scheduler    Start the warming scheduler
  stop-scheduler     Stop the warming scheduler
  all                Run comprehensive warming sequence
  help               Show this help

${colors.bright}Options:${colors.reset}
  --verbose          Enable verbose logging
  --dry-run          Show what would be done without executing

${colors.bright}Environment Variables:${colors.reset}
  NEXT_PUBLIC_APP_URL       Base URL for the application
  CACHE_WARMING_TOKEN       API authentication token
  CACHE_WARMING_WEBHOOK_SECRET  Webhook secret for security
  VERBOSE                   Enable verbose logging (true/false)

${colors.bright}Examples:${colors.reset}
  node cache-warming.js critical --verbose
  node cache-warming.js deployment --dry-run
  node cache-warming.js all
        `);
        return;
    }
    
    warmer.printStats();
    
  } catch (error) {
    Logger.error('Operation failed', error);
    warmer.printStats();
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  Logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  Logger.info('Received SIGINT. Gracefully shutting down...');
  process.exit(0);
});

// Run the script
if (require.main === module) {
  main();
}

module.exports = { CacheWarmer, HttpClient, Logger };