# Retrieve global email statistics

## API Overview

Tracking your emails is an important part of being a good sender and learning about how your users interact with your email. This includes everything from basics of clicks and opens to looking at which browsers and mailbox providers your customers use.

We have broken up statistics in specific ways so that you can get at-a-glance data, as well as allowing you to get into the details of how your email is being used.

> \[!NOTE]
>
> Category statistics are available for the previous thirteen months only.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/stats","method":"get","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

**This endpoint allows you to retrieve all of your global email statistics between a given date range.**

Parent accounts can see either aggregated stats for the parent account or aggregated stats for a subuser specified in the `on-behalf-of` header. Subuser accounts will see only their own stats.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"on-behalf-of","in":"header","description":"The `on-behalf-of` header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. You will use the parent account's API key when using this header. When making a call on behalf of a customer account, the property value should be \"account-id\" followed by the customer account's ID (e.g., `on-behalf-of: account-id <account-id>`). When making a call on behalf of a Subuser, the property value should be the Subuser's username (e.g., `on-behalf-of: <subuser-username>`). See [**On Behalf Of**](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/on-behalf-of) for more information.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/OnBehalfOf","modelName":"__components_parameters_OnBehalfOf"}]
```

### Query string

```json
[{"name":"limit","in":"query","description":"The number of results to return.","required":false,"schema":{"type":"integer"},"refName":"#/components/parameters/StatsAdvancedQueryStringsLimitOffsetLimit","modelName":"__components_parameters_StatsAdvancedQueryStringsLimitOffsetLimit"},{"name":"offset","in":"query","description":"The point in the list to begin retrieving results.","required":false,"schema":{"type":"integer"},"refName":"#/components/parameters/StatsAdvancedQueryStringsLimitOffsetOffset","modelName":"__components_parameters_StatsAdvancedQueryStringsLimitOffsetOffset"},{"name":"aggregated_by","in":"query","description":"How to group the statistics. Must be either \"day\", \"week\", or \"month\".","required":false,"schema":{"type":"string","enum":["day","week","month"],"refName":"AggregatedBy3","modelName":"AggregatedBy3"},"refName":"#/components/parameters/StatsAdvancedQueryStringsLimitOffsetAggregatedBy","modelName":"__components_parameters_StatsAdvancedQueryStringsLimitOffsetAggregatedBy"},{"name":"start_date","in":"query","description":"The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.","required":true,"schema":{"type":"string"},"refName":"#/components/parameters/StatsAdvancedQueryStringsLimitOffsetStartDate","modelName":"__components_parameters_StatsAdvancedQueryStringsLimitOffsetStartDate"},{"name":"end_date","in":"query","description":"The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/StatsAdvancedQueryStringsLimitOffsetEndDate","modelName":"__components_parameters_StatsAdvancedQueryStringsLimitOffsetEndDate"}]
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","required":["date","stats"],"properties":{"date":{"type":"string","description":"The date the stats were gathered."},"stats":{"type":"array","description":"The individual email activity stats.","items":{"type":"object","properties":{"metrics":{"title":"Stats: Advanced Global Stats","type":"object","refName":"StatsAdvancedGlobalStats","modelName":"StatsAdvancedGlobalStats","properties":{"clicks":{"type":"integer","description":"The number of links that were clicked in your emails."},"unique_clicks":{"type":"integer","description":"The number of unique recipients who clicked links in your emails."},"opens":{"type":"integer","description":"The total number of times your emails were opened by recipients."},"unique_opens":{"type":"integer","description":"The number of unique recipients who opened your emails."},"blocks":{"type":"integer","description":"The number of emails that were not allowed to be delivered by ISPs."},"bounce_drops":{"type":"integer","description":"The number of emails that were dropped because of a bounce."},"bounces":{"type":"integer","description":"The number of emails that bounced instead of being delivered."},"deferred":{"type":"integer","description":"The number of emails that temporarily could not be delivered. "},"delivered":{"type":"integer","description":"The number of emails SendGrid was able to confirm were actually delivered to a recipient."},"invalid_emails":{"type":"integer","description":"The number of recipients who had malformed email addresses or whose mail provider reported the address as invalid."},"processed":{"type":"integer","description":"Requests from your website, application, or mail client via SMTP Relay or the API that SendGrid processed."},"requests":{"type":"integer","description":"The number of emails that were requested to be delivered."},"spam_report_drops":{"type":"integer","description":"The number of emails that were dropped due to a recipient previously marking your emails as spam."},"spam_reports":{"type":"integer","description":"The number of recipients who marked your email as spam."},"unsubscribe_drops":{"type":"integer","description":"The number of emails dropped due to a recipient unsubscribing from your emails."},"unsubscribes":{"type":"integer","description":"The number of recipients who unsubscribed from your emails."}}}}}}}}},"examples":{"response":{"value":[{"date":"2015-11-03","stats":[{"metrics":{"blocks":0,"bounce_drops":0,"bounces":0,"clicks":0,"deferred":0,"delivered":0,"invalid_emails":0,"opens":0,"processed":0,"requests":0,"spam_report_drops":0,"spam_reports":0,"unique_clicks":0,"unique_opens":0,"unsubscribe_drops":0,"unsubscribes":0}}]},{"date":"2015-11-04","stats":[{"metrics":{"blocks":0,"bounce_drops":0,"bounces":0,"clicks":0,"deferred":0,"delivered":0,"invalid_emails":0,"opens":0,"processed":0,"requests":0,"spam_report_drops":0,"spam_reports":0,"unique_clicks":0,"unique_opens":0,"unsubscribe_drops":0,"unsubscribes":0}}]},{"date":"2015-11-05","stats":[{"metrics":{"blocks":0,"bounce_drops":0,"bounces":0,"clicks":0,"deferred":0,"delivered":0,"invalid_emails":0,"opens":0,"processed":0,"requests":0,"spam_report_drops":0,"spam_reports":0,"unique_clicks":0,"unique_opens":0,"unsubscribe_drops":0,"unsubscribes":0}}]},{"date":"2015-11-06","stats":[{"metrics":{"blocks":0,"bounce_drops":0,"bounces":0,"clicks":0,"deferred":0,"delivered":0,"invalid_emails":0,"opens":0,"processed":0,"requests":0,"spam_report_drops":0,"spam_reports":0,"unique_clicks":0,"unique_opens":0,"unsubscribe_drops":0,"unsubscribes":0}}]},{"date":"2015-11-07","stats":[{"metrics":{"blocks":0,"bounce_drops":0,"bounces":0,"clicks":0,"deferred":0,"delivered":0,"invalid_emails":0,"opens":0,"processed":0,"requests":0,"spam_report_drops":0,"spam_reports":0,"unique_clicks":0,"unique_opens":0,"unsubscribe_drops":0,"unsubscribes":0}}]},{"date":"2015-11-08","stats":[{"metrics":{"blocks":0,"bounce_drops":0,"bounces":0,"clicks":0,"deferred":0,"delivered":0,"invalid_emails":0,"opens":0,"processed":0,"requests":0,"spam_report_drops":0,"spam_reports":0,"unique_clicks":0,"unique_opens":0,"unsubscribe_drops":0,"unsubscribes":0}}]},{"date":"2015-11-09","stats":[{"metrics":{"blocks":0,"bounce_drops":0,"bounces":0,"clicks":0,"deferred":0,"delivered":0,"invalid_emails":0,"opens":0,"processed":0,"requests":0,"spam_report_drops":0,"spam_reports":0,"unique_clicks":0,"unique_opens":0,"unsubscribe_drops":0,"unsubscribes":0}}]}]}}}}}}]
```

Retrieve global email statistics

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const queryParams = { start_date: "2009-07-06" };

const request = {
  url: `/v3/stats`,
  method: "GET",
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

params = {"start_date": "2009-07-06"}

response = sg.client.stats.get(query_params=params)

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

        var queryParams = @"{'start_date': '2009-07-06'}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET, urlPath: "stats", queryParams: queryParams);

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
            Request request = new Request();
            request.setMethod(Method.GET);
            request.setEndpoint("/stats");
            request.addQueryParam("start_date", "2009-07-06");
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
	request := sendgrid.GetRequest(apiKey, "/v3/stats", host)
	request.Method = "GET"
	queryParams := make(map[string]string)
	queryParams["start_date"] = "2009-07-06"
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
    "start_date": "2009-07-06"
}');

try {
    $response = $sg->client->stats()->get(null, $query_params);
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
  "start_date": "2009-07-06"
}')

response = sg.client.stats.get(query_params: params)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -G -X GET "https://api.sendgrid.com/v3/stats?start_date=2009-07-06" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
