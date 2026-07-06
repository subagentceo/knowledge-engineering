# Manage updates in enterprise environments

VS Code releases weekly updates with new features, bug fixes, and security patches. Organizations can centrally manage how VS Code updates are handled across their development teams.

This article covers how IT admins can configure automatic updates through enterprise policies.

## Update policy

VS Code provides the `UpdateMode` policy for controlling automatic updates. This policy controls the update.mode Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG setting in VS Code.

Learn how to deploy policies to your organization's devices.

## Update mode options

The `UpdateMode` policy accepts the following values:

Value

Description

`default`

Automatic checking for updates is enabled and runs in the background

`start`

Check for updates only when VS Code starts

`manual`

Automatic checking is disabled; users can manually check for updates

`none`

Updates are disabled entirely

## Disable automatic updates

To prevent VS Code from automatically checking for or installing updates, set the `UpdateMode` policy to `none`:

**Policy value**:

```
none
```

When updates are disabled, users cannot update VS Code through the application. You can then control VS Code versions through your software deployment tools.

## Enable manual updates only

To allow users to check for updates manually while disabling automatic background checks, set the `UpdateMode` policy to `manual`:

**Policy value**:

```
manual
```

Users can check for updates by selecting **Help** > **Check for Updates**.

## Check for updates at startup only

To check for updates only when VS Code starts, without background checking, set the `UpdateMode` policy to `start`:

**Policy value**:

```
start
```

## Network requirements

VS Code downloads updates from Microsoft servers. If your network has restricted access, ensure the following hostname is allowed:

*   `update.code.visualstudio.com` - VS Code download and update server

See the network documentation for a complete list of hostnames.

## Related resources

*   Enterprise policies reference - Complete list of enterprise policies
*   Network connections - Proxy and firewall configuration

7/1/2026