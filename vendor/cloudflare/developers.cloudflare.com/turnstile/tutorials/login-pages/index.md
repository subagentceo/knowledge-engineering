---
title: Protect your forms
description: This tutorial will guide you through integrating Cloudflare Turnstile to protect your web forms, such as login, signup, or contact forms.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protect your forms

**Last reviewed:**  about 1 year ago 

This tutorial will guide you through integrating Cloudflare Turnstile to protect your web forms, such as login, signup, or contact forms. Learn how to implement the Turnstile widget on the client side and verify the Turnstile token via the Siteverify API on the server side.

## Before you begin

* You must have a Cloudflare account.
* You must have a web application with a form you want to protect.
* You must have basic knowledge of HTML and your server-side language of choice, such as Node.js or Python.

## Get Your Turnstile sitekey and secret key

1. In the Cloudflare dashboard, go to the **Turnstile** page.[ Go to **Turnstile** ](https://dash.cloudflare.com/?to=/:account/turnstile)
2. [Create a new Turnstile widget](https://developers.cloudflare.com/turnstile/get-started/).
3. Copy the sitekey and the secret key to use in the next step.

## Add the Turnstile widget to your HTML form

1. Add the Turnstile widget to your form.
2. Replace `<YOUR-SITE-KEY>` with the sitekey from Cloudflare.
3. Add a `data-callback` attribute to the Turnstile widget div. This JavaScript function will be called when the challenge is successful.
4. Ensure your submit button is initially disabled.

Example

```

<!DOCTYPE html>

<html lang="en">

  <head>

    <meta charset="UTF-8" />

    <title>Contact Form</title>

    <script

      src="https://challenges.cloudflare.com/turnstile/v0/api.js"

      async

      defer

    ></script>

    <script>

      function enableSubmit() {

        document.getElementById("submit-button").disabled = false;

      }

    </script>

  </head>

  <body>

    <form id="contact-form" action="/submit" method="POST">

      <input type="text" name="name" placeholder="Name" required />

      <input type="email" name="email" placeholder="Email" required />

      <textarea name="message" placeholder="Message" required></textarea>


      <!-- Turnstile widget -->

      <div

        class="cf-turnstile"

        data-sitekey="<YOUR-SITE-KEY>"

        data-callback="enableSubmit"

      ></div>


      <button type="submit" id="submit-button" disabled>Submit</button>

    </form>

  </body>

</html>


```

## Verify the Turnstile token on the server side

You will need to verify the Turnstile token sent from the client side. Below is an example in Node.js.

Node.js example

```

const express = require("express");

const axios = require("axios");

const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));


app.post("/submit", async (req, res) => {

  const turnstileToken = req.body["cf-turnstile-response"];

  const secretKey = "your-secret-key";


  try {

    const response = await axios.post(

      "https://challenges.cloudflare.com/turnstile/v0/siteverify",

      null,

      {

        params: {

          secret: secretKey,

          response: turnstileToken,

        },

      },

    );


    if (response.data.success) {

      // Token is valid, proceed with form submission

      const name = req.body.name;

      const email = req.body.email;

      const message = req.body.message;

      // Your form processing logic here

      res.send("Form submission successful");

    } else {

      res.status(400).send("Turnstile verification failed");

    }

  } catch (error) {

    res.status(500).send("Error verifying Turnstile token");

  }

});


app.listen(3000, () => {

  console.log("Server is running on port 3000");

});


```

## Important considerations

It is crucial to handle the verification of the Turnstile token correctly. This section covers some key points to keep in mind.

### Verify the token after form input

* Ensure that you verify the Turnstile token after the user has filled out the form and selected **submit**.
* If you verify the token before the user inputs their data, a malicious actor could potentially bypass the protection by manipulating the form submission after obtaining a valid token.

### Proper flow implementation

* When the user submits the form, send both the form data and the Turnstile token to your server.
* On the server side, verify the Turnstile token first.
* Based on the verification response, decide whether to proceed with processing the form data.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/tutorials/login-pages/#page","headline":"Protect your forms · Cloudflare Turnstile docs","description":"This tutorial will guide you through integrating Cloudflare Turnstile to protect your web forms, such as login, signup, or contact forms.","url":"https://developers.cloudflare.com/turnstile/tutorials/login-pages/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","Node.js","Forms","Authentication"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/tutorials/login-pages/","name":"Protect your forms"}}]}
```
