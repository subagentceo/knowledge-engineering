# Install past versions of the Twilio CLI

In some rare situations, you may need to make use of an older version of the Twilio CLI. These directions will guide you on how to do so, depending on your operating system and chosen installation method.

For a list of which versions of the Twilio CLI are available, see the [releases list](https://github.com/twilio/twilio-cli/releases).

## Homebrew

To install a specific version of the Twilio CLI with [Homebrew](https://brew.sh), use:

```bash
brew install twilio@VERSION
```

Replace `VERSION` with the semantic version of the release you need—for example, `2.36.1`:

```bash
brew install twilio@2.36.1
```

> \[!WARNING]
>
> `VERSION` must be `2.36.1` or higher. This installation method does not support older versions.

### Downgrade from an existing installation

If you have a newer version of the Twilio CLI already installed, you will need to `unlink` that installation so that your system can use the past version in subsequent commands:

```bash
brew unlink twilio && brew link twilio@VERSION
```

As we did earlier, replace `VERSION` with the semantic version of the release you need—for example, `2.36.1`.

### Restore to the latest version of the Twilio CLI

To restore your installation of the Twilio CLI to the latest version again, reverse the previous process and relink to the latest release:

```bash
brew unlink twilio@VERSION && brew link twilio
```

## Other package managers

If you installed the Twilio CLI with any of the other common package managers (scoop, apt, or yum/dnf), uninstall your current version by following the respective **Uninstall** [instructions](/docs/twilio-cli/uninstall) for your operating system and package manager. Afterwards, follow the steps in the Platform executables section below to install a specific version.

## Platform executables

If you installed the Twilio CLI with one of the platform executable files (`.pkg`, `.exe`, `.deb`, or `.rpm`):

1. From the [releases list](https://github.com/twilio/twilio-cli/releases), find your desired version and click on **Assets** under that release to reveal its platform executables.
2. Download the executable for your operating system.
3. Install as described in the [general installation instructions](/docs/twilio-cli/uninstall) for your operating system.

## npm

If you installed the Twilio CLI with `npm`, use the following commands to install a specific version:

```bash
npm uninstall -g twilio-cli && npm install -g twilio-cli@VERSION
```

Replace `VERSION` with your desired version.
