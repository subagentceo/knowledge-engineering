---
title: External Evaluation rules
description: External Evaluation rules in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# External Evaluation rules

With Cloudflare Access, you can create Allow or Block policies which evaluate the user based on custom criteria. This is done by adding an **External Evaluation** rule to your policy. The **External Evaluation** selector requires two values:

* **Evaluate URL** — the API endpoint containing your business logic.
* **Keys URL** — the key that Access uses to verify that the response came from your API

After the user authenticates with your identity provider, Access sends the user's identity to the external API at **Evaluate URL**. The external API returns a True or False response to Access, which will then allow or deny access to the user. To protect against man-in-the-middle attacks, Access signs all requests with your Access account key and checks that responses are signed by the key at **Keys URL**.

You can set up External Evaluation rules using any API service, but to get started quickly we recommend using [Cloudflare Workers](https://developers.cloudflare.com/workers/).

## Set up external API and key with Cloudflare Workers

### Prerequisites

* [Workers account](https://developers.cloudflare.com/workers/get-started/guide/)
* Install [npm ↗](https://docs.npmjs.com/getting-started)
* Install [Node.js ↗](https://nodejs.org/en/)
* Application protected by Access

### 1\. Create a new Worker

1. Open a terminal and clone our example project.  
Terminal window  
```  
npm create cloudflare@latest my-worker -- --template https://github.com/cloudflare/workers-access-external-auth-example  
```
2. Go to the project directory.  
Terminal window  
```  
cd my-worker  
```
3. Create a [Workers KV namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) to store the key. The binding name should be `KV` if you want to run the example as written.  
Terminal window  
```  
npx wrangler kv namespace create "KV"  
```  
The command will output the binding name and KV namespace ID, for example  
```  
  [[kv_namespaces]]  
   binding = "KV"  
   id = "YOUR_KV_NAMESPACE_ID"  
```
4. Open the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) in an editor and insert the following:  
   * `[[kv_namespaces]]`: Add the output generated in the previous step.  
   * `<TEAM_NAME>`: your Cloudflare One team name.

* [  wrangler.jsonc ](#tab-panel-7167)
* [  wrangler.toml ](#tab-panel-7168)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker",

  "workers_dev": true,

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "main": "index.js",

  "kv_namespaces": [

    {

      "binding": "KV",

      "id": "YOUR_KV_NAMESPACE_ID"

    }

  ],

  "vars": {

    "TEAM_DOMAIN": "<TEAM_NAME>.cloudflareaccess.com",

    "DEBUG": false

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"

workers_dev = true

# Set this to today's date

compatibility_date = "2026-06-18"

main = "index.js"


[[kv_namespaces]]

binding = "KV"

id = "YOUR_KV_NAMESPACE_ID"


[vars]

TEAM_DOMAIN = "<TEAM_NAME>.cloudflareaccess.com"

DEBUG = false


```

### 2\. Program your business logic

1. Open `index.js` and modify the `externalEvaluation` function to perform logic on any identity-based data sent by Access.

Note

* Sample code is available in our [GitHub repository ↗](https://github.com/cloudflare/workers-access-external-auth-example).
* To view a list of identity-based data fields, log in to your Access application and append `/cdn-cgi/access/get-identity` to the URL. For example, if `www.example.com` is behind Access, visit `https://www.example.com/cdn-cgi/access/get-identity`.

1. Deploy the Worker to Cloudflare's global network.  
Terminal window  
```  
npx wrangler deploy  
```

The Worker will be deployed to your `*.workers.dev` subdomain at `my-worker.<YOUR_SUBDOMAIN>.workers.dev`.

### 3\. Generate a key

To generate an RSA private/public key pair:

1. Open a browser and go to `https://my-worker.<YOUR_SUBDOMAIN>.workers.dev/keys`.
2. (Optional) Verify that the key has been stored in the `KV` namespace:  
   1. In the Cloudflare dashboard, go to the **Workers KV** page.[ Go to **Workers KV** ](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces)  
   2. Select **View** next to `my-worker-KV`.

Other key formats (such as DSA) are not supported at this time.

### 4\. Create an External Evaluation rule

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Policies**.
2. Edit an existing policy or select **Add a policy**.
3. Add the following rule to your policy:

| Rule Type | Selector            | Evaluate URL                                     | Keys URL                                              |
| --------- | ------------------- | ------------------------------------------------ | ----------------------------------------------------- |
| Include   | External Evaluation | https://my-worker.<YOUR\_SUBDOMAIN>.workers.dev/ | https://my-worker.<YOUR\_SUBDOMAIN>.workers.dev/keys/ |

1. Save the policy.
2. Go to **Access controls** \> **Applications** and edit the application for which you want to apply the External Evaluation rule.
3. In the **Policies** tab, add the policy that contains the External Evaluation rule.
4. Select **Save**.

When a user logs in to your application, Access will now check their email, device, location, and other identity-based data against your business logic.

### Troubleshooting the Worker

To debug your External Evaluation rule:

1. Go to your Worker directory.  
Terminal window  
```  
cd my-worker  
```
2. Open the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) in an editor and set the `debug` variable to `TRUE`.
3. Deploy your changes.  
Terminal window  
```  
npx wrangler deploy  
```
4. Next, start a session to output realtime logs from your Worker.  
Terminal window  
```  
wrangler tail -f pretty  
```
5. Log in to your Access application.  
The session logs should show an incoming and outgoing JWT. The incoming JWT was sent by Access to the Worker API, while the outgoing JWT was sent by the Worker back to Access.
6. To decode the contents of a JWT, you can copy the token into [jwt.io ↗](https://jwt.io/).  
The incoming JWT should contain the user's identity data. The outgoing JWT should look similar to:  
JavaScript  
```  
{  
"success": true,  
"iat": 1655409315,  
"exp": 1655409375,  
"nonce": "9J2E9Xg6wYj8tlnA5MV4Zgp6t8rzmS0Q"  
}  
```  
Access checks the outgoing JWT for all of the following criteria:  
   * Token was signed by **Keys URL**.  
   * Expiration date has not elapsed.  
   * API returns `"success": true`.  
   * `nonce` is unchanged from the incoming JWT. The `nonce` value is unique per request.  
If any condition fails, the External Evaluation rule evaluates to false.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/external-evaluation/#page","headline":"External Evaluation rules · Cloudflare One docs","description":"External Evaluation rules in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/external-evaluation/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","JSON web token (JWT)"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/policies/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/policies/external-evaluation/","name":"External Evaluation rules"}}]}
```
