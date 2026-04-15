# ISR (Incremental Static Regeneration) Configuration

## Overview

This project uses Next.js 15's ISR to provide optimal performance while keeping content fresh. ISR allows pages to be statically generated at build time and updated incrementally in the background.

## Configuration Summary

### Page Revalidation Intervals

| Page | Revalidation | Reason |
|------|--------------|--------|
| Homepage (`/`) | 6 hours (21600s) | Content changes occasionally |
| Sprint Page (`/sprint-claridad-comercial`) | 2 hours (7200s) | Pricing and availability updates |
| Team Page (`/equipo`) | 24 hours (86400s) | Static team information |
| Blog Pages (`/_blog`) | 4 hours (14400s) | New posts and updates |
| Workshops API (`/api/workshops`) | 5 minutes (300s) | Dynamic Trello data |

### Cache Headers Strategy

All pages use `stale-while-revalidate` to ensure:
- Instant page loads from cache
- Background updates for fresh content
- Graceful fallback during regeneration

## Implementation Details

### 1. Page-level ISR Configuration

Each page exports a `revalidate` constant:

```typescript
// Homepage
export const revalidate = 21600; // 6 hours

// Sprint page
export const revalidate = 7200; // 2 hours
```

### 2. Cache Utilities

The `lib/utils/cache.ts` provides:
- Predefined cache durations
- Cache tags for targeted invalidation
- Helper functions for consistent caching

### 3. On-demand Revalidation

Manual cache invalidation via `/api/revalidate`:

```bash
# Revalidate specific path
POST /api/revalidate?token=SECRET&path=/sprint-claridad-comercial

# Revalidate by tag
POST /api/revalidate?token=SECRET&tag=workshops

# Revalidate all main pages
POST /api/revalidate?token=SECRET
```

### 4. Middleware Integration

The middleware adds appropriate cache headers:
- Different TTL for different content types
- ISR identification headers
- Performance monitoring headers

## Environment Variables

Set these in your environment:

```env
REVALIDATE_TOKEN=your-secret-revalidation-token
```

## Monitoring ISR Performance

### Response Headers

Pages include monitoring headers:
- `X-ISR-Enabled`: Indicates ISR is active
- `X-ISR-Page`: Page type identifier
- `X-Cache-Status`: Cache hit/miss status
- `X-Timestamp`: Generation timestamp

### Cache Performance

Monitor these metrics:
- Cache hit ratio
- Page generation time
- Stale-while-revalidate effectiveness

## Best Practices

### 1. Revalidation Intervals

- **Static content**: 24+ hours
- **Semi-static content**: 2-6 hours
- **Dynamic content**: 5-30 minutes
- **Real-time content**: Use dynamic rendering

### 2. Cache Invalidation

- Use on-demand revalidation for immediate updates
- Implement webhook triggers from CMS/data sources
- Monitor invalidation frequency to avoid over-regeneration

### 3. Error Handling

- ISR includes automatic error recovery
- Stale content served during failures
- Background regeneration continues on error

## Integration with External Data

### Trello Integration

The workshops API fetches from Trello with ISR:
- 5-minute revalidation for fresh availability
- Cached responses for instant loading
- Mock data fallback in development

### Future CMS Integration

When adding a CMS:
1. Configure webhook endpoints
2. Use revalidation API for instant updates
3. Tag-based invalidation for efficient updates

## Performance Impact

### Benefits

- ⚡ Instant page loads (cached content)
- 🔄 Fresh content without sacrificing speed
- 📈 Improved Core Web Vitals
- 💰 Reduced server costs

### Trade-offs

- Slightly delayed content updates
- Build complexity
- Cache storage requirements

## Troubleshooting

### Common Issues

1. **Content not updating**: Check revalidation intervals
2. **Cache headers missing**: Verify middleware configuration
3. **Build failures**: Check ISR exports in pages

### Debug Commands

```bash
# Check ISR status
curl -H "Accept: application/json" https://your-domain.com/

# Test revalidation endpoint
curl -X POST "https://your-domain.com/api/revalidate?token=SECRET&path=/"

# Monitor cache headers
curl -I https://your-domain.com/
```

## Migration Notes

### From Static Generation

1. Add `revalidate` exports to pages
2. Update build process for ISR
3. Configure cache headers

### From Server-Side Rendering

1. Identify cacheable content
2. Implement ISR with appropriate intervals
3. Move dynamic content to client-side

## Next Steps

1. Monitor cache performance metrics
2. Adjust revalidation intervals based on usage
3. Implement webhook-based invalidation
4. Consider Redis for distributed caching