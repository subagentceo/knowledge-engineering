# Media Streams Configuration

Media Streams must communicate with Twilio's cloud to function properly. To ensure this, configure your firewall rules to allow secure WebSocket connections (TCP port 443) from Twilio to your WebSocket servers from any public IP address.

You must also configure your application to validate the `X-Twilio-Signature` header. This is how your application verifies that a Media Stream is coming from an authentic Twilio source. Learn more on the [General Usage - Security page](/docs/usage/security#validating-requests).
