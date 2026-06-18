---
title: SaaS applications
description: SaaS applications in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SaaS applications

Cloudflare Access allows you to add an additional authentication layer to your SaaS applications. When you integrate a SaaS application with Access, users log in to the application with Cloudflare as the Single Sign-On provider. The user is then redirected to the configured identity providers for that application and are only granted access if they pass your Access policies.

Cloudflare integrates with the majority of SaaS applications that support the SAML or OIDC authentication protocol. If you do not see your application listed below, refer to our [generic SAML](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-saml-saas/) or [generic OIDC](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-oidc-saas/) guide and consult your SaaS application's documentation.

* [ Generic OIDC application ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-oidc-saas/)
* [ Generic SAML application ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-saml-saas/)
* [ Adobe Acrobat Sign ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/adobe-sign-saas/)
* [ Area 1 ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/area-1/)
* [ Asana ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/asana-saas/)
* [ Atlassian Cloud ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/atlassian-saas/)
* [ AWS ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/aws-sso-saas/)
* [ Braintree ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/braintree-saas/)
* [ Coupa ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/coupa-saas/)
* [ Digicert ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/digicert-saas/)
* [ DocuSign ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/docusign-access/)
* [ Dropbox ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/dropbox-saas/)
* [ GitHub Enterprise Cloud ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/github-saas/)
* [ Google Cloud ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/google-cloud-saas/)
* [ Google Workspace ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/google-workspace-saas/)
* [ Grafana ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/grafana-saas-oidc/)
* [ Grafana Cloud ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/grafana-cloud-saas-oidc/)
* [ Greenhouse Recruiting ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/greenhouse-saas/)
* [ Hubspot ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/hubspot-saas/)
* [ Ironclad ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/ironclad-saas/)
* [ Jamf Pro ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/jamf-pro-saas/)
* [ Miro ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/miro-saas/)
* [ PagerDuty ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/pagerduty-saml-saas/)
* [ Pingboard ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/pingboard-saas/)
* [ Salesforce (OIDC) ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/salesforce-saas-oidc/)
* [ Salesforce (SAML) ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/salesforce-saas-saml/)
* [ ServiceNow (OIDC) ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/servicenow-saas-oidc/)
* [ ServiceNow (SAML) ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/servicenow-saas-saml/)
* [ Slack ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/slack-saas/)
* [ Smartsheet ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/smartsheet-saas/)
* [ SparkPost ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/sparkpost-saas/)
* [ Tableau Cloud ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/tableau-saml-saas/)
* [ Workday ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/workday-saas/)
* [ Zendesk ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/zendesk-sso-saas/)
* [ Zoom ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/zoom-saas/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/#page","headline":"SaaS applications · Cloudflare One docs","description":"SaaS applications in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}}]}
```
