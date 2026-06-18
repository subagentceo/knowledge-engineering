> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Proxy Quickstart

> Access premium residential IPs through a single BackConnect gateway

Nimble **Residential Proxy** provides access to a global network of premium residential IPs through a single BackConnect gateway. Route your requests through real residential IPs from 195+ countries with granular geotargeting and session control.

<Warning>
  Proxy service requires KYC verification and is **not available** for self-service accounts. [Contact](https://portal.usepylon.com/nimble) our team to request access.
</Warning>

## Quick Start

### Connection Format

```bash theme={"system"}
http://account-{accountName}-pipeline-{pipelineName}:{pipelinePassword}@ip.nimbleway.com:7000
```

| Server             | Port   |
| ------------------ | ------ |
| `ip.nimbleway.com` | `7000` |

### Example Request

<CodeGroup>
  ```python Python theme={"system"}
  import requests

  proxies = {
      'http': 'http://account-accountName-pipeline-pipelineName:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName:pipelinePassword@ip.nimbleway.com:7000'
  }

  response = requests.get('https://ipinfo.io/json', proxies=proxies)

  print(response.json())
  ```

  ```javascript Node theme={"system"}
  const axios = require('axios');

  const getProxy = async () => {
    return {
      proxy: {
        host: "account-accountName-pipeline-pipelineName:pipelinePassword@ip.nimbleway.com",
        port: 7000
      }
    }
  }

  const response = await axios('https://ipinfo.io/json', await getProxy());
  console.log(response.data);
  ```

  ```bash cURL theme={"system"}
  curl -x http://account-accountName-pipeline-pipelineName:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json
  ```
</CodeGroup>

### Example Response

```json theme={"system"}
{
  "ip": "203.0.113.45",
  "city": "Los Angeles",
  "region": "California",
  "country": "US",
  "loc": "34.0522,-118.2437",
  "org": "AS12345 Example ISP",
  "timezone": "America/Los_Angeles"
}
```

## How it works

<Steps>
  <Step title="Get your credentials">
    Obtain your account name, pipeline name, and password from the [Nimble Legacy Dashboard](https://app.nimbleway.com/pipelines)

    <Note>
      Soon will be supported in [Nimble Platform](https://online.nimbleway.com)
    </Note>
  </Step>

  <Step title="Configure your proxy connection">
    * Build your connection string with credentials and optional parameters
    * Add geotargeting (country, state, city) or session control as needed
  </Step>

  <Step title="Route requests through the proxy">
    * Each request goes through Nimble's BackConnect gateway
    * Nimble assigns the best available residential IP
    * IPs rotate automatically or maintain sticky sessions
  </Step>

  <Step title="Receive responses with residential IP">
    * Target websites see requests from real residential IPs
    * Response data flows back through the proxy to your application
  </Step>
</Steps>

## Parameters

Add parameters to your connection string using hyphens:

| Parameter    | Description                           | Format                   |
| ------------ | ------------------------------------- | ------------------------ |
| `country`    | Target specific country (ISO Alpha-2) | `country-US`             |
| `state`      | Target US/CA states                   | `state-CA`               |
| `city`       | Target specific city                  | `city-new_york`          |
| `session`    | Maintain sticky session               | `session-{sessionId}`    |
| `geosession` | Geo-consistent session                | `geosession-{sessionId}` |

## Usage

### Country targeting

Route requests through IPs from a specific country:

<CodeGroup>
  ```python Python theme={"system"}
  proxies = {
      'http': 'http://account-accountName-pipeline-pipelineName-country-US:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName-country-US:pipelinePassword@ip.nimbleway.com:7000'
  }

  response = requests.get('https://ipinfo.io/json', proxies=proxies)
  print(f"Country: {response.json()['country']}")
  ```

  ```javascript Node theme={"system"}
  const getProxy = async () => {
    return {
      proxy: {
        host: "account-accountName-pipeline-pipelineName-country-US:pipelinePassword@ip.nimbleway.com",
        port: 7000
      }
    }
  }

  const response = await axios('https://ipinfo.io/json', await getProxy());
  console.log(`Country: ${response.data.country}`);
  ```

  ```bash cURL theme={"system"}
  curl -x http://account-accountName-pipeline-pipelineName-country-US:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json
  ```
</CodeGroup>

### Target state or city

Precise location targeting  `states` (US and CA only) and/or `city`(Globally):

<CodeGroup>
  ```bash cURL theme={"system"}
  # State Targeting
  curl -vvv -x http://account-accountName-pipeline-pipelineName-country-US-state-CA:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json

  # City Targeting
  curl -vvv -x http://account-accountName-pipeline-pipelineName-city-new_york:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json
  ```

  ```python Python theme={"system"}
  # State Targeting
  proxies_state = {
      'http': 'http://account-accountName-pipeline-pipelineName-country-US-state-CA:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName-country-US-state-CA:pipelinePassword@ip.nimbleway.com:7000'
  }

  # City Targeting
  proxies_city = {
      'http': 'http://account-accountName-pipeline-pipelineName-city-new_york:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName-city-new_york:pipelinePassword@ip.nimbleway.com:7000'
  }

  response_state = requests.get('https://ipinfo.io/json', proxies=proxies_state)
  response_city = requests.get('https://ipinfo.io/json', proxies=proxies_city)
  print(f"State: {response_state.json()['region']}")
  print(f"City: {response_city.json()['region']}")
  ```

  ```javascript Node theme={"system"}
  const getProxyState = async () => {
    return {
      proxy: {
        host: "account-accountName-pipeline-pipelineName-country-US-state-CA:pipelinePassword@ip.nimbleway.com",
        port: 7000
      }
    }
  }

  const getProxyCity = async () => {
    return {
      proxy: {
        host: "account-accountName-pipeline-pipelineName-city-new_york:pipelinePassword@ip.nimbleway.com",
        port: 7000
      }
    }
  }

  const response_state = await axios('https://ipinfo.io/json', await getProxyState());
  const response_city = await axios('https://ipinfo.io/json', await getProxyCity());
  console.log(`State: ${response.data.region}`);
  console.log(`City: ${response.data.region}`);
  ```
</CodeGroup>

<Warning>
  Replace spaces from city names with underscore (instead`New York` use `new_york`).
</Warning>

### Sticky sessions

Keep the same IP across multiple requests:

<CodeGroup>
  ```python Python theme={"system"}
  proxies = {
      'http': 'http://account-accountName-pipeline-pipelineName-session-mysession123:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName-session-mysession123:pipelinePassword@ip.nimbleway.com:7000'
  }

  # Both requests use the same IP
  response1 = requests.get('https://ipinfo.io/json', proxies=proxies)
  response2 = requests.get('https://example.com', proxies=proxies)

  print(f"Both requests used IP: {response1.json()['ip']}")
  ```

  ```javascript Node theme={"system"}
  const sessionId = 'mysession123';

  const getProxy = async () => {
    return {
      proxy: {
        host: `account-accountName-pipeline-pipelineName-session-${sessionId}:pipelinePassword@ip.nimbleway.com`,
        port: 7000
      }
    }
  }

  // Both requests use same IP
  const response1 = await axios('https://ipinfo.io/json', await getProxy());
  const response2 = await axios('https://example.com', await getProxy());

  console.log(`IP maintained: ${response1.data.ip}`);
  ```

  ```bash cURL theme={"system"}
  # First request
  curl -x http://account-accountName-pipeline-pipelineName-session-mysession123:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json

  # Second request - same IP
  curl -x http://account-accountName-pipeline-pipelineName-session-mysession123:pipelinePassword@ip.nimbleway.com:7000 \
    https://example.com
  ```
</CodeGroup>

### Combined geotargeting and session

Target a specific location with a sticky session:

<CodeGroup>
  ```python Python theme={"system"}
  proxies = {
      'http': 'http://account-accountName-pipeline-pipelineName-country-US-state-NY-session-mysession:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName-country-US-state-NY-session-mysession:pipelinePassword@ip.nimbleway.com:7000'
  }

  # Multiple requests maintain same New York IP
  for i in range(3):
      response = requests.get('https://ipinfo.io/json', proxies=proxies)
      print(f"Request {i+1}: {response.json()['city']}, {response.json()['region']}")
  ```

  ```javascript Node theme={"system"}
  const getProxy = async () => {
    return {
      proxy: {
        host: "account-accountName-pipeline-pipelineName-country-US-state-NY-session-mysession:pipelinePassword@ip.nimbleway.com",
        port: 7000
      }
    }
  }

  // Multiple requests from New York with same IP
  for (let i = 0; i < 3; i++) {
    const response = await axios('https://ipinfo.io/json', await getProxy());
    console.log(`Request ${i+1}: ${response.data.city}, ${response.data.region}`);
  }
  ```

  ```bash cURL theme={"system"}
  curl -x http://account-accountName-pipeline-pipelineName-country-US-state-NY-session-mysession:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json
  ```
</CodeGroup>

### Maintain geo-session

Keep the same IP across multiple requests + maintain geographic proximity and ISP consistency across rotations using `geosession`:

<CodeGroup>
  ```bash cURL theme={"system"}
  # First request
  curl -vvv -x http://account-accountName-pipeline-pipelineName-geosession-mysession123:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json

  # Second request - same IP
  curl -vvv -x http://account-accountName-pipeline-pipelineName-geosession-mysession123:pipelinePassword@ip.nimbleway.com:7000 \
    https://example.com
  ```

  ```python Python theme={"system"}
  proxies = {
      'http': 'http://account-accountName-pipeline-pipelineName-geosession-mysession123:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName-geosession-mysession123:pipelinePassword@ip.nimbleway.com:7000'
  }

  # Both requests use the same IP
  response1 = requests.get('https://ipinfo.io/json', proxies=proxies)
  response2 = requests.get('https://example.com', proxies=proxies)

  print(f"IP1: {response1.json()['ip']}")
  print(f"IP2: Same as IP1")
  ```

  ```javascript Node theme={"system"}
  const sessionId = 'mysession123';

  const getProxy = async () => {
    return {
      proxy: {
        host: `account-accountName-pipeline-pipelineName-geosession-${sessionId}:pipelinePassword@ip.nimbleway.com`,
        port: 7000
      }
    }
  }

  // Both requests use the same IP
  const response1 = await axios('https://ipinfo.io/json', await getProxy());
  const response2 = await axios('https://example.com', await getProxy());

  console.log(`Both requests use IP: ${response1.data.ip}`);
  ```
</CodeGroup>

## Blocked Domains

Requests targeting the following domains are blocked and will be rejected.

<Accordion title="View blocked domain list">
  * `*.paypal.com`
  * `account.sonyentertainmentnetwork.com`
  * `acopic.click`
  * `adskpak.com`
  * `amctheatres.com`
  * `andromedabee.com`
  * `antliabee.co.uk`
  * `api.groupon.com`
  * `api.stripe.com`
  * `api.tyrads.com`
  * `apusbee.co.uk`
  * `auth.api.sonyentertainmentnetwork.com`
  * `bellarmine.click`
  * `caixa.gov.br`
  * `callofduty.com`
  * `canal-plus.com`
  * `clubmium.com`
  * `clubmium.net`
  * `couponcabin.com`
  * `crunchyroll.com`
  * `dazn.com`
  * `directv.com`
  * `ea.com`
  * `epicgames.com`
  * `fustian.click`
  * `gomobile.it`
  * `googlecm.hit.gemius.pl`
  * `hbo.com`
  * `hitspro.net`
  * `honeyga.in`
  * `honeygain.com`
  * `honeygain.money`
  * `hotstar.com`
  * `iplogger.org`
  * `kayak.com`
  * `mojang.com`
  * `mte.gov.br`
  * `music-box.mobi`
  * `mybip.it`
  * `myy.io`
  * `native.np.ac.playstation.net`
  * `networkcontroller.net`
  * `ocmey.com`
  * `onevanilla.com`
  * `ordo.link`
  * `pagseguro.com`
  * `paypal.com`
  * `playstation.com`
  * `playstation.net`
  * `plex.tv`
  * `powerbrowsing.online`
  * `revenuevelocity.eu`
  * `roblox.com`
  * `runescape.com`
  * `seasyvendas.com`
  * `sky.com`
  * `sport4life.mobi`
  * `spotify.com`
  * `ssfcu.com`
  * `steamcommunity.com`
  * `steampowered.com`
  * `torrentdownloads.me`
  * `ttvnw.net`
  * `tyrads.com`
  * `tyrrewards.com`
  * `ubi.com`
  * `ubisoft.com`
  * `unrealengine.com`
  * `usps.com`
  * `valuedopinions.com`
  * `vrv.co`
  * `wellsfargo.com`
  * `www.ltv-mob.com`
  * `yogini.top`
  * `zelator.in`
</Accordion>

## Use cases

<CardGroup cols={2}>
  <Card title="Geo-restricted Content" icon="globe">
    Access content as it appears in different countries and regions
  </Card>

  <Card title="Price Monitoring" icon="dollar-sign">
    Check prices across different locations for competitive intelligence
  </Card>

  <Card title="SERP Data Collection" icon="magnifying-glass">
    Gather search results from various locations for SEO analysis
  </Card>

  <Card title="Brand Protection" icon="shield-check">
    Monitor web presence and detect unauthorized use across regions
  </Card>
</CardGroup>

## Features

Explore detailed documentation for each Proxy feature:

<CardGroup cols={2}>
  <Card title="Authentication" icon="key" href="/nimble-sdk/web-tools/proxy/authentication">
    Username/password and IP allowlist authentication methods
  </Card>

  <Card title="Geotargeting" icon="location-dot" href="/nimble-sdk/web-tools/proxy/geotargeting">
    Country, state, and city-level location targeting
  </Card>

  <Card title="Session Control" icon="rotate" href="/nimble-sdk/web-tools/proxy/session-control">
    Sticky sessions, geo-sessions, and rotation settings
  </Card>

  <Card title="Response Codes" icon="circle-info" href="/nimble-sdk/web-tools/proxy/response-codes">
    Error codes and troubleshooting guide
  </Card>
</CardGroup>
