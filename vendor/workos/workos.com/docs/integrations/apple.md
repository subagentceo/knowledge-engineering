# Apple

## Introduction

The "Sign in with Apple" integration allows your users to authenticate using their Apple ID credentials.

The configuration process involves obtaining credentials from your Apple Developer account and configuring them in the WorkOS Dashboard. You may also set up Private Email Relay for users who choose to hide their email addresses.

***

## Testing with default credentials in the staging environment

WorkOS provides a default set of Apple credentials, which allow you to quickly enable and test Sign in with Apple. WorkOS will automatically use the default credentials until you add your own Apple Team ID, Apple Service ID, and Apple Private Key to the configuration in the [WorkOS dashboard](https://dashboard.workos.com).

> The default credentials are only intended for testing and therefore only available in the Staging environment. For your production environment, please follow the steps below to create and specify your own Apple Team ID, Apple Service ID, and Apple Private Key.

Please note that when you are using WorkOS default credentials, Apple's authentication flow will display the WorkOS name, logo, and other information to users. Once you register your own application and use its credentials for the authentication flow, you will have the opportunity to customize the app.

***

## What WorkOS provides

When setting up "Sign in with Apple", WorkOS provides two key pieces of information that need to be configured in your Apple Developer account:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where Apple will send authentication responses after successful login
- **Outbound Email Domains**: Registered domains for Apple's Private Relay email service

These are available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select the **Authentication** tab and the **OAuth providers** sub-tab. Locate the **Sign in with Apple** section.

![Open the Sign in with Apple configuration dialog](https://images.workoscdn.com/images/b9abf389-f950-49b2-8cf3-2c47e9b810bf.png?auto=format\&fit=clip\&q=50)

Click **Enable**. The **Sign in with Apple** configuration dialog will open. Locate the **Redirect URI** and **Outbound email domains**.

![Sign in with Apple Redirect URI in the WorkOS dashboard.](https://images.workoscdn.com/images/54680256-09bc-478f-ab0f-5889c1d846be.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your Apple Developer account. **Outbound email domains** are registered with Apple's Private Relay email service to deliver email to users who choose to hide their email addresses.

***

## What you'll need

You will need to obtain four pieces of information from your Apple Developer account:

- **Apple Team ID**: Your organization's unique identifier in the Apple Developer program
- **Apple Service ID**: Application identifier for "Sign in with Apple"
- **Apple Private Key**: Authentication key file for secure communication
- **Private Key ID**: Identifier for the private key

The following sections will guide you through generating these credentials in your Apple Developer account.

***

## (1) Retrieve your Apple Team ID

Sign in to the [certificates, identifiers, and profiles](https://developer.apple.com/account/resources/certificates/list) section of your Apple Developer account.

The landing page will display your name, company name, and Team ID. Note the Team ID value as you'll need it later.

![Team ID in the Apple Developer dashboard.](https://images.workoscdn.com/images/2edd45b9-7e84-45fa-8da2-3c6dcd5607a1.png?auto=format\&fit=clip\&q=80)

> The Team ID is sensitive and will only be used by the server to communicate with Apple. It should not be shared with the client.

***

## (2) Register an App ID

> Skip this step if you already have an App ID.

Click on **Identifiers** in the sidebar, then click the + button to create a new identifier.

![Identifiers page in the Apple Developer dashboard with Create Identifier plus button highlighted.](https://images.workoscdn.com/images/54be9c35-f7c9-4119-9765-64299d42ff23.png?auto=format\&fit=clip\&q=80)

On the next page, select **App IDs** and click **Continue**.

![First step in the Identifier creation wizard with App IDs selected.](https://images.workoscdn.com/images/a028e2b5-9443-4208-aa0c-175056ac55b5.png?auto=format\&fit=clip\&q=80)

Next, select **App** and click **Continue**.

![Second step in the Identifier creation wizard with App selected.](https://images.workoscdn.com/images/baff59f5-f060-4faf-9761-678321cc496a.png?auto=format\&fit=clip\&q=80)

On the next page, fill in a description and a bundle ID. The bundle ID should be unique and in reverse domain notation, e.g., `com.example.myapp`.

Also check the **Sign in with Apple** box in the Capabilities section. There is no need to update anything in the **Edit** modal.

![Third step in the Identifier creation wizard with placeholder Description and Bundle ID entered.](https://images.workoscdn.com/images/ef85061d-ff63-4d5a-8fad-a9cbefeb6786.png?auto=format\&fit=clip\&q=80)

![Third step in the Identifier creation wizard with Sign in with Apple checkbox checked.](https://images.workoscdn.com/images/9f184ccb-40d8-4410-9250-b8ab56600452.png?auto=format\&fit=clip\&q=80)

Then click **Continue**. Review your selections and click **Register**.

***

## (3) Register a Service ID

Next you need to create a linked Service ID. Click on **Identifiers** in the sidebar, then click the + button.

![Identifiers page in the Apple Developer dashboard with Create Identifier plus button highlighted.](https://images.workoscdn.com/images/4a129d31-33c8-4976-8340-d59fc6618b67.png?auto=format\&fit=clip\&q=80)

On the next page, select **Services IDs** and click **Continue**.

![First step in the Identifier creation wizard with Services IDs selected.](https://images.workoscdn.com/images/2496cf53-f593-4eda-a2f9-14d6728b0c5d.png?auto=format\&fit=clip\&q=80)

Enter a description and a Service ID. The Service ID should be unique and in reverse domain notation, e.g. `com.example.myapp`.

![Second step in the Identifier creation wizard with placeholder Description and Service ID entered.](https://images.workoscdn.com/images/dbf69235-951c-4f1d-97b2-3a1c6854c758.png?auto=format\&fit=clip\&q=80)

Click **Continue**. Note the Service ID as you'll need it later, then click **Register** to create the service.

Now you'll configure your new service for "Sign in with Apple". First select the new service from the list of Service IDs.

![Identifiers page in the Apple Developer dashboard with the newly created Service ID highlighted.](https://images.workoscdn.com/images/478f799f-298e-4dee-9b6d-ff75d02fd9f5.png?auto=format\&fit=clip\&q=80)

Check the **Sign in with Apple** box and click **Configure**.

![Service ID Edit page with Sign in with Apple checkbox checked.](https://images.workoscdn.com/images/8c3e92fe-f5fc-403e-b7ee-fa215ad61ccf.png?auto=format\&fit=clip\&q=80)

Ensure the App ID you created earlier is selected in the dropdown. Then enter `api.workos.com` in the **Domains and Subdomains** field and paste the **Redirect URI** from the WorkOS Dashboard in the **Return URLs** field.

![Service ID Sign in with Apple edit modal with placeholder values in the inputs.](https://images.workoscdn.com/images/574617e5-4e3c-41a9-8704-dfa47bf504e2.png?auto=format\&fit=clip\&q=80)

Click **Done** and then **Continue**. Review your changes and click **Save**.

***

## (4) Register a private key

Click on **Keys** in the sidebar, then click the + button to create a new key.

![Keys page in the Apple Developer dashboard with Create Key plus button highlighted.](https://images.workoscdn.com/images/ebeffde4-091d-4b2c-a9f9-fede59d6674a.png?auto=format\&fit=clip\&q=80)

On the next page, enter a human-readable **Key Name**. Then check the **Sign in with Apple** box and click **Configure**.

![First step in the Key creation wizard.](https://images.workoscdn.com/images/264d1e39-ccae-4d32-80da-af2d5813723c.png?auto=format\&fit=clip\&q=80)

In the **Configure** dialog, select the App ID you created earlier and click **Save**.

![Key Configure dialog with App ID from the previous step selected.](https://images.workoscdn.com/images/d1442a7c-47a3-412c-956b-415a11acda9b.png?auto=format\&fit=clip\&q=80)

Click **Continue**. Review your changes and click **Register** to create your key.

![Download Your Key page.](https://images.workoscdn.com/images/eb032a3d-4d2a-44be-a2f5-292e901fae16.png?auto=format\&fit=clip\&q=80)

Make sure to download your new private key and note the Key ID as you'll need both later.

***

## (5) Configure Apple credentials in WorkOS

Now you have all the required credentials:

- Apple Team ID
- Apple Service ID
- Private Key ID
- The downloaded private key file

Return to the [WorkOS Dashboard](https://dashboard.workos.com). In the **Sign in with Apple** configuration dialog, toggle **Enable** on. Select **Your app's credentials**. Paste the credentials from Apple that you generated in the previous steps into their respective fields.

![Sign in with Apple configuration modal in the WorkOS dashboard filled out with information from earlier steps.](https://images.workoscdn.com/images/cfedc298-8666-4f38-ab71-f6ed777b44c1.png?auto=format\&fit=clip\&q=80)

***

## (6) Set up Private Email Relay

Sign in with Apple users can opt to hide their email address when signing in. In order for emails to be sent to those users, you need to configure Private Email Relay.

Copy the **Outbound Email Domains** from the **Sign in with Apple** configuration modal in the WorkOS Dashboard.

![Sign in with Apple configuration modal in the WorkOS dashboard with outbound email domains control highlighted.](https://images.workoscdn.com/images/8c4ae9a5-1b27-49c7-90f7-31a3010ee2b5.png?auto=format\&fit=clip\&q=80)

Open your Apple Developer account and click on **Services** in the sidebar. Then click on **Configure** under **Sign in with Apple for Email Communication**.

![Services page in the Apple Developer dashboard with Sign in with Apple Configure button highlighted.](https://images.workoscdn.com/images/cc81ae18-450d-417f-9e22-6392b335e437.png?auto=format\&fit=clip\&q=80)

Click the + button next to **Email Sources** and enter the outbound email domains from the WorkOS Dashboard in the **Domains and Subdomains** text box. Then click **Next** and **Register**.

![Modal to register Email Sources with domains from the WorkOS dashboard in the Domains and Subdomains text box.](https://images.workoscdn.com/images/021882c4-e299-44b8-9a44-fcf22f3be150.png?auto=format\&fit=clip\&q=80)

![New domains with green check marks next to them.](https://images.workoscdn.com/images/fa3e78e6-688d-46a8-b4e7-1f6c788da4f6.png?auto=format\&fit=clip\&q=80)

You are now ready to start authenticating with "Sign in with Apple". Your users will see the option to "Sign in with Apple" when visiting your [AuthKit](https://workos.com/docs/authkit) domain. Alternatively if you're using the [standalone SSO API](https://workos.com/docs/reference/sso/get-authorization-url), you can initiate "Sign in with Apple" by passing `AppleOAuth` as the `provider`.

***

## Frequently asked questions

### How is the WorkOS "Sign in with Apple" integration different from implementing regular Apple OAuth flow?

It's the same Apple OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to "Sign in with Apple", you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the Apple OAuth integration?

You can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/sso/get-authorization-url) to support global Apple OAuth for any domain. The `provider` query parameter should be set to `AppleOAuth`.

### Why do I need to configure Private Email Relay?

"Sign in with Apple" allows users to hide their real email address from your app. When a user chooses this option, Apple generates a unique, random email address that forwards to their real email. To send emails to these users, you need to register your sending domains with Apple's Private Email Relay service.

### What happens if I don't set up Private Email Relay?

If you don't configure Private Email Relay, you won't be able to send emails to users who choose to hide their email address. Those users will still be able to sign in, but any emails you attempt to send to their relay address will not be delivered.

### Can I use the same App ID for multiple services?

Yes, you can use the same App ID for multiple Services IDs. This is useful if you have multiple applications or environments that need to use "Sign in with Apple".
