---
title: Manage secrets with Pulumi ESC
description: Pulumi ESC (Environments, Secrets, and Configuration) is a secure and robust secrets management solution. The tutorial will walk you through how to develop with Wrangler while following security best practices.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pulumi/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage secrets with Pulumi ESC

**Last reviewed:**  almost 2 years ago 

In this tutorial, you will receive step-by-step instructions on using Pulumi ESC (Environments, Secrets, and Configuration), which is a secure and robust secrets management solution.

The tutorial will walk you through how to develop with Wrangler while following security best practices.

Specifically, you will learn how to manage your `CLOUDFLARE_API_TOKEN` for logging in to your Cloudflare account, pass ESC-stored secrets to Workers, and programmatically load your `.dev.vars` file.

Note

You will provision resources that qualify under free tier offerings for both Pulumi Cloud and Cloudflare.

## Before you begin

Ensure you have:

* A Cloudflare account. [Sign up for a Cloudflare account ↗](https://www.cloudflare.com/sign-up).
* A Pulumi Cloud account. [Sign up for a Pulumi Cloud ↗](https://app.pulumi.com/signup).
* The [Pulumi ESC CLI ↗](https://www.pulumi.com/docs/install/esc/) installed.
* A Wrangler project. To create one, follow the [Create a New Worker project step](https://developers.cloudflare.com/workers/get-started/guide/#1-create-a-new-worker-project).

## 1\. Set up a new Environment

A [Pulumi ESC Environment ↗](https://www.pulumi.com/docs/esc/environments/), or Environment, is a YAML file containing configurations and secrets for your application and infrastructure. These can be accessed in several ways, including shell commands. All ESC Environments reside in your Pulumi Cloud account.

### a. Log in to Pulumi Cloud

Use the Pulumi ESC CLI to log into your Pulumi Cloud account.

Terminal window

```

esc login


```

```

Logged in to pulumi.com as  ....


```

### b. Create a new Environment

Note

Environment names must be unique within a Pulumi organization and may only contain alphanumeric characters, hyphens, underscores, and periods.

Terminal window

```

ESC_ENV=wrangler/my-dev-environment

esc env init $ESC_ENV


```

```

Environment created.


```

## 2\. Log into Cloudflare

Now that the Pulumi ESC Environment has been created, it can be consumed in various ways. For instance, to log into your Cloudflare account without needing to predefine credentials in your shell.

### a. Add your credentials

By externally and securely storing your `CLOUDFLARE_API_TOKEN`, you can control access and rotate the token value. We will run `wrangler` in non-interactive mode, which requires:

* Your Cloudflare [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/)
* A valid Cloudflare API [token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)

Replace the placeholder `123abc` with your corresponding values:

Terminal window

```

esc env set $ESC_ENV environmentVariables.CLOUDFLARE_ACCOUNT_ID 123abc

esc env set $ESC_ENV environmentVariables.CLOUDFLARE_API_TOKEN  123abc --secret


```

Note

The API token is declared as a `secret`. Once the Environment is saved, Pulumi will encrypt its value and replace it with ciphertext.

### b. Log out

Ensure you're not currently logged in to your Cloudflare account.

Terminal window

```

npx wrangler logout


```

```

Not logged in, exiting...


```

### c. Log in

Pass ESC-stored Cloudflare credentials to Wrangler.

Terminal window

```

esc run ${ESC_ENV} npx wrangler whoami


```

```

Getting User settings...

👋 You are logged in with an API Token.


```

When you use the `esc run` command, it opens the Environment and sets the specified Environment variables into a temporary environment. After that, it uses those variables in the context of the `wrangler` command. This is especially helpful when running `wrangler` commands in a CI/CD environment but wanting to avoid storing credentials directly in your pipeline.

## 3\. Add Worker secrets

Pulumi ESC centralizes secrets, and Wrangler can be used to pass them on to Workers and other Cloudflare resources. You will use the `wrangler secret put` command for this purpose.

### a. Add a secret

Terminal window

```

esc env set ${ESC_ENV} environmentVariables.TOP_SECRET "aliens are real" --secret


```

### b. Pass the secret to your Worker

Terminal window

```

esc run -i ${ESC_ENV} -- sh -c 'echo "$TOP_SECRET" | npx wrangler secret put TOP_SECRET'


```

By using an external secrets management solution, commonly used Worker secrets can be stored in a single shared Environment that is accessed by the relevant Workers. You can use shell commands with `esc` to incorporate scripting and integrate them into deployment pipelines or `make` commands. Use `esc [command] --help` for more information about the various commands available in the CLI.

## 4\. Load `.dev.vars`

In this step, you will configure an Environment to load your `.dev.vars` file programmatically.

Note

The `.dev.vars` file is located in the root of your Wrangler project to define secrets used when running `wrangler dev`. For more information, refer to [Local Development with Secrets](https://developers.cloudflare.com/workers/configuration/secrets/#local-development-with-secrets).

With a dedicated ESC Environment to store all the `.dev.vars` secrets, you can use a `dotenv` export flag.

### a. Create an Environment

Terminal window

```

E=wrangler/my-devvars

esc env init $E


```

```

Environment created.


```

### b. Add a secret

Terminal window

```

esc env set $E environmentVariables.TOP_SECRET  "the moon is made of cheese" --secret


```

### c. Generate the `.dev.vars` file

Terminal window

```

esc env open ${E} --format dotenv > .dev.vars


```

As `.dev.vars` files may often contain secrets, they should not be committed to source control. Keeping these secrets externally ensures you can load them to a new development environment without any loss.

## Next steps

You have configured Pulumi ESC Environments to load secrets for Wrangler commands, enhancing security during development with Wrangler. The externalized secrets are now reusable across Workers. [Learn more about Pulumi ESC features and integrations ↗](https://www.pulumi.com/docs/esc/) or follow the [Deploy a Worker with Pulumi](https://developers.cloudflare.com/pulumi/tutorial/hello-world/) tutorial.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pulumi/tutorial/manage-secrets/#page","headline":"Manage secrets with Pulumi ESC · Pulumi docs","description":"Pulumi ESC (Environments, Secrets, and Configuration) is a secure and robust secrets management solution. The tutorial will walk you through how to develop with Wrangler while following security best practices.","url":"https://developers.cloudflare.com/pulumi/tutorial/manage-secrets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pulumi/","name":"Pulumi"}},{"@type":"ListItem","position":3,"item":{"@id":"/pulumi/tutorial/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/pulumi/tutorial/manage-secrets/","name":"Manage secrets with Pulumi ESC"}}]}
```
