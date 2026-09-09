const routes = ['/unit-converter', '/', '/word-counter', '/currency-converter', '/pixel-art', '/pdf-converter', '/world-clock', '/image-editor'];
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
