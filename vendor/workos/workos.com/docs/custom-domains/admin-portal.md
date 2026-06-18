# Admin Portal Domain

## Configuring a domain

When your customers' IT contacts use the Admin Portal self-serve onboarding experience, they'll be directed to a `setup.workos.com` domain.

While developing with WorkOS in a staging environment, users will see the `setup.workos.com` domain.

In production environments, users will see `setup.workos.com` by default or a custom domain if configured.

### (1) Navigate to Domains configuration

With the production environment selected, navigate to the *Domains* section of the [WorkOS Dashboard](https://dashboard.workos.com/).

![Dashboard displaying domain configuration settings](https://images.workoscdn.com/images/b6afe130-219c-4e0e-8209-49b1a0fb6098.png?auto=format\&fit=clip\&q=80)

### (2) Add an Admin Portal domain

Click the *Configure Admin Portal domain* button and enter the domain you would like to use.

![Dashboard displaying a domain entry input](https://images.workoscdn.com/images/6dc8c261-3f1a-4d7a-b9ea-e7541d5e1361.png?auto=format\&fit=clip\&q=80)

### (3) Create CNAME records

You will be prompted to add a CNAME record to your DNS provider. If your DNS provider is Cloudflare, ensure the CNAME record is configured as DNS-only and is not proxied. To manage custom domains, WorkOS uses Cloudflare, who prohibit domains from being proxied across accounts.

![Dashboard displaying CNAME entries](https://images.workoscdn.com/images/467edbdc-ba6d-42be-809e-7b0b1e560385.png?auto=format\&fit=clip\&q=80)

> It can take some time for DNS changes to take effect. If the initial verification attempt is not successful, WorkOS will continue trying to verify your domain for 72 hours.

Once your domain is successfully verified, IT contacts using the self-serve Admin Portal will be redirected to your custom domain.
