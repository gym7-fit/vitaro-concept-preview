> **Historisch (GYM 7 / Netlify, August 2026).** Dieses Dokument ist der ursprüngliche Projektbrief und wird nicht mehr gepflegt. Aktueller Stand, Workflow und Launch-Checkliste: siehe `README.md` (Marke VITARO, Rechtsträger Vitaro Gym Solutions, Preview auf GitHub Pages).

# GYM 7 Website — Projektübergabe für Claude Code

## Projektkontext

GYM 7 ist ein geplantes Startup: Design, Ausstattung und Betrieb von Fitnessstudios in Hotels, inklusive fest bei GYM 7 angestelltem Personal Trainer vor Ort (kein Animateur, keine Zeitarbeit). Start auf Fuerteventura mit Pilotpartner Hotel Riu Palace Jandia, geplante Expansion über die Kanarischen Inseln hinaus in weitere Urlaubsregionen. Zielgruppe der Website: Hotelbesitzer und -betreiber (B2B), nicht Endkonsumenten.

## Ziel dieser Aufgabe

Die Website liegt aktuell als lose Dateien vor, die ich bisher manuell in Netlify Drop hochgeladen habe. Das soll jetzt automatisiert werden: Git-Repository einrichten, mit GitHub verbinden, und Netlify so umstellen, dass jeder `git push` automatisch live geht — ohne manuelles Drag & Drop.

## Aktueller Stand der Website

Eine responsive, mehrsprachige One-Page-Website (aktuell als einzelne HTML-Datei mit eingebettetem CSS/JS, kein Build-Prozess, kein Framework).

**Seitenstruktur (Problem → Lösung → CTA):**
1. Hero mit Video-Hintergrund, Headline, CTAs, Kennzahlen
2. Proof-Strip (aktueller Standort, Link zur Karte)
3. Problem-Sektion (warum Hotel-Fitnessräume meist schlecht sind, mit Statistiken)
4. Lösungs-Sektion (3 Schritte: Design & Einrichtung, Personalbesetzung, Betrieb)
5. Personal-Trainer-Differenzierung (mit Foto)
6. "Warum GYM 7" (Gründer-Statement)
7. "Get Started" (Partnerschaftsmodelle, eingebettete Google-Maps-Karte, Pilotpartnerschaft-CTA)
8. Footer / Kontakt

**Implementierte Features:**
- Mehrsprachigkeit EN/DE/ES über `data-i18n`-Attribute + zentrales JS-Übersetzungsobjekt; erkennt automatisch die Browsersprache, manuelle Auswahl im Menü überschreibt das dauerhaft (localStorage)
- Dark-/Lightmode: folgt standardmäßig der Systemeinstellung des Geräts (`prefers-color-scheme`), manueller Switch im Menü hat danach Vorrang (localStorage)
- Mobiles Hamburger-Menü (vollständiges Dropdown-Panel mit Navigation, Sprachauswahl, Theme-Switch, CTA)
- Hero-Hintergrundvideo (`gym7-hero.mp4`, komprimiert, ohne Ton, mit Poster-Bild), lädt bewusst nur ab einer Fensterbreite > 860px, um mobile Daten zu sparen; enthält einen Klick-Fallback, falls der Browser Autoplay blockiert
- Eingebettete Google-Maps-Karte (ohne API-Key) für den Pilotstandort
- Foto im Personal-Trainer-Bereich

## Dateien im Projekt

| Datei | Zweck |
|---|---|
| `index.html` | Identische Kopie von `gym7-website.html`, dient als Root-Datei für Hosting |
| `gym7-website.html` | Hauptquelle der Website (HTML + CSS + JS in einer Datei) |
| `gym7-hero.mp4` | Hero-Hintergrundvideo (Desktop/Tablet) |
| `gym7-hero-poster.jpg` | Standbild, das angezeigt wird, bevor das Video lädt |
| `gym7-trainer.jpg` | Foto im Personal-Trainer-Bereich |

**Wichtig:** `index.html` und `gym7-website.html` müssen bei jeder inhaltlichen Änderung synchron gehalten werden (aktuell identisch).

## Bekannte offene Punkte / TODOs

- **Gründer-Sektion:** Platzhaltertext, nur Vorname "Louis" genannt, kein Nachname, kein echtes Foto — muss vor dem echten Launch personalisiert werden
- **Partnerschaftsmodelle** (Full-Service-Lease / Revenue Share / Hybrid): bewusst ohne konkrete Zahlen beschrieben, da das Geschäftsmodell finanziell noch nicht final ausgearbeitet ist
- **Social-Media-Links** (Instagram/LinkedIn) im Footer sind Platzhalter (`href="#"`), da noch keine echten Profile existieren
- **Markenname "GYM 7" und Domain:** nur informelle Websuche ohne gefundene Konflikte, noch KEINE offizielle Marken-/Domainprüfung (spanisches Markenregister OEPM, DPMA/EUIPO) durchgeführt
- **Hero-Video:** ist ein KI-generiertes Video, kein echtes Filmmaterial vom tatsächlichen Studio (existiert noch nicht) — vor dem finalen Launch idealerweise durch echtes Material ersetzen

## Aktuelles Hosting

Netlify Drop (manuelles Hochladen der Dateien im Netlify-Dashboard unter "Deploys" bei jeder Änderung), aktuell erreichbar unter: `https://ubiquitous-sundae-3d59fd.netlify.app`

## Konkrete Aufgaben für Claude Code

1. Lokales Git-Repository für dieses Projekt einrichten (`git init`, sinnvolle `.gitignore`)
2. Bestehende Dateien ins Repo übernehmen. Rücksprache halten, ob eine sauberere Ordnerstruktur gewünscht ist (z. B. `index.html`, `/assets/css/style.css`, `/assets/js/main.js`, `/assets/media/`) — das ist eine Verbesserung, aber kein Muss; die aktuelle Single-File-Lösung funktioniert und sollte nicht ohne Rücksprache großflächig umgebaut werden
3. GitHub-Repository erstellen (oder mich anleiten, falls noch kein GitHub-Account/CLI-Zugang eingerichtet ist) und den Code dorthin pushen
4. In Netlify das bestehende Projekt von manuellem Drop auf Git-Integration umstellen ("Import from Git" / Repo verbinden), sodass jeder `git push` automatisch einen neuen Deploy auslöst
5. Build-Einstellungen für ein reines statisches Projekt prüfen (kein Build-Command nötig, Publish-Directory = Projekt-Root bzw. gewählter Ordner)
6. Am Ende kurz erklären, wie der Workflow für künftige Änderungen aussieht (lokal ändern → committen → pushen → automatisches Deployment), da ich noch nie mit Git/Terminal gearbeitet habe
