# Manage Twilio Console users

## Add a Twilio Console user

We recommend the following method for adding administrators to your Flex account. For agents and supervisors, you should add them [via an SSO integration](/docs/flex/admin-guide/setup/sso-configuration). Be careful about sharing the Console administrator access for your production Flex account, as this user will have privileges to change almost anything for your Flex account.

1. Navigate to **[Settings > Manage Users](https://www.twilio.com/console/project/users)** in the Twilio Console. You will be required to re-authenticate in order to make changes to your account settings.
2. Add a new user by clicking the red plus ('+') button. Authenticate by reentering your password and grant the desired role (for example, tick the Administrator checkbox to add a new Flex administrator).

![Form to invite a user to Twilio with email and role options including Support selected.](https://docs-resources.prod.twilio.com/707a9f28b0e0a425e14b557bec32d1b35bcd4c1e1df37a65dfb84b98f04bb1de.png)

For some email providers, you can add a '+' to your email address to create an email alias. For example, `yourname+adjective@example.com`. You can also complete this tutorial with a teammate.

3. In your inbox, click on the confirmation link in the invite email to verify the new user.
4. In a private window, incognito window, or a second browser, log in to the Twilio Console using the email alias that you've set for your second user. Or, if you're completing this with a teammate, have them log in to the Console.
5. Launch Flex with the second user.

At this point, you should have two users logged into Flex: the original administrator and the new one that you've added.

## Modify a Console user's role

1. Navigate to your Flex account settings in the Twilio Console. You will need to authenticate to make this type of change.
2. Click Manage Users from the left navigation menu.
3. Tick the checkbox for the new role you want to apply to a user account. Your selection is automatically saved.

![User management interface showing role selection with an arrow pointing to the developer role checkbox.](https://docs-resources.prod.twilio.com/13e03308166258083ce8af8e4ba575aed286c8e9b68fddbd3e1eb1935d1e3f71.png)

### Remove a Console user

Within the **Manage Users** page, you have the option to remove a user from your Twilio account.

1. To do so, click on the username link for the user you wish to remove.

![User settings with remove from account button highlighted.](https://docs-resources.prod.twilio.com/caa0c43f664d078c742fc21d3b995efd28515ff15478bc595bd16ac8a79ec6ce.png)

2. Click Remove from this account. A confirmation window is displayed.

![Confirmation dialog for permanently removing a user with a highlighted 'Remove user' button.](https://docs-resources.prod.twilio.com/2b800946263b911073adc4afe82ab8e7ac55d3c7ae10b5b600c7cf9399bcf22e.png)

> \[!NOTE]
>
> This action does not delete the Twilio user account. Users will still be able to log in and access their user account, but will no longer have access to the Twilio project they were removed from.
>
> To request that a user account be deleted, please [contact our Support team](https://www.twilio.com/console/support/tickets/create).

## Where to next?

* [Manage Flex UI Users](/docs/flex/admin-guide/setup/flex-ui-users)
