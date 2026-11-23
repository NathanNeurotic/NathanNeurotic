# Project links and translations

These scripts generate the small row of project links and the language list you see
at the top of the READMEs, docs sites and wikis of:

RiptOPL · Launchstation · PS2-Servers · launcHER · Simple-Media-System · POPSLoader

Translations are live. Each language link opens the page through Google Translate,
so a translation always matches the current English text and nothing has to be kept
in sync by hand.

| Script | What it does |
|---|---|
| `add_header.py` | Holds the project and language lists, and adds or refreshes the block at the top of a README. Usage: `python3 add_header.py <repo-name> README.md` |
| `langbar.js` | The bar shown at the top of every docs-site page: project links plus a language picker that reopens the page through Google Translate. |
| `add_langbar.py` | Adds `langbar.js` to the end of a site's `app.js`, or refreshes it. Usage: `python3 add_langbar.py path/to/app.js` |
| `wiki_footer.py` | Prints the wiki footer text (project links and translated-wiki links). The wiki generators in each repo hold a copy of its output. |

Each generated block sits between `project-links:start` and `project-links:end`
comments, so running a script again replaces the block in place. To change the
projects or languages, edit `add_header.py` (and the lists in `langbar.js`), then
rerun the scripts on every repo.
