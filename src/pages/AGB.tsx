import { LegalSection } from '../components/LegalLayout';

const li = 'list-disc space-y-1 pl-5 marker:text-lime-500';

export function AGB() {
  return (
    <>
      <LegalSection n={1} title="Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Geschäftsbeziehung zwischen der
          Automaticly KLG (nachfolgend «Automaticly») und ihren Kundinnen und Kunden.
        </p>
        <p>
          Sie gelten für sämtliche Dienstleistungen, Angebote und Verträge von Automaticly, sofern nicht
          ausdrücklich schriftlich etwas anderes vereinbart wurde.
        </p>
        <p>
          Mit der Annahme einer Offerte oder der Inanspruchnahme einer Dienstleistung gelten diese AGB
          als akzeptiert.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Dienstleistungen">
        <p>
          Automaticly entwickelt, implementiert und betreibt individuelle KI- und Automatisierungslösungen
          für Unternehmen.
        </p>
        <p>Das Leistungsangebot umfasst insbesondere:</p>
        <ul className={li}>
          <li>KI-Chatbots</li>
          <li>Voice Agents</li>
          <li>Prozessautomatisierungen</li>
          <li>Termin- und Buchungssysteme</li>
          <li>individuelle Softwareentwicklung</li>
          <li>Beratung und Konzeption</li>
          <li>Wartung und Support</li>
          <li>Service- und Abonnementleistungen</li>
        </ul>
        <p>
          Der konkrete Leistungsumfang ergibt sich aus der jeweiligen Offerte oder einer individuellen
          Vereinbarung.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Vertragsabschluss">
        <p>Ein Vertrag kommt zustande durch</p>
        <ul className={li}>
          <li>die schriftliche Annahme einer Offerte,</li>
          <li>die schriftliche Auftragsbestätigung durch Automaticly,</li>
          <li>oder den Beginn der Leistungserbringung.</li>
        </ul>
      </LegalSection>

      <LegalSection n={4} title="Preise und Zahlungsbedingungen">
        <p>
          Alle Preise verstehen sich in Schweizer Franken (CHF) exklusive der gesetzlichen Mehrwertsteuer
          (MWST), sofern nichts anderes vereinbart wurde.
        </p>
        <p>Rechnungen sind innerhalb von 30 Tagen ab Rechnungsdatum ohne Abzug zahlbar.</p>
        <p>
          Automaticly behält sich vor, bei Zahlungsverzug die Leistungserbringung bis zum vollständigen
          Zahlungseingang auszusetzen.
        </p>
        <p>Mahn- und Inkassokosten können dem Kunden weiterbelastet werden.</p>
      </LegalSection>

      <LegalSection n={5} title="Projektzahlungen">
        <p>
          Bei individuellen Entwicklungsprojekten ist Automaticly berechtigt, eine Anzahlung zu verlangen.
        </p>
        <p>
          Sofern nichts anderes vereinbart wurde, beträgt diese 50 % des vereinbarten Projektpreises.
        </p>
        <p>
          Die Restzahlung erfolgt nach Projektabschluss oder gemäss den vereinbarten Meilensteinen.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Mitwirkungspflichten des Kunden">
        <p>
          Der Kunde verpflichtet sich, sämtliche für die Leistungserbringung erforderlichen Informationen,
          Zugänge und Unterlagen rechtzeitig bereitzustellen.
        </p>
        <p>
          Verzögerungen, welche durch fehlende oder verspätete Mitwirkung entstehen, verlängern
          vereinbarte Fristen entsprechend.
        </p>
        <p>
          Mehrkosten, die aufgrund unvollständiger oder verspäteter Mitwirkung entstehen, können
          zusätzlich verrechnet werden.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Änderungen des Leistungsumfangs">
        <p>Änderungs- oder Erweiterungswünsche nach Vertragsabschluss gelten als Zusatzleistungen.</p>
        <p>
          Automaticly informiert den Kunden vorgängig über allfällige Auswirkungen auf Kosten, Termine und
          Projektumfang.
        </p>
        <p>Zusätzliche Leistungen werden nach Aufwand oder gemäss separater Offerte verrechnet.</p>
      </LegalSection>

      <LegalSection n={8} title="Abnahme der Leistungen">
        <p>
          Nach Fertigstellung eines Projekts informiert Automaticly den Kunden über die abgeschlossene
          Leistung.
        </p>
        <p>Der Kunde verpflichtet sich, die erbrachte Leistung innert 10 Kalendertagen zu prüfen.</p>
        <p>
          Werden innerhalb dieser Frist keine wesentlichen Mängel schriftlich gemeldet, gilt die Leistung
          als abgenommen.
        </p>
        <p>Nicht wesentliche Mängel berechtigen den Kunden nicht zur Verweigerung der Abnahme.</p>
      </LegalSection>

      <LegalSection n={9} title="Wartung und Abonnements">
        <p>
          Für Wartungs-, Support- oder Abonnementleistungen gelten die jeweils vereinbarten Konditionen.
        </p>
        <p>
          Sofern nichts anderes vereinbart wurde, verlängern sich wiederkehrende Leistungen automatisch um
          die vereinbarte Vertragsdauer.
        </p>
        <p>
          Die Kündigung hat schriftlich unter Einhaltung einer Frist von 30 Tagen auf das Ende der
          jeweiligen Vertragslaufzeit zu erfolgen.
        </p>
      </LegalSection>

      <LegalSection n={10} title="Geistiges Eigentum">
        <p>
          Sämtliche Konzepte, Software, Quellcodes, Designs, Dokumentationen sowie weitere
          Arbeitsergebnisse bleiben bis zur vollständigen Bezahlung Eigentum von Automaticly.
        </p>
        <p>
          Nach vollständiger Bezahlung erhält der Kunde die vereinbarten Nutzungsrechte gemäss Offerte oder
          Vertrag.
        </p>
        <p>
          Sofern nicht ausdrücklich schriftlich vereinbart, besteht kein Anspruch auf Herausgabe des
          Quellcodes.
        </p>
        <p>
          Open-Source-Komponenten sowie Software Dritter unterliegen den jeweiligen Lizenzbestimmungen.
        </p>
      </LegalSection>

      <LegalSection n={11} title="Drittanbieter">
        <p>
          Zur Erbringung der Dienstleistungen können Software, Cloud-Plattformen, APIs oder KI-Dienste
          externer Anbieter eingesetzt werden.
        </p>
        <p>
          Für deren Verfügbarkeit, Funktionsumfang, Preisänderungen oder Leistungsanpassungen übernimmt
          Automaticly keine Haftung.
        </p>
        <p>
          Es gelten ergänzend die jeweiligen Nutzungs- und Lizenzbedingungen der eingesetzten
          Drittanbieter.
        </p>
      </LegalSection>

      <LegalSection n={12} title="Einsatz von KI-Systemen">
        <p>
          Die von Automaticly entwickelten KI-Lösungen basieren auf modernen Technologien und können
          Inhalte automatisiert generieren.
        </p>
        <p>
          Automatisch erzeugte Ergebnisse können trotz sorgfältiger Entwicklung unvollständig, fehlerhaft
          oder situationsabhängig unzutreffend sein.
        </p>
        <p>
          Der Kunde verpflichtet sich, sämtliche durch KI-Systeme generierten Inhalte vor deren produktivem
          Einsatz eigenverantwortlich zu prüfen.
        </p>
        <p>
          Automaticly übernimmt keine Gewähr für die sachliche, rechtliche oder wirtschaftliche Richtigkeit
          automatisch erzeugter Inhalte.
        </p>
      </LegalSection>

      <LegalSection n={13} title="Haftung">
        <p>
          Automaticly haftet ausschliesslich für Schäden, die vorsätzlich oder grobfahrlässig verursacht
          wurden, soweit gesetzlich zulässig.
        </p>
        <p>
          Jegliche Haftung für indirekte Schäden, Folgeschäden, entgangenen Gewinn, Produktionsausfälle,
          Datenverluste oder sonstige Vermögensschäden wird ausgeschlossen.
        </p>
        <p>
          Ebenso übernimmt Automaticly keine Haftung für Ausfälle oder Störungen von Hosting-Anbietern,
          Cloud-Diensten, Internetverbindungen oder Drittplattformen.
        </p>
      </LegalSection>

      <LegalSection n={14} title="Verfügbarkeit">
        <p>Automaticly bemüht sich um eine möglichst hohe Verfügbarkeit der bereitgestellten Systeme.</p>
        <p>
          Eine jederzeit unterbruchsfreie oder fehlerfreie Verfügbarkeit kann jedoch nicht garantiert
          werden.
        </p>
        <p>
          Wartungsarbeiten, Sicherheitsupdates oder technische Störungen können zu vorübergehenden
          Einschränkungen führen.
        </p>
      </LegalSection>

      <LegalSection n={15} title="Datenschutz und Vertraulichkeit">
        <p>
          Automaticly behandelt sämtliche im Rahmen der Zusammenarbeit erhaltenen vertraulichen
          Informationen sorgfältig und ausschliesslich zum Zweck der Vertragserfüllung.
        </p>
        <p>
          Die Bearbeitung personenbezogener Daten erfolgt gemäss der jeweils gültigen{' '}
          <a href="#/datenschutz" className="text-lime-500 hover:text-lime-400">
            Datenschutzerklärung
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection n={16} title="Referenzen">
        <p>
          Automaticly ist berechtigt, abgeschlossene Projekte als Referenz zu verwenden und den Kunden mit
          Firmenname sowie Firmenlogo auf der eigenen Website oder in Marketingunterlagen zu erwähnen.
        </p>
        <p>Vertrauliche Informationen werden dabei nicht veröffentlicht.</p>
        <p>Der Kunde kann dieser Nutzung jederzeit schriftlich widersprechen.</p>
      </LegalSection>

      <LegalSection n={17} title="Höhere Gewalt">
        <p>
          Automaticly haftet nicht für Verzögerungen oder Leistungsausfälle, die durch Ereignisse
          ausserhalb ihres Einflussbereichs verursacht werden.
        </p>
        <p>
          Hierzu zählen insbesondere Naturereignisse, Stromausfälle, Cyberangriffe, behördliche
          Anordnungen, Pandemien sowie Ausfälle von Hosting-, Cloud- oder KI-Dienstleistern.
        </p>
      </LegalSection>

      <LegalSection n={18} title="Änderungen der AGB">
        <p>Automaticly behält sich das Recht vor, diese AGB jederzeit anzupassen.</p>
        <p>
          Für bestehende Vertragsverhältnisse gelten die zum Zeitpunkt des Vertragsabschlusses gültigen
          AGB, sofern keine anderslautende Vereinbarung getroffen wurde.
        </p>
        <p>
          Bei laufenden Abonnements werden Änderungen mit einer Ankündigungsfrist von 30 Tagen per E-Mail
          mitgeteilt.
        </p>
      </LegalSection>

      <LegalSection n={19} title="Salvatorische Klausel">
        <p>
          Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam, undurchführbar oder
          nichtig sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
        <p>
          Anstelle der unwirksamen Bestimmung gilt eine Regelung als vereinbart, die dem wirtschaftlichen
          Zweck der ursprünglichen Bestimmung möglichst nahekommt. Dasselbe gilt für allfällige
          Regelungslücken.
        </p>
      </LegalSection>

      <LegalSection n={20} title="Anwendbares Recht und Gerichtsstand">
        <p>Es gilt ausschliesslich materielles Schweizer Recht.</p>
        <p>
          Gerichtsstand für sämtliche Streitigkeiten ist Bern, Schweiz, sofern keine zwingenden
          gesetzlichen Bestimmungen etwas anderes vorsehen.
        </p>
      </LegalSection>
    </>
  );
}
