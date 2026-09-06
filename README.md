# VITARO — Website (Konzept-Branch `vitaro-concept`)

Statische, mehrsprachige (EN/DE/ES) B2B-Website für **VITARO** — Design, Ausstattung, Personal und
Betrieb von Fitnessstudios in Hotels. Marke nach außen: **VITARO**. Rechtsträger (Impressum,
Verträge): **Vitaro Gym Solutions**. Kein Build-Prozess, kein Framework.

Preview (bewusst `noindex`, nicht die spätere Live-Domain):
https://gym7-fit.github.io/vitaro-concept-preview/

## Struktur

```
index.html              Startseite (Hero-Slideshow, KPIs, Problem, Betreiber-Kennzahlen, Konzept, Trainer, Gründer, Modelle)
leistungen.html         Die drei Leistungsbausteine
partnerschaft.html      Founding-Partner-Programm, Modelle + Preisblöcke, Spezifika, Umsatzlogik, Onepager, Ablauf, FAQ
kontakt.html            Qualifiziertes Anfrageformular (Formspree) + Terminbuchung
impressum.html          Impressum (§ 5 DDG) — Platzhalter, siehe Launch-Checkliste
datenschutz.html        Datenschutzerklärung (DSGVO)
404.html                Fehlerseite

assets/css/style.css    Gesamtes Styling (Design-Tokens in :root / [data-theme="dark"])
assets/js/main.js       SITE CONFIG (oben!), Hero-Slideshow, Theme, mobiles Menü, FAQ, Formular-Versand
assets/js/i18n.js       Übersetzungen EN/DE/ES (identische Key-Sets) + Sprachlogik
assets/js/consent.js    Zwei-Klick-Karte + Hinweisbanner
assets/media/           Fotos (KI-generiert, Konzeptvisuals — keine realen Standorte)
assets/downloads/       Onepager-PDFs (EN/DE/ES), generiert aus docs/one-pager/*.md
docs/one-pager/         Markdown-Quellen der PDFs
docs/claude-code-brief.md  Historischer Projektbrief (GYM 7 / Netlify), nicht mehr gepflegt
sitemap.xml, robots.txt Für den Go-live; die Preview-Pipeline strippt sitemap.xml und setzt robots.txt auf Disallow
```

## Lokal testen

```bash
python3 -m http.server 8765
```

Dann `http://localhost:8765` öffnen (ein lokaler Server ist nötig — `file://` verhält sich bei localStorage anders).

## Konfiguration (eine Stelle: Anfang von `assets/js/main.js`)

| Konstante | Wirkung, solange leer | Sobald gesetzt |
|---|---|---|
| `FORMSPREE_ENDPOINT` | Formular zeigt beim Absenden „noch nicht freigeschaltet" | Versand per fetch/JSON an `https://formspree.io/f/<id>` |
| `BOOKING_URL` | Alle Buchungs-CTAs führen zum Formular; Buchungs-Button auf kontakt.html verborgen | CTAs öffnen Cal.com/Calendly in neuem Tab |
| `CONTACT_EMAIL` | E-Mail-Button verborgen, Hinweis „folgt" sichtbar | `mailto:`-Button mit echter Adresse |

Formspree-Dashboard: Formular anlegen, **reCAPTCHA deaktivieren** (JSON-Versand kann es nicht
rendern), E-Mail-Benachrichtigung setzen. Free-Tier: 50 Einsendungen/Monat.

## Regeln bei Änderungen

1. **i18n-Parität:** Jeder neue Text in **en, de und es** (`assets/js/i18n.js`). Strings werden per
   `textContent` gesetzt → kein HTML in Werten. Prüfen (Browser-Konsole oder gstack `browse js`):
   ```js
   ['de','es'].map(l=>Object.keys(translations.en).filter(k=>!(k in translations[l])))  // → [[],[]]
   ```
2. **Cache-Busting:** Bei Änderungen an CSS/JS die `?v=`-Nummer in **allen 7 HTML-Dateien** erhöhen
   (`style.css?v=`, `main.js?v=`, `i18n.js?v=`, `consent.js?v=`).
3. **Keine erfundenen Beweise:** keine Logos, Testimonials, Fallstudien, Partner- oder Hotelnamen ohne
   schriftliche Grundlage. Zahlen nur mit Quelle (`.source-note`). Keine eckigen Klammern im sichtbaren Text.
4. **Statistiken pro Seite nur einmal** (Hero-Band 74 % / 46 % / 1 · Problem 70 % / 30 % / $2.1T · Outcomes 80 % / 63 %).
5. **Onepager regenerieren**, wenn sich Inhalte ändern:
   ```bash
   P=~/.claude/skills/gstack/make-pdf/dist/pdf
   for l in en de es; do $P generate docs/one-pager/vitaro-one-pager.$l.md assets/downloads/vitaro-one-pager-$l.pdf; done
   ```

## Deploy (Preview auf GitHub Pages)

```bash
git add -A && git commit -m "…" && git push origin vitaro-concept
rm -rf /tmp/vitaro-clean-deploy && mkdir -p /tmp/vitaro-clean-deploy
git archive vitaro-concept | tar -x -C /tmp/vitaro-clean-deploy && cd /tmp/vitaro-clean-deploy
printf 'User-agent: *\nDisallow: /\n' > robots.txt && rm -f sitemap.xml
for f in *.html; do grep -q 'name="robots"' "$f" || perl -0pi -e 's/(<meta charset="UTF-8">)/$1\n<meta name="robots" content="noindex, nofollow">/' "$f"; done
git init -q && git config user.name "Vitaro Concept" && git config user.email "noreply@vitaro-concept.example"
git add -A && git commit -q -m "Vitaro concept preview - update $(date +%Y-%m-%d)"
git remote add origin https://github.com/gym7-fit/vitaro-concept-preview.git && git push --force origin HEAD:main
```

Die Preview-Repo-Historie ist bewusst ein einzelner Commit ohne persönliche Git-Identität.

## Noch offen (vom Inhaber zu liefern)

Formspree-ID · echtes Postfach · Buchungs-URL (Cal.com/Calendly) · Preisspannen je Modell
(Full-Service €/Monat, Revenue Share %, Hybrid) · Mindestlaufzeit / Kündigungsfrist / Ausstiegsklausel ·
Flächenbedarf (m²) · Wochen bis Eröffnung · Trainer-Präsenz (Tage/Stunden) · Versicherungsart und
Haftungsteilung · Gründer: Nachname, Foto, Abschluss/Institution, Lizenzen · Berater/Partner (nur mit
schriftlichem OK) · Konzept-Grundriss · Beispielrechnungs-Annahmen · Anzahl Founding-Partner-Plätze ·
Impressum-Felder (Rechtsform, Name, Anschrift, Telefon, E-Mail, ggf. Register/USt-ID).

Sobald Zahlen vorliegen: in `partnerschaft.html` die `.model-price`-Blöcke auf `data-state="live"`
setzen und die Spanne in das `<b>` eintragen; Onepager v2 erzeugen.

## Go-live-Checkliste (erst nach ausdrücklicher Freigabe)

1. Markenrecherche „VITARO" (DPMA, EUIPO, OEPM) **vor** Veröffentlichung unter eigener Domain.
2. Domain + DNS → GitHub Pages Custom Domain, HTTPS erzwingen.
3. `vitaro-concept.example` in canonical/og/ld+json aller Seiten und `vitaro.example` in `sitemap.xml` → echte Domain.
4. `noindex`-Schritt aus der Deploy-Pipeline entfernen, permissive `robots.txt` + `sitemap.xml` ausliefern.
5. Impressum/Datenschutz vollständig und fachlich geprüft (deutscher Sitz, Betrieb in Spanien).
6. Formspree-Limit beobachten; Buchungsseite im VITARO-Branding; Onepager v2 mit Spannen und Domain.

## Rechtliche Hinweise (kein Ersatz für Rechtsberatung)

Impressum und Datenschutzerklärung wurden nach bestem Wissen erstellt und müssen vor dem Go-live
geprüft werden. Alle Fotos sind KI-generierte Konzeptvisuals; kein Bild zeigt einen realen VITARO-Standort.
