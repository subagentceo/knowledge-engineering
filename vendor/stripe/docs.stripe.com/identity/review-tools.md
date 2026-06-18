# Review tools

Learn how to use manual reviews to supplement programmatic systems with human expertise.

While Stripe’s programmatic systems work to detect fraudulent verifications, you can perform manual reviews to provide an extra layer of fraud protection.

For example, you might want to review verifications when:

- Your customer submits a document from an unexpected country
- Your customer contacts you about a potential mistake in their verification
- Your business requirements differ from Stripe Identity’s default risk thresholds

Manual reviews and [insights](https://docs.stripe.com/identity/insights.md) in Stripe Identity allow you to examine unusual verifications and update verification statuses.

## Reviewing verifications 

You can review verifications in two ways. The [list view](https://docs.stripe.com/identity/review-tools.md#list-view) allows you to scan a list of verifications without seeing details about a verification, while the [detailed view](https://docs.stripe.com/identity/review-tools.md#detailed-view) provides more context.

### List view 

The list view contains information to help you quickly get a sense of the state of each verification. It includes information on overall verification status, document country, extracted name, and individual verification check status.

### Detailed view 

To see more information about a verification before making a decision, select the verification from the list view to go to a detailed view. In this view, you can inspect the individual images collected alongside available [insights](https://docs.stripe.com/identity/insights.md).

### Actions 

After you review a verification, take one of the following actions:

- **Override status**: Manually override the verification status to match your decision on whether or not the customer is verified. Stripe sends a [webhook event](https://docs.stripe.com/identity/handle-verification-outcomes.md) with the new status.
- **Add to blocklist**: Add the document to a blocklist to programmatically block future verifications completed with the same document.

### Biometric duplicates 

When processing new verification attempts, Stripe reviews your completed verifications for duplicate identities using biometric data (for example, based on a selfie) to make sure that each identity is unique.

If we detect a duplicate selfie, we’ll share a list of verification sessions where the duplicate is detected and how many times it’s found in each session.

## Blocklist 

To prevent Stripe Identity from using a document or selfie in programmatic verifications, add it to the blocklist. When a verification includes data that matches a blocklist entry, Stripe automatically sets that verification’s status to ‘unverified‘ until you review it in the Dashboard.

We support adding blocklist entries of the following types:

- **Document**: matches against the combination of the type of the document, the document number, and the document country.
- **Selfie**: matches against the facial mapping of the selfie image uploaded during verification.

> Manually review each verification marked as `unverified` by the blocklist. If any of them are incorrect, you can manually [override their verification status](https://docs.stripe.com/identity/review-tools.md#actions).

### Add a blocklist entry

From the [Identity](https://dashboard.stripe.com/identity) page in the Dashboard, find the Verification session containing the data you want to add to the blocklist. Click the overflow menu ​​(⋯) in the top right, then select **Add to blocklist**.

### Disable a blocklist entry

On the blocklist entry details page, click **Disable** in the top right. A disabled blocklist entry no longer causes Stripe Identity to automatically set verifications matching it to `unverified`.

You can’t re-enable a disabled blocklist entry. To restore a disabled entry, open the Verification session containing that document or selfie, and create a new entry with the same data.

> Redacting a Verification session deletes any blocklist entries created from it.

## Identity analytics 

On the [Analytics](https://dashboard.stripe.com/identity/overview) tab of the Identity Dashboard, you can view usage and verification rates over time and track user progression through verification funnel stages. This data comes from live verification sessions and excludes test sessions.

### About the data

Stripe calculates analytics for [VerificationSessions](https://docs.stripe.com/identity/verification-sessions.md) in the following ways:

- **Verifications created**: The total number of verifications created, including those that are abandoned, canceled, redacted, or otherwise unfinished.
- **Verifications started**: The number of verifications that a user visited and then started the verification process for.
- **Verification submitted**: The number of verifications that were completed and submitted by a user. You’re charged for every submitted verification, regardless of the outcome.
- **Verifications successful**: The number of verifications that were verified successfully after submission.
- **Completion rate**: The rate at which started verifications were completed and submitted by a user. Stripe divides the number of submitted verifications by the number of started verifications.
- **Verification rate**: The rate at which submitted verifications were verified successfully. Stripe divides the number of verified verifications by the number of submitted verifications.

Verification sessions can have multiple attempts (in case the user is unverified after an initial attempt). Each attempt generates a new [VerificationReport](https://docs.stripe.com/api/identity/verification_reports.md), and Stripe calculates a number of verification report metrics:

- **Verification reports created**: The number of verification attempts that were completed and submitted.
- **Verification reports successful**: The number of verification attempts that were verified successfully after submission.

## Best practices 

Use the following best practices to get the most out of reviews and perform them efficiently:

- **Focus on verifications where human judgment or manual review adds valuable insight to the determination of whether the customer’s identity is verified.**

  Our systems can make determinations on identity verification on the majority of verification sessions, but human judgment can improve accuracy for some cases.

- **Use insights and context from your business to make an informed decision.**

  Use the data in the [Insights](https://docs.stripe.com/identity/insights.md) section to see how Stripe made the decision on the document or face image. Combining Insights, knowledge about your business, and human judgment can help you make an informed choice about when to trust or ignore the risk signals that Identity indicates.

- **Apply what reviewers learn to develop fraud prevention strategies.**

  As reviewers sort through your verifications, they develop intuitions for fraud prevention that you can translate into updates to your integration with Identity.

- **Customize the process by presenting data unique to your business at review time.**

  Pass along any additional customer information as metadata so that all relevant information is in the Dashboard at the time of review.

- **Don’t slow down your customer.**

  A review implies some amount of time between verification completion and enabling the capabilities within your business for the customer. If your business has an inherent delay of this type (for example, Identity is a part of a more long form review process), taking the time to review a verification doesn’t change the customer experience. If you don’t have a built-in delay, adding a review process could slow down customers—consider the impact on them before you implement a review process. For example, build out workflows for handling situations when the verification status changes for a customer after they’ve already been verified.

- **Implement customer support workflows.**

  Prepare to handle customer requests regarding their verification status and offer a non-biometric method for identity verification if they request it.

## See also

- [Insights](https://docs.stripe.com/identity/insights.md)
