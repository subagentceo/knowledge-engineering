# SIP Quickstart

SIP (Session Initiation Protocol) is commonly used for VoIP calling. In this quickstart, you'll create a Twilio SIP Domain, register SIP clients, and place inbound and outbound calls through the PSTN. You'll also get demo users and a prebuilt IVR that routes calls to extensions.

## Time to complete

Approximately 20-30 minutes

## Prerequisites

Before you begin, make sure you have the following:

* A [Twilio account](https://www.twilio.com/try-twilio).
* A Twilio phone number with Voice capabilities. Buy one in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/number-requests) or the [legacy Console](https://console.twilio.com/us1/develop/phone-numbers/manage/search).
* [Node.js](https://nodejs.org/) installed (version 14 or higher) on your local machine.
* A SIP softphone client such as [Zoiper](https://www.zoiper.com/en/voip-softphone/download/current) or [Linphone](https://www.linphone.org/releases/).
* Basic familiarity with your terminal or command line interface.

### What is a softphone?

A softphone is a software application that lets you make voice calls over the internet using your computer or mobile device instead of a traditional phone. Softphones connect to SIP servers so you can make and receive calls through your SIP account.

> \[!NOTE]
>
> This quickstart will use MacOS or Linux commands. Windows users can use [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install) to run these commands.

## Install the Twilio CLI

The Twilio Command Line Interface, CLI, allows you to interact with the Twilio API from your terminal.

## macOS

The suggested way to install `twilio-cli` on macOS is to use [Homebrew](https://brew.sh/). If you don't already have it installed, [visit the Homebrew site](https://brew.sh/) for installation instructions and then return here.

Once you have installed Homebrew, run the following command to install `twilio-cli`:

```bash
brew tap twilio/brew && brew install twilio
```

## Windows

The suggested way to install `twilio-cli` is by using [Scoop](https://scoop.sh/), a command-line installer for Windows. If you don't already have it installed, [visit the Scoop site](https://scoop.sh/) for installation instructions and then return here.

**Note** PowerShell will need to be [run as an administrator](https://www.techadvisor.com/how-to/windows/run-programs-as-administrator-windows-10-3632744/) to avoid common permission issues when installing via Scoop.

1. Add the `twilio-cli` [Bucket](https://github.com/ScoopInstaller/Scoop/wiki/Buckets):

   ```powershell
   scoop bucket add twilio-scoop https://github.com/twilio/scoop-twilio-cli
   ```
2. Install the app:

   ```powershell
   scoop install twilio
   ```

## Linux

`twilio-cli` can be installed using the [Advanced Package Tool](https://en.wikipedia.org/wiki/APT_\(software\)) (`apt`) on most distributions such as Debian, Ubuntu, and Mint.

To do so, run the following commands in your terminal:

```bash
wget -qO- https://twilio-cli-prod.s3.amazonaws.com/twilio_pub.asc \
  | sudo apt-key add -
sudo touch /etc/apt/sources.list.d/twilio.list
echo 'deb https://twilio-cli-prod.s3.amazonaws.com/apt/ /' \
  | sudo tee /etc/apt/sources.list.d/twilio.list
sudo apt update
sudo apt install -y twilio
```

> \[!NOTE]
>
> For other installation methods, see the [Twilio CLI Quickstart](/docs/twilio-cli/quickstart#install-the-twilio-cli).

## Install the Serverless Plugin

The Twilio CLI supports plugins, which give you additional control and superpowers. Install the serverless plugin to deploy functions from your local machine.

```bash
twilio plugins:install @twilio-labs/plugin-serverless
```

## Create your Application using a Function Template

The serverless plugin initializes an application from a template. The template includes everything you need: the ability to create and register a SIP domain, with demo users, a function that hosts an IVR (Interactive Voice Response) system to route calls to SIP users by extension, a splash page, and much more!

You'll examine the details after the application runs. For now, create your app.

This example names the project the same as the company, `acme`. If you want to name your project something else, replace `acme` in the commands below with your desired project name.

```bash
twilio serverless:init acme --template="sip-quickstart"
```

If the command runs successfully, it will look like the following:

```text
✔ Creating project directories and files
✔ Configuring Environment Variables in .env
✔ Saving README to /path/to/your/project/acme/readmes/sip-quickstart.md
✔ Installing Dependencies
✔ Creating asset: actions.private.js
✔ Creating asset: admin-client.js
✔ Creating asset: admin.css
✔ Creating asset: index.html
✔ Creating asset: shared.private.js
✔ Creating asset: statuses.private.js
✔ Creating asset: extensions.private.js
✔ Creating asset: index.html
✔ Creating asset: site.css
✔ Creating function: admin/check-status.js
✔ Creating function: admin/login.js
✔ Creating function: admin/perform-action.js
✔ Creating function: extension-menu.js
✔ Creating function: outbound-calls.js
✔ Creating function: sip-configuration.js
INFO Make sure to configure APP_NAME,ADMIN_PASSWORD,DEFAULT_SIP_USER_PASSWORD in the .env file
SUCCESS Downloaded new template into the "" subdirectories.
Check readmes/sip-quickstart.md for template instructions.
✔ Downloading template: "sip-quickstart"
✔ Downloading .gitignore file
✔ Installing dependencies
╭──────────────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Success!                                                                   │
│                                                                              │
│   Created acme at /path/to/your/project                                      │
│                                                                              │
│   Inside that directory, you can run the following command:                  │
│                                                                              │
│   npm start                                                                  │
│     Serves all functions in the ./functions subdirectory and assets in the   │
│     ./assets directory                                                       │
│                                                                              │
│   Get started by running:                                                    │
│                                                                              │
│   cd acme                                                                    │
│   npm start                                                                  │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
```

> \[!NOTE]
>
> If this command fails, make sure you have the latest version of the Twilio CLI and the serverless plugin installed. Then run the command again.

This creates a new folder named `acme` that contains all of your code.

```bash
cd acme
```

## Deploy your application

The serverless plugin deploys code from your local machine to the Twilio Serverless platform. Once deployed, your application runs at a publicly accessible URL.

```bash
twilio serverless:deploy
```

This command creates a Service that houses your hosted development environment. The command outputs all the functions and assets deployed to your *dev* environment.

Run this command whenever you want to make changes to your hosted live development environment.

> \[!NOTE]
>
> Note that the URLs are unique to your instance. This will create a new Serverless service and a new development environment.
>
> We understand that you might want to know what is being deployed to your account before doing so. If you want to, you can jump down to the [Learn More](#learn-more) section to learn more about what functions will be deployed to your account.

## Initialize your environment

Follow these steps to complete the setup of your SIP Domain with demo users:

### Step 1: Access the admin interface

When you deployed your application, the output presented a list of URLs. Find the URL that ends with `/admin/index.html`.

1. Open the URL in your browser - it will look like: `https://your-service-name.twil.io/admin/index.html`
2. You'll see a password prompt asking you to log in

### Step 2: Log in with default password

1. Enter the password: `default` (this is the initial `ADMIN_PASSWORD` from your `.env` file)
2. Click **Let me in** to access the admin interface

### Step 3: Initialize the application

After you log in, a message will say the following: **The SIP Quickstart requires that you set up a few things on your account**

1. Click the button that says **Initialize your application for your environment**
2. Wait for initialization to complete - this process creates:
   * A SIP Domain.
   * Three demo SIP credentials (`alice`, `bob`, `charlie`).
   * A credential list.
   * Necessary configurations for your SIP setup.
3. The page refreshes and displays a Configuration Checklist.

### Step 4: Review the configuration checklist

After initialization completes, the admin interface displays a Configuration Checklist with status indicators showing:

* SIP Domain is created.
* Credential List contains 3 accounts (`alice`, `bob`, `charlie`).
* The default password for the SIP credentials (e.g., `ThisIs1Password!`).
* Your incoming phone number.
* Links to the automatically initialized resources.

Note: There is a failing check for the admin password, since you haven't yet changed it from the default. You'll fix that later.

> \[!NOTE]
>
> The three demo users (`alice`, `bob`, and `charlie`) come pre-configured with extensions 100, 200, and 300, respectively. You use these usernames and extensions to register your SIP clients and route incoming calls.

## Explore your application

There is a splash page that you can now share with your team up and running at `/index.html`. Open that up in a browser.

This page displays your call in number and your outgoing caller id. Both of these values can be changed on the previous admin page.

### Register a demo SIP user

You can now register a SIP client with your domain. On this page you'll find a list of users and their registration SIP Domain. By default, the password is the same for all default users and appears on the admin page.

#### Connect your SIP account

Now let's configure a softphone client to register with your SIP Domain. You can configure all three demo users (`alice`, `bob`, `charlie`) on separate devices or softphone instances.

For the first user (Alice):

1. Download and install your chosen softphone client. This tutorial uses [Zoiper](https://twil.io/zoiper-download).
2. Open the softphone and select the option to add a new SIP account.
3. Enter the SIP credentials:
   * **Username**: `alice`
   * **Password**: The default SIP user password shown on your admin page (for example, `ThisIs1Password!`)
   * **Domain/Server**: The SIP Domain shown on the splash page (it looks like `your-service-name.sip.us1.twilio.com`)
   * **Transport**: UDP or TCP (either works)
4. Save the configuration and the softphone will attempt to register with your SIP Domain
5. Verify registration: You should see a status indicating "Registered" or "Connected"

> \[!WARNING]
>
> Important: Use the correct SIP Domain format. Your SIP Domain must include the `.sip.us1.twilio.com` suffix (or the appropriate regional suffix). This is the registration endpoint for your SIP clients.
>
> Using only the service name without the SIP-specific domain (for example, `your-service-name.twil.io`) will not work for SIP registration.
>
> You can check availability on the SIP Domains page in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains) or the [legacy Console](https://console.twilio.com/us1/develop/voice/manage/sip-domains). If it doesn't work, add an additional identifier to the domain (for example, `your-service-name-1234.sip.us1.twilio.com`).

For additional users (Bob and Charlie):

Repeat the same process on other devices or softphone instances, using these credentials:

* Bob: Username `bob`, Password from admin page, Extension 200
* Charlie: Username `charlie`, Password from admin page, Extension 300

> \[!NOTE]
>
> All three demo users share the same password by default. You can find this password displayed on the admin Configuration Checklist after initialization. The SIP Domain will be the same for all users.

Once your softphone registers, you can make and receive calls through your Twilio SIP Domain.

### Test your SIP setup

Now that you have a softphone configured with your first demo user (for example, `alice`), let's test the different calling capabilities.

#### Make an outbound call to a phone number

With your softphone registered and connected:

1. Open your softphone client (the one you just configured with the `alice` credentials).
2. Dial any phone number using your softphone (for example, your mobile phone number).
3. Press the call button in your softphone to initiate the call.
4. Answer the call on your mobile phone - you should see the caller ID that was specified on the admin page.

This demonstrates that your SIP client places calls to the PSTN (Public Switched Telephone Network) through Twilio.

#### Receive an incoming call

Test receiving calls through your SIP extension:

1. From any telephone, call the incoming phone number displayed on your splash page (`/index.html`).
2. Wait for the IVR - you'll hear a prompt asking you to enter an extension.
3. Enter extension 100 (which corresponds to the `alice` user).
4. Your softphone will ring - answer the call on your softphone to connect.

This shows how the dial-by-extension menu routes incoming calls to your registered SIP clients.

#### &#x20;Click to troubleshoot call disconnecting after entering an extension number.

Root Cause: The `<Dial>` verb has no fallback handler when the SIP client doesn't answer or isn't registered.

Solution:

1. Add timeout and action handler to the `<Dial>` verb in `extension-menu.js`:

```javascript
const dial = twiml.dial({
  timeout: 30,
  action: './extension-menu'
});
dial.sip(`sip:${username}@${regionalDomainName}`);
```

2. Add dial status handling at the start of the handler:

```javascript
if (event.DialCallStatus && event.DialCallStatus !== 'completed') {
  twiml.say('The extension is unavailable');
  twiml.redirect('./extension-menu');
  return callback(null, twiml);
}
```

Verify:

* SIP clients are registered to your SIP domain
* Using correct credentials (username from `extensions.js`, password from `.env`)
* Test by calling the number and dialing an extension
* Redeploy: `twilio serverless:deploy` or restart local server

#### Make a SIP to SIP call

To test direct SIP to SIP calling between extensions, you'll need at least two registered users:

1. Set up a second softphone on another device or computer (or use a second softphone instance).
2. Register this softphone using different demo user credentials (for example, `bob`) - follow the same connection steps from the "Connect your SIP account" section above.
3. Verify both clients are registered - both should show "Registered" or "Connected" status.
4. From the first softphone (registered as `alice`), dial the extension number for the other user:
   * To call Bob: dial `200`.
   * To call Charlie: dial `300`.
5. The second softphone (registered as `bob`) should ring.
6. Answer on the second softphone to establish a direct SIP to SIP call.

Extension reference:

* Alice: Extension `100`
* Bob: Extension `200`
* Charlie: Extension `300`

This demonstrates peer-to-peer calling between SIP clients registered to the same domain, without routing through the PSTN.

> \[!NOTE]
>
> Make sure both softphone clients are registered and showing as "online" or "registered" before attempting SIP to SIP calls. You can dial users directly by their extension numbers (100, 200, 300).

## Modify your application

You should definitely change that admin password. On your local machine edit the file `.env`.

Find the entry for `ADMIN_PASSWORD` and change it to something other than default.

```bash
ADMIN_PASSWORD=your_secure_password_here
```

Now make sure your file is saved and then deploy.

```bash
twilio serverless:deploy
```

After deployment, revisit your hosted `/admin/index.html` page, use your new password, and view your all-green checks.

> \[!NOTE]
>
> Anytime you make a change to your example application, remember to save and re-deploy your application.

## Learn more

Now that you've seen things working, you can explore how to further modify and extend this application to suit your needs.

### Extensions file

Head over to your local project directory and checkout `assets/extensions.private.js`.

> \[!NOTE]
>
> This file's extension contains `.private.js`, which for the Serverless plugin prevents public access while allowing other functions to access it.

You'll notice that the demo users have all been added here. You can also add your own users here by following the same sort of format.

> \[!WARNING]
>
> If you do make a change to this file, make sure to navigate to your hosted `/admin/index.html` and create the additional users automatically.

### Dial by extension menu

Navigate to the function file located in `functions/extension-menu.js`. This Twilio Function uses the extensions file to create a menu that performs SIP dialing based on input from the caller.

The code makes heavy use of the [\<Gather> TwiML verb](/docs/voice/twiml/gather), which gathers digits from the user, then submits them back to the function via the `event.Digits` value. The `numDigits` parameter is set to `3` because each extension (`100`, `200`, etc.) contains three digits.

Feel free to explore and modify this file, it's all yours! Just remember you need to deploy it to see changes.

This function connects to a number chosen during initialization. To change this number, open the hosted `/admin/index.html` and select a new number by pressing the button. The chosen number has its "When a Call Comes In" value set to this Function `<YOUR HOSTED SERVICE PREFIX>/extension-menu`.

### Outbound calls

When you place an outgoing call from a SIP Device, your SIP Domain defines what happens. The Function `functions/outbound-calls.js` connects to the SIP Domain to handle this.

This function attempts to extract a number and then places a call to the PSTN, setting the `callerId` attribute on [\<Dial> TwiML verb](/docs/voice/twiml/dial). The Caller ID can be changed on your hosted `/admin/index.html`.

It's important to note too that this function is completely programmable. Explore and feel free to make it behave however you'd like. Remember to re-deploy!

### Everything else

During initialization, the system created a [SIP Domain](/docs/voice/sip/api/sip-domain-resource) and added demo credentials to a new [credential list](/docs/voice/sip/api/sip-credentiallist-resource). The SIP Domain enables registration, and the credential list manages registrants. The [SIP API](/docs/voice/sip/api) handles all of these operations.

You can locate this information on your hosted Admin page `/admin/index.html` or on the SIP Domains page in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains) or the [legacy Console](https://console.twilio.com/us1/develop/voice/manage/sip-domains).

## Next steps

Now that you have a working SIP infrastructure, explore these resources to expand your implementation:

* [SIP Overview](/docs/voice/sip) - Learn more about Twilio's SIP capabilities.
* [TwiML Voice: Dial](/docs/voice/twiml/dial) - Deep dive into the Dial verb and its parameters.
* [SIP Interface API](/docs/voice/sip/api) - Complete API reference for managing SIP domains programmatically.
* [Twilio Functions](https://www.twilio.com/docs/serverless/functions-assets/functions) - Learn more about serverless functions.
* [SIP Trunking](/docs/sip-trunking) - Connect your existing phone system to Twilio.
