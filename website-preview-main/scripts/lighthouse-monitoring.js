#!/usr/bin/env node

/**
 * Advanced Lighthouse Monitoring & Alerting System
 * Part of Meridian Performance Plan - Phase 6.2
 */

// Dynamic import for ES modules
let lighthouse;
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

// Import existing utilities
const { PERFORMANCE_TARGETS } = require('./lighthouse-audit.js');

// Enhanced monitoring configuration
const MONITORING_CONFIG = {
  // URLs to monitor with different priorities
  urls: {
    production: {
      critical: [
        { url: 'https://utopica.website', name: 'Homepage', priority: 'P0' },
        { url: 'https://utopica.website/sprint-claridad-comercial', name: 'Sprint Landing', priority: 'P0' },
      ],
      important: [
        { url: 'https://utopica.website/equipo', name: 'Team Page', priority: 'P1' },
      ],
      secondary: [
        { url: 'https://utopica.website/api/workshops', name: 'Workshops API', priority: 'P2' },
      ]
    },
    development: {
      critical: [
        { url: 'http://localhost:3000', name: 'Homepage', priority: 'P0' },
        { url: 'http://localhost:3000/sprint-claridad-comercial', name: 'Sprint Landing', priority: 'P0' },
      ],
      important: [
        { url: 'http://localhost:3000/equipo', name: 'Team Page', priority: 'P1' },
      ],
      secondary: [
        { url: 'http://localhost:3000/api/workshops', name: 'Workshops API', priority: 'P2' },
      ]
    },
    staging: {
      critical: [
        { url: 'https://utopica-staging.netlify.app', name: 'Homepage', priority: 'P0' },
        { url: 'https://utopica-staging.netlify.app/sprint-claridad-comercial', name: 'Sprint Landing', priority: 'P0' },
      ],
      important: [
        { url: 'https://utopica-staging.netlify.app/equipo', name: 'Team Page', priority: 'P1' },
      ],
      secondary: [
        { url: 'https://utopica-staging.netlify.app/api/workshops', name: 'Workshops API', priority: 'P2' },
      ]
    }
  },

  // Monitoring thresholds (stricter than development)
  thresholds: {
    performance: {
      critical: 85,    // Below this = critical alert
      warning: 90,     // Below this = warning alert
      target: 95       // Target score
    },
    lcp: {
      critical: 2500,  // Above this = critical alert
      warning: 2000,   // Above this = warning alert
      target: 1500     // Target time
    },
    cls: {
      critical: 0.25,  // Above this = critical alert
      warning: 0.15,   // Above this = warning alert
      target: 0.1      // Target score
    },
    fcp: {
      critical: 2000,
      warning: 1500,
      target: 1200
    },
    accessibility: {
      critical: 90,
      warning: 95,
      target: 98
    }
  },

  // Monitoring intervals
  intervals: {
    development: 1000 * 60 * 15,      // 15 minutes
    staging: 1000 * 60 * 30,          // 30 minutes
    production: 1000 * 60 * 60,       // 1 hour
    critical: 1000 * 60 * 5,          // 5 minutes (incident response)
  },

  // Alert configuration
  alerts: {
    slack: process.env.SLACK_WEBHOOK_URL,
    discord: process.env.DISCORD_WEBHOOK_URL,
    email: process.env.ALERT_EMAIL,
    pagerduty: process.env.PAGERDUTY_INTEGRATION_KEY,
  },

  // Retention policy
  retention: {
    raw_data: 30,        // days
    aggregated: 365,     // days
    trends: 730,         // days
  }
};

class LighthouseMonitor {
  constructor(options = {}) {
    this.config = { ...MONITORING_CONFIG, ...options };
    this.dataDir = path.join(__dirname, '..', 'monitoring-data');
    this.trendsDir = path.join(this.dataDir, 'trends');
    this.alertsDir = path.join(this.dataDir, 'alerts');
    this.reportsDir = path.join(this.dataDir, 'reports');
    
    this.ensureDirectories();
    this.setupPerformanceBaseline();
  }

  ensureDirectories() {
    [this.dataDir, this.trendsDir, this.alertsDir, this.reportsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  setupPerformanceBaseline() {
    const baselinePath = path.join(this.dataDir, 'performance-baseline.json');
    
    if (!fs.existsSync(baselinePath)) {
      const baseline = {
        created: new Date().toISOString(),
        version: '1.0.0',
        targets: PERFORMANCE_TARGETS,
        monitoring_thresholds: this.config.thresholds,
        last_updated: new Date().toISOString()
      };
      
      fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2));
      console.log('📊 Performance baseline created');
    }
  }

  async runMonitoring(environment = 'production') {
    console.log(`🔍 Starting Lighthouse monitoring for ${environment} environment`);
    
    const startTime = Date.now();
    const results = {
      timestamp: new Date().toISOString(),
      environment,
      duration: 0,
      urls: {},
      summary: {},
      alerts: [],
      recommendations: []
    };

    // Get URLs for the specified environment
    const environmentUrls = this.config.urls[environment] || this.config.urls.development;
    
    // Run monitoring for all URL categories
    for (const [category, urls] of Object.entries(environmentUrls)) {
      console.log(`\n📋 Monitoring ${category} URLs (${urls.length} total)`);
      
      for (const urlConfig of urls) {
        try {
          const urlResult = await this.monitorURL(urlConfig, environment);
          results.urls[urlConfig.name] = urlResult;
          
          // Check for issues and generate alerts
          const alerts = this.checkThresholds(urlResult, urlConfig);
          results.alerts.push(...alerts);
          
        } catch (error) {
          console.error(`❌ Error monitoring ${urlConfig.name}:`, error.message);
          results.urls[urlConfig.name] = {
            error: error.message,
            url: urlConfig.url,
            priority: urlConfig.priority
          };
          
          // Critical error alert
          results.alerts.push({
            level: 'critical',
            type: 'monitoring_error',
            url: urlConfig.name,
            message: `Failed to monitor ${urlConfig.name}: ${error.message}`,
            timestamp: new Date().toISOString()
          });
        }
      }
    }

    // Calculate summary metrics
    results.summary = this.calculateSummary(results.urls);
    results.duration = Date.now() - startTime;

    // Generate recommendations
    results.recommendations = this.generateRecommendations(results);

    // Save results
    await this.saveResults(results);

    // Process alerts
    if (results.alerts.length > 0) {
      await this.processAlerts(results.alerts);
    }

    // Update trends
    await this.updateTrends(results);

    console.log(`\n✅ Monitoring completed in ${results.duration}ms`);
    console.log(`📊 Monitored ${Object.keys(results.urls).length} URLs`);
    console.log(`⚠️  Generated ${results.alerts.length} alerts`);

    return results;
  }

  async monitorURL(urlConfig, environment) {
    console.log(`  🔍 Monitoring: ${urlConfig.name} (${urlConfig.priority})`);
    
    // Initialize lighthouse if not already done
    if (!lighthouse) {
      lighthouse = (await import('lighthouse')).default;
    }
    
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
    });

    try {
      const options = {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
        // Use mobile emulation for consistent results
        emulatedFormFactor: 'mobile',
        throttling: {
          rttMs: 150,
          throughputKbps: 1600,
          cpuSlowdownMultiplier: 4
        }
      };

      const runnerResult = await lighthouse(urlConfig.url, options);
      const lhr = runnerResult.lhr;

      // Extract key metrics
      const result = {
        url: urlConfig.url,
        name: urlConfig.name,
        priority: urlConfig.priority,
        timestamp: new Date().toISOString(),
        scores: {
          performance: Math.round(lhr.categories.performance.score * 100),
          accessibility: Math.round(lhr.categories.accessibility.score * 100),
          bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
          seo: Math.round(lhr.categories.seo.score * 100)
        },
        metrics: {
          lcp: lhr.audits['largest-contentful-paint']?.numericValue || 0,
          fcp: lhr.audits['first-contentful-paint']?.numericValue || 0,
          cls: lhr.audits['cumulative-layout-shift']?.numericValue || 0,
          si: lhr.audits['speed-index']?.numericValue || 0,
          tbt: lhr.audits['total-blocking-time']?.numericValue || 0,
          ttfb: lhr.audits['server-response-time']?.numericValue || 0
        },
        opportunities: this.extractOpportunities(lhr.audits),
        diagnostics: this.extractDiagnostics(lhr.audits),
        environment
      };

      console.log(`    📈 Performance: ${result.scores.performance}%`);
      console.log(`    🎯 LCP: ${Math.round(result.metrics.lcp)}ms`);
      console.log(`    📐 CLS: ${result.metrics.cls.toFixed(3)}`);

      return result;

    } finally {
      await chrome.kill();
    }
  }

  extractOpportunities(audits) {
    const opportunities = [];
    
    // Key performance opportunities
    const opportunityAudits = [
      'unused-css-rules',
      'unused-javascript', 
      'modern-image-formats',
      'uses-optimized-images',
      'uses-text-compression',
      'uses-responsive-images',
      'efficient-animated-content',
      'legacy-javascript'
    ];

    opportunityAudits.forEach(auditId => {
      const audit = audits[auditId];
      if (audit && audit.score !== null && audit.score < 1) {
        opportunities.push({
          id: auditId,
          title: audit.title,
          description: audit.description,
          score: audit.score,
          numericValue: audit.numericValue,
          displayValue: audit.displayValue,
          potential: audit.details?.overallSavingsMs || 0
        });
      }
    });

    // Sort by potential savings
    return opportunities.sort((a, b) => b.potential - a.potential);
  }

  extractDiagnostics(audits) {
    const diagnostics = [];
    
    const diagnosticAudits = [
      'render-blocking-resources',
      'unminified-css',
      'unminified-javascript', 
      'duplicated-javascript',
      'server-response-time',
      'redirects',
      'uses-long-cache-ttl',
      'total-byte-weight'
    ];

    diagnosticAudits.forEach(auditId => {
      const audit = audits[auditId];
      if (audit && audit.score !== null && audit.score < 1) {
        diagnostics.push({
          id: auditId,
          title: audit.title,
          description: audit.description,
          score: audit.score,
          numericValue: audit.numericValue,
          displayValue: audit.displayValue
        });
      }
    });

    return diagnostics;
  }

  checkThresholds(result, urlConfig) {
    const alerts = [];
    const thresholds = this.config.thresholds;

    // Check performance score
    if (result.scores.performance < thresholds.performance.critical) {
      alerts.push({
        level: 'critical',
        type: 'performance_score',
        url: urlConfig.name,
        priority: urlConfig.priority,
        metric: 'Performance Score',
        value: result.scores.performance,
        threshold: thresholds.performance.critical,
        message: `Performance score ${result.scores.performance}% is below critical threshold ${thresholds.performance.critical}%`,
        timestamp: new Date().toISOString()
      });
    } else if (result.scores.performance < thresholds.performance.warning) {
      alerts.push({
        level: 'warning',
        type: 'performance_score',
        url: urlConfig.name,
        priority: urlConfig.priority,
        metric: 'Performance Score',
        value: result.scores.performance,
        threshold: thresholds.performance.warning,
        message: `Performance score ${result.scores.performance}% is below warning threshold ${thresholds.performance.warning}%`,
        timestamp: new Date().toISOString()
      });
    }

    // Check LCP
    if (result.metrics.lcp > thresholds.lcp.critical) {
      alerts.push({
        level: 'critical',
        type: 'web_vitals',
        url: urlConfig.name,
        priority: urlConfig.priority,
        metric: 'LCP',
        value: Math.round(result.metrics.lcp),
        threshold: thresholds.lcp.critical,
        message: `LCP ${Math.round(result.metrics.lcp)}ms exceeds critical threshold ${thresholds.lcp.critical}ms`,
        timestamp: new Date().toISOString()
      });
    } else if (result.metrics.lcp > thresholds.lcp.warning) {
      alerts.push({
        level: 'warning',
        type: 'web_vitals',
        url: urlConfig.name,
        priority: urlConfig.priority,
        metric: 'LCP',
        value: Math.round(result.metrics.lcp),
        threshold: thresholds.lcp.warning,
        message: `LCP ${Math.round(result.metrics.lcp)}ms exceeds warning threshold ${thresholds.lcp.warning}ms`,
        timestamp: new Date().toISOString()
      });
    }

    // Check CLS
    if (result.metrics.cls > thresholds.cls.critical) {
      alerts.push({
        level: 'critical',
        type: 'web_vitals',
        url: urlConfig.name,
        priority: urlConfig.priority,
        metric: 'CLS',
        value: result.metrics.cls,
        threshold: thresholds.cls.critical,
        message: `CLS ${result.metrics.cls.toFixed(3)} exceeds critical threshold ${thresholds.cls.critical}`,
        timestamp: new Date().toISOString()
      });
    } else if (result.metrics.cls > thresholds.cls.warning) {
      alerts.push({
        level: 'warning',
        type: 'web_vitals',
        url: urlConfig.name,
        priority: urlConfig.priority,
        metric: 'CLS',
        value: result.metrics.cls,
        threshold: thresholds.cls.warning,
        message: `CLS ${result.metrics.cls.toFixed(3)} exceeds warning threshold ${thresholds.cls.warning}`,
        timestamp: new Date().toISOString()
      });
    }

    // Check accessibility
    if (result.scores.accessibility < thresholds.accessibility.critical) {
      alerts.push({
        level: 'critical',
        type: 'accessibility',
        url: urlConfig.name,
        priority: urlConfig.priority,
        metric: 'Accessibility Score',
        value: result.scores.accessibility,
        threshold: thresholds.accessibility.critical,
        message: `Accessibility score ${result.scores.accessibility}% is below critical threshold ${thresholds.accessibility.critical}%`,
        timestamp: new Date().toISOString()
      });
    }

    return alerts;
  }

  calculateSummary(urlResults) {
    const validResults = Object.values(urlResults).filter(r => !r.error);
    
    if (validResults.length === 0) {
      return { error: 'No valid results' };
    }

    const summary = {
      totalUrls: Object.keys(urlResults).length,
      successfulUrls: validResults.length,
      failedUrls: Object.keys(urlResults).length - validResults.length,
      averageScores: {
        performance: Math.round(validResults.reduce((sum, r) => sum + r.scores.performance, 0) / validResults.length),
        accessibility: Math.round(validResults.reduce((sum, r) => sum + r.scores.accessibility, 0) / validResults.length),
        bestPractices: Math.round(validResults.reduce((sum, r) => sum + r.scores.bestPractices, 0) / validResults.length),
        seo: Math.round(validResults.reduce((sum, r) => sum + r.scores.seo, 0) / validResults.length)
      },
      averageMetrics: {
        lcp: Math.round(validResults.reduce((sum, r) => sum + r.metrics.lcp, 0) / validResults.length),
        fcp: Math.round(validResults.reduce((sum, r) => sum + r.metrics.fcp, 0) / validResults.length),
        cls: validResults.reduce((sum, r) => sum + r.metrics.cls, 0) / validResults.length,
        si: Math.round(validResults.reduce((sum, r) => sum + r.metrics.si, 0) / validResults.length),
        tbt: Math.round(validResults.reduce((sum, r) => sum + r.metrics.tbt, 0) / validResults.length)
      }
    };

    // Calculate health status
    summary.healthStatus = this.calculateHealthStatus(summary.averageScores, summary.averageMetrics);

    return summary;
  }

  calculateHealthStatus(scores, metrics) {
    const thresholds = this.config.thresholds;
    
    // Calculate overall health based on critical thresholds
    const healthChecks = {
      performance: scores.performance >= thresholds.performance.warning,
      lcp: metrics.lcp <= thresholds.lcp.warning,
      cls: metrics.cls <= thresholds.cls.warning,
      accessibility: scores.accessibility >= thresholds.accessibility.warning
    };

    const healthyChecks = Object.values(healthChecks).filter(Boolean).length;
    const totalChecks = Object.keys(healthChecks).length;
    const healthPercentage = (healthyChecks / totalChecks) * 100;

    let status = 'healthy';
    if (healthPercentage < 50) {
      status = 'critical';
    } else if (healthPercentage < 75) {
      status = 'warning';
    }

    return {
      status,
      percentage: Math.round(healthPercentage),
      checks: healthChecks,
      summary: `${healthyChecks}/${totalChecks} health checks passing`
    };
  }

  generateRecommendations(results) {
    const recommendations = [];
    const summary = results.summary;

    if (!summary.averageScores) return recommendations;

    // Performance recommendations
    if (summary.averageScores.performance < 90) {
      recommendations.push({
        priority: 'high',
        category: 'performance',
        title: 'Improve Performance Score',
        description: `Average performance score is ${summary.averageScores.performance}%. Focus on LCP and TBT optimizations.`,
        actions: [
          'Optimize images and use modern formats (WebP, AVIF)',
          'Implement code splitting and lazy loading',
          'Minimize and compress JavaScript',
          'Use a CDN for static assets'
        ]
      });
    }

    // LCP recommendations
    if (summary.averageMetrics.lcp > 1500) {
      recommendations.push({
        priority: 'high',
        category: 'web-vitals',
        title: 'Optimize Largest Contentful Paint',
        description: `LCP is ${Math.round(summary.averageMetrics.lcp)}ms. Target is under 1500ms.`,
        actions: [
          'Optimize server response times',
          'Preload key resources',
          'Optimize images above the fold',
          'Use resource hints (dns-prefetch, preconnect)'
        ]
      });
    }

    // CLS recommendations
    if (summary.averageMetrics.cls > 0.1) {
      recommendations.push({
        priority: 'medium',
        category: 'web-vitals',
        title: 'Reduce Cumulative Layout Shift',
        description: `CLS is ${summary.averageMetrics.cls.toFixed(3)}. Target is under 0.1.`,
        actions: [
          'Set explicit dimensions for images and videos',
          'Avoid inserting content above existing content',
          'Use CSS transforms for animations',
          'Preload web fonts to avoid FOIT/FOUT'
        ]
      });
    }

    // Accessibility recommendations
    if (summary.averageScores.accessibility < 95) {
      recommendations.push({
        priority: 'medium',
        category: 'accessibility',
        title: 'Improve Accessibility',
        description: `Accessibility score is ${summary.averageScores.accessibility}%. Target is above 95%.`,
        actions: [
          'Add alt text to all images',
          'Ensure sufficient color contrast',
          'Provide focus indicators',
          'Use semantic HTML elements'
        ]
      });
    }

    return recommendations;
  }

  async saveResults(results) {
    // Save detailed results
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const resultsFile = path.join(this.reportsDir, `monitoring-${timestamp}.json`);
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

    // Save latest results
    const latestFile = path.join(this.dataDir, 'latest-monitoring.json');
    fs.writeFileSync(latestFile, JSON.stringify(results, null, 2));

    // Clean up old results based on retention policy
    await this.cleanupOldData();

    console.log(`💾 Results saved to ${resultsFile}`);
  }

  async processAlerts(alerts) {
    if (alerts.length === 0) return;

    console.log(`\n🚨 Processing ${alerts.length} alerts`);

    // Group alerts by level
    const criticalAlerts = alerts.filter(a => a.level === 'critical');
    const warningAlerts = alerts.filter(a => a.level === 'warning');

    // Save alerts
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const alertsFile = path.join(this.alertsDir, `alerts-${timestamp}.json`);
    fs.writeFileSync(alertsFile, JSON.stringify(alerts, null, 2));

    // Send notifications for critical alerts
    if (criticalAlerts.length > 0) {
      await this.sendCriticalAlerts(criticalAlerts);
    }

    // Log alerts summary
    console.log(`  🔴 Critical alerts: ${criticalAlerts.length}`);
    console.log(`  🟡 Warning alerts: ${warningAlerts.length}`);

    // Print alerts to console
    alerts.forEach(alert => {
      const icon = alert.level === 'critical' ? '🔴' : '🟡';
      console.log(`    ${icon} ${alert.url}: ${alert.message}`);
    });
  }

  async sendCriticalAlerts(alerts) {
    // This would integrate with your alerting systems
    console.log(`🚨 ${alerts.length} critical alerts would be sent to:`);
    
    if (this.config.alerts.slack) {
      console.log('  📱 Slack webhook');
      // await this.sendSlackAlert(alerts);
    }
    
    if (this.config.alerts.discord) {
      console.log('  💬 Discord webhook');
      // await this.sendDiscordAlert(alerts);
    }
    
    if (this.config.alerts.email) {
      console.log('  📧 Email notifications');
      // await this.sendEmailAlert(alerts);
    }
    
    if (this.config.alerts.pagerduty) {
      console.log('  📟 PagerDuty integration');
      // await this.sendPagerDutyAlert(alerts);
    }
  }

  async updateTrends(results) {
    const trendsFile = path.join(this.trendsDir, 'performance-trends.json');
    
    let trends = { data: [] };
    if (fs.existsSync(trendsFile)) {
      trends = JSON.parse(fs.readFileSync(trendsFile, 'utf8'));
    }

    // Add current data point
    trends.data.push({
      timestamp: results.timestamp,
      environment: results.environment,
      summary: results.summary,
      alertCount: results.alerts.length
    });

    // Keep only last 100 data points
    if (trends.data.length > 100) {
      trends.data = trends.data.slice(-100);
    }

    // Calculate trends
    trends.trends = this.calculateTrends(trends.data);
    
    fs.writeFileSync(trendsFile, JSON.stringify(trends, null, 2));
    console.log('📈 Performance trends updated');
  }

  calculateTrends(data) {
    if (data.length < 2) return null;

    const recent = data.slice(-10); // Last 10 measurements
    const older = data.slice(-20, -10); // Previous 10 measurements

    if (recent.length === 0 || older.length === 0) return null;

    const recentAvg = {
      performance: recent.reduce((sum, d) => sum + (d.summary.averageScores?.performance || 0), 0) / recent.length,
      lcp: recent.reduce((sum, d) => sum + (d.summary.averageMetrics?.lcp || 0), 0) / recent.length,
      cls: recent.reduce((sum, d) => sum + (d.summary.averageMetrics?.cls || 0), 0) / recent.length,
    };

    const olderAvg = {
      performance: older.reduce((sum, d) => sum + (d.summary.averageScores?.performance || 0), 0) / older.length,
      lcp: older.reduce((sum, d) => sum + (d.summary.averageMetrics?.lcp || 0), 0) / older.length,
      cls: older.reduce((sum, d) => sum + (d.summary.averageMetrics?.cls || 0), 0) / older.length,
    };

    return {
      performance: {
        direction: recentAvg.performance > olderAvg.performance ? 'improving' : 'degrading',
        change: recentAvg.performance - olderAvg.performance,
        percentage: ((recentAvg.performance - olderAvg.performance) / olderAvg.performance) * 100
      },
      lcp: {
        direction: recentAvg.lcp < olderAvg.lcp ? 'improving' : 'degrading',
        change: recentAvg.lcp - olderAvg.lcp,
        percentage: ((recentAvg.lcp - olderAvg.lcp) / olderAvg.lcp) * 100
      },
      cls: {
        direction: recentAvg.cls < olderAvg.cls ? 'improving' : 'degrading',
        change: recentAvg.cls - olderAvg.cls,
        percentage: ((recentAvg.cls - olderAvg.cls) / olderAvg.cls) * 100
      }
    };
  }

  async cleanupOldData() {
    const now = Date.now();
    const retentionMs = this.config.retention.raw_data * 24 * 60 * 60 * 1000;

    // Clean up old reports
    const reportFiles = fs.readdirSync(this.reportsDir);
    reportFiles.forEach(file => {
      const filePath = path.join(this.reportsDir, file);
      const stats = fs.statSync(filePath);
      
      if (now - stats.mtime.getTime() > retentionMs) {
        fs.unlinkSync(filePath);
      }
    });

    // Clean up old alerts
    const alertFiles = fs.readdirSync(this.alertsDir);
    alertFiles.forEach(file => {
      const filePath = path.join(this.alertsDir, file);
      const stats = fs.statSync(filePath);
      
      if (now - stats.mtime.getTime() > retentionMs) {
        fs.unlinkSync(filePath);
      }
    });
  }

  // Utility methods for dashboard generation
  generateDashboardData() {
    const latestFile = path.join(this.dataDir, 'latest-monitoring.json');
    const trendsFile = path.join(this.trendsDir, 'performance-trends.json');
    
    const dashboard = {
      timestamp: new Date().toISOString(),
      status: 'unknown',
      latest: null,
      trends: null,
      summary: {}
    };

    if (fs.existsSync(latestFile)) {
      dashboard.latest = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
      dashboard.status = dashboard.latest.summary?.healthStatus?.status || 'unknown';
    }

    if (fs.existsSync(trendsFile)) {
      dashboard.trends = JSON.parse(fs.readFileSync(trendsFile, 'utf8'));
    }

    return dashboard;
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'monitor';
  const environment = args[1] || 'production';

  const monitor = new LighthouseMonitor();

  switch (command) {
    case 'monitor':
      await monitor.runMonitoring(environment);
      break;
      
    case 'dashboard':
      const dashboard = monitor.generateDashboardData();
      console.log(JSON.stringify(dashboard, null, 2));
      break;
      
    case 'trends':
      const trendsFile = path.join(monitor.trendsDir, 'performance-trends.json');
      if (fs.existsSync(trendsFile)) {
        const trends = JSON.parse(fs.readFileSync(trendsFile, 'utf8'));
        console.log(JSON.stringify(trends, null, 2));
      } else {
        console.log('No trends data available');
      }
      break;
      
    case 'alerts':
      const alertFiles = fs.readdirSync(monitor.alertsDir)
        .filter(f => f.endsWith('.json'))
        .sort()
        .slice(-10); // Last 10 alert files
      
      alertFiles.forEach(file => {
        console.log(`\n📄 ${file}:`);
        const alerts = JSON.parse(fs.readFileSync(path.join(monitor.alertsDir, file), 'utf8'));
        alerts.forEach(alert => {
          const icon = alert.level === 'critical' ? '🔴' : '🟡';
          console.log(`  ${icon} ${alert.url}: ${alert.message}`);
        });
      });
      break;
      
    default:
      console.log(`
🔍 Lighthouse Monitoring & Alerting System

Usage:
  node lighthouse-monitoring.js [command] [environment]

Commands:
  monitor      Run performance monitoring (default)
  dashboard    Generate dashboard data
  trends       Show performance trends
  alerts       Show recent alerts

Environments:
  production   Monitor production URLs (default)
  staging      Monitor staging URLs
  development  Monitor development URLs

Examples:
  node lighthouse-monitoring.js monitor production
  node lighthouse-monitoring.js dashboard
  node lighthouse-monitoring.js trends
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { LighthouseMonitor, MONITORING_CONFIG };