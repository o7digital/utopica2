const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const urls = [
  'http://localhost:3000',
  'http://localhost:3000/sprint-claridad-comercial',
  'http://localhost:3000/equipo'
];

// Performance targets from Meridian plan
const PERFORMANCE_TARGETS = {
  lcp: 1500,    // < 1.5s
  fid: 100,     // < 100ms
  cls: 0.1,     // < 0.1
  ttfb: 300,    // < 300ms
  performance: 90, // Lighthouse performance score > 90
};

async function runLighthouseAudit() {
  const results = [];
  
  for (const url of urls) {
    console.log(`Running comprehensive Lighthouse audit for: ${url}`);
    
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'info',
      output: 'html',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };
    
    try {
      const runnerResult = await lighthouse(url, options);
      
      // Extract all scores
      const performanceScore = runnerResult.lhr.categories.performance.score * 100;
      const accessibilityScore = runnerResult.lhr.categories.accessibility.score * 100;
      const seoScore = runnerResult.lhr.categories.seo.score * 100;
      const bestPracticesScore = runnerResult.lhr.categories['best-practices'].score * 100;
      
      // Extract Web Vitals metrics
      const webVitals = extractWebVitals(runnerResult.lhr);
      
      console.log(`Performance Score: ${performanceScore.toFixed(1)}`);
      console.log(`Accessibility Score: ${accessibilityScore.toFixed(1)}`);
      console.log(`SEO Score: ${seoScore.toFixed(1)}`);
      console.log(`Best Practices Score: ${bestPracticesScore.toFixed(1)}`);
      console.log(`Web Vitals: LCP=${webVitals.lcp}ms, FID=${webVitals.fid}ms, CLS=${webVitals.cls}`);
      
      // Save detailed report
      const reportPath = path.join(__dirname, '..', 'lighthouse-reports');
      if (!fs.existsSync(reportPath)) {
        fs.mkdirSync(reportPath, { recursive: true });
      }
      
      const urlSlug = url.replace('http://localhost:3000', '').replace(/\//g, '-') || 'homepage';
      const reportFile = path.join(reportPath, `${urlSlug}-lighthouse-report.html`);
      fs.writeFileSync(reportFile, runnerResult.report);
      
      // Extract accessibility violations
      const accessibilityAudits = runnerResult.lhr.audits;
      const violations = [];
      
      for (const [auditId, audit] of Object.entries(accessibilityAudits)) {
        if (audit.score !== null && audit.score < 1 && audit.details) {
          violations.push({
            id: auditId,
            title: audit.title,
            description: audit.description,
            score: audit.score,
            details: audit.details
          });
        }
      }
      
      // Validate against performance targets
      const performanceValidation = validatePerformanceTargets(performanceScore, webVitals);
      
      results.push({
        url,
        performanceScore,
        accessibilityScore,
        seoScore,
        bestPracticesScore,
        webVitals,
        performanceValidation,
        violations,
        reportFile
      });
      
    } catch (error) {
      console.error(`Error running Lighthouse for ${url}:`, error);
      results.push({
        url,
        error: error.message
      });
    } finally {
      await chrome.kill();
    }
  }
  
  // Generate comprehensive summary report
  const validResults = results.filter(r => r.performanceScore);
  const summaryReport = {
    timestamp: new Date().toISOString(),
    targets: PERFORMANCE_TARGETS,
    results,
    summary: {
      totalUrls: urls.length,
      averagePerformanceScore: validResults.length > 0 ? validResults.reduce((sum, r) => sum + r.performanceScore, 0) / validResults.length : 0,
      averageAccessibilityScore: validResults.length > 0 ? validResults.reduce((sum, r) => sum + r.accessibilityScore, 0) / validResults.length : 0,
      averageSEOScore: validResults.length > 0 ? validResults.reduce((sum, r) => sum + r.seoScore, 0) / validResults.length : 0,
      averageBestPracticesScore: validResults.length > 0 ? validResults.reduce((sum, r) => sum + r.bestPracticesScore, 0) / validResults.length : 0,
      webVitalsCompliance: calculateWebVitalsCompliance(validResults),
      totalViolations: results.reduce((sum, r) => sum + (r.violations?.length || 0), 0),
      performanceTargetsMet: validResults.filter(r => r.performanceValidation?.overallPassed).length
    }
  };
  
  const summaryPath = path.join(__dirname, '..', 'accessibility-audit-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summaryReport, null, 2));
  
  console.log('\n=== COMPREHENSIVE LIGHTHOUSE AUDIT SUMMARY ===');
  console.log(`Average Performance Score: ${summaryReport.summary.averagePerformanceScore.toFixed(1)} (target: >${PERFORMANCE_TARGETS.performance})`);
  console.log(`Average Accessibility Score: ${summaryReport.summary.averageAccessibilityScore.toFixed(1)}`);
  console.log(`Average SEO Score: ${summaryReport.summary.averageSEOScore.toFixed(1)}`);
  console.log(`Average Best Practices Score: ${summaryReport.summary.averageBestPracticesScore.toFixed(1)}`);
  console.log(`Web Vitals Compliance: ${summaryReport.summary.webVitalsCompliance.toFixed(1)}%`);
  console.log(`Performance Targets Met: ${summaryReport.summary.performanceTargetsMet}/${summaryReport.summary.totalUrls} pages`);
  console.log(`Total Violations: ${summaryReport.summary.totalViolations}`);
  console.log(`Report saved to: ${summaryPath}`);
  
  return summaryReport;
}

// Helper functions
function extractWebVitals(lhr) {
  const audits = lhr.audits;
  
  return {
    lcp: audits['largest-contentful-paint']?.numericValue || 0,
    fid: audits['max-potential-fid']?.numericValue || 0, // Approximate FID
    cls: audits['cumulative-layout-shift']?.numericValue || 0,
    ttfb: audits['server-response-time']?.numericValue || 0,
    fcp: audits['first-contentful-paint']?.numericValue || 0,
    si: audits['speed-index']?.numericValue || 0,
    tbt: audits['total-blocking-time']?.numericValue || 0
  };
}

function validatePerformanceTargets(performanceScore, webVitals) {
  const validation = {
    performanceScore: {
      value: performanceScore,
      target: PERFORMANCE_TARGETS.performance,
      passed: performanceScore >= PERFORMANCE_TARGETS.performance
    },
    lcp: {
      value: webVitals.lcp,
      target: PERFORMANCE_TARGETS.lcp,
      passed: webVitals.lcp <= PERFORMANCE_TARGETS.lcp
    },
    fid: {
      value: webVitals.fid,
      target: PERFORMANCE_TARGETS.fid,
      passed: webVitals.fid <= PERFORMANCE_TARGETS.fid
    },
    cls: {
      value: webVitals.cls,
      target: PERFORMANCE_TARGETS.cls,
      passed: webVitals.cls <= PERFORMANCE_TARGETS.cls
    },
    ttfb: {
      value: webVitals.ttfb,
      target: PERFORMANCE_TARGETS.ttfb,
      passed: webVitals.ttfb <= PERFORMANCE_TARGETS.ttfb
    }
  };

  // Calculate overall pass rate
  const totalChecks = Object.keys(validation).length;
  const passedChecks = Object.values(validation).filter(check => check.passed).length;
  validation.overallPassed = passedChecks === totalChecks;
  validation.passRate = (passedChecks / totalChecks) * 100;

  return validation;
}

function calculateWebVitalsCompliance(results) {
  if (results.length === 0) return 0;
  
  const totalPages = results.length;
  const compliantPages = results.filter(result => {
    if (!result.webVitals || !result.performanceValidation) return false;
    
    const { lcp, cls, ttfb } = result.performanceValidation;
    return lcp.passed && cls.passed && ttfb.passed;
  }).length;
  
  return (compliantPages / totalPages) * 100;
}

if (require.main === module) {
  runLighthouseAudit().catch(console.error);
}

module.exports = { 
  runLighthouseAudit, 
  extractWebVitals, 
  validatePerformanceTargets, 
  PERFORMANCE_TARGETS 
};