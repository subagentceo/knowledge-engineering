# High risk merchant lists

Learn the criteria for inclusion in MATCH and VMSS lists.

*Card networks* (A network that processes the transactions of a particular card brand. It might be an intermediary in front of an issuing bank as with Visa or Mastercard, or a standalone entity as with American Express), such as Visa and Mastercard, operate databases known as Terminated Merchant Files (TMFs) that contain information about accounts that have been closed by credit card processors around the world for high chargebacks or violations of card brand rules.

All payment processors must check these databases when accepting a new user, and must also add merchants to the database if they close the account and it meets TMF criteria.

Being placed on a TMF can have serious effects. While they’re only supposed to be informational tools during the account application process, many entities refuse to accept businesses or individuals listed on a TMF. For this reason, it’s important to be aware of TMF criteria and make sure you avoid becoming eligible.

The most common lists are Mastercard’s MATCH and Visa’s VMSS. In the following sections, we describe how MATCH and VMSS qualification works and what happens to MATCH entries.

## MATCH

MATCH stands for Mastercard Alert to Control High-risk Merchants system. MATCH is Mastercard’s database of Terminated Merchant Files (TMFs) that contain information about accounts that have been closed by credit card processors around the world for high chargebacks or violations of card brand rules.

### Criteria for MATCH qualification

When a relationship ends between a business and a credit card processor, the processor must determine whether the business meets criteria to be placed on MATCH.

If any MATCH criteria are satisfied, the processor must add information about the business to MATCH within one business day of termination or within one business day of the account becoming eligible for MATCH after termination.

#### MATCH qualitative criteria

The majority of MATCH criteria, or “reason codes,” involve breaches of card network rules, including illegal activity and collusion. These 11 reason codes, and the exact Mastercard definition, are listed below.

The Identity Theft reason code should be used when a fraudulent account is opened with stolen information, and the listing of this information on MATCH shouldn’t hamper the legitimate identity holder from opening a processing account. It instead serves as a warning to the credit card processor that the application may contain stolen identity information.

| Code | Reason                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Account Data Compromise                        | An occurrence that results, directly or indirectly, in the unauthorized access to or disclosure of Account data.                                                                                                                                                                                                                                                                                                                                                                                |
| 2    | Common Point of Purchase                       | Account data is stolen at the Merchant and then used for fraudulent purchases at other Merchant locations.                                                                                                                                                                                                                                                                                                                                                                                      |
| 3    | Laundering                                     | The Merchant was engaged in laundering activity. Laundering means that a Merchant presented to its Acquirer Transaction records that weren’t valid Transactions for sales of goods or services between that Merchant and a bona fide Cardholder.                                                                                                                                                                                                                                                |
| 7    | Fraud Conviction                               | There was a criminal fraud conviction of a principal owner or partner of the Merchant.                                                                                                                                                                                                                                                                                                                                                                                                          |
| 8    | Mastercard Questionable Merchant Audit Program | The Merchant was determined to be a Questionable Merchant as per the criteria set forth in the Mastercard Questionable Merchant Audit Program.                                                                                                                                                                                                                                                                                                                                                  |
| 9    | Bankruptcy/Liquidation/Insolvency              | The Merchant was unable or is likely to become unable to discharge its financial obligations.                                                                                                                                                                                                                                                                                                                                                                                                   |
| 10   | Violation of Standards                         | With respect to a Merchant reported by a Mastercard Acquirer, the Merchant was in violation of one or more Standards that describe procedures to be employed by the Merchant in Transactions in which Cards are used, including, by way of example and not limitation, the Standards for honoring all Cards, displaying the Marks, charges to Cardholders, minimum/ maximum Transaction amount restrictions, and prohibited Transactions set forth in Chapter 5 of the Mastercard Rules manual. |
| 11   | Merchant Collusion                             | The Merchant participated in fraudulent collusive activity.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 12   | PCIDSS Non-Compliance                          | The Merchant failed to comply with Payment Card Industry (PCI) Data Security Standard (DSS) requirements.                                                                                                                                                                                                                                                                                                                                                                                       |
| 13   | Illegal Transactions                           | The Merchant was engaged in illegal Transactions.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 14   | Identity Theft                                 | The Acquirer has reason to believe that the identity of the listed Merchant or its principal owners was unlawfully assumed for the purpose of unlawfully entering into a Merchant Agreement.                                                                                                                                                                                                                                                                                                    |

#### MATCH quantitative criteria

Two MATCH reason codes have specific numeric thresholds defined by Mastercard for when processors must add accounts to MATCH.

These reason codes, which involve chargeback and fraud activity on an account, are the most common reasons for being added to MATCH, and can affect businesses that aren’t engaged in illegal or rule-violating activity. These reason codes are as follows:

| Code | Reason                | Description                                                                                                                                                                                                                                                                                                                                                  |
| ---- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 4    | Excessive Chargebacks | With respect to a Merchant reported by a Mastercard Acquirer, the number of Mastercard chargebacks in any single month exceeded 1% of the number of Mastercard sales Transactions in that month, and those chargebacks totaled USD 5,000 or more.                                                                                                            |
| 5    | Excessive Fraud       | The Merchant effected fraudulent Transactions of any type (counterfeit or otherwise) meeting or exceeding the following minimum reporting Standard: the Merchant’s fraud-to-sales dollar volume ratio was 8% or greater in a calendar month, and the Merchant effected 10 or more fraudulent Transactions totaling USD 5,000 or more in that calendar month. |

### Additional information on excessive chargebacks and fraud

These MATCH reason codes are separate from card brand chargeback and fraud monitoring programs operated by Visa and Mastercard. However, as defined, the excessive chargebacks criteria only applies to activity on Mastercard cards, even though MATCH is required by all major card networks. If dispute activity doesn’t take place on a Mastercard card, it wouldn’t qualify toward MATCH counts. Other card networks may ask for businesses to be listed on MATCH if those businesses hit the “excessive” stages of their card brand monitoring programs or are fined as part of those programs.

A month is defined as a calendar month. For example, if a processor were evaluating MATCH eligibility from the month of January, they would look at the number of transactions in January and the number of chargebacks in January—not the number of chargebacks from transactions made in January.

After a business meets the excessive chargebacks or fraud MATCH criteria in a calendar month, the merchant must be added to MATCH if the processing relationship is terminated, even if the processing relationship isn’t ended in that calendar month. For example, if a business only meets MATCH criteria in February, and the processing relationship isn’t ended until September, the processor is still required to add information to MATCH even though the qualifying activity took place in February. Additionally, even if a business doesn’t meet MATCH criteria when the relationship is initially terminated, it can still qualify for MATCH if the criteria are met afterward—for example, if chargebacks are initiated after termination.

#### Example qualification data

Take the following sample data from a calendar month:

- Number of Mastercard transactions: 125
- Number of Mastercard chargebacks: 6
- Ratio of chargebacks to transactions: (6/125) = 4.8%
- Volume of Mastercard chargebacks: 6250 USD

In this case, the business would qualify for MATCH for excessive chargebacks if the processing relationship later terminates. It doesn’t matter if chargebacks are later reversed or won by the merchant.

There is no minimum number of chargebacks for MATCH qualification for excessive chargebacks.

### Information added to MATCH

The card networks require that the following information be added to MATCH if available:

- Business Legal Name and DBA
- Business Address
- Business Phone Number
- Business Tax ID
- Business URL
- Principal Owner Name
- Principal Owner Address
- Principal Owner Phone Number
- Principal Owner Tax ID
- Account Opening Date and Termination Date
- MATCH Reason Code

Mastercard doesn’t assess the accuracy of MATCH listings.

### Removal from MATCH

Unfortunately, Stripe—or any other processor—usually can’t remove an account’s information from MATCH upon request. A processor can only remove a MATCH entry if:

- The processor added the business to MATCH in error.
- The listing is for MATCH reason code 12 (Payment Card Industry Data Security Standard Noncompliance) and the processor has confirmed that the business has become compliant with the Payment Card Industry Data Security Standard.

If you believe either of those two situations exist, you’ll need to reach out to the processor that listed your information on MATCH to be removed. Records remain on the MATCH system for five years before being automatically purged by Mastercard.

### Next steps if you’re listed on MATCH

If you’re listed on MATCH, you’re likely to find out when you attempt to sign up for a new processor. MATCH is only supposed to be used as an informational tool by processors during the application process; however, the presence of a MATCH listing often means that an application is declined.

You’ll need to reach out to your previous processor to find out why your information was added to MATCH. Note, however, that MATCH criteria are determined by Mastercard and processors are required to follow this criteria. Stripe can’t remove a merchant that met the “excessive chargebacks” criteria even if the business has remediated the issues leading to chargebacks, for example.

Due to banking partner restrictions, Stripe generally can’t process for businesses listed on MATCH unless extenuating circumstances apply, such as the case of a legitimate merchant who previously had their identity information stolen.

If you require assistance with a dispute, [contact Stripe support](https://support.stripe.com/contact).

## VMSS

VMSS is Visa’s database of Terminated Merchant Files (TMFs) that contain information about accounts that have been closed by credit card processors around the world for high chargebacks or violations of card brand rules.

### Criteria for VMSS Qualification

When a relationship ends between a business and a credit card processor, the processor must determine whether the business meets the criteria to be placed on VMSS.

If any VMSS criteria are satisfied, the processor must add information about the terminated business to VMSS.

#### VMSS qualitative criteria

The majority of VMSS criteria, or “reason codes,” involve breaches of card network rules, including illegal activity and collusion. See the 13 reason codes and the exact Visa definition below.

The `Identity Theft` reason code applies when a fraudulent account is opened with stolen information, and the listing of this information on VMSS shouldn’t hamper the legitimate identity holder from opening a processing account. It instead serves as a warning to the credit card processor that the application might contain stolen identity information.

| Code | Reason                                               | Description                                                                                                                                                                                                                    |
| ---- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 23   | Transaction Laundering                               | The Merchant or Third Party Agent misrepresented the source of submitted transactions (unauthorized aggregation), and/or submitted transactions on behalf of another Merchant (factoring).                                     |
| 24   | Illegal Transactions                                 | The Merchant or Third Party Agent submitted unlawful and/or prohibited transactions into the payment system.                                                                                                                   |
| 25   | Visa Risk Compliance Program Identification          | The Merchant or Third Party Agent was terminated at the Acquirer’s discretion after identification in a Visa risk compliance program and didn’t adequately remediate.                                                          |
| 26   | Merchant Collusion                                   | The Merchant or Third Party Agent colluded to commit fraud.                                                                                                                                                                    |
| 27   | Common Point of Purchase (CPP)                       | The Merchant or Third Party Agent was identified as a location where account data from legitimate transactions was compromised for use in subsequent fraudulent activity (including skimming) and didn’t adequately remediate. |
| 28   | Fraud Conviction                                     | The principal owners of a Merchant outlet or Third Party Agent was/were convicted of a fraud crime.                                                                                                                            |
| 29   | Bankruptcy/Liquidation/Insolvency                    | The Merchant or Third Party Agent can’t fulfill its financial obligations due to potential or actual bankruptcy, insolvency, or suspension of business operations.                                                             |
| 30   | Violation of Merchant or Third Party Agent Agreement | The Merchant or Third Party Agent breached their agreement.                                                                                                                                                                    |
| 31   | Violation of the Visa Rules                          | The Merchant or Third Party Agent violated the Visa Rules exposing the Acquirer of the payment system to undue risk.                                                                                                           |
| 32   | Account Information Security Program Noncompliance   | The Merchant or Third Party Agent was non-compliant with the Payment Card Industry Data Security Standard (PCI DSS) and/or the Payment Application Data Security Standard (PA-DSS) requirements.                               |
| 33   | Account Data Compromise                              | The Merchant or Third Party Agent suffered a data breach, directly or indirectly resulting in an unauthorized disclosure of payment account and/or transaction information.                                                    |
| 34   | Merchant Identity Theft                              | The Merchant application was submitted using principal owner and /or corporate officer information belonging to individuals that were never party to the Merchant agreement.                                                   |
| 35   | Disqualification from the Visa Payment System        | Visa disqualified the Merchant or Third Party Agent from participating in the Visa payment system.                                                                                                                             |

#### VMSS quantitative criteria

Two VMSS reason codes have specific numeric thresholds defined by Visa for when processors must add accounts to the VMSS list.

These reason codes, which involve chargeback and fraud activity on an account, are the most common reasons for being added to VMSS, and can affect businesses that aren’t engaged in illegal or rule-violating activity. These reason codes are as follows:

| Code | Reason             | Description                                                                                                                                                                                                                                       |
| ---- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 21   | Excessive Fraud    | The Merchant or Third Party Agent submitted excessive fraudulent transactions (250,000 USD fraud amount and 1.8 percent (180 basis points) fraud-to-sales amount ratio in any single month) into payment system, and didn’t adequately remediate. |
| 22   | Excessive Disputes | The Merchant or Third Party Agent generated excessive disputes (1,000 dispute count, and 1.8 percent (180 basis points) dispute-to-sales amount ratio in any single month) into payment system and didn’t adequately remediate.                   |

### Removal from VMSS

Stripe—or any other processor—usually can’t remove an account’s information from VMSS upon request. A processor can only remove a VMSS entry if the processor themselves added the business to VMSS in error.

### Next steps if you’re listed on VMSS

If you’re listed on VMSS, you might not know until you attempt to sign up for a new processor. VMSS is only supposed to be used as an informational tool by processors during the application process; however, the presence of a VMSS listing often leads to an application being declined.

You’ll need to contact your previous processor to find out why your information was added to VMSS. However, VMSS criteria are determined by Visa and processors are required to follow this criteria. Stripe can’t remove a business that met the “excessive chargebacks” criteria under any circumstances. For example, this is true even if the business has remediated the issues leading to chargebacks.

Because of banking partner restrictions, Stripe generally can’t process for businesses listed on VMSS unless extenuating circumstances apply, such as the case of a legitimate business who previously had their identity information stolen.

If you require assistance with a dispute, [contact Stripe support](https://support.stripe.com/contact).
