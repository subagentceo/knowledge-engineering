# Manage Flex logout settings

## Overview

To manage Flex logout settings, go to Twilio Console and navigate to the **Flex** > **Users and access** > **Automatic logout**. Here, you can specify whether and how Flex UI changes your users' status when they can't be reached.
It's important to configure these settings to ensure status accuracy for:

* Task routing: To ensure that you only route new tasks to agents who are available, your users' status must be as accurate as possible.
* Billing: If you're charged based on the number of active hours that your users spend using Flex, you may be able to reduce your billed hours by configuring Flex to automatically move disconnected users to offline status.

## When is a user considered disconnected from Flex?

Flex UI considers users to be disconnected when:

* Their computer is shut down or in sleep or hibernate mode
* Their computer loses its connection to the network. For example, if the user turns off wifi or experiences a network outage.
* The user closes the browser or tab where Flex UI was running

Flex UI remains active when a user locks their computer or leaves it inactive. However, if the computer is set to switch to sleep or hibernate mode after a period of being locked or inactive, the user becomes disconnected when sleep or hibernate mode takes effect.

We recommend reviewing the sleep and hibernate setting configurations on your users' computers to ensure that they work in harmony with your Flex logout settings.

## Settings

### Logout activity

Displays the name of the status activity that means that users aren't available in TaskRouter and Flex UI. The default is **Offline**.

You can view and configure status activities on the [**Activities** page](/docs/taskrouter/quickstart/ruby/setup-understanding-activities) under TaskRouter in Twilio Console. You can change the name of the status activity that you use to mark your users as offline, but you can't remove it.

### Enforce logout

When this setting is turned on, Flex automatically updates the status of users who have been disconnected from Flex to the offline status shown in **Logout activity**. We recommend leaving this setting turned on, especially if you're billed by active user hour.

When this setting is turned off, Flex UI users must log out or change their status manually. Otherwise, their status remains active even if they're disconnected from Flex.

### Offline threshold

This setting determines how many seconds Flex should wait when a user becomes disconnected before automatically updating their status to the offline status shown in **Logout activity**.

For example, if you set **Offline threshold** to 300 seconds (5 minutes), if an agent loses their internet connection, their status will be updated to the offline status shown in **Logout activity** after 5 minutes of remaining disconnected, which marks that agent as unavailable.

This threshold ensures that users aren't automatically set to logout status for short interruptions in their connection, such as a brief network issue or when the user switches wi-fi networks. The default setting is 30 seconds.
