# Revenue Recognition rules

Customize rules to handle revenue treatments to your business.

Configure [Revenue Recognition rules](https://dashboard.stripe.com/revenue-recognition/rules) to define revenue treatments specific to your business.

Stripe Revenue Recognition allows you to configure custom rules to handle revenue treatments specific to your business needs. For example, you can configure a rule to:

- Categorize an *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) line item as a tax or fee.
- Book a transaction amount or invoice line item as a passthrough fee.
- Exclude transactions from specific customers or test invoices.
- Amortize revenue over a specified time period relative to payment or invoice finalization date.
- Recognize revenue after a specific time period to model a future *fulfillment* (Fulfillment is the process of providing the goods or services purchased by a customer, typically after payment is collected) schedule.
- Allocate multiple revenue treatments to a single transaction amount.

Rules are typically applied to reports within 24 hours. Rules that have successfully been applied in the latest report have an `active` status. Rules that haven’t remain in a `processing` status.

## Default rules

Stripe Revenue Recognition provides a set of default rules to model the [methodology](https://docs.stripe.com/revenue-recognition/methodology.md) for handling common Stripe resources.

- For invoice line items with service periods, the line item amount amortizes evenly over its service period. If a period isn’t set on an invoice line item, the amount is recognized entirely when the invoice finalizes.
- Other payments not made through an invoice are recognized immediately upon payment if no service period or fulfillment information exists, or by the [imported](https://docs.stripe.com/revenue-recognition/data-import.md) service period or fulfillment data.
![Default rules](https://b.stripecdn.com/docs-statics-srv/assets/default-rules.1cdaa035a358fec4294971ba23bddaa1.png)

## Custom rules

Custom rules override Stripe’s default revenue treatment behaviors where applicable and you can add or modify them on the Stripe Dashboard.

You can apply rules to:

- *Products* (Products represent what your business sells—whether that's a good or a service)
- *Customers* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments)
- [Invoice line items](https://docs.stripe.com/api/invoice-line-item/object.md)
- [Other payments](https://docs.stripe.com/api/charges.md) (that is, payments that aren’t associated with invoices)
- [Credit Notes](https://docs.stripe.com/api/credit_notes.md)

See how to [create a rule and define revenue treatments](https://docs.stripe.com/revenue-recognition/rules/create-a-rule.md). You can also explore sample rules on tax treatment, pass-through fees, exclusion, and custom time periods.

## Rule ordering and hierarchy

Each transaction can only have one rule applied to it when processing revenue reports. In situations where a single transaction fits the “Apply-to” criteria for multiple rules, rule hierarchy determines which rule to apply to the transaction. The higher a rule is ranked on the list, the higher the priority it’s assigned.

You can rearrange the order of the rules by clicking **Change rule order** as shown below:
![Rules](https://b.stripecdn.com/docs-statics-srv/assets/rules.076bd00821d7a78ec4d541afe8c9b669.png)

After clicking **Change rule order**, you can reorder the rules to adjust their priorities.
![Rule order](https://b.stripecdn.com/docs-statics-srv/assets/rule-order.6232b5130188f7e9b253d7f9d197e3f0.png)

## Best practices for effectively maintaining your rules

As your business grows, it’s important to make sure you regularly maintain your rules to ensure the accuracy of your revenue reports. The following are some best practices to keep rules correct for your Revenue Recognition reports.

- **Know when to create a rule:** When applied correctly, Stripe’s default rules and revenue treatment methodology for handling *subscription* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis) events accurately recognize and defer revenue for businesses that require more control over their unique use.

- **Regularly monitor rules to make sure they’re updated:** Evolve your rules accordingly for billing models, customer types, and edge cases that can regularly change. To make sure that revenue treatments remain predictable, periodically check your rules so they’re up-to-date in terms of hierarchy and effective period.

- **Check if your accounting period is open or closed when applying new rules:** If the effective period for a new rule overlaps with a closed accounting period, it generates corrections if you retroactively apply the rules to transactions from past (closed) accounting periods. To prevent this, reopen your books by opening your accounting period prior to adding the rule.
