> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

> Release notes for Claude Desktop

<Update label="v1.13576.0" description="2026-06-16">
  **General**

  * Improved find-in-page to search the entire session transcript instead of only the text scrolled into view, and the find bar now reliably takes keyboard focus when opened.
  * Added a unified Artifacts view that lists your chat, Code, and Cowork artifacts in one searchable place, with a "New artifact" menu and a "Filter by" control to narrow the list by source.
  * Fixed keyboard shortcut conflicts failing silently. Assigning a shortcut already held by another app now tells you and keeps your previous shortcut working, and Quick Entry registration errors now appear in Settings.
  * Fixed the first-run notification explaining that Claude keeps running in the notification area never appearing on Windows.

  **Code**

  * Added running dev servers to the Background tasks panel, with stop and open-preview actions.
  * Improved the Code file viewer: images, video, and audio now play inline instead of showing as text, and Markdown, CSV, and image files refresh automatically when Claude edits them.
  * Updated the model picker. The three headline models appear at the top level with older models and context-size variants under "More models", each model shows a capability description, and currently-unavailable models appear disabled instead of failing when selected.
  * Updated the in-session artifact panel: switch between a session's published artifacts from the title dropdown, see when an artifact was last updated, copy a share link, and open, share, or delete the artifact from the overflow menu.
  * Changed the Code sessions tab from "Projects" to "All sessions". It now lists your non-project sessions alongside project sessions and adds a multi-select Environment filter.
  * Fixed pull request status checks. Failures now show a small warning indicator on the branch row instead of repeated error popups, the "status couldn't be checked" warning appears less often and can always be dismissed, and only GitHub CLI sign-in problems still raise a notification.

  **Cowork**

  * Fixed corrupt plugin downloads crashing or hanging the app.
  * Fixed skills sometimes staying on an older version after being edited until toggled off and on.

  **3P**

  * Added the Chat tab as a beta feature controlled by the `chatTabEnabled` managed configuration key. The separate `chatCodeExecutionEnabled` key lets Claude analyze attachments and create files such as spreadsheets and presentations by running code in an isolated sandbox scoped to the session's attachments, and is off by default.
  * Added the `betaFeaturesEnabled` managed configuration key. Setting it to false disables every beta feature in the deployment, including the Chat tab.
  * Added Bedrock Mantle as an inference provider option. It reuses the existing `inferenceBedrockRegion` and `inferenceBedrockBaseUrl` managed configuration keys and authenticates with a bearer token or a credential helper.
  * Added `anthropicFamilyTier` and `isFamilyDefault` to managed `inferenceModels` entries. Tag each configured model with the Claude tier it stands in for so tier shortcuts like opus and sonnet resolve to your configured model IDs instead of the canonical names your provider may not route.
  * Added the `inferenceBedrockAwsCliPath` managed configuration key to set the AWS CLI's absolute path. This fixes aws sso login failing when the app is launched from Finder on macOS and the CLI is not on the default search path.
  * Fixed Google Workspace connectors never starting their OAuth sign-in. The MCP client identifier the app sends to connected servers is now `claude-desktop-3p`, changed from `custom3p-desktop`, so update any MCP server allowlists or log filters that match the old value.
  * Fixed the managed Tool policy `*` entry being ignored. It now applies as the default for any tool not listed by name.
  * Fixed organization plugins sometimes not opening from the Directory right after launch or update.
  * Fixed several connection and sign-in issues: Bedrock sessions now prompt to sign in again after AWS IAM Identity Center expires instead of failing with repeated credential errors, remote MCP connectors no longer stay Connected after a non-refreshable access token expires, the connection test now passes against gateways that optionally request a TLS client certificate, signing in after signing out no longer needs a double click, and sign-in recovery no longer uses stale configuration after a server-side update or leaves the model picker empty until restart.
</Update>

<Update label="v1.12603.1" description="2026-06-11">
  **General**

  * Added Find Next and Find Previous keyboard shortcuts to in-app search.
  * Fixed preview panes stealing keyboard focus from the chat input when they reloaded or navigated.
  * Fixed sessions failing to start after your sign-in expired — the app now prompts you to sign in again.

  **Code**

  * Added the Files panel to remote and SSH sessions — search the session's files and open them in the viewer — plus a Show in Files button in the file viewer.
  * Added a running-tasks button to the activity indicator that opens the Tasks panel, and Bash rows in the Background tasks panel now open to show their output, including a live tail while the command runs.
  * Fixed SSH sessions: forking no longer opens an empty conversation, and connections no longer fail with "Failed to upload file" errors on remotes first set up by early-2026 versions of the app.
  * Fixed renaming a session while its title was still generating — the generated title no longer overwrites the name you set.
  * Fixed the Pull Requests view showing "No open pull requests" when GitHub isn't connected — it now prompts you to connect.
  * Added model-picker memory — the picker now remembers your last model choice.

  **Cowork**

  * Fixed scheduled tasks firing many duplicate runs at once when the computer wakes from sleep.
  * Fixed remote sessions re-prompting for access to folders you had already trusted.
  * Fixed plugins becoming corrupted when they synced while you switched accounts.

  **3P**

  * Added the built-in Microsoft 365 connector — admins can configure it from the Setup window's server presets. Users sign in through their browser, and Claude can search and read Microsoft 365 mail, calendar, OneDrive, and SharePoint. It requests read-only access by default; admins can grant additional read scopes, such as Teams channel messages and meeting transcripts, with the managed server entry's scope setting.
  * Deprecated the "sso" value for the inferenceGatewayAuthScheme managed configuration key in favor of inferenceCredentialKind "interactive" — existing configurations keep working and log a deprecation warning.
  * Added the inferenceVertexOAuthLoginHint managed configuration key to pre-fill the Google account chooser when signing in to Vertex AI, so users in organizations federated to a third-party identity provider land on the right account automatically.
</Update>

<Update label="v1.11847.5" description="2026-06-09">
  **General**

  * Fixed Clear Cache and Restart signing you out instead of just clearing caches.
  * Fixed mouse back and forward buttons not navigating on macOS for mice managed by driver software like Logitech Options+, and added trackpad swipe navigation.
  * Fixed organization plugins sometimes failing to open right after app launch, and the plugin directory now offers Install again after an uninstall.
  * Fixed connector, Chrome extension, and plugin toggles in the composer's "+" menu not responding when you click directly on the switch.
  * Fixed an issue where signing in could leave the app unable to start sessions until it was restarted.
  * Fixed shell-exported custom request headers not reaching Claude Code sessions.

  **Code**

  * Fixed Claude losing its coding instructions, file-link formatting, and worktree context after a session resumed from idle.
  * Fixed the preview pane sometimes connecting to an unrelated dev server that was already using the configured port, and it now reopens the dev server you last picked for each project.
  * Improved responsiveness in Code sessions: smoother streaming of long code blocks, quicker side-panel shortcuts, and less delay opening cloud sessions with many screenshots.
  * Fixed popovers, dialogs, and the rewind picker not appearing — and typed characters jumping to the end of the composer — when a Code session is opened in its own window.
  * Fixed the slash-command menu opening behind the side chat panel.
  * Fixed the source-branch picker showing nothing for SSH sessions with worktree enabled.

  **Cowork**

  * Added a "Free Up Cowork Disk Space" option under Help > Troubleshooting, and Cowork now cleans up caches and old temporary files automatically when its workspace disk runs low.
  * Improved the read/unread toggle on sidebar sessions: it now works on the currently open session, has a larger click target, and shows a tooltip describing what a click will do.

  **3P**

  * Added support for the Fable model family, and for Mythos where your organization has access.
  * Fixed sign-in failing with external identity providers that reject the offline\_access scope — admins can now disable the automatic append.
</Update>

<Update label="v1.11187.4" description="2026-06-05">
  **General**

  * Fixed reinstalling Claude on Windows failing after an uninstall when IT had installed it for all users.
  * Fixed the app not starting automatically at login on Windows.
  * Added a banner when an update fails to install, instead of failing silently.
  * Fixed built-in connectors staying disconnected after a crash — existing sessions now reconnect them automatically, and disconnecting a built-in connector now signs it out and keeps it disconnected across restarts.

  **Code**

  * Added math rendering for inline and block expressions in Claude Code transcripts.
  * Added Ultracode to the effort slider, which selects the highest effort level and turns on dynamic workflows for the session.
  * Added drag-to-reorder and A→Z sorting for projects in the Claude Code sidebar.
  * Added triple-click to select a whole code block, plus right-click menu actions to copy a code block or inline code, in Claude Code transcripts.
  * Fixed resuming Code sessions when the working folder had moved or been deleted — sessions saved with a \~ path no longer show as missing or re-prompt for trust, and a deleted remote folder now reports clearly and offers a Fork session button instead of retrying in a loop.

  **Cowork**

  * Added a low-disk-space warning before Cowork downloads the files it needs to run.
  * Added in-session effort and thinking controls for local Cowork projects.
  * Updated the New project folder picker to default to your Claude data folder (\~/Claude/Projects) instead of \~/Documents.
  * Fixed Claude reporting that a skill was updated when the change was never saved to your account.
  * Fixed the /schedule command in Cowork showing as unavailable.

  **3P**

  * Fixed managed connectors and SSO sign-in requesting broader OAuth scopes than the administrator configured.
  * Fixed three Bedrock sign-in and session issues: SSO sign-in failing behind corporate proxies that intercept secure traffic, expired SSO tokens prompting a new sign-in every hour instead of refreshing automatically, and resumed sessions failing on their first message.
</Update>
