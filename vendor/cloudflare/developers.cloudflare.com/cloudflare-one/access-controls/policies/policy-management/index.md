---
title: Manage Access policies
description: Manage Access policies in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage Access policies

Access policies define the users who can log in to your Access applications. You can create, edit, or delete policies at any time and reuse policies across multiple applications.

## Create a policy

To create a reusable Access policy:

1. In [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Policies**.
2. Select **Add a policy**.
3. Enter a **Policy name**.
4. Choose an [**Action**](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#actions) for the policy.
5. Choose a [**Session duration**](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/) for the policy.
6. Configure as many [**Rules**](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#rule-types) as needed.
7. (Optional) Configure additional settings for users who match this policy:  
   * [Isolate application](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/isolate-application/).  
   * [Purpose justification](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/require-purpose-justification/)  
   * [Temporary authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/)  
   * [Independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#independent-mfa)
8. Select **Save**.

You can now add this policy to an [Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/).

## Edit a policy

To make changes to an existing Access policy:

1. In [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Policies**.
2. Locate the policy you want to update and select **Configure**.
3. Once you have made the necessary changes, select **Save**.

The updated policy is now in effect for all associated Access applications.

## Delete a policy

To delete a reusable Access policy:

1. In [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Policies** and locate the policy you want to delete.
2. If the policy is used by an application, remove the policy from all associated applications.
3. Select **Delete**.
4. A pop-up message will ask you to confirm your decision to delete the policy. Select **Delete**.

## Test your policies

You can test your Access policies against all existing user identities in your Zero Trust organization. For the policy tester to work, users must have logged into the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) or any other Access application at some point in time.

Cloudflare will use the most recent device that was authenticated with Access to test your policies.

### Test a single policy

The Access policy builder allows you to test your rules before saving any changes.

To test an individual Access policy:

1. In [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Policies**.
2. Locate the policy you want to test and select **Configure**.
3. Go to **Policy tester** and select **Test policies**.

The policy tester reports the percentage of active users who are allowed or denied access to an application based on this policy. You can expand the test results to view a list of allowed or blocked users.

### Test all policies in an application

You can test your Access application policies against your user population before deploying changes to your users. After saving your changes, you can also perform a more detailed policy test for a specific user.

To test if users have access to an application:

1. In [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Locate the application you want to test and select **Configure**.
3. Go to **Policies** \> **Policy tester**.
4. To test all active users in your organization, select **Test policies**.  
The policy tester reports the percentage of users who are allowed or denied access to this application based on all configured policies. You can expand the test results to view a list of allowed or blocked users.
5. To perform a detailed test on a single user:  
a. If you made any changes to your policies, first save the application.  
b. Select **testing a single user**.  
c. Enter their email address and select **Test policies**.  
The single user test results will show:  
   * Whether the user is allowed or denied access to this application based on all configured policies.  
   * The user's identity from their most recent Access login attempt.  
   * Whether the user matches individual Allow, Block, or Bypass policies.

## Legacy policies

Legacy policies are scoped to a specific application and cannot be added to newly created Access applications.

### Migrate to reusable policies

To migrate legacy policies to reusable policies:

1. [Create a reusable policy](#create-a-policy) that will replace the legacy policy.
2. Go to the Access application associated with the legacy policy.
3. Add the reusable policy to the application and remove the legacy policy. Removing the legacy policy from the application also deletes it.
4. Repeat these steps for each legacy policy. If you have duplicate legacy policies, you can replace them with a single reusable policy.

### Convert a legacy policy

You can use the API to convert a legacy policy into a reusable policy. To convert a legacy policy, make a `PUT` request with an empty request body:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Convert an Access application policy to a reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID/policies/$POLICY_ID/make_reusable" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

The policy is now removed from the applications endpoint (`/access/apps/$APP_ID/policies`) and managed using the [reusable policies endpoints](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/policies/)(`/access/policies/$POLICY_ID`).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/#page","headline":"Manage Access policies · Cloudflare One docs","description":"Manage Access policies in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/policies/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/policies/policy-management/","name":"Manage Access policies"}}]}
```
