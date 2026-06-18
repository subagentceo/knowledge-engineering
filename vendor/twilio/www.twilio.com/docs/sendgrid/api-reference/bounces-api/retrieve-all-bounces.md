# Retrieve all bounces

## API Overview

An email is considered [bounced](/docs/sendgrid/glossary/bounces/) when the message is undeliverable and then returned to the server that sent it. Bounced emails can be either permanent or temporary failures to deliver the message.

For more information, see our [Bounces documentation](/docs/sendgrid/ui/sending-email/bounces/).

You can also manage bounced emails from the [Suppression settings menu in the Twilio SendGrid App](https://app.sendgrid.com/suppressions/bounces).

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/suppression/bounces","method":"get","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

**This endpoint allows you to retrieve a paginated list of all your bounces.**

You can use the `limit` query parameter to set the page size. If your list contains more items than the page size permits, you can make multiple requests. Use the `offset` query parameter to control the position in the list from which to start retrieving additional items.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"Accept","in":"header","required":true,"schema":{"type":"string","default":"application/json"}},{"name":"on-behalf-of","in":"header","description":"The `on-behalf-of` header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. You will use the parent account's API key when using this header. When making a call on behalf of a customer account, the property value should be \"account-id\" followed by the customer account's ID (e.g., `on-behalf-of: account-id <account-id>`). When making a call on behalf of a Subuser, the property value should be the Subuser's username (e.g., `on-behalf-of: <subuser-username>`). It is important to use the Base URL that corresponds to the region of the account or Subuser you specify in the `on-behalf-of` header. See [**On Behalf Of**](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/on-behalf-of) for more information.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/OnBehalfOf","modelName":"__components_parameters_OnBehalfOf"}]
```

### Query string

```json
[{"name":"start_time","in":"query","description":"Refers start of the time range in unix timestamp when a bounce was created (inclusive).","schema":{"type":"integer"}},{"name":"end_time","in":"query","description":"Refers end of the time range in unix timestamp when a bounce was created (inclusive).","schema":{"type":"integer"}},{"name":"limit","in":"query","required":false,"description":"`limit` sets the page size, i.e. maximum number of items from the list to be returned for a single API request. If omitted, the default page size is used. The maximum page size for this endpoint is 500 items per page.","schema":{"type":"integer","minimum":1,"maximum":500},"refName":"#/components/parameters/PaginationCommonLimit","modelName":"__components_parameters_PaginationCommonLimit"},{"name":"offset","in":"query","required":false,"description":"The number of items in the list to skip over before starting to retrieve the items for the requested page. The default `offset` of `0` represents the beginning of the list, i.e. the start of the first page. To request the second page of the list, set the `offset` to the page size as determined by `limit`. Use multiples of the page size as your `offset` to request further consecutive pages. E.g. assume your page size is set to `10`. An `offset` of `10` requests the second page, an `offset` of `20` requests the third page and so on, provided there are sufficiently many items in your list.","schema":{"type":"integer","minimum":0,"default":0},"refName":"#/components/parameters/PaginationCommonOffset","modelName":"__components_parameters_PaginationCommonOffset"},{"name":"email","in":"query","description":"Specifies which records to return based on the records' associated email addresses. For example, `sales` returns records with email addresses that start with 'sales', such as `salesdepartment@example.com` or `sales@example.com`.  You can also use `%25` as a wildcard. For example, `%25market` returns records containing email addresses with the string 'market' anywhere in the email address, and `%25market%25tree` returns records containing email addresses with the string 'market' followed by the string 'tree'. Any reserved characters should be [percent-encoded](https://en.wikipedia.org/wiki/Percent-encoding#Reserved_characters), e.g., the `@` symbol should be encoded as `%40`.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/EmailPartialMatch","modelName":"__components_parameters_EmailPartialMatch"}]
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"type":"array","items":{"title":"Bounce Response","type":"object","example":{"created":1250337600,"email":"example@example.com","reason":"550 5.1.1 The email account that you tried to reach does not exist. Please try double-checking the recipient's email address for typos or unnecessary spaces. Learn more at  https://support.google.com/mail/answer/6596 o186si2389584ioe.63 - gsmtp ","status":"5.1.1"},"refName":"BounceResponse","modelName":"BounceResponse","properties":{"created":{"type":"number","description":"The unix timestamp for when the bounce record was created at SendGrid."},"email":{"type":"string","format":"email","description":"The email address that was added to the bounce list."},"reason":{"type":"string","description":"The reason for the bounce. This typically will be a bounce code, an enhanced code, and a description."},"status":{"type":"string","description":"Enhanced SMTP bounce response"}}}},"examples":{"response":{"value":[{"created":1250337600,"email":"example@example.com","reason":"550 5.1.1 The email account that you tried to reach does not exist. Please try double-checking the recipient's email address for typos or unnecessary spaces. Learn more at  https://support.google.com/mail/answer/6596 o186si2389584ioe.63 - gsmtp ","status":"5.1.1"},{"created":1250337600,"email":"example@example.com","reason":"550 5.1.1 <testemail2@testing.com>: Recipient address rejected: User unknown in virtual alias table ","status":"5.1.1"}]}}}}}},{"responseCode":"401","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}}}}]
```

## Retrieving paginated results

To perform a request for the first page of the paginated list of all bounces using the default page size, you can omit the `limit` and `offset` query parameters:

Retrieve first page from list of all bounces

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const headers = { Accept: "application/json" };

const request = {
  url: `/v3/suppression/bounces`,
  method: "GET",
  headers: headers,
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

headers = {"Accept": "application/json"}

response = sg.client.suppression.bounces.get(request_headers=headers)

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

        var headers = new Dictionary<string, string> { { "Accept", "application/json" } };
        var client = new SendGridClient(apiKey: apiKey, requestHeaders: headers);

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET, urlPath: "suppression/bounces");

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            sg.addRequestHeader("Accept", "application/json");
            Request request = new Request();
            request.setMethod(Method.GET);
            request.setEndpoint("/suppression/bounces");
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
	request := sendgrid.GetRequest(apiKey, "/v3/suppression/bounces", host)
	request.Method = "GET"
	request.Headers["Accept"] = "application/json"
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

try {
    $response = $sg->client
        ->suppression()
        ->bounces()
        ->get();
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
request_headers = JSON.parse('{
  "Accept": "application/json"
}')

response = sg.client.suppression.bounces.get(request_headers: request_headers)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X GET "https://api.sendgrid.com/v3/suppression/bounces" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Accept: application/json"
```

If you want to specify a page size of your choice, you can use the `limit` query parameter. Assume you want a page size of no more than 5 items per request, to retrieve the first page you can use the `limit` parameter without specifying an `offset`:

Retrieve first page from list of all bounces with a specified page size

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const headers = { Accept: "application/json" };
const queryParams = { limit: 5 };

const request = {
  url: `/v3/suppression/bounces`,
  method: "GET",
  headers: headers,
  qs: queryParams,
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

headers = {"Accept": "application/json"}
params = {"limit": 5}

response = sg.client.suppression.bounces.get(
    request_headers=headers, query_params=params
)

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

        var headers = new Dictionary<string, string> { { "Accept", "application/json" } };
        var client = new SendGridClient(apiKey: apiKey, requestHeaders: headers);

        var queryParams = @"{'limit': 5}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET,
            urlPath: "suppression/bounces",
            queryParams: queryParams);

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            sg.addRequestHeader("Accept", "application/json");
            Request request = new Request();
            request.setMethod(Method.GET);
            request.setEndpoint("/suppression/bounces");
            request.addQueryParam("limit", "5");
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
	request := sendgrid.GetRequest(apiKey, "/v3/suppression/bounces", host)
	request.Method = "GET"
	request.Headers["Accept"] = "application/json"
	queryParams := make(map[string]string)
	queryParams["limit"] = "5"
	request.QueryParams = queryParams
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
$query_params = json_decode('{
    "limit": 5
}');

try {
    $response = $sg->client
        ->suppression()
        ->bounces()
        ->get(null, $query_params);
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
params = JSON.parse('{
  "limit": 5
}')
request_headers = JSON.parse('{
  "Accept": "application/json"
}')

response = sg.client.suppression.bounces.get(query_params: params, request_headers: request_headers)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -G -X GET "https://api.sendgrid.com/v3/suppression/bounces?limit=5" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Accept: application/json"
```

If you want to retrieve items beyond the first page, you can use the `offset` parameter as follows. Assume you are still working with a page size of 5 as determined by your `limit` query parameter and you have more than 15 items. To request the fourth page of items, you can use the `offset` parameter to skip over the first 15 items, i.e. you start retrieving items starting after the first three pages of 5 items each:

Retrieve a specific page from the list of all bounces

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const headers = { Accept: "application/json" };
const queryParams = {
  limit: 5,
  offset: 15,
};

const request = {
  url: `/v3/suppression/bounces`,
  method: "GET",
  headers: headers,
  qs: queryParams,
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

headers = {"Accept": "application/json"}
params = {"limit": 5, "offset": 15}

response = sg.client.suppression.bounces.get(
    request_headers=headers, query_params=params
)

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

        var headers = new Dictionary<string, string> { { "Accept", "application/json" } };
        var client = new SendGridClient(apiKey: apiKey, requestHeaders: headers);

        var queryParams = @"{'limit': 5, 'offset': 15}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET,
            urlPath: "suppression/bounces",
            queryParams: queryParams);

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            sg.addRequestHeader("Accept", "application/json");
            Request request = new Request();
            request.setMethod(Method.GET);
            request.setEndpoint("/suppression/bounces");
            request.addQueryParam("limit", "5");
            request.addQueryParam("offset", "15");
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
	request := sendgrid.GetRequest(apiKey, "/v3/suppression/bounces", host)
	request.Method = "GET"
	request.Headers["Accept"] = "application/json"
	queryParams := make(map[string]string)
	queryParams["limit"] = "5"
	queryParams["offset"] = "15"
	request.QueryParams = queryParams
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
$query_params = json_decode('{
    "limit": 5,
    "offset": 15
}');

try {
    $response = $sg->client
        ->suppression()
        ->bounces()
        ->get(null, $query_params);
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
params = JSON.parse('{
  "limit": 5,
  "offset": 15
}')
request_headers = JSON.parse('{
  "Accept": "application/json"
}')

response = sg.client.suppression.bounces.get(query_params: params, request_headers: request_headers)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -G -X GET "https://api.sendgrid.com/v3/suppression/bounces?limit=5&offset=15" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Accept: application/json"
```

## Use the `email` query parameter to filter results

The code samples below show how to use the `email` query parameter to filter the Bounce records returned by the `GET` request. A Bounce record is included in the results if the Bounce's `email` property starts with the value of the `email` query parameter. One or more `%25` wildcards can be used in the `email` query parameter.

Any [reserved characters should be percent-encoded](https://en.wikipedia.org/wiki/Percent-encoding#Reserved_characters) to avoid any unintended encoding/decoding of characters.

### Filter results without wildcard

The code sample below shows examples of how to `GET` all Bounce records with `email` properties that begin with the string "sales".

Filter results without wildcard

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const headers = { Accept: "application/json" };
const queryParams = { email: "sales" };

const request = {
  url: `/v3/suppression/bounces`,
  method: "GET",
  headers: headers,
  qs: queryParams,
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

headers = {"Accept": "application/json"}
params = {"email": "sales"}

response = sg.client.suppression.bounces.get(
    request_headers=headers, query_params=params
)

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

        var headers = new Dictionary<string, string> { { "Accept", "application/json" } };
        var client = new SendGridClient(apiKey: apiKey, requestHeaders: headers);

        var queryParams = @"{'email': 'sales'}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET,
            urlPath: "suppression/bounces",
            queryParams: queryParams);

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            sg.addRequestHeader("Accept", "application/json");
            Request request = new Request();
            request.setMethod(Method.GET);
            request.setEndpoint("/suppression/bounces");
            request.addQueryParam("email", "sales");
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
	request := sendgrid.GetRequest(apiKey, "/v3/suppression/bounces", host)
	request.Method = "GET"
	request.Headers["Accept"] = "application/json"
	queryParams := make(map[string]string)
	queryParams["email"] = "sales"
	request.QueryParams = queryParams
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
$query_params = json_decode('{
    "email": "sales"
}');

try {
    $response = $sg->client
        ->suppression()
        ->bounces()
        ->get(null, $query_params);
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
params = JSON.parse('{
  "email": "sales"
}')
request_headers = JSON.parse('{
  "Accept": "application/json"
}')

response = sg.client.suppression.bounces.get(query_params: params, request_headers: request_headers)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -G -X GET "https://api.sendgrid.com/v3/suppression/bounces?email=sales" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Accept: application/json"
```

This request would return Bounces with email addresses that start with "sales", such as `salesteam@example.com` or `sales@example.com`.

### Filter results with wildcard

The code sample below shows examples of how to `GET` all Bounce records with `email` properties that contain the string "sales" anywhere in the email address.

Filter results with a wildcard

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const headers = { Accept: "application/json" };
const queryParams = { email: "%sales" };

const request = {
  url: `/v3/suppression/bounces`,
  method: "GET",
  headers: headers,
  qs: queryParams,
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

headers = {"Accept": "application/json"}
params = {"email": "%sales"}

response = sg.client.suppression.bounces.get(
    request_headers=headers, query_params=params
)

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

        var headers = new Dictionary<string, string> { { "Accept", "application/json" } };
        var client = new SendGridClient(apiKey: apiKey, requestHeaders: headers);

        var queryParams = @"{'email': '%sales'}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET,
            urlPath: "suppression/bounces",
            queryParams: queryParams);

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            sg.addRequestHeader("Accept", "application/json");
            Request request = new Request();
            request.setMethod(Method.GET);
            request.setEndpoint("/suppression/bounces");
            request.addQueryParam("email", "%sales");
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
	request := sendgrid.GetRequest(apiKey, "/v3/suppression/bounces", host)
	request.Method = "GET"
	request.Headers["Accept"] = "application/json"
	queryParams := make(map[string]string)
	queryParams["email"] = "%sales"
	request.QueryParams = queryParams
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
$query_params = json_decode('{
    "email": "%sales"
}');

try {
    $response = $sg->client
        ->suppression()
        ->bounces()
        ->get(null, $query_params);
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
params = JSON.parse('{
  "email": "%sales"
}')
request_headers = JSON.parse('{
  "Accept": "application/json"
}')

response = sg.client.suppression.bounces.get(query_params: params, request_headers: request_headers)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -G -X GET "https://api.sendgrid.com/v3/suppression/bounces?email=%25sales" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Accept: application/json"
```

This request would return Bounces with email addresses that contain "sales" anywhere in the email address, such as `george@sales.example.com` or `sales@example.com`.
