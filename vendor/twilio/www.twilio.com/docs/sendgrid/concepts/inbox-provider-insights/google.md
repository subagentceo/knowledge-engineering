# Google

Google provides a free email service called Gmail, the world's largest inbox service.

Gmail's spam filtering methods can produce both false positives and negatives. Inboxes on the Gmail infrastructure fall into one of two categories:

* Consumer mailboxes that fall under the `gmail.com` umbrella
* Cloud-hosted mailboxes that employers use for employee email service

## Gmail vs. Google Workspace

If a recipient's address ends with `@gmail.com`, that's a Gmail address. Businesses of all sizes use Gmail Workspace for corporate email.

While Gmail addresses and Workspace addresses use the same filtering rules, Workspace domain administrators can set their own level of spam filtering.

## Authentication support

Google checks a sender's domain DNS `TXT` records for a Sender Policy Framework (SPF) list, DomainKeys Identified Mail (DKIM) signature, and a Domain-based Message Authentication, Reporting, and Conformance (DMARC) policy. It requires SPF and DKIM at any volume of messages and requires DMARC for a daily volume of more than 5,000 messages.

| Authentication method | Necessity                                     |
| --------------------- | --------------------------------------------- |
| SPF                   | Required                                      |
| DKIM                  | Required                                      |
| DMARC                 | Required for more than 5,000 messages per day |

Google rejects senders without DMARC with the bounce message:

> *550 5.7.40 Your email has been blocked because the From: header (RFC5322) in this message isn't aligned with either the authenticated SPF or DKIM organizational domain.*

Review [Google's email sender guidelines page][esg]. These describe the requirements for sending email to personal Gmail accounts.

## Feedback loop

Due to privacy concerns around the returned data, Google doesn't offer a traditional feedback loop (FBL).

## Google postmaster tools

Although Google offers an FBL using [Google Postmaster Tools (GPT)][gpt] and the [`Feedback-ID` header][gfbl-header-id]. The FBL only works for the `gmail.com` domain. With GPT, senders can monitor and improve the quality of email campaigns to Gmail recipients and provides data around spam complaints, IP reputation, domain reputation, and other signals. The Google `Feedback-ID` header with GPT provides more granular spam complaint data.

[gpt]: https://support.google.com/a/answer/9981691?hl=en

[gfbl-header-id]: https://support.google.com/a/answer/6254652?hl=en&visit_id=638852536194555330-3974982889&rd=1

[esg]: https://support.google.com/a/answer/81126?hl=en&ref_topic=7279058&sjid=4645848558894045825-NA
