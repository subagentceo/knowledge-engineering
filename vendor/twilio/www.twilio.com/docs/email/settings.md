# Configure account settings

Twilio Email provides two email settings. The first lets you route event notifications from inbox providers to an email address you choose. The second lets you exclude email addresses and domains from suppressing your email messages.

To change your email settings when logged into the [Twilio Console][], go to **Products & Services** > **Email** > **Settings**. The **Email Settings** page appears with three tabs: **Event**, **IP Addresses**, and **Address Allow List**.

## Event

From the **Event** tab, you can route event notifications to an email address of your choosing.

## Forward Bounce Messages

To receive copies of bounce messages that inbox providers send to your recipients, forward these messages to an email address that you choose.

1. Toggle **Enable forward bounce messages** to **On**.
2. Choose one of the following two options on where to forward email messages:
   * **Email address to forward to**
   * **Use the From address of the outgoing email**
3. Type an email address into the **Specify an email address** box.
4. Click **Save**.

To turn off these messages, toggle **Enable forward bounce messages** to **Off**

## Forward Spam Messages

To receive copies of spam report messages that inbox providers send to your recipients, forward these messages to an email address of your choosing.

1. Toggle **Enable forward spam reports** to **On**
2. Type an email address in the **Email address** box.
3. Click **Save**.

To turn off these messages, toggle **Enable forward spam reports** to **Off**.

## IP Addresses

From the **IP Addresses** tab, you can add and group IP addressed dedicated to sending your email messages. This section includes two sections: **Dedicated IP addresses** and **IP pools**.

## Dedicated IP addresses

Dedicated [IP addresses][ip] serve only your email messages. This improves your [reputation][ers] and [deliverability][].

### View existing dedicated IP addresses

The **Dedicated IP addresses** section show the list of dedicated IP addresses with their grouped IP addresses and regions. Twilio Email includes one Dedicated IP address called `default`.

#### Filter displayed Dedicated IP addresses

To filter a longer list of pools, choose the options for filtering the list, then set the values for those filter options.

1. Click the **Add filters** dropdown menu.
2. Click the boxes for one or more of the following filter options: **IP Addresses**, **Region**, **IP Pool**, or **Date Range**. As you click a box, that filter option's dropdown menu appears next to the **Add filters** menu.
3. In each filter option except **Date Range**, type the name of the address, region, or pool in the box.
4. For the **Date Range** dropdown menu, choose the desired time range:
   * **Last 3 Days**
   * **Last 7 Days**
   * **Last 30 Days**
   * **Custom Range**. If you select **Custom Range**, set the **Start date** and **End date**.
5. Click **Apply**. The list updates displaying only the IP pools that match all of the applied filter values.

#### Remove filter option

To remove a filter option, *not an applied filter value*, click on a filter menu, then click **Remove filter**.

#### Clear an applied filter

To clear an applied filter, click the **X** to the right of the filter menu.

### Add a dedicated IP address

To add a dedicated IP address, you need to purchase one. To purchase an IP address:

1. Click **Purchase**. The **Purchase a dedicated IP address** panel appears.
2. Select a dedicated IP address from the **Add IP address** dropdown menu.
3. Click **Purchase**. The **Dedicated IP Address** page appears.
4. Click **Subscribe**. The **Order complete** page appears.
5. Click **View your dedicated IP address**. The **Email Settings** page displays your purchased IP address.

### Edit a dedicated IP address

1. Find the dedicated IP address you want to delete.
2. Click the edit button next to that IP address. The **\<IP Address>** page displays two tabs: **General** and **Subaccounts enabled**.
3. On the **General** tab, you can configure the following for your dedicated IP address:
   * Choose its region
   * Toggle [warm up][] for this IP address
   * Toggle permission to send email
4. On the **Subaccounts enabled** tab, you can enable subaccounts with this IP address.
   1. Click **Add**. The **Assign subaccounts** modal appears.
   2. Choose a subaccount from the **Subaccounts** dropdown menu.
   3. Click **Assign**. The **Assign subaccounts** modal closes.

### Remove a dedicated IP address

1. Find the dedicated IP address you want to delete.
2. Click the edit button next to that IP address. The **\<IP Address>** page appears.
3. Click **Cancel IP address**. The **Cancel IP address** modal appears.
4. Click **Cancel IP address**. The **Cancel IP address** modal closes and the **Email Settings** page appears.

## IP pools

An IP pool groups dedicated IP addresses. You might use An IP pool

To work with IP pools, click **IP pools**. The **IP pools** section appears.

### View existing IP pools

The **IP pools** section show the list of IP pools with their grouped IP addresses and regions. Twilio Email includes one IP pool called `default`.

#### Filter displayed IP pools

To filter a longer list of pools, choose the options for filtering the list, then set the values for those filter options.

1. Click the **Add filters** dropdown menu.
2. Click the boxes for one or more of the following filter options: **IP Pool**, **IP Addresses**, or **Region**. As you click a box, that filter option's dropdown menu appears next to the **Add filters** menu.
3. In each filter option, type the name of the pool, address, or region in the box.
4. Click **Apply**. The list updates displaying only the IP pools that match all of the applied filter values.

#### Remove filter option

To remove a filter option, *not an applied filter value*, click on a filter menu, then click **Remove filter**.

#### Clear an applied filter

To clear an applied filter, click the **X** to the right of the filter menu.

### Add an IP pool

1. Click **Create**. The **Create an IP pool** panel appears.
2. Type the name for your IP pool in the **IP pool name** box.
3. Select a dedicated IP address from the **Add IP address** dropdown menu.
4. Click **Save**.

### Remove an IP pool

1. Find the IP pool you want to delete.
2. Click the action menu, then click **Delete**. A confirmation modal appears.
3. Confirm the deletion, then click **Delete**.

## Address Allow List

## Address Allow List

This setting ignores all bounce and unsubscribe notifications sent to the domains or email addresses listed. Under normal sending conditions, Twilio Email always sends future emails to these recipients.

1. Toggle **Enable address allow list** to **On**.
2. Type email address or domains that you want to exclude from bounces or unsubscribes in the **Email Addresses or Domains to allow** box.
   * Separate email addresses or domains with either commas or new lines. For domains, exclude the `@` symbol.
   * Avoid adding large scale inbox provider domains like `live.com` or `gmail.com`. As this setting ignores unsubscribes, ignoring these providers can adversely affect your email reputation score and violate local, national, or regional privacy laws.
3. Click **Save Changes**.

```text {title="Example of email addresses and domains list"}
pat@example.com, example.net
```

To turn off these messages, toggle **Enable address allow list** to **Off**.

[Twilio Console]: https://1console.twilio.com

[deliverability]: /docs/glossary/deliverability

[ers]: /docs/glossary/email-reputation-score

[ip]: /docs/glossary/ip-address

[ded-ip]: #dedicated-ip-addresses

[ip-pools]: #ip-pools

[warm up]: /docs/glossary/ip-warmup
