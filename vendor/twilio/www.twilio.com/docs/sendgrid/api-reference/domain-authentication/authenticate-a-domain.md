# Authenticate a domain

## API Overview

An authenticated domain allows you to remove the "via" or "sent on behalf of" message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will get 2 TXT records and 1 MX record.

Domain Authentication was formerly called "Domain Whitelabel".

For more information, please see [How to set up domain authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication/).

> \[!NOTE]
>
> Each user may have a maximum of 3,000 authenticated domains and 3,000 link brandings. This limit is at the user level, meaning each Subuser belonging to a parent account may have its own 3,000 authenticated domains and 3,000 link brandings.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/whitelabel/domains","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

**This endpoint allows you to authenticate a domain.**

If you are authenticating a domain for a subuser, you have two options:

1. Use the "username" parameter. This allows you to authenticate a domain on behalf of your subuser. This means the subuser is able to see and modify the authenticated domain.
2. Use the Association workflow (see Associate Domain section). This allows you to authenticate a domain created by the parent to a subuser. This means the subuser will default to the assigned domain, but will not be able to see or modify that authenticated domain. However, if the subuser authenticates their own domain it will overwrite the assigned domain.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"on-behalf-of","in":"header","description":"The `on-behalf-of` header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. You will use the parent account's API key when using this header. When making a call on behalf of a customer account, the property value should be \"account-id\" followed by the customer account's ID (e.g., `on-behalf-of: account-id <account-id>`). When making a call on behalf of a Subuser, the property value should be the Subuser's username (e.g., `on-behalf-of: <subuser-username>`). See [**On Behalf Of**](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/on-behalf-of) for more information.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/OnBehalfOf","modelName":"__components_parameters_OnBehalfOf"}]
```

### Request body

```json
{"schema":{"type":"object","required":["domain"],"example":{"domain":"example.com","subdomain":"news","username":"john@example.com","ips":["192.168.1.1","192.168.1.2"],"custom_spf":true,"default":true,"automatic_security":false,"custom_dkim_selector":"string","region":"global"},"properties":{"domain":{"type":"string","description":"Domain being authenticated."},"subdomain":{"type":"string","description":"The subdomain or custom return-path to use for this authenticated domain."},"username":{"type":"string","description":"The username associated with this domain."},"ips":{"type":"array","description":"The IP addresses that will be included in the custom SPF record for this authenticated domain.","items":{"type":"string"}},"custom_spf":{"type":"boolean","description":"Specify whether to use a custom SPF or allow SendGrid to manage your SPF. This option is only available to authenticated domains set up for manual security."},"default":{"type":"boolean","description":"Whether to use this authenticated domain as the fallback if no authenticated domains match the sender's domain."},"automatic_security":{"type":"boolean","description":"Whether to allow SendGrid to manage your SPF records, DKIM keys, and DKIM key rotation."},"custom_dkim_selector":{"type":"string","description":"Add a custom DKIM selector. Accepts three letters or numbers."},"region":{"type":"string","description":"The region of the domain. Allowed values are `global` and `eu`. The default value is `global`."}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"201","schema":{"description":"","content":{"application/json":{"schema":{"title":"Domain Authentication - Mandatory Subdomain","type":"object","required":["id","user_id","subdomain","domain","username","ips","custom_spf","default","legacy","automatic_security","valid","dns"],"example":{"id":45373692,"user_id":66036447,"subdomain":"sub","domain":"example.com","username":"jdoe","ips":["127.0.0.1"],"custom_spf":false,"default":true,"legacy":false,"automatic_security":true,"valid":true,"dns":{"mail_cname":{"valid":true,"type":"cname","host":"mail.example.com","data":"u7.wl.sendgrid.net"},"dkim1":{"valid":true,"type":"cname","host":"s1._domainkey.example.com","data":"s1._domainkey.u7.wl.sendgrid.net"},"dkim2":{"valid":true,"type":"cname","host":"s2._domainkey.example.com","data":"s2._domainkey.u7.wl.sendgrid.net"}}},"refName":"AuthenticatedDomain","modelName":"AuthenticatedDomain","properties":{"id":{"type":"number","description":"The ID of the authenticated domain."},"user_id":{"type":"number","description":"The ID of the user that this domain is associated with."},"subdomain":{"type":"string","description":"The subdomain or custom return-path to use for this authenticated domain."},"domain":{"type":"string","description":"The domain to be authenticated."},"username":{"type":"string","description":"The username that this domain will be associated with."},"ips":{"type":"array","description":"The IPs to be included in the custom SPF record for this authenticated domain.","items":{"type":"string"}},"custom_spf":{"type":"boolean","description":"Indicates whether this authenticated domain uses custom SPF."},"default":{"type":"boolean","description":"Indicates if this is the default authenticated domain."},"legacy":{"type":"boolean","description":"Indicates if this authenticated domain was created using the legacy whitelabel tool. If it is a legacy whitelabel, it will still function, but you'll need to create a new authenticated domain if you need to update it."},"automatic_security":{"type":"boolean","description":"Indicates if this authenticated domain uses automated security."},"valid":{"type":"boolean","description":"Indicates if this is a valid authenticated domain."},"dns":{"type":"object","description":"The DNS records used to authenticate the sending domain.","required":["mail_cname","dkim1","dkim2"],"properties":{"mail_cname":{"type":"object","description":"The CNAME for your sending domain that points to sendgrid.net.","required":["valid","type","host","data"],"properties":{"valid":{"type":"boolean","description":"Indicates if this is a valid CNAME."},"type":{"type":"string","description":"The type of DNS record."},"host":{"type":"string","description":"The domain that this CNAME is created for.","format":"hostname"},"data":{"type":"string","description":"The CNAME record."}}},"dkim1":{"type":"object","description":"A DNS record.","required":["valid","type","host","data"],"properties":{"valid":{"type":"boolean","description":"Indicates if this is a valid DNS record."},"type":{"type":"string","description":"The type of DNS record."},"host":{"type":"string","description":"The domain that this DNS record was created for."},"data":{"type":"string","description":"The DNS record."}}},"dkim2":{"type":"object","description":"A DNS record.","required":["valid","type","host","data"],"properties":{"valid":{"type":"boolean","description":"Indicates if this is a valid DNS record."},"type":{"type":"string","description":"The type of DNS record."},"host":{"type":"string","description":"The domain that this DNS record was created for."},"data":{"type":"string","description":"The DNS record."}}}}}}},"examples":{"response":{"value":{"id":302183,"user_id":1446226,"subdomain":"example","domain":"example.com","username":"mbernier","ips":[],"custom_spf":false,"default":true,"legacy":false,"automatic_security":true,"valid":false,"dns":{"mail_cname":{"valid":false,"type":"cname","host":"example.example.com","data":"u1446226.wl.sendgrid.net"},"dkim1":{"valid":false,"type":"cname","host":"s1._domainkey.example.com","data":"s1.domainkey.u1446226.wl.sendgrid.net"},"dkim2":{"valid":false,"type":"cname","host":"s2._domainkey.example.com","data":"s2.domainkey.u1446226.wl.sendgrid.net"}}}}}}}}}]
```

Authenticate a domain

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  domain: "example.com",
  subdomain: "news",
  username: "john@example.com",
  ips: ["192.168.1.1", "192.168.1.2"],
  custom_spf: true,
  default: true,
  automatic_security: false,
  custom_dkim_selector: "string",
  region: "global",
};

const request = {
  url: `/v3/whitelabel/domains`,
  method: "POST",
  body: data,
};

client
  .request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
  .catch((error) => {
    console.error(error);
  });
```

```python
import os
from sendgrid import SendGridAPIClient


sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))

data = {
    "domain": "example.com",
    "subdomain": "news",
    "username": "john@example.com",
    "ips": ["192.168.1.1", "192.168.1.2"],
    "custom_spf": True,
    "default": True,
    "automatic_security": False,
    "custom_dkim_selector": "string",
    "region": "global",
}

response = sg.client.whitelabel.domains.post(request_body=data)

print(response.status_code)
print(response.body)
print(response.headers)
```

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SendGrid;

public class Program {
    public static async Task Main() {
        string apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        var client = new SendGridClient(apiKey);

        var data =
            @"{
            ""domain"": ""example.com"",
            ""subdomain"": ""news"",
            ""username"": ""john@example.com"",
            ""ips"": [
                ""192.168.1.1"",
                ""192.168.1.2""
            ],
            ""custom_spf"": true,
            ""default"": true,
            ""automatic_security"": false,
            ""custom_dkim_selector"": ""string"",
            ""region"": ""global""
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST, urlPath: "whitelabel/domains", requestBody: data);

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;
import org.json.JSONObject;
import java.util.HashMap;
import java.util.Arrays;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("/whitelabel/domains");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("domain", "example.com");
                    put("subdomain", "news");
                    put("username", "john@example.com");
                    put("ips", Arrays.asList("192.168.1.1", "192.168.1.2"));
                    put("custom_spf", true);
                    put("default", true);
                    put("automatic_security", false);
                    put("custom_dkim_selector", "string");
                    put("region", "global");
                }
            }).toString());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
```

```go
package main

import (
	"fmt"
	"github.com/sendgrid/sendgrid-go"
	"os"
)

func main() {
	apiKey := os.Getenv("SENDGRID_API_KEY")
	host := "https://api.sendgrid.com"
	request := sendgrid.GetRequest(apiKey, "/v3/whitelabel/domains", host)
	request.Method = "POST"
	request.Body = []byte(`{
  "domain": "example.com",
  "subdomain": "news",
  "username": "john@example.com",
  "ips": [
    "192.168.1.1",
    "192.168.1.2"
  ],
  "custom_spf": true,
  "default": true,
  "automatic_security": false,
  "custom_dkim_selector": "string",
  "region": "global"
}`)
	response, err := sendgrid.API(request)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
```

```php
<?php
// Uncomment the next line if you're using a dependency loader (such as Composer) (recommended)
// require 'vendor/autoload.php';

// Uncomment next line if you're not using a dependency loader (such as Composer)
// require_once '<PATH TO>/sendgrid-php.php';

$apiKey = getenv("SENDGRID_API_KEY");
$sg = new \SendGrid($apiKey);
$request_body = json_decode('{
    "domain": "example.com",
    "subdomain": "news",
    "username": "john@example.com",
    "ips": [
        "192.168.1.1",
        "192.168.1.2"
    ],
    "custom_spf": true,
    "default": true,
    "automatic_security": false,
    "custom_dkim_selector": "string",
    "region": "global"
}');

try {
    $response = $sg->client
        ->whitelabel()
        ->domains()
        ->post($request_body);
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $ex) {
    echo "Caught exception: " . $ex->getMessage();
}
```

```ruby
require 'sendgrid-ruby'
include SendGrid

sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
data = JSON.parse('{
  "domain": "example.com",
  "subdomain": "news",
  "username": "john@example.com",
  "ips": [
    "192.168.1.1",
    "192.168.1.2"
  ],
  "custom_spf": true,
  "default": true,
  "automatic_security": false,
  "custom_dkim_selector": "string",
  "region": "global"
}')

response = sg.client.whitelabel.domains.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/whitelabel/domains" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"domain": "example.com", "subdomain": "news", "username": "john@example.com", "ips": ["192.168.1.1", "192.168.1.2"], "custom_spf": true, "default": true, "automatic_security": false, "custom_dkim_selector": "string", "region": "global"}'
```
