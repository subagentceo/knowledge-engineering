# Core concepts introduction

## Overview

The goal of the Core Concepts section is to help Flex administrators understand the concepts and products Flex builds on so that you can effectively set up and manage your contact center.

## Twilio accounts and Twilio Console

All Twilio resources, like phone numbers, chat services, and runtime domains, belong to a Twilio account. Essentially, Flex is a combination of such resources, wired together as a functional contact center.

After you create an account with Twilio, you are logged in to [Twilio Console](https://console.twilio.com/). Twilio Console is a browser-based account portal where you can manage different aspects of your account, including all the resources that belong to it.

A Twilio Console user can own or administer multiple Twilio accounts, which serve as containers for your applications. As an account owner or administrator, you can add more users (including other administrators) to your account.

![Diagram showing Twilio Console owners and admins managing two accounts.](https://docs-resources.prod.twilio.com/c05ccbad5636012e487a92a7c124a48131e8bf6daa531633ae4a0be3bce0b243.png)

* Every Twilio account can have one owner and multiple administrators.
* Every Twilio user can be the owner of multiple accounts, as well as the administrator of multiple accounts.

### Flex overview in Twilio Console

In the [Flex section of Console](https://www.twilio.com/console/flex/overview), you can retrieve your account credentials, manage users associated with your Flex instance, launch Flex, upgrade to a paid pricing plan, and configure other settings. Other areas of Twilio Console allow you to manage settings for the products that support Flex, including Studio, Functions, Assets, TaskRouter, Phone Numbers, and TwiML.

#### Flex instance

Your Flex instance is the parent container of all your Flex resources on your Twilio account. You can have one Flex instance per Twilio account.

Every Twilio account with Flex has two SIDs:

* **Account SID**: The SID for your Twilio account, which is the top-level container for all of your Twilio resources.
* **Flex Instance SID**: The SID for your Flex instance, which is the container that holds your Flex resources. You can view your Flex Instance SID in Console on the [Flex overview](https://console.twilio.com/us1/develop/flex/overview) page.

> \[!NOTE]
>
> Some of the Console pages and documentation currently use "Flex project" terminology to refer to a Twilio account that has Flex installed.

## Users and roles in Flex

It is important to distinguish between the users in Flex ("workers") and the users in Twilio Console, as they are separate entities. In Flex, users are represented as **TaskRouter workers**. A worker is created whenever a user logs in to Flex, either using SSO or the administrator login in Twilio Console.

Twilio Console has these built-in roles:

* `owner`
* `administrator`
* `developer`
* `billing_manager`
* `support`

To learn more about the differences between Console user roles, refer to [this Help Center article](https://help.twilio.com/hc/en-us/articles/223136227-What-s-the-Difference-Between-User-Roles-Owner-Administrator-Developer-Billing-Manager-and-Support-).

### Access to Flex UI

From Twilio Console, users with the `owner`, `administrator`, or `developer` roles can log in to Flex UI as an administrator. The `support` role can also log in to Flex as a [read-only admin](/docs/flex/admin-guide/setup/flex-ui-users/read-only-admin-role).

The following diagram illustrates which Twilio Console users have access to admin roles in Flex UI:

![Diagram showing Twilio Console users mapped to Flex UI users: Owner, Admin, Developer, Billing Manager, Support to Admin, Read-only Admin, Supervisor, Agent.](https://docs-resources.prod.twilio.com/ba23b73abb1dc2bc5fec673c6cf4a72091b8aff2407d0f8195d1d7edce8eb8d6.png)

If you sign up for a paid Flex account, you get access to Flex Insights, which lets you apply additional roles to users with `admin` and `supervisor` roles. To learn more about Insights access for different roles, see [Flex Insights User Roles](/docs/flex/admin-guide/setup/sso-configuration/insights-user-roles).

## Additional resources

* [Manage Twilio Console users](/docs/flex/admin-guide/setup/console-users)
* [Manage Flex UI users](/docs/flex/admin-guide/setup/flex-ui-users)
