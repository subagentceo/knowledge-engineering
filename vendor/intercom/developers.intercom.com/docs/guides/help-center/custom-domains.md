# Help Center Domains

## How to set up a custom domain with your Help Center

When you turn on your Articles Help Center, your content is available through **intercom.help** by default. Your URL will look like this: `intercom.help/exampleapp`

If you’d like to use a different URL, you can create one by manually setting up a **custom domain**.

When you set up your domain, you have the option of HTTPS (quick setup), HTTPS (manual setup), and HTTP setup. The setup steps detailed below are for **HTTP and HTTPS (manual setup)** only. We recommend HTTPS (quick setup) if it is available in your workspace — follow the directions outlined in the setup guide in your settings as they will be slightly different than the below.

1. [Entering your custom domain in Articles](#1-enter-your-custom-domain-in-intercom-articles)
2. [Creating a custom CNAME record](#2-create-a-custom-cname-record)
3. [Choosing to configure SSL (Optional)](#3-choose-to-configure-ssl-optional)


To recognize logged-in Users on your Help Center and/or use [audience targeting for Articles](https://www.intercom.com/help/en/articles/56988-manage-an-article#h_74787cbb3a), your web app (where you have Intercom installed) and your Help Center must share a top level domain. E.g. If your domain is app.example.com, your custom Help Center domain must be something like help.example.com. This allows Intercom to identify your logged-in users when they visit your Help Center.

## 1. Enter your custom domain in Intercom Articles

Enter the custom domain you want to use in your [Help Center settings](https://app.intercom.io/a/apps/_/articles/site/settings) in Articles. Let’s use ‘**help.exampleapp.com**’ as an example:

![](/assets/88b97d8-image.c9d02da947bb2d8998efd42ee28279ef8e9007c0519c84ed56e9b70e7d67921e.71a4f21c.png)

We also support custom domains with subpaths, like ‘**www.exampleapp.com/support**’ for example. If using subpaths then you need to configure your server path's pattern to match our origin (we'll explain [how to do it in AWS Cloudfront](#how-to-configure-subpath-using-aws-cloudfront), but it should be applicable with other providers too).

## 2. Create a custom CNAME record

If you selected HTTPS (quick setup) in your settings note that the Intercom host domain will be different than the ones listed below. For quick setup they are:

- Intercom US: **us.intercomhelpcenter.com**
- Intercom Europe: **eu.intercomhelpcenter.com**
- Intercom Australia:  **au.intercomhelpcenter.com**


For troubleshooting [check out this page](https://www.intercom.com/help/en/articles/7301427-troubleshooting-custom-domain-set-up-and-https-ssl) or contact us in the Messenger in the bottom right.

- Go to your DNS provider’s website (e.g. [GoDaddy](https://ie.godaddy.com/help/add-a-cname-record-19236), **[Cloudflare](https://www.cloudflare.com/dns/)**. If you’re choosing one for the first time, go with one that supports SSL.
- Create a CNAME (‘canonical name’) record for your custom domain.
- Point it at Intercom’s host domain (This is based on your data hosting region, not where you are located geographically):
  - Intercom US: **custom.intercom.help**
  - Intercom Europe: **custom.eu.intercom.help**
  - Intercom Australia: **custom.au.intercom.help**


CNAME for Subpath
If you're using subpath your root level domain (eg `www.example.com/support`), you don't need to create another custom domain as it is assumed that you already have it setup.

### How to create a custom CNAME record with Cloudflare

These steps will vary, so check with your own DNS provider for support.
As an example, here’s how to set up a CNAME record with Cloudflare:

1. Set up Cloudflare as the resolver for your custom CNAME by **[changing your domain nameserver to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup)**.
2. Go to the ‘DNS’ section in Cloudflare and add a CNAME record for your Help Center custom domain. Give the CNAME a **Name** based on the first part of your custom domain e.g. if your custom domain is **help-center.example.com**, use **help-center**.
3. Point it at the Intercom host domain:
  1. Intercom US: **custom.intercom.help**
  2. Intercom Europe: **custom.eu.intercom.help**
  3. Intercom Australia: **custom.au.intercom.help**


To enable the CNAME record, toggle on Proxy Status so that cloud icon is orange.

![](/assets/98aa8c4-create_cname.33c09a1af1c2dec9031f1513841d426028f4385028d74820d0f4145f78e4c714.71a4f21c.png)

### Save your settings

Now you can go to [Articles > Settings](https://app.intercom.com/a/apps/_/articles/site/settings/) > General > Domains to enter your domain URL and click Save and set live.

![](/assets/save_help_center.c8cc41ab2563dd670a5cca4165ca98a430a000b7b8e212de587d16a1fe219daa.71a4f21c.png)

Next you can optionally setup SSL as a security layer.

## 3. Choose to configure SSL (optional)

After you set up a custom domain, your Help Center will be hosted on your domain, but on HTTP rather than HTTPS. Your Help Center will now appear as ‘not secure’ on web browsers like Chrome Here’s how to secure it.

SSL (or TLS), is the most widely used way to secure the connection between your server and your browser. It ensures the connection between the server and browser is encrypted and safe, and appears as HTTPS.

Here’s what an SSL-configured website (with HTTPS) typically looks like on the Chrome browser:

![](/assets/f9db69f-screen_shot_2017-08-02_at_13.37.39.b09f65ef26714148b92262c243680975e084e5b6e55b2c962a31180f2ffee192.71a4f21c.png)

This is what it looks like if you’ve visited a website not secured by SSL (without HTTPS):

![](/assets/356863f-screen_shot_2017-08-02_at_13.42.32.b64adfd176aa573f83dc00cfcb5a1da2ded96ba215a98980edfa16539bf7376d.71a4f21c.png)

There are two ways to set up SSL with Articles on your custom domain:

- Use a flexible SSL (using a third-party DNS provider like Cloudflare or AWS CloudFront)
- Use your own SSL certificate (using a TLS Termination Proxy)


You can configure SSL for your custom domain to keep sensitive information encrypted. If you want to do this, make sure you’ve set up your CNAME with a DNS provider that supports SSL, like Cloudflare.

DNS changes can sometimes take up to 72 hours to take effect, but are typically much faster.

### How to configure SSL with Cloudflare

#### Add SSL support to your domain

Go to the SSL/TLS section and change SSL to ‘Flexible’ or ‘Full’.

![A screenshot from the section of the Cloudflare user interface which allows you to toggle between encryption modes](/assets/cloudflare-ssl-full.5e8c474980be6ab820e1103df38ac18b12b3af3cfaf7f2ae2f78969856743c93.71a4f21c.png)

Don’t choose ‘Full (Strict)’ as this will result in an invalid SSL certificate.

#### Create a redirect rule to enforce HTTPS

Page Rules Deprecated
Cloudflare has deprecated Page Rules. If you previously set up an "Always Use HTTPS" Page Rule, it will continue to work. For new setups, follow the Redirect Rules instructions below. See [Cloudflare’s migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/) for details.

Go to **Rules > Overview** and click **Create rule > Redirect Rule**. Configure the rule with the following settings, replacing `help.exampleapp.com` with your own custom domain:

- **When incoming requests match**: Choose **Wildcard pattern** and enter `http://help.exampleapp.com/*`
- **Then**: Set the **Target URL** to `https://help.exampleapp.com/${1}`
- **Status code**: `301`
- **Preserve query string**: Enabled


Click **Deploy** to activate the rule.

![](/assets/7ed152f-screen_shot_2026-04-29_at_16.23.08.cedd8d7601627e1feea3297269c6a56514e3ba13122f5b5caecce15de48c75a8.71a4f21c.png)

#### Disable Cloudflare page speed features

Both Rocket Loader and Mirage inject JavaScript into your pages, which will break functionality on your Help Center due to its security settings.

**Rocket Loader:** Go to **Rules > Configuration Rules** and click **Create rule**. Match your custom domain hostname (e.g. `help.exampleapp.com`) and set **Rocket Loader** to **Off**. Click **Deploy**.

**Mirage:** Go to **Speed > Optimization** and ensure Mirage is toggled **off** for your domain.

Alternatively, you can disable both globally under **Speed > Optimization** if you do not need these features for any part of your domain.

Ready to go!
Your custom domain should be fully secured and ready to go. Visitors to your Help Center will see the green lock icon in their browser to let them know the site is secure.

### How to configure SSL with AWS

Quick Setup vs Manual Setup
These steps only apply if you selected **HTTPS (manual setup)**. If you're using **HTTPS (quick setup)**, SSL and cookie forwarding are handled automatically — you only need a CNAME record pointing to `us.intercomhelpcenter.com` (or your region's equivalent). No CloudFront configuration is required.

#### Create a CloudFront Distribution

1. Sign in to the AWS Management Console and open the CloudFront console.
2. Choose **Create Distribution**
3. Update the 'Origin' settings.
  1. The origin domain depends on your data hosting region:
    1. Intercom US: **custom.intercom.help**
    2. Intercom Europe: **custom.intercom-help.eu**
    3. Intercom Australia: **custom.au.intercom.help**
  2. The protocol should be `HTTPS only`.
  3. Our servers support TLSv1.2.


![](/assets/63cb916-cloudfrontoriginsettings.8fbe674efabf075931fe8a1ebb33ad48d6ad5f6ce3999d3e49f218366fc42b1e.71a4f21c.png)

1. Update the **Default cache behavior** settings.
  1. Set **Viewer protocol policy** to **Redirect HTTP to HTTPS**.
  2. Under **Cache key and origin requests**, select **Legacy cache settings**. This reveals three forwarding dropdowns that must each be set to **All**:
    - **Headers** — set to **All**. This forwards the `Host` header so Intercom knows which Help Center to serve for your domain.
    - **Query strings** — set to **All**. This is required for article search and URL filtering to work correctly.
    - **Cookies** — set to **All**. This is required for recognizing logged-in users and serving private or audience-targeted articles.


![](/assets/28c42b8-defaultcachebehaviour.2373f9cd604b610673a7c93c8cd2dc881544daa04956a5188430eeb5d51ec5e0.71a4f21c.png)

Cookie, Header, and Query String Forwarding
If your CloudFront distribution does not forward all Headers, Cookies, and Query Strings, critical features of the Articles product will not work. Specifically:

- **Article search** will return no results if query strings are not forwarded.
- **Private articles** and **audience-targeted content** will not display if cookies are not forwarded.
- Your Help Center may show incorrect content or return errors if headers are not forwarded.


Legacy Cache Settings
You must select **Legacy cache settings** (not "Cache policy and origin request policy") to see the Headers, Query strings, and Cookies dropdowns. The newer policy-based approach does not provide the same forwarding controls needed for Intercom's Help Center.

1. Under 'Settings', add your custom domain, e.g. `help.exampleapp.com` as an Alternate domain name and upload your SSL certificate if you have one. You need a certificate that matches your domain. If you use a certificate that does not match your domain, then you will see the following error when navigating to the HTTPS version of your website: NET::ERR_CERT_COMMON_NAME_INVALID


![](/assets/c620b1a-settings.b3fcc9c2fa0816168ab9d431ac54a1be54d074c289d262b9a959938e4dcebee4.71a4f21c.png)

#### Create a CNAME record

1. Copy your distribution domain name with all `_` characters removed
2. Navigate to your domain provider and create a new CNAME record
3. For host/name input your subdomain (ex. `help`)
4. For value input your CloudFront distribution domain name


![](/assets/ed2a1db-5.392163e3af2626aace2e0e96e52cb0f97ea7822750b6af569608557c993457c7.71a4f21c.png)

If you use AWS Route 53 for DNS, see the [Route 53 alias record](#create-a-dns-record-with-route-53) section below for an alternative to a standard CNAME.

#### Create a DNS record with Route 53

If you use **AWS Route 53** for DNS, you can create an alias record that points directly to your CloudFront distribution instead of using a standard CNAME record.

1. Open the [Route 53 console](https://console.aws.amazon.com/route53/) and go to **Hosted zones**.
2. Select the hosted zone for your domain (e.g. `exampleapp.com`).
3. Choose **Create record**.
4. For **Record name**, enter your subdomain (e.g. `help` for `help.exampleapp.com`).
5. Set **Record type** to **A**.
6. Toggle on **Alias**.
7. Under **Route traffic to**, choose **Alias to CloudFront distribution**.
8. Select your CloudFront distribution from the dropdown. It will appear as your distribution's domain name (e.g. `d111111abcdef8.cloudfront.net`).
9. Choose **Create records**.


Why use an Alias record?
Route 53 alias records have two advantages over standard CNAME records: they work at the zone apex (e.g. `exampleapp.com` with no subdomain) and Route 53 does not charge for alias queries to CloudFront distributions.

### Using your own SSL certificate with Apache or Nginx

The SSL certificate used by your Help Center is a shared certificate signed by your DNS provider. It uses SNI (Server Name Indication) to secure your site.

If you wish to host your own security certificates, you can do so through a [TLS termination proxy](https://en.wikipedia.org/wiki/TLS_termination_proxy). You’ll need to edit the configuration file on your proxy webserver.

**Note:** If you created a CNAME record that points to custom.intercom.help, you'll need to delete this to host your own SSL certificate.

Here are the basic instructions to set up your own SSL using Apache and Nginx webservers:


```html
# Prerequisites: mod_ssl, mod_proxy and mod_proxy_http should be enabled

# Step 1: Acquire an SSL certificate and private key (e.g. LetsEncrypt.org)
# Step 2: Set up Apache proxy settings, example below.
# Step 3: Set custom domain in Intercom Help Center settings
# Step 4: Make sure your custom domain's DNS record resolves to your Apache server

<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerName your-help-site.custom-domain.com # specify your custom domain here

        # Set SSL options for your own domain
        SSLEngine on
        SSLCertificateFile /path/to/your/fullchain.pem
       	SSLCertificateKeyFile /path/to/your/privatekey.pem
  
        # Proxy SSL options
        SSLProxyEngine on
        SSLProxyVerifyDepth 10
        SSLProxyCheckPeerCN off
        SSLProxyCheckPeerName on

       # Set up the reverse proxy to Intercom
        ProxyPreserveHost On
        ProxyPass / https://custom.intercom.help/
        ProxyPassReverse / https://custom.intercom.help/
</VirtualHost>
</IfModule>
```


```text
# Prerequisites: ngx_http_ssl_module and ngx_http_proxy_module should be enabled

# Step 1: set up normal server with HTTPS https://letsencrypt.org/
# Step 2: set up proxy settings as shown below 
# Step 3: set custom domain in Intercom Help Center settings
# Step 4: make sure your DNS record is configured to IP of your Nginx server

resolver 8.8.8.8; # use own DNS server if you have one
server {
  listen 443 ssl;
  server_name your-help-site.custom-domain.com; # replace this with your domain

  ssl_certificate /path/to/your/fullchain.pem;
  ssl_certificate_key /path/to/your/privatekey.pem;

  location / {
    # using "set" is important as IP addresses of Intercom servers 
    # changes dynamically. "set" enables nginx to follow dynamic IPs
    set $intercom "https://custom.intercom.help:443"; 
    proxy_set_header Host $host;
    proxy_pass $intercom;
  }
}
```

There are many ways to set up your own SSL certificate - we can’t guarantee that we can support every type of proxy setup. If you have specific needs, we can't support you in configuring it.

If your `robots.txt` file is returning 502 with your setup, you will need to increase `proxy-buffer-size` to `8kb` in your Nginx configuration file.

Note that you may also need to add redirect from HTTP protocol (port 80) to HTTPS as part of your server configuration.

While most modern browsers support SNI, a few older ones don’t. If you’re supporting those browsers, you should use your own SSL certificate instead. Check with your DNS provider to see if this option is available.

## How to configure subpath using AWS Cloudfront

### Create a new origin for the subpath

1. Sign in to the AWS Management Console and open the CloudFront console.
2. Choose the Distribution for your domain
3. Update the 'Origin' settings. The origin domain will be `custom.intercom.help` and the protocol should be `HTTPS` only. Our servers support TLSv1.2.


![](/assets/c5ef68e-image.df3cb62576df61b4f6c2044dcb6061e9144e79e46094c76d382aff0b091e8fb4.71a4f21c.png)

### Create the new path patterns

1. In the behaviors tab, create two new behaviors for the path patterns serving the help center (eg. `/support` and `/support*`)
![](/assets/f597ebb-image.1ede2a48195c1e8c8acc84d870248c26f616e77a08cba5ce87544a2007124b9c.71a4f21c.png)
2. Both should point to the HelpCenter proxy origin created above.
3. Update its settings.
![](/assets/46d77d3-image.c6762c0c9487e4aa6f17373fe9e37a739a93a180f2dbc351118276bab095eabc.71a4f21c.png)
4. Choose the legacy cache settings
![](/assets/083a842-image.d969c464bbea7204e6e956f5014d990e8f66d5a7a683f08904eda0de956695c5.71a4f21c.png)


SSL Setup
When using subpath on your root domain (eg `www.example.com/support`), we assumed that your root domain is already setup with SSL.
The steps above is only configuring the path patterns and not related to how you setup SSL for your root URL domain.

## How to configure subpath using Cloudflare Workers

If you're using Cloudflare and want to configure a subpath (e.g. `www.exampleapp.com/support`), Cloudflare's standard proxy setup may not work because the CNAME target does not belong to the same Cloudflare zone as your domain. You can use a Cloudflare Worker with `resolveOverride` to route traffic to Intercom's Help Center servers instead.

### Create a DNS record in your Cloudflare zone

Go to the 'DNS' section in Cloudflare and create a CNAME record that points to the Intercom host domain for your region:

- Intercom US: **custom.intercom.help**
- Intercom Europe: **custom.eu.intercom.help**
- Intercom Australia: **custom.au.intercom.help**


For example, if your domain is **www.exampleapp.com**, create a CNAME record with the **Name** `intercom-proxy` pointing to **custom.intercom.help**. This record must be within your own Cloudflare zone.

### Create a Cloudflare Worker

Go to 'Workers & Pages' in Cloudflare and create a new Worker. Update the Worker code to route requests to Intercom through your CNAME record:


```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const proxyUrl = new URL(url.pathname + url.search, "https://custom.intercom.help");

    return fetch(proxyUrl, {
      method: request.method,
      headers: {
        "User-Agent": request.headers.get("User-Agent") || "Mozilla/5.0",
        "Accept": "text/html",
        "CF-Visitor": '{"scheme":"https"}'
      },
    }, {
      cf: {
        resolveOverride: "intercom-proxy.exampleapp.com"
      }
    });
  }
};
```

Replace `intercom-proxy.exampleapp.com` with the CNAME record you created in the previous step, and update `custom.intercom.help` if your workspace is hosted in a different region.

The `resolveOverride` option tells Cloudflare to resolve the request using your CNAME record, which points to Intercom's servers. This way, the `Host` header is sent as your custom domain while the actual connection is routed through the CNAME to Intercom.

### Add a route for your custom domain

Go to the 'Triggers' tab in your Worker settings and add a route for your subpath, e.g. `www.exampleapp.com/support*`. This ensures all requests to your Help Center subpath are handled by the Worker.

Make sure the DNS record you created for `intercom-proxy` has Proxy Status toggled on (orange cloud icon) in Cloudflare. The Worker route must also match the custom domain you entered in your [Help Center settings](https://app.intercom.io/a/apps/_/articles/site/settings).