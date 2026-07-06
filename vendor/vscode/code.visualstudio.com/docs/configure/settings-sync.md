# Settings Sync

Settings Sync lets you share your Visual Studio Code configurations such as settings, keyboard shortcuts, and installed extensions across your machines so you are always working with your favorite setup.

> **Note**: VS Code does not synchronize your extensions to or from a remote window, such as when you're connected to SSH, a development container (devcontainer), or WSL.

## Turning on Settings Sync

You can turn on Settings Sync by using the **Backup and Sync Settings...** entry in the **Manage** gear menu or the **Accounts** menu at the bottom of the Activity Bar.

![Screenshot of the Manage menu, highlighting the Backup and Sync Settings command.](/assets/docs/configure/settings-sync/turn-on-sync.png)

To use Sync settings, you need to sign in and select which settings you want to sync. Currently, the Settings Sync supports the following settings:

*   Settings
*   Keyboard shortcuts
*   User snippets
*   User tasks
*   UI State
*   Extensions
*   Profiles

![Screenshot of the Settings Sync configure Quick Pick to select the settings to synchronize.](/assets/docs/configure/settings-sync/sync-configure.png)

When you select the **Sign in** button, you can choose between signing in with your Microsoft or GitHub account.

![Screenshot of the Settings Sync Quick Pick to choose an account type.](/assets/docs/configure/settings-sync/sync-accounts.png)

After making this selection, the browser opens so that you can sign in to your Microsoft or GitHub account. If you choose a Microsoft account, you can use either personal accounts, such as Outlook accounts, or Azure accounts, and you can also link a GitHub account to a new or existing Microsoft account.

After signing in, Settings Sync is turned on and continues to synchronize your preferences automatically in the background.

## Merge or Replace

If you already synced from a machine and turning on sync from another machine, you will be shown with following **Merge or Replace** dialog.

![Settings Sync Merge or Replace dialog](/assets/docs/configure/settings-sync/sync-merge-replace.png)

*   **Merge**: Selecting this option will merge **local** settings with **remote** settings from the cloud.
*   **Replace Local**: Selecting this option will overwrite **local** settings with remote settings from the cloud.
*   **Merge Manually...**: Selecting this option will open **Merges** view where you can merge preferences one by one.

![Settings Sync Merges](/assets/docs/configure/settings-sync/sync-merges-view.png)

## Configuring synced data

Machine settings (with `machine` or `machine-overridable` scopes) are not synchronized by default, since their values are specific to a given machine. You can also add or remove settings you want to this list from the Settings editor or using the setting settingsSync.ignoredSettings Open in VS Code Open in VS Code Insiders .

![Settings Sync ignored settings](/assets/docs/configure/settings-sync/sync-ignored-settings.png)

Keyboard Shortcuts are synchronized per platform by default. If your keyboard shortcuts are platform-agnostic, you can synchronize them across platforms by disabling the setting settingsSync.keybindingsPerPlatform Open in VS Code Open in VS Code Insiders .

All built-in and installed extensions are synchronized along with their global enablement state. You can skip synchronizing an extension, either from the Extensions view (⇧⌘X (Windows, Linux Ctrl+Shift+X)) or using the setting settingsSync.ignoredExtensions Open in VS Code Open in VS Code Insiders .

![Settings Sync ignored settings](/assets/docs/configure/settings-sync/sync-ignored-extensions.png)

Following UI State is synchronized currently:

*   Display Language
*   Activity Bar entries
*   Panel entries
*   Views layout and visibility
*   Recently used commands
*   Do not show again notifications

You can always change what is synced via the **Settings Sync: Configure** command or by opening the **Manage** gear menu, selecting **Settings Sync is On**, and then **Settings Sync: Configure**.

## Conflicts

When synchronizing settings between multiple machines, there may occasionally be conflicts. Conflicts can happen when first setting up sync between machines or when settings change while a machine is offline. When conflicts occur, you will be presented with the following options:

*   **Accept Local**: Selecting this option will overwrite **remote** settings in the cloud with your local settings.
*   **Accept Remote**: Selecting this option will overwrite **local** settings with remote settings from the cloud.
*   **Show Conflicts**: Selecting this will display a diff editor similar to the Source Control diff editor, where you can preview the local and remote settings and choose to either accept local or remote or manually resolve the changes in your local settings file and then accept the local file.

## Switching Accounts

If at any time you want to sync your data to a different account, you can turn off and turn on Settings Sync again with different account. The command to turn off sync is **Settings Sync: Turn off**.

## Syncing Stable versus Insiders

By default, the VS Code Stable and Insiders builds use different Settings Sync services, and therefore do not share settings. You can sync your Insiders with Stable by selecting the Stable sync service while turning on Settings Sync. This option is only available in VS Code Insiders.

![Settings Sync Switch Service](/assets/docs/configure/settings-sync/settings-sync-switch.png)

**Note:** Since Insiders builds are newer than Stable builds, syncing them can sometimes lead to data incompatibility. In such cases, Settings sync will be disabled automatically on stable to prevent data inconsistencies. Once newer version of Stable build is released, you can upgrade your stable client and turn on sync to continue syncing.

## Restoring data

VS Code always stores local and remote backups of your preferences while syncing and provides views for accessing these. In case something goes wrong, you can restore your data from these views.

![Settings Sync backup views](/assets/docs/configure/settings-sync/sync-backup-views.png)

You can open these views using **Settings Sync: Show Synced Data** command from the Command Palette. The Local Sync activity view is hidden by default and you can enable it using **Views** submenu under **Settings Sync** view overflow actions.

![Settings Sync enable local backup views](/assets/docs/configure/settings-sync/sync-enable-local-activity-view.png)

Local backups folder in the disk can be accessed via the **Settings Sync: Open Local Backups Folder** command. The folder is organized by the type of preference and contains versions of your JSON files, named with a timestamp of when the backup occurred.

> **Note**: Local backups are automatically deleted after 30 days. For remote backups the latest 20 versions of each individual resource (settings, extensions, etc.) is retained.

## Synced Machines

VS Code keeps track of the machines synchronizing your preferences and provides a view to access them. Every machine is given a default name based on the type of VS Code (Insiders or Stable) and the platform it is on. You can always update the machine name using the edit action available on the machine entry in the view. You can also disable sync on another machine using **Turn off Settings Sync** context menu action on the machine entry in the view.

![Settings Sync machines views](/assets/docs/configure/settings-sync/sync-machines-view.png)

You can open this view using **Settings Sync: Show Synced Data** command from the Command Palette.

## Extension authors

If you are an extension author, you should make sure your extension behaves appropriately when users enable Setting Sync. For example, you probably don't want your extension to display the same dismissed notifications or welcome pages on multiple machines.

### Sync user global state between machines

If your extension needs to preserve some user state across different machines then provide the state to Settings Sync using `vscode.ExtensionContext.globalState.setKeysForSync`. Sharing state such as UI dismissed or viewed flags across machines can provide a better user experience.

There is an example of using `setKeysforSync` in the Extension Capabilities topic.

## Reporting issues

Settings Sync activity can be monitored in the **Log (Settings Sync)** output view. If you experience a problem with Settings Sync, include this log when creating the issue. If your problem is related to authentication, also include the log from the **Account** output view.

## How do I delete my data?

If you want to remove all your data from our servers, just turn off sync via **Settings Sync is On** menu available under **Manage** gear menu and select the checkbox to clear all cloud data. If you choose to re-enable sync, it will be as if you're signing in for the first time.

## Next steps

*   User and Workspace settings - Learn how to configure VS Code to your preferences through user and workspace settings.

## Common questions

### Is VS Code Settings Sync the same as the Settings Sync extension?

No, the Settings Sync extension by Shan Khan uses a private Gist on GitHub to share your VS Code settings across different machines and is unrelated to the VS Code Settings Sync.

### What types of accounts can I use for Settings Sync sign in?

VS Code Settings Sync supports signing in with either a Microsoft account (for example Outlook or Azure accounts) or a GitHub account. Sign in with GitHub Enterprise accounts is not supported. Other authentication providers may be supported in the future and you can review the proposed Authentication Provider API in issue #88309.

> **Note**: VS Code Settings Sync does not support using your Microsoft Sovereign Cloud account at this time. If this is something you would like, please let us know what kind of Microsoft Sovereign Cloud you would like to use in this GitHub issue.

### Can I use a different backend or service for Settings Sync?

Settings Sync uses a dedicated service to store settings and coordinate updates. A service provider API may be exposed in the future to allow for custom Settings Sync backends.

## Troubleshooting keychain issues

> **Note**: This section applies to VS Code version **1.80 and higher**. In 1.80, we moved away from keytar, due to its archival, in favor of Electron's safeStorage API.
> 
> **Note**: keychain, keyring, wallet, credential store are synonymous in this document.

Settings Sync persists authentication information on desktop using the OS keychain for encryption. Using the keychain can fail in some cases if the keychain is misconfigured or the environment isn't recognized.

To help diagnose the problem, you can restart VS Code with the following flags to generate a verbose log:

```
code --verbose --vmodule="*/components/os_crypt/*=1"
```

### Windows & macOS

At this time, there are no known configuration issues on Windows or macOS but, if you suspect something is wrong, you can open an issue on VS Code with the verbose logs from above. This is important for us to support additional desktop configurations.

### Linux

Towards the top of the logs from the previous command, you will see something to the effect of:

```
[9699:0626/093542.027629:VERBOSE1:key_storage_util_linux.cc(54)] Password storage detected desktop environment: GNOME
[9699:0626/093542.027660:VERBOSE1:key_storage_linux.cc(122)] Selected backend for OSCrypt: GNOME_LIBSECRET
```

We rely on Chromium's oscrypt module to discover and store encryption key information in the keyring. Chromium supports a number of different desktop environments. Outlined below are some popular desktop environments and troubleshooting steps that may help if the keyring is misconfigured.

#### GNOME or UNITY (or similar)

If the error you're seeing is "Cannot create an item in a locked collection", chances are your keyring's `Login` keyring is locked. You should launch your OS's keyring (Seahorse is the commonly used GUI for seeing keyrings) and ensure the default keyring (usually referred to as `Login` keyring) is unlocked. This keyring needs to be unlocked when you log into your system.

#### KDE

> KDE 6 is not yet fully supported by Visual Studio Code. As a workaround: The latest kwallet6 is also accessible as kwallet5, so you can force it to use kwallet5 by setting the password store to `kwallet5` as explained below in Configure the keyring to use with VS Code.

It's possible that your wallet (aka keyring) is closed. If you open KWalletManager, you can see if the default `kdewallet` is closed and if it is, make sure you open it.

If you are using KDE5 or higher and are having trouble connecting to `kwallet5` (like users of the unofficial VS Code Flatpak in issue #189672), you can try configuring the keyring to `gnome-libsecret` as this will use the Secret Service API to communicate with any valid keyring. `kwallet5` implements the Secret Service API and can be accessed using this method.

If you're still experiencing trouble connecting to `kwallet5`, some users have reported that granting the specific D-Bus service permissions proved a viable fix:

```
flatpak override --user --talk-name=org.kde.kwalletd5 --talk-name=org.freedesktop.secrets com.visualstudio.code
```

#### Other Linux desktop environments

First off, if your desktop environment wasn't detected, you can open an issue on VS Code with the verbose logs from above. This is important for us to support additional desktop configurations.

#### (recommended) Configure the keyring to use with VS Code

You can manually tell VS Code which keyring to use by passing the `password-store` flag. Our recommended configuration is to first install gnome-keyring if you don't have it already and then launch VS Code with `code --password-store="gnome-libsecret"`.

If this solution works for you, you can persist the value of `password-store` by opening the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and running the **Preferences: Configure Runtime Arguments** command. This will open the `argv.json` file where you can add the setting `"password-store":"gnome-libsecret"`.

Here are all the possible values of `password-store` if you would like to try using a different keyring than `gnome-keyring`:

*   `kwallet5`: For use with kwalletmanager5.
*   `gnome-libsecret`: For use with any package that implements the Secret Service API (for example `gnome-keyring`, `kwallet5`, `KeepassXC`).
*   _(not recommended)_ `kwallet`: For use with older versions of `kwallet`.
*   _(not recommended)_ `basic`: See the section below on basic text for more details.

> If your password store was not detected automatically, see if your setup is mentioned in issue #187338. If not, feel free to include your setup there or open an issue on VS Code with the verbose logs if you think your issue is not related to automatic password store detection.

#### (not recommended) Configure basic text encryption

We rely on Chromium's oscrypt module to discover and store encryption key information in the keyring. Chromium offers an opt-in fallback encryption strategy that uses an in-memory key based on a string that is hardcoded in the Chromium source. Because of this, this fallback strategy is, at best, obfuscation, and should only be used if you are accepting of the risk that any process on the system could, in theory, decrypt your stored secrets.

If you accept this risk, you can set `password-store` to `basic` by opening the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and running the **Preferences: Configure Runtime Arguments** command. This will open the `argv.json` file where you can add the setting `"password-store":"basic"`.

## Can I share settings between VS Code Stable and Insiders?

Yes. Please refer to the Syncing Stable versus Insiders section for more information.

Please note that this can sometimes lead to data incompatibility because Insiders builds are newer than Stable builds. In such cases, Settings Sync will be disabled automatically on Stable to prevent data inconsistencies. Once a newer version of the Stable build is released, you can upgrade your client and turn on Settings Sync to continue syncing.

02/04/2026