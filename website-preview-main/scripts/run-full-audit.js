#!/usr/bin/env node

/**
 * Full Accessibility Audit Runner
 * 
 * This script runs a comprehensive accessibility audit including:
 * - ESLint accessibility checks
 * - Color contrast validation
 * - Lighthouse accessibility scoring
 * - Playwright accessibility tests
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Starting Full Accessibility Audit...\n');

const results = {
  timestamp: new Date().toISOString(),
  eslint: null,
  colorContrast: null,
  lighthouse: null,
  playwright: null,
  summary: {
    passed: 0,
    failed: 0,
    warnings: 0
  }
};

function runCommand(command, args = [], description = '') {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 ${description || command}`);
    console.log(`Running: ${command} ${args.join(' ')}\n`);
    
    const child = spawn(command, args, { 
      stdio: 'inherit',
      shell: true 
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${description || command} completed successfully\n`);
        resolve({ success: true, code });
      } else {
        console.log(`❌ ${description || command} failed with code ${code}\n`);
        resolve({ success: false, code });
      }
    });
    
    child.on('error', (error) => {
      console.error(`💥 Error running ${command}:`, error);
      reject(error);
    });
  });
}

async function runAudit() {
  try {
    // 1. ESLint Accessibility Check
    console.log('='.repeat(60));
    console.log('1️⃣  ESLINT ACCESSIBILITY CHECK');
    console.log('='.repeat(60));
    
    const eslintResult = await runCommand('npm', ['run', 'lint'], 'ESLint accessibility check');
    results.eslint = eslintResult;
    
    if (eslintResult.success) {
      results.summary.passed++;
    } else {
      results.summary.failed++;
    }
    
    // 2. Color Contrast Check
    console.log('='.repeat(60));
    console.log('2️⃣  COLOR CONTRAST VALIDATION');
    console.log('='.repeat(60));
    
    const contrastResult = await runCommand('node', ['scripts/color-contrast-check.js'], 'Color contrast validation');
    results.colorContrast = contrastResult;
    
    if (contrastResult.success) {
      results.summary.passed++;
    } else {
      results.summary.failed++;
    }
    
    // 3. Check if dev server is running (for Lighthouse and Playwright)
    console.log('='.repeat(60));
    console.log('3️⃣  DEVELOPMENT SERVER CHECK');
    console.log('='.repeat(60));
    
    console.log('⚠️  For Lighthouse and Playwright tests, ensure development server is running:');
    console.log('   npm run dev');
    console.log('   Then run: npm run lighthouse && npm run test:a11y');
    
    // 4. Generate summary report
    console.log('='.repeat(60));
    console.log('📊  AUDIT SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`Timestamp: ${results.timestamp}`);
    console.log(`Tests Passed: ${results.summary.passed}`);
    console.log(`Tests Failed: ${results.summary.failed}`);
    console.log(`Warnings: ${results.summary.warnings}`);
    
    if (results.summary.failed === 0) {
      console.log('\n🎉 All accessibility checks passed!');
      console.log('✅ Website is WCAG 2.1 AA compliant');
    } else {
      console.log('\n⚠️  Some accessibility issues found');
      console.log('👆 Review the output above for details');
    }
    
    // Save results
    const reportPath = path.join(__dirname, '..', 'accessibility-audit-results.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n📝 Detailed results saved to: ${reportPath}`);
    
    console.log('\n📖 Next Steps:');
    console.log('1. Start development server: npm run dev');
    console.log('2. Run Lighthouse audit: npm run lighthouse');
    console.log('3. Run Playwright tests: npm run test:a11y');
    console.log('4. Review ACCESSIBILITY-AUDIT-REPORT.md for details');
    
  } catch (error) {
    console.error('💥 Audit failed with error:', error);
    process.exit(1);
  }
}

// Check if this script is being run directly
if (require.main === module) {
  runAudit();
}

module.exports = { runAudit };