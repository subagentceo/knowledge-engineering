# Set up your PHP development environment

In this guide, you will learn how to set up your PHP development environment for building applications with Twilio. By following this guide, you will install PHP, set up Composer for dependency management, install the Twilio PHP SDK, and configure ngrok to expose your local development environment to the internet.

## Prerequisites

Before you begin this setup guide, make sure you have:

* Administrative access to your computer to install software.
* A stable internet connection for downloading packages and dependencies.
* Basic familiarity with using the command line/terminal.
* A [Twilio account](https://www.twilio.com/try-twilio) (free tier available).

**Time to complete**: Approximately 15-30 minutes depending on your operating system and internet speed.

## Install PHP

How you install PHP varies depending on your operating system.

| Operating system | Instructions                                                                                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| macOS            | The easiest way to install PHP on macOS is to use the official installer from [php.net](https://php.net/manual/en/install.macosx.php). You can also use [Homebrew](https://brew.sh/) if you prefer: `brew install php`. |
| Windows          | To install PHP on Windows, use the official installer from [php.net](https://php.net/manual/en/install.windows.php). You can also use [Chocolatey](https://chocolatey.org/install) if you prefer: `choco install php`.  |
| Linux            | The exact instructions to install PHP vary by distribution. Find instructions for [Ubuntu or Debian](https://php.net/manual/en/install.unix.debian.php).                                                                |

## Install a text editor or IDE

Before you start your PHP project, you'll need a text editor or Integrated Development Environment (IDE).

If you already have a preferred text editor or IDE, you can use it for developing your PHP application. If you're looking for something new, you should try out a few options:

* [Visual Studio Code](https://code.visualstudio.com/) is a popular code editor with integrated support for PHP through extensions.
* [Vim](https://www.vim.org/download.php) is a perennial favorite text editor among advanced users.
* [Emacs](https://www.gnu.org/software/emacs/manual/html_node/efaq/Installing-Emacs.html) is a highly configurable editor that can be extended via Lisp.

## Install Composer

[Composer](https://getcomposer.org/) is a tool for dependency management in PHP. It allows you to declare the libraries your project depends on, and it will manage them for you.

**Note**: Composer requires PHP to be installed first. Make sure you've completed the [Install PHP](#install-php) section above before proceeding.

Before you can use Composer, you'll need to install it on your system:

| Operating system | Instructions                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| macOS            | **Recommended**: Download and install from [getcomposer.org](https://getcomposer.org/download/) using the installer script: `curl -sS https://getcomposer.org/installer \\\| php -- --install-dir=/usr/local/bin --filename=composer`. **Alternative**: Use [Homebrew](https://brew.sh/) if you have it working: `brew install composer`. |
| Windows          | Download the installer from [getcomposer.org](https://getcomposer.org/download/) and run the setup wizard.                                                                                                                                                                                                                                |
| Linux            | Download and install using the command line instructions at [getcomposer.org](https://getcomposer.org/download/), or use your distribution's package manager.                                                                                                                                                                             |

To verify you installed Composer correctly, run:

```bash
composer --version
```

You will see output similar to `Composer version 2.x.x`.

### Troubleshooting Composer installation on macOS

If you encounter issues with Homebrew (such as download failures or missing dependencies), use the direct installation method instead.

**Note**: Make sure PHP is installed first (see the [Install PHP](#install-php) section above) before running these commands.

1. Download and run the Composer installer:

```bash
curl -sS https://getcomposer.org/installer | php
```

2. Move Composer to a directory in your PATH:

```bash
sudo mv composer.phar /usr/local/bin/composer
```

3. Make it executable:

```bash
sudo chmod +x /usr/local/bin/composer
```

4. Verify the installation:

```bash
composer --version
```

## Start a new project with Composer

To start a new project with Composer:

1. Create a new empty directory in your development environment:

```bash
mkdir twilio-php-app
cd twilio-php-app
```

2. Initialize the project:

```bash
composer init
```

Follow the prompts to complete the initialization:

* **Package name**: Enter in `vendor/project` format (e.g., `yourname/twilio-php-app`).
* **Description**: Brief project description (optional).
* **Dependencies**: Skip for now as you will add them next.
* **Autoloading**: Accept PSR-4 mapping to `src/` directory.

Composer will create a new `composer.json` file when you're done.

**Note**: You must follow the prompts to set up your `composer.json` file. This step is required to continue.

## Install the Twilio PHP SDK

You're almost ready to start writing your PHP application, but first, you need to install the Twilio PHP SDK.

Install the Twilio SDK using Composer:

```bash
composer require twilio/sdk
```

## Create a basic PHP application

You can test that your development environment has been configured correctly by creating a basic PHP application.

Create a new PHP file named `index.php` with the following content:

```php
<?php
require_once "vendor/autoload.php";

use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->say("Hello World!");

header("Content-Type: text/xml");
echo $response;
```

Run your PHP web application with the command:

```bash
php -S localhost:3000
```

You can then open `http://localhost:3000/index.php` in your browser and see the `<Response><Say>Hello World!</Say></Response>` response.

## Set up ngrok for webhook development

Once you see your sample PHP web application's `<Response><Say>Hello World!</Say></Response>` message, your development environment is ready to go. But for most Twilio projects, you'll want to install one more helpful tool: [ngrok](https://ngrok.com).

Most Twilio services use [webhooks](https://www.twilio.com/docs/glossary/what-is-a-webhook) to communicate with your application. When Twilio receives an incoming phone call, for example, it reaches out to a URL in your application for instructions on how to handle the call.

When you're working on your PHP web application in your development environment, your app is only reachable by other programs on the same computer, so Twilio won't be able to communicate with it.

ngrok is a tool for solving this problem. Once started, it provides a unique URL on the `ngrok.io` domain that will forward incoming requests to your local development environment.

### Install ngrok

There are several ways to install ngrok on macOS:

**Option 1: Using Homebrew (recommended)**

```bash
brew install ngrok
```

**Option 2: Download manually**

1. Download the binary from the [ngrok download page](https://ngrok.com/download) for your operating system.
2. Extract the downloaded file and move it to a directory in your PATH:

```bash
sudo mv ngrok /usr/local/bin/ngrok
sudo chmod +x /usr/local/bin/ngrok
```

**Option 3: Install globally with npm**

```bash
npm install -g ngrok
```

### Start ngrok

Once ngrok has been installed, make sure your PHP web application is running on localhost port 3000, then start ngrok with the following command, perhaps in a second terminal:

```bash
ngrok http 3000
```

If ngrok is not in your PATH and you downloaded it manually, you may need to run:

```bash
./ngrok http 3000
```

*Note: Use this command from the directory where you extracted the ngrok binary.*

The output should look similar to this:

![Ngrok session showing status online with forwarding URLs to localhost:5000.](https://docs-resources.prod.twilio.com/074f6a836d8dd64cf4c59b6205441d04a7268aa68ee7499ace1ca76901f0b920.png)

Find the "Forwarding" line in the output to see your unique ngrok domain name (for example, `aaf29606.ngrok.io`). Open your web browser and enter this domain name in the address bar.

If everything is working correctly, you should see your PHP web application's `<Response><Say>Hello World!</Say></Response>` message displayed at your new ngrok URL.

Anytime you're working on your Twilio application and need a URL for a webhook, you should use ngrok to get a publicly accessible URL like this one.

## Next steps

You're ready to build out your PHP web application. Learn more with the following resources:

### Twilio

* [SMS developer quickstart](/docs/messaging/quickstart)
* [WhatsApp Business Platform with Twilio quickstart](/docs/whatsapp/quickstart)
* [Programmable Voice quickstart](/docs/voice/quickstart/server)
* [Email API Quickstart for PHP](/docs/sendgrid/for-developers/sending-email/quickstart-php)

### PHP

* [PHP Official Website](https://php.net/)
* [PHP: Getting Started Guide](https://php.net/manual/en/getting-started.php)
