---
title: GitLab CI/CD
description: Integrate Workers development into your existing GitLab Pipelines workflows.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GitLab CI/CD

You can deploy Workers with [GitLab CI/CD ↗](https://docs.gitlab.com/ee/ci/pipelines/index.html). Here is how you can set up your Gitlab CI/CD pipeline.

## 1\. Authentication

When running Wrangler locally, authentication to the Cloudflare API happens via the [wrangler login](https://developers.cloudflare.com/workers/wrangler/commands/general/#login) command, which initiates an interactive authentication flow. Since CI/CD environments are non-interactive, Wrangler requires a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) and [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) to authenticate with the Cloudflare API.

### Cloudflare account ID

To find your Cloudflare account ID, refer to [Find account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

### API token

To create an API token to authenticate Wrangler in your CI job:

1. In the Cloudflare dashboard, go to the **Account API tokens** page.  
[ Go to **Account API tokens** ](https://dash.cloudflare.com/?to=/:account/api-tokens)
2. Select **Create Token**.
3. Under **Permission policies**, open the **Custom** dropdown and select **Edit Cloudflare Workers**.
4. Customize your token name.
5. Scope your token.

You will need to choose the account and zone resources that the generated API token will have access to. We recommend scoping these down as much as possible to limit the access of your token. For example, if you have access to three different Cloudflare accounts, you should restrict the generated API token to only the account on which you will be deploying a Worker.

## 2\. Set up CI

The method for running Wrangler in your CI/CD environment will depend on the specific setup for your project (whether you use GitHub Actions/Jenkins/GitLab or something else entirely).

To set up your CI:

1. Go to your CI platform and add the following as secrets:
* `CLOUDFLARE_ACCOUNT_ID`: Set to the [Cloudflare account ID](#cloudflare-account-id) for the account on which you want to deploy your Worker.
* `CLOUDFLARE_API_TOKEN`: Set to the [Cloudflare API token you generated](#api-token).

Warning

Don't store the value of `CLOUDFLARE_API_TOKEN` in your repository, as it gives access to deploy Workers on your account. Instead, you should utilize your CI/CD provider's support for storing secrets.

1. Create a workflow that will be responsible for deploying the Worker. This workflow should run `wrangler deploy`. Review an example [GitHub Actions ↗](https://docs.github.com/en/actions/using-workflows/about-workflows) workflow in the following section.

### GitLab Pipelines

Refer to [GitLab's blog ↗](https://about.gitlab.com/blog/2022/11/21/deploy-remix-with-gitlab-and-cloudflare/) for an example pipeline. Under the `script` key, replace `npm run deploy` with [npx wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/external-cicd/gitlab-cicd/#page","headline":"GitLab CI/CD · Cloudflare Workers docs","description":"Integrate Workers development into your existing GitLab Pipelines workflows.","url":"https://developers.cloudflare.com/workers/ci-cd/external-cicd/gitlab-cicd/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/ci-cd/","name":"CI/CD"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/ci-cd/external-cicd/","name":"External CI/CD"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/ci-cd/external-cicd/gitlab-cicd/","name":"GitLab CI/CD"}}]}
```
