> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Pair your Slack workspace

> Connect your Slack workspace to your Claude organization. See what to send your Slack admin, where to paste the pairing code, and whether to enable the whole workspace or specific channels first.

export const BetaNote = () => <Info>Claude Tag is in public beta. Features and behavior described here may change before general availability.</Info>;

<BetaNote />

<div className="tm-stepbar">
  <a className="tm-stepbar-seg tm-current" href="/docs/claude-tag/admins/pair-workspace">1 · Pair workspace</a>
  <a className="tm-stepbar-seg" href="/docs/claude-tag/admins/add-connections">2 · Give access</a>
  <a className="tm-stepbar-seg" href="/docs/claude-tag/admins/set-spend-limit">3 · Spend limit</a>
  <a className="tm-stepbar-seg" href="/docs/claude-tag/admins/test-it">4 · See it work</a>
</div>

<div className="tm-stepmeta">
  <div className="tm-stepmeta-row"><span className="tm-stepmeta-label">Role you need</span><span>Owner in your Claude organization, plus a Slack workspace admin to install the app and generate the pairing code. These can be the same person or two people.</span></div>
  <div className="tm-stepmeta-row"><span className="tm-stepmeta-label">Before this step</span><span>The <a href="/docs/claude-tag/admins/setup-overview#before-you-start">prerequisites</a>: confirm your role and decide where you'll pilot</span></div>
  <div className="tm-stepmeta-row"><span className="tm-stepmeta-label">Do I need this?</span><span><span className="tm-meta-pill tm-meta-pill-req">Required</span>Nothing else in setup works until a workspace is paired.</span></div>
</div>

## Install and pair

Pairing has three parts: install the app in Slack, get a code from Slack, and paste it in the Claude console.

<Steps>
  <Step title="Install the Claude app in Slack">
    Open [claude.com/claude-for-slack](https://claude.com/claude-for-slack), click **Add to Slack**, and approve the permissions Slack shows. Skip if the app is already installed.
  </Step>

  <Step title="Run @Claude connect in Slack">
    Send `@Claude connect` as a new top-level message in any channel, with no other text, or in a DM with `@Claude`. Claude replies with a pairing code. Sent as a reply inside a thread, the command is treated as a normal request and no code is issued. Only a Slack workspace admin (or Grid org admin) can run this command; if that's not you, [send them the install request](#send-the-install-request-to-your-slack-admin) and have them return the code.

    If your install is missing a permission, the reply names it (and may still issue a code with a warning); see [the section below](#if-claude-connect-says-the-installation-is-out-of-date).
  </Step>

  <Step title="In the console: run the setup wizard">
    At [`claude.ai/admin-settings/claude-tag`](https://claude.ai/admin-settings/claude-tag), select **Set up** (or **+ Connect** next to **Where Claude Tag works** if a workspace is already paired) to open the **Set up Claude Tag for your workspace** wizard. Paste the code, choose whether to enable Claude for the whole workspace or specific channels, and click **Next**.
  </Step>
</Steps>

The wizard moves straight on to giving Claude access, so there's nothing to check at this point; continue with [Give Claude access](/claude-tag/admins/add-connections). After the wizard finishes, the Slack row under **Where Claude Tag works** shows your workspace as connected, and a [scope](/claude-tag/concepts/glossary#scope) for it (the entry where you'll bind tool access) appears on the **Slack** tab under **Claude Tag's access**.

## Send the install request to your Slack admin

Steps 1–2 above need a Slack workspace admin; step 3 needs an Owner in your Claude organization. If those are two people, send the Slack admin this and have them return the code:

```text wrap theme={null}
Please install the Claude app (https://claude.com/claude-for-slack) in [workspace], then post "@Claude connect" as a new message in any channel (not as a thread reply, with no other text) and send me the code it returns. What it can access: https://claude.com/docs/claude-tag/admins/for-slack-admins
```

### If `@Claude` doesn't respond at all

On Enterprise Grid, an earlier install can lose its connection and stop responding in every workspace. Don't uninstall the app. Have a Slack Org Owner or Org Admin, while signed in to one of the workspaces (not the org-level admin page), open [claude.com/claude-for-slack](https://claude.com/claude-for-slack), select **Add to Slack**, and choose **Install to entire organization**. This refreshes the connection in place. Then send `@Claude connect` again as a new top-level channel message with no other text (as a reply inside a thread, the command is treated as a normal request).

### If `@Claude connect` says the installation is out of date

Your Slack install predates a permission the app now requests. The workspace keeps its old grant until a Slack admin approves the update. Replies name the missing permissions until then. The reply links both remedies; either one clears the error.

* **Approve the updated permissions.** A Slack workspace admin opens Slack's installed-apps page, `https://app.slack.com/apps-manage/<team-id>/integrations/installed`, finds the Claude app, and approves its requested permissions. The **approves its updated permissions** link in the reply lands on that page directly. On Enterprise Grid with an org-wide install, a Slack org admin uses `https://app.slack.com/manage/<grid-id>/integrations/installed` instead.
* **Reinstall the app.** A Slack workspace admin clicks the **reinstalls the Claude app** link in the reply and approves the consent screen Slack shows. Opening [claude.com/claude-for-slack](https://claude.com/claude-for-slack) and clicking **Add to Slack** again does the same thing. This installs over the existing app with the current permissions; do not uninstall first.

Then run `@Claude connect` again. Slack's **Manage apps** page lists the scopes the app requests, not the scopes your workspace has granted. Seeing a permission listed there does not by itself mean it is approved. The grant happens when an admin approves the update or completes the consent screen.

### If Claude says Claude in Slack is unavailable for your organization

Your Slack workspace is paired to a Claude organization that isn't enabled for Claude Tag, or your account belongs to a Claude organization that isn't enabled. The setting usually behind this message is the **Enable Claude Tag for your organization** toggle in that organization's admin settings, not a plan check, so an Owner there can turn it on directly.

Check which Claude organization the workspace is paired to. If your company has more than one (for example a trial org alongside the main one), the workspace may be paired to the wrong one; an Owner there can [revoke the pairing](/claude-tag/admins/workspaces#revoke-a-pairing) so you can pair it here. If the right organization has the toggle on and the message persists, contact your account team to confirm Claude Tag is enabled for it.

A reply that your organization's administrator has restricted Claude Tag is a different block: an Owner in your own Claude organization has turned the integration off, so the fix is with them, not with the pairing.

### If the console says "already connected to a different organization"

A Slack workspace can pair with only one Claude organization at a time, and this one is already paired elsewhere. An Owner in the Claude organization that currently holds the pairing must [disconnect it](/claude-tag/admins/workspaces#revoke-a-pairing) from their **Connected workspaces** list before your code can be redeemed here. If your company has more than one Claude organization, check the others; the existing pairing is often in a test or trial org.

### If the console says "claim code is invalid, expired, or already used"

Pairing codes are single-use and expire after a short window. Ask the Slack admin to send `@Claude connect` again and paste the fresh code; reinstalling the app is not required. On Enterprise Grid, a Grid org admin's reply includes a Grid-wide code (starting with `enterprise_`) alongside the workspace code (starting with `workspace_`).

### If DMs never respond on Enterprise Grid

On Enterprise Grid, direct messages with Claude follow each user's home workspace, not the workspace you paired. When a user is homed in a grid workspace the pairing doesn't cover, their DMs answer with a redirect to setup instructions even after their account connects, while channels in the paired workspace work normally.

The fix is to pair the whole grid rather than one workspace. Claude's reply to a Grid Org Owner or Org Admin's `@Claude connect` includes two codes; redeem the one starting with `enterprise_` (not the `workspace_` one) in the setup wizard to cover DMs for users in every workspace of the grid.

## After pairing: where Claude is enabled

Once a workspace is paired, where Claude responds depends on what you chose in the wizard (whole workspace or specific channels), the **Turn on Claude Tag** toggle, and your [access restriction](/claude-tag/admins/restrict-access#members) setting.

* **What Claude can reach** in each channel depends on which Access bundles you bind; see [Configure per-channel access](/claude-tag/admins/attach-to-scope).
* **Nothing runs until usage is funded** on Team plans; see [Set a spend limit](/claude-tag/admins/set-spend-limit).
* **DMs work separately** from channels and run on each user's own claude.ai account. On Enterprise Grid, DMs follow each user's home workspace; see [If DMs never respond on Enterprise Grid](#if-dms-never-respond-on-enterprise-grid).

## Related resources

* [Give Claude access](/claude-tag/admins/add-connections): create an Access bundle and add connections
* [What the Claude Slack app can access](/claude-tag/admins/for-slack-admins): the page to send a Slack admin who's approving the install
