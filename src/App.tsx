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
import { getRoute } from './lib/nav';

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onNav = () => setRoute(getRoute());
    window.addEventListener('popstate', onNav);
    return () => window.removeEventListener('popstate', onNav);
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
