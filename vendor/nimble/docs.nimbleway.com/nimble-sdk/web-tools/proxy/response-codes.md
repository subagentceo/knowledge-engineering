> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Response Codes

> Understand response codes and troubleshoot common issues

## HTTP Response Codes

Nimble's residential proxy returns standard HTTP response codes along with proxy-specific codes to help you understand request status and troubleshoot issues.

## Success Codes

<ResponseField name="200" type="Success">
  Request completed successfully
</ResponseField>

<ResponseField name="302" type="Redirect">
  Target server sent a redirect response
</ResponseField>

## Client Error Codes

### 400 - Bad Request

**Meaning**: The request is badly formatted.

**Common Causes**:

* Missing account name, pipeline name, or password
* Incorrect connection string format
* Missing target URL

**Solution**:

```bash theme={"system"}
# Verify your connection string format
http://account-{accountName}-pipeline-{pipelineName}:{password}@ip.nimbleway.com:7000
```

***

### 401 - Unauthorized

**Meaning**: The target website rejected your authentication credentials.

**Common Causes**:

* Target site requires login credentials
* Session expired on target site
* Invalid credentials for target site

**Solution**:

* Verify you're providing correct credentials for the target website
* This is different from proxy authentication (407)

***

### 402 - Payment Required

**Meaning**: Your trial quota or account credits have been exhausted.

**Solution**:

* Check your account balance in the Nimble dashboard
* Contact your account executive to add credits or increase quota
* Upgrade your plan if needed

***

### 403 - Forbidden

**Meaning**: The request cannot be fulfilled.

**Common Causes**:

* Pipeline is disabled
* Target site is on Nimble's forbidden list
* Account suspended

**Solution**:

* Check pipeline status in dashboard
* Verify target URL is not restricted
* Contact your account manager for details

***

### 404 - Not Found

**Meaning**: The requested resource was not found.

**Common Causes**:

* Incorrect target URL
* Page doesn't exist on target site
* Typo in URL

**Solution**:

```bash theme={"system"}
# Verify the target URL is correct
curl -vvv -x http://account-accountName-pipeline-pipelineName:password@ip.nimbleway.com:7000 \
  https://correct-url.com/path
```

***

### 407 - Proxy Authentication Required

**Meaning**: Proxy authentication failed.

**Common Causes**:

* Incorrect account name
* Wrong pipeline name
* Invalid pipeline password
* IP not in allowlist (for IP authentication)

**Solution**:

<CodeGroup>
  ```bash Check Credentials theme={"system"}
  # Verify your proxy credentials
  account name: your-company
  pipeline name: residential
  password: your-pipeline-password
  ```

  ```bash Test Connection theme={"system"}
  # Test with correct credentials
  curl -vvv -x http://account-yourcompany-pipeline-residential:password@ip.nimbleway.com:7000 \
    https://ipinfo.io/json
  ```
</CodeGroup>

## Server Error Codes

### 500 - Internal Proxy Server Error

**Meaning**: Internal error occurred in Nimble's proxy infrastructure.

**Solution**:

* Retry the request
* If issue persists, contact Nimble support
* Check status page for known issues

***

### 502 - Bad Gateway

**Meaning**: The target server returned an invalid response.

**Common Causes**:

* Target website is down or misconfigured
* Target server returned malformed response

**Solution**:

* Verify target website is accessible
* Try a different target to confirm proxy is working
* Retry after a delay

***

### 503 - Service Unavailable

**Meaning**: Proxy service is temporarily overloaded.

**Solution**:

* Implement retry logic with exponential backoff
* Contact support if consistently experiencing 503 errors
* Check status page for service disruptions

***

### 504 - Gateway Timeout

**Meaning**: The target website didn't respond within the timeout period.

**Common Causes**:

* Target website is slow or unresponsive
* Network connectivity issues
* Server overload on target site

**Solution**:

* Increase request timeout in your client
* Retry the request
* Try targeting a different page to verify proxy connectivity

## Proxy-Specific Codes

### 522 - Connect Timeout

**Meaning**: Connection to proxy timed out during the CONNECT phase.

**Common Causes**:

* Network connectivity issues between client and proxy
* Firewall blocking connection
* DNS resolution issues

**Solution**:

* Check your network connection
* Verify firewall allows connections to ip.nimbleway.com:7000
* Test basic connectivity: `ping ip.nimbleway.com`

***

### 525 - No IP Found

**Meaning**: No suitable IP could be matched for your request parameters.

**Common Causes**:

* Requested location has no available IPs
* Too specific geotargeting parameters
* No IPs available in specified city/state

**Solution**:

<CodeGroup>
  ```bash Broaden Target theme={"system"}
  # If city targeting fails, try state or country only
  # Instead of:
  -country-US-state-WY-city-cheyenne

  # Try:
  -country-US-state-WY
  ```

  ```bash Check Availability theme={"system"}
  # Verify location availability via Admin API
  GET /location/cities
  ```
</CodeGroup>

## Error Handling Best Practices

<AccordionGroup>
  <Accordion title="Implement Retry Logic">
    ```python theme={"system"}
    import requests
    from time import sleep

    def make_request_with_retry(url, proxies, max_retries=3):
        for attempt in range(max_retries):
            try:
                response = requests.get(url, proxies=proxies, timeout=30)

                # Retry on specific error codes
                if response.status_code in [502, 503, 504, 522]:
                    sleep(2 ** attempt)  # Exponential backoff
                    continue

                return response
            except requests.exceptions.RequestException as e:
                if attempt == max_retries - 1:
                    raise
                sleep(2 ** attempt)

        return None
    ```
  </Accordion>

  <Accordion title="Handle Authentication Errors">
    ```python theme={"system"}
    response = requests.get(url, proxies=proxies)

    if response.status_code == 407:
        print("Proxy authentication failed. Check credentials.")
        # Log error, alert ops team
    elif response.status_code == 402:
        print("Credits exhausted. Contact billing.")
        # Send notification to billing team
    ```
  </Accordion>

  <Accordion title="Log and Monitor Errors">
    ```python theme={"system"}
    import logging

    logger = logging.getLogger(__name__)

    response = requests.get(url, proxies=proxies)

    if response.status_code >= 400:
        logger.error(f"Request failed: {response.status_code} - {url}")
        logger.error(f"Response body: {response.text}")
    ```
  </Accordion>

  <Accordion title="Handle Location Unavailability">
    ```python theme={"system"}
    def get_with_fallback_location(url, proxies_config):
        locations = [
            'country-US-state-CA-city-losangeles',
            'country-US-state-CA',
            'country-US',
            ''  # No location targeting
        ]

        for location in locations:
            proxy_user = f"account-name-pipeline-residential"
            if location:
                proxy_user += f"-{location}"

            proxies = {
                'http': f'http://{proxy_user}:password@ip.nimbleway.com:7000'
            }

            response = requests.get(url, proxies=proxies)

            if response.status_code != 525:
                return response

        raise Exception("No IPs available for any location")
    ```
  </Accordion>
</AccordionGroup>

## Quick Reference Table

| Code | Issue               | First Step                         |
| ---- | ------------------- | ---------------------------------- |
| 400  | Bad request format  | Check connection string syntax     |
| 401  | Target site auth    | Verify target site credentials     |
| 402  | Credits exhausted   | Check account balance              |
| 403  | Pipeline disabled   | Check pipeline status in dashboard |
| 404  | Page not found      | Verify target URL                  |
| 407  | Proxy auth failed   | Check proxy credentials            |
| 500  | Internal error      | Retry request                      |
| 502  | Bad gateway         | Verify target site is accessible   |
| 503  | Service unavailable | Implement retry with backoff       |
| 504  | Gateway timeout     | Increase timeout, retry            |
| 522  | Connect timeout     | Check network connectivity         |
| 525  | No IP found         | Broaden location parameters        |

## Need Help?

<CardGroup cols={2}>
  <Card title="Status Page" icon="circle-check" href="https://status.nimbleway.com/">
    Check real-time service status
  </Card>

  <Card title="Contact Support" icon="headset" href="https://portal.usepylon.com/nimble">
    Get help from our support team
  </Card>
</CardGroup>
