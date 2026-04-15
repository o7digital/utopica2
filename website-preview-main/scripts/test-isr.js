#!/usr/bin/env node

const https = require('https');
const http = require('http');

// Configuration
const DOMAIN = process.env.DOMAIN || 'localhost:3000';
const PROTOCOL = DOMAIN.includes('localhost') ? 'http' : 'https';
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || 'your-secret-token';

// Test pages and their expected cache durations
const TEST_PAGES = [
  { path: '/', expectedMaxAge: 21600, name: 'Homepage' },
  { path: '/sprint-claridad-comercial', expectedMaxAge: 7200, name: 'Sprint Page' },
  { path: '/equipo', expectedMaxAge: 86400, name: 'Team Page' },
  { path: '/_blog', expectedMaxAge: 14400, name: 'Blog Page' },
  { path: '/api/workshops', expectedMaxAge: 300, name: 'Workshops API' }
];

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const requestModule = PROTOCOL === 'https' ? https : http;
    const url = `${PROTOCOL}://${DOMAIN}${path}`;
    
    log(`Testing: ${url}`, 'blue');
    
    requestModule.get(url, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        path
      });
    }).on('error', reject);
  });
}

function parseCacheControl(cacheControl) {
  if (!cacheControl) return {};
  
  const directives = {};
  cacheControl.split(',').forEach(directive => {
    const [key, value] = directive.trim().split('=');
    directives[key] = value ? parseInt(value) : true;
  });
  
  return directives;
}

function testRevalidationEndpoint() {
  return new Promise((resolve, reject) => {
    const requestModule = PROTOCOL === 'https' ? https : http;
    const url = `${PROTOCOL}://${DOMAIN}/api/revalidate?token=${REVALIDATE_TOKEN}`;
    
    log('\n--- Testing Revalidation Endpoint ---', 'bold');
    log(`Testing: ${url}`, 'blue');
    
    const postData = '';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = requestModule.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function testISRConfiguration() {
  log('🧪 ISR Configuration Test Suite', 'bold');
  log('=====================================\n', 'bold');
  
  let allTestsPassed = true;
  const results = [];
  
  // Test each page
  for (const testPage of TEST_PAGES) {
    try {
      const result = await makeRequest(testPage.path);
      const cacheControl = parseCacheControl(result.headers['cache-control']);
      const isrEnabled = result.headers['x-isr-enabled'];
      const isrPage = result.headers['x-isr-page'];
      
      const testResult = {
        name: testPage.name,
        path: testPage.path,
        statusCode: result.statusCode,
        cacheControl,
        isrEnabled,
        isrPage,
        passed: true,
        issues: []
      };
      
      // Test status code
      if (result.statusCode !== 200) {
        testResult.passed = false;
        testResult.issues.push(`Expected 200, got ${result.statusCode}`);
      }
      
      // Test cache headers
      if (!result.headers['cache-control']) {
        testResult.passed = false;
        testResult.issues.push('No Cache-Control header');
      }
      
      // Test max-age for non-API routes
      if (!testPage.path.startsWith('/api/') && cacheControl['max-age'] !== testPage.expectedMaxAge) {
        testResult.passed = false;
        testResult.issues.push(`Expected max-age=${testPage.expectedMaxAge}, got ${cacheControl['max-age']}`);
      }
      
      // Test ISR headers for pages (not API)
      if (!testPage.path.startsWith('/api/')) {
        if (!isrEnabled) {
          testResult.passed = false;
          testResult.issues.push('Missing X-ISR-Enabled header');
        }
      }
      
      // Test stale-while-revalidate
      if (!cacheControl['stale-while-revalidate']) {
        testResult.passed = false;
        testResult.issues.push('Missing stale-while-revalidate directive');
      }
      
      results.push(testResult);
      
      if (testResult.passed) {
        log(`✅ ${testResult.name}: PASSED`, 'green');
      } else {
        log(`❌ ${testResult.name}: FAILED`, 'red');
        testResult.issues.forEach(issue => {
          log(`   - ${issue}`, 'red');
        });
        allTestsPassed = false;
      }
      
      // Log cache details
      if (result.headers['cache-control']) {
        log(`   Cache-Control: ${result.headers['cache-control']}`, 'yellow');
      }
      if (isrEnabled) {
        log(`   ISR: Enabled (${isrPage || 'unknown'})`, 'yellow');
      }
      
      log(''); // Empty line
      
    } catch (error) {
      log(`❌ ${testPage.name}: ERROR - ${error.message}`, 'red');
      allTestsPassed = false;
    }
  }
  
  // Test revalidation endpoint
  try {
    log('--- Testing Revalidation Endpoint ---', 'bold');
    const revalidationResult = await testRevalidationEndpoint();
    
    if (revalidationResult.statusCode === 200) {
      log('✅ Revalidation endpoint: ACCESSIBLE', 'green');
      try {
        const body = JSON.parse(revalidationResult.body);
        log(`   Response: ${body.message}`, 'yellow');
      } catch (e) {
        log('   Response: Not JSON format', 'yellow');
      }
    } else {
      log(`❌ Revalidation endpoint: FAILED (${revalidationResult.statusCode})`, 'red');
      allTestsPassed = false;
    }
  } catch (error) {
    log(`❌ Revalidation endpoint: ERROR - ${error.message}`, 'red');
    allTestsPassed = false;
  }
  
  // Summary
  log('\n=====================================', 'bold');
  if (allTestsPassed) {
    log('🎉 All ISR tests passed!', 'green');
    log('\nYour ISR configuration is working correctly:', 'green');
    log('- Pages have appropriate cache headers', 'green');
    log('- ISR is enabled for static pages', 'green');
    log('- Revalidation endpoint is accessible', 'green');
  } else {
    log('❌ Some ISR tests failed!', 'red');
    log('\nPlease review the issues above and fix the configuration.', 'red');
  }
  
  return allTestsPassed;
}

// Run tests if this script is executed directly
if (require.main === module) {
  testISRConfiguration()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      log(`Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = { testISRConfiguration };