# REST API: UsageTrigger

A **UsageTrigger** is a webhook that notifies your application of usage thresholds.

> \[!NOTE]
>
> Twilio can send your web application an HTTP request when certain events happen, such as an incoming text message to one of your Twilio phone numbers. These requests are called *webhooks*, or *status callbacks*. For more, check out our guide to [Getting Started with Twilio Webhooks](/docs/usage/webhooks/getting-started-twilio-webhooks). Find other webhook pages, such as a [security guide](/docs/usage/webhooks/webhooks-security) and an [FAQ](/docs/usage/webhooks/webhooks-faq) in the [Webhooks](/docs/usage/webhooks) section of the docs.

> \[!WARNING]
>
> It can take some amount of time for the data used by usage triggers to be reflected in the UsageTriggers evaluations.

Using this resource, you can make or update a new UsageTrigger, fetch information about an existing UsageTrigger or multiple UsageTriggers, or delete an existing UsageTrigger.

You can configure UsageTriggers to recur daily, monthly, or yearly. UsageTriggers are evaluated frequently — about once a minute — to provide timely information to your application.

You can also set UsageTriggers for any usage category. For example, you can create a single UsageTrigger to track daily usage. In this case, a UsageTrigger notifies your application when your cost exceeds a set daily amount. If used together with Subaccounts created for each end-user, then a UsageTrigger would notify your application that a specific user has exceeded an allocated monthly usage.

> \[!NOTE]
>
> For more information, see [Usage categories](/docs/usage/api/usage-record#usage-categories) in *Usage Records* as well as [Subaccounts](/docs/iam/api/subaccounts).

## Trigger Properties

A UsageTrigger is represented by the following properties:

<OperationTable type="properties" data={{"title":"ListUsageTriggerResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"usage_triggers":{"type":"array","items":{"type":"object","refName":"api.v2010.account.usage.usage_trigger","modelName":"api_v2010_account_usage_usage_trigger","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the trigger monitors."},"api_version":{"type":"string","nullable":true,"description":"The API version used to create the resource."},"callback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `callback_url`. Can be: `GET` or `POST`."},"callback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using the `callback_method` when the trigger fires.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":60}}},"current_value":{"type":"string","nullable":true,"description":"The current value of the field the trigger is watching."},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_fired":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the trigger was last fired specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the trigger."},"recurring":{"type":"string","enum":["daily","monthly","yearly","alltime"],"description":"The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.","refName":"usage_trigger_enum_recurring","modelName":"usage_trigger_enum_recurring"},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UT[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that that we created to identify the UsageTrigger resource."},"trigger_by":{"type":"string","enum":["count","usage","price"],"description":"The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).","refName":"usage_trigger_enum_trigger_field","modelName":"usage_trigger_enum_trigger_field"},"trigger_value":{"type":"string","nullable":true,"description":"The value at which the trigger will fire.  Must be a positive, numeric value."},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."},"usage_category":{"type":"string","nullable":true,"description":"The usage category the trigger watches. Must be one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories)."},"usage_record_uri":{"type":"string","nullable":true,"description":"The URI of the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource this trigger watches, relative to `https://api.twilio.com`."}}}}}}} />

## CallbackUrl requests

When an account's usage category crosses a UsageTrigger's `TriggerValue` during the specified interval, then Twilio makes a request to the `CallbackUrl` using the HTTP method `CallbackMethod` with the `CallbackUrl` Request parameters.

Twilio guarantees that a UsageTrigger will fire once (at most) during its recurring interval and will quickly retry the callback URL three times after a 5xx error.

> \[!NOTE]
>
> For more information, see [CallbackUrl Request Parameters](#usagetrigger-callbacks) below.

## Create a UsageTrigger Resource

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json`

Each account can create up to 1,000 UsageTriggers. If UsageTrigger creation is successful, Twilio will respond with a representation of the new trigger.

> \[!WARNING]
>
> Inactive UsageTriggers will *not* be deleted automatically.
>
> You need to delete triggers you no longer need. For more information, see [Delete a UsageTrigger resource](#delete-a-usagetrigger-resource) below.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateUsageTriggerRequest","required":["CallbackUrl","TriggerValue","UsageCategory"],"properties":{"CallbackUrl":{"type":"string","format":"uri","description":"The URL we should call using `callback_method` when the trigger fires.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":60}}},"TriggerValue":{"type":"string","description":"The usage value at which the trigger should fire.  For convenience, you can use an offset value such as `+30` to specify a trigger_value that is 30 units more than the current usage value. Be sure to urlencode a `+` as `%2B`."},"UsageCategory":{"type":"string","description":"The usage category that the trigger should watch.  Use one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) for this value."},"CallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`."},"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long."},"Recurring":{"type":"string","enum":["daily","monthly","yearly","alltime"],"description":"The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.","refName":"usage_trigger_enum_recurring","modelName":"usage_trigger_enum_recurring"},"TriggerBy":{"type":"string","enum":["count","usage","price"],"description":"The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).","refName":"usage_trigger_enum_trigger_field","modelName":"usage_trigger_enum_trigger_field"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"CallbackMethod\": \"GET\",\n  \"CallbackUrl\": \"https://example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"Recurring\": \"daily\",\n  \"TriggerBy\": \"count\",\n  \"TriggerValue\": \"trigger_value\",\n  \"UsageCategory\": \"calleridlookups\"\n}","meta":"","code":"{\n  \"CallbackMethod\": \"GET\",\n  \"CallbackUrl\": \"https://example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"Recurring\": \"daily\",\n  \"TriggerBy\": \"count\",\n  \"TriggerValue\": \"trigger_value\",\n  \"UsageCategory\": \"calleridlookups\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"CallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Recurring\"","#7EE787"],[":","#C9D1D9"]," ",["\"daily\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TriggerBy\"","#7EE787"],[":","#C9D1D9"]," ",["\"count\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TriggerValue\"","#7EE787"],[":","#C9D1D9"]," ",["\"trigger_value\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UsageCategory\"","#7EE787"],[":","#C9D1D9"]," ",["\"calleridlookups\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a new UsageTrigger with parameters

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.usage.triggers
  .create({
    triggerValue: '1000',
    usageCategory: 'sms',
    callbackUrl: 'http://www.example.com/',
  })
  .then((trigger) => process.stdout.write(trigger.sid));
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']

client = Client(account_sid, auth_token)

trigger = client.usage.triggers.create(
    trigger_value="1000",
    usage_category="sms",
    callback_url="http://www.example.com/"
)

print(trigger.sid)
```

```cs
// Download the twilio-csharp library from twilio.com/docs/libraries/csharp
using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage;

class Example
{
    static void Main(string[] args)
    {
        // Find your Account Sid and Auth Token at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        const string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
        TwilioClient.Init(accountSid, authToken);

        var callbackUrl = new Uri("http://www.example.com/");
        const string triggerValue = "1000";
        var trigger = TriggerResource.Create(callbackUrl,
                                             triggerValue,
                                             TriggerResource.UsageCategoryEnum.Sms);

        Console.WriteLine(trigger.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import java.net.URI;
import java.net.URISyntaxException;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.Trigger;

public class Example {
  // Get your Account SID and Auth Token from https://twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main(String[] args) throws URISyntaxException {
    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

    Trigger trigger = Trigger
        .creator(new URI("http://www.example.com/"), "1000", Trigger.UsageCategory.SMS)
        .create();

    System.out.println(trigger.getSid());
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Your Account Sid and Auth Token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$sid = getenv('TWILIO_ACCOUNT_SID');
$token = getenv('TWILIO_AUTH_TOKEN');
$client = new Client($sid, $token);

$trigger = $client->usage->triggers->create(
    "http://www.example.com/", "1000", "sms"
);

echo $trigger->sid;
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'

# Get your Account SID and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trigger = @client.usage.triggers.create(
  trigger_value: '1000',
  usage_category: 'sms',
  callback_url: 'http://www.example.com/'
)

puts trigger.usage_category
```

```bash
curl -XPOST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers.json \
    -d "TriggerValue=1000" \
    -d "UsageCategory=sms" \
    -d "CallbackUrl=http://www.example.com/" \
    -u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token'
```

```json
{
   "usage_record_uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Records.json?Category=sms", 
   "date_updated": "Sat, 13 Oct 2012 21:32:30 +0000", 
   "date_fired": null, 
   "friendly_name": "Trigger for sms at usage of 1000", 
   "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers/UTc142bed7b38c4f8186ef41a309814fd2.json", 
   "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
   "callback_method": "POST", 
   "trigger_by": "usage", 
   "sid": "UTc142bed7b38c4f8186ef41a309814fd2", 
   "current_value": "57", 
   "date_created": "Sat, 13 Oct 2012 21:32:30 +0000", 
   "callback_url": "http://www.example.com", 
   "recurring": null, 
   "usage_category": "sms", 
   "trigger_value": "1000.000000"
}
```

## Fetch a UsageTrigger resource

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the UsageTrigger resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UT[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a UsageTrigger resource

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.usage
  .triggers('UT33c6aeeba34e48f38d6899ea5b765ad4')
  .fetch()
  .then((trigger) => trigger.currentValue);
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']

client = Client(account_sid, auth_token)

trigger = client.usage.triggers("UT33c6aeeba34e48f38d6899ea5b765ad4").fetch()
print(trigger.current_value)
```

```cs
// Download the twilio-csharp library from twilio.com/docs/libraries/csharp
using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage;

class Example
{
    static void Main(string[] args)
    {
        // Find your Account Sid and Auth Token at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        const string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
        TwilioClient.Init(accountSid, authToken);

        var trigger = TriggerResource.Fetch("UT33c6aeeba34e48f38d6899ea5b765ad4");

        Console.WriteLine(trigger.CurrentValue);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.Trigger;

public class Example {
  // Get your Account SID and Auth Token from https://twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main(String[] args) {
    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

    // Get an object from its sid. If you do not have a sid,
    // check out the list resource examples on this page
    Trigger trigger = Trigger.fetcher("UT33c6aeeba34e48f38d6899ea5b765ad4").fetch();

    System.out.println(trigger.getCurrentValue());
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Your Account Sid and Auth Token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$sid = getenv('TWILIO_ACCOUNT_SID');
$token = getenv('TWILIO_AUTH_TOKEN');
$client = new Client($sid, $token);

// Get an object from its sid. If you do not have a sid,
// check out the list resource examples on this page
$trigger = $client
    ->usage
    ->triggers("UT33c6aeeba34e48f38d6899ea5b765ad4")
    ->fetch();

echo $trigger->currentValue;
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'

# Get your Account SID and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

# Get an object from its sid. If you do not have a sid,
# check out the list resource examples on this page
trigger = @client.usage.triggers('UT33c6aeeba34e48f38d6899ea5b765ad4').fetch

puts trigger.current_value
```

```bash
curl -G https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers/UT33c6aeeba34e48f38d6899ea5b765ad4.json \
    -u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token'
```

```json
{
   "usage_record_uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Records.json?Category=calls", 
   "date_updated": "Sat, 29 Sep 2012 19:47:54 +0000", 
   "date_fired": null, 
   "friendly_name": "Trigger for calls at usage of 500", 
   "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers/UT33c6aeeba34e48f38d6899ea5b765ad4.json", 
   "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
   "callback_method": "POST", 
   "trigger_by": "usage", 
   "sid": "UT33c6aeeba34e48f38d6899ea5b765ad4", 
   "current_value": "21", 
   "date_created": "Sat, 29 Sep 2012 19:45:43 +0000", 
   "callback_url": "http://www.example.com/", 
   "recurring": null, 
   "usage_category": "calls", 
   "trigger_value": "500.000000"
}
```

## Read multiple UsageTrigger resources

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"Recurring","in":"query","description":"The frequency of recurring UsageTriggers to read. Can be: `daily`, `monthly`, or `yearly` to read recurring UsageTriggers. An empty value or a value of `alltime` reads non-recurring UsageTriggers.","schema":{"type":"string","enum":["daily","monthly","yearly","alltime"],"description":"The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.","refName":"usage_trigger_enum_recurring","modelName":"usage_trigger_enum_recurring"},"examples":{"readFull":{"value":"daily"},"readEmpty":{"value":"daily"}}},{"name":"TriggerBy","in":"query","description":"The trigger field of the UsageTriggers to read.  Can be: `count`, `usage`, or `price` as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).","schema":{"type":"string","enum":["count","usage","price"],"description":"The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).","refName":"usage_trigger_enum_trigger_field","modelName":"usage_trigger_enum_trigger_field"},"examples":{"readFull":{"value":"count"},"readEmpty":{"value":"count"}}},{"name":"UsageCategory","in":"query","description":"The usage category of the UsageTriggers to read. Must be a supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).","schema":{"type":"string"},"examples":{"readFull":{"value":"calleridlookups"},"readEmpty":{"value":"calleridlookups"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Read multiple UsageTrigger resources

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const filterOpts = {
  recurring: 'daily',
  usageCategory: 'calls',
};

client.usage.triggers.each(filterOpts, (trigger) =>
  console.log(trigger.currentValue)
);
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']

client = Client(account_sid, auth_token)

# A list of trigger objects with the properties described above

triggers = client.usage.triggers.list(
    recurring="daily", usage_category="calls"
)
```

```cs
// Download the twilio-csharp library from twilio.com/docs/libraries/csharp
using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage;

class Example
{
    static void Main(string[] args)
    {
        // Find your Account Sid and Auth Token at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        const string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
        TwilioClient.Init(accountSid, authToken);

        var triggers = TriggerResource.Read(
            recurring: TriggerResource.RecurringEnum.Daily,
            usageCategory: TriggerResource.UsageCategoryEnum.Calls);

        foreach (var trigger in triggers)
        {
            Console.WriteLine(trigger.CurrentValue);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.base.ResourceSet;
import com.twilio.rest.api.v2010.account.usage.Trigger;

public class Example {
  // Get your Account SID and Auth Token from https://twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main(String[] args) {
    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

    ResourceSet<Trigger> triggers = Trigger.reader()
        .setUsageCategory(Trigger.UsageCategory.CALLS)
        .setRecurring(Trigger.Recurring.DAILY)
        .read();

    // Loop over triggers and print out a property for each one.
    for (Trigger trigger : triggers) {
      System.out.println(trigger.getCurrentValue());
    }
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Your Account Sid and Auth Token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$sid = getenv('TWILIO_ACCOUNT_SID');
$token = getenv('TWILIO_AUTH_TOKEN');
$client = new Client($sid, $token);

$triggers = $client->usage->triggers->read(
    array(
        "Recurring" => "daily",
        "UsageCategory" => "calls"
    )
);

// Loop over the list of triggers and echo a property for each one
foreach ($triggers as $trigger) {
    echo $trigger->currentValue;
}
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'

# Get your Account SID and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

# Loop over triggers and print out a property for each one
triggers = @client.usage.triggers.list(recurring: 'daily',
                                       usage_category: 'calls')

triggers.each do |trigger|
  puts trigger.current_value
end
```

```bash
curl -G https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers.json \
    -d "Recurring=daily" \
    -d "UsageCategory=calls" \
    -u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token'
```

```json
{
   "first_page_uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers/.json?UsageCategory=calls&Recurring=daily&Page=0&PageSize=50",
   "previous_page_uri": null, 
   "usage_triggers": [
      {
         "usage_record_uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Records/Today.json?Category=calls", 
         "date_updated": "Sat, 29 Sep 2012 19:42:57 +0000", 
         "date_fired": null, 
         "friendly_name": "a trigger", 
         "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers//UTc2db285b0cbf4c60a2f1a8db237a5fba.json", 
         "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
         "callback_method": "POST", 
         "trigger_by": "count", 
         "sid": "UTc2db285b0cbf4c60a2f1a8db237a5fba", 
         "current_value": "0", 
         "date_created": "Sun, 23 Sep 2012 23:07:29 +0000", 
         "callback_url": "http://www.google.com", 
         "recurring": "daily", 
         "usage_category": "calls", 
         "trigger_value": "0.000000"
      }
   ], 
   "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers.json?UsageCategory=calls&Recurring=daily", 
   "page_size": 50,
   "next_page_uri": null,
   "page": 0
}
```

## Update a UsageTrigger Resource

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json`

Attempts a UsageTrigger's properties update and, if successful, returns the updated resource representation.

The returned response is identical to the returned response of a `GET` request.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the UsageTrigger resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UT[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateUsageTriggerRequest","properties":{"CallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`."},"CallbackUrl":{"type":"string","format":"uri","description":"The URL we should call using `callback_method` when the trigger fires.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":60}}},"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"CallbackMethod\": \"GET\",\n  \"CallbackUrl\": \"https://example.com\",\n  \"FriendlyName\": \"friendly_name\"\n}","meta":"","code":"{\n  \"CallbackMethod\": \"GET\",\n  \"CallbackUrl\": \"https://example.com\",\n  \"FriendlyName\": \"friendly_name\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"CallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a UsageTrigger Resource

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.usage
  .triggers('UT33c6aeeba34e48f38d6899ea5b765ad4')
  .update({
    friendlyName: 'Monthly Maximum Call Usage',
    callbackUrl: 'https://www.example.com/monthly-usage-trigger',
  })
  .then((trigger) => console.log(trigger.dateFired));
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

trigger = client.usage.triggers("UT33c6aeeba34e48f38d6899ea5b765ad4").update(
    friendly_name="Monthly Maximum Call Usage",
    callback_url="https://www.example.com/monthly-usage-trigger"
)

print(trigger.date_fired)
```

```cs
// Download the twilio-csharp library from twilio.com/docs/libraries/csharp
using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage;

class Example
{
    static void Main(string[] args)
    {
        // Find your Account Sid and Auth Token at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        const string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
        TwilioClient.Init(accountSid, authToken);

        TriggerResource.Update(
            "UT33c6aeeba34e48f38d6899ea5b765ad4",
            friendlyName: "Monthly Maximum Call Usage",
            callbackUrl: new Uri("https://www.example.com/monthly-usage-trigger"));
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.Trigger;

public class Example {
  // Get your Account SID and Auth Token from https://twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main(String[] args) {
    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

    // Get an object from its sid. If you do not have a sid,
    // check out the list resource examples on this page
    Trigger trigger = Trigger
        .updater("UT33c6aeeba34e48f38d6899ea5b765ad4")
        .setFriendlyName("Monthly Maximum Call Usage")
        .setCallbackUrl("https://www.example.com/monthly-usage-trigger")
        .update();

    System.out.println(trigger.getDateUpdated());
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Your Account Sid and Auth Token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$sid = getenv('TWILIO_ACCOUNT_SID');
$token = getenv('TWILIO_AUTH_TOKEN');
$client = new Client($sid, $token);

// Get an object from its sid. If you do not have a sid,
// check out the list resource examples on this page
$trigger = $client
    ->usage
    ->triggers("UT33c6aeeba34e48f38d6899ea5b765ad4")
    ->update(
        array(
            "friendlyName" => "Monthly Maximum Call Usage",
            "callbackUrl" => "https://www.example.com/monthly-usage-trigger"
        )
    );

echo $trigger->dateFired->format('Y-m-d H:i:s');;
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'

# Get your Account SID and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

# Get an object from its sid. If you do not have a sid,
# check out the list resource examples on this page
trigger = @client.usage.triggers('UT33c6aeeba34e48f38d6899ea5b765ad4').fetch
trigger.update(friendly_name: 'Monthly Maximum Call Usage',
               callback_url: 'https://www.example.com/monthly-usage-trigger')

puts trigger.date_fired
```

```bash
curl -XPOST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers/UT33c6aeeba34e48f38d6899ea5b765ad4.json \
    -d "FriendlyName=Monthly%20Maximum%20Call%20Usage" \
    -d "CallbackUrl=https://www.example.com/monthly-usage-trigger" \
    -u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token'
```

```json
{
   "usage_record_uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Records.json?Category=calls", 
   "date_updated": "Sat, 13 Oct 2012 21:24:35 +0000", 
   "date_fired": null, 
   "friendly_name": "Monthly Maximum Call Usage", 
   "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers/UT33c6aeeba34e48f38d6899ea5b765ad4.json", 
   "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
   "callback_method": "POST", 
   "trigger_by": "usage", 
   "sid": "UT33c6aeeba34e48f38d6899ea5b765ad4", 
   "current_value": "21", 
   "date_created": "Sat, 29 Sep 2012 19:45:43 +0000", 
   "callback_url": "https://www.example.com/monthly-usage-trigger", 
   "recurring": null, 
   "usage_category": "calls", 
   "trigger_value": "500.000000"
}
```

> \[!WARNING]
>
> Currently, you cannot update the category or value of an existing UsageTrigger. Instead, use `POST` to [create a new UsageTrigger](#create-a-usagetrigger-resource) and use `DELETE` to [remove an old UsageTrigger](#delete-a-usagetrigger-resource).

## Delete a UsageTrigger resource

`DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resources to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the UsageTrigger resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UT[0-9a-fA-F]{32}$"},"required":true}]
```

Delete an Usage Trigger

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteUsageTrigger() {
  await client.usage.triggers("UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").remove();
}

deleteUsageTrigger();
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

client.usage.triggers("UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
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

        await TriggerResource.DeleteAsync(pathSid: "UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.Trigger;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Trigger.deleter("UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	params := &api.DeleteUsageTriggerParams{}

	err := client.Api.DeleteUsageTrigger("UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
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

$twilio->usage->triggers("UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .api
  .v2010
  .usage
  .triggers('UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:usage:triggers:remove \
   --sid UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Triggers/UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### UsageTrigger Callbacks

As soon as the usage value of a UsageTrigger exceeds the `TriggerValue`, the trigger will fire and Twilio will make an asynchronous HTTP request to the UsageTrigger's `CallbackUrl`. This request will typically take place within a minute of exceeding the usage threshold.

#### CallbackUrl request parameters

Twilio will pass the following parameters to the UsageTrigger's `CallbackUrl`:

| **Parameter**    | **Description**                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSid       | Your Twilio account id. It is 34 characters long and always starts with the letters `AC`                                                              |
| UsageTriggerSid  | Unique identifier of the fired UsageTrigger.                                                                                                          |
| DateFired        | Date when the UsageTrigger fired, in GMT.                                                                                                             |
| Recurring        | How the fired UsageTrigger recurs. For non-recurring UsageTriggers: leave empty. For recurring UsageTriggers: choose `daily`, `monthly`, or `yearly`. |
| UsageCategory    | Usage category watched by the UsageTrigger: choose from supported usage categories.                                                                   |
| TriggerBy        | UsageRecord field that fires the UsageTrigger: choose from `count`, `usage`, or `price`.                                                              |
| TriggerValue     | Value at which the UsageTrigger fired.                                                                                                                |
| CurrentValue     | The current value of the usage watched by the UsageTrigger.                                                                                           |
| UsageRecordUri   | URI of the UsageRecord that this UsageTrigger watched when it fired.                                                                                  |
| IdempotencyToken | A random token generated by Twilio and guaranteed to be unique for this particular firing of this UsageTrigger.                                       |

#### Best practices with UsageTrigger callbacks

When implementing a handler for UsageTrigger's `CallbackUrl`, your handler may receive HTTP requests more than once. Services that handle duplicate requests and return the same response are called Idempotence.

We give you an `IdempotencyToken` that is unique for each Usage Trigger callback.

> \[!NOTE]
>
> For more information about Idempotence, [see this wiki page](https://en.wikipedia.org/wiki/Idempotence).

#### Example: daily recurring UsageTrigger's idempotency token

```bash
ACed70abd024d3f57a4027b5dc2ca88d5b-FIRES-UTc142bed7b38c4f8186ef41a309814fd2-2012-10-04

```

You can keep track of your `IdempotencyToken` to properly handle requests to your service and prevent a request from performing the same operation twice.

For example, your callback service may send billing notifications via email. For the best possible customer experience, you would want your customers only to receive the billing notification email once.

You can follow the test-and-set (external link) pattern to implement idempotent services. In short, you would test for the existence of the `IdempotencyToken` before processing your application's logic. This allows your application to handle existing tokens and choose the next appropriate step.

In the email example, you would have already sent the email to your customer then you would skip sending the email, instead replying with an HTTP status code of 200.

> \[!NOTE]
>
> For more information on test-and-set, [see this wiki page](https://en.wikipedia.org/wiki/Test-and-set).
