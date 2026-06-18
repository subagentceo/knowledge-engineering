# Impersonation

## Introduction

Impersonation allows administrators and support team members to assume the identity of any of your users, allowing them to reproduce or debug issues the user may be having in your application. The ability to see the application in an identical state as the user helps to greatly speed up the support process.

## Enabling impersonation

Since impersonation allows any member of your WorkOS team to bypass the normal authentication flow for a user, it is not enabled by default in any of your environments. You must have the **Admin** role in order to enable impersonation for an environment.

![A screenshot showing the WorkOS Dashboard configuration card for impersonation](https://images.workoscdn.com/images/7ceec4ef-0c64-45ad-a729-b529d8f13cb5.png?auto=format\&fit=clip\&q=80)

Navigate to *Authentication* → *Features* → *User Impersonation* and select *Configure* to enable impersonation for your current environment.

## Using impersonation

To impersonate one of your users, navigate to *Users*, select the user you'd like to impersonate, and under *Danger Zone* select *Impersonate User*.

![A screenshot of the User details page in the WorkOS Dashboard](https://images.workoscdn.com/images/afcfc2b9-275c-4a08-9976-ab9b1b30a7b8.png?auto=format\&fit=clip\&q=80)

You will be prompted for the reason your are impersonating the user. The reason is required and will be recorded internally on the `session.created` event that is emitted whenever impersonation is used.

If the user is a member of more than one organization, you will also need to choose which of
these organizations you will be signing-into as the user. You can read more about users and organizations in our [dedicated guide](https://workos.com/docs/authkit/users-organizations).

Finally, click *Impersonate user* to start an impersonation session, redirecting your browser to your application's callback endpoint with an authorization code for the impersonated user. You can read more about how to implement a callback endpoint in our [Quick Start guide](https://workos.com/docs/authkit/2-add-authkit-to-your-app/add-a-callback-endpoint).

> Impersonation sessions automatically expire after 60 minutes.

Be aware that impersonating a user usually generally gives the same level of access as that user, allowing the impersonator to see the user's information. If your application contains sensitive user data, see the [Integrating impersonation](https://workos.com/docs/authkit/impersonation/integrating-impersonation) section about how to customize your application when using impersonation.

### Deep-linking to the impersonation flow

You can deep-link to the impersonation flow in the WorkOS Dashboard from your own admin tool using the following URL structure:

`https://dashboard.workos.com/<environment_id>/users/<user_id>/details?dialog=impersonate`

## Auditing impersonation usage

User sessions that were initiated via impersonation will be clearly marked as such when viewing their details in the WorkOS Dashboard. Additionally, WorkOS emits a [`session.created`](https://workos.com/docs/events/session) event which you can view under the events for the user, or listen for in your application via the [events API](https://workos.com/docs/events).

![A screenshot of the User events page in the WorkOS Dashboard](https://images.workoscdn.com/images/e213fa51-4aa6-4260-8c31-84823fbcc77b.png?auto=format\&fit=clip\&q=80)

The `session.created` event has an `impersonator` field that contains information about the impersonation session, like the `email` of your team member who performed the impersonation, along with their `reason` for doing so.

## Integrating impersonation

No additional code is required to start using impersonation once you have integrated with WorkOS. However, many developers may want to augment their application's behavior when your team members are impersonating one of your users.

The response from the [Authenticate with Code API](https://workos.com/docs/reference/authkit/authentication/code) will include an additional `impersonator` field when the resulting session was created via impersonation, containing the impersonator's `email` and `reason` for using impersonation. Similarly, the `access_token` will include an `act` claim with the impersonator's `email`. Your application can use either in order to trigger impersonation-specific behavior.

A common enhancement is to change the appearance of the application in order to make it obvious to the viewer they are currently impersonating one of your users, such as a "Staff Bar" displayed at the top of the viewport. You may also want to restrict access to sensitive views or redact certain fields in your application.

### Impersonation with `authkit-nextjs`

If using the [`authkit-nextjs` library](https://github.com/workos/authkit-nextjs), impersonation can be easily added by using the provided helper component.

After completing the setup instructions in the [quick start](https://workos.com/docs/authkit) guide, add the Impersonation component to your app code.

```js title="Impersonation component"
import { Impersonation } from '@workos-inc/authkit-nextjs';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Impersonation />
        {children}
      </body>
    </html>
  );
}
```

The above will automatically render a visually distinct frame on your page with an option to hide it or stop the impersonation session.

![A screenshot showing the Impersonation frame rendered over a page](https://images.workoscdn.com/images/c4305ab6-d4fa-4f36-be9c-5a60ee12a7b3.png?auto=format\&fit=clip\&q=80)
