# Uninstall the Twilio CLI

To remove the Twilio CLI from your machine, follow the directions below that correspond to your operating system and the installation method used.

## Homebrew

If you installed the Twilio CLI with Homebrew, you can uninstall by using:

```bash
brew uninstall twilio
```

> \[!WARNING]
>
> This command may require `sudo` to execute successfully: `sudo /usr/local/lib/twilio-cli/bin/uninstall`

## Scoop

To uninstall the Twilio CLI if you installed using Scoop, use:

```bash
scoop uninstall twilio
```

## Linux

### apt

If you installed the Twilio CLI using apt, uninstall using:

```bash
apt remove twilio
```

### rpm file

If you installed using a downloaded .rpm file, you can uninstall it by running:

```bash
yum remove twilio
# or
dnf remove twilio
```

> \[!WARNING]
>
> This command may require `sudo` to execute successfully, for example: `sudo yum remove twilio`

## macOS

If you installed the Twilio CLI using a .pkg file, uninstall with the following command:

```bash
/usr/local/lib/twilio-cli/bin/uninstall
```

## Windows

If you installed the Twilio CLI using a downloaded .exe file, follow these steps to uninstall:

1. Click `Start > Control Panel > Programs > Programs and Features`.
2. Select `twilio-cli`, and then click **Uninstall**.

## npm

If you elected to use npm to install the Twilio CLI on any platform, then the following command will remove it from your machine:

```bash
npm remove -g twilio-cli
```
