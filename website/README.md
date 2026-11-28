# nathanneurotic.com

Source for https://nathanneurotic.com. Plain static site: hand-written HTML and one stylesheet, no framework, no JavaScript.

It's served by the Cloudflare Worker named `nathanneurotic` (static assets only), with both `nathanneurotic.com` and `www.nathanneurotic.com` attached as custom domains. `wrangler.jsonc` keeps both attached on every deploy.

## Editing

- Page content lives in `src/pages/*.html`. The first line of each file is a JSON comment with the page title, description and URL.
- The shared header, footer and `<head>` are in `build.mjs`.
- Styles are in `public/style.css`. Colours are the variables at the top; dark mode follows the visitor's system setting.
- Images are in `public/img/`. Screenshots in `img/shots/` are real captures taken from each project's own docs.
- Fonts are IBM Plex Sans and Mono (SIL Open Font License, see `public/fonts/OFL.txt`).

After editing a page, rebuild the HTML:

```bash
node build.mjs
```

If you change `style.css`, bump `CSS_VERSION` in `build.mjs` so browsers fetch the new file.

## Previewing locally

```bash
cd public && python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying (Cloudflare Workers)

From this folder:

```bash
npx wrangler deploy
```

This uploads `public/` to the existing `nathanneurotic` Worker. On Nathan's Windows PC, run this first in the same PowerShell window, because the system PATH contains a stray quote that breaks npx:

```powershell
$env:PATH = $env:PATH.Replace('"','')
```

To undo a deploy, run `npx wrangler rollback` from this folder, or open the Worker in the Cloudflare dashboard, go to **Deployments**, and roll back to the previous version.

The old portfolio folder on Nathan's PC (`sites-plugin-sites-openai-curated-remote-2\work\portfolio`) also deploys to the same Worker. Don't deploy from it, or the old site comes back.

## Rules this site follows

- Lead with real work: real screenshots, real facts from the project READMEs.
- Anything made with AI (the art and the Suno songs) is labeled as such, on its own page.
- Plain writing. No slogans.
