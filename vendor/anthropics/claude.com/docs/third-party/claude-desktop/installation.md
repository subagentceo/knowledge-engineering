> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Installation and setup

> Install Claude Desktop on 3P, check device readiness, and choose how configuration reaches your devices: an MDM profile or a bootstrap server

Claude Desktop on third-party (3P) is the standard Claude Desktop application plus a managed configuration that activates third-party inference mode. Setup is two pieces: install the regular Claude Desktop app, and deliver the configuration to it.

## System requirements

Cowork, the agent workspace at the center of Claude Desktop on 3P, has the following device requirements:

| Requirement      | macOS                        | Windows                                                              |
| ---------------- | ---------------------------- | -------------------------------------------------------------------- |
| Operating system | macOS 14 (Sonoma) or later   | Windows 10 build 19041 (version 2004) or later, including Windows 11 |
| CPU architecture | Apple silicon or Intel (x64) | x64 or Arm64                                                         |
| Installer        | `.dmg`                       | `.msix`                                                              |

On Windows, Cowork is only available when Claude Desktop is installed from the `.msix` package. Fleets provisioned with the legacy `.exe` installer get the Claude Desktop application without Cowork; migrate them to the `.msix` package to enable it. Cowork also requires working hardware virtualization, which the [readiness check](#check-device-readiness) verifies along with the requirements above.

## Check device readiness

Before installing Claude Desktop, you can confirm that a device supports Cowork by running the readiness check: a small standalone program that requires no installation or sign-in.

| Platform      | Download                                                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| macOS         | [Cowork readiness check for macOS](https://claude.ai/api/desktop/darwin/universal/cowork-readiness-check/latest/redirect)    |
| Windows (Arm) | [Cowork readiness check for Windows arm64](https://claude.ai/api/desktop/win32/arm64/cowork-readiness-check/latest/redirect) |
| Windows (x64) | [Cowork readiness check for Windows x64](https://claude.ai/api/desktop/win32/x64/cowork-readiness-check/latest/redirect)     |

Open the downloaded program to run the check. If it reports **This computer is ready for Cowork**, the device can run Cowork.

For fleet deployments, run the check on a representative device of each hardware model in your fleet before the broad rollout, so unsupported models are identified before users hit them.

## Install the app

Download the installer for your platform from [claude.com/download](https://claude.com/download). If you're not sure the machine supports Cowork, run the [readiness check](#check-device-readiness) first.

| Platform | Installer | Notes                                                       |
| -------- | --------- | ----------------------------------------------------------- |
| macOS    | `.dmg`    | Drag **Claude.app** to Applications                         |
| Windows  | `.msix`   | Supports per-machine provisioning for enterprise deployment |

For fleet rollouts, deploy the installer through your standard software-distribution mechanism, after the configuration; the deployment pages below cover the ordering.

## Choose a configuration delivery model

Configuration reaches devices in one of two ways. Both typically use your MDM tooling to push a profile; the difference is what the profile contains.

|                            | MDM profile                                                             | Bootstrap server                                                                                  |
| -------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| What you deploy to devices | The full configuration, exported as a `.mobileconfig` or `.reg` profile | A minimal profile containing only the bootstrap keys (`bootstrapUrl`, optionally `bootstrapOidc`) |
| Where settings live        | In the profile, identical for every device the profile targets          | On an HTTPS endpoint you operate, which returns each user's configuration at sign-in              |
| Per-user values            | Separate profiles per device group                                      | The server keys its response to the signed-in user                                                |
| Changing settings          | Export and push an updated profile                                      | Change your server's response; devices pick it up at the next fetch, with no profile push         |

An MDM profile is the simplest path when one configuration, or a few group-scoped profiles, fits your fleet; most MDMs support role-based distribution, so per-group configuration doesn't require a bootstrap server. A bootstrap server fits organizations that don't use MDM, and deployments where per-user credentials or frequently changing settings make per-group profiles unwieldy, at the cost of operating the endpoint. The two do not merge: when a bootstrap response is in effect, it replaces MDM-delivered values wholesale, and a few device-level keys remain MDM-only (see the Availability column in the [configuration reference](/third-party/claude-desktop/configuration)).

Pick your path:

* [Deploy with MDM](/third-party/claude-desktop/mdm) covers authoring the configuration in the app, exporting the profile, and deploying it to your fleet.
* [Deploy with a bootstrap server](/third-party/claude-desktop/bootstrap) covers getting the bootstrap keys onto devices and running the server.

## Single-machine setup

For evaluating before a fleet rollout, for pilots, or for organizations that don't use MDM, a single machine can be configured directly in the app.

1. Install Claude Desktop from [claude.com/download](https://claude.com/download). If you're not sure your computer supports Cowork, run the [readiness check](#check-device-readiness) first.
2. Launch the app. **Do not sign in or create an Anthropic account.** From the macOS menu bar (or on Windows, the application menu ☰ in the top-left of the login screen), go to **Help → Troubleshooting → Enable Developer Mode**, then **Developer → Configure third-party inference** to open the [in-app configuration window](/third-party/claude-desktop/in-app-configuration).
3. Enter the provider, endpoint, and credential values supplied by your administrator.
4. Click **Apply locally**. The app relaunches and the sign-in screen now offers the option to start in Claude Desktop on 3P using the configuration you entered.

The configuration is written to the application's local config file and applies only to that device and user account. It can be edited from the same window at any time. To return to standard Claude Desktop, choose the Anthropic sign-in option on the sign-in screen instead.

If your organization runs a [bootstrap server](/third-party/claude-desktop/bootstrap) but doesn't use MDM, your administrator can instead supply a small configuration file containing only the bootstrap keys. Load it with **Import configuration** in the same window; the bootstrap server supplies everything else after you sign in.

## Deploy the configuration

When the configuration works on a single machine, roll it out to the fleet with the delivery model you chose:

* On the MDM path, export the tested configuration as a profile, deploy it, and then distribute the app. [Deploy with MDM](/third-party/claude-desktop/mdm) covers the workflow.
* On the bootstrap path, stand up your bootstrap endpoint and deploy a profile carrying only the bootstrap keys. [Deploy with bootstrap](/third-party/claude-desktop/bootstrap) covers the server and the trust anchor.

Either way, deploy the configuration before the app so users open Claude for the first time and land directly in the third-party deployment.

## Verifying the deployment

On any configured device, open Claude Desktop and go to **Help → Troubleshooting → Copy Managed Configuration Report**. This copies a summary showing which keys were detected, where they were read from (managed profile vs. user store), and whether the inference credentials validated successfully. Secret values are redacted.

Also confirm that the configuration window (**Developer → Configure third-party inference**) opens read-only on a managed device. On macOS and Windows, the app reads managed keys from the profile by name, so a misspelled key name is silently ignored rather than reported as an error. A configuration window that is still editable means no recognized key reached the app, even if your MDM shows the profile as delivered. (If your profile deliberately sets [only the update keys](/third-party/claude-desktop/mdm#update-keys-and-managed-precedence), the window staying editable is expected.)

If the app shows the standard claude.ai sign-in screen instead of Cowork, the configuration was not read. Common causes:

* `inferenceProvider` is missing, misspelled, or set to an unrecognized value
* The configuration was applied while the app was running (fully quit and relaunch)
* The configuration was written to the local config file but you're checking the managed location (or vice versa)
* A required key for the chosen provider is missing; check **Help → Troubleshooting** or the application log at `~/Library/Logs/Claude-3p/main.log` (macOS) / `%LOCALAPPDATA%\Claude-3p\Logs\main.log` (Windows)

## Troubleshooting

If you're experiencing technical issues with installation or setup, generate a diagnostic report and share it with Anthropic.

On the affected machine, go to **Help → Troubleshooting → Generate Diagnostic Report** in the menu bar, choose a save location, and send the resulting folder to your Anthropic representative.

Please generate the diagnostic before requesting support. The report contains the configuration state, application logs, and environment details needed to investigate, and does not include any user data or conversation content.

## Endpoint security software

If your organization runs binary-authorization or EDR software (such as [Santa](https://santa.dev), CrowdStrike Falcon, or Microsoft Defender ASR) with path-based deny rules, the Cowork agent helper may be blocked from launching. The symptom is that Claude Desktop opens normally and reads the managed configuration, but Cowork sessions fail to start.

The agent helper is a signed binary that Claude Desktop installs under its user-data directory. **Allowlist by signing identity rather than path** so the rule survives version updates.

**macOS**

```
~/Library/Application Support/Claude-3p/claude-code/<version>/claude.app/Contents/MacOS/claude
```

The helper is Developer ID signed and notarized:

* Team ID: `Q6L2SF6YDW` (Anthropic PBC)
* Signing ID: `com.anthropic.claude-code`

For Santa, a `TEAMID` allow rule for `Q6L2SF6YDW` covers the helper across version updates. Standard (non-3P) installs use `~/Library/Application Support/Claude/` with the same subpath.

**Windows**

```
%LOCALAPPDATA%\Claude-3p\claude-code\<version>\claude.exe
```

The helper is Authenticode-signed with publisher `Anthropic, PBC`. For Defender ASR or AppLocker, allowlist by publisher rather than path. Standard installs use `%APPDATA%\Claude\` with the same subpath.

## Air-gapped deployment

Standard installs fetch two large runtime components from `downloads.claude.ai` on first use: the VM workspace bundle that Cowork sessions run in, and the Claude CLI binary. For networks that cannot reach `downloads.claude.ai`, Anthropic publishes an offline installer variant with both components built into the installer package and verified against checksums compiled into the application, so sessions can start without any connection to Anthropic. The offline installers are several gigabytes larger than the standard ones.

| Platform              | Format  | Latest version                                                                                                     |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| Windows (x64)         | `.msix` | [releases-offline/win32/x64/latest.json](https://downloads.claude.ai/releases-offline/win32/x64/latest.json)       |
| Windows (Arm)         | `.msix` | [releases-offline/win32/arm64/latest.json](https://downloads.claude.ai/releases-offline/win32/arm64/latest.json)   |
| macOS (Apple silicon) | `.dmg`  | [releases-offline/darwin/arm64/latest.json](https://downloads.claude.ai/releases-offline/darwin/arm64/latest.json) |
| macOS (Intel)         | `.dmg`  | [releases-offline/darwin/x64/latest.json](https://downloads.claude.ai/releases-offline/darwin/x64/latest.json)     |

Each `latest.json` names the current offline release for that platform and architecture and carries the download URL for its installer, so your tooling can poll one stable URL per platform and architecture. Download the installer from a connected machine and bring it across your boundary with your usual software-distribution process.

Pair the offline installer with [`disableAutoUpdates`](/third-party/claude-desktop/configuration#disableautoupdates): the app cannot reach the update feed from an air-gapped network, and you update the fleet by distributing each new offline installer through your MDM. Aside from updates, the only egress an air-gapped deployment needs is your inference provider; see [Telemetry and egress](/third-party/claude-desktop/telemetry#required-egress-paths).

## Updates

By default, Claude Desktop checks Anthropic's update server, downloads updates automatically, and applies a downloaded update the next time the app restarts. If the app hasn't restarted within 72 hours of downloading an update, it restarts itself to apply it, waiting for a pause in user activity (10 minutes of idle time) before doing so. There is no in-app prompt to defer the forced restart, and this enforcement is always on; `autoUpdaterEnforcementHours` tunes it rather than enables it.

In 3P deployments you can:

* **Leave auto-update enabled** (recommended) so fixes reach users without IT intervention. Set `autoUpdaterEnforcementHours` to shorten the enforcement window (1 to 72 hours; values above 72 are rejected). Setting the key also makes the window strict: the restart fires as soon as the window elapses, without waiting for a pause in user activity.
* **Disable auto-update** (`disableAutoUpdates`) and redistribute new builds through your MDM on your own cadence. This is required for [air-gapped environments](#air-gapped-deployment) but means your IT team owns the update pipeline.

See [Telemetry and egress](/third-party/claude-desktop/telemetry) for the network paths the updater uses.
