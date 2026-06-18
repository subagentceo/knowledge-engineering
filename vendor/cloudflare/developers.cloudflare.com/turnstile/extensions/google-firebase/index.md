---
title: Implement Turnstile with Google Firebase
description: Integrate Turnstile with Google Firebase for server-side validation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Implement Turnstile with Google Firebase

Turnstile is [available as an extension ↗](https://extensions.dev/extensions/cloudflare/cloudflare-turnstile-app-check-provider) with [Google's Firebase ↗](https://firebase.google.com/) platform as an [App Check ↗](https://firebase.google.com/docs/app-check) provider. You can leverage Cloudflare Turnstile's bot detection and challenge capabilities to ensure that requests to your Firebase backend services are verified and only authentic human visitors can interact with your application.

Google Firebase is a comprehensive app development platform that provides a variety of tools and services to help developers build, improve, and grow their mobile and web applications.

Firebase App Check helps protect Firebase resources like Cloud Firestore, Realtime Database, Cloud Storage, and Functions from abuse, such as automated fraud attacks and denial of service (DoS) attacks, by ensuring that incoming requests are from legitimate visitors and trusted sources.

## 1\. Set up a Google Firebase project

1. Create a Firebase project by going to the [Firebase Console ↗](https://console.firebase.google.com/).
2. Select **Add Project** and follow the prompts to create a new project.
3. Add an app to your project by selecting your project.
4. In the project overview, select **Add App** and choose the platform: **Web**.
5. [Register your app ↗](https://firebase.google.com/docs/web/setup?hl=en&authuser=0#register-app) and follow the guide to get your Firebase configuration.

Note

It is important to register your web app first to connect it with Turnstile later.

## 2\. Set up Cloudflare Turnstile

1. Create a Cloudflare Turnstile site by going to the [Cloudflare Turnstile dashboard ↗](https://dash.cloudflare.com/?to=/:account/turnstile).
2. Create a new widget and get the [sitekey and secret key](https://developers.cloudflare.com/turnstile/get-started/#get-a-sitekey-and-secret-key).  
   * The domain you configure with the Turnstile widget should be the domain of your web app.  
   * The [widget mode](https://developers.cloudflare.com/turnstile/concepts/widget/) must be **Invisible**.

## 3\. Integrate Firebase App Check with Turnstile

### 3a. Enable App Check in Firebase

1. Go to [Cloudflare Turnstile in the Firebase Extensions hub ↗](https://extensions.dev/extensions/cloudflare/cloudflare-turnstile-app-check-provider).
2. Install the Cloudflare Turnstile extension to your Firebase project.
3. Enable [Cloud Functions ↗](https://cloud.google.com/functions?hl=en), [Artifact Registry ↗](https://cloud.google.com/artifact-registry), and [Secret Manager ↗](https://cloud.google.com/security/products/secret-manager?hl=en).
4. Enter the secret key from Cloudflare Turnstile and your Firebase App ID.
5. Select **Install extension**.

### 3b. Grant access to the Cloudflare extension

1. Grant access to the Cloudflare extension under the IAM section of your project by selecting **Grant Access** under **View by Principals**.
2. Select `ext-cloudflare-turnstile` from the dropdown menu.
3. When filtering the token, select **Service Account Token Creator**.

### 3c. Configure Firebase in your app with Turnstile

1. Create an `index.ts` file.
2. Add your Firebase configuration.  
JavaScript  
```  
import { initializeApp } from "firebase/app";  
import { getAppCheck, initializeAppCheck } from "firebase/app-check";  
import {  
    CloudflareProviderOptions,  
} from '@cloudflare/turnstile-firebase-app-check';  
const firebaseConfig = {  
apiKey: "YOUR_API_KEY",  
authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  
projectId: "YOUR_PROJECT_ID",  
storageBucket: "YOUR_PROJECT_ID.appspot.com",  
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  
appId: "YOUR_APP_ID",  
};  
const app = initializeApp(firebaseConfig);  
// Initialize App Check  
const siteKey = 'YOUR-SITEKEY';  
const HTTP_ENDPOINT = '${function:ext-cloudflare-turnstile-app-check-provider-tokenExchange.url}';  
const cpo = new CloudflareProviderOptions(HTTP_ENDPOINT, siteKey);  
const provider = new CustomProvider(cpo);  
initializeAppCheck(app, { provider });  
// retrieve App Check token from Cloudflare Turnstile  
cpo.getToken().then(({ token }) => {  
    document.getElementById('app-check-token').innerHTML = token;  
});  
```

### 3d. Verify the App Check token in your web application

To verify the App Check token in your web application, refer to Firebase's [Token Verification guide ↗](https://firebase.google.com/docs/app-check/custom-resource-backend?hl=en#verification).

JavaScript

```

import express from "express";

import { initializeApp } from "firebase-admin/app";

import { getAppCheck } from "firebase-admin/app-check";


const expressApp = express();

const firebaseApp = initializeApp();


const appCheckVerification = async (req, res, next) => {

    const appCheckToken = req.header("X-Firebase-AppCheck");


    if (!appCheckToken) {

        res.status(401);

        return next("Unauthorized");

    }


    try {

        const appCheckClaims = await getAppCheck().verifyToken(appCheckToken);


        // If verifyToken() succeeds, continue with the next middleware function in the stack.

        return next();

    } catch (err) {

        res.status(401);

        return next("Unauthorized");

    }

}


expressApp.get("/yourApiEndpoint", [appCheckVerification], (req, res) => {

    // Handle request.

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/extensions/google-firebase/#page","headline":"Implement Turnstile with Google Firebase · Cloudflare Turnstile docs","description":"Integrate Turnstile with Google Firebase for server-side validation.","url":"https://developers.cloudflare.com/turnstile/extensions/google-firebase/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google","Integration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/extensions/","name":"Extensions"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/extensions/google-firebase/","name":"Implement Turnstile with Google Firebase"}}]}
```
