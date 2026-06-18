# Handle Inactive Users

## Introduction

Traditionally, user provisioning involves the ingestion of user information from various providers (either through SCIM or non-SCIM integrations). This process typically includes categorizing users into states such as `active`, or `inactive` as provided by the IdP data source.

However, the challenge arises when businesses need to handle these `inactive` users differently based on their unique operational and security requirements. Some developers may prefer a security-first approach, automatically deleting these users to enhance data security, while others may opt to retain this information for reactivation processes or comprehensive directory management.

***

## Configuration

To provide improved security and customizability, you can choose how `inactive` users are handled during the provisioning process. Here is an overview of the two options available:

### Secure flow (default)

By selecting this option, customers can opt for a security-focused workflow. Any user marked as `inactive` will be automatically deleted from the directory, resulting in cleaner and potentially more secure data. This approach reduces the data footprint and minimizes potential security risks associated with unused accounts.

### Custom management flow

Alternatively, customers can choose to maintain the existing flow, keeping the `inactive` users in the directory. This approach supports reactivation processes and ensures a comprehensive view of the directory, allowing for easier reintegration of users when needed.

> Contact [customer support](mailto:support@workos.com) to enable custom management flow for your environment.

![A breakdown of the different events for each configuration path on handling inactive users.](https://images.workoscdn.com/images/2304739c-17e9-4521-96d2-81fa3fa83110.png?auto=format\&fit=clip\&q=80)

## Weighing the tradeoffs

Both options offer distinct advantages, and the right choice depends on your organization's unique needs and security posture:

### Security vs. flexibility

The automatic deletion option prioritizes data security by minimizing the data footprint, while the customized management option provides flexibility for reactivation flows and comprehensive directory oversight.

### Compliance and regulations

Depending on industry regulations and compliance requirements, one option may align better with your organization's obligations.

### Operational efficiency

Consider how each option impacts operational efficiency using WorkOS to handle a set of the computation for you.

### Reactivation

If a user is temporarily removed, does the same user information need to be retained when they return? A new directory user will be created by default on return, whereas using the `inactive` user will retain the same information on reactivation.
