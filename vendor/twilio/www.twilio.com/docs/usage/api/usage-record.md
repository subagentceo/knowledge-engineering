# REST API: Usage Records

The UsageRecords resource provides a simple API to retrieve actions made by your Twilio account during any period and by any usage category. This makes it easy to build reporting and analytics tools for your application.

UsageRecords used in combination with [Subaccounts](/docs/iam/api/subaccounts) created for each of your end-users make it possible to build recurring usage-based billing systems on top of Twilio's API with just a few simple API calls. If rectifying UsageRecords with billing, [see our dedicated article](/docs/voice/resolve-call-log-usage-discrepancies).

You can also set up [usage triggers](/docs/usage/api/usage-trigger) to notify your application when a particular category of usage reaches a threshold on a daily, monthly, yearly, or all-time basis. Triggers can help determine if your users have reached a usage cap or if your application has runaway requests.

## Record Properties

This resource and its subresources always return a list of UsageRecords. Each UsageRecord is represented by the following properties:

<OperationTable type="properties" data={{"title":"ListUsageRecordResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"usage_records":{"type":"array","items":{"type":"object","refName":"api.v2010.account.usage.usage_record","modelName":"api_v2010_account_usage_usage_record","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage."},"api_version":{"type":"string","nullable":true,"description":"The API version used to create the resource."},"as_of":{"type":"string","nullable":true,"description":"Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT"},"category":{"type":"string","nullable":true,"description":"The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories)."},"count":{"type":"string","nullable":true,"description":"The number of usage events, such as the number of calls."},"count_unit":{"type":"string","nullable":true,"description":"The units in which `count` is measured, such as `calls` for calls or `messages` for SMS."},"description":{"type":"string","nullable":true,"description":"A plain-language description of the usage category."},"end_date":{"type":"string","format":"date","nullable":true,"description":"The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`."},"price":{"type":"number","nullable":true,"description":"The total price of the usage in the currency specified in `price_unit` and associated with the account."},"price_unit":{"type":"string","format":"currency","nullable":true,"description":"The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`."},"start_date":{"type":"string","format":"date","nullable":true,"description":"The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`."},"subresource_uris":{"type":"object","format":"uri-map","nullable":true,"description":"A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources)."},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."},"usage":{"type":"string","nullable":true,"description":"The amount used to bill usage and measured in units described in `usage_unit`."},"usage_unit":{"type":"string","nullable":true,"description":"The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS."}}}}}}} />

## Usage, Count, and Price \[#usage-count-price]

Each UsageRecord contains three amounts: `Usage`, `Count`, and `Price`. `Usage` is the primary way usage is measured for that category: `minutes` for calls, `messages` for SMS, etc. `Count` is the number of usage events: `calls` for calls, etc. `Price` is the price of the usage in the currency associated with the account.

Each UsageRecord also has fields that show the units in which each amount is measured: `Usage` is measured in units of `UsageUnit`, for instance. These fields make it easy to build usage dashboards. For example, you can always display human-readable strings describing usage with "`$Usage $UsageUnits`", "`$Count $CountUnits`", or "`$Price $PriceUnits`".

## Usage Categories \[#usage-categories]

A UsageRecord's `Category` defines the type of usage it represents. The full list of all categories is [here](#usage-all-categories), but you'll usually focus on just a few common categories:

| Category       | Description                                                                                                                                                                                                                                                          |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| calls          | Inbound and outbound voice calls. Does *not* include SIP or client calls. `Count` is the number of calls and `Usage` is the number of minutes.                                                                                                                       |
| sms            | All SMS messages. `Count` and `Usage` are both the number of messages sent.                                                                                                                                                                                          |
| pfax-minutes   | Programmable Fax minutes. `Count` is the number of faxes and `Usage` is the number of minutes.                                                                                                                                                                       |
| pfax-pages     | Programmable Fax pages. `Count` is the number of faxes and `Usage` is the number of pages.                                                                                                                                                                           |
| phonenumbers   | All phone numbers owned by the account.                                                                                                                                                                                                                              |
| recordings     | Recordings of voice calls. `Count` is the number of recordings and `Usage` is the number of recorded minutes.                                                                                                                                                        |
| transcriptions | Transcriptions of voice calls. `Count` is the number of transcriptions and `Usage` is the number of transcribed minutes.                                                                                                                                             |
| pv             | All Programmable Video usage including TURN. `Price` accounts for expenses in all Programmable Video products. `Count` and `Usage` should be ignored.                                                                                                                |
| totalprice     | Total price of all usage. `Usage` will be the same as `Price`, and `Count` will be empty. Note that because some Twilio costs may not be included in any usage category, the sum of the `Price` of all UsageRecords may not be equal to the `Price` of `TotalPrice`. |

## Read multiple UsageRecord resources

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Usage/Records.json`

By default, the UsageRecords resource will return one UsageRecord for each `Category`, representing all usage accrued all-time for the account. You can filter the usage `Category` or change the date-range over which usage is counted using optional `GET` query parameters. Note that query parameters are case-sensitive:

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"Category","in":"query","description":"The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.","schema":{"type":"string"},"examples":{"readFull":{"value":"calleridlookups"},"readEmpty":{"value":"calleridlookups"}}},{"name":"StartDate","in":"query","description":"Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.","schema":{"type":"string","format":"date"},"examples":{"readFull":{"value":"2008-01-02"},"readEmpty":{"value":"2008-01-02"}}},{"name":"EndDate","in":"query","description":"Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.","schema":{"type":"string","format":"date"},"examples":{"readFull":{"value":"2008-01-02"},"readEmpty":{"value":"2008-01-02"}}},{"name":"IncludeSubaccounts","in":"query","description":"Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.","schema":{"type":"boolean"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Last Month's Usage for All Usage Categories

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listUsageRecordLastMonth() {
  const lastMonths = await client.usage.records.lastMonth.list({ limit: 20 });

  lastMonths.forEach((l) => console.log(l.end));
}

listUsageRecordLastMonth();
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

last_months = client.usage.records.last_month.list(limit=20)

for record in last_months:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage.Record;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var lastMonths = await LastMonthResource.ReadAsync(limit: 20);

        foreach (var record in lastMonths) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.record.LastMonth;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<LastMonth> lastMonths = LastMonth.reader().limit(20).read();

        for (LastMonth record : lastMonths) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListUsageRecordLastMonthParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListUsageRecordLastMonth(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
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

$lastMonths = $twilio->usage->records->lastMonth->read([], 20);

foreach ($lastMonths as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

last_months = @client
              .api
              .v2010
              .usage
              .records
              .last_month
              .list(limit: 20)

last_months.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:usage:records:last-month:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Records/LastMonth.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?PageSize=50&Page=0",
  "usage_records": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "as_of": "2019-06-24T22:32:49+00:00",
      "category": "sms-inbound-shortcode",
      "count": "0",
      "count_unit": "messages",
      "description": "Short Code Inbound SMS",
      "end_date": "2015-09-04",
      "price": "0",
      "price_unit": "usd",
      "start_date": "2011-08-23",
      "subresource_uris": {
        "all_time": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/AllTime.json?Category=sms-inbound-shortcode",
        "daily": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?Category=sms-inbound-shortcode",
        "last_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?Category=sms-inbound-shortcode",
        "monthly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Monthly.json?Category=sms-inbound-shortcode",
        "this_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/ThisMonth.json?Category=sms-inbound-shortcode",
        "today": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?Category=sms-inbound-shortcode",
        "yearly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yearly.json?Category=sms-inbound-shortcode",
        "yesterday": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yesterday.json?Category=sms-inbound-shortcode"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?Category=sms-inbound-shortcode&StartDate=2011-08-23&EndDate=2015-09-04",
      "usage": "0",
      "usage_unit": "messages"
    }
  ]
}
```

Today's Calls

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listUsageRecordToday() {
  const todays = await client.usage.records.today.list({
    category: "calls",
    limit: 20,
  });

  todays.forEach((t) => console.log(t.end));
}

listUsageRecordToday();
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

todays = client.usage.records.today.list(category="calls", limit=20)

for record in todays:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage.Record;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var todays = await TodayResource.ReadAsync(category: "calls", limit: 20);

        foreach (var record in todays) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.record.Today;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Today> todays = Today.reader().setCategory("calls").limit(20).read();

        for (Today record : todays) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListUsageRecordTodayParams{}
	params.SetCategory("calls")
	params.SetLimit(20)

	resp, err := client.Api.ListUsageRecordToday(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
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

$todays = $twilio->usage->records->today->read(["category" => "calls"], 20);

foreach ($todays as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

todays = @client
         .api
         .v2010
         .usage
         .records
         .today
         .list(
           category: 'calls',
           limit: 20
         )

todays.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:usage:records:today:list \
   --category calls
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Records/Today.json?Category=calls&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?PageSize=50&Page=0",
  "usage_records": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "as_of": "2019-06-24T22:32:49+00:00",
      "category": "sms-inbound-shortcode",
      "count": "0",
      "count_unit": "messages",
      "description": "Short Code Inbound SMS",
      "end_date": "2015-09-04",
      "price": "0",
      "price_unit": "usd",
      "start_date": "2011-08-23",
      "subresource_uris": {
        "all_time": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/AllTime.json?Category=sms-inbound-shortcode",
        "daily": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?Category=sms-inbound-shortcode",
        "last_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?Category=sms-inbound-shortcode",
        "monthly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Monthly.json?Category=sms-inbound-shortcode",
        "this_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/ThisMonth.json?Category=sms-inbound-shortcode",
        "today": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?Category=sms-inbound-shortcode",
        "yearly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yearly.json?Category=sms-inbound-shortcode",
        "yesterday": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yesterday.json?Category=sms-inbound-shortcode"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?Category=sms-inbound-shortcode&StartDate=2011-08-23&EndDate=2015-09-04",
      "usage": "0",
      "usage_unit": "messages"
    }
  ]
}
```

One-Month Date-Range, Inbound Calls Only

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listUsageRecord() {
  const records = await client.usage.records.list({
    category: "calls-inbound",
    endDate: "2022-06-30",
    startDate: "2022-06-01",
    limit: 20,
  });

  records.forEach((r) => console.log(r.end));
}

listUsageRecord();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import date

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

records = client.usage.records.list(
    category="calls-inbound",
    start_date=date(2022, 6, 1),
    end_date=date(2022, 6, 30),
    limit=20,
)

for record in records:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage;
using System.Threading.Tasks;
using Twilio.Converters;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var records = await RecordResource.ReadAsync(
            category: "calls-inbound",
            startDate: MarshalConverter.DateTimeFromString("2022-06-01"),
            endDate: MarshalConverter.DateTimeFromString("2022-06-30"),
            limit: 20);

        foreach (var record in records) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.LocalDate;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.Record;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Record> records = Record.reader()
                                          .setCategory("calls-inbound")
                                          .setStartDate(LocalDate.of(2022, 6, 1))
                                          .setEndDate(LocalDate.of(2022, 6, 30))
                                          .limit(20)
                                          .read();

        for (Record record : records) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListUsageRecordParams{}
	params.SetCategory("calls-inbound")
	params.SetStartDate("2022-06-01")
	params.SetEndDate("2022-06-30")
	params.SetLimit(20)

	resp, err := client.Api.ListUsageRecord(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
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

$records = $twilio->usage->records->read(
    [
        "category" => "calls-inbound",
        "startDate" => new \DateTime("2022-06-01"),
        "endDate" => new \DateTime("2022-06-30"),
    ],
    20
);

foreach ($records as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

records = @client
          .api
          .v2010
          .usage
          .records
          .list(
            category: 'calls-inbound',
            start_date: Date.new(2022, 6, 1),
            end_date: Date.new(2022, 6, 30),
            limit: 20
          )

records.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:usage:records:list \
   --category calls-inbound \
   --start-date 2022-06-01 \
   --end-date 2022-06-30
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Records.json?Category=calls-inbound&StartDate=2022-06-01&EndDate=2022-06-30&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02&PageSize=1&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02&PageSize=1&Page=1&PageToken=APMQ%3D%3D",
  "page": 0,
  "page_size": 1,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02&PageSize=1&Page=0",
  "usage_records": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "as_of": "2019-06-24T22:32:49+00:00",
      "category": "calleridlookups",
      "count": null,
      "count_unit": "",
      "description": "Caller Name Lookups",
      "end_date": "2008-01-02",
      "price": "2192.84855",
      "price_unit": "usd",
      "start_date": "2008-01-02",
      "subresource_uris": {
        "all_time": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/AllTime.json?Category=calleridlookups",
        "daily": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?Category=calleridlookups",
        "last_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?Category=calleridlookups",
        "monthly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Monthly.json?Category=calleridlookups",
        "this_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/ThisMonth.json?Category=calleridlookups",
        "today": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?Category=calleridlookups",
        "yearly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yearly.json?Category=calleridlookups",
        "yesterday": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yesterday.json?Category=calleridlookups"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02",
      "usage": "2192.84855",
      "usage_unit": "usd"
    }
  ]
}
```

Daily Usage for Inbound Calls Over a One-Month Period

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listUsageRecordDaily() {
  const dailies = await client.usage.records.daily.list({
    category: "calls-inbound",
    endDate: "2022-06-30",
    startDate: "2022-06-01",
    limit: 20,
  });

  dailies.forEach((d) => console.log(d.end));
}

listUsageRecordDaily();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import date

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

dailies = client.usage.records.daily.list(
    category="calls-inbound",
    start_date=date(2022, 6, 1),
    end_date=date(2022, 6, 30),
    limit=20,
)

for record in dailies:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage.Record;
using System.Threading.Tasks;
using Twilio.Converters;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var dailies = await DailyResource.ReadAsync(
            category: "calls-inbound",
            startDate: MarshalConverter.DateTimeFromString("2022-06-01"),
            endDate: MarshalConverter.DateTimeFromString("2022-06-30"),
            limit: 20);

        foreach (var record in dailies) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.LocalDate;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.record.Daily;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Daily> dailies = Daily.reader()
                                         .setCategory("calls-inbound")
                                         .setStartDate(LocalDate.of(2022, 6, 1))
                                         .setEndDate(LocalDate.of(2022, 6, 30))
                                         .limit(20)
                                         .read();

        for (Daily record : dailies) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListUsageRecordDailyParams{}
	params.SetCategory("calls-inbound")
	params.SetStartDate("2022-06-01")
	params.SetEndDate("2022-06-30")
	params.SetLimit(20)

	resp, err := client.Api.ListUsageRecordDaily(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
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

$dailies = $twilio->usage->records->daily->read(
    [
        "category" => "calls-inbound",
        "startDate" => new \DateTime("2022-06-01"),
        "endDate" => new \DateTime("2022-06-30"),
    ],
    20
);

foreach ($dailies as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

dailies = @client
          .api
          .v2010
          .usage
          .records
          .daily
          .list(
            category: 'calls-inbound',
            start_date: Date.new(2022, 6, 1),
            end_date: Date.new(2022, 6, 30),
            limit: 20
          )

dailies.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:usage:records:daily:list \
   --category calls-inbound \
   --start-date 2022-06-01 \
   --end-date 2022-06-30
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Records/Daily.json?Category=calls-inbound&StartDate=2022-06-01&EndDate=2022-06-30&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?PageSize=50&Page=0",
  "usage_records": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "as_of": "2019-06-24T22:32:49+00:00",
      "category": "sms-inbound-shortcode",
      "count": "0",
      "count_unit": "messages",
      "description": "Short Code Inbound SMS",
      "end_date": "2015-09-04",
      "price": "0",
      "price_unit": "usd",
      "start_date": "2011-08-23",
      "subresource_uris": {
        "all_time": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/AllTime.json?Category=sms-inbound-shortcode",
        "daily": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?Category=sms-inbound-shortcode",
        "last_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?Category=sms-inbound-shortcode",
        "monthly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Monthly.json?Category=sms-inbound-shortcode",
        "this_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/ThisMonth.json?Category=sms-inbound-shortcode",
        "today": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?Category=sms-inbound-shortcode",
        "yearly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yearly.json?Category=sms-inbound-shortcode",
        "yesterday": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yesterday.json?Category=sms-inbound-shortcode"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?Category=sms-inbound-shortcode&StartDate=2011-08-23&EndDate=2015-09-04",
      "usage": "0",
      "usage_unit": "messages"
    }
  ]
}
```

All-Time Usage, All Usage Categories

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listUsageRecord() {
  const records = await client.usage.records.list({ limit: 20 });

  records.forEach((r) => console.log(r.end));
}

listUsageRecord();
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

records = client.usage.records.list(limit=20)

for record in records:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var records = await RecordResource.ReadAsync(limit: 20);

        foreach (var record in records) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.Record;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Record> records = Record.reader().limit(20).read();

        for (Record record : records) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListUsageRecordParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListUsageRecord(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
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

$records = $twilio->usage->records->read([], 20);

foreach ($records as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

records = @client
          .api
          .v2010
          .usage
          .records
          .list(limit: 20)

records.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:usage:records:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Records.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02&PageSize=1&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02&PageSize=1&Page=1&PageToken=APMQ%3D%3D",
  "page": 0,
  "page_size": 1,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02&PageSize=1&Page=0",
  "usage_records": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "as_of": "2019-06-24T22:32:49+00:00",
      "category": "calleridlookups",
      "count": null,
      "count_unit": "",
      "description": "Caller Name Lookups",
      "end_date": "2008-01-02",
      "price": "2192.84855",
      "price_unit": "usd",
      "start_date": "2008-01-02",
      "subresource_uris": {
        "all_time": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/AllTime.json?Category=calleridlookups",
        "daily": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?Category=calleridlookups",
        "last_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?Category=calleridlookups",
        "monthly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Monthly.json?Category=calleridlookups",
        "this_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/ThisMonth.json?Category=calleridlookups",
        "today": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?Category=calleridlookups",
        "yearly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yearly.json?Category=calleridlookups",
        "yesterday": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yesterday.json?Category=calleridlookups"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02",
      "usage": "2192.84855",
      "usage_unit": "usd"
    }
  ]
}
```

For example, you might request all usage records for the month of
April, 2012. In this case, the query string would be
`StartDate=2012-04-01&EndDate=2012-04-30`. This would return one
UsageRecord for each usage-type summarizing the usage during April.
The list includes [paging information][14].

It's also possible to group usage by day, by month, or by year using
the [subresources](#list-subresources) described below.

### List Subresources \[#list-subresources]

The main UsageRecords list resource supports a variety of convenience
subresources. In general, these take the form:

```bash
/2010-04-01/Accounts/{AccountSid}/Usage/Records/{Subresource}

```

Supported subresources are:

| Subresource | Description                                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Daily       | Return multiple UsageRecords for each usage category, each representing usage over a daily time interval.                                                |
| Monthly     | Return multiple UsageRecords for each usage category, each representing usage over a monthly time interval.                                              |
| Yearly      | Return multiple UsageRecords for each usage category, each representing usage over a yearly time interval.                                               |
| AllTime     | Return a single UsageRecord for each usage category, each representing usage over the date range specified. This is the same as the root /Usage/Records. |
| Today       | Return a single UsageRecord per usage category, for today's usage only.                                                                                  |
| Yesterday   | Return a single UsageRecord per usage category, for yesterday's usage only.                                                                              |
| ThisMonth   | Return a single UsageRecord per usage category, for this month's usage only.                                                                             |
| LastMonth   | Return a single UsageRecord per usage category, for last month's usage only.                                                                             |

These convenience subresources can be used to draw a graph of daily
calls, display dashboards of monthly usage across all usage categories, or
build a simple usage-based billing system based on last month's usage
totals.

[14]: /docs/usage/twilios-response#pagination

### Full List of All Usage Categories \[#usage-all-categories]

#### Voice \[#usage-voice]

| Category                                              | Description                                                                                                                                                                                                                                  |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| agent-conference                                      | Count is the number of agent conferences and Usage is the number of minutes.                                                                                                                                                                 |
| answering-machine-detection                           | All answering machine detection recognitions for outbound calls. Count is the number of recognitions.                                                                                                                                        |
| amazon-polly                                          | Text-to-Speech generated with Amazon Polly voices.                                                                                                                                                                                           |
| calls                                                 | Inbound and outbound voice calls. Count is the number of calls and Usage is the number of minutes. Does *not* include client or SIP calls.                                                                                                   |
| calls-inbound                                         | All inbound voice calls, to mobile, toll-free and local numbers.                                                                                                                                                                             |
| calls-inbound-local                                   | All inbound voice calls to local numbers.                                                                                                                                                                                                    |
| calls-inbound-mobile                                  | All inbound voice calls to mobile numbers.                                                                                                                                                                                                   |
| calls-inbound-tollfree                                | All inbound voice calls to toll-free numbers.                                                                                                                                                                                                |
| calls-outbound                                        | All outbound voice calls.                                                                                                                                                                                                                    |
| calls-sip                                             | All SIP calls.                                                                                                                                                                                                                               |
| calls-sip-inbound                                     | All inbound SIP calls.                                                                                                                                                                                                                       |
| calls-sip-outbound                                    | All outbound SIP calls.                                                                                                                                                                                                                      |
| calls-client                                          | All TwilioClient voice calls.                                                                                                                                                                                                                |
| calls-globalconference                                | All global conference calls.                                                                                                                                                                                                                 |
| calls-media-stream-minutes                            | All Media Stream calls                                                                                                                                                                                                                       |
| calls-pay-verb-transactions                           | `<Pay>` verb transactions. Count is total number of `<Pay>` transactions                                                                                                                                                                     |
| call-progess-events                                   | All call progress events.                                                                                                                                                                                                                    |
| calls-recordings                                      | Recordings of voice calls. Count is the number of recordings and Usage is the number of recorded minutes.                                                                                                                                    |
| ivr-virtual-agent-genai                               | Virtual Agent Generative AI usage in calls. Count is the number of `<VirtualAgent>` invocations that used Generative AI and Usage is the number of minutes.                                                                                  |
| ivr-virtual-agent-custom-voices                       | Virtual Agent TTS Custom Voice Model usage in calls. Count is the number of `<VirtualAgent>` invocations that used a [TTS custom voice model](https://cloud.google.com/text-to-speech/custom-voice/docs) and Usage is the number of minutes. |
| programmablevoice-platform                            | All Programmable Voice Platform usage in Flex Projects                                                                                                                                                                                       |
| programmablevoiceconnectivity                         | Inbound and outbound voice calls in Flex Projects. Count is the number of calls and Usage is the number of minutes. Includes Client and SIP Calls.                                                                                           |
| programmablevoiceconn-sip                             | All SIP Calls in Flex Projects                                                                                                                                                                                                               |
| programmablevoiceconn-sip-inbound                     | All Inbound SIP Calls in Flex Projects                                                                                                                                                                                                       |
| programmablevoiceconn-sip-outbound                    | All Outbound SIP Calls in Flex Projects                                                                                                                                                                                                      |
| programmablevoiceconn-clientsdk                       | All TwilioClient voice calls in Flex Projects                                                                                                                                                                                                |
| pstnconnectivity                                      | Inbound and outbound voice calls in Flex Projects. Count is the number of calls and Usage is the number of minutes.                                                                                                                          |
| pstnconnectivity-inbound                              | All inbound voice calls, to mobile, toll-free and local numbers in Flex Projects                                                                                                                                                             |
| pstnconnectivity-outbound                             | All outbound voice calls in Flex Projects                                                                                                                                                                                                    |
| recordings                                            | Recordings of voice and trunking calls. Count is the number of recordings and Usage is the number of recorded minutes.                                                                                                                       |
| recordingstorage                                      | Amount of storage used by call recordings stored for the account. Count is the number of stored recordings, Usage is the number of stored recorded minutes, and Price is the price of storing the recordings.                                |
| speech-recognition                                    | Speech recognitions in calls. Count is the total number of calls where speech recognition was performed and usage is the total number of recognitions                                                                                        |
| transcriptions                                        | Transcriptions of voice calls. Count is the number of transcriptions and Usage is the number of transcribed minutes.                                                                                                                         |
| tts-google                                            | Text-to-Speech generated with Google Polly voices.                                                                                                                                                                                           |
| virtual-agent                                         | Virtual Agent usage in calls. Count is the number of `<VirtualAgent>` invocations and Usage is the number of minutes.                                                                                                                        |
| voice-intelligence                                    | All Conversation Intelligence (classic) transcriptions and language operators minutes                                                                                                                                                        |
| voice-intelligence-transcription                      | Conversation Intelligence (classic) transcriptions minutes                                                                                                                                                                                   |
| voice-intelligence-operators                          | Conversation Intelligence (classic) language operators minutes                                                                                                                                                                               |
| voice-insights                                        | Voice Insights Advanced Features                                                                                                                                                                                                             |
| voice-insights-ptsn-insights-on-demand-minute         | Voice Insights Advanced Features for Programmable Voice calls                                                                                                                                                                                |
| voice-insights-sip-trunking-insights-on-demand-minute | Voice Insights Advanced Features for Elastic SIP Trunking calls.                                                                                                                                                                             |

#### SMS & MMS \[#usage-sms-mms]

| Category                 | Description                                                                                                                                                                       |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| a2p-registration-fees    | All Messaging A2P Registration Fees                                                                                                                                               |
| sms                      | All SMS messages, both inbound and outbound. Count and Usage are both the number of messages sent.                                                                                |
| sms-inbound              | All inbound SMS messages, to both short-codes and long-codes.                                                                                                                     |
| sms-inbound-longcode     | All inbound SMS messages to long-codes.                                                                                                                                           |
| sms-inbound-shortcode    | All inbound SMS messages to short-codes.                                                                                                                                          |
| sms-outbound             | All outbound SMS messages, from both short-codes and long-codes.                                                                                                                  |
| sms-outbound-longcode    | All outbound SMS messages from long-codes.                                                                                                                                        |
| sms-outbound-shortcode   | All outbound SMS messages from short-codes.                                                                                                                                       |
| sms-messages-carrierfees | All carrier fees for SMS messages.                                                                                                                                                |
| mms                      | All MMS messages, both inbound and outbound. Count and Usage are both the number of messages sent.                                                                                |
| mms-inbound              | All inbound MMS messages, to both short-codes and long-codes.                                                                                                                     |
| mms-inbound-longcode     | All inbound MMS messages to long-codes.                                                                                                                                           |
| mms-inbound-shortcode    | All inbound MMS messages to short-codes.                                                                                                                                          |
| mms-outbound             | All outbound MMS messages, from both short-codes and long-codes.                                                                                                                  |
| mms-outbound-longcode    | All outbound MMS messages from long-codes.                                                                                                                                        |
| mms-outbound-shortcode   | All outbound MMS messages from short-codes.                                                                                                                                       |
| mms-messages-carrierfees | All carrier fees for MMS messages.                                                                                                                                                |
| mediastorage             | Amount of storage used by media stored for the account. Count is the number of stored media files, Usage is the number of megabytes, and Price is the price of storing the media. |

#### RCS \[#usage-rcs]

| Category                           | Description                       |
| :--------------------------------- | :-------------------------------- |
| Usage-RCS-Messages                 | All RCS messages.                 |
| Usage-RCS-basic-Messages-Outbound  | All outbound RCS Basic messages.  |
| Usage-RCS-Single-Messages-Outbound | All outbound RCS Single messages. |
| Usage-RCS-Messages-Inbound         | All inbound RCS messages.         |
| Usage-RCS-Messaging-Carrier-Fees   | All RCS message carrier fees.     |
| RCS-Activation-Fee                 | All RCS sender activation fees.   |

#### WhatsApp Business API \[#usage-whatsapp]

| Category                                  | Description                                                                                                                                                                                                                                                           |
| :---------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| channels-whatsapp-template-authentication | WhatsApp charges Authentication template fees for using Authentication category templates. [See our pricing page for details.](https://www.twilio.com/en-us/whatsapp/pricing)                                                                                         |
| channels-whatsapp-template-marketing      | WhatsApp charges Marketing template fees for using Marketing category templates. [See our pricing page for details.](https://www.twilio.com/en-us/whatsapp/pricing)                                                                                                   |
| channels-whatsapp-template-utility        | WhatsApp charges Utility template fees for using Utility category templates. [See our pricing page for details.](https://www.twilio.com/en-us/whatsapp/pricing)                                                                                                       |
| channels-whatsapp-service                 | WhatsApp does not charge fees for using free-form messages during a customer service window. This billing item is used to track usage. [See our pricing page for details.](https://www.twilio.com/en-us/whatsapp/pricing)                                             |
| channels-whatsapp-conversation-free       | WhatsApp waives conversation fees for conversations opened by Click to WhatsApp Ads or for the first 1,000 Service conversations opened by a WhatsApp Business Account each month. [See our pricing page for details.](https://www.twilio.com/en-us/whatsapp/pricing) |
| channels-messaging-inbound                | Twilio charges a flat-rate per inbound message platform fee for any country.                                                                                                                                                                                          |
| channels-messaging-outbound               | Twilio charges a flat-rate per outbound message platform fee for any country.                                                                                                                                                                                         |

#### Twilio Conversations \[#usage-prog-chat]

| Category               | Description                                                                                                                                                                                                                                                                                      |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pchat-users            | Active Monthly Users - An active user is defined as someone who creates a user or conversation, edits, or is assigned to a conversation. This includes reading conversations, sending messages in a chat view, or sending and receiving SMS and WhatsApp messages via the Conversations product. |
| pchat-conv-med-storage | Media Storage - Photos, videos, or other files stored and distributed in Conversations are billed at a monthly rate according to their size, prorated daily. Only stored media (pictures, videos, etc.) incurs a charge; ordinary text-only message bodies are stored at no cost.                |

#### Phone Numbers \[#usage-phone-numbers]

| Category                  | Description                                                                 |
| :------------------------ | :-------------------------------------------------------------------------- |
| phonenumbers              | All phone numbers owned by the account, mobile, toll-free and local.        |
| phonenumbers-local        | All local phone numbers owned by the account.                               |
| phonenumbers-mobile       | All mobile phone numbers owned by the account.                              |
| phonenumbers-tollfree     | All toll-free phone numbers owned by the account.                           |
| phonenumbers-cps          | All phone number calls per second (CPS) increases.                          |
| phonenumbers-setups       | All phone number setups fees.                                               |
| shortcodes                | All short codes owned by the account, of all types.                         |
| shortcodes-customerowned  | All short codes owned by the account that are leased from another provider. |
| shortcodes-mms-enablement | All short code MMS enablement fees.                                         |
| shortcodes-mps            | All short code message per second (MPS) increases.                          |
| shortcodes-random         | All randomly-assigned short codes owned by the account.                     |
| shortcodes-uk             | All UK short codes owned by the account.                                    |
| shortcodes-vanity         | All vanity short codes owned by the account.                                |

#### Lookup \[#usage-lookups]

| Category                   | Description                                |
| :------------------------- | :----------------------------------------- |
| lookups                    | All Lookups executed across all categories |
| carrier-lookups            | All Carrier lookups                        |
| calleridlookups            | All Caller Name lookups                    |
| number-format-lookups      | All Number Formatting lookups              |
| call-forwarding-lookups    | All Call Forwarding lookups                |
| sim-swap-lookups           | All SIM Swap lookups                       |
| live-activity-lookups      | All Live Activity lookups                  |
| enhanced-line-type-lookups | All Line Type Intelligence lookups         |
| identity-match             | All Identity Match lookups                 |

#### Elastic SIP Trunking \[#usage-elastic-sip-trunking]

| Category                                              | Description                                                                                                  |
| :---------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| trunking-origination                                  | All trunking origination (inbound) calls, to mobile, toll-free and local numbers.                            |
| trunking-origination-local                            | All trunking origination (inbound) calls to local numbers.                                                   |
| trunking-origination-mobile                           | All trunking origination (inbound) calls to mobile numbers.                                                  |
| trunking-origination-tollfree                         | All trunking origination (inbound) calls to toll-free numbers.                                               |
| trunking-termination                                  | All trunking termination (outbound) calls.                                                                   |
| trunking-recordings                                   | Recordings of trunking calls. Count is the number of recordings and Usage is the number of recorded minutes. |
| trunking-cps                                          | All trunking calls per second (CPS) increases.                                                               |
| trunking-secure                                       | All secured trunking calls.                                                                                  |
| voice-insights-sip-trunking-insights-on-demand-minute | Voice Insights Advanced Features for trunking calls                                                          |

#### Sync \[#usage-sync]

| Category                            | Description                                                                                                                                                                                                                                                             |
| :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sync-actions                        | All incoming requests from your application that read and write data. It means actions include any read or write from an SDK or the REST API. Resulting webhooks, updates to connected endpoints, and storage are included in the cost of an action.                    |
| sync-endpoint-hours                 | An endpoint-hour is counted once per wall-clock hour for each unique device connected to Sync. Endpoints can be unique devices or browser tabs. Each unique endpoint will incur charges for at most four hours of every calendar day; the remainder are free of charge. |
| sync-endpoint-hours-above-daily-cap | All hours spent above four hours limit are shown separately. All these hours are free of charge.                                                                                                                                                                        |

#### Task Router \[#usage-task-router]

| Category         | Description                       |
| :--------------- | :-------------------------------- |
| taskrouter-tasks | All tasks created in Task Router. |

#### Programmable Video \[#usage-video]

| Category                               | Description                                                                                                                                                                             |
| :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pv                                     | All Programmable Video usage including TURN. `Price` accounts for expenses in all Programmable Video products. `Count` and `Usage` should be ignored.                                   |
| group-rooms                            | Accounts for all Group Rooms usage. `Count` is the number of rooms. `Usage` should be ignored.                                                                                          |
| group-rooms-participant-minutes        | All participant usage in Group Rooms. `Count` and `Usage` measure the number of participant minutes.                                                                                    |
| group-rooms-data-track                 | All Group Room Data Tracks activity. `Count` and `Usage` measure thousands of messages sent.                                                                                            |
| small-group-rooms                      | Accounts for all Small Group Rooms usage. `Count` is the number of rooms. `Usage` should be ignored.                                                                                    |
| small-group-rooms-participant-minutes  | All participant usage in Small Group Rooms. `Count` and `Usage` measure the number of participant minutes.                                                                              |
| small-group-rooms-data-track           | All Small Group Room Data Tracks activity. `Count` and `Usage` measure thousands of messages sent.                                                                                      |
| pv-rooms                               | Accounts for all Peer-to-Peer Rooms usage. `Count` is the number of rooms. `Usage` is the number of participant minutes.                                                                |
| peer-to-peer-rooms-participant-minutes | All participant usage in P2P Rooms. `Count` and `Usage` measure the number of participant minutes.                                                                                      |
| video-recordings                       | All usage regarding video Recordings and Compositions. `Count` and `Usage` should be ignored.                                                                                           |
| group-rooms-recorded-minutes           | All Recordings generated out of Group Rooms (including Small Group Rooms). `Count` and `Usage` measure the number of recorded participant minutes.                                      |
| pv-composition-minutes                 | All Video Recording Compositions. `Count` and `Usage` measure the number of composition minutes.                                                                                        |
| group-rooms-encrypted-media-recorded   | All encrypted media including Group Room Recordings and Compositions. `Count` and `Usage` measure the number of encrypted participant minutes and composition minutes.                  |
| group-rooms-media-stored               | All media stored in Twilio by Programmable Video Services including Recordings and Compositions. `Count` and `Usage` measure the number of stored GB/day (Gigabytes per day).           |
| group-rooms-media-downloaded           | All media downloaded from Twilio regarding Programmable Video Services. This includes Recordings and Compositions. `Count` and `Usage` measure the number of downloaded GB (Gigabytes). |
| turnmegabytes                          | All TURN data relayed by Twilio. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                                                      |
| turnmegabytes-australia                | TURN data relayed by Twilio in the Australia AWS region. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                              |
| turnmegabytes-brasil                   | TURN data relayed by Twilio in the Brazil AWS region. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                                 |
| turnmegabytes-india                    | TURN data relayed by Twilio in the India AWS region. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                                  |
| turnmegabytes-ireland                  | TURN data relayed by Twilio in the Ireland AWS region. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                                |
| turnmegabytes-japan                    | TURN data relayed by Twilio in the Japan AWS region. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                                  |
| turnmegabytes-singapore                | TURN data relayed by Twilio in the Singapore AWS region. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                              |
| turnmegabytes-useast                   | TURN data relayed by Twilio in the US (East) AWS region. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                              |
| turnmegabytes-uswest                   | TURN data relayed by Twilio in the US (West) AWS region. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                              |
| turnmegabytes-germany                  | TURN data relayed by Twilio in the Germany AWS region. `Count` and `Usage` measure the relayed traffic in MB (Megabytes)                                                                |

#### Programmable Chat \[#usage-prog-chat]

| Category               | Description                                                                                                                                                                                                                                                                       |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pchat-users            | Active Monthly Users - An active user is defined as someone who creates a user or conversation, or edits, or is assigned to a chat channel. This includes reading conversations or sending messages.                                                                              |
| pchat-conv-med-storage | Media Storage - Photos, videos, or other files stored and distributed in chat channels are billed at a monthly rate according to their size, prorated daily. Only stored media (pictures, videos, etc.) incurs a charge; ordinary text-only message bodies are stored at no cost. |

#### Verify \[#usage-verify]

| Category                                    | Description                                                                                                                         |
| :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| verify-push                                 | All Verify push verifications. Each verification is defined as a challenge that is updated with a status of `approved` or `denied`. |
| verify-totp                                 | All Verify TOTP verifications. Each verification is defined as a challenge that is updated with a status of `approved`.             |
| verify-sna                                  | All Verify Silent Network Auth (SNA) verifications.                                                                                 |
| authy-phone-verifications                   | All Verify SMS and Voice verifications.                                                                                             |
| authy-verify-email-verifications            | All Verify email verifications.                                                                                                     |
| authy-verify-outbound-email                 | All Verify one-time tokens requested to be delivered via email.                                                                     |
| verify-whatsapp-template-business-initiated | All WhatsApp messages associated with using Verify to send one-time-passcode messages to WhatsApp users.                            |

#### Authy \[#usage-authy]

| Category                 | Description                                                                                              |
| :----------------------- | :------------------------------------------------------------------------------------------------------- |
| authy-authentications    | All Authy authentications.                                                                               |
| authy-calls-outbound     | All Authy outbound calls. Note that this usage is also included in the Voice categories.                 |
| authy-monthly-fees       | All Authy monthly fees.                                                                                  |
| authy-phone-intelligence | All Authy phone intelligence requests.                                                                   |
| authy-sms-outbound       | All Authy and Verify outbound SMS messages. Note that this usage is also included in the SMS categories. |
| authy-outbound-email     | All Authy one-time tokens requested to be delivered via email.                                           |

#### Studio \[#usage-studio]

| Category           | Description            |
| :----------------- | :--------------------- |
| studio-engagements | All Studio Engagements |

#### Monitor \[#usage-monitor]

| Category        | Description                      |
| :-------------- | :------------------------------- |
| monitor-reads   | All Monitor events API reads.    |
| monitor-writes  | All Monitor events writes.       |
| monitor-storage | All Monitor events storage fees. |

#### Event Streams \[#usage-eventstreams]

| Category | Description                                                          |
| :------- | :------------------------------------------------------------------- |
| events   | All Event Streams events delivered. Usage is in thousands of events. |

#### Engagement Suite \[#usage-engagement-suite]

| Category                               | Description                                                                                      |
| :------------------------------------- | :----------------------------------------------------------------------------------------------- |
| engagement-suite-packaged-plans        | All Engagement Suite packaged plans enabled on account.                                          |
| sms-messages-features-engagement-suite | All Engagement Suite-enabled messages. `Count` and `Usage` are both the number of messages sent. |

#### Other \[#usage-other]

| Category       | Description                                                                                                                                                                                                                                                     |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| premiumsupport | All premium support fees.                                                                                                                                                                                                                                       |
| totalprice     | Total price of all usage. Usage will be the same as Price, and Count will be empty. Note that because some Twilio costs may not be included in any usage category, the sum of the Price in all UsageRecords may or may not be equal to the Price of TotalPrice. |
