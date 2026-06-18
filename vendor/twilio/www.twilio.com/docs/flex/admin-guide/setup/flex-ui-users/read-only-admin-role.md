# Read-only Admin role

## Overview

As a Read-only Admin, you can enter Flex to view and troubleshoot issues. You can:

* Launch Flex from Twilio Console
* View Admin dashboard configurations
* View real-time queue statistics
* View a list of agents on the Teams page

As a Read-only Admin, you cannot make any changes or interact with customers. You cannot:

* Accept incoming calls
* Change your own status
* Make outbound calls
* Edit the status of other agents
* Edit the skills of other agents
* Monitor chat or calls
* Edit configurations on the Admin dashboard

### Who can be a Read-only Admin?

The Read-only Admin role is only available to Twilio Console users in the Support role. When Support users log in to Flex from Twilio Console, they automatically receive Read-only Admin access. You cannot assign a Read-only Admin through the SSO process like you can with other Flex roles.

Support Engineers may find this role helpful.

### Worker representation and pricing

A **worker** is created when a Support user logs in and is attributed the Read-Only Admin role. This is a billable worker in the [named user pricing model](https://www.twilio.com/en-us/flex/pricing). A named user license is charged every month until the user is deprovisioned from Flex.

Because the provisioned worker has a routing expression, this Flex user technically can be assigned routing attributes; however, assigning routing attributes is not advised. The user is unable to change their status, accept incoming interactions, or make outbound voice calls.

## Prerequisites

* Flex UI 2.3.x or above
* Twilio-hosted Flex UI account

## Assign the Support role

When users with the Support role launch Flex from Twilio Console, they automatically get access to the Read-only Admin role.

* To assign the Support role to additional users, follow the steps in [Add a Twilio Console user.](/docs/flex/admin-guide/setup/console-users#add-a-twilio-console-user)
* To grant an existing user Support access, follow the steps in the [Manage Twilio Console users guide.](/docs/flex/admin-guide/setup/console-users#modify-a-console-users-role)

For more information, see [our guide on RBAC](https://help.twilio.com/articles/223136227).

## Launch Flex from Twilio Console as a Support user

1. From [Twilio Console](https://console.twilio.com/), in the upper-left corner, select the account where Flex is hosted.
2. Under **Develop**, click **Flex** > **Overview.**
3. Click **Log in with Console.**

## Plugin development

The Read-only Admin role is represented in the Worker Attributes as follows:

```json
{
    "routing": {
        "skills": [
            "Skill1 ",
            "Skill2"
        ],
        "levels": {
            "Skill1": 3
        }
    },
    "full_name": "Acme AgentName",
    "image_url": "https:\\/\\/www.gravatar.com\\/avatar\\/4e52bcfc565991878adf54a136de1570?d=mp",
    "roles": [
        "flex.readonlyadmin"
    ],
    "contact_uri": "client:firstname_2Elastname",
    "disabled_skills": {
        "skills": [],
        "levels": {}
    },
    "email": "recipient@example.com"
}
```
