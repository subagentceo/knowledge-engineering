---
title: Install / Update
description: Install or update Wrangler v1 using npm or Cargo. Now deprecated in favor of the latest Wrangler release.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Install / Update

Warning

This page is for Wrangler v1, which has been deprecated.[Learn how to update to the latest version of Wrangler](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/).

## Install

### Install with `npm`

Terminal window

```

npm i @cloudflare/wrangler -g


```

EACCESS error

You may have already installed npm. It is possible that an `EACCES` error may be thrown while installing Wrangler. This is related to how many systems install the npm binary. It is recommended that you reinstall npm using a Node version manager like [nvm ↗](https://github.com/nvm-sh/nvm#installing-and-updating) or [Volta ↗](https://volta.sh/).

### Install with `cargo`

Assuming you have Rust’s package manager, [Cargo ↗](https://github.com/rust-lang/cargo), installed, run:

Terminal window

```

cargo install wrangler


```

Otherwise, to install Cargo, you must first install rustup. On Linux and macOS systems, `rustup` can be installed as follows:

Terminal window

```

curl https://sh.rustup.rs -sSf | sh


```

Additional installation methods are available [on the Rust site ↗](https://forge.rust-lang.org/other-installation-methods.html).

Windows users will need to install Perl as a dependency for `openssl-sys` — [Strawberry Perl ↗](https://www.perl.org/get.html) is recommended.

After Cargo is installed, you may now install Wrangler:

Terminal window

```

cargo install wrangler


```

Customize OpenSSL

By default, a copy of OpenSSL is included to make things easier during installation, but this can make the binary size larger. If you want to use your system's OpenSSL installation, provide the feature flag `sys-openssl` when running install:

Terminal window

```

cargo install wrangler --features sys-openssl


```

### Manual install

1. Download the binary tarball for your platform from the [releases page ↗](https://github.com/cloudflare/wrangler-legacy/releases). You do not need the `wranglerjs-*.tar.gz` download – Wrangler will install that for you.
2. Unpack the tarball and place the Wrangler binary somewhere on your `PATH`, preferably `/usr/local/bin` for Linux/macOS or `Program Files` for Windows.

## Update

To update [Wrangler ↗](https://github.com/cloudflare/wrangler-legacy), run one of the following:

### Update with `npm`

Terminal window

```

npm update -g @cloudflare/wrangler


```

### Update with `cargo`

Terminal window

```

cargo install wrangler --force


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/#page","headline":"Install / Update · Cloudflare Workers docs","description":"Install or update Wrangler v1 using npm or Cargo. Now deprecated in favor of the latest Wrangler release.","url":"https://developers.cloudflare.com/workers/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/migration/","name":"Migrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/","name":"Migrate from Wrangler v1 to v2"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/wrangler-legacy/","name":"Wrangler v1 (legacy)"}},{"@type":"ListItem","position":7,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/wrangler-legacy/install-update/","name":"Install / Update"}}]}
```
