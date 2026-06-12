# Stripe

The Stripe plugin connects Claude to Stripe's MCP server, enabling AI-assisted payment integration development. It provides best practices guidance for implementing checkout flows, subscriptions, webhooks, and Connect platforms while helping you avoid deprecated APIs and follow Stripe's recommended patterns.

Key features include error explanation with code examples in your programming language, test card references organized by scenario, and guidance on modern Stripe APIs like CheckoutSessions, PaymentIntents, and Billing APIs. The plugin steers you toward Stripe-hosted checkout and Payment Element while warning against legacy patterns like the Charges API.

**How to use:**

Use `/explain-error` followed by a Stripe error code or message to get plain English explanations, common causes, and remediation code. Use `/test-cards` to quickly access test card numbers for different scenarios like declined payments, 3D Secure, or fraud testing. Ask Claude about Stripe best practices when implementing payment flows, and it will guide you using Stripe's recommended CheckoutSessions API and modern payment methods.