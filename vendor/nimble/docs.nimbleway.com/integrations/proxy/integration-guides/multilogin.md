> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Multilogin

> Connect Nimble Proxy with Multilogin

Multilogin provides you with browser and device fingerprints, and together with Nimble IP, you can access sites online from multiple destinations with full anonymity.

Using Multilogin's virtual browser profiles with Nimble's residential proxies, you can manage multiple online accounts while maintaining unique digital identities for each profile.

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Sign Up & Installation" titleSize="h3">
    * Sign up for an account at [multilogin.com](https://multilogin.com/)
    * Download and install the Multilogin software
    * Launch Multilogin and log in to your account
  </Step>

  <Step title="Create a browser profile" titleSize="h3">
    * Click **Create New** to create a new browser profile
    * Enter a name for your profile
    * Select your preferred operating system and browser type
    * Navigate to the **Proxy** settings section
    * Click **Edit proxy settings**
  </Step>

  <Step title="Configure proxy settings" titleSize="h3">
    * Select **HTTP** as the connection type

    * Enter the following proxy details:
      * **Address:** ip.nimbleway.com
      * **Port:** 7000
      * **Username:** your pipeline username
      * **Password:** your pipeline password

    * In the Nimble User Dashboard, navigate to the [Pipelines](https://app.nimbleway.com/pipelines) page to get your credentials.

    <Tip>
      Enable **"Timezone, WebRTC and Geolocation fingerprints based on the external IP"** for consistent fingerprinting that matches your proxy location.
    </Tip>
  </Step>

  <Step title="Verify and save" titleSize="h3">
    * Click **Check proxy** to verify the connection is working
    * You should see a success message with your proxy IP
    * Click **Create profile** to save your configuration

    Your Multilogin profile will now route all traffic through Nimble's proxy network.
  </Step>
</Steps>

## Configuration options

| Parameter       | Value                  | Description                |
| --------------- | ---------------------- | -------------------------- |
| Connection type | HTTP                   | Proxy protocol             |
| Address         | `ip.nimbleway.com`     | Nimble proxy endpoint      |
| Port            | `7000`                 | Default proxy port         |
| Username        | Your pipeline username | From your Nimble dashboard |
| Password        | Your pipeline password | From your Nimble dashboard |

## Geo-targeting

You can control geo-targeting in two ways:

### Option 1: Pipeline settings (recommended)

Configure your target country directly in your Nimble pipeline settings. This applies to all connections using that pipeline.

### Option 2: Username string

Append the country code to your username for profile-level control:

```
your-username-country-us    # Route through US
your-username-country-gb    # Route through UK
your-username-country-de    # Route through Germany
```

This is useful when you need different profiles to connect through different countries.

That's all! Multilogin will now use proxies from Nimble IP.
