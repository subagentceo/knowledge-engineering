# Authentication API Domain

## Configuring a domain

WorkOS authentication requests are done via the Authentication API, which defaults to `api.workos.com`. This can be configured to a custom domain if you prefer to use your own branding instead of the default.

While developing with WorkOS in a Sandbox environment, requests are made to the `api.workos.com` domain. In production environments, requests are made to `api.workos.com` by default or a custom domain if configured.

For instance, if you were retrieving a user via the API and you had a custom Authentication API domain `api.example.com` set up, you'd make requests to:

`https://api.example.com/user_management/users/:id`

Instead of the default:

`https://api.workos.com/user_management/users/:id`

> When a custom domain is configured, requests to the API should be routed through that domain. Continuing to make requests to `api.workos.com` after a custom domain is configured for the Authentication API can result in issues with your integration.

### Custom domains for SCIM endpoints

Custom Authentication API domains are also used for SCIM endpoints when using [Directory Sync](https://workos.com/docs/directory-sync). For example, if you had a custom domain `api.example.com` set up, your customer's identity provider would make requests to `https://api.example.com/scim/v2.0/:id`. The custom domain is reflected in the Admin Portal setup steps for a directory.

Adding a custom domain does not affect existing directory integrations pointing to `api.workos.com`.

### Using custom domains in SDKs

When using the WorkOS SDKs, a custom API hostname can be configured:

#### Initialize a WorkOS SDK with custom hostnames

### (1) Navigate to Domains configuration

With the production environment selected, navigate to the *Domains* section of the [WorkOS Dashboard](https://dashboard.workos.com/).

![Dashboard displaying domain configuration settings](https://images.workoscdn.com/images/28d1072b-1bc7-42af-8d7d-fb8da0363413.png?auto=format\&fit=clip\&q=80)

### (2) Add an email domain

Click the *Configure authentication API domain* button and enter the domain you would like to use.

![Dashboard displaying a domain entry input](https://images.workoscdn.com/images/cc648df5-603a-4001-bfc0-cea2bfca02e5.png?auto=format\&fit=clip\&q=80)

### (3) Create CNAME records

You will be prompted to add a CNAME record to your DNS provider. If your DNS provider is Cloudflare, ensure the CNAME record is configured as DNS-only and is not proxied. To manage custom domains, WorkOS uses Cloudflare, who prohibit domains from being proxied across accounts.

![Dashboard displaying CNAME entries](https://images.workoscdn.com/images/e920f0c9-4bd5-4f11-a2e3-9d709b483ed1.png?auto=format\&fit=clip\&q=80)

> It can take some time for DNS changes to take effect. If the initial verification attempt is not successful, WorkOS will continue trying to verify your domain for 72 hours.

Once your domain is successfully verified, your custom domain will act as the [ACS URL](https://workos.com/docs/glossary/acs-url) for authentication.
