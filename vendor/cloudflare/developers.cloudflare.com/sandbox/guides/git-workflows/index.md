---
title: Work with Git
description: Clone repositories, manage branches, and automate Git operations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Work with Git

This guide shows you how to clone repositories, manage branches, and automate Git operations in the sandbox.

## Clone repositories

* [  JavaScript ](#tab-panel-10407)
* [  TypeScript ](#tab-panel-10408)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, "my-sandbox");


// Basic clone

await sandbox.gitCheckout("https://github.com/user/repo");


// Clone specific branch

await sandbox.gitCheckout("https://github.com/user/repo", {

  branch: "develop",

});


// Shallow clone (faster for large repos)

await sandbox.gitCheckout("https://github.com/user/large-repo", {

  depth: 1,

});


// Clone to specific directory

await sandbox.gitCheckout("https://github.com/user/my-app", {

  targetDir: "/workspace/project",

});


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


const sandbox = getSandbox(env.Sandbox, 'my-sandbox');


// Basic clone

await sandbox.gitCheckout('https://github.com/user/repo');


// Clone specific branch

await sandbox.gitCheckout('https://github.com/user/repo', {

  branch: 'develop'

});


// Shallow clone (faster for large repos)

await sandbox.gitCheckout('https://github.com/user/large-repo', {

  depth: 1

});


// Clone to specific directory

await sandbox.gitCheckout('https://github.com/user/my-app', {

  targetDir: '/workspace/project'

});


```

## Clone private repositories

Use a personal access token in the URL:

* [  JavaScript ](#tab-panel-10397)
* [  TypeScript ](#tab-panel-10398)

JavaScript

```

const token = env.GITHUB_TOKEN;

const repoUrl = `https://${token}@github.com/user/private-repo.git`;


await sandbox.gitCheckout(repoUrl);


```

TypeScript

```

const token = env.GITHUB_TOKEN;

const repoUrl = `https://${token}@github.com/user/private-repo.git`;


await sandbox.gitCheckout(repoUrl);


```

More secure alternative

Embedding a token in the URL passes the credential directly into the sandbox. For better access control, use a Worker proxy that validates a short-lived JWT and injects the real token at request time — the sandbox never holds the credential. Refer to [Proxy requests to external APIs](https://developers.cloudflare.com/sandbox/guides/proxy-requests/).

## Clone and build

Clone a repository and run build steps:

* [  JavaScript ](#tab-panel-10399)
* [  TypeScript ](#tab-panel-10400)

JavaScript

```

await sandbox.gitCheckout("https://github.com/user/my-app");


const repoName = "my-app";


// Install and build

await sandbox.exec(`cd ${repoName} && npm install`);

await sandbox.exec(`cd ${repoName} && npm run build`);


console.log("Build complete");


```

TypeScript

```

await sandbox.gitCheckout('https://github.com/user/my-app');


const repoName = 'my-app';


// Install and build

await sandbox.exec(`cd ${repoName} && npm install`);

await sandbox.exec(`cd ${repoName} && npm run build`);


console.log('Build complete');


```

## Work with branches

* [  JavaScript ](#tab-panel-10401)
* [  TypeScript ](#tab-panel-10402)

JavaScript

```

await sandbox.gitCheckout("https://github.com/user/repo");


// Switch branches

await sandbox.exec("cd repo && git checkout feature-branch");


// Create new branch

await sandbox.exec("cd repo && git checkout -b new-feature");


```

TypeScript

```

await sandbox.gitCheckout('https://github.com/user/repo');


// Switch branches

await sandbox.exec('cd repo && git checkout feature-branch');


// Create new branch

await sandbox.exec('cd repo && git checkout -b new-feature');


```

## Make changes and commit

* [  JavaScript ](#tab-panel-10409)
* [  TypeScript ](#tab-panel-10410)

JavaScript

```

await sandbox.gitCheckout("https://github.com/user/repo");


// Modify a file

const readme = await sandbox.readFile("/workspace/repo/README.md");

await sandbox.writeFile(

  "/workspace/repo/README.md",

  readme.content + "\n\n## New Section",

);


// Commit changes

await sandbox.exec('cd repo && git config user.name "Sandbox Bot"');

await sandbox.exec('cd repo && git config user.email "bot@example.com"');

await sandbox.exec("cd repo && git add README.md");

await sandbox.exec('cd repo && git commit -m "Update README"');


```

TypeScript

```

await sandbox.gitCheckout('https://github.com/user/repo');


// Modify a file

const readme = await sandbox.readFile('/workspace/repo/README.md');

await sandbox.writeFile('/workspace/repo/README.md', readme.content + '\n\n## New Section');


// Commit changes

await sandbox.exec('cd repo && git config user.name "Sandbox Bot"');

await sandbox.exec('cd repo && git config user.email "bot@example.com"');

await sandbox.exec('cd repo && git add README.md');

await sandbox.exec('cd repo && git commit -m "Update README"');


```

## Best practices

* **Use shallow clones** \- Faster for large repos with `depth: 1`
* **Store credentials securely** \- Use environment variables for tokens
* **Clean up** \- Delete unused repositories to save space

## Troubleshooting

### Authentication fails

Verify your token is set:

* [  JavaScript ](#tab-panel-10405)
* [  TypeScript ](#tab-panel-10406)

JavaScript

```

if (!env.GITHUB_TOKEN) {

  throw new Error("GITHUB_TOKEN not configured");

}


const repoUrl = `https://${env.GITHUB_TOKEN}@github.com/user/private-repo.git`;

await sandbox.gitCheckout(repoUrl);


```

TypeScript

```

if (!env.GITHUB_TOKEN) {

  throw new Error('GITHUB_TOKEN not configured');

}


const repoUrl = `https://${env.GITHUB_TOKEN}@github.com/user/private-repo.git`;

await sandbox.gitCheckout(repoUrl);


```

### Large repository timeout

Use shallow clone:

* [  JavaScript ](#tab-panel-10403)
* [  TypeScript ](#tab-panel-10404)

JavaScript

```

await sandbox.gitCheckout("https://github.com/user/large-repo", {

  depth: 1,

});


```

TypeScript

```

await sandbox.gitCheckout('https://github.com/user/large-repo', {

  depth: 1

});


```

## Related resources

* [Files API reference](https://developers.cloudflare.com/sandbox/api/files/) \- File operations after cloning
* [Execute commands guide](https://developers.cloudflare.com/sandbox/guides/execute-commands/) \- Run git commands
* [Manage files guide](https://developers.cloudflare.com/sandbox/guides/manage-files/) \- Work with cloned files

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/git-workflows/#page","headline":"Work with Git · Cloudflare Sandbox SDK docs","description":"Clone repositories, manage branches, and automate Git operations.","url":"https://developers.cloudflare.com/sandbox/guides/git-workflows/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/git-workflows/","name":"Work with Git"}}]}
```
