# Introduction

Canvas Kit allows you to build apps that work from directly within the Intercom UI.

This means you can bring your workflows and/or product into Intercom, making it easy for teammates and customers to see information or take actions that aren't specifically to do with Intercom.

For example, you could create an app that lets your leads quickly and easily book a meeting through the Messenger, like this:

![Google Calendar Canvas Kit Example](/assets/6b7e234-google_calendar_canvas_kit_example.9659e252a4a248bc66e7989f69b3773257ebca0324828c9f619ad38b60094247.71a4f21c.png)

## Locations & Types

Canvas Kit apps can be viewed and used in either the Messenger (by users, leads and visitors) or in the Inbox product (by Intercom teammates). We make this distinction as Messenger and Inbox capabilities have slightly different requests, configurations, functionalities, and appearances from each other.

Apps can be added in five different places:

- On the Messenger Home   Messenger
- Within Conversations   Messenger
- Within Workflows   Messenger
- Within Messages   Messenger
- Within the Conversation Details   Inbox


You may want your app only to be added within certain places (or to only be usable by teammates in the Inbox). You can choose where these can be added to on the Canvas Kit page of your app within the Developer Hub. If you'd like to preview what your app will look like in various locations refer to our interactive [Canvas Kit builder](https://app.intercom.com/a/canvas-kit-builder).

## Removing a location

Private apps are able to delete any Canvas Kit location in the Developer Hub. Removing a Canvas Kit location causes the app to be deleted and removed from all contexts it was inserted into.

## Requests & Responses

The Canvas Kit works by sending you POST requests to the URLs you provide us with. You then take any actions with your service and respond to these POST requests with JSON objects, letting us know what UI to show.

There are several types of requests that we may send to you — read more detail about them [here](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/messenger-apps-lifecycle)

## Initialize

The Initialize request is triggered when a teammate:

- Adds your app into to a conversation reply   Messenger
- Adds your app into a Workflow   Messenger
- Adds your app into a Message   Messenger
- Adds your app on to the Messenger Home   Messenger
- Adds your app to the conversation details   Inbox
- Switches conversations when your app is present in the conversation details   Inbox
- Switches participant in a group conversation   Inbox


Where do I enter the URL which will handle the Initialize requests?
For Messenger capabilities, go to your app in the Developer Hub, navigate to **Configure > Canvas Kit**, and open up the **For users, leads and visitors** dropdown. Select where the app can be added within and scroll down to see the **Initialize flow webhook URL** input field.

> For Inbox capabilities, go to your app in the Developer Hub, navigate to **Configure > Canvas Kit**, and open up the **For teammates** dropdown. Select where the app can be added within and scroll down to see the **Initialize flow webhook URL** input field.


### Initialize Request

The request payload will have all the data needed for you to understand who is using your app, where they are using it, and how you should respond. There are different request payloads for Messenger capabilities and Inbox capabilities.


```json
{
  "workspace_id": "abcd123",
  "admin": { /* Object: See link in table for the full model */ },
  "conversation": { /* Object: See link in table for the full model */ },
  "contact": { /* Object: See link in table for the full model */}
}
```


```json
{
  "workspace_id": "abcd123",
  "admin": { /* Object: See link in table for the full model */ },
  "conversation": { /* Object: See link in table for the full model */ },
  "contact": { /* Object: See link in table for the full mode */ }
}
```

| Attribute | Type | Capabilities | Description |
|  --- | --- | --- | --- |
| workspace_id | String |  Messenger   Inbox  | The workspace ID of the teammate. Attribute is `app_id` for V1.2 and below. |
| workspace_region | String |  Messenger   Inbox  | The Intercom hosted region that this app is located in. |
| admin | Object |  Inbox  | The Intercom teammate ([admin](https://developers.intercom.com/intercom-api-reference/reference/admin-model)) viewing the conversation. |
| card_creation_options | Object |  Messenger  | Key-value pairs which were given as [results](/docs/references/preview/canvas-kit/responseobjects/results) in response to the [Configure request](#configure). |
| context | Object |  Messenger  | The [context](/docs/references/preview/canvas-kit/requestobjects/context) of where the app is added, where the user last visited, and information on the Messenger settings. |
| conversation | Object |  Inbox  | The [conversation](https://developers.intercom.com/intercom-api-reference/reference/conversation-model) your app is being shown for. |
| contact | Object |  Inbox  | The [contact](https://developers.intercom.com/intercom-api-reference/reference/contacts-model) which is currently being viewed by the teammate in the conversation details panel. We send an individual initialize request for each customer when it's a group conversation. |


Group Conversations in Inbox
When a group conversation is loaded in the inbox, we'll send initialization requests for up to the first 5 participants to support quick switching. Additional participants will have the initialization request made the first time they are selected.

### Initialize Response

We expect a [canvas object](/docs/references/preview/canvas-kit/responseobjects/canvas) in response to the request. This is where you'll specify the UI for the first screen of the app using [components](/docs/references/preview/canvas-kit/presentationcomponents/data-table).


```json
{
  "canvas": {
    "content": {
      "components": [
        {
          "type": "text",
          "text": "This is a text component."
        }
      ]
    },
    "stored_data": { "key": "value" } //Can be more than one pair 
  }
}
```

## Submit

The Submit request is triggered when:

- A component with a [submit action](/docs/references/preview/canvas-kit/actioncomponents/submit-action) is interacted with  Messenger  Inbox



```json
{
  "action": {
    "type": "submit"
  }
}
```

Where do I enter the URL which will handle the Submit requests?
For Messenger capabilities, go to your app in the Developer Hub, navigate to **Configure > Canvas Kit**, and open up the **For users, leads and visitors** dropdown. Select where the app can be added within and scroll down to see the **Submit flow webhook URL** input field.

> For Inbox capabilities, go to your app in the Developer Hub, navigate to **Configure > Canvas Kit**, and open up the **For teammates** dropdown. Select where the app can be added within and scroll down to see the **Submit flow webhook URL** input field.


### Submit Request

The format of the request we send is similar to the Initialize request but contains the `current_canvas`, `input_values` and the `component_id`. This allows you to understand what component the request came from, see what the value of any input was, action anything in your codebase, and then respond knowing what canvas was previously shown beforehand.


```json
{
  "workspace_id": "abcd123",
  "admin": { /* Object: See link in table for the full model */ },
  "conversation": { /* Object: See link in table for the full model */ },
  "current_canvas": { /* Object: See link in table for the full model */ },
  "contact": { /* Object: See link in table for the full model */ },
  "input_values": { "<component_id>": "<Value entered in component>" }, //Can be more than one pair
  "component_id": "id-assigned-by-you"
}
```


```json
{
  "workspace_id": "abcd123",
  "component_id": "<component_id>",
  "context": { /* Object: See link in table for the full model */ },
  "current_canvas": { /* Object: See link in table for the full model */ },
  "input_values": { "<component_id>": "<Value entered in component>" }, //Can be more than one pair
  "user": { /* Object: See link in table for the full model */ }
}
```

| Attribute | Type | Capabilities | Description |
|  --- | --- | --- | --- |
| workspace_id | String |  Messenger   Inbox  | The workspace ID of the teammate. Attribute is `app_id` for V1.2 and below. |
| workspace_region | String |  Messenger   Inbox  | The Intercom hosted region that this app is located in. |
| admin | Object |  Inbox  | The Intercom teammate ([admin](https://developers.intercom.com/intercom-api-reference/reference/admin-model)) viewing the conversation. |
| component_id | String |  Messenger   Inbox  | The id of the component clicked by the teammate to trigger the request. |
| context | Object |  Messenger  | The [context](https://developers.intercom.com/canvas-kit-reference/reference/context) of where the app is added, where the user last visited, and information on the Messenger settings. |
| conversation | Object |  Inbox  | The [conversation](https://developers.intercom.com/intercom-api-reference/reference/conversation-model) where your app is being shown. |
| current_canvas | Object |  Messenger   Inbox  | The [current_canvas](https://developers.intercom.com/canvas-kit-reference/reference/current-canvas) the teammate can see. |
| customer | Object |  Inbox  | The [contact](https://developers.intercom.com/intercom-api-reference/reference/contacts-model) which is currently being viewed by the teammate in the conversation details panel. |
| input_values | Object |  Messenger   Inbox  | A list of key/value pairs of data, inputted by the teammate on the current canvas. |
| user | Object |  Messenger  | The [user](https://developers.intercom.com/intercom-api-reference/reference/user-model) who took the action. |


### Submit Response

We expect a [canvas object](https://developers.intercom.com/canvas-kit-reference/reference/canvas) in response to the request. This will **replace the previous canvas** that was visible until the app was interacted with.

You can optionally provide an [event object](/docs/references/preview/canvas-kit/responseobjects/event) with the attribute `type` given as `completed` to **tell us if the app has completed its purpose**. For example, an email collector app would be complete when the end-user submits their email address.

Apps in conversation details can also optionally **insert an app into the conversation reply**:

1. You respond with a [card_creation_options object](https://developers.intercom.com/canvas-kit-reference/reference/card-creation-options).
2. We send a request to the [initialize URL for Messenger capabilities](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/request-flows) with the  [card_creation_options object](https://developers.intercom.com/canvas-kit-reference/reference/card-creation-options) present.
3. You respond with a [canvas object](https://developers.intercom.com/canvas-kit-reference/reference/canvas) with the [components](/docs/references/preview/canvas-kit/responseobjects/content) you want to insert into the conversation reply.



```json
{
  "canvas": { /* A canvas object with content and components */ },
  "card_creation_options": { "key": "value" }, // Optional. Can be more than one pair
  "event": { "type": "completed" } // Optional. Recorded by Intercom.
}
```


```json
{
  "canvas": { /* A canvas object with content and components */ },
  "event": { "type": "completed" } // Optional. Recorded by Intercom.
}
```

## Configure  (Optional)

Teammates can optionally configure an app prior to sending it to the user. If you provide a URL to receive this request, it will trigger when a teammate:

- Adds your app into to a conversation reply   Messenger
- Adds your app into a Workflow   Messenger
- Adds your app into a Message   Messenger
- Adds your app on to the Messenger Home   Messenger
- Interacts with components which have an associated [submit action](https://developers.intercom.com/canvas-kit-reference/reference/submit-action)   Messenger


If you choose to set up the Configure webhook, it will be called before the Initialize webhook.

Where do I enter the URL which will handle the Configure requests?
Go to your app in the Developer Hub, navigate to **Configure > Canvas Kit**, and open up the **For users, leads and visitors** dropdown. Select where the app can be added within and scroll down to see the **Configure flow webhook URL** input field.

### Configure Request

The first request we send will allow you to know the workspace where this is happening, the admin who will be configuring the app, and additional context such as where this will be added once complete.

For subsequent requests whereby an admin has interacted with a component with a submit action, the request payload will contain the same details with `current_canvas`, `input_values` and the `component_id` also present. This allows you to understand what component the request came from, see what the value of any input was, action anything in your codebase, and then respond knowing what canvas was previously shown beforehand.


```json
{
  "workspace_id": "abcd123",
  "admin": { /* Object: See link in table for the full model */ },
  "context": { /* Object: See link in table for the full model */ }
}
```


```json
{
  "workspace_id": "abcd123",
  "admin": { /* Object: See link in table for the full model */ },
  "component_id": "<component_id>",
  "context": { /* Object: See link in table for the full model */ },
  "current_canvas": { /* Object: See link in table for the full model */ },
  "input_values": { "<component_id>": "<Value entered in component>" }, //Can be more than one pair
}
```

| Attribute | Type | Description |
|  --- | --- | --- |
| workspace_id | String | The workspace ID of the teammate. Attribute is `app_id` for V1.2 and below. |
| workspace_region | String | The Intercom hosted region that this app is located in. |
| component_id | String | The id of the component clicked by the teammate to trigger the request. |
| context | Object | The [context](https://developers.intercom.com/canvas-kit-reference/reference/context) of where the app is added, where the user last visited, and information on the Messenger settings. |
| current_canvas | Object | The [current_canvas](https://developers.intercom.com/canvas-kit-reference/reference/current-canvas) the teammate can see. |
| input_values | Object | A list of key/value pairs of data, inputted by the teammate on the current canvas. |


### Configure Response

We either expect:

- A [canvas object](https://developers.intercom.com/canvas-kit-reference/reference/canvas) which will **replace the previous canvas** that was visible until the teammate interacted with your app.
- A [results object](/docs/references/preview/canvas-kit/responseobjects/results) which will end the configuration and trigger the initialize request to be sent. There will be a [card_creation_options object](https://developers.intercom.com/canvas-kit-reference/reference/card-creation-options) in the payload showing your key-value pairs from the results object.



```json
{
  "canvas": { /* A canvas object with content and components */ }
}
```


```json
{
  "results": { "key": "value" } // Can be more than one pair
}
```

## Live Canvas  (Optional)

Canvases are static by default and require a new request to come through in order to update them. Live canvases however will make requests every time the card is viewed without any interaction needed, meaning the canvas can be kept up-to-date with no action from the user.

This works for every Messenger request that you can respond with a [canvas object](https://developers.intercom.com/canvas-kit-reference/reference/canvas) to. Instead of returning the [content object](https://developers.intercom.com/canvas-kit-reference/reference/content) within the canvas object, you should provide a `content_url`  attribute instead with the value being the URL you want us to send a POST request to when someone views the app.


```json
{
  "canvas": {
    "content_url": "https://messengerapp.com/get-content-here",
    "stored_data": { "key": "value" } //Optional. Can be more than one pair.
  }
}
```

### Live Canvas Request

We send a POST request to the given `content_url` every time someone views the app.


```json
{
  "workspace_id": "abcd123",
  "canvas": { /* Object: See link in table for the full model */ },
  "context": { /* Object: See link in table for the full model */ },
  "contact": { /* Object: See link in table for the full model */ }
}
```

| Attribute | Type | Description |
|  --- | --- | --- |
| workspace_id | String | The workspace ID of the teammate. Attribute is `app_id` for V1.2 and below. |
| workspace_region | String | The Intercom hosted region that this app is located in. |
| canvas | Object | The [current_canvas](/docs/references/preview/canvas-kit/requestobjects/current-canvas) the teammate can see. |
| context | Object | The [context](https://developers.intercom.com/canvas-kit-reference/reference/context) of where the app is added, where the user last visited, and information on the Messenger settings. |
| contact | Object | The [contact](https://developers.intercom.com/intercom-api-reference/reference/contacts-model) who viewed the card. |


### Live Canvas Response

We expect a [content object](https://developers.intercom.com/canvas-kit-reference/reference/content) back in response that contains the components you want to show.


```json
{
  "content": {
    "components" : [
      {
        "type": "text",
        "text": "This is a text component"
      }
    ]
  }
}
```

## Sheets  (Optional)

Sheets open an iframe within the entire Messenger window so that you can embed a completely custom UI. It's perfect for when you need to present your own UI to your users in a larger area and achieve more complicated workflows.

You can use both canvases and sheets within your app by:

- Opening a sheet when users interact with a component in a canvas.
- Returning to a canvas (either the old one or a new one) when they close the sheet.


Here is an example app that opens a sheet with the user clicks the "View property" button:

![Overview](/assets/2d76e02-overview.5a902aca221384606a1bfce332fa884a185f51cc6b3128981eed9e36af3d9774.71a4f21c.png)

There are two different types of requests we send for Sheets to work:

- Opening the Sheet   Messenger
- Submitting the Sheet   Messenger


### Open Sheet Request

When a user interacts with a component which has a [sheet action](/docs/references/preview/canvas-kit/actioncomponents/sheets-action) associated to it, a POST request will be made to the URL within the action.


```json
{
  "workspace_id": "abcd123",
  "component_id": "<component_id>",
  "context": { /* Object: See link in table for the full model */ },
  "current_canvas": { /* Object: See link in table for the full model */ },
  "input_values": { "<component_id>": "<Value entered in component>" }, //Can be more than one pair
  "user": { /* Encrypted Object: See link in table for the full model */ }
}
```


```ruby
# The user object that we send as part of the payload will be encrypted using AES256-CGM and then Base64 encoded.

intercom_data[:user] = encrypt({ test: "test" }.to_json)
encrypted_user = intercom_data[:user]
decoded_user = Base64.decode64(encrypted.encode('utf-8'))

secret = "<OAUTH_CLIENT_SECRET>"
key = Digest::SHA256.digest(secret)
decipher = ::OpenSSL::Cipher.new('aes-256-gcm')

GCM_IV_LENGTH = 12
GCM_AUTH_TAG_LENGTH = 16

decipher.decrypt
decipher.key = key
decipher.iv = decoded_user[0, GCM_IV_LENGTH]
decipher.auth_tag = decoded_user[(decoded_user.length - GCM_AUTH_TAG_LENGTH), GCM_AUTH_TAG_LENGTH]
ciphertext = decoded_user[GCM_IV_LENGTH, (decoded_user.length - GCM_AUTH_TAG_LENGTH - GCM_IV_LENGTH)]
decipher.update(ciphertext) + decipher.final
=> "{\"test\":\"test\"}"
```


```php
/* The user object that we send as part of the payload will be encrypted using AES256-CGM and then Base64 encoded. */

<?php
$encodedUser = "<USER-FROM-REQUEST>";

$decodedUser = base64_decode($encodedUser);

$secret = "<THIS-IS-A-SECRET>";
$key = openssl_digest($secret, 'sha256', TRUE);

$ivlen = 12;
$taglen = 16;

$iv = substr($decodedUser, 0, $ivlen);
$tag = substr($decodedUser, strlen($decodedUser) - $taglen, $taglen);

$cipherLen = strlen($decodedUser) - $taglen - $ivlen;
$cipherText = substr($decodedUser, $ivlen, $cipherLen);

$decryptedUser = openssl_decrypt($cipherText, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);
?>
```


```java
/* The user object that we send as part of the payload will be encrypted using AES256-CGM and then Base64 encoded. */

String encodedUser = "<USER-FROM-REQUEST>";
byte[] decodedUser = Base64.getDecoder().decode(encodedUser.replaceAll("\n", "").getBytes());
String secret = "<THIS-IS-A-SECRET>";

MessageDigest sha256MessageDigest = MessageDigest.getInstance("SHA-256");
sha256MessageDigest.update(secret.getBytes());
byte[] keyBytes = sha256MessageDigest.digest();

int ivlen = 12;
byte[] iv = Arrays.copyOfRange(decodedUser, 0, ivlen);
byte[] cipherText = Arrays.copyOfRange(decodedUser, ivlen, decodedUser.length);

Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding", "SunJCE");
GCMParameterSpec spec = new GCMParameterSpec(128, iv);
SecretKey key = new SecretKeySpec(keyBytes, "AES");
cipher.init(Cipher.DECRYPT_MODE, key, spec);

byte[] res = cipher.doFinal(cipherText);
String decryptedUser = new String(res);
```


```javascript
/* The user object that we send as part of the payload will be encrypted using AES256-CGM and then Base64 encoded. */

const clientsecret = 'your-client-secret';

// base64 decoding
const bData = Buffer.from(decoded, 'base64');

// convert data to buffers
const ivlen = 12;
const iv = bData.slice(0, ivlen);

const taglen = 16;
const tag = bData.slice(bData.length - taglen, bData.length);

const cipherLen = bData.length - taglen;
const cipherText = bData.slice(ivlen, cipherLen);

let hash = crypto.createHash('sha256').update(clientsecret);
let key = Buffer.from(hash.digest("binary"), "binary");//buffer from binary string.

// AES 256 GCM Mode
const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
decipher.setAuthTag(tag);

// Encrypt the given text
let decrypted = decipher.update(cipherText, 'binary', 'utf8');
decrypted += decipher.final('utf8');

console.log(decrypted);
```


```python
# The user object that we send as part of the payload will be encrypted using AES256-CGM and then Base64 encoded.

import base64
import json

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import (
    Cipher, algorithms, modes
)
from cryptography.hazmat.primitives.hashes import (
    Hash, SHA256
)

def decode_intercom_user(user_data: str) -> dict:
    """Decrpyt the user in the sheet POST request
      user_data is the encrypted user string"""

    # Decode Base64 encoded string
    data = base64.b64decode(user_data.encode('utf8'))
    client_secret = "Your client secret here".encode('utf8')

    # SHA256 digest of the client secret
    hasher = Hash(SHA256(), backend=default_backend())
    hasher.update(client_secret)
    key = hasher.finalize()

    iv_length = 12
    tag_length = 16

    # Extract IV and TAG
    iv = data[:iv_length]
    tag = data[len(data)-tag_length:]

    cipher_text = data[iv_length:len(data)-tag_length]

    # Decrypt with AES256-GCM
    cipher = Cipher(algorithms.AES(key), modes.GCM(iv, tag), backend=default_backend())

    decrypter = cipher.decryptor()
    text = decrypter.update(cipher_text)

    return json.loads(text)
```

| Attribute | Type | Description |
|  --- | --- | --- |
| workspace_id | String | The workspace ID of the teammate. Attribute is `app_id` for V1.2 and below. |
| workspace_region | String | The Intercom hosted region that this app is located in. |
| component_id | String | The id of the component clicked by the teammate to trigger the request. |
| context | Object | The [context](https://developers.intercom.com/canvas-kit-reference/reference/context) of where the app is added, where the user last visited, and information on the Messenger settings. |
| current_canvas | Object | The [current_canvas](https://developers.intercom.com/canvas-kit-reference/reference/current-canvas) the teammate can see. |
| input_values | Object | A list of key/value pairs of data, inputted by the teammate on the current canvas. |
| user | Object | The [user](https://developers.intercom.com/intercom-api-reference/v1.4/reference/user-model) who took the action. **This is encrypted and should be decrypted** to verify the request comes from a legitimate Intercom user. |


### Open Sheet Response

You send your HTML page that will be embedded within the Messenger as the response. This should contain a script which loads the Messenger Sheet Library script so you can use methods to see the title of the Sheet, close the Sheet, or submit the Sheet.

You will also need to ensure the Content Security Policy (CSP) header is sent by both the website being loaded in the Sheet and the website where the Sheet was opened from.

CSP Configuration Steps
**If the website that hosts the Intercom Messenger sends the CSP header** - `intercom-sheets.com` needs to be added to the [frame-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src) directive of the CSP header.

> **If the website that hosts the Intercom Messenger does not send the CSP header** - no action is needed.
**For the website loaded inside the Sheet** - as your Sheet is being loaded as an `iframe` inside the `<https://intercom-sheets.com`> domain with `child-src: https` security policy, you must follow these rules:
- It must be served via HTTPS and the sheet URL must use `<https://`> protocol (i.e. no redirects).
- It must not send the `X-Frame-Options` header.
- If the page sends the CSP header, the [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) directive must not be included. This allows the sheet to be loaded within Messenger host pages in any domain.
- If the page sends the CSP header, add `<https://js.intercomcdn.com/`> to the [script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) CSP directive. This allows the Messenger Sheet Library script to load inside the sheet.




```html
<!DOCTYPE html>
<html>
<head>
  <title>Sheet 1</title>
  <!-- Adding the Messenger Sheet Library -->
  <script src="https://s3.amazonaws.com/intercom-sheets.com/messenger-sheet-library.latest.js"></script>
</head>
<body>
  <button id="done">Done</button>

  <!-- Example of using a Messenger Sheet Library method -->
  <script>
    const done = document.querySelector('#done');
    done.addEventListener('click', () => {
      INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet({ super: "secret" });
    });
  </script>
</body>
</html>
```


```javascript
/* Sets the `title` of the sheet in the Messenger. The Messenger will call this method automatically when the script loads. This will default to `document.title` if not provided. */

INTERCOM_MESSENGER_SHEET_LIBRARY.setTitle(<Insert Title Here>)
```


```javascript
/* Closes the sheet and triggers a POST request to be sent to the Submit Sheet URL so you are aware of the actions end users have taken in the sheet and can update the canvas where the sheet was opened from. See more about the request payload and expected responses in the Submit Sheet sections below. */

INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet({<Insert Key-Value Pairs Here>})
```


```javascript
/* Closes the sheet immediately. The Messenger will not be aware of any actions the end user may have taken in the sheet and you will not be able to update the canvas where the sheet was opened from. */

INTERCOM_MESSENGER_SHEET_LIBRARY.closeSheet()
```

### Submit Sheet Request

This allows you to both close the Sheet and collect information on the actions taken by the user within the Sheet.  For the request to be sent, you must call the `INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet({<Insert Key-Value Pairs Here>})` method and insert the key-value pairs of data that you want to collect.

We send you a POST request which will contain contextual data alongside an object containing the canvas which originally opened the sheet (`current_canvas`) and the key-value pairs you gave in the method (`sheet_values`).

Where do I enter the URL which will handle the Submit Sheet requests?
Go to your app in the Developer Hub, navigate to **Configure > Canvas Kit**, and open up the **For users, leads and visitors** dropdown. Select where the app can be added within and scroll down to see the **Sheets flow webhook URL** input field.


```json
{
  "workspace_id": "abcd123",
  "context": { /* Object: See link in table for the full model */ },
  "current_canvas": { /* Object: See link in table for the full model */ },
  "sheet_values": { "key": "value" }, //Can be more than one pair
  "user": { /* Object: See link in table for the full model */ }
}
```

| Attribute | Type | Description |
|  --- | --- | --- |
| workspace_id | String | The workspace ID of the teammate. Attribute is `app_id` for V1.2 and below. |
| workspace_region | String | The Intercom hosted region that this app is located in. |
| context | Object | The [context](https://developers.intercom.com/canvas-kit-reference/reference/context) of where the app is added, where the user last visited, and information on the Messenger settings. |
| current_canvas | Object | The [current_canvas](https://developers.intercom.com/canvas-kit-reference/reference/current-canvas) the teammate can see. |
| sheet_values | Object | Key-value pairs which were given within the Submit Sheet method. |
| user | Object | The [user](https://developers.intercom.com/intercom-api-reference/v1.4/reference/user-model) who took the action. |


### Submit Sheet Response

We expect a [canvas object](https://developers.intercom.com/canvas-kit-reference/reference/canvas) in response to the request. This will **replace the previous canvas** that was visible until the sheet was opened.

You can optionally provide an [event object](https://developers.intercom.com/canvas-kit-reference/reference/event) with the attribute `type` given as `completed` to tell us if the app has completed its purpose. For example, an email collector app would be complete when the end-user submits their email address.


```json
{
  "canvas": { /* A canvas object with content and components */ },
  "event": { "type": "completed" } // Optional. Recorded by Intercom.
}
```

## Signing Notifications

Each Canvas Kit request is signed by Intercom via an `X-Body-Signature` header. We do this so that you can check that each request is actually sent by Intercom by decoding the signature.

The value is computed by creating a signature using the body of the JSON request and your app's OAuth `client_secret` value, which you can find on the Basic Info page of your app.

It is a hexadecimal (64-byte) value that is computed using the HMAC-SHA256 algorithm as defined in RFC2104.


```bash
-H X-Body-Signature: 21ff2e149e0fdcac6f947740f6177f6434bda921
```

## What IP addresses does Intercom send Canvas Kit requests from?

You may need to allowlist the following Intercom IP addresses (which we send Canvas Kit and webhook requests from) in order to accept Intercom requests on your side. These are as follows:

**USA**
`34.231.68.152`
`34.197.76.213`
`35.171.78.91`
`35.169.138.21`
`52.70.27.159`
`52.44.63.161`

**Europe**
`54.217.125.63`
`54.246.173.113`
`54.216.9.3`

**Australia**
`52.63.36.185`
`3.104.68.152`
`52.64.2.165`