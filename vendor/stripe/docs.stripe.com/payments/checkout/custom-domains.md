# Use your custom domain

Learn how to bring your own custom domain to Stripe Checkout, Payment Links, and customer portal.

# Stripe-hosted page

> This is a Stripe-hosted page for when payment-ui is stripe-hosted. View the full page at https://docs.stripe.com/payments/checkout/custom-domains?payment-ui=stripe-hosted.

If you’re using the [Stripe-hosted page](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=checkout&ui=stripe-hosted) for Checkout, you can add your own custom domain to Stripe. Adding custom domains is a paid feature. For information about cost, see Checkout’s [Pricing](https://stripe.com/pricing).

## Add your custom domain to the Stripe Dashboard

Decide what subdomain to use with your Checkout Sessions, Payment Links, and customer portal.

> If your domain is `example.com`, we recommend using `payments.example.com` as your custom subdomain. You can replace `payments` with anything you like, as long it’s a valid subdomain. You can’t use a path like `example.com/checkout` and must specify a subdomain of your existing domain.

After you decide on a subdomain, visit the [Custom domains settings page](https://dashboard.stripe.com/settings/custom-domains) to start the domain connection process.

On the settings page click **Add your domain**.

In the pop up, enter your desired subdomain. Click **Add** when you’re done. You’ll see the popup update with instructions for setting up your DNS records.

Your custom domain is activated automatically when your DNS records are verified. To disable this behavior, uncheck the **Switch to this domain once added** checkbox.

> #### When will my domain be added?
> 
> When your domain is in the `Adding...` state, we wait to verify your DNS records that you set up in the next step. After Stripe verifies the DNS records, we create TLS certificates for your subdomain, set up the correct CDN routing, and then your domain is `ready` to enable and use.

## Identify your DNS Provider

To start, figure out what service is managing your DNS records, so you know exactly where to login and create the new records.

If you **already know** your DNS provider, you can move on to the next section.

Often, it’s the same place you registered your domain, but sometimes the DNS provider is different from your domain registrar.

If you’re not certain who your DNS provider is, try looking up your domain’s nameservers, replacing **stripe.com** with your own domain in this command:

```bash
nslookup -querytype=NS stripe.com
```

You’ll see a list of nameservers for your domain in the output. Here’s some example output for **stripe.com**:

```
# Looks like AWS is providing our DNS here:
stripe.com	nameserver = ns-423.awsdns-52.com.
stripe.com	nameserver = ns-705.awsdns-24.net.
stripe.com	nameserver = ns-1087.awsdns-07.org.
stripe.com	nameserver = ns-1882.awsdns-43.co.uk.
```

If you’re more comfortable using a browser-based tool, go to [MXLookup’s DNS Lookup tool](https://mxtoolbox.com/DnsLookup.aspx) and enter your domain. It might be able to tell you who your DNS provider is (but not always).

## Create required DNS records

In this section, you’ll create the DNS records you need to connect your domain. As you go through each step, check each checkbox to keep track of where you’re in the process.

Select the tab that matches your DNS provider from the tabs below—this gives you specific, guided instructions for creating the required DNS records. If your DNS provider isn’t an option, follow the Standard instructions:

#### Standard instructions

These are standard instructions for creating your DNS records. If you have issues with any of the steps, contact your DNS provider for more assistance.

> To track your progress, go through each step  and check it off when you’ve completed it.

- [ ] Sign into your DNS provider
      Most DNS providers have a control panel you can sign into to manage your DNS. Find your provider’s control panel page and sign in.

- [ ] Find the page to manage the DNS for your domain
      Now that you’re logged in, find where you can manage the DNS records for your domain in your provider’s control panel.

      If you’re having issues finding the right page, you can:

      - See if your DNS provider has a help article for adding new DNS records that can point you in the right direction.
      - Contact your DNS provider for additional support.

- [ ] Create your CNAME record
      From your DNS control panel, add a new record that maps your desired subdomain to Checkout. Most DNS providers ask you for the record type, name, value, and TTL or expiration when creating a new record.

      > This record is what connects your subdomain to Stripe Checkout.

      Enter these values and save the new DNS record:

| Field          | Instructions                                                         | Description                                                                                                                                                                                                                                 |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Type**       | Select `CNAME` from the dropdown                                     | What kind of DNS record this is.                                                                                                                                                                                                            |
| **Name**       | If your custom subdomain is **checkout.powdur.me**, enter `checkout` | For CNAME records, this field is the first part of your subdomain (the part leading up to the first period).                                                                                                                                |
| **Value**      | Enter `hosted-checkout.stripecdn.com`                                | This is what the new subdomain record points to–in this case, Stripe.

        Some providers may expect a trailing period (`.`) after the CNAME value. Make sure to verify that your CNAME value matches the format your provider expects. |
| **TTL/Expiry** | Enter `300`                                                          | An expiration of 5 minutes (300 seconds) is OK. Your DNS provider might not allow you to change the TTL value. If this field is missing or you can’t change it, it’s safe to ignore this part of the configuration.                         |

- [ ] Create your TXT record
      From your DNS control panel, add a new TXT record.

      > This TXT record lets us verify that you’re the owner of this domain. This is required to issue TLS certificates for your domain, so you can continue to accept payments securely.

      Enter these values and save the new DNS record:

| Field          | Instructions                                                                                                                                               | Description                                                                                                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Type**       | Select `TXT` from the dropdown                                                                                                                             | What kind of DNS record this is.                                                                                                                                                                                    |
| **Name**       | If your custom domain is **checkout.powdur.me**, enter `_acme-challenge.checkout`                                                                          | For TXT records, this field is the subdomain portion of your domain.                                                                                                                                                |
| **Value**      | Visit the [Dashboard settings](https://dashboard.stripe.com/settings/custom-domains) and click **View instructions** to copy the correct TXT value record. | This is a long, unique string used for domain verification.                                                                                                                                                         |
| **TTL/Expiry** | Enter `300`                                                                                                                                                | An expiration of 5 minutes (300 seconds) is OK. Your DNS provider might not allow you to change the TTL value. If this field is missing or you can’t change it, it’s safe to ignore this part of the configuration. |

- [ ] Verify your CNAME record is setup
      After you save your DNS record, verify that it has the correct values.

      #### Verify in your terminal

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Replace **checkout.powdur.me** with your custom domain in the following command and run it from your terminal:

      ```bash
      
      nslookup -querytype=CNAME checkout.powdur.me
      ```

      You should see output like:

      ```
      <your subdomain> 	canonical name = hosted-checkout.stripecdn.com.
      ```

      When you see that output, move onto the next step.

      #### Verify with your web browser

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Open the [NSLookup Online Tool](https://coding.tools/nslookup).
      1. Enter your custom domain name in the **Domain or IP Address** field.
      1. Select **CNAME (Canonical name record)** from the **Query Type** dropdown.
      1. Click **Nslookup** to query for your CNAME record.

      You should see `canonical name = hosted-checkout.stripecdn.com` in the output. When you see that output, move onto the next step. If you don’t see that output at first, wait a few minutes and try the query again.

- [ ] Verify your TXT record
      After you save your DNS record, verify that it has the correct values.

      #### Verify in your terminal

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Replace **checkout.powdur.me** with your custom domain in the following command and run it from your terminal:

      ```bash
      
      nslookup -querytype=TXT _acme-challenge.checkout.powdur.me
      ```

      You should see output like this:

      ```
      _acme-challenge.<your domain>   text = "<your unique TXT record value>"
      ```

      If you don’t see your unique TXT record value in the output, wait a bit longer and try running the command again.

      #### Verify with your web browser

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Open the [NSLookup Online Tool](https://coding.tools/nslookup).
      1. Enter `_acme-challenge.[your custom domain name]` in the **Domain or IP Address** field.
      1. Select **TXT (Text record)** from the **Query Type** dropdown.
      1. Click **Nslookup** to query for your CNAME record.

      You’ll see the TXT record value you entered in the previous step in the output. If you don’t see that output at first, wait a few minutes and try the query again.

      When you finish this step, your DNS records are configured.

#### GoDaddy

Use these instructions to create your DNS records with GoDaddy. If you have issues with any of the steps, please [contact GoDaddy Support](https://www.godaddy.com/help/contact-us) for more assistance.

> To track your progress, go through each step and check it off when you completed it.

- [ ] Sign into GoDaddy
      Visit [GoDaddy](https://sso.godaddy.com/) and log into the GoDaddy dashboard.

- [ ] Navigate to the DNS panel for your domain
      From the GoDaddy Dashboard:

      1. Click your domain on the GoDaddy home page:
![The GoDaddy homepage](https://b.stripecdn.com/docs-statics-srv/assets/home.20b5c1d760ee29489f34bd2da87f72d9.png)
         
      1. You should now be on the admin page for your domain:
![The GoDaddy Admin view](https://b.stripecdn.com/docs-statics-srv/assets/admin.e30f10909b86e9d6ea9452f5fba6d324.png)
         
      1. Click **View Domain Settings**.

      1. Click **Manage DNS**.

      1. You should see a DNS management page for your domain:
![The GoDaddy DNS Management view](https://b.stripecdn.com/docs-statics-srv/assets/dns-management.0ba48fee0b095cfb135eec91f30476d2.png)

- [ ] Create your CNAME record
      Add a new record that maps your desired subdomain to Stripe Checkout.

      1. Click **Add** in the DNS Records section.

      1. Enter these values in the form that opens:

| Field     | Value to enter                                                       | Description                                                                                                  |
| --------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Type**  | Select `CNAME` from the dropdown                                     | What kind of DNS record this is.                                                                             |
| **Name**  | If your custom subdomain is **checkout.powdur.me**, enter `checkout` | For CNAME records, this field is the first part of your subdomain (the part leading up to the first period). |
| **Value** | `hosted-checkout.stripecdn.com`                                      | This is what the new subdomain record points to–in this case, Stripe Checkout.                               |
| **TTL**   | Select `Custom` from the dropdown and enter `600` seconds            | An expiration of 10 minutes (600 seconds) is OK.                                                             |
![What the form looks like filled out, for an example domain](https://b.stripecdn.com/docs-statics-srv/assets/filled-form-cname.c1208c4e8b931447ecdec0fff817d14b.png)
         
         An example of what the form for adding your CNAME record might look like when filled out.

      1. Click **Add record**.

      1. You’ll see a new table row for the new DNS record, with the following values:

         - **Type**: `CNAME`
         - **Name**: `<your subdomain>`
         - **Data**: `hosted-checkout.stripecdn.com`
         - **TTL**: 600 seconds

- [ ] Create your TXT record
      From your DNS Management page, add a new TXT record.

      > This TXT record lets us verify that you’re the owner of this domain. This is required to issue TLS certificates for your domain, so you can continue to accept payments securely.

      1. Click **Add**.

      1. Enter these values in the form that opens:

| Field     | Value to enter                                                                                                                                             | Description                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Type**  | Select `TXT` from the dropdown                                                                                                                             | What kind of DNS record this is.                                     |
| **Name**  | If your custom domain is **checkout.powdur.me**, enter `_acme-challenge.checkout`                                                                          | For TXT records, this field is the subdomain portion of your domain. |
| **Value** | Visit the [Dashboard settings](https://dashboard.stripe.com/settings/custom-domains) and click **View instructions** to copy the correct TXT value record. | This is a long, unique string used for domain verification.          |
| **TTL**   | Select `Custom` from the dropdown and enter `600` seconds                                                                                                  | An expiration of 10 minutes (600 seconds) is OK.                     |
![What the form looks like filled out, for an example domain](https://b.stripecdn.com/docs-statics-srv/assets/filled-form-txt.a717729a495d2aa61a68381155206f37.png)
         
         An example of what the form for adding your TXT record might look like when filled out.

      1. Click **Add record**.

      1. You’ll see a new table row for the new DNS record, with the following values:

         - **Type**: `TXT`
         - **Name**: `_acme-challenge.<your subdomain>`
         - **Data**: `<your unique TXT value…>`
         - **TTL**: 600 seconds

- [ ] Verify your CNAME record is setup
      After you save your DNS record, verify that it has the correct values.

      #### Verify in your terminal

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Replace **checkout.powdur.me** with your custom domain in the following command and run it from your terminal:

      ```bash
      
      nslookup -querytype=CNAME checkout.powdur.me
      ```

      You should see output like:

      ```
      <your subdomain> 	canonical name = hosted-checkout.stripecdn.com.
      ```

      When you see that output, move onto the next step.

      #### Verify with your web browser

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Open the [NSLookup Online Tool](https://coding.tools/nslookup).
      1. Enter your custom domain name in the **Domain or IP Address** field.
      1. Select **CNAME (Canonical name record)** from the **Query Type** dropdown.
      1. Click **Nslookup** to query for your CNAME record.

      You should see `canonical name = hosted-checkout.stripecdn.com` in the output. When you see that output, move onto the next step. If you don’t see that output at first, wait a few minutes and try the query again.

- [ ] Verify your TXT record
      After you save your DNS record, verify that it has the correct values.

      #### Verify in your terminal

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Replace **checkout.powdur.me** with your custom domain in the following command and run it from your terminal:

      ```bash
      
      nslookup -querytype=TXT _acme-challenge.checkout.powdur.me
      ```

      You should see output like this:

      ```
      _acme-challenge.<your domain>   text = "<your unique TXT record value>"
      ```

      If you don’t see your unique TXT record value in the output, wait a bit longer and try running the command again.

      #### Verify with your web browser

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Open the [NSLookup Online Tool](https://coding.tools/nslookup).
      1. Enter `_acme-challenge.[your custom domain name]` in the **Domain or IP Address** field.
      1. Select **TXT (Text record)** from the **Query Type** dropdown.
      1. Click **Nslookup** to query for your CNAME record.

      You’ll see the TXT record value you entered in the previous step in the output. If you don’t see that output at first, wait a few minutes and try the query again.

      When you finish this step, your DNS records are configured.

If you need any additional information, read GoDaddy’s official developer guides, starting with [Manage DNS records](https://www.godaddy.com/help/manage-dns-records-680).

#### Cloudflare

Use these instructions to create your DNS records with Cloudflare. If you have issues with any of the steps, please [contact Cloudflare Support](https://support.cloudflare.com/) for more assistance.

> To track your progress, go through each step and check it off when you completed it.

- [ ] Sign into Cloudflare
      Visit [Cloudflare](https://cloudflare.com) and log into the Cloudflare dashboard.

- [ ] Navigate to the DNS panel for your domain
      From the Cloudflare Dashboard:

      1. Click **Websites** on the left side of the page.

      1. Find your domain in the list of websites.

      1. Click the table row containing your domain name:
![The table of websites you'll see on the Cloudflare dashboard](https://b.stripecdn.com/docs-statics-srv/assets/websites-table.c794d196f321659ff795e7456e8c1438.png)
         
         In this example image, you’d click the powdur.me table row.

      1. You should now be on the admin page for your domain.

      1. Click **DNS** on the left side of the page.

      1. You should see a DNS management page for your domain:
![The DNS view](https://b.stripecdn.com/docs-statics-srv/assets/dns-panel.deb9b0988ff2b2864d39ccd498d7c351.png)

- [ ] Create your CNAME record
      Add a new record that maps your desired subdomain to Stripe Checkout.

      1. Click **Add record**.

      1. Enter these values in the form that opens:

| Field            | Value to enter                                                       | Description                                                                                                  |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Type**         | Select `CNAME` from the dropdown                                     | What kind of DNS record this is.                                                                             |
| **Target**       | If your custom subdomain is **checkout.powdur.me**, enter `checkout` | For CNAME records, this field is the first part of your subdomain (the part leading up to the first period). |
| **Value**        | `hosted-checkout.stripecdn.com`                                      | This is what the new subdomain record points to–in this case, Stripe Checkout.                               |
| **TTL**          | `5 min`                                                              | An expiration of 5 minutes (300 seconds) is OK.                                                              |
| **Proxy status** | `Off`                                                                | Set the proxy status to `off` to avoid issues during setup.                                                  |
![What the form looks like filled out, for an example domain](https://b.stripecdn.com/docs-statics-srv/assets/filled-form-cname.fd46677b9723447c3f718939e97b8007.png)
         
         An example of what the form for adding your CNAME record might look like when filled out.

      1. Click **Save**.

      1. You’ll see a new table row for the new DNS record, with the following values:

         - **Type**: `CNAME`
         - **Name**: `<your subdomain>`
         - **Content**: `hosted-checkout.stripecdn.com`
         - **Proxy status**: DNS only
         - **TTL**: 5 minutes

- [ ] Create your TXT record
      From your DNS control panel, add a new TXT record.

      > This TXT record lets us verify that you’re the owner of this domain. This is required to issue TLS certificates for your domain, so you can continue to accept payments securely.

      1. Click **Add record**.

      1. Enter these values in the form that opens:

| Field       | Value to enter                                                                                                                                             | Description                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Type**    | Select `TXT` from the dropdown                                                                                                                             | What kind of DNS record this is.                                     |
| **Name**    | If your custom domain is **checkout.powdur.me**, enter `_acme-challenge.checkout`                                                                          | For TXT records, this field is the subdomain portion of your domain. |
| **Content** | Visit the [Dashboard settings](https://dashboard.stripe.com/settings/custom-domains) and click **View instructions** to copy the correct TXT value record. | This is a long, unique string used for domain verification.          |
| **TTL**     | `5 min`                                                                                                                                                    | An expiration of 5 minutes (300 seconds) is OK.                      |
![What the form looks like filled out, for an example domain](https://b.stripecdn.com/docs-statics-srv/assets/filled-form-txt.5d164d597718eff86d45e6ce1e8d2d6a.png)
         
         An example of what the form for adding your TXT record might look like when filled out.

      1. Click **Save**.

      1. You’ll see a new table row for the new DNS record, with the following values:

         - **Type**: `TXT`
         - **Name**: `_acme-challenge.<your subdomain>`
         - **Content**: `<your unique TXT value…>`
         - **Proxy status**: DNS only
         - **TTL**: 5 minutes

- [ ] Verify your CNAME record is setup
      After you save your DNS record, verify that it has the correct values.

      #### Verify in your terminal

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Replace **checkout.powdur.me** with your custom domain in the following command and run it from your terminal:

      ```bash
      
      nslookup -querytype=CNAME checkout.powdur.me
      ```

      You should see output like:

      ```
      <your subdomain> 	canonical name = hosted-checkout.stripecdn.com.
      ```

      When you see that output, move onto the next step.

      #### Verify with your web browser

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Open the [NSLookup Online Tool](https://coding.tools/nslookup).
      1. Enter your custom domain name in the **Domain or IP Address** field.
      1. Select **CNAME (Canonical name record)** from the **Query Type** dropdown.
      1. Click **Nslookup** to query for your CNAME record.

      You should see `canonical name = hosted-checkout.stripecdn.com` in the output. When you see that output, move onto the next step. If you don’t see that output at first, wait a few minutes and try the query again.

- [ ] Verify your TXT record
      After you save your DNS record, verify that it has the correct values.

      #### Verify in your terminal

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Replace **checkout.powdur.me** with your custom domain in the following command and run it from your terminal:

      ```bash
      
      nslookup -querytype=TXT _acme-challenge.checkout.powdur.me
      ```

      You should see output like this:

      ```
      _acme-challenge.<your domain>   text = "<your unique TXT record value>"
      ```

      If you don’t see your unique TXT record value in the output, wait a bit longer and try running the command again.

      #### Verify with your web browser

      1. Wait up to 10 minutes for your DNS provider to update its nameservers.
      1. Open the [NSLookup Online Tool](https://coding.tools/nslookup).
      1. Enter `_acme-challenge.[your custom domain name]` in the **Domain or IP Address** field.
      1. Select **TXT (Text record)** from the **Query Type** dropdown.
      1. Click **Nslookup** to query for your CNAME record.

      You’ll see the TXT record value you entered in the previous step in the output. If you don’t see that output at first, wait a few minutes and try the query again.

      When you finish this step, your DNS records are configured.

If you need any additional information, please read Cloudflare’s official developer guides, starting with [Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).


> If verifying your DNS records or domain seems very slow, try setting CNAME flattening to > 
> **Flatten CNAME at root**> 
> .> 
> > 
> You can find that setting in your Cloudflare Dashboard under > 
> **DNS**> 
> > > 
> **Settings**> 
> > > 
> **CNAME Flattening**> 
> .> 
> > 
> If setting CNAME Flattening doesn’t fix the issue, > 
> [contact Stripe Support](https://support.stripe.com/)> 
> .

Now that you’ve created your DNS records and verified them, Stripe verifies the connection and provisions your domain on our end. We’ll send you an email and a Dashboard notification when the domain is ready for you to enable it. You can also visit the [Dashboard settings](https://dashboard.stripe.com/settings/custom-domains) at any time to see the current status of your custom domain connection.

## Optional: Test your custom domain

### Create a test payment link

You receive a notification when your custom domain is added and enabled for testing.

1. Go to the [Dashboard settings](https://dashboard.stripe.com/settings/custom-domains).
1. Verify you have an `Added` indicator above your custom domain name.
1. [Create a payment link](https://docs.stripe.com/payment-links/create.md) in a [sandbox](https://docs.stripe.com/sandboxes.md).

You see your new custom domain in the details page of your newly created payment link.

> Adding custom domains is currently not supported in sandboxes.

## Optional: Removing your custom domain

If you need to remove your custom domain for any reason, you can. If you remove your custom domain, you’ll need to remove any DNS records you created for your custom subdomain and follow this guide again to add it back.

To remove your custom domain completely:

1. Go to the [Dashboard settings](https://dashboard.stripe.com/settings/custom-domains) for custom domains.
1. Click the **Remove** button.
1. Read the popup confirmation, and click **Remove** to confirm the removal.
1. Login to your DNS provider and delete the two DNS records you previously created for your custom subdomain.

> After you cancel your subscription, payment links and the customer portal link that use your custom domain stop working. You can copy and share new `buy.stripe.com` or `billing.stripe.com` links for each of your existing links.

## Optional: Using custom domains with Connect

| Connect integration type       | Description                                                                                                                                                         | Which account’s custom domain is used? |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Destination charge             | Your integration uses `payment_intent_data[transfer_data][destination]`. See [docs](https://docs.stripe.com/connect/destination-charges.md) to read more.           | The **platform account’s** domain.     |
| Direct charge                  | Your integration passes in the connected account ID in the `Stripe-Account` header. See [docs](https://docs.stripe.com/connect/direct-charges.md) to read more.     | The **connected account’s** domain.    |
| Separate charges and transfers | Charges and transfers are handled separately from the Checkout Session. See [docs](https://docs.stripe.com/connect/separate-charges-and-transfers.md) to read more. | The **platform account’s** domain.     |

> #### Destination charges with on_behalf_of
> 
> Checkout Sessions and Payment Links that use [`on_behalf_of`](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant) always use the default Stripe domain (`checkout.stripe.com` or `buy.stripe.com`) instead of a custom domain. This ensures consistent support for wallet payment methods such as Apple Pay.

## Optional: Troubleshooting your integration

If you’ve gone through this guide and activated your custom domain in live mode but still aren’t seeing it used for your Checkout Sessions, you might be using an unsupported Checkout integration type.

Stripe has three types of Checkout integrations, and we only support server-side redirects today. Use this table to figure out what kind of integration you’re using:

| Integration type                                                                  | You’re using this type if…                                                                                                                                                                                                                                                                                                  | Notes                                                                    | Works with custom domains? |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------- |
| Client-only integration                                                           | If you’re not creating Checkout Sessions from your server and are only using client-side [stripe.redirectToCheckout](https://docs.stripe.com/js/deprecated/redirect_to_checkout) and providing items such as SKUs or Plans.                                                                                                 | This integration path is deprecated.                                     | **✗ No**                   |
| Server-side Checkout Session creation and client-side `stripe.redirectToCheckout` | If you’re creating Checkout Sessions from your server and redirecting your customers client-side by using [stripe.redirectToCheckout](https://docs.stripe.com/js/deprecated/redirect_to_checkout) and providing the Checkout Session ID.                                                                                    | This was the standard documented integration path before September 2021. | **✗ No**                   |
| Server-side Checkout Session creation and redirect                                | If you’re creating Checkout Sessions and redirecting your customers to the returned [URL](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-url) all server-side. See the [Accept a payment](https://docs.stripe.com/payments/accept-a-payment.md?integration=checkout) guide for an example. | This is the standard documented integration path since September 2021.   | **✓ Yes**                  |

If you’re using an unsupported integration type, use our [Accept a payment guide](https://docs.stripe.com/payments/accept-a-payment.md?integration=checkout) to switch to using server-side redirects so you can start using custom domains.

## Optional: Troubleshooting CAA DNS records

The following CAA DNS records issues can occur when you attempt to add a custom domain to Checkout:

- Your CAA record doesn’t include `letsencrypt.org` as a valid CA issuer.
- You have a CAA record at the same level as your custom domain name.

### Your CAA record doesn’t include letsencrypt.org as a valid CA issuer

Stripe uses [Let’s Encrypt](https://letsencrypt.org) to generate TLS certificates for your custom domain. This ensures that all requests to your custom domain are secure and encrypted.

As a result, if you have an existing `CAA` DNS record, you need to include `letsencrypt.org` as a valid issuer.

To add Let’s Encrypt as an issuer:

1. Go to your DNS panel and find the existing `CAA` record for your domain, and make a note of its current values.
1. Add a new record at the same level as your other `CAA` records, and enter these values:
   - **Name**: This should be the same as your other CAA records. There is usually a name of `@` for CAA records on the root of the domain (for example, `powdur.me`).
   - **Flags**: `0`
   - **Tag**: `issue`
   - **Value**: `letsencrypt.org`
   - **TTL**: 3600 seconds (1 hour) is a good default.
1. Save the record.

Most DNS updates take effect within an hour, but could take up to 72 hours to update globally.

To read more about setting up Let’s Encrypt CAA records, see their [CAA guide](https://letsencrypt.org/docs/caa/).

### Your CAA record is at the same level as your custom domain name

If you received an error in the Dashboard about your CAA record being at the same level as your custom domain name, there’s already an existing `CAA` DNS record for the custom domain name that you’re trying to connect to Checkout. For example, if you’re trying to connect **checkout.powdur.me** to Checkout but there’s already a `CAA` DNS record at that domain, Stripe returns an error.

You have a few options for fixing this issue:

1. You can move the `CAA` record down a level:
   - If you want a custom domain name of **checkout.powdur.me**, you can create a duplicate `CAA` record with the same values at **powdur.me** instead.
   - Once the new `CAA` record has propagated, you can safely remove the conflicting `CAA` record from your DNS provider.
   - Once the removal has propagated, you can try to add your custom domain to the Dashboard again.
1. You can choose a custom domain name above your `CAA` record.
   - If your `CAA` record lives at **checkout.powdur.me**, you could choose a custom domain name like **pay.checkout.powdur.me**.

## Optional: Troubleshooting a blocked domain

Cloudflare, our domain provider, occasionally blocks some domains from being automatically added to Cloudflare as part of an additional security check. If you’re seeing an error message in the [Dashboard settings](https://dashboard.stripe.com/settings/custom-domains) about Cloudflare blocking your domain, you can email [abusereply@cloudflare.com](mailto:abusereply@cloudflare.com) to resolve the issue.

When emailing Cloudflare, copy and paste this email template and change any of the bold **[placeholders]** to your own information:

**To:** abusereply@cloudflare.com

**Subject:** Unblock request for **[insert your domain name]**

Cloudflare,

We’re in the process of adding a custom domain name to Stripe Checkout that leverages Cloudflare. It’s currently blocked by you. Can you please unblock this hostname for us?

Domain/Hostname we’re attempting to add: **[insert your domain name]**

Association with the domain: **[provide an explanation of your association with/ownership of the domain]**

Please let us know if you have additional questions.

Thanks,**[Your name]**


# Full embedded page

> This is a Full embedded page for when payment-ui is embedded-page. View the full page at https://docs.stripe.com/payments/checkout/custom-domains?payment-ui=embedded-page.

This feature doesn’t apply to using the embedded form since it’s embedded in your website.

