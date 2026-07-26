import { LegalSection } from '../components/LegalLayout';

const li = 'marker:text-lime-500';

export function Datenschutz() {
  return (
    <>
      <p className="text-sm leading-relaxed2 text-muted sm:text-[15px]">
        Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. In dieser
        Datenschutzerklärung informieren wir Sie darüber, welche Daten wir im Zusammenhang mit dem
        Besuch unserer Website sowie der Nutzung unserer Dienstleistungen bearbeiten.
      </p>
      <p className="text-sm leading-relaxed2 text-muted sm:text-[15px]">
        Die Bearbeitung personenbezogener Daten erfolgt nach den Bestimmungen des Schweizer
        Datenschutzgesetzes (DSG). Soweit anwendbar, berücksichtigen wir zudem die
        Datenschutz-Grundverordnung der Europäischen Union (DSGVO).
      </p>

      <LegalSection n={1} title="Verantwortliche Stelle">
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
          E-Mail:{' '}
          <a href="mailto:info@automaticly.ch" className="text-lime-500 hover:text-lime-400">
            info@automaticly.ch
          </a>
          <br />
          Telefon: +41 79 623 86 01
        </p>
        <p>
          Vertretungsberechtigte Personen:
          <br />
          Elia Jenzer
          <br />
          Noah Tercier
          <br />
          Lis Neziri
        </p>
      </LegalSection>

      <LegalSection n={2} title="Erhebung und Bearbeitung personenbezogener Daten">
        <p>
          Wir bearbeiten personenbezogene Daten, die Sie uns freiwillig zur Verfügung stellen oder die
          beim Besuch unserer Website technisch erhoben werden.
        </p>
        <p>Dazu gehören insbesondere:</p>
        <ul className={`list-disc space-y-1 pl-5 ${li}`}>
          <li>Name</li>
          <li>E-Mail-Adresse</li>
          <li>Telefonnummer</li>
          <li>Firmenname</li>
          <li>Inhalte Ihrer Anfragen</li>
          <li>Termininformationen</li>
          <li>IP-Adresse</li>
          <li>Browser- und Gerätedaten</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>weitere technische Informationen, die für den Betrieb der Website erforderlich sind</li>
        </ul>
        <p>
          Wir bearbeiten diese Daten ausschliesslich zur Bereitstellung unserer Dienstleistungen, zur
          Kommunikation mit Ihnen sowie zur Verbesserung unseres Angebots.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Kontaktaufnahme">
        <p>
          Wenn Sie mit uns Kontakt aufnehmen, bearbeiten wir die von Ihnen übermittelten Daten, um Ihre
          Anfrage zu beantworten oder ein Angebot zu erstellen.
        </p>
        <p>
          Die Kommunikation kann insbesondere per E-Mail oder im Rahmen eines vereinbarten
          Beratungsgesprächs erfolgen.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Terminbuchung">
        <p>Über unsere Website können Sie direkt einen Termin mit uns vereinbaren.</p>
        <p>
          Dabei bearbeiten wir die von Ihnen angegebenen personenbezogenen Daten, insbesondere Ihren
          Namen, Ihre E-Mail-Adresse, Ihre Telefonnummer (sofern angegeben) sowie weitere freiwillig
          übermittelte Informationen.
        </p>
        <p>
          Diese Daten verwenden wir ausschliesslich zur Planung, Durchführung und Nachbearbeitung des
          vereinbarten Termins.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Einsatz von KI-Systemen">
        <p>
          Automaticly entwickelt und implementiert individuelle KI-Lösungen, darunter Chatbots, Voice
          Agents und weitere Automatisierungssysteme.
        </p>
        <p>
          Wenn Sie unsere Demo-Anwendungen oder andere auf unserer Website bereitgestellte KI-Funktionen
          nutzen, können die von Ihnen eingegebenen Informationen verarbeitet werden, um Anfragen zu
          beantworten, Gespräche zu führen oder die gewünschte Funktion bereitzustellen.
        </p>
        <p>
          Je nach Projekt können hierfür externe KI-Dienstleister eingesetzt werden. Personenbezogene
          Daten werden dabei nur im erforderlichen Umfang verarbeitet.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Hosting und technische Bereitstellung">
        <p>Unsere Website wird über einen externen Hosting-Dienst betrieben.</p>
        <p>
          Beim Aufruf unserer Website werden aus technischen Gründen automatisch Informationen wie
          IP-Adresse, Browsertyp, Betriebssystem, Datum und Uhrzeit des Zugriffs sowie weitere technische
          Daten verarbeitet. Diese Informationen dienen ausschliesslich dem sicheren und stabilen Betrieb
          der Website.
        </p>
        <p>
          Sollte sich unser Hosting-Anbieter ändern, wird diese Datenschutzerklärung entsprechend
          angepasst.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Cookies">
        <p>
          Unsere Website verwendet Cookies, soweit dies für den Betrieb und die Benutzerfreundlichkeit
          erforderlich ist.
        </p>
        <p>
          Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und bestimmte
          Informationen enthalten.
        </p>
        <p>
          Sie können die Speicherung von Cookies jederzeit über die Einstellungen Ihres Browsers
          einschränken oder deaktivieren. Dies kann jedoch die Funktionalität einzelner Bereiche der
          Website beeinträchtigen.
        </p>
      </LegalSection>

      <LegalSection n={8} title="E-Mail-Kommunikation">
        <p>Unsere geschäftliche E-Mail-Kommunikation erfolgt über Microsoft 365.</p>
        <p>
          Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben ausschliesslich zur Bearbeitung Ihrer
          Anfrage sowie zur weiteren Kommunikation verwendet.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Weitergabe von Daten">
        <p>Eine Weitergabe personenbezogener Daten erfolgt nur, wenn</p>
        <ul className={`list-disc space-y-1 pl-5 ${li}`}>
          <li>dies zur Erbringung unserer Dienstleistungen erforderlich ist,</li>
          <li>wir gesetzlich dazu verpflichtet sind,</li>
          <li>oder Sie ausdrücklich eingewilligt haben.</li>
        </ul>
        <p>
          Für einzelne Dienstleistungen können externe Technologie- und Cloud-Anbieter eingesetzt werden.
          Dabei achten wir darauf, dass personenbezogene Daten nur im erforderlichen Umfang verarbeitet
          werden.
        </p>
        <p>
          Sofern Daten an Anbieter ausserhalb der Schweiz oder des Europäischen Wirtschaftsraums (EWR)
          übermittelt werden, stellen wir sicher, dass ein angemessenes Datenschutzniveau gewährleistet
          ist, beispielsweise durch Standardvertragsklauseln der EU-Kommission oder gleichwertige
          gesetzliche Massnahmen.
        </p>
      </LegalSection>

      <LegalSection n={10} title="Datensicherheit">
        <p>
          Wir treffen angemessene technische und organisatorische Massnahmen, um personenbezogene Daten
          vor Verlust, Missbrauch, unbefugtem Zugriff oder unzulässiger Bearbeitung zu schützen.
        </p>
        <p>
          Trotz aller Sicherheitsmassnahmen kann eine vollständige Sicherheit bei der Übertragung von
          Daten über das Internet nicht garantiert werden.
        </p>
      </LegalSection>

      <LegalSection n={11} title="Speicherdauer">
        <p>
          Personenbezogene Daten werden nur so lange gespeichert, wie dies zur Erfüllung des jeweiligen
          Zwecks oder aufgrund gesetzlicher Aufbewahrungspflichten erforderlich ist. Anschliessend werden
          die Daten gelöscht oder anonymisiert.
        </p>
      </LegalSection>

      <LegalSection n={12} title="Rechte betroffener Personen">
        <p>Sie haben im Rahmen der gesetzlichen Bestimmungen insbesondere das Recht,</p>
        <ul className={`list-disc space-y-1 pl-5 ${li}`}>
          <li>Auskunft über die zu Ihrer Person bearbeiteten Daten zu verlangen,</li>
          <li>unrichtige Daten berichtigen zu lassen,</li>
          <li>
            die Löschung Ihrer personenbezogenen Daten zu verlangen, soweit keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen,
          </li>
          <li>die Einschränkung der Bearbeitung zu verlangen,</li>
          <li>der Bearbeitung Ihrer Daten zu widersprechen, soweit dies gesetzlich vorgesehen ist.</li>
        </ul>
        <p>
          Anfragen können jederzeit an{' '}
          <a href="mailto:info@automaticly.ch" className="text-lime-500 hover:text-lime-400">
            info@automaticly.ch
          </a>{' '}
          gerichtet werden.
        </p>
        <p>
          Zudem haben Sie das Recht, bei der zuständigen Datenschutzaufsichtsbehörde Beschwerde
          einzureichen. In der Schweiz ist dies der Eidgenössische Datenschutz- und
          Öffentlichkeitsbeauftragte (EDÖB), erreichbar unter{' '}
          <a
            href="https://www.edoeb.admin.ch"
            target="_blank"
            rel="noreferrer"
            className="text-lime-500 hover:text-lime-400"
          >
            www.edoeb.admin.ch
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection n={13} title="Änderungen dieser Datenschutzerklärung">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen, insbesondere wenn
          gesetzliche Vorgaben geändert werden oder sich unsere Dienstleistungen weiterentwickeln. Es gilt
          jeweils die auf dieser Website veröffentlichte aktuelle Version.
        </p>
      </LegalSection>
    </>
  );
}
