# Command-Line Interface (CLI) Quickstart

The Twilio CLI allows you to manage your Twilio resources from your terminal or command prompt. Let's get it installed and take a quick tour.

> \[!NOTE]
>
> Starting with Twilio CLI version 6.0.0, only Node.js version 20 or later is supported. If you are using an older version of Node.js, please upgrade to Node.js version 20 or later.
> For more information, see [Twilio CLI Node.js 18 version deprecation](/docs/twilio-cli/getting-started/twilio-cli-support-update).

## Install the Twilio CLI

Choose your preferred installation method from the following options:

## homebrew

To install the CLI on macOS using [Homebrew](https://brew.sh/), run:

```bash
brew tap twilio/brew && brew install twilio
```

## apt

To install the CLI on distributions such as Debian, Ubuntu, Linux Mint, and more using [Advanced Package Tool](https://en.wikipedia.org/wiki/APT_\(software\)) (apt), run the following:

```bash
wget -qO- https://twilio-cli-prod.s3.amazonaws.com/twilio_pub.asc \
  | sudo apt-key add -
sudo touch /etc/apt/sources.list.d/twilio.list
echo 'deb https://twilio-cli-prod.s3.amazonaws.com/apt/ /' \
  | sudo tee /etc/apt/sources.list.d/twilio.list
sudo apt update
sudo apt install -y twilio
```

## scoop

To install the CLI on Windows using [Scoop](https://scoop.sh/), run PowerShell [as an administrator](https://www.techadvisor.com/how-to/windows/run-programs-as-administrator-windows-10-3632744/) and execute these commands:

```bash
scoop bucket add twilio-scoop https://github.com/twilio/scoop-twilio-cli
scoop install twilio
```

## Docker

To run the Twilio CLI as a Docker image with an interactive bash shell, run:

```bash
docker run -it --rm twilio/twilio-cli bash
```

Consult the [dedicated Twilio CLI Docker documentation](/docs/twilio-cli/getting-started/docker) for more details on usage.

## npm

> \[!CAUTION]
>
> It's strongly recommended to use one of the other installation methods if possible. If you install the Twilio CLI with npm then it doesn't auto-update and it uses your system's version of Node.js, which might be older than the version Twilio develops the CLI against.

To globally install the Twilio CLI so that it can be used from any directory, use:

```bash
npm install -g twilio-cli
```

> \[!NOTE]
>
> Refer to the [CLI install documentation](/docs/twilio-cli/getting-started/install) for more installation methods.

Once the CLI has finished installing, run `twilio --version` (or `twilio -v`) to verify your installation.

You'll see output similar to the following:

```bash
$ twilio --version
twilio-cli/6.0.1 linux-x64 node-v20.19.3
```

## Log in to your Twilio account

For the CLI to access your Twilio account and execute commands on your behalf, you need to log in and provide your Twilio credentials.

Run the following command to log in:

```bash
twilio login
```

You will be prompted for your **Account SID** and **Auth Token**, both of which you can find on the dashboard of your [Twilio Console](https://www.twilio.com/console).

This will create an [API Key](/docs/glossary/what-is-an-api-key) for you that will be stored securely and used to issue authenticated requests as you use the CLI. This secure API Key and your settings will be stored locally as a [profile](/docs/twilio-cli/general-usage/profiles).

> \[!NOTE]
>
> Refer to the [profiles guide](/docs/twilio-cli/general-usage/profiles) if you would like to use multiple accounts or profiles with the Twilio CLI on the same machine.

## Install CLI autocomplete (Bash or Zsh only)

[Autocomplete](/docs/twilio-cli/general-usage/autocomplete) allows you to type part of a command, parameter, or flag, and the Twilio CLI will either complete the command or display suggestions for you. If you have autocomplete turned on, you can prompt the CLI for these suggestions by pressing the `Tab` key.

Turn on autocomplete by running the appropriate command for your shell:

## bash

```bash
twilio autocomplete bash
```

## zsh

```bash
twilio autocomplete zsh
```

Follow the resulting instructions and either restart your shell or open another instance to finish installing command autocomplete.

> \[!WARNING]
>
> If suggestions aren't appearing, double-check that you restarted your shell or opened another instance since installing.

## Explore the Twilio CLI

The best way to learn about what you can do with the CLI is to run the following command:

```bash
twilio
```

When you do, you will get a list of the various topics and commands available to run. **Topics** are groupings for more topics and commands, similar to the folder structure on your file system.

You'll see output similar to this:

```bash
$ twilio
Unleash the power of Twilio from your command prompt. Visit https://twil.io/cli for documentation.

VERSION
  twilio-cli/6.0.1 linux-x64 node-v20.19.3

USAGE
  $ twilio [COMMAND]

TOPICS
  api            advanced access to all of the Twilio APIs
  config         manage Twilio CLI configurations
  debugger       Show a list of log events generated for the account
  email          sends emails to single or multiple recipients using Twilio SendGrid
  feedback       provide feedback to the CLI team
  phone-numbers  manage Twilio phone numbers
  plugins        list available plugins for installation
  profiles       manage credentials for Twilio profiles

COMMANDS
  autocomplete  display autocomplete installation instructions
  feedback      provide feedback to the CLI team
  help          display help for twilio
  login         create a new profile to store Twilio Account credentials and configuration
  plugins       list installed plugins
  update        update the twilio CLI
```

See something that looks interesting? Just try running it:

```bash
twilio api -h
```

Since `api` is a topic, you will actually be shown more topics and commands that are contained within that topic.

For example, you might discover this command:

```bash
twilio api:core:messages:list
```

If you run that command, it will list all of your SMS messages, which may be a lot. How can you filter them? Or, more generally, how can you discover what options a given CLI command provides?

Add `--help` or `-h` to the command like so:

```bash
twilio api:core:messages:list --help
```

```bash
twilio api:serverless:v1:services:create -h
```

If you type a command, you might get an error if you haven't provided all the required options. This is another situation where adding `--help` or `-h` to the command can give you more information.

> \[!NOTE]
>
> You can use spaces instead of colons when entering commands. These two commands are functionally identical:
>
> ```bash
> twilio api:core:messages:list
> ```
>
> ```bash
> twilio api core messages list
> ```

## Some quick examples

### List your Twilio phone numbers

```bash
twilio phone-numbers:list
```

### Send a text message

```bash
twilio api core messages create \
  --from "+15017122661" \
  --to "+15558675310" \
  --body "I sent this from my terminal 😎"
```

## What's next?

After completing this quickstart, explore these resources to learn more:

### View examples

View our [examples](/docs/twilio-cli/examples) for inspiration on what you can do with the Twilio CLI.

### Read the general usage guide

Refer to our [general usage guide](/docs/twilio-cli/general-usage) to read more about a variety of CLI features:

* [Store credentials in environment variables](/docs/twilio-cli/general-usage/profiles#use-environment-variables)
* [Direct Twilio Webhooks to your localhost for development and testing](/docs/twilio-cli/general-usage/work-with-webhooks)
* [Set different output formats for your use case](/docs/twilio-cli/general-usage/output-formatting-and-filtering)
* [Change logging levels and debug issues](/docs/twilio-cli/general-usage/logging-and-debugging)
* [Use multiple accounts or profiles](/docs/twilio-cli/general-usage/profiles#use-multiple-profiles)
* [Use your company's TLS certificate for API requests](https://help.twilio.com/hc/en-us/articles/4402293611419-Can-I-use-my-company-s-TLS-certificate-for-API-requests-using-the-Twilio-CLI-)
* [Split a command into multiple lines](https://help.twilio.com/hc/en-us/articles/4404183916955-Split-a-Twilio-CLI-Command-into-Multiple-Lines)

### Explore plugins

The Twilio CLI can be extended via [plugins](/docs/twilio-cli/plugins). You can publish your own for the community, or make them private for your own (or your clients') business workflows. There are already a [number of plugins](/docs/twilio-cli/plugins) available for you to extend your CLI.

### Send us feedback

Finally, we'd love to hear from you. Any time you have feedback you'd like to send us, run:

```bash
twilio feedback
```
