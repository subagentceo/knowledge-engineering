# Launch Checklist

## Create an IP Allowlist

WorkOS makes use of Cloudflare to ensure security and reliability of all operations. If you are looking to create a list of allowed IP addresses for redirect requests, you can use the IP Ranges listed in the [Cloudflare documentation](https://www.cloudflare.com/ips/).

## Go-live checklist

- \[ ] Unlock your Production environment by adding your billing information

  > Only enterprise connections in your Production environment will be charged. Any Google OAuth or Magic Link connections in Production will be free.

- \[ ] Configure a production redirect URI for your application

- \[ ] Secure your Production project's API key

- \[ ] Ensure that your application can receive redirects from WorkOS

  Depending on your network architecture, you may need to allowlist incoming redirect traffic from `api.workos.com`.

## Frequently asked questions

### Can I customize the email sent via Magic Link?

Yes, you can use your own email service and custom branded email template to send the authentication link to the user. See the custom email code snippet in the [create passwordless session section](https://workos.com/docs/magic-link/1-add-magic-link-to-your-app/create-a-passwordless-session-and-email-the-user) for an example.
