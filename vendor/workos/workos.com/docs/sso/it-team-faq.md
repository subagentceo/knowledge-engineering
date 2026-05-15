# FAQ for IT teams

## What is WorkOS?

WorkOS is a software company that provides a suite of products to make an app enterprise-ready. These products include Single Sign-On, Directory Sync, and AuthKit (user management), among others.

Developers integrate WorkOS services into their apps in order to provide a secure authentication and user provisioning experience. It’s trusted by companies like Webflow, Plaid, Vercel, and many others.

## What data does WorkOS store?

For Single Sign-On, WorkOS stores the user profile from the identity provider. This includes the user's name, email and IP address.

For Directory Sync, WorkOS will store the data that the identity provider sends. The shape and content of that data is at the discretion of the identity provider.

For more information, view our [Privacy Policy](https://workos.com/legal/privacy)

## How do developer apps communicate with WorkOS?

Developers integrate with WorkOS using its Rest API and the related SDKs. You can find a list of all WorkOS API endpoints in the [API reference](https://workos.com/docs/reference).

## What IP addresses does WorkOS use?

WorkOS uses Cloudflare to ensure security and reliability of all operations. If you are looking to create a list of allowed IP addresses for the WorkOS API, you can use the IP ranges listed in the [Cloudflare documentation](https://www.cloudflare.com/ips/).

## Is WorkOS certified for SOC 2 Type II, SOC 3 and SIG Lite?

Yes, WorkOS is compliant with all the above and regularly undergoes penetration testing.

## Is WorkOS GDPR compliant?

Yes, WorkOS is GDPR compliant. Reach out to [support](mailto:support@workos.com) to request deletion of data.
