# Verify v2 Error Codes

Verify v2 error codes are five-digit integers in the 60000–60999 and 68000–68999 ranges.

For details about an error code, its possible causes, and recommended solutions, see the full [Error and Warning Dictionary](/docs/api/errors).

## 602xx series: verification parameters, rate limits, and templates

| Code                            | Description                                                     |
| ------------------------------- | --------------------------------------------------------------- |
| [60200](/docs/api/errors/60200) | Invalid parameter                                               |
| [60201](/docs/api/errors/60201) | Selected template translation is not approved                   |
| [60202](/docs/api/errors/60202) | Max check attempts reached                                      |
| [60203](/docs/api/errors/60203) | Max send attempts reached                                       |
| [60204](/docs/api/errors/60204) | Service does not support this feature                           |
| [60205](/docs/api/errors/60205) | SMS is not supported by landline phone number                   |
| [60206](/docs/api/errors/60206) | 'Amount' & 'Payee' params are required                          |
| [60207](/docs/api/errors/60207) | Max rate limits per service reached                             |
| [60208](/docs/api/errors/60208) | Rate limit with that UniqueName already exists                  |
| [60209](/docs/api/errors/60209) | UniqueName format is invalid                                    |
| [60210](/docs/api/errors/60210) | Max Buckets per Rate limit reached                              |
| [60211](/docs/api/errors/60211) | Bucket with the given Interval already exists                   |
| [60212](/docs/api/errors/60212) | Too many concurrent requests for phone number                   |
| [60213](/docs/api/errors/60213) | A Messaging Configuration already exists for the given country  |
| [60214](/docs/api/errors/60214) | Call channel is not supported when using PSD2                   |
| [60215](/docs/api/errors/60215) | Max number of mailers per account reached                       |
| [60216](/docs/api/errors/60216) | Error while encrypting or decrypting the API key                |
| [60217](/docs/api/errors/60217) | Invalid Service configuration                                   |
| [60218](/docs/api/errors/60218) | SendGrid Template is not active                                 |
| [60219](/docs/api/errors/60219) | SendGrid Template does not contain required placeholders        |
| [60220](/docs/api/errors/60220) | Messages to China require use case vetting                      |
| [60221](/docs/api/errors/60221) | No target verification specified                                |
| [60222](/docs/api/errors/60222) | SendGrid from address does not match a verified Sender Identity |
| [60223](/docs/api/errors/60223) | Delivery channel disabled                                       |
| [60224](/docs/api/errors/60224) | Missing substitutions for selected template                     |
| [60225](/docs/api/errors/60225) | Translation already exists for the provided template            |
| [60226](/docs/api/errors/60226) | Messages sent to China require friendly\_name                   |
| [60227](/docs/api/errors/60227) | The selected channel for template is not supported              |
| [60228](/docs/api/errors/60228) | Template was not found                                          |
| [60229](/docs/api/errors/60229) | Template translation was not found                              |
| [60230](/docs/api/errors/60230) | The template being used doesn't have a brandless version        |
| [60231](/docs/api/errors/60231) | Sender id already exists for account                            |
| [60232](/docs/api/errors/60232) | Sender id does not exist                                        |
| [60233](/docs/api/errors/60233) | Default sender id can't be deleted                              |
| [60234](/docs/api/errors/60234) | Sender id can not be set as not default                         |
| [60235](/docs/api/errors/60235) | Sender Definitions does not match with requirements             |
| [60236](/docs/api/errors/60236) | The domain could not be obtained from the given email           |
| [60237](/docs/api/errors/60237) | The given domain is on a deny list                              |
| [60238](/docs/api/errors/60238) | Verification Creation Attempt blocked by Twilio                 |
| [60239](/docs/api/errors/60239) | BYOT feature is not enabled                                     |
| [60240](/docs/api/errors/60240) | Templates not allowed                                           |
| [60241](/docs/api/errors/60241) | Static message required                                         |
| [60242](/docs/api/errors/60242) | WhatsApp template not found                                     |
| [60243](/docs/api/errors/60243) | Custom messages are not supported                               |
| [60245](/docs/api/errors/60245) | You have exceeded your messaging limits                         |
| [60246](/docs/api/errors/60246) | Service already exists                                          |
| [60247](/docs/api/errors/60247) | Message Length Exceeded                                         |
| [60248](/docs/api/errors/60248) | Friendly Name contains a restricted word                        |
| [60250](/docs/api/errors/60250) | Missing Registration for Australia                              |

## 603xx series: Verify Push and TOTP (Entities, Factors, Challenges)

| Code                            | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| [60300](/docs/api/errors/60300) | Invalid Param                                                         |
| [60301](/docs/api/errors/60301) | Entity already exists                                                 |
| [60302](/docs/api/errors/60302) | FactorType already exists                                             |
| [60303](/docs/api/errors/60303) | Entities batch deletion request body is not valid                     |
| [60304](/docs/api/errors/60304) | Entity already exists                                                 |
| [60305](/docs/api/errors/60305) | Access Token parameters are invalid                                   |
| [60306](/docs/api/errors/60306) | Invalid Request                                                       |
| [60307](/docs/api/errors/60307) | Cannot resend push notifications to 'none' notification platform      |
| [60308](/docs/api/errors/60308) | Challenge verification attempts limit reached                         |
| [60309](/docs/api/errors/60309) | Push notifications limit reached for a Challenge                      |
| [60310](/docs/api/errors/60310) | Factor verification attempts reached                                  |
| [60311](/docs/api/errors/60311) | Factor verification failed                                            |
| [60312](/docs/api/errors/60312) | Challenge creation limit reached                                      |
| [60313](/docs/api/errors/60313) | Unauthorized factor creation                                          |
| [60314](/docs/api/errors/60314) | Factors binding format is invalid                                     |
| [60315](/docs/api/errors/60315) | Reached max limit of 20 push Factors associated per Entity            |
| [60317](/docs/api/errors/60317) | Factor already exists                                                 |
| [60318](/docs/api/errors/60318) | Factor is unverified                                                  |
| [60322](/docs/api/errors/60322) | Challenge already responded                                           |
| [60323](/docs/api/errors/60323) | Challenge expired                                                     |
| [60324](/docs/api/errors/60324) | Challenge verification failed                                         |
| [60325](/docs/api/errors/60325) | Translation for locale not found, using default                       |
| [60326](/docs/api/errors/60326) | Too many requests to create factors for the entity                    |
| [60327](/docs/api/errors/60327) | Channel not supported by template; falling back to static message     |
| [60328](/docs/api/errors/60328) | Entities rate limit exceeded                                          |
| [60329](/docs/api/errors/60329) | Verify SNA does not work with psd2\_enabled                           |
| [60330](/docs/api/errors/60330) | Failed to invoke the webhook                                          |
| [60331](/docs/api/errors/60331) | Locale requested is not supported by Verify Text-To-Speech conversion |
| [60332](/docs/api/errors/60332) | Delete translation is not allowed                                     |
| [60333](/docs/api/errors/60333) | The SMS message was sent using a brandless template                   |
| [60334](/docs/api/errors/60334) | The SMS message was sent using a brandful template                    |
| [60335](/docs/api/errors/60335) | The SMS message was sent using a brandless template                   |
| [60361](/docs/api/errors/60361) | Account SID is invalid or not provided                                |
| [60362](/docs/api/errors/60362) | Factor SID invalid or not provided                                    |
| [60363](/docs/api/errors/60363) | Service SID invalid or not provided                                   |
| [60364](/docs/api/errors/60364) | Challenge SID invalid or not provided                                 |
| [60365](/docs/api/errors/60365) | Entity SID invalid or not provided                                    |
| [60366](/docs/api/errors/60366) | Entity invalid or not provided                                        |
| [60367](/docs/api/errors/60367) | Invalid entity identity                                               |
| [60368](/docs/api/errors/60368) | Challenge details invalid or not provided                             |
| [60369](/docs/api/errors/60369) | Factor type invalid or not provided                                   |
| [60370](/docs/api/errors/60370) | Factor config invalid or not provided                                 |
| [60371](/docs/api/errors/60371) | Relying party invalid or not provided                                 |
| [60372](/docs/api/errors/60372) | Relying party id invalid or not provided                              |
| [60373](/docs/api/errors/60373) | Invalid page size                                                     |
| [60374](/docs/api/errors/60374) | Invalid page token                                                    |
| [60375](/docs/api/errors/60375) | Invalid id                                                            |
| [60376](/docs/api/errors/60376) | Invalid rawId                                                         |
| [60377](/docs/api/errors/60377) | Authenticator attachment invalid or not provided                      |
| [60378](/docs/api/errors/60378) | Authenticator response invalid or not provided                        |
| [60379](/docs/api/errors/60379) | Authenticator data invalid or not provided                            |
| [60380](/docs/api/errors/60380) | Client data invalid or not provided                                   |
| [60381](/docs/api/errors/60381) | Signature invalid or not provided                                     |
| [60382](/docs/api/errors/60382) | Factor does not match the relying party of the challenge              |
| [60383](/docs/api/errors/60383) | Illegal factor status                                                 |
| [60384](/docs/api/errors/60384) | Invalid challenge timeout                                             |
| [60385](/docs/api/errors/60385) | Public key invalid or not provided                                    |
| [60386](/docs/api/errors/60386) | Attestation object invalid or not provided                            |
| [60387](/docs/api/errors/60387) | Attested credential data invalid or not provided                      |
| [60388](/docs/api/errors/60388) | User display name not provided                                        |
| [60390](/docs/api/errors/60390) | Factor not found                                                      |
| [60391](/docs/api/errors/60391) | Challenge not found                                                   |
| [60392](/docs/api/errors/60392) | Entity not found                                                      |

## 604xx series: internal errors, delivery, and contacts

| Code                            | Description                                                    |
| ------------------------------- | -------------------------------------------------------------- |
| [60401](/docs/api/errors/60401) | Network Error                                                  |
| [60402](/docs/api/errors/60402) | Mapper Error                                                   |
| [60403](/docs/api/errors/60403) | Storage Error                                                  |
| [60404](/docs/api/errors/60404) | Input Error                                                    |
| [60405](/docs/api/errors/60405) | Key Storage Error                                              |
| [60406](/docs/api/errors/60406) | Initialization Error                                           |
| [60407](/docs/api/errors/60407) | Authentication Token Error                                     |
| [60408](/docs/api/errors/60408) | TemplateSid is only supported for the SMS channel              |
| [60409](/docs/api/errors/60409) | Custom message did not match any template                      |
| [60410](/docs/api/errors/60410) | Verification delivery attempt blocked                          |
| [60411](/docs/api/errors/60411) | Phone Number or Phone Number Prefix already exists in Safelist |
| [60412](/docs/api/errors/60412) | Verification blocked by Fraudulent Signup Prevention           |
| [60420](/docs/api/errors/60420) | Invalid Contact ID format                                      |
| [60421](/docs/api/errors/60421) | Unexpected result when creating contact                        |
| [60422](/docs/api/errors/60422) | Contact not found                                              |
| [60423](/docs/api/errors/60423) | Multiple contacts were found                                   |
| [60424](/docs/api/errors/60424) | Contact address not found                                      |
| [60425](/docs/api/errors/60425) | Verification SID invalid or not provided                       |
| [60426](/docs/api/errors/60426) | Verification ID invalid or not provided                        |
| [60427](/docs/api/errors/60427) | Factor ID invalid or not provided                              |
| [60428](/docs/api/errors/60428) | Unsupported channel                                            |
| [60431](/docs/api/errors/60431) | Verification not found                                         |
| [60432](/docs/api/errors/60432) | Unsupported passkeys relying party                             |
| [60433](/docs/api/errors/60433) | Unsupported passkeys approval content type                     |
| [60434](/docs/api/errors/60434) | Unsupported passkeys verification content type                 |
| [60436](/docs/api/errors/60436) | Recipient invalid or not provided                              |
| [60437](/docs/api/errors/60437) | Recipient type unsupported                                     |
| [60440](/docs/api/errors/60440) | Unsupported verification content type                          |
| [60441](/docs/api/errors/60441) | Illegal status                                                 |

## 605xx series: Silent Network Auth (SNA)

| Code                            | Description                                                        |
| ------------------------------- | ------------------------------------------------------------------ |
| [60500](/docs/api/errors/60500) | SNA Phone Number Mismatch                                          |
| [60510](/docs/api/errors/60510) | SNA Error                                                          |
| [60511](/docs/api/errors/60511) | SNA Downstream Error                                               |
| [60517](/docs/api/errors/60517) | SNA User-Agent Mismatch Error                                      |
| [60519](/docs/api/errors/60519) | SNA Verification Result Pending                                    |
| [60520](/docs/api/errors/60520) | SNA URL Failed                                                     |
| [60531](/docs/api/errors/60531) | SNA Carrier Not Detected                                           |
| [60532](/docs/api/errors/60532) | SNA Potential Dual SIM Detected                                    |
| [60533](/docs/api/errors/60533) | SNA Carrier Header Error                                           |
| [60534](/docs/api/errors/60534) | SNA Downstream Carrier Error                                       |
| [60535](/docs/api/errors/60535) | Factor is unverified                                               |
| [60540](/docs/api/errors/60540) | SNA Carrier Identified Invalid Phone Number                        |
| [60550](/docs/api/errors/60550) | Auto Channel Failed: No channels selected due to validation errors |

## 606xx series: lookup and delivery issues

| Code                            | Description                                                 |
| ------------------------------- | ----------------------------------------------------------- |
| [60600](/docs/api/errors/60600) | Unprovisioned or out of coverage                            |
| [60602](/docs/api/errors/60602) | App hash can only be used with SMS channel                  |
| [60603](/docs/api/errors/60603) | SendGrid maximum credits exceeded                           |
| [60604](/docs/api/errors/60604) | SendGrid Authenticated user is not authorized to send mail  |
| [60605](/docs/api/errors/60605) | Verification delivery attempt blocked                       |
| [60606](/docs/api/errors/60606) | Lookup Package is Not Enabled                               |
| [60607](/docs/api/errors/60607) | Lookup Unsupported Country                                  |
| [60608](/docs/api/errors/60608) | Lookup Error                                                |
| [60609](/docs/api/errors/60609) | Live activity not enabled                                   |
| [60610](/docs/api/errors/60610) | Phone number outside of coverage                            |
| [60611](/docs/api/errors/60611) | Lookup Package Quota Reached                                |
| [60612](/docs/api/errors/60612) | Requested phone number not mobile                           |
| [60613](/docs/api/errors/60613) | Lookup Provider Degradation                                 |
| [60614](/docs/api/errors/60614) | Lookup Request Must Be Completed in Different Twilio Region |
| [60616](/docs/api/errors/60616) | Lookup rate limit exceeded                                  |
| [60617](/docs/api/errors/60617) | Lookup Not Enough Request Parameters                        |
| [60618](/docs/api/errors/60618) | Lookup Malformed Request Parameter                          |
| [60619](/docs/api/errors/60619) | Lookup Request Cannot be Completed in Twilio Region         |
| [60620](/docs/api/errors/60620) | Lookup SIM Swap Information is Incomplete From Carrier      |
| [60621](/docs/api/errors/60621) | Lookup Carrier Information Not Available                    |
| [60622](/docs/api/errors/60622) | Invalid Magic Number                                        |
| [60623](/docs/api/errors/60623) | Verification Not Found                                      |
| [60624](/docs/api/errors/60624) | Maximum rate limit for Trial Accounts                       |
| [60625](/docs/api/errors/60625) | Phone Number is Cancelled                                   |
| [60626](/docs/api/errors/60626) | Phone number rate limit exceeded                            |

## 680xx series: WhatsApp channel

| Code                            | Description                            |
| ------------------------------- | -------------------------------------- |
| [68001](/docs/api/errors/68001) | Network Error                          |
| [68002](/docs/api/errors/68002) | Mapper Error                           |
| [68003](/docs/api/errors/68003) | Storage Error                          |
| [68004](/docs/api/errors/68004) | Input Error                            |
| [68005](/docs/api/errors/68005) | Key Storage Error                      |
| [68006](/docs/api/errors/68006) | Initialization Error                   |
| [68007](/docs/api/errors/68007) | Authentication Token Error             |
| [68008](/docs/api/errors/68008) | Verify WhatsApp channel not configured |
