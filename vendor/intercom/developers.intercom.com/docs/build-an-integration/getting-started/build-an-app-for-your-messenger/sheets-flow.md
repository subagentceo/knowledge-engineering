# Set up sheets flows

## Overview

Sheets give you the ability to perform much more complicated workflows within the context of a Messenger App. In effect, a sheet is a full-bleed iframe takeover of the Messenger. Sheets give developers the ability to inject a completely custom UI into the Messenger.

![property sheets](/assets/ba8f532-property-sheets.5a902aca221384606a1bfce332fa884a185f51cc6b3128981eed9e36af3d9774.71a4f21c.png)

## Example Sheets Flow

![Sheets Flow](/assets/f0cb540-sheets_flow.843ac00e0f1fd9f120260a1d45ac88ec74549cb1ccf9ef3223d4c62bc8c6c94b.71a4f21c.png)

## Opening a sheet

This request flow is used when an end-user triggers an action that opens a **sheet**. Sheets can only be opened from the [Sheets Action](/docs/references/preview/canvas-kit/actioncomponents/sheets-action). When a sheet is opened, the Messenger will make a HTTP POST request to the URL defined in the action.

When you receive that POST you will be able to send your HTML page in the response to create your customized UI. This page will be embedded in the sheet. To allow this to happen the appropriate `X-Frame-Options` header should also be returned in the response. The page itself should include the [Messenger Sheet Library](#messenger-sheet-library).

Decrypt the user object
The open sheet request is not signed and thus has no X-Body-Signature header. Instead, you are urged to **decrypt the user object in order to verify that this request comes from a legitimate Intercom user**. There's an example below of how to achieve this in Ruby, PHP, Java and Node.js.

## Open-sheet Flow

When a sheet is opened, the server will receive a request body containing data about the canvas and the user, sent as a single stringified JSON object under the key `intercom_data`.

When you parse the object, it will look like the below. However, `user` will be an encoded string and is not human-readable.

```json
{
  "workspace_id": /* string id_code of the app using the card */,
  "current_canvas": /* Canvas object */,
  "component_id": /* component_id, component which triggered action */,
  "input_values": {
    "component_id": /* value entered in component */,
    ...
  },
  "user": /* Encrypted user object of end-user who triggered action */,
  "context": /* Context object */
}
```

You will need to decrypt the `user` object using the Client Secret found in your Developer Hub. Here are code samples as a starting point.

```ruby
# As defined by the `open-sheet` flow, the user object that we send as part of the payload to the `sheet` will be encrypted.

# The user is encrypted using AES256-CGM and then Base64 encoded.

# The below example is in Ruby:

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
/* As defined by the `open-sheet` flow, the user object that we send as part of the payload to the `sheet` will be encrypted.

The user is encrypted using AES256-CGM and then Base64 encoded.

The below example is in PHP: */

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
/* As defined by the `open-sheet` flow, the user object that we send as part of the payload to the `sheet` will be encrypted.

The user is encrypted using AES256-CGM and then Base64 encoded.

The below example is in Java: */

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
/* As defined by the `open-sheet` flow, the user object that we send as part of the payload to the `sheet` will be encrypted.

The user is encrypted using AES256-CGM and then Base64 encoded.

The below example is in Node.js: */

const secret_key = 'your-client-secret';

// base64 decoding
const bData = Buffer.from(decoded, 'base64');

// convert data to buffers
const ivlen = 12;
const iv = bData.slice(0, ivlen);

const taglen = 16;
const tag = bData.slice(bData.length - taglen, bData.length);

const cipherLen = bData.length - taglen;
const cipherText = bData.slice(ivlen, cipherLen);

let hash = crypto.createHash('sha256').update(secret_key);
let key = Buffer.from(hash.digest("binary"), "binary");//buffer from binary string.

// AES 256 GCM Mode
const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
decipher.setAuthTag(tag);

// encrypt the given text
let decrypted = decipher.update(cipherText, 'binary', 'utf8');
decrypted += decipher.final('utf8');

console.log(decrypted);
```

## The sheet

Here's an example of what your sheet might look like:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Sheet 1</title>
  <script src="https://s3.amazonaws.com/intercom-sheets.com/messenger-sheet-library.latest.js"></script>
</head>
<body>
  <button id="done">Done</button>

  <script>
    const done = document.querySelector('#done');
    done.addEventListener('click', () => {
      INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet({ super: "secret" });
    });
  </script>
</body>
</html>
```

## Closing a sheet

There are 2 ways to close a sheet:

1. The user closes the sheet via the Messenger chrome (i.e. the close button in the Messenger).
2. The sheet is programmatically closed via the [Messenger sheet library](#messenger-sheet-library) which triggers the [submit-sheet HTTP request flow](#submitting-a-sheet)


Programmatic closing can be done by calling the `submitSheet()` method.

`INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet({ super: "secret" });`

## Submitting a sheet

Once an end user has completed their interaction with your **sheet**, you may want to collect information on the actions they have taken. The `submit-sheet` flow allows you to both close the **sheet** and collect some information from the user.

### App Completion Tracking (optional)

App completion events will help you understand how your customers are using your app and will add more value to it, making it possible for bots to know when to continue with their flows.

You can optionally add an [event object](/docs/references/preview/canvas-kit/responseobjects/event) to your submit-sheet flow response to tell us if your messenger app has `completed` its purpose. For example, an email collector app completes when the end user submits their email address.

## Submit-sheet Flow

```json
# When a **Sheet** is submitted, Intercom POSTs a request to the messenger-app's submit-sheet URL with the following payload.

{
  "workspace_id": /* string id_code of the app using the card */,
  "current_canvas": /* Canvas object */,
  "sheet_values": {
    "key": /* value */,
    ...
  },
  "user": /* User object of end-user who triggered action */,
  "context": /* Context object */
}
```

```json
{
  "canvas": /* Canvas object */,
  "event": { "type": "completed" } //App Completion Tracking (optional)
}

# The app completion event is recorded by Intercom.
```

## Messenger Sheet Library

This library allows the sheet and the Messenger to communicate with one another.

Including this in all pages embedded in a sheet enhances the user experience and allows the developer to tell the Messenger when to submit the sheet, which will trigger the [submit-sheet](#submit-sheet-flow) flow (allowing the canvas for the card that triggered the **sheet** to be updated).

To include the library, simply include the following code in your pages:

`<script src="https://js.intercomcdn.com/messenger-sheet-library.latest.js" />`

This script will expose a global reference to the Messenger sheet Library called: `INTERCOM_MESSENGER_SHEET_LIBRARY`.

## Available Methods

```javascript
# Closes the sheet immediately. The Messenger will not be aware of any actions the end-user may have taken in the sheet and the card that triggered the sheet will not be updated.

INTERCOM_MESSENGER_SHEET_LIBRARY.closeSheet()
```

```javascript
# Closes the sheet and triggers a request to the submit sheet webhook (see Submit-sheet flow). This allows the third-party developer to perform any side-effects and update the card that triggered the sheet if required.

INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet(sheetValues)
```

```javascript
# Set the `title` of the sheet in the Messenger. Title is an optional param which will default to `document.title`. The Messenger will call this method automatically when the script loads.

INTERCOM_MESSENGER_SHEET_LIBRARY.setTitle(title)
```

## Content Security Policy (CSP)

Sheets are loaded using an `iframe` within the Intercom Messenger. Most modern browsers restrict `iframes` via CSP headers to mitigate security concerns. To abstract sheet users from sheet developers, the Messenger loads a proxy iframe in the `intercom-sheets.com` domain, and that then loads the sheet.

To allow sheets to open in the Messenger, proper CSP headers have to be sent both by the website being loaded in the sheet itself and the website that hosts the Messenger in which the sheet will be opened.

## In host website

If the website that hosts the Intercom Messenger sends CSP header, `intercom-sheets.com` needs to be added to the [frame-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src) directive of the CSP header.

This allows the Messenger in the host website to load the sheet from any app provider.

No CSP header?
If the host website doesn't send CSP header already, no action is needed.

## In sheet website

The sheet page is being loaded as an `iframe` inside domain `https://intercom-sheets.com` with `child-src: https` security policy.

To enable sheet page and its content to be loaded in Messenger, it must follow these rules:

- **It must be served via HTTPS and the sheet URL must use https:// protocol (i.e. no redirect)**
- It must not send `X-Frame-Options` header.
- If sheet page sends CSP header, [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) directive must not be included. This allows the sheet to be loaded within Messenger host pages in any domain.
- If sheet page sends CSP header, add `https://js.intercomcdn.com/` to [script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) CSP directive. This allows the Messenger sheet Library script to load inside the sheet.


This will allow your sheet to be loaded by Messenger in any domain Messenger customers use, and at the same time protect your sheet from various attacks.