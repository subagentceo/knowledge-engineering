# Cloudflare CDN Integration - Auth0

# Prerequisites

## Auth0 Setup

A custom domain is needed to be setup within the Auth0 platform, this way the CDN can intercept the requests. A CNAME DNS needs to be created with **Proxied** enabled.

### Auth0 Version Support

Auth0 has 2 main modes for Authentication: **Universal Login Classic** and **Universal Login New**. Both modes can use the Cloudflare worker to inject client side javascript and server side validation of the Arkose token. Both Auth0 login and registration flows are supported, each has different URLs as shown below. For Universal Login New, the URLs will also differ if using Identifier first or UN/PW only.

| Mode                                                | URL                                         |
| :-------------------------------------------------- | :------------------------------------------ |
| Universal Login Classic Login                       | https\://customdomain/login\*               |
| Universal Login Classic Registration                | https\://customdomain/login\*               |
| Universal Login New Login (Identifier first)        | https\://customdomain/u/login/password\*    |
| Universal Login New Login (UN/PW)                   | https\://customdomain/u/login\*             |
| Universal Login New Registration (Identifier first) | https\://customdomain/u/signup/identifier\* |
| Universal Login New Registration (UN/PW)            | https\://customdomain/u/signup\*            |

Whilst Universal Login Classic does have a HTML editor where you can add the client side Arkose implementation and Universal Login New has the ability to edit the template, having all the code in a single Cloudflare worker allows for a simpler integration.

> 📘
>
> A worker will run regardless of the client side integration method due to Auth0 using the same URL to render the page and to validate the entered credentials, for Universal Login New this URL is in the format of `https://customdomain/u/login`. Auth0 switches between a GET and POST call.

## How to Configure

1. Access your Auth0 tenant.
2. In the side panel, navigate to **Branding -> Custom Domains**.

<Image align="center" className="border" border={true} src="https://files.readme.io/a1993d8-image.png" />

3. Input a custom domain and select **Certificate Type**.

<Image align="center" className="border" border={true} src="https://files.readme.io/e8b001f-image.png" />

4. Select **Add Domain**.

<Image align="center" className="border" border={true} src="https://files.readme.io/66887ec-image.png" />

<Image align="center" className="border" border={true} src="https://files.readme.io/8b3b32e-image.png" />

5. Now that the base configuration is set up, the Cloudflare setup can be added.

# Cloudflare Setup

The worker logic needs to handle 2 flows:

* **Inserting Arkose Labs Javascript:** The first is to insert the Arkose Labs javascript client side code for both the scenario when the initial login page loads and after a failed attempt to log in. 
* **Token Validation through Arkose Labs Verify API:** The second flow within the worker is to validate the Token by sending it to the Arkose Labs Verify API.

## How to Configure

This step by step guide will walk you through the setup for Universal Login New (Identifier first), for other flows the URLs will be different.

## Step 1. Creating a Worker

1. Log in to your Cloudflare account.
2. Navigate to the **Workers & Pages** section in the side navigation panel and select **Overview**.

<Image align="center" className="border" border={true} src="https://files.readme.io/e3f19e1-image.png" />

3. After the page loads, click **Create an Service** button.\
   ![](https://files.readme.io/8d2ccf0-image.png)
4. Make sure you are on the **Workers tab** and select **Create Worker**.\
   ![](https://files.readme.io/027f1ea-image.png)
5. Provide a name for the worker.

<Image align="center" className="border" border={true} src="https://files.readme.io/9a29514-image.png" />

6. Leave the default HTTP handler selected and click **Create Service**.

<Image align="center" className="border" border={true} src="https://files.readme.io/87ac907-image.png" />

7. The Worker has been created, the next step is editing workers code.

## Step 2. Adding Arkose Labs Code to Worker

1. Once the worker has been created, click on **Edit Code**.\
   ![](https://files.readme.io/057ad4e-image.png)
2. **Delete** the sample code from the `worker.js` file.

<Image align="center" className="border" border={true} src="https://files.readme.io/c897453-image.png" />

3. Open [CDN-Examples Auth0](https://github.com/ArkoseLabs/arkose-examples/tree/main/cdn-examples/server/auth0) and copy and paste the code into the `worker.js` file.

<Image align="center" className="border" border={true} src="https://files.readme.io/f1b77d1-image.png" />

4. Click on **Save and deploy**.

## Step 3: Add variables to the Worker

1. Navigate to the **Settings** page of the worker.
2. Select the **Variables** menu item from the side navigation panel.

   ![](https://files.readme.io/35f8989c2104cef61f68eaf05bd7438d72172ceff8510392f7686d410e8a52e8-image.png)
3. Add the following parameters as Worker variables:

   | Variable                | Description                                                                                                         | Sample                                                   |
   | :---------------------- | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------- |
   | `publicKey`             | Arkose Labs public key obtained through [Command Center](https://portal.arkoselabs.com/)                            | `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`                   |
   | `privateKey`            | Arkose Labs private key obtained through [Command Center](https://portal.arkoselabs.com/)                           | `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`                   |
   | `clientSubdomain`       | Client subdomain name provided to you via the Arkose Labs team. Default “client-api” will always work for the keys. | `client-api`                                             |
   | `verifySubdomain`       | Verify subdomain name provided to you via Arkose Labs team. Default “verify-api” will always work for the keys.     | `verify-api`                                             |
   | `errorUrl`              | A page to route the user to when an error occurs (outside of fail open).                                            | [https://www.arkoselabs.com](https://www.arkoselabs.com) |
   | `arkoseCookieLife`      | The length of time the Arkose cookies should be active for (in milliseconds).                                       | `30000` (5 minutes)                                      |
   | `arkoseCookieName`      | The name of the cookie that the Arkose token will be stored in.                                                     | `arkoseToken`                                            |
   | `arkoseErrorCookieName` | The name of the cookie that an Arkose error will be stored in.                                                      | `arkoseError`                                            |
   | `scriptMaxRetryCount`   | The number of times to retry resetting Arkose if there is a client side error.                                      | `3`                                                      |
   | `verifyMaxRetryCount`   | The number of times to retry verification if there is an error.                                                     | `3`                                                      |
   | `failOpen`              | If Arkose has an outage, can Arkose be bypassed.                                                                    | `true`                                                   |
4. Make the privateKey encrypted by selecting the **Encrypt** button.
5. Click **Save and Deploy**

## Step 4: Adding triggers to the Worker

1. Navigate to the Worker page and select the **Triggers** tab.

<Image align="center" className="border" border={true} src="https://files.readme.io/6d4a1bb-image.png" />

2. Click on **Add route**.

<Image align="center" className="border" border={true} src="https://files.readme.io/c08a7e3-image.png" />

3. Enter the route name with the following format `customdomain/u/*` (no https is needed).

<Image align="center" className="border" border={true} src="https://files.readme.io/7cec661-image.png" />

4. Select the domain **Zone** from the dropdown menu.\
   ![](https://files.readme.io/7708c6a-image.png)
5. Click on **Add route**.\
   ![](https://files.readme.io/4ab1de4-image.png)
6. Once the route is added, the **setup has been completed**.