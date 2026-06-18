---
title: Install private packages
description: Use custom npm registries and private dependencies in your Cloudflare Pages builds.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Install private packages

Cloudflare Pages supports custom package registries, allowing you to include private dependencies in your application. While this walkthrough focuses specifically on [npm ↗](https://www.npmjs.com/), the Node package manager and registry, the same approach can be applied to other registry tools.

You will be be adjusting the [environment variables](https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables) in your Pages project's **Settings**. An existing website can be modified at any time, but new projects can be initialized with these settings, too. Either way, altering the project settings will not be reflected until its next deployment.

Warning

Be sure to trigger a new deployment after changing any settings.

## Registry Access Token

Every package registry should have a means of issuing new access tokens. Ideally, you should create a new token specifically for Pages, as you would with any other CI/CD platform.

With npm, you can [create and view tokens through its website ↗](https://docs.npmjs.com/creating-and-viewing-access-tokens) or you can use the `npm` CLI. If you have the CLI set up locally and are authenticated, run the following commands in your terminal:

Terminal window

```

# Verify the current npm user is correct

npm whoami


# Create a readonly token

npm token create --read-only

#-> Enter password, if prompted

#-> Enter 2FA code, if configured


```

This will produce a read-only token that looks like a UUID string. Save this value for a later step.

## Private modules on the npm registry

The following section applies to users with applications that are only using private modules from the npm registry.

In your Pages project's **Settings** \> **Environment variables**, add a new [environment variable](https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables) named `NPM_TOKEN` to the **Production** and **Preview** environments and paste the [read-only token you created](#registry-access-token) as its value.

Warning

Add the `NPM_TOKEN` variable to both the **Production** and **Preview** environments.

By default, `npm` looks for an environment variable named `NPM_TOKEN` and because you did not define a [custom registry endpoint](#custom-registry-endpoints), the npm registry is assumed. Local development should continue to work as expected, provided that you and your teammates are authenticated with npm accounts (see `npm whoami` and `npm login`) that have been granted access to the private package(s).

## Custom registry endpoints

When multiple registries are in use, a project will need to define its own root-level [.npmrc ↗](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc) configuration file. An example `.npmrc` file may look like this:

```

@foobar:registry=https://npm.pkg.github.com

//registry.npmjs.org/:_authToken=${TOKEN_FOR_NPM}

//npm.pkg.github.com/:_authToken=${TOKEN_FOR_GITHUB}


```

Here, all packages under the `@foobar` scope are directed towards the GitHub Packages registry. Then the registries are assigned their own access tokens via their respective environment variable names.

Note

You only need to define an Access Token for the npm registry (refer to `TOKEN_FOR_NPM` in the example) if it is hosting private packages that your application requires.

Your Pages project must then have the matching [environment variables](https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables) defined for all environments. In our example, that means `TOKEN_FOR_NPM` must contain [the read-only npm token](#registry-access-token) value and `TOKEN_FOR_GITHUB` must contain its own [personal access token ↗](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token#creating-a-token).

### Managing multiple environments

In the event that your local development no longer works with your new `.npmrc` file, you will need to add some additional changes:

1. Rename the Pages-compliant `.npmrc` file to `.npmrc.pages`. This should be referencing environment variables.
2. Restore your previous `.npmrc` file – the version that was previously working for you and your teammates.
3. Go to **Workers & Pages** in the Cloudflare dashboard.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
4. Select your Pages project.
5. Go to **Settings** \> **Environment variables**, add a new [environment variable](https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables) named [NPM\_CONFIG\_USERCONFIG ↗](https://docs.npmjs.com/cli/v6/using-npm/config#npmrc-files) and set its value to `/opt/buildhome/repo/.npmrc.pages`. If your `.npmrc.pages` file is not in your project's root directory, adjust this path accordingly.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/how-to/npm-private-registry/#page","headline":"Install private packages · Cloudflare Pages docs","description":"Use custom npm registries and private dependencies in your Cloudflare Pages builds.","url":"https://developers.cloudflare.com/pages/how-to/npm-private-registry/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/how-to/npm-private-registry/","name":"Install private packages"}}]}
```
