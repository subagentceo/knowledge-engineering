# Regional

Twilio's [Global Infrastructure](/docs/global-infrastructure) enables you to ensure that your application's Twilio data remains within the corresponding territory at all times, and that your commands execute with the shortest possible round trips to Twilio's servers. [Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions) are supported by the CLI as well, so you can continue to use the CLI without worrying about data residency.

In addition to Regions, you can control which geographic location your network request enters and exits Twilio's platform by defining an [Edge Location](/docs/global-infrastructure/understanding-edge-locations). The Edge Location used by the CLI can be controlled either by setting it as a [configuration](/docs/twilio-cli/general-usage/configuration), or with an environment variable.

## Profile settings

You can specify the target Region for a [profile](/docs/twilio-cli/general-usage/profiles) using the `--region` and `--edge` flags:

```bash
twilio login --region au1 --edge sydney
```

> \[!WARNING]
>
> When creating a regional profile, you must specify both `--region` and `--edge` flags together. The edge location determines the network entry point for API requests made with this profile.
>
> Valid region and edge combinations:
>
> * Australia Region (`au1`): `--edge sydney`
> * Ireland Region (`ie1`): `--edge dublin`
> * Japan Region (`jp1`): `--edge tokyo`
>
> For a complete list of edge locations, see [Edge Locations](/docs/global-infrastructure/edge-locations).

### Profile Creation With Regional Credentials

When creating a regional profile, you must use region-specific credentials. Each Twilio Region has its own Auth Token that is different from your default (US1) Auth Token.

To find your region-specific Auth Token:

1. Log in to the [Twilio Console](https://console.twilio.com/) and navigate to [**API keys & tokens**](https://console.twilio.com/us1/account/keys-credentials/api-keys).
2. In the **Region** dropdown, select your target region.
3. In the **Live credentials** section, click the eye icon to view the Auth Token for that region.

Use this region-specific Auth Token when prompted during `twilio login`.

Example creating an Australia region profile:

```bash
$ twilio login --region au1 --edge sydney
You can find your Account SID and Auth Token at https://www.twilio.com/console
 » Your Auth Token will be used once to create an API Key for future CLI access
? The Account SID for your Twilio Account: ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
? Your Twilio Auth Token (must be AU1-specific): [hidden]
? Shorthand identifier for your profile: australia-prod
```

> \[!NOTE]
>
> The CLI stores both region and edge in your profile. All API requests made using this profile will automatically use the correct regional endpoint.

For more information on managing regional credentials, see [Manage Regional API Credentials](/docs/global-infrastructure/manage-regional-api-credentials).

## Configuration

The Edge Location used by the CLI can be controlled by setting it as a [configuration](/docs/twilio-cli/general-usage/configuration):

```bash
twilio config:set --edge=sydney
```

## Environment variables

You can also specify the target Region, Edge, or both by using environment variables:

```bash
export TWILIO_REGION=au1
```

```bash
export TWILIO_EDGE=sydney
```

> \[!NOTE]
>
> Environment variables (`TWILIO_REGION` and `TWILIO_EDGE`) take precedence over profile settings. If you set these environment variables, they will override the region and edge configured in your active profile.
