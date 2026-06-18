---
title: 2 - Junk email and user managed quarantine
description: Integrate 2 - Junk email and user managed quarantine with Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 2 - Junk email and user managed quarantine

In this tutorial, you will learn how to deliver `BULK` messages to the user's junk folder, and `SPAM` and `SPOOF` messages to the user managed quarantine.

## Create quarantine policies

To create quarantine policies:

1. Open the [Microsoft 365 Defender console ↗](https://security.microsoft.com/).
2. Go to **Email & collaboration** \> **Policies & rules**.
3. Select **Threat policies**.
4. Under **Rules**, select **Quarantine policies**.
5. Select **Add custom policy**.
6. Set the **Policy name** to `UserNotifyUserRelease`.
7. Select **Next**.
8. In **Recipient message access**, select **Set specific access (Advanced)**, and then:  
   * In **Select release action preference**, choose _Allow recipients to release a message from quarantine_.  
   * In **Select additional actions recipients can take on quarantined messages**, select the **Delete** and **Preview** checkboxes.
9. Select **Next**.
10. In **Quarantine notification**, select **Enable**.
11. Select **Next**.
12. Review your settings and select **Submit**.
13. Select **Done**.
14. Select **Add custom policy**.
15. Set the **Policy name** to `UserNotifyAdminRelease`.
16. Select **Next**.
17. In **Recipient message access**, select **Set specific access (Advanced)**, and then:  
   * In **Select release action preference**, from the drop-down menu, choose _Allow recipients to request a message to be released from quarantine_.  
   * In **Select additional actions recipients can take on quarantined messages**, select the **Delete** and **Preview** checkboxes.
18. Select **Next**.
19. In **Quarantine notification**, select **Enable**.
20. Select **Next**.
21. Review your settings and select **Submit**.
22. Select **Done**.

## Configure quarantine notifications

To configure quarantine notifications:

1. Open the [Microsoft 365 Defender console ↗](https://security.microsoft.com/).
2. Go to **Email & collaboration** \> **Policies & rules**.
3. Select **Threat policies**.
4. Under **Rules**, select **Quarantine policies**.
5. Select **Global settings**.
6. Scroll to the bottom and set the desired frequency in **Send end-user spam notifications every (days)**. This value can only be incremented in days.
7. Select **Save**.

## Configure anti-spam policies

To configure anti-spam policies:

1. Open the [Microsoft 365 Defender console ↗](https://security.microsoft.com/).
2. Go to **Email & collaboration** \> **Policies & rules**.
3. Select **Threat policies**.
4. Under **Policies**, select **Anti-spam**.
5. Select the **Anti-spam inbound policy (Default)** text (not the checkbox).
6. In **Actions**, scroll down and select **Edit actions**.
7. Set the following conditions and actions (you might need to scroll up or down to find them):
* **Spam**: _Move messages to Junk Email folder_.
* **High confidence spam**: _Quarantine message_.  
   * **Select quarantine policy**: \_UserNotifyUserRelease\_.
* **Phishing**: _Quarantine message_.  
   * **Select quarantine policy**: \_UserNotifyAdminRelease\_.
* **High confidence phishing**: _Quarantine message_.  
   * **Select quarantine policy**: \_UserNotifyAdminRelease\_.
* **Retain spam in quarantine for this many days**: Default is 15 days. Email security recommends 15-30 days.  
   * Select the spam actions in the above step.
1. Select **Save**.

## Create transport rules

To create the transport rules that will send emails with certain [disposition](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/#dispositions) to Email security:

1. Open the new [Exchange admin center ↗](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** \> **Rules**.
3. Select **Add a Rule** \> **Create a new rule**.
4. Set the following rule conditions:  
   * **Name**: _\`Email security Deliver to Junk Email folder\`_.  
   * **Apply this rule if**: _The message headers_ \> _includes any of these words_.  
         * **Enter text**: `X-CFEmailSecurity-Disposition` \> **Save**.  
         * **Enter words**: `BULK` \> **Add** \> **Save**.  
   * **Apply this rule if**: Select **+** to add a second condition.  
   * **And**: _The sender_ \> _IP address is in any of these ranges or exactly matches_ \> enter the egress IPs in the [Egress IPs](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/) page.  
   * **Do the following** \- _\_Modify the message properties\_ > \_Set the Spam Confidence Level (SCL)\_ > \_5\__.
5. Select **Next**.
6. You can use the default values on this screen. Select **Next**.
7. Review your settings and select **Finish** \> **Done**.
8. Select the rule \`Email security Deliver to Junk Email folder\` you have just created, and **Enable**.
9. Select **Add a Rule** \> **Create a new rule**.
10. Set the following rule conditions:  
   * **Name**: _\`Email security User Quarantine Message\`_.  
   * **Apply this rule if**: _The message headers_ \> _includes any of these words_.  
         * **Enter text**: `X-CFEmailSecurity-Disposition` \> **Save**.  
         * **Enter words**: _\`UCE\`, \`SPOOF\`_ \> **Add** \> **Save**.  
   * **Apply this rule if**: Select **+** to add a second condition.  
   * **And**: _The sender_ \> _IP address is in any of these ranges or exactly matches_ \> enter the egress IPs in the [Egress IPs](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/) page.  
   * **Do the following**: _\_Modify the message properties\_ > \_Set the Spam Confidence Level (SCL)\_ > \_9\__.
11. Select **Next**.
12. You can use the default values on this screen. Select **Next**.
13. Review your settings and select **Finish** \> **Done**.
14. Select the rule _\`Email security User Quarantine Message\`_ you have just created, and select **Enable**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/m365-email-security-mx/use-cases/two-junk-user-quarantine/#page","headline":"Junk email and user managed quarantine - Microsoft 365 · Cloudflare One docs","description":"Integrate 2 - Junk email and user managed quarantine with Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/m365-email-security-mx/use-cases/two-junk-user-quarantine/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/","name":"Pre-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/","name":"Prerequisites"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/m365-email-security-mx/","name":"Microsoft 365 as MX Record"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/m365-email-security-mx/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/m365-email-security-mx/use-cases/two-junk-user-quarantine/","name":"2 - Junk email and user managed quarantine"}}]}
```
