# Public Key Client Validation Quickstart

> \[!NOTE]
>
> Public Key Client Validation is available to Twilio Enterprise Edition and Twilio Security Edition customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

This guide will walk you through the steps of implementing Public Key Client Validation. We include sample cURL commands and HTTP requests, and then at the end, we'll detail the steps in Java.

## Public key client validation quickstart

To get started quickly, you can follow the Java example at the bottom of the page. It shows how Client Validation can be implemented, along with links to the Twilio Java SDK that supports this feature.

## Steps to send a Request

1. **Generate an RSA Key Pair:** Create a valid key pair. (This only has to be done once.)
2. **Submit the Public Key:** Submit the public key to Twilio via the Credentials Endpoint. (This is a one-time requirement as well.)
3. **Hash the Canonical Request:** Every outgoing request needs to be hashed and signed. (This functionality is implemented in the Java SDK and can be seen below.)
4. **Generate JWT:** Once the hash is created, it needs to be embedded in the JWT payload and signed with the private key. (This is also handled by the Java SDK.)
5. **Attach JWT to the request header:** The last step is to add the JWT to the request header.

## 1. Generate an RSA Keypair

A private key is used to sign your requests. It is verified by the public key which you provide to Twilio.

**Note**: When you generate the private key, be sure to save and protect it as this is the only means to verify your application's identity.

We recommend generating the RSA key pair using the [OpenSSL](https://www.openssl.org/) toolkit.

### For Windows Systems

Install and use [Cygwin](https://www.cygwin.com/) to run the OpenSSL RSA keypair commands below.

### For Mac and Linux/Unix-based Systems

You can run the OpenSSL commands to generate an RSA Keypair.

#### Generate a Private Key

```bash
openssl genrsa -aes256 -out private_key.pem 2048
```

**Note**: Twilio will only accept keys that have a bit length of 2048 with an exponent of 65537.

#### Generating a Public Key

```bash
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

Example Public Key Format
If properly generated, the RSA public key should look like the example public key below:

```bash
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlRgaHOdjxFVceFucQXkA
0tTT6tY6YDlkWgThv4FLjtbBqzfRcRUkaTqpSJaGgBsTgXeBdLK0DgneTRmPwZzw
...
sD93r4H6ti519kM+u87I6On00S3k4r6pGsWnBCf+1RmJps6xfsDflPIAstyZEpa9
xQIDAQAB
-----END PUBLIC KEY-----
```

Be sure to include the full header and footer when submitting the key:

* '-----BEGIN PUBLIC KEY-----' AND
* '-----END PUBLIC KEY-----'

You can see your Public Key with this command:

```bash
cat public_key.pem
```

## 2. Submit the Public Key to Twilio

Sample Requests cURL

```bash
curl -X POST "https://accounts.twilio.com/v1/Credentials/PublicKeys/" \
-H "Authorization: Basic <token>" \
-F "PublicKey=-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BA….9xQIDAQAB-----END PUBLIC KEY-----" \
-F "FriendlyName=Client Validation"
```

**Note**: Line breaks in the PEM format of the key need to be removed when making the cURL request.

Sample Response

```bash
{
  "date_updated": "2016-10-25T19:54:49Z",
  "friendly_name": "Client Validation",
  "account_sid": "AC171b8eb…...e737e0ee2cb99ee",
  "url": "https://accounts.twilio.com/v1/Credentials/PublicKeys/CR934061….ed833471f596a5b4",
  "sid": "CR934061….ed833471f596a5b4",
  "date_created": "2016-10-25T19:54:49Z"
}
```

## 3. Hash the Canonical Request

The following section describes how the request needs to be canonicalized, hashed, and attached to the request.

**Note**: The Java SDK implements this functionality and will do the work for you. An end-to-end example is at the bottom of this page.

This approach is loosely based on the approach Amazon is using to [sign AWS API requests](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html).

### Canonical request pseudocode

```bash
Canonical HTTP Method + '\n' +
  Canonical URI + '\n' +
  Canonical Query String + '\n' +
  Canonical Headers + '\n' +
  Signed Headers + '\n' +
  HexEncode(Hash(Request Body))
```

### Hashing Example

#### Example HTTP Request

```bash
POST /2010-04-01/Accounts/AC00000000000000000000000000000000
HTTP/1.1
Host: api.twilio.com
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Content-Length: 33
Authorization: Basic QUMwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDpmb29iYXI=

FriendlyName=my new friendly name
```

#### Canonicalize the HTTP Method

The HTTP method is canonicalized by doing the following operations:

1. Uppercase
2. Trim

In the Example Request, this results in:

```bash
POST
```

#### Canonicalize the Resource Path

To canonicalize the resource path:

1. Remove redundant path elements, for example:
   * '/foobar/./barfoo' becomes '/foobar/barfoo' AND
   * '/foobar/../barfoo' becomes '/barfoo'
2. URL-encode the remaining path using the UTF-8 character set in accordance with [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt) with the following caveats:
   * ' ' (space) should always be '%20'
   * '\*' (asterisk) should always be '%2A'
   * '%7E' should always be '\~' (tilde)
3. Empty string path should always result in '/'

In the Example Request, this results in:

```bash
/2010-04-01/Accounts/AC00000000000000000000000000000000
```

#### Canonicalize the Query String

The query-string is canonicalized by the following operations:

1. Remove the query-string from the URI (not-including the '?')
2. Construct a collection of key/value pairs by splitting the query string on '&'
   ASCII Sort the combined "key=value" strings (not just the 'keys')
3. URL encode each key and value following the Resource Path ([RFC 3986](https://www.ietf.org/rfc/rfc3986.txt)) with our caveats from above
4. Concatenate each key/value pair like this: \{key}=\{value}
   * If the key has no accompanying value, should result in '\{key}='
     Join all key/value pairs with a '&' in between

In the example request, this results in an empty string.

```bash
/2010-04-01/Accounts/AC00000000000000000000000000000000
```

If a request contains the following query parameter,

```bash
?from=4151234567&to=4157654321&message=Thanks for your order
```

The canonicalized query string would be the following:

```bash
from=4151234567&message=Thanks%20for%20your%20order%20&to=4157654321
```

#### Canonicalize the Headers

The headers are canonicalized by the following operations:

1. Filter the complete list of headers against the 'hrh' (hashed request headers) value in the enclosing JWT
2. Lower-case and trim each header key
3. Trim each header value and reduce continuous whitespace into a since space
4. Sort header values that correspond to the same key
5. Combine the key/values like this: "\{key}:\{values}\n"
6. ASCII sort
7. Note that because each header line is terminated with a '\n'. When the entire canonical request is combined, there should be a blank line between the canonical-headers and the canonical-hashed-headers

In the Example Request, this results in:

```bash
authorization:Basic QUMwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDpmb29iYXI=
host:api.twilio.com
```

#### Canonicalize the Hashed Headers

The hashed-headers are canonicalized by the following operations:

1. Split on ';' (semi-colon)
2. Lowercase and trim
3. 1ASCII Sort
4. Join with ';" (semi-colon)

In the Example Request assume they want to include 'Host' and 'Authorization' in the list of hashed-headers, this results in:

```bash
authorization;host
```

#### Encode the Request Body

If the request body is empty, omit hashing it.

To encode the request body:

1. Hash the request body using SHA-256
2. Hex-encode the resulting hash

In the Example Request, this results in:

```bash
b8e20591615abc52293f088c87be6df8e9b7b40c3da573f134c9132add851e2d
```

### Final Canonical Request

In the example below, the first blank line is due to not having any query parameters. The second blank line is due to every canonicalized header being terminated with a '\n'.

```bash
POST
/2010-04-01/Accounts/AC00000000000000000000000000000000

authorization:Basic QUMwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDpmb29iYXI=
host:api.twilio.com

authorization;host
b8e20591615abc52293f088c87be6df8e9b7b40c3da573f134c9132add851e2d
```

### Canonical Request Hash

When the final canonical request string is created it must be hashed in a similar manner to the request body.

To encode the canonical request:

1. Hash the request body using SHA-256
2. Hex-encode the resulting hash

In the Example Request, this results in:

```bash
245eece1e638d9b0081ca0621183cd417fc97a1818bd822aa26697f9aa70c792
```

## 4. Generate the JWT

Once you have created the hash, you can generate a JWT with the hash embedded.

Every JWT assertion is composed of three components, the *header*, the *payload*, and the *signature*.

* The header specifies the algorithm used for the JWT signature.
* The payload contains the hash and additional metadata
* The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

To construct the JWT assertion, these three components must be base64 encoded and concatenated using a "." separator:

```bash
<base64URLencoded header>.<base64URLencoded claims>.<base64URLencoded signature>
```

**Note**: For additional details on JWT go to: [https://jwt.io/introduction/](https://jwt.io/introduction/)

Let's have a closer look at the different parts of the JWT Assertion:

### Header

The header consists of four parts: the content type, the type of the token, the hashing algorithm being used, and the reference to the public key Twilio should use to validate the message.

| Field | Value(s)        | Required            | Description                                                                                                                                                                                |
| :---- | :-------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cty   | twilio-pkrv;v=1 | yes                 | ContentType = Twilio Public Key Request Validation - Version 1                                                                                                                             |
| typ   | JWT             | No (Default: 'JWT') | Media Type = JSON Web Token, other values rejected                                                                                                                                         |
| alg   | RS256 or PS256  | yes                 | One of RS256 or PS256. These are the only algorithms supported at the moment. RS256 = RSASSA-PKCS-v1\_5 using SHA-256 hash algorithm. PS256 = RSASSA-PSS using SHA-SHA 256 hash algorithm. |
| kid   | CredentialSid   | yes                 | Key ID = Identifier of the public key credential associated with the private key used to sign the JWT                                                                                      |

Example header:

```bash
{
  "cty": "twilio-pkrv;v=1",
  "typ": "JWT",
  "alg": "RS256",
  "kid": "CR00000000000000000000000000000000"
}
```

### Payload

The second part of the token is the payload, which contains the claims. Claims are statements about an entity and additional metadata. For the issuer field, you can create a Main type [API key](/docs/iam/api-keys/key-resource-v2010) from the [Twilio Console](/docs/iam/api-keys/keys-in-console) or with the [REST API](/docs/iam/api-keys/key-resource-v1).

| Field | Value(s)                | Required | Description                                                                                                                                                   |
| :---- | :---------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| iss   | APIKeySid               | yes      | Issuer = APIKey Sid used to match against request credentials                                                                                                 |
| sub   | AccountSid              | yes      | Subject = AccountSid                                                                                                                                          |
| exp   | expiration time         | yes      | Token Expiry Time: token received after exp +- clock skew will be rejected. **Max exp - nbf is 300 seconds**                                                  |
| nbf   | not before time         | No       | (Default: 'now') Not Before Time                                                                                                                              |
| hrh   | list of headers to hash | yes      | A ';' (semicolon) delimited list of *lowercase* headers to include in the request hash calculation. At a minimum, you must include 'Host' and 'Authorization' |
| rqh   | request hash            | yes      | Please refer to '3. Create a Hash of the Canonical Request' above.                                                                                            |

Example Payload:

```bash
{
  "iss": "SK00000000000000000000000000000000",
  "sub": "AC00000000000000000000000000000000",
  "exp": 1471827354,
  "hrh": "authorization;host",
  "rqh": "245eece1e638d9b0081ca0621183cd417fc97a1818bd822aa26697f9aa70c792"
}
```

### Signature

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

Signature Creation Example

```bash
RS256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

### Public Key

To validate the signature Twilio needs the public key. This public key needs to be uploaded to Twilio.
The public key must be:

* Algorithm: RSA
* Modulus::bitLength: 2048
* Format: X.509

Public key to successfully validate the Example JWT (below):

```bash
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAum6dAjx7jM1GTYOcIo1x
b+KvO/FsKUMd4xLiDeKNd5DZ1sVKoJSH1oMGRtaVnN4Uzo1h5rUDGrB73hY9PRAK
uGEGZotiVR7Zmbq7l+NuR+pR3KhYJagzLQ+K91GkBsJM0f4geK1qwXfHYmA11O19
8eNAMS3sRwNnVlyPwtvIamwN8iDxEr+GvT7OIGZxHOCYRXmDAueDDLZqSF5j/qdw
vwGSHlXh/sr91o7fy/thWxwzM9Dp+h95OiML3cH/edt68NNLD5zxnHEZxx1K/w/Y
/g6KGo7b0ehR241pV0cmqFm0ebF0m+950F7iCI+qha97kHpBtBSAzyyHOhy2d4v7
IQIDAQAB
-----END PUBLIC KEY-----
```

### Private Key

The request has to be signed with a private key. The private key must match the public key uploaded to Twilio.

There are no limitations on the private key (as opposed to the public key, enumerated above) other than it needs to match the public key. It can be either PKCS#1 or PKCS#8 (whichever the signing library supports).

The private key used to sign the Example JWT:

```bash
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAum6dAjx7jM1GTYOcIo1xb+KvO/FsKUMd4xLiDeKNd5DZ1sVK
oJSH1oMGRtaVnN4Uzo1h5rUDGrB73hY9PRAKuGEGZotiVR7Zmbq7l+NuR+pR3KhY
JagzLQ+K91GkBsJM0f4geK1qwXfHYmA11O198eNAMS3sRwNnVlyPwtvIamwN8iDx
Er+GvT7OIGZxHOCYRXmDAueDDLZqSF5j/qdwvwGSHlXh/sr91o7fy/thWxwzM9Dp
+h95OiML3cH/edt68NNLD5zxnHEZxx1K/w/Y/g6KGo7b0ehR241pV0cmqFm0ebF0
m+950F7iCI+qha97kHpBtBSAzyyHOhy2d4v7IQIDAQABAoIBAQCIFvbGCyClR7Nq
Igh3sIh+BBumxjUOadAHUmFxgU+DWFmsTZiMX+BI1pxeWYYdXIATx2EP6FK7yNii
5dkOGge5UBo8AMNnH334mjcWSQ7XsFTRnpG5625wFkh7AT2bMXqiT7+kV/L2B1mk
lla1eCfXyuuw+rTfobxtbmQC+izygW6pri4KbmIBxhlTMPcgns3dTADL0eoH0po6
u2mKHBaLP9GZpxR+pbZE0y4e6qDJt4M3nwUpm1zDkJGVuyAQebTbMxtsP4VHQ/0t
wKKi73bnD62CanRf+bqt+FJWEIPI6yOBVbxcvLVLStRRkOVwugZlP0seDOlLrWVo
YnwIReABAoGBAOfUlV9xgTwYdokaZKVOh8uJewAc4qqE1e3dh4epLm9jLiUul2bQ
dFxL/dtAur76Th9kpRbbNQizGKKKjDOD4r0qF+aNbsRpNhx9OqaTaK40CH3g6zlc
i8HmW5kjoRTJTBoFtp+8U6OdeiksUZ1Xbm5yR8395Wm7Y4p4LmCOGIcRAoGBAM3e
YB5tNM6U0FgRFRc6R8UMrgo4SLXNlqvzMyKC/eHPziJP2PKAvBAasqZwEISlK4D6
T6Fqbb6eFh0XNYJEQq/3JkuC5HNfBIMZ81X5gxGq/pMQPiPbr6QfY3hzgUljKyky
xkYiQdcu9E6KiMJXWpz2GNmctlQT1b0cpQW3GNMRAoGARGN00RwFuLmqthVAHXfG
HWfoDgd3YkAfb7ULFxz0Ys2KPlO5PA5AVT3hnD1DGbVzOFWTUePGiFN07/YZF9VP
HOh+9ndAdtZmrQ7QL3WKyuD0pFWmblx7qe6PlORqz1v2hDKtRf/jWH/LGrxFMzoo
jJJP1leQxpkN6zo6zCb+21ECgYAsoYk1D3fjUV/Zt9parsfgcF9K1+jrgSapIJB1
avCfg+2sgqMF7+LVmvQgIStzlltYGuwokmo4aQ1iQSXYl/PdMjebJ0Vfvbm8smOO
wAkqS2fleh/+piHt8uAdvOzKfDVfOSLDEao0fHl6jY4Yk9eRL8kzZEYi9CniVdNw
6cD4AQKBgQDPluvF2FmQiEPR0to4rcpfa3IznO2uC8V7fjSUBAZQ38zQhFbsL+DR
7SbJbloHv1K5HzcAwkNuKQJeJ7WKGjGgtm4ScuLJbkTWQF2BJTcZA6cuqQ0RVRq4
LGJ+GQyvLu2JUtZj+gL9Aab0mbB/pL/zw3vzg9bdYgVtN0rA2nF7jQ==
-----END RSA PRIVATE KEY-----
```

### Example JWT

The following JWT is composed of the example blocks from above. The JWT is signed with the private key above. This JWT can be validated with the public key above.

```bash
eyJjdHkiOiJ0d2lsaW8tcGtydjt2PTEiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkNSMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAifQ.eyJpc3MiOiJTSzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwic3ViIjoiQUMwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImV4cCI6MTQ3MTgyNzM1NCwiaHJoIjoiYXV0aG9yaXphdGlvbjtob3N0IiwicnFoIjoiMjQ1ZWVjZTFlNjM4ZDliMDA4MWNhMDYyMTE4M2NkNDE3ZmM5N2ExODE4YmQ4MjJhYTI2Njk3ZjlhYTcwYzc5MiJ9.a8Z-NXPEf8FrfEpxYBF8kIdn_1VAoa4H6t_X_CmtT7YksKkLMsQl6X00Hx0zEItgu64Z-qeaANxmwme6Y7nRRVz2AV8ZPTv5sWPhXOHVevyEDf2QfPpteDd0gpoPA4KjaklJtnNR8iSAd68DBaUvVE6bnAsop6dM4vowYNOMCe4PUe_W8AXu6iIzHmQxm5AVatyPoRY4dR-Il1tswbUr5FlVGzJJsw7JLNd46FYp2gIfhDM52cgBMeH5qNQw9inUm-BUybT1rB-kB1UCNq_3WenGoTGZsJ32QSBXAS9pbjOYNHIrylR51GV2foxqcOpsgIBFt_udnWlsqkezRun7TQ
```

## 5. Attach JWT to the Request Header

The JWT needs to be added to the request via the **Twilio-Client-Validation** header.

## Client Validation Java Example

The functionality is currently only supported in the latest Java SDK.

The following example covers all five steps of making a successful Client Validation request. This sample is also available on [GitHub](https://github.com/twilio/twilio-java/blob/main/src/main/java/com/twilio/example/ValidationExample.java).

```bash
package com.twilio.example;


import com.twilio.http.TwilioRestClient;
import com.twilio.http.ValidationClient;
import com.twilio.rest.accounts.v1.credential.PublicKey;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.NewSigningKey;
import com.twilio.twiml.TwiMLException;
import com.twilio.type.PhoneNumber;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;

import io.jsonwebtoken.SignatureAlgorithm;

public class ValidationExample {

    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    /**
     * Example Twilio usage.
     *
     * @param args command line args
     * @throws TwiMLException if unable to generate TwiML
     */
    public static void main(String[] args) throws Exception {
        // Generate public/private key pair
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair pair = keyGen.generateKeyPair();
        java.security.PublicKey pk = pair.getPublic();

        // Use the default rest client
        TwilioRestClient client =
            new TwilioRestClient.Builder(ACCOUNT_SID, AUTH_TOKEN)
                    .build();

        // Create a public key and signing key using the default client
        PublicKey key = PublicKey.creator(
            Base64.getEncoder().encodeToString(pk.getEncoded())
        ).setFriendlyName("Public Key").create(client);

        NewSigningKey signingKey = NewSigningKey.creator().create(client);

        // Switch to validation client as the default client
        TwilioRestClient validationClient = new TwilioRestClient.Builder(signingKey.getSid(), signingKey.getSecret())
                .accountSid(ACCOUNT_SID)
                // Validation client supports RS256 or PS256 algorithm. The default is RS256.
                .httpClient(new ValidationClient(ACCOUNT_SID, key.getSid(), signingKey.getSid(), pair.getPrivate(), SignatureAlgorithm.PS256))
                .build();

        // Make REST API requests
        Iterable<Message> messages = Message.reader().read(validationClient);
        for (Message message : messages) {
            System.out.println(message.getBody());
        }

        Message message = Message.creator(
            new PhoneNumber("+1XXXXXXXXXX"),
            new PhoneNumber("+1XXXXXXXXXX"),
            "Public Key Client Validation Test"
        ).create(validationClient);
        System.out.println(message.getSid());
    }
}
```

**Notes**:

You can't manage Accounts (for example, creating subaccounts) or API keys with Standard API keys. For more information about managing API keys and Accounts after enforcing Public Key Client Validation, see [Account and Key Management with API Keys](/docs/iam/pkcv/account-and-key-management-api-keys).

It may take a few minutes after Enforcing Public Key Client Validation from [Settings](https://www.twilio.com/console/project/settings) for it to take effect.
