import { LegalSection } from '../components/LegalLayout';

export function Impressum() {
  return (
    <>
      <p className="text-sm leading-relaxed2 text-muted sm:text-[15px]">
        Angaben gemäss den gesetzlichen Vorgaben zur Informationspflicht im elektronischen
        Geschäftsverkehr.
      </p>

      <LegalSection n={1} title="Verantwortlich / Betreiber">
        <p>
          Automaticly KLG
          <br />
          Bottigenstrasse 391
          <br />
          3020 Bern
          <br />
          Schweiz
        </p>
        <p>
          Unternehmens-Identifikationsnummer (UID): CHE-219.862.157
          <br />
          Handelsregisteramt des Kantons Bern
        </p>
      </LegalSection>

      <LegalSection n={2} title="Kontakt">
        <p>
          E-Mail:{' '}
          <a href="mailto:info@automaticly.ch" className="text-lime-500 hover:text-lime-400">
            info@automaticly.ch
          </a>
          <br />
          Telefon:{' '}
          <a href="tel:+41796238601" className="text-lime-500 hover:text-lime-400">
            +41 79 623 86 01
          </a>
        </p>
      </LegalSection>

      <LegalSection n={3} title="Vertretungsberechtigte Personen">
        <p>
          Elia Jenzer
          <br />
          Noah Tercier
          <br />
          Lis Neziri
        </p>
      </LegalSection>

      <LegalSection n={4} title="Haftung für Inhalte">
        <p>
          Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Für
          Inhalte externer Links, auf die wir verweisen, sind ausschliesslich deren Betreiber
          verantwortlich.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Urheberrecht">
        <p>
          Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem schweizerischen
          Urheberrecht. Jede Verwendung ausserhalb der Grenzen des Urheberrechts bedarf der vorherigen
          schriftlichen Zustimmung der Automaticly KLG.
        </p>
      </LegalSection>
    </>
  );
}
