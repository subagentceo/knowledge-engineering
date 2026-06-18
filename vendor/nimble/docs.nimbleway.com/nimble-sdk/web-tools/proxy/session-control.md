> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Session Control

> Control IP rotation behavior with sticky sessions and rotation settings

## Overview

By default, Nimble rotates to a new IP for every request. Session control lets you maintain the same IP across multiple requests or configure custom rotation intervals.

## Session Types

<CardGroup cols={3}>
  <Card title="Rotating (Default)" icon="arrows-rotate">
    New IP for every request
  </Card>

  <Card title="Sticky Session" icon="thumbtack">
    Same IP across multiple requests
  </Card>

  <Card title="Geo Session" icon="location-pin-lock">
    Maintain geographic proximity and ISP consistency across rotations
  </Card>
</CardGroup>

## Sticky Sessions

Maintain the same IP address across multiple requests by creating a session.

### How It Works

1. Add a session ID to your connection string
2. All requests with the same session ID use the same IP
3. Session remains active for 10 minutes after last request
4. If the IP goes offline, a new IP is automatically assigned

### Format

```
account-{accountName}-pipeline-{pipelineName}-session-{sessionId}
```

### Session ID Requirements

* Maximum 32 alphanumeric characters
* Cannot include hyphens
* No minimum length requirement
* Use any arbitrary string

### Example

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -vvv -x http://account-accountName-pipeline-pipelineName-session-mysession123:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json

  # Make another request with the same session
  curl -vvv -x http://account-accountName-pipeline-pipelineName-session-mysession123:pipelinePassword@ip.nimbleway.com:7000 \
    https://example.com
  ```

  ```python Python theme={"system"}
  import requests

  # Same session ID maintains the same IP
  proxies = {
      'http': 'http://account-accountName-pipeline-pipelineName-session-mysession123:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName-session-mysession123:pipelinePassword@ip.nimbleway.com:7000'
  }

  # First request
  response1 = requests.get('https://ipinfo.io/json', proxies=proxies)
  print(response1.text)

  # Second request - uses same IP
  response2 = requests.get('https://example.com', proxies=proxies)
  print(response2.text)
  ```

  ```javascript Node theme={"system"}
  const axios = require("axios");

  const sessionId = "mysession123";

  const getProxy = async () => {
    return {
      proxy: {
        host: `account-accountName-pipeline-pipelineName-session-${sessionId}:pipelinePassword@ip.nimbleway.com`,
        port: 7000,
      },
    };
  };

  // Both requests use the same IP
  const response1 = await axios("https://ipinfo.io/json", await getProxy());
  const response2 = await axios("https://example.com", await getProxy());

  console.log(response1.data);
  console.log(response2.data);
  ```
</CodeGroup>

## Session Expiration

<Steps>
  <Step title="Active Session">
    Requests maintain the same IP while session is active
  </Step>

  <Step title="Inactivity Period">
    After last request, session stays alive for 10 minutes
  </Step>

  <Step title="Expiration">
    After 10 minutes of inactivity, IP is released and session expires
  </Step>

  <Step title="Renewal">Next request with same session ID gets a new IP</Step>
</Steps>

## Combining with Geotargeting

Create sticky sessions with specific geographic targeting:

```bash theme={"system"}
curl -vvv -x http://account-accountName-pipeline-pipelineName-country-US-state-NY-session-mysession:pipelinePassword@ip.nimbleway.com:7000 \
  https://ipinfo.io/json
```

This maintains a sticky session with a New York IP.

## Configuration via Pipeline Settings

For IP allowlist authentication, configure rotation behavior in pipeline settings.

### Rotation Options

| Option        | Description                       |
| ------------- | --------------------------------- |
| Every request | New IP for each request (default) |
| 1 minute      | Rotate IP every 1 minute          |
| 3 minutes     | Rotate IP every 3 minutes         |
| 5 minutes     | Rotate IP every 5 minutes         |
| 10 minutes    | Rotate IP every 10 minutes        |
| 30 minutes    | Rotate IP every 30 minutes        |

### IP Replacement Options

Configure what happens when the current IP becomes unavailable:

| Option       | Behavior                                        |
| ------------ | ----------------------------------------------- |
| Replace IP   | Automatically assign any available IP           |
| Same ASN     | Replace with IP from same ISP/ASN when possible |
| Fail request | Return error instead of replacing IP            |

### Configuration Methods

Configure through:

* Nimble dashboard pipeline settings page
* Admin API `/account/pipelines` endpoint

## Geo-Sessions (Advanced)

For enhanced location consistency, use geo-sessions instead of regular sessions.

### Key Differences

| Feature              | Regular Session                     | Geo-Session                   |
| -------------------- | ----------------------------------- | ----------------------------- |
| IP consistency       | Same IP maintained                  | May rotate within constraints |
| Location consistency | Waterfall: city -> state -> country | Max proximity - 175km radius  |
| ASN/ISP consistency  | No guarantee                        | When Possible                 |
| Rotation sensitivity | Medium                              | Low (more stable)             |
| Performance          | High                                | Medium                        |

### Format

```shellscript theme={"system"}
account-{accountName}-pipeline-{pipelineName}-geosession-{sessionId}
```

### Requirements

* Session ID: 16-32 alphanumeric characters (minimum 16 characters)
* Request timeout: Recommended 40+ seconds
* Session persistence: Up to 10 days of inactivity
* Availability: World-wide, optimized performance in US

### Example

```bash theme={"system"}
curl -vvv -x http://account-accountName-pipeline-pipelineName-country-US-geosession-mysession12345678:pipelinePassword@ip.nimbleway.com:7000 \
  https://ipinfo.io/json
```

<Note>
  **When to use Geo-sessions**: Use geo-sessions for long, multi-step processes
  that need location stability (within 175km) and ASN consistency, such as
  simulating real user behavior or multi-page workflows.
</Note>

## Best Practices

<Check>
  **Generate unique session IDs** for different workflows to avoid conflicts
</Check>

<Check>
  **Use geo-sessions** for multi-step processes requiring location consistency
</Check>

<Check>
  **Monitor session expiration** and handle re-authentication when sessions
  expire
</Check>

<Check>
  **Configure fallback behavior** in pipeline settings for IP replacement
</Check>

## Next Steps

<CardGroup cols={2}>
  <Card title="Geotargeting" icon="location-dot" href="/nimble-sdk/web-tools/proxy/geotargeting">
    Combine sessions with geographic targeting
  </Card>

  <Card title="Response Codes" icon="circle-info" href="/nimble-sdk/web-tools/proxy/response-codes">
    Handle session-related errors
  </Card>
</CardGroup>
