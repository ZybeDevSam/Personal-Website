# CLAUDE.md — Samuel Belin Personal Website

Static personal site for Sam Belin (CS grad, University of Denver; Boulder, CO; artist and snowboard instructor). No build step, no framework, no package manager. Serve `public/` with any static server to preview. Deployed as static files (a Cloudflare analytics beacon is on the home page).

## Structure
Everything the website serves lives in `public/`, which is the deploy folder (Cloudflare build output directory: `public`, no build command). The repo root holds only docs and config (`README.md`, `CLAUDE.md`, `.gitignore`), which are not deployed. Put new pages and assets inside `public/`. Paths below are relative to `public/`.
```
index.html / index.css        Home page: hero, About + Projects, Contact (+ separate small-screen block)
Global/global.css             Theme variables, fonts, base styles, navbar, theme slider, .home-button
Global/snow.js                tsParticles snow, light/dark toggle (saved in localStorage "theme"), scroll sync for snow
Global/newsnow.js             Unused hand-rolled snow experiment (from Dev, Feb 2026); not linked by any page
art_section/art.html|css      Artwork gallery
snowboard_section/snowboard.html   Snowboard lessons inquiry page (email only)
computer_section/
  Random Password/            Password generator (RandomPass.html/.css, random_password.js)
  Processing/introclass/Final/ Moose Game (p5.js; MooseGame.html, sketch.js, mooseStyle.css, image assets)
Assets/me, Assets/art/...     Images (IMG_3627.JPG is also used as the favicon)
```
`.gitignore`: `*.zip`, `ignore/`, `.DS_Store`.

## Design system (follow this on every change)
- **Font:** `Pixelify Sans` (400/700) for everything. Urbanist is imported but unused.
- **Colors:** only via CSS variables set on `:root[data-theme="light"|"dark"]` in `Global/global.css`:
  - light: text `#000405`, background `#89cfeb`, primary `#cbc4c2`, secondary `#d0d6d7`, accent `#766865`
  - dark: text `#fafeff`, background `#145a76`, primary `#3d3634`, secondary `#282e2f`, accent `#9a8c89`
  Never hard-code colors in page CSS (exceptions: the theme slider track colors).
- **Look:** flat sky-blue background (`<canvas id="background">`), falling snow (`#tsparticles`, z-index -2), centered text, `filter: drop-shadow(0px 4px 4px var(--accent))` on content blocks, 5px border radius, no heavy borders.
- **Base:** `html` font-size 75%, body 1.8rem, line-height 1.4. Sections are often full-viewport height.
- **Navbar:** fixed top-right list: Home, Projects/About, Contact, theme slider. Identical markup on every page, with link paths adjusted for depth.
- **Buttons:** use `.home-button` (+ `.button-container`) from global.css. Form buttons use `var(--accent)` background.
- **Reuse before adding.** New pages should link `Global/global.css`, include the shared nav block, the `#tsparticles` + `#background` divs, the tsParticles 4.4.0 CDN script (`tsparticles.bundle.min.js`) (with its integrity hash), then `Global/snow.js`.

## Conventions and gotchas
- Every page repeats the same head/nav/scripts by hand (no includes). When changing the nav or head, update ALL pages (in `public/`): `index.html`, `art_section/art.html`, `snowboard_section/snowboard.html`, `computer_section/Random Password/RandomPass.html`, `computer_section/Processing/introclass/Final/MooseGame.html`.
- Relative paths depend on page depth (`../`, `../../`, `../../../../`). Double-check after editing links.
- `snow.js` expects `.theme-switch input[type="checkbox"]` and `#tsparticles` to exist on the page; it throws without them.
- `* { transition: all .5s ease }` is global and affects everything, including particles container (which sets `transition: none`).
- Small-screen rule: `@media (max-width: 600px), (max-height: 600px)` hides `.large-screen-content` and shows `.small-screen-content` (currently a "Working on Mobile view" placeholder).
- Known issues are tracked in `HANDOFF.md`.

## Scope rules for current work
- **Do NOT change the content** of the About text, the Projects list, or the Snowboard page. Structure, styling, accessibility and bug fixes around them are fine, but leave their wording, links and items as is.
- Keep the existing pixel/snow/theme look. No new fonts, frameworks or build tools unless asked.
- Commit style in history: short lowercase messages.

## Exception: spelling and grammar edits
The content freeze above does NOT apply to spelling and grammar corrections. Anywhere on the site, including the About text, Projects list and Snowboard page, you may change text if and only if the change is purely a spelling, grammar, punctuation or capitalization fix.
- Allowed: typos, wrong words ("Inquires" -> "Inquiries"), article errors ("a Enthusiastic" -> "an enthusiastic"), missing or extra punctuation, capitalization ("Hello My name" -> "Hello, my name").
- Not allowed: rewording for style or tone, adding or removing sentences, changing facts, links, project names or order, or any other content change.
- Keep the meaning and the author's voice identical. Do not touch HTML structure, attributes or URLs while fixing text.
- If a fix is ambiguous (could change the meaning), leave it and list it for Sam instead.
- List every spelling/grammar change made (file, before, after) in the commit message or summary so Sam can review it.

## Testing checklist
Open each page in light and dark mode at desktop (~1440px) and phone (~390px, portrait and landscape) widths. Click every nav link and every Home/Return button. Confirm theme choice persists across pages and snow keeps working.

## Commits
do not commit anything on main it has been approved by the user
use the dev branch for all development

## Website Link
https://samuelmbelin.com/
