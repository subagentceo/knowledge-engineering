# Organization Switcher Widget

The `<OrganizationSwitcher />` widget allows users to switch between organizations. There are no special permissions required to use this widget as users can switch between organizations they have access to. If an organization requires SSO or MFA, the user will be redirected to reauthorize with the new organization.

![Organization Switcher screenshot](https://images.workoscdn.com/images/e22cad7a-f11a-4f47-8cc7-fb015a22114f.png?auto=format\&fit=clip\&q=80)

### Switching Organizations

There are multiple ways to integrate with the Organization Switcher widget depending on your library choice. If you are using either the `authkit-js` or `authkit-react` libraries, you can use the `useAuth` hook to get the current organization and pass it to the widget.

#### React Library

```js
import { useAuth } from '@workos-inc/authkit-react';
import { OrganizationSwitcher, WorkOsWidgets } from '@workos-inc/widgets';
import { CreateOrganization } from '~/app/components/CreateOrganization';

export function OrganizationSwitcherWrapper() {
  const { getAccessToken, switchToOrganization } = useAuth();

  return (
    <WorkOsWidgets>
      <OrganizationSwitcher
        authToken={getAccessToken}
        switchToOrganization={switchToOrganization}
      />
    </WorkOsWidgets>
  );
}
```

If you are using one of the backend SDKs, you can build the organization switcher action in the backend and pass it in as a prop to the widget to be called when the user attempts to switch organizations. See the [Switching Organizations](https://workos.com/docs/authkit/sessions/integrating-sessions/switching-organizations) guide for more information to set up the backend actions. This can then be passed in as a prop to the widget.

#### Backend Handling

```js
import { useAuth } from '@workos-inc/authkit-react';
import { OrganizationSwitcher, WorkOsWidgets } from '@workos-inc/widgets';
import { redirect } from 'next/navigation';

// authToken is a widget token that was fetched in your backend. See the
// "Tokens" section of this guide for details on how to generate the token
export function OrganizationSwitcher({ authToken }) {
  const handleOrganizationSwitch = async (organizationId, pathname) => {
    try {
      // this is some API endpoint defined in your backend that would
      // call the WorkOS APIs to switch the organization or return a redirect URL
      // if the user needs to reauthorize with the new organization
      const response = await fetch('/api/organizations/switch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ organizationId }),
      });

      if (!response.ok) {
        throw new Error('Failed to switch organization');
      }

      // if the backend returns a redirect URL to reauthorize the user, redirect the user to the new organization
      const { redirectUrl } = await response.json();
      if (redirectUrl) {
        redirect(redirectUrl);
      }

      revalidatePath(pathname);
      redirect(pathname);
    } catch (error) {
      console.error('Error switching organization:', error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <WorkOsWidgets>
      <OrganizationSwitcher
        authToken={authToken}
        switchToOrganization={handleOrganizationSwitch}
      />
    </WorkOsWidgets>
  );
}
```

### Creating Organizations

The widget accepts children components that can be used to either redirect the user to create an organization or to show a modal with a form to create an organization. You can use this to integrate with your existing organization creation flow that uses the WorkOS APIs to create organizations.

#### Create Organization

```js
import { useAuth } from '@workos-inc/authkit-react';
import { OrganizationSwitcher, WorkOsWidgets } from '@workos-inc/widgets';
import { CreateOrganization } from '~/app/components/CreateOrganization';

export function OrganizationSwitcherWrapper() {
  const { getAccessToken, switchToOrganization } = useAuth();

  return (
    <WorkOsWidgets>
      <OrganizationSwitcher
        authToken={getAccessToken}
        switchToOrganization={switchToOrganization}
      >
        <CreateOrganization />
      </OrganizationSwitcher>
    </WorkOsWidgets>
  );
}
```

## API Reference
