# IP Access Management

## What is IP access management?

[IP Access Management](https://app.sendgrid.com/settings/access) security lets you grant or prevent access to your SendGrid account based on a user's [IP address](/docs/sendgrid/glossary/ip-address). After you allow an IP address, Twilio SendGrid limits access to the SendGrid UI, API, and SMTP relay to allowed IP addresses. It then blocks any access attempts from other IP addresses. This security feature helps prevent malicious activity on your account.

> \[!CAUTION]
>
> The list of the allowed IP addresses doesn't include your IP address without your action. You *can* remove from your IP address from the list of allowed IP addresses and block your access to your account. While Twilio can restore your access, this requires thorough proof of your identity and ownership of your account.

If you don't access Twilio SendGrid using a static IP address, activating IP Access Management might lock you out of your account. If you lock yourself out of your account, contact [Twilio SendGrid support](https://support.sendgrid.com/hc/en-us/requests/new#ipam-lockout).

## Enable IP access management

> \[!NOTE]
>
> Twilio SendGrid limits the number of allowed IP addresses to `1000`.

To enable IP Access Management and add allowed addresses, complete the following procedure.

1. Log in to the Twilio SendGrid console.
2. Go to **Settings** > **IP Access Management**.
3. This page displays a message explaining IP Access Management under **Allow Listed IP Addresses** until you enable IP Access Management. Once you add an IP address, Twilio SendGrid turns on IP Access Management.
4. The **Recent Access Attempts** displays a list of IPs that attempted to connect to your account. The console lists all attempts, even those from allowed IP addresses. It displays additional data about those IPs, such as the date of the first and most recent access attempt and the method attempted to access your account.

### Add IP addresses

If you went to another page in the Twilio SendGrid console, return to the **IP Access Management** page.

1. Click **Add IP Addresses**.
2. A dialog displays. To acknowledge that you understand this feature, select the two radio boxes.
3. Click **Confirm and Continue**.\
   The **Add IP Addresses** pane displays and shows **Your Current IP** and a list of the **Recently Accessed IPs**.
   At this point, you can add one or more IP addresses.
   * To add a recent IP address to the allow list, click the **+** next to that IP address.
   * To add all the listed recent IP addresses to the allow list, click **Add all to form below**.\
     Any added IPs display in the table labeled **IP addresses or ranges to add**.
4. To add a single IP address or range of IP addresses not displayed, click **Manually add IPs**.\
   A field labeled **IP addresses or ranges to add** displays.
5. Add your desired IP or range of IPs in [Classless Inter-Domain Routing (CIDR) notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing). Separate individual IPs and ranges with a comma, space, or line break.
6. Once you have added all your desired IP addresses, click **Add # IPs** at the bottom of the menu.
7. The **Add IP Addresses** pane displays again. The IP addresses you added display in the table labeled **IP addresses or ranges to add**.
8. To finalize updating the list, click **Save**.

> \[!CAUTION]
>
> If you don't add your IP address, the console prompts you to add it. Choosing *not* to add your IP terminates your session. Reconnect to your account from one of your allowed IP addresses.

### Add a range of IP addresses

To add a list of IP addresses, use either [CIDR notation][cidr] or a wildcard character.

## CIDR notation

To enter a range of IP addresses using CIDR notation:

1. Go to **Settings** > **IP Access Management** in the Twilio SendGrid Console.
2. Click **+ Add IP Addresses**.\
   The **Add IP Addresses** menu displays.
3. Click **Manually add IPs**.\
   A field labeled **IP addresses or ranges to add:** displays.
4. Enter the IP address in the desired IP address range, then a forward slash (`/`) and the number of bits in your network mask.\
   A network mask locks the bits in the IP address range that can't be changed.
   For example:
   * Writing `192.168.100.14/24` includes all IP addresses between `192.168.100.0` and `192.168.100.255`.
   * Writing `192.168.100.14/32` only includes the IP addresses of `192.168.100.14`.

To learn more about CIDR notation, see this [Wikipedia article on Classless Inter-Domain Routing][cidr]. To figure out the CIDR notation you need, use [this CIDR range calculator][cidr-calc].

[cidr]: https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing

[cidr-calc]: https://account.arin.net/public/cidrCalculator

## Wildcards

To enter a range of IP addresses using a wildcard character:

1. Go to **Settings** > **IP Access Management** in the Twilio SendGrid Console.
2. Click **+ Add IP Addresses**.
3. The **Add IP Addresses** pane displays. Click **Manually add IPs**.
4. A field labeled **IP addresses or ranges to add** displays.
5. Enter the first three octets of the desired IP address and set the fourth to an asterisk.\
   For example: Writing `25.203.44.*` includes all IP addresses between `25.203.44.0` and `25.203.44.255`.

### Add IP addresses from the recent access attempts list

Once you turn on IP Access Management, you can add individual addresses from the **Recent Access Attempts** list to your list of allowed IPs.

1. Go to **Settings** > **IP Access Management** in the Twilio SendGrid Console.
2. Go to an address in the **Recent Access Attempts** list.
3. Click the action menu to the right of the address you want to allow.
4. Click **Add To Allowed List**.

## Remove an allowed IP address

1. Go to **Settings** > **IP Access Management** in the Twilio SendGrid Console.
2. Go to the **Allow Listed IP Addresses** list.
3. Click the action menu to the right of the allowed address you want to remove.
4. Click **Remove From Allow List**.
5. When prompted about the removal, click **Remove IP**.

> \[!CAUTION]
>
> The list of the allowed IP addresses doesn't include your IP address without your action. You *can* remove from your IP address from the list of allowed IP addresses and block your access to your account. While Twilio can restore your access, this requires thorough proof of your identity and ownership of your account.

## Disable IP access management

To reopen account access to any IP address, disable IP Access Management. When disabled, the console no longer maintains a list of allowed addresses.

1. Go to **Settings** > **IP Access Management** in the Twilio SendGrid Console.
2. Click **Disable Allow List**.
3. When prompted about deactivation, click **Disable**.

To learn more about using IP Access Management through the Twilio API, see the [API Reference](/docs/sendgrid/api-reference/ip-access-management/retrieve-a-specific-allowed-ip).
