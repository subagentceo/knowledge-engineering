# Topics, subtopics, and disposition codes (Public Beta)

> \[!IMPORTANT]
>
> Topics for Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Topics for Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI.

## Overview

This document explains how to configure topics, subtopics, and disposition codes in your contact center with Agent Copilot. You can use these labels with Agent Copilot wrap-up notes to automatically categorize customer conversations and speed up the wrap-up process.

## Terms

* **Topic**: A high-level category that describes the primary reason a customer is contacting you. Within a topic, you can further specify by:
  * **Subtopic**: A specific focus or subject of the interaction.
  * **Disposition code**: The final outcome of an interaction.

## How to organize information

When planning your categories, here are some things to keep in mind:

* **Start broad**: Topics should be broad and focus on a high-level subject.
* **Get granular**: Subtopics are more granular and describe a specific action or issue.
* **Decide the outcome**: Disposition codes should always describe an outcome or resolution.

For example:

* **Topic**: *Billing*
  * **Subtopic**: *Refund request*
  * **Disposition code**: *Refund processed*

To ensure the AI model accurately categorizes information, it's crucial to maintain a clear hierarchical structure. This structure helps the AI model assign labels, recognize patterns, and adapt as your organization adds new subtopics and disposition codes. The structure also helps with reporting and trend analysis (topics), issue identification (subtopics), and resolution tracking (disposition codes).

Here are some ways you could organize your topics:

| Topics          | Subtopics                                                                                 | Disposition codes                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Billing         | <ul><li>Payment method update</li><li> Refund request</li><li> Incorrect charge</li></ul> | <ul><li>Payment issue resolved </li><li>Refund processed </li><li>Escalated to billing team</li></ul>  |
| Technical issue | <ul><li>Hardware issue</li><li> Bug</li><li> Network issue</li></ul>                      | <ul><li>Device issue resolved</li><li>Software installed</li><li>Escalated to technical team</li></ul> |
| Account support | <ul><li>Password reset</li><li> Account locked</li><li> Changes to profile</li></ul>      | <ul><li>Resolved</li><li>Escalated to tier 2</li><li>Account closed</li></ul>                          |

## Naming

To avoid confusion as you add topics, make sure that names are distinct and don't overlap.

We also recommend creating an "Other" topic as a catchall for when the AI model can't find a match. This may help reduce the need for agents to manually choose a topic when completing notes.

## Descriptions for AI

Descriptions improve accuracy. While descriptions are optional, they provide the AI model with more context. If you have similar topics or use industry-specific terms, you can use descriptions to differentiate categories and explain terms and acronyms.

### Examples

**Topic**: *Billing*

**Description**: *Use this for questions or concerns related to charges, processing, or invoices.*

* **Subtopic**: *Incorrect charge*

  **Description**: *Use this when the customer was charged the wrong amount or bought the wrong item.*
* **Disposition code**: *Refund processed*

  **Description**: *Use this when a refund has been issued to the customer.*

### Best practices

* When adding a description, think about how you'd describe your topic to an agent or admin who's new to the company. If you want to use company-specific knowledge or terms, make sure to explain them in the description.
* Use 1-2 short sentences. Choose keywords or phrases that aren't already included in the topic title.
  Additional context can increase generation time.
* Writing accurate descriptions may take some practice and testing. Continue to refine them as needed.

## What agents see

If using topics with Agent Copilot wrap-up notes, agents see up to three topics during wrap-up. Auto-detection currently detects one topic, but agents can manually add up to two more if they want to capture multiple themes in a conversation.

Before completing a task, agents can confirm or edit auto-generated labels.

![Agent view of topics.](https://docs-resources.prod.twilio.com/a6662d38c2a7d359f62b8bbdd1e3e28ed5358eb791bfc99684bc1a5c1fa5e4b8.png)

## Planning and maintenance

#### Planning

* It can be helpful to plan out your topics, subtopics, and disposition codes in a separate sheet before adding them to Flex UI.
* Check to see if you have [uncategorized disposition codes](https://console.twilio.com/us1/develop/flex/settings/topics). If so, [follow the steps to archive them](#archive-uncategorized-disposition-codes) and create new ones that belong to a topic.

#### Test and review

* Make sure to regularly test how the AI model assigns categories and note any underused categories. You can adjust AI descriptions at any time to see what works best.

#### Reporting

* You can regularly monitor topics and disposition codes in your reporting to help drive decision making.

## Manage topics, subtopics, and disposition codes

### Add a topic, subtopic, and disposition code

* For each topic, you can add up to 20 subtopics and 20 disposition codes.
* You can add a maximum of 50 topics.
* Names can't include the following characters: ; / ? : @ = & " \< > # % { } | \ ^ \~ \[ ] \`

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **Contact center settings** > **Topics**.
2. Click **Add topic**.
3. Add a **Topic name**.
4. Optionally, add a **Topic description for AI**. Describe the purpose of the topic.
5. If you'd like to add subtopics, click **Add subtopic**. Optionally, add a **Subtopic description for AI**.
6. If you'd like to add disposition codes, click **Add disposition code**. Optionally, add a **Disposition code description for AI**.
7. Click **Save topic**, or, if you want to add more topics, click **Save and add another**.

### Edit a topic, subtopic, or disposition code

* The only section you can edit is the description.

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **Contact center settings** > **Topics**.
2. Find the topic you want to edit, and click the pencil icon.
3. Make changes then click **Save topic**.

### Archive a topic

* Archiving a topic will also archive its subtopics and disposition codes.
* You cannot restore a topic or reuse a topic name once archived. Archived topics are not displayed in the UI.

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **Contact center settings** > **Topics**.
2. Find the topic you want to archive, and click the pencil icon.
3. Click **Archive topic** > **Archive**.

### Archive subtopics or disposition codes

* Once archived, you cannot restore or view a subtopic or disposition code, or reuse its name.

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **Contact center settings** > **Topics**.
2. Find the topic for the subtopic or disposition code you want to archive, and click the pencil icon.
3. Click **Archive** next to the category or categories you want to archive.
4. Click **Save topic**.

## Disposition codes without a topic

You may have **uncategorized disposition codes** if you created disposition codes before topics were available. If you see active [uncategorized disposition codes in the Console](https://console.twilio.com/us1/develop/flex/settings/topics), we recommend following these steps to archive them and create new disposition codes that belong to a topic.

If you don't add topics, your uncategorized disposition codes will still work. Agents can still see disposition codes in wrap up, but the **Topic** is listed as **uncategorized** and **Subtopic** fields are grayed out.

### Archive uncategorized disposition codes

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **Contact center settings** > **Topics**.
2. Click **Uncategorized disposition codes** to expand your codes. If you don't see this section, then you don't have any uncategorized codes.
3. Click a disposition code.
4. From **Edit uncategorized disposition codes**, copy and paste any disposition code names and descriptions into a separate document or source, so you can save that information before you archive them.
5. To archive:

* One or more disposition codes: click **Archive** next to each one, then click **Save changes**.
* All uncategorized disposition codes: click **Archive all**.

**Note** once you archive a disposition code, you cannot restore it.

6. To create new codes under a topic, follow the steps in [Add a topic, subtopic, and disposition code](#add-a-topic-subtopic-and-disposition-code)

To view the codes you just archived, go to **Topics** > **Uncategorized disposition codes** > **Archived**.
