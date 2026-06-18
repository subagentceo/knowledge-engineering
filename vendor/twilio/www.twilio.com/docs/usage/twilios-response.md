# Twilio API responses

Learn how to work with Twilio API responses, including how to set response formats, handle errors, and navigate paginated results.

## Response formats

In your API requests, you can specify the format of the response you want to receive by adding an extension to the URI.

Twilio 2010 APIs (`api.twilio.com/2010-04-01`) return XML responses by default. You can also request JSON or CSV. Twilio Product APIs (`<PRODUCT>.twilio.com/v<VERSION>`) return responses in JSON only.

| Format | Extension | MIME type          |   2010 API  | Product API |
| ------ | :-------: | :----------------- | :---------: | :---------: |
| XML    |   `.xml`  | `application/xml`  | ✓ (Default) |             |
| JSON   |  `.json`  | `application/json` |      ✓      |      ✓      |
| CSV    |   `.csv`  | `text/csv`         |      ✓      |             |

### Response examples

The following examples show how to receive responses in different formats.

## XML

```bash
GET /2010-04-01/Accounts/<ACCOUNT_SID>/Messages/<MESSAGE_SID>
```

```xml
<TwilioResponse>
    <SMSMessage>
        <Sid>SM1f0e8ae6ade43cb3c0ce4525424e404f</Sid>
        <DateCreated>Fri, 13 Aug 2010 01:16:24 +0000</DateCreated>
        <DateUpdated>Fri, 13 Aug 2010 01:16:24 +0000</DateUpdated>
        <DateSent/>
        <AccountSid>ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</AccountSid>
        <To>+13455431221</To>
        <From>+15104564545</From>
        <Body>A Test Message</Body>
        <Status>queued</Status>
        <Flags>
            <Flag>outbound</Flag>
        </Flags>
        <ApiVersion>2010-04-01</ApiVersion>
        <Price/>
        <Uri>
            /2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SM1f0e8ae6ade43cb3c0ce4525424e404f
        </Uri>
    </SMSMessage>
</TwilioResponse>
```

## JSON

```bash
GET /2010-04-01/Accounts/<ACCOUNT_SID>/Messages/<MESSAGE_SID>.json
```

```json
{
    "sid": "SM1f0e8ae6ade43cb3c0ce4525424e404f",
    "date_created": "Fri, 13 Aug 2010 01:16:24 +0000",
    "date_updated": "Fri, 13 Aug 2010 01:16:24 +0000",
    "date_sent": null,
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "to": "+15305431221",
    "from": "+15104564545",
    "body": "A Test Message",
    "status": "queued",
    "flags":["outbound"],
    "api_version": "2010-04-01",
    "price": null,
    "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SM1f0e8ae6ade43cb3c0ce4525424e404f.json"
}
```

## CSV

```bash
GET /2010-04-01/Accounts/<ACCOUNT_SID>/Messages/<MESSAGE_SID>.csv
```

```csv
Sid,DateCreated,DateUpdated,DateSent,AccountSid,To,From,Body,Status,Flags,ApiVersion,Price,Uri
SM1f0e8ae6ade43cb3c0ce4525424e404f,"Fri, 13 Aug 2010 01:16:24 +0000","Fri, 13 Aug 2010 01:16:24 +0000",,ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX,+15305431221,+15104564545,"A Test Message",queued,"[outbound]","2010-04-01",,"/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SM1f0e8ae6ade43cb3c0ce4525424e404f.json"
```

## Status codes

When you make a request to a Twilio API, it returns an HTTP status code to indicate the result of your request.

| Status code               | Description                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200 OK`                  | Twilio successfully processed the request. The response body contains the requested resource.                                                                 |
| `201 Created`             | (For `POST` requests only) Twilio successfully created a new resource. The response body contains the new resource.                                           |
| `202 Accepted`            | Twilio accepted the request for processing but hasn't completed it yet.                                                                                       |
| `204 OK`                  | (For `DELETE` requests only) Twilio successfully deleted the resource.                                                                                        |
| `302 Found`               | Twilio redirected the request. You can retrieve the resource at the URI in the `Location` header.                                                             |
| `304 Not modified`        | The resource hasn't changed. Your client's cached version of the representation is still current.                                                             |
| `401 Unauthorized`        | The credentials you provided are missing or invalid.                                                                                                          |
| `404 Not found`           | Twilio can't find the requested resource.                                                                                                                     |
| `405 Not allowed`         | The HTTP method you used isn't allowed for this resource. For example, you're trying to `DELETE` a resource that can't be deleted.                            |
| `429 Too many requests`   | You have reached the Twilio [API concurrency limit](https://help.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests-). |
| `500 Server error`        | Twilio encountered an internal error.                                                                                                                         |
| `503 Service unavailable` | The Twilio service is temporarily unavailable. Try again later.                                                                                               |

## Exceptions

When a request is unsuccessful, Twilio returns an exception with the following information:

| Property    | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| `status`    | The HTTP status code for the exception.                                     |
| `message`   | A detailed description of the exception.                                    |
| `code`      | (If present) A Twilio-specific error code to help you identify the problem. |
| `more_info` | (If present) A URL to Twilio documentation for the error code.              |

**Note**: For XML responses, the exception is wrapped in a `<TwilioResponse>` element. For JSON responses, the exception is returned as a JSON object.

### 404 Not Found

The following example shows a `404 Not Found` error that occurs when the requested resource doesn't exist:

Requested resource not found

```xml
<TwilioResponse>
  <RestException>
    <Status>404</Status>
    <Message>The requested resource was not found</Message>
  </RestException>
</TwilioResponse>
```

```json
{
  "status": 404,
  "message": "The requested resource was not found"
}
```

### 400 Bad Request

The following example shows a 400 Bad Request error that occurs when the request is missing a required parameter. The response includes the `code` and `more_info` properties to help you resolve the error.

Bad request

```xml
<TwilioResponse>
  <RestException>
    <Status>400</Status>
    <Message>No to number is specified</Message>
    <Code>21201</Code>
    <MoreInfo>http://www.twilio.com/docs/errors/21201</MoreInfo>
  </RestException>
</TwilioResponse>
```

```json
{
  "status": 400,
  "message": "No to number is specified",
  "code": 21201,
  "more_info": "http:\/\/www.twilio.com\/docs\/errors\/21201"
}
```

## Hypermedia references

To align with the [Hypermedia As The Engine Of Application State (HATEOAS)](https://en.wikipedia.org/wiki/HATEOAS) principle, the Twilio API responses include URIs to the resources and their related resources. Using the URIs, you can navigate the API and discover related resources.

* For List resources, the response includes URIs for pagination. Learn more about [Pagination](#pagination).
* For Instance resources with subresources, the response includes URIs for those subresources in the `subresource_uris` property.

Hypermedia in Instance Resources

```xml
<TwilioResponse>
  <Call>
    <Sid>CAe1644a7eed5088b159577c5802d8be38</Sid>
    <DateCreated>Tue, 10 Aug 2010 08:02:17 +0000</DateCreated>
    <DateUpdated>Tue, 10 Aug 2010 08:02:47 +0000</DateUpdated>
    <ParentCallSid/>
    <AccountSid>ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</AccountSid>
    <To>+14153855708</To>
    <From>+14158141819</From>
    <PhoneNumberSid></PhoneNumberSid>
    <Status>completed</Status>
    <StartTime>Tue, 10 Aug 2010 08:02:31 +0000</StartTime>
    <EndTime>Tue, 10 Aug 2010 08:02:47 +0000</EndTime>
    <Duration>16</Duration>
    <Price>-0.03000</Price>
    <Flags>
      <Flag>outbound-api</Flag>
    </Flags>
    <ApiVersion>2008-08-01</ApiVersion>
    <ForwardedFrom/>
    <CallerName/>
    <Uri>/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls/CAe1644a7eed5088b159577c5802d8be38</Uri>
    <SubresourceUris>
      <Notifications>/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls/CAe1644a7eed5088b159577c5802d8be38/Notifications</Notifications>
      <Recordings>/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls/CAe1644a7eed5088b159577c5802d8be38/Recordings</Recordings>
    </SubresourceUris>
  </Call>
</TwilioResponse>
```

```json
{
  "sid": "CAe1644a7eed5088b159577c5802d8be38",
  "date_created": "Tue, 10 Aug 2010 08:02:17 +0000",
  "date_updated": "Tue, 10 Aug 2010 08:02:47 +0000",
  "parent_call_sid": null,
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "to": "+14153855708",
  "from": "+14158141819",
  "phone_number_sid": null,
  "status": "completed",
  "start_time": "Tue, 10 Aug 2010 08:02:31 +0000",
  "end_time": "Tue, 10 Aug 2010 08:02:47 +0000",
  "duration": "16",
  "price": "-0.03000",
  "flags":["outbound-api"],
  "api_version": "2008-08-01",
  "annotation": null,
  "forwarded_from": null,
  "caller_name": null,
  "uri": "\/2010-04-01\/Accounts\/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\/Calls\/CAe1644a7eed5088b159577c5802d8be38.json",
  "subresource_uris":{
    "notifications": "\/2010-04-01\/Accounts\/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\/Calls\/CAe1644a7eed5088b159577c5802d8be38\/Notifications.json",
    "recordings": "\/2010-04-01\/Accounts\/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\/Calls\/CAe1644a7eed5088b159577c5802d8be38\/Recordings.json"
  }
}
```

## Pagination

The Twilio API supports pagination for resources that return multiple items. When you request a list of resources, Twilio returns partial results in a single page and includes information to help you navigate through the pages of results.

| Property            | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| `uri`               | The URI of the current page.                                               |
| `first_page_uri`    | The URI for the first page of this list.                                   |
| `next_page_uri`     | The URI for the next page of this list.                                    |
| `previous_page_uri` | The URI for the previous page of this list.                                |
| `page`              | The current page number. Pages are zero-indexed, so the first page is 0.   |
| `page_size`         | The number of items included in each page of results. The default is `50`. |

Pagination

```xml
<TwilioResponse>
  <Calls page="0" pagesize="50"
    uri="/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls"
    firstpageuri="/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls?Page=0&PageSize=50"
    previouspageuri=""
    nextpageuri="/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls?Page=1&PageSize=50&AfterSid=CA228399228abecca920de212121">
    <Call>
      <Sid>CA92d4405c9237c4ea04b56cbda88e128c</Sid>
      <DateCreated>Fri, 13 Aug 2010 01:16:22 +0000</DateCreated>
      <DateUpdated>Fri, 13 Aug 2010 01:16:22 +0000</DateUpdated>
      <ParentCallSid/>
      <AccountSid>ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</AccountSid>
      <To>+15305431221</To>
      <From>+15104563443</From>
      <PhoneNumberSid>PNe2d8e63b37f46f2adb16f228afdb9058</PhoneNumberSid>
      <Status>queued</Status>
      <StartTime/>
      <EndTime/>
      <Duration/>
      <Price/>
      <Flags>
        <Flag>outbound-api</Flag>
      </Flags>
      <ApiVersion>2010-04-01</ApiVersion> <ForwardedFrom/> <CallerName/>
      <Uri>/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls/CA92d4405c9237c4ea04b56cbda88e128c</Uri>
      <SubresourceUris>
        <Notifications>/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls/CA92d4405c9237c4ea04b56cbda88e128c/Notifications</Notifications>
        <Recordings>/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls/CA92d4405c9237c4ea04b56cbda88e128c/Recordings</Recordings>
      </SubresourceUris>
    </Call>
    ...
  </Calls>
</TwilioResponse>
```

```json
{
  "page": 0,
  "page_size": 50,
  "uri": "\/2010-04-01\/Accounts\/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\/Calls.json",
  "first_page_uri": "\/2010-04-01\/Accounts\/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\/Calls.json?Page=0&PageSize=50",
  "previous_page_uri": null,
  "next_page_uri": "\/2010-04-01\/Accounts\/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\/Calls.json?Page=1&PageSize=50&AfterSid=CA228399228abecca920de212121",
  "calls": [
    {
      "sid": "CA92d4405c9237c4ea04b56cbda88e128c",
      "date_created": "Fri, 13 Aug 2010 01:16:22 +0000",
      "date_updated": "Fri, 13 Aug 2010 01:16:22 +0000",
      "parent_call_sid": null,
      "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "to": "+15305431221",
      "from": "+15145623443",
      "phone_number_sid": "PNe2d8e63b37f46f2adb16f228afdb9058",
      "status": "queued",
      "start_time": null,
      "end_time": null,
      "duration": null,
      "price": null,
      "flags":["outbound-api"],
      "api_version": "2010-04-01",
      "forwarded_from": null,
      "caller_name": null,
      "uri": "\/2010-04-01\/Accounts\/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\/Calls\/CA92d4405c9237c4ea04b56cbda88e128c.json",
      "subresource_uris": {
        "notifications": "\/2010-04-01\/Accounts\/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\/Calls\/CA92d4405c9237c4ea04b56cbda88e128c\/Notifications.json",
        "recordings": "\/2010-04-01\/Accounts\/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\/Calls\/CA92d4405c9237c4ea04b56cbda88e128c\/Recordings.json"
      }
    }
  ]
}
```

### Paging through API resources

> \[!NOTE]
>
> [Twilio SDKs](/docs/libraries) automatically handle pagination. You don't need to explicitly request individual pages when using an SDK to retrieve lists of resources.

* To retrieve multiple pages of API results, use the `next_page_uri` parameter provided in the response.
* To control the number of items returned in each page, you can use the `page_size` parameter in your request. For example, `GET /2010-04-01/Accounts/<ACCOUNT_SID>/Calls?PageSize=5` limits the number of items to five per page.

## Data formats

### Phone numbers

Twilio returns all phone numbers in [E.164](https://en.wikipedia.org/wiki/E.164) format. For example, `+14155554345`. If Twilio can't normalize an incoming caller ID to E.164 format, it returns the raw caller ID string.

### Dates and times

Twilio returns all dates and times in GMT using the [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. For example, `Fri, 20 Aug 2010 01:13:42 +0000`.
