# IP Pools

IP Pools allow you to group your dedicated Twilio SendGrid IP addresses together in order to have more control over your deliverability, and as a result, your sender reputation. For example, you might have separate pools for both transactional and marketing email.

> \[!NOTE]
>
> Dedicated IP addresses are available with Pro and Premier Email API accounts as well as Advanced Marketing Campaigns accounts. Click [here](https://sendgrid.com/pricing/)for more information.

## Create an IP Pool

**Before you get started**

In order to create an IP pool, your dedicated IPs must have [reverse DNS](/docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns/) set up. You also need to check to see if the IP is active before setting up an IP Pool.

*To activate an IP in your account*:

1. Log into your SendGrid account.
2. Navigate to **Settings** and then select **IP Addresses**.
3. Find the ip address you want to activate and then click **Edit**.
4. Check "Allow my account to send mail using this IP address"
5. Then click **Save**.

*To create an IP Pool:*

1. Navigate to **Settings** and then click **IP Addresses**.
2. Select **IP Pools**.
3. Click **Create an IP Pool**.
4. Enter an *IP Pool Name* and select the IP addresses you want to add to the pool.
5. Click **Create**.

> \[!NOTE]
>
> For information on creating and managing IP pools using the API, see our [documentation](/docs/sendgrid/api-reference/ip-pools/create-an-ip-pool).

## Edit an IP Pool

*To edit an IP Pool:*

1. Navigate to **Settings** and then click **IP Addresses**.
2. Select **IP Pools**.
3. Find the IP Pool you wish to delete and select the action menu.
4. Click **Edit**.
5. From here, you can edit the name of the IP pool as well as select or deselect IP addresses associated with the pool.
6. When you have finished making all changes to the IP pool, click **Save**.

## Delete an IP Pool

*To delete an IP Pool:*

1. Navigate to **Settings** and then click **IP Addresses**.
2. Select **IP Pools**.
3. Find the IP Pool you wish to delete and select the action menu.
4. Click **Delete**.
5. A modal appears asking if you are sure you want to delete the selected IP Pool. Confirm, and then click **Delete**.

> \[!NOTE]
>
> If you would like to create and manage IP Pools using the API, see our [API Reference](/docs/sendgrid/api-reference/ip-pools/create-an-ip-pool).

## Additional Resources

* [Dedicated IP addresses](/docs/sendgrid/ui/account-and-settings/dedicated-ip-addresses/)
* [Warming up a dedicated IP](/docs/sendgrid/ui/sending-email/warming-up-an-ip-address/)
* [IP Access Management](/docs/sendgrid/ui/account-and-settings/ip-access-management/)
