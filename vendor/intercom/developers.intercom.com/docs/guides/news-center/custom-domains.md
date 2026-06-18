# News Center Domains

## How to set up a custom domain for your news center.

When you turn on your News Center, your content is available through **intercom.news** by default. Your URL will look like this: intercom.news/exampleapp

To use a different URL for your News Center you will need to set up a custom domain.

Set up your custom domain in 3 steps:

[**1. Enter your custom domain**](#section-enter-your-custom-domain)
[**2. Create a custom CNAME record**](#section-create-a-custom-cname-record)
[**3. Configure SSL (Optional)**](#section-choose-to-configure-ssl-optional)

Top Level Domains
In order for Intercom to recognize and identify logged-in users within your News Center, your website and your News Center must share a top level domain.

For example, if your domain is app.example.com, your custom News Center domain must be something like news.example.com.

## 1. Enter your custom domain

Enter the custom domain you want to use in your News Center settings at [Settings  > Proactive Support > Newsfeeds](https://app.intercom.io/a/apps/_/outbound/news/newsfeeds).

First turn on your News Center.

![](/assets/news_feeds_turn_on.3edbac5f3f310707503bb90f94a70198472cf3d72fc4558bbf7b147900a07ccc.71a4f21c.png)

Then add the domain, making sure that it shares the top level domain with your site where Intercom is installed.

![](/assets/news_center_set_domain.fcc7d07f1b462b8fbb513667c421577c429922106aa07f655b750865007520fc.71a4f21c.png)

## 2. Create a custom CNAME record

- Go to your DNS provider’s website (e.g. [GoDaddy](https://ie.godaddy.com/help/add-a-cname-record-19236) or **[Cloudflare](https://www.cloudflare.com/dns/)**). If you’re choosing one for the first time, go with one that supports SSL.
- Create a CNAME (‘canonical name’) record for your custom domain.
- Point it at Intercom’s host domain **intercom.news**


Region support
News Center custom domains aren't supported for Australia or Europe regions.

#### How to create a custom CNAME record with Cloudflare

These steps will vary, so check with your own DNS provider for support.
As an example, here’s how to set up a CNAME record with Cloudflare:

1. Set up Cloudflare as the resolver for your custom CNAME by **[changing your domain nameserver to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708-Step-3-Change-your-domain-name-servers-to-Cloudflare)**.
2. Go to the ‘DNS’ section in Cloudflare and add a CNAME record for your News Center custom domain. Give the CNAME a **Name** based on the first part of your custom domain e.g. if your custom domain is **news-center.example.com**, use **news-center**.
3. Point it at the Intercom host domain: **intercom.news**


To enable the CNAME record, toggle on Proxy Status so that cloud icon is orange.

## 3. Configure SSL (Optional)

After you set up a custom domain, your News Center will be hosted on your domain, but on HTTP rather than HTTPS. Your News Center will now appear as ‘not secure’ on web browsers like Chrome Here’s how to secure it.

SSL (or TLS), is the most widely used way to secure the connection between your server and your browser. It ensures the connection between the server and browser is encrypted and safe, and appears as HTTPS.

Here’s what an SSL-configured website (with HTTPS) typically looks like on the Chrome browser:

![](/assets/f9db69f-screen_shot_2017-08-02_at_13.37.39.b09f65ef26714148b92262c243680975e084e5b6e55b2c962a31180f2ffee192.71a4f21c.png)

This is what it looks like if you’ve visited a website not secured by SSL (without HTTPS):

![](/assets/356863f-screen_shot_2017-08-02_at_13.42.32.b64adfd176aa573f83dc00cfcb5a1da2ded96ba215a98980edfa16539bf7376d.71a4f21c.png)

There are two ways to set up SSL with the News Center on your custom domain:

- Use a flexible SSL (using a third-party DNS provider like Cloudflare or AWS CloudFront)
- Use your own SSL certificate (using a TLS Termination Proxy)


You can configure SSL for your custom domain to keep sensitive information encrypted. If you want to do this, make sure you’ve set up your CNAME with a DNS provider that supports SSL, like Cloudflare.

DNS Changes can take time
DNS changes can sometimes take up to 72 hours to take effect, but are typically much faster.

### How to configure SSL with Cloudflare

#### Add SSL support to your domain

Go to the SSL/TLS section and change SSL to ‘Flexible’ or ‘Full’.

![A screenshot from the section of the Cloudflare user interface which allows you to toggle between encryption modes](/assets/cloudflare-ssl-full.5e8c474980be6ab820e1103df38ac18b12b3af3cfaf7f2ae2f78969856743c93.71a4f21c.png)

Don’t choose ‘Full (Strict)’ as this will result in an invalid SSL certificate.

#### Create a redirect rule to enforce HTTPS

Page Rules Deprecated
Cloudflare has deprecated Page Rules. If you previously set up an "Always Use HTTPS" Page Rule, it will continue to work. For new setups, follow the Redirect Rules instructions below. See [Cloudflare’s migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/) for details.

Go to **Rules > Overview** and click **Create rule > Redirect Rule**. Configure the rule with the following settings, replacing `news.exampleapp.com` with your own custom domain:

- **When incoming requests match**: Choose **Wildcard pattern** and enter `http://news.exampleapp.com/*`
- **Then**: Set the **Target URL** to `https://news.exampleapp.com/${1}`
- **Status code**: `301`
- **Preserve query string**: Enabled


Click **Deploy** to activate the rule.

#### Disable Cloudflare page speed features

Both Rocket Loader and Mirage inject JavaScript into your pages, which will break functionality on your News Center due to its security settings.

**Rocket Loader:** Go to **Rules > Configuration Rules** and click **Create rule**. Match your custom domain hostname (e.g. `news.exampleapp.com`) and set **Rocket Loader** to **Off**. Click **Deploy**.

**Mirage:** Go to **Speed > Optimization** and ensure Mirage is toggled **off** for your domain.

Alternatively, you can disable both globally under **Speed > Optimization** if you do not need these features for any part of your domain.

Ready to go!
Your custom domain should be fully secured and ready to go. Visitors to your News Center will see the green lock icon in their browser to let them know the site is secure.

### How to configure SSL with AWS

#### Create a CloudFront Distribution

1. Sign in to the AWS Management Console and open the CloudFront console.
2. Choose **Create Distribution**
3. Update the 'Origin' settings. The origin domain will be `intercom.news` and the protocol should be `HTTPS only`. Our servers support TLSv1.2.
4. Update the 'Default cache behavior' settings.


Cookie and Query String Forwarding
Your Cloudfront distribution must be set up to forward all headers, cookies and query strings or else some News Center features may not work.

Cache Settings Changed
When setting up your Cloudfront distribution, you need to select "Use legacy cache settings", which will now show the options for:

- Headers
- Query strings
- Cookies


These should be set to **All**

1. Under 'Settings', add your custom domain, e.g. `news.exampleapp.com` as an Alternate domain name and upload your SSL certificate if you have one. You need a certificate that matches your domain. If you use a certificate that does not match your domain, then you will see the following error when navigating to the HTTPS version of your website: NET::ERR_CERT_COMMON_NAME_INVALID


#### Create a CNAME record

1. Copy your distribution domain name
2. Navigate to your domain provider and create a new CNAME record
3. For host/name input your subdomain (ex news)
4. For value input your CloudFront distribution domain name


### Using your own SSL certificate with Apache or Nginx

The SSL certificate used by your News Center is a shared certificate signed by your DNS provider. It uses SNI (Server Name Indication) to secure your site.

If you wish to host your own security certificates, you can do so through a [TLS termination proxy](https://en.wikipedia.org/wiki/TLS_termination_proxy). You’ll need to edit the configuration file on your proxy webserver.

**Note:** If you created a CNAME record that points to `intercom.news`, you'll need to delete this to host your own SSL certificate.

Here are the basic instructions to set up your own SSL using Apache and Nginx webservers:

```html
# Prerequisites: mod_ssl, mod_proxy and mod_proxy_http should be enabled

# Step 1: Acquire an SSL certificate and private key (e.g. LetsEncrypt.org)
# Step 2: Set up Apache proxy settings, example below.
# Step 3: Set custom domain in Intercom News Center settings
# Step 4: Make sure your custom domain's DNS record resolves to your Apache server

<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerName your-news-site.custom-domain.com # specify your custom domain here

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
        ProxyPass / https://intercom.news/
        ProxyPassReverse / https://intercom.news/
</VirtualHost>
</IfModule>
```

```text
# Prerequisites: ngx_http_ssl_module and ngx_http_proxy_module should be enabled

# Step 1: set up normal server with HTTPS https://letsencrypt.org/
# Step 2: set up proxy settings as shown below 
# Step 3: set custom domain in Intercom News Center settings
# Step 4: make sure your DNS record is configured to IP of your Nginx server

resolver 8.8.8.8; # use own DNS server if you have one
server {
  listen 443 ssl;
  server_name your-news-site.custom-domain.com; # replace this with your domain

  ssl_certificate /path/to/your/fullchain.pem;
  ssl_certificate_key /path/to/your/privatekey.pem;

  location / {
    # using "set" is important as IP addresses of Intercom servers 
    # changes dynamically. "set" enables nginx to follow dynamic IPs
    set $intercom "https://intercom.news:443"; 
    proxy_set_header Host $host;
    proxy_pass $intercom;
  }
}
```

There are many ways to set up your own SSL certificate - we can’t guarantee that we can support every type of proxy setup. If you have specific needs, we can't support you in configuring it.

Note that you may also need to add redirect from HTTP protocol (port 80) to HTTPS as part of your server configuration.

While most modern browsers support SNI, a few older ones don’t. If you’re supporting those browsers, you should use your own SSL certificate instead. Check with your DNS provider to see if this option is available.