import { Analytics } from '@vercel/analytics/react';
import { analyticsAllowed } from '../utils/analytics';

export function VercelAnalytics() {
  if (!analyticsAllowed(window.location.hostname, window.location.pathname)) return null;
  return <Analytics mode="production" debug={false} beforeSend={event => {
    const url = new URL(event.url, window.location.origin);
    if (!analyticsAllowed(url.hostname, url.pathname)) return null;
    // Shared settings and free-form query parameters are not analytics dimensions.
    url.search = '';
    url.hash = '';
    return { ...event, url: url.toString() };
  }} />;
}
