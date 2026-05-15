# Secure Playback of Recordings from Custom Storage

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

You can manage user access to call recordings from Flex Insights on your own terms.

If you store call recordings outside of Twilio, you can use this feature to:

* Create a custom authorization of users
* Log user access to individual recordings
* Decrypt Twilio recordings encrypted by your public key (using your private key)

You can use the `url_provider` attribute when attaching [Custom Media](/docs/flex/developer/insights/custom-media-attached-conversations). Flex Insights Player sends a request to the URL to ask for the actual link to the recording. Your service at the provided URL can then perform any authorization operations before providing the link. The link itself has to carry any authorization information, such as a time-limited token, single-use token, etc.

You can point the Player to a standard service such as AWS S3. Or, you can point the Player to a custom service that may perform additional operations before streaming the actual audio. For example, decryption of the audio.

> \[!NOTE]
>
> Waveform (blue, green, red, and orange bars) is not available in the [Conversation Screen](/docs/flex/end-user-guide/insights/conversation-screen) for recordings that are stored externally. This means users will not see when an agent or customer is speaking while playing back recordings.

## Add the Link to Your Service

The value of the `url_provider` attribute is a link to your API service. The service has to validate the Flex JWE token and provide back the link to the recording. The link has to contain an identifier of the recording that your service understands so it can point the Player to the right recording.

Example TaskRouter attributes structure for task-level voice link:

```json
{
  "task_attributes": {
    "conversations": {
      "media": [
        {
          "type": "VoiceRecording",
          "url_provider": "https://your_domain/?recording=RExxxxxxxxxxxxxxxxx"
        }
      ]
    }
  }
}
```

> \[!NOTE]
>
> You can also use the `url_provider` attribute on the reservation level as
> described in [Custom Media attached to
> Conversations](/docs/flex/developer/insights/custom-media-attached-conversations).
> You can have different media attached to individual segments of a
> conversation.

## Flex Insights Player Request to Your Service

When you open a recording from Flex Insights, the Player calls the API URL you provided as the value of the `url_provider` attribute. The Player adds the Flex JWE token in the authorization header. The token is Base64 encoded.

Example request:

```bash
GET /sec_rec?recording_sid=RExxxxxxxxxxxxxxxxxxxxxxx HTTP/1.1
Host: your_domain
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Authorization: Basic dG9rZW46ZXlKNmFYQWlPaUpFUlVZaUxDSnJhV1FpT2lKVFFWTmZVek1==
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36
Accept: */*
Origin: https://flex.twilio.com
Sec-Fetch-Site: cross-site
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9,cs;q=0.8
```

## Handle the Request from Player in Your Service

To enable playback, your API service has to:

1. Validate the Flex JWE token provided by the Player in the authorization header. The validation ensures that the user has a valid Flex session.
2. Return the 'media\_url' link to the audio file of the recording. The Player uses this link to retrieve the actual recording.

> \[!WARNING]
>
> In the following example, we are using a Twilio function to validate a token.
> You cannot host your authentication function using Twilio Serverless due to
> its max header
> [limitations](/docs/serverless/functions-assets/functions/headers-and-cookies/limitations).

### Validate the Flex JWE Token

The Flex JWE token is sent in the following format:

```javascript
Basic ${Buffer.from(`token:${flexJWE}`).toString('base64')}

```

The Flex JWE token is Base64 encoded. Your service has to decode the token, then use the [Twilio Flex Token Validator](https://www.npmjs.com/package/twilio-flex-token-validator) in a Twilio Function or in any NodeJS application. Alternatively you can use the Twilio API to validate the token.

Example of token validation in Python:

```python
    header_raw = request.headers.get('Authorization')
    header_decoded = b64decode(header_raw.split()[1]).decode()
    token = header_decoded.split(':')[1]

    url = "https://iam.twilio.com/v1/Accounts/{}/Tokens/validate".
format(TWILIO_ACCOUNT_SID)
    headers = {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "Authorization": header_raw
    }
    payload = {"token": token}
    response = requests.post(url, data=json.dumps(payload), headers=headers)
```

The validated token result contains the following data:

```java
{
  "valid": true,
  "code": 0,
  "message": null,
  "expiration": "2018-09-24T23:22:44.240Z",
  "realm_user_id": "user@example.com",
  "identity": "user_40example_2Dcom",
  "roles":[
    "agent"
  ],
  "worker_sid": "WKxxx"
}
```

### Return the Link to the Recording

Flex Insights Player expects a response containing a direct link to the media in the following format:

```java
{
  "media_url": "https://link/to/recording"
}

```

## Troubleshooting

While listening to a recording, open the Developer Tools > Network tab in your browser. Confirm that your browser requested both the 'url\_provider' and the 'media\_url'.

![Network tab showing POST request error and highlighted domains for troubleshooting.](https://docs-resources.prod.twilio.com/24e60825898c84e6d2c61c012311ddfbeb7d8cb72e03595c521223557bb37a7c.png)
