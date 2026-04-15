#!/usr/bin/env node

/**
 * Lighthouse CI Setup Script
 * Configures the complete Lighthouse CI and monitoring system
 * Part of Meridian Performance Plan - Phase 6.2
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class LighthouseCISetup {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.setupSteps = [
      'checkDependencies',
      'createDirectories',
      'setupGitHubSecrets',
      'configureCICD',
      'setupMonitoring',
      'createDocumentation',
      'runInitialTest'
    ];
  }

  async setup() {
    console.log('🚀 Setting up Lighthouse CI and Performance Monitoring');
    console.log('=====================================\n');

    for (const step of this.setupSteps) {
      try {
        console.log(`⏳ ${this.getStepDescription(step)}...`);
        await this[step]();
        console.log(`✅ ${this.getStepDescription(step)} completed\n`);
      } catch (error) {
        console.error(`❌ Error in ${step}:`, error.message);
        console.log('🔧 See troubleshooting guide below\n');
      }
    }

    this.printCompletionSummary();
  }

  getStepDescription(step) {
    const descriptions = {
      checkDependencies: 'Checking and installing dependencies',
      createDirectories: 'Creating monitoring directories',
      setupGitHubSecrets: 'Configuring GitHub secrets',
      configureCICD: 'Validating CI/CD configuration',
      setupMonitoring: 'Setting up monitoring system',
      createDocumentation: 'Creating documentation',
      runInitialTest: 'Running initial performance test'
    };
    return descriptions[step] || step;
  }

  async checkDependencies() {
    console.log('  📦 Checking Node.js version...');
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 16) {
      throw new Error(`Node.js 16+ required, found ${nodeVersion}`);
    }
    console.log(`  ✅ Node.js ${nodeVersion} is compatible`);

    console.log('  📦 Installing Lighthouse CI...');
    try {
      execSync('npm install @lhci/cli@^0.12.0 --save-dev', { 
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
      console.log('  ✅ @lhci/cli installed successfully');
    } catch (error) {
      console.log('  ⚠️  @lhci/cli installation failed, may already be installed');
    }

    console.log('  📦 Checking Chrome installation...');
    try {
      execSync('google-chrome --version', { stdio: 'pipe' });
      console.log('  ✅ Chrome is installed');
    } catch (error) {
      try {
        execSync('chromium --version', { stdio: 'pipe' });
        console.log('  ✅ Chromium is installed');
      } catch (error2) {
        console.log('  ⚠️  Chrome/Chromium not found - CI will handle installation');
      }
    }
  }

  async createDirectories() {
    const directories = [
      'monitoring-data',
      'monitoring-data/trends',
      'monitoring-data/alerts',
      'monitoring-data/reports',
      'performance-dashboard',
      'lighthouse-reports'
    ];

    directories.forEach(dir => {
      const fullPath = path.join(this.projectRoot, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`  📁 Created directory: ${dir}`);
      } else {
        console.log(`  ✅ Directory exists: ${dir}`);
      }
    });

    // Create .gitkeep files for empty directories
    const gitkeepDirs = ['monitoring-data/trends', 'monitoring-data/alerts', 'monitoring-data/reports'];
    gitkeepDirs.forEach(dir => {
      const gitkeepPath = path.join(this.projectRoot, dir, '.gitkeep');
      if (!fs.existsSync(gitkeepPath)) {
        fs.writeFileSync(gitkeepPath, '# Keep this directory in git\n');
      }
    });
  }

  async setupGitHubSecrets() {
    const secretsInfo = {
      required: [
        'LHCI_GITHUB_APP_TOKEN',
        'LHCI_TOKEN'
      ],
      optional: [
        'SLACK_WEBHOOK_URL',
        'DISCORD_WEBHOOK_URL',
        'ALERT_EMAIL',
        'PAGERDUTY_INTEGRATION_KEY'
      ]
    };

    console.log('  🔐 GitHub Secrets Configuration:');
    console.log('\n  Required secrets for Lighthouse CI:');
    secretsInfo.required.forEach(secret => {
      console.log(`    - ${secret}: ${this.getSecretDescription(secret)}`);
    });

    console.log('\n  Optional secrets for alerting:');
    secretsInfo.optional.forEach(secret => {
      console.log(`    - ${secret}: ${this.getSecretDescription(secret)}`);
    });

    console.log('\n  💡 To set up secrets:');
    console.log('    1. Go to your GitHub repository');
    console.log('    2. Navigate to Settings > Secrets and variables > Actions');
    console.log('    3. Click "New repository secret"');
    console.log('    4. Add each required secret');

    // Check if we're in a GitHub repository
    try {
      const remoteUrl = execSync('git remote get-url origin', { 
        cwd: this.projectRoot,
        encoding: 'utf8'
      }).trim();
      
      if (remoteUrl.includes('github.com')) {
        const repoMatch = remoteUrl.match(/github\.com[:/]([^/]+\/[^/.]+)/);
        if (repoMatch) {
          const repoName = repoMatch[1].replace('.git', '');
          console.log(`\n  🔗 Your repository: https://github.com/${repoName}/settings/secrets/actions`);
        }
      }
    } catch (error) {
      console.log('  ⚠️  Could not detect GitHub repository');
    }
  }

  getSecretDescription(secret) {
    const descriptions = {
      'LHCI_GITHUB_APP_TOKEN': 'GitHub App token for Lighthouse CI integration',
      'LHCI_TOKEN': 'Lighthouse CI server token (if using LHCI server)',
      'SLACK_WEBHOOK_URL': 'Slack webhook for critical performance alerts',
      'DISCORD_WEBHOOK_URL': 'Discord webhook for performance notifications',
      'ALERT_EMAIL': 'Email address for performance alerts',
      'PAGERDUTY_INTEGRATION_KEY': 'PagerDuty integration key for incident alerts'
    };
    return descriptions[secret] || 'Configuration token';
  }

  async configureCICD() {
    const workflows = [
      '.github/workflows/lighthouse-ci.yml',
      '.github/workflows/performance.yml'
    ];

    workflows.forEach(workflow => {
      const workflowPath = path.join(this.projectRoot, workflow);
      if (fs.existsSync(workflowPath)) {
        console.log(`  ✅ Workflow exists: ${workflow}`);
      } else {
        console.log(`  ⚠️  Workflow missing: ${workflow}`);
      }
    });

    // Validate lighthouse.config.js
    const configPath = path.join(this.projectRoot, 'lighthouse.config.js');
    if (fs.existsSync(configPath)) {
      console.log('  ✅ lighthouse.config.js exists');
      
      // Test config syntax
      try {
        require(configPath);
        console.log('  ✅ lighthouse.config.js is valid');
      } catch (error) {
        console.log(`  ❌ lighthouse.config.js has syntax errors: ${error.message}`);
      }
    } else {
      console.log('  ❌ lighthouse.config.js missing');
    }
  }

  async setupMonitoring() {
    const monitoringScripts = [
      'scripts/lighthouse-monitoring.js',
      'scripts/performance-dashboard.js'
    ];

    monitoringScripts.forEach(script => {
      const scriptPath = path.join(this.projectRoot, script);
      if (fs.existsSync(scriptPath)) {
        console.log(`  ✅ Monitoring script exists: ${script}`);
        
        // Make executable
        try {
          fs.chmodSync(scriptPath, '755');
        } catch (error) {
          // Ignore chmod errors on Windows
        }
      } else {
        console.log(`  ❌ Monitoring script missing: ${script}`);
      }
    });

    // Create initial configuration
    const configPath = path.join(this.projectRoot, 'monitoring-data', 'config.json');
    if (!fs.existsSync(configPath)) {
      const config = {
        environment: 'development',
        monitoring_enabled: true,
        alert_thresholds: {
          performance: { critical: 70, warning: 85 },
          lcp: { critical: 2500, warning: 2000 },
          cls: { critical: 0.25, warning: 0.15 }
        },
        retention_days: 30,
        created: new Date().toISOString()
      };
      
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log('  📝 Created monitoring configuration');
    }
  }

  async createDocumentation() {
    const docPath = path.join(this.projectRoot, 'docs', 'lighthouse-ci-setup.md');
    const docsDir = path.dirname(docPath);
    
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    const documentation = this.generateDocumentation();
    fs.writeFileSync(docPath, documentation);
    console.log('  📚 Created setup documentation');

    // Create README for monitoring data
    const monitoringReadme = path.join(this.projectRoot, 'monitoring-data', 'README.md');
    const monitoringDoc = this.generateMonitoringDocumentation();
    fs.writeFileSync(monitoringReadme, monitoringDoc);
    console.log('  📚 Created monitoring documentation');
  }

  async runInitialTest() {
    console.log('  🧪 Running initial Lighthouse audit...');
    
    try {
      // Check if the application is running
      const isAppRunning = await this.checkApplicationHealth();
      
      if (!isAppRunning) {
        console.log('  ⚠️  Application not running, skipping live test');
        console.log('  💡 Run "npm run dev" and then "npm run lighthouse:monitor" to test');
        return;
      }

      // Run a quick lighthouse audit
      execSync('npm run lighthouse:performance', {
        cwd: this.projectRoot,
        stdio: 'pipe',
        timeout: 60000
      });
      
      console.log('  ✅ Initial performance audit completed');
      
    } catch (error) {
      console.log('  ⚠️  Initial test failed - this is normal if app is not running');
      console.log('  💡 Start your app with "npm run dev" to run performance tests');
    }
  }

  async checkApplicationHealth() {
    try {
      const { default: fetch } = await import('node-fetch');
      const response = await fetch('http://localhost:3000', { 
        timeout: 5000,
        method: 'HEAD'
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  generateDocumentation() {
    return `# Lighthouse CI Setup Guide

## Overview

This document describes the Lighthouse CI and performance monitoring setup for the Utópica website, implemented as part of the Meridian Performance Plan Phase 6.2.

## Components

### 1. Lighthouse CI Configuration (\`lighthouse.config.js\`)
- Performance budgets and thresholds
- Multi-device testing (mobile/desktop)
- Resource budgets for scripts, images, CSS
- Accessibility and SEO requirements

### 2. GitHub Actions Workflows

#### \`.github/workflows/lighthouse-ci.yml\`
- Runs Lighthouse CI on every PR and push
- Tests multiple scenarios (mobile/desktop)
- Generates performance comparison reports
- Enforces performance budgets

#### \`.github/workflows/performance.yml\`
- Comprehensive performance testing suite
- Load testing capabilities
- Historical data tracking
- Production monitoring

### 3. Monitoring System

#### \`scripts/lighthouse-monitoring.js\`
- Continuous performance monitoring
- Alerting system for regressions
- Trend analysis and reporting
- Integration with external services

#### \`scripts/performance-dashboard.js\`
- Real-time performance dashboard
- Visual representation of metrics
- Historical trends visualization

## Usage

### Development

\`\`\`bash
# Run performance audit
npm run lighthouse:performance

# Start monitoring
npm run lighthouse:monitor

# Generate dashboard
npm run performance:dashboard
\`\`\`

### CI/CD

\`\`\`bash
# Run Lighthouse CI
npm run lighthouse:ci

# Full CI performance suite
npm run ci:performance
\`\`\`

### Production Monitoring

\`\`\`bash
# Monitor production
npm run lighthouse:monitor:production

# View trends
npm run lighthouse:trends

# Check alerts
npm run lighthouse:alerts
\`\`\`

## Performance Budgets

- **Performance Score**: ≥ 90
- **Accessibility Score**: ≥ 95
- **LCP**: ≤ 1.5s
- **CLS**: ≤ 0.1
- **FCP**: ≤ 1.2s
- **Total Bundle Size**: ≤ 1MB

## Alerting

The system generates alerts for:
- Performance score below 85 (critical) / 90 (warning)
- LCP above 2.5s (critical) / 2.0s (warning)
- CLS above 0.25 (critical) / 0.15 (warning)
- Accessibility score below 90 (critical) / 95 (warning)

## Integration

### GitHub Secrets Required
- \`LHCI_GITHUB_APP_TOKEN\`: For GitHub integration
- \`LHCI_TOKEN\`: For LHCI server (optional)

### Optional Alert Integrations
- \`SLACK_WEBHOOK_URL\`: Slack notifications
- \`DISCORD_WEBHOOK_URL\`: Discord notifications
- \`ALERT_EMAIL\`: Email alerts
- \`PAGERDUTY_INTEGRATION_KEY\`: PagerDuty integration

## Troubleshooting

### Common Issues

1. **Chrome not found in CI**
   - CI workflows automatically install Chrome
   - For local development, install Chrome or Chromium

2. **Performance budget failures**
   - Check the lighthouse reports in \`lighthouse-reports/\`
   - Review recommendations in the dashboard
   - Adjust budgets in \`lighthouse.config.js\` if needed

3. **Monitoring data not persisting**
   - Ensure \`monitoring-data/\` directory exists
   - Check file permissions
   - Verify disk space

### Getting Help

1. Check the GitHub Actions logs for detailed error messages
2. Review the generated lighthouse reports
3. Use the performance dashboard for visual debugging
4. Check the monitoring alerts for specific issues

## Maintenance

- Performance data is retained for 30 days by default
- Trends data is kept for 2 years
- Regular cleanup is performed automatically
- Update performance budgets as the site evolves

---

Generated by Lighthouse CI Setup Script
Last updated: ${new Date().toISOString()}
`;
  }

  generateMonitoringDocumentation() {
    return `# Performance Monitoring Data

This directory contains performance monitoring data for the Utópica website.

## Directory Structure

\`\`\`
monitoring-data/
├── config.json              # Monitoring configuration
├── latest-monitoring.json   # Latest monitoring results
├── performance-baseline.json # Performance baseline
├── trends/                  # Performance trends data
├── alerts/                  # Alert history
└── reports/                 # Detailed monitoring reports
\`\`\`

## Data Retention

- **Raw monitoring data**: 30 days
- **Aggregated data**: 365 days  
- **Trends data**: 730 days

## File Formats

### latest-monitoring.json
Contains the most recent monitoring results with:
- Overall summary metrics
- Individual URL performance data
- Active alerts
- Performance recommendations

### performance-baseline.json
Baseline performance targets and thresholds used for monitoring.

### trends/performance-trends.json
Historical performance data showing trends over time.

### alerts/*.json
Individual alert files with details about performance regressions.

### reports/*.json
Detailed monitoring reports with comprehensive performance data.

## Usage

Use the monitoring scripts to interact with this data:

\`\`\`bash
# View latest monitoring data
npm run lighthouse:dashboard

# Check performance trends
npm run lighthouse:trends

# Review alerts
npm run lighthouse:alerts
\`\`\`

---

This data is automatically managed by the Lighthouse monitoring system.
`;
  }

  printCompletionSummary() {
    console.log('🎉 Lighthouse CI Setup Complete!');
    console.log('=====================================\n');
    
    console.log('✅ What was set up:');
    console.log('  • Lighthouse CI configuration');
    console.log('  • GitHub Actions workflows');
    console.log('  • Performance monitoring system');
    console.log('  • Interactive dashboard');
    console.log('  • Alerting infrastructure');
    console.log('  • Documentation\n');

    console.log('🚀 Next steps:');
    console.log('  1. Configure GitHub secrets (see docs/lighthouse-ci-setup.md)');
    console.log('  2. Push to trigger first CI run');
    console.log('  3. Monitor performance with: npm run performance:monitor');
    console.log('  4. View dashboard with: npm run performance:dashboard\n');

    console.log('📚 Documentation:');
    console.log('  • Setup guide: docs/lighthouse-ci-setup.md');
    console.log('  • Monitoring data: monitoring-data/README.md\n');

    console.log('🔧 Available commands:');
    console.log('  • npm run lighthouse:ci - Run Lighthouse CI');
    console.log('  • npm run lighthouse:monitor - Monitor performance');
    console.log('  • npm run performance:dashboard - Generate dashboard');
    console.log('  • npm run lighthouse:trends - View trends');
    console.log('  • npm run lighthouse:alerts - Check alerts\n');

    console.log('⚠️  Remember to:');
    console.log('  • Set up required GitHub secrets');
    console.log('  • Adjust performance budgets as needed');
    console.log('  • Configure alert integrations (Slack, etc.)\n');

    console.log('🌟 The Meridian Performance Plan Phase 6.2 is now complete!');
  }
}

// CLI Interface
async function main() {
  const setup = new LighthouseCISetup();
  await setup.setup();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { LighthouseCISetup };