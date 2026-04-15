#!/usr/bin/env node

/**
 * Scheduled Cache Warming Script
 * 
 * This script is designed to run as a cron job or scheduled task to
 * automatically warm caches at optimal times based on traffic patterns.
 * 
 * Cron examples:
 * - Every 4 hours during business hours: 0 9-17/4 * * 1-5
 * - Every 6 hours on weekends: 0 */6 * * 0,6
 * - Every 30 minutes during peak hours: */30 9-17 * * 1-5
 * 
 * Usage:
 *   node scripts/scheduled-warming.js [strategy]
 *   
 * Strategies:
 *   - peak: High-frequency warming for peak hours
 *   - normal: Standard warming schedule
 *   - off-peak: Minimal warming for low-traffic periods
 *   - auto: Automatically determine strategy based on time
 */

const { CacheWarmer, Logger } = require('./cache-warming');

// Warming strategies configuration
const WARMING_STRATEGIES = {
  peak: {
    name: 'Peak Hours',
    description: 'Aggressive warming for high-traffic periods',
    targets: ['critical', 'smart'],
    interval: 1800, // 30 minutes
    maxRetries: 3,
    notification: true
  },
  
  normal: {
    name: 'Normal Hours',
    description: 'Standard warming for regular traffic',
    targets: ['critical'],
    interval: 3600, // 1 hour
    maxRetries: 2,
    notification: false
  },
  
  'off-peak': {
    name: 'Off-Peak Hours',
    description: 'Minimal warming for low-traffic periods',
    targets: ['critical'],
    interval: 7200, // 2 hours
    maxRetries: 1,
    notification: false
  },
  
  maintenance: {
    name: 'Maintenance Window',
    description: 'Comprehensive warming during maintenance windows',
    targets: ['deployment', 'smart'],
    interval: 900, // 15 minutes
    maxRetries: 5,
    notification: true
  }
};

// Traffic pattern detection
const TRAFFIC_PATTERNS = {
  // Business hours: 9 AM - 6 PM weekdays
  peak: {
    hours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    days: [1, 2, 3, 4, 5], // Monday to Friday
    timezone: 'America/Mexico_City' // Adjust for your timezone
  },
  
  // Early morning and evening on weekdays
  normal: {
    hours: [7, 8, 18, 19, 20],
    days: [1, 2, 3, 4, 5],
    timezone: 'America/Mexico_City'
  },
  
  // Night hours and weekends
  'off-peak': {
    hours: [21, 22, 23, 0, 1, 2, 3, 4, 5, 6],
    days: [0, 1, 2, 3, 4, 5, 6], // All days for night hours
    weekendHours: 'all',
    timezone: 'America/Mexico_City'
  }
};

/**
 * Scheduled Cache Warmer with intelligent strategy selection
 */
class ScheduledCacheWarmer extends CacheWarmer {
  constructor() {
    super();
    this.strategy = null;
    this.startTime = Date.now();
    this.metrics = {
      runs: 0,
      successfulRuns: 0,
      errors: [],
      totalDuration: 0,
      averageDuration: 0
    };
  }

  /**
   * Detect current traffic pattern and recommend strategy
   */
  detectTrafficPattern() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    const isWeekend = day === 0 || day === 6;
    
    Logger.info(`Current time: ${now.toISOString()}`);
    Logger.debug('Time analysis', { hour, day, isWeekend });
    
    // Check peak hours (business hours on weekdays)
    if (!isWeekend && TRAFFIC_PATTERNS.peak.hours.includes(hour)) {
      return 'peak';
    }
    
    // Check normal hours (early/late on weekdays)
    if (!isWeekend && TRAFFIC_PATTERNS.normal.hours.includes(hour)) {
      return 'normal';
    }
    
    // Everything else is off-peak
    return 'off-peak';
  }

  /**
   * Get warming strategy based on input or auto-detection
   */
  getWarmingStrategy(strategyInput) {
    if (strategyInput === 'auto') {
      const detected = this.detectTrafficPattern();
      Logger.info(`🤖 Auto-detected traffic pattern: ${detected}`);
      return detected;
    }
    
    if (strategyInput && WARMING_STRATEGIES[strategyInput]) {
      return strategyInput;
    }
    
    // Default to auto-detection
    return this.detectTrafficPattern();
  }

  /**
   * Execute warming based on strategy
   */
  async executeStrategy(strategyName) {
    const strategy = WARMING_STRATEGIES[strategyName];
    
    if (!strategy) {
      throw new Error(`Unknown strategy: ${strategyName}`);
    }
    
    this.strategy = strategy;
    
    Logger.info(`🎯 Executing strategy: ${strategy.name}`);
    Logger.info(`📝 Description: ${strategy.description}`);
    Logger.info(`🎯 Targets: ${strategy.targets.join(', ')}`);
    
    const results = [];
    
    // Execute each target in the strategy
    for (const target of strategy.targets) {
      const targetStart = Date.now();
      
      try {
        Logger.info(`⚡ Executing target: ${target}`);
        
        let result;
        switch (target) {
          case 'critical':
            result = await this.warmCritical();
            break;
          case 'smart':
            result = await this.warmSmart();
            break;
          case 'deployment':
            result = await this.warmDeployment();
            break;
          default:
            throw new Error(`Unknown target: ${target}`);
        }
        
        const duration = Date.now() - targetStart;
        results.push({
          target,
          success: true,
          duration,
          result
        });
        
        Logger.success(`✅ Target ${target} completed in ${duration}ms`);
        
      } catch (error) {
        const duration = Date.now() - targetStart;
        
        results.push({
          target,
          success: false,
          duration,
          error: error.message
        });
        
        Logger.error(`❌ Target ${target} failed after ${duration}ms`, error);
        
        // Continue with other targets even if one fails
        this.metrics.errors.push({
          target,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
      
      // Small delay between targets
      await this.delay(1000);
    }
    
    return results;
  }

  /**
   * Update metrics after run
   */
  updateMetrics(results) {
    this.metrics.runs++;
    
    const successful = results.every(r => r.success);
    if (successful) {
      this.metrics.successfulRuns++;
    }
    
    const totalDuration = Date.now() - this.startTime;
    this.metrics.totalDuration += totalDuration;
    this.metrics.averageDuration = this.metrics.totalDuration / this.metrics.runs;
  }

  /**
   * Generate and display run report
   */
  generateReport(strategyName, results) {
    const duration = Date.now() - this.startTime;
    const successful = results.filter(r => r.success).length;
    const total = results.length;
    const successRate = total > 0 ? (successful / total) * 100 : 0;
    
    const report = {
      timestamp: new Date().toISOString(),
      strategy: strategyName,
      duration,
      targets: {
        total,
        successful,
        failed: total - successful,
        successRate: Math.round(successRate * 100) / 100
      },
      results,
      metrics: this.metrics
    };
    
    this.printReport(report);
    return report;
  }

  /**
   * Print formatted report
   */
  printReport(report) {
    const colors = {
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      cyan: '\x1b[36m'
    };
    
    console.log('\n' + '='.repeat(60));
    console.log(`${colors.bright}📅 SCHEDULED CACHE WARMING REPORT${colors.reset}`);
    console.log('='.repeat(60));
    
    // Run info
    console.log(`⏰ Timestamp: ${report.timestamp}`);
    console.log(`🎯 Strategy: ${colors.cyan}${report.strategy}${colors.reset}`);
    console.log(`⏱️  Duration: ${(report.duration / 1000).toFixed(2)}s`);
    
    // Target results
    const statusColor = report.targets.successRate === 100 ? colors.green : 
                       report.targets.successRate >= 80 ? colors.yellow : colors.red;
    console.log(`📊 Targets: ${report.targets.successful}/${report.targets.total} successful`);
    console.log(`📈 Success Rate: ${statusColor}${report.targets.successRate}%${colors.reset}`);
    
    // Individual target results
    console.log(`\n${colors.bright}🎯 Target Results:${colors.reset}`);
    report.results.forEach(result => {
      const statusIcon = result.success ? '✅' : '❌';
      const statusColor = result.success ? colors.green : colors.red;
      console.log(`  ${statusIcon} ${result.target} - ${statusColor}${result.success ? 'SUCCESS' : 'FAILED'}${colors.reset} (${result.duration}ms)`);
      
      if (!result.success && result.error) {
        console.log(`    ${colors.red}Error: ${result.error}${colors.reset}`);
      }
    });
    
    // Historical metrics
    console.log(`\n${colors.bright}📈 Historical Metrics:${colors.reset}`);
    console.log(`Total Runs: ${report.metrics.runs}`);
    console.log(`Successful Runs: ${colors.green}${report.metrics.successfulRuns}${colors.reset}`);
    console.log(`Failed Runs: ${colors.red}${report.metrics.runs - report.metrics.successfulRuns}${colors.reset}`);
    console.log(`Average Duration: ${(report.metrics.averageDuration / 1000).toFixed(2)}s`);
    
    if (report.metrics.errors.length > 0) {
      console.log(`\n${colors.bright}🚨 Recent Errors:${colors.reset}`);
      report.metrics.errors.slice(-3).forEach(error => {
        console.log(`  ${colors.red}❌ ${error.target}: ${error.error}${colors.reset}`);
        console.log(`    ${colors.yellow}${error.timestamp}${colors.reset}`);
      });
    }
    
    console.log('='.repeat(60));
  }

  /**
   * Send notifications if enabled
   */
  async sendNotifications(report) {
    if (!this.strategy?.notification) return;
    
    // Only send notifications for failures or important events
    if (report.targets.successRate < 100) {
      Logger.warning(`📧 Notification triggered for ${report.targets.successRate}% success rate`);
      // Here you would integrate with your notification system
      // (Slack, email, PagerDuty, etc.)
    }
  }
}

/**
 * Main execution function
 */
async function main() {
  const args = process.argv.slice(2);
  const strategyInput = args[0] || 'auto';
  
  Logger.info('📅 Scheduled Cache Warming Started');
  Logger.info(`🕐 Current time: ${new Date().toISOString()}`);
  Logger.info(`🎯 Strategy input: ${strategyInput}`);
  
  const warmer = new ScheduledCacheWarmer();
  
  try {
    // Determine strategy
    const strategyName = warmer.getWarmingStrategy(strategyInput);
    
    if (!WARMING_STRATEGIES[strategyName]) {
      throw new Error(`Invalid strategy: ${strategyName}`);
    }
    
    // Execute warming strategy
    const results = await warmer.executeStrategy(strategyName);
    
    // Update metrics and generate report
    warmer.updateMetrics(results);
    const report = warmer.generateReport(strategyName, results);
    
    // Send notifications if needed
    await warmer.sendNotifications(report);
    
    // Exit with appropriate code
    const successRate = report.targets.successRate;
    if (successRate === 100) {
      Logger.success('🎉 Scheduled warming completed successfully!');
      process.exit(0);
    } else if (successRate >= 80) {
      Logger.warning('⚠️ Scheduled warming completed with some failures');
      process.exit(0); // Don't fail the cron job for partial success
    } else {
      Logger.error('❌ Scheduled warming failed');
      process.exit(1);
    }
    
  } catch (error) {
    Logger.error('💥 Scheduled warming encountered a critical error', error);
    process.exit(1);
  }
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
${'\x1b[1m'}Scheduled Cache Warming Script${'\x1b[0m'}

${'\x1b[1m'}Usage:${'\x1b[0m'}
  node scheduled-warming.js [strategy]

${'\x1b[1m'}Strategies:${'\x1b[0m'}
  auto        Automatically detect best strategy based on current time (default)
  peak        Aggressive warming for high-traffic periods
  normal      Standard warming for regular traffic
  off-peak    Minimal warming for low-traffic periods
  maintenance Comprehensive warming during maintenance windows

${'\x1b[1m'}Traffic Patterns:${'\x1b[0m'}
  Peak Hours:     9 AM - 6 PM (Monday-Friday)
  Normal Hours:   7-8 AM, 6-8 PM (Monday-Friday)
  Off-Peak:       Nights (9 PM - 6 AM) and weekends

${'\x1b[1m'}Cron Examples:${'\x1b[0m'}
  # Every 30 minutes during business hours
  */30 9-17 * * 1-5 node scheduled-warming.js peak

  # Every 2 hours during off-peak
  0 */2 * * * node scheduled-warming.js off-peak

  # Auto-detect strategy every hour
  0 * * * * node scheduled-warming.js auto

${'\x1b[1m'}Examples:${'\x1b[0m'}
  node scheduled-warming.js auto
  node scheduled-warming.js peak
  node scheduled-warming.js off-peak
  `);
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showHelp();
  process.exit(0);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { 
  ScheduledCacheWarmer, 
  WARMING_STRATEGIES, 
  TRAFFIC_PATTERNS 
};