# Set up your Node.js and Express development environment

This guide covers how to set up your Node.js development environment for an [Express](https://expressjs.com/) project. After reading this guide, you will be able to set up your environment and use tools commonly used in Node.js applications that use Twilio: ngrok and the [Twilio Node.js SDK](https://github.com/twilio/twilio-node).

## Install Node.js

How you install Node.js varies depending on your operating system.

| Operating System | Instructions                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| macOS            | The easiest way to install Node.js on macOS is to use [the official installer from nodejs.org](https://nodejs.org/en/#download). You can also use [Homebrew](https://brew.sh/) if preferred. To manage and switch between versions of Node.js on your machine, consider using [nvm](https://github.com/nvm-sh/nvm).                          |
| Windows          | The easiest way to install Node.js on Windows is [the official installer from nodejs.org](https://nodejs.org/en/#download). You can also use [Chocolatey](https://chocolatey.org/) if preferred. To manage and switch between versions of Node.js on your machine, consider using [nvm-windows](https://github.com/coreybutler/nvm-windows). |
| Linux            | The Node.js [installation method](https://nodejs.org/en/download/package-manager/) varies by distribution. To manage and switch between versions of Node.js on your machine, consider using [nvm](https://github.com/nvm-sh/nvm).                                                                                                            |

## Install a text editor or IDE

Before starting a Node.js project, you need a code editor or Integrated Development Environment (IDE).

If you already have a preferred code editor, you can use it for developing your Node.js application. If you are looking for something new, consider the following options:

* [Visual Studio Code](https://code.visualstudio.com/) is currently the most popular code editor used for JavaScript projects. It is a fast, free editor and debugger that runs on all platforms and comes with many helpful tools already installed.
* [WebStorm](https://www.jetbrains.com/webstorm/) is a powerful IDE, built on the open-source IntelliJ Platform. It is free to try but requires a paid license after 30 days.
* [Node.js Tools for Visual Studio](https://www.visualstudio.com/vs/node-js/) is an extension for [Visual Studio](https://www.visualstudio.com/) that supports Node.js development.
* [Vim](https://www.vim.org/) is a popular favorite text editor among advanced users.

For those new to programming, Visual Studio Code is a good starting point.

## Start a new Node.js project with `npm init`

Before starting a new Node.js project, run `npm init` to create a new `package.json` file for the project.

1. Create a new empty directory in your development environment.
2. Run `npm init` inside the directory.
3. Answer the prompts to create a `package.json` file.

```bash
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterward to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (my-project)
version: (1.0.0)
entry point: (index.js)
test command:
git repository:
keywords:
author: Jane Doe
license: (ISC)
About to write to /Users/<your-username>/my-project/package.json:

{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample Twilio project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jane Doe",
  "license": "ISC"
}


Is this OK? (yes) yes
```

Now you're ready to install our Node.js dependencies.

> \[!NOTE]
>
> You can quickly initialize your project and skip the above prompts by running `npm init -y`

## Install Express.js and the Twilio Node.js SDK

You're almost ready to write an Express web application, but first, you need to install the Express package using `npm`.

```bash
# Use npm to install the express and Twilio packages
$ npm install express twilio
# List the installed dependencies and their versions
$ npm ls
my-project@1.0.0 /Users/<your-username>/my-project
├── express@4.17.1
└── twilio@3.67.2
```

Node.js uses [npm](https://www.npmjs.com/) to manage dependencies, so the command to install Express and the Twilio SDK to our development environment is `npm install express twilio`.

Installing these packages tells npm to add the Express and Twilio packages to the `dependencies` object in our project's `package.json` file. When we want to install these same packages again in the future - like on a production server - we can just run `npm install`.

## Create a simple Express.js application

You can test that you configured our development environment correctly by creating a simple Express application. You'll grab the ten-line example from Express's documentation and drop it in a new file called `index.js`.

The code you use depends on whether your project is configured for ES or CommonJS [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules):

**If your `package.json` contains `"type": "module"` (ES modules):**

```js
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

**If your `package.json` does not contain `"type": "module"` (CommonJS modules):**

```js
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

> \[!NOTE]
>
> Most Node.js projects use CommonJS modules by default. If you're unsure which to use, check your `package.json` file for the presence of `"type": "module"`.

You can then try running our new Express application with the command `node index.js`. If you open `http://localhost:3000` in your browser, you should see the `Hello World!` response.

> \[!WARNING]
>
> If you're using a virtual machine for your development environment, like [Vagrant](https://www.vagrantup.com/) and [Docker](https://www.docker.com), you might not see your Express application at the `localhost` hostname. Continue to the ngrok section for an easy way to fix this.

## Install ngrok for local development

Once you see your sample Express application's "Hello World!" message, your development environment is ready to go. However, for most Twilio projects you'll want to install one more helpful tool: [ngrok](https://ngrok.com).

Most Twilio services use [webhooks](https://en.wikipedia.org/wiki/Webhook) to communicate with your application. When Twilio receives an incoming phone call, for example, it reaches out to a URL in your application for instructions on how to handle the call.

When you're working on your Express application in your development environment, your app is only reachable by other programs on the same computer, so Twilio won't be able to talk to it.

Ngrok is our favorite tool for solving this problem. Once started, it provides a unique URL on the ngrok.io domain which will forward incoming requests to your local development environment.

To start, head over to the ngrok download page and grab the binary for your operating system: [https://ngrok.com/download](https://ngrok.com/download)

Once downloaded, make sure your Express application is running, and then start ngrok using the command `./ngrok http 3000`. You should see output similar to this:

```bash
ngrok by @inconshreveable                                                           (Ctrl+C to quit)

Session Status   online
Account          <Your name> (Plan: Free)
Version          2.3.40
Region           United States (us)
Web Interface    http://127.0.0.1:4040
Forwarding       http://6e81-2601-1c0-6100-5087-309b-c292-5e5f-1f.ngrok.io -> http://localhost:3000
Forwarding       https://6e81-2601-1c0-6100-5087-309b-c292-5e5f-1f.ngrok.io -> http://localhost:3000

Connections      ttl     opn     rt1     rt5     p50     p90
                 0       0       0.00    0.00    0.00    0.00
```

Your unique ngrok domain name will be visible on the "Forwarding" line. Here, ours is `https://6e81-2601-1c0-6100-5087-309b-c292-5e5f-1f.ngrok.io`.

If everything is working correctly, you should be able to open that domain name in your browser and see your Express application's "Hello World!" message displayed at your new ngrok URL.

Anytime you're working on your Twilio application and need a URL for a webhook, use ngrok to get a publicly accessible URL like this one.

## Next steps

You're ready to build out your Node.js application. Learn more with the following resources:

* [SMS developer quickstart](/docs/messaging/quickstart)
* [WhatsApp Business Platform with Twilio quickstart](/docs/whatsapp/quickstart)
* [Programmable Voice quickstart](/docs/voice/quickstart/server)
* [Email API Quickstart for Node.js](/docs/sendgrid/for-developers/sending-email/quickstart-nodejs)
