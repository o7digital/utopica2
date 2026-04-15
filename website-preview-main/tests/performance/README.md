# Performance Testing Framework

This comprehensive performance testing framework validates all optimizations implemented in the Meridian Plan Phase 6. It provides automated testing for Web Vitals, ISR behavior, cache performance, error boundaries, and API performance.

## Overview

The framework consists of multiple test suites designed to validate the performance targets defined in the Meridian Plan:

- **LCP**: < 1.5s (currently ~2.5s)
- **FID**: < 100ms (currently ~150ms)  
- **CLS**: < 0.1 (currently ~0.15)
- **TTFB**: < 300ms (currently ~800ms)
- **Cache hit ratio**: > 85%
- **Error recovery rate**: > 95%

## Test Suites

### 1. Web Vitals Tests (`web-vitals-tests.spec.ts`)

Tests Core Web Vitals metrics across all critical pages:

- **Largest Contentful Paint (LCP)**: Measures loading performance
- **First Input Delay (FID)**: Measures interactivity  
- **Cumulative Layout Shift (CLS)**: Measures visual stability
- **Time to First Byte (TTFB)**: Measures server response time
- **First Contentful Paint (FCP)**: Measures perceived loading
- **Interaction to Next Paint (INP)**: Measures responsiveness

```bash
# Run Web Vitals tests
npm run test:performance:web-vitals
```

### 2. ISR Tests (`isr-tests.spec.ts`)

Validates Incremental Static Regeneration behavior:

- Cache hit ratio validation (>85%)
- Revalidation behavior testing
- Stale-while-revalidate functionality
- Error handling during regeneration
- Cache warming effectiveness
- Regeneration interval compliance

```bash
# Run ISR tests
npm run test:performance:isr
```

### 3. Cache Tests (`cache-tests.spec.ts`)

Tests caching behavior across the application:

- API cache hit ratio validation
- Cache invalidation behavior
- Static asset caching
- Browser cache behavior
- CDN cache performance
- Cache status endpoint validation

```bash
# Run cache tests
npm run test:performance:cache
```

### 4. Error Boundary Tests (`error-boundary-tests.spec.ts`)

Validates error handling and recovery:

- Component error boundary functionality
- API error handling
- Network failure recovery
- Memory leak prevention
- Error recovery rate validation (>95%)

```bash
# Run error boundary tests
npm run test:performance:errors
```

### 5. API Performance Tests (`api-performance-tests.spec.ts`)

Tests API performance under various conditions:

- Response time validation
- Load testing with concurrent users
- Stress testing
- Memory usage monitoring
- Error handling under load
- Rate limiting behavior
- Payload size optimization

```bash
# Run API performance tests
npm run test:performance:api
```

## Running Tests

### Individual Test Suites

```bash
# Run specific test suite
npm run test:performance:web-vitals
npm run test:performance:isr
npm run test:performance:cache
npm run test:performance:errors
npm run test:performance:api
```

### Load Testing

```bash
# Run load tests (high concurrency)
npm run test:performance:load
```

### Comprehensive Testing

```bash
# Run all performance tests with reporting
npm run test:performance
```

### Lighthouse Integration

```bash
# Run enhanced Lighthouse audit with performance targets
npm run lighthouse:performance
```

### Performance Validation

```bash
# Quick validation of key metrics
npm run performance:validate
```

## Configuration

Performance targets and test configuration are centralized in `performance.config.js`:

```javascript
const config = require('./performance.config.js');

// Access targets
console.log(config.targets.webVitals.lcp); // 1500ms

// Environment-specific config
const prodConfig = config.getConfig('production');
```

## Test Results and Reporting

### Automated Reports

Tests generate comprehensive reports in multiple formats:

- **JSON**: Machine-readable results for CI/CD
- **HTML**: Human-readable reports with visualizations
- **CSV**: Data export for analysis

Reports are saved to `./performance-reports/` with timestamps.

### Baseline Comparison

The framework maintains performance baselines for regression detection:

- `performance-baseline.json`: Web Vitals baselines
- `api-performance-baseline.json`: API performance baselines

### CI/CD Integration

GitHub Actions workflow (`.github/workflows/performance.yml`) provides:

- Automated testing on PRs and merges
- Daily performance monitoring
- Performance regression detection
- Artifact generation and retention
- PR comments with results

## Performance Targets Validation

Each test validates against specific targets:

### Web Vitals Targets
- ✅ LCP < 1.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1
- ✅ TTFB < 300ms

### Cache Performance Targets
- ✅ Hit ratio > 85%
- ✅ Response time < 500ms
- ✅ Invalidation working correctly

### Error Recovery Targets
- ✅ Recovery rate > 95%
- ✅ Recovery time < 5s
- ✅ Graceful degradation

### API Performance Targets
- ✅ Health endpoint < 100ms
- ✅ Workshop endpoint < 500ms
- ✅ Error rate < 5%
- ✅ Handle 50+ concurrent users

## Troubleshooting

### Common Issues

1. **Tests timing out**
   - Increase timeout in playwright.config.ts
   - Check server startup time
   - Verify network connectivity

2. **Cache tests failing**
   - Ensure cache warming is complete
   - Check cache invalidation API availability
   - Verify cache headers configuration

3. **Web Vitals not meeting targets**
   - Check for unoptimized images
   - Verify bundle sizes
   - Review server response times

### Debug Mode

Enable verbose logging:

```bash
DEBUG_PERFORMANCE=true npm run test:performance
```

### Performance Monitoring

For production monitoring, configure webhooks in `performance.config.js`:

```javascript
monitoring: {
  enabled: true,
  webhookUrl: process.env.PERFORMANCE_WEBHOOK_URL,
  alertThresholds: {
    lcp: 2000,
    errorRate: 0.05,
  }
}
```

## Best Practices

1. **Run tests regularly**: Use CI/CD automation for consistent monitoring
2. **Maintain baselines**: Update baselines after significant optimizations
3. **Monitor trends**: Track performance over time, not just snapshots
4. **Test realistic conditions**: Use appropriate load and network conditions
5. **Validate in production**: Combine synthetic testing with RUM data

## Integration with Meridian Plan

This framework validates the specific optimizations implemented in Phases 1-5:

- **Phase 1**: Error Boundaries → Error boundary tests
- **Phase 2**: Server Components → Web Vitals improvement
- **Phase 3**: ISR Implementation → ISR cache tests
- **Phase 4**: API Optimization → API performance tests
- **Phase 5**: Cache Warming → Cache behavior validation

## Contributing

When adding new performance tests:

1. Follow the existing test structure
2. Update performance.config.js with new targets
3. Add appropriate assertions for pass/fail criteria
4. Include baseline comparison when relevant
5. Update this documentation

## Support

For issues with the performance testing framework:

1. Check test logs and artifacts
2. Review configuration in performance.config.js
3. Validate test environment setup
4. Compare with baseline metrics
5. Create issue with detailed reproduction steps