# Rate Limits and Timeouts

There are a few timeouts and limits (and design suggestions) to be aware of when building your Verify integration.

## Code Validity Period

Tokens are valid for a default period of **10 minutes** once generated. You can customize the validity period of your Service's tokens to any value between 2 minutes and 24 hours by [contacting Support](https://www.twilio.com/console/support/tickets/create).

The token remains the same during its validity period until the verification is successful. This means if your user makes another request within that period, they will receive the same token.

## Status Check Rate Limits

You may request the status of a verification no more than:

* 60 requests in one minute
* 180 requests in one hour
* 250 requests in one day
