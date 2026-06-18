> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Unlocker Proxy

Nimble **Unlocker Proxy** was designed to solve the problem of anti-bot systems for web scraping users seamlessly. It combines our Nimble IP residential proxies with advanced, AI-powered unlocking technology in the form of Nimble Browser.

Users turn to Unlocker Proxy to enjoy a variety of upgrades including:

* smooth and continuous access to any public data source
* scaling their collection ops flexibly on fully-managed infrastructure
* eliminating burdensome maintenance and debugging
* utilizing AI-powered parsing and webpage rendering capabilities

<Warning>
  Proxy service requires KYC verification and is **<u>not available</u>** for self-service accounts.

  [Contact](https://portal.usepylon.com/nimble) our team to request access.
</Warning>

### **How it works**

To make Unlocker Proxy as simple as possible to integrate, we've designed a standard, proxy-style connection API that makes it seamless to move from residential proxies to Unlocker Proxy.

Behind the scenes, Unlocker Proxy automates the key technologies needed to execute the request and bypass anti-bots, including:

* **Fingerprinting engine** - automatic management of TLS fingerprints, canvas checking, headers, cookies, and more.
* **Fully-managed infrastructure** - serverless cloud environments allow for flexible and infinite scalability, managed for you by Nimble.
* **Built-in Proxies** - Nimble IP provides premium networking infrastructure with high quality and performance IPs.

<Note>
  Unlocker Proxy usage is charged according to the API pricing **per Requests and not per GB** Make sure you review your plan and monitor usage via your Nimble Dashboard.
</Note>

## **Real Time Request**

Unlocker Proxy provides a simplified, one-line approach to data collection that is easy to use and implement across a variety of programming languages and environments. Unlocker Proxy accepts fully-formed URLs, and provides access to many of the key features of the Nimble Browser such as page rendering and data parsing.

```shellscript theme={"system"}
curl -k \
  --proxy 'http://unlocker.webit.live:8888' \
  --proxy-user 'USERNAME:PASSWORD' \
  -H "Header: custom header value" \
  -H 'x-nimble-country: US' \
  -H 'x-nimble-parse: true' \
  -H 'x-nimble-render: false' \
  -H 'x-nimble-format: json' \
  -H 'x-nimble-locale: en-US' \
  -H 'x-nimble-no-html: true' \
  -H 'x-nimble-session-id: my-session-123' \
  'https://www.ipinfo.com'
```

### **Request Optional Parameters**

* `x-nimble-country` - (string) Two-letter country code, e.g. US, DE, BR.
* `x-nimble-render `- (boolean) Whether or not the target resource’s Javascript should be rendered. This is sometimes required in order to properly load some websites.
* `x-nimble-parse` - (boolean) Whether or not the Nimble Browser should parse the requested web data into a JSON structure, or return only the raw HTML. The full raw HTML is returned in both cases.
* `x-nimble-format` - (Enum: `JSON` | `HTML` | `JSON-LINES` | `RAW`) The data response format. HTML - in case of error, returns JSON with error message.
* `x-nimble-locale` - (string) LCID standard locale used for the URL request. Alternatively, user can use `auto` for automatic locale based on geo-location.
* `x-nimble-no-html` - (boolean) If set to `true`, the API will exclude HTML content from the response.
* `x-nimble-session-id` - (string) Sticky session ID for multiple related requests.
* `Custom-Header` - (string) Add custom headers to the request.

### **Response**

If the request was executed successfully, the Unlocker Proxy will return a 200 OK message with the following data:

```json theme={"system"}
{	
        "status": "success",
        "html_content": string,
        "parsing": {
             "status" : "success",
             "entities": { },
             "total_entities_count": 0,
             "entities_count": { }
    }
}
```

The html\_content node contains the full HTML of the requested page, and if parsing was enabled, the parsing node will contain a structured JSON object of the data.
