# How Stripe Capital for platforms works

Learn the basics about Stripe Capital for platforms.

> Capital for platforms is available in [public preview](https://docs.stripe.com/release-phases.md).

Stripe Capital for platforms works differently by country. Capital for platforms is only available in the United States (US) and United Kingdom (GB).

Select your country to learn how Capital works:

#### US

Before you use Stripe Capital for platforms, learn about the eligibility requirements, lending process, and the structure of financing offers.

## Eligibility

To use Capital for platforms, your business must be a *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) platform with eligible connected accounts.

### Eligible connected accounts

Stripe, alongside our financial partner, reviews each connected account’s eligibility based on their payment activity on Stripe. This automatic review runs daily and requires no action from your platform. While we aim to offer financing to as many accounts as possible, not all connected accounts are eligible.

Connected accounts must have:

- **A business based in the US**. Business representatives must also provide a physical US home address.
- **A for-profit business**. Additional restrictions might apply to government, utility, and travel businesses.
- **An email address linked to their Stripe account**. This is necessary for them to receive marketing and servicing emails. To confirm and upload email addresses for your connected accounts, use the [Stripe Comms Center](https://dashboard.stripe.com/connect/comms_center/collect) in the Stripe Dashboard. You must have the necessary consent to share their email addresses with Stripe.

We also review additional criteria, such as if the connected account’s business has:

- **Growth trajectory**: The amount of payment they process through Stripe influences the size of a connected account’s funding offer. Businesses with positive growth trajectories are more likely to be eligible for an offer.
- **Steady processing records**: A consistent, steady processing record with limited periods of low or zero volume shows stability in the business and increases their likelihood of qualifying for an offer.
- **A large customer base**: Businesses with more customers are more likely to be eligible for an offer.
- **A low dispute rate**: Businesses with low rates of unresolved *chargebacks* (The action taken by a cardholder's bank to debit a business's account in response to a dispute from the cardholder. The debited funds are held until the dispute is resolved) are more likely to qualify for funding.

### Help increase eligibility

To enable Stripe to review the eligibility of all of your connected accounts, share the data of connected accounts who don’t process payments on Stripe. Sharing non-Stripe payments data gives us the ability to review  each connected account’s eligibility for a financing offer, and also determine the financing amount and premium rate. To learn more, see [Import non-Stripe data into Capital underwiting](https://docs.stripe.com/capital/import-non-stripe-data.md).

## Financing process

To provide a connected account a financing offer, Stripe Capital follows a financing process:

| **Phase**                                | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Risk and underwriting**                | Stripe uses a combination of eligibility criteria (including overall processing volume and history on Stripe) to extend financing offers for connected accounts. This means each connected account who receives an offer is already prequalified for financing. To share the data of connected accounts who process payments off Stripe, see [Import non-Stripe data into Capital underwiting](https://docs.stripe.com/capital/import-non-stripe-data.md).                                                                                                                 |
| **Send financing offers**                | Opt for Stripe Capital to automatically send co-branded emails with financing offer information to eligible connected accounts, or build an API integration to listen to webhooks for eligible offers and send your own emails or notifications to connected accounts. Regardless of how you choose to deliver financing offers to your connected accounts, they must accept their offer in a Stripe-hosted Capital page or an embedded component. To learn more, see [Capital emails](https://docs.stripe.com/capital/how-capital-for-platforms-works.md#capital-emails). |
| **Fund disbursement**                    | Stripe handles sourcing all Capital funds and deposits them to your connected account’s bank  account within 2 business days.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Payments towards a financing balance** | Payments towards a financing balance are fully automated and adjust to daily sales. Stripe deducts a fixed percentage from each of your connected account’s sales until they repay the complete owed total.                                                                                                                                                                                                                                                                                                                                                                |
| **Servicing and collections**            | Stripe and our financial partners handle questions about financing offers and manages payment collection with any connected accounts who fail to make payments towards their financing balance.                                                                                                                                                                                                                                                                                                                                                                            |

## Types of financing offers

There are four types of financing offers: merchant cash advance (MCA), flex loan, fixed term loan, and line of credit. A connected account receives only one type per financing offer.

| Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Offered to                                                                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MCA**             | This involves YouLend buying a business’s future receivables. It’s not a loan or credit transaction. Instead, YouLend purchases a percentage of the business’s payment processing volume as specified in the YouLend Advance Agreement. There is no fixed payment schedule or regular debits; payments vary based on the business’s processing volume.                                                                                                                                                                              | A connected account processing payments with Stripe for at least 90 to 180 days.                                                                                           |
| **Flex loan**       | Flex term loans are made available by Celtic Bank to eligible businesses. These loans have a maximum term, and periodic payments. If withholdings from payment processing receivables don’t meet a minimum amount (typically on a 30 or 60-day basis), shortfalls are debited from a linked bank account.                                                                                                                                                                                                                           | A connected account processing payments with Stripe for over 180 days or more.                                                                                             |
| **Fixed term loan** | A loan a connected account must pay within 42 weeks, making weekly payments at a fixed amount.                                                                                                                                                                                                                                                                                                                                                                                                                                      | A connected account who processed payments off Stripe, whose non-Stripe payments data you [imported to Stripe](https://docs.stripe.com/capital/import-non-stripe-data.md). |
| **Line of credit**  | With a line of credit, a connected account can borrow up to a prequalified credit limit through a series of loans. They apply to draw the exact amount they need within their available limit and can access the remaining capital for 90 days. As repayments are made, the available credit replenishes, allowing them to request more capital. After 90 days, we reevaluate the credit limit. Each draw is reviewed and approved as a separate loan. They repay each draw as principal plus a fixed fee in nine monthly payments. | A connected account processing payments with Stripe.                                                                                                                       |

The following table compares a flex loan, fixed term loan, and line of credit:

| Offer terms             | Flex loan                                                                   | Fixed term loan                                                            | Line of credit                                                      |
| ----------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Max loan size           | 250,000 USD                                                                 | 250,000 USD                                                                | Up to the prequalified credit limit                                 |
| Pricing                 | 8-19.99%                                                                    | 8-19.99%                                                                   | Fixed fee per draw                                                  |
| Expected duration       | 8-9 months (standard)                                                       | 42 weeks                                                                   | 9 monthly payments per draw. Credit limit reevaluated every 90 days |
| Payment minimums        | 60-day minimum payments. Bank debits if the minimum isn’t met every 60 days | 7-day minimum payments. Bank debits if the minimum isn’t met every 7 days  | 9 monthly payments of principal plus fixed fee per draw             |
| Transaction withholding | Fixed % for the life of the loan                                            | 100% of payments until the minimum is met each 7 day period. 0% thereafter | Fixed % for each active draw                                        |

## Capital offer structure 

Each Capital financing offer has four components:

| **Component**    | **Definition**                                                                          |
| ---------------- | --------------------------------------------------------------------------------------- |
| Principal amount | The amount the account is prequalified to receive                                       |
| Payment rate     | The percentage of each future transaction to be withheld for repayment                  |
| Premium amount   | A flat fee on top of the principal amount that the connected account user must pay back |
| Minimum payment  | A minimum amount that must be paid over a specific time period, usually 60 days         |

For example, with a flex loan, consider a financing offer of 20,000 USD with a 15% repayment rate and a 2,000 USD flat fee. This offer requires a minimum payment of 2,444.45 USD for every 60 days. After the connected account reviews and accepts the offer, they receive a 20,000 USD payout. Stripe Capital withholds 15% of each transaction processed through Stripe until the connected account pays the entire 22,000 USD balance. If they miss a minimum payment, Stripe automatically debits the remaining amount for that period.

With a line of credit, a connected account has a prequalified credit limit and can apply to draw the exact amount they need. For example, if a connected account has a 50,000 USD credit limit and draws 20,000 USD, they repay the 20,000 USD principal plus a fixed fee in nine monthly payments. As they make repayments, their available credit replenishes, which allows the account to request additional draws up to their available limit. Each draw is a separate loan subject to review and approval.

## Capital integration options

There are three ways to onboard to Capital for platforms:

- [No-code integration](https://docs.stripe.com/capital/no-code-integration.md)
- [Embedded components integration](https://docs.stripe.com/capital/embedded-component-integration.md)
- [API integration](https://docs.stripe.com/capital/api-integration.md)

### Provide financing offers

If you choose a no-code or embedded components integration, you can opt for Stripe to send co-branded emails with financing offers to eligible connected accounts, on your behalf. You can also use an embedded component (regardless if you choose no-code) to enable connected accounts to view, accept, and manage financing offers directly in your platform’s UI. Throughout the financing process, Stripe sends transactional and servicing emails to your connected accounts. To learn more, see [Emails](https://docs.stripe.com/capital/how-capital-for-platforms-works.md#emails).

If you choose an API integration, you opt to send your own emails to your connected accounts by listening to webhooks for eligible offers, and updating offers as delivered and accepted. To learn more, see [Set up an API integration](https://docs.stripe.com/capital/api-integration.md).

All onboarding integrations require your connected accounts to view and accept a financing offer in a Stripe-hosted Capital page or an embedded component:
![anatomy offer](https://b.stripecdn.com/docs-statics-srv/assets/offer-anatomy.25435a5c27bd4804965991bf4ba77e00.png)

Eligible connected accounts see this Stripe-hosted Capital page or interact with this page within the embedded component to accept a financing offer regardless of your integration type.

To learn how to launch a Capital program, see [Set up Capital](https://docs.stripe.com/capital/getting-started.md).

## Capital emails

If you onboard to Capital with a [no-code or embedded components](https://docs.stripe.com/capital/how-capital-for-platforms-works.md#capital-onboarding-integrations) integration, you can opt for Stripe to send emails to your connected accounts on your behalf.

### Email types

If you choose a no-code or embedded components integration, you can opt for Stripe to send the following types of emails to your connected accounts:

- **Marketing**: Contain a financing offer or other marketing content.
- **Transactional**: Updates on making payments to a financing balance, or reminders to pay any outstanding balances.
- **Errors and risk**: Notifications and alerts when there are errors or additional information is needed.

These emails are classified as transactional emails and are delivered to suppressed or unsubscribed email addresses.

### Upload emails for connected accounts

To receive Capital offers, connected accounts must have an email saved with Stripe. You can confirm email addresses, and upload missing email addresses for all eligible connected accounts through the [Stripe Comms Center](https://dashboard.stripe.com/connect/comms_center/collect). You must have the necessary consent to share email addresses with Stripe.

By default, we try to email the connected account’s business representative with their Capital offer. If there isn’t an email, we use the connected account’s email, which is usually a general support email alias for a business. If they click the button in the email to view their offer, they must confirm their identity by answering a series of questions to accept a financing offer on behalf of their business.

### Customize and preview emails

To customize the co-branded emails Stripe sends to your connected accounts in the Dashboard:

1. Verify you have [administrator role access](https://docs.stripe.com/get-started/account/teams/roles.md).

2. In the Dashboard, go to **Settings** > **Connect** > [Emails](https://dashboard.stripe.com/settings/connect/emails).

3. Customize branding:

   Set your **Business name**, **Logo**, **Icon**, **Brand color**, and **Accent color**. Connected accounts see these values in the co-branded emails.

4. Customize email domain:

   By default, emails are sent from a `stripe.com` address. You can [customize the domain](https://docs.stripe.com/get-started/account/email-domain.md), but not the specific address. We set the address automatically [based on the context of the message](https://support.stripe.com/questions/custom-email-domain), and send capital financing offer emails from `support@custom-domain.com`.

5. To preview an email, select an email from the **Preview** dropdown list.

6. To see a sent test email, click **Send email**. Open the email (as if you’re a connected account) and test any links in it.

### View sent email history

To see all the emails Stripe has sent to a connected account:

1. In the Dashboard, go to **Connect** > [Connected accounts](https://dashboard.stripe.com/connect/accounts).
2. Click the applicable connected account to open the details page.
3. At the bottom of the page, under **Emails to this account**, view the emails sent from Stripe.
4. Click an email to see details such as the content, email address, and the delivered status (such as `successfully delivered` or `opened`).

## Capital collections 

If a connected account misses a scheduled payment and their loan remains unpaid by the next minimum due date, they’re considered delinquent. A connected account misses a scheduled payment when an unsuccessful ACH debit attempt occurs due to: insufficient funds in the applicable bank account, the closure of the related bank account, revoked access to the ACH account, or any event resulting in the failure of scheduled payment.

After a connected account becomes delinquent, the automated payment collection process implements specific business rules to collect past-due payments. Alongside the automated collection process, the loan enters a recovery-focused collection queue after it becomes delinquent.

Stripe Capital has a collection strategy for delinquent loans. Stripe attempts to contact all connected accounts who haven’t met or risk not satisfying their minimum payments to ensure they comply with professional standards and legal regulations. Stripe representatives work with connected accounts to try to maintain a business relationship, and satisfy minimum payments according to the contractual agreement outlined in the loan agreement.

To help connected accounts facing business challenges, Stripe Capital might offer extended payment plans to help them make smaller payments to meet their financing obligations. Connected accounts who want to discuss their financial obligations can reach out to Stripe Capital at [capital-support@stripe.com](mailto:capital-support@stripe.com).

Eligibility for payment plans is determined by several factors, including the connected account’s:

- Delinquency level
- Possession of a debitable bank account on file with Stripe
- Ability to make a qualifying payment
- Bankruptcy status
- Ability to pay off balance with terms not exceeding 50% of the original loan terms

#### GB

Before you use Stripe Capital for platforms, learn about the eligibility requirements, the lending process, and the structure of financing offers.

## Eligibility

To use Capital for platforms, your business must be a *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) platform with eligible connected accounts.

### Eligible connected accounts

Stripe, with our financing partner, reviews each connected account’s eligibility based on their payment activity on Stripe. This automatic review runs daily and requires no action from your platform. While we want to offer financing to as many accounts as possible, not all connected accounts are eligible.

Connected accounts must have:

- A business based in the UK. Business representatives must also provide a physical UK home address.
- A for-profit business. Additional restrictions might apply to government, utility, and travel businesses.
- An email address linked to their Stripe account. This is necessary for them to receive marketing and servicing emails. To confirm and upload email addresses for your connected accounts, use the [Stripe Comms Center](https://dashboard.stripe.com/connect/comms_center/collect) in the Stripe Dashboard. You must have the necessary consent to share their email addresses with Stripe.
- Processed payments on Stripe for at least 3 months.
- A processing volume of 5,000 GBP minimum per year and an average processing volume of 1,000 GBP for the last 3 months.
- Good standing with Stripe Capital. If they previously applied for a Capital offer and were rejected, they’re ineligible to receive a new offer for 90 days.

Additionally, the person applying for and guaranteeing the offer must be:

- A representative, controller, or director with significant ownership (at least 25%)
- At least 18 years old on the date of the application
- Able to provide an address in the UK

We also review additional criteria, such as whether the connected account’s business has:

- **Growth trajectory**: The amount of payment they process through Stripe influences the size of a connected account’s funding offer. Businesses with positive growth trajectories are more likely to be eligible for an offer.
- **Steady processing records**: A consistent, steady processing record with limited periods of low or zero volume shows stability in the business and increases their likelihood of qualifying for an offer.
- **A large customer base**: Businesses with more customers are more likely to be eligible for an offer.
- **A low dispute rate**: Businesses with low rates of unresolved *chargebacks* (The action taken by a cardholder's bank to debit a business's account in response to a dispute from the cardholder. The debited funds are held until the dispute is resolved) are more likely to be eligible for financing.

## Financing process 

To provide a connected account a financing offer, Stripe Capital follows a financing process:

| **Phase**                                | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Risk and underwriting**                | Stripe uses a combination of eligibility criteria (including overall processing volume and history on Stripe) to extend financing offers for connected accounts. This means each connected account who receives an offer is already prequalified for financing.                                                                                                                                                                  |
| **Send financing offers**                | Opt to provide financing offers to eligible connected accounts in the form of a prebuilt component you embed directly in your platform’s UI. You can also build an API integration to listen to webhooks for eligible offers and send your own emails or notifications to connected accounts. Both integrations require connected accounts to view and accept an offer in a Stripe-hosted Capital page or an embedded component. |
| **Fund disbursement**                    | Stripe handles sourcing all Capital funds and deposits them to your connected account’s bank  account within 1-2 business days.                                                                                                                                                                                                                                                                                                  |
| **Payments towards a financing balance** | Payments towards a financing balance are automated, and adjust to daily sales. Stripe deducts a fixed percentage from each of your connected account’s sales until they pay the complete total they owe.                                                                                                                                                                                                                         |
| **Servicing and collections**            | Stripe, with our financial partner, YouLend, handles questions about financing offers and manages payment collection with any connected accounts who fail to make payments toward their financing.                                                                                                                                                                                                                               |

## Types of financing offers

Two types of financing offers are available—a merchant cash advance (MCA) and a loan advance (loan). A connected account receives only one type per financing offer.

| Type             | Description                                                                                                                                                                                                                                                                                                                                              | Offered to                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **MCA**          | This involves a purchase of a business’s future receivables. It’s not a loan or credit transaction. Instead, YouLend purchases a percentage of the business’s payment processing volume as specified in the YouLend Advance Agreement. It has no fixed payment schedule or regular debits; payments vary based on the processing volume of the business. | A connected account processing payments with Stripe for at least 90 days. |
| **Loan advance** | This involves a disbursement of funds with conditions including  rates (principal and  interest) and a fixed payment schedule.                                                                                                                                                                                                                           | A connected account processing payments with Stripe for at least 90 days. |

## Capital offer structure 

Each Capital financing offer has four components:

| **Component**    | **Definition**                                                       |
| ---------------- | -------------------------------------------------------------------- |
| Principal amount | The amount the account is prequalified to receive                    |
| Payment rate     | The percentage of each future transaction to be withheld for payment |
| Premium amount   | A flat fee on top of the principal amount that must be paid          |

For example, consider a financing offer for 20,000 GBP at a 15% payment rate with a 2,000 GBP flat fee. After Stripe reviews and approves the connected account’s accepted offer, they receive a 20,000 GBP payout, and Stripe withholds 15% of each transaction we process until they pay the complete outstanding balance of 22,000 GBP.

## Capital integration options

You can onboard to Capital with an:

- [Embedded components integration](https://docs.stripe.com/capital/embedded-component-integration.md) (Recommended)
- [API integration](https://docs.stripe.com/capital/api-integration.md)

### Provide financing offers

Because of [regulations](https://docs.stripe.com/capital/regulatory-compliance.md#pecr) in the UK, Stripe can’t send marketing emails to your connected accounts on your behalf. To provide financing offers to connected accounts, use:

- **Embedded components**: Enable connected accounts to view and accept their offer directly in your platform’s UI. To learn more, see [Set up an embedded components integration](https://docs.stripe.com/capital/embedded-component-integration.md).
- **Stripe APIs**: Send custom emails with financing offers to your connected accounts (Stripe review and approval required). To learn more, see [Set up an API integration](https://docs.stripe.com/capital/api-integration.md).

Both integrations require your connected accounts to accept their financing in a Stripe-hosted Capital page or an embedded component.
![anatomy offer](https://b.stripecdn.com/docs-statics-srv/assets/offer-anatomy.25435a5c27bd4804965991bf4ba77e00.png)

Eligible connected accounts see this Stripe-hosted Capital page or interact with this page within the embedded component to accept a financing offer, regardless of your integration type.

## Emails

Stripe can send the following types of emails to your connected accounts if you don’t want to manage sending these emails yourself:

- **Transactional**: Updates about making payments to a financing balance, or reminders to pay any outstanding balances.
- **Errors and risk**: Notifications and alerts when there are errors, or if we require additional information from the connected account.

We classify these emails as transactional emails, and they’re delivered to suppressed or unsubscribed email addresses.

### Upload emails for connected accounts

To receive emails from Stripe, connected accounts must have an email saved with Stripe. You can confirm email addresses, and upload missing email addresses for all eligible connected accounts through the [Stripe Comms Center](https://dashboard.stripe.com/connect/comms_center/collect). You must have the necessary consent to share email addresses with Stripe.

### Customize and preview emails

To customize your branding in co-branded emails in the Dashboard:

1. Verify you have [administrator role access](https://docs.stripe.com/get-started/account/teams/roles.md).

2. In the Dashboard, go to **Settings** > **Connect** > [Emails](https://dashboard.stripe.com/settings/connect/emails).

3. Customize branding:

   Set your **Business name**, **Logo**, **Icon**, **Brand color**, and **Accent color**. Connected accounts see these values in the co-branded emails.

4. Customize your email domain:

   By default, emails are sent from a `stripe.com` address. You can [customize the domain](https://docs.stripe.com/get-started/account/email-domain.md), but not the specific address. We set the address automatically [based on the context of the message](https://support.stripe.com/questions/custom-email-domain), and send capital financing offer emails from `support@custom-domain.com`.

5. To preview an email, select an email from the **Preview** dropdown list.

6. To see a sent test email, click **Send email**. Open the email (as if you’re a connected account) and test any links in it.

### View sent email history

To see all the emails sent by Stripe to a connected account:

1. In the Dashboard, go to **Connect** > [Connected accounts](https://dashboard.stripe.com/connect/accounts).
2. Click the applicable connected account to open the details page.
3. At the bottom of the page, under **Emails to this account**, view the sent emails.
4. Click an email to see details such as the content, email address, and the delivered status (such as `successfully delivered` or `opened`).

## Capital servicing

Stripe Capital and our financial partner handle support and servicing for your connected accounts for inquiries related to Capital. To help connected accounts facing business challenges, our financial partner might offer extended payment plans to help them make smaller payments to meet their financing obligations. Connected accounts who want to discuss their financial obligations can reach out to our partner, YouLend, at [stripecapital@youlend.com](mailto:stripecapital@youlend.com).

## See also

- [Set up Capital](https://docs.stripe.com/capital/getting-started.md)
