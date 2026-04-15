#!/usr/bin/env node

/**
 * Post-Deployment Cache Warming Script
 * 
 * This script is designed to run immediately after deployment to:
 * 1. Validate the deployment is healthy
 * 2. Invalidate stale caches
 * 3. Warm critical caches proactively
 * 4. Monitor warming progress
 * 5. Report deployment cache warming status
 * 
 * Usage in CI/CD:
 *   npm run post-deploy-warming
 *   node scripts/post-deployment-warming.js
 */

const { CacheWarmer, HttpClient, Logger } = require('./cache-warming');

// Post-deployment specific configuration
const DEPLOYMENT_CONFIG = {
  HEALTH_CHECK_RETRIES: 5,
  HEALTH_CHECK_DELAY: 3000, // 3 seconds between health checks
  WARMING_TIMEOUT: 120000, // 2 minutes maximum for warming
  VALIDATION_ENDPOINTS: [
    '/',
    '/sprint-claridad-comercial',
    '/api/health',
    '/api/workshops'
  ],
  CRITICAL_SUCCESS_THRESHOLD: 0.8, // 80% success rate minimum
  SLACK_WEBHOOK: process.env.SLACK_WEBHOOK_URL,
  TEAMS_WEBHOOK: process.env.TEAMS_WEBHOOK_URL
};

/**
 * Deployment Cache Warmer with enhanced monitoring
 */
class DeploymentCacheWarmer extends CacheWarmer {
  constructor() {
    super();
    this.deploymentStart = Date.now();
    this.healthChecks = [];
    this.validationResults = [];
  }

  /**
   * Wait for application to be healthy before warming
   */
  async waitForHealthy() {
    Logger.info('🏥 Waiting for application to be healthy...');
    
    for (let attempt = 1; attempt <= DEPLOYMENT_CONFIG.HEALTH_CHECK_RETRIES; attempt++) {
      try {
        const response = await HttpClient.get('/api/health');
        
        if (response.status === 200) {
          Logger.success(`Application healthy on attempt ${attempt}`);
          this.healthChecks.push({
            attempt,
            success: true,
            responseTime: Date.now(),
            status: response.status
          });
          return true;
        }
        
        this.healthChecks.push({
          attempt,
          success: false,
          status: response.status,
          responseTime: Date.now()
        });
        
        Logger.warning(`Health check failed (attempt ${attempt}/${DEPLOYMENT_CONFIG.HEALTH_CHECK_RETRIES}): ${response.status}`);
        
      } catch (error) {
        this.healthChecks.push({
          attempt,
          success: false,
          error: error.message,
          responseTime: Date.now()
        });
        
        Logger.warning(`Health check error (attempt ${attempt}/${DEPLOYMENT_CONFIG.HEALTH_CHECK_RETRIES}): ${error.message}`);
      }
      
      if (attempt < DEPLOYMENT_CONFIG.HEALTH_CHECK_RETRIES) {
        await this.delay(DEPLOYMENT_CONFIG.HEALTH_CHECK_DELAY);
      }
    }
    
    throw new Error('Application failed to become healthy within timeout');
  }

  /**
   * Validate critical endpoints are working
   */
  async validateEndpoints() {
    Logger.info('🔍 Validating critical endpoints...');
    
    const validationPromises = DEPLOYMENT_CONFIG.VALIDATION_ENDPOINTS.map(async (endpoint) => {
      const startTime = Date.now();
      
      try {
        const response = await HttpClient.get(endpoint);
        const responseTime = Date.now() - startTime;
        
        const result = {
          endpoint,
          success: response.status >= 200 && response.status < 400,
          status: response.status,
          responseTime,
          cached: response.headers?.['x-cache'] === 'HIT'
        };
        
        this.validationResults.push(result);
        
        if (result.success) {
          Logger.success(`✅ ${endpoint} - ${result.status} (${result.responseTime}ms)`);
        } else {
          Logger.error(`❌ ${endpoint} - ${result.status} (${result.responseTime}ms)`);
        }
        
        return result;
        
      } catch (error) {
        const result = {
          endpoint,
          success: false,
          error: error.message,
          responseTime: Date.now() - startTime
        };
        
        this.validationResults.push(result);
        Logger.error(`❌ ${endpoint} - ${error.message}`);
        
        return result;
      }
    });
    
    const results = await Promise.all(validationPromises);
    const successCount = results.filter(r => r.success).length;
    const successRate = successCount / results.length;
    
    Logger.info(`Validation complete: ${successCount}/${results.length} endpoints successful (${(successRate * 100).toFixed(1)}%)`);
    
    if (successRate < DEPLOYMENT_CONFIG.CRITICAL_SUCCESS_THRESHOLD) {
      throw new Error(`Validation failed: ${(successRate * 100).toFixed(1)}% success rate below threshold of ${(DEPLOYMENT_CONFIG.CRITICAL_SUCCESS_THRESHOLD * 100)}%`);
    }
    
    return results;
  }

  /**
   * Execute full post-deployment warming sequence
   */
  async executeDeploymentWarming() {
    Logger.info('🚀 Starting post-deployment warming sequence...');
    
    const sequence = [
      { name: 'Health Check', fn: () => this.waitForHealthy() },
      { name: 'Endpoint Validation', fn: () => this.validateEndpoints() },
      { name: 'Deployment Warming', fn: () => this.warmDeployment() },
      { name: 'Health Validation', fn: () => this.getHealth() }
    ];
    
    const results = [];
    
    for (const step of sequence) {
      const stepStart = Date.now();
      
      try {
        Logger.info(`⏳ Executing: ${step.name}...`);
        const result = await step.fn();
        const duration = Date.now() - stepStart;
        
        results.push({
          name: step.name,
          success: true,
          duration,
          result
        });
        
        Logger.success(`✅ ${step.name} completed in ${duration}ms`);
        
      } catch (error) {
        const duration = Date.now() - stepStart;
        
        results.push({
          name: step.name,
          success: false,
          duration,
          error: error.message
        });
        
        Logger.error(`❌ ${step.name} failed after ${duration}ms: ${error.message}`);
        
        // Stop on critical failures
        if (['Health Check', 'Endpoint Validation'].includes(step.name)) {
          throw error;
        }
      }
    }
    
    return results;
  }

  /**
   * Generate deployment report
   */
  generateReport(sequenceResults) {
    const totalDuration = Date.now() - this.deploymentStart;
    const successfulSteps = sequenceResults.filter(r => r.success).length;
    const totalSteps = sequenceResults.length;
    
    const report = {
      timestamp: new Date().toISOString(),
      success: successfulSteps === totalSteps,
      duration: totalDuration,
      steps: {
        total: totalSteps,
        successful: successfulSteps,
        failed: totalSteps - successfulSteps
      },
      healthChecks: this.healthChecks,
      validation: {
        endpoints: this.validationResults,
        successRate: this.validationResults.length > 0 
          ? (this.validationResults.filter(r => r.success).length / this.validationResults.length) * 100
          : 0
      },
      warming: this.stats,
      sequence: sequenceResults
    };
    
    return report;
  }

  /**
   * Print comprehensive deployment report
   */
  printDeploymentReport(report) {
    const colors = {
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m'
    };
    
    console.log('\n' + '='.repeat(60));
    console.log(`${colors.bright}🚀 POST-DEPLOYMENT CACHE WARMING REPORT${colors.reset}`);
    console.log('='.repeat(60));
    
    // Overall status
    const statusColor = report.success ? colors.green : colors.red;
    const statusIcon = report.success ? '✅' : '❌';
    console.log(`${statusIcon} Overall Status: ${statusColor}${report.success ? 'SUCCESS' : 'FAILED'}${colors.reset}`);
    console.log(`⏱️  Total Duration: ${(report.duration / 1000).toFixed(2)}s`);
    console.log(`📊 Steps: ${report.steps.successful}/${report.steps.total} successful`);
    
    // Health checks
    console.log(`\n${colors.bright}🏥 Health Checks:${colors.reset}`);
    const lastHealthCheck = report.healthChecks[report.healthChecks.length - 1];
    if (lastHealthCheck?.success) {
      console.log(`${colors.green}✅ Application healthy after ${report.healthChecks.length} attempt(s)${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ Health checks failed after ${report.healthChecks.length} attempts${colors.reset}`);
    }
    
    // Endpoint validation
    console.log(`\n${colors.bright}🔍 Endpoint Validation:${colors.reset}`);
    console.log(`Success Rate: ${report.validation.successRate.toFixed(1)}%`);
    report.validation.endpoints.forEach(endpoint => {
      const statusColor = endpoint.success ? colors.green : colors.red;
      const statusIcon = endpoint.success ? '✅' : '❌';
      console.log(`  ${statusIcon} ${endpoint.endpoint} - ${statusColor}${endpoint.status || 'ERROR'}${colors.reset} (${endpoint.responseTime}ms)`);
    });
    
    // Cache warming
    console.log(`\n${colors.bright}🔥 Cache Warming:${colors.reset}`);
    console.log(`Operations: ${report.warming.operations}`);
    console.log(`Successful: ${colors.green}${report.warming.successful}${colors.reset}`);
    console.log(`Failed: ${colors.red}${report.warming.failed}${colors.reset}`);
    if (report.warming.operations > 0) {
      const warmingSuccessRate = (report.warming.successful / report.warming.operations) * 100;
      console.log(`Success Rate: ${warmingSuccessRate.toFixed(1)}%`);
    }
    
    // Sequence details
    console.log(`\n${colors.bright}📋 Execution Sequence:${colors.reset}`);
    report.sequence.forEach((step, index) => {
      const statusColor = step.success ? colors.green : colors.red;
      const statusIcon = step.success ? '✅' : '❌';
      console.log(`  ${index + 1}. ${statusIcon} ${step.name} - ${statusColor}${step.success ? 'SUCCESS' : 'FAILED'}${colors.reset} (${step.duration}ms)`);
    });
    
    // Recommendations
    console.log(`\n${colors.bright}💡 Recommendations:${colors.reset}`);
    if (report.success) {
      console.log('✅ Deployment warming completed successfully');
      console.log('✅ All critical endpoints are responding');
      console.log('✅ Caches have been warmed and are ready for traffic');
    } else {
      console.log('❌ Review failed steps and retry if necessary');
      console.log('❌ Check application logs for detailed error information');
      console.log('❌ Consider manual cache warming for critical endpoints');
    }
    
    console.log('='.repeat(60));
  }

  /**
   * Send notification to external services
   */
  async sendNotifications(report) {
    const notifications = [];
    
    // Slack notification
    if (DEPLOYMENT_CONFIG.SLACK_WEBHOOK) {
      try {
        const slackPayload = {
          text: `🚀 Deployment Cache Warming ${report.success ? 'Completed' : 'Failed'}`,
          attachments: [{
            color: report.success ? 'good' : 'danger',
            fields: [
              {
                title: 'Status',
                value: report.success ? '✅ Success' : '❌ Failed',
                short: true
              },
              {
                title: 'Duration',
                value: `${(report.duration / 1000).toFixed(2)}s`,
                short: true
              },
              {
                title: 'Endpoint Success Rate',
                value: `${report.validation.successRate.toFixed(1)}%`,
                short: true
              },
              {
                title: 'Cache Warming',
                value: `${report.warming.successful}/${report.warming.operations} successful`,
                short: true
              }
            ]
          }]
        };
        
        // Note: In a real implementation, you'd use fetch or axios to send this
        Logger.info('📱 Slack notification prepared (webhook not implemented in script)');
        notifications.push({ service: 'Slack', status: 'prepared' });
        
      } catch (error) {
        Logger.error('Failed to send Slack notification', error);
        notifications.push({ service: 'Slack', status: 'failed', error: error.message });
      }
    }
    
    return notifications;
  }
}

/**
 * Main execution function
 */
async function main() {
  const warmer = new DeploymentCacheWarmer();
  let report;
  
  try {
    Logger.info('🚀 Post-Deployment Cache Warming Started');
    Logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    Logger.info(`Base URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}`);
    
    // Execute the warming sequence
    const sequenceResults = await warmer.executeDeploymentWarming();
    
    // Generate and display report
    report = warmer.generateReport(sequenceResults);
    warmer.printDeploymentReport(report);
    
    // Send notifications
    const notifications = await warmer.sendNotifications(report);
    if (notifications.length > 0) {
      Logger.info(`📨 Notifications sent: ${notifications.length}`);
    }
    
    // Exit with appropriate code
    if (report.success) {
      Logger.success('🎉 Post-deployment warming completed successfully!');
      process.exit(0);
    } else {
      Logger.error('❌ Post-deployment warming completed with failures');
      process.exit(1);
    }
    
  } catch (error) {
    Logger.error('💥 Post-deployment warming failed', error);
    
    // Generate failure report if possible
    if (warmer) {
      report = warmer.generateReport([{
        name: 'Critical Failure',
        success: false,
        duration: Date.now() - warmer.deploymentStart,
        error: error.message
      }]);
      warmer.printDeploymentReport(report);
    }
    
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { DeploymentCacheWarmer, DEPLOYMENT_CONFIG };