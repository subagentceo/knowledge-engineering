# Create API keys in Twilio Console

You can create and manage all of your API keys in the Twilio Console. To create and manage API keys using the REST API, refer to [Key resource v1](/docs/iam/api-keys/key-resource-v1).

API keys represent the required credentials that you'll use to [authenticate to Twilio's REST API](/docs/usage/requests-to-twilio) and to create and revoke [Access Tokens](/docs/iam/access-tokens).

> \[!NOTE]
>
> If your API key requires access to the Accounts (`/Accounts`) or Keys (`/Accounts/{SID}/Keys`, `/v1/Keys`) endpoints, then you'll need to use a Main key. You can create Main keys only in the [Twilio Console](https://www.twilio.com/console/runtime/api-keys/create).

## Types of keys

The API key types are `Main`, `Standard`, and `Restricted` (Key resource v1 only). The following table describes each type:

| Key type   | Access permissions                                                                                                                                                                                                                                 | Create in Console | Create with REST API |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------- |
| Main       | Full access to all Twilio API resources. Equivalent to using your Account SID and Auth Token for API requests.                                                                                                                                     | Yes               | No                   |
| Standard   | Access to all Twilio API resources, except for Accounts ([`/Accounts`](/docs/iam/api-keys/keys-in-console)) or Keys ([`/Accounts/{SID}/Keys`](/docs/iam/api-keys/key-resource-v2010), [`/v1/Keys`](/docs/iam/api-keys/key-resource-v1)) resources. | Yes               | Yes                  |
| Restricted | Customized, fine-grained access to specific Twilio API resources. Learn more about [Restricted API keys](/docs/iam/api-keys/restricted-api-keys).                                                                                                  | Yes               | Yes (**v1 only**)    |

## Create an API key in Twilio Console

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Account settings** > **API keys & auth tokens**](https://1console.twilio.com/go?to=/account/__account__/settings/us1/api-keys/list).
2. From the region selector, select your region, then click **Create API key**.
3. On the **API key details** page, enter the API key name and select the key type: **Standard** or **Restricted**

   * For standard keys, click **Next**.
   * For restricted keys, under **Permissions**, select the permissions to grant to the API key, then click **Next**.

   The API key is created and the secret is displayed.
4. Copy the secret and store it somewhere secure.
5. Select the **Got it!** checkbox and click **Finish**.

## Legacy Console

1. Click **Admin > Account management** in the top right corner.
2. Under **Keys & credentials**, click **API keys & tokens** (or go directly to the [Console](https://www.twilio.com/console/project/api-keys)).
3. On the **API keys & tokens page**, click **Create API key**.
4. On the **Create new API key** page, enter a **Friendly name** for the API key.
5. Select the **Region** and the key type: **Standard**, **Main**, or **Restricted**. Restricted API keys are only available in the United States Region.
6. For Restricted keys, select the **Permissions** to grant.
7. Click **Create**.
8. On the **Copy secret key** page, **Copy the secret** and store it somewhere secure.
9. Select the **Got it!** checkbox and click **Done**.

## Duplicate a Restricted API key in the Twilio Console

Restricted API keys can have complex permissions. You can save time by duplicating a Restricted API key as a starting point for a new key.

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Account settings** > **API keys & auth tokens**](https://1console.twilio.com/go?to=/account/__account__/settings/us1/api-keys/list).
2. On the **API keys** tab, click the name of the Restricted API key that you want to duplicate.
3. Click **Duplicate this key**.
4. On the **API key details** page, enter the API key name and adjust the permissions as needed.
5. Click **Next**.\
   The API key is created and the secret is displayed.
6. Copy the secret and store it somewhere secure.
7. Select the **Got it!** checkbox and click **Finish**.

## Legacy Console

1. Click **Admin > Account management** in the top right corner.
2. Under **Keys & credentials**, click **API keys & tokens** (or go directly to the [Console](https://www.twilio.com/console/project/api-keys)).
3. On the **API keys & tokens page**, find the key to duplicate and then in the **Actions** column, click **Duplicate key**.
4. Make changes to the fields and **Permissions** as needed.
5. Click **Create**.
6. On the **Copy secret key** page, **Copy the secret** and store it somewhere secure.
7. Select the **Got it!** checkbox and click **Done**.

## Update an API key in the Twilio Console

For Standard and Main API keys, you can update only the API key name. For Restricted keys, you can update the API key name and the permissions.

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Account settings** > **API keys & auth tokens**](https://1console.twilio.com/go?to=/account/__account__/settings/us1/api-keys/list).
2. On the **API keys** tab, click the name of the API key to update.
   * To update the API key name, on the **API key details** tab, click **Edit name**, update the name, then click **Save**.
   * To update the permissions for a Restricted key, on the **Permissions** tab, update the permissions and click **Save**.

## Legacy Console

1. Click **Admin > Account management** in the top right corner.
2. Under **Keys & credentials**, click **API keys & tokens** (or [follow this link to the Console](https://www.twilio.com/console/project/api-keys)).
3. On the **API keys & tokens page**, click the name of the API key to update.
4. On the API key's page, update the **Friendly name** or the **Permissions** to grant (Restricted keys only).
5. Click **Save**, then click **Save** again on the confirmation pop-up.

## Delete an API key in the Twilio Console

If you no longer use an API key or if a key has been compromised, then you can revoke the key's permissions by deleting the API key.

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Account settings** > **API keys & auth tokens**](https://1console.twilio.com/go?to=/account/__account__/settings/us1/api-keys/list).
2. On the **API keys** tab, click the name of the API key to delete.
3. Click **Delete this key**.
4. In the pop-up, click **Delete** to confirm deletion.

## Legacy Console

1. Click **Admin > Account management** in the top right corner.
2. Under **Keys & credentials**, click **API keys & tokens** (or [follow this link to the Console](https://www.twilio.com/console/project/api-keys)).
3. On the **API keys & tokens page**, click the name of the API key to delete.
4. On the API key's page, click **Delete this API key** at the bottom of the page.
5. In the pop-up, click **Delete this API key** to confirm deletion.
