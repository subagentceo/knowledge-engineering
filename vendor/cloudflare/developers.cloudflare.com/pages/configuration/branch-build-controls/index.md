---
title: Branch deployment controls
description: Control which branches trigger automatic deployments in your Cloudflare Pages project.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Branch deployment controls

When connected to your git repository, Pages allows you to control which environments and branches you would like to automatically deploy to. By default, Pages will trigger a deployment any time you commit to either your production or preview environment. However, with branch deployment controls, you can configure automatic deployments to suit your preference on a per project basis.

## Production branch control

Direct Upload

If your project is a [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) project, you will not have the option to configure production branch controls. To update your production branch, you will need to manually call the [Update Project](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/edit/) endpoint in the API.

Terminal window

```

curl --request PATCH \

"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data "{\"production_branch\": \"main\"}"


```

To configure deployment options, go to your Pages project > **Settings** \> **Builds & deployments** \> **Configure Production deployments**. Pages will default to setting your production environment to the branch you first push, but you can set your production to another branch if you choose.

You can also enable or disable automatic deployment behavior on the production branch by checking the **Enable automatic production branch deployments** box. You must save your settings in order for the new production branch controls to take effect.

## Preview branch control

When configuring automatic preview deployments, there are three options to choose from.

* **All non-Production branches**: By default, Pages will automatically deploy any and every commit to a preview branch.
* **None**: Turns off automatic builds for all preview branches.
* **Custom branches**: Customize the automatic deployments of certain preview branches.

### Custom preview branch control

By selecting **Custom branches**, you can specify branches you wish to include and exclude from automatic deployments in the provided configuration fields. The configuration fields can be filled in two ways:

* **Static branch names**: Enter the precise name of the branch you are looking to include or exclude (for example, staging or dev).
* **Wildcard syntax**: Use wildcards to match multiple branches. You can specify wildcards at the start or end of your rule. The order of execution for the configuration is (1) Excludes, (2) Includes, (3) Skip. Pages will process the exclude configuration first, then go to the include configuration. If a branch does not match either then it will be skipped.

Wildcard syntax

A wildcard (`*`) is a character that is used within rules. It can be placed alone to match anything or placed at the start or end of a rule to allow for better control over branch configuration. A wildcard will match zero or more characters.For example, if you wanted to match all branches that started with `fix/` then you would create the rule `fix/*` to match strings like `fix/1`, `fix/bugs`or `fix/`.

**Example 1:**

If you want to enforce branch prefixes such as `fix/`, `feat/`, or `chore/` with wildcard syntax, you can include and exclude certain branches with the following rules:

* Include Preview branches:`fix/*`, `feat/*`, `chore/*`
* Exclude Preview branches: \`\`

Here Pages will include any branches with the indicated prefixes and exclude everything else. In this example, the excluding option is left empty.

**Example 2:**

If you wanted to prevent [dependabot ↗](https://github.com/dependabot) from creating a deployment for each PR it creates, you can exclude those branches with the following:

* Include Preview branches:`*`
* Exclude Preview branches:`dependabot/*`

Here Pages will include all branches except any branch starting with `dependabot`. In this example, the excluding option means any `dependabot/` branches will not be built.

**Example 3:**

If you only want to deploy release-prefixed branches, then you could use the following rules:

* Include Preview branches:`release/*`
* Exclude Preview branches:`*`

This will deploy only branches starting with `release/`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/branch-build-controls/#page","headline":"Branch deployment controls · Cloudflare Pages docs","description":"Control which branches trigger automatic deployments in your Cloudflare Pages project.","url":"https://developers.cloudflare.com/pages/configuration/branch-build-controls/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/configuration/branch-build-controls/","name":"Branch deployment controls"}}]}
```
