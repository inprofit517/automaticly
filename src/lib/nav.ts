// Lightweight client-side navigation for a single-page site with a few legal
// sub-pages. Keeps the URL clean (no hash fragments): in-page links scroll
// smoothly, legal pages use real paths (/datenschutz, /impressum, /agb).

/** pushState doesn't fire popstate — dispatch it so the router re-renders. */
function notify() {
  window.dispatchEvent(new PopStateEvent('popstate'));
}

/** Navigate to a real path (e.g. '/', '/datenschutz') and scroll to top. */
export function navigate(path: string) {
  if (window.location.pathname !== path) {
    window.history.pushState(null, '', path);
    notify();
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/** Smoothly scroll to a section by id; navigates home first if on a sub-page. */
export function scrollToSection(id: string) {
  const doScroll = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (window.location.pathname !== '/') {
    window.history.pushState(null, '', '/');
    notify();
    setTimeout(doScroll, 60); // let the home page render first
  } else {
    doScroll();
  }
}

/** Current route from the path: 'home' | 'datenschutz' | 'impressum' | 'agb'. */
export function getRoute(): string {
  return window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home';
}
