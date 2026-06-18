# Sending Email with Microsoft Azure

> \[!NOTE]
>
> This documentation applies to the most recent version of the Twilio SendGrid integration for Microsoft Azure. For documentation on the previous version, see the [SendGrid documentation](/docs/sendgrid/for-developers/partners/microsoft-azure/) or related [Azure documentation](https://docs.microsoft.com/en-us/azure/sendgrid-dotnet-how-to-send-email).

This guide will help you create and configure a Twilio SendGrid account using Microsoft Azure. Once your account is ready, you'll be on your way to delivering email at scale.

## Create an Azure Subscription

To get started with Twilio SendGrid and Azure, visit the [Azure Portal home page](https://portal.azure.com/#home). You will need to sign in or create a Microsoft account if you do not already have one.

Once logged in, select the **Subscriptions** icon under the **Azure services** menu.

![Azure services menu with Marketplace icon highlighted.](https://docs-resources.prod.twilio.com/4fa524581077f996b628e36d55d85ac27c08bcee654153fb11fd41eff72c146d.png)

A new page will load, listing your current Azure subscriptions. You can add a new Twilio SendGrid service to an *existing* Azure Subscription or Select **+Add** to create a *new* Azure Subscription. For more information about Azure Subscriptions and billing, see the Azure docs for how to "[Create an additional Azure subscription](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/create-subscription)."

For this guide, we will create a new Azure Subscription.

![+Add button highlighted in Azure Subscriptions page for twilio.com.](https://docs-resources.prod.twilio.com/51a5bf4210ab62f552a7395e4abdecd50a417cb9fdbdf19b7295b0d4a642618c.png)

If you already have an Azure account set up for billing, you will be taken to a page where you can create an Azure Subscription.

> \[!NOTE]
>
> If you are creating your first Azure Subscription, you will first need to select a billing offer for your Azure Subscription. You will be guided through the Azure offer signup process. You can return to this guide once your billing setup is complete.

A form will load with a **Subscription Name** field. You must add a name — we recommend something that clearly differentiates the subscription. All the other fields are already populated and cannot be edited. Click **Create**.

![Azure Create Subscription form with 'Twilio SendGrid Documentation' as the subscription name.](https://docs-resources.prod.twilio.com/049de9a141a2c086e04a244a65e923b80425bfc236f3b392099933ad2a1880a4.png)

Once the Subscription is created, you will see it listed on the Subscriptions page. If you do not see the Subscription, try refreshing the list.

> \[!NOTE]
>
> If you have multiple Azure Active Directory tenants, be sure you are viewing the tenant your subscription is assigned to. You can select **Switch directories** to view your additional tenants. For more on Azure AD, see "[Associate or add an Azure subscription to your Azure Active Directory tenant](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-subscriptions-associated-directory)."

![Azure subscriptions list showing two active entries with owner roles.](https://docs-resources.prod.twilio.com/e8b260f5b686ca0a2056f5901b78bc4079eda9272938051cac828bd23034a820.png)

## Create a Twilio SendGrid account

From the Azure portal home page, select **Marketplace** under **Azure services**. If you do not see the **Marketplace** icon, you can search for it by selecting **More services**.

![The Azure portal home page with the Marketplace icon highlighted.](https://docs-resources.prod.twilio.com/eb22c731eaf36becab78e7753149cb610c8d84478f16ee93ae5787cc7eb77b2b.png)

The Azure Marketplace provides many services, including the Twilio SendGrid email service. You can find it by searching for "Twilio SendGrid". You will also find it under **Software as a Service (SaaS)**.

Click the Twilio SendGrid resource to load a page where you can select your account tier. You can start with a free account and upgrade as your sending needs change. See the [Twilio SendGrid pricing page](https://sendgrid.com/pricing/) to understand what's included with each plan.

![Twilio SendGrid listing in Azure Marketplace with setup option.](https://docs-resources.prod.twilio.com/812e23ac628ea7bdd61830b81e828828c4965e554c41367b3062d4d5e1ca2322.png)

![Twilio SendGrid Azure integration page with 'Setup + Subscribe' button.](https://docs-resources.prod.twilio.com/0f5c375412a9fe4ddb5803ab1e1831665d110c68f298e7582631afb49489969e.png)

Select **Set up + subscribe**. You will be taken to a page where you can assign your Twilio SendGrid account to an Azure Subscription and Resource Group. Once you have completed the required fields, select **Review + subscribe**.

![Azure interface for subscribing to Twilio SendGrid with plan details and pricing.](https://docs-resources.prod.twilio.com/f3a9bf0bf42b340233eb121e75a622783f38f7767caf665413ac6166557569cd.png)

You will be asked to agree to Azure's term of services. You can now review your order and click **Subscribe**.

It takes a few moments to establish your account. You will be shown a progress screen. When the setup is complete, you will be able to click the **Configure account now** button to be taken to the Twilio SendGrid App. You will also receive an email when the subscription setup is complete.

![Azure subscription progress for Twilio SendGrid with Contoso as SaaS resource name.](https://docs-resources.prod.twilio.com/7b8c13a712d5c78f1c4dcb02b08753b1cb2d04ff1971f6efa89cfb0bca05ec71.png)

## Twilio SendGrid account setup

Before sending your first email, you will need to complete the following Twilio SendGrid account setup. These requirements help secure your account and keep your messages from landing in spam folders.

* Configure Two-factor authentication
* Create an API key
* Complete Sender Authentication

### Two-factor authentication

Twilio SendGrid uses Two-factor authentication (2FA) to help protect your account. To enable 2FA, navigate to **Two-Factor Authentication** in the Twilio SendGrid **Settings** menu, and click **Add Two-Factor Authentication**.

![Two-Factor Authentication settings with an option to add authentication.](https://docs-resources.prod.twilio.com/743fc75ab519494b5c3707497107bd353bff0bcaf3f7a75309e9129431e4cbbe.png)

A modal will open where you can complete the 2FA setup. Click **Ok, Got it** to continue.

> \[!WARNING]
>
> If you have previously configured services to authenticate with Twilio SendGrid APIs using Basic Authentication, enabling 2FA will break those integrations. You must use API keys to authenticate with Twilio SendGrid APIs.

![Modal prompting to enable two-factor authentication with options to cancel or confirm.](https://docs-resources.prod.twilio.com/d5068e1676befe9b6a276e6030433f5a57cbf838f77aafc9fc0713b6cf20440a.png)

Twilio SendGrid supports 2FA using either SMS or the Authy App. Select your preferred 2FA method, and click **Next**.

You will need to enter a phone number to complete the 2FA process. SMS users will be sent a confirmation code at the number they entered. Authy users will be sent instructions for downloading and completing the 2FA setup using the Authy app.

### API keys

API Keys authenticate your application, mail client, or website with Twilio SendGrid services. Unlike a username and password, API keys are scoped to provide access only to the services you select. You can also delete and create API keys without impacting your other account credentials. For these reasons, Twilio SendGrid requires you to connect to its services using API keys.

#### Create an API key

In the Twilio SendGrid App, navigate to **API Keys** in the **Settings** menu, and select **Create API Key**.

![SendGrid API Keys page with create API key button highlighted.](https://docs-resources.prod.twilio.com/988b789f22c672b6d13aa9c6cd5f6e3e3e7ea31eac52768dc8468e84a5ea3f58.png)

A modal will open where you can create your key. You must name the API key — we recommend something that will clearly differentiate the key from others you may create in the future.

![Create API Key modal with options for API key name, permissions, and access levels.](https://docs-resources.prod.twilio.com/e47fa2d53292ad61d8ad92797309e12431f345935f008fee1e7c45d00316213e.png)

You must also select the type of key you want to create. Twilio SendGrid provides three types of API key:

* Full Access
* Restricted Access
* Billing Access

To keep your account secure, you should give each key the [least privilege](https://www.twilio.com/blog/principle-of-least-privilege-details-best-practices) necessary. You can limit a key's capabilities by creating a **Restricted Access** key and selecting a subset of all the possible permissions. For more about managing Twilio SendGrid API keys, see the [Twilio SendGrid API keys documentation](/docs/sendgrid/ui/account-and-settings/api-keys/).

> \[!NOTE]
>
> For security reasons, Twilio SendGrid API keys will be displayed to you at the time of creation only. Be sure to copy your key and store it somewhere secure like your [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/). If you lose your key, you must create another — it's not possible to recover a lost key. The permissions assigned to a key can be modified after it's created.

#### Use an API key

Twilio SendGrid's v3 APIs expect an API key to be passed in an Authorization header as a Bearer Token. See the [Twilio SendGrid v3 API reference](/docs/sendgrid/api-reference) for help using your key to send your first email.
The Twilio SendGrid SDKs all provide a method to set your key, handling the authentication via Bearer Token for you. See the [Twilio SendGrid developer documentation](/docs/sendgrid/for-developers) for helpful code examples and links to SDKs in C#, Go, Java, Node.js, PHP, Python, and Ruby.
When using Twilio SendGrid's SMTP integration, you will set your API key as a password via Basic Authentication. Your username must always be the string, "apikey." Using the account credentials (username and password) you set up through Azure will fail, so be sure to set your password to the 14 digit API key provided by the Twilio SendGrid App. Your account credentials are separate from the credentials used to authenticate with Twilio SendGrid's APIs and SMTP services.

```bash
username: "apikey"
password: <your-api-key>
```

### Sender Authentication

Twilio SendGrid requires customers to complete Sender Authentication. This requirement protects your domain's reputation as an email sender and helps uphold legitimate sending behavior by Twilio SendGrid customers.

Setup includes domain authentication. Twilio SendGrid will provide DNS records that you must add to your domain. For instructions on the domain authentication process, see "[How to Set Up Domain Authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication/)."

## Change, unsubscribe, reactivate your Twilio SendGrid plan

You can upgrade or downgrade your Twilio SendGrid plan to accommodate your email sending needs as they change. If you no longer need the Twilio SendGrid service, you will also unsubscribe through the Azure portal.

From your Azure portal's Subscription overview page, select **Resources** and click your Twilio SendGrid resource (it is labeled "Contoso" in the following examples).

![Azure resources page showing Twilio SendGrid subscription under Contoso.](https://docs-resources.prod.twilio.com/fde9cb30c8069124c1b483e7efd4fcf8347dee01b0b0421002ca9dc1b2b5fb8e.png)

A detail page will load where you can modify your Twilio SendGrid subscription.

![Azure page showing Twilio SendGrid subscription details and billing information.](https://docs-resources.prod.twilio.com/a516e84200abbec23c193e33d65e6531ab9d01158a41c2ef83c5afda119351f1.png)

### Upgrade or downgrade your plan

To upgrade or downgrade your plan, select **Change plan** from the Twilio SendGrid resource detail page. There are two locations where you can select **Change plan** — selecting **Change subscription** will allow you to modify your Azure subscription, not your Twilio SendGrid plan.

![Azure portal with Twilio SendGrid 'Change plan' link highlighted under subscription details.](https://docs-resources.prod.twilio.com/ff41685e39a5ef6721d2f092de6c76dc132d0a81a36b164f8636d1093f4a1e73.png)

A modal will open, displaying the available plans with your current plan selected. Select a new plan, and click **Change plan**. You will see a confirmation message on the page when your plan has been updated.

### Unsubscribe from Twilio SendGrid

To unsubscribe from Twilio SendGrid, select **Unsubscribe** from the Twilio SendGrid resource detail page.

![Azure interface showing Twilio SendGrid subscription with 'Unsubscribe' link highlighted.](https://docs-resources.prod.twilio.com/3410cd884fb61c158a866e054bc06d3873d2d6a23f4df2dfd8bbf0e7aeb6875a.png)

A modal will open asking you to select the reason for ending your subscription. Select an option that best describes your situation, and click **Unsubscribe**.

![Azure unsubscribe confirmation with feedback options for SaaS service.](https://docs-resources.prod.twilio.com/a5193a29f463c65308efaf6a06a4a03bd64410f9378500e134237e492fd2e584.png)

You will receive a confirmation message when your subscription has been removed.

### Reactivate your Twilio SendGrid account

If you have unsubscribed from Twilio SendGrid and need the service again in the future, you will need to create a new subscription. If your account has been suspended, you can reactivate the service by paying any outstanding account balance. Once payment has been received, you'll be able to reactivate your account.
