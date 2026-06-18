# Email Domain

## Configuring a domain

Several AuthKit features require sending emails:

- Magic Auth
- Email verification
- Password resets
- Invitations

While developing with WorkOS in a staging environment, WorkOS will send AuthKit emails from `workos.dev`.

In production environments, emails are sent from a custom domain when configured or from `workos-mail.com` by default.

### (1) Navigate to Domains configuration

With the production environment selected, navigate to the *Domains* section of the [WorkOS Dashboard](https://dashboard.workos.com/).

![Dashboard displaying domain configuration settings](https://images.workoscdn.com/images/1b02397b-89b0-451d-9d6d-d222db5635b9.png?auto=format\&fit=clip\&q=80)

### (2) Add an email domain

Click the *Add Domain* button and enter the domain you would like to use for sending emails.

![Dashboard displaying a domain entry input](https://images.workoscdn.com/images/2e7840fb-1a05-444c-a68f-52f3ac3eceb5.png?auto=format\&fit=clip\&q=80)

### (3) Create CNAME records

You will be prompted to create 3 CNAME records with your DNS provider. After creating these DNS records, click *Verify now*.

![Dashboard displaying CNAME entries](https://images.workoscdn.com/images/0d85fad9-2af7-425d-8b4b-55c407a0db83.png?auto=format\&fit=clip\&q=80)

> It can take some time for DNS changes to take effect. If the initial verification attempt is not successful, WorkOS will continue trying to verify your domain for 72 hours.

Once your domain is successfully verified, authentication emails and Admin Portal invites will be sent from `no-reply@your-domain.com`. It's important to keep the CNAME records in place to ensure that WorkOS can deliver mail on your behalf.
