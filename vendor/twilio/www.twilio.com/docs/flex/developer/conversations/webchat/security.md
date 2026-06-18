# Webchat 3.x.x security

Webchat 3.x.x includes enhanced security measures:

## Deployment key shields your account information

To add Webchat 3.x.x to your website, you create a randomly generated deployment key and map it to a chat address in Twilio Console. When you deploy Webchat 3.x.x, your account information is shielded, because only your deployment key is used. If you ever feel like your deployment key might have been compromised, you can replace it with a new deployment key and chat address.

## Fingerprinting prevents spoofing

When a user begins a webchat session, Webchat 3.x.x records the fingerprint of that browser and device based on a number of characteristics.

With every chat message that Flex UI receives, that fingerprint is verified. This means that the chat session can't be hacked, spoofed, or intercepted without being detected.

## Allowed origins

In your deployment key settings, you must specify up to 10 trusted URLs as allowed origins where your customers can initiate a chat. Chat sessions are only accepted from those trusted URLs. By setting these values, you ensure that your chat widget can't be deployed on other websites.
