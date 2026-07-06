# Fix "Docker.app is damaged and can't be opened" on macOS


## Error message

macOS shows the following dialog when you try to open Docker Desktop:

```text
Docker.app is damaged and can't be opened. You should move it to the Trash.
```

This error prevents Docker Desktop from launching and can occur during installation or after updates.

## Possible cause

This issue occurs due to a non-atomic copy during a drag/drop installation. When you drag and drop `Docker.app` from a DMG file while another application, like VS Code, is invoking the Docker CLI through symlinks, the copy operation may be interrupted, leaving the app in a partially copied state that Gatekeeper marks as "damaged".

## Solution

Follow these steps to resolve the issue:

### Step one: Quit third-party software

Close any applications that might call Docker in the background:

- Visual Studio Code and other IDEs
- Terminal applications
- Agent apps or development tools
- Any scripts or processes that use the Docker CLI

### Step two: Remove any partial installation

1. Move `/Applications/Docker.app` to Trash and empty Trash.
2. If you used a DMG installer, eject and re-mount the Docker DMG.

### Step three: Reinstall Docker Desktop

Follow the instructions in the [macOS installation guide](/desktop/setup/install/mac-install/) to reinstall Docker Desktop.

### If the dialog persists

If you continue to see the "damaged" dialog after following the recovery steps:

1. Gather diagnostics using the terminal. Follow the instructions in [Diagnose from the terminal](/desktop/troubleshoot-and-support/troubleshoot/#diagnose-from-the-terminal).

   - Note down the your diagnostics ID displayed in the terminal after running diagnostics.

2. Get help:
   - If you have a paid Docker subscription, [contact support](/support/) and include your diagnostics ID
   - For community users, [open an issue on GitHub](https://github.com/docker/desktop-feedback) and include your diagnostics ID

## Prevention

To avoid this issue in the future:

- If your organization allows, update Docker Desktop via the in-app update flow
- Always quit applications that use Docker before installing Docker Desktop via the DMG installer drag-and-drop approach
- In managed environments, use PKG installations over DMG drag-and-drop
- Keep installer volumes mounted until installation is complete

## Related information

- [Install Docker Desktop on Mac](/desktop/setup/install/mac-install/)
- [PKG installer documentation](/enterprise/enterprise-deployment/pkg-install-and-configure/)
- [Troubleshoot Docker Desktop](/desktop/troubleshoot-and-support/troubleshoot/)
- [Known issues](/desktop/troubleshoot-and-support/troubleshoot/known-issues/)

