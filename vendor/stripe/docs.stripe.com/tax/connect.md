# Use Stripe Tax with Connect

Understand how Stripe Tax can help your platform and your connected accounts comply with tax obligations.

Stripe Tax supports [Connect](https://docs.stripe.com/connect.md) by helping you calculate and collect taxes. It provides transactional reports to help with tax reporting and filing for your platform or your connected accounts.

The first step for using Stripe Tax with Connect requires you to **determine which entity has the obligation to collect and report taxes**. The entity that’s liable for tax might be you or your connected account, depending on your business model, regulations (for example, [marketplace laws in the US and EU](https://stripe.com/en-nl/guides/guide-to-sales-tax-and-vat-for-marketplace-sellers)), or the transaction details, such as the order amount or the type of goods being sold.

## Use cases

Stripe Tax is designed to support different multi-party use cases:

| Use case                                                                       | Use when                                                                                                                                                                                                                                                  | Examples                                                                                                                                     |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [Tax for software platforms](https://docs.stripe.com/tax/tax-for-platforms.md) | - You’re a SaaS platform that enables other businesses with software services to reach their customers.
  - Your *connected accounts* assume responsibility for collecting and remitting taxes.                                                           | - An e-commerce platform like Shopify or Squarespace that enables businesses to build their own online stores to sell directly to customers. |
| [Tax for marketplaces](https://docs.stripe.com/tax/tax-for-marketplaces.md)    | - You’re a marketplace that connects buyers and sellers on a single platform, typically through websites or apps where products are listed by various third-party vendors.
  - Your *platform* assumes responsibility for collecting and remitting taxes. | - An e-commerce marketplace like Etsy or Amazon that allows a single shopping cart for goods sold by multiple businesses.                    |

[Stripe Connect’s distinction between SaaS platforms and marketplaces](https://docs.stripe.com/connect/how-connect-works.md#use-cases) doesn’t strictly correspond to the tax definition of marketplaces that are responsible for tax collection. Consult with a tax advisor who understands your business model to determine the tax obligations for both your platform and your connected accounts.

## See also

- [Tax for platforms](https://docs.stripe.com/tax/tax-for-platforms.md)
- [Tax for marketplaces](https://docs.stripe.com/tax/tax-for-marketplaces.md)
