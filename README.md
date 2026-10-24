# Samuel Belin — Personal Website

The personal site of Sam Belin: computer science grad (University of Denver), artist and snowboard instructor from Boulder, Colorado. It introduces Sam, links to a few small coding projects, shows artwork and takes snowboard lesson inquiries.

It's a plain static site: HTML, CSS and a little JavaScript. There's no framework, no build step and no package manager. Edit a file, refresh the browser.

Everything the website serves is in the `public/` folder. The repo root only holds this README, `CLAUDE.md` and `.gitignore`, which don't get deployed.

## Running it locally

Serve the `public/` folder with any static web server. You need Python 3, which is already installed on macOS:

```sh
cd Personal-Website
python3 -m http.server 8000 -d public
```

Then open <http://localhost:8000>. Stop the server with `Ctrl+C`.

Use a server rather than double-clicking `index.html`. The Moose Game loads its images with p5.js, and browsers block that on `file://` URLs.

Any other static server works too, e.g. `npx serve public`, or the "Live Server" extension (open a file inside `public/`) in VS Code, which also reloads the page when you save.

## Deploying

Cloudflare deploys the `public/` folder. In the Pages project settings, set the build command to empty and the build output directory to `public`. Anything outside `public/` stays off the live site.

## What's where

All paths are inside `public/`.

```
index.html, index.css         Home page: hero, About + Projects, Contact
Global/global.css             Theme colors, font, base styles, navbar, theme switch, buttons
Global/snow.js                Falling snow (tsParticles) and the light/dark switch
Global/newsnow.js             Unused snow experiment, not linked by any page
art_section/                  Artwork gallery (art.html, art.css, art.js = click-to-enlarge)
snowboard_section/            Snowboard lesson inquiries
computer_section/
  Random Password/            Password generator project
  Processing/introclass/Final/ Moose Game (p5.js)
Assets/me/                    Photo of Sam + favicon.png
Assets/art/                   Artwork images
```

External scripts come from CDNs: tsParticles 4.4.0 (the full `tsparticles.bundle.min.js` from cdnjs; `snow.js` calls `loadFull` before loading), p5.js 1.4.0 (Moose Game only) and the Cloudflare Web Analytics beacon. The fonts come from Google Fonts.

## How the pages fit together

There are no templates or includes. Every page repeats the same `<head>`, nav bar and scripts by hand. When you change the nav or head, update all five pages in `public/`:

- `index.html`
- `art_section/art.html`
- `snowboard_section/snowboard.html`
- `computer_section/Random Password/RandomPass.html`
- `computer_section/Processing/introclass/Final/MooseGame.html`

Links are relative, so their `../` prefixes depend on how deep the page is. Check them after any edit.

Each page needs, in this order:

1. In `<head>`: the inline theme script (it sets light/dark before the page draws, so there's no flash), the favicon and `Global/global.css`.
2. In `<body>`: `<div id="tsparticles">` and `<canvas id="background">`, plus the shared nav with the theme checkbox.
3. At the end: the tsParticles CDN script (keep its `integrity` hash), the Cloudflare beacon, then `Global/snow.js`.

The easiest way to add a page is to copy the structure of `public/snowboard_section/snowboard.html`, which is the simplest page.

## Styling rules

- **Font:** Pixelify Sans for everything.
- **Colors:** use only the CSS variables in `Global/global.css` (`--text`, `--background`, `--primary`, `--secondary`, `--accent`). They have light and dark values, and the theme switch toggles them with `data-theme` on `<html>`. Don't hard-code colors in page CSS.
- **Look:** sky-blue background, falling snow, centered text, `filter: drop-shadow(0px 4px 4px var(--accent))` on content blocks, 5px corner radius.
- **Buttons:** reuse `.home-button` inside `.button-container`.
- **Small screens:** styles for phones go in `@media (max-width: 700px)`. Phones in landscape use `@media (max-height: 500px)` in `index.css`.
- **Images:** keep artwork at 1600px or smaller on the long edge. On macOS: `sips -Z 1600 -s formatOptions 70 image.jpg`. Give each `<img>` `alt`, `width`, `height` and `loading="lazy"`.

The theme choice is saved in `localStorage` under the key `theme`.

## Testing

There are no automated tests. Before committing, check by hand:

- Every page in **light and dark** mode.
- **Desktop width** (~1440px) and **phone width** (~390px, portrait and landscape). Chrome DevTools' device toolbar (`Cmd+Shift+M`) is the easiest way.
- Every nav link and every Home/Return button goes where it should.
- The theme you pick stays the same as you move between pages, and the theme switch works with the keyboard (Tab, then Space).
- The snow keeps falling as you scroll.
- The DevTools console shows no errors. The Cloudflare beacon fails on localhost, which is expected.

## Contributing notes

- Commit messages are short and lowercase, e.g. `fixing moose home link`.
- Known issues and planned work are in `HANDOFF.md`.
