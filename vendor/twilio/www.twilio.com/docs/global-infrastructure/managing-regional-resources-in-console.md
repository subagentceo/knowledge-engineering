# Managing Regional Resources in Console

Many Twilio resources — such as [TwiML Apps](/docs/usage/api/applications), [SIP Domains](/docs/voice/sip/api/sip-domain-resource), and [Access Control Lists](/docs/voice/sip/api/sip-ipaccesscontrollist-resource) — are specific to the individual [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions) that they were created in.

Twilio phone number configurations are also Region-specific.

This guide explains how to create and manage these Region-specific Twilio resources using the Console.

## Single-Region navigation

In a single-Region setup, your account uses only one Region (for example, US1). All resources are created and managed in that Region, and you can't switch between Regions.

For example, consider that you are an existing customer using Console in single-Region mode. Navigating to **TwiML Apps** under the **Voice** product menu displays the TwiML Apps that exist in the US1 Region. Creating a new TwiML App from this page creates the resource in the US1 Region.

> \[!NOTE]
>
> When you use the legacy Console in single-Region mode, you'll see a product-oriented navigation menu. In the Console's default state, the navigation menu is configured to interact with products in a single Region, which is the United States (US1) Region. Interactions with pages found within the product menus result in interacting with that product in the Console's default Region.

## Multi-Region navigation

You work within one Region at a time. Where there are multiple Regions available, accessing any of the product menus from within a specific Region's navigation section will allow you to interact with that product's resources in that particular Region. To switch between Regions:

## Twilio Console

When multiple Regions are available, you can switch between them using the Region selector on the page. The Region selector is a dropdown menu that allows you to view and manage your resources for a specific Region. When you select a different Region from the dropdown, the page will refresh to show the resources that exist in that Region for the selected product.

## Legacy Console

To manage resources in a Twilio Region other than the legacy Console's configured default Region, "pin" the products you want to work with for each Region where you intend on using the product. Once you have pinned a product to a Region other than the Console's default Region, the legacy Console enters Multi-Region navigation mode. In this mode, the navigation menu is presented as a Region-oriented menu. Each distinct pinned Region will have an expandable section in the menu, and under each Region section you will find a nested, product-oriented menu containing each product that has been pinned for that Region.

For example, consider that you have the Voice product pinned in United States (US1) and Ireland (IE1). To find your collection of TwiML apps that exist in the IE1 Region:

1. Click to expand the **Ireland (IE1)** section of the navigation menu,.
2. Click **Voice > Manage > TwiML apps**.

This will take you to the list of TwiML apps that exist in the IE1 Region.

Similarly, you can navigate to and manage other Region-specific resources from the relevant section of the navigation menu.

## Managing phone number configurations

Phone numbers are global resources. Your account has a single pool of numbers, and these numbers may be used with any Twilio Region. However, each phone number can have a different configuration in each Region.

For example, you might configure a phone number with a Voice URL of `https://us.example.com/twilio` in the US1 Region, and a Voice URL of `https://aus.example.com/twilio` in the AU1 Region. The configuration that is used depends on the Region where incoming calls are processed in. See the [guide to incoming call routing](/docs/global-infrastructure/inbound-processing-console) to learn more.

To manage your phone number configuration for a specific Region:

## Twilio Console

1. Navigate to **Numbers & Senders > Phone Numbers**, then select the phone number that you want to manage.
2. In the **Regional** tab, click **Change active region**.
3. Select the Region you want to switch to, and click **Update region**.

If a capability (for example, Messaging), isn't available in the selected Region, the Console displays a warning message.

## Legacy Console

1. Make sure the Phone Numbers product is pinned in that Region.
2. Navigate to **Phone Numbers > Active numbers** within that Region's section in the navigation menu.
3. Select the phone number you want to manage.

> \[!WARNING]
>
> The first time you manage a phone number in a new Region, a banner that says "No Configuration" may appear on the configuration page. If this occurs, enter a friendly name or a webhook URL for the number in this Region, and click **Save** to create a configuration.

## Managing Auth tokens and API keys

Auth tokens and API keys are Region-specific.

## Twilio Console

To view and manage these in the Twilio Console:

1. Navigate to **Develop > API Keys & creds > API Keys & auth tokens**.
2. Use the Region selector dropdown to switch between Regions.

## Legacy Console

To view and manage these in the legacy Console:

1. Go to the **Account** menu, and select **API keys and tokens**.
2. After you enter your verification code, select a Region.

## Next steps

To continue learning about building with Regional Twilio, check out these other resources:

* [Route a phone number's incoming calls to a non-US Region](/docs/global-infrastructure/inbound-processing-console)
* [Make an outbound phone call via REST API in a non-US Twilio Region](/docs/global-infrastructure/create-an-outbound-call-via-rest-api-in-a-non-us-twilio-region)
