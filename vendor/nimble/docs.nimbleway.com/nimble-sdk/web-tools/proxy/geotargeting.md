> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Geotargeting

> Target specific geographic locations with Nimble's residential proxy

## Overview

Control the geographic location of your proxy IPs by adding targeting parameters to your connection string. Target by country, state (US only), or city for precise location control.

## Targeting Levels

<CardGroup cols={3}>
  <Card title="Country" icon="flag">
    Access IPs from any country worldwide
  </Card>

  <Card title="State" icon="map-pin">
    Target US states (US only)
  </Card>

  <Card title="City" icon="location-dot">
    Target specific cities
  </Card>
</CardGroup>

## Country Targeting

Target a specific country by adding the country code to your connection string.

### Format

```shellscript theme={"system"}
account-{accountName}-pipeline-{pipelineName}-country-{countryCode}
```

### Country Codes

Use ISO 3166 alpha-2 country codes, for example:

* `US` - United States
* `CA` - Canada
* `GB` - United Kingdom
* `DE` - Germany
* `FR` - France
* `JP` - Japan

### Example

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -vvv -x http://account-accountName-pipeline-pipelineName-country-US:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json
  ```

  ```python Python theme={"system"}
  import requests

  proxies = {
      'http': 'http://account-accountName-pipeline-pipelineName-country-US:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName-country-US:pipelinePassword@ip.nimbleway.com:7000'
  }

  response = requests.get('https://ipinfo.io/json', proxies=proxies)
  print(response.text)
  ```

  ```javascript Node theme={"system"}
  const axios = require("axios");

  const getProxy = async () => {
    return {
      proxy: {
        host: "account-accountName-pipeline-pipelineName-country-US:pipelinePassword@ip.nimbleway.com",
        port: 7000,
      },
    };
  };

  const response = await axios("https://ipinfo.io/json", await getProxy());
  console.log(response.data);
  ```
</CodeGroup>

## State Targeting (US and CA Only)

For more precise targeting within the United States and Canada, specify a state code.

### Format

```
account-{accountName}-pipeline-{pipelineName}-country-US-state-{stateCode}
```

### Example

```bash theme={"system"}
curl -vvv -x http://account-accountName-pipeline-pipelineName-country-US-state-CA:pipelinePassword@ip.nimbleway.com:7000 \
  https://ipinfo.io/json
```

<Note>
  State targeting is only available when the country is set to `US` or `CA`. Use
  standard two-letter US state codes (e.g., NY, LA).
</Note>

## City Targeting

Target a specific city for the most precise geolocation control.

### Format

```shellscript theme={"system"}
account-{accountName}-pipeline-{pipelineName}-city-{cityName}
```

### Example

```bash theme={"system"}
curl -vvv -x http://account-accountName-pipeline-pipelineName-city-new_york:pipelinePassword@ip.nimbleway.com:7000 \
  https://ipinfo.io/json
```

<Warning>
  Replace spaces from city names with underscore (e.g,`New York`
  becomes `new_york`).
</Warning>

## Combining with Other Parameters

You can combine geotargeting with session control for powerful targeting:

```bash theme={"system"}
curl -vvv -x http://account-accountName-pipeline-pipelineName-country-US-state-NY-session-mysession:pipelinePassword@ip.nimbleway.com:7000 \
  https://ipinfo.io/json
```

This request targets New York state and maintains a sticky session.

## Getting Available Locations

To retrieve a list of all supported countries, states, and cities:

### Using Admin API

```bash theme={"system"}
GET /location/cities
```

This endpoint returns a comprehensive list of available geolocation options.

## Geo-Sessions (Advanced)

For applications requiring consistent geographic proximity across rotations, use geo-sessions.

### Key Features

* **Proximity guarantee**: New IPs stay within 175km of original location
* **ASN consistency**: Rotations use the same ISP
* **High durability**: Uses most stable residential IPs

### Format

```shellscript theme={"system"}
account-{accountName}-pipeline-{pipelineName}-geosession-{sessionId}
```

### Requirements

* Session ID must be 16-32 alphanumeric characters (minimum 16)
* Request timeout of at least 40 seconds recommended
* Currently available in the US only

### Example

```bash theme={"system"}
curl -vvv -x http://account-accountName-pipeline-pipelineName-country-US-geosession-mysession12345678:pipelinePassword@ip.nimbleway.com:7000 \
  https://ipinfo.io/json
```

<Note>
  **Geo-sessions vs Regular Sessions**: Geo-sessions provide stricter location
  consistency (175km radius) and ASN matching, while regular sessions simply
  maintain the same IP. Use geo-sessions when precise location consistency is
  critical.
</Note>

## Configuration via Dashboard

For IP allowlist authentication, configure default geotargeting through:

* Nimble dashboard pipeline settings
* Admin API `/account/pipelines` endpoint

## Response Codes

| Code | Meaning                                |
| ---- | -------------------------------------- |
| 200  | Success - IP found for target location |
| 525  | No IP available for specified location |

<Card title="View All Response Codes" icon="list" href="/nimble-sdk/web-tools/proxy/response-codes">
  See complete response code reference
</Card>

## Next Steps

<CardGroup cols={2}>
  <Card title="Session Control" icon="rotate" href="/nimble-sdk/web-tools/proxy/session-control">
    Learn how to control IP rotation
  </Card>

  <Card title="Response Codes" icon="circle-info" href="/nimble-sdk/web-tools/proxy/response-codes">
    Understand error codes and troubleshooting
  </Card>
</CardGroup>
