---
title: Git integration
description: Connect your Git provider to Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Git integration

In this guide, you will get started with Cloudflare Pages and deploy your first website to the Pages platform through Git integration. The Git integration enables automatic builds and deployments every time you push a change to your connected [GitHub](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/) or [GitLab](https://developers.cloudflare.com/pages/configuration/git-integration/gitlab-integration/) repository.

You cannot switch to Direct Upload later

If you deploy using the Git integration, you cannot switch to [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) later. However, if you already use a Git-integrated project and do not want to trigger deployments every time you push a commit, you can [disable automatic deployments](https://developers.cloudflare.com/pages/configuration/git-integration/#disable-automatic-deployments) on all branches. Then, you can use Wrangler to deploy directly to your Pages projects and make changes to your Git repository without automatically triggering a build.

## Connect your Git provider to Pages

Pages offers support for [GitHub ↗](https://github.com/) and [GitLab ↗](https://gitlab.com/). To create your first Pages project:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application** \> **Pages** \> **Connect to Git**.

You will be prompted to sign in with your preferred Git provider. This allows Cloudflare Pages to deploy your projects, and update your PRs with [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

Note

Signing in with GitLab will grant Pages access to all repositories on your account. Additionally, if you are a part of a multi-user Cloudflare account, and you sign in with GitLab, other members will also have the ability to deploy your repositories to Pages.

If you are using GitLab, you must have the **Maintainer** role or higher on the repository to successfully deploy with Cloudflare Pages.

### Select your GitHub repository

You can select a GitHub project from your personal account or an organization you have given Pages access to. This allows you to choose a GitHub repository to deploy using Pages. Both private and public repositories are supported.

### Select your GitLab repository

If using GitLab, you can select a project from your personal account or from a GitLab group you belong to. This allows you to choose a GitLab repository to deploy using Pages. Both private and public repositories are supported.

## Configure your deployment

Once you have selected a Git repository, select **Install & Authorize** and **Begin setup**. You can then customize your deployment in **Set up builds and deployments**.

Your **project name** will be used to generate your project's hostname. By default, this matches your Git project name.

**Production branch** indicates the branch that Cloudflare Pages should use to deploy the production version of your site. For most projects, this is the `main` or `master` branch. All other branches that are not your production branch will be used for [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

Note

You must have pushed at least one branch to your GitHub or GitLab project in order to select a **Production branch** from the dropdown menu.

![Set up builds and deployments page with Project name and Production branch filled in](https://developers.cloudflare.com/_astro/configuration.C_N8MiKW_29FWsj.webp) 

### Configure your build settings

Depending on the framework, tool, or project you are deploying to Cloudflare Pages, you will need to specify the site's **build command** and **build output directory** to tell Cloudflare Pages how to deploy your site. The content of this directory is uploaded to Cloudflare Pages as your website's content.

No framework required

You do not need a framework to deploy with Cloudflare Pages. You can continue with the Get started guide without choosing a framework, and refer to [Deploy your site](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) for more information on deploying your site without a framework.

The dashboard provides a number of framework-specific presets. These presets provide the default build command and build output directory values for the selected framework. If you are unsure what the correct values are for this section, refer to [Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/). If you do not need a build step, leave the **Build command** field blank.

![Build setting fields that need to be filled in](https://developers.cloudflare.com/_astro/build-settings.BREiHFn0_1Cthdx.webp) 

Cloudflare Pages begins by working from your repository's root directory. The entire build pipeline, including the installation steps, will begin from this location. If you would like to change this, specify a new root directory location through the **Root directory (advanced)** \> **Path** field.

![Root directory field to be filled in](https://developers.cloudflare.com/_astro/root-directory.CKTDgRpM_Z12p3GE.webp) 

Understanding your build configuration

The build command is provided by your framework. For example, the Gatsby framework uses `gatsby build` as its build command. When you are working without a framework, leave the **Build command** field blank.

The build output directory is generated from the build command. Each [framework](https://developers.cloudflare.com/pages/configuration/build-configuration/#framework-presets) has its own naming convention, for example, the build output directory is named `/public` for many frameworks.

The root directory is where your site's content lives. If not specified, Cloudflare assumes that your linked Git repository is the root directory. The root directory needs to be specified in cases like monorepos, where there may be multiple projects in one repository.

Refer to [Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) for more information.

### Environment variables

Environment variables are a common way of providing configuration to your build workflow. While setting up your project, you can specify a number of key-value pairs as environment variables. These can be further customized once your project has finished building for the first time.

Refer to the [Hexo framework guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hexo-site/#using-a-specific-nodejs-version) for more information on how to set up a Node.js version environment variable.

After you have chosen your _Framework preset_ or left this field blank if you are working without a framework, configured **Root directory (advanced)**, and customized your **Environment variables (optional)**, you are ready to deploy.

## Your first deploy

After you have finished setting your build configuration, select **Save and Deploy**. Your project build logs will output as Cloudflare Pages installs your project dependencies, builds the project, and deploys it to Cloudflare's global network.

![Deployment details in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/deploy-log.D8BQ4nzJ_Z100nHP.webp) 

When your project has finished deploying, you will receive a unique URL to view your deployed site.

DNS errors

If you encounter a DNS error after visiting your site after your first deploy, this might be because the DNS has not had time to propagate. To solve the error, wait for the DNS to propagate, or try another device or network to resolve the error.

## Manage site

After your first deploy, select **Continue to project** to see your project's configuration in the Cloudflare Pages dashboard. On this page, you can see your project's current deployment status, the production URL and associated commit, and all past deployments.

![Site dashboard displaying your environments and deployments](https://developers.cloudflare.com/_astro/site-dashboard.Ct8X8ZRP_jnOJJ.webp) 

### Delete a project

To delete your Pages project:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project > **Settings** \> **Delete project**.

Warning

For projects with a custom domain, you must first delete the CNAME record associated with your Pages project. Failure to do so may leave the DNS records active, causing your domain to point to a Pages project that no longer exists. Refer to [Deleting a custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/#delete-a-custom-domain) for instructions.

For projects without a custom domain (any project on a `*.pages.dev` subdomain), your project can be deleted in the project's settings.

## Advanced project settings

In the **Settings** section, you can configure advanced settings, such as changing your project name, updating your Git configuration, or updating your build command, build directory or environment variables.

## Related resources

* Set up a [custom domain for your Pages project](https://developers.cloudflare.com/pages/configuration/custom-domains/).
* Enable [Cloudflare Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/).
* Set up Access policies to [manage who can view your deployment previews](https://developers.cloudflare.com/pages/configuration/preview-deployments/#customize-preview-deployments-access).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/get-started/git-integration/#page","headline":"Git integration guide · Cloudflare Pages docs","description":"Connect your Git provider to Pages.","url":"https://developers.cloudflare.com/pages/get-started/git-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/get-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/get-started/git-integration/","name":"Git integration"}}]}
```
