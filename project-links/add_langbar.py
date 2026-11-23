#!/usr/bin/env python3
"""Append (or refresh) the shared project-links/language bar in a site's app.js.

Usage: python3 add_langbar.py <path/to/app.js>
The block lives between the project-links:start / :end comments, so rerunning
replaces it in place. Source of the block: langbar.js next to this script.
"""
import sys
from pathlib import Path

START = "/* project-links:start"
END = "/* project-links:end */"
block = (Path(__file__).with_name("langbar.js")).read_text(encoding="utf-8").strip("\n")
path = Path(sys.argv[1])
raw = path.read_bytes()
crlf = b"\r\n" in raw
text = raw.decode("utf-8").replace("\r\n", "\n")
if START in text and END in text:
    head, rest = text.split(START, 1)
    _, tail = rest.split(END, 1)
    text = head + block + tail
else:
    text = text.rstrip("\n") + "\n\n" + block + "\n"
if crlf:
    text = text.replace("\n", "\r\n")
path.write_bytes(text.encode("utf-8"))
