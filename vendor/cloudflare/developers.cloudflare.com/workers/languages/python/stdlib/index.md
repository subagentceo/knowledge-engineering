---
title: Standard Library
description: Python standard library availability and limitations in Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Standard Library

Workers written in Python are executed by [Pyodide ↗](https://pyodide.org/en/stable/index.html).

Pyodide is a port of CPython to WebAssembly — for the most part it behaves identically to [CPython ↗](https://github.com/python) (the reference implementation of Python — commonly referred to as just "Python"). The majority of the CPython test suite passes when run against Pyodide. For the most part, you shouldn't need to worry about differences in behavior.

The full [Python Standard Library ↗](https://docs.python.org/3/library/index.html) is available in Python Workers, with the following exceptions:

## Modules with limited functionality

* `decimal`: The decimal module has C (\_decimal) and Python (\_pydecimal) implementations with the same functionality. Only the C implementation is available (compiled to WebAssembly)
* `pydoc`: Help messages for Python builtins are not available
* `webbrowser`: The original webbrowser module is not available.

## Excluded modules

The following modules are not available in Python Workers:

* curses
* dbm
* ensurepip
* fcntl
* grp
* idlelib
* lib2to3
* msvcrt
* pwd
* resource
* syslog
* termios
* tkinter
* turtle.py
* turtledemo
* venv
* winreg
* winsound

The following modules can be imported, but are not functional due to the limitations of the WebAssembly VM.

* multiprocessing
* threading
* sockets

The following are present but cannot be imported due to a dependency on the termios package which has been removed:

* pty
* tty

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/stdlib/#page","headline":"Standard Library provided to Python Workers · Cloudflare Workers docs","description":"Python standard library availability and limitations in Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/languages/python/stdlib/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/python/","name":"Python Workers"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/languages/python/stdlib/","name":"Standard Library"}}]}
```
