#!/usr/bin/env python3
"""Insert (or refresh) the project-links row and the language row at the top of a README.

Usage: python3 add_header.py <repo-name> <path/to/README.md>

The block sits between the two marker comments, so running this again replaces it
in place instead of adding a second copy. Edit PROJECTS or LANGUAGES here and rerun
on every repo to keep all six READMEs identical.

Translations are live: each language link opens the repository page through Google
Translate's page proxy, so the translation always matches the current README and
nothing has to be kept in sync by hand.
"""
import sys
from pathlib import Path

OWNER = "NathanNeurotic"
PROJECTS = ["RiptOPL", "Launchstation", "PS2-Servers", "launcHER",
            "Simple-Media-System", "POPSLoader"]

# (label in its own language, Google Translate code). Mirrors RiptOPL's own UI
# language list (lng/fork/*.yml). Ryukyuan is left out: Google cannot translate it.
LANGUAGES = [
    ("Español", "es"), ("Português (Brasil)", "pt"), ("Português", "pt-PT"),
    ("Français", "fr"), ("Deutsch", "de"), ("Italiano", "it"), ("Nederlands", "nl"),
    ("Dansk", "da"), ("Svenska", "sv"), ("Polski", "pl"), ("Čeština", "cs"),
    ("Hrvatski", "hr"), ("Српски", "sr"), ("Български", "bg"), ("Русский", "ru"),
    ("Ελληνικά", "el"), ("Magyar", "hu"), ("Română", "ro"), ("Galego", "gl"),
    ("Shqip", "sq"), ("Türkçe", "tr"), ("العربية", "ar"), ("فارسی", "fa"),
    ("日本語", "ja"), ("한국어", "ko"), ("简体中文", "zh-CN"), ("繁體中文", "zh-TW"),
    ("Tiếng Việt", "vi"), ("ລາວ", "lo"), ("Bahasa Indonesia", "id"),
    ("Filipino", "tl"), ("Cebuano", "ceb"),
]

START = "<!-- project-links:start (generated, see https://github.com/NathanNeurotic/NathanNeurotic/tree/main/project-links) -->"
START_PREFIX = "<!-- project-links:start"
END = "<!-- project-links:end -->"


def block(repo):
    links = []
    for p in PROJECTS:
        if p == repo:
            links.append("<b>%s</b>" % p)
        else:
            links.append('<a href="https://github.com/%s/%s">%s</a>' % (OWNER, p, p))
    langs = ["<b>English</b>"]
    for label, code in LANGUAGES:
        url = ("https://github-com.translate.goog/%s/%s?_x_tr_sl=en&amp;_x_tr_tl=%s"
               "&amp;_x_tr_hl=%s" % (OWNER, repo, code, code))
        langs.append('<a href="%s">%s</a>' % (url, label))
    return "\n".join([
        START,
        '<p align="center"><sub>' + " · ".join(links) + "</sub></p>",
        '<p align="center"><sub>' + " · ".join(langs)
        + " <i>(automatic translation by Google)</i></sub></p>",
        END,
    ]) + "\n"


def main():
    repo, path = sys.argv[1], Path(sys.argv[2])
    if repo not in PROJECTS:
        sys.exit("unknown repo %s" % repo)
    raw = path.read_bytes()
    crlf = b"\r\n" in raw
    text = raw.decode("utf-8").replace("\r\n", "\n")
    bom = text.startswith("﻿")
    if bom:
        text = text[1:]
    new = block(repo)
    if START_PREFIX in text and END in text:
        head, rest = text.split(START_PREFIX, 1)
        _, tail = rest.split(END, 1)
        text = head + new.rstrip("\n") + tail
    else:
        text = new + "\n" + text.lstrip("\n")
    if crlf:
        text = text.replace("\n", "\r\n")
    path.write_bytes((("﻿" if bom else "") + text).encode("utf-8"))


if __name__ == "__main__":
    main()
