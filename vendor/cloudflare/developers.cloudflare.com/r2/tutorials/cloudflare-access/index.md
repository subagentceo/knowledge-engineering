---
title: Protect an R2 Bucket with Cloudflare Access
description: You can secure access to R2 buckets using Cloudflare Access, which allows you to only allow specific users, groups or applications within your organization to access objects within a bucket.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protect an R2 Bucket with Cloudflare Access

**Last reviewed:**  about 2 years ago 

You can secure access to R2 buckets using [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/).

Access allows you to only allow specific users, groups or applications within your organization to access objects within a bucket, or specific sub-paths, based on policies you define.

Note

For providing secure access to bucket objects for anonymous users, we recommend using [pre-signed URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) instead.

Pre-signed URLs do not require users to be a member of your organization and enable programmatic application directly.

## 1\. Create a bucket

_If you have an existing R2 bucket, you can skip this step._

You will need to create an R2 bucket. Follow the [R2 get started guide](https://developers.cloudflare.com/r2/get-started/) to create a bucket before returning to this guide.

## 2\. Create an Access application

Within the **Zero Trust** section of the Cloudflare Dashboard, you will need to create an Access application and a policy to restrict access to your R2 bucket.

If you have not configured Cloudflare Access before, we recommend:

* Configuring an [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) first to enable Access to use your organization's single-sign on (SSO) provider as an authentication method.

To create an Access application for your R2 bucket:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications** and select **Create new application**.
2. Select **Self-hosted and private**.
3. Select **Add public hostname** and enter the application domain. The **Domain** must be a domain hosted on Cloudflare, and the **Subdomain** part of the custom domain you will connect to your R2 bucket. For example, if you want to serve files from `behind-access.example.com` and `example.com` is a domain within your Cloudflare account, then enter `behind-access` in the subdomain field and select `example.com` from the **Domain** list.
4. Add [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to control who can connect to your application. This should be an **Allow** policy so that users can access objects within the bucket behind this Access application.  
Note  
Ensure that your policies only allow the users within your organization that need access to this R2 bucket.
5. Follow the remaining [self-hosted application creation steps](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) to publish the application.

## 3\. Connect a custom domain

Warning

You should create an Access application before connecting a custom domain to your bucket, as connecting a custom domain will otherwise make your bucket public by default.

You will need to [connect a custom domain](https://developers.cloudflare.com/r2/buckets/public-buckets/#connect-a-bucket-to-a-custom-domain) to your bucket in order to configure it as an Access application. Make sure the custom domain **is the same domain** you entered when configuring your Access policy.

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select your bucket.
3. Select **Settings**.
4. Under **Custom Domains**, select **Add**.
5. Enter the domain name you want to connect to and select **Continue**.
6. Review the new record that will be added to the DNS table and select **Connect Domain**.

Your domain is now connected. The status takes a few minutes to change from **Initializing** to **Active**, and you may need to refresh to review the status update. If the status has not changed, select the _..._ next to your bucket and select **Retry connection**.

## 4\. Test your Access policy

Visit the custom domain you connected to your R2 bucket, which should present a Cloudflare Access authentication page with your selected identity provider(s) and/or authentication methods.

For example, if you connected Google and/or GitHub identity providers, you can log in with those providers. If the login is successful and you pass the Access policies configured in this guide, you will be able to access (read/download) objects within the R2 bucket.

If you cannot authenticate or receive a block page after authenticating, check that you have an [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/#1-add-your-application-to-access) configured within your Access application that explicitly allows the group your user account is associated with.

## Next steps

* Learn more about [Access applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/) and how to configure them.
* Understand how to use [pre-signed URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) to issue time-limited and prefix-restricted access to objects for users not within your organization.
* Review the [documentation on using API tokens to authenticate](https://developers.cloudflare.com/r2/api/tokens/) against R2 buckets.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/tutorials/cloudflare-access/#page","headline":"Protect an R2 Bucket with Cloudflare Access · Cloudflare R2 docs","description":"You can secure access to R2 buckets using Cloudflare Access, which allows you to only allow specific users, groups or applications within your organization to access objects within a bucket.","url":"https://developers.cloudflare.com/r2/tutorials/cloudflare-access/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/tutorials/cloudflare-access/","name":"Protect an R2 Bucket with Cloudflare Access"}}]}
```
