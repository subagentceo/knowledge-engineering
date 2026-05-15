# Flex UI 2.x.x release notes

## Overview

This page provides release notes for Flex UI version 2.x.x.

To find other release information, go to these pages:

* For end-of-life dates for each release and to learn which versions are currently supported, see the [Flex UI minor version end-of-life reference](/docs/flex/flex-ui-eol-reference).
* For updates to other components of the Flex platform, see the [Twilio Changelog](https://www.twilio.com/en-us/changelog?products=flex).
* For detailed descriptions of the Flex UI 2.x.x public interfaces with code samples, see our [Flex UI API Reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/).
* For historical release notes for earlier Flex UI versions, see the [archived Flex UI release notes](/docs/flex/release-notes/ui-release-notes).

## v 2.17.1

@twilio/flex-ui@2.17.1\
Release date May 4, 2026

### Fixed

* Fixed several bugs affecting a private beta feature.

## v 2.17.0

@twilio/flex-ui@2.17.0\
Release date April 22, 2026

### Changed

* The ability for agents to [send content templates](/docs/flex/end-user-guide/conversations/content-templates) as part of a Whatsapp conversation is now generally available (GA).
* The **Queue stats monitoring** page now shows a **Rollup** row at the bottom of the queue stats table. The row aggregates each metric across the currently filtered queues.

### Fixed

* Fixed an issue where Voice task acceptances sometimes failed due to intermittent connection failures.
* Fixed an issue that prevented historical reporting dashboards in Flex Insights from loading when accessed directly from a link.
* Fixed an issue that incorrectly displayed the read indicator for SMS messages.
* Fixed an issue that prevented files from being attached to SMS messages when you include contact names for your customers.

## v 2.16.0

@twilio/flex-ui@2.16.0\
Release date February 18, 2026

### Added

* Added support for Node 22 and later to `@twilio/flex-ui-telemetry`.

### Fixed

* Fixed an issue that prevented auto-generated and manual notes from being saved when transferring a chat.
* On the **Queues stats monitoring** page, fixed the sorting behavior for the **No. of Tasks** column to work as expected and sort the queues by number of tasks. Previously, this column sorted the channels within the queues, but didn't change the queue order.
* Fixed an issue on the **Your Teams** page that caused email tasks to appear multiple times and with an incorrect timer value.
* Fixed an issue that prevented TextExpander from working properly.
* Fixed an issue that prevented use of the `CallCanvasDialpad` component.

## v 2.15.1

@twilio/flex-ui@2.15.1\
Release date December 15, 2025

### Fixed

* In Flex 2.15.0, the Flex token didn't refresh until about 15 seconds after it expired. During that window, you may have experienced interruptions, including:
  * Voice: Dropped calls, audio failures, unresponsive call controls, and agents not receiving calls
  * Real-time updates: Stale or stopped updates for tasks, worker status, supervisor monitoring, and dashboards
  * Conversations (chat): Message send/receive failures
  * TaskRouter: Delayed or missing worker activity and task updates
    Flex UI 2.15.1 corrects this issue by restoring the previous Flex token refresh behavior. The Flex token refreshes several minutes before expiration, preventing these interruptions.

Flex UI 2.15.1 corrects this issue by restoring the previous Flex token refresh behavior. The Flex token refreshes several minutes before expiration, preventing these interruptions.

## v 2.15.0

@twilio/flex-ui@2.15.0\
Release date November 20, 2025

### Changed

* Updated to include Flex SDK 3.0.0.

### Fixed

* In Agent Copilot wrap-up notes, when the summary contained markdown formatting, Agent Copilot displayed markdown syntax instead of formatted output. The summary now shows the formatted output as intended.
* Previously, if one or more user attributes (full name, email, or roles) were missing or invalid when signing in to Flex UI, the Flex UI error message incorrectly said that "this might be due to an ongoing incident we're experiencing." We've updated the error message to more accurately explain the cause of the problem.
* After updating from Flex UI version 2.9.x to 2.13.0 or later, Flex was not refreshing SSO tokens correctly. As a result, users' SSO tokens expired unexpectedly, causing them to be signed out of Flex UI with errors like `403 Forbidden` or "Unable to update SSOv2 authentication token." We've fixed this token refresh issue, and Flex UI users are no longer being signed out unexpectedly.

## v 2.14.0

@twilio/flex-ui@2.14.0\
Release date September 10, 2025

### Summary

Flex UI 2.14.0 is now available. It includes new functionality for aligning text in the email editor, as well as bug fixes throughout Flex UI.

### Added

* The email editor now supports text alignment and right-to-left languages:
  * Users can manually apply right, center, or left alignment to text.
  * When typing in a right-to-left language, cursor movement and text alignment automatically adjust to the language's direction.

### Fixed

* Fixed an issue when an agent's network dropped during a voice call that prevented the customer's name from appearing in the call canvas after the call reconnected.
* Fixed an issue that prevented agents from joining incoming calls made from a SIP phone.
* Fixed an issue that sometimes caused an endless ringtone if a customer hung up at the same time that the ringtone file started to load in Flex UI.
* Fixed an issue with enhanced SSO that prevented users from switching between SAML profiles in different Flex instances.
* For Flex UI 2.12 and 2.13, fixed an "Invalid SSO Settings" error that occurred when logging in to Flex using the **Log in with Console** button in Twilio Console.
* Fixed an issue that prevented customer highlights from being created for new tasks when the Search for a Profile widget wasn't configured.
* Fixed an issue that caused Flex UI to retain `messageAdded` listeners after navigating away from an open task in the Agent Desktop. This fix prevents performance concerns from having too many active listeners.
* Fixed a rare issue that could prevent the [WorkerDirectoryTabs](/docs/flex/developer/ui/components#workerdirectorytabs) filters from returning the expected results.
* Improved Flex SDK to resolve an issue that sometimes caused Flex UI to start in degraded mode.

## v 2.13.3

@twilio/flex-ui@2.13.3

Release date August 14, 2025

### Fixed

* Fixed an issue that caused outbound WhatsApp content template messages to appear as blank instead of showing the content of the message.

## v 2.13.2

@twilio/flex-ui@2.13.2

Release date July 24, 2025

### Fixed

* Fixed an issue that caused Voice calls to disconnect in Flex environments using [enhanced SSO](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration) when the agent's Flex access token refreshed.
* Fixed an issue that caused the **Dialpad** tab to show in the [WorkerDirectoryTabs in Flex UI](/docs/flex/developer/ui/components#workerdirectorytabs) when warm transfer was turned on for the Flex account.

## v 2.13.1

@twilio/flex-ui@2.13.1

Release date July 7, 2025

### Fixed

* Fixed an issue introduced in 2.13.0 that prevented users from accessing the [WorkerDirectoryTabs in Flex UI](/docs/flex/developer/ui/components#workerdirectorytabs) when using a customized [WorkerDirectoryTabs component](https://assets.flex.twilio.com/docs/releases/flex-ui/2.13.0/programmable-components/components/WorkerDirectoryTabs/) with a plugin.

## v 2.13.0

@twilio/flex-ui@2.13.0

Release date June 16, 2025

### Summary

Flex UI 2.13.0 includes the option to turn on a default ringtone for incoming tasks, spell-checking for email, and more. You'll also notice UI enhancements and bug fixes throughout Flex UI.

### Added

* Added an option to [turn on a default Flex ringtone for incoming tasks](/docs/flex/admin-guide/setup/default-ringtone). You can also configure different sounds based on task channel using the new [SoundManager API](/docs/flex/developer/ui/sound-and-audio#soundmanager-api).
* Added spell-checking functionality in the email editor.

### Fixed

* Fixed an issue where Flex incorrectly prevented agents using a SIP phone from making outbound calls when the Voice SDK was in a degraded state.
* Fixed an issue when searching on the [**Teams** page](/docs/flex/admin-guide/setup/teams#teams-page-in-flex-ui) that caused inconsistent results if the search terms contained leading or trailing spaces.
* Fixed an issue when using a custom voice channel that caused the **Hold** and **Transfer** buttons to be unavailable during a call.
* Fixed a performance issue when transferring a chat conversation that could cause the agent search to be slow or unresponsive.
* In Agent Copilot, made improvements to address an issue where the **Complete** button wasn't available for tasks if wrap-up notes didn't generate successfully.
* In Unified Profiles:
  * Fixed an issue where, when there were multiple tasks, and a task was unlinked from a profile, clicking on any other task showed **Customer Not Matched** until you refreshed the page.
  * Fixed an issue where, when no Studio lookup widget was connected, the profile name didn't appear on the task list when a new task was created.
  * Fixed an issue where, when viewing a profile that was about to be linked, the profile header didn't display the profile name and instead defaulted to a phone number or email address.
  * Fixed an issue where, after linking a new profile, the task list and task canvas displayed the correct profile name, but the Flex Unify container displayed the old profile name.
  * Fixed an issue where, after unlinking a profile and ending the task, refreshing the page caused the profile to be relinked to the task.
  * Fixed an issue where unlinking a profile from a task while in wrap-up mode caused the notes and activities to be created against the recently unlinked profile.
  * Fixed an issue where, after linking a profile, the Flex Unify container didn't load new profile data.
  * Fixed an issue that prevented users from relinking a profile after unlinking it and refreshing the page.
  * Fixed an issue where, when a profile loaded, "no name recorded" and "customer since - unknown" appeared in the customer header before the correct data loaded. The customer header and customer details now show a loading state while a profile loads.

## v 2.12.0

@twilio/flex-ui@2.12.0

Release date April 23, 2025

### Summary

Flex UI 2.12.0 is now available. It includes a new Flex UI action for sending rich text messages using a content template, the ability to localize dynamic strings in custom Flex plugins, and more. You'll also notice UI enhancements and bug fixes throughout Flex UI.

### Added

* Added a new [Flex UI action](/docs/flex/developer/ui/use-ui-actions/) for Conversations Messages that lets you [send rich text using a content template](/docs/flex/developer/ui/use-ui-actions#send-a-rich-content-message) and associated variables.
* Added the ability to [localize dynamic strings](/docs/flex/developer/plugins/localize-a-plugin), such as agent status, in custom Flex plugins.

### Changed

* In Flex Conversations:
  * A message now appears if you reach the maximum number of allowed attachments.
  * Made updates to prevent users from trying to send text and an attachment in the same outbound SMS or WhatsApp message. Due to a [pre-existing limitation](/docs/conversations-classic/conversations-limits#media-limits-from-chat-participants), text and attachments must be sent in separate messages.
* Updated the `task.joinCall()` function to support `mediaProperties`. If you use a custom plugin for the **Join Call** button in Flex, you can now pass additional properties in the plugin to modify button behavior.
* In Flex UI, updated the DOMPurify package to version 3.2.4 to enhance security.

### Coming soon

* Agents can [leave or pause a task for any Flex Conversations channel](/docs/flex/admin-guide/setup/conversations/leave-and-pause-for-conversations), such as SMS or webchat. After leaving or pausing a task, agents can also enter a wrap-up stage to document their actions.
  * **Updated May 7, 2025:** These features are now available.

### Fixed

* Fixed an issue that caused agents to incorrectly appear unavailable when using a custom plugin to localize agent status to another language.
* Fixed an issue that prevented the [TaskListItem](/docs/flex/developer/ui/components#tasklistitem) component from correctly displaying a profile name.
* In [Unified Profiles](/docs/flex/admin-guide/setup/unified-profiles):
  * Fixed an issue where the task list and task header displayed contact names as **\[object Object]** when you unmapped a suggested trait in the [customer header](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/header-search).
  * Fixed an issue that caused Flex to display unidentified customer profiles when the **Show unidentified profiles** setting was off.
* Fixed an issue that caused a customer to remain in a call after the agent left, if the agent had first tried unsuccessfully to join the call from a different Flex instance.
* Fixed an intermittent issue with [Teams view turned on](/docs/flex/admin-guide/setup/teams#turn-on-teams-view-beta) that sometimes prevented custom filters on the Teams page from being applied correctly.
* Fixed a minor issue with Flex in Google Chrome that sometimes prevented users from applying spelling suggestions.

## v 2.11.1

@twilio/flex-ui@2.11.1

Release date March 20, 2025

### Changed

* On the [Your Teams](https://flex.twilio.com/teams/) page, you can now remove the queue name from task cards. To remove the queue name, set the `SupervisorUserCardQueueName` string to empty in [Flex Manager](/docs/flex/developer/ui/overview-of-flex-ui-programmability-options#manager):
  `Flex.Manager.getInstance().strings.SupervisorUserCardQueueName = "";`
* For the [CompleteTask action](https://assets.flex.twilio.com/docs/releases/flex-ui/2.11.0/ui-actions/Actions/#CompleteTask), removed the `awaitRemovalConfirmation` and `removeAgentParticipant` parameters that were added in Flex UI 2.11.0. If you added a workaround to pass default values for these parameters, you can remove that workaround after updating to Flex UI 2.11.1. If you don't remove these parameters, the CompleteTask action will continue to work.

### Fixed

* Fixed a bug that prevented access to call recordings in Flex Insights when **Media access authentication** is enabled in Voice settings. When trying to access a call recording, a playback failure error message appeared along with an unnecessary **Sign in** dialog.
* Fixed a bug that prevented tasks from being marked complete in some scenarios. This bug caused the following issues:
  * In the [Queued Callback & Voicemail plugin](https://flex-plugins-library.twilio.com/plugins/plibo-queued-callback-and-voicemail), users were unable to click **Complete** on voicemail tasks.
  * When invoking the [CompleteTask action](https://assets.flex.twilio.com/docs/releases/flex-ui/2.11.0/ui-actions/Actions/#CompleteTask), an error message appeared and the task was not marked complete.
* In certain custom Voice configurations, a "WorkerActions.AcceptTask: no active call" error message appeared approximately 15 seconds after an agent accepted a call. To prevent interruptions, Flex UI now logs this message in Twilio Console Debugger instead of displaying it as an error message.

## v 2.11.0

@twilio/flex-ui@2.11.0

Release date February 18, 2025

### Summary

Flex UI 2.11.0 is now available. This release includes new queue stats metrics, an enhancement to Teams view, and an updated Citrix SDK, as well as a number of bug fixes.

### Added

* Added new metrics to [Queue stats monitoring](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view) that enable you to monitor agent availability: available agents, unavailable agents, and offline agents.

### Changed

* On the [Teams view](/docs/flex/end-user-guide/real-time-reporting/monitor-agent-activity) page, added the queue name to each task card for quick reference without an extra click.
* Updated the Citrix SDK used in Flex on Citrix VDI to version 4.0.2 to provide enhanced capabilities.

### Fixed

* In the agent view, fixed an issue with the activities menu in the header that caused the list to overflow the menu if a large number of activities were available. You can now scroll the menu to view all activities.
* In [Teams view](/docs/flex/end-user-guide/real-time-reporting/monitor-agent-activity), if your Flex 2.10.x environment had the **Show message when customer leaves webchat** feature enabled, clicking any task from Teams view could cause the screen to go blank. This issue has been resolved.
* In [Flex Conversations](/docs/flex/conversations):
  * Fixed an issue that caused the chat window to lose focus and stop accepting text input if a new inbound message arrived while the agent was typing. This typing interruption no longer occurs.
  * Fixed an uncommon issue that cut off the left side of certain messages in Flex UI. These messages now appear correctly.
* In [Unified Profiles](/docs/unified-profiles):
  * Fixed an issue that sometimes caused the `UnifiedProfilesContainer` to reload while an agent viewed a customer profile.
  * Fixed an issue with the UI layout when no customer profile was found. Previously, the "No customer match" status took up all of [Panel2 in the Agent Desktop view](/docs/flex/developer/ui/components#agentdesktopviewpanel2), which prevented agents from accessing the tabs in Panel2.
* In [Agent Copilot wrapup notes](/docs/flex/admin-guide/setup/copilot/setup):
  * Once wrapup notes were generated, if an agent had multiple tasks open and switched between them, a bug sometimes caused Flex to regenerate wrapup notes and change the topic, sentiment, or summary. This bug has been fixed.
  * Fixed two issues that occurred when [additional languages are enabled](/docs/flex/admin-guide/setup/copilot/languages#enable-additional-languages). If an agent had multiple tasks open at one time, a bug sometimes caused the following error to appear: "Unable to detect conversation language." Additionally, for conversations in non-English languages, if an agent manually changed the sentiment value, the following error message would appear: "Unexpected value." Both of these issues have been corrected.
  * When ending an empty conversation (for example, a silent voicecall or empty webchat conversation), if an agent clicked **Update** on the **Notes** tab, an "Unable to detect conversation language" error appeared and prevented the agent from completing the task until they dismissed the error message. This issue has been fixed.
* In the [Flex UI API Reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/):
  * Updated the [TaskHelper](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/advanced/helpers/TaskHelper/) and [ConversationHelper](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/advanced/helpers/ConversationHelper/) documentation to make sure all properties are listed and accurate.
  * Added documentation for the [StartChannelTransfer action](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/ui-actions/Actions/#StartChannelTransfer) that supports [Messaging transfers](/docs/flex/admin-guide/setup/conversations/messaging-transfers).

## v 2.10.1

@twilio/flex-ui@2.10.1

Release date January 6, 2025

### Fixed

* Updated the type definitions for the `Button` and `IconButton` components to make the `enterKeyHint` property optional. In Flex UI 2.10.0, this property was required, causing a TypeScript error if you attempted to recompile an existing plugin without defining this property.

## v 2.10.0

@twilio/flex-ui@2.10.0

Release date December 5, 2024

### Summary

Flex UI 2.10.0 is now available. This release includes the public beta release of a new Teams view that enables you to organize agents into teams, allowing supervisors to view, filter, and interact with their agents more efficiently. You'll also notice a public beta feature that enables agents to natively view Flex UI in Español (México) or Português (Brasil).

In the next few weeks, you'll receive upcoming enhancements that will only be available on Flex UI 2.10.0 and later. These enhancements include the ability to classify customer interactions by topic and subtopic in Agent Copilot, and Webchat 3.0 support for configurable pre-engagement forms and context as well as a new end chat button for customers. Watch the [coming soon](#coming-soon) section for details as these updates are released.

Throughout Flex UI 2.10.0, you'll find feature and UI enhancements, bug fixes, and more.

### Added

* Administrators can now turn on language selection. This gives users the option to change their Flex UI display language from English (US) to Español (México) or Português (Brasil). If your Flex instance uses custom plugins, developers can also [localize plugin text](/docs/flex/developer/plugins/localize-a-plugin) to provide a seamless language experience.
* Added documentation to the [Flex UI API Reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/localization/LocalizationType/) for these new localization properties: `availableLocales`, `setLocalePreference`, and `localeTag`.
* In Unified Profiles:
  * Added a warning for agents if a partial outage occurs that impacts profile data availability. During these outages, agents can continue to perform Flex tasks and Unified Profiles retains interaction data. Relatedly, customer history also hides a profile's unidentified contact badge in the event of a service outage.
  * When multiple customer profiles are merged on the Segment space, Unified Profiles merges the respective activity lists on the Customer history view.
* Introduced [Teams hierarchy](/docs/flex/admin-guide/setup/teams) in Flex, allowing admins to organize users by hierarchy, group, and team in Console. This feature streamlines agent monitoring for supervisors and managers on Flex UI with while enabling persistent tracking of selected teams.

### Coming soon

* With Agent Copilot, automatically classify customer interactions by topic, subtopic, and disposition code. This can improve agent handle time during wrap-up and enables deeper analysis of contact center interactions.
* Webchat 3.1.0 includes the following updates:
  * Webchat 3.1.0 supports pre-engagement form configuration and context support. These features enable you to gather additional information to help with routing decisions and provide agents with details that can make their interactions more efficient and effective. To learn more and get started, see [Using pre-engagement form data and context](/docs/flex/developer/conversations/webchat/pre-engagement-and-context).
  * Customers can now leave the chat by closing the chat window. Previously, only an agent could end the chat. If you want a message to appear to agents to let them know when a customer has left the chat, turn on the new **Show message when customer leaves webchat** feature on the Flex **[Feature Settings](https://flex.twilio.com/admin/features)** page. This setting is turned off by default./  **Important**: If you're updating from Webchat 3.0.x and have implemented custom functionality to allow customers to end the chat, you must ensure that any conflicts with this new feature are resolved before you update to this version. For more information, see [Set up and use Webchat 3.x.x](/docs/flex/developer/conversations/webchat/setup).
  * **Updated December 9, 2024:** Webchat 3.1.0 is now available.

### Fixed

* In Unified Profiles, fixed a bug that prevents customer history from creating activities for `MeetingClosed` events with a `failed` status.
* Fixed an issue that caused Flex UI to stop working if a plugin conditionally added a component to the [WorkerDirectoryTabs](/docs/flex/developer/ui/components#workerdirectorytabs).
* Fixed an issue beginning in Flex UI 2.8.0 that caused a "WorkerActions.AcceptTask: no active call" error to appear if an agent accepted a voice task using a [SIP](/docs/voice/sip) phone or a PSTN (Public Switched Telephone Network) phone instead of the Flex voice client.
* With [Messaging transfers turned on](/docs/flex/admin-guide/setup/conversations/messaging-transfers), fixed an intermittent issue loading transfer details, including transfer notes, to the chat transcript in the Agent UI.
* Improved error messages when either the "to" or "from" phone number is not verified.
* Previously, if the TaskRouter SDK emitted an error, the Flex SDK entered a loop where degraded mode toggled between true and false until the TaskRouter SDK recovered. We've fixed this issue, so the Flex SDK degraded mode status is shown correctly.

## v 2.9.2

@twilio/flex-ui@2.9.2

Release date April 3, 2025

### Fixed

* Fixed a Unified Profiles bug where, in certain Flex configurations, the Unified Profiles ID (`profileConnectSid`) didn't correctly attach to the context of a task. When this happened, some customer events didn't appear in the [customer history](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-history).

## v 2.9.1

@twilio/flex-ui@2.9.1

Release date November 6, 2024

### Fixed

* If an agent on a voice call clicked **Hang up** more than once, a "Could not wrap up reservation" error message appeared even though there was no actual problem. We've corrected this issue so the incorrect error message no longer appears.
* If an agent placed an outbound call and canceled it within 5 seconds, this error appeared: "WorkerActions.AcceptTask: no active call." We've corrected this issue so the incorrect error message no longer appears.
* In some scenarios, the following error message appeared in Twilio Console and Status Report (if enabled) even though the call behaved normally: "WorkerActions.AcceptTask: Could not accept call: 'Stuck task' scenario 1 flavor 1 intercepted: a call task is still pending after 5 seconds, but its voice call is up." This error message was inaccurate and no longer appears in scenarios without an actual problem.
* In [Teams view](/docs/flex/end-user-guide/real-time-reporting/monitor-agent-activity), some tasks appeared to be stuck in **Wrap up** state even after the task had been completed. This issue has been fixed.
* In rare circumstances, [when playing calls in Flex Insights](/docs/flex/end-user-guide/insights/player), the **Segments** links to skip to specific conversation segments were unavailable beginning in Flex 2.x.x. The links now work as expected.
* When a page includes multiple timers that show how long a task has been in its current status, the timers can sometimes be up to 1 second apart from each other. This has been corrected, and you'll see that all timers show the same value.
* Fixed an issue where the Flex voice client answers calls intended for another voice client.

## v 2.9.0

@twilio/flex-ui@2.9.0

Release date October 3, 2024

### Summary

Flex UI 2.9.0 is now available. Beginning with this release, we have certified that Flex UI works on Chromebooks, expanding your device options. In Unified Profiles, your agents can now view customer interactions history information before any of your customer data sources are connected, immediately enabling them to provide more customized, efficient service. Throughout Flex UI, you'll find a broad range of feature and UI enhancements, bug fixes, and more.

### Added

* Flex UI is now certified to work on Chromebooks.
* In [Unified Profiles](/docs/unified-profiles), added the ability for your agents to begin viewing basic customer interaction history before any of your customer data sources are connected. This allows agents using Unified Profiles or Agent Copilot to quickly review customer interaction history before or during customer interactions to provide more customized, efficient service.

### Changed

* In [Unified Profiles](/docs/unified-profiles):
  * In the [**Customer history** UI component](/docs/flex/admin-guide/setup/unified-profiles/customer-history-and-interaction#enable-customer-history), you can now configure recent activity groups to show your agents the most recent customer activity within the last 24 hours and up to 14 days out.
  * Updated the [`UnifiedProfilesContainer`](/docs/flex/developer/unified-profiles-container) that contains customer detail, history, and header UP components to always render the same view and the component itself to render any errors that occur. Previously, the container rendered different views within the tabs based on errors that occurred.
    * The [`UnifiedProfilesContainer`](/docs/flex/developer/unified-profiles-container#unified-profiles-container-programmability) is now programmable. You can remove, hide, show, rename, sequence, and customize all sub components including profile highlights, profile header, detail, history, and in-house. You can also add your own tabs with custom features. For example, build transactions to create a single pane for agents, so that they don't have to work with multiple systems.
* Updated the [`CRMContainer`](https://assets.flex.twilio.com/docs/releases/flex-ui/1.25.0/CRMContainer.html) API component to allow clipboard access.
* Updated the twilio-chat package that's included with Flex UI to version 6.0.0 to enhance security.
* Updated the slate-react package that's included with Flex UI to version 0.66. This prevents dependency warnings when building with [Flex Plugins CLI](/docs/flex/developer/plugins/cli) version 7.0.0 and later.

### Fixed

* Fixed an encoding issue in Flex UI where certain characters did not render correctly.
* Fixed an issue that caused a "No active call" error to appear in the Twilio Console error log when the caller ended an inbound call right after an agent answered.
* Fixed an issue that caused a "No next page" error to appear in the browser console log when loading older messages in a long messaging history.
* Fixed an issue where playing a Flex Insights recording on the Conversations dashboard caused the recording to stop if the administrator or supervisor opened a different Flex UI page.
* In [Unified Profiles](/docs/unified-profiles):
  * Fixed a display issue related to **Customer history**'s manual refresh overlapping with the status panel.
  * Fixed an issue that prevented Customer history from validating proper string localization for Agent, Sentiment, Summary, and more.
  * Fixed an issue that prevented the **Customer history** field in Flex UI from displaying the correct date when the `Date` type contained incomplete information (for example, just the year).
  * Fixed an issue that caused an error to appear in the Twilio Console error log when profile highlights were disabled and an agent accepted a task.
  * Fixed an issue that caused the task list in the profile header to appear as `[object Object]` if the display name value is `null`. The task list now displays the channel address if the display name value is `null`.
  * Fixed a display issue with [customer profile highlights](/docs/flex/admin-guide/setup/copilot/highlights#overview) where the styling was incorrect if the profile summary was only one line.
* Improved the error message that's shown when attempting to call a phone number that is blocked by Twilio.
* When the [**Leave** option is enabled for email](/docs/flex/admin-guide/setup/conversations/leave-and-pause-for-conversations), if an agent clicked **Leave** in a task and the customer later replied, the task was incorrectly assigned to the previous agent automatically. This behavior has been corrected, so the customer reply is handled like any other new task.
* For agents using a [SIP](/docs/voice/sip) phone instead of the Voice client [WebRTC](/docs/glossary/what-is-webrtc) to handle voice calls, outbound calls were blocked if a microphone and microphone permissions were not configured for the Voice client. This bug has been corrected and SIP phone outbound calls work as expected.
* Fixed an issue where a degraded network connection could cause access tokens to expire unexpectedly.
* Fixed an issue where holding the pointer over the headphones icon at the top of the page (also known as device manager) caused warnings to appear in the browser console.
* When an agent used a slower network connection, such as 3G, and searched for an agent during a call transfer, the search function sometimes showed unexpected results or worked slowly. We have corrected this behavior.
* Updated how telemetry events are sent so that the "Max telemetry request reached" error now occurs only in rare instances. In addition, we changed the log level of this error from `log.error` to `log.debug`.
* For Voice conference calls that include a call transfer, it wasn't possible to use webhooks to track the timeline of transfers, because Flex UI didn't transmit information about the new agent accepting the call transfer. Flex UI now sends a call status event when an agent accepts a call transfer, which makes it possible to build functionality to track call transfers.

## v 2.8.5

@twilio/flex-ui@2.8.5

Release date October 9, 2024

### Fixed

* Fixed an issue where a degraded network connection could cause access tokens to expire unexpectedly.

## v 2.8.4

@twilio/flex-ui@2.8.4

Release date September 9, 2024

### Fixed

* Previously, when using the [Agent Copilot wrap-up notes webhook](/docs/flex/developer/copilot-webhooks) with wrap-up notes hidden in Flex UI, `task-SID` was missing from the HTTP request payload. This issue has been corrected.
* Flex Insights Historical Reporting now provides accurate status in the Flex UI [status report](/docs/flex/end-user-guide/troubleshooting#status-report) when planned maintenance occurs. Previously, it incorrectly reported degraded performance during planned maintenance.

## v 2.8.3

@twilio/flex-ui@2.8.3

Release date August 13, 2024

### Fixed

* Corrected an issue that prevented telemetry from being turned off, which could lead to rate limits being exceeded.
* Stopped [`useFlexSelector`](#state-management-improvements) and [`useFlexDispatch`](#state-management-improvements) from over-reporting events that occasionally caused "Rate limit exceeded" error messages to appear.

## v 2.8.2

@twilio/flex-ui@2.8.2

Release date July 25, 2024

### Fixed

* In Flex 2.8.1, when agents attempted to transfer conversations using the Conversations Transfer plugin from the [Flex Plugin Library](/docs/flex/developer/plugins/plugin-library), the transfers were unsuccessful and a "Transfer failed" message appeared. We fixed this bug to restore this Conversations Transfer functionality.
* Fixed an issue introduced in Flex UI 2.8.1 where Flex errors no longer appeared in the  [Twilio Console error logs](/docs/flex/end-user-guide/debugger).

## v 2.8.1

@twilio/flex-ui@2.8.1

Release date July 11, 2024

### Fixed

* Fixed an issue that prevented a dependency from installing correctly.

## v 2.8.0

@twilio/flex-ui@2.8.0

Release date July 11, 2024

### Summary

Flex UI 2.8.0 is now available. It includes additional language support for Agent Copilot, so you can now generate wrap-up notes for Spanish and Portuguese conversations. In Unified Profiles, we've added the ability to refresh profile history, improved configurability for the profile header and recent activity, and upgraded programmability that allows you to build custom agent experiences. Throughout Flex UI, you'll also notice a number of feature and UI enhancements, bug fixes, and more.

### Added

* If you're using [Agent Copilot](/docs/flex/admin-guide/setup/copilot), you can now generate the sentiment and summary for wrap-up notes in Spanish and Portuguese.
* In [Unified Profiles](/docs/flex/admin-guide/setup/unified-profiles):
  * Agents can now view [customer highlights](/docs/flex/admin-guide/setup/copilot/highlights) summary for outbound conversations.
  * Added the ability for agents to manually refresh the activities in a customer's profile history.
  * Enhanced Container capabilities to allow your Unified Profiles agent experience to benefit from existing Flex programmability features.
  * Administrators can now upload a CSV file to quickly load test profiles and configure the agent experience for customer profile details and history.
* [Flex on Citrix VDI](/docs/flex/admin-guide/setup/voice/flex-citrix-vdi) now supports remote devices running ChromeOS, including Chromebooks.

### Changed

* Updated the behavior of the [Flex UI API Reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/) version selector so that broken links redirect to the newest documentation for the selected version instead of showing an error message.
* In Unified Profiles, when a task comes in and a profile is associated with the customer's email address, the customer's name now appears in the task.
* Updated the Voice SDK to [version 2.11.1](/docs/voice/sdks/javascript/changelog).
* The native [audio device manager](/docs/flex/end-user-guide/initial-audio-device-check#how-do-i-switch-audio-devices) that was released in public beta in Flex UI 2.6.0 is now generally available. Agents can select an audio device, such as headphones or speakers, in Flex UI.
* Updated the Citrix SDK used in Flex on Citrix VDI to version 3.1.0 to provide enhanced capabilities.
* Updated the [TaskCanvasHeader](/docs/flex/developer/ui/components#taskcanvasheader) button label from **End Chat** to **End** and slightly modified the button size.

### Fixed

* Fixed an issue that prevented [legacy teams view custom filters](https://assets.flex.twilio.com/docs/releases/flex-ui/2.7.0/programmable-components/components/WorkersDataTable/#component-properties) from showing as selected after closing and reopening the filters panel.
* Fixed an issue that prevented operating system notifications from appearing when using Flex UI.
* Fixed an issue that caused some error messages to display **Unknown error** instead of the error details.
* In Unified Profiles:
  * Fixed an issue where the customer header only displayed **First Name**, **Last Name**, and **Customer Since**.
  * Fixed a search issue where phone numbers with a leading or trailing space did not locate the correct profile.
  * Fixed an issue that caused the profile header to display traits as JSON strings.
  * Fixed an issue that prevented interaction durations from appearing.
  * Fixed an issue that prevented all identifiers from appearing under **Identifiers agents can search against** on the **Profile search** tab.
  * Fixed an issue that required you to set up the [Search for a Profile widget](/docs/studio/widget-library/search-for-a-profile) to display customer highlights and enable automatic customer search.
  * On the **History** tab:
    * Fixed a small resizing issue where profile events didn't expand unless they were resized.
    * Fixed a small issue where the option to expand profile events was shown for events with no details.
    * Fixed a small issue that caused an inaccurate **Duration** value to appear.
* Fixed an issue where a call to the `ProfileEvents` API didn't honor the `PageSize` parameter.
* Restored the functionality of the `Flex.QueuesStats.[component].Content.Remove` method. Beginning in Flex UI 2.5.0, this method stopped working.
* If you use Flex Insights and have customized your interactions settings in the [analytics portal](/docs/flex/end-user-guide/insights#dashboards-and-reports) to drill into data, your customized links weren't clickable when accessing dashboards through Flex. We've fixed the issue, so custom interactions links are now clickable in your Flex Insights dashboards.
* Fixed a rare issue that caused the number 0 to appear in UI notifications.

### Known issue

* This release contains an issue that prevents dependencies from installing correctly. Please use version 2.8.1 or later instead, where this issue has been resolved.

## v 2.7.2

@twilio/flex-ui@2.7.2

Release date June 5, 2024

### Fixed

* Fixed an issue with token refresh that sometimes occurred when intermittent network issues were present.
* Fixed an intermittent issue that prevented agents from canceling a [warm transfer](/docs/flex/end-user-guide/warm-transfer) if the person or queue being added to the call did not answer.
* Corrected an issue where Webchat tasks with sent attachments showed a "File sent" message instead of the name of the file. Webchat tasks now show the filename for sent files.

## v 2.7.1

@twilio/flex-ui@2.7.1

Release date May 9, 2024

### Fixed

* Reverted the following breaking changes:
  * `manager.store.getState().flex.session.ssoTokenPayload` can be undefined in Flex UI 2.7.0, which causes a TypeScript error.
  * `manager.store.getState().flex.session.identity` can be undefined in Flex UI 2.7.0, which causes a TypeScript error.
  * The `SupervisorWorkerState` type is no longer exported from `@twilio/flex-ui/src/state/State.definition` in Flex UI 2.7.0.
* Updated the [**History** tab in Unified Profiles](/docs/flex/end-user-guide/copilot/customerprofiles#history-tab) to refresh its data every time the tab loads.
* Fixed an issue that prevented scrolling on the **Quality Management** > **Questionnaire** > **Add questions** page.
* Corrected an issue that caused a DOM error to appear when using browser developer tools on the Real-Time Queues View page when accessing a local version of Flex UI.
* Corrected an issue that caused the [Twilio Webchat React App](/docs/flex/developer/conversations/integrate-twilio-webchat-react-app) to show the customer name incorrectly if the customer sent the last message before the chat conversation ended.
* In a rare scenario, when agents change Wi-Fi networks, have intermittent network connectivity, or become idle, they appear as unavailable for up to two minutes until the TaskRouter worker websocket can reconnect. In this release, the TaskRouter worker reconnection time has been reduced to 30 seconds. Additional logging has also been added for this connection to help better diagnose any future connection issues.

## v 2.7.0

@twilio/flex-ui@2.7.0

Release date April 15, 2024

### Summary

Flex UI 2.7.0 is now available. It includes AI-generated highlights and more customer data in Agent Copilot and Unified Profiles in Flex, a pause option in Email in Flex, Flex on Azure Virtual Desktop, and the option to begin using Flex's enhanced SSO configuration. You'll also notice a number of feature and UI enhancements, bug fixes, and more.

### Added

* We've added the following features to [Agent Copilot (Public Beta)](/docs/flex/admin-guide/setup/copilot) and [Unified Profiles (Public Beta)](/docs/flex/admin-guide/setup/unified-profiles):
  * Agents have access to a new feature, [customer highlights](/docs/flex/admin-guide/setup/copilot/highlights). The one-paragraph summary combines customer data and recent activity, so agents can start the conversation faster and have a more informed interaction.
  * Agents have access to more information in a customer's profile [details](/docs/flex/end-user-guide/copilot/customerprofiles#details-tab) and [history](/docs/flex/end-user-guide/copilot/customerprofiles#history-tab):
    * Wrap-up notes now appear in a customer's history, so agents can see notes from previous interactions.
    * Agents can now see recent customer web and app activity.
    * Outbound calls now appear alongside inbound calls.
    * Past interactions in the customer's history include the queue of the agent who handled that task, in addition to the agent's name.
  * Administrators have more configuration options:
    * [Show or hide wrap-up notes](/docs/flex/admin-guide/setup/copilot/setup)
    * Configure how the customer [header and search](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/header-search), [customer details](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-details), and [customer history](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-history) appear to agents.
  * See our [documentation](/docs/flex/ai) for information about enabling these features.
* [Email in Flex](/docs/flex/email) now includes the ability to pause and resume a task. When [pause is enabled](/docs/flex/admin-guide/setup/conversations/leave-and-pause-for-conversations), the [pause action](/docs/flex/end-user-guide/email/task#pause-a-task-that-you-cant-handle-right-now) enables agents to put an email task on hold while keeping it in their queue. Agents can resume the task when they're ready, which frees up their capacity to handle other tasks in the meantime.
* If your agents use Azure Virtual Desktop to log in to Flex, you can now optimize your audio calls with [Flex on Azure Virtual Desktop (Public Beta)](/docs/flex/admin-guide/setup/voice/flex-azure-vdi).
* If your Flex instance uses [legacy SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration), you can now [migrate to enhanced SSO configuration](/docs/flex/admin-guide/setup/sso-configuration/migration-guide), a solution with enhanced security that uses OAuth 2.0 for login authorization.
* Two new metrics are available in the [Real-Time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view), Completed (30 min) and Completed (Today), which show the number of tasks completed in the last 30 minutes or today. These metrics do not appear by default. If you want to show them, [add them to your view](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view#filter-your-metrics).

### Changed

* Made updates to enable Flex pages to load faster.
* Updated dependencies to enhance security.
* Upgraded the TaskRouter SDK to version 2.0.2 to provide enhanced capabilities.
* Updated the Citrix SDK used in Flex on Citrix VDI to provide enhanced capabilities.
* Updated Axios to version 1.6.7 to provide enhanced capabilities.
* Updated some login error messages to provide more detail when using [enhanced SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration).
* Self-hosted Flex only: If your custom application uses react-scripts v5, you must [apply a workaround](/docs/flex/developer/config/known-issue-react-scripts-version) to use Flex 2.7.0 or later. For example, if you use a version of the Create React App that depends on react-scripts version 5, you must apply the workaround. This workaround is required due to a react-scripts issue.

### Fixed

* Fixed a bug that caused the [summary metrics cards on the Real-Time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view#change-your-summary-metrics-cards) page to revert to their previous order after a user changed their order. The cards now remain in the order that a user has configured them as long as the user continues to use the same browser and has not cleared their cookies.
* Enhanced [web accessibility](/docs/flex/developer/ui/web-accessibility) by improving visual contrast and correcting navigation bugs for screen readers.
* Fixed the [SetInputText action](/docs/flex/developer/email/ui-customization#email-actions) in Email in Flex. This action did not work properly for Email in Flex in some previous versions of Flex UI.
* Removed the ability to switch audio devices using the [native audio device manager](/docs/flex/end-user-guide/initial-audio-device-check#how-do-i-switch-audio-devices) when using Flex on Citrix VDI. The native audio device manager does not always work in Flex on Citrix VDI.
* Fixed a rare issue where voice call tasks could not be wrapped up after the call ended.
* Fixed an issue on the [Real-Time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view) page where the **% of short abandoned tasks** metric showed an incorrect value.
* Enhanced responsiveness of the Teams page.

## v 2.6.3

@twilio/flex-ui@2.6.3

Release date May 29, 2024

### Fixed

* Fixed an issue with token refresh that sometimes occurred when intermittent network issues were present.
* Fixed an intermittent issue that prevented agents from canceling a [warm transfer](/docs/flex/end-user-guide/warm-transfer) if the person or queue being added to the call did not answer.
* Corrected an issue where Webchat tasks with sent attachments showed a "File sent" message instead of the name of the file. Webchat tasks now show the filename for sent files.

## v 2.6.2

@twilio/flex-ui@2.6.2

Release date May 13, 2024

### Fixed

* Fixed a bug that caused the [summary metrics cards on the Real-Time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view#change-your-summary-metrics-cards) page to revert to their previous order after a user changed their order. The cards now remain in the order that a user has configured them as long as the user continues to use the same browser and has not cleared their cookies.
* Fixed an issue on the [Real-Time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view) page where the **% of short abandoned tasks** metric showed an incorrect value.
* Corrected an issue that caused the [Twilio Webchat React App](/docs/flex/developer/conversations/integrate-twilio-webchat-react-app) to show the customer name incorrectly if the customer sent the last message before the chat conversation ended.
* Fixed an issue that prevented scrolling on the **Quality Management** > **Questionnaire** > **Add questions** page.
* Fixed the appearance of information on the **Your Teams** page when viewed in a small browser window. Previously, information was in some columns too small to read when viewed in a small window.
* Corrected an issue that caused a DOM error to appear when using browser developer tools on the Real-Time Queues View page when accessing a local version of Flex UI.
* Fixed an issue that caused chat conversations to unexpectedly scroll when accessing an audio or video message earlier in the conversation.

## v 2.6.1

@twilio/flex-ui@2.6.1

Release date March 4, 2024

### Fixed

* Fixed an issue with the way that Flex on Citrix VDI handles non-fatal vdiClientDisconnected errors from Citrix. In rare situations, these errors caused Flex UI to use [degraded mode](/docs/flex/end-user-guide/troubleshooting#flex-ui-degraded-mode) until the next browser refresh.
* Fixed several minor bugs in the agent experience for [Agent Copilot in Flex](/docs/flex/admin-guide/setup/copilot).
* Updated a hard-coded English string in the [native audio device manager](/docs/flex/end-user-guide/initial-audio-device-check#how-do-i-switch-audio-devices) so it can be localized.

## v 2.6.0

@twilio/flex-ui@2.6.0

Release date February 14, 2024

### Summary

Flex UI 2.6.0 is now available. This release introduces Agent Copilot and Unified Profiles in Flex in limited public beta. These new features combine the power of large language models with real-time customer data to automate customer and agent experiences, improve end-customer satisfaction, and increase agent productivity.

This release also includes the GA release of a number of Real-time Queues View metrics that were previously in public beta, and the public beta release of Device Manager, which enables agents to switch between audio devices. In addition, you'll notice UI enhancements, bug fixes, and more.

### Added

* [Agent Copilot in Flex](/docs/flex/admin-guide/setup/copilot) is now available in limited public beta. Agent Copilot provides agents with wrap up assistance, including automated summaries, disposition codes, and customer sentiment.
* [Unified Profiles in Flex](/docs/flex/admin-guide/setup/unified-profiles) is now available in limited public beta. Unified Profiles delivers real-time customer data from multiple enterprise systems to your customer-facing teams.
* A [native audio device manager](/docs/flex/end-user-guide/initial-audio-device-check#how-do-i-switch-audio-devices) is available in public beta. Agents can select an audio device, such as headphones or speakers, in Flex UI. This feature is not available when using Flex on Citrix VDI.

### Changed

* [Real-time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view) metrics that were released in public beta in Flex UI 2.5.0 are now generally available.
* Improved error messages that appear when users are unable to successfully log in to Flex UI using single sign-on.
* If you are configuring single sign-on in Flex for the first time, Flex provides a simplified setup experience and enhanced SSO based on the OAuth 2.0 authorization framework.

### Fixed

* Fixed an issue in chat where dates were not shown for messages received before the current day.
* Fixed an issue that caused the "from" email address to appear blank in outbound emails.
* Fixed a bug that caused some messages to appear in light mode theme when dark mode theme was being used.
* Fixed an issue that caused the same agent to appear on the screen twice after multiple call transfers.
* Real-time Queues View:

  * Fixed a bug that prevented filters from working correctly in some situations.
  * Fixed a bug that caused English text to appear for non-English languages.
* Fixed a rare direct URL login issue for self-hosted Flex UI.
* Fixed a rare issue that caused the message "Your connection is poor" to appear when there was no network quality issue.
* Fixed a rare issue that caused the screen to sometimes go blank during chat conversations when using a custom plugin with specific settings.

## v 2.5.2

@twilio/flex-ui@2.5.2

Release date February 26, 2024

### Fixed \[#fixed-2]

* Fixed an issue with the way that Flex on Citrix VDI handles non-fatal vdiClientDisconnected errors from Citrix. In rare situations, these errors caused Flex UI to use [degraded mode](/docs/flex/end-user-guide/troubleshooting#flex-ui-degraded-mode) until the next browser refresh.
* Fixed a rare issue in self-hosted Flex environments that prevented users from successfully logging in to Flex from a direct URL instead of from their SSO tool.

## v 2.5.1

@twilio/flex-ui@2.5.1

Release date January 22, 2024

### Fixed \[#fixed-3]

* Fixed a potential login issue for customers who are using a specific authentication flow and running Flex within an iframe (for example, the [Flex Salesforce integration](/docs/flex/admin-guide/integrations/salesforce)). This issue was related to [Google's rollout of restrictions on third-party cookies](https://developers.google.com/privacy-sandbox/3pcd), which was announced in December 2023 and began in January 2024.
* Upgraded the date utility library version.
* Fixed a rare performance issue for specific customers who are using a feature enabled by our support team.

## v 2.5.0

@twilio/flex-ui@2.5.0

Release date December 4, 2023

### Summary \[#summary-2]

Flex UI 2.5.0 is now available. This release features email as a new channel, the GA release of Flex Citrix VDI, the public beta release of a built-in webchat widget, the ability to filter summary metrics on the Real-Time Queues View by channel, and more. It also includes UI enhancements and bug fixes.

### Added \[#added-2]

* Added the ability to [filter summary metrics on the Real-time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view#change-your-summary-metrics-cards) by channel.
* Added the following [new metrics to the Real-time Queues View in public beta](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view#last-30-minutes-and-today-metrics): average wrap up time, average talk time, rejected Invitations, number of tasks, accepted within SLA, % accepted within SLA, short abandoned, % abandoned, and % short abandoned.
* Added a new option to send Console errors to the Twilio Debugger when the Debugger Integration is enabled. By default, this option is disabled. To enable it, use the [Configuration API](/docs/flex/developer/config/flex-configuration-rest-api) to set `console_errors_included` to `true` in the `debugger_integration` section.

### Coming soon

Watch the [Twilio changelog](https://www.twilio.com/en-us/changelog?product=flex) and these release notes for updates on the following features that will be released shortly as part of this release:

* Email will be generally available as a channel for your contact center. Agents can send and receive email messages from your customers directly in Flex.

  * **Updated December 5, 2023:** Email in Flex is now generally available. To learn more and get started, see [Email in Flex](/docs/flex/email).
* The Read-only Admin role will be generally available. This role is automatically assigned to users with the Support role in Twilio Console and enables those users to:
  * Launch Flex from the Twilio Console
  * View the configurations on the Admin dashboard (read-only)
  * View real-time queue statistics
  * View the list of agents on the Teams page
  * **Updated December 12, 2023:** The Read-only Admin role in Flex is now generally available. To learn more, see [Read-only Admin role](/docs/flex/admin-guide/setup/flex-ui-users/read-only-admin-role).
* The public beta release of Webchat 3.0 will provide a new webchat that includes additional security features and is simpler to configure and deploy.

  * **Updated December 12, 2023:** Webchat 3.0 is now available in Public Beta. To learn more and get started, see the [Webchat 3.0 overview](/docs/flex/developer/conversations/webchat).
* The native integration of Google Dialogflow CX with Flex, currently in public beta, will be updated to support Dialogflow Digital Virtual Agents in Flex through an integration enabled by Twilio Conversations and Twilio Studio. Digital virtual agent conversations will be seamlessly escalated and routed to agents in Flex, along with the content of the customer's conversation with the virtual agent.

  * **Updated December 14, 2023:** Google Dialogflow CX with Flex for Digital Channels is now available in Public Beta. To learn more, see [Google Dialogflow CX Native Integration in Flex for Virtual Agents](/docs/flex/admin-guide/integrations/google-dialogflow-cx-native-integration).

### Changed \[#changed-2]

* [Flex Citrix VDI](/docs/flex/admin-guide/setup/voice/flex-citrix-vdi) is now generally available.
* In the [Real-time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view), renamed the **Handled** metric to **Accepted**. This metric continues to reflect the number of tasks that were accepted by agents.
* Updated channel icons for the agent view.
* Increased the webchat character limit to 32,768 from 4,000.

### Fixed \[#fixed-4]

* Fixed an issue where the green dot that indicates customer online status in webchat didn't appear.
* Fixed an issue where underscores were automatically removed from email addresses in Insights chat transcripts in some situations.
* Fixed an issue where outbound messages appeared as read in some scenarios, regardless of whether they had been opened.
* Fixed an issue where "FlexModule: FlexModule not initialized" errors appeared in the log multiple times while logging in to Flex, even though the login was successful and Flex was working properly.
* Fixed a bug where, in some circumstances, agents couldn't accept a call after accepting microphone permissions in their browser.
* Fixed an issue that caused slowness when typing in Flex's built-in messaging in certain scenarios.
* Fixed a rare issue where self-hosted Flex UI becomes unresponsive.

## v 2.4.2

@twilio/flex-ui@2.4.2

Release date November 29, 2023

### Fixed \[#fixed-5]

* Updated the Voice SDK to [version 2.7.3](/docs/voice/sdks/javascript/changelog#273-october-6-2023). Voice SDK 2.7.3 fixes a Chrome issue where audio is choppy when another application is also using the audio devices.

## v 2.4.1

@twilio/flex-ui@2.4.1

Release date October 17, 2023

### Fixed \[#fixed-6]

* Fixed an issue that caused the Real-time Queues View to show new filter options and additional metrics in Flex UI 2.3.x as well as Flex UI 2.4.0. These new features are now only available in Flex UI 2.4.0 and later.
* Fixed an issue that incorrectly caused a "Failed to fetch call participants" message to appear for callback request tasks in some scenarios, despite no actual problems. We've updated our task handling so that the incorrect error message no longer appears in this scenario.
* Fixed an issue that incorrectly caused outbound settings errors to appear in the Flex Status Report and downloadable Error Reports in some scenarios, despite no actual problems. These incorrect errors are no longer generated in this scenario.
* Fixed an issue on the Flex Agent UI page that incorrectly caused a **New task** link to appear. The link has been removed.

## v 2.4.0

@twilio/flex-ui@2.4.0

Release date September 28, 2023

### Summary \[#summary-3]

Flex 2.4.0 is now available. This release features several new channels by which agents can send and receive messages, as well as new filters and metrics in the Real-Time Queues View that make it easier for supervisors to monitor your contact center. It also includes UI enhancements and bug fixes.

### Added \[#added-3]

* In the [Real-time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view), you can now filter your view to just the queues and metrics that you want to monitor. There are also four new metrics: average speed of answer (ASA), average handle time (AHT), missed invitations, and average abandon time.
* Facebook Messenger and Google Business Messages communication channels are supported as Public Beta features. When enabled, agents in your contact center can use these channels to send and receive messages from your customers. For information about how to enable these channels, see the documentation about using Flex with [Facebook Messenger](/docs/flex/admin-guide/setup/conversations/manage-conversations-fbmessenger-addresses) and [Google Business Messages](/docs/flex/conversations).

### Changed \[#changed-3]

* The addWrapper API is now generally available and is no longer an experimental API.
* Added an informational message to agents when an empty message appears in WhatsApp. The empty message could be caused by the customer using a WhatsApp feature that Flex doesn't support or by the customer actually sending a blank message.

### Fixed \[#fixed-7]

* Added support for Google Chrome's experimental Storage Partitioning feature. Previously, enabling this feature prevented users from logging in to Flex using SSO, particularly in environments using Flex inside of an iframe.
* Fixed a bug that prevented Flex UI from opening when TaskRouter is unavailable. In this scenario, Flex UI now opens in [Degraded mode](/docs/flex/end-user-guide/troubleshooting#flex-ui-degraded-mode).
* Fixed an issue that caused an error when it took more than 5 seconds to load workers and queues in the **Transfer** directory. The operation now times out only if the load delay reaches 15 seconds.
* Fixed a bug that caused number emojis to appear incorrectly in Flex UI.
* Added missing documentation for component children on the [WorkerDirectoryTabs page](https://assets.flex.twilio.com/docs/releases/flex-ui/2.4.0/programmable-components/components/WorkerDirectoryTabs/) in the API Reference.
* Fixed an issue where network issues that affect the Voice SDK required agents to refresh the website before making outbound calls.

## v 2.3.5

@twilio/flex-ui@2.3.5

Release date January 9, 2024

### Fixed \[#fixed-8]

* Fixed a rare performance issue for specific customers who are using a feature enabled by our support team.

## v 2.3.4

@twilio/flex-ui@2.3.4

Release date September 7, 2023

### Fixed \[#fixed-9]

* Fixed a permissions issue where Supervisor could incorrectly see the New dashboard button
* **October 17, 2023 update**: Fixed an issue that incorrectly caused four new metrics to appear in the Real-time Queues View. These metrics were released with [Flex UI 2.4.0](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx#v-240), but incorrectly appeared in Flex UI 2.3.x from October 3, 2023, until the issue was fixed in [Flex UI 2.4.1](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx#v-241) on October 17, 2023.

## v 2.2.2

@twilio/flex-ui@2.2.2

Release date September 6, 2023

### Fixed \[#fixed-10]

* Fixed a permissions issue where Supervisor could incorrectly see the New dashboard button

## v 2.1.3

@twilio/flex-ui@2.1.3

Release date August 29, 2023

### Fixed \[#fixed-11]

* Fixed a permissions issue where Supervisor could incorrectly see the New dashboard button

## v 2.3.3

@twilio/flex-ui@2.3.3

Release date July 14, 2023

### Fixed \[#fixed-12]

* Fixed the display issue while adding components to CallCanvas
* Increased timeout interval for certain SDKs to address initialization issues

## v 2.3.2

@twilio/flex-ui@2.3.2

Release date July 10, 2023

### Summary \[#summary-4]

Flex 2.3.2 is now available with support for Citrix HDX VDI as a Public Beta feature which provides high quality audio for voice calls while agents are connected to Flex via Citrix HDX VDI.

### Added \[#added-4]

* Added enhancements to support Citrix HDX VDI as a Public Beta feature
* For more information on how to setup Flex Citrix VDI, checkout our [Flex Citrix VDI documentation](/docs/flex/admin-guide/setup/voice/flex-citrix-vdi)

## v 2.3.1

*@twilio/flex-ui@2.3.1*

Release date July 3, 2023

### Summary \[#summary-5]

Flex 2.3.1 is now available with betterments for initialization and logging along with UI improvements.

### Fixed \[#fixed-13]

* Upgraded Conversations SDK version to v2.4.1
* Fixed the issue while viewing chat transcript logs

## v 2.3.0

*@twilio/flex-ui@2.3.0*

Release date June 28, 2023

### Summary \[#summary-6]

Flex 2.3 is now available. It includes improvements for initialization and logging along with UI enhancements. This release uses an updated version of the Voice SDK which may require network configuration changes. Please check the Voice SDK release notes for more information.

### Changed \[#changed-4]

* Updated [Voice JavaScript SDK](/docs/voice/sdks/javascript/changelog) from 2.0.1 to 2.5.0 (Changed [servers URLs/names for voice edge](/docs/voice/sdks/javascript/changelog#changes-4))

### Fixed \[#fixed-14]

* Fixed the issue while creating custom keyboard shortcuts using numbers in Windows
* Fixed the behavior of Apply and Reset buttons while changing filters on Your Teams page
* Fixed the additional scroll issue in Queues Stat screen
* Fixed initialization issues using timeout for dependencies
* Fixed logging issues in Flex Configuration API enabling custom settings

## v 2.2.1

*@twilio/flex-ui@2.2.1*

*release date June 28, 2023*

### Fixed \[#fixed-15]

* Fixed logging issues in Flex Configuration API enabling custom settings.
* Fixed initialization issues using timeout for dependencies.

## v 2.2.0

*@twilio/flex-ui@2.2.0*

Release date May 29, 2023

### Summary \[#summary-7]

Flex 2.2 is now available with changes for displaying call transcripts for Google Dialogflow CX Virtual Agent calls. It also includes an upgraded SDK version of TaskRouter and improvements to the UI and sorting functionality.

### Changed \[#changed-5]

* Upgraded TaskRouter SDK version to v0.8.0 to provide enhanced capabilities

### Fixed \[#fixed-16]

* Fixed display issues after putting a call on hold
* Fixed functionality issues on keyboard shortcuts
* Fixed the programmability issues in customizing tasks
* Fixed an infinite loading issue in Conversation Tasks
* Fixed issues with firing of specific events on login
* Fixed "auto accept" behavior of certain voice and email outbound tasks

### Added \[#added-5]

* Added UI enhancements to address the slowness issues in Transfer Directory
* Restored sorting functionality present in previous UI versions. For more details, see "Team View Changes" section of [Migrate from Flex UI 1.x.x to 2.x.x](/docs/flex/developer/ui/migration-guide)
* Added the ability to fetch and display call transcripts to agents for Google Dialogflow CX Virtual Agent voice calls

## v 2.1.2

*@twilio/flex-ui@2.1.2*

*release date June 28, 2023*

### Fixed \[#fixed-17]

* Fixed logging issues in Flex Configuration API enabling custom settings.
* Fixed initialization issues using timeout for dependencies.

## v 2.1.1

*@twilio/flex-ui@2.1.1*

Release date Apr 14, 2023

### Fixed \[#fixed-18]

* Added improvements to in-progress message handling on select custom Conversation channels when switching between tasks

## v 2.1.0

*@twilio/flex-ui@2.1.0*

Release date Feb 8, 2023

### Changed \[#changed-6]

* Added additional country codes to the dialpad dropdown when making an outbound call
* Removed Beta label from autogenerated API documentation

### Fixed \[#fixed-19]

* Updated Plugin initialization checks to decrease the load time of Flex UI
* Fixed an issue where the unread chat notification was not appearing correctly when accepting a task
* Fixed an issue where a disconnected agent's status appeared as online when they were offline
* Updated scroll bar behavior for code samples in autogenerated API documentation
* Fixed an issue where API documentation feedback could not be sent
* Restored the ability to navigate within chat messages via the keyboard after switching between tasks
* Fixed the logic for Hidden Worker Filters

### Added \[#added-6]

* Keyboard shortcuts are now available for common actions on the Agent desktop. Read the [User guide](/docs/flex/end-user-guide/keyboard-shortcuts) and [Developer documentation](/docs/flex/developer/ui/modify-keyboard-shortcuts) for more information.

### Known issues

* We have had reports of intermittent issues with call hold state, where the actual hold state and UI hold state are inconsistent. This is being actively investigated. Please see "Changes to Sync usage in Flex UI" below for more details.

## v 2.0.3

*@twilio/flex-ui@2.0.3*

*release date June 28, 2023*

### Fixed \[#fixed-20]

* Fixed logging issues in Flex Configuration API enabling custom settings.
* Fixed initialization issues using timeout for dependencies.

## v 2.0.2

*@twilio/flex-ui@2.0.2*

Release date Dec 15, 2022

### Changed \[#changed-7]

* Removed Beta notice from the API documentation

### Fixed \[#fixed-21]

* Updated anchor link scrolling in API documentation so heading is no longer hidden behind the header
* Fixed an issue with submitting feedback on API documentation

### Known issues \[#known-issues-2]

* We have had reports of intermittent issues with call hold state, where the actual hold state and UI hold state are inconsistent. This is being actively investigated. Please see Changes to Sync usage in Flex UI below for more details.

## v 2.0.1

*@twilio/flex-ui@2.0.1*

Release date Dec 9, 2022

### Changed \[#changed-8]

* Updated messages in Status report and Degraded mode notifications

## v 2.0.0

*@twilio/flex-ui@2.0.0*

Release Date: Dec 7, 2022

### Flex Conversations

![Twilio Flex interface showing a chat with Carol Smith discussing an order form for shoes.](https://docs-resources.prod.twilio.com/ce4647d0b8c173a62e94e67ed383537e41361d6dd35a81f545a882aa0857b851.png)

> \[!NOTE]
>
> Flex UI 2.0 supports both [Flex Conversations](/docs/flex/developer/conversations) and [Legacy messaging](/docs/flex/developer/messaging).

Flex UI 2.0 support [Flex Conversations](/docs/flex/developer/conversations) and its new messaging features:

**WhatsApp channel and attachments support** - WhatsApp is now available as a native channel and agents can have conversations with customers using plan text or attachments. Note, currently only one attachment per message is supported.

**MMS support** - Agents can now send and receive MMS messages when having a conversation with the customer over SMS channel. Note, only MMS to +1 numbers is supported.

**Supervisor attachment monitoring** - Supervisors can now access attachments when monitoring live conversations and viewing chat transcripts

**Attachment configuration** - Admins can now configure attachment settings in Console per each messaging address.

**Messaging UX improvements** - we have improved messaging experience for agents, this includes

* New message separator and scroll to newest message button - identify which messages in the list are new and quickly scroll down to the bottom to see new messages in the conversation.
* Text and attachment in a single message - compose and send a single message that contains both text and one attachment
* Delivery failed receipts - get notified when a message has not been delivered
* Message loading indicator - now when scroll up for more messages, if loading messages takes a bit longer, we will show you a loading spinner

For more info on Flex Conversations and the new capabilities, visit [Flex Conversations](/docs/flex/developer/conversations) documentation

**Conversations SDK support**

Flex UI now supports [Conversations SDK](/docs/conversations-classic/initializing-conversations-sdk-clients#the-javascript-client) and [Programmable Chat SDK](/docs/chat) support has been removed. If you have an existing Flex project and plugins that you wish to migrate to v2.0, follow our [migration guide](/docs/flex/developer/ui/migration-guide)

### New messaging input field

![Chat interface showing messages between Damien and Amy with a text input field.](https://docs-resources.prod.twilio.com/53f717bcca33e9f4eb85fbd6cced282bc59eeda81fd71aedbd813f4bc1291b18.png)

For developers, we are now providing a more customizable messaging component MessageInputV2. It's a new Programmable component with 2 children

```javascript
<MessageInputV2>
    <MessageInputArea key="textarea"/>
    <MessageInputActions key="actions"/>
</MessageInputV2>
```

`MessageInputActions` component is also a Programmable component and contains the message send button and the file attachment button (if file attachments are enabled). Add custom actions to this component with [component add methods](https://assets.flex.twilio.com/docs/releases/flex-ui/2.6.1/programmable-components/DynamicContentStore/#add-child-options-cleanupfunction).

We have also introduced new default props

* use `rows` prop to set input field height
* use `hideSendButton` prop to hide Send button to free more space for your custom actions. Use it together with `returnKeySendsMessage` to enable sending message on Enter.

Learn more about new components in our [Flex UI API docs](https://assets.flex.twilio.com/docs/releases/flex-ui/2.6.1/programmable-components/components/MessageInputV2/).

### Web Accessibility improvements

In Flex UI 2.0 we are aligning to [WCAG 2.1 level AA](https://www.w3.org/TR/WCAG21/) standards to support our customers in building accessible user experiences. We are gradually improving Web accessibility of our out-of-the-box Flex UI experience and tools used to customize it.

In this version we have introduced accessible color theme built with [Twilio Paste](https://paste.twilio.design/) including a Dark mode theme and improved accessibility support with a clearer focus state, improved keyboard navigation and screen reader support for Agent experience.

To learn more in [Flex UI web accessibility](/docs/flex/developer/ui/web-accessibility).

### Degraded mode

We have introduced a Degraded mode for Flex UI - now Flex UI will initialize with limited capabilities, even if some of the components like SDK's (TaskRouter, Conversations, Voice or Sync) are down. In case of disruptions in Twilio services, Flex User will be able to login to Flex and perform certain tasks that are still available. For example, in the case of Twilio Voice experiencing an incident, your agent will still be able to handle messaging tasks.

Users will see a notification informing them of a possible disruption in the normal work of Flex UI and they will be able to download a thorough report with error details and logs.

![Twilio Flex chat interface showing degraded mode notification and conversation with Carol Smith about an order form.](https://docs-resources.prod.twilio.com/af11bac297af51dc89c515cd203cac5ef4a633463c10cdc60d783c26c596e738.png)

For more on error handling and reporting, check out our [Troubleshooting Flex UI](/docs/flex/developer/ui/troubleshoot-the-flex-ui) guide.

### User activity controls improvements

We have updated activity controls and user profile for easier access and improved programmability.

![User status dropdown with options and profile card with logout button.](https://docs-resources.prod.twilio.com/7af8432b9aaa2c3cfc50bb18cd967c1091445a99286906583fc073aa709da938.png)

We have introduced a new programmable component `Activity` is added to `MainHeader`. This allows developers to replace this component with more custom activity controls that suite their business workflows.

We also made changes to the `UserCard` component. We have removed activity controls and changed the layout.

Note, this is a potential breaking change if you have customized `UserCard` and its child components using CSS. Check out our [migration guide](/docs/flex/developer/ui/migration-guide), if you are upgrading an existing Flex project to Flex UI 2.0.

### Teams view, Queue stats and Quality management improvements

We have introduced several updates to the supervisor capabilities:

* In [Queue Stats](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view), channels with no data or only 0's are no longer displayed
* In [Quality Management](/docs/flex/end-user-guide/insights):

  * We have allowed question sorting for questionnaire
  * Added notifications for successful and unsuccessful operations
  * Added form validation
  * Added questionnaire visibility toggle
* In [Conversations Player](/docs/flex/end-user-guide/insights/conversation-screen)

  * we have added a permission check for `player.view.player` before displaying conversation content so Player does not show with an error when user does not have permission to access recordings
  * Generate a backup waveform in the browser will now be showing when agents and customers are talking in the call recording Player. This enables Player to generate waveforms for recordings that are not accessible by Twilio backend services - encrypted by public key, copied to custom storage etc
  * Overlay Player will now support new address format of drill down links in Flex Insights Historical Reporting

### Upgrade developer tools

In this version, we have upgrade developer tools to like twilio SDK's and major dependencies, which required a major version upgrade of a Flex UI library.

**Upgraded dependencies**

* Node -> >= 14
* React & React DOM -> ^17.0.0
* Redux -> ^4.0.5
* React-redux -> ^7.2.2
* React-router-redux -> removed
* Emotion -> ^11.1.3
* Material UI -> ^4.12.3

**Upgraded SDK's**

* Conversations SDK -> 2.1.0
* Voice SDK -> 2.0.1
* TaskRouter SDK -> ^0.5.9

For more details on all the upgraded tools, check out our [migration guide](/docs/flex/developer/ui/migration-guide)

### Twilio Paste support

We have integrated Twilio Paste support into the Flex UI. [Twilio Paste](https://paste.twilio.design/) is the design system that Twilio created to support its own efforts to create consistent, inclusive, and delightful experiences. Now, Flex UI developers and partners can use the same component library for plugin development as Twilio's developers. This means that partners ensure consistent styling and branding for their customers, without having to bring in extensive UI development expertise.

### Theming improvements

Flex UI 2.0 now uses a new theming structure that more closely maps to the [Twilio Paste](https://paste.twilio.design/) design system. This new structure is based on the concept of [design tokens](https://paste.twilio.design/tokens), a set of variables that you can modify. This structure promotes both consistency, customization and [web accessibility](/docs/flex/developer/ui/web-accessibility).

**New theme config** - We have introduced a new configuration key called `config.theme` with the following structure

```javascript
interface ThemeConfigProps {
   isLight?: boolean; // Represents if light or dark theme
   tokens?: Tokens; // Paste tokens
   componentThemeOverrides?: Object; // Object containing styles of the component which is to be overridden.
}
```

**Component theming** - For components which receive the theme as props, `props.theme.tokens` is introduced. For more on each token information, please refer to [Twilio Paste](https://paste.twilio.design/tokens)

**Custom tokens** - we have added support for customer tokens so you can pass your own custom tokens to theme using the example below

```javascript
  appconfig = {
    theme: {
      tokens: {
        custom: {
          myCustomToken: "#ccc"
        }
      }
    }
  }
```

**ThemeProvider** - Introducing a new API `Flex.setProviders()` which can be used to load providers on the root level once and don't have to worry about wrapping again as the context will correctly set. Now to use Paste in Flex plugins, developers will not need to wrap Paste `ThemeProvider` over all its components. Check out our Theming docs for examples of how this can be used or explore the API in our [Flex UI API docs](https://assets.flex.twilio.com/docs/releases/flex-ui/2.0.0-beta.1/theming/ThemeProvider).

### New Actions and Flex Events for TaskRouter SDK

We have added new Flex actions wrapping TaskRouter

```javascript
import { Actions } from "@twilio/flex-ui";

// Set worker attributes
Actions.invokeAction("SetWorkerAttributes", { attributes: {}, mergeExisting: true });

// Update worker token
Actions.invokeAction("UpdateWorkerToken", { token: "newToken" });

// Update task attributes
Actions.invokeAction("SetTaskAttributes", { attributes: {}, mergeExisting: true });

// Issue a Call to a Worker
Actions.invokeAction("IssueCallToWorker", { callerId: "callerId", twiMLUrl: "twiMLUrl", options: {} });

// Dequeue the Reservation to the Worker.
// This will perform telephony to dequeue a Task that was enqueued using the Enqueue TwiML verb.
// A contact_uri must exist in the Worker's attributes for this call to go through.
Actions.invokeAction("DequeueTask", { options: {} })

// Redirect the active Call tied to this Reservation
Actions.invokeAction("RedirectCallTask", { callSid: "callSid", twiMLUrl: "twiMLUrl", options: {} });

// Update the Worker's leg in the Conference associated to this Reservation
Actions.invokeAction("UpdateWorkerParticipant", { options: {} });

// Update the Customer leg in the Conference associated to this Task
Actions.invokeAction("UpdateCustomerParticipant", { options: {} });
```

and introducing new Flex Events wrapping TaskRouter event

```javascript
import { Manager } from "@twilio/flex-ui";
const manager = Manager.getInstance();

// Emitted when a worker receives a new task
manager.events.addListener("taskReceived", (task: ITask) => {});

// Emitted when the worker's activity changes
manager.events.addListener("workerActivityUpdated", (activity: Activity, allActivities: Map<string, Activity>) => {});

// Emitted when the worker's attributes changes
manager.events.addListener("workerAttributesUpdated", (newAttributes: Record<string, any>) => {});

// Emitted when the worker's task status gets updated
manager.events.addListener("taskUpdated", (task:ITask) => {});

// Emitted when the worker's task gets set to 'accepted'
manager.events.addListener("taskAccepted", (task:ITask) => {});

// Emitted when the worker's task gets set to 'canceled'
manager.events.addListener("taskCanceled", (task:ITask) => {});

// Emitted when the worker's task gets set to 'completed'
manager.events.addListener("taskCompleted", (task:ITask) => {});

// Emitted when the worker's task gets set to 'rejected'
manager.events.addListener("taskRejected", (task:ITask) => {});

// Emitted when the worker's task gets set to 'rescinded'
manager.events.addListener("taskRescinded", (task:ITask) => {});

// Emitted when the worker's task gets set to 'timeout'
manager.events.addListener("taskTimeout", (task:ITask) => {});

// Emitted when the worker's task gets set to 'wrapup'
manager.events.addListener("taskWrapup", (task:ITask) => {});
```

Now you can use exclusively [Flex UI Actions Framework](https://assets.flex.twilio.com/docs/releases/flex-ui/2.0.0-beta.1/ui-actions/ActionsManager) when working with TaskRouter SDK, without needing to access its methods directly.

Visit our [Flex UI API docs](https://assets.flex.twilio.com/docs/releases/flex-ui/2.0.0-beta.1/) for more details on Actions and Events

### State management improvements

As part of the upgrades to our core APIs, Flex UI 2.0 includes the Redux Toolkit and some new APIs for managing your internal state. These tools provide some guardrails for your state management, helping you set up boilerplate code with better defaults.

**useFlexSelector** - A wrapper around [Redux's `useSelector` method](https://react-redux.js.org/api/hooks#useselector). It exposes the same API but adds some Flex validations to ensure Flex's internal state is usable

**useFlexDispatch** - A wrapper around [Redux's `useDispatch` method](https://react-redux.js.org/api/hooks#usedispatch). It prevents dispatches from causing side effects to Flex's state, ensuring your changes work as expected

Go to our docs to learn more about how to manage state with Flex UI, [use Redux](/docs/flex/developer/ui/redux) and explore the details of the [new state management API's](https://assets.flex.twilio.com/docs/releases/flex-ui/2.0.0-beta.1/advanced/state-management/Store)

### Deprecated and unsupported features

* [Legacy dialpad](/docs/flex/end-user-guide/legacy-dialpad) - we are no longer supporting Legacy dialpad implementations. We advise migrating to the natively supported [dialpad](/docs/flex/admin-guide/setup/voice/dialpad). Checkout the [migration guide](/docs/flex/admin-guide/setup/voice/dialpad-migration-guide) for more info on how to switch.
* [Debugger Integration](/docs/flex/end-user-guide/debugger) - this integration is not yet supported in Flex UI 2.0. More updates for debugger integration options coming soon.
* Flex UI Diagnostics tool - this pilot feature is not yet supported in Flex UI 2.0.
* [Flex Solutions and community plugins](/docs/flex/solutions-library) - Plugins and Solutions provided by Twilio community engineers, are not yet migrated on to Flex UI 2.0 version.

#### Changes to Sync usage in Flex UI

## What has been done?

In Flex UI version 2.0 we introduced updates to some internal operations within Flex UI to no longer rely on data provided by [Sync](/docs/sync). This included Conference state management as well as Outbound calls and Transfer workflows. All of these now get data from [TaskRouter SDK](/docs/taskrouter/js-sdk) instead of Sync. This was done to reduce the number of dependencies in these workflows for better performance and increased resilience in the event of an incident.
Flex UI versions 1.33 and above also include the same changes to Sync usage inside Flex UI.

## What has changed?

This change only affects the internal operation of Flex UI and does not introduce any breaking changes that customers should be aware of. However, there are some UI changes that you may see.

### Sync limits on data retention no longer limit the fetching of workers and queues

Sync only stores data for 30 days since the last change to a status. This affects lists of workers (users) and queues that previously did not include workers or queues that had no change for 30 days.
The parts of Flex UI that no longer use Sync can now fetch all workers and queue no matter when the last change was made.

**Effect on Flex user experience**

* When transferring a call, the lists of workers and queues now show all possible workers and queues.
* When making an outbound call, all queues are available to be selected.

### Conference Sync Maps

Under the hood, Flex UI now receives and displays Conference information from an alternative backend service, Flex Orchestrator, rather than Sync Maps. However, the same information is still published to Sync Maps in order to enable backwards compatibility with Flex UI customizations and plugins.
In cases where a Flex customization makes heavy use of Conference data for advanced call use cases, there is the potential for inconsistencies in the UI. So far we have had a report of duplicate 'Left call' participants appearing in the call canvas. This particular issue was reported for a customer plugin based on [this Twilio Professional Services plugin](https://github.com/trogers-twilio/plugin-outbound-participants-canvas) that renders participants of a call. The workaround for these inconsistencies is to use the [native outbound dialer now built directly into Flex](/docs/flex/admin-guide/setup/voice/dialpad-configure).

### Transfer directory

Flex UI now fetches workers and queues from an alternative backend service, Task Router, rather than Sync Maps. Workers and queues are soft deleted from Sync Maps after 30 days of inactivity, but this is not true of Task Router. This means more workers and/or queues may appear in the transfer directory than before.

### Hidden worker and queue filters

The `hiddenWorkerFilter` and `hiddenQueueFilter` default props on the [WorkerDirectoryTabs dynamic component](https://assets.flex.twilio.com/docs/releases/flex-ui/2.1.0/programmable-components/components/WorkerDirectoryTabs/) can be used to filter the workers and queue that appear in the transfer directory.

## FAQs

### Is Sync still used in Flex UI?

Yes. We have only removed it from the parts of Flex UI mentioned above.

### Can I still use Sync for customizations?

Yes, Sync can still be used for building additional functionality on top of Flex. Flex is still populating Sync with the same data as it did before.

### Will Sync be removed from other parts of Flex UI?

We are currently evaluating other workflows that currently use Sync that could be improved by reducing dependencies.

### What should I do if I find a difference in behavior between 1.32 and below and 1.33 or 2.0 and above?

Please [contact Support](https://help.twilio.com/hc/en-us/articles/360048500694-Contacting-Twilio-Support) to report any changes between these versions.

### Other changes

* Added a mute button to `LiveCommsBar` to access mute action when the Agent is on a live call and remove Mute button from the `MainHeader`
* React & ReactDOM are now peer dependencies
* `MessageState` & `ITask` interfaces now accept a TaskAttributes argument
* Added support for `exact` prop for React Router
* Check input device before outbound call
* Added alert dialog if an inbound call comes in during an outbound call
* Add support for React router parameters to custom components, you can now get parameters from URL through react router
* Fixed privilege escalation security vulnerability
* Support `.credit` domain - link in chat with this domain will now be clickable

> \[!WARNING]
>
> Public Beta versions of Flex UI 2.0 are listed below.

## v 2.0.0-beta.3

*@twilio/flex-ui@2.0.0-beta.3*

Release Date: Nov 10, 2022

### Fixed \[#fixed-22]

* Fixed an issue with type definitions that prevented some customers from creating new plugins.

## v 2.0.0-beta.2

*@twilio/flex-ui@2.0.0-beta.2*

Release date: October 24th, 2022

### Changed \[#changed-9]

* Improved reliability of core contact center functionality in degraded mode
* Moved Debugger UI to Status Report and released to GA
* Consume the latest Paste libraries @twilio-paste/core 15.3.0 and @twilio-paste/icons 9.2.0
* Native Supervisor "Analyze" and "Dashboards" views are now picked by default over the legacy ones

### Fixed \[#fixed-23]

* Performance improvements to the Queue Stats view
* Users can no longer interact with Status Report (formerly Debugger UI) when the token has expired
* TaskInfoPanel in Supervisor view can now be customized
* Fixed issue with individual user access to Insights Dashboards
* Fixed a bug in Historical Reporting where segment links were not clickable in created KPI dashboards
* Message input no longer remains editable if the conversation is closed via API
* Fixed an issue preventing audio constraints from being applied to the audio device
* Fixed an issue where remote config loglevel was not being applied correctly to SDK logs
* Tasks in TeamsView now stack horizontally with a scrollbar rather than vertically
* Chat now fetches older messages if all the newer messages are displayed, even without scroll interaction. This fixes an issue where older messages were hidden when the Chat Canvas is zoomed out
* Task-specific notifications now only shown if they are related to the selected task
* Fix chat messages sort order for screen-readers
* Various accessibility improvements

### Added \[#added-7]

* The downloadable report provided by Status Report now includes a summary of the user's degraded mode state and information about Twilio service status
* Scroll positions are now preserved between conversations
* selectionStart and selectionEnd now added as part of conversationInput state
* Chat messages are now keyboard navigable using the up/down arrow keys
* Flex UI will now wait for plugins to complete initialization after login before moving on

## v 2.0.0-beta.1

*@twilio/flex-ui@2.0.0-beta.1*

Release date: March 30th, 2022
