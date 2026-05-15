# Bring Your Own Key (BYOK)

Bring Your Own Key (BYOK) allows your customers to use their own customer-managed keys (CMKs) with WorkOS Vault instead of relying solely on WorkOS-managed keys. This feature enables you to offer your customers additional control over their encryption keys and help them meet specific compliance requirements.

## Overview

With BYOK, your customers maintain control over their key material while still leveraging Vault's encryption and data management capabilities. Customer-managed keys are used as key-encrypting keys (KEKs) in place of WorkOS-managed KEKs, providing an additional layer of security and compliance for your application's users.

## How BYOK works

When Vault is configured with BYOK:

1. **Key Matching**: Encryption operations are matched to customer CMKs based on the [key context](https://workos.com/docs/vault/key-context) provided
2. **Envelope Encryption**: Customer CMKs encrypt data-encrypting keys (DEKs), not the data directly
3. **Automatic Fallback**: Operations that don't match a customer's CMK configuration will use WorkOS-managed KEKs

### Key Context Matching

BYOK uses the same key context mechanism as standard Vault operations. When a customer's CMK is configured for specific context values, Vault automatically uses that key for matching operations.

**Example Configuration:**

- Customer CMK `key_abc` configured for `organization_id: "org_123"`
- Key context `{"organization_id": "org_123"}` → Uses customer CMK `key_abc`
- Key context `{"organization_id": "org_456"}` → Uses WorkOS-managed KEK

## Benefits

### Enhanced Security

- **Key Control**: Your customers maintain complete control over their encryption keys
- **Isolation**: Customer keys remain separate from other tenants' data
- **Audit Trail**: Customers have full visibility into their key usage and access patterns

### Compliance

- **Regulatory Requirements**: Help customers meet compliance standards that require customer-controlled keys
- **Data Sovereignty**: Enable customers to ensure encryption keys remain within their control
- **Risk Management**: Reduce customer dependency on third-party key management

## Use Cases

### Multitenant Applications

Allow different customers to use their own CMKs while maintaining a single Vault integration:

```javascript
// Customer A data - uses Customer A's CMK
await vault.createObject({
  name: 'customer-a-pii',
  value: '{"fullname": "customer_a_name"}',
  context: { organization_id: 'customer_a' },
});

// Customer B data - uses Customer B's CMK
await vault.createObject({
  name: 'customer-b-pii',
  value: '{"fullname": "customer_b_name"}',
  context: { organization_id: 'customer_b' },
});
```

### Compliance Sensitive Data

Allow customers to apply stricter key controls to specific data types:

```javascript
// PCI data - uses customer's CMK
await vault.createObject({
  name: 'customer-123-payments',
  value: '{"creditCard": "4111-1111-1111-1111"}',
  context: {
    organization_id: 'customer_123',
  },
});

// General data - uses WorkOS-managed keys
await vault.createObject({
  name: 'customer-123-preferences',
  value: '{"preference": "dark_mode"}',
  context: {
    data_type: 'preferences',
  },
});
```

### Geographic Data Residency

Allow customers to ensure their encryption keys remain in specific regions:

```javascript
// EU data - uses customer's EU-based CMK
await vault.createObject({
  name: 'customer-789-pii',
  value: '{"userEmail": "user@example.eu"}',
  context: {
    organization_id: 'customer_789',
  },
});
```

## Configuration

BYOK configuration is managed through your WorkOS dashboard and Admin Portal. Contact your WorkOS representative to enable BYOK for your application.

### Prerequisites

- Your customers must have compatible key management systems (AWS KMS, Azure Key Vault, Google Cloud KMS)
- Proper IAM permissions for WorkOS Vault to access customer keys

### Generate Admin Portal link

Navigate to the organization of your customer who will configure their CMK. Generate a unique portal link by clicking "Invite admin" and selecting "Bring Your Own Key" from the feature selection.

![Generate admin portal link](https://images.workoscdn.com/images/d374bc73-7cdc-441c-b177-82c4ae604db7.png?auto=format\&fit=clip\&q=80)

### Share link with your customer's IT team

The Admin Portal will walk an IT contact through the setup and configuration of the CMK. It includes screenshots for using the cloud provider of choice to create a key and set the appropriate permission in IAM policies to allow Vault to use the key.

![Share link with IT](https://images.workoscdn.com/images/7f237529-584b-4a98-b17e-2ce4bf6c1e08.png?auto=format\&fit=clip\&q=80)

### Confirm successful Admin Portal setup

The final step of the Admin Portal setup flow will validate that Vault can use the CMK the IT contact configured. If they see "Setup is complete", Vault will use the customer's CMK whenever an operation includes their organization id as context.

![Confirm CMK setup success](https://images.workoscdn.com/images/f46f7009-3cf5-4706-a37e-691768d63440.png?auto=format\&fit=clip\&q=80)

### View CMK under Organization details

A Key details card will appear under Organization details, which shows configuration information, CMK active state, and the key context associated with the CMK.

![View key details](https://images.workoscdn.com/images/54c026c7-f3b0-497a-bb48-83661ba1ae3e.png?auto=format\&fit=clip\&q=80)
