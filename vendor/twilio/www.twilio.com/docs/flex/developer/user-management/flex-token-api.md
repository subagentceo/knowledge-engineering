# Flex User Token API (public beta)

> \[!IMPORTANT]
>
> The Flex User Token API is currently available as a public beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by an SLA.

## Flex User Token resource

Flex user tokens are JSON Web Encryption (JWE) tokens issued to authenticate users and grant them secure access to the Flex application.

## Generate a Flex user token

### Path parameters

| Name                             | Type   | Description                                              | PII?    |
| -------------------------------- | ------ | -------------------------------------------------------- | ------- |
| InstanceSid <br />**(required)** | String | A 34-character string that identifies the Flex instance. | Not PII |
| FlexUserSid <br />**(required)** | String | A 34-character string that identifies the Flex user.     | Not PII |

Your Flex instance is the container that holds your Flex resources. You can find your Flex instance SID in Console on the [Flex overview](https://console.twilio.com/us1/develop/flex/overview) page.

### Request body parameters

`Encoding type:application/json`

| Name | Type    | Description                                                                 | PII?    |
| ---- | ------- | --------------------------------------------------------------------------- | ------- |
| ttl  | Integer | The time to live of the token in seconds. Default is 3600 seconds (1 hour). | Not PII |

### Flex User Token response schema

| Schema name   | Type   | Description                                | PII?                                                                                          |
| ------------- | ------ | ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| access\_token | String | The Flex JWE token.                        | Not PII                                                                                       |
| token\_info   | Object | JSON blob containing info about the token. | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |

### Example request and response

**`POST` request**

```bash
curl -X POST "https://flex-api.twilio.com/v4/Instances/{InstanceSid}/Users/{FlexUserSid}/Tokens" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
    -H "Content-Type: application/json" \
    --data-raw '{
      "ttl":3600
          }'
```

**Response**

```json
{
    "access_token": "flex_jwe_token_string_here",
    "token_info": {
        "account_sid": "AC00000000000000000000000000000000",
        "expiration": "2025-10-23T16:22:26Z",
        "flex_instance_sid": "GO00000000000000000000000000000000",
        "flex_user_sid": "FU00000000000000000000000000000000",
        "identity": "Jane",
        "permissions": [
            "FPN9999",
            "FPN0000"
        ],
        "roles": [
            "agent"
        ],
        "username": "Jane"
    }
}
```
