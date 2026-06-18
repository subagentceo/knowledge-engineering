# Connect and the Accounts v2 API

Create connected accounts with a unified identity across Stripe.

As a Connect platform, you enable your connected accounts to accept payments. You can also accept payments from your connected accounts when they purchase products or subscribe to your services. In the Accounts v1 API, associating these purchases and subscriptions with your connected account requires a separate `Customer` object that you manually associate with the connected account’s `Account` object.

The Accounts v2 API allows you to create one `Account` object that supports all interactions with your connected account, so you don’t need to create and track separate `Customer` objects.

## Accounts v2 API

The Accounts v2 API provides:

- **Flexible account configurations**: Enable or change a connected account’s capabilities and compatibility with Stripe features by updating its Account’s configurations. Each capability belongs to a particular configuration.
- **Centralized identity data**: When you add a configuration to an existing Account to enable additional functionality, you don’t have to re-collect requirements that they already provided.
- **A single API for connected accounts and customers**: In most cases, you can represent any customer with an Account object. That lets you use the Accounts v2 API to manage both connected accounts and customers. You no longer have to use the Customers API at all.

## Represent connected accounts using Accounts v2

In the Accounts v2 API, you assign one or more configurations to an Account to enable different functionality. For example:

- Assign the `merchant` configuration to allow the Account to accept payments from customers. The `merchant` configuration includes the `card_payments` and `stripe_balance.payouts` (replacing v1 `payouts`) capabilities.
- Assign the `customer` configuration to charge the Account as a customer. You can use an Account with the `customer` configuration instead of a Customer object when creating a Subscription.
- Assign the `recipient` configuration to allow the Account to receive transfers. The `recipient` configuration includes the `stripe_balance.stripe_transfers` (replacing v1 `transfers`) capability, which is required to use indirect charges.

The following example creates an Account using API v2. Notice that the structure of the Account object differs from the structure of an Account object in API v1.

> #### API v2 response structure
> 
> By default, Accounts v2 API calls return values for certain properties and null for other properties, regardless of their actual values. To retrieve additional property values, request them using [the include parameter](https://docs.stripe.com/api-includable-response-values.md).

```curl
curl -X POST https://api.stripe.com/v2/core/accounts \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-01-28.clover" \
  --json '{
    "contact_email": "jenny.rosen@example.com",
    "display_name": "Jenny Rosen",
    "dashboard": "full",
    "identity": {
        "business_details": {
            "registered_name": "Furever"
        },
        "country": "us",
        "entity_type": "company"
    },
    "configuration": {
        "customer": {
            "capabilities": {
                "automatic_indirect_tax": {
                    "requested": true
                }
            }
        },
        "merchant": {
            "capabilities": {
                "card_payments": {
                    "requested": true
                }
            }
        }
    },
    "defaults": {
        "currency": "usd",
        "responsibilities": {
            "fees_collector": "stripe",
            "losses_collector": "stripe"
        },
        "locales": [
            "en-US"
        ]
    },
    "include": [
        "configuration.customer",
        "configuration.merchant",
        "identity",
        "requirements"
    ]
  }'
```

In the v1 API, you must create an Account object for a connected account to accept payments, and a separate `Customer` object to associate that same business with payments they make to your platform. Accounts v1 and Customers v1 have no explicit relationship, so you must manage those objects separately and maintain a map of Account IDs to Customer IDs.

### Create Account

```curl
curl https://api.stripe.com/v1/accounts \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d country=US \
  -d "controller[fees][payer]=application" \
  -d "controller[losses][payments]=application" \
  -d "controller[stripe_dashboard][type]=express"
```

### Create Customer

```curl
curl https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "name=Jenny Rosen" \
  --data-urlencode "email=jenny.rosen@example.com" \
  -d "metadata[account_id]=acct_1234"
```

## Use Accounts as customers

Any API that accepts a `customer` parameter also accepts a `customer_account` parameter where you can pass a customer-configured Account ID.

```curl
curl https://api.stripe.com/v1/setup_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Version: 2025-09-30.preview" \
  -d customer_account=acct_123 \
  -d "payment_method_types[]=card" \
  -d confirm=true \
  -d usage=off_session
```

Learn more about [using Accounts as customers](https://docs.stripe.com/accounts-v2/use-accounts-as-customers.md).

## Connect platforms using Accounts v1 and Customers v1

Stripe still supports the Accounts v1 and Customers v1 APIs. However, you can use the Accounts v2 API to manage Accounts created using the Accounts v1 API, including assigning them the `customer` configuration.

## Considerations

Stripe discourages indefinitely maintaining both Accounts API versions simultaneously.

If your platform [uses OAuth](https://docs.stripe.com/stripe-apps/api-authentication/oauth.md) to authenticate with connected accounts, continue using the v1 APIs.
