# Performance Monitoring Data

This directory contains performance monitoring data for the Utópica website.

## Directory Structure

```
monitoring-data/
├── config.json              # Monitoring configuration
├── latest-monitoring.json   # Latest monitoring results
├── performance-baseline.json # Performance baseline
├── trends/                  # Performance trends data
├── alerts/                  # Alert history
└── reports/                 # Detailed monitoring reports
```

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

```bash
# View latest monitoring data
npm run lighthouse:dashboard

# Check performance trends
npm run lighthouse:trends

# Review alerts
npm run lighthouse:alerts
```

---

This data is automatically managed by the Lighthouse monitoring system.
