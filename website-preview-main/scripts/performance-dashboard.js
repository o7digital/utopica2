#!/usr/bin/env node

/**
 * Performance Dashboard Generator
 * Creates an interactive HTML dashboard for Lighthouse monitoring data
 * Part of Meridian Performance Plan - Phase 6.2
 */

const fs = require('fs');
const path = require('path');
const { LighthouseMonitor } = require('./lighthouse-monitoring.js');

class PerformanceDashboard {
  constructor() {
    this.monitor = new LighthouseMonitor();
    this.dashboardDir = path.join(__dirname, '..', 'performance-dashboard');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.dashboardDir)) {
      fs.mkdirSync(this.dashboardDir, { recursive: true });
    }
  }

  generateDashboard() {
    console.log('📊 Generating performance dashboard...');
    
    const dashboardData = this.monitor.generateDashboardData();
    const html = this.generateHTML(dashboardData);
    
    const dashboardFile = path.join(this.dashboardDir, 'index.html');
    fs.writeFileSync(dashboardFile, html);
    
    // Generate data file for dynamic updates
    const dataFile = path.join(this.dashboardDir, 'dashboard-data.json');
    fs.writeFileSync(dataFile, JSON.stringify(dashboardData, null, 2));
    
    console.log(`✅ Dashboard generated: ${dashboardFile}`);
    return dashboardFile;
  }

  generateHTML(data) {
    const latest = data.latest;
    const trends = data.trends;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Dashboard - Utópica</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .header h1 {
            font-size: 2rem;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .header .subtitle {
            color: #666;
            font-size: 1.1rem;
        }
        
        .status-indicator {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            margin-top: 12px;
        }
        
        .status-healthy {
            background: #d4edda;
            color: #155724;
        }
        
        .status-warning {
            background: #fff3cd;
            color: #856404;
        }
        
        .status-critical {
            background: #f8d7da;
            color: #721c24;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
            margin-bottom: 24px;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease;
        }
        
        .card:hover {
            transform: translateY(-4px);
        }
        
        .card h3 {
            font-size: 1.2rem;
            margin-bottom: 16px;
            color: #333;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .metric {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .metric:last-child {
            border-bottom: none;
        }
        
        .metric-label {
            font-weight: 500;
            color: #666;
        }
        
        .metric-value {
            font-weight: 700;
            font-size: 1.1rem;
        }
        
        .score-circle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            font-weight: 700;
            color: white;
            margin-left: 8px;
        }
        
        .score-excellent { background: #0cce6b; }
        .score-good { background: #ffa400; }
        .score-poor { background: #ff4e42; }
        
        .web-vitals {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }
        
        .vital {
            text-align: center;
            padding: 16px;
            background: #f8f9fa;
            border-radius: 12px;
        }
        
        .vital-label {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 4px;
        }
        
        .vital-value {
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .vital-good { color: #0cce6b; }
        .vital-needs-improvement { color: #ffa400; }
        .vital-poor { color: #ff4e42; }
        
        .chart-container {
            height: 300px;
            margin-top: 16px;
            background: #f8f9fa;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
        }
        
        .url-grid {
            display: grid;
            gap: 16px;
            margin-top: 16px;
        }
        
        .url-card {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 16px;
            border-left: 4px solid #667eea;
        }
        
        .url-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        
        .url-name {
            font-weight: 600;
            color: #333;
        }
        
        .url-priority {
            font-size: 0.8rem;
            padding: 4px 8px;
            border-radius: 12px;
            background: #667eea;
            color: white;
        }
        
        .url-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 12px;
        }
        
        .url-metric {
            text-align: center;
        }
        
        .url-metric-label {
            font-size: 0.8rem;
            color: #666;
            margin-bottom: 2px;
        }
        
        .url-metric-value {
            font-weight: 600;
        }
        
        .alerts-list {
            max-height: 300px;
            overflow-y: auto;
        }
        
        .alert {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 12px;
            margin-bottom: 8px;
            border-radius: 8px;
            font-size: 0.9rem;
        }
        
        .alert-critical {
            background: #fee;
            border-left: 4px solid #ff4e42;
        }
        
        .alert-warning {
            background: #fff9e6;
            border-left: 4px solid #ffa400;
        }
        
        .alert-icon {
            font-size: 1.2rem;
            margin-top: 2px;
        }
        
        .alert-content {
            flex: 1;
        }
        
        .alert-url {
            font-weight: 600;
            color: #333;
        }
        
        .alert-message {
            color: #666;
            margin-top: 4px;
        }
        
        .recommendations {
            margin-top: 16px;
        }
        
        .recommendation {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            border-left: 4px solid #667eea;
        }
        
        .recommendation-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
        }
        
        .recommendation-description {
            color: #666;
            margin-bottom: 12px;
        }
        
        .recommendation-actions {
            list-style: none;
        }
        
        .recommendation-actions li {
            padding: 4px 0;
            color: #555;
        }
        
        .recommendation-actions li:before {
            content: "→ ";
            color: #667eea;
            font-weight: bold;
        }
        
        .last-updated {
            text-align: center;
            color: #666;
            font-size: 0.9rem;
            margin-top: 24px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 12px;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 12px;
            }
            
            .grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }
            
            .header {
                padding: 16px;
            }
            
            .header h1 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Performance Dashboard</h1>
            <p class="subtitle">Real-time monitoring for Utópica website performance</p>
            ${this.generateStatusIndicator(data.status, latest)}
        </div>
        
        <div class="grid">
            ${this.generateOverviewCard(latest)}
            ${this.generateWebVitalsCard(latest)}
            ${this.generateScoresCard(latest)}
            ${this.generateTrendsCard(trends)}
        </div>
        
        <div class="grid">
            ${this.generateURLsCard(latest)}
            ${this.generateAlertsCard(latest)}
        </div>
        
        <div class="grid">
            ${this.generateRecommendationsCard(latest)}
        </div>
        
        <div class="last-updated">
            Last updated: ${latest ? new Date(latest.timestamp).toLocaleString() : 'Never'}
            <br>
            <small>Dashboard auto-refreshes every 5 minutes</small>
        </div>
    </div>
    
    <script>
        // Auto-refresh dashboard every 5 minutes
        setTimeout(() => {
            window.location.reload();
        }, 5 * 60 * 1000);
        
        // Add click handlers for interactive elements
        document.addEventListener('DOMContentLoaded', function() {
            // Add any interactive features here
            console.log('Performance Dashboard loaded');
        });
    </script>
</body>
</html>`;
  }

  generateStatusIndicator(status, latest) {
    const statusMap = {
      healthy: { icon: '🟢', text: 'All Systems Operational', class: 'status-healthy' },
      warning: { icon: '🟡', text: 'Performance Issues Detected', class: 'status-warning' },
      critical: { icon: '🔴', text: 'Critical Performance Issues', class: 'status-critical' },
      unknown: { icon: '⚪', text: 'Status Unknown', class: 'status-warning' }
    };

    const statusInfo = statusMap[status] || statusMap.unknown;
    
    return `
      <div class="status-indicator ${statusInfo.class}">
        <span>${statusInfo.icon}</span>
        <span>${statusInfo.text}</span>
        ${latest?.summary?.healthStatus ? `<small>(${latest.summary.healthStatus.summary})</small>` : ''}
      </div>
    `;
  }

  generateOverviewCard(latest) {
    if (!latest?.summary) {
      return `
        <div class="card">
          <h3>📊 Overview</h3>
          <p>No data available</p>
        </div>
      `;
    }

    const summary = latest.summary;
    
    return `
      <div class="card">
        <h3>📊 Overview</h3>
        <div class="metric">
          <span class="metric-label">URLs Monitored</span>
          <span class="metric-value">${summary.totalUrls || 0}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Successful Checks</span>
          <span class="metric-value">${summary.successfulUrls || 0}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Failed Checks</span>
          <span class="metric-value">${summary.failedUrls || 0}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Health Status</span>
          <span class="metric-value">${summary.healthStatus?.percentage || 0}%</span>
        </div>
        <div class="metric">
          <span class="metric-label">Active Alerts</span>
          <span class="metric-value">${latest.alerts?.length || 0}</span>
        </div>
      </div>
    `;
  }

  generateWebVitalsCard(latest) {
    if (!latest?.summary?.averageMetrics) {
      return `
        <div class="card">
          <h3>⚡ Core Web Vitals</h3>
          <p>No data available</p>
        </div>
      `;
    }

    const metrics = latest.summary.averageMetrics;
    
    const getVitalClass = (metric, value) => {
      const thresholds = {
        lcp: { good: 1500, poor: 2500 },
        fcp: { good: 1200, poor: 2000 },
        cls: { good: 0.1, poor: 0.25 },
        tbt: { good: 200, poor: 600 }
      };
      
      const threshold = thresholds[metric];
      if (!threshold) return 'vital-good';
      
      if (metric === 'cls') {
        return value <= threshold.good ? 'vital-good' : 
               value <= threshold.poor ? 'vital-needs-improvement' : 'vital-poor';
      } else {
        return value <= threshold.good ? 'vital-good' : 
               value <= threshold.poor ? 'vital-needs-improvement' : 'vital-poor';
      }
    };

    return `
      <div class="card">
        <h3>⚡ Core Web Vitals</h3>
        <div class="web-vitals">
          <div class="vital">
            <div class="vital-label">LCP</div>
            <div class="vital-value ${getVitalClass('lcp', metrics.lcp)}">${Math.round(metrics.lcp)}ms</div>
          </div>
          <div class="vital">
            <div class="vital-label">FCP</div>
            <div class="vital-value ${getVitalClass('fcp', metrics.fcp)}">${Math.round(metrics.fcp)}ms</div>
          </div>
          <div class="vital">
            <div class="vital-label">CLS</div>
            <div class="vital-value ${getVitalClass('cls', metrics.cls)}">${metrics.cls.toFixed(3)}</div>
          </div>
          <div class="vital">
            <div class="vital-label">TBT</div>
            <div class="vital-value ${getVitalClass('tbt', metrics.tbt)}">${Math.round(metrics.tbt)}ms</div>
          </div>
        </div>
      </div>
    `;
  }

  generateScoresCard(latest) {
    if (!latest?.summary?.averageScores) {
      return `
        <div class="card">
          <h3>🎯 Lighthouse Scores</h3>
          <p>No data available</p>
        </div>
      `;
    }

    const scores = latest.summary.averageScores;
    
    const getScoreClass = (score) => {
      return score >= 90 ? 'score-excellent' : score >= 50 ? 'score-good' : 'score-poor';
    };

    return `
      <div class="card">
        <h3>🎯 Lighthouse Scores</h3>
        <div class="metric">
          <span class="metric-label">Performance</span>
          <span class="score-circle ${getScoreClass(scores.performance)}">${scores.performance}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Accessibility</span>
          <span class="score-circle ${getScoreClass(scores.accessibility)}">${scores.accessibility}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Best Practices</span>
          <span class="score-circle ${getScoreClass(scores.bestPractices)}">${scores.bestPractices}</span>
        </div>
        <div class="metric">
          <span class="metric-label">SEO</span>
          <span class="score-circle ${getScoreClass(scores.seo)}">${scores.seo}</span>
        </div>
      </div>
    `;
  }

  generateTrendsCard(trends) {
    if (!trends?.trends) {
      return `
        <div class="card">
          <h3>📈 Performance Trends</h3>
          <div class="chart-container">
            <p>No trend data available<br><small>Collect more data points to see trends</small></p>
          </div>
        </div>
      `;
    }

    const trendData = trends.trends;
    
    const getTrendIndicator = (trend) => {
      if (!trend) return '➖';
      return trend.direction === 'improving' ? '📈' : '📉';
    };

    return `
      <div class="card">
        <h3>📈 Performance Trends</h3>
        <div class="metric">
          <span class="metric-label">Performance Score</span>
          <span class="metric-value">
            ${getTrendIndicator(trendData.performance)}
            ${trendData.performance?.change ? `${trendData.performance.change > 0 ? '+' : ''}${trendData.performance.change.toFixed(1)}` : 'N/A'}
          </span>
        </div>
        <div class="metric">
          <span class="metric-label">LCP</span>
          <span class="metric-value">
            ${getTrendIndicator(trendData.lcp)}
            ${trendData.lcp?.change ? `${trendData.lcp.change > 0 ? '+' : ''}${Math.round(trendData.lcp.change)}ms` : 'N/A'}
          </span>
        </div>
        <div class="metric">
          <span class="metric-label">CLS</span>
          <span class="metric-value">
            ${getTrendIndicator(trendData.cls)}
            ${trendData.cls?.change ? `${trendData.cls.change > 0 ? '+' : ''}${trendData.cls.change.toFixed(3)}` : 'N/A'}
          </span>
        </div>
        <div class="chart-container">
          <p>📊 Interactive charts coming soon</p>
        </div>
      </div>
    `;
  }

  generateURLsCard(latest) {
    if (!latest?.urls) {
      return `
        <div class="card">
          <h3>🌐 URL Performance</h3>
          <p>No URL data available</p>
        </div>
      `;
    }

    const urls = Object.entries(latest.urls);
    
    return `
      <div class="card">
        <h3>🌐 URL Performance</h3>
        <div class="url-grid">
          ${urls.map(([name, data]) => {
            if (data.error) {
              return `
                <div class="url-card">
                  <div class="url-header">
                    <span class="url-name">${name}</span>
                    <span class="url-priority">${data.priority || 'Unknown'}</span>
                  </div>
                  <p style="color: #ff4e42;">❌ ${data.error}</p>
                </div>
              `;
            }
            
            return `
              <div class="url-card">
                <div class="url-header">
                  <span class="url-name">${name}</span>
                  <span class="url-priority">${data.priority || 'Unknown'}</span>
                </div>
                <div class="url-metrics">
                  <div class="url-metric">
                    <div class="url-metric-label">Perf</div>
                    <div class="url-metric-value">${data.scores?.performance || 0}</div>
                  </div>
                  <div class="url-metric">
                    <div class="url-metric-label">A11y</div>
                    <div class="url-metric-value">${data.scores?.accessibility || 0}</div>
                  </div>
                  <div class="url-metric">
                    <div class="url-metric-label">LCP</div>
                    <div class="url-metric-value">${Math.round(data.metrics?.lcp || 0)}ms</div>
                  </div>
                  <div class="url-metric">
                    <div class="url-metric-label">CLS</div>
                    <div class="url-metric-value">${(data.metrics?.cls || 0).toFixed(3)}</div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  generateAlertsCard(latest) {
    const alerts = latest?.alerts || [];
    
    return `
      <div class="card">
        <h3>🚨 Active Alerts</h3>
        ${alerts.length === 0 ? 
          '<p style="color: #0cce6b; text-align: center; padding: 20px;">✅ No active alerts</p>' :
          `<div class="alerts-list">
            ${alerts.map(alert => `
              <div class="alert alert-${alert.level}">
                <span class="alert-icon">${alert.level === 'critical' ? '🔴' : '🟡'}</span>
                <div class="alert-content">
                  <div class="alert-url">${alert.url}</div>
                  <div class="alert-message">${alert.message}</div>
                </div>
              </div>
            `).join('')}
          </div>`
        }
      </div>
    `;
  }

  generateRecommendationsCard(latest) {
    const recommendations = latest?.recommendations || [];
    
    return `
      <div class="card">
        <h3>💡 Recommendations</h3>
        ${recommendations.length === 0 ? 
          '<p style="color: #0cce6b; text-align: center; padding: 20px;">✅ No recommendations at this time</p>' :
          `<div class="recommendations">
            ${recommendations.map(rec => `
              <div class="recommendation">
                <div class="recommendation-title">${rec.title}</div>
                <div class="recommendation-description">${rec.description}</div>
                <ul class="recommendation-actions">
                  ${rec.actions?.map(action => `<li>${action}</li>`).join('') || ''}
                </ul>
              </div>
            `).join('')}
          </div>`
        }
      </div>
    `;
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'generate';

  const dashboard = new PerformanceDashboard();

  switch (command) {
    case 'generate':
      const file = dashboard.generateDashboard();
      console.log(`Dashboard available at: file://${file}`);
      break;
      
    default:
      console.log(`
📊 Performance Dashboard Generator

Usage:
  node performance-dashboard.js [command]

Commands:
  generate     Generate HTML dashboard (default)

The dashboard will be created in the performance-dashboard/ directory.
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { PerformanceDashboard };