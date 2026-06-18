# Install the Twilio CLI

The Twilio CLI is supported on macOS, Windows, Linux, and even as a [Docker image](/docs/twilio-cli/getting-started/docker). Follow the directions for your respective operating system to install the CLI and enhance your developer experience with Twilio.

For information on the latest releases of the CLI, refer to the [releases list](https://github.com/twilio/twilio-cli/releases) on GitHub.

> \[!CAUTION]
>
> We strongly discourage installing the Twilio CLI using a combination of methods. For example, installing the CLI using both Homebrew and npm can cause conflicts in your [PATH](https://en.wikipedia.org/wiki/PATH_\(variable\)) that may result in unexpected behavior from commands or difficulty updating.

## Homebrew

The suggested way to install the Twilio CLI on macOS is to use [Homebrew](https://brew.sh/). If you don't already have it installed, [visit the Homebrew site](https://brew.sh/) for installation instructions and then return here.

Once you have installed Homebrew, run the following command to install the CLI:

```bash
brew tap twilio/brew && brew install twilio
```

## Scoop

The suggested way to install the Twilio CLI on Windows is by using [Scoop](https://scoop.sh/). If you don't already have it installed, [visit the Scoop site](https://scoop.sh/) for installation instructions and then return here.

> \[!NOTE]
>
> PowerShell must be [run as an administrator](https://www.techadvisor.com/how-to/windows/run-programs-as-administrator-windows-10-3632744/) to avoid permission issues when installing via Scoop

Once you have verified your Scoop installation, do the following:

1. Add the `twilio-cli` [Bucket](https://github.com/ScoopInstaller/Scoop/wiki/Buckets):

   ```bash
   scoop bucket add twilio-scoop https://github.com/twilio/scoop-twilio-cli
   ```
2. Install the app:

   ```bash
   scoop install twilio
   ```

## Linux

> \[!NOTE]
>
> The Twilio CLI doesn't provide arm64-specific installers through direct package executables (such as `.pkg`, `.exe`, `.deb`, or `.rpm` files).
> This limitation affects devices such as Raspberry Pi and Apple Silicon Macs.
>
> If you're using an arm64 system, install the CLI through one of the supported package managers: [Homebrew](#homebrew) (macOS) or [npm](#npm).

### apt

The Twilio CLI can be installed using the Advanced Package Tool (apt) on most distributions such as Debian, Ubuntu, Linux Mint, and more.

To install with apt, run the following commands in your terminal:

```bash
wget -qO- https://twilio-cli-prod.s3.amazonaws.com/twilio_pub.asc \
  | sudo apt-key add -
sudo touch /etc/apt/sources.list.d/twilio.list
echo 'deb https://twilio-cli-prod.s3.amazonaws.com/apt/ /' \
  | sudo tee /etc/apt/sources.list.d/twilio.list
sudo apt update
sudo apt install -y twilio
```

### deb file

As an alternative, you may also install the Twilio CLI using apt and a local .deb file:

1. In your browser, download the [latest .deb file](https://runtime-cli-redirect-6533.twil.io/redirect-to-github?ext=.deb).
2. Install the downloaded package using apt:

   ```bash
   apt install /path/to/file.deb
   ```

### rpm file

The Twilio CLI can also be installed using package managers for Red Hat-based Linux distributions, primarily [yum and dnf](https://www.redhat.com/sysadmin/how-manage-packages).

1. In your browser, download the [latest RPM package](https://runtime-cli-redirect-6533.twil.io/redirect-to-github?ext=.rpm).
2. Install the downloaded package using the package manager of your choice, for example:

   ```bash
   yum install /path/to/package.rpm
   # or
   dnf install /path/to/package.rpm
   ```

## macOS

Another way to install the Twilio CLI is by using the standard macOS user interface and your browser:

1. In your browser, download the [latest macOS installation file](https://runtime-cli-redirect-6533.twil.io/redirect-to-github?ext=.pkg).
2. Run the downloaded file and follow the on-screen instructions.

> \[!WARNING]
>
> If macOS prevents the installation of the .pkg file, follow [these steps](https://support.apple.com/en-us/HT202491) to successfully open the file and install.

## Windows

Another way to install the Twilio CLI is by using the standard Windows user interface and your browser:

1. In your browser, download the [latest Windows installation file](https://runtime-cli-redirect-6533.twil.io/redirect-to-github?ext=.exe).
2. Run the downloaded file and follow the on-screen instructions.

## npm

> \[!CAUTION]
>
> We strongly recommend using one of the other installation methods.
>
> This installation method does not auto-update, and it uses your system's version of Node.js, which might be an earlier version than the one Twilio develops the CLI against.

You can also install the Twilio CLI via npm. This is a manual install method for environments where auto-updating is not ideal, or where we do not offer a prebuilt binary. This method requires [Node.js](https://nodejs.org/en/download/) and npm already installed on your machine. (npm is installed along with Node.js)

To globally install the CLI so that it can be used from any directory, use:

```bash
npm install -g twilio-cli
```

## Verify your installation

To verify your Twilio CLI installation, open a command prompt window and use:

```bash
twilio version
```

The output will be similar to the following:

```bash
twilio-cli/6.0.1 linux-x64 node-v20.19.3
```

> \[!NOTE]
>
> Starting with Twilio CLI version 6.0.0, only Node.js version 20 or later is supported. If you are using an older version of Node.js, please upgrade to Node.js version 20 or later.
> For more information, see [Twilio CLI Node.js 18 version deprecation](/docs/twilio-cli/getting-started/twilio-cli-support-update).

The output displays `twilio-cli/x.y.z` where `x.y.z` is a version number, such as `5.0.0`. If you don't see this, but you have installed the CLI, restart the command prompt window.

You may also use the following, which are equivalent to `twilio version`:

```bash
twilio --version
```

```bash
twilio -v
```

> \[!NOTE]
>
> Note that `twilio update` only works for non-npm installations of the Twilio CLI. If you installed the CLI using npm, you will need to run `npm install -g twilio-cli@latest` to update your installation.

## Next steps

Now that you've installed the Twilio CLI, set up [autocomplete](/docs/twilio-cli/general-usage/autocomplete), then log in with your Twilio account and create a [CLI Profile](/docs/twilio-cli/general-usage/profiles).

Once you're logged in, you're ready to learn more about how to use the Twilio CLI, and you can begin exploring CLI commands!
