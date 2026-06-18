# AuthKit Domain

## Configuring a domain

The domain for AuthKit will consist of a randomly generated phrase plus the domain `authkit.app`, for instance `youthful-ginger-43.authkit.app`.

This is the default in the staging environment, in Production environments a custom domain can be configured via the dashboard.

### (1) Navigate to Domains configuration

With the production environment selected, navigate to the *Domains* section of the [WorkOS Dashboard](https://dashboard.workos.com/).

![Dashboard displaying domain configuration settings](https://images.workoscdn.com/images/f04be28f-4af8-4a2e-a812-815d1a441674.png?auto=format\&fit=clip\&q=80)

### (2) Add an AuthKit domain

Click the *Configure AuthKit domain* button and enter the domain you would like to use.

![Dashboard displaying a domain entry input](https://images.workoscdn.com/images/b7e45bfe-2948-4d5e-a7ee-be3eb223d710.png?auto=format\&fit=clip\&q=80)

### (3) Create CNAME records

You will be prompted to add a CNAME record to your DNS provider. If your DNS provider is Cloudflare, ensure the CNAME record is configured as DNS-only and is not proxied. To manage custom domains, WorkOS uses Cloudflare, who prohibit domains from being proxied across accounts.

![Dashboard displaying CNAME entries](https://images.workoscdn.com/images/68d96188-8d68-4a89-8843-5d21d9b739c5.png?auto=format\&fit=clip\&q=80)

> It can take some time for DNS changes to take effect. If the initial verification attempt is not successful, WorkOS will continue trying to verify your domain for 72 hours.

Once your domain is successfully verified, users signing in via AuthKit will be redirected to your custom domain.
