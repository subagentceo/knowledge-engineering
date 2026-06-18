# PSD2 Compliance: A Checklist to Secure Payments and Fraud Prevention

Home/Blog

Table of Contents

Explore AI Summary

![chat-gpt-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![chat-gpt-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![google-ai-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![google-ai-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![perplexity-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![perplexity-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![grok-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![grok-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![claude-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![claude-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

Share post on:

*   
*   
*   
*   

*   Fraud
*   Payment Fraud

# PSD2 Compliance: A Checklist to Secure Payments and Fraud Prevention

The rise in online and mobile payments has transformed how we pay, but it’s also created new opportunities for fraud. That’s where PSD2 comes…

![Sift Author Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20504%20504'%3E%3C/svg%3E)

Sift Trust and Safety Team

Sep 16, 2025

![black-dot](https://sift.com/wp-content/uploads/2024/12/black-dot.svg)

![Press-Release-Tile-Image-Color-Pills\_Blue](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

The rise in online and mobile payments has transformed how we pay, but it’s also created new opportunities for fraud. That’s where PSD2 comes in. Introduced to strengthen security, improve competition, and encourage innovation, the Second Payment Services Directive (PSD2) set out to change how payment service providers across Europe and in the UK handle digital payments.  
  
Even though Brexit has shifted the UK regulatory landscape, PSD2 still underpins key security requirements like Strong Customer Authentication (SCA). 

In this article, we’ll walk through a practical PSD2 compliance checklist, explain how to avoid common pitfalls, and explore what’s coming next with PSD3 in the EU and the UK. 

## What Is PSD2 and Who Does It Apply To?

PSD2 is the European Union’s revised framework for regulating digital payments and payment service providers. It was adopted in 2015 and came into force in 2018, replacing the original PSD from 2007.

Although the UK has left the EU, PSD2 was on-shored as the UK’s Payment Services Regulations 2017, and is still enforced by the Financial Conduct Authority (FCA).

### PSD2 applies to:

*   Banks and building societies
*   Payment institutions and e-money firms
*   Payment gateways and processors
*   Fintechs offering open banking services
*   Any merchant accepting online card payments or initiating A2A (account-to-account) payments

### PSD2’s core aims:

*   Increase security and reduce payment fraud
*   Promote innovation via open banking
*   Protect consumers through clear rules on authentication and consent

## Why PSD2 Compliance Still Matters in 2025

While talk of **PSD3** and UK reform is gathering pace, the current PSD2 framework remains binding in the UK for now and compliance remains actively supervised by the FCA.

Here’s why it still matters:

*   **Strong Customer Authentication (SCA)** is required for nearly all remote and electronic payments.
*   **Non-compliance leads to soft declines**, where issuers refuse to authorise transactions without proper authentication.
*   **Fraud risk is shifting**, with synthetic identity fraud and social engineering targeting less-protected flows.
*   **New payment models**, such as BNPL, crypto off-ramps, and digital wallets, still need to follow SCA logic.
*   The FCA has made clear that payment firms must show robust fraud detection and strong audit trails.

## PSD2 Compliance Checklist for UK Businesses

If you’re a merchant, payment gateway, or fintech operating in the UK, here’s a helpful checklist to help you stay on track with PSD2:

*   **Implement Strong Customer Authentication (SCA):** All card-not-present and open banking payments must use two-factor authentication based on possession, knowledge, and/or inherence (e.g. passcode + biometric). Most businesses use **3D Secure 2.2 or above** to meet these requirements.
*   **Use SCA exemptions wisely:**PSD2 allows for certain exemptions, such as:
    *   Low-value payments under **£45**
    *   Whitelisted merchants (trusted beneficiaries)
    *   Transaction Risk Analysis (TRA) if your fraud rate is low
    *   Merchant-Initiated Transactions (MITs) like subscriptions
*   **Enable dynamic linking for open banking payments:** For account-to-account (A2A) transactions, each authentication must be uniquely linked to the transaction amount and payee details.
*   **Secure your APIs and endpoints:** Use strong encryption (e.g. TLS 1.2+), digital certificates, and proven security protocols for account access services (AISPs and PISPs).
*   **Monitor fraud rates and challenge outcomes:** Keep a close eye on:
    *   Challenge rate (how often SCA is triggered)
    *   Approval rate (how many payments succeed)
    *   Soft decline rate (when issuers reject due to missing SCA)
    *   Chargeback and fraud rate (especially on exempted flows)
*   **Maintain a full audit trail:** The FCA expects firms to demonstrate their authentication logic and SCA exemption usage. Store logs and consent records securely.
*   **Update your fallback flows:** Ensure your checkout can handle cards that don’t support 3D Secure 2.x, or respond gracefully to issuer errors and app-based failures.
*   **Educate internal and external users:** Train customer support and risk teams on SCA flows. Use clear language at checkout to explain why authentication is required.  
    

## Common PSD2 Compliance Mistakes to Avoid

Even businesses with strong fraud controls can fall into compliance traps. Here are a few of the most common issues:

*   **Not retrying soft-declined payments with 3DS:** If a payment is declined due to missing SCA, your system should automatically reattempt it with authentication.
*   **Overusing exemptions without monitoring fraud:** Using TRA or low-value exemptions? You must maintain a fraud rate below defined thresholds, otherwise, the exemption may be revoked by issuers.
*   **Forgetting mobile UX:** Friction in 3D Secure challenges, especially on mobile, may lead to drop-off. Make sure your flows support biometric, app-based, or WebAuthn options.
*   **Neglecting open banking security:** For account access or initiation services, failing to enforce **dynamic linking** and strong consent flows can lead to FCA scrutiny.
*   **Assuming wallet payments always meet SCA:** Not all wallet transactions automatically satisfy SCA and especially where tokenisation or device binding hasn’t occurred. Always check how the wallet provider handles authentication. 

## PSD3 and PSR

PSD3 is the third iteration of the European Union’s Payment Services Directive, introduced by the European Commission in 2023 to modernise digital payment regulation across the EU. It’s designed to address gaps in PSD2, improve fraud prevention (including synthetic identity and social engineering), and adapt to the growing role of fintechs, open banking, and digital wallets.

PSD3 is being introduced alongside a new Payment Services Regulation (PSR), which, unlike directives, will apply directly across EU member states without requiring national transposition.

#### Key features of PSD3 include:

*   Stronger identity verification requirements for onboarding new users
*   Tighter rules on Strong Customer Authentication (SCA) and exemption management
*   Real-time fraud monitoring and incident reporting obligations
*   Increased supervision of fintechs and non-bank payment providers
*   Expanded access to Open Banking APIs, with improved technical and performance standards

**Important for UK businesses:**  
  
The UK is no longer bound by EU directives post-Brexit. While PSD3 won’t apply automatically, firms that operate in the EU or serve EEA-based customers will still need to comply. Domestically, the UK is working on its own Smarter Regulatory Framework, which is expected to replace PSD2-era rules with a more tailored set of Payment Services Regulations in the coming years.

## Conclusion

PSD2 compliance is more than a regulatory checkbox these days and it’s becoming the foundation for safer payments and smarter fraud prevention.

As fraud threats evolve and new legislation like PSD3 and the UK’s Payment Services Regulations come into force, businesses will need to stay agile. That means continuously refining SCA flows, revisiting exemption strategies, and investing in stronger authentication and real-time fraud tools.

Share post on:

*   
*   
*   
*   

## You may also like

![blog image](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

*   Digital Trust

### How to Reduce Friction Without Compromising Fraud Security

![dummy user](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20434'%3E%3C/svg%3E)

Sift Trust and Safety Team

Jun 8, 2026

![black-dot](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

8 min read

![blog image](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

*   Digital Trust

### The Operational Blueprint for Modern Fraud Teams: How to Design a Fraud Organization That Actually Scales

![dummy user](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20434'%3E%3C/svg%3E)

Kevin Lee

May 29, 2026

![black-dot](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

11 min read

![blog image](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

*   Data & Insights

### How to Benchmark Fraud Performance and Find Hidden Gaps

![dummy user](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20434'%3E%3C/svg%3E)

Sift Trust and Safety Team

May 26, 2026

![black-dot](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

7 min read

## Dare to grow differently.

Flip the switch on fraud-fueled fear. Make risk work for your business and scale securely into new markets with Sift’s AI-powered platform.

see sift in action

*   ![remitly](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)
    
*   ![swan](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20560%20160'%3E%3C/svg%3E)
    
*   ![yelp-white](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)
    
*   ![taptap](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)
    

*   ![remitly](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)
    
*   ![swan](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20560%20160'%3E%3C/svg%3E)
    
*   ![yelp-white](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)
    
*   ![taptap](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)