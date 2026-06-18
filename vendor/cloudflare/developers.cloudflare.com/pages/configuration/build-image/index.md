---
title: Build image
description: Review supported languages, tools, and environment variables in the Cloudflare Pages build image.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build image

Cloudflare Pages' build environment has broad support for a variety of languages, such as Ruby, Node.js, Python, PHP, and Go.

If you need to use a [specific version](#override-default-versions) of a language, (for example, Node.js or Ruby) you can specify it by providing an associated environment variable in your build configuration, or setting the relevant file in your source code.

## Supported languages and tools

In the following tables, review the preinstalled versions for languages and tools included in the Cloudflare Pages' build image, and the environment variables and/or files available for [overriding the preinstalled version](#override-default-versions):

### Languages and runtime

* [ v3 ](#tab-panel-9384)
* [ v2 ](#tab-panel-9385)
* [ v1 ](#tab-panel-9386)

| Tool        | Default version | Supported versions | Environment variable | File                         |
| ----------- | --------------- | ------------------ | -------------------- | ---------------------------- |
| **Go**      | 1.24.3          | Any version        | GO\_VERSION          |                              |
| **Node.js** | 22.16.0         | Any version        | NODE\_VERSION        | .nvmrc, .node-version        |
| **Bun**     | 1.2.15          | Any version        | BUN\_VERSION         |                              |
| **Python**  | 3.13.3          | Any version        | PYTHON\_VERSION      | .python-version, runtime.txt |
| **Ruby**    | 3.4.4           | Any version        | RUBY\_VERSION        | .ruby-version                |

| Tool        | Default version | Supported versions | Environment variable | File                         |
| ----------- | --------------- | ------------------ | -------------------- | ---------------------------- |
| **Go**      | 1.21.0          | Any version        | GO\_VERSION          |                              |
| **Node.js** | 18.17.1         | Any version        | NODE\_VERSION        | .nvmrc, .node-version        |
| **Bun**     | 1.1.33          | Any version        | BUN\_VERSION         |                              |
| **Python**  | 3.11.5          | Any version        | PYTHON\_VERSION      | .python-version, runtime.txt |
| **Ruby**    | 3.2.2           | Any version        | RUBY\_VERSION        | .ruby-version                |

| Tool        | Default version | Supported versions                  | Environment variable | File                  |
| ----------- | --------------- | ----------------------------------- | -------------------- | --------------------- |
| **Clojure** |                 |                                     |                      |                       |
| **Elixir**  | 1.7             | 1.7 only                            |                      |                       |
| **Erlang**  | 21              | 21 only                             |                      |                       |
| **Go**      | 1.14.4          | Any version                         | GO\_VERSION          |                       |
| **Java**    | 8               | 8 only                              |                      |                       |
| **Node.js** | 12.18.0         | Any version                         | NODE\_VERSION        | .nvmrc, .node-version |
| **PHP**     | 5.6             | 5.6, 7.2, 7.4 only                  | PHP\_VERSION         |                       |
| **Python**  | 2.7             | 2.7, 3.5, 3.7 only                  | PYTHON\_VERSION      | runtime.txt, Pipfile  |
| **Ruby**    | 2.7.1           | Any version between 2.6.2 and 2.7.5 | RUBY\_VERSION        | .ruby-version         |
| **Swift**   | 5.2.5           | Any 5.x version                     | SWIFT\_VERSION       | .swift-version        |
| **.NET**    | 3.1.302         |                                     |                      |                       |

Any version

Under Supported versions, "Any version" refers to support for all versions of the language or tool including versions newer than the Default version.

### Tools

* [ v3 ](#tab-panel-9387)
* [ v2 ](#tab-panel-9388)
* [ v1 ](#tab-panel-9389)

| Tool                   | Default version | Supported versions               | Environment variable          |
| ---------------------- | --------------- | -------------------------------- | ----------------------------- |
| **Bundler**            | 2.6.9           | Corresponds with Ruby version    |                               |
| **Embedded Dart Sass** | 1.62.1          | Up to 1.62.1                     | EMBEDDED\_DART\_SASS\_VERSION |
| **gem**                | 3.6.9           | Corresponds with Ruby version    |                               |
| **Hugo**               | 0.147.7         | Any version                      | HUGO\_VERSION                 |
| **npm**                | 10.9.2          | Corresponds with Node.js version |                               |
| **pip**                | 25.1.1          | Corresponds with Python version  |                               |
| **pipx**               | 1.7.1           |                                  |                               |
| **pnpm**               | 10.11.1         | Any version                      | PNPM\_VERSION                 |
| **Poetry**             | 2.1.3           |                                  |                               |
| **Yarn**               | 4.9.1           | Any version                      | YARN\_VERSION                 |
| **Zola**               | 0.22.1          | Any version                      | ZOLA\_VERSION                 |

| Tool                   | Default version | Supported versions               | Environment variable          |
| ---------------------- | --------------- | -------------------------------- | ----------------------------- |
| **Bundler**            | 2.4.10          | Corresponds with Ruby version    |                               |
| **Embedded Dart Sass** | 1.62.1          | Up to 1.62.1                     | EMBEDDED\_DART\_SASS\_VERSION |
| **gem**                | 3.4.10          | Corresponds with Ruby version    |                               |
| **Hugo**               | 0.118.2         | Any version                      | HUGO\_VERSION                 |
| **npm**                | 9.6.7           | Corresponds with Node.js version |                               |
| **pip**                | 23.2.1          | Corresponds with Python version  |                               |
| **pipx**               | 1.2.0           |                                  |                               |
| **pnpm**               | 8.7.1           | Any version                      | PNPM\_VERSION                 |
| **Poetry**             | 1.6.1           |                                  |                               |
| **Yarn**               | 3.6.3           | Any version                      | YARN\_VERSION                 |
| **Zola**               | 0.22.1          | Any version                      | ZOLA\_VERSION                 |

| Tool            | Default version                  | Supported versions                | Environment variable |
| --------------- | -------------------------------- | --------------------------------- | -------------------- |
| **Boot**        | 2.5.2                            | 2.5.2                             |                      |
| **Bower**       |                                  |                                   |                      |
| **Cask**        |                                  |                                   |                      |
| **Composer**    |                                  |                                   |                      |
| **Doxygen**     | 1.8.6                            |                                   |                      |
| **Emacs**       | 25                               |                                   |                      |
| **Gutenberg**   | (requires environment variable)  | Any version                       | GUTENBERG\_VERSION   |
| **Hugo**        | 0.54.0                           | Any version                       | HUGO\_VERSION        |
| **GNU Make**    | 3.8.1                            |                                   |                      |
| **ImageMagick** | 6.7.7                            |                                   |                      |
| **jq**          | 1.5                              |                                   |                      |
| **Leiningen**   |                                  |                                   |                      |
| **OptiPNG**     | 0.6.4                            |                                   |                      |
| **npm**         | Corresponds with Node.js version | Any version                       | NPM\_VERSION         |
| **pip**         | Corresponds with Python version  |                                   |                      |
| **Pipenv**      | Latest version                   |                                   |                      |
| **sqlite3**     | 3.11.0                           |                                   |                      |
| **Yarn**        | 1.22.4                           | Any version from 0.2.0 to 1.22.19 | YARN\_VERSION        |
| **Zola**        | (requires environment variable)  | Any version from 0.5.0 and up     | ZOLA\_VERSION        |

Any version

Under Supported versions, "Any version" refers to support for all versions of the language or tool including versions newer than the Default version.

### Frameworks

To use a specific version of a framework, specify it in the project's package manager configuration file. For example, if you use Gatsby, your `package.json` should include the following:

```

"dependencies": {

  "gatsby": "^5.13.7",

}


```

When your build starts, if not already [cached](https://developers.cloudflare.com/pages/configuration/build-caching/), version 5.13.7 of Gatsby will be installed using `npm install`.

## Advanced Settings

### Override default versions

To override default versions of languages and tools in the build system, you can either set the desired version through environment variables or by adding files to your project.

To set the version using environment variables, you can:

1. Find the environment variable name for the language or tool in [this table](https://developers.cloudflare.com/pages/configuration/build-image/#supported-languages-and-tools).
2. Add the environment variable on the dashboard by going to **Settings** \> **Environment variables** in your Pages project, or [add the environment variable via Wrangler](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-wrangler).

Or, to set the version by adding a file to your project, you can:

1. Find the file name for the language or tool in [this table](https://developers.cloudflare.com/pages/configuration/build-image/#supported-languages-and-tools).
2. Add the specified file name to the root directory of your project, and add the desired version number as the contents of the file.

For example, if you were previously relying on the default version of Node.js in the v1 build system, to migrate to v2, you must specify that you need Node.js `12.18.0` by setting a `NODE_VERSION = 12.18.0` environment variable or by adding a `.node-version` or `.nvmrc` file to your project with `12.18.0` added as the contents to the file.

### Skip dependency install

You can add the following environment variable to disable automatic dependency installation, and run a custom install command instead.

| Build variable            | Value     |
| ------------------------- | --------- |
| SKIP\_DEPENDENCY\_INSTALL | 1 or true |

## v3 build system

The v3 build system updates the default tools, libraries and languages to their LTS versions, as of May 2025.

### v2 to v3 Migration

To migrate to this new version, configure your Pages project settings in the dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Deployments** \> **All deployments** \> and select the latest version.

If you were previously relying on the default versions of any languages or tools in the build system, your build may fail when migrating to v3\. To fix this, you must specify the version you wish to use by [overriding](https://developers.cloudflare.com/pages/configuration/build-image/#overriding-default-versions) the default versions.

### Limitations

The following features are not currently supported when using the v3 build system:

* Specifying Node.js versions as codenames (for example, `hydrogen` or `lts/hydrogen`).
* Detecting Yarn version from `yarn.lock` file version.
* Detecting pnpm version detection based `pnpm-lock.yaml` file version.
* Detecting Node.js and package managers from `package.json` \-> `"engines"`.
* `pipenv` and `Pipfile` support.

## Build environment

Cloudflare Pages builds are run in a [gVisor ↗](https://gvisor.dev/docs/) container.

* [ v3 ](#tab-panel-9390)
* [ v2 ](#tab-panel-9391)
* [ v1 ](#tab-panel-9392)

| **Build environment** | Ubuntu 22.04.2 |
| --------------------- | -------------- |
| **Architecture**      | x86\_64        |

| **Build environment** | Ubuntu 22.04.2 |
| --------------------- | -------------- |
| **Architecture**      | x86\_64        |

| **Build environment** | Ubuntu 20.04.5 |
| --------------------- | -------------- |
| **Architecture**      | x86\_64        |

## Build Image Policy

### Build Image Version Deprecation

If you are currently using the v1 or v2 build image, your project will be automatically moved to v3:

* **v1 build image**: If you are using the Pages v1 build image, your project will be automatically moved to v3 on September 15, 2026.
* **v2 build image**: If you are using the Pages v2 build image, your project will be automatically moved to v3 on February 23, 2027.

You will receive 6 months’ notice before the deprecation date via the [Cloudflare Changelog ↗](https://developers.cloudflare.com/changelog/), dashboard notifications, and email.

Going forward, the v3 build image will receive rolling updates to preinstalled software per the policy below. There will be no further build image version changes.

### Preinstalled Software Updates

Preinstalled software (languages and tools) will be updated before reaching end-of-life (EOL). These updates apply only if you have not [overridden the default version](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions).

* **Minor version updates**: May be updated to the latest available minor version without notice. For tools that do not follow semantic versioning (e.g., Bun or Hugo), updates that may contain breaking changes will receive 3 months’ notice.
* **Major version updates**: Updated to the next stable long-term support (LTS) version with 3 months’ notice.

**How you'll be notified (for changes requiring notice):**

* [Cloudflare Changelog ↗](https://developers.cloudflare.com/changelog/)
* Dashboard notifications for projects that will receive the update
* Email notifications to project owners

To maintain a specific version and avoid automatic updates, [override the default version](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions).

### Best Practices

To avoid unexpected build failures:

* **Monitor announcements** via the [Cloudflare Changelog ↗](https://developers.cloudflare.com/changelog/), dashboard notifications, and email
* **Plan for migration** when you receive update notices
* **Pin specific versions** of critical preinstalled software by [overriding default versions](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/build-image/#page","headline":"Build image · Cloudflare Pages docs","description":"Review supported languages, tools, and environment variables in the Cloudflare Pages build image.","url":"https://developers.cloudflare.com/pages/configuration/build-image/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/configuration/build-image/","name":"Build image"}}]}
```
