# Flex-Zendesk integration release notes

## Dec 9, 2024 (v1.5.2)

### Fixed

* Corrected an issue for Voice, SMS ,and Whatsapp tasks where the Zendesk user was sometimes assigned as the Zendesk ticket requestor instead of the correct customer contact record.

## Nov 17, 2022 (v1.5.1)

### Added

* Made compatible with Flex Conversations and Flex UI 2.0

## Apr 12, 2021 (v1.4.0)

### Fixed

* Fix for ZAF Client initialising with wrong appGuid after page refresh

## Apr 09, 2021 (v1.3.4)

### Fixed \[#fixed-2]

* Fix for plugin failing to initialize after Flex session expired

## Apr 09, 2021 (v1.3.3)

### Fixed \[#fixed-3]

* Fix for plugin failing to initialize after Flex session expired

## Mar 02, 2021 (v1.3.2)

### Fixed \[#fixed-4]

* Fix for wrong author name rendered on chat message transcription

## Sep 22, 2020 (v1.3.1)

### Added \[#added-2]

* Internal improvements to Click-to-dial feature

### Fixed \[#fixed-5]

* Fixed an issue with ZD and SFDC integrations running simultaneously

## Aug 03, 2020 (v1.2.0)

### Changed

* Click-to-dial feature now uses [Flex Native Outbound Calling](https://www.twilio.com/en-us/changelog/flex-outbound-dialing-and-native-dialpad---public-beta). Check our [migration guide](/docs/flex/admin-guide/integrations/zendesk/upgrade-guide) to see how you can upgrade your Flex-Zendesk integration.

## Mar 16, 2020 (v1.1.1)

### Changed \[#changed-2]

* This release includes some minor **internal** changes to the Click-to-Dial functionality to avoid any overlap and clashing of this functionality with any other outbound tasks plug-ins, like the Experimental Dialpad features. Additional checks are enforced in the click to dial implementation to avoid this overlap. No functional or experience changes to the users.

## Aug 6, 2019 (v1.0.0)

### Zendesk Integration is now GA

Using the new Zendesk CTI Flex integration, teams using Zendesk as their ticketing system can now interact with their customers across multiple communication channels and focus on solving customer issues instead of administering their account, by letting Flex take care of the ticket housekeeping, right from within their Zendesk UI.

This integration is Generally Available starting today and supports the following:

* **Context Switching:** Set your Zendesk Screen to Automatically change to a related Zendesk ticket or User when you multitask.
* **Search and Screenpop:** Available across all channels. Use information gathered in the triage phase (ex. IVR or web form ) of customer interaction to automatically lookup and display relevant Zendesk tickets or user records.
* **Interaction logging:** Automatically log Flex interactions into a related Zendesk ticket.
* **Chat Transcripts:** Automatically save Chat Transcripts for non-voice channels as Internal Ticket Comments.
* **Voice Recording:** Enable Flex Voice Recording Feature for Inbound voice calls.
* **Configurable Ticket and User Creation/Display:** Configure automatic ticket and/or User Creation and Navigation in response to Customer Engagements.
* **Click to Dial** *(\*Beta)* **:** Let agents place an outbound call with the click of a button.

You can add Flex to your Zendesk Support Domain by following the documentation [here](/docs/flex/admin-guide/integrations/zendesk).
