# Elastic SIP Trunking REST API Reference

Twilio Elastic SIP Trunking is a cloud-based solution that provides connectivity for IP-based communications infrastructure to connect to the [PSTN](/docs/glossary/what-is-pstn). Using Elastic SIP Trunking you can make and receive phone calls to the rest of the world via any broadband internet connection.

Not an engineer? See our [Elastic SIP Trunking product page](https://www.twilio.com/en-us/sip-trunking) or [talk to our sales team](https://www.twilio.com/en-us/help/sales).

## [Get Started with Twilio Elastic SIP Trunking](/docs/sip-trunking#getting-started-configure-your-twilio-elastic-sip-trunk)

Saying "[Ahoy, world](/docs/glossary/what-is-ahoy)" is only a few steps away.

Start by [configuring your trunk](/docs/sip-trunking). There you'll learn how to:

* Use the Twilio Console to create a new trunk
* Configure IP Access Control Lists (ACLs)
* Manage the credentials your devices will use to authenticate to your trunk
* Purchase a new Twilio phone number to use with your trunk

You'll also explore features like [call recording](/docs/sip-trunking#recording), [secure trunking](/docs/sip-trunking#securetrunking), [disaster recovery URLs](/docs/sip-trunking#disaster-recovery), and [CNAM lookup](/docs/sip-trunking#CNAM).

[Get started here.](/docs/sip-trunking#CNAM)

### Connect your PBX or SBC

Once your trunk is ready, [check out our guides for connecting your PBX or SBC to your Twilio trunk](/docs/sip-trunking/sample-configuration).

## REST API documentation

Elastic SIP Trunking's REST API enables you to interact with Trunking resources from your server-side applications.

### Base URL

All Elastic SIP Trunking URLs referenced in the documentation have the following base:

```bash
https://trunking.twilio.com/v1

```

All Twilio REST APIs are served over HTTPS. To ensure data privacy, unencrypted
HTTP is not supported.

> \[!NOTE]
>
> You can control your connectivity into Twilio's platform by including your specific [edge location](/docs/global-infrastructure/edge-locations) in the subdomain. This will allow you to bring Twilio's public or private network connectivity closer to your applications for improved performance.
>
> For instance customers with infrastructure in Australia can make use of the `sydney` edge location by using the base URL of:
>
> ```bash
> https://trunking.sydney.us1.twilio.com/v1
> ```

### Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -G https://trunking.twilio.com/v1/Trunks \
    -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

### Resources

Here are the resources you will be interacting with via the REST API:

| Resource                                                                    | Description                                                                                                                                                      |
| :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Trunks](/docs/sip-trunking/api/trunk-resource)                             | An Elastic SIP Trunk that provides your IP-based communications infrastructure with connectivity to the PSTN.                                                    |
| [CredentialLists](/docs/sip-trunking/api/credentiallist-resource)           | List of Credentials associated with a Trunk to ensure the security/authenticity of your termination traffic.                                                     |
| [IpAccessControlLists](/docs/sip-trunking/api/ipaccesscontrollist-resource) | List of IP Access Control Lists associated with your Trunk to ensure the security/authenticity of your termination traffic.                                      |
| [OriginationURLs](/docs/sip-trunking/api/originationurl-resource)           | Origination settings of your Trunk will allow you to receive incoming traffic from the PSTN to a Twilio number, delivered to your communications infrastructure. |
| [PhoneNumbers](/docs/sip-trunking/api/phonenumber-resource)                 | List of Twilio Numbers associated with your Trunk to allow you to receive incoming traffic from the PSTN to these Numbers.                                       |

## More documentation

Here's more documentation to help you configure, test, and scale your trunk:

* [Configure emergency calling (E911)](/docs/sip-trunking/emergency-calling)
* [Scaling and limitations](/docs/sip-trunking/scale-and-limits)
* [Testing your trunk](/docs/sip-trunking/trunk-verification)
* [Troubleshooting your trunk](/docs/sip-trunking/troubleshooting)

*If you have questions related to pricing, check out our [pricing page](https://www.twilio.com/en-us/sip-trunking/pricing/us) or you can reach out to our [Sales team](https://www.twilio.com/en-us/help/sales).*
