#!/usr/bin/env python3
"""Print the wiki footer line (project links + translated-wiki links) for one repo."""
import sys
sys.path.insert(0, __import__("os").path.dirname(__file__))
from add_header import OWNER, PROJECTS, LANGUAGES  # noqa: E402


def footer(repo):
    projects = " · ".join("**%s**" % p if p == repo else "[%s](https://github.com/%s/%s)" % (p, OWNER, p)
                          for p in PROJECTS)
    langs = " · ".join("[%s](https://github-com.translate.goog/%s/%s/wiki?_x_tr_sl=en&_x_tr_tl=%s&_x_tr_hl=%s)"
                       % (label, OWNER, repo, code, code) for label, code in LANGUAGES)
    return projects + "\n\nTranslate this wiki (automatic, by Google): " + langs


if __name__ == "__main__":
    print(footer(sys.argv[1]))
