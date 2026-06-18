# Getting Started with the Event Webhook Security Features

Twilio SendGrid's Event Webhook will notify a URL via HTTP `POST` with information about events that occur as your mail is processed. This article covers all you need to know to secure the Event Webhook, allowing you to verify that incoming requests originate from Twilio SendGrid.

For more information about working with the Event Webhook and the data it provides, see [**Getting Started with the Event Webhook**](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook) and the [**Twilio SendGrid Event Webhook Overview**](/docs/sendgrid/for-developers/tracking-events/twilio-sendgrid-event-webhook-overview).

> \[!NOTE]
>
> Make sure your&#x20;
>
> **API Key Permissions**
>
> &#x20;are set to&#x20;
>
> **Full Access**
>
> .

Twilio SendGrid provides two methods for securing the Event Webhook: cryptographic signing and [OAuth 2.0](https://oauth.net/2/). These two security methods are independent of one another and can be used simultaneously.

## The Signed Event Webhook

When using the Signed Event Webhook, Twilio SendGrid will generate a [private and public key pair](https://www.twilio.com/blog/what-is-public-key-cryptography). The private key will be used to generate a signature that is posted to your HTTP webhook in the `X-Twilio-Email-Event-Webhook-Signature` header.

You can verify the signature with the public key provided. More information is provided in the [Verification section](#verify-the-signature) of this page.

### Enable signature verification

To enable signature verification and generate a key pair:

1. Navigate to **Settings** > **Mail Settings** in the sidebar navigation.
2. Under **Webhook Settings**, click **Event Webhooks**:

   1. If you have Webhooks set up already, you will see them displayed in a table. You can edit a Webhook by following the "Edit an Event Webhook" instructions in the [**Twilio SendGrid Event Webhook Overview**](/docs/sendgrid/for-developers/tracking-events/twilio-sendgrid-event-webhook-overview).
   2. If you have not set up any Webhooks, you can create one by following the "Add an Event Webhook" instructions in the [**Getting Started with the Event Webhook**](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook) documentation. For new Webhooks, you must enter mandatory information such as the **Post URL** and **Actions to be posted** before you can enable signature verification.
3. Once you have begun creating or editing a Webhook, you will manage its security features in the **Security features** section of the dialog that opens.
4. Scroll to **Security features** and toggle **Enable Signed Event Webhook**. You must click **Save** in order to generate a verification key and enable signature verification. If you click **Test Integration** before clicking **Save**, signature verification will not be tested because the key pair is only generated once the Webhook is saved.

![Security features panel with options for enabling signed event webhook and OAuth verification.](https://docs-resources.prod.twilio.com/993a71cb5fe15b2dca9eed177f76daaccd79c49cfd77f3f75cb9d95d643704c0.jpg)

5. Once you click **Save**, the dialog will close. To confirm that signature verification is enabled, navigate back to the dialog by clicking the cog and then clicking **Edit**. Now you will see the **Signature verification** setting is enabled and your public verification key is displayed.
6. You can now copy the public key and use it to verify that requests are coming from Twilio SendGrid.

![Table showing two webhooks with options to edit or delete, highlighting the edit option for the first webhook.](https://docs-resources.prod.twilio.com/bed41bf7fd90d79a9c05f79e4a75c0a26398298a1be9977a4cc9bb0287da8f40.jpg)

![Security settings for enabling signed event webhook with verification key and OAuth option.](https://docs-resources.prod.twilio.com/955499a5dd3e70f33348d5534b338e925129081cb4e3ccf95e8b57930c922142.jpg)

### Disable signature verification

To disable signature verification, which will delete the Webhook's existing key pair:

1. Edit the Webhook by following the "Edit an Event Webhook" instructions in the [**Twilio SendGrid Event Webhook Overview**](/docs/sendgrid/for-developers/tracking-events/twilio-sendgrid-event-webhook-overview) documentation.
2. When a signature exists, the Webhook's configuration dialog will show a toggle with **Enable Signed Event Webhook** as enabled (blue).
3. Toggle **Enable Signed Event Webhook** to disable the feature (gray). Your key pair will not be deleted until you click **Save**.
4. Click **Save** to delete your existing key pair for the Webhook.

![Security features settings with options for enabling signed event webhook and OAuth verification.](https://docs-resources.prod.twilio.com/7881fdc0e83779e4891367c682380680a9b2f36ba1bb779cb4dcff7944c8e64c.jpg)

### Manage the Signed Event Webhook using the API

You can also manage signature verification for the Event Webhook using SendGrid's API. See the [Event Webhook API reference](/docs/sendgrid/api-reference/webhooks) for more information.

### Verify the signature

Twilio SendGrid generates the private and public key pair using the [Elliptic Curve Digital Signature Algorithm (ECDSA)](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm).

We recommend using a package or library suitable for your language to verify the signature. Libraries are listed below in the "[Sample verification libraries](#sample-verification-libraries)" section of this page. The general steps required to verify a signature are outlined below with [Go](https://golang.org/) code samples.

> \[!WARNING]
>
> When verifying the signature, be aware that we deliver a payload that must be
> used in its raw bytes form. Transformations from raw bytes to a JSON string
> may remove characters that were used as part of the generated signature.

1. Initiate the `GET` request by including the parameters listed (Headers and Responses) on the [Get an Event Webhook](/docs/sendgrid/api-reference/webhooks/get-an-event-webhook) documentation.
2. Get the signature from the `"X-Twilio-Email-Event-Webhook-Signature"` HTTP header.

```go
// Golang Example
s := http.Request.Header.Get("X-Twilio-Email-Event-Webhook-Signature")
```

2. Get the timestamp from the `"X-Twilio-Email-Event-Webhook-Timestamp"` HTTP header.

```go
// Golang Example
ts := http.Request.Header.Get("X-Twilio-Email-Event-Webhook-Timestamp")
```

3. Decode the Base64 encoded signature. Then perform an ASN.1 unmarshal of the decoded signature into a string. This string will be in the form of `{r value},{s value}`.

```go
// Golang Example
signatureBytes, _ := base64.StdEncoding.DecodeString(s)
ecdsaSig := struct {
R *big.Int
S *big.Int
}

asn1.Unmarshal(signatureBytes, &ecdsaSig)
```

4. Generate a sha256 hash of the timestamp + payload (use raw bytes).

```go
// Golang Example
tsBytes := []byte(ts)
payload, _ := ioutil.ReadAll(http.Request.Body)
h := sha256.New()
h.Write(tsBytes)
h.Write(payload)
hashedPayload := h.Sum(nil)
```

5. Verify the signature.

```go
// Golang Example
// uses https://golang.org/pkg/crypto/ecdsa/ to perform the verification
ecdsa.Verify(publicKey, hashedPayload, ecdsaSig.R, ecdsaSig.S)
```

6. Again, the simplest way to verify the signature is to use a package or library that will abstract away this process into a helper method or function.

#### Sample verification libraries

The [Twilio SendGrid API libraries](/docs/sendgrid/for-developers/sending-email/libraries/) contain helpers to assist you when verifying the ECDSA signature. The links below will take you to the Event Webhook helper in each library.

* [C# Event Webhook Helper](https://github.com/sendgrid/sendgrid-csharp/tree/master/src/SendGrid/Helpers/EventWebhook)
* [Go Event Webhook Helper](https://github.com/sendgrid/sendgrid-go/tree/master/helpers/eventwebhook)
* [Java Event Webhook Helper](https://github.com/sendgrid/sendgrid-java/tree/master/src/main/java/com/sendgrid/helpers/eventwebhook)
* [Node.js Event Webhook Helper](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/eventwebhook)
* [PHP Event Webhook Helper](https://github.com/sendgrid/sendgrid-php/tree/master/lib/eventwebhook)
* [Python Event Webhook Helper](https://github.com/sendgrid/sendgrid-python/tree/master/sendgrid/helpers/eventwebhook)
* [Ruby Event Webhook Helper](https://github.com/sendgrid/sendgrid-ruby/tree/master/lib/sendgrid/helpers/eventwebhook)

## OAuth 2.0

OAuth offers an additional and separate way of providing security controls for the Event Webhook. OAuth is an open authorization protocol used to share resources with applications. Rather than sharing your username and password with an application, granting total access to your account, OAuth enables scoped access to your resources. For more on OAuth and how it works, see the [OAuth community site](https://oauth.net/2/).

The Twilio SendGrid Event Webhook uses the [Client Credentials](https://tools.ietf.org/html/rfc6749#section-1.3.4) OAuth grant type, which is an authorization workflow meant for machine-to-machine communication. This authorization method creates a token that Twilio SendGrid can pass to your app in an Authorization header, allowing you to verify that the request originated from Twilio SendGrid.

### OAuth Client Credentials flow

OAuth can be confusing. To help illuminate the process, we have provided a description of the setup flow here.

1. You, the customer, have an app that provides an HTTP webhook endpoint URL. You want the Twilio SendGrid Event Webhook to make `POST` requests to this URL. To ensure that the requests you receive are actually from Twilio SendGrid, you implement OAuth.
2. This means you are responsible for generating a Client ID and Client Secret. You must also provide two URLs, the HTTP `POST` URL endpoint for your app and a URL to an authorization server or OAuth service.
3. When you give Twilio SendGrid all of this information, it will pass the Client ID and Client Secret to the Token URL (your authorization server/OAuth service). The authorization server will then use the Client ID and Client Secret to generate an access token. This token is sent back to Twilio SendGrid.
4. The access token is meaningless to SendGrid. It acts only as a key to pass back to your app at the HTTP `POST` URL endpoint. This will be done in an Authorization header.
5. Because this access token is shared among only your app, the authorization server, and SendGrid, you can trust requests delivered with the token are from a trusted source.
6. You can verify the access token is legitimate by checking with the authorization server that created it.

![OAuth2 Client Credentials flow between app, SendGrid, and authorization server with token exchange steps.](https://docs-resources.prod.twilio.com/90b22596e3d06b5f350fb6a1ec05c23804001e7d515d37d2ec9f44a8d8cf0bc4.png)

### Enable OAuth 2.0

To enable OAuth 2.0:

1. Navigate to **Settings** > **Mail Settings** in the sidebar navigation.
2. Under **Webhook Settings**, click **Event Webhooks**:

   1. If you have Webhooks set up already, you will see them displayed in a table. You can edit a Webhook by following the "Edit an Event Webhook" instructions in the [**Twilio SendGrid Event Webhook Overview**](/docs/sendgrid/for-developers/tracking-events/twilio-sendgrid-event-webhook-overview) documentation.
   2. If you have not set up any Webhooks, you can create one by following the "Add an Event Webhook" instructions in the [**Getting Started with the Event Webhook**](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook) documentation. For new Webhooks, you must enter mandatory information such as the **Post URL** and **Actions to be posted** before you can enable and configure OAuth verification.
3. Once you have begun creating or editing a Webhook, you will manage its security features in the **Security features** section of the dialog that opens. Unlike signature verification, OAuth verification can be completed without first saving the Webhook.
4. Scroll to **Security features** and toggle **Enable OAuth** to reveal **Client ID**, **Secret Token**, and **Token URL** fields.

![OAuth verification form with fields for Client ID, Secret Token, and Token URL.](https://docs-resources.prod.twilio.com/72d204152ea6e31e55f6ae15342ccd88c67860878e1210fd22bde74bf2475ea4.jpg)

5. Fill the OAuth configuration fields:
   1. **Client ID**: Required to generate an authorization token.
   2. **Client Secret**: Required to generate an authorization token. This secret is needed only once to create an access token. SendGrid will store this secret, allowing you to update your Client ID and Token URL without passing the secret to SendGrid again.
   3. **Token URL**: The URL where Twilio SendGrid should deliver the Client ID and Client Secret in order to create an access token. This URL should route to your own authorization server or an OAuth service such as Okta.
6. With the above steps completed, requests to your **Post URL** by Twilio SendGrid will contain the access token in an Authorization header. You can now use this token to verify the requests using your OAuth service or authorization server.

> \[!NOTE]
>
> It is your responsibility to verify the access token used in requests to your
> HTTP `POST` URL.

### Disable OAuth

To disable OAuth 2.0:

1. Edit the Webhook by following the "Edit an Event Webhook" instructions in the [**Twilio SendGrid Event Webhook Overview**](/docs/sendgrid/for-developers/tracking-events/twilio-sendgrid-event-webhook-overview) documentation.
2. When OAuth is enabled, the Webhook's configuration dialog will show a toggle with **Enable OAuth** as enabled (blue).
3. Toggle **Enable OAuth** to disable the feature (gray).
4. Click **Save**.
5. The requests to your HTTP `POST` URL by Twilio SendGrid will no longer contain an access token.

### Manage OAuth 2.0 using the API

Twilio SendGrid allows you to manage OAuth setup using the API. See the [Event Webhook API reference](/docs/sendgrid/for-developers/tracking-events/event) for more information.

> \[!WARNING]
>
> Using the v2 Web API's `eventnotify` API call will overwrite any previously
> configured Event Webhook notification settings, including OAuth 2.0. If your
> OAuth 2.0 settings are overwritten, please configure them again using either
> the [Mail Settings](https://app.sendgrid.com/settings/mail_settings) page or
> the [SendGrid v3
> API](https://sendgrid.api-docs.io/v3.0/webhooks/update-event-notification-settings)

### Handling Expired or Invalid OAuth Access Tokens

Once you have established an OAuth Access Token per the above directions, SendGrid will cache that token so that it can be used in any further webhook requests without each time requesting that token again from your OAuth service.

Upon receiving a webhook request with an invalid or expired token, your webhook needs to return a status code of 4xx (typically 400, 401 or 403) and the body payload must contain one of the following strings:

"`invalid_request`", "`invalid_token`", "`insufficient_scope`".

More specifically, SendGrid follows [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750#section-3.1), which defines the error codes as follows:

**invalid\_request**

> The request is missing a required parameter, includes an\
> unsupported parameter or parameter value, repeats the same\
> parameter, uses more than one method for including an access\
> token, or is otherwise malformed. The resource server SHOULD\
> respond with the HTTP 400 (Bad Request) status code.

**invalid\_token**

> The access token provided is expired, revoked, malformed, or\
> invalid for other reasons. The resource SHOULD respond with\
> the HTTP 401 (Unauthorized) status code.

**insufficient\_scope**

> The request requires higher privileges than provided by the\
> access token. The resource server SHOULD respond with the HTTP\
> 403 (Forbidden) status code.

Upon receiving any of these error codes from your webhook, SendGrid will request a new OAuth token from your OAuth service and retry the webhook.

## Next steps

Now that you know how to secure the Event Webhook, you can begin using your event data to better understand your email. See the [**Event Webhook Reference**](/docs/sendgrid/for-developers/tracking-events/event) for more information about the data it provides.

## Additional Resources

* [Getting Started with the Event Webhook](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook)
* [Twilio SendGrid Event Webhook Overview](/docs/sendgrid/for-developers/tracking-events/twilio-sendgrid-event-webhook-overview)
* [Event Webhook reference](/docs/sendgrid/for-developers/tracking-events/event)
* [Event Webhook API](/docs/sendgrid/api-reference/webhooks)
* [An Event Webhook case study](https://sendgrid.com/blog/leveraging-sendgrids-event-api/)
