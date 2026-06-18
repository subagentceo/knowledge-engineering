# Authenticate email messages using DNS

With [domain authentication][], inbox providers can verify that you sent email messages shown as originating from your domain. Once the inbox providers authenticate your email message, they can route it to an inbox instead of a [spam folder][].

#### Are you starting from the Twilio Console home page?

1. Click **Email**.
2. Click **Try out Email**. The **Try out Email** panel appears.
3. If you have not set up any domain authentication, click **Set up domain authentication**. The **Domains** page appears.

## Set up domain authentication

To configure email authentication with using domains, complete the following steps.

1. From the Twilio Console, go to the left navigation rail > **Products & Services** > **Email** > **Domains**. The **Domains** page appears.
2. Click **Create authenticated domain**. The **Set up your domain** page appears.
3. Type your chosen domain into the **Domain** box.
4. To configure optional settings, click **Advanced Settings**. The settings appear.
   1. Click **Use custom return path**.
      * Type a subdomain into **Return path** box.
   2. Click **Use custom DKIM selector**
      * Type the subdomain for your [DomainKeys Identified Mail (DKIM)][DKIM] selector into **DKIM selector** box.
   3. Click **Enable Valimail monitoring**.
   4. Click **Next**. The **Install DNS Records** appears with two options: **Automated setup** and **Manual setup**.
      * Once you select an option, you can't go back and try to select the other option. Twilio Email removes the option from the Console.

### Automated setup

If you choose **Automated setup**, follow these steps.

1. Click **Automated Setup**. Twilio checks for your DNS provider as shown in the **Analyzing your domain** modal.
2. If the Twilio Console finds your provider, the modal changes to display one button and four links.
   * If the display provider does match your known domain provider, click **Authorize with \<Provider>**.
     1. A new window opens displaying the login page for your DNS provider.
     2. Click **Authorize with \<Provider>**.
        * If your DNS Provider can integrate, the page changes to a permissions page on your DNS provider.
          1. Click **Give Entri authorization to connect \<your-domain>.**
             * If this connection succeeds, the Twilio Console displays a modal with **\<your-domain> is now configured!**
             * If this connection fails, the Twilio Console displays **Flow closed**. Click **Try again**.
          2. Click **Done**. The modal closes and the **Domains** page displays again.
        * If Domain Connect doesn't work with your DNS Provider, the Twilio Console changes to the [manual setup][manual].
          * If you click the back arrow, the modal changes to **Select your domain provider**.
   * If the displayed provider doesn't match what you know to be your domain provider, click **Change provider**. This should be a rare occurence.
     1. Choose a different provider from the **Select your domain provider** modal.
        #### View the supported DNS providers
        | DNS Provider      | Website              |
        | ----------------- | -------------------- |
        | 123-Reg           | 123-reg.com          |
        | Alibaba           | alibabacloud.com     |
        | All-Inkl          | all-inkl.com         |
        | Amazon Route 53   | aws.amazon.com       |
        | Arsys             | arsys.net            |
        | Aruba IT          | aruba.it             |
        | Bluehost          | bluehost.com         |
        | Cloudflare        | cloudflare.com       |
        | DigitalOcean      | digitalocean.com     |
        | DNSimple          | dnsimple.com         |
        | Domain.com        | domain.com           |
        | DreamHost         | dreamhost.com        |
        | Dynadot           | dynadot.com          |
        | Enom              | enom.com             |
        | Fasthosts         | fasthosts.co.uk      |
        | Gandi             | gandi.net            |
        | GoDaddy           | godaddy.com          |
        | Greengeeks        | greengeeks.com       |
        | Hetzner           | hetzner.com          |
        | Home Pl           | home.pl              |
        | HostGator         | hostgator.com        |
        | Hostgator BR      | hostgator.com.br     |
        | Hosting.com       | hosting.com          |
        | Hostinger         | hostinger.com        |
        | Hostpoint         | hostpoint.ch         |
        | Hover             | hover.com            |
        | Inmotion Hosting  | inmotionhosting.com  |
        | IONOS             | ionos.com            |
        | iwantmyname       | iwantmyname.com      |
        | Locaweb           | locaweb.com.br       |
        | Mijndomein        | mijndomein.nl        |
        | Name.com          | name.com             |
        | NameBright        | namebright.com       |
        | Namecheap         | namecheap.com        |
        | NameSilo          | namesilo.com         |
        | Netlify           | netlify.com          |
        | Network Solutions | networksolutions.com |
        | One.com           | one.com              |
        | Openprovider      | openprovider.com     |
        | OpenSrs           | opensrs.com          |
        | OVH Global        | ovh.com              |
        | Papaki            | papaki.com           |
        | Porkbun           | porkbun.com          |
        | Register.com      | register.com         |
        | Register.it       | register.it          |
        | Registro          | registro.br          |
        | Simply            | simply.com           |
        | Spaceship         | spaceship.com        |
        | Squarespace       | squarespace.com      |
        | Strato            | strato.de            |
        | TransIP           | transip.co.uk        |
        | United Domains DE | united-domains.de    |
        | Vercel            | vercel.com           |
        | Web.com           | web.com              |
        | Wix               | wix.com              |
        | WordPress         | wordpress.com        |
        | Xneelo            | xneelo.co.za         |
     2. The Twilio Console tries to find your domain on this DNS Provider as before.
   * If you want to configure your domain authentication, click **[Go to our manual setup][manual]**.
   * If you want someone else to configure your domain authentication, click **[Or forward login to someone else][forward]**

### Manual setup

> \[!NOTE]
>
> If you can't access your DNS Provider, can't update the records yourself, or prefer that someone else configure your domain authentication, click **[Or forward login to someone else][forward]**.

To copy and paste the domain records into your DNS provider, use **Manual setup**.

The Twilio Console displays the **Configure your domain manually by adding these records** modal containing a table of DNS records and a dimmed confirmation button. These records cover the hosts and values that you need to add to your domain provider for your chosen domain.

| Record type | Host Name (or Name or Value)  | Required Value (or Data or Points to)                 |
| ----------- | ----------------------------- | ----------------------------------------------------- |
| `CNAME`     | `<custom-return-path>`        | `<subdomain>.sendgrid.net`                            |
| `CNAME`     | `<dkim-selector>._domainkey`  | `<dkim-selector>.domainkey.<subdomain>.sendgrid.net`  |
| `CNAME`     | `<dkim-selector>2._domainkey` | `<dkim-selector>2.domainkey.<subdomain>.sendgrid.net` |
| `TXT`       | `_dmarc.<your-domain>`        | `v=DMARC1; p=none;`                                   |

The dimmed confirmation button displays **I have copied 0/4 records**. As you copy each set of record values, the first number increments.

If you choose **Manual setup**, follow these steps. The terms for **host** and **value** can differ among DNS Providers.

1. Click **Log in into your domain provider to manage these settings.**
2. In your DNS Provider site, create a record with the type of `CNAME`.
3. In the Twilio Console, click **Copy** to the right of the `CNAME` host.
4. Paste that value into the corresponding box in your DNS Provider site.
5. In the Twilio Console, click **Copy** to the right of the `CNAME` value.
   The first number in **I have copied...** button should increment.
6. Paste that value into the corresponding box in your DNS Provider site.
7. Repeat steps 2 to 6 twice.
8. In your DNS Provider site, create a record with the type of `TXT`.
9. In the Twilio Console, click **Copy** to the right of the `TXT` host.
10. Paste that value into the corresponding box in your DNS Provider site.
11. In the Twilio Console, click **Copy** to the right of the `TXT` value.
    The first number in **I have copied...** button should increment to `4` and the button becomes clickable.
12. Paste that value into the corresponding box in your DNS Provider site.
13. Click **I have added 4/4 records above to my domain's provider**.
14. Click **Complete**.

### Forward to a colleague

> \[!NOTE]
>
> You can only start this procedure from links in the modal for [automated][] setup. To view this modal, you must click **Or forward login to someone else** in the automated setup modals.

To delegate your domain authentication setup to a colleague, follow these steps.

1. The **Share this link with a colleague** modal displays.
2. Click **Copy** next to the domain listed for **Send the link below to your colleague to complete the setup.**.
3. Check **I have shared the link**.
4. Click **Continue**. The **Domains** page appears and your chosen domain has a **Status** of **Pending**.

## View authenticated domains details

The **Domain Authentication** section displays a table with your added authenticated domain, its status, and the option to view or delete it.

* If the verification succeeded, the **Status** displays **Verified**.
* If the verification hasn't completed, the **Status** displays **Pending**. To check verification, click **Verify**.
* If the verification failed, the **Status** displays **Failed**.

## Edit authenticated domains

To edit your existing authenticated domain, click the Eye icon next to your chosen domain. The **\<your-domain>** page displays.

This page provides four settings:

* To check that your domain authenticates, click **Verify Status**.
* To turn on Valimail, click **Enable Valimail**.
* To delete your authenticated domain, click **Delete**.
  * The **Are you sure you want to delete this authenticated domain?** modal displays.
  * To confirm the deletion, click **Delete**.
  * To prevent the deletion, click **Cancel**.

[forward]: #forward-to-a-colleague

[manual]: #manual-setup

[automated]: #automated-setup

[spam folder]: /docs/glossary/spam-folder

[domain authentication]: /docs/glossary/domain-authentication

[DKIM]: /docs/glossary/dkim
