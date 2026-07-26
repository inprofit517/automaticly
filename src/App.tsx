import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Audience } from './components/Audience';
import { Solutions } from './components/Solutions';
import { Process } from './components/Process';
import { Why } from './components/Why';
import { Team } from './components/Team';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';
import { LegalLayout } from './components/LegalLayout';
import { Datenschutz } from './pages/Datenschutz';
import { Impressum } from './pages/Impressum';
import { AGB } from './pages/AGB';

/** Lightweight hash router: '#/datenschutz' → 'datenschutz', anything else → 'home'. */
function getRoute(): string {
  const h = window.location.hash;
  const seg = h.startsWith('#/') ? h.slice(2) : '';
  return seg || 'home';
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      const r = getRoute();
      setRoute(r);
      // On the landing page, honour in-page anchor links (#loesungen, #team, …).
      const h = window.location.hash;
      if (r === 'home' && h && !h.startsWith('#/') && h !== '#') {
        const el = document.getElementById(h.slice(1));
        if (el) {
          requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
          return;
        }
      }
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === 'datenschutz') {
    return (
      <LegalLayout title="Datenschutzerklärung" updated="Stand: 23. Juli 2026">
        <Datenschutz />
      </LegalLayout>
    );
  }

  if (route === 'impressum') {
    return (
      <LegalLayout title="Impressum">
        <Impressum />
      </LegalLayout>
    );
  }

  if (route === 'agb') {
    return (
      <LegalLayout title="Allgemeine Geschäftsbedingungen (AGB)" updated="Stand: 23. Juli 2026">
        <AGB />
      </LegalLayout>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Audience />
        <Solutions />
        <Process />
        <Why />
        <Team />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
