# Arkose Bot Manager Quickstart

This page is a Quickstart for setting up Arkose Bot Manager. It summarizes a step-by-step process with links to full documentation.

## Process Workflow

<Image border={false} src="https://files.readme.io/edc54ad-Screen_Shot_2022-06-16_at_11.30.49_AM.png" title="Screen Shot 2022-06-16 at 11.30.49 AM.png" />

Each block in the workflow has a label at the top for who is responsible for that step; Arkose or the Customer. Customers are primarily responsible for enabling Arkose API components on both their application’s client and server sides.

## Prerequisites

1. You must have signed up with Arkose Labs and received a login to the [Arkose Command Center](http://portal.arkoselabs.com/).

2. To successfully connect with the *Arkose Client and Verify APIs*, you need a *Public and Private Key Pair.* Go to the [Arkose Command Center](http://portal.arkoselabs.com/) and find your keys in the **Settings>Keys** area (see the left menubar for access). If you need help with your keys, contact your Arkose Customer Success Manager (CSM).

<Image border={false} src="https://files.readme.io/f93130c-Key_Settings.png" title="Key Settings.png" />

3. Arkose strongly recommends:

   1. Using a **Development Only Key** for all Testing purposes.

   2. Using one **Production Key** per workflow; i.e. use one Key Pair for your application’s login workflow, and different ones for its Register, Purchase, and other workflows and for multiple sites.

4. Request your *custom Arkose Verify API endpoints* from your CSM;

   * **Request schema:**\
     `<company>-verify.arkoselabs.com/api/v4/verify/schema/request`
   * **Response schema:**\
     `<company>-verify.arkoselabs.com/api/v4/verify/schema/response`
   * **Example:**\
     `https://acme-verify.arkoselabs.com/api/v4/verify/schema/request`\
     `https://acme-verify.arkoselabs.com/api/v4/verify/schema/response`

## STEP 1: Client-Side Implementation

This step covers basic client-side implementation for Arkose Bot Manager on Desktop/Web Browser applications. If you have more than one platform, you will have to set up each one. Note that there are separate instructions for Client-side implementation for [Android Mobile SDK](https://developer.arkoselabs.com/docs/android-mobile-sdk) or [iOS Mobile SDK](https://developer.arkoselabs.com/docs/ios-mobile-sdk). For full client-side implementation details, see [Client-Side Instructions](https://developer.arkoselabs.com/docs/standard-setup)

On the client-side, Arkose Bot Manager:

* Collects the data used to classify client traffic.

* Based on the traffic classification, displays an Enforcement Challenge (EC) if applicable.

* Provides a one-time use token to send to the Arkose Verify API.

***1.1 Client API Endpoints***

When doing your initial client setup as a demo or for testing or familiarization purposes, you can call the Arkose Client API via the generic `client-api.arkoselabs.com` endpoint.

However, after using it to start out, you will need to change over to a custom Client API hostname in the format of `<company>-api.arkoselabs.com`. See the detailed [Client-Side Instructions](https://developer.arkoselabs.com/docs/standard-setup) for how to set this up.

***1.2 Include the Arkose Bot Manager Client API***

For all pages you want to use Arkose Bot Manager on, include the Arkose Bot Manager Client API (the API) with your public key, as shown in the below HTML code example.

> 🚧 Only load the Arkose API script ONCE PER PAGE!
>
> Loading the Arkose API script multiple times on a single page causes duplicate event listeners and causes issues during implementation

***1.3 Define a Global JavaScript Function***

Define a global JavaScript function as shown in the below HTML example. The code comments have suggestions for where to put the code and how to use this code sample. The `arkose-trigger` button is generically named to apply to both products.

***1.4 HTML Client API / JavaScript Function Examples***

<Recipe slug="arkose-client-side-code" title="Arkose Client-Side Code" />

```html
<html>
<head>
  {/* 
    Include the Arkose Labs API in the <head> of your page. In the example below, remember to
    replace the <YOUR PUBLIC KEY> with the public key supplied to you by Arkose Labs, and 
    replace <YOUR CALLBACK> with a name that refers to your defined global callback function.
    e.g. <script src="//client-api.arkoselabs.com/v2/<YOUR PUBLIC KEY>/api.js" data-callback="setupDetect"></script>
  */}
  <script src="//client-api.arkoselabs.com/v2/<YOUR PUBLIC KEY>/api.js" data-callback="<YOUR CALLBACK>"></script>
  <link rel="shortcut icon" href="#">
  <meta charset="UTF-8">
</head>
<body>
{/* 
  The trigger element can exist anywhere in your page and can be added to the DOM at any time.
*/}
<button id="arkose-trigger">
  trigger element
</button>
{/* 
  To configure the detection, place a script tag just before the closing <body> tag and define the
  callback as a global function.
*/}
<script>
  /*
    This global function will be invoked when the API is ready. Ensure the name is the same name
    that is defined on the attribute `data-callback` in the script tag that loads the api for your
    public key.
  */
  function setupArkose(myArkose) {
    myArkose.setConfig({
      selector: '#arkose-trigger',
      onCompleted: function(response) {
        console.log(response.token);
      }
    });
  }
</script>
</body>
</html>
```

Now that you've installed Arkose Bot Manager on a page, it loads the Arkose Bot Manager API script. When loaded, it creates a `myArkose` object that exposes public functions listed in the [Client API `myArkose-object`](https://developer.arkoselabs.com/docs/client-api#myarkose-object) and [Client API callbacks](https://developer.arkoselabs.com/docs/client-api#api-callbacks) sections of these docs. Use these functions to support your specific implementation requirements.

You must *ALWAYS* call `setConfig` to set up the Client API and its callback functions. You need to define the callback functions to specify what happens when they are triggered at various points when running Arkose Bot Manager. Note that there are different callback definition requirements for our detection and enforcement components. See [Client API](https://developer.arkoselabs.com/docs/client-api) for instructions for what to do next, what callbacks are called when during Arkose processing, and full information about the various objects and callbacks you need to use and/or define.

## STEP 2: Server-Side Setup

This step covers server-side implementation for Arkose Bot Manager. On the server-side, you verify the client-side provided token with the Arkose Verify API. The verification response contains information about the session, either as a JSON object or in a simple format. These instructions assume you are not implementing the Arkose Labs verification call using your Content Delivery Network (CDN) provider. Details for setting up the verification call using your CDN provider can be found at [Content Delivery Network Setup](https://developer.arkoselabs.com/docs/cdn).

## Step 2.1 Add Calls to Arkose Verify API

There are several ways to make calls to the Arkose Verify API. In this Quickstart, we show how to make `POST` request calls. The request takes the following two required parameters:

| Parameter Name  | Description                                                                                                                                             |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `private_key`   | The Arkose Labs issued private key used for the server-side API.                                                                                        |
| `session_token` | The token value contained within the token key of the Client API response object. This object is provided within the client-side `onComplete` callback. |

### Step 2.1.1 Making a `POST` Verify Request

`POST` requests use the request body. Below is an example of a JSON request body using the above parameters. Before actually using it, replace the `_***_HERE_` placeholders with real values. In the call, remember to replace `<company>` with your company's personalized Verify API URL name. The endpoint is `https://<company>-verify.arkoselabs.com/api/v4/verify/`

```json
{
  "private_key": "_PRIVATE_KEY_HERE_",
  "session_token": "_SESSION_TOKEN_HERE_",
  "log_data": "_LOG_DATA_HERE_"
}
```