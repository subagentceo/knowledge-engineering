---
title: Changelog
description: Recent changes and updates to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/pages/platform/changelog/index.xml)

## 2025-04-18

**Action recommended - Node.js 18 end-of-life and impact on Pages Build System V2**
* If you are using [Pages Build System V2](https://developers.cloudflare.com/pages/configuration/build-image/) for a Git-connected Pages project, note that the default Node.js version, **Node.js 18**, will end its LTS support on **April 30, 2025**.
* Pages will not change the default Node.js version in the Build System V2 at this time, instead, we **strongly recommend pinning a modern Node.js version** to ensure your builds are consistent and secure.
* You can [pin any Node.js version](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions) by:  
   1. Adding a `NODE_VERSION` environment variable with the desired version specified as the value.  
   2. Adding a `.node-version` file with the desired version specified in the file.
* Pinning helps avoid unexpected behavior and ensures your builds stay up-to-date with your chosen runtime. We also recommend pinning all critical tools and languages that your project relies on.

## 2025-02-26

**Support for pnpm 10 in build system**
* Pages build system now supports building projects that use **pnpm 10** as the package manager. If your build previously failed due to this unsupported version, retry your build. No config changes needed.

## 2024-12-19

**Cloudflare GitHub App Permissions Update**
* Cloudflare is requesting updated permissions for the [Cloudflare GitHub App](https://github.com/apps/cloudflare-workers-and-pages) to enable features like automatically creating a repository on your GitHub account and deploying the new repository for you when getting started with a template. This feature is coming out soon to support a better onboarding experience.  
   * **Requested permissions:**  
         * [Repository Administration](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-administration) (read/write) to create repositories.  
         * [Contents](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-contents) (read/write) to push code to the created repositories.  
   * **Who is impacted:**  
         * Existing users will be prompted to update permissions when GitHub sends an email with subject "\[GitHub\] Cloudflare Workers & Pages is requesting updated permission" on December 19th, 2024.  
         * New users installing the app will see the updated permissions during the connecting repository process.  
   * **Action:** Review and accept the permissions update to use upcoming features. _If you decline or take no action, you can continue connecting repositories and deploying changes via the Cloudflare GitHub App as you do today, but new features requiring these permissions will not be available._  
   * **Questions?** Visit [#github-permissions-update](https://discord.com/channels/595317990191398933/1313895851520688163) in the Cloudflare Developers Discord.

## 2024-10-24

**Updating Bun version to 1.1.33 in V2 build system**
* Bun version is being updated from `1.0.1` to `1.1.33` in Pages V2 build system. This is a minor version change, please see details at [Bun](https://bun.sh/blog/bun-v1.1.33).
* If you wish to use a previous Bun version, you can [override default version](https://developers.cloudflare.com/pages/configuration/build-image/#overriding-default-versions).

## 2023-09-13

**Support for D1's new storage subsystem and build error message improvements**
* Added support for D1's [new storage subsystem](https://blog.cloudflare.com/d1-turning-it-up-to-11/). All Git builds and deployments done with Wrangler v3.5.0 and up can use the new subsystem.
* Builds which fail due to exceeding the [build time limit](https://developers.cloudflare.com/pages/platform/limits/#builds) will return a proper error message indicating so rather than `Internal error`.
* New and improved error messages for other build failures

## 2023-08-23

**Commit message limit increase**
* Commit messages can now be up to 384 characters before being trimmed.

## 2023-08-01

**Support for newer TLDs**
* Support newer TLDs such as `.party` and `.music`.

## 2023-07-11

**V2 build system enabled by default**
* V2 build system is now default for all new projects.

## 2023-07-10

**Sped up project creation**
* Sped up project creation.

## 2023-05-19

**Build error message improvement**
* Builds which fail due to Out of memory (OOM) will return a proper error message indicating so rather than `Internal error`.

## 2023-05-17

**V2 build system beta**
* The V2 build system is now available in open beta. Enable the V2 build system by going to your Pages project in the Cloudflare dashboard and selecting **Settings** \> [**Build & deployments**](https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/settings/builds-deployments) \> **Build system version**.

## 2023-05-16

**Support for Smart Placement**
* [Smart placement](https://developers.cloudflare.com/workers/configuration/placement/) can now be enabled for Pages within your Pages Project by going to **Settings** \> [**Functions**](https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/settings/functions).

## 2023-03-23

**Git projects can now see files uploaded**
* Files uploaded are now visible for Git projects, you can view them in the [Cloudflare dashboard](https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/:pages-deployment/files).

## 2023-03-20

**Notifications for Pages are now available**
* Notifications for Pages events are now available in the [Cloudflare dashboard](https://dash.cloudflare.com?to=/:account/notifications). Events supported include:  
   * Deployment started.  
   * Deployment succeeded.  
   * Deployment failed.

## 2023-02-14

**Analytics Engine now available in Functions**
* Added support for [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/)in Functions.

## 2023-01-05

**Queues now available in Functions**
* Added support for [Queues](https://developers.cloudflare.com/queues/) producer in Functions.

## 2022-12-15

**API messaging update**

Updated all API messaging to be more helpful.

## 2022-12-01

**Ability to delete aliased deployments**
* Aliased deployments can now be deleted. If using the API, you will need to add the query parameter `force=true`.

## 2022-11-19

**Deep linking to a Pages deployment**
* You can now deep-link to a Pages deployment in the dashboard with `:pages-deployment`. An example would be `https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/:pages-deployment`.

## 2022-11-17

**Functions GA and other updates**
* Pages functions are now GA. For more information, refer to the [blog post](https://blog.cloudflare.com/pages-function-goes-ga/).
* We also made the following updates to Functions:  
   * [Functions metrics](https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/analytics/production) are now available in the dashboard.  
   * [Functions billing](https://developers.cloudflare.com/pages/functions/pricing/) is now available.  
   * The [Unbound usage model](https://developers.cloudflare.com/workers/platform/limits/#response-limits) is now available for Functions.  
   * [Secrets](https://developers.cloudflare.com/pages/functions/bindings/#secrets) are now available.  
   * Functions tailing is now available via the [dashboard](https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/:pages-deployment/functions) or with Wrangler (`wrangler pages deployment tail`).

## 2022-11-15

**Service bindings now available in Functions**
* Service bindings are now available in Functions. For more details, refer to the [docs](https://developers.cloudflare.com/pages/functions/bindings/#service-bindings).

## 2022-11-03

**Ansi color codes in build logs**

Build log now supports ansi color codes.

## 2022-10-05

**Deep linking to a Pages project**
* You can now deep-link to a Pages project in the dashboard with `:pages-project`. An example would be `https://dash.cloudflare.com?to=/:account/pages/view/:pages-project`.

## 2022-09-12

**Increased domain limits**

Previously, all plans had a maximum of 10 [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/) per project.

Now, the limits are:

* **Free**: 100 custom domains.
* **Pro**: 250 custom domains.
* **Business** and **Enterprise**: 500 custom domains.

## 2022-09-08

**Support for \_routes.json**
* Pages now offers support for `_routes.json`. For more details, refer to the [documentation](https://developers.cloudflare.com/pages/functions/routing/#functions-invocation-routes).

## 2022-08-25

**Increased build log expiration time**

Build log expiration time increased from 2 weeks to 1 year.

## 2022-08-08

**New bindings supported**
* R2 and D1 [bindings](https://developers.cloudflare.com/pages/functions/bindings/) are now supported.

## 2022-07-05

**Added support for .dev.vars in wrangler pages**

Pages now supports `.dev.vars` in `wrangler pages`, which allows you to use use environmental variables during your local development without chaining `--env`s.

This functionality requires Wrangler v2.0.16 or higher.

## 2022-06-13

**Added deltas to wrangler pages publish**

Pages has added deltas to `wrangler pages publish`.

We now keep track of the files that make up each deployment and intelligently only upload the files that we have not seen. This means that similar subsequent deployments should only need to upload a minority of files and this will hopefully make uploads even faster.

This functionality requires Wrangler v2.0.11 or higher.

## 2022-06-08

**Added branch alias to PR comments**
* PR comments for Pages previews now include the branch alias.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/pages/platform/changelog/#page","headline":"Changelog · Cloudflare Pages docs","description":"Recent changes and updates to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/platform/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/platform/changelog/","name":"Changelog"}}]}
```
