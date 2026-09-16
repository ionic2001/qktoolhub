import { guidePaths } from '../guides/guideContent';
const routes = ['/unit-converter', '/', '/word-counter', '/currency-converter', '/pixel-art', '/pdf-converter', '/image-to-pdf', '/pdf-tools', '/pdf-merge', '/pdf-split', '/pdf-organize', '/pdf-to-png', '/world-clock', '/calendar', '/image-editor', '/about', '/terms', '/privacy', ...guidePaths];
export function analyticsAllowed(host: string, path: string) {
  return ['qktoolhub.com', 'www.qktoolhub.com'].includes(host) && routes.includes(path);
}
type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };
export function track(event: string, params: Record<string, string | number> = {}) {
  if (!analyticsAllowed(location.hostname, location.pathname)) return;
  (window as AnalyticsWindow).gtag?.('event', event, {
    tool_id: location.pathname.slice(1) || 'home',
    ui_language: document.documentElement.lang,
    ...params,
  });
}
