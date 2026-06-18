# REST API: Credentials

The Credentials API helps you manage Public Keys or Amazon Web Services (AWS) credentials in your Twilio account.

* Use public key credentials for [Public Key Client Validation](/docs/iam/pkcv).
* Use AWS credentials to store Twilio Voice and Video recordings in AWS S3. Learn more about [storing Video recordings in AWS S3](/docs/video/tutorials/storing-aws-s3) and [storing Voice recordings in AWS S3 (blog)](https://www.twilio.com/en-us/blog/announcing-external-aws-s3-storage-support-for-voice-recordings).

## API Base URL

All URLs in the Credentials API reference documentation use the following base URL:

```bash
https://accounts.twilio.com/v1/Credentials

```

The API is served over HTTPS. To ensure data privacy, unencrypted HTTP isn't supported.

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -G https://accounts.twilio.com/v1/Credentials/PublicKeys \
    -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Twilio SDKs

To interact with the `Credentials` endpoints, consider using the [Twilio SDKs](/docs/libraries).

## Resources

The Credentials API contains the following resources:

| Resource                                             | Description                           |
| :--------------------------------------------------- | :------------------------------------ |
| [PublicKeys](/docs/iam/credentialpublickey-resource) | Manage user-provided public keys.     |
| [AWS](/docs/iam/credentialaws-resource)              | Manage user-provided AWS credentials. |
