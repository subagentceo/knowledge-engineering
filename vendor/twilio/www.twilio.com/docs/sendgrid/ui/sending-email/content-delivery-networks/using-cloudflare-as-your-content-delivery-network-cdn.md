# Using CloudFlare as your Content Delivery Network (CDN)

The following instructions assume you already have a CloudFlare account made, using either a [Full DNS setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) or a [CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/). You can compare the 2 different setups [here](https://developers.cloudflare.com/dns/zone-setups/). Note that a CNAME setup is only available to Business or Enterprise level CloudFlare plans.

The instructions also assume that you have set up a valid [branded link](/docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding/) on your account. This step is essential for the following instructions to work.

Begin by logging into your CloudFlare account, and navigating to the DNS settings for your domain.

![Cloudflare dashboard with DNS, Crypto, Firewall, Speed, and other settings.](https://docs-resources.prod.twilio.com/62ce34541ad9092fc5e153ca404bbffa98bf7971721c78f0019aeeb81e22a397.png)

Add a new CNAME entry that points your configured branded link domain to sendgrid.net.

![Cloudflare DNS record entry with CNAME links to sendgrid.net.](https://docs-resources.prod.twilio.com/a007086a5d67ac20d74f1a18379415ad6c707289e268f0715007276bf9726bd5.png)

Once the record is created, click on the cloud icon under the Status column to turn it orange and enable HTTP proxy.

![Cloudflare DNS entry showing CNAME links as alias of sendgrid.net.](https://docs-resources.prod.twilio.com/088c4e11659643b1f7105a39ffd0d59cba0089f1b4722561ae78f581585804a5.png)

Next, navigate to the Page Rules settings for your domain. You will need to create a Page Rule for your branded link domain that sets SSL to Full. This is necessary due to how [CloudFlare validates the certificate on the origin](https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#526error). You can find more information on the different SSL options [here](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/).

![Cloudflare page rule for SSL set to full for links.example.com.](https://docs-resources.prod.twilio.com/d51599ff6c7dc49030b5f3cd3eccd83b876be5b64e6a9805eb6f5d7173db47fb.png)

Ensure that the Page Rule is On.

![Cloudflare page rule with SSL set to full for links.example.com.](https://docs-resources.prod.twilio.com/720b54983642eeca69fc314b8e690e8a183adc675bfa9afa7468273beae1df48.png)

If you are using a CNAME setup, you will also need to change DNS to point to the CloudFlare CNAME you created.

Once all of this is done, you will need to contact [SendGrid support](https://support.sendgrid.com) and request that SSL click and open tracking be enabled on your account. They will then verify the configuration and enable the setting on your account.
