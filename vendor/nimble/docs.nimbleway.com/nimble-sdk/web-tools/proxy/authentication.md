> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

> Learn about authentication methods for Nimble's residential proxy

## Authentication Methods

Nimble supports two authentication methods for accessing the residential proxy network:

<CardGroup cols={2}>
  <Card title="Username & Password" icon="key">
    Include credentials in every request
  </Card>

  <Card title="IP Allowlist" icon="shield-check">
    Authenticate by trusted IP addresses
  </Card>
</CardGroup>

## Username & Password Authentication

The most common method - include your account and pipeline credentials in the proxy connection string.

### Connection Format

```shellscript theme={"system"}
http://account-{accountName}-pipeline-{pipelineName}:{pipelinePassword}@ip.nimbleway.com:7000
```

### Code Examples

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -vvv -x http://account-accountName-pipeline-pipelineName:pipelinePassword@ip.nimbleway.com:7000 \
    https://ipinfo.io/json
  ```

  ```python Python theme={"system"}
  import requests

  proxies = {
      'http': 'http://account-accountName-pipeline-pipelineName:pipelinePassword@ip.nimbleway.com:7000',
      'https': 'https://account-accountName-pipeline-pipelineName:pipelinePassword@ip.nimbleway.com:7000'
  }

  url = 'https://ipinfo.io/json'
  response = requests.get(url, proxies=proxies)

  print(response.status_code)
  print(response.text)
  ```

  ```javascript Node theme={"system"}
  const axios = require('axios');

  const targetAddress = "https://ipinfo.io/json";

  const getProxy = async () => {
    return {
      proxy: {
        host: "account-accountName-pipeline-pipelineName:pipelinePassword@ip.nimbleway.com",
        port: 7000
      }
    }
  }

  const run = async () => {
    const res = await axios(targetAddress, await getProxy());
    return res.data;
  }

  (async () => {
    const response = await run()
    console.log(response);
  })();
  ```

  ```go Go theme={"system"}
  package main

  import (
  	"fmt"
  	"io/ioutil"
  	"net/http"
  	"net/url"
  )

  func main() {
  	proxyURL, err := url.Parse("http://account-accountName-pipeline-pipelineName:pipelinePassword@ip.nimbleway.com:7000")
  	if err != nil {
  		fmt.Println(err)
  		return
  	}

  	client := &http.Client{
  		Transport: &http.Transport{
  			Proxy: http.ProxyURL(proxyURL),
  		},
  	}

  	req, err := http.NewRequest("GET", "https://ipinfo.io/json", nil)
  	if err != nil {
  		fmt.Println(err)
  		return
  	}

  	resp, err := client.Do(req)
  	if err != nil {
  		fmt.Println(err)
  		return
  	}
  	defer resp.Body.Close()

  	body, err := ioutil.ReadAll(resp.Body)
  	if err != nil {
  		fmt.Println(err)
  		return
  	}

  	fmt.Println(string(body))
  }
  ```
</CodeGroup>

<Note>
  Replace `accountName`, `pipelineName`, and `pipelinePassword` with your actual credentials from the Nimble dashboard.
</Note>

## IP Allowlist Authentication

Authenticate requests based on trusted IP addresses without including credentials in each request.

### How It Works

1. Add your IP addresses to the pipeline's allowlist in the Nimble dashboard
2. Configure a custom port (between 9000-10000) for the pipeline
3. Send requests from allowlisted IPs without username/password

### Benefits

* **Simplified requests**: No credentials in connection string
* **Enhanced security**: Only specific IPs can access your pipeline
* **Cleaner code**: Remove authentication logic from application code

### Configuration

Configure IP allowlists through:

* Nimble dashboard under pipeline settings
* Admin API `/account/pipelines` endpoint

### Example Request

```bash cURL theme={"system"}
curl -vvv -x http://ip.nimbleway.com:9000 https://ipinfo.io/json
```

<Warning>
  **Security Consideration**: Avoid using shared IP addresses (like AWS shared IPs) in your allowlist. Other parties on the same shared IP could potentially use your account.
</Warning>

## Choosing an Authentication Method

<AccordionGroup>
  <Accordion title="When to use Username & Password">
    * Running requests from dynamic IP addresses
    * Quick setup and testing
    * Multiple team members with different credentials
    * Cloud environments with rotating IPs
  </Accordion>

  <Accordion title="When to use IP Allowlist">
    * Fixed server infrastructure
    * Enhanced security requirements
    * High-volume automated systems
    * Simplified application code
  </Accordion>
</AccordionGroup>

## Authentication Errors

| Response Code | Issue                         | Solution                                                            |
| ------------- | ----------------------------- | ------------------------------------------------------------------- |
| 407           | Proxy Authentication Required | Verify account name, pipeline name, and password are correct        |
| 401           | Unauthorized                  | Check that your IP is in the allowlist (if using IP authentication) |
| 403           | Forbidden                     | Pipeline may be disabled or you may have reached quota limits       |

<Card title="Response Codes Reference" icon="circle-info" href="/nimble-sdk/web-tools/proxy/response-codes">
  View complete list of response codes and troubleshooting steps
</Card>

## Next Steps

<CardGroup cols={2}>
  <Card title="Geotargeting" icon="location-dot" href="/nimble-sdk/web-tools/proxy/geotargeting">
    Target specific countries, states, or cities
  </Card>

  <Card title="Session Control" icon="rotate" href="/nimble-sdk/web-tools/proxy/session-control">
    Control IP rotation behavior
  </Card>
</CardGroup>
