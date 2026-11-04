// Prefixes a site path with the base url and adds the trailing slash pages are served with ('/data' → '/data/').
export function url(path: string): string {
  const [pathname, hash] = path.split('#');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const slashed = pathname === '' || /\.[a-z0-9]+$/i.test(pathname) || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${base}${slashed || '/'}${hash === undefined ? '' : `#${hash}`}`;
}
