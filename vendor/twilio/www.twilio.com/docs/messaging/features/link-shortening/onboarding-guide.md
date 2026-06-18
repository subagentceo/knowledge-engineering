# Link Shortening Onboarding Guide

## Prerequisites

* You need to own a domain or subdomain that is only used for Link Shortening with Twilio.
  * You must be able to verify the domain with Twilio. This requires changing the Domain Name System (DNS) records or uploading an HTML file to the root directory of the domain.
* You need to have a [Twilio Organization](/docs/iam/organizations).
* You need to [add your domain to the Organization](/docs/iam/organizations/domains) and verify the domain with Twilio.
* The Twilio Account(s) you wish to use with Link Shortening [must be added to the Organization](/docs/iam/organizations#manage-accounts).
* The Twilio Account(s) must have a [Messaging Service](/docs/messaging/services) with at least one sender.

## Configure your Messaging Service

This section covers how to associate your Messaging Service with your Link Shortening domain.

A Link Shortening domain can be used with multiple Messaging Services, as long as the Messaging Services all belong to an Account within your Twilio Organization.

> \[!NOTE]
>
> If you want to set up Link Shortening for another Messaging Service, repeat
> the steps in this section.

If you're using the Console, follow the **Console** steps below. If you're using the REST API, use the **API** steps below.

**Console**

## Console

1. In a new tab, open your Console and navigate to **[Messaging > Messaging Services](https://1console.twilio.com/us1/develop/sms/services)**.
2. Select the Messaging Service that you want to configure.
3. In the left hand navigation pane, select **Link Shortening**.
4. In the **Organization and domain** section, in the **Domain** field, select your link shortening domain from the dropdown.
5. Click **Save changes**.

## Legacy Console

1. In a new tab, open your Console and navigate to [Messaging > Messaging Services](https://console.twilio.com/us1/develop/sms/services).
2. Select the Messaging Service that you want to configure.
3. In the left hand navigation pane, select **Link Shortening**.
4. In the **Organization and domain** section, in the **Domain** field, select your link shortening domain from the dropdown.
5. Click **Save changes**.

**API**

1. Go to the Admin Center of the Console. Navigate to **Domains** and select on your domain. The SID is on the Domain details page under **Domain Sid**. Save this SID because you'll need it in future steps.
2. Next, you need your Messaging Service's SID. To find it, in the Console, navigate to **Messaging > Messaging Services.** Select the Messaging Service that you want to configure. Save this SID because you'll need it in future steps.
3. Send a `POST` request to the Link Shortening domain's Messaging Services subresource. Place your domain's SID and Messaging Service SID in the URL. An example request is shown below.

Associate a Messaging Service with your Link Shortening domain

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createLinkshorteningMessagingService() {
  const linkshorteningMessagingService = await client.messaging.v1
    .linkshorteningMessagingService(
      "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    )
    .create();

  console.log(linkshorteningMessagingService.domainSid);
}

createLinkshorteningMessagingService();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

linkshortening_messaging_service = (
    client.messaging.v1.linkshortening_messaging_service(
        "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ).create()
)

print(linkshortening_messaging_service.domain_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var linkshorteningMessagingService =
            await LinkshorteningMessagingServiceResource.CreateAsync(
                pathDomainSid: "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                pathMessagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(linkshorteningMessagingService.DomainSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.LinkshorteningMessagingService;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        LinkshorteningMessagingService linkshorteningMessagingService =
            LinkshorteningMessagingService
                .creator("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .create();

        System.out.println(linkshorteningMessagingService.getDomainSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.MessagingV1.CreateLinkshorteningMessagingService("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.DomainSid != nil {
			fmt.Println(*resp.DomainSid)
		} else {
			fmt.Println(resp.DomainSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$linkshortening_messaging_service = $twilio->messaging->v1
    ->linkshorteningMessagingService(
        "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    )
    ->create();

print $linkshortening_messaging_service->domainSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

linkshortening_messaging_service = @client
                                   .messaging
                                   .v1
                                   .linkshortening_messaging_service('DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                   .create

puts linkshortening_messaging_service.domain_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:link-shortening:domains:messaging-services:update \
   --domain-sid DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://messaging.twilio.com/v1/LinkShortening/Domains/DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/MessagingServices/MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "domain_sid": "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "url": "https://messaging.twilio.com/v1/LinkShortening/Domains/DNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingServices/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Update your domain's DNS records

To complete the setup for Link Shortening, navigate to your domain's **DNS configuration** (or DNS management) page. To simplify maintenance and ensure stability, we strongly recommend configuring your domain using a **CNAME record**:

* If you are using a **subdomain** (e.g., link.example.com), create or modify a CNAME record and set its target/value to: [lsct.ashburn.us1.twilio.com](http://lsct.ashburn.us1.twilio.com)
* If you are using a **root domain**, we recommend using a CNAME record with the same target/value. Some DNS providers call this functionality "CNAME Flattening", "ALIAS", or "ANAME records."

After saving the changes in your DNS management tool, please allow time for the DNS records to **propagate** across the internet.

**Alternate setup for Root Domains: A Record**

If you must use your **root domain** (e.g., example.com) and your provider does not support CNAME Flattening, you may configure the domain's [A record](https://www.twilio.com/docs/glossary/what-is-an-a-record) to point to specific IPs. Please note that these IP addresses can change, and Twilio will provide at least 30 days' notice before any change occurs. Please reach out to Twilio Support for the specific IPs to set up A records.

## Certificate Management

With Link Shortening, Twilio serves redirects for your domain. A TLS certificate allows Twilio to establish an encrypted connection between a customer's browser and Twilio's servers on your behalf (redirects are served over HTTPS). We offer two options for setting up TLS certificates for your Link Shortening domain: Twilio-managed Certificates (preferred) and Bring Your Own Certificate.

Keep the following in mind as you complete this section:

* Your domain is associated with your Twilio Organization, so you only need to generate or upload your certificate once, even if multiple Accounts within the Organization use the same domain.

**Option 1 (Preferred) - Twilio-managed Certificate:** Use our new Certificate Manager feature to entrust Twilio with handling certificate requests and renewals. This is the preferred option.

**Console**

1. Choose **Twilio-managed certificate** as the certificate management option.
2. Click **Continue** in the modal pop up and wait for the certificate to be processed. This may take a few minutes.
3. Your new certificate details will be displayed under the **Certificate management** tab. You may need to refresh your page if you still see the processing message.

**API**

Send a `POST` request to the Link Shortening RequestManagedCert subresource, placing your domain's SID in the URL.

Generate a Twilio-managed TLS certificate for your Link Shortening domain

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateRequestManagedCert() {
  const requestManagedCert = await client.messaging.v1
    .requestManagedCert("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update();

  console.log(requestManagedCert.domainSid);
}

updateRequestManagedCert();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

request_managed_cert = client.messaging.v1.request_managed_cert(
    "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).update()

print(request_managed_cert.domain_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var requestManagedCert = await RequestManagedCertResource.UpdateAsync(
            pathDomainSid: "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(requestManagedCert.DomainSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.RequestManagedCert;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        RequestManagedCert requestManagedCert = RequestManagedCert.updater("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update();

        System.out.println(requestManagedCert.getDomainSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.MessagingV1.UpdateRequestManagedCert("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.DomainSid != nil {
			fmt.Println(*resp.DomainSid)
		} else {
			fmt.Println(resp.DomainSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$request_managed_cert = $twilio->messaging->v1
    ->requestManagedCert("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update();

print $request_managed_cert->domainSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

request_managed_cert = @client
                       .messaging
                       .v1
                       .request_managed_cert('DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .update()

puts request_managed_cert.domain_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:link-shortening:domains:request-managed-cert:update \
   --domain-sid DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://messaging.twilio.com/v1/LinkShortening/Domains/DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RequestManagedCert" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "certificate_sid": "CWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "domain_name": "https://api.example.com",
  "domain_sid": "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2021-02-06T18:02:04Z",
  "date_updated": "2021-02-06T18:02:04Z",
  "date_expires": "2021-02-06T18:02:04Z",
  "url": "https://messaging.twilio.com/v1/LinkShortening/Domains/DNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RequestManagedCert",
  "managed": true,
  "requesting": true
}
```

If you use CAA records in your DNS setup, letsencrypt.org must be included for Twilio to manage the certificate requests and renewals. CAA records can be found in your DNS setup.

**Option 2 - Bring Your Own Certificate:** Most domain hosting services offer managed certificate solutions. There are paid options with annual subscriptions and free options such as letsencrypt.org (with the caveat that most free options only provide an expiration of up to 3 months).

* Keep the following in mind when generating your certificate and key:

  * The TLS certificate and private key must be generated in a PEM format.
  * If you're using a subdomain, the certificate and key must be generated for the subdomain.
  * Subject Alternative Names in TLS Certificates are now supported.
  * Wildcard certificates for subdomains are now supported.
  * Certificates must start with `-----BEGIN CERTIFICATE-----` and end with `-----END CERTIFICATE-----`
  * Private keys must start with `-----BEGIN PRIVATE KEY-----` and end with `-----END PRIVATE KEY-----` or be in PKCS #8 format.
  * To encrypt the connection, you must provide the full certificate [chain of trust](https://knowledge.digicert.com/solution/how-certificate-chains-work) as a single file. This includes your server certificate, all intermediate Certification Authority (CA) certificates, and the root CA certificate. Uploading an incomplete chain might cause browser errors.

> \[!NOTE]
>
> Keep your certificate up to date. If it expires, link shortening fails, links might break, and extra charges might apply.
>
> You can use [Twilio Alarms](/docs/usage/troubleshooting/alarms) to set up email notifications for the [30131 warning code](/docs/api/errors/30131), which indicates that a certificate is about to expire.

If you're using the Console, follow the **Console** steps below. If you're using the REST API, use the **API** steps below.

**Console**

1. Under **Upload certificate**, click **Upload new certificate**.
2. Read the information in the pop-up and click **Continue**.
3. In the **Upload TLS certificate and private key** pop-up, paste your TLS certificate into the **TLS certificate** input box.

   * The TLS Certificate's first line *must be* `-----BEGIN CERTIFICATE-----`
   * The last line *must be* `-----END CERTIFICATE-----`
   * Make sure there are no extra newline characters at the beginning or end of the certificate.
     Example:
4. Paste your private key into the **Private key** input box.

   * The private key's first line *must be* `-----BEGIN PRIVATE KEY-----`
   * The private key's last line *must be* `-----END PRIVATE KEY-----`
   * Make sure there are no extra newline characters at the beginning or end of the private key.
     Example:
5. Click **Upload**.
   It takes up to five minutes to validate the certificate and key. Check the status by checking the Cert status under Current certificate details.
   If you encounter an error at this step, make sure your certificate and private key are in the correct format as described in the previous step.
6. Go to the ["Configure your domain's default behavior" section below](#configure-your-domains-default-behavior).

**API**

1. Send a `POST` request to your Link Shortening domain's Certificate subresource.

   In the request, the `TlsCert` parameter's value must be the concatenated certificate and private key. The proper format of the `TlsCert` value is shown in the example below.

   It can take up to five minutes to validate a certificate. Because of this, Twilio's response to this `POST` request may contain a `cert_in_validation.status` property with a value of `pending`.

   Use the request in Step 2 (below) to check the certificate's validation status.

   > \[!WARNING]
   >
   > Don't hard-code or save your certificate/key anywhere that might be pushed
   > into version control. If using an SDK, use environment variables.
   > The following TLS certificate and key are saved as variables for display
   > purposes only.

   Upload/update TLS Certificate and Private Key for a Link Shortening domain

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = require('twilio')(accountSid, authToken);

   const certAndPrivateKey = `-----BEGIN CERTIFICATE-----
   MIIDqDCCApACCQCBT5e22Q01fjANBgkqhkiG9w0BAQsFADCBlTELMAkGA1UEBhMC
   VVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRYwFAYDVQQK
   DA1FeGFtcGxlLCBJbmMuMRIwEAYDVQQLDAlUZXN0IERlcHQxFDASBgNVBAMMC2V4
   YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMB4XDTIz
   MDcyNjIwMjUwMVoXDTI0MDcyNTIwMjUwMVowgZUxCzAJBgNVBAYTAlVTMQswCQYD
   VQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEWMBQGA1UECgwNRXhhbXBs
   ZSwgSW5jLjESMBAGA1UECwwJVGVzdCBEZXB0MRQwEgYDVQQDDAtleGFtcGxlLmNv
   bTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcN
   AQEBBQADggEPADCCAQoCggEBAL+uk4TT+7npoMgnah59ZYu4VzM+PInRVbsvYa4S
   EfX+GzNy03VmVCsxnM2OxRQjqBxa5nKtRocRbFNk46xpB5fuOcJ6pKwWKo9equ6x
   RuZzbo8HkfmrP5a2GcA/Z+ncwjiyKbi7UefwGxaayGPiTFMEZIYVUHE6GDsRKYeJ
   nbylpzOtQMJqtRZitkC8BIDh52dZIi/GDPqB6fw4Cubpld9c5qNX575FuF0HUj5B
   lc0e4b7EihlNGu4mDUo8FJoHkVqVTFM6KtwhL9A5xdVjZ9XukX0uiaaI+LwzBKJs
   Y0zCt99hFp+dMwEc7wL7ECsXSFuH4RAnJn/QglYT9b1uO0MCAwEAATANBgkqhkiG
   9w0BAQsFAAOCAQEAHtUqqlWJ74LCFwVup2n0pUoIkHhUJdAv1lvSpyvA7sW/fKCU
   RhblmkqMy8i96xZGizuT86nUdf2XcufJhPFee7UopfZE4Ncya4te+7y/S17HM0uk
   LMEO1njLhzX+MDuLZOPPXw70JxN1oqxvyZKxrbvaOJ0O4duiEUOfKu//EYY0AdTl
   xCkHItiKEsmxjUPjroMd0APJp5aTPUS2c4moB9xjieft2uIG/7d/3gQfswnxJZcd
   EzQKclW4U28U1NVtcFhaNwEBC1H0TvBTp/8asl2aTOUP97wcLHPI9qzZWfAzizOU
   17S7MxNzjtt4i4/PQ7koIsq31wgmh2jDjh6mMw==
   -----END CERTIFICATE-----
   -----BEGIN PRIVATE KEY-----
   MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/rpOE0/u56aDI
   J2oefWWLuFczPjyJ0VW7L2GuEhH1/hszctN1ZlQrMZzNjsUUI6gcWuZyrUaHEWxT
   ZOOsaQeX7jnCeqSsFiqPXqrusUbmc26PB5H5qz+WthnAP2fp3MI4sim4u1Hn8BsW
   mshj4kxTBGSGFVBxOhg7ESmHiZ28paczrUDCarUWYrZAvASA4ednWSIvxgz6gen8
   OArm6ZXfXOajV+e+RbhdB1I+QZXNHuG+xIoZTRruJg1KPBSaB5FalUxTOircIS/Q
   OcXVY2fV7pF9LommiPi8MwSibGNMwrffYRafnTMBHO8C+xArF0hbh+EQJyZ/0IJW
   E/W9bjtDAgMBAAECggEAEoOQKBI5jBluuCZmb495EWe6tG5cdotLlorbCm8gYPws
   MGn01rANjSZ7mLcjffB7ulFlVMo7t6wNJHjoLKzwWNJfrdMeuKhjb/ma1Pc2e+fG
   U/ZNOSo7OBlan2EAbmwuLj+3G+qr3JUqaKKGnG8tJA+WjgTdAjK0SHA97KN0ItZK
   ZrZLEdrDTH+jCLl7eGzbAa7cMd24LyE9/Sz0IwJ+E2A2qoyBPGP8kRIByUH8pf94
   HnF7DzGBaV7UAC7xuzHPiV0vV+YNjvk236IbDCkGW5Y/j92KxmZKY1lIz/cDCNRD
   rAwZtRruIjNtgP9dNq44OQvjAvaFQIS+TMqJpqT3oQKBgQDftE5z/Hm/UyOyoh24
   GccisB37eDzDO7/rJq4l3/UvAu566xmI8W3ToQMaDbtOfGOoLKH3mPY8c+yYJrCt
   HM2uzxnFxPkfZ4I8JoplJ3pkNinYdX81jmmeO3gk6uzAgZOtSHSMP7TWkrTct/vf
   ZduvzlrGKtcbzfPuFdBABQeeaQKBgQDbWshIRzOkqku7X/4jj0qDa4dExtOzLzXw
   VsEV9sCXemMtFYmFWJAHeNvnfxKeBjtXa7skEQTojXcd/DJF1eTtLJNbpJpIUfiU
   BdqfmMvf7eDnsiUmzRlqxnc/bwhzzl3ac1gL0n7WXBA+HYEp5LhIlhGuzKlpIET3
   1sHKim7uywKBgQCyudOURzrd6Qa0SWGFHNNEm4DY0I97S9lhfl3UVMIG9UijXAHi
   r0EXu6RGxIHJiwfz7PTaZJMWaWe1h/PP2xtZdo0YvO5scL5UYFZhytC2D7APCJDB
   sS4hBVJP7IGKq/vYjfLPunY4mK13SmcpbK/AHhXYDZIe3MTuiu7+twYHQQKBgQDX
   4IZPq9NFcVvK8nP4pyLcJ80egNcD96iL+bVZWli8O3SzgAixtTE6SVWShNrbrqJk
   LOAmZKGCBQd/+R244QLF8CKuBFbaaeHMO96nRwcOQNwg6o/pmdwz21KsmSemYSi4
   vt+d8vFlIYHSv9LIWhKLTTXl5AGuNlXp2+8o2AjI9QKBgQDXQzJWmiVmTsBYOTWD
   YTp2o4Tn0HlLk3KHaBKHGiO0YGVuhXa2jz0u3jg5LLG7vusOZhQBkd4tN7L10ZMM
   l5jSr8uncW4/3gZ/O/URQZcMH+Uzttw8nVL3mzLS/M600I+ryZdLkrmtDQWUBRwj
   fRre92n5B+9AgpEl6RyegsXToA==
   -----END PRIVATE KEY-----`;

   client.messaging.v1
     .domainCerts('DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
     .update({
       tlsCert: certAndPrivateKey,
     })
     .then((domain_certs) => console.log(domain_certs.domainName));
   ```

   ```py
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client


   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ['TWILIO_ACCOUNT_SID']
   auth_token = os.environ['TWILIO_AUTH_TOKEN']
   client = Client(account_sid, auth_token)

   cert_and_private_key = """-----BEGIN CERTIFICATE-----
   	MIIDqDCCApACCQCBT5e22Q01fjANBgkqhkiG9w0BAQsFADCBlTELMAkGA1UEBhMC
   	VVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRYwFAYDVQQK
   	DA1FeGFtcGxlLCBJbmMuMRIwEAYDVQQLDAlUZXN0IERlcHQxFDASBgNVBAMMC2V4
   	YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMB4XDTIz
   	MDcyNjIwMjUwMVoXDTI0MDcyNTIwMjUwMVowgZUxCzAJBgNVBAYTAlVTMQswCQYD
   	VQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEWMBQGA1UECgwNRXhhbXBs
   	ZSwgSW5jLjESMBAGA1UECwwJVGVzdCBEZXB0MRQwEgYDVQQDDAtleGFtcGxlLmNv
   	bTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcN
   	AQEBBQADggEPADCCAQoCggEBAL+uk4TT+7npoMgnah59ZYu4VzM+PInRVbsvYa4S
   	EfX+GzNy03VmVCsxnM2OxRQjqBxa5nKtRocRbFNk46xpB5fuOcJ6pKwWKo9equ6x
   	RuZzbo8HkfmrP5a2GcA/Z+ncwjiyKbi7UefwGxaayGPiTFMEZIYVUHE6GDsRKYeJ
   	nbylpzOtQMJqtRZitkC8BIDh52dZIi/GDPqB6fw4Cubpld9c5qNX575FuF0HUj5B
   	lc0e4b7EihlNGu4mDUo8FJoHkVqVTFM6KtwhL9A5xdVjZ9XukX0uiaaI+LwzBKJs
   	Y0zCt99hFp+dMwEc7wL7ECsXSFuH4RAnJn/QglYT9b1uO0MCAwEAATANBgkqhkiG
   	9w0BAQsFAAOCAQEAHtUqqlWJ74LCFwVup2n0pUoIkHhUJdAv1lvSpyvA7sW/fKCU
   	RhblmkqMy8i96xZGizuT86nUdf2XcufJhPFee7UopfZE4Ncya4te+7y/S17HM0uk
   	LMEO1njLhzX+MDuLZOPPXw70JxN1oqxvyZKxrbvaOJ0O4duiEUOfKu//EYY0AdTl
   	xCkHItiKEsmxjUPjroMd0APJp5aTPUS2c4moB9xjieft2uIG/7d/3gQfswnxJZcd
   	EzQKclW4U28U1NVtcFhaNwEBC1H0TvBTp/8asl2aTOUP97wcLHPI9qzZWfAzizOU
   	17S7MxNzjtt4i4/PQ7koIsq31wgmh2jDjh6mMw==
   	-----END CERTIFICATE-----
   	-----BEGIN PRIVATE KEY-----
   	MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/rpOE0/u56aDI
   	J2oefWWLuFczPjyJ0VW7L2GuEhH1/hszctN1ZlQrMZzNjsUUI6gcWuZyrUaHEWxT
   	ZOOsaQeX7jnCeqSsFiqPXqrusUbmc26PB5H5qz+WthnAP2fp3MI4sim4u1Hn8BsW
   	mshj4kxTBGSGFVBxOhg7ESmHiZ28paczrUDCarUWYrZAvASA4ednWSIvxgz6gen8
   	OArm6ZXfXOajV+e+RbhdB1I+QZXNHuG+xIoZTRruJg1KPBSaB5FalUxTOircIS/Q
   	OcXVY2fV7pF9LommiPi8MwSibGNMwrffYRafnTMBHO8C+xArF0hbh+EQJyZ/0IJW
   	E/W9bjtDAgMBAAECggEAEoOQKBI5jBluuCZmb495EWe6tG5cdotLlorbCm8gYPws
   	MGn01rANjSZ7mLcjffB7ulFlVMo7t6wNJHjoLKzwWNJfrdMeuKhjb/ma1Pc2e+fG
   	U/ZNOSo7OBlan2EAbmwuLj+3G+qr3JUqaKKGnG8tJA+WjgTdAjK0SHA97KN0ItZK
   	ZrZLEdrDTH+jCLl7eGzbAa7cMd24LyE9/Sz0IwJ+E2A2qoyBPGP8kRIByUH8pf94
   	HnF7DzGBaV7UAC7xuzHPiV0vV+YNjvk236IbDCkGW5Y/j92KxmZKY1lIz/cDCNRD
   	rAwZtRruIjNtgP9dNq44OQvjAvaFQIS+TMqJpqT3oQKBgQDftE5z/Hm/UyOyoh24
   	GccisB37eDzDO7/rJq4l3/UvAu566xmI8W3ToQMaDbtOfGOoLKH3mPY8c+yYJrCt
   	HM2uzxnFxPkfZ4I8JoplJ3pkNinYdX81jmmeO3gk6uzAgZOtSHSMP7TWkrTct/vf
   	ZduvzlrGKtcbzfPuFdBABQeeaQKBgQDbWshIRzOkqku7X/4jj0qDa4dExtOzLzXw
   	VsEV9sCXemMtFYmFWJAHeNvnfxKeBjtXa7skEQTojXcd/DJF1eTtLJNbpJpIUfiU
   	BdqfmMvf7eDnsiUmzRlqxnc/bwhzzl3ac1gL0n7WXBA+HYEp5LhIlhGuzKlpIET3
   	1sHKim7uywKBgQCyudOURzrd6Qa0SWGFHNNEm4DY0I97S9lhfl3UVMIG9UijXAHi
   	r0EXu6RGxIHJiwfz7PTaZJMWaWe1h/PP2xtZdo0YvO5scL5UYFZhytC2D7APCJDB
   	sS4hBVJP7IGKq/vYjfLPunY4mK13SmcpbK/AHhXYDZIe3MTuiu7+twYHQQKBgQDX
   	4IZPq9NFcVvK8nP4pyLcJ80egNcD96iL+bVZWli8O3SzgAixtTE6SVWShNrbrqJk
   	LOAmZKGCBQd/+R244QLF8CKuBFbaaeHMO96nRwcOQNwg6o/pmdwz21KsmSemYSi4
   	vt+d8vFlIYHSv9LIWhKLTTXl5AGuNlXp2+8o2AjI9QKBgQDXQzJWmiVmTsBYOTWD
   	YTp2o4Tn0HlLk3KHaBKHGiO0YGVuhXa2jz0u3jg5LLG7vusOZhQBkd4tN7L10ZMM
   	l5jSr8uncW4/3gZ/O/URQZcMH+Uzttw8nVL3mzLS/M600I+ryZdLkrmtDQWUBRwj
   	fRre92n5B+9AgpEl6RyegsXToA==
   	-----END PRIVATE KEY-----"""

   domain_certs = client.messaging \
       .v1 \
       .domain_certs('DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') \
       .update(
           tls_cert= cert_and_private_key
       )

   print(domain_certs.domain_name)
   ```

   ```cs
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Messaging.V1;


   class Program
   {
       static void Main(string[] args)
       {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var certAndPrivateKey = @"-----BEGIN CERTIFICATE-----
   	MIIDqDCCApACCQCBT5e22Q01fjANBgkqhkiG9w0BAQsFADCBlTELMAkGA1UEBhMC
   	VVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRYwFAYDVQQK
   	DA1FeGFtcGxlLCBJbmMuMRIwEAYDVQQLDAlUZXN0IERlcHQxFDASBgNVBAMMC2V4
   	YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMB4XDTIz
   	MDcyNjIwMjUwMVoXDTI0MDcyNTIwMjUwMVowgZUxCzAJBgNVBAYTAlVTMQswCQYD
   	VQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEWMBQGA1UECgwNRXhhbXBs
   	ZSwgSW5jLjESMBAGA1UECwwJVGVzdCBEZXB0MRQwEgYDVQQDDAtleGFtcGxlLmNv
   	bTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcN
   	AQEBBQADggEPADCCAQoCggEBAL+uk4TT+7npoMgnah59ZYu4VzM+PInRVbsvYa4S
   	EfX+GzNy03VmVCsxnM2OxRQjqBxa5nKtRocRbFNk46xpB5fuOcJ6pKwWKo9equ6x
   	RuZzbo8HkfmrP5a2GcA/Z+ncwjiyKbi7UefwGxaayGPiTFMEZIYVUHE6GDsRKYeJ
   	nbylpzOtQMJqtRZitkC8BIDh52dZIi/GDPqB6fw4Cubpld9c5qNX575FuF0HUj5B
   	lc0e4b7EihlNGu4mDUo8FJoHkVqVTFM6KtwhL9A5xdVjZ9XukX0uiaaI+LwzBKJs
   	Y0zCt99hFp+dMwEc7wL7ECsXSFuH4RAnJn/QglYT9b1uO0MCAwEAATANBgkqhkiG
   	9w0BAQsFAAOCAQEAHtUqqlWJ74LCFwVup2n0pUoIkHhUJdAv1lvSpyvA7sW/fKCU
   	RhblmkqMy8i96xZGizuT86nUdf2XcufJhPFee7UopfZE4Ncya4te+7y/S17HM0uk
   	LMEO1njLhzX+MDuLZOPPXw70JxN1oqxvyZKxrbvaOJ0O4duiEUOfKu//EYY0AdTl
   	xCkHItiKEsmxjUPjroMd0APJp5aTPUS2c4moB9xjieft2uIG/7d/3gQfswnxJZcd
   	EzQKclW4U28U1NVtcFhaNwEBC1H0TvBTp/8asl2aTOUP97wcLHPI9qzZWfAzizOU
   	17S7MxNzjtt4i4/PQ7koIsq31wgmh2jDjh6mMw==
   	-----END CERTIFICATE-----
   	-----BEGIN PRIVATE KEY-----
   	MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/rpOE0/u56aDI
   	J2oefWWLuFczPjyJ0VW7L2GuEhH1/hszctN1ZlQrMZzNjsUUI6gcWuZyrUaHEWxT
   	ZOOsaQeX7jnCeqSsFiqPXqrusUbmc26PB5H5qz+WthnAP2fp3MI4sim4u1Hn8BsW
   	mshj4kxTBGSGFVBxOhg7ESmHiZ28paczrUDCarUWYrZAvASA4ednWSIvxgz6gen8
   	OArm6ZXfXOajV+e+RbhdB1I+QZXNHuG+xIoZTRruJg1KPBSaB5FalUxTOircIS/Q
   	OcXVY2fV7pF9LommiPi8MwSibGNMwrffYRafnTMBHO8C+xArF0hbh+EQJyZ/0IJW
   	E/W9bjtDAgMBAAECggEAEoOQKBI5jBluuCZmb495EWe6tG5cdotLlorbCm8gYPws
   	MGn01rANjSZ7mLcjffB7ulFlVMo7t6wNJHjoLKzwWNJfrdMeuKhjb/ma1Pc2e+fG
   	U/ZNOSo7OBlan2EAbmwuLj+3G+qr3JUqaKKGnG8tJA+WjgTdAjK0SHA97KN0ItZK
   	ZrZLEdrDTH+jCLl7eGzbAa7cMd24LyE9/Sz0IwJ+E2A2qoyBPGP8kRIByUH8pf94
   	HnF7DzGBaV7UAC7xuzHPiV0vV+YNjvk236IbDCkGW5Y/j92KxmZKY1lIz/cDCNRD
   	rAwZtRruIjNtgP9dNq44OQvjAvaFQIS+TMqJpqT3oQKBgQDftE5z/Hm/UyOyoh24
   	GccisB37eDzDO7/rJq4l3/UvAu566xmI8W3ToQMaDbtOfGOoLKH3mPY8c+yYJrCt
   	HM2uzxnFxPkfZ4I8JoplJ3pkNinYdX81jmmeO3gk6uzAgZOtSHSMP7TWkrTct/vf
   	ZduvzlrGKtcbzfPuFdBABQeeaQKBgQDbWshIRzOkqku7X/4jj0qDa4dExtOzLzXw
   	VsEV9sCXemMtFYmFWJAHeNvnfxKeBjtXa7skEQTojXcd/DJF1eTtLJNbpJpIUfiU
   	BdqfmMvf7eDnsiUmzRlqxnc/bwhzzl3ac1gL0n7WXBA+HYEp5LhIlhGuzKlpIET3
   	1sHKim7uywKBgQCyudOURzrd6Qa0SWGFHNNEm4DY0I97S9lhfl3UVMIG9UijXAHi
   	r0EXu6RGxIHJiwfz7PTaZJMWaWe1h/PP2xtZdo0YvO5scL5UYFZhytC2D7APCJDB
   	sS4hBVJP7IGKq/vYjfLPunY4mK13SmcpbK/AHhXYDZIe3MTuiu7+twYHQQKBgQDX
   	4IZPq9NFcVvK8nP4pyLcJ80egNcD96iL+bVZWli8O3SzgAixtTE6SVWShNrbrqJk
   	LOAmZKGCBQd/+R244QLF8CKuBFbaaeHMO96nRwcOQNwg6o/pmdwz21KsmSemYSi4
   	vt+d8vFlIYHSv9LIWhKLTTXl5AGuNlXp2+8o2AjI9QKBgQDXQzJWmiVmTsBYOTWD
   	YTp2o4Tn0HlLk3KHaBKHGiO0YGVuhXa2jz0u3jg5LLG7vusOZhQBkd4tN7L10ZMM
   	l5jSr8uncW4/3gZ/O/URQZcMH+Uzttw8nVL3mzLS/M600I+ryZdLkrmtDQWUBRwj
   	fRre92n5B+9AgpEl6RyegsXToA==
   	-----END PRIVATE KEY-----"

           var domainCerts = DomainCertsResource.Update(
               tlsCert: certAndPrivateKey,
               pathDomainSid: "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
           );

           Console.WriteLine(domainCerts.DomainName);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.Twilio;
   import com.twilio.rest.messaging.v1.DomainCerts;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       String certAndPrivateKey = """-----BEGIN CERTIFICATE-----
   	MIIDqDCCApACCQCBT5e22Q01fjANBgkqhkiG9w0BAQsFADCBlTELMAkGA1UEBhMC
   	VVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRYwFAYDVQQK
   	DA1FeGFtcGxlLCBJbmMuMRIwEAYDVQQLDAlUZXN0IERlcHQxFDASBgNVBAMMC2V4
   	YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMB4XDTIz
   	MDcyNjIwMjUwMVoXDTI0MDcyNTIwMjUwMVowgZUxCzAJBgNVBAYTAlVTMQswCQYD
   	VQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEWMBQGA1UECgwNRXhhbXBs
   	ZSwgSW5jLjESMBAGA1UECwwJVGVzdCBEZXB0MRQwEgYDVQQDDAtleGFtcGxlLmNv
   	bTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcN
   	AQEBBQADggEPADCCAQoCggEBAL+uk4TT+7npoMgnah59ZYu4VzM+PInRVbsvYa4S
   	EfX+GzNy03VmVCsxnM2OxRQjqBxa5nKtRocRbFNk46xpB5fuOcJ6pKwWKo9equ6x
   	RuZzbo8HkfmrP5a2GcA/Z+ncwjiyKbi7UefwGxaayGPiTFMEZIYVUHE6GDsRKYeJ
   	nbylpzOtQMJqtRZitkC8BIDh52dZIi/GDPqB6fw4Cubpld9c5qNX575FuF0HUj5B
   	lc0e4b7EihlNGu4mDUo8FJoHkVqVTFM6KtwhL9A5xdVjZ9XukX0uiaaI+LwzBKJs
   	Y0zCt99hFp+dMwEc7wL7ECsXSFuH4RAnJn/QglYT9b1uO0MCAwEAATANBgkqhkiG
   	9w0BAQsFAAOCAQEAHtUqqlWJ74LCFwVup2n0pUoIkHhUJdAv1lvSpyvA7sW/fKCU
   	RhblmkqMy8i96xZGizuT86nUdf2XcufJhPFee7UopfZE4Ncya4te+7y/S17HM0uk
   	LMEO1njLhzX+MDuLZOPPXw70JxN1oqxvyZKxrbvaOJ0O4duiEUOfKu//EYY0AdTl
   	xCkHItiKEsmxjUPjroMd0APJp5aTPUS2c4moB9xjieft2uIG/7d/3gQfswnxJZcd
   	EzQKclW4U28U1NVtcFhaNwEBC1H0TvBTp/8asl2aTOUP97wcLHPI9qzZWfAzizOU
   	17S7MxNzjtt4i4/PQ7koIsq31wgmh2jDjh6mMw==
   	-----END CERTIFICATE-----
   	-----BEGIN PRIVATE KEY-----
   	MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/rpOE0/u56aDI
   	J2oefWWLuFczPjyJ0VW7L2GuEhH1/hszctN1ZlQrMZzNjsUUI6gcWuZyrUaHEWxT
   	ZOOsaQeX7jnCeqSsFiqPXqrusUbmc26PB5H5qz+WthnAP2fp3MI4sim4u1Hn8BsW
   	mshj4kxTBGSGFVBxOhg7ESmHiZ28paczrUDCarUWYrZAvASA4ednWSIvxgz6gen8
   	OArm6ZXfXOajV+e+RbhdB1I+QZXNHuG+xIoZTRruJg1KPBSaB5FalUxTOircIS/Q
   	OcXVY2fV7pF9LommiPi8MwSibGNMwrffYRafnTMBHO8C+xArF0hbh+EQJyZ/0IJW
   	E/W9bjtDAgMBAAECggEAEoOQKBI5jBluuCZmb495EWe6tG5cdotLlorbCm8gYPws
   	MGn01rANjSZ7mLcjffB7ulFlVMo7t6wNJHjoLKzwWNJfrdMeuKhjb/ma1Pc2e+fG
   	U/ZNOSo7OBlan2EAbmwuLj+3G+qr3JUqaKKGnG8tJA+WjgTdAjK0SHA97KN0ItZK
   	ZrZLEdrDTH+jCLl7eGzbAa7cMd24LyE9/Sz0IwJ+E2A2qoyBPGP8kRIByUH8pf94
   	HnF7DzGBaV7UAC7xuzHPiV0vV+YNjvk236IbDCkGW5Y/j92KxmZKY1lIz/cDCNRD
   	rAwZtRruIjNtgP9dNq44OQvjAvaFQIS+TMqJpqT3oQKBgQDftE5z/Hm/UyOyoh24
   	GccisB37eDzDO7/rJq4l3/UvAu566xmI8W3ToQMaDbtOfGOoLKH3mPY8c+yYJrCt
   	HM2uzxnFxPkfZ4I8JoplJ3pkNinYdX81jmmeO3gk6uzAgZOtSHSMP7TWkrTct/vf
   	ZduvzlrGKtcbzfPuFdBABQeeaQKBgQDbWshIRzOkqku7X/4jj0qDa4dExtOzLzXw
   	VsEV9sCXemMtFYmFWJAHeNvnfxKeBjtXa7skEQTojXcd/DJF1eTtLJNbpJpIUfiU
   	BdqfmMvf7eDnsiUmzRlqxnc/bwhzzl3ac1gL0n7WXBA+HYEp5LhIlhGuzKlpIET3
   	1sHKim7uywKBgQCyudOURzrd6Qa0SWGFHNNEm4DY0I97S9lhfl3UVMIG9UijXAHi
   	r0EXu6RGxIHJiwfz7PTaZJMWaWe1h/PP2xtZdo0YvO5scL5UYFZhytC2D7APCJDB
   	sS4hBVJP7IGKq/vYjfLPunY4mK13SmcpbK/AHhXYDZIe3MTuiu7+twYHQQKBgQDX
   	4IZPq9NFcVvK8nP4pyLcJ80egNcD96iL+bVZWli8O3SzgAixtTE6SVWShNrbrqJk
   	LOAmZKGCBQd/+R244QLF8CKuBFbaaeHMO96nRwcOQNwg6o/pmdwz21KsmSemYSi4
   	vt+d8vFlIYHSv9LIWhKLTTXl5AGuNlXp2+8o2AjI9QKBgQDXQzJWmiVmTsBYOTWD
   	YTp2o4Tn0HlLk3KHaBKHGiO0YGVuhXa2jz0u3jg5LLG7vusOZhQBkd4tN7L10ZMM
   	l5jSr8uncW4/3gZ/O/URQZcMH+Uzttw8nVL3mzLS/M600I+ryZdLkrmtDQWUBRwj
   	fRre92n5B+9AgpEl6RyegsXToA==
   	-----END PRIVATE KEY-----"""

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           DomainCerts domainCerts = DomainCerts.updater(
                   "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                   certAndPrivateKey)
               .update();

           System.out.println(domainCerts.getDomainName());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"

   	"github.com/twilio/twilio-go"
   	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	client := twilio.NewRestClient()

   	certAndPrivateKey := `-----BEGIN CERTIFICATE-----
   	MIIDqDCCApACCQCBT5e22Q01fjANBgkqhkiG9w0BAQsFADCBlTELMAkGA1UEBhMC
   	VVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRYwFAYDVQQK
   	DA1FeGFtcGxlLCBJbmMuMRIwEAYDVQQLDAlUZXN0IERlcHQxFDASBgNVBAMMC2V4
   	YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMB4XDTIz
   	MDcyNjIwMjUwMVoXDTI0MDcyNTIwMjUwMVowgZUxCzAJBgNVBAYTAlVTMQswCQYD
   	VQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEWMBQGA1UECgwNRXhhbXBs
   	ZSwgSW5jLjESMBAGA1UECwwJVGVzdCBEZXB0MRQwEgYDVQQDDAtleGFtcGxlLmNv
   	bTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcN
   	AQEBBQADggEPADCCAQoCggEBAL+uk4TT+7npoMgnah59ZYu4VzM+PInRVbsvYa4S
   	EfX+GzNy03VmVCsxnM2OxRQjqBxa5nKtRocRbFNk46xpB5fuOcJ6pKwWKo9equ6x
   	RuZzbo8HkfmrP5a2GcA/Z+ncwjiyKbi7UefwGxaayGPiTFMEZIYVUHE6GDsRKYeJ
   	nbylpzOtQMJqtRZitkC8BIDh52dZIi/GDPqB6fw4Cubpld9c5qNX575FuF0HUj5B
   	lc0e4b7EihlNGu4mDUo8FJoHkVqVTFM6KtwhL9A5xdVjZ9XukX0uiaaI+LwzBKJs
   	Y0zCt99hFp+dMwEc7wL7ECsXSFuH4RAnJn/QglYT9b1uO0MCAwEAATANBgkqhkiG
   	9w0BAQsFAAOCAQEAHtUqqlWJ74LCFwVup2n0pUoIkHhUJdAv1lvSpyvA7sW/fKCU
   	RhblmkqMy8i96xZGizuT86nUdf2XcufJhPFee7UopfZE4Ncya4te+7y/S17HM0uk
   	LMEO1njLhzX+MDuLZOPPXw70JxN1oqxvyZKxrbvaOJ0O4duiEUOfKu//EYY0AdTl
   	xCkHItiKEsmxjUPjroMd0APJp5aTPUS2c4moB9xjieft2uIG/7d/3gQfswnxJZcd
   	EzQKclW4U28U1NVtcFhaNwEBC1H0TvBTp/8asl2aTOUP97wcLHPI9qzZWfAzizOU
   	17S7MxNzjtt4i4/PQ7koIsq31wgmh2jDjh6mMw==
   	-----END CERTIFICATE-----
   	-----BEGIN PRIVATE KEY-----
   	MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/rpOE0/u56aDI
   	J2oefWWLuFczPjyJ0VW7L2GuEhH1/hszctN1ZlQrMZzNjsUUI6gcWuZyrUaHEWxT
   	ZOOsaQeX7jnCeqSsFiqPXqrusUbmc26PB5H5qz+WthnAP2fp3MI4sim4u1Hn8BsW
   	mshj4kxTBGSGFVBxOhg7ESmHiZ28paczrUDCarUWYrZAvASA4ednWSIvxgz6gen8
   	OArm6ZXfXOajV+e+RbhdB1I+QZXNHuG+xIoZTRruJg1KPBSaB5FalUxTOircIS/Q
   	OcXVY2fV7pF9LommiPi8MwSibGNMwrffYRafnTMBHO8C+xArF0hbh+EQJyZ/0IJW
   	E/W9bjtDAgMBAAECggEAEoOQKBI5jBluuCZmb495EWe6tG5cdotLlorbCm8gYPws
   	MGn01rANjSZ7mLcjffB7ulFlVMo7t6wNJHjoLKzwWNJfrdMeuKhjb/ma1Pc2e+fG
   	U/ZNOSo7OBlan2EAbmwuLj+3G+qr3JUqaKKGnG8tJA+WjgTdAjK0SHA97KN0ItZK
   	ZrZLEdrDTH+jCLl7eGzbAa7cMd24LyE9/Sz0IwJ+E2A2qoyBPGP8kRIByUH8pf94
   	HnF7DzGBaV7UAC7xuzHPiV0vV+YNjvk236IbDCkGW5Y/j92KxmZKY1lIz/cDCNRD
   	rAwZtRruIjNtgP9dNq44OQvjAvaFQIS+TMqJpqT3oQKBgQDftE5z/Hm/UyOyoh24
   	GccisB37eDzDO7/rJq4l3/UvAu566xmI8W3ToQMaDbtOfGOoLKH3mPY8c+yYJrCt
   	HM2uzxnFxPkfZ4I8JoplJ3pkNinYdX81jmmeO3gk6uzAgZOtSHSMP7TWkrTct/vf
   	ZduvzlrGKtcbzfPuFdBABQeeaQKBgQDbWshIRzOkqku7X/4jj0qDa4dExtOzLzXw
   	VsEV9sCXemMtFYmFWJAHeNvnfxKeBjtXa7skEQTojXcd/DJF1eTtLJNbpJpIUfiU
   	BdqfmMvf7eDnsiUmzRlqxnc/bwhzzl3ac1gL0n7WXBA+HYEp5LhIlhGuzKlpIET3
   	1sHKim7uywKBgQCyudOURzrd6Qa0SWGFHNNEm4DY0I97S9lhfl3UVMIG9UijXAHi
   	r0EXu6RGxIHJiwfz7PTaZJMWaWe1h/PP2xtZdo0YvO5scL5UYFZhytC2D7APCJDB
   	sS4hBVJP7IGKq/vYjfLPunY4mK13SmcpbK/AHhXYDZIe3MTuiu7+twYHQQKBgQDX
   	4IZPq9NFcVvK8nP4pyLcJ80egNcD96iL+bVZWli8O3SzgAixtTE6SVWShNrbrqJk
   	LOAmZKGCBQd/+R244QLF8CKuBFbaaeHMO96nRwcOQNwg6o/pmdwz21KsmSemYSi4
   	vt+d8vFlIYHSv9LIWhKLTTXl5AGuNlXp2+8o2AjI9QKBgQDXQzJWmiVmTsBYOTWD
   	YTp2o4Tn0HlLk3KHaBKHGiO0YGVuhXa2jz0u3jg5LLG7vusOZhQBkd4tN7L10ZMM
   	l5jSr8uncW4/3gZ/O/URQZcMH+Uzttw8nVL3mzLS/M600I+ryZdLkrmtDQWUBRwj
   	fRre92n5B+9AgpEl6RyegsXToA==
   	-----END PRIVATE KEY-----`

   	params := &messaging.UpdateDomainCertV4Params{}
   	params.SetTlsCert(certAndPrivateKey)

   	resp, err := client.MessagingV1.UpdateDomainCertV4("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", params)
   	if err != nil {
   		fmt.Println(err.Error())
   	} else {
   		if resp.DomainName != nil {
   			fmt.Println(*resp.DomainName)
   		} else {
   			fmt.Println(resp.DomainName)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once '/path/to/vendor/autoload.php';

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $cert_and_private_key = "-----BEGIN CERTIFICATE-----
   MIIDqDCCApACCQCBT5e22Q01fjANBgkqhkiG9w0BAQsFADCBlTELMAkGA1UEBhMC
   VVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRYwFAYDVQQK
   DA1FeGFtcGxlLCBJbmMuMRIwEAYDVQQLDAlUZXN0IERlcHQxFDASBgNVBAMMC2V4
   YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMB4XDTIz
   MDcyNjIwMjUwMVoXDTI0MDcyNTIwMjUwMVowgZUxCzAJBgNVBAYTAlVTMQswCQYD
   VQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEWMBQGA1UECgwNRXhhbXBs
   ZSwgSW5jLjESMBAGA1UECwwJVGVzdCBEZXB0MRQwEgYDVQQDDAtleGFtcGxlLmNv
   bTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcN
   AQEBBQADggEPADCCAQoCggEBAL+uk4TT+7npoMgnah59ZYu4VzM+PInRVbsvYa4S
   EfX+GzNy03VmVCsxnM2OxRQjqBxa5nKtRocRbFNk46xpB5fuOcJ6pKwWKo9equ6x
   RuZzbo8HkfmrP5a2GcA/Z+ncwjiyKbi7UefwGxaayGPiTFMEZIYVUHE6GDsRKYeJ
   nbylpzOtQMJqtRZitkC8BIDh52dZIi/GDPqB6fw4Cubpld9c5qNX575FuF0HUj5B
   lc0e4b7EihlNGu4mDUo8FJoHkVqVTFM6KtwhL9A5xdVjZ9XukX0uiaaI+LwzBKJs
   Y0zCt99hFp+dMwEc7wL7ECsXSFuH4RAnJn/QglYT9b1uO0MCAwEAATANBgkqhkiG
   9w0BAQsFAAOCAQEAHtUqqlWJ74LCFwVup2n0pUoIkHhUJdAv1lvSpyvA7sW/fKCU
   RhblmkqMy8i96xZGizuT86nUdf2XcufJhPFee7UopfZE4Ncya4te+7y/S17HM0uk
   LMEO1njLhzX+MDuLZOPPXw70JxN1oqxvyZKxrbvaOJ0O4duiEUOfKu//EYY0AdTl
   xCkHItiKEsmxjUPjroMd0APJp5aTPUS2c4moB9xjieft2uIG/7d/3gQfswnxJZcd
   EzQKclW4U28U1NVtcFhaNwEBC1H0TvBTp/8asl2aTOUP97wcLHPI9qzZWfAzizOU
   17S7MxNzjtt4i4/PQ7koIsq31wgmh2jDjh6mMw==
   -----END CERTIFICATE-----
   -----BEGIN PRIVATE KEY-----
   MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/rpOE0/u56aDI
   J2oefWWLuFczPjyJ0VW7L2GuEhH1/hszctN1ZlQrMZzNjsUUI6gcWuZyrUaHEWxT
   ZOOsaQeX7jnCeqSsFiqPXqrusUbmc26PB5H5qz+WthnAP2fp3MI4sim4u1Hn8BsW
   mshj4kxTBGSGFVBxOhg7ESmHiZ28paczrUDCarUWYrZAvASA4ednWSIvxgz6gen8
   OArm6ZXfXOajV+e+RbhdB1I+QZXNHuG+xIoZTRruJg1KPBSaB5FalUxTOircIS/Q
   OcXVY2fV7pF9LommiPi8MwSibGNMwrffYRafnTMBHO8C+xArF0hbh+EQJyZ/0IJW
   E/W9bjtDAgMBAAECggEAEoOQKBI5jBluuCZmb495EWe6tG5cdotLlorbCm8gYPws
   MGn01rANjSZ7mLcjffB7ulFlVMo7t6wNJHjoLKzwWNJfrdMeuKhjb/ma1Pc2e+fG
   U/ZNOSo7OBlan2EAbmwuLj+3G+qr3JUqaKKGnG8tJA+WjgTdAjK0SHA97KN0ItZK
   ZrZLEdrDTH+jCLl7eGzbAa7cMd24LyE9/Sz0IwJ+E2A2qoyBPGP8kRIByUH8pf94
   HnF7DzGBaV7UAC7xuzHPiV0vV+YNjvk236IbDCkGW5Y/j92KxmZKY1lIz/cDCNRD
   rAwZtRruIjNtgP9dNq44OQvjAvaFQIS+TMqJpqT3oQKBgQDftE5z/Hm/UyOyoh24
   GccisB37eDzDO7/rJq4l3/UvAu566xmI8W3ToQMaDbtOfGOoLKH3mPY8c+yYJrCt
   HM2uzxnFxPkfZ4I8JoplJ3pkNinYdX81jmmeO3gk6uzAgZOtSHSMP7TWkrTct/vf
   ZduvzlrGKtcbzfPuFdBABQeeaQKBgQDbWshIRzOkqku7X/4jj0qDa4dExtOzLzXw
   VsEV9sCXemMtFYmFWJAHeNvnfxKeBjtXa7skEQTojXcd/DJF1eTtLJNbpJpIUfiU
   BdqfmMvf7eDnsiUmzRlqxnc/bwhzzl3ac1gL0n7WXBA+HYEp5LhIlhGuzKlpIET3
   1sHKim7uywKBgQCyudOURzrd6Qa0SWGFHNNEm4DY0I97S9lhfl3UVMIG9UijXAHi
   r0EXu6RGxIHJiwfz7PTaZJMWaWe1h/PP2xtZdo0YvO5scL5UYFZhytC2D7APCJDB
   sS4hBVJP7IGKq/vYjfLPunY4mK13SmcpbK/AHhXYDZIe3MTuiu7+twYHQQKBgQDX
   4IZPq9NFcVvK8nP4pyLcJ80egNcD96iL+bVZWli8O3SzgAixtTE6SVWShNrbrqJk
   LOAmZKGCBQd/+R244QLF8CKuBFbaaeHMO96nRwcOQNwg6o/pmdwz21KsmSemYSi4
   vt+d8vFlIYHSv9LIWhKLTTXl5AGuNlXp2+8o2AjI9QKBgQDXQzJWmiVmTsBYOTWD
   YTp2o4Tn0HlLk3KHaBKHGiO0YGVuhXa2jz0u3jg5LLG7vusOZhQBkd4tN7L10ZMM
   l5jSr8uncW4/3gZ/O/URQZcMH+Uzttw8nVL3mzLS/M600I+ryZdLkrmtDQWUBRwj
   fRre92n5B+9AgpEl6RyegsXToA==
   -----END PRIVATE KEY-----";

   $domain_certs = $twilio->messaging->v1->domainCerts("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                         ->update("-----BEGIN CERTIFICATE----- 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 -----END CERTIFICATE----- -----BEGIN PRIVATE KEY----- 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000000 -----END PRIVATE KEY-----" // tlsCert
                                         );

   print($domain_certs->domainName);
   ```

   ```rb
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'rubygems'
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   cert_and_private_key = "-----BEGIN CERTIFICATE-----
   MIIDqDCCApACCQCBT5e22Q01fjANBgkqhkiG9w0BAQsFADCBlTELMAkGA1UEBhMC
   VVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRYwFAYDVQQK
   DA1FeGFtcGxlLCBJbmMuMRIwEAYDVQQLDAlUZXN0IERlcHQxFDASBgNVBAMMC2V4
   YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMB4XDTIz
   MDcyNjIwMjUwMVoXDTI0MDcyNTIwMjUwMVowgZUxCzAJBgNVBAYTAlVTMQswCQYD
   VQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEWMBQGA1UECgwNRXhhbXBs
   ZSwgSW5jLjESMBAGA1UECwwJVGVzdCBEZXB0MRQwEgYDVQQDDAtleGFtcGxlLmNv
   bTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcN
   AQEBBQADggEPADCCAQoCggEBAL+uk4TT+7npoMgnah59ZYu4VzM+PInRVbsvYa4S
   EfX+GzNy03VmVCsxnM2OxRQjqBxa5nKtRocRbFNk46xpB5fuOcJ6pKwWKo9equ6x
   RuZzbo8HkfmrP5a2GcA/Z+ncwjiyKbi7UefwGxaayGPiTFMEZIYVUHE6GDsRKYeJ
   nbylpzOtQMJqtRZitkC8BIDh52dZIi/GDPqB6fw4Cubpld9c5qNX575FuF0HUj5B
   lc0e4b7EihlNGu4mDUo8FJoHkVqVTFM6KtwhL9A5xdVjZ9XukX0uiaaI+LwzBKJs
   Y0zCt99hFp+dMwEc7wL7ECsXSFuH4RAnJn/QglYT9b1uO0MCAwEAATANBgkqhkiG
   9w0BAQsFAAOCAQEAHtUqqlWJ74LCFwVup2n0pUoIkHhUJdAv1lvSpyvA7sW/fKCU
   RhblmkqMy8i96xZGizuT86nUdf2XcufJhPFee7UopfZE4Ncya4te+7y/S17HM0uk
   LMEO1njLhzX+MDuLZOPPXw70JxN1oqxvyZKxrbvaOJ0O4duiEUOfKu//EYY0AdTl
   xCkHItiKEsmxjUPjroMd0APJp5aTPUS2c4moB9xjieft2uIG/7d/3gQfswnxJZcd
   EzQKclW4U28U1NVtcFhaNwEBC1H0TvBTp/8asl2aTOUP97wcLHPI9qzZWfAzizOU
   17S7MxNzjtt4i4/PQ7koIsq31wgmh2jDjh6mMw==
   -----END CERTIFICATE-----
   -----BEGIN PRIVATE KEY-----
   MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/rpOE0/u56aDI
   J2oefWWLuFczPjyJ0VW7L2GuEhH1/hszctN1ZlQrMZzNjsUUI6gcWuZyrUaHEWxT
   ZOOsaQeX7jnCeqSsFiqPXqrusUbmc26PB5H5qz+WthnAP2fp3MI4sim4u1Hn8BsW
   mshj4kxTBGSGFVBxOhg7ESmHiZ28paczrUDCarUWYrZAvASA4ednWSIvxgz6gen8
   OArm6ZXfXOajV+e+RbhdB1I+QZXNHuG+xIoZTRruJg1KPBSaB5FalUxTOircIS/Q
   OcXVY2fV7pF9LommiPi8MwSibGNMwrffYRafnTMBHO8C+xArF0hbh+EQJyZ/0IJW
   E/W9bjtDAgMBAAECggEAEoOQKBI5jBluuCZmb495EWe6tG5cdotLlorbCm8gYPws
   MGn01rANjSZ7mLcjffB7ulFlVMo7t6wNJHjoLKzwWNJfrdMeuKhjb/ma1Pc2e+fG
   U/ZNOSo7OBlan2EAbmwuLj+3G+qr3JUqaKKGnG8tJA+WjgTdAjK0SHA97KN0ItZK
   ZrZLEdrDTH+jCLl7eGzbAa7cMd24LyE9/Sz0IwJ+E2A2qoyBPGP8kRIByUH8pf94
   HnF7DzGBaV7UAC7xuzHPiV0vV+YNjvk236IbDCkGW5Y/j92KxmZKY1lIz/cDCNRD
   rAwZtRruIjNtgP9dNq44OQvjAvaFQIS+TMqJpqT3oQKBgQDftE5z/Hm/UyOyoh24
   GccisB37eDzDO7/rJq4l3/UvAu566xmI8W3ToQMaDbtOfGOoLKH3mPY8c+yYJrCt
   HM2uzxnFxPkfZ4I8JoplJ3pkNinYdX81jmmeO3gk6uzAgZOtSHSMP7TWkrTct/vf
   ZduvzlrGKtcbzfPuFdBABQeeaQKBgQDbWshIRzOkqku7X/4jj0qDa4dExtOzLzXw
   VsEV9sCXemMtFYmFWJAHeNvnfxKeBjtXa7skEQTojXcd/DJF1eTtLJNbpJpIUfiU
   BdqfmMvf7eDnsiUmzRlqxnc/bwhzzl3ac1gL0n7WXBA+HYEp5LhIlhGuzKlpIET3
   1sHKim7uywKBgQCyudOURzrd6Qa0SWGFHNNEm4DY0I97S9lhfl3UVMIG9UijXAHi
   r0EXu6RGxIHJiwfz7PTaZJMWaWe1h/PP2xtZdo0YvO5scL5UYFZhytC2D7APCJDB
   sS4hBVJP7IGKq/vYjfLPunY4mK13SmcpbK/AHhXYDZIe3MTuiu7+twYHQQKBgQDX
   4IZPq9NFcVvK8nP4pyLcJ80egNcD96iL+bVZWli8O3SzgAixtTE6SVWShNrbrqJk
   LOAmZKGCBQd/+R244QLF8CKuBFbaaeHMO96nRwcOQNwg6o/pmdwz21KsmSemYSi4
   vt+d8vFlIYHSv9LIWhKLTTXl5AGuNlXp2+8o2AjI9QKBgQDXQzJWmiVmTsBYOTWD
   YTp2o4Tn0HlLk3KHaBKHGiO0YGVuhXa2jz0u3jg5LLG7vusOZhQBkd4tN7L10ZMM
   l5jSr8uncW4/3gZ/O/URQZcMH+Uzttw8nVL3mzLS/M600I+ryZdLkrmtDQWUBRwj
   fRre92n5B+9AgpEl6RyegsXToA==
   -----END PRIVATE KEY-----"

   domain_certs = @client.messaging
     .v1
     .domain_certs('DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
     .update(
        tls_cert: cert_and_private_key
      )

   puts domain_certs.domain_name
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   CERT_AND_PRIVATE_KEY="-----BEGIN CERTIFICATE-----
   	MIIDqDCCApACCQCBT5e22Q01fjANBgkqhkiG9w0BAQsFADCBlTELMAkGA1UEBhMC
   	VVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRYwFAYDVQQK
   	DA1FeGFtcGxlLCBJbmMuMRIwEAYDVQQLDAlUZXN0IERlcHQxFDASBgNVBAMMC2V4
   	YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMB4XDTIz
   	MDcyNjIwMjUwMVoXDTI0MDcyNTIwMjUwMVowgZUxCzAJBgNVBAYTAlVTMQswCQYD
   	VQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEWMBQGA1UECgwNRXhhbXBs
   	ZSwgSW5jLjESMBAGA1UECwwJVGVzdCBEZXB0MRQwEgYDVQQDDAtleGFtcGxlLmNv
   	bTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcN
   	AQEBBQADggEPADCCAQoCggEBAL+uk4TT+7npoMgnah59ZYu4VzM+PInRVbsvYa4S
   	EfX+GzNy03VmVCsxnM2OxRQjqBxa5nKtRocRbFNk46xpB5fuOcJ6pKwWKo9equ6x
   	RuZzbo8HkfmrP5a2GcA/Z+ncwjiyKbi7UefwGxaayGPiTFMEZIYVUHE6GDsRKYeJ
   	nbylpzOtQMJqtRZitkC8BIDh52dZIi/GDPqB6fw4Cubpld9c5qNX575FuF0HUj5B
   	lc0e4b7EihlNGu4mDUo8FJoHkVqVTFM6KtwhL9A5xdVjZ9XukX0uiaaI+LwzBKJs
   	Y0zCt99hFp+dMwEc7wL7ECsXSFuH4RAnJn/QglYT9b1uO0MCAwEAATANBgkqhkiG
   	9w0BAQsFAAOCAQEAHtUqqlWJ74LCFwVup2n0pUoIkHhUJdAv1lvSpyvA7sW/fKCU
   	RhblmkqMy8i96xZGizuT86nUdf2XcufJhPFee7UopfZE4Ncya4te+7y/S17HM0uk
   	LMEO1njLhzX+MDuLZOPPXw70JxN1oqxvyZKxrbvaOJ0O4duiEUOfKu//EYY0AdTl
   	xCkHItiKEsmxjUPjroMd0APJp5aTPUS2c4moB9xjieft2uIG/7d/3gQfswnxJZcd
   	EzQKclW4U28U1NVtcFhaNwEBC1H0TvBTp/8asl2aTOUP97wcLHPI9qzZWfAzizOU
   	17S7MxNzjtt4i4/PQ7koIsq31wgmh2jDjh6mMw==
   	-----END CERTIFICATE-----
   	-----BEGIN PRIVATE KEY-----
   	MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/rpOE0/u56aDI
   	J2oefWWLuFczPjyJ0VW7L2GuEhH1/hszctN1ZlQrMZzNjsUUI6gcWuZyrUaHEWxT
   	ZOOsaQeX7jnCeqSsFiqPXqrusUbmc26PB5H5qz+WthnAP2fp3MI4sim4u1Hn8BsW
   	mshj4kxTBGSGFVBxOhg7ESmHiZ28paczrUDCarUWYrZAvASA4ednWSIvxgz6gen8
   	OArm6ZXfXOajV+e+RbhdB1I+QZXNHuG+xIoZTRruJg1KPBSaB5FalUxTOircIS/Q
   	OcXVY2fV7pF9LommiPi8MwSibGNMwrffYRafnTMBHO8C+xArF0hbh+EQJyZ/0IJW
   	E/W9bjtDAgMBAAECggEAEoOQKBI5jBluuCZmb495EWe6tG5cdotLlorbCm8gYPws
   	MGn01rANjSZ7mLcjffB7ulFlVMo7t6wNJHjoLKzwWNJfrdMeuKhjb/ma1Pc2e+fG
   	U/ZNOSo7OBlan2EAbmwuLj+3G+qr3JUqaKKGnG8tJA+WjgTdAjK0SHA97KN0ItZK
   	ZrZLEdrDTH+jCLl7eGzbAa7cMd24LyE9/Sz0IwJ+E2A2qoyBPGP8kRIByUH8pf94
   	HnF7DzGBaV7UAC7xuzHPiV0vV+YNjvk236IbDCkGW5Y/j92KxmZKY1lIz/cDCNRD
   	rAwZtRruIjNtgP9dNq44OQvjAvaFQIS+TMqJpqT3oQKBgQDftE5z/Hm/UyOyoh24
   	GccisB37eDzDO7/rJq4l3/UvAu566xmI8W3ToQMaDbtOfGOoLKH3mPY8c+yYJrCt
   	HM2uzxnFxPkfZ4I8JoplJ3pkNinYdX81jmmeO3gk6uzAgZOtSHSMP7TWkrTct/vf
   	ZduvzlrGKtcbzfPuFdBABQeeaQKBgQDbWshIRzOkqku7X/4jj0qDa4dExtOzLzXw
   	VsEV9sCXemMtFYmFWJAHeNvnfxKeBjtXa7skEQTojXcd/DJF1eTtLJNbpJpIUfiU
   	BdqfmMvf7eDnsiUmzRlqxnc/bwhzzl3ac1gL0n7WXBA+HYEp5LhIlhGuzKlpIET3
   	1sHKim7uywKBgQCyudOURzrd6Qa0SWGFHNNEm4DY0I97S9lhfl3UVMIG9UijXAHi
   	r0EXu6RGxIHJiwfz7PTaZJMWaWe1h/PP2xtZdo0YvO5scL5UYFZhytC2D7APCJDB
   	sS4hBVJP7IGKq/vYjfLPunY4mK13SmcpbK/AHhXYDZIe3MTuiu7+twYHQQKBgQDX
   	4IZPq9NFcVvK8nP4pyLcJ80egNcD96iL+bVZWli8O3SzgAixtTE6SVWShNrbrqJk
   	LOAmZKGCBQd/+R244QLF8CKuBFbaaeHMO96nRwcOQNwg6o/pmdwz21KsmSemYSi4
   	vt+d8vFlIYHSv9LIWhKLTTXl5AGuNlXp2+8o2AjI9QKBgQDXQzJWmiVmTsBYOTWD
   	YTp2o4Tn0HlLk3KHaBKHGiO0YGVuhXa2jz0u3jg5LLG7vusOZhQBkd4tN7L10ZMM
   	l5jSr8uncW4/3gZ/O/URQZcMH+Uzttw8nVL3mzLS/M600I+ryZdLkrmtDQWUBRwj
   	fRre92n5B+9AgpEl6RyegsXToA==
   	-----END PRIVATE KEY-----"

   twilio api:messaging:v1:link-shortening:domains:certificate:update \
       --domain-sid DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
       --tls-cert $CERT_AND_PRIVATE_KEY
   ```

   ```bash
   CERT_AND_PRIVATE_KEY="-----BEGIN CERTIFICATE-----
   	MIIDqDCCApACCQCBT5e22Q01fjANBgkqhkiG9w0BAQsFADCBlTELMAkGA1UEBhMC
   	VVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRYwFAYDVQQK
   	DA1FeGFtcGxlLCBJbmMuMRIwEAYDVQQLDAlUZXN0IERlcHQxFDASBgNVBAMMC2V4
   	YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMB4XDTIz
   	MDcyNjIwMjUwMVoXDTI0MDcyNTIwMjUwMVowgZUxCzAJBgNVBAYTAlVTMQswCQYD
   	VQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEWMBQGA1UECgwNRXhhbXBs
   	ZSwgSW5jLjESMBAGA1UECwwJVGVzdCBEZXB0MRQwEgYDVQQDDAtleGFtcGxlLmNv
   	bTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJKoZIhvcN
   	AQEBBQADggEPADCCAQoCggEBAL+uk4TT+7npoMgnah59ZYu4VzM+PInRVbsvYa4S
   	EfX+GzNy03VmVCsxnM2OxRQjqBxa5nKtRocRbFNk46xpB5fuOcJ6pKwWKo9equ6x
   	RuZzbo8HkfmrP5a2GcA/Z+ncwjiyKbi7UefwGxaayGPiTFMEZIYVUHE6GDsRKYeJ
   	nbylpzOtQMJqtRZitkC8BIDh52dZIi/GDPqB6fw4Cubpld9c5qNX575FuF0HUj5B
   	lc0e4b7EihlNGu4mDUo8FJoHkVqVTFM6KtwhL9A5xdVjZ9XukX0uiaaI+LwzBKJs
   	Y0zCt99hFp+dMwEc7wL7ECsXSFuH4RAnJn/QglYT9b1uO0MCAwEAATANBgkqhkiG
   	9w0BAQsFAAOCAQEAHtUqqlWJ74LCFwVup2n0pUoIkHhUJdAv1lvSpyvA7sW/fKCU
   	RhblmkqMy8i96xZGizuT86nUdf2XcufJhPFee7UopfZE4Ncya4te+7y/S17HM0uk
   	LMEO1njLhzX+MDuLZOPPXw70JxN1oqxvyZKxrbvaOJ0O4duiEUOfKu//EYY0AdTl
   	xCkHItiKEsmxjUPjroMd0APJp5aTPUS2c4moB9xjieft2uIG/7d/3gQfswnxJZcd
   	EzQKclW4U28U1NVtcFhaNwEBC1H0TvBTp/8asl2aTOUP97wcLHPI9qzZWfAzizOU
   	17S7MxNzjtt4i4/PQ7koIsq31wgmh2jDjh6mMw==
   	-----END CERTIFICATE-----
   	-----BEGIN PRIVATE KEY-----
   	MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/rpOE0/u56aDI
   	J2oefWWLuFczPjyJ0VW7L2GuEhH1/hszctN1ZlQrMZzNjsUUI6gcWuZyrUaHEWxT
   	ZOOsaQeX7jnCeqSsFiqPXqrusUbmc26PB5H5qz+WthnAP2fp3MI4sim4u1Hn8BsW
   	mshj4kxTBGSGFVBxOhg7ESmHiZ28paczrUDCarUWYrZAvASA4ednWSIvxgz6gen8
   	OArm6ZXfXOajV+e+RbhdB1I+QZXNHuG+xIoZTRruJg1KPBSaB5FalUxTOircIS/Q
   	OcXVY2fV7pF9LommiPi8MwSibGNMwrffYRafnTMBHO8C+xArF0hbh+EQJyZ/0IJW
   	E/W9bjtDAgMBAAECggEAEoOQKBI5jBluuCZmb495EWe6tG5cdotLlorbCm8gYPws
   	MGn01rANjSZ7mLcjffB7ulFlVMo7t6wNJHjoLKzwWNJfrdMeuKhjb/ma1Pc2e+fG
   	U/ZNOSo7OBlan2EAbmwuLj+3G+qr3JUqaKKGnG8tJA+WjgTdAjK0SHA97KN0ItZK
   	ZrZLEdrDTH+jCLl7eGzbAa7cMd24LyE9/Sz0IwJ+E2A2qoyBPGP8kRIByUH8pf94
   	HnF7DzGBaV7UAC7xuzHPiV0vV+YNjvk236IbDCkGW5Y/j92KxmZKY1lIz/cDCNRD
   	rAwZtRruIjNtgP9dNq44OQvjAvaFQIS+TMqJpqT3oQKBgQDftE5z/Hm/UyOyoh24
   	GccisB37eDzDO7/rJq4l3/UvAu566xmI8W3ToQMaDbtOfGOoLKH3mPY8c+yYJrCt
   	HM2uzxnFxPkfZ4I8JoplJ3pkNinYdX81jmmeO3gk6uzAgZOtSHSMP7TWkrTct/vf
   	ZduvzlrGKtcbzfPuFdBABQeeaQKBgQDbWshIRzOkqku7X/4jj0qDa4dExtOzLzXw
   	VsEV9sCXemMtFYmFWJAHeNvnfxKeBjtXa7skEQTojXcd/DJF1eTtLJNbpJpIUfiU
   	BdqfmMvf7eDnsiUmzRlqxnc/bwhzzl3ac1gL0n7WXBA+HYEp5LhIlhGuzKlpIET3
   	1sHKim7uywKBgQCyudOURzrd6Qa0SWGFHNNEm4DY0I97S9lhfl3UVMIG9UijXAHi
   	r0EXu6RGxIHJiwfz7PTaZJMWaWe1h/PP2xtZdo0YvO5scL5UYFZhytC2D7APCJDB
   	sS4hBVJP7IGKq/vYjfLPunY4mK13SmcpbK/AHhXYDZIe3MTuiu7+twYHQQKBgQDX
   	4IZPq9NFcVvK8nP4pyLcJ80egNcD96iL+bVZWli8O3SzgAixtTE6SVWShNrbrqJk
   	LOAmZKGCBQd/+R244QLF8CKuBFbaaeHMO96nRwcOQNwg6o/pmdwz21KsmSemYSi4
   	vt+d8vFlIYHSv9LIWhKLTTXl5AGuNlXp2+8o2AjI9QKBgQDXQzJWmiVmTsBYOTWD
   	YTp2o4Tn0HlLk3KHaBKHGiO0YGVuhXa2jz0u3jg5LLG7vusOZhQBkd4tN7L10ZMM
   	l5jSr8uncW4/3gZ/O/URQZcMH+Uzttw8nVL3mzLS/M600I+ryZdLkrmtDQWUBRwj
   	fRre92n5B+9AgpEl6RyegsXToA==
   	-----END PRIVATE KEY-----"

   curl -X POST "https://messaging.twilio.com/v1/LinkShortening/Domains/DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Certificate" \
   --data-urlencode "TlsCert=$CERT_AND_PRIVATE_KEY"
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
       "certificate_sid": "CWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
       "domain_name": "https://www.example.com",
       "domain_sid": "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
       "date_expires": "2021-02-06T18:02:04Z",
       "date_created": "2021-02-06T18:02:04Z",
       "date_updated": "2021-02-06T18:02:04Z",
       "url": "https://messaging.twilio.com/v1/LinkShortening/Domains/DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Certificate",
       "cert_in_validation": {
           "date_expires": "2021-02-06T18:02:04Z",
           "status": "pending"
       }
   }
   ```
2. Check the domain's certificate validation by sending a `GET` request to your Link Shortening domain's Certificate subresource. An example request is shown below.

   If the certificate's validation is still pending, Twilio's response to this `GET` request contains a `cert_in_validation.status` property with a value of `pending`.

   Once the certificate has been validated, Twilio's response to this `GET` request contains a `cert_in_validation` property with a value of `null`.

   Check your Link Shortening domain's certificate validation status

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function fetchDomainCertV4() {
     const domainCert = await client.messaging.v1
       .domainCerts("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
       .fetch();

     console.log(domainCert.domainSid);
   }

   fetchDomainCertV4();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   domain_cert = client.messaging.v1.domain_certs(
       "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   ).fetch()

   print(domain_cert.domain_sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Messaging.V1;
   using System.Threading.Tasks;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var domainCerts =
               await DomainCertsResource.FetchAsync(pathDomainSid: "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

           Console.WriteLine(domainCerts.DomainSid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.Twilio;
   import com.twilio.rest.messaging.v1.DomainCerts;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           DomainCerts domainCerts = DomainCerts.fetcher("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

           System.out.println(domainCerts.getDomainSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	resp, err := client.MessagingV1.FetchDomainCertV4("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.DomainSid != nil {
   			fmt.Println(*resp.DomainSid)
   		} else {
   			fmt.Println(resp.DomainSid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $domain_cert = $twilio->messaging->v1
       ->domainCerts("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
       ->fetch();

   print $domain_cert->domainSid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   domain_cert = @client
                 .messaging
                 .v1
                 .domain_certs('DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                 .fetch

   puts domain_cert.domain_sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:messaging:v1:link-shortening:domains:certificate:fetch \
      --domain-sid DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

   ```bash
   curl -X GET "https://messaging.twilio.com/v1/LinkShortening/Domains/DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Certificate" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "certificate_sid": "CWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "domain_name": "https://api.example.com",
     "domain_sid": "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     "date_expires": "2021-02-06T18:02:04Z",
     "date_created": "2021-02-06T18:02:04Z",
     "date_updated": "2021-02-06T18:02:04Z",
     "url": "https://messaging.twilio.com/v1/LinkShortening/Domains/DNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Certificate",
     "cert_in_validation": {
       "date_expires": "2021-02-06T18:02:04Z",
       "status": "pending"
     }
   }
   ```

## Configure your domain's default behavior

This section covers how to configure your Link Shortening domain's default behavior.

The table below describes the domain default settings that can be configured.

| Domain default setting                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fallback URL                                                                                             | The URL to which Twilio redirects recipients after [a shortened link has expired](/docs/messaging/features/link-shortening#link-expiration).                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Callback URL                                                                                             | The URL to which Twilio sends [click event data](/docs/messaging/features/link-shortening#track-customer-engagement-with-click-events). Twilio sends a request to the Callback URL after a recipient clicks on a shortened link.                                                                                                                                                                                                                                                                                                                                                     |
| Deliver messages anyway in case of Link Shortening failure (Console)<br /><br /> ContinueOnFailure (API) | If there is an error with Link Shortening (e.g. changes to your domain verification or an expired certificate), you can tell Twilio to send messages with the original long links or to not send the messages.<br /><br /> The default behavior is to continue sending messages with the original long links (default value is `true`). This may result in multiple [message segments](https://www.twilio.com/blog/what-the-heck-is-a-segment), which may incur higher costs.<br /><br /> **Note**: This setting only affects Messages with a `ShortenUrls` parameter set to `true`. |
| Disable HTTPS                                                                                            | Whether or not Twilio removes the *https://* prefix from shortened links.<br /><br /> If `true`, shortened links do not have the *https://* prefix (e.g., `twil.io/j9kj9K3huK9u7`).<br /><br /> If set to `false`, shortened links have the *https://* prefix (e.g., `https://twil.io/j9kj9K3huK9u7`).<br /><br /> Default value is `false`. It takes up to 15 minutes for the change to be applied.                                                                                                                                                                                 |

Link Shortening domain default configurations are associated with the domain rather than a Messaging Service. This means that you can update the domain defaults and the changes apply to all Messaging Services that use the Link Shortening domain.

> \[!NOTE]
>
> In the future, if you want to change a Link Shortening domain's default
> configuration, repeat the steps in this section.

If you're using the Console, follow the **Console** steps below. If you're using the REST API, use the **API** steps below.

**Console**

1. In the Domain configuration section, fill in the following fields:

   * **Domain fallback URL**
   * **Click tracking callback URL**
2. Select or deselect the checkboxes for the following fields:
   * **Disable "https://" prefix**
   * **Deliver messages anyway in case of Link Shortening failure**
3. Click **Save**.
4. Go to the ["Next Steps" section below](#next-steps).

**API**

1. Send a `POST` request to the Link Shortening domain's Config subresource with the following parameters:

   * `FallbackUrl`
   * `CallbackUrl`
   * `ContinueOnFailure`
   * `DisableHttps`

   A sample request is shown below.

Configure your domain's default behavior

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateDomainConfig() {
  const domainConfig = await client.messaging.v1
    .domainConfig("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({
      callbackUrl: "https://example.com/my-click-event-callback-endpoint",
      continueOnFailure: true,
      disableHttps: true,
      fallbackUrl: "https://example.com/",
    });

  console.log(domainConfig.domainSid);
}

updateDomainConfig();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

domain_config = client.messaging.v1.domain_config(
    "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).update(
    continue_on_failure=True,
    disable_https=True,
    fallback_url="https://example.com/",
    callback_url="https://example.com/my-click-event-callback-endpoint",
)

print(domain_config.domain_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var domainConfig = await DomainConfigResource.UpdateAsync(
            continueOnFailure: true,
            disableHttps: true,
            fallbackUrl: new Uri("https://example.com/"),
            callbackUrl: new Uri("https://example.com/my-click-event-callback-endpoint"),
            pathDomainSid: "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(domainConfig.DomainSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.DomainConfig;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        DomainConfig domainConfig =
            DomainConfig.updater("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .setContinueOnFailure(true)
                .setDisableHttps(true)
                .setFallbackUrl(URI.create("https://example.com/"))
                .setCallbackUrl(URI.create("https://example.com/my-click-event-callback-endpoint"))
                .update();

        System.out.println(domainConfig.getDomainSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.UpdateDomainConfigParams{}
	params.SetContinueOnFailure(true)
	params.SetDisableHttps(true)
	params.SetFallbackUrl("https://example.com/")
	params.SetCallbackUrl("https://example.com/my-click-event-callback-endpoint")

	resp, err := client.MessagingV1.UpdateDomainConfig("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.DomainSid != nil {
			fmt.Println(*resp.DomainSid)
		} else {
			fmt.Println(resp.DomainSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$domain_config = $twilio->messaging->v1
    ->domainConfig("DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update([
        "continueOnFailure" => true,
        "disableHttps" => true,
        "fallbackUrl" => "https://example.com/",
        "callbackUrl" => "https://example.com/my-click-event-callback-endpoint",
    ]);

print $domain_config->domainSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

domain_config = @client
                .messaging
                .v1
                .domain_config('DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                .update(
                  continue_on_failure: true,
                  disable_https: true,
                  fallback_url: 'https://example.com/',
                  callback_url: 'https://example.com/my-click-event-callback-endpoint'
                )

puts domain_config.domain_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:link-shortening:domains:config:update \
   --domain-sid DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --continue-on-failure \
   --disable-https \
   --fallback-url https://example.com/ \
   --callback-url https://example.com/my-click-event-callback-endpoint
```

```bash
curl -X POST "https://messaging.twilio.com/v1/LinkShortening/Domains/DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Config" \
--data-urlencode "ContinueOnFailure=true" \
--data-urlencode "DisableHttps=true" \
--data-urlencode "FallbackUrl=https://example.com/" \
--data-urlencode "CallbackUrl=https://example.com/my-click-event-callback-endpoint" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "domain_sid": "DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "config_sid": "ZKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "fallback_url": "https://example.com/",
  "callback_url": "https://example.com/my-click-event-callback-endpoint",
  "continue_on_failure": true,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://messaging.twilio.com/v1/LinkShortening/Domains/DNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Config",
  "disable_https": true
}
```

## Next steps

* [Send a message with a shortened link](/docs/messaging/features/link-shortening#send-a-message-with-a-shortened-link)
* Check out one of the following Blog posts:

  * [How to Schedule and Track Marketing Campaigns](https://www.twilio.com/blog/how-to-schedule-and-track-marketing-campaigns)
  * [Advanced Guide to Link Shortening and Link Tracking with Twilio Messaging](https://www.twilio.com/blog/setup-link-shortening-click-tracking)
  * [Link Shortening and Click Tracking SSL FAQ](https://www.twilio.com/blog/link-shortening-and-click-tracking-ssl-faq)
