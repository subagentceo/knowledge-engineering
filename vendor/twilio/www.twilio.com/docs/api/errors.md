# Error and Warning Dictionary

Below is a full list of all possible Twilio REST API error codes. Read our guidance on
[debugging your Twilio application](/docs/usage/troubleshooting/debugging-your-application) for general help.
You can also [download all of the error codes as JSON](/docs/api/errors/twilio-error-codes.json).

## 00000-09999

| Code                                      | Description                     |
| ----------------------------------------- | ------------------------------- |
| [400](www.twilio.com/docs/api/errors/400) | ERROR  <br/> Bad Request        |
| [403](www.twilio.com/docs/api/errors/403) | ERROR  <br/> Forbidden          |
| [404](www.twilio.com/docs/api/errors/404) | ERROR  <br/> Not Found          |
| [410](www.twilio.com/docs/api/errors/410) | ERROR  <br/> Unknown Error Code |
| [503](www.twilio.com/docs/api/errors/503) | ERROR  <br/> Internal Error     |

[Back to top](#)

## 10000-19999

| Code                                          | Description                                                                                                          |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [10001](www.twilio.com/docs/api/errors/10001) | ERROR  <br/> Account is not active                                                                                   |
| [10002](www.twilio.com/docs/api/errors/10002) | ERROR Phone Numbers <br/> Trial accounts do not support the feature you tried to use                                 |
| [10003](www.twilio.com/docs/api/errors/10003) | ERROR  <br/> Incoming call rejected due to inactive account                                                          |
| [10004](www.twilio.com/docs/api/errors/10004) | ERROR  <br/> Call concurrency limit exceeded                                                                         |
| [10005](www.twilio.com/docs/api/errors/10005) | ERROR Programmable Voice <br/> Voice calling has been disabled for this account                                      |
| [11001](www.twilio.com/docs/api/errors/11001) | ERROR Programmable Voice <br/> Website URL doesn’t match the required format                                         |
| [11002](www.twilio.com/docs/api/errors/11002) | ERROR Programmable Voice <br/> Authorized Representative must have a valid US phone number (+1).                     |
| [11003](www.twilio.com/docs/api/errors/11003) | ERROR Programmable Voice <br/> Business address must be a US address.                                                |
| [11004](www.twilio.com/docs/api/errors/11004) | ERROR Programmable Voice <br/> Business Registration Validation Failed.                                              |
| [11005](www.twilio.com/docs/api/errors/11005) | ERROR Programmable Voice <br/> Voice Integrity rejected as linked Business profile is not in approved status         |
| [11006](www.twilio.com/docs/api/errors/11006) | ERROR Programmable Voice <br/> CNAM registration rejected: linked Business Profile is not approved                   |
| [11007](www.twilio.com/docs/api/errors/11007) | ERROR Programmable Voice <br/> CNAM registration rejected: display name does not match the registered business       |
| [11008](www.twilio.com/docs/api/errors/11008) | ERROR Programmable Voice <br/> CNAM registration rejected: display name contains prohibited content                  |
| [11009](www.twilio.com/docs/api/errors/11009) | ERROR Programmable Voice <br/> CNAM registration rejected: display name does not meet requirements                   |
| [11010](www.twilio.com/docs/api/errors/11010) | ERROR Programmable Voice <br/> Letter of Authorization incomplete or invalid                                         |
| [11011](www.twilio.com/docs/api/errors/11011) | ERROR Programmable Voice <br/> Company registration is less than 1 year old                                          |
| [11012](www.twilio.com/docs/api/errors/11012) | ERROR Programmable Voice <br/> Display name does not match with the business                                         |
| [11013](www.twilio.com/docs/api/errors/11013) | ERROR Programmable Voice <br/> Logo does not match the business                                                      |
| [11014](www.twilio.com/docs/api/errors/11014) | ERROR Programmable Voice <br/> Display name does not adhere to formatting guidelines                                 |
| [11015](www.twilio.com/docs/api/errors/11015) | ERROR Programmable Voice <br/> Logo does not comply with branding guidelines                                         |
| [11016](www.twilio.com/docs/api/errors/11016) | ERROR Programmable Voice <br/> Call reason does not adhere to the guidelines                                         |
| [11017](www.twilio.com/docs/api/errors/11017) | ERROR Programmable Voice <br/> Display name contains a typographical error                                           |
| [11018](www.twilio.com/docs/api/errors/11018) | ERROR Programmable Voice <br/> Display name must not be a phone number                                               |
| [11019](www.twilio.com/docs/api/errors/11019) | ERROR Programmable Voice <br/> Logo does not match display name                                                      |
| [11020](www.twilio.com/docs/api/errors/11020) | ERROR Programmable Voice <br/> Call reason must not contain a web link                                               |
| [11021](www.twilio.com/docs/api/errors/11021) | ERROR Programmable Voice <br/> Call reason must not contain personally identifiable information                      |
| [11022](www.twilio.com/docs/api/errors/11022) | ERROR Programmable Voice <br/> Brand Verification — No Customer Response                                             |
| [11100](www.twilio.com/docs/api/errors/11100) | ERROR Branded Comms <br/> Invalid URL format                                                                         |
| [11200](www.twilio.com/docs/api/errors/11200) | ERROR  <br/> HTTP retrieval failure                                                                                  |
| [11201](www.twilio.com/docs/api/errors/11201) | ERROR  <br/> TCP connection timed out                                                                                |
| [11202](www.twilio.com/docs/api/errors/11202) | ERROR  <br/> TCP connection refused                                                                                  |
| [11203](www.twilio.com/docs/api/errors/11203) | ERROR  <br/> HTTP communication total time out triggered                                                             |
| [11205](www.twilio.com/docs/api/errors/11205) | ERROR  <br/> HTTP connection failure                                                                                 |
| [11206](www.twilio.com/docs/api/errors/11206) | ERROR Branded Comms <br/> HTTP protocol violation                                                                    |
| [11210](www.twilio.com/docs/api/errors/11210) | ERROR  <br/> HTTP bad host name                                                                                      |
| [11215](www.twilio.com/docs/api/errors/11215) | ERROR  <br/> HTTP too many redirects                                                                                 |
| [11216](www.twilio.com/docs/api/errors/11216) | ERROR  <br/> HTTP invalid redirect                                                                                   |
| [11217](www.twilio.com/docs/api/errors/11217) | ERROR  <br/> HTTP error response code                                                                                |
| [11220](www.twilio.com/docs/api/errors/11220) | ERROR  <br/> SSL/TLS Handshake Error                                                                                 |
| [11235](www.twilio.com/docs/api/errors/11235) | ERROR  <br/> Certificate Invalid - Domain Mismatch                                                                   |
| [11236](www.twilio.com/docs/api/errors/11236) | ERROR  <br/> Certificate Invalid - Certificate Expired                                                               |
| [11237](www.twilio.com/docs/api/errors/11237) | ERROR  <br/> Certificate Invalid - Could not find path to certificate                                                |
| [11240](www.twilio.com/docs/api/errors/11240) | ERROR  <br/> HTTP connection edge location is invalid                                                                |
| [11241](www.twilio.com/docs/api/errors/11241) | ERROR  <br/> HTTP connection edge location is not supported                                                          |
| [11242](www.twilio.com/docs/api/errors/11242) | ERROR  <br/> HTTP connection over Twilio Interconnect is not allowed                                                 |
| [11243](www.twilio.com/docs/api/errors/11243) | ERROR  <br/> HTTP retry policy is invalid                                                                            |
| [11251](www.twilio.com/docs/api/errors/11251) | ERROR  <br/> Fatal protocol violation                                                                                |
| [11300](www.twilio.com/docs/api/errors/11300) | ERROR  <br/> Invalid template URL                                                                                    |
| [11310](www.twilio.com/docs/api/errors/11310) | ERROR  <br/> Invalid template token                                                                                  |
| [11320](www.twilio.com/docs/api/errors/11320) | ERROR  <br/> Invalid template unclosed brackets                                                                      |
| [11321](www.twilio.com/docs/api/errors/11321) | WARNING Branded Comms <br/> Misconfigured webhook                                                                    |
| [11322](www.twilio.com/docs/api/errors/11322) | WARNING Branded Comms <br/> Invalid webhook method                                                                   |
| [11750](www.twilio.com/docs/api/errors/11750) | ERROR Programmable Voice <br/> TwiML response body too large                                                         |
| [11751](www.twilio.com/docs/api/errors/11751) | ERROR Branded Comms, Whatsapp <br/> Media Message - Media exceeds messaging provider size limit                      |
| [11770](www.twilio.com/docs/api/errors/11770) | ERROR  <br/> Empty response body                                                                                     |
| [12100](www.twilio.com/docs/api/errors/12100) | ERROR  <br/> Document parse failure                                                                                  |
| [12101](www.twilio.com/docs/api/errors/12101) | ERROR  <br/> Invalid Twilio Markup XML version                                                                       |
| [12102](www.twilio.com/docs/api/errors/12102) | ERROR  <br/> The root element must be Response                                                                       |
| [12200](www.twilio.com/docs/api/errors/12200) | WARNING  <br/> Schema validation warning                                                                             |
| [12300](www.twilio.com/docs/api/errors/12300) | ERROR  <br/> Invalid Content-Type                                                                                    |
| [12301](www.twilio.com/docs/api/errors/12301) | ERROR  <br/> Invalid Upload Content-Type                                                                             |
| [12400](www.twilio.com/docs/api/errors/12400) | ERROR  <br/> Internal Failure                                                                                        |
| [13000](www.twilio.com/docs/api/errors/13000) | WARNING  <br/> Conference Noun cannot be mixed with Number nouns                                                     |
| [13110](www.twilio.com/docs/api/errors/13110) | ERROR  <br/> Annotate: Annotate must contain one valid nested element                                                |
| [13111](www.twilio.com/docs/api/errors/13111) | ERROR  <br/> Annotate: Annotate must contain only one of element X                                                   |
| [13112](www.twilio.com/docs/api/errors/13112) | WARNING  <br/> Annotate: Invalid nested element                                                                      |
| [13120](www.twilio.com/docs/api/errors/13120) | ERROR Programmable Voice <br/> Annotate->BillingReferenceTag cannot be over 128 characters                           |
| [13201](www.twilio.com/docs/api/errors/13201) | ERROR  <br/> Dial: Cannot Dial out from a Dial Call Segment                                                          |
| [13210](www.twilio.com/docs/api/errors/13210) | WARNING  <br/> Dial: Invalid method value                                                                            |
| [13211](www.twilio.com/docs/api/errors/13211) | WARNING Programmable Voice <br/> Dial: Invalid ifMachine value                                                       |
| [13212](www.twilio.com/docs/api/errors/13212) | WARNING  <br/> Dial: Invalid timeout value                                                                           |
| [13213](www.twilio.com/docs/api/errors/13213) | WARNING  <br/> Dial: Invalid hangupOnStar value                                                                      |
| [13214](www.twilio.com/docs/api/errors/13214) | WARNING Programmable Voice <br/> Dial: Invalid callerId value                                                        |
| [13215](www.twilio.com/docs/api/errors/13215) | WARNING  <br/> Dial: Invalid nested element                                                                          |
| [13216](www.twilio.com/docs/api/errors/13216) | WARNING Programmable Voice <br/> Invalid timeLimit value                                                             |
| [13217](www.twilio.com/docs/api/errors/13217) | WARNING Programmable Voice <br/> Dial: Invalid record value                                                          |
| [13218](www.twilio.com/docs/api/errors/13218) | WARNING Programmable Voice <br/> Dial: Invalid sequential value                                                      |
| [13219](www.twilio.com/docs/api/errors/13219) | WARNING Programmable Voice <br/> Dial: Invalid answerOnBridge value                                                  |
| [13220](www.twilio.com/docs/api/errors/13220) | WARNING Programmable Voice <br/> Dial: Invalid ringTone value                                                        |
| [13221](www.twilio.com/docs/api/errors/13221) | WARNING  <br/> Dial->Number: Invalid method value                                                                    |
| [13222](www.twilio.com/docs/api/errors/13222) | WARNING Programmable Voice <br/> Dial->Number: Invalid sendDigits value                                              |
| [13223](www.twilio.com/docs/api/errors/13223) | WARNING Programmable Voice <br/> Dial: Invalid phone number format                                                   |
| [13224](www.twilio.com/docs/api/errors/13224) | ERROR  <br/> Dial: Twilio does not support calling this number or the number is invalid                              |
| [13225](www.twilio.com/docs/api/errors/13225) | ERROR Programmable Voice, Trust-Hub <br/> Dial: Call blocked by Twilio                                               |
| [13226](www.twilio.com/docs/api/errors/13226) | WARNING  <br/> Dial: Invalid country code                                                                            |
| [13227](www.twilio.com/docs/api/errors/13227) | ERROR Programmable Voice <br/> Geo Permission configuration is not permitting call                                   |
| [13230](www.twilio.com/docs/api/errors/13230) | WARNING  <br/> Dial->Conference: Invalid muted value                                                                 |
| [13231](www.twilio.com/docs/api/errors/13231) | ERROR Programmable Voice <br/> Dial->Conference: Invalid endConferenceOnExit value                                   |
| [13232](www.twilio.com/docs/api/errors/13232) | WARNING Programmable Voice <br/> Dial->Conference: Invalid startConferenceOnEnter value                              |
| [13233](www.twilio.com/docs/api/errors/13233) | WARNING  <br/> Dial->Conference: Invalid waitUrl                                                                     |
| [13234](www.twilio.com/docs/api/errors/13234) | WARNING Programmable Voice <br/> Dial->Conference: Invalid waitMethod                                                |
| [13235](www.twilio.com/docs/api/errors/13235) | WARNING  <br/> Dial->Conference: Invalid beep value                                                                  |
| [13236](www.twilio.com/docs/api/errors/13236) | WARNING  <br/> Dial->Conference: Invalid Conference Sid                                                              |
| [13237](www.twilio.com/docs/api/errors/13237) | WARNING  <br/> Dial->Conference: Invalid Conference Name                                                             |
| [13238](www.twilio.com/docs/api/errors/13238) | ERROR Programmable Voice <br/> Dial->Conference: Invalid Verb used in waitUrl, holdUrl, or announceUrl TwiML         |
| [13239](www.twilio.com/docs/api/errors/13239) | ERROR Programmable Voice <br/> Dial->Conference: Invalid Trim Value                                                  |
| [13240](www.twilio.com/docs/api/errors/13240) | ERROR Programmable Voice <br/> Dial->Conference: Invalid Whisper SID                                                 |
| [13241](www.twilio.com/docs/api/errors/13241) | WARNING  <br/> Dial->SIP: Invalid method value                                                                       |
| [13242](www.twilio.com/docs/api/errors/13242) | WARNING  <br/> Dial->SIP: Invalid sendDigits value                                                                   |
| [13243](www.twilio.com/docs/api/errors/13243) | WARNING  <br/> Dial->SIP: Invalid SIP URI                                                                            |
| [13244](www.twilio.com/docs/api/errors/13244) | WARNING  <br/> Dial: No SIP Authorization                                                                            |
| [13245](www.twilio.com/docs/api/errors/13245) | WARNING  <br/> Dial: Not allowed in this API version                                                                 |
| [13246](www.twilio.com/docs/api/errors/13246) | WARNING  <br/> Dial: SIP dialing not enabled for this account                                                        |
| [13247](www.twilio.com/docs/api/errors/13247) | ERROR Programmable Voice <br/> Dial: Invalid From number (caller ID)                                                 |
| [13248](www.twilio.com/docs/api/errors/13248) | WARNING Programmable Voice <br/> Dial: Invalid callerID, too long                                                    |
| [13249](www.twilio.com/docs/api/errors/13249) | WARNING  <br/> Dial: Invalid username or password attribute                                                          |
| [13250](www.twilio.com/docs/api/errors/13250) | WARNING  <br/> Dial: Too many URIs passed                                                                            |
| [13251](www.twilio.com/docs/api/errors/13251) | WARNING  <br/> Dial: Too many headers passed                                                                         |
| [13252](www.twilio.com/docs/api/errors/13252) | WARNING Programmable Voice <br/> Dial: Invalid header name                                                           |
| [13253](www.twilio.com/docs/api/errors/13253) | WARNING  <br/> Dial: Header is too long                                                                              |
| [13254](www.twilio.com/docs/api/errors/13254) | WARNING  <br/> Dial->Sip: SIP URI DNS does not resolve or resolves to an non-public IP address                       |
| [13255](www.twilio.com/docs/api/errors/13255) | WARNING  <br/> Dialing .sip.twilio.com addresses is not currently allowed                                            |
| [13256](www.twilio.com/docs/api/errors/13256) | WARNING Programmable Voice <br/> Invalid recordingStatusCallback URL                                                 |
| [13257](www.twilio.com/docs/api/errors/13257) | ERROR Programmable Voice <br/> Invalid transcribeCallback URL                                                        |
| [13258](www.twilio.com/docs/api/errors/13258) | ERROR Programmable Voice <br/> Dial->Sim not supported in this realm                                                 |
| [13299](www.twilio.com/docs/api/errors/13299) | ERROR  <br/> 2010 Conference API feature requested using 2008 API                                                    |
| [13310](www.twilio.com/docs/api/errors/13310) | WARNING  <br/> Gather: Invalid finishOnKey value                                                                     |
| [13311](www.twilio.com/docs/api/errors/13311) | WARNING  <br/> Gather: Invalid finishOnKey value                                                                     |
| [13312](www.twilio.com/docs/api/errors/13312) | WARNING  <br/> Gather: Invalid method value                                                                          |
| [13313](www.twilio.com/docs/api/errors/13313) | WARNING  <br/> Gather: Invalid timeout value                                                                         |
| [13314](www.twilio.com/docs/api/errors/13314) | WARNING  <br/> Gather: Invalid numDigits value                                                                       |
| [13320](www.twilio.com/docs/api/errors/13320) | WARNING  <br/> Gather: Invalid nested verb                                                                           |
| [13321](www.twilio.com/docs/api/errors/13321) | WARNING Programmable Voice <br/> Gather -> Say: Invalid voice value                                                  |
| [13322](www.twilio.com/docs/api/errors/13322) | WARNING  <br/> Gather->Say: Invalid loop value                                                                       |
| [13325](www.twilio.com/docs/api/errors/13325) | ERROR  <br/> Gather->Play: Invalid Content-Type                                                                      |
| [13326](www.twilio.com/docs/api/errors/13326) | WARNING Programmable Voice <br/> Gather: Invalid input value                                                         |
| [13327](www.twilio.com/docs/api/errors/13327) | WARNING Programmable Voice <br/> Gather: Invalid speechTimeout value                                                 |
| [13328](www.twilio.com/docs/api/errors/13328) | WARNING Programmable Voice <br/> Gather: Invalid maxSpeechTime value                                                 |
| [13329](www.twilio.com/docs/api/errors/13329) | WARNING Programmable Voice <br/> Gather: Invalid partialResultCallbackMethod value                                   |
| [13330](www.twilio.com/docs/api/errors/13330) | WARNING Programmable Voice <br/> Gather: Invalid hints value                                                         |
| [13331](www.twilio.com/docs/api/errors/13331) | WARNING Programmable Voice <br/> Gather: Invalid language value                                                      |
| [13332](www.twilio.com/docs/api/errors/13332) | WARNING Programmable Voice <br/> Gather: Invalid bargeIn value                                                       |
| [13333](www.twilio.com/docs/api/errors/13333) | WARNING Programmable Voice <br/> Gather: Invalid profanityFilter value                                               |
| [13334](www.twilio.com/docs/api/errors/13334) | WARNING Programmable Voice <br/> Gather: Invalid model value                                                         |
| [13335](www.twilio.com/docs/api/errors/13335) | WARNING Programmable Voice <br/> Gather: speechTimeout auto cannot be used with model default                        |
| [13337](www.twilio.com/docs/api/errors/13337) | ERROR Programmable Voice <br/> Gather: callback must be over HTTPS when using gather with PCI compliance             |
| [13338](www.twilio.com/docs/api/errors/13338) | ERROR Programmable Voice <br/> Gather: Invalid actionOnEmptyResult value                                             |
| [13340](www.twilio.com/docs/api/errors/13340) | ERROR Programmable Voice <br/> Gather: Degraded Speech                                                               |
| [13342](www.twilio.com/docs/api/errors/13342) | ERROR Programmable Voice <br/> Gather: Invalid config for Google STT V2 provider                                     |
| [13343](www.twilio.com/docs/api/errors/13343) | ERROR Programmable Voice <br/> Gather: Invalid config for speech provider                                            |
| [13410](www.twilio.com/docs/api/errors/13410) | WARNING  <br/> Play: Invalid loop value                                                                              |
| [13420](www.twilio.com/docs/api/errors/13420) | ERROR  <br/> Play: Invalid Content-Type                                                                              |
| [13430](www.twilio.com/docs/api/errors/13430) | WARNING Programmable Voice <br/> Play: Invalid DTMF String                                                           |
| [13510](www.twilio.com/docs/api/errors/13510) | WARNING  <br/> Say: Invalid loop value                                                                               |
| [13511](www.twilio.com/docs/api/errors/13511) | WARNING Programmable Voice <br/> Say: Invalid voice value                                                            |
| [13512](www.twilio.com/docs/api/errors/13512) | WARNING Programmable Voice <br/> Gather element has an invalid "language" attribute value                            |
| [13513](www.twilio.com/docs/api/errors/13513) | WARNING Programmable Voice <br/> Say: Invalid rate value                                                             |
| [13520](www.twilio.com/docs/api/errors/13520) | WARNING  <br/> Say: Invalid text                                                                                     |
| [13521](www.twilio.com/docs/api/errors/13521) | WARNING Programmable Voice <br/> \`\<Say>\` element character limits exceeded                                        |
| [13610](www.twilio.com/docs/api/errors/13610) | WARNING  <br/> Record: Invalid method value                                                                          |
| [13611](www.twilio.com/docs/api/errors/13611) | WARNING  <br/> Record: Invalid timeout value                                                                         |
| [13612](www.twilio.com/docs/api/errors/13612) | WARNING  <br/> Record: Invalid maxLength value                                                                       |
| [13613](www.twilio.com/docs/api/errors/13613) | WARNING  <br/> Record: Invalid finishOnKey value                                                                     |
| [13614](www.twilio.com/docs/api/errors/13614) | WARNING  <br/> Record: Invalid transcribe value                                                                      |
| [13615](www.twilio.com/docs/api/errors/13615) | WARNING  <br/> Record: maxLength too high for transcription                                                          |
| [13616](www.twilio.com/docs/api/errors/13616) | WARNING  <br/> Record: playBeep must be true or false                                                                |
| [13617](www.twilio.com/docs/api/errors/13617) | WARNING  <br/> Record: Recording length is out of range for transcription                                            |
| [13618](www.twilio.com/docs/api/errors/13618) | WARNING  <br/> Record: Recording not available for transcription                                                     |
| [13619](www.twilio.com/docs/api/errors/13619) | WARNING Programmable Voice <br/> Record: Transcription feature not available for this type of recording.             |
| [13620](www.twilio.com/docs/api/errors/13620) | WARNING Programmable Voice <br/> Record: Transcription not available for this recording                              |
| [13621](www.twilio.com/docs/api/errors/13621) | ERROR Programmable Voice <br/> Invalid 'recordingStatusCallbackEvent'                                                |
| [13622](www.twilio.com/docs/api/errors/13622) | WARNING Programmable Voice <br/> Record: invalid recordingTrack value                                                |
| [13699](www.twilio.com/docs/api/errors/13699) | WARNING Programmable Voice <br/> Record: Invalid trim value                                                          |
| [13710](www.twilio.com/docs/api/errors/13710) | WARNING  <br/> Redirect: Invalid method value                                                                        |
| [13750](www.twilio.com/docs/api/errors/13750) | ERROR Programmable Voice <br/> Twiml verb not supported by this API version.                                         |
| [13801](www.twilio.com/docs/api/errors/13801) | ERROR Programmable Voice <br/> Refer not allowed on non-SIP call legs                                                |
| [13802](www.twilio.com/docs/api/errors/13802) | ERROR Programmable Voice <br/> Dial: No referUrl attribute specified                                                 |
| [13803](www.twilio.com/docs/api/errors/13803) | ERROR Programmable Voice <br/> SMS verb not supported in this realm                                                  |
| [13804](www.twilio.com/docs/api/errors/13804) | ERROR Programmable Voice <br/> AddOns are not supported in this realm                                                |
| [13805](www.twilio.com/docs/api/errors/13805) | WARNING Programmable Voice <br/> Trial account call duration exceeded 10 minute limit                                |
| [13806](www.twilio.com/docs/api/errors/13806) | ERROR Programmable Voice <br/> Invalid Client Notification URL                                                       |
| [13807](www.twilio.com/docs/api/errors/13807) | ERROR Programmable Voice <br/> Client Notification URL Error Response                                                |
| [13810](www.twilio.com/docs/api/errors/13810) | WARNING Programmable Voice <br/> Reject: Invalid cause                                                               |
| [13910](www.twilio.com/docs/api/errors/13910) | WARNING  <br/> Pause: Invalid length value                                                                           |
| [14101](www.twilio.com/docs/api/errors/14101) | WARNING  <br/> Invalid "To" attribute                                                                                |
| [14102](www.twilio.com/docs/api/errors/14102) | WARNING  <br/> Invalid "From" attribute                                                                              |
| [14103](www.twilio.com/docs/api/errors/14103) | WARNING  <br/> Invalid Body                                                                                          |
| [14104](www.twilio.com/docs/api/errors/14104) | WARNING  <br/> Invalid Method attribute                                                                              |
| [14105](www.twilio.com/docs/api/errors/14105) | WARNING  <br/> Invalid statusCallback attribute                                                                      |
| [14106](www.twilio.com/docs/api/errors/14106) | WARNING  <br/> Document retrieval limit reached                                                                      |
| [14107](www.twilio.com/docs/api/errors/14107) | ERROR Branded Comms <br/> SMS send rate limit exceeded                                                               |
| [14108](www.twilio.com/docs/api/errors/14108) | WARNING  <br/> From phone number not SMS capable                                                                     |
| [14109](www.twilio.com/docs/api/errors/14109) | WARNING Branded Comms <br/> TwiML Reply message limit exceeded                                                       |
| [14110](www.twilio.com/docs/api/errors/14110) | WARNING  <br/> Invalid Verb for SMS Reply                                                                            |
| [14111](www.twilio.com/docs/api/errors/14111) | WARNING  <br/> Invalid To phone number for Trial mode                                                                |
| [14201](www.twilio.com/docs/api/errors/14201) | ERROR  <br/> Enqueue: Invalid method value                                                                           |
| [14202](www.twilio.com/docs/api/errors/14202) | ERROR  <br/> Enqueue: Invalid waitUrl                                                                                |
| [14203](www.twilio.com/docs/api/errors/14203) | ERROR  <br/> Enqueue: Invalid Enqueue action url                                                                     |
| [14204](www.twilio.com/docs/api/errors/14204) | ERROR  <br/> Enqueue: Queue name too short                                                                           |
| [14205](www.twilio.com/docs/api/errors/14205) | ERROR  <br/> Enqueue: Queue name too long                                                                            |
| [14206](www.twilio.com/docs/api/errors/14206) | ERROR  <br/> Enqueue: Invalid waitUrlMethod value                                                                    |
| [14207](www.twilio.com/docs/api/errors/14207) | WARNING Programmable Voice <br/>  Enqueue: The targeted queue reached max queue size                                 |
| [14210](www.twilio.com/docs/api/errors/14210) | ERROR  <br/> Dial->Queue: Invalid whisper method                                                                     |
| [14211](www.twilio.com/docs/api/errors/14211) | ERROR  <br/> Dial->Queue: Invalid whisper url                                                                        |
| [14212](www.twilio.com/docs/api/errors/14212) | ERROR  <br/> Dial->Queue: queue name too short                                                                       |
| [14213](www.twilio.com/docs/api/errors/14213) | ERROR  <br/> Dial->Queue: queue name too long                                                                        |
| [14215](www.twilio.com/docs/api/errors/14215) | ERROR  <br/> Dial->Queue: Invalid ReservationSid. Unable to dequeue                                                  |
| [14217](www.twilio.com/docs/api/errors/14217) | ERROR TaskRouter <br/> Dial->Queue: Could not find or accept provided reservationSid                                 |
| [14218](www.twilio.com/docs/api/errors/14218) | ERROR Programmable Voice <br/> Dial->Queue: Could not update worker to provided activity                             |
| [14219](www.twilio.com/docs/api/errors/14219) | ERROR Programmable Voice <br/> TaskRouter Dial Queue not supported in this realm                                     |
| [14220](www.twilio.com/docs/api/errors/14220) | ERROR  <br/> Enqueue: Provided Workflow was not a valid sid                                                          |
| [14221](www.twilio.com/docs/api/errors/14221) | ERROR  <br/> Enqueue: Provided Attributes JSON was not valid                                                         |
| [14222](www.twilio.com/docs/api/errors/14222) | ERROR TaskRouter <br/> Enqueue: Could not create Task                                                                |
| [14223](www.twilio.com/docs/api/errors/14223) | ERROR  <br/> Enqueue: Unable to cleanup task                                                                         |
| [14226](www.twilio.com/docs/api/errors/14226) | ERROR Programmable Voice <br/> TaskRouter Enqueue not supported in this realm                                        |
| [14230](www.twilio.com/docs/api/errors/14230) | ERROR TaskRouter <br/> Dial->Conference: Invalid WorkflowSid                                                         |
| [14231](www.twilio.com/docs/api/errors/14231) | ERROR TaskRouter <br/> Dial->Conference: Provided Attributes was not valid JSON                                      |
| [14232](www.twilio.com/docs/api/errors/14232) | ERROR TaskRouter <br/> Dial->Conference: Invalid Priority                                                            |
| [14233](www.twilio.com/docs/api/errors/14233) | ERROR TaskRouter <br/> Dial->Conference: Invalid Timeout                                                             |
| [14234](www.twilio.com/docs/api/errors/14234) | ERROR TaskRouter <br/> Dial->Conference: Unable to create task                                                       |
| [14235](www.twilio.com/docs/api/errors/14235) | ERROR TaskRouter <br/> Dial->Conference: Unable to cleanup task                                                      |
| [14236](www.twilio.com/docs/api/errors/14236) | ERROR TaskRouter <br/> Dial->Conference: Invalid ReservationSid                                                      |
| [14237](www.twilio.com/docs/api/errors/14237) | ERROR TaskRouter <br/> Dial->Conference: Invalid PostWorkActivitySid                                                 |
| [14238](www.twilio.com/docs/api/errors/14238) | ERROR TaskRouter <br/> Dial->Conference: Unable to accept Reservation                                                |
| [14239](www.twilio.com/docs/api/errors/14239) | ERROR TaskRouter <br/> Dial->Conference: Unable to update Worker                                                     |
| [14240](www.twilio.com/docs/api/errors/14240) | ERROR TaskRouter <br/> Max concurrent Workers exceeded                                                               |
| [14241](www.twilio.com/docs/api/errors/14241) | WARNING TaskRouter <br/> start\_date passed to TaskRouter statistics is older than 30 days.                          |
| [14300](www.twilio.com/docs/api/errors/14300) | ERROR Programmable Voice <br/> Start: Invalid nested noun value                                                      |
| [15000](www.twilio.com/docs/api/errors/15000) | ERROR  <br/> Call Progress: Internal Twilio Error                                                                    |
| [15002](www.twilio.com/docs/api/errors/15002) | ERROR  <br/> Call Progress: Queue Timeout                                                                            |
| [15003](www.twilio.com/docs/api/errors/15003) | WARNING  <br/> Call Progress: Warning Response to Callback URL                                                       |
| [15004](www.twilio.com/docs/api/errors/15004) | ERROR Programmable Voice <br/> Action Callback URL must be absolute when updating in-progress calls                  |
| [15009](www.twilio.com/docs/api/errors/15009) | ERROR Programmable Voice <br/> Internal Server Error                                                                 |
| [16000](www.twilio.com/docs/api/errors/16000) | ERROR Programmable Voice <br/> Whisper Not Available on Twilio Conference                                            |
| [16001](www.twilio.com/docs/api/errors/16001) | ERROR Programmable Voice <br/> Conference is not bridged                                                             |
| [16002](www.twilio.com/docs/api/errors/16002) | ERROR Programmable Voice <br/> Failed to validate conference attributes                                              |
| [16003](www.twilio.com/docs/api/errors/16003) | ERROR Programmable Voice <br/> Could not recognize conference sid or friendly name                                   |
| [16010](www.twilio.com/docs/api/errors/16010) | ERROR Programmable Voice <br/> Conference Event: Internal Twilio Error                                               |
| [16011](www.twilio.com/docs/api/errors/16011) | ERROR Programmable Voice <br/> Conference Event: Error Response to Callback URL                                      |
| [16020](www.twilio.com/docs/api/errors/16020) | ERROR Programmable Voice <br/> Conference is full                                                                    |
| [16021](www.twilio.com/docs/api/errors/16021) | ERROR Programmable Voice <br/> Failed to join conference due to account concurrency limit exceeded                   |
| [16022](www.twilio.com/docs/api/errors/16022) | ERROR Programmable Voice <br/> Conference does not exist or is completed                                             |
| [16023](www.twilio.com/docs/api/errors/16023) | ERROR Programmable Voice <br/> Conference: Participant label invalid (max 128 chars, not CallSid, no '/')            |
| [16024](www.twilio.com/docs/api/errors/16024) | ERROR Programmable Voice <br/> Participant label invalid: max 128 chars, not a CallSid, no '/'                       |
| [16025](www.twilio.com/docs/api/errors/16025) | ERROR Programmable Voice <br/> Dial->Conference: Participant label is in use by another participant                  |
| [16026](www.twilio.com/docs/api/errors/16026) | ERROR Programmable Voice <br/> Participant label is in use by another participant                                    |
| [16027](www.twilio.com/docs/api/errors/16027) | ERROR Programmable Voice <br/> Participant to be whispered is on hold                                                |
| [16028](www.twilio.com/docs/api/errors/16028) | ERROR Programmable Voice <br/> Participant to be whispered is not present in the conference                          |
| [16030](www.twilio.com/docs/api/errors/16030) | ERROR Programmable Voice <br/> Participant failed to be added to the conference                                      |
| [16099](www.twilio.com/docs/api/errors/16099) | ERROR Programmable Voice <br/> Unexpected conference status                                                          |
| [16101](www.twilio.com/docs/api/errors/16101) | WARNING Programmable Voice <br/> Voice Recording : Unavailable because duration is too short                         |
| [16102](www.twilio.com/docs/api/errors/16102) | WARNING Programmable Voice <br/> Voice Recording: Unavailable because recording is silent                            |
| [16104](www.twilio.com/docs/api/errors/16104) | ERROR Programmable Voice <br/> Voice Recording: Unavailable due to encryption failure                                |
| [16105](www.twilio.com/docs/api/errors/16105) | ERROR Programmable Voice <br/> Voice Recording: Unavailable due to no valid public keys                              |
| [16106](www.twilio.com/docs/api/errors/16106) | ERROR Programmable Voice <br/> Voice Recording: Unavailable due to internal encryption error                         |
| [16107](www.twilio.com/docs/api/errors/16107) | ERROR Programmable Voice <br/> Voice Recording: Encrypted with alternate public key                                  |
| [16108](www.twilio.com/docs/api/errors/16108) | ERROR Programmable Voice <br/> Voice Recording: Request failed due to concurrent recordings                          |
| [16109](www.twilio.com/docs/api/errors/16109) | ERROR Programmable Voice <br/> Voice Recording: Cannot fetch .mp3 encrypted recording                                |
| [16110](www.twilio.com/docs/api/errors/16110) | ERROR Programmable Voice <br/> Internal failure when bulk deleting recordings from your account                      |
| [16111](www.twilio.com/docs/api/errors/16111) | ERROR Programmable Voice <br/> Voice Recording: Upload file to external AWS S3 bucket failed (Invalid Configuration) |
| [16112](www.twilio.com/docs/api/errors/16112) | ERROR Programmable Voice <br/> Voice Recording: Upload file to external AWS S3 bucket failed (Access Denied)         |
| [16113](www.twilio.com/docs/api/errors/16113) | WARNING Programmable Voice <br/> Voice Recording: Cannot download a dual-channel presentation of a mono recording    |
| [16114](www.twilio.com/docs/api/errors/16114) | ERROR Programmable Voice <br/> Voice Recording: Resource not in a state to accept recording action request           |
| [17000](www.twilio.com/docs/api/errors/17000) | ERROR Programmable Voice <br/> Forbidden to access data                                                              |
| [17001](www.twilio.com/docs/api/errors/17001) | ERROR Programmable Voice <br/> Completed summary for this call wasn't found                                          |
| [17002](www.twilio.com/docs/api/errors/17002) | ERROR Programmable Voice <br/> This call ended more than 30 days ago                                                 |
| [17007](www.twilio.com/docs/api/errors/17007) | ERROR Programmable Voice <br/> Voice Insights Advanced Features not enabled                                          |
| [17008](www.twilio.com/docs/api/errors/17008) | ERROR Programmable Voice <br/> Internal Server Error - Query Timeout                                                 |
| [17009](www.twilio.com/docs/api/errors/17009) | ERROR Programmable Voice <br/> Internal Server Error                                                                 |
| [17400](www.twilio.com/docs/api/errors/17400) | ERROR Programmable Voice <br/> Invalid query parameter                                                               |
| [18001](www.twilio.com/docs/api/errors/18001) | ERROR Phone Numbers <br/> Invalid document submission                                                                |
| [18002](www.twilio.com/docs/api/errors/18002) | ERROR Phone Numbers <br/> Illegible or blurry document submission                                                    |
| [18003](www.twilio.com/docs/api/errors/18003) | ERROR Phone Numbers <br/> Expired or invalid document submission                                                     |
| [18004](www.twilio.com/docs/api/errors/18004) | ERROR Phone Numbers <br/> Redactions in document.                                                                    |
| [18005](www.twilio.com/docs/api/errors/18005) | ERROR Phone Numbers <br/> Missing information                                                                        |
| [18006](www.twilio.com/docs/api/errors/18006) | ERROR Phone Numbers <br/> Information does not match the supporting document                                         |
| [18007](www.twilio.com/docs/api/errors/18007) | ERROR Phone Numbers <br/> Incomplete document submission.                                                            |
| [18008](www.twilio.com/docs/api/errors/18008) | ERROR Phone Numbers <br/> Name mismatch (Proof of Identity)                                                          |
| [18009](www.twilio.com/docs/api/errors/18009) | ERROR Phone Numbers <br/> Nationality mismatch (Proof of Identity)                                                   |
| [18010](www.twilio.com/docs/api/errors/18010) | ERROR Phone Numbers <br/> Business registration number mismatch.                                                     |
| [18011](www.twilio.com/docs/api/errors/18011) | ERROR Phone Numbers <br/> Business name mismatch                                                                     |
| [18012](www.twilio.com/docs/api/errors/18012) | ERROR Phone Numbers <br/> Require domestic address.                                                                  |
| [18013](www.twilio.com/docs/api/errors/18013) | ERROR Phone Numbers <br/> Require domestic emergency address.                                                        |
| [18014](www.twilio.com/docs/api/errors/18014) | ERROR Phone Numbers <br/> Invalid or incomplete address provided.                                                    |
| [18015](www.twilio.com/docs/api/errors/18015) | ERROR Phone Numbers <br/> Invalid or incomplete emergency address provided.                                          |
| [18016](www.twilio.com/docs/api/errors/18016) | ERROR Phone Numbers <br/> Address mismatch.                                                                          |
| [18017](www.twilio.com/docs/api/errors/18017) | ERROR Phone Numbers <br/> Address not found                                                                          |
| [18018](www.twilio.com/docs/api/errors/18018) | ERROR Phone Numbers <br/> PO Box not allowed.                                                                        |
| [18019](www.twilio.com/docs/api/errors/18019) | ERROR Phone Numbers <br/> Proof of Identity Required for Authorized Representative.                                  |
| [18020](www.twilio.com/docs/api/errors/18020) | ERROR Phone Numbers <br/> Proof of authorized representative’s association with the business required.               |
| [18021](www.twilio.com/docs/api/errors/18021) | ERROR Phone Numbers <br/> Name mismatch (Proof of Address)                                                           |
| [18022](www.twilio.com/docs/api/errors/18022) | ERROR Phone Numbers <br/> Outdated Proof of Address document                                                         |
| [18023](www.twilio.com/docs/api/errors/18023) | ERROR Phone Numbers <br/> Document contains an inactive business                                                     |
| [18024](www.twilio.com/docs/api/errors/18024) | ERROR Phone Numbers <br/> Failed to upload an unprocessable document                                                 |
| [18025](www.twilio.com/docs/api/errors/18025) | ERROR Phone Numbers <br/> Document rejected (number type restricted)                                                 |
| [18036](www.twilio.com/docs/api/errors/18036) | ERROR Phone Numbers <br/> One or more of the required information is missing.                                        |
| [18037](www.twilio.com/docs/api/errors/18037) | ERROR Phone Numbers <br/> Missing information in the form                                                            |
| [18038](www.twilio.com/docs/api/errors/18038) | ERROR Phone Numbers <br/> Information does not match the supporting document                                         |
| [18039](www.twilio.com/docs/api/errors/18039) | ERROR Phone Numbers <br/> The phone number type you selected requires a valid domestic address.                      |
| [18050](www.twilio.com/docs/api/errors/18050) | ERROR Phone Numbers <br/> Issue with the Supporting Document(s)                                                      |
| [18051](www.twilio.com/docs/api/errors/18051) | ERROR Phone Numbers <br/> Issue with the inputs you provided                                                         |
| [18052](www.twilio.com/docs/api/errors/18052) | ERROR Phone Numbers <br/> Under age Individual                                                                       |
| [18053](www.twilio.com/docs/api/errors/18053) | ERROR Phone Numbers <br/> Unable to verify association between business name and website                             |
| [18054](www.twilio.com/docs/api/errors/18054) | ERROR Phone Numbers <br/> Invalid phone number                                                                       |
| [18055](www.twilio.com/docs/api/errors/18055) | ERROR Phone Numbers <br/> Invalid email                                                                              |
| [18056](www.twilio.com/docs/api/errors/18056) | ERROR Phone Numbers <br/> Missing Work Email for Authorized Representative                                           |
| [18057](www.twilio.com/docs/api/errors/18057) | ERROR Phone Numbers <br/> Validation Issue for Authorized Representative                                             |
| [18058](www.twilio.com/docs/api/errors/18058) | ERROR Phone Numbers <br/> Missing Tax ID                                                                             |
| [18059](www.twilio.com/docs/api/errors/18059) | ERROR Phone Numbers <br/> Missing/Invalid Photo ID                                                                   |
| [18060](www.twilio.com/docs/api/errors/18060) | ERROR Phone Numbers <br/> Commercial registration copy not submitted                                                 |
| [18061](www.twilio.com/docs/api/errors/18061) | ERROR Phone Numbers <br/> Invalid excerpt from the commercial register                                               |
| [18062](www.twilio.com/docs/api/errors/18062) | ERROR Phone Numbers <br/> Business Details contain an inactive business                                              |
| [18063](www.twilio.com/docs/api/errors/18063) | ERROR Phone Numbers <br/> Phone Number purchase restricted                                                           |
| [18064](www.twilio.com/docs/api/errors/18064) | ERROR Phone Numbers <br/> Ineligible for business bundle                                                             |
| [18099](www.twilio.com/docs/api/errors/18099) | ERROR Phone Numbers <br/> Rejected test bundle                                                                       |
| [18601](www.twilio.com/docs/api/errors/18601) | ERROR Phone Numbers <br/> The association between business name and website cannot be verified                       |
| [18602](www.twilio.com/docs/api/errors/18602) | ERROR Phone Numbers <br/> The Business ID you provided could not be verified                                         |
| [18603](www.twilio.com/docs/api/errors/18603) | ERROR Phone Numbers <br/> The address could not be verified                                                          |
| [18604](www.twilio.com/docs/api/errors/18604) | ERROR Phone Numbers <br/> Unable to verify Authorized representative #1                                              |
| [18605](www.twilio.com/docs/api/errors/18605) | ERROR Phone Numbers <br/> Unable to verify Authorized representative #2.                                             |
| [18606](www.twilio.com/docs/api/errors/18606) | ERROR Phone Numbers <br/> The Email domain doesn't match the website domain                                          |
| [18607](www.twilio.com/docs/api/errors/18607) | ERROR Phone Numbers <br/> Customer Profile or Trust Product is not eligible to be copied                             |
| [18608](www.twilio.com/docs/api/errors/18608) | ERROR Phone Numbers <br/> Customer Profile or Trust Product is already copied                                        |
| [18609](www.twilio.com/docs/api/errors/18609) | ERROR Phone Numbers <br/> Ineligible Business Registration Authority                                                 |
| [18610](www.twilio.com/docs/api/errors/18610) | ERROR Phone Numbers <br/> Customer Profile or Trust Product cannot be copied due to a deleted Address                |
| [19003](www.twilio.com/docs/api/errors/19003) | ERROR Account <br/> Contact with the unique\_customer\_provided\_id provided already exists                          |
| [19004](www.twilio.com/docs/api/errors/19004) | ERROR Account <br/> Invalid or missing Contact input                                                                 |
| [19005](www.twilio.com/docs/api/errors/19005) | ERROR  <br/> Contact validation error                                                                                |
| [19010](www.twilio.com/docs/api/errors/19010) | ERROR  <br/> Invalid contact search request                                                                          |
| [19011](www.twilio.com/docs/api/errors/19011) | ERROR Branded Comms, Usage <br/> Contact update failed: invalid JSON or non-updatable field                          |
| [19012](www.twilio.com/docs/api/errors/19012) | ERROR Account <br/> When updating a contact at least one field should be updated                                     |
| [19013](www.twilio.com/docs/api/errors/19013) | ERROR Branded Comms <br/> Contact requires at least one name, unique\_customer\_provided\_id, or channel             |
| [19014](www.twilio.com/docs/api/errors/19014) | ERROR  <br/> Can fetch contact either by unique\_customer\_provided\_id or channel                                   |
| [19020](www.twilio.com/docs/api/errors/19020) | ERROR  <br/> Contact with the provided channel value already exists                                                  |
| [19021](www.twilio.com/docs/api/errors/19021) | ERROR  <br/> Only one channel can be set as primary                                                                  |
| [19022](www.twilio.com/docs/api/errors/19022) | ERROR  <br/> Invalid channel                                                                                         |
| [19023](www.twilio.com/docs/api/errors/19023) | ERROR Branded Comms <br/> Invalid channel type                                                                       |
| [19024](www.twilio.com/docs/api/errors/19024) | ERROR  <br/> Invalid channel input                                                                                   |
| [19025](www.twilio.com/docs/api/errors/19025) | ERROR  <br/> Channel validation error                                                                                |
| [19026](www.twilio.com/docs/api/errors/19026) | ERROR  <br/> Maximum number of channels allowed reached                                                              |
| [19027](www.twilio.com/docs/api/errors/19027) | ERROR  <br/> Invalid Channel Description                                                                             |
| [19028](www.twilio.com/docs/api/errors/19028) | ERROR  <br/> Channel value can not be updated                                                                        |
| [19029](www.twilio.com/docs/api/errors/19029) | ERROR Account <br/> When updating a channel at least one field should be updated                                     |
| [19030](www.twilio.com/docs/api/errors/19030) | ERROR  <br/> Invalid location type                                                                                   |
| [19031](www.twilio.com/docs/api/errors/19031) | ERROR Account <br/> Maximum number of locations allowed reached                                                      |
| [19032](www.twilio.com/docs/api/errors/19032) | ERROR  <br/> Invalid location input                                                                                  |
| [19033](www.twilio.com/docs/api/errors/19033) | ERROR  <br/> Location validation error                                                                               |
| [19034](www.twilio.com/docs/api/errors/19034) | ERROR  <br/> Invalid country code                                                                                    |
| [19035](www.twilio.com/docs/api/errors/19035) | ERROR  <br/> Invalid page size, it must be between 1 and 25 if specified                                             |
| [19036](www.twilio.com/docs/api/errors/19036) | ERROR  <br/> Invalid page token                                                                                      |
| [19037](www.twilio.com/docs/api/errors/19037) | ERROR Account <br/> When updating a location at least one field should be updated                                    |
| [19038](www.twilio.com/docs/api/errors/19038) | ERROR Programmable Chat <br/> Page token must be bigger than or equal to 0                                           |
| [19040](www.twilio.com/docs/api/errors/19040) | ERROR  <br/> Custom Field provided is not defined                                                                    |
| [19041](www.twilio.com/docs/api/errors/19041) | ERROR  <br/> Invalid or missing Custom Field input                                                                   |
| [19042](www.twilio.com/docs/api/errors/19042) | ERROR  <br/> Custom Field validation error                                                                           |
| [19043](www.twilio.com/docs/api/errors/19043) | ERROR Account, Sendgrid <br/> Field definition name already exists                                                   |
| [19044](www.twilio.com/docs/api/errors/19044) | ERROR Account <br/> Field definition name exceeded maximum length                                                    |
| [19045](www.twilio.com/docs/api/errors/19045) | ERROR Account <br/> Invalid field type. Supported types: text, date, number                                          |
| [19046](www.twilio.com/docs/api/errors/19046) | ERROR Account <br/> Number of custom field definitions exceeded limit                                                |
| [19047](www.twilio.com/docs/api/errors/19047) | ERROR Account <br/> Field definition name cannot be empty                                                            |
| [19048](www.twilio.com/docs/api/errors/19048) | ERROR Account <br/> Input request body is not properly json formatted                                                |
| [19049](www.twilio.com/docs/api/errors/19049) | ERROR Account <br/> Custom field definition provided is not defined                                                  |
| [19050](www.twilio.com/docs/api/errors/19050) | ERROR  <br/> Internal Server Error                                                                                   |
| [19052](www.twilio.com/docs/api/errors/19052) | ERROR Account <br/> Invalid page size for custom field definition                                                    |
| [19053](www.twilio.com/docs/api/errors/19053) | ERROR Account <br/> Field definition name cannot be a duplicate of an existing Twilio-defined field                  |
| [19054](www.twilio.com/docs/api/errors/19054) | ERROR Account <br/> Expected Unique form key in input request is missing                                             |
| [19055](www.twilio.com/docs/api/errors/19055) | ERROR Account <br/> Channel update failed: invalid JSON or non-updatable field                                       |
| [19056](www.twilio.com/docs/api/errors/19056) | ERROR Account <br/> Input request content type is invalid                                                            |
| [19057](www.twilio.com/docs/api/errors/19057) | ERROR Account <br/> Server unavailable or busy                                                                       |

[Back to top](#)

## 20000-29999

| Code                                          | Description                                                                                                    |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [20001](www.twilio.com/docs/api/errors/20001) | WARNING  <br/> Unknown parameters                                                                              |
| [20002](www.twilio.com/docs/api/errors/20002) | ERROR  <br/> Invalid FriendlyName                                                                              |
| [20003](www.twilio.com/docs/api/errors/20003) | ERROR Account, Iam <br/> Permission Denied                                                                     |
| [20004](www.twilio.com/docs/api/errors/20004) | ERROR  <br/> Method not allowed                                                                                |
| [20005](www.twilio.com/docs/api/errors/20005) | ERROR  <br/> Account not active                                                                                |
| [20006](www.twilio.com/docs/api/errors/20006) | ERROR  <br/> Access Denied                                                                                     |
| [20007](www.twilio.com/docs/api/errors/20007) | ERROR  <br/> Page size too large                                                                               |
| [20008](www.twilio.com/docs/api/errors/20008) | ERROR  <br/> Test Credentials                                                                                  |
| [20009](www.twilio.com/docs/api/errors/20009) | ERROR  <br/> Cannot delete this resource before it is complete                                                 |
| [20010](www.twilio.com/docs/api/errors/20010) | ERROR  <br/> Action disabled for account                                                                       |
| [20011](www.twilio.com/docs/api/errors/20011) | ERROR  <br/> Invalid TLS version                                                                               |
| [20012](www.twilio.com/docs/api/errors/20012) | ERROR  <br/> Invalid TLSv1.2 Cipher Suite                                                                      |
| [20020](www.twilio.com/docs/api/errors/20020) | ERROR  <br/> No update/state change is observed for the data entered                                           |
| [20021](www.twilio.com/docs/api/errors/20021) | ERROR  <br/> Phone number rejected by T-Mobile SDG Service Provisioning API                                    |
| [20023](www.twilio.com/docs/api/errors/20023) | ERROR  <br/> Phone number is not correct: it cannot be null or have non-decimal symbols                        |
| [20101](www.twilio.com/docs/api/errors/20101) | ERROR Account, Iam, Programmable Voice, Programmable Video, Connect, Sync <br/> Invalid Access Token           |
| [20102](www.twilio.com/docs/api/errors/20102) | ERROR Account <br/> Invalid Access Token header                                                                |
| [20103](www.twilio.com/docs/api/errors/20103) | ERROR Account <br/> Invalid Access Token issuer/subject                                                        |
| [20104](www.twilio.com/docs/api/errors/20104) | WARNING Account, Iam <br/> Access Token expired or expiration date invalid                                     |
| [20105](www.twilio.com/docs/api/errors/20105) | ERROR Account, Programmable Video <br/> Access Token not yet valid                                             |
| [20106](www.twilio.com/docs/api/errors/20106) | ERROR Account <br/> Invalid Access Token grants                                                                |
| [20107](www.twilio.com/docs/api/errors/20107) | ERROR Account <br/> Invalid Access Token signature                                                             |
| [20151](www.twilio.com/docs/api/errors/20151) | ERROR Account <br/> Authentication Failed                                                                      |
| [20152](www.twilio.com/docs/api/errors/20152) | ERROR Account, Iam <br/> Invalid Header                                                                        |
| [20153](www.twilio.com/docs/api/errors/20153) | ERROR Account <br/> Invalid Issuer Or Subject                                                                  |
| [20154](www.twilio.com/docs/api/errors/20154) | ERROR Account, Iam <br/> Invalid Claim Set                                                                     |
| [20155](www.twilio.com/docs/api/errors/20155) | ERROR Account <br/> Expiration Time In The Future                                                              |
| [20156](www.twilio.com/docs/api/errors/20156) | ERROR Account, Iam <br/> Expired or Invalid Expiration in Token                                                |
| [20157](www.twilio.com/docs/api/errors/20157) | ERROR Account, Iam <br/> Expiration Time Exceeds Maximum Time Allowed                                          |
| [20159](www.twilio.com/docs/api/errors/20159) | ERROR Account <br/> Invalid Signature                                                                          |
| [20160](www.twilio.com/docs/api/errors/20160) | ERROR Account <br/> Invalid Token                                                                              |
| [20161](www.twilio.com/docs/api/errors/20161) | ERROR Programmable Chat <br/> Programmable Chat: Parameters are not specified for update request               |
| [20162](www.twilio.com/docs/api/errors/20162) | ERROR Account <br/> A conflicting resource update is in progress                                               |
| [20403](www.twilio.com/docs/api/errors/20403) | ERROR Account <br/> 403 Forbidden                                                                              |
| [20404](www.twilio.com/docs/api/errors/20404) | ERROR Account <br/> Not Found                                                                                  |
| [20409](www.twilio.com/docs/api/errors/20409) | ERROR Account <br/> Conflict                                                                                   |
| [20410](www.twilio.com/docs/api/errors/20410) | ERROR Branded Comms <br/> Gone                                                                                 |
| [20412](www.twilio.com/docs/api/errors/20412) | ERROR  <br/> Precondition Failed                                                                               |
| [20413](www.twilio.com/docs/api/errors/20413) | ERROR  <br/> Request Entity Too Large                                                                          |
| [20422](www.twilio.com/docs/api/errors/20422) | ERROR  <br/> Invalid Parameter                                                                                 |
| [20423](www.twilio.com/docs/api/errors/20423) | ERROR  <br/> Invalid SID                                                                                       |
| [20426](www.twilio.com/docs/api/errors/20426) | ERROR  <br/> Upgrade Required                                                                                  |
| [20429](www.twilio.com/docs/api/errors/20429) | ERROR Account <br/> Too many requests                                                                          |
| [20500](www.twilio.com/docs/api/errors/20500) | ERROR  <br/> Internal Server Error                                                                             |
| [20503](www.twilio.com/docs/api/errors/20503) | ERROR  <br/> Service unavailable                                                                               |
| [20504](www.twilio.com/docs/api/errors/20504) | ERROR Branded Comms <br/> Twilio Internal Error                                                                |
| [21100](www.twilio.com/docs/api/errors/21100) | ERROR  <br/> Accounts Resource                                                                                 |
| [21101](www.twilio.com/docs/api/errors/21101) | ERROR  <br/> Subaccounts cannot contain subaccounts                                                            |
| [21102](www.twilio.com/docs/api/errors/21102) | ERROR Account <br/> Reached maximum number of Services                                                         |
| [21200](www.twilio.com/docs/api/errors/21200) | ERROR  <br/> Calls Resource                                                                                    |
| [21201](www.twilio.com/docs/api/errors/21201) | ERROR  <br/> No Called number specified                                                                        |
| [21202](www.twilio.com/docs/api/errors/21202) | ERROR  <br/> Called number is a premium number                                                                 |
| [21203](www.twilio.com/docs/api/errors/21203) | ERROR  <br/> International calling not enabled                                                                 |
| [21204](www.twilio.com/docs/api/errors/21204) | ERROR  <br/> Call already initiated                                                                            |
| [21205](www.twilio.com/docs/api/errors/21205) | ERROR  <br/> Invalid URL                                                                                       |
| [21206](www.twilio.com/docs/api/errors/21206) | ERROR Programmable Voice <br/> Invalid SendDigits                                                              |
| [21207](www.twilio.com/docs/api/errors/21207) | ERROR  <br/> Invalid IfMachine                                                                                 |
| [21208](www.twilio.com/docs/api/errors/21208) | ERROR  <br/> Invalid Timeout                                                                                   |
| [21209](www.twilio.com/docs/api/errors/21209) | ERROR  <br/> Invalid Method                                                                                    |
| [21210](www.twilio.com/docs/api/errors/21210) | ERROR  <br/> 'From' phone number not verified                                                                  |
| [21211](www.twilio.com/docs/api/errors/21211) | ERROR  <br/> Invalid 'To' Phone Number                                                                         |
| [21212](www.twilio.com/docs/api/errors/21212) | ERROR  <br/> Invalid 'From' Number                                                                             |
| [21213](www.twilio.com/docs/api/errors/21213) | ERROR  <br/> Caller phone number is required                                                                   |
| [21214](www.twilio.com/docs/api/errors/21214) | ERROR  <br/> 'To' phone number cannot be reached                                                               |
| [21215](www.twilio.com/docs/api/errors/21215) | ERROR Programmable Voice <br/> Geo Permission configuration is not permitting call                             |
| [21216](www.twilio.com/docs/api/errors/21216) | ERROR Programmable Voice, Trust-Hub <br/> API: Call blocked by Twilio                                          |
| [21217](www.twilio.com/docs/api/errors/21217) | ERROR  <br/> Phone number does not appear to be valid                                                          |
| [21218](www.twilio.com/docs/api/errors/21218) | ERROR  <br/> Invalid ApplicationSid                                                                            |
| [21219](www.twilio.com/docs/api/errors/21219) | ERROR  <br/> 'To' phone number not verified                                                                    |
| [21220](www.twilio.com/docs/api/errors/21220) | ERROR  <br/> Invalid call state                                                                                |
| [21221](www.twilio.com/docs/api/errors/21221) | WARNING  <br/> Invalid SipAuthUsername. Must be fewer than 256 chars                                           |
| [21222](www.twilio.com/docs/api/errors/21222) | WARNING  <br/> Invalid SipAuthUsername. Illegal chars                                                          |
| [21223](www.twilio.com/docs/api/errors/21223) | WARNING  <br/> Invalid SipAuthPassword. Must be fewer than 256 chars                                           |
| [21224](www.twilio.com/docs/api/errors/21224) | WARNING  <br/> Invalid SipAuthPassword. Illegal chars                                                          |
| [21225](www.twilio.com/docs/api/errors/21225) | WARNING  <br/> SipAuthPassword is required when providing SipAuthUsername                                      |
| [21226](www.twilio.com/docs/api/errors/21226) | WARNING  <br/> SIP calling not enabled for this account                                                        |
| [21227](www.twilio.com/docs/api/errors/21227) | WARNING  <br/> Headers portion of SIP URI must be fewer than 1024 chars                                        |
| [21228](www.twilio.com/docs/api/errors/21228) | WARNING  <br/> Invalid SIP Header. Illegal chars in header name                                                |
| [21229](www.twilio.com/docs/api/errors/21229) | WARNING  <br/> Invalid SIP Header. Illegal chars in header value                                               |
| [21230](www.twilio.com/docs/api/errors/21230) | ERROR  <br/> Maximum Domains Reached                                                                           |
| [21231](www.twilio.com/docs/api/errors/21231) | ERROR  <br/> Domain Validation Error                                                                           |
| [21232](www.twilio.com/docs/api/errors/21232) | ERROR  <br/> Invalid Domain                                                                                    |
| [21233](www.twilio.com/docs/api/errors/21233) | ERROR  <br/> Domain still has subdomains                                                                       |
| [21234](www.twilio.com/docs/api/errors/21234) | ERROR Programmable Voice <br/> Invalid Machine Detection configuration value                                   |
| [21235](www.twilio.com/docs/api/errors/21235) | ERROR  <br/> IP Access Control List Validation Error                                                           |
| [21236](www.twilio.com/docs/api/errors/21236) | ERROR  <br/> IP Access Control List Dependencies Violation                                                     |
| [21237](www.twilio.com/docs/api/errors/21237) | ERROR  <br/> Maximum IP Addresses Reached for List                                                             |
| [21238](www.twilio.com/docs/api/errors/21238) | ERROR  <br/> Address Validation Error                                                                          |
| [21239](www.twilio.com/docs/api/errors/21239) | ERROR  <br/> Maximum Credential Lists Reached                                                                  |
| [21240](www.twilio.com/docs/api/errors/21240) | ERROR  <br/> Credential List Validation Error                                                                  |
| [21241](www.twilio.com/docs/api/errors/21241) | ERROR  <br/> Credential List Dependencies Violation                                                            |
| [21242](www.twilio.com/docs/api/errors/21242) | ERROR  <br/> Maximum Credentials Reached for List                                                              |
| [21243](www.twilio.com/docs/api/errors/21243) | ERROR  <br/> Credential Validation Error                                                                       |
| [21244](www.twilio.com/docs/api/errors/21244) | ERROR Elastic SIP Trunking <br/> Maximum Number of Trunks reached                                              |
| [21245](www.twilio.com/docs/api/errors/21245) | ERROR Elastic SIP Trunking <br/> Trunk Validation Error                                                        |
| [21247](www.twilio.com/docs/api/errors/21247) | ERROR Elastic SIP Trunking <br/> Trunk Dependencies                                                            |
| [21248](www.twilio.com/docs/api/errors/21248) | ERROR Elastic SIP Trunking <br/> Trunk Domain already taken                                                    |
| [21249](www.twilio.com/docs/api/errors/21249) | ERROR Elastic SIP Trunking <br/> Maximum Origination URIs reached                                              |
| [21251](www.twilio.com/docs/api/errors/21251) | ERROR Elastic SIP Trunking <br/> Trunking CPS change not allowed                                               |
| [21252](www.twilio.com/docs/api/errors/21252) | ERROR Elastic SIP Trunking <br/> Invalid Region                                                                |
| [21253](www.twilio.com/docs/api/errors/21253) | ERROR Elastic SIP Trunking <br/> Max Connection Policies Reached                                               |
| [21254](www.twilio.com/docs/api/errors/21254) | ERROR Elastic SIP Trunking <br/> Max Connection Policy Entries Reached                                         |
| [21255](www.twilio.com/docs/api/errors/21255) | ERROR  <br/> Maximum IP Access Control Lists reached                                                           |
| [21256](www.twilio.com/docs/api/errors/21256) | ERROR Elastic SIP Trunking <br/> Invalid ruleset                                                               |
| [21257](www.twilio.com/docs/api/errors/21257) | ERROR Elastic SIP Trunking <br/> Invalid SIP Manipulation Policy SID                                           |
| [21258](www.twilio.com/docs/api/errors/21258) | ERROR Elastic SIP Trunking <br/> Invalid SIP Manipulation Policy                                               |
| [21259](www.twilio.com/docs/api/errors/21259) | ERROR Elastic SIP Trunking <br/> Maximum number of SIP Manipulation Polies per account reached                 |
| [21260](www.twilio.com/docs/api/errors/21260) | ERROR Elastic SIP Trunking <br/> Maximum number of actions per rule reached                                    |
| [21261](www.twilio.com/docs/api/errors/21261) | ERROR Elastic SIP Trunking <br/> Maximum number of conditions per rule reached                                 |
| [21262](www.twilio.com/docs/api/errors/21262) | WARNING Programmable Voice <br/> No AMD status callback URL provided                                           |
| [21263](www.twilio.com/docs/api/errors/21263) | WARNING Programmable Voice <br/> Invalid Answering Machine Detection Parameters                                |
| [21264](www.twilio.com/docs/api/errors/21264) | ERROR  <br/> ‘From’ phone number not verified                                                                  |
| [21265](www.twilio.com/docs/api/errors/21265) | ERROR Branded Comms <br/> 'To' number cannot be a Short Code                                                   |
| [21266](www.twilio.com/docs/api/errors/21266) | ERROR Branded Comms <br/> 'To' and 'From' numbers cannot be the same                                           |
| [21267](www.twilio.com/docs/api/errors/21267) | ERROR Branded Comms <br/> Alphanumeric Sender ID cannot be used as the 'From' number on trial accounts         |
| [21268](www.twilio.com/docs/api/errors/21268) | ERROR Branded Comms <br/> Sending to Premium rate or Information Service numbers is not allowed                |
| [21300](www.twilio.com/docs/api/errors/21300) | ERROR Programmable Voice <br/> Invalid BYOC trunk SID                                                          |
| [21301](www.twilio.com/docs/api/errors/21301) | ERROR Programmable Voice <br/> Cannot create application: application limit exceeded                           |
| [21302](www.twilio.com/docs/api/errors/21302) | WARNING Programmable Voice <br/> Approaching application creation limit                                        |
| [21401](www.twilio.com/docs/api/errors/21401) | ERROR  <br/> Invalid Phone Number                                                                              |
| [21402](www.twilio.com/docs/api/errors/21402) | ERROR  <br/> Invalid Url                                                                                       |
| [21403](www.twilio.com/docs/api/errors/21403) | ERROR  <br/> Invalid Method                                                                                    |
| [21404](www.twilio.com/docs/api/errors/21404) | ERROR  <br/> Inbound Phone number not available to trial account                                               |
| [21405](www.twilio.com/docs/api/errors/21405) | ERROR  <br/> Cannot set VoiceFallbackUrl without setting Url                                                   |
| [21406](www.twilio.com/docs/api/errors/21406) | ERROR  <br/> Cannot set SmsFallbackUrl without setting SmsUrl                                                  |
| [21407](www.twilio.com/docs/api/errors/21407) | ERROR  <br/> This Phone Number type does not support SMS                                                       |
| [21408](www.twilio.com/docs/api/errors/21408) | ERROR Branded Comms <br/> Message blocked: permissions disabled for the destination region                     |
| [21409](www.twilio.com/docs/api/errors/21409) | ERROR  <br/> VoiceCallerIdLookup cannot be set for this phone number                                           |
| [21420](www.twilio.com/docs/api/errors/21420) | ERROR  <br/> ApplicationSid is not accessible                                                                  |
| [21421](www.twilio.com/docs/api/errors/21421) | ERROR  <br/> Phone Number is invalid                                                                           |
| [21422](www.twilio.com/docs/api/errors/21422) | ERROR  <br/> PhoneNumber is not available                                                                      |
| [21449](www.twilio.com/docs/api/errors/21449) | ERROR Phone Numbers <br/> Number already can be used for outgoing calls and messages                           |
| [21450](www.twilio.com/docs/api/errors/21450) | ERROR  <br/> Phone number already validated on your account                                                    |
| [21451](www.twilio.com/docs/api/errors/21451) | ERROR  <br/> Invalid area code                                                                                 |
| [21452](www.twilio.com/docs/api/errors/21452) | ERROR  <br/> No phone numbers found in area code                                                               |
| [21453](www.twilio.com/docs/api/errors/21453) | ERROR  <br/> Phone number already validated on another account                                                 |
| [21454](www.twilio.com/docs/api/errors/21454) | ERROR  <br/> Invalid CallDelay                                                                                 |
| [21455](www.twilio.com/docs/api/errors/21455) | ERROR  <br/> Invalid PlayUrl                                                                                   |
| [21456](www.twilio.com/docs/api/errors/21456) | ERROR  <br/> Invalid CallbackUrl                                                                               |
| [21457](www.twilio.com/docs/api/errors/21457) | ERROR  <br/> AreaCode Parameter not Supported                                                                  |
| [21458](www.twilio.com/docs/api/errors/21458) | ERROR  <br/> PhoneNumber Provisioning Type Mismatch                                                            |
| [21470](www.twilio.com/docs/api/errors/21470) | ERROR  <br/> Invalid AccountSid                                                                                |
| [21471](www.twilio.com/docs/api/errors/21471) | ERROR  <br/> Account does not exist                                                                            |
| [21472](www.twilio.com/docs/api/errors/21472) | ERROR  <br/> Account is not active                                                                             |
| [21473](www.twilio.com/docs/api/errors/21473) | ERROR Phone Numbers, Iam <br/> Transfer target AccountSid is not related to the phone number owner             |
| [21474](www.twilio.com/docs/api/errors/21474) | ERROR  <br/> API User must be the parent account to transfer phone numbers.                                    |
| [21475](www.twilio.com/docs/api/errors/21475) | ERROR  <br/> Unable to update Status, invalid Status.                                                          |
| [21476](www.twilio.com/docs/api/errors/21476) | ERROR  <br/> Unable to update Status for subaccount, parent account is suspended.                              |
| [21477](www.twilio.com/docs/api/errors/21477) | ERROR  <br/> Unable to update Status for parent accounts                                                       |
| [21478](www.twilio.com/docs/api/errors/21478) | ERROR  <br/> Unable to update Status for subaccount, subaccount has been suspended by Twilio                   |
| [21479](www.twilio.com/docs/api/errors/21479) | ERROR  <br/> Unable to update Status for subaccount, subaccount has been closed.                               |
| [21480](www.twilio.com/docs/api/errors/21480) | ERROR  <br/> Reached maximum number of subaccounts                                                             |
| [21481](www.twilio.com/docs/api/errors/21481) | ERROR Account <br/> Invalid PageToken                                                                          |
| [21501](www.twilio.com/docs/api/errors/21501) | ERROR  <br/> Resource not available                                                                            |
| [21502](www.twilio.com/docs/api/errors/21502) | ERROR  <br/> Invalid callback url                                                                              |
| [21503](www.twilio.com/docs/api/errors/21503) | ERROR  <br/> Invalid transcription type                                                                        |
| [21504](www.twilio.com/docs/api/errors/21504) | ERROR  <br/> RecordingSid is required.                                                                         |
| [21601](www.twilio.com/docs/api/errors/21601) | ERROR  <br/> Phone number is not a valid SMS-capable inbound phone number                                      |
| [21602](www.twilio.com/docs/api/errors/21602) | ERROR  <br/> Message body is required                                                                          |
| [21603](www.twilio.com/docs/api/errors/21603) | ERROR Branded Comms <br/> A 'From' or 'MessagingServiceSid' parameter is required to send a message            |
| [21604](www.twilio.com/docs/api/errors/21604) | ERROR  <br/> The destination 'To' phone number is required to send an SMS                                      |
| [21605](www.twilio.com/docs/api/errors/21605) | ERROR Branded Comms <br/> Maximum body length is 160 characters (old API endpoint)                             |
| [21606](www.twilio.com/docs/api/errors/21606) | ERROR Branded Comms, Iam <br/> 'From' number is not a valid message-capable Twilio number for this account     |
| [21607](www.twilio.com/docs/api/errors/21607) | ERROR  <br/> The 'from' phone number must be the sandbox phone number for trial accounts.                      |
| [21608](www.twilio.com/docs/api/errors/21608) | ERROR  <br/> The 'to' phone number provided is not yet verified for this account.                              |
| [21609](www.twilio.com/docs/api/errors/21609) | ERROR Branded Comms <br/> Invalid 'StatusCallback'                                                             |
| [21610](www.twilio.com/docs/api/errors/21610) | ERROR Branded Comms <br/> Attempt to send to unsubscribed recipient                                            |
| [21611](www.twilio.com/docs/api/errors/21611) | ERROR Branded Comms <br/> This 'From' number has exceeded the maximum number of queued messages                |
| [21612](www.twilio.com/docs/api/errors/21612) | ERROR Branded Comms <br/> Message cannot be sent with the current combination of "To" and/or "From" parameters |
| [21613](www.twilio.com/docs/api/errors/21613) | ERROR  <br/> PhoneNumber Requires Certification                                                                |
| [21614](www.twilio.com/docs/api/errors/21614) | ERROR Branded Comms <br/> 'To' number is not a valid mobile number                                             |
| [21615](www.twilio.com/docs/api/errors/21615) | ERROR Phone Numbers <br/> Phone Number Requires a Local Address                                                |
| [21616](www.twilio.com/docs/api/errors/21616) | ERROR  <br/> The 'From' number matches multiple numbers for your account                                       |
| [21617](www.twilio.com/docs/api/errors/21617) | ERROR Branded Comms <br/> The concatenated message body exceeds the 1600 character limit                       |
| [21618](www.twilio.com/docs/api/errors/21618) | ERROR  <br/> The message body cannot be sent                                                                   |
| [21619](www.twilio.com/docs/api/errors/21619) | ERROR Branded Comms <br/> A Message Body, Media URL or Content SID is required                                 |
| [21620](www.twilio.com/docs/api/errors/21620) | ERROR  <br/> Invalid media URL(s)                                                                              |
| [21621](www.twilio.com/docs/api/errors/21621) | ERROR  <br/> The 'From' number has not been enabled for MMS                                                    |
| [21622](www.twilio.com/docs/api/errors/21622) | ERROR  <br/> MMS has not been enabled for your account                                                         |
| [21623](www.twilio.com/docs/api/errors/21623) | ERROR  <br/> Number of media files exceeds allowed limit                                                       |
| [21624](www.twilio.com/docs/api/errors/21624) | ERROR Branded Comms <br/> Invalid validity period value                                                        |
| [21626](www.twilio.com/docs/api/errors/21626) | ERROR  <br/> Invalid 'StatusCallbackEvent'                                                                     |
| [21627](www.twilio.com/docs/api/errors/21627) | ERROR Branded Comms <br/> Max Price must be a valid float                                                      |
| [21628](www.twilio.com/docs/api/errors/21628) | ERROR Phone Numbers <br/> Address Validation Error                                                             |
| [21629](www.twilio.com/docs/api/errors/21629) | ERROR Phone Numbers <br/> Address Validation Error - Check Suggested Address                                   |
| [21630](www.twilio.com/docs/api/errors/21630) | ERROR Phone Numbers <br/> Cannot mutate Address that is linked to a verified Document.                         |
| [21631](www.twilio.com/docs/api/errors/21631) | ERROR Phone Numbers <br/> Phone Number Requires an Address                                                     |
| [21634](www.twilio.com/docs/api/errors/21634) | ERROR Elastic SIP Trunking <br/> SIP Trunk is in use for emergency calling                                     |
| [21635](www.twilio.com/docs/api/errors/21635) | ERROR Branded Comms <br/> 'To' number cannot be a landline                                                     |
| [21644](www.twilio.com/docs/api/errors/21644) | ERROR Phone Numbers <br/> End-User cannot be deleted due to an active assignment to a Bundle                   |
| [21645](www.twilio.com/docs/api/errors/21645) | ERROR Phone Numbers <br/> Supporting Document cannot be deleted due to active Regulatory Bundle assignment     |
| [21646](www.twilio.com/docs/api/errors/21646) | ERROR Phone Numbers <br/> Supporting Document is not eligible for deletion                                     |
| [21647](www.twilio.com/docs/api/errors/21647) | ERROR Phone Numbers <br/> Regulatory Bundle is not eligible for deletion                                       |
| [21648](www.twilio.com/docs/api/errors/21648) | ERROR Phone Numbers <br/> Regulatory Bundle cannot be deleted due to active number assignment                  |
| [21649](www.twilio.com/docs/api/errors/21649) | ERROR Phone Numbers <br/> Phone Number Requires a Bundle                                                       |
| [21650](www.twilio.com/docs/api/errors/21650) | ERROR Phone Numbers <br/> Phone Number Requires a Verified Identity Document                                   |
| [21651](www.twilio.com/docs/api/errors/21651) | ERROR Phone Numbers <br/> Document does not satisfy regulatory requirement                                     |
| [21652](www.twilio.com/docs/api/errors/21652) | ERROR Branded Comms <br/> Maximum subject length is 40 characters                                              |
| [21653](www.twilio.com/docs/api/errors/21653) | ERROR  <br/> There are more recipient addresses than allowed                                                   |
| [21654](www.twilio.com/docs/api/errors/21654) | ERROR Branded Comms, Content <br/> ContentSid Required                                                         |
| [21655](www.twilio.com/docs/api/errors/21655) | ERROR Branded Comms, Content <br/> The ContentSid is Invalid                                                   |
| [21656](www.twilio.com/docs/api/errors/21656) | ERROR Branded Comms, Content <br/> The ContentVariables Parameter is invalid                                   |
| [21657](www.twilio.com/docs/api/errors/21657) | ERROR Branded Comms <br/> The Sender ID is invalid                                                             |
| [21658](www.twilio.com/docs/api/errors/21658) | ERROR Branded Comms, Content <br/> Parameter exceeded character limit                                          |
| [21659](www.twilio.com/docs/api/errors/21659) | ERROR Branded Comms <br/> 'From' is not a Twilio phone number or Short Code country mismatch                   |
| [21660](www.twilio.com/docs/api/errors/21660) | ERROR Branded Comms <br/> Mismatch between the 'From' number and the account                                   |
| [21661](www.twilio.com/docs/api/errors/21661) | ERROR Branded Comms <br/> 'From' number is not SMS-capable                                                     |
| [21662](www.twilio.com/docs/api/errors/21662) | ERROR Branded Comms <br/> Current combination of 'From' and 'To' parameters cannot be used in Ireland region   |
| [21663](www.twilio.com/docs/api/errors/21663) | ERROR Branded Comms <br/> 'From' phone number routing configuration is incorrect                               |
| [21664](www.twilio.com/docs/api/errors/21664) | ERROR Branded Comms <br/> 'FallbackFrom' cannot be used with a 'From' sender                                   |
| [21665](www.twilio.com/docs/api/errors/21665) | ERROR Branded Comms <br/> Invalid 'FallbackFrom' sender                                                        |
| [21666](www.twilio.com/docs/api/errors/21666) | ERROR Branded Comms <br/> 'FallbackFrom' requires MessagingServiceSid                                          |
| [21667](www.twilio.com/docs/api/errors/21667) | ERROR Branded Comms <br/> 'FallbackFrom' requires the Messaging Service to have an RCS Sender                  |
| [21668](www.twilio.com/docs/api/errors/21668) | ERROR Branded Comms <br/> Phone number type is not supported for messaging in the Ireland (IE1) region.        |
| [21701](www.twilio.com/docs/api/errors/21701) | ERROR  <br/> The Messaging Service does not exist                                                              |
| [21702](www.twilio.com/docs/api/errors/21702) | ERROR  <br/> The Messaging Service is not available to send new messages                                       |
| [21703](www.twilio.com/docs/api/errors/21703) | ERROR Branded Comms <br/> The Messaging Service does not have a phone number available to send a message       |
| [21704](www.twilio.com/docs/api/errors/21704) | ERROR Branded Comms <br/> The Messaging Service contains no phone numbers                                      |
| [21705](www.twilio.com/docs/api/errors/21705) | ERROR Branded Comms <br/> The Messaging Service is invalid                                                     |
| [21708](www.twilio.com/docs/api/errors/21708) | WARNING Branded Comms <br/> Alpha Sender ID Missing from the request                                           |
| [21709](www.twilio.com/docs/api/errors/21709) | ERROR Branded Comms <br/> Alpha Sender ID is Invalid or Not Authorized for this Messaging Service              |
| [21710](www.twilio.com/docs/api/errors/21710) | WARNING Branded Comms <br/> Phone Number Already Exists in Messaging Service                                   |
| [21711](www.twilio.com/docs/api/errors/21711) | WARNING Branded Comms <br/> Sender is not associated with the specified Messaging Service                      |
| [21712](www.twilio.com/docs/api/errors/21712) | ERROR Branded Comms <br/> Phone Number or Short Code is associated with another Messaging Service.             |
| [21713](www.twilio.com/docs/api/errors/21713) | ERROR Branded Comms <br/> Messaging Service Use Case is Invalid                                                |
| [21714](www.twilio.com/docs/api/errors/21714) | ERROR Branded Comms <br/> Messaging Service Number Pool size limit reached                                     |
| [21715](www.twilio.com/docs/api/errors/21715) | ERROR Branded Comms <br/> Phone Number Does Not Have Correct Messaging Service Capabilities                    |
| [21717](www.twilio.com/docs/api/errors/21717) | ERROR Branded Comms <br/> Brand Registration SID for US A2P Campaign Use Case is Not Registered or Not Valid   |
| [21719](www.twilio.com/docs/api/errors/21719) | ERROR Branded Comms <br/> Incompatible Messaging Service/A2P Use Cases                                         |
| [21720](www.twilio.com/docs/api/errors/21720) | ERROR Branded Comms <br/> A2P Use Case is Invalid                                                              |
| [21721](www.twilio.com/docs/api/errors/21721) | ERROR Branded Comms <br/> Cannot import Campaign Verify token due to incompatible A2P brand                    |
| [21722](www.twilio.com/docs/api/errors/21722) | ERROR Branded Comms <br/> Invalid Campaign Verify token                                                        |
| [21723](www.twilio.com/docs/api/errors/21723) | ERROR Branded Comms <br/> Campaign Verify token import already in progress                                     |
| [21724](www.twilio.com/docs/api/errors/21724) | ERROR Branded Comms <br/> Brand update count exceeded                                                          |
| [21725](www.twilio.com/docs/api/errors/21725) | ERROR Branded Comms <br/> Brand can only be updated when in FAILED state                                       |
| [21726](www.twilio.com/docs/api/errors/21726) | ERROR Branded Comms <br/> Starter brand registrations and updates are temporarily disabled                     |
| [21727](www.twilio.com/docs/api/errors/21727) | ERROR Branded Comms <br/> Campaign registration failed due to missing parameter(s)                             |
| [21728](www.twilio.com/docs/api/errors/21728) | ERROR Branded Comms <br/> Campaign registration failed due to length validation failures                       |
| [21729](www.twilio.com/docs/api/errors/21729) | ERROR Branded Comms <br/> Cannot perform operation on suspended campaign                                       |
| [21730](www.twilio.com/docs/api/errors/21730) | ERROR Branded Comms <br/> System under maintenance. Please try again later.                                    |
| [21731](www.twilio.com/docs/api/errors/21731) | ERROR Branded Comms <br/> Cannot perform operation on suspended brand                                          |
| [21732](www.twilio.com/docs/api/errors/21732) | ERROR Branded Comms <br/> Campaign limit reached on the Brand                                                  |
| [21733](www.twilio.com/docs/api/errors/21733) | WARNING Branded Comms <br/> Default Messaging Service Not Found                                                |
| [21736](www.twilio.com/docs/api/errors/21736) | ERROR Branded Comms <br/> Brand Registration Failure: Domain Ownership Could Not Be Verified                   |
| [21737](www.twilio.com/docs/api/errors/21737) | ERROR Branded Comms <br/> Brand Registration Failure: 2FA Verification Expired                                 |
| [21738](www.twilio.com/docs/api/errors/21738) | ERROR Branded Comms <br/> Brand Registration Failure: 2FA Email Undeliverable                                  |
| [21739](www.twilio.com/docs/api/errors/21739) | ERROR Branded Comms <br/> Brand Registration Failure: 2FA Verification Failed or Timed Out                     |
| [21740](www.twilio.com/docs/api/errors/21740) | ERROR Branded Comms <br/> Brand Registration Failure: Invalid Brand Contact Email Domain                       |
| [21741](www.twilio.com/docs/api/errors/21741) | ERROR Branded Comms <br/> Brand Registration Failure: 2FA Code Expired                                         |
| [21900](www.twilio.com/docs/api/errors/21900) | ERROR  <br/> DltPEId is invalid                                                                                |
| [21901](www.twilio.com/docs/api/errors/21901) | ERROR  <br/> DltTemplateId is invalid                                                                          |
| [21902](www.twilio.com/docs/api/errors/21902) | ERROR Branded Comms <br/> InvoiceTag length must be between 0 and 32                                           |
| [21910](www.twilio.com/docs/api/errors/21910) | ERROR Branded Comms <br/> Invalid 'From' and 'To' pair. 'From' and 'To' should be of the same channel          |
| [22001](www.twilio.com/docs/api/errors/22001) | ERROR Programmable Voice <br/> Call timed out                                                                  |
| [22005](www.twilio.com/docs/api/errors/22005) | ERROR Programmable Voice <br/> Call Queue Full                                                                 |
| [22100](www.twilio.com/docs/api/errors/22100) | ERROR Phone Numbers <br/> Reached Maximum Verification Attempts                                                |
| [22101](www.twilio.com/docs/api/errors/22101) | ERROR Phone Numbers <br/> Invalid Hosted Number Order SIDs                                                     |
| [22102](www.twilio.com/docs/api/errors/22102) | ERROR Phone Numbers <br/> Invalid Phone Number                                                                 |
| [22103](www.twilio.com/docs/api/errors/22103) | ERROR Phone Numbers <br/> Unsupported Iso Country                                                              |
| [22104](www.twilio.com/docs/api/errors/22104) | ERROR Phone Numbers <br/> Invalid Email Format                                                                 |
| [22105](www.twilio.com/docs/api/errors/22105) | ERROR Phone Numbers <br/> Invalid URL format                                                                   |
| [22106](www.twilio.com/docs/api/errors/22106) | ERROR Phone Numbers <br/> Invalid Method                                                                       |
| [22107](www.twilio.com/docs/api/errors/22107) | ERROR Phone Numbers <br/> Unable to Update Authorization Document                                              |
| [22108](www.twilio.com/docs/api/errors/22108) | ERROR Phone Numbers <br/> Invalid Application SID                                                              |
| [22109](www.twilio.com/docs/api/errors/22109) | ERROR Phone Numbers <br/> Invalid Address SID                                                                  |
| [22110](www.twilio.com/docs/api/errors/22110) | ERROR Phone Numbers <br/> Phone Number Not Hostable                                                            |
| [22111](www.twilio.com/docs/api/errors/22111) | ERROR Phone Numbers <br/> Invalid Hosted Number Order Status                                                   |
| [22112](www.twilio.com/docs/api/errors/22112) | ERROR Phone Numbers <br/> Unable to Update Hosted Number Order Status                                          |
| [22113](www.twilio.com/docs/api/errors/22113) | ERROR Phone Numbers <br/> Phone Verification Incorrect                                                         |
| [22114](www.twilio.com/docs/api/errors/22114) | ERROR Phone Numbers <br/> Unable to Verify Code                                                                |
| [22115](www.twilio.com/docs/api/errors/22115) | ERROR Phone Numbers <br/> Invalid Unique Name                                                                  |
| [22116](www.twilio.com/docs/api/errors/22116) | ERROR Phone Numbers <br/> Invalid Friendly Name                                                                |
| [22117](www.twilio.com/docs/api/errors/22117) | ERROR Phone Numbers <br/> Invalid Extension                                                                    |
| [22118](www.twilio.com/docs/api/errors/22118) | ERROR Phone Numbers <br/> Invalid Verification Document SID                                                    |
| [22119](www.twilio.com/docs/api/errors/22119) | ERROR Phone Numbers <br/> Invalid Capabilities                                                                 |
| [22120](www.twilio.com/docs/api/errors/22120) | ERROR Phone Numbers <br/> Invalid Verification Type                                                            |
| [22121](www.twilio.com/docs/api/errors/22121) | ERROR Phone Numbers <br/> Unable to Transfer Hosted Number                                                     |
| [22122](www.twilio.com/docs/api/errors/22122) | ERROR Phone Numbers <br/> Invalid Authorization Document Status                                                |
| [22123](www.twilio.com/docs/api/errors/22123) | ERROR Phone Numbers <br/> Unable to Initiate Verification Call                                                 |
| [22130](www.twilio.com/docs/api/errors/22130) | ERROR Phone Numbers <br/> Not Portable - Unsupported                                                           |
| [22131](www.twilio.com/docs/api/errors/22131) | ERROR Phone Numbers <br/> Not Portable - Already in your Twilio Account                                        |
| [22132](www.twilio.com/docs/api/errors/22132) | ERROR Phone Numbers <br/> Not Portable - Already in Twilio different owner                                     |
| [22133](www.twilio.com/docs/api/errors/22133) | ERROR Phone Numbers <br/> Not Portable API - Manual porting available                                          |
| [22135](www.twilio.com/docs/api/errors/22135) | ERROR Phone Numbers <br/> Error - Internal Server Error                                                        |
| [22136](www.twilio.com/docs/api/errors/22136) | ERROR Phone Numbers <br/> Not Portable - Already in one of your Twilio Accounts                                |
| [22137](www.twilio.com/docs/api/errors/22137) | ERROR Phone Numbers <br/> Port is already in progress with one of your Twilio accounts                         |
| [22150](www.twilio.com/docs/api/errors/22150) | ERROR Phone Numbers <br/> Port In Error - Contact support required                                             |
| [22151](www.twilio.com/docs/api/errors/22151) | ERROR Phone Numbers <br/> Port In Error - Number with carrier restrictions                                     |
| [22152](www.twilio.com/docs/api/errors/22152) | ERROR Phone Numbers <br/> Port In Error - Phone number is inactive or disconnected                             |
| [22153](www.twilio.com/docs/api/errors/22153) | ERROR Phone Numbers <br/> Port In Error - Invalid end user name                                                |
| [22154](www.twilio.com/docs/api/errors/22154) | ERROR Phone Numbers <br/> Port In Error - Invalid Address                                                      |
| [22155](www.twilio.com/docs/api/errors/22155) | ERROR Phone Numbers <br/> Port In Error - Invalid Pin                                                          |
| [22156](www.twilio.com/docs/api/errors/22156) | ERROR Phone Numbers <br/> Port In Error - Invalid Account Number                                               |
| [22157](www.twilio.com/docs/api/errors/22157) | ERROR Phone Numbers <br/> Port In Error - Invalid Subscription Right                                           |
| [22158](www.twilio.com/docs/api/errors/22158) | ERROR Phone Numbers <br/> Port In Error - Port Date Rejected                                                   |
| [22159](www.twilio.com/docs/api/errors/22159) | ERROR Phone Numbers <br/> Port In Error - Not Portable                                                         |
| [22170](www.twilio.com/docs/api/errors/22170) | ERROR Phone Numbers <br/> Port In Error - Invalid Bundle                                                       |
| [22171](www.twilio.com/docs/api/errors/22171) | ERROR Phone Numbers <br/> Port In Error - Missing required fields                                              |
| [22172](www.twilio.com/docs/api/errors/22172) | ERROR Phone Numbers <br/> Port In Error - Contains numbers for multiple countries                              |
| [22173](www.twilio.com/docs/api/errors/22173) | ERROR Phone Numbers <br/> Port In Error - Invalid Address                                                      |
| [22199](www.twilio.com/docs/api/errors/22199) | ERROR Phone Numbers <br/> Configuration Retrieval Error                                                        |
| [22200](www.twilio.com/docs/api/errors/22200) | ERROR Phone Numbers <br/> Invalid End-User Type or Number Type                                                 |
| [22201](www.twilio.com/docs/api/errors/22201) | ERROR Phone Numbers <br/> No regulation sid found for the given number group                                   |
| [22202](www.twilio.com/docs/api/errors/22202) | ERROR Phone Numbers <br/> No regulation sid or phone number country and type was provided                      |
| [22203](www.twilio.com/docs/api/errors/22203) | ERROR Phone Numbers <br/> Unable to parse bundle status                                                        |
| [22204](www.twilio.com/docs/api/errors/22204) | ERROR Phone Numbers <br/> Bundle status and properties cannot be updated in the same request                   |
| [22205](www.twilio.com/docs/api/errors/22205) | ERROR Phone Numbers <br/> Attempting to assign invalid object\_sid to Bundle                                   |
| [22206](www.twilio.com/docs/api/errors/22206) | ERROR Phone Numbers <br/> Attempting to add invalid object type to bundle                                      |
| [22207](www.twilio.com/docs/api/errors/22207) | ERROR Phone Numbers <br/> Unable to parse attributes JSON                                                      |
| [22208](www.twilio.com/docs/api/errors/22208) | ERROR Phone Numbers <br/> Supporting Document status and attributes cannot be updated in the same request      |
| [22209](www.twilio.com/docs/api/errors/22209) | ERROR Phone Numbers <br/> Invalid status enum in Supporting Document update request                            |
| [22210](www.twilio.com/docs/api/errors/22210) | ERROR Phone Numbers <br/> Cannot create a Supporting Document with no Type                                     |
| [22211](www.twilio.com/docs/api/errors/22211) | ERROR Phone Numbers <br/> Cannot create a Supporting Document with no FriendlyName                             |
| [22212](www.twilio.com/docs/api/errors/22212) | ERROR Phone Numbers <br/> Invalid End-User Type in request                                                     |
| [22213](www.twilio.com/docs/api/errors/22213) | ERROR Phone Numbers <br/> Invalid Number Type in request                                                       |
| [22214](www.twilio.com/docs/api/errors/22214) | ERROR Phone Numbers <br/> Missing End User                                                                     |
| [22215](www.twilio.com/docs/api/errors/22215) | ERROR Phone Numbers <br/> Missing End-User field                                                               |
| [22216](www.twilio.com/docs/api/errors/22216) | ERROR Phone Numbers <br/> Missing Supporting Document                                                          |
| [22217](www.twilio.com/docs/api/errors/22217) | ERROR Phone Numbers <br/> Missing Supporting Document field                                                    |
| [22218](www.twilio.com/docs/api/errors/22218) | ERROR Phone Numbers <br/> The Supporting Document field does not match the field in the End-User               |
| [22219](www.twilio.com/docs/api/errors/22219) | ERROR Phone Numbers <br/> An Address is missing                                                                |
| [22221](www.twilio.com/docs/api/errors/22221) | WARNING Phone Numbers <br/> Emergency address is not registered                                                |
| [22222](www.twilio.com/docs/api/errors/22222) | WARNING Phone Numbers <br/> Emergency Status cannot be updated                                                 |
| [22223](www.twilio.com/docs/api/errors/22223) | ERROR  <br/> Regulatory Bundle is not eligible to be Copied                                                    |
| [22224](www.twilio.com/docs/api/errors/22224) | ERROR Phone Numbers <br/> Regulatory Bundle cannot transfer Item Assignments                                   |
| [22225](www.twilio.com/docs/api/errors/22225) | ERROR Phone Numbers <br/> From Bundle to Replace Items does not exist                                          |
| [22226](www.twilio.com/docs/api/errors/22226) | ERROR Phone Numbers <br/> Cannot replace Items from Bundle to same Bundle                                      |
| [22228](www.twilio.com/docs/api/errors/22228) | ERROR Phone Numbers <br/> From Bundle does not meet the latest Regulation requirements                         |
| [22229](www.twilio.com/docs/api/errors/22229) | ERROR Phone Numbers <br/> Supporting Document Bundle Assignment cannot be removed                              |
| [22230](www.twilio.com/docs/api/errors/22230) | ERROR Phone Numbers <br/> Regulatory Bundle cannot be copied due to a deleted Address                          |
| [22300](www.twilio.com/docs/api/errors/22300) | ERROR Phone Numbers <br/> This account is restricted from provisioning new long code phone numbers             |
| [22350](www.twilio.com/docs/api/errors/22350) | ERROR Phone Numbers <br/> The Phone Number cannot be released because it is being ported out of Twilio         |
| [22400](www.twilio.com/docs/api/errors/22400) | ERROR Phone Numbers <br/> Phone Number linked to Active Route Configuration                                    |
| [22401](www.twilio.com/docs/api/errors/22401) | ERROR Phone Numbers <br/> Phone Number Instance fields are not supported within region                         |
| [22402](www.twilio.com/docs/api/errors/22402) | ERROR Phone Numbers <br/> Phone Number Operation not permitted within Region                                   |
| [22403](www.twilio.com/docs/api/errors/22403) | ERROR Phone Numbers <br/> Phone Number Operation not permitted within Region                                   |
| [22404](www.twilio.com/docs/api/errors/22404) | ERROR Phone Numbers <br/> Starter profile creation and updates are temporarily disabled                        |
| [22500](www.twilio.com/docs/api/errors/22500) | ERROR Phone Numbers <br/> Twilio phone number using deprecated API version                                     |
| [22600](www.twilio.com/docs/api/errors/22600) | ERROR Phone Numbers <br/> Regulatory changes necessitate new information                                       |
| [22601](www.twilio.com/docs/api/errors/22601) | ERROR Phone Numbers <br/> Rejected due to outdated regulatory information                                      |
| [23001](www.twilio.com/docs/api/errors/23001) | WARNING Branded Comms <br/> Message Redaction Incompatible Configuration: Long code STOP filtering             |
| [23002](www.twilio.com/docs/api/errors/23002) | WARNING Branded Comms <br/> Message Redaction Incompatible Configuration: Short code "STOP" filtering          |
| [23003](www.twilio.com/docs/api/errors/23003) | WARNING Branded Comms <br/> Message Redaction Incompatible Configuration: Sticky Sender                        |
| [23004](www.twilio.com/docs/api/errors/23004) | WARNING Branded Comms <br/> Message Redaction Incompatible Configuration: Advanced Opt-Out                     |
| [23005](www.twilio.com/docs/api/errors/23005) | WARNING Branded Comms <br/> Phone Number Redaction Incompatible Configuration: Fallback to Long Code           |
| [23006](www.twilio.com/docs/api/errors/23006) | WARNING Branded Comms <br/> Message Redaction Incompatible Configuration: Inbound Webhook GET Requests         |
| [25001](www.twilio.com/docs/api/errors/25001) | ERROR  <br/> The specified filter for listing organization users is invalid                                    |
| [25002](www.twilio.com/docs/api/errors/25002) | ERROR  <br/> The provided user's first name is invalid                                                         |
| [25003](www.twilio.com/docs/api/errors/25003) | ERROR  <br/> The provided user's last name is invalid                                                          |
| [25004](www.twilio.com/docs/api/errors/25004) | ERROR  <br/> The provided user's external ID is invalid                                                        |
| [25005](www.twilio.com/docs/api/errors/25005) | ERROR  <br/> The provided user's username is invalid                                                           |
| [25006](www.twilio.com/docs/api/errors/25006) | ERROR  <br/> The SCIM schema syntax is invalid                                                                 |
| [25007](www.twilio.com/docs/api/errors/25007) | ERROR  <br/> The organization has reached its limit for managed users                                          |
| [25008](www.twilio.com/docs/api/errors/25008) | ERROR  <br/> The requested SCIM user was not found                                                             |
| [25009](www.twilio.com/docs/api/errors/25009) | ERROR  <br/> The user's is in an unupdatable status.                                                           |
| [25010](www.twilio.com/docs/api/errors/25010) | ERROR  <br/> The primary email address is missing for the user                                                 |
| [25011](www.twilio.com/docs/api/errors/25011) | ERROR  <br/> The value for the primary email address is invalid                                                |
| [25012](www.twilio.com/docs/api/errors/25012) | ERROR  <br/> Updating the email address is unsupported                                                         |
| [25013](www.twilio.com/docs/api/errors/25013) | ERROR  <br/> Updating the username is unsupported                                                              |
| [25014](www.twilio.com/docs/api/errors/25014) | ERROR  <br/> The primary email address does not match the username                                             |
| [25015](www.twilio.com/docs/api/errors/25015) | ERROR  <br/> The SCIM PATCH request is invalid                                                                 |
| [25016](www.twilio.com/docs/api/errors/25016) | ERROR  <br/> Updating the organization owner is not allowed                                                    |
| [25017](www.twilio.com/docs/api/errors/25017) | ERROR  <br/> The email domain is unverified                                                                    |
| [25018](www.twilio.com/docs/api/errors/25018) | ERROR  <br/> The request is not authorized                                                                     |
| [25019](www.twilio.com/docs/api/errors/25019) | ERROR  <br/> Failed to complete request due to a business rule violations                                      |
| [25020](www.twilio.com/docs/api/errors/25020) | ERROR  <br/> Version conflict in SCIM header                                                                   |
| [25021](www.twilio.com/docs/api/errors/25021) | ERROR  <br/> Rate limit exceeded                                                                               |
| [25022](www.twilio.com/docs/api/errors/25022) | ERROR  <br/> Duplicate username or externalId                                                                  |
| [25023](www.twilio.com/docs/api/errors/25023) | ERROR  <br/> Invalid page token                                                                                |
| [25100](www.twilio.com/docs/api/errors/25100) | ERROR  <br/> The organization was not found                                                                    |
| [25101](www.twilio.com/docs/api/errors/25101) | ERROR  <br/> The organization's account was not found                                                          |
| [25102](www.twilio.com/docs/api/errors/25102) | ERROR  <br/> The organization's account limit has been reached                                                 |
| [25103](www.twilio.com/docs/api/errors/25103) | ERROR  <br/> The organization's account owner is not a managed user                                            |
| [25104](www.twilio.com/docs/api/errors/25104) | ERROR  <br/> The organization's account owner was not set during creation                                      |
| [25105](www.twilio.com/docs/api/errors/25105) | ERROR  <br/> The request is not authorized                                                                     |
| [25106](www.twilio.com/docs/api/errors/25106) | ERROR  <br/> Failed to complete request due to a bad request                                                   |
| [25107](www.twilio.com/docs/api/errors/25107) | ERROR  <br/> The Request does not contain any authorization information                                        |
| [25109](www.twilio.com/docs/api/errors/25109) | ERROR  <br/> Request is rate limited                                                                           |
| [25200](www.twilio.com/docs/api/errors/25200) | ERROR  <br/> The scope for role assignments must be a managed account                                          |
| [25201](www.twilio.com/docs/api/errors/25201) | ERROR  <br/> The identity for role assignments must be a managed user                                          |
| [25202](www.twilio.com/docs/api/errors/25202) | ERROR  <br/> The role assignment has an invalid role                                                           |
| [25203](www.twilio.com/docs/api/errors/25203) | ERROR  <br/> Listing role assignments requires query parameters                                                |

[Back to top](#)

## 30000-39999

| Code                                          | Description                                                                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [30001](www.twilio.com/docs/api/errors/30001) | ERROR Branded Comms <br/> Queue overflow                                                                                                          |
| [30002](www.twilio.com/docs/api/errors/30002) | ERROR Branded Comms <br/> Account suspended                                                                                                       |
| [30003](www.twilio.com/docs/api/errors/30003) | ERROR Branded Comms <br/> Unreachable destination handset                                                                                         |
| [30004](www.twilio.com/docs/api/errors/30004) | ERROR Branded Comms <br/> Message blocked                                                                                                         |
| [30005](www.twilio.com/docs/api/errors/30005) | ERROR Branded Comms <br/> Unknown destination handset                                                                                             |
| [30006](www.twilio.com/docs/api/errors/30006) | ERROR Branded Comms <br/> Landline or unreachable carrier                                                                                         |
| [30007](www.twilio.com/docs/api/errors/30007) | ERROR Branded Comms <br/> Message filtered                                                                                                        |
| [30008](www.twilio.com/docs/api/errors/30008) | ERROR Branded Comms, Lookup <br/> Unknown error                                                                                                   |
| [30009](www.twilio.com/docs/api/errors/30009) | ERROR Branded Comms <br/> Missing inbound segment                                                                                                 |
| [30010](www.twilio.com/docs/api/errors/30010) | ERROR Branded Comms <br/> Message price exceeds max price                                                                                         |
| [30011](www.twilio.com/docs/api/errors/30011) | ERROR Branded Comms <br/> MMS not supported by the receiving phone number in this region                                                          |
| [30012](www.twilio.com/docs/api/errors/30012) | ERROR  <br/> TTL is too small                                                                                                                     |
| [30013](www.twilio.com/docs/api/errors/30013) | ERROR  <br/> TTL is too big                                                                                                                       |
| [30014](www.twilio.com/docs/api/errors/30014) | ERROR  <br/> 'To' attributes are Invalid                                                                                                          |
| [30015](www.twilio.com/docs/api/errors/30015) | ERROR  <br/> Non-supported channel type is used                                                                                                   |
| [30016](www.twilio.com/docs/api/errors/30016) | ERROR  <br/> 'To' and 'From' channel types are incompatible                                                                                       |
| [30017](www.twilio.com/docs/api/errors/30017) | ERROR Branded Comms <br/> Carrier network congestion                                                                                              |
| [30018](www.twilio.com/docs/api/errors/30018) | WARNING Branded Comms <br/> Destination carrier requires sender ID pre-registration                                                               |
| [30019](www.twilio.com/docs/api/errors/30019) | ERROR Branded Comms <br/> Content size exceeds carrier limit                                                                                      |
| [30020](www.twilio.com/docs/api/errors/30020) | ERROR Branded Comms <br/> Internal Failure with Message Scheduling                                                                                |
| [30021](www.twilio.com/docs/api/errors/30021) | ERROR Branded Comms <br/> Internal Failure with messaging service orchestrator                                                                    |
| [30022](www.twilio.com/docs/api/errors/30022) | ERROR Branded Comms <br/> US A2P 10DLC - Rate Limits Exceeded                                                                                     |
| [30023](www.twilio.com/docs/api/errors/30023) | ERROR Branded Comms <br/> US A2P 10DLC - Daily Message Cap Reached                                                                                |
| [30024](www.twilio.com/docs/api/errors/30024) | ERROR Branded Comms <br/> Numeric Sender ID Not Provisioned on Carrier                                                                            |
| [30025](www.twilio.com/docs/api/errors/30025) | WARNING Branded Comms <br/> US A2P 10DLC - 50% T-Mobile Daily Message Limit Consumed                                                              |
| [30026](www.twilio.com/docs/api/errors/30026) | WARNING Branded Comms <br/> US A2P 10DLC - 70% T-Mobile Daily Message Limit Consumed                                                              |
| [30027](www.twilio.com/docs/api/errors/30027) | ERROR Branded Comms <br/> US A2P 10DLC - T-Mobile Daily Message Limit Reached                                                                     |
| [30028](www.twilio.com/docs/api/errors/30028) | ERROR Branded Comms <br/> Invalid API version                                                                                                     |
| [30029](www.twilio.com/docs/api/errors/30029) | ERROR Branded Comms <br/> Invalid ContentRetention                                                                                                |
| [30030](www.twilio.com/docs/api/errors/30030) | ERROR Branded Comms <br/> Invalid AddressRetention                                                                                                |
| [30031](www.twilio.com/docs/api/errors/30031) | ERROR Branded Comms <br/> Invalid MaxRate                                                                                                         |
| [30032](www.twilio.com/docs/api/errors/30032) | ERROR Branded Comms <br/> Toll-Free Number Has Not Been Verified                                                                                  |
| [30033](www.twilio.com/docs/api/errors/30033) | ERROR Branded Comms <br/> US A2P 10DLC - Campaign Suspended                                                                                       |
| [30034](www.twilio.com/docs/api/errors/30034) | ERROR Branded Comms <br/> US A2P 10DLC - Message from an Unregistered Number                                                                      |
| [30035](www.twilio.com/docs/api/errors/30035) | ERROR Branded Comms <br/> US A2P 10DLC - Message from a number still being configured                                                             |
| [30036](www.twilio.com/docs/api/errors/30036) | ERROR Branded Comms <br/> Validity Period Expired                                                                                                 |
| [30037](www.twilio.com/docs/api/errors/30037) | ERROR Branded Comms <br/> Outbound Messaging Disabled                                                                                             |
| [30038](www.twilio.com/docs/api/errors/30038) | ERROR Branded Comms <br/> OTP Message Body Filtered                                                                                               |
| [30039](www.twilio.com/docs/api/errors/30039) | WARNING Branded Comms <br/> Filtered to Prevent Message Loops                                                                                     |
| [30040](www.twilio.com/docs/api/errors/30040) | ERROR Branded Comms <br/> Destination carrier requires Sender ID pre-registration                                                                 |
| [30041](www.twilio.com/docs/api/errors/30041) | ERROR Branded Comms <br/> Sender is restricted or unregistered in a country requiring registration                                                |
| [30042](www.twilio.com/docs/api/errors/30042) | ERROR Branded Comms <br/> Alphanumeric Sender ID is generic or unauthorized for this account                                                      |
| [30043](www.twilio.com/docs/api/errors/30043) | ERROR Branded Comms <br/> International SMS via Domestic Gateway                                                                                  |
| [30044](www.twilio.com/docs/api/errors/30044) | ERROR Branded Comms <br/> Trial Message Length Exceeded                                                                                           |
| [30045](www.twilio.com/docs/api/errors/30045) | WARNING Branded Comms <br/> Validity Period is less than zero or greater than maximum allowed                                                     |
| [30046](www.twilio.com/docs/api/errors/30046) | ERROR Branded Comms, Rcs <br/> Message delivery not confirmed                                                                                     |
| [30100](www.twilio.com/docs/api/errors/30100) | ERROR Branded Comms <br/> Domain SID is invalid                                                                                                   |
| [30101](www.twilio.com/docs/api/errors/30101) | ERROR Branded Comms <br/> Domain is unverified                                                                                                    |
| [30102](www.twilio.com/docs/api/errors/30102) | ERROR Branded Comms <br/> TLS certificate for your Domain has expired.                                                                            |
| [30103](www.twilio.com/docs/api/errors/30103) | ERROR Branded Comms <br/> Links not shortened due to application failure.                                                                         |
| [30104](www.twilio.com/docs/api/errors/30104) | WARNING Branded Comms <br/> Shortened link not found. Click redirected to fallback Url                                                            |
| [30105](www.twilio.com/docs/api/errors/30105) | WARNING Branded Comms <br/> Shortened link not found and no fallback URL found                                                                    |
| [30106](www.twilio.com/docs/api/errors/30106) | ERROR Branded Comms <br/> Domain has not been set up for this account                                                                             |
| [30107](www.twilio.com/docs/api/errors/30107) | ERROR Branded Comms <br/> Domain private certificate has not been uploaded                                                                        |
| [30108](www.twilio.com/docs/api/errors/30108) | ERROR Branded Comms <br/> Twilio account does not belong to an organization                                                                       |
| [30109](www.twilio.com/docs/api/errors/30109) | ERROR Branded Comms <br/> Callback URL is invalid                                                                                                 |
| [30110](www.twilio.com/docs/api/errors/30110) | ERROR Branded Comms <br/> Domain is blocked                                                                                                       |
| [30111](www.twilio.com/docs/api/errors/30111) | ERROR Branded Comms <br/> Url is on a deny list                                                                                                   |
| [30112](www.twilio.com/docs/api/errors/30112) | ERROR  <br/> Account is not found                                                                                                                 |
| [30113](www.twilio.com/docs/api/errors/30113) | ERROR Branded Comms <br/> Specified date is too old                                                                                               |
| [30114](www.twilio.com/docs/api/errors/30114) | ERROR Branded Comms <br/> Specified date is not available yet                                                                                     |
| [30115](www.twilio.com/docs/api/errors/30115) | ERROR Branded Comms <br/> Date format is incorrect                                                                                                |
| [30116](www.twilio.com/docs/api/errors/30116) | ERROR Branded Comms <br/> Certificate or private key or both are missing                                                                          |
| [30117](www.twilio.com/docs/api/errors/30117) | ERROR Branded Comms <br/> Certificate cannot be parsed                                                                                            |
| [30118](www.twilio.com/docs/api/errors/30118) | ERROR Branded Comms <br/> Private key is invalid                                                                                                  |
| [30119](www.twilio.com/docs/api/errors/30119) | ERROR Branded Comms <br/> Certificate and private key pair is invalid                                                                             |
| [30120](www.twilio.com/docs/api/errors/30120) | ERROR Branded Comms <br/>  Domain certificate and private key are not uploaded                                                                    |
| [30121](www.twilio.com/docs/api/errors/30121) | ERROR Branded Comms <br/> Fallback URL is missing                                                                                                 |
| [30122](www.twilio.com/docs/api/errors/30122) | ERROR Branded Comms <br/> Fallback URL is invalid                                                                                                 |
| [30123](www.twilio.com/docs/api/errors/30123) | ERROR Branded Comms <br/> Callback URL is missing                                                                                                 |
| [30124](www.twilio.com/docs/api/errors/30124) | ERROR Branded Comms <br/> MessagingServiceSID cannot be empty or null                                                                             |
| [30125](www.twilio.com/docs/api/errors/30125) | WARNING Branded Comms <br/> Your phone number could not be registered with US A2P 10DLC                                                           |
| [30126](www.twilio.com/docs/api/errors/30126) | ERROR Branded Comms <br/> Your 10DLC number failed to be registered                                                                               |
| [30127](www.twilio.com/docs/api/errors/30127) | ERROR Branded Comms <br/> MessagingServiceSID is invalid.                                                                                         |
| [30128](www.twilio.com/docs/api/errors/30128) | ERROR Branded Comms <br/> MessagingServiceSidsAction is invalid                                                                                   |
| [30129](www.twilio.com/docs/api/errors/30129) | ERROR Branded Comms <br/> Certificate is self signed                                                                                              |
| [30130](www.twilio.com/docs/api/errors/30130) | ERROR Branded Comms <br/> Messaging Service SID already belongs in another domain configuration.                                                  |
| [30131](www.twilio.com/docs/api/errors/30131) | WARNING Branded Comms <br/> Domain's certificate will expire soon                                                                                 |
| [30132](www.twilio.com/docs/api/errors/30132) | ERROR Branded Comms <br/> Certificate cannot be validated.                                                                                        |
| [30133](www.twilio.com/docs/api/errors/30133) | ERROR Branded Comms <br/> The certificate could not be uploaded.                                                                                  |
| [30134](www.twilio.com/docs/api/errors/30134) | ERROR Branded Comms <br/> Invalid Dns Setup for Link shortening                                                                                   |
| [30135](www.twilio.com/docs/api/errors/30135) | ERROR Branded Comms <br/> Unable to issue certificate                                                                                             |
| [30136](www.twilio.com/docs/api/errors/30136) | ERROR Branded Comms <br/> Unable to renew certificate                                                                                             |
| [30137](www.twilio.com/docs/api/errors/30137) | ERROR  <br/> Domain messaging service mapping not found                                                                                           |
| [30139](www.twilio.com/docs/api/errors/30139) | ERROR Branded Comms <br/> URL not valid for link shortening                                                                                       |
| [30140](www.twilio.com/docs/api/errors/30140) | ERROR Branded Comms <br/> Certificates with OCSP required are not supported                                                                       |
| [30400](www.twilio.com/docs/api/errors/30400) | ERROR Branded Comms <br/> Parameters are not valid                                                                                                |
| [30404](www.twilio.com/docs/api/errors/30404) | ERROR Branded Comms <br/> Not Found                                                                                                               |
| [30409](www.twilio.com/docs/api/errors/30409) | ERROR Branded Comms <br/> This message cannot be canceled                                                                                         |
| [30410](www.twilio.com/docs/api/errors/30410) | ERROR Branded Comms <br/> Provider Timeout Error                                                                                                  |
| [30436](www.twilio.com/docs/api/errors/30436) | ERROR Branded Comms <br/> Invalid Phone Number SID                                                                                                |
| [30437](www.twilio.com/docs/api/errors/30437) | ERROR Branded Comms <br/> Toll Free verification rejection - Edit time expired                                                                    |
| [30440](www.twilio.com/docs/api/errors/30440) | ERROR Branded Comms <br/> Toll Free verification rejection - Unknown Error                                                                        |
| [30441](www.twilio.com/docs/api/errors/30441) | ERROR Branded Comms <br/> Toll-Free phone number verification rejection - Disallowed: SHAFT - Sex                                                 |
| [30442](www.twilio.com/docs/api/errors/30442) | ERROR Branded Comms <br/> Toll-Free phone number verification rejection - Disallowed: Spam                                                        |
| [30443](www.twilio.com/docs/api/errors/30443) | ERROR Branded Comms <br/> Toll-Free verification rejection - Disallowed: Loan Marketing                                                           |
| [30444](www.twilio.com/docs/api/errors/30444) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Fraud                                                                    |
| [30445](www.twilio.com/docs/api/errors/30445) | ERROR Branded Comms <br/> Toll Free verification rejection - Could not validate business information                                              |
| [30446](www.twilio.com/docs/api/errors/30446) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-in not sufficient: express consent required                                      |
| [30447](www.twilio.com/docs/api/errors/30447) | ERROR Branded Comms <br/> Toll Free verification rejection - phone number not provisioned to Twilio                                               |
| [30448](www.twilio.com/docs/api/errors/30448) | ERROR Branded Comms <br/> Toll-Free phone number verification rejection - Age Gate                                                                |
| [30449](www.twilio.com/docs/api/errors/30449) | ERROR Branded Comms <br/> Toll Free verification rejection - URL issues in sample message                                                         |
| [30450](www.twilio.com/docs/api/errors/30450) | ERROR Branded Comms <br/> Message delivery blocked                                                                                                |
| [30451](www.twilio.com/docs/api/errors/30451) | ERROR Branded Comms <br/> Toll-Free phone number verification unable to process - address invalid                                                 |
| [30452](www.twilio.com/docs/api/errors/30452) | ERROR Branded Comms <br/> Toll-Free phone number verification unable to process - email invalid                                                   |
| [30453](www.twilio.com/docs/api/errors/30453) | ERROR Branded Comms <br/> Message couldn't be delivered                                                                                           |
| [30454](www.twilio.com/docs/api/errors/30454) | ERROR Branded Comms <br/> Account exceeded the messages limit                                                                                     |
| [30455](www.twilio.com/docs/api/errors/30455) | ERROR Branded Comms <br/> Toll-Free phone number verification rejection - Disallowed: SHAFT - Hate                                                |
| [30456](www.twilio.com/docs/api/errors/30456) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: SHAFT - Alcohol                                                          |
| [30457](www.twilio.com/docs/api/errors/30457) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: SHAFT - Firearms                                                         |
| [30458](www.twilio.com/docs/api/errors/30458) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: SHAFT - Tobacco / Vape                                                   |
| [30459](www.twilio.com/docs/api/errors/30459) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Cannabis/CBD                                                             |
| [30460](www.twilio.com/docs/api/errors/30460) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Third Party Debt Collection                                              |
| [30461](www.twilio.com/docs/api/errors/30461) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Gambling                                                                 |
| [30462](www.twilio.com/docs/api/errors/30462) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Sweepstakes                                                              |
| [30463](www.twilio.com/docs/api/errors/30463) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Stock Alerts/Platforms                                                   |
| [30464](www.twilio.com/docs/api/errors/30464) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Cryptocurrency                                                           |
| [30465](www.twilio.com/docs/api/errors/30465) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Risk Investment/Get Rich Quick Schemes                                   |
| [30466](www.twilio.com/docs/api/errors/30466) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed - Debt Reduction                                                          |
| [30467](www.twilio.com/docs/api/errors/30467) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Credit Repair                                                            |
| [30468](www.twilio.com/docs/api/errors/30468) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Third-party Lead Generation                                              |
| [30469](www.twilio.com/docs/api/errors/30469) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Illegal substances/articles                                              |
| [30470](www.twilio.com/docs/api/errors/30470) | ERROR Branded Comms <br/> Toll Free verification rejection - High Risk: Deceptive Marketing                                                       |
| [30471](www.twilio.com/docs/api/errors/30471) | ERROR Branded Comms <br/> Toll Free verification rejection - High Risk - Non-secured URL in sample message                                        |
| [30472](www.twilio.com/docs/api/errors/30472) | ERROR Branded Comms <br/> Toll Free verification rejection - Could not verify Business                                                            |
| [30473](www.twilio.com/docs/api/errors/30473) | ERROR Branded Comms <br/> Toll Free verification rejection - Cannot validate business website URL                                                 |
| [30474](www.twilio.com/docs/api/errors/30474) | ERROR Branded Comms <br/> Toll Free verification rejection - Need end business                                                                    |
| [30475](www.twilio.com/docs/api/errors/30475) | ERROR Branded Comms <br/> Toll Free rejection: Cannot combine messaging consent with service requirement                                          |
| [30476](www.twilio.com/docs/api/errors/30476) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-in not provided                                                                  |
| [30477](www.twilio.com/docs/api/errors/30477) | ERROR Branded Comms <br/> Toll Free rejection: Third-party information sharing not allowed                                                        |
| [30478](www.twilio.com/docs/api/errors/30478) | ERROR Branded Comms <br/> Toll Free verification rejection - single phone number used for multiple businesses                                     |
| [30479](www.twilio.com/docs/api/errors/30479) | ERROR Branded Comms <br/> Toll Free rejection: Justification required for more than 5 numbers                                                     |
| [30480](www.twilio.com/docs/api/errors/30480) | ERROR Branded Comms <br/> Toll-Free phone number verification rejection - Disallowed - Phishing                                                   |
| [30481](www.twilio.com/docs/api/errors/30481) | ERROR Branded Comms <br/> Toll Free verification -  Requested Cancellation                                                                        |
| [30482](www.twilio.com/docs/api/errors/30482) | ERROR Branded Comms <br/> Toll Free verification rejection - Business email requires an official domain                                           |
| [30483](www.twilio.com/docs/api/errors/30483) | ERROR Branded Comms <br/> Toll Free verification rejection - Contact must be a business representative                                            |
| [30484](www.twilio.com/docs/api/errors/30484) | ERROR Branded Comms <br/> Toll Free verification rejection - Business name and office record mismatch                                             |
| [30485](www.twilio.com/docs/api/errors/30485) | ERROR Branded Comms <br/> Message couldn't be delivered                                                                                           |
| [30486](www.twilio.com/docs/api/errors/30486) | ERROR Branded Comms <br/> Toll Free verification rejection - HELP keyword response must meet requirements                                         |
| [30487](www.twilio.com/docs/api/errors/30487) | ERROR Branded Comms <br/> Toll Free rejection: Charity must provide 501(c)(3) verification                                                        |
| [30488](www.twilio.com/docs/api/errors/30488) | ERROR Branded Comms <br/> Toll Free verification rejection - DBA name must be accurately provided                                                 |
| [30489](www.twilio.com/docs/api/errors/30489) | ERROR Branded Comms <br/> Toll Free verification rejection - Website must be established and active                                               |
| [30490](www.twilio.com/docs/api/errors/30490) | ERROR Branded Comms <br/> Toll Free verification rejection - Social platform must be established and active                                       |
| [30491](www.twilio.com/docs/api/errors/30491) | ERROR Branded Comms <br/> Toll Free verification rejection - Website is password protected or requires login                                      |
| [30492](www.twilio.com/docs/api/errors/30492) | ERROR Branded Comms <br/> Toll Free verification rejection - Business website URL must display branding                                           |
| [30493](www.twilio.com/docs/api/errors/30493) | ERROR Branded Comms <br/> Toll Free rejection: Privacy policy or terms URL missing or inaccessible                                                |
| [30494](www.twilio.com/docs/api/errors/30494) | ERROR Branded Comms <br/> Toll Free verification rejection - ISV or reseller name must be provided                                                |
| [30495](www.twilio.com/docs/api/errors/30495) | ERROR Branded Comms <br/> Toll Free verification rejection - Projected message volume exceeds use case limits                                     |
| [30496](www.twilio.com/docs/api/errors/30496) | ERROR Branded Comms <br/> Toll Free verification rejection - Use case and use case summary inconsistent                                           |
| [30498](www.twilio.com/docs/api/errors/30498) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-in workflow must match submission details                                        |
| [30499](www.twilio.com/docs/api/errors/30499) | ERROR Branded Comms <br/> Toll Free verification rejection - Message content doesn't align with use case                                          |
| [30500](www.twilio.com/docs/api/errors/30500) | ERROR Branded Comms <br/> Twilio Internal Error                                                                                                   |
| [30501](www.twilio.com/docs/api/errors/30501) | ERROR Branded Comms <br/> Toll Free rejection: Political campaigns require a Campaign Verify token                                                |
| [30502](www.twilio.com/docs/api/errors/30502) | ERROR Branded Comms <br/> Toll Free verification rejection - Political campaigns must submit FEC ID                                               |
| [30503](www.twilio.com/docs/api/errors/30503) | ERROR Branded Comms <br/> Toll Free verification rejection - Confirmation message missing required details                                        |
| [30504](www.twilio.com/docs/api/errors/30504) | ERROR Branded Comms <br/> Toll Free verification rejection - Single opt-in cannot cover multiple use cases                                        |
| [30505](www.twilio.com/docs/api/errors/30505) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-in must be optional, not required                                                |
| [30506](www.twilio.com/docs/api/errors/30506) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-ins must clearly reflect end business                                            |
| [30507](www.twilio.com/docs/api/errors/30507) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-in does not match use case                                                       |
| [30508](www.twilio.com/docs/api/errors/30508) | ERROR Branded Comms <br/> Toll Free verification rejection - Pre-selected opt-in checkbox is not allowed                                          |
| [30509](www.twilio.com/docs/api/errors/30509) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-in URL not accessible                                                            |
| [30510](www.twilio.com/docs/api/errors/30510) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-in example must be complete and branded                                          |
| [30511](www.twilio.com/docs/api/errors/30511) | ERROR Branded Comms <br/> Toll Free verification rejection - Verbal consent script must be provided                                               |
| [30512](www.twilio.com/docs/api/errors/30512) | ERROR Branded Comms <br/> Toll Free verification rejection - Age gate required for age-restricted content                                         |
| [30513](www.twilio.com/docs/api/errors/30513) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-in not sufficient: Language Unclear                                              |
| [30515](www.twilio.com/docs/api/errors/30515) | ERROR Branded Comms <br/> Toll Free verification rejection - Valid opt-in required for all submissions                                            |
| [30516](www.twilio.com/docs/api/errors/30516) | ERROR Branded Comms <br/> Toll Free verification rejection - Double opt-in required for this use case                                             |
| [30517](www.twilio.com/docs/api/errors/30517) | ERROR Branded Comms <br/> Toll Free rejection: Shopping cart reminders must follow specific guidelines                                            |
| [30518](www.twilio.com/docs/api/errors/30518) | ERROR Branded Comms <br/> Toll Free verification rejection - Call-to-action missing required disclosures                                          |
| [30519](www.twilio.com/docs/api/errors/30519) | ERROR Branded Comms <br/> Toll Free rejection: Privacy policy required for personal data collection                                               |
| [30520](www.twilio.com/docs/api/errors/30520) | ERROR Branded Comms <br/> Toll Free verification rejection - Privacy policy mentions sharing opt-in data                                          |
| [30521](www.twilio.com/docs/api/errors/30521) | ERROR Branded Comms <br/> Toll Free verification rejection - Opt-in data cannot be shared with third parties                                      |
| [30522](www.twilio.com/docs/api/errors/30522) | ERROR Branded Comms <br/> Toll Free verification rejection - SMS terms must be accessible and compliant                                           |
| [30523](www.twilio.com/docs/api/errors/30523) | ERROR Branded Comms <br/> Toll Free verification rejection - High-risk domain reputation                                                          |
| [30524](www.twilio.com/docs/api/errors/30524) | ERROR Branded Comms <br/> Toll Free verification rejection - Potential fraud risk                                                                 |
| [30525](www.twilio.com/docs/api/errors/30525) | ERROR Branded Comms <br/> Toll Free verification rejection - Public URL shorteners not allowed                                                    |
| [30526](www.twilio.com/docs/api/errors/30526) | ERROR Branded Comms <br/> Toll Free verification rejection - High-risk domain issues                                                              |
| [30527](www.twilio.com/docs/api/errors/30527) | ERROR Branded Comms <br/> Toll Free verification rejection - Business Registration Number is Missing or Invalid                                   |
| [30528](www.twilio.com/docs/api/errors/30528) | ERROR Branded Comms <br/> Toll Free verification rejection - Disallowed: Non-federally compliant use case                                         |
| [30529](www.twilio.com/docs/api/errors/30529) | ERROR Branded Comms <br/> Toll Free rejection: Alcohol promotions require age verification                                                        |
| [30530](www.twilio.com/docs/api/errors/30530) | ERROR Branded Comms <br/> Toll Free verification rejection - Official business registration documents required                                    |
| [30531](www.twilio.com/docs/api/errors/30531) | ERROR Branded Comms <br/> Toll-Free verification rejection - HELP keyword response must meet requirements                                         |
| [30610](www.twilio.com/docs/api/errors/30610) | ERROR Branded Comms <br/> Message couldn't be delivered                                                                                           |
| [30615](www.twilio.com/docs/api/errors/30615) | ERROR Branded Comms <br/> Message couldn't be delivered                                                                                           |
| [30620](www.twilio.com/docs/api/errors/30620) | ERROR Branded Comms <br/> Message couldn't be delivered                                                                                           |
| [30630](www.twilio.com/docs/api/errors/30630) | ERROR Branded Comms <br/> Attempt to send to unsubscribed recipient                                                                               |
| [30640](www.twilio.com/docs/api/errors/30640) | ERROR Branded Comms <br/> Message couldn't be delivered                                                                                           |
| [30646](www.twilio.com/docs/api/errors/30646) | ERROR Branded Comms <br/> Failed to Upsert Consent                                                                                                |
| [30647](www.twilio.com/docs/api/errors/30647) | ERROR Branded Comms <br/> Failed to Upsert Contact                                                                                                |
| [30648](www.twilio.com/docs/api/errors/30648) | ERROR Branded Comms <br/> Geo Permissions update restricted for subaccounts                                                                       |
| [30649](www.twilio.com/docs/api/errors/30649) | ERROR Branded Comms <br/> Failed to Update Geo Permissions                                                                                        |
| [30700](www.twilio.com/docs/api/errors/30700) | ERROR Branded Comms <br/> Advanced messaging features are not available in this region.                                                           |
| [30701](www.twilio.com/docs/api/errors/30701) | ERROR Branded Comms <br/> Brand Registration Failure: Invalid input parameters                                                                    |
| [30702](www.twilio.com/docs/api/errors/30702) | ERROR Branded Comms <br/> Brand Registration Failure: Registration not found                                                                      |
| [30703](www.twilio.com/docs/api/errors/30703) | ERROR Branded Comms <br/> Brand Registration Failure: Duplicate record detected                                                                   |
| [30709](www.twilio.com/docs/api/errors/30709) | ERROR  <br/> Subscribers Must Be Opted In When Providing an Opt-In Message                                                                        |
| [30710](www.twilio.com/docs/api/errors/30710) | ERROR Branded Comms <br/> Deleting a Brand with Active Campaigns is Not Allowed                                                                   |
| [30711](www.twilio.com/docs/api/errors/30711) | ERROR  <br/> Deleting a Brand with Active Brand Sharing is Not Allowed                                                                            |
| [30712](www.twilio.com/docs/api/errors/30712) | ERROR Branded Comms <br/> Brand Registration Failure: Max registration limit reached                                                              |
| [30713](www.twilio.com/docs/api/errors/30713) | ERROR Branded Comms <br/> Invalid Vetting Token                                                                                                   |
| [30714](www.twilio.com/docs/api/errors/30714) | ERROR  <br/> Vetting Token Rejected by TCR                                                                                                        |
| [30715](www.twilio.com/docs/api/errors/30715) | ERROR Branded Comms <br/> Vetting Token Not Allowed for Sole Proprietor Brands                                                                    |
| [30729](www.twilio.com/docs/api/errors/30729) | ERROR Branded Comms <br/> Brand Registration Failure: Country code not allowed                                                                    |
| [30734](www.twilio.com/docs/api/errors/30734) | ERROR Branded Comms <br/> Brand Registration Failure: Sole Proprietor brands are not enabled                                                      |
| [30747](www.twilio.com/docs/api/errors/30747) | ERROR Branded Comms <br/> Brand Registration Failure: Address duplicate threshold reached                                                         |
| [30748](www.twilio.com/docs/api/errors/30748) | ERROR Branded Comms <br/> Brand Registration Failure: Phone number duplicate threshold reached                                                    |
| [30749](www.twilio.com/docs/api/errors/30749) | ERROR Branded Comms <br/> Brand Registration Failure: Email address duplicate threshold reached                                                   |
| [30750](www.twilio.com/docs/api/errors/30750) | ERROR Branded Comms <br/> Brand Registration Failure: Mobile phone number duplicate threshold reached                                             |
| [30751](www.twilio.com/docs/api/errors/30751) | ERROR Branded Comms <br/> Brand Registration Failure: Unsupported mobile phone number                                                             |
| [30752](www.twilio.com/docs/api/errors/30752) | ERROR Branded Comms <br/> Brand Registration Failure: Invalid or expired OTP                                                                      |
| [30753](www.twilio.com/docs/api/errors/30753) | ERROR Branded Comms <br/> Brand Registration Failure: Unsupported email address                                                                   |
| [30754](www.twilio.com/docs/api/errors/30754) | ERROR Branded Comms <br/> Brand Registration Failure: Invalid postal address                                                                      |
| [30755](www.twilio.com/docs/api/errors/30755) | ERROR Branded Comms <br/> Brand Registration Failure: Unsupported country code                                                                    |
| [30756](www.twilio.com/docs/api/errors/30756) | ERROR Branded Comms <br/> Brand Registration Failure: Obfuscation check failure                                                                   |
| [30757](www.twilio.com/docs/api/errors/30757) | ERROR Branded Comms <br/> Brand Registration Failure: Missing Business Registration Number                                                        |
| [30758](www.twilio.com/docs/api/errors/30758) | ERROR Branded Comms <br/> Unknown Error Code                                                                                                      |
| [30759](www.twilio.com/docs/api/errors/30759) | ERROR Branded Comms <br/> US A2P Registration: Insufficient Permissions to Perform Operation                                                      |
| [30790](www.twilio.com/docs/api/errors/30790) | ERROR Branded Comms <br/> Brand Registration Failure: Internal system error                                                                       |
| [30791](www.twilio.com/docs/api/errors/30791) | ERROR Branded Comms <br/> Brand Registration Failure: Temporary system error                                                                      |
| [30792](www.twilio.com/docs/api/errors/30792) | ERROR Branded Comms <br/> Brand Registration Failure: General error                                                                               |
| [30793](www.twilio.com/docs/api/errors/30793) | ERROR Branded Comms, Trust-Hub <br/> Brand Registration Failure: Validation problems with connected bundles                                       |
| [30794](www.twilio.com/docs/api/errors/30794) | ERROR Branded Comms <br/> US A2P Registration: General error                                                                                      |
| [30795](www.twilio.com/docs/api/errors/30795) | ERROR Branded Comms <br/> Brand Registration: Tax ID data mismatch                                                                                |
| [30796](www.twilio.com/docs/api/errors/30796) | ERROR Branded Comms <br/> Brand Registration: Entity type or stock information mismatch                                                           |
| [30797](www.twilio.com/docs/api/errors/30797) | ERROR Branded Comms <br/> Brand Registration: Must be a U.S. government entity to register as government                                          |
| [30798](www.twilio.com/docs/api/errors/30798) | ERROR Branded Comms <br/> Brand Registration Feedback: No IRS 501c tax-exempt status found.                                                       |
| [30799](www.twilio.com/docs/api/errors/30799) | ERROR Branded Comms <br/> Brand Registration: Unable to verify registration details                                                               |
| [30800](www.twilio.com/docs/api/errors/30800) | ERROR Branded Comms <br/> Verification rejection - Business email requires an official domain                                                     |
| [30801](www.twilio.com/docs/api/errors/30801) | ERROR Branded Comms <br/> Verification rejection - Contact must be a business representative                                                      |
| [30802](www.twilio.com/docs/api/errors/30802) | ERROR Branded Comms <br/> Verification rejection - Business name and office record mismatch                                                       |
| [30803](www.twilio.com/docs/api/errors/30803) | ERROR Branded Comms <br/> Verification rejection - Official business registration documents required                                              |
| [30804](www.twilio.com/docs/api/errors/30804) | ERROR Branded Comms <br/> Verification rejection - Need end business                                                                              |
| [30805](www.twilio.com/docs/api/errors/30805) | ERROR Branded Comms <br/> Verification rejection - Could not validate business information                                                        |
| [30806](www.twilio.com/docs/api/errors/30806) | ERROR Branded Comms <br/> Verification rejection - single phone number used for multiple businesses                                               |
| [30807](www.twilio.com/docs/api/errors/30807) | ERROR Branded Comms <br/> Verification rejection - Justification required for more than 5 numbers                                                 |
| [30808](www.twilio.com/docs/api/errors/30808) | ERROR Branded Comms <br/> Verification rejection - Could not verify Business                                                                      |
| [30809](www.twilio.com/docs/api/errors/30809) | ERROR Branded Comms <br/> Verification rejection - Charity must provide 501(c)(3) verification                                                    |
| [30810](www.twilio.com/docs/api/errors/30810) | ERROR Branded Comms <br/> Verification rejection - DBA name must be accurately provided                                                           |
| [30811](www.twilio.com/docs/api/errors/30811) | ERROR Branded Comms <br/> Verification rejection - Business Registration Number is Missing or Invalid                                             |
| [30812](www.twilio.com/docs/api/errors/30812) | ERROR Branded Comms <br/> Verification rejection - Website must be established and active                                                         |
| [30813](www.twilio.com/docs/api/errors/30813) | ERROR Branded Comms <br/> Verification rejection - Social platform must be established and active                                                 |
| [30814](www.twilio.com/docs/api/errors/30814) | ERROR Branded Comms <br/> Verification rejection - Website is password protected or requires login                                                |
| [30815](www.twilio.com/docs/api/errors/30815) | ERROR Branded Comms <br/> Verification rejection - Cannot validate business website URL                                                           |
| [30816](www.twilio.com/docs/api/errors/30816) | ERROR Branded Comms <br/> Verification rejection - Business website URL must display branding                                                     |
| [30817](www.twilio.com/docs/api/errors/30817) | ERROR Branded Comms <br/> Verification rejection - Privacy policy or terms URL missing or inaccessible                                            |
| [30818](www.twilio.com/docs/api/errors/30818) | ERROR Branded Comms <br/> Verification rejection - ISV or reseller name must be provided                                                          |
| [30819](www.twilio.com/docs/api/errors/30819) | ERROR Branded Comms <br/> Verification rejection - Projected message volume exceeds use case limits                                               |
| [30820](www.twilio.com/docs/api/errors/30820) | ERROR Branded Comms <br/> Verification rejection - Use case and use case summary inconsistent                                                     |
| [30821](www.twilio.com/docs/api/errors/30821) | ERROR Branded Comms <br/> Verification rejection - Use case summary is incomplete                                                                 |
| [30822](www.twilio.com/docs/api/errors/30822) | ERROR Branded Comms <br/> Verification rejection - Opt-in workflow must match submission details                                                  |
| [30823](www.twilio.com/docs/api/errors/30823) | ERROR Branded Comms <br/> Verification rejection - Message content doesn't align with use case                                                    |
| [30824](www.twilio.com/docs/api/errors/30824) | ERROR Branded Comms <br/> Verification rejection - Edit time expired                                                                              |
| [30825](www.twilio.com/docs/api/errors/30825) | ERROR Branded Comms <br/> Verification rejection - Age Gate                                                                                       |
| [30826](www.twilio.com/docs/api/errors/30826) | ERROR Branded Comms <br/> Verification rejection - Political campaigns require a Campaign Verify token                                            |
| [30827](www.twilio.com/docs/api/errors/30827) | ERROR Branded Comms <br/> Verification rejection - Political campaigns must submit FEC ID                                                         |
| [30828](www.twilio.com/docs/api/errors/30828) | ERROR Branded Comms <br/> Verification rejection - Confirmation message missing required details                                                  |
| [30829](www.twilio.com/docs/api/errors/30829) | ERROR Branded Comms <br/> Verification rejection - Single opt-in cannot cover multiple use cases                                                  |
| [30830](www.twilio.com/docs/api/errors/30830) | ERROR Branded Comms <br/> Verification rejection - Cannot combine messaging consent with service requirement                                      |
| [30831](www.twilio.com/docs/api/errors/30831) | ERROR Branded Comms <br/> Verification rejection - Opt-in not sufficient: express consent required                                                |
| [30832](www.twilio.com/docs/api/errors/30832) | ERROR Branded Comms <br/> Verification rejection - Opt-in must be optional, not required                                                          |
| [30833](www.twilio.com/docs/api/errors/30833) | ERROR Branded Comms <br/> Verification rejection - Opt-ins must clearly reflect end business                                                      |
| [30834](www.twilio.com/docs/api/errors/30834) | ERROR Branded Comms <br/> Verification rejection - Opt-in does not match use case                                                                 |
| [30835](www.twilio.com/docs/api/errors/30835) | ERROR Branded Comms <br/> Verification rejection - Pre-selected opt-in checkbox is not allowed                                                    |
| [30836](www.twilio.com/docs/api/errors/30836) | ERROR Branded Comms <br/> Verification rejection - Opt-in URL not accessible                                                                      |
| [30837](www.twilio.com/docs/api/errors/30837) | ERROR Branded Comms <br/> Verification rejection - Opt-in example must be complete and branded                                                    |
| [30838](www.twilio.com/docs/api/errors/30838) | ERROR Branded Comms <br/> Verification rejection - Verbal consent script must be provided                                                         |
| [30839](www.twilio.com/docs/api/errors/30839) | ERROR Branded Comms <br/> Verification rejection - Third-party information sharing not allowed                                                    |
| [30840](www.twilio.com/docs/api/errors/30840) | ERROR Branded Comms <br/> Verification rejection - Age gate required for age-restricted content                                                   |
| [30841](www.twilio.com/docs/api/errors/30841) | ERROR Branded Comms <br/> Verification rejection - Opt-in not sufficient: Language Unclear                                                        |
| [30842](www.twilio.com/docs/api/errors/30842) | ERROR Branded Comms <br/> Verification rejection - Opt-in not provided                                                                            |
| [30843](www.twilio.com/docs/api/errors/30843) | ERROR Branded Comms <br/> Verification rejection - Valid opt-in required for all submissions                                                      |
| [30844](www.twilio.com/docs/api/errors/30844) | ERROR Branded Comms <br/> Verification rejection - Double opt-in required for this use case                                                       |
| [30845](www.twilio.com/docs/api/errors/30845) | ERROR Branded Comms <br/> Verification rejection - Shopping cart reminders must follow specific guidelines                                        |
| [30846](www.twilio.com/docs/api/errors/30846) | ERROR Branded Comms <br/> Verification rejection - Call-to-action missing required disclosures                                                    |
| [30847](www.twilio.com/docs/api/errors/30847) | ERROR Branded Comms <br/> Verification rejection - Privacy policy required for personal data collection                                           |
| [30848](www.twilio.com/docs/api/errors/30848) | ERROR Branded Comms <br/> Verification rejection - Privacy policy mentions sharing opt-in data                                                    |
| [30849](www.twilio.com/docs/api/errors/30849) | ERROR Branded Comms <br/> Verification rejection - Opt-in data cannot be shared with third parties                                                |
| [30850](www.twilio.com/docs/api/errors/30850) | ERROR Branded Comms <br/> Verification rejection - SMS terms must be accessible and compliant                                                     |
| [30851](www.twilio.com/docs/api/errors/30851) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Spam                                                                               |
| [30852](www.twilio.com/docs/api/errors/30852) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Fraud                                                                              |
| [30853](www.twilio.com/docs/api/errors/30853) | ERROR Branded Comms <br/> Verification rejection - Disallowed - Phishing                                                                          |
| [30854](www.twilio.com/docs/api/errors/30854) | ERROR Branded Comms <br/> Verification rejection - High-risk domain reputation                                                                    |
| [30855](www.twilio.com/docs/api/errors/30855) | ERROR Branded Comms <br/> Verification rejection - Potential fraud risk                                                                           |
| [30856](www.twilio.com/docs/api/errors/30856) | ERROR Branded Comms <br/> Verification rejection - High Risk: Deceptive Marketing                                                                 |
| [30857](www.twilio.com/docs/api/errors/30857) | ERROR Branded Comms <br/> Verification rejection - URL issues in sample message                                                                   |
| [30858](www.twilio.com/docs/api/errors/30858) | ERROR Branded Comms <br/> Verification rejection - High Risk - Non-secured URL in sample message                                                  |
| [30859](www.twilio.com/docs/api/errors/30859) | ERROR Branded Comms <br/> Verification rejection - High-risk domain issues                                                                        |
| [30860](www.twilio.com/docs/api/errors/30860) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Cannabis/CBD                                                                       |
| [30861](www.twilio.com/docs/api/errors/30861) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Illegal substances/articles                                                        |
| [30862](www.twilio.com/docs/api/errors/30862) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Loan Marketing                                                                     |
| [30863](www.twilio.com/docs/api/errors/30863) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Third Party Debt Collection                                                        |
| [30864](www.twilio.com/docs/api/errors/30864) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Gambling                                                                           |
| [30865](www.twilio.com/docs/api/errors/30865) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Sweepstakes                                                                        |
| [30866](www.twilio.com/docs/api/errors/30866) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Stock Alerts/Platforms                                                             |
| [30867](www.twilio.com/docs/api/errors/30867) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Cryptocurrency                                                                     |
| [30868](www.twilio.com/docs/api/errors/30868) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Risk Investment/Get Rich Quick Schemes                                             |
| [30869](www.twilio.com/docs/api/errors/30869) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Debt Reduction                                                                     |
| [30870](www.twilio.com/docs/api/errors/30870) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Credit Repair                                                                      |
| [30871](www.twilio.com/docs/api/errors/30871) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Third-party Lead Generation                                                        |
| [30872](www.twilio.com/docs/api/errors/30872) | ERROR Branded Comms <br/> Verification rejection - Disallowed: Non-federally compliant use case                                                   |
| [30873](www.twilio.com/docs/api/errors/30873) | ERROR Branded Comms <br/> Verification rejection - Disallowed: SHAFT - Sex                                                                        |
| [30874](www.twilio.com/docs/api/errors/30874) | ERROR Branded Comms <br/> Verification rejection - Disallowed: SHAFT - Hate                                                                       |
| [30875](www.twilio.com/docs/api/errors/30875) | ERROR Branded Comms <br/> Verification rejection - Disallowed: SHAFT - Alcohol                                                                    |
| [30876](www.twilio.com/docs/api/errors/30876) | ERROR Branded Comms <br/> Verification rejection - Alcohol promotions require age verification                                                    |
| [30877](www.twilio.com/docs/api/errors/30877) | ERROR Branded Comms <br/> Verification rejection - Disallowed: SHAFT - Firearms                                                                   |
| [30878](www.twilio.com/docs/api/errors/30878) | ERROR Branded Comms <br/> Verification rejection - Disallowed: SHAFT - Tobacco / Vape                                                             |
| [30879](www.twilio.com/docs/api/errors/30879) | ERROR Branded Comms <br/> Verification rejection - Phone number not provisioned to Twilio                                                         |
| [30880](www.twilio.com/docs/api/errors/30880) | ERROR Branded Comms <br/> Campaign vetting rejection - Unknown Error                                                                              |
| [30881](www.twilio.com/docs/api/errors/30881) | ERROR Branded Comms <br/> Campaign vetting rejection - Invalid Brand Support Email                                                                |
| [30882](www.twilio.com/docs/api/errors/30882) | ERROR Branded Comms <br/> Campaign vetting rejection - Terms & Conditions                                                                         |
| [30883](www.twilio.com/docs/api/errors/30883) | ERROR Branded Comms <br/> Campaign vetting rejection - Content Violation                                                                          |
| [30884](www.twilio.com/docs/api/errors/30884) | ERROR Branded Comms <br/> Campaign vetting rejection - Spam/Phishing                                                                              |
| [30885](www.twilio.com/docs/api/errors/30885) | ERROR Branded Comms <br/> Campaign vetting rejection - High Risk                                                                                  |
| [30886](www.twilio.com/docs/api/errors/30886) | ERROR Branded Comms <br/> Campaign vetting rejection - Invalid Campaign Description                                                               |
| [30887](www.twilio.com/docs/api/errors/30887) | ERROR Branded Comms <br/> Campaign vetting rejection - Opt-out Error                                                                              |
| [30888](www.twilio.com/docs/api/errors/30888) | ERROR Branded Comms <br/> Campaign vetting rejection - Age Gate Not Present / Not Acceptable                                                      |
| [30889](www.twilio.com/docs/api/errors/30889) | ERROR Branded Comms <br/> Campaign vetting rejection - Embedded Phone Number                                                                      |
| [30890](www.twilio.com/docs/api/errors/30890) | ERROR Branded Comms <br/> Campaign vetting rejection - Subscriber Help                                                                            |
| [30891](www.twilio.com/docs/api/errors/30891) | ERROR Branded Comms <br/> Campaign vetting rejection - Invalid Website URL                                                                        |
| [30892](www.twilio.com/docs/api/errors/30892) | ERROR Branded Comms <br/> Campaign vetting rejection - Invalid Sample Message - Public URL Shorteners                                             |
| [30893](www.twilio.com/docs/api/errors/30893) | ERROR Branded Comms <br/> Campaign vetting rejection - Inconsistency between Sample Message and Use-case                                          |
| [30894](www.twilio.com/docs/api/errors/30894) | ERROR Branded Comms <br/> Campaign vetting rejection - Invalid Brand Information                                                                  |
| [30895](www.twilio.com/docs/api/errors/30895) | ERROR Branded Comms <br/> Campaign vetting rejection - Direct Lending - Campaign and Content Attribute Error                                      |
| [30896](www.twilio.com/docs/api/errors/30896) | ERROR Branded Comms <br/> Campaign vetting rejection - Opt-in Error                                                                               |
| [30897](www.twilio.com/docs/api/errors/30897) | ERROR Branded Comms <br/> Campaign vetting rejection - Disallowed Content                                                                         |
| [30898](www.twilio.com/docs/api/errors/30898) | ERROR Branded Comms <br/> Campaign vetting rejection - Excessive EIN                                                                              |
| [30899](www.twilio.com/docs/api/errors/30899) | ERROR Branded Comms <br/> Campaign registration failed due to carrier rejection(s)                                                                |
| [30900](www.twilio.com/docs/api/errors/30900) | ERROR Branded Comms <br/> Campaign rejection - The campaign use case is ineligible for registration.                                              |
| [30901](www.twilio.com/docs/api/errors/30901) | ERROR Branded Comms <br/> Campaign rejection - The campaign registration request timed out.                                                       |
| [30902](www.twilio.com/docs/api/errors/30902) | ERROR Branded Comms <br/> Campaign rejection - A DCA2 rejected this campaign registration request.                                                |
| [30903](www.twilio.com/docs/api/errors/30903) | ERROR Branded Comms, Trust-Hub <br/> Campaign rejection - Incorrect Sole Prop Brand Registration                                                  |
| [30904](www.twilio.com/docs/api/errors/30904) | ERROR Branded Comms <br/> Campaign Not Shared with Twilio                                                                                         |
| [30905](www.twilio.com/docs/api/errors/30905) | ERROR Branded Comms <br/> Campaign Review Pending by Twilio                                                                                       |
| [30906](www.twilio.com/docs/api/errors/30906) | ERROR Branded Comms <br/> Campaign Rejected by Twilio                                                                                             |
| [30907](www.twilio.com/docs/api/errors/30907) | ERROR Branded Comms <br/> Campaign vetting rejection - Website URL Validation Issue                                                               |
| [30908](www.twilio.com/docs/api/errors/30908) | ERROR Branded Comms <br/> Campaign vetting rejection - Compliant Privacy Policy Required                                                          |
| [30909](www.twilio.com/docs/api/errors/30909) | ERROR Branded Comms <br/> Campaign rejected: Message Flow or Call to Action incomplete/unverified                                                 |
| [30910](www.twilio.com/docs/api/errors/30910) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: A2P 10DLC campaigns must be submitted in English                                      |
| [30911](www.twilio.com/docs/api/errors/30911) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Duplicate template text; each field must be unique                                    |
| [30912](www.twilio.com/docs/api/errors/30912) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: A2P 10DLC is for application-to-person messaging only                                 |
| [30913](www.twilio.com/docs/api/errors/30913) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Marketing and informational consent must be separate                                  |
| [30914](www.twilio.com/docs/api/errors/30914) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: sole proprietor campaign title does not match sole proprietor name                    |
| [30915](www.twilio.com/docs/api/errors/30915) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Sole proprietor must use individual's name, not business name                         |
| [30916](www.twilio.com/docs/api/errors/30916) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Use case mismatch between lead generation and lead nurture                            |
| [30917](www.twilio.com/docs/api/errors/30917) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: All opt-in methods must include complete workflow descriptions                        |
| [30918](www.twilio.com/docs/api/errors/30918) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: DBA name does not match the legal business name on file                               |
| [30919](www.twilio.com/docs/api/errors/30919) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Website lacks sufficient business or messaging use case info                          |
| [30920](www.twilio.com/docs/api/errors/30920) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Website is only a form; insufficient business context                                 |
| [30921](www.twilio.com/docs/api/errors/30921) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Website requires authentication and cannot be reviewed                                |
| [30922](www.twilio.com/docs/api/errors/30922) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Website does not meet campaign verification requirements                              |
| [30923](www.twilio.com/docs/api/errors/30923) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Message consent cannot be required for service use                                    |
| [30924](www.twilio.com/docs/api/errors/30924) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Missing or non-compliant consent agreement language in opt-in flow                    |
| [30925](www.twilio.com/docs/api/errors/30925) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Opt-in must be unchecked by default; active consent required                          |
| [30926](www.twilio.com/docs/api/errors/30926) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Multiple companies cannot share a single campaign                                     |
| [30927](www.twilio.com/docs/api/errors/30927) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Opt-in evidence is for a different company                                            |
| [30928](www.twilio.com/docs/api/errors/30928) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Social influencer/public figure use case not permitted                                |
| [30929](www.twilio.com/docs/api/errors/30929) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Emergency alert notifications are not a permitted use case                            |
| [30930](www.twilio.com/docs/api/errors/30930) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Brand campaign limit of 100 reached                                                   |
| [30931](www.twilio.com/docs/api/errors/30931) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Opt-in process must allow consumers to decline                                        |
| [30932](www.twilio.com/docs/api/errors/30932) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Privacy policy must disclose third-party data sharing                                 |
| [30933](www.twilio.com/docs/api/errors/30933) | ERROR Branded Comms, Phone Numbers <br/> Campaign registration rejected: Privacy Policy URL is required for A2P 10DLC campaign registration       |
| [30934](www.twilio.com/docs/api/errors/30934) | ERROR Branded Comms, Phone Numbers <br/> Campaign registration rejected: Terms and Conditions URL is required for A2P 10DLC campaign registration |
| [30935](www.twilio.com/docs/api/errors/30935) | ERROR Branded Comms <br/> Verification - Requested Cancellation                                                                                   |
| [30936](www.twilio.com/docs/api/errors/30936) | ERROR Branded Comms <br/> Verification rejection - HELP keyword response must meet requirements                                                   |
| [30940](www.twilio.com/docs/api/errors/30940) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Cannabis, CBD, or illegal substance content detected                                  |
| [30941](www.twilio.com/docs/api/errors/30941) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Prescription drug or controlled substance content detected                            |
| [30942](www.twilio.com/docs/api/errors/30942) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Loan marketing content detected                                                       |
| [30943](www.twilio.com/docs/api/errors/30943) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Third-party debt collection content detected                                          |
| [30944](www.twilio.com/docs/api/errors/30944) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Gambling or betting content detected                                                  |
| [30945](www.twilio.com/docs/api/errors/30945) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Sweepstakes or contest content detected                                               |
| [30946](www.twilio.com/docs/api/errors/30946) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Stock alert content detected                                                          |
| [30947](www.twilio.com/docs/api/errors/30947) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Cryptocurrency content detected                                                       |
| [30948](www.twilio.com/docs/api/errors/30948) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: High-risk investment content detected                                                 |
| [30949](www.twilio.com/docs/api/errors/30949) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Debt reduction or consolidation content detected                                      |
| [30950](www.twilio.com/docs/api/errors/30950) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Credit repair content detected                                                        |
| [30951](www.twilio.com/docs/api/errors/30951) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Third-party lead generation or MLM content detected                                   |
| [30952](www.twilio.com/docs/api/errors/30952) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Non-federally compliant use case detected                                             |
| [30953](www.twilio.com/docs/api/errors/30953) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: sex or adult content violation detected                                               |
| [30954](www.twilio.com/docs/api/errors/30954) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: hate speech or violent content detected                                               |
| [30955](www.twilio.com/docs/api/errors/30955) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: alcohol promotion content detected                                                    |
| [30956](www.twilio.com/docs/api/errors/30956) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: alcohol content without required age verification detected                            |
| [30957](www.twilio.com/docs/api/errors/30957) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: firearms or explosives content detected                                               |
| [30958](www.twilio.com/docs/api/errors/30958) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: tobacco or vape content detected                                                      |
| [30959](www.twilio.com/docs/api/errors/30959) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: fraudulent or misleading content detected                                             |
| [30960](www.twilio.com/docs/api/errors/30960) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: known phishing campaign detected                                                      |
| [30961](www.twilio.com/docs/api/errors/30961) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: high-risk domain reputation detected                                                  |
| [30962](www.twilio.com/docs/api/errors/30962) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: deceptive marketing practices detected                                                |
| [30963](www.twilio.com/docs/api/errors/30963) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: public URL shortener detected in campaign                                             |
| [30964](www.twilio.com/docs/api/errors/30964) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: non-secured URL (http://) detected                                                    |
| [30971](www.twilio.com/docs/api/errors/30971) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Business email must use official domain                                               |
| [30972](www.twilio.com/docs/api/errors/30972) | ERROR Branded Comms, Phone Numbers <br/> Campaign rejected: Contact must be an authorized business representative                                 |
| [30990](www.twilio.com/docs/api/errors/30990) | ERROR Branded Comms <br/> Campaign Suspension                                                                                                     |
| [30991](www.twilio.com/docs/api/errors/30991) | ERROR Branded Comms <br/> Campaign Registration Failed                                                                                            |
| [30992](www.twilio.com/docs/api/errors/30992) | ERROR Branded Comms <br/> Campaign Registration Failed                                                                                            |
| [30993](www.twilio.com/docs/api/errors/30993) | ERROR Branded Comms <br/> Campaign Registration Failed                                                                                            |
| [30994](www.twilio.com/docs/api/errors/30994) | ERROR Branded Comms <br/> Campaign Registration Failed                                                                                            |
| [30995](www.twilio.com/docs/api/errors/30995) | ERROR Branded Comms <br/> Messaging Service size limit reached                                                                                    |
| [31000](www.twilio.com/docs/api/errors/31000) | ERROR Programmable Voice <br/> Generic error                                                                                                      |
| [31001](www.twilio.com/docs/api/errors/31001) | ERROR Programmable Voice <br/> Application not found.                                                                                             |
| [31002](www.twilio.com/docs/api/errors/31002) | ERROR Programmable Voice <br/> Connection declined.                                                                                               |
| [31003](www.twilio.com/docs/api/errors/31003) | ERROR Programmable Voice <br/> Connection timeout                                                                                                 |
| [31005](www.twilio.com/docs/api/errors/31005) | ERROR Programmable Voice <br/> Connection error                                                                                                   |
| [31006](www.twilio.com/docs/api/errors/31006) | ERROR Programmable Voice <br/> Audio device error                                                                                                 |
| [31007](www.twilio.com/docs/api/errors/31007) | ERROR Programmable Voice <br/> Twilio Client: Voice JavaScript SDK version not supported                                                          |
| [31008](www.twilio.com/docs/api/errors/31008) | ERROR Programmable Voice <br/> Call cancelled                                                                                                     |
| [31009](www.twilio.com/docs/api/errors/31009) | ERROR Programmable Voice <br/> Transport error                                                                                                    |
| [31100](www.twilio.com/docs/api/errors/31100) | ERROR Programmable Voice <br/> Malformed request                                                                                                  |
| [31101](www.twilio.com/docs/api/errors/31101) | ERROR Programmable Voice <br/> Missing parameter array in request                                                                                 |
| [31102](www.twilio.com/docs/api/errors/31102) | ERROR Programmable Voice <br/> Authorization token missing in request                                                                             |
| [31103](www.twilio.com/docs/api/errors/31103) | ERROR Programmable Voice <br/> Length of parameters cannot exceed MAX\_PARAM\_LENGTH.                                                             |
| [31104](www.twilio.com/docs/api/errors/31104) | ERROR Programmable Voice <br/> Invalid bridge token.                                                                                              |
| [31105](www.twilio.com/docs/api/errors/31105) | ERROR Programmable Voice <br/> Invalid client name                                                                                                |
| [31106](www.twilio.com/docs/api/errors/31106) | ERROR Programmable Voice <br/> Invalid data                                                                                                       |
| [31201](www.twilio.com/docs/api/errors/31201) | ERROR Programmable Voice <br/> Twilio Client: Error occurred while accessing microphone                                                           |
| [31202](www.twilio.com/docs/api/errors/31202) | ERROR Programmable Voice <br/> Signature validation failed.                                                                                       |
| [31203](www.twilio.com/docs/api/errors/31203) | ERROR Programmable Voice <br/> No valid account.                                                                                                  |
| [31204](www.twilio.com/docs/api/errors/31204) | ERROR Programmable Voice <br/> Invalid JWT token.                                                                                                 |
| [31205](www.twilio.com/docs/api/errors/31205) | ERROR Programmable Voice <br/> JWT token has expired                                                                                              |
| [31206](www.twilio.com/docs/api/errors/31206) | ERROR Programmable Voice <br/> Rate exceeded authorized limit.                                                                                    |
| [31207](www.twilio.com/docs/api/errors/31207) | ERROR Programmable Voice <br/> JWT token expiration interval is too long                                                                          |
| [31208](www.twilio.com/docs/api/errors/31208) | ERROR Programmable Voice <br/> User denied access to microphone.                                                                                  |
| [31209](www.twilio.com/docs/api/errors/31209) | ERROR Programmable Voice <br/> Reconnect attempt error.                                                                                           |
| [31210](www.twilio.com/docs/api/errors/31210) | ERROR Programmable Voice <br/> Call Message Event Type is invalid.                                                                                |
| [31211](www.twilio.com/docs/api/errors/31211) | ERROR Programmable Voice <br/> Call is not in the expected state.                                                                                 |
| [31212](www.twilio.com/docs/api/errors/31212) | ERROR Programmable Voice <br/> Call Message Event Payload size exceeded authorized limit.                                                         |
| [31301](www.twilio.com/docs/api/errors/31301) | ERROR Programmable Voice <br/> Registration error                                                                                                 |
| [31302](www.twilio.com/docs/api/errors/31302) | ERROR Programmable Voice <br/> Unsupported Cancel Message Error                                                                                   |
| [31400](www.twilio.com/docs/api/errors/31400) | ERROR Programmable Voice <br/> Bad Request                                                                                                        |
| [31401](www.twilio.com/docs/api/errors/31401) | ERROR Programmable Voice <br/> UserMedia Permission Denied                                                                                        |
| [31402](www.twilio.com/docs/api/errors/31402) | ERROR Programmable Voice <br/> UserMedia Acquisition Failed                                                                                       |
| [31403](www.twilio.com/docs/api/errors/31403) | ERROR Programmable Voice <br/> Forbidden                                                                                                          |
| [31404](www.twilio.com/docs/api/errors/31404) | ERROR Programmable Voice <br/> Not Found                                                                                                          |
| [31408](www.twilio.com/docs/api/errors/31408) | ERROR Programmable Voice <br/> Request Timeout                                                                                                    |
| [31409](www.twilio.com/docs/api/errors/31409) | ERROR Programmable Voice <br/> Conflict                                                                                                           |
| [31426](www.twilio.com/docs/api/errors/31426) | ERROR Programmable Voice <br/> Upgrade Required                                                                                                   |
| [31429](www.twilio.com/docs/api/errors/31429) | ERROR Programmable Voice <br/> Too Many Requests                                                                                                  |
| [31480](www.twilio.com/docs/api/errors/31480) | ERROR Programmable Voice <br/> Temporarily Unavailable                                                                                            |
| [31481](www.twilio.com/docs/api/errors/31481) | ERROR Programmable Voice <br/> Call/Transaction Does Not Exist                                                                                    |
| [31484](www.twilio.com/docs/api/errors/31484) | ERROR Programmable Voice <br/> Address Incomplete                                                                                                 |
| [31486](www.twilio.com/docs/api/errors/31486) | ERROR Programmable Voice <br/> Busy Here                                                                                                          |
| [31487](www.twilio.com/docs/api/errors/31487) | ERROR Programmable Voice <br/> Request Terminated                                                                                                 |
| [31500](www.twilio.com/docs/api/errors/31500) | ERROR Programmable Voice <br/> Internal Server Error                                                                                              |
| [31502](www.twilio.com/docs/api/errors/31502) | ERROR Programmable Voice <br/> Bad Gateway                                                                                                        |
| [31503](www.twilio.com/docs/api/errors/31503) | ERROR Programmable Voice <br/> Service Unavailable                                                                                                |
| [31504](www.twilio.com/docs/api/errors/31504) | ERROR Programmable Voice <br/> Gateway Timeout                                                                                                    |
| [31530](www.twilio.com/docs/api/errors/31530) | ERROR Programmable Voice <br/> DNS Resolution Error                                                                                               |
| [31600](www.twilio.com/docs/api/errors/31600) | ERROR Programmable Voice <br/> Busy Everywhere                                                                                                    |
| [31603](www.twilio.com/docs/api/errors/31603) | ERROR Programmable Voice <br/> Decline                                                                                                            |
| [31604](www.twilio.com/docs/api/errors/31604) | ERROR Programmable Voice <br/> Does Not Exist Anywhere                                                                                            |
| [31900](www.twilio.com/docs/api/errors/31900) | ERROR Programmable Voice <br/> Stream - Unknown Error                                                                                             |
| [31901](www.twilio.com/docs/api/errors/31901) | ERROR Programmable Voice <br/> Stream - WebSocket - Connection Timeout                                                                            |
| [31902](www.twilio.com/docs/api/errors/31902) | ERROR Programmable Voice <br/> Stream - WebSocket - Connection Refused                                                                            |
| [31903](www.twilio.com/docs/api/errors/31903) | ERROR Programmable Voice <br/> Stream - WebSocket - Connection Broken Pipe                                                                        |
| [31904](www.twilio.com/docs/api/errors/31904) | ERROR Programmable Voice <br/> Stream - WebSocket - Host Unreachable                                                                              |
| [31910](www.twilio.com/docs/api/errors/31910) | ERROR Programmable Voice <br/> Stream - WebSocket - SSL Protocol Error                                                                            |
| [31920](www.twilio.com/docs/api/errors/31920) | ERROR Programmable Voice <br/> Stream - WebSocket - Handshake Error                                                                               |
| [31921](www.twilio.com/docs/api/errors/31921) | ERROR Programmable Voice <br/> Stream - WebSocket - Close Error                                                                                   |
| [31922](www.twilio.com/docs/api/errors/31922) | ERROR Programmable Voice <br/> Stream - WebSocket - URL Schema Not Supported                                                                      |
| [31923](www.twilio.com/docs/api/errors/31923) | ERROR Programmable Voice <br/> Stream - WebSocket - Malformed URL                                                                                 |
| [31924](www.twilio.com/docs/api/errors/31924) | ERROR Programmable Voice <br/> Stream - Websocket - Protocol Error                                                                                |
| [31930](www.twilio.com/docs/api/errors/31930) | WARNING Programmable Voice <br/> Stream - Media - Buffer Overflow                                                                                 |
| [31931](www.twilio.com/docs/api/errors/31931) | WARNING Programmable Voice <br/> Stream - Media - Media Discarded                                                                                 |
| [31940](www.twilio.com/docs/api/errors/31940) | ERROR Programmable Voice <br/> Stream - Invalid connectorName attribute in TwiML.                                                                 |
| [31941](www.twilio.com/docs/api/errors/31941) | ERROR Programmable Voice <br/> Stream - Invalid Track configuration                                                                               |
| [31942](www.twilio.com/docs/api/errors/31942) | ERROR Programmable Voice <br/> Stream - Invalid connector configuration                                                                           |
| [31950](www.twilio.com/docs/api/errors/31950) | WARNING Programmable Voice <br/> Stream - Protocol - Malformed Message                                                                            |
| [31951](www.twilio.com/docs/api/errors/31951) | WARNING Programmable Voice <br/> Stream - Protocol - Invalid Message                                                                              |
| [31952](www.twilio.com/docs/api/errors/31952) | ERROR Programmable Voice <br/> Stream Extension not found:                                                                                        |
| [31953](www.twilio.com/docs/api/errors/31953) | WARNING Programmable Voice <br/> Stream - Media - RTP timeout                                                                                     |
| [31954](www.twilio.com/docs/api/errors/31954) | ERROR Programmable Voice <br/> Stream Extension: Unsupported status                                                                               |
| [31955](www.twilio.com/docs/api/errors/31955) | ERROR Programmable Voice <br/> Stream Extension: Unsupported operation                                                                            |
| [31960](www.twilio.com/docs/api/errors/31960) | ERROR Programmable Voice <br/> Stream - Quota exceeded                                                                                            |
| [32001](www.twilio.com/docs/api/errors/32001) | ERROR Elastic SIP Trunking <br/> SIP: Trunk CPS limit exceeded                                                                                    |
| [32002](www.twilio.com/docs/api/errors/32002) | WARNING Programmable Voice <br/> SIP: Dial failure - Twilio SIP Domain not found                                                                  |
| [32005](www.twilio.com/docs/api/errors/32005) | ERROR Elastic SIP Trunking <br/> Voice calling has been disabled for this account                                                                 |
| [32006](www.twilio.com/docs/api/errors/32006) | WARNING  <br/> SIP: Too many hops                                                                                                                 |
| [32007](www.twilio.com/docs/api/errors/32007) | WARNING Programmable Voice <br/> SIP: Too many endpoints/bindings for the Address-of-record (AOR)                                                 |
| [32008](www.twilio.com/docs/api/errors/32008) | WARNING Programmable Voice <br/> SIP: Registration per second limit reached                                                                       |
| [32009](www.twilio.com/docs/api/errors/32009) | WARNING Programmable Voice <br/> The user you tried to dial is not registered with the corresponding SIP Domain                                   |
| [32010](www.twilio.com/docs/api/errors/32010) | ERROR Elastic SIP Trunking <br/> SIP: No valid Origination URIs configured                                                                        |
| [32011](www.twilio.com/docs/api/errors/32011) | WARNING Elastic SIP Trunking <br/> Error communicating with your SIP communications infrastructure                                                |
| [32012](www.twilio.com/docs/api/errors/32012) | WARNING Elastic SIP Trunking <br/> SIP: Parent account pooled Trunking CPS limit exceeded                                                         |
| [32013](www.twilio.com/docs/api/errors/32013) | ERROR Programmable Voice <br/> SIP: Parent account SIP Interface CPS limit exceeded                                                               |
| [32014](www.twilio.com/docs/api/errors/32014) | WARNING Programmable Voice <br/> Call is terminated because of no audio received                                                                  |
| [32015](www.twilio.com/docs/api/errors/32015) | WARNING Programmable Voice <br/> Call is terminated due to exceeding maximum call duration                                                        |
| [32016](www.twilio.com/docs/api/errors/32016) | ERROR  <br/> PSTN PDD timeout                                                                                                                     |
| [32017](www.twilio.com/docs/api/errors/32017) | ERROR  <br/> PSTN: Carrier blocked call due to calling number (caller ID)                                                                         |
| [32018](www.twilio.com/docs/api/errors/32018) | ERROR Programmable Voice <br/> Twiml size exceeded maximum allowed value                                                                          |
| [32019](www.twilio.com/docs/api/errors/32019) | WARNING Programmable Voice <br/> Twiml and Voice URL are both set. Using Voice URL.                                                               |
| [32020](www.twilio.com/docs/api/errors/32020) | ERROR Elastic SIP Trunking, Programmable Voice <br/> SHAKEN/STIR call verification failed due to invalid passport from customer                   |
| [32021](www.twilio.com/docs/api/errors/32021) | WARNING Programmable Voice <br/> SHAKEN/STIR call verification failed                                                                             |
| [32022](www.twilio.com/docs/api/errors/32022) | ERROR Programmable Voice <br/> ACK not received from your SIP endpoint                                                                            |
| [32100](www.twilio.com/docs/api/errors/32100) | WARNING Elastic SIP Trunking <br/> SIP: Trial accounts can only call verified caller IDs                                                          |
| [32101](www.twilio.com/docs/api/errors/32101) | WARNING Programmable Voice <br/> SIP: Invalid phone number                                                                                        |
| [32102](www.twilio.com/docs/api/errors/32102) | WARNING  <br/> SIP: Bad SDP                                                                                                                       |
| [32103](www.twilio.com/docs/api/errors/32103) | WARNING Programmable Voice <br/> SIP: Empty body                                                                                                  |
| [32105](www.twilio.com/docs/api/errors/32105) | WARNING Programmable Voice <br/> SIP: Invalid contact header                                                                                      |
| [32106](www.twilio.com/docs/api/errors/32106) | ERROR Programmable Voice <br/> SIP: Authentication Error                                                                                          |
| [32110](www.twilio.com/docs/api/errors/32110) | WARNING  <br/> SIP: URI is formatted incorrectly                                                                                                  |
| [32111](www.twilio.com/docs/api/errors/32111) | WARNING  <br/> SIP: Invalid header name                                                                                                           |
| [32112](www.twilio.com/docs/api/errors/32112) | WARNING  <br/> SIP: Invalid header value                                                                                                          |
| [32113](www.twilio.com/docs/api/errors/32113) | WARNING  <br/> SIP: Header name is not allowed                                                                                                    |
| [32114](www.twilio.com/docs/api/errors/32114) | WARNING  <br/> SIP: Unsupported parameter value                                                                                                   |
| [32115](www.twilio.com/docs/api/errors/32115) | ERROR Elastic SIP Trunking <br/> X-Branded-CallReason header contains an invalid value.                                                           |
| [32200](www.twilio.com/docs/api/errors/32200) | ERROR Elastic SIP Trunking <br/> SIP: Insufficient permissions                                                                                    |
| [32201](www.twilio.com/docs/api/errors/32201) | ERROR Elastic SIP Trunking <br/> SIP: Source IP address not in ACL                                                                                |
| [32202](www.twilio.com/docs/api/errors/32202) | ERROR Elastic SIP Trunking <br/> SIP: Bad user credentials                                                                                        |
| [32203](www.twilio.com/docs/api/errors/32203) | ERROR Elastic SIP Trunking, Trust-Hub, Programmable Voice <br/> SIP: Call blocked by Twilio                                                       |
| [32204](www.twilio.com/docs/api/errors/32204) | ERROR Elastic SIP Trunking <br/> SIP: 'From' phone number not verified                                                                            |
| [32205](www.twilio.com/docs/api/errors/32205) | ERROR Elastic SIP Trunking <br/> SIP Trunking: Geo Permission configuration is not permitting call                                                |
| [32206](www.twilio.com/docs/api/errors/32206) | ERROR Elastic SIP Trunking <br/> SIP: Invalid From number (caller ID)                                                                             |
| [32207](www.twilio.com/docs/api/errors/32207) | ERROR Elastic SIP Trunking <br/> SIP: Secure media not accepted                                                                                   |
| [32208](www.twilio.com/docs/api/errors/32208) | ERROR Elastic SIP Trunking <br/> SIP: Secure media required                                                                                       |
| [32209](www.twilio.com/docs/api/errors/32209) | ERROR  <br/> SIP: Secure transport required                                                                                                       |
| [32210](www.twilio.com/docs/api/errors/32210) | ERROR Programmable Voice <br/> SIP: Register not supported                                                                                        |
| [32212](www.twilio.com/docs/api/errors/32212) | WARNING Programmable Voice <br/> SIP: Registration Authentication problem                                                                         |
| [32214](www.twilio.com/docs/api/errors/32214) | WARNING Programmable Voice <br/> SIP: Invalid \<Dial>\<Sip>                                                                                       |
| [32215](www.twilio.com/docs/api/errors/32215) | WARNING Programmable Voice <br/> Dial failure calling a SIP Domain without specifying a region                                                    |
| [32216](www.twilio.com/docs/api/errors/32216) | ERROR  <br/> SIP: SIP Address is on a deny list                                                                                                   |
| [32218](www.twilio.com/docs/api/errors/32218) | ERROR Elastic SIP Trunking <br/> SIP: Transfer not allowed                                                                                        |
| [32219](www.twilio.com/docs/api/errors/32219) | ERROR Elastic SIP Trunking <br/> SIP: Redirect failed                                                                                             |
| [32220](www.twilio.com/docs/api/errors/32220) | ERROR Programmable Voice <br/> Specifying an edge is not allowed when dialing SIP registered endpoints                                            |
| [32221](www.twilio.com/docs/api/errors/32221) | ERROR Programmable Voice <br/> Dialing SIP Endpoint failure - No devices registered in specified edge                                             |
| [32222](www.twilio.com/docs/api/errors/32222) | ERROR Elastic SIP Trunking <br/> TLS version not allowed                                                                                          |
| [32223](www.twilio.com/docs/api/errors/32223) | ERROR Programmable Voice <br/> There is no username in the SIP URI when calling a SIP registered endpoint                                         |
| [32301](www.twilio.com/docs/api/errors/32301) | WARNING Interconnect <br/> Interconnect: Invalid Connection (TNX) SID                                                                             |
| [32302](www.twilio.com/docs/api/errors/32302) | WARNING Interconnect <br/> Interconnect: Connection (TNX) SID not found                                                                           |
| [32303](www.twilio.com/docs/api/errors/32303) | WARNING Interconnect <br/> Interconnect: Multiple SIP Dials with Interconnect Connection (TNX) SID                                                |
| [32304](www.twilio.com/docs/api/errors/32304) | WARNING Interconnect <br/> Interconnect: Connection (TNX) SID is not Active                                                                       |
| [32400](www.twilio.com/docs/api/errors/32400) | ERROR Programmable Voice <br/> BYOC Trunk routing failure - failover routing disabled.                                                            |
| [32401](www.twilio.com/docs/api/errors/32401) | WARNING Programmable Voice <br/> BYOC Trunk routing failure - failover to Twilio default routing.                                                 |
| [32500](www.twilio.com/docs/api/errors/32500) | ERROR Programmable Voice <br/> Voice Conversation: Generic error.                                                                                 |
| [32501](www.twilio.com/docs/api/errors/32501) | ERROR Programmable Voice <br/> Voice Conversation: TwiML attributes validation error.                                                             |
| [32502](www.twilio.com/docs/api/errors/32502) | WARNING Programmable Voice <br/> Voice Conversation: Callback event internal error.                                                               |
| [32503](www.twilio.com/docs/api/errors/32503) | WARNING Programmable Voice <br/> Voice Conversation: Callback event response error.                                                               |
| [32504](www.twilio.com/docs/api/errors/32504) | ERROR Programmable Voice, Connect <br/> Voice Conversation: Incomplete Conversation.                                                              |
| [32505](www.twilio.com/docs/api/errors/32505) | ERROR Programmable Voice <br/> Voice Conversation: Invalid data inside existing conversation.                                                     |
| [32506](www.twilio.com/docs/api/errors/32506) | ERROR Programmable Voice <br/> Voice Conversation: Failed to get worker assigned to a newly created Conversation.                                 |
| [32600](www.twilio.com/docs/api/errors/32600) | ERROR Programmable Voice <br/> Virtual Agent: Configuration Error                                                                                 |
| [32601](www.twilio.com/docs/api/errors/32601) | ERROR Programmable Voice <br/> Virtual Agent: Provider Error                                                                                      |
| [32602](www.twilio.com/docs/api/errors/32602) | ERROR Programmable Voice <br/> Virtual Agent: Invalid Connector                                                                                   |
| [32603](www.twilio.com/docs/api/errors/32603) | WARNING Programmable Voice <br/> Virtual Agent: Unsupported \<Config> attribute(s) in TwiML                                                       |
| [32604](www.twilio.com/docs/api/errors/32604) | ERROR Programmable Voice <br/> Virtual Agent: Internal Error                                                                                      |
| [32605](www.twilio.com/docs/api/errors/32605) | ERROR Programmable Voice <br/> Virtual Agent: PCI Error                                                                                           |
| [32606](www.twilio.com/docs/api/errors/32606) | ERROR Programmable Voice <br/> Virtual Agent: Resume Error                                                                                        |
| [32650](www.twilio.com/docs/api/errors/32650) | ERROR Programmable Voice <br/> Real-time Transcriptions: Configuration Error                                                                      |
| [32651](www.twilio.com/docs/api/errors/32651) | ERROR Programmable Voice <br/> Real-time Transcriptions: Provider Error                                                                           |
| [32652](www.twilio.com/docs/api/errors/32652) | WARNING Programmable Voice <br/> Real-time Transcriptions: Unsupported \<Config> attribute(s) in TwiML                                            |
| [32653](www.twilio.com/docs/api/errors/32653) | ERROR Programmable Voice <br/> Real-time Transcriptions: Internal Error                                                                           |
| [32654](www.twilio.com/docs/api/errors/32654) | ERROR Programmable Voice <br/> Real-time Transcriptions: PCI Error                                                                                |
| [32655](www.twilio.com/docs/api/errors/32655) | WARNING Programmable Voice <br/> Real-time Transcriptions: Intelligence Service Unreachable                                                       |
| [32656](www.twilio.com/docs/api/errors/32656) | WARNING  <br/> Conversation Relay & Intelligence Language Mismatch                                                                                |
| [32700](www.twilio.com/docs/api/errors/32700) | ERROR Programmable Voice <br/> Voice User-Defined Message: Internal Twilio Error                                                                  |
| [32701](www.twilio.com/docs/api/errors/32701) | WARNING Programmable Voice <br/> Voice User-Defined Message: Invalid Content-Type                                                                 |
| [32702](www.twilio.com/docs/api/errors/32702) | WARNING Programmable Voice <br/> Voice User-Defined Message: Invalid Content                                                                      |
| [32703](www.twilio.com/docs/api/errors/32703) | WARNING Programmable Voice <br/> Voice User-Defined Message: Content body exceeded max length                                                     |
| [32710](www.twilio.com/docs/api/errors/32710) | WARNING Programmable Voice <br/> Voice User-Defined Message: Subscription Callback Internal Error                                                 |
| [32711](www.twilio.com/docs/api/errors/32711) | WARNING Programmable Voice <br/> Voice User-Defined Message: Request to subscription callback URL encountered error                               |
| [32800](www.twilio.com/docs/api/errors/32800) | ERROR Programmable Voice <br/> Provisioning Failure                                                                                               |
| [33000](www.twilio.com/docs/api/errors/33000) | ERROR Programmable Wireless <br/> Generic Error                                                                                                   |
| [33004](www.twilio.com/docs/api/errors/33004) | ERROR Programmable Wireless <br/> Service is unavailable	                                                                                         |
| [33010](www.twilio.com/docs/api/errors/33010) | ERROR Programmable Wireless <br/> Conflicting update                                                                                              |
| [33101](www.twilio.com/docs/api/errors/33101) | ERROR Programmable Wireless <br/> Invalid Parameter Value	                                                                                        |
| [33102](www.twilio.com/docs/api/errors/33102) | ERROR Programmable Wireless <br/> Parameter missing                                                                                               |
| [33103](www.twilio.com/docs/api/errors/33103) | ERROR Programmable Wireless <br/> Paging information invalid                                                                                      |
| [33104](www.twilio.com/docs/api/errors/33104) | ERROR Programmable Wireless <br/> Configuration incomplete                                                                                        |
| [33105](www.twilio.com/docs/api/errors/33105) | ERROR Programmable Wireless <br/> Transition invalid                                                                                              |
| [33107](www.twilio.com/docs/api/errors/33107) | ERROR Programmable Wireless <br/> SIM not found                                                                                                   |
| [33108](www.twilio.com/docs/api/errors/33108) | ERROR Programmable Wireless <br/> Rate Plan not found                                                                                             |
| [33111](www.twilio.com/docs/api/errors/33111) | ERROR Programmable Wireless <br/> Command exceeded max length                                                                                     |
| [33118](www.twilio.com/docs/api/errors/33118) | ERROR Programmable Wireless <br/> Number of Commands exceeded                                                                                     |
| [33119](www.twilio.com/docs/api/errors/33119) | ERROR Programmable Wireless <br/> SIM connectivity reset not allowed                                                                              |
| [33120](www.twilio.com/docs/api/errors/33120) | ERROR Programmable Wireless <br/> SIM connectivity reset in progress                                                                              |
| [33121](www.twilio.com/docs/api/errors/33121) | ERROR Programmable Wireless <br/> Invalid Parameter Combination                                                                                   |
| [33122](www.twilio.com/docs/api/errors/33122) | ERROR Programmable Wireless <br/> Rate Plan Is Not Allowed                                                                                        |
| [33201](www.twilio.com/docs/api/errors/33201) | ERROR Programmable Wireless <br/> Unauthorized                                                                                                    |
| [33203](www.twilio.com/docs/api/errors/33203) | ERROR Programmable Wireless <br/> Messaging not allowed                                                                                           |
| [34002](www.twilio.com/docs/api/errors/34002) | ERROR Account <br/> Callee Busy                                                                                                                   |
| [34003](www.twilio.com/docs/api/errors/34003) | ERROR Account <br/> Callee did not answer                                                                                                         |
| [34004](www.twilio.com/docs/api/errors/34004) | ERROR Account <br/> Error during fax transmission                                                                                                 |
| [34005](www.twilio.com/docs/api/errors/34005) | ERROR Account <br/> Programmable Fax is no longer available                                                                                       |
| [34106](www.twilio.com/docs/api/errors/34106) | ERROR Account <br/> No Fax TwiML action specified                                                                                                 |
| [34108](www.twilio.com/docs/api/errors/34108) | ERROR Account <br/> Other End Incompatible                                                                                                        |
| [35111](www.twilio.com/docs/api/errors/35111) | ERROR Branded Comms <br/> SendAt timestamp is missing                                                                                             |
| [35114](www.twilio.com/docs/api/errors/35114) | ERROR Branded Comms <br/> Scheduling does not support this timestamp                                                                              |
| [35115](www.twilio.com/docs/api/errors/35115) | ERROR Branded Comms <br/> Scheduling does not support this timestamp                                                                              |
| [35117](www.twilio.com/docs/api/errors/35117) | ERROR Branded Comms <br/> Scheduling does not support this timestamp                                                                              |
| [35118](www.twilio.com/docs/api/errors/35118) | ERROR Branded Comms <br/> MessagingServiceSid is required to schedule a message                                                                   |
| [35125](www.twilio.com/docs/api/errors/35125) | ERROR Branded Comms <br/> Maximum limit reached in the account for scheduling messages                                                            |
| [35126](www.twilio.com/docs/api/errors/35126) | ERROR Branded Comms <br/> The ScheduleType value provided is not supported for this channel                                                       |
| [35127](www.twilio.com/docs/api/errors/35127) | ERROR Branded Comms <br/> 'Messages' Body and ContentVariables cannot be provided together                                                        |
| [35132](www.twilio.com/docs/api/errors/35132) | ERROR Branded Comms <br/> Bulk : Provided Attributes JSON is not valid                                                                            |
| [35133](www.twilio.com/docs/api/errors/35133) | ERROR Branded Comms <br/> Invalid 'Messages' array provided in the request                                                                        |
| [35134](www.twilio.com/docs/api/errors/35134) | ERROR Branded Comms <br/> \`Messages\` array contains duplicate \`To\` numbers.                                                                   |
| [36001](www.twilio.com/docs/api/errors/36001) | ERROR Branded Comms <br/> Broadcast SID Not Found                                                                                                 |
| [36002](www.twilio.com/docs/api/errors/36002) | ERROR Branded Comms <br/> Broadcast Request Limit Reached                                                                                         |
| [36003](www.twilio.com/docs/api/errors/36003) | ERROR Branded Comms <br/> Broadcast Upload File Size Exceeded                                                                                     |
| [36004](www.twilio.com/docs/api/errors/36004) | ERROR Branded Comms <br/> Error Retrieving File                                                                                                   |
| [36005](www.twilio.com/docs/api/errors/36005) | ERROR Branded Comms <br/> Broadcast File Type Invalid                                                                                             |
| [36006](www.twilio.com/docs/api/errors/36006) | ERROR Branded Comms <br/> Broadcast Cannot Be Canceled                                                                                            |
| [36007](www.twilio.com/docs/api/errors/36007) | ERROR Branded Comms <br/> Broadcast Upload Status Check Failure                                                                                   |
| [36008](www.twilio.com/docs/api/errors/36008) | ERROR Branded Comms <br/> Invalid Page Token                                                                                                      |
| [36009](www.twilio.com/docs/api/errors/36009) | ERROR Branded Comms <br/> Stats for Broadcast SID Not Found                                                                                       |
| [37000](www.twilio.com/docs/api/errors/37000) | ERROR Programmable Voice <br/> WhatsApp Voice: Call permission not granted by consumer                                                            |
| [37001](www.twilio.com/docs/api/errors/37001) | ERROR Programmable Voice <br/> WhatsApp Voice: Outbound calls are not supported in this region                                                    |
| [37002](www.twilio.com/docs/api/errors/37002) | ERROR Programmable Voice <br/> WhatsApp Voice: Calling is not enabled on the business number                                                      |
| [37003](www.twilio.com/docs/api/errors/37003) | ERROR Programmable Voice <br/> WhatsApp Voice: Duplicated call                                                                                    |
| [37004](www.twilio.com/docs/api/errors/37004) | ERROR Programmable Voice <br/> WhatsApp Voice: Call rate limit exceeded                                                                           |
| [37005](www.twilio.com/docs/api/errors/37005) | ERROR Programmable Voice <br/> WhatsApp Voice: Could not change calling status on the WhatsApp Sender                                             |
| [37006](www.twilio.com/docs/api/errors/37006) | ERROR Programmable Voice <br/> WhatsApp Voice: Max business-initiated calls to this number in 24 hours reached                                    |
| [37007](www.twilio.com/docs/api/errors/37007) | ERROR Programmable Voice <br/> WhatsApp Voice: Business-initiated calling is not available in the country                                         |
| [37008](www.twilio.com/docs/api/errors/37008) | ERROR Programmable Voice <br/> WhatsApp Voice: Outbound call fails due to invalid from number                                                     |
| [37009](www.twilio.com/docs/api/errors/37009) | ERROR Programmable Voice <br/> WhatsApp Voice: Voice application not configured                                                                   |
| [37010](www.twilio.com/docs/api/errors/37010) | ERROR Programmable Voice <br/> WhatsApp Voice: Voice Call Permanent Permission Exists                                                             |

[Back to top](#)

## 40000-49999

| Code                                          | Description                                                                                           |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [40000](www.twilio.com/docs/api/errors/40000) | ERROR TaskRouter <br/> Content-Type of 'application/json' not set                                     |
| [40001](www.twilio.com/docs/api/errors/40001) | WARNING TaskRouter <br/> Assignment Instruction response is not valid JSON. Ensure it is not escaped  |
| [40005](www.twilio.com/docs/api/errors/40005) | WARNING TaskRouter <br/> Assignment Callback response does not contain Instruction                    |
| [40100](www.twilio.com/docs/api/errors/40100) | ERROR TaskRouter <br/> TaskRouter->Reject                                                             |
| [40110](www.twilio.com/docs/api/errors/40110) | ERROR TaskRouter <br/> TaskRouter->Call                                                               |
| [40111](www.twilio.com/docs/api/errors/40111) | ERROR TaskRouter <br/> TaskRouter->Call                                                               |
| [40112](www.twilio.com/docs/api/errors/40112) | ERROR TaskRouter <br/> TaskRouter->Call                                                               |
| [40113](www.twilio.com/docs/api/errors/40113) | ERROR TaskRouter <br/> TaskRouter->Call                                                               |
| [40114](www.twilio.com/docs/api/errors/40114) | ERROR TaskRouter <br/> TaskRouter->Call                                                               |
| [40120](www.twilio.com/docs/api/errors/40120) | ERROR TaskRouter <br/> TaskRouter->Direct                                                             |
| [40121](www.twilio.com/docs/api/errors/40121) | ERROR TaskRouter <br/> TaskRouter->Direct                                                             |
| [40122](www.twilio.com/docs/api/errors/40122) | ERROR TaskRouter <br/> TaskRouter->Direct                                                             |
| [40123](www.twilio.com/docs/api/errors/40123) | ERROR TaskRouter <br/> TaskRouter->Redirect                                                           |
| [40130](www.twilio.com/docs/api/errors/40130) | ERROR TaskRouter <br/> TaskRouter->Dequeue                                                            |
| [40131](www.twilio.com/docs/api/errors/40131) | ERROR TaskRouter <br/> TaskRouter->Dequeue                                                            |
| [40132](www.twilio.com/docs/api/errors/40132) | ERROR TaskRouter <br/> TaskRouter->Dequeue                                                            |
| [40133](www.twilio.com/docs/api/errors/40133) | ERROR TaskRouter <br/> TaskRouter->Dequeue                                                            |
| [40134](www.twilio.com/docs/api/errors/40134) | ERROR TaskRouter <br/> Dequeue Instruction does not have a valid 'status\_callback\_events' parameter |
| [40135](www.twilio.com/docs/api/errors/40135) | ERROR TaskRouter <br/> TaskRouter->Dequeue                                                            |
| [40136](www.twilio.com/docs/api/errors/40136) | ERROR TaskRouter <br/> TaskRouter->Conference                                                         |
| [40137](www.twilio.com/docs/api/errors/40137) | ERROR TaskRouter <br/> Missing 'to' parameter when issuing Conference instruction                     |
| [40138](www.twilio.com/docs/api/errors/40138) | ERROR TaskRouter <br/> Missing 'from' parameter when issuing Conference instruction                   |
| [40139](www.twilio.com/docs/api/errors/40139) | ERROR TaskRouter <br/> Failed to issue Conference Instruction due to invalid ActivitySid              |
| [40140](www.twilio.com/docs/api/errors/40140) | ERROR TaskRouter <br/> Failed to issue Dequeue instruction due to missing 'call\_sid' property        |
| [40141](www.twilio.com/docs/api/errors/40141) | ERROR TaskRouter <br/> TaskRouter->Conference                                                         |
| [40142](www.twilio.com/docs/api/errors/40142) | ERROR TaskRouter <br/> Conference instruction failed: missing 'call\_sid' or 'outbound\_to'           |
| [40143](www.twilio.com/docs/api/errors/40143) | ERROR TaskRouter <br/> TaskRouter->Conference                                                         |
| [40144](www.twilio.com/docs/api/errors/40144) | ERROR TaskRouter <br/> TaskRouter->Conference                                                         |
| [40145](www.twilio.com/docs/api/errors/40145) | ERROR TaskRouter <br/> TaskRouter->Conference                                                         |
| [40146](www.twilio.com/docs/api/errors/40146) | ERROR TaskRouter <br/> Failed to issue Supervise Instruction due to invalid Reservation state         |
| [40147](www.twilio.com/docs/api/errors/40147) | ERROR TaskRouter <br/> Supervise instruction failed: missing or invalid 'contact\_uri'                |
| [40148](www.twilio.com/docs/api/errors/40148) | ERROR TaskRouter <br/> Failed to issue Supervise instruction due to missing ‘from’ property           |
| [40149](www.twilio.com/docs/api/errors/40149) | ERROR TaskRouter <br/> Failed to issue Conference instruction due to missing ‘conference\_sid’        |
| [40151](www.twilio.com/docs/api/errors/40151) | ERROR TaskRouter <br/> TaskRouter->Invalid instruction                                                |
| [40152](www.twilio.com/docs/api/errors/40152) | ERROR TaskRouter <br/> Invalid Queue for Known Worker                                                 |
| [40153](www.twilio.com/docs/api/errors/40153) | WARNING TaskRouter <br/> Absolute Paging used when iterating TaskRouter resources                     |
| [40154](www.twilio.com/docs/api/errors/40154) | ERROR TaskRouter <br/> Invalid Known Worker information                                               |
| [40155](www.twilio.com/docs/api/errors/40155) | ERROR TaskRouter <br/> Invalid Workspace for Known Worker                                             |
| [40157](www.twilio.com/docs/api/errors/40157) | ERROR TaskRouter <br/> Dequeue Instruction does not have a valid 'status\_callback\_url' parameter    |
| [40158](www.twilio.com/docs/api/errors/40158) | ERROR TaskRouter <br/> Call Instruction does not have a valid 'status\_callback\_url' parameter       |
| [40159](www.twilio.com/docs/api/errors/40159) | ERROR TaskRouter <br/> Conference Instruction does not have a valid 'status\_callback\_url' parameter |
| [45001](www.twilio.com/docs/api/errors/45001) | ERROR Flex <br/> General Service Error                                                                |
| [45002](www.twilio.com/docs/api/errors/45002) | ERROR Flex <br/> Authentication Error                                                                 |
| [45003](www.twilio.com/docs/api/errors/45003) | ERROR Flex <br/> Authorization Error                                                                  |
| [45004](www.twilio.com/docs/api/errors/45004) | ERROR Flex <br/> Validation Error                                                                     |
| [45005](www.twilio.com/docs/api/errors/45005) | ERROR Flex <br/> Service Unavailable                                                                  |
| [45006](www.twilio.com/docs/api/errors/45006) | ERROR Flex <br/> Resource Not Found                                                                   |
| [45007](www.twilio.com/docs/api/errors/45007) | ERROR Flex <br/> Resource Conflict Error                                                              |
| [45008](www.twilio.com/docs/api/errors/45008) | ERROR Flex <br/> Unprocessable Request                                                                |
| [45009](www.twilio.com/docs/api/errors/45009) | ERROR Flex <br/> Configuration Error                                                                  |
| [45010](www.twilio.com/docs/api/errors/45010) | ERROR Flex <br/> Rate Limit Exceeded                                                                  |
| [45050](www.twilio.com/docs/api/errors/45050) | ERROR Flex <br/> Authentication error - Missing User Attributes                                       |
| [45101](www.twilio.com/docs/api/errors/45101) | ERROR Flex <br/> Configuration Not Found                                                              |
| [45102](www.twilio.com/docs/api/errors/45102) | ERROR Flex <br/> Collision On Configuration Change                                                    |
| [45103](www.twilio.com/docs/api/errors/45103) | ERROR Flex <br/> Workspace Not Configured                                                             |
| [45109](www.twilio.com/docs/api/errors/45109) | ERROR Flex <br/> Skills Limit Exceeded                                                                |
| [45201](www.twilio.com/docs/api/errors/45201) | ERROR Flex <br/> Resource Not Found                                                                   |
| [45202](www.twilio.com/docs/api/errors/45202) | ERROR Flex <br/> Resource Already Exists                                                              |
| [45203](www.twilio.com/docs/api/errors/45203) | ERROR Flex <br/> Requested Chat User not found                                                        |
| [45204](www.twilio.com/docs/api/errors/45204) | WARNING Flex <br/> Requested Flex Chat Channel is not found                                           |
| [45205](www.twilio.com/docs/api/errors/45205) | ERROR Flex <br/> Requested Flex Flow is not found                                                     |
| [45206](www.twilio.com/docs/api/errors/45206) | WARNING Flex <br/> Chat User is already a member of the Chat Channel                                  |
| [45207](www.twilio.com/docs/api/errors/45207) | ERROR Flex <br/> Chat User per Chat Channel limit reached. User is part of too many Chat Channels.    |
| [45208](www.twilio.com/docs/api/errors/45208) | WARNING Flex <br/> Chat Channel with this unique name already exists                                  |
| [45209](www.twilio.com/docs/api/errors/45209) | ERROR Flex <br/> Adding user to Chat Channel timed out                                                |
| [45210](www.twilio.com/docs/api/errors/45210) | ERROR Flex <br/> Flex Flow creation failed                                                            |
| [45211](www.twilio.com/docs/api/errors/45211) | ERROR Flex <br/> Provided identity is reserved by system                                              |
| [45212](www.twilio.com/docs/api/errors/45212) | ERROR Flex <br/> Flex Flow creation failed                                                            |
| [45301](www.twilio.com/docs/api/errors/45301) | ERROR Flex <br/> Error occurred when connecting to a Meeting Participant                              |
| [45302](www.twilio.com/docs/api/errors/45302) | WARNING Flex <br/> Participant was disconnected before setting up Meeting                             |
| [45303](www.twilio.com/docs/api/errors/45303) | WARNING Flex <br/> Participant was busy                                                               |
| [45304](www.twilio.com/docs/api/errors/45304) | ERROR Flex <br/> Internal timeout error                                                               |
| [45305](www.twilio.com/docs/api/errors/45305) | WARNING Flex <br/>  No answer from Participant                                                        |
| [45306](www.twilio.com/docs/api/errors/45306) | WARNING Flex <br/> Meeting was canceled                                                               |
| [45307](www.twilio.com/docs/api/errors/45307) | WARNING Flex <br/> Add Participant Not Allowed                                                        |
| [45308](www.twilio.com/docs/api/errors/45308) | WARNING Flex <br/> Add Participant Not Allowed                                                        |
| [45309](www.twilio.com/docs/api/errors/45309) | ERROR Flex <br/> Modify Participant Not Allowed                                                       |
| [45310](www.twilio.com/docs/api/errors/45310) | ERROR Flex <br/> Participant Not Found                                                                |
| [45312](www.twilio.com/docs/api/errors/45312) | ERROR Flex <br/> Remove Participant Request Failed                                                    |
| [45313](www.twilio.com/docs/api/errors/45313) | ERROR Flex <br/> Transfer Failed                                                                      |
| [45350](www.twilio.com/docs/api/errors/45350) | ERROR Flex <br/> An unexpected error occurred.                                                        |
| [45351](www.twilio.com/docs/api/errors/45351) | ERROR Flex <br/> Invalid Channel Participant properties.                                              |
| [45352](www.twilio.com/docs/api/errors/45352) | ERROR Flex <br/> Failed to create an outbound Channel.                                                |
| [45353](www.twilio.com/docs/api/errors/45353) | WARNING Flex <br/> A duplicate create Channel request was dropped.                                    |
| [45354](www.twilio.com/docs/api/errors/45354) | ERROR Flex <br/> Cannot create a Channel for a closed Conversation.                                   |
| [45355](www.twilio.com/docs/api/errors/45355) | ERROR Flex <br/> Failed to create a channel.  No Participants found.                                  |
| [45356](www.twilio.com/docs/api/errors/45356) | ERROR Flex <br/> Failed to create a channel. Downstream error.                                        |
| [45357](www.twilio.com/docs/api/errors/45357) | ERROR Flex <br/> Downstream error configuring Channel.                                                |
| [45358](www.twilio.com/docs/api/errors/45358) | ERROR Flex <br/> Failed to close Channel.  Missing status parameter.                                  |
| [45359](www.twilio.com/docs/api/errors/45359) | ERROR Flex <br/> Failed to close Channel.  Invalid status parameter.                                  |
| [45360](www.twilio.com/docs/api/errors/45360) | ERROR Flex <br/> Failed to close or delete Conversation.  Downstream error.                           |
| [45361](www.twilio.com/docs/api/errors/45361) | ERROR Flex <br/> Failed to add Participant. Downstream error.                                         |
| [45362](www.twilio.com/docs/api/errors/45362) | WARNING Flex <br/> Failed to remove Participant.  Not found.                                          |
| [45363](www.twilio.com/docs/api/errors/45363) | ERROR Flex <br/> Failed to remove Participant.  Downstream error.                                     |
| [45366](www.twilio.com/docs/api/errors/45366) | ERROR Flex <br/> Failed to create Channel.  Invalid request parameters.                               |
| [45367](www.twilio.com/docs/api/errors/45367) | ERROR Flex <br/> Failed to add Participant.  Invalid request parameters.                              |
| [45368](www.twilio.com/docs/api/errors/45368) | WARNING Flex <br/> Failed to delete Channel.  Not found.                                              |
| [45369](www.twilio.com/docs/api/errors/45369) | ERROR Flex <br/> Failed to create inbound Channel.  Internal error.                                   |
| [45370](www.twilio.com/docs/api/errors/45370) | ERROR Flex <br/> Failed to create outbound Channel.  Internal error.                                  |
| [45371](www.twilio.com/docs/api/errors/45371) | ERROR Flex <br/> Failed to close Channel.  Internal error.                                            |
| [45372](www.twilio.com/docs/api/errors/45372) | ERROR Flex <br/> Failed to add Participant.  Internal error.                                          |
| [45373](www.twilio.com/docs/api/errors/45373) | ERROR Flex <br/> Failed to remove Participant.  Internal error.                                       |
| [45374](www.twilio.com/docs/api/errors/45374) | ERROR Flex <br/> Failed to delete Channel.  Internal error.                                           |
| [45375](www.twilio.com/docs/api/errors/45375) | WARNING Flex <br/> Failed to delete Channel.  Invalid Account sid.                                    |
| [45376](www.twilio.com/docs/api/errors/45376) | WARNING Flex <br/> Failed to add a participant.  Conversation was closed or not found.                |
| [45377](www.twilio.com/docs/api/errors/45377) | ERROR Flex <br/> Account SID not authorized.                                                          |
| [45378](www.twilio.com/docs/api/errors/45378) | ERROR Flex <br/> Failed to inactivate Channel. Internal error.                                        |
| [45379](www.twilio.com/docs/api/errors/45379) | ERROR Flex <br/> Failed to inactivate Channel. Downstream error.                                      |
| [45380](www.twilio.com/docs/api/errors/45380) | ERROR Flex <br/> Failed to activate Channel. Internal error.                                          |
| [45381](www.twilio.com/docs/api/errors/45381) | ERROR Flex <br/> Failed to activate Channel. Downstream error.                                        |
| [45401](www.twilio.com/docs/api/errors/45401) | WARNING Flex <br/> RTA feed callback returned not successful response code                            |
| [45402](www.twilio.com/docs/api/errors/45402) | WARNING Flex <br/> RTA feed callback response time exceeded the threshold                             |
| [45600](www.twilio.com/docs/api/errors/45600) | ERROR Flex <br/> Flex UI error                                                                        |
| [45601](www.twilio.com/docs/api/errors/45601) | ERROR Flex <br/> Custom Flex UI error                                                                 |
| [45700](www.twilio.com/docs/api/errors/45700) | ERROR Flex <br/> Unexpected error occurred. Unable to process WebChat request.                        |
| [45701](www.twilio.com/docs/api/errors/45701) | ERROR Flex <br/> Unexpected error occurred. Service unavailable.                                      |
| [45711](www.twilio.com/docs/api/errors/45711) | WARNING Flex <br/> Failed to create webchat participant. Unauthorized                                 |
| [45715](www.twilio.com/docs/api/errors/45715) | WARNING Flex <br/> Failed to create webchat participant. Invalid request parameters.                  |
| [45719](www.twilio.com/docs/api/errors/45719) | WARNING Flex <br/> Failed to create webchat participant. Too many requests                            |
| [45731](www.twilio.com/docs/api/errors/45731) | ERROR Flex <br/> Pre-engagement data too large.                                                       |
| [45733](www.twilio.com/docs/api/errors/45733) | ERROR Flex <br/> Pre-engagement data is not in valid JSON format.                                     |
| [45741](www.twilio.com/docs/api/errors/45741) | ERROR Flex <br/> Failed to create webchat conversation. Account not authorized                        |
| [45744](www.twilio.com/docs/api/errors/45744) | ERROR Flex <br/> Failed to create webchat conversation. A resource provided could not be found.       |
| [45745](www.twilio.com/docs/api/errors/45745) | ERROR Flex <br/> Invalid or missing parameters in the create conversation request.                    |
| [45760](www.twilio.com/docs/api/errors/45760) | ERROR Flex <br/> Unable to validate address configuration. Auto create data missing.                  |
| [45761](www.twilio.com/docs/api/errors/45761) | ERROR Flex <br/> Failed to validate address configuration. Auto create not enabled.                   |
| [45762](www.twilio.com/docs/api/errors/45762) | ERROR Flex <br/> Failed to validate address configuration. Auto create type is empty or invalid.      |
| [45763](www.twilio.com/docs/api/errors/45763) | ERROR Flex <br/> Unable to validate address configuration. Auto create studio flow SID missing.       |
| [45764](www.twilio.com/docs/api/errors/45764) | ERROR Flex <br/> Unable to validate address configuration. Auto create webhook URL missing.           |
| [45765](www.twilio.com/docs/api/errors/45765) | ERROR Flex <br/> Address configuration data not found                                                 |
| [45770](www.twilio.com/docs/api/errors/45770) | ERROR Flex <br/> Failed to create InteractionChannel. Downstream Error.                               |
| [45771](www.twilio.com/docs/api/errors/45771) | ERROR Flex <br/> Failed to create InboundConversation. Internal Error.                                |
| [45772](www.twilio.com/docs/api/errors/45772) | WARNING Flex <br/> Failed to perform operation. Required header is either missing or incorrect.       |
| [45773](www.twilio.com/docs/api/errors/45773) | ERROR Flex <br/> Internal Error. Failed to create token.                                              |
| [45774](www.twilio.com/docs/api/errors/45774) | ERROR Flex <br/> Internal Error. Failed to refresh token.                                             |
| [45775](www.twilio.com/docs/api/errors/45775) | WARNING Flex <br/> Failed to refresh token. Invalid token provided.                                   |
| [45776](www.twilio.com/docs/api/errors/45776) | ERROR Flex <br/> Failed to fetch Configuration for deployment key.                                    |
| [45777](www.twilio.com/docs/api/errors/45777) | WARNING Flex <br/> Address Configuration not found for deployment key.                                |
| [45778](www.twilio.com/docs/api/errors/45778) | WARNING Flex <br/> Configuration not found for provided Deployment Key.                               |
| [45780](www.twilio.com/docs/api/errors/45780) | WARNING Flex <br/> Operation failed: too many concurrent API requests                                 |
| [45781](www.twilio.com/docs/api/errors/45781) | ERROR Flex <br/> Internal Error. Failed to create deployment key.                                     |
| [45782](www.twilio.com/docs/api/errors/45782) | ERROR Flex <br/> Internal Error. Failed to delete deployment key.                                     |
| [45784](www.twilio.com/docs/api/errors/45784) | ERROR Flex <br/> Internal Error. Failed to get deployment keys.                                       |
| [45785](www.twilio.com/docs/api/errors/45785) | ERROR Flex <br/> Internal Error. Failed to delete deployment keys.                                    |
| [45788](www.twilio.com/docs/api/errors/45788) | ERROR Flex <br/> Internal Error. Failed to update deployment key.                                     |
| [45789](www.twilio.com/docs/api/errors/45789) | WARNING Flex <br/> Deployment key is already linked to other address  configuration sid.              |
| [45794](www.twilio.com/docs/api/errors/45794) | WARNING Flex <br/> Max deployment keys limit reached for this account.                                |
| [45795](www.twilio.com/docs/api/errors/45795) | WARNING Flex <br/> Friendly name must be between 1 and  64 characters long.                           |
| [45796](www.twilio.com/docs/api/errors/45796) | WARNING Flex <br/> Operation failed: conflict with current resource state                             |
| [45797](www.twilio.com/docs/api/errors/45797) | WARNING Flex <br/> Support Access Token Generated                                                     |
| [45798](www.twilio.com/docs/api/errors/45798) | ERROR Flex <br/> Error processing SCIM request - internal server error                                |
| [45799](www.twilio.com/docs/api/errors/45799) | WARNING Flex <br/> Error processing SCIM request - client error                                       |
| [46001](www.twilio.com/docs/api/errors/46001) | ERROR Programmable Voice <br/> Invalid Request Body                                                   |
| [46002](www.twilio.com/docs/api/errors/46002) | ERROR Programmable Voice <br/> Invalid Schema                                                         |
| [46003](www.twilio.com/docs/api/errors/46003) | ERROR Programmable Voice <br/> Invalid Unique Name                                                    |
| [46004](www.twilio.com/docs/api/errors/46004) | ERROR Programmable Voice <br/> Configuration Not Found                                                |
| [46007](www.twilio.com/docs/api/errors/46007) | ERROR Programmable Voice <br/> Invalid Use of Unique Name                                             |
| [46008](www.twilio.com/docs/api/errors/46008) | ERROR Programmable Voice <br/> Internal Error                                                         |
| [46009](www.twilio.com/docs/api/errors/46009) | ERROR Programmable Voice <br/> Forbidden Access                                                       |
| [48000](www.twilio.com/docs/api/errors/48000) | ERROR  <br/> Invalid request payload                                                                  |
| [48001](www.twilio.com/docs/api/errors/48001) | WARNING  <br/> Callback URL is not set                                                                |
| [48002](www.twilio.com/docs/api/errors/48002) | ERROR  <br/> Callback URL is invalid                                                                  |
| [48003](www.twilio.com/docs/api/errors/48003) | ERROR  <br/> Callback returned an invalid response                                                    |
| [48004](www.twilio.com/docs/api/errors/48004) | ERROR  <br/> Callback returned an error                                                               |
| [48005](www.twilio.com/docs/api/errors/48005) | ERROR  <br/> Callback failed due to timeout                                                           |
| [48010](www.twilio.com/docs/api/errors/48010) | ERROR  <br/> Custom Routing Callback failed to execute successfully                                   |
| [48011](www.twilio.com/docs/api/errors/48011) | ERROR  <br/> Custom Routing Callback failed due to an internal error                                  |
| [48023](www.twilio.com/docs/api/errors/48023) | ERROR  <br/> Frontline user conversation limit exceeded                                               |
| [48024](www.twilio.com/docs/api/errors/48024) | ERROR  <br/> Contact conversation limit exceeded                                                      |
| [48025](www.twilio.com/docs/api/errors/48025) | ERROR  <br/> Outgoing conversation: Invalid contact address                                           |
| [48026](www.twilio.com/docs/api/errors/48026) | ERROR  <br/> Outgoing conversation: Invalid proxy address                                             |
| [48027](www.twilio.com/docs/api/errors/48027) | ERROR  <br/> Outgoing conversation: Proxy address equals contact address                              |
| [48028](www.twilio.com/docs/api/errors/48028) | ERROR  <br/> Outgoing conversation: Unauthorized use of the proxy address                             |
| [48029](www.twilio.com/docs/api/errors/48029) | ERROR  <br/> Outgoing conversation: Contact address type does not match proxy address type            |
| [48030](www.twilio.com/docs/api/errors/48030) | ERROR  <br/> Outgoing conversation: Proxy address is not WhatsApp-enabled sender                      |
| [48031](www.twilio.com/docs/api/errors/48031) | ERROR Connect <br/> Outgoing conversation already exists for this contact and proxy address           |
| [48032](www.twilio.com/docs/api/errors/48032) | ERROR  <br/> Outgoing conversation: Missing Messaging service                                         |
| [48033](www.twilio.com/docs/api/errors/48033) | ERROR  <br/> Outgoing conversation: Invalid contact identity                                          |
| [48050](www.twilio.com/docs/api/errors/48050) | ERROR  <br/> Internal service error                                                                   |
| [49008](www.twilio.com/docs/api/errors/49008) | ERROR Flex <br/> Profile Connector Installation Not Found                                             |
| [49009](www.twilio.com/docs/api/errors/49009) | ERROR Flex <br/> Credentials Malformed                                                                |

[Back to top](#)

## 50000-59999

| Code                                          | Description                                                                                                       |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [50000](www.twilio.com/docs/api/errors/50000) | ERROR Programmable Chat <br/> Programmable Chat: FriendlyName not provided                                        |
| [50001](www.twilio.com/docs/api/errors/50001) | ERROR Programmable Chat <br/> Programmable Chat: Account SID not provided                                         |
| [50002](www.twilio.com/docs/api/errors/50002) | ERROR Programmable Chat <br/> Programmable Chat: Resource is being deleted                                        |
| [50003](www.twilio.com/docs/api/errors/50003) | ERROR Programmable Chat <br/> Programmable Chat: Friendly name too long                                           |
| [50004](www.twilio.com/docs/api/errors/50004) | ERROR Programmable Chat <br/> Programmable Chat: Unique Name too long                                             |
| [50006](www.twilio.com/docs/api/errors/50006) | ERROR Programmable Chat <br/> Programmable Chat: Invalid Account SID                                              |
| [50050](www.twilio.com/docs/api/errors/50050) | ERROR Programmable Chat <br/> Programmable Chat: Service Instance not found                                       |
| [50051](www.twilio.com/docs/api/errors/50051) | ERROR Programmable Chat <br/> Programmable Chat: Service SID not provided                                         |
| [50052](www.twilio.com/docs/api/errors/50052) | ERROR Programmable Chat <br/> Programmable Chat: Invalid consumption interval format                              |
| [50053](www.twilio.com/docs/api/errors/50053) | ERROR Programmable Chat <br/> Programmable Chat: Invalid typing indicator format                                  |
| [50054](www.twilio.com/docs/api/errors/50054) | ERROR Programmable Chat <br/> Programmable Chat: Invalid webhook format                                           |
| [50055](www.twilio.com/docs/api/errors/50055) | ERROR Programmable Chat <br/> Programmable Chat: Invalid webhook method                                           |
| [50056](www.twilio.com/docs/api/errors/50056) | ERROR Programmable Chat <br/> Programmable Chat: Webhook disabled processing of command                           |
| [50057](www.twilio.com/docs/api/errors/50057) | ERROR Programmable Chat <br/> Programmable Chat: Webhook call failed to execute successfully                      |
| [50058](www.twilio.com/docs/api/errors/50058) | ERROR Programmable Chat <br/> Programmable Chat: Notification template too long                                   |
| [50059](www.twilio.com/docs/api/errors/50059) | ERROR Programmable Chat <br/> Programmable Chat: Notification sound name too long                                 |
| [50060](www.twilio.com/docs/api/errors/50060) | ERROR Programmable Chat <br/> Programmable Chat: Invalid user channels limit format                               |
| [50061](www.twilio.com/docs/api/errors/50061) | ERROR Programmable Chat <br/> Programmable Chat: Invalid channel members limit format                             |
| [50063](www.twilio.com/docs/api/errors/50063) | ERROR Programmable Chat <br/> Programmable Chat: Actions per second limit exceeded                                |
| [50065](www.twilio.com/docs/api/errors/50065) | ERROR Programmable Chat <br/> Programmable Chat: Invalid webhook retry count                                      |
| [50068](www.twilio.com/docs/api/errors/50068) | ERROR  <br/> Programmable Chat: Service instance unique name invalid                                              |
| [50069](www.twilio.com/docs/api/errors/50069) | ERROR  <br/> Programmable Chat: Service instance with provided unique name already exists                         |
| [50074](www.twilio.com/docs/api/errors/50074) | ERROR Programmable Chat <br/> Global actions per second limit exceeded                                            |
| [50076](www.twilio.com/docs/api/errors/50076) | ERROR Programmable Chat <br/> Webhook failed to execute successfully due to timeout                               |
| [50077](www.twilio.com/docs/api/errors/50077) | ERROR Programmable Chat <br/> Invalid pre-webhook url                                                             |
| [50078](www.twilio.com/docs/api/errors/50078) | ERROR Programmable Chat <br/> Invalid post-webhook url                                                            |
| [50100](www.twilio.com/docs/api/errors/50100) | ERROR Programmable Chat <br/> Programmable Chat: Role not found                                                   |
| [50101](www.twilio.com/docs/api/errors/50101) | ERROR Programmable Chat <br/> Programmable Chat: Channel role not found                                           |
| [50102](www.twilio.com/docs/api/errors/50102) | ERROR Programmable Chat <br/> Programmable Chat: Deployment role not found                                        |
| [50103](www.twilio.com/docs/api/errors/50103) | ERROR Programmable Chat <br/> Programmable Chat: Role SID not provided                                            |
| [50104](www.twilio.com/docs/api/errors/50104) | ERROR Programmable Chat <br/> Programmable Chat: Permission not found                                             |
| [50105](www.twilio.com/docs/api/errors/50105) | ERROR Programmable Chat <br/> Programmable Chat: Invalid role type                                                |
| [50106](www.twilio.com/docs/api/errors/50106) | ERROR Programmable Chat <br/> Programmable Chat: Channel creator role not found                                   |
| [50107](www.twilio.com/docs/api/errors/50107) | ERROR Programmable Chat <br/> Programmable Chat: User not authorized for command                                  |
| [50109](www.twilio.com/docs/api/errors/50109) | ERROR Programmable Chat <br/> Conversation role not found                                                         |
| [50200](www.twilio.com/docs/api/errors/50200) | ERROR Programmable Chat <br/> Programmable Chat: User not found                                                   |
| [50201](www.twilio.com/docs/api/errors/50201) | ERROR Programmable Chat <br/> Programmable Chat: User already exists                                              |
| [50202](www.twilio.com/docs/api/errors/50202) | ERROR Programmable Chat <br/> Programmable Chat: User SID not provided                                            |
| [50203](www.twilio.com/docs/api/errors/50203) | ERROR Programmable Chat <br/> Programmable Chat: Identity reserved                                                |
| [50204](www.twilio.com/docs/api/errors/50204) | ERROR Programmable Chat <br/> Programmable Chat: Identity not provided                                            |
| [50205](www.twilio.com/docs/api/errors/50205) | ERROR Programmable Chat <br/> Programmable Chat: User unauthorized to set role                                    |
| [50206](www.twilio.com/docs/api/errors/50206) | ERROR Programmable Chat <br/> Programmable Chat: Identity should not match user SID pattern                       |
| [50207](www.twilio.com/docs/api/errors/50207) | ERROR Programmable Chat <br/> Programmable Chat: Identity too long                                                |
| [50208](www.twilio.com/docs/api/errors/50208) | ERROR Programmable Chat <br/> Programmable Chat: User channel limit exceeded                                      |
| [50209](www.twilio.com/docs/api/errors/50209) | ERROR Programmable Chat <br/> Programmable Chat: Invalid binding type                                             |
| [50210](www.twilio.com/docs/api/errors/50210) | ERROR Programmable Chat <br/> Programmable Chat: Invalid notification level                                       |
| [50211](www.twilio.com/docs/api/errors/50211) | ERROR Programmable Chat <br/> Identity parameter not acceptable for this Participant                              |
| [50212](www.twilio.com/docs/api/errors/50212) | ERROR Programmable Chat <br/> Programmable Chat: User already invited                                             |
| [50213](www.twilio.com/docs/api/errors/50213) | ERROR Programmable Chat <br/> Conflicting user modification                                                       |
| [50214](www.twilio.com/docs/api/errors/50214) | ERROR Programmable Chat <br/> User conversation limit exceeded                                                    |
| [50300](www.twilio.com/docs/api/errors/50300) | ERROR Programmable Chat <br/> Programmable Chat: Channel not found                                                |
| [50301](www.twilio.com/docs/api/errors/50301) | ERROR Programmable Chat <br/> Programmable Chat: Channel key not provided                                         |
| [50302](www.twilio.com/docs/api/errors/50302) | ERROR Programmable Chat <br/> Programmable Chat: Unknown channel command                                          |
| [50303](www.twilio.com/docs/api/errors/50303) | ERROR Programmable Chat <br/> Programmable Chat: Attributes too long                                              |
| [50304](www.twilio.com/docs/api/errors/50304) | ERROR Programmable Chat <br/> Programmable Chat: Attributes not valid JSON                                        |
| [50305](www.twilio.com/docs/api/errors/50305) | ERROR Programmable Chat <br/> Programmable Chat: Channel SID not provided                                         |
| [50306](www.twilio.com/docs/api/errors/50306) | ERROR Programmable Chat <br/> Programmable Chat: Unique name should not match channel SID pattern                 |
| [50307](www.twilio.com/docs/api/errors/50307) | ERROR Programmable Chat <br/> Programmable Chat: Channel with provided unique name already exists                 |
| [50308](www.twilio.com/docs/api/errors/50308) | ERROR Programmable Chat <br/> Programmable Chat: Invalid Date Created parameter                                   |
| [50309](www.twilio.com/docs/api/errors/50309) | ERROR Programmable Chat <br/> Programmable Chat: Invalid Date Updated parameter                                   |
| [50310](www.twilio.com/docs/api/errors/50310) | ERROR Programmable Chat <br/> Programmable Chat: Author parameter is too long                                     |
| [50320](www.twilio.com/docs/api/errors/50320) | ERROR Programmable Chat <br/> Programmable Chat: Channel webhook not found                                        |
| [50321](www.twilio.com/docs/api/errors/50321) | ERROR Programmable Chat <br/> Programmable Chat: Too many channel webhooks                                        |
| [50322](www.twilio.com/docs/api/errors/50322) | ERROR Programmable Chat <br/> Programmable Chat: Too many channel webhook triggers                                |
| [50323](www.twilio.com/docs/api/errors/50323) | ERROR Programmable Chat <br/> Programmable Chat: Invalid channel webhook sid                                      |
| [50324](www.twilio.com/docs/api/errors/50324) | ERROR Programmable Chat <br/> Invalid channel webhook type                                                        |
| [50325](www.twilio.com/docs/api/errors/50325) | ERROR Programmable Chat <br/> Programmable Chat: Invalid channel webhook filter                                   |
| [50326](www.twilio.com/docs/api/errors/50326) | ERROR Programmable Chat <br/> Programmable Chat: Invalid channel webhook trigger                                  |
| [50327](www.twilio.com/docs/api/errors/50327) | ERROR Programmable Chat <br/> Programmable Chat: Invalid channel webhook flow sid                                 |
| [50328](www.twilio.com/docs/api/errors/50328) | ERROR Programmable Chat <br/> Programmable Chat: Channel webhook type not provided                                |
| [50329](www.twilio.com/docs/api/errors/50329) | ERROR Programmable Chat <br/> Programmable Chat: Channel webhook url not provided                                 |
| [50330](www.twilio.com/docs/api/errors/50330) | ERROR Programmable Chat <br/> Programmable Chat: Channel webhook filter not provided                              |
| [50331](www.twilio.com/docs/api/errors/50331) | ERROR Programmable Chat <br/> Programmable Chat: Channel webhook trigger not provided                             |
| [50332](www.twilio.com/docs/api/errors/50332) | ERROR Programmable Chat <br/> Programmable Chat: Channel webhook url too long                                     |
| [50334](www.twilio.com/docs/api/errors/50334) | ERROR Programmable Chat <br/> Channel deletion operation is in progress                                           |
| [50340](www.twilio.com/docs/api/errors/50340) | ERROR Programmable Chat <br/> Messaging service SID not provided                                                  |
| [50341](www.twilio.com/docs/api/errors/50341) | ERROR Programmable Chat <br/> Invalid messaging service SID                                                       |
| [50342](www.twilio.com/docs/api/errors/50342) | ERROR Programmable Chat <br/> Messaging service does not belong to account                                        |
| [50347](www.twilio.com/docs/api/errors/50347) | ERROR Programmable Chat <br/> Parameters are missing for channel update request                                   |
| [50349](www.twilio.com/docs/api/errors/50349) | ERROR Programmable Chat <br/> Conflicting channel modification                                                    |
| [50350](www.twilio.com/docs/api/errors/50350) | ERROR Programmable Chat <br/> Conversation not found                                                              |
| [50351](www.twilio.com/docs/api/errors/50351) | ERROR Programmable Chat <br/> Conversation SID not provided                                                       |
| [50353](www.twilio.com/docs/api/errors/50353) | ERROR  <br/> Conversation with provided unique name already exists                                                |
| [50360](www.twilio.com/docs/api/errors/50360) | ERROR Programmable Chat <br/> Conversation webhook not found                                                      |
| [50361](www.twilio.com/docs/api/errors/50361) | ERROR Programmable Chat <br/> Too many conversation webhooks                                                      |
| [50362](www.twilio.com/docs/api/errors/50362) | ERROR Programmable Chat <br/> Too many conversation webhook triggers                                              |
| [50363](www.twilio.com/docs/api/errors/50363) | ERROR Programmable Chat <br/> Invalid conversation webhook SID                                                    |
| [50364](www.twilio.com/docs/api/errors/50364) | ERROR Programmable Chat <br/> Invalid conversation webhook type                                                   |
| [50365](www.twilio.com/docs/api/errors/50365) | ERROR Programmable Chat <br/> Invalid conversation webhook filter                                                 |
| [50366](www.twilio.com/docs/api/errors/50366) | ERROR Programmable Chat <br/> Invalid conversation webhook trigger                                                |
| [50367](www.twilio.com/docs/api/errors/50367) | ERROR Programmable Chat <br/> Invalid conversation webhook flow SID                                               |
| [50368](www.twilio.com/docs/api/errors/50368) | ERROR Programmable Chat <br/> Conversation webhook type not provided                                              |
| [50369](www.twilio.com/docs/api/errors/50369) | ERROR Programmable Chat <br/> Conversation webhook URL not provided                                               |
| [50370](www.twilio.com/docs/api/errors/50370) | ERROR Programmable Chat <br/> Conversation webhook filter not provided                                            |
| [50371](www.twilio.com/docs/api/errors/50371) | ERROR Programmable Chat <br/> Conversation webhook trigger not provided                                           |
| [50372](www.twilio.com/docs/api/errors/50372) | ERROR Programmable Chat <br/> Conversation webhook URL is too long                                                |
| [50373](www.twilio.com/docs/api/errors/50373) | ERROR Programmable Chat <br/> No Messaging Service assigned to Conversation                                       |
| [50374](www.twilio.com/docs/api/errors/50374) | ERROR Programmable Chat <br/> 'State' field can't be empty                                                        |
| [50375](www.twilio.com/docs/api/errors/50375) | ERROR Programmable Chat <br/> TimeToInactive should be greater or equal to 1 minute                               |
| [50376](www.twilio.com/docs/api/errors/50376) | ERROR Programmable Chat <br/> TimeToClosed should be greater or equal to 10 minutes                               |
| [50377](www.twilio.com/docs/api/errors/50377) | ERROR Programmable Chat <br/> Can't update conversation as it's in final closed state                             |
| [50378](www.twilio.com/docs/api/errors/50378) | ERROR Programmable Chat <br/> 'State' parameter value is invalid                                                  |
| [50379](www.twilio.com/docs/api/errors/50379) | ERROR Programmable Chat <br/> TimeToInactive format is invalid                                                    |
| [50380](www.twilio.com/docs/api/errors/50380) | ERROR Programmable Chat <br/> TimeToClosed format is invalid                                                      |
| [50382](www.twilio.com/docs/api/errors/50382) | ERROR Programmable Chat <br/> Timer can't be set without state                                                    |
| [50384](www.twilio.com/docs/api/errors/50384) | ERROR Programmable Chat <br/> Initial state can't be 'closed                                                      |
| [50385](www.twilio.com/docs/api/errors/50385) | ERROR Programmable Chat <br/> Conversations are disabled in this region                                           |
| [50386](www.twilio.com/docs/api/errors/50386) | ERROR  <br/> Conversation in 'initializing' state may not be updated or used for message sending                  |
| [50390](www.twilio.com/docs/api/errors/50390) | ERROR Programmable Chat <br/> Unique name should not match conversation sid pattern                               |
| [50391](www.twilio.com/docs/api/errors/50391) | ERROR Programmable Chat <br/> Conflicting conversation modification                                               |
| [50392](www.twilio.com/docs/api/errors/50392) | ERROR Programmable Chat <br/> PreWebhookTimeout should be greater than 0ms                                        |
| [50393](www.twilio.com/docs/api/errors/50393) | ERROR Programmable Chat <br/> Type value should be 'private'.                                                     |
| [50396](www.twilio.com/docs/api/errors/50396) | ERROR  <br/> EndDate parameter should be greater than StartDate parameter                                         |
| [50400](www.twilio.com/docs/api/errors/50400) | ERROR Programmable Chat <br/> Programmable Chat: User not member of channel                                       |
| [50401](www.twilio.com/docs/api/errors/50401) | ERROR Programmable Chat <br/> Programmable Chat: Member SID not provided                                          |
| [50402](www.twilio.com/docs/api/errors/50402) | ERROR Programmable Chat <br/> Programmable Chat: Member not found                                                 |
| [50403](www.twilio.com/docs/api/errors/50403) | ERROR Programmable Chat <br/> Programmable Chat: Channel member limit exceeded                                    |
| [50404](www.twilio.com/docs/api/errors/50404) | ERROR Programmable Chat <br/> Programmable Chat: Member already exists                                            |
| [50405](www.twilio.com/docs/api/errors/50405) | ERROR Programmable Chat <br/> Programmable Chat: Invalid last consumption timestamp format                        |
| [50406](www.twilio.com/docs/api/errors/50406) | ERROR Programmable Chat <br/> Programmable Chat: Invalid last consumed message index format                       |
| [50407](www.twilio.com/docs/api/errors/50407) | ERROR Programmable Chat <br/> Invalid messaging binding address                                                   |
| [50408](www.twilio.com/docs/api/errors/50408) | ERROR Programmable Chat <br/> Invalid participant proxy address                                                   |
| [50409](www.twilio.com/docs/api/errors/50409) | ERROR Programmable Chat <br/> Participant address equals proxy address                                            |
| [50411](www.twilio.com/docs/api/errors/50411) | ERROR Programmable Chat <br/> Participant address is empty                                                        |
| [50412](www.twilio.com/docs/api/errors/50412) | ERROR Programmable Chat <br/> Participant proxy address is empty                                                  |
| [50413](www.twilio.com/docs/api/errors/50413) | ERROR Programmable Chat <br/> Account is not authorized to use proxy address                                      |
| [50414](www.twilio.com/docs/api/errors/50414) | ERROR Programmable Chat <br/> Participant address type does not match proxy address type                          |
| [50415](www.twilio.com/docs/api/errors/50415) | ERROR Programmable Chat <br/> Proxy address is not WhatsApp enabled sender                                        |
| [50416](www.twilio.com/docs/api/errors/50416) | ERROR Programmable Chat <br/> Participant and proxy address pair is already in use                                |
| [50417](www.twilio.com/docs/api/errors/50417) | ERROR Programmable Chat <br/> Participants limit exceeded                                                         |
| [50418](www.twilio.com/docs/api/errors/50418) | ERROR Programmable Chat <br/> Non-Chat participants limit exceeded                                                |
| [50419](www.twilio.com/docs/api/errors/50419) | ERROR Programmable Chat <br/> Conflicting member modification                                                     |
| [50420](www.twilio.com/docs/api/errors/50420) | ERROR Connect <br/> Messaging Binding type does not support the provided parameters                               |
| [50421](www.twilio.com/docs/api/errors/50421) | ERROR Programmable Chat <br/> Invalid last read message index format                                              |
| [50422](www.twilio.com/docs/api/errors/50422) | ERROR Programmable Chat <br/> Non-chat conversation participants limit exceeded                                   |
| [50424](www.twilio.com/docs/api/errors/50424) | ERROR  <br/> One of the JSON requests for participant creation is invalid.                                        |
| [50425](www.twilio.com/docs/api/errors/50425) | ERROR  <br/> Participant and proxy address pairs for one or more participants already in use.                     |
| [50426](www.twilio.com/docs/api/errors/50426) | ERROR  <br/> Request contains too many participants.                                                              |
| [50427](www.twilio.com/docs/api/errors/50427) | ERROR  <br/> Errors occurred during multiple participants creation.                                               |
| [50430](www.twilio.com/docs/api/errors/50430) | ERROR Programmable Chat <br/> Participant is not a member of conversation                                         |
| [50431](www.twilio.com/docs/api/errors/50431) | ERROR Programmable Chat <br/> Participant SID not provided                                                        |
| [50432](www.twilio.com/docs/api/errors/50432) | ERROR Programmable Chat <br/> Participant not found                                                               |
| [50433](www.twilio.com/docs/api/errors/50433) | ERROR Programmable Chat <br/> Participant already exists                                                          |
| [50434](www.twilio.com/docs/api/errors/50434) | ERROR Programmable Chat <br/> Participant projected address not provided                                          |
| [50435](www.twilio.com/docs/api/errors/50435) | ERROR Programmable Chat <br/> Group MMS activation failed.                                                        |
| [50436](www.twilio.com/docs/api/errors/50436) | ERROR Programmable Chat <br/> Participant limit exceeded for group conversation                                   |
| [50437](www.twilio.com/docs/api/errors/50437) | ERROR Programmable Chat <br/> Group Participant already exists                                                    |
| [50438](www.twilio.com/docs/api/errors/50438) | ERROR Programmable Chat <br/> Group conversation with given participant list already exists                       |
| [50439](www.twilio.com/docs/api/errors/50439) | ERROR Programmable Chat <br/> Account is not authorized to use the projected address                              |
| [50440](www.twilio.com/docs/api/errors/50440) | ERROR Programmable Chat <br/> Failed to remove the proxy address of a participant.                                |
| [50441](www.twilio.com/docs/api/errors/50441) | ERROR Programmable Chat <br/> Failed to add a proxy address to a participant.                                     |
| [50442](www.twilio.com/docs/api/errors/50442) | ERROR Programmable Chat <br/> Failed to remove the projected address of a participant.                            |
| [50443](www.twilio.com/docs/api/errors/50443) | ERROR Programmable Chat <br/> Failed to add a projected address to a participant.                                 |
| [50444](www.twilio.com/docs/api/errors/50444) | ERROR Programmable Chat <br/> Failed to add an identity to a participant.                                         |
| [50449](www.twilio.com/docs/api/errors/50449) | ERROR Programmable Chat <br/> Conflicting channel modification                                                    |
| [50451](www.twilio.com/docs/api/errors/50451) | ERROR Programmable Chat <br/> Only one identifier allowed for lookup: use either Identity or Address              |
| [50452](www.twilio.com/docs/api/errors/50452) | ERROR  <br/> Group MMS is not enabled for this Account                                                            |
| [50453](www.twilio.com/docs/api/errors/50453) | ERROR  <br/> Proxy Address of participant is not supported for this channel                                       |
| [50500](www.twilio.com/docs/api/errors/50500) | ERROR Programmable Chat <br/> Programmable Chat: Message not found                                                |
| [50501](www.twilio.com/docs/api/errors/50501) | ERROR Programmable Chat <br/> Programmable Chat: Message SID not provided                                         |
| [50502](www.twilio.com/docs/api/errors/50502) | ERROR Programmable Chat <br/> Programmable Chat: Message index not provided                                       |
| [50503](www.twilio.com/docs/api/errors/50503) | ERROR Programmable Chat <br/> Programmable Chat: Message body not provided                                        |
| [50504](www.twilio.com/docs/api/errors/50504) | ERROR Programmable Chat <br/> Programmable Chat: Message body parameter is too long                               |
| [50505](www.twilio.com/docs/api/errors/50505) | ERROR Programmable Chat <br/> Programmable Chat: Last Updated By parameter is too long                            |
| [50506](www.twilio.com/docs/api/errors/50506) | ERROR Programmable Chat <br/> Programmable Chat: Media SID not provided                                           |
| [50507](www.twilio.com/docs/api/errors/50507) | ERROR Programmable Chat <br/> Programmable Chat: Media not found                                                  |
| [50508](www.twilio.com/docs/api/errors/50508) | ERROR Programmable Chat <br/> Programmable Chat: Media already sent with another message                          |
| [50509](www.twilio.com/docs/api/errors/50509) | ERROR Programmable Chat <br/> Programmable Chat: Media message body cannot be updated                             |
| [50510](www.twilio.com/docs/api/errors/50510) | ERROR Programmable Chat <br/> Invalid message media SID                                                           |
| [50511](www.twilio.com/docs/api/errors/50511) | ERROR Programmable Chat <br/> Invalid message media content type                                                  |
| [50512](www.twilio.com/docs/api/errors/50512) | ERROR Programmable Chat <br/> Message media size is too large                                                     |
| [50513](www.twilio.com/docs/api/errors/50513) | ERROR Programmable Chat <br/>  Message author should be among Group MMS participants.                             |
| [50514](www.twilio.com/docs/api/errors/50514) | ERROR  <br/> Conflicting message modification                                                                     |
| [50516](www.twilio.com/docs/api/errors/50516) | ERROR Programmable Chat <br/> Programmable Chat: Message index is not a number                                    |
| [50526](www.twilio.com/docs/api/errors/50526) | ERROR  <br/> Invalid content SID                                                                                  |
| [50527](www.twilio.com/docs/api/errors/50527) | ERROR  <br/> Invalid content variables format                                                                     |
| [50528](www.twilio.com/docs/api/errors/50528) | ERROR  <br/> Content SID is missing                                                                               |
| [50529](www.twilio.com/docs/api/errors/50529) | ERROR  <br/> Content variables are too long                                                                       |
| [50530](www.twilio.com/docs/api/errors/50530) | WARNING  <br/> Channel Metadata not found                                                                         |
| [50531](www.twilio.com/docs/api/errors/50531) | ERROR  <br/> Not Authorized to make this request                                                                  |
| [50532](www.twilio.com/docs/api/errors/50532) | ERROR  <br/> Failed to create Channel Metadata                                                                    |
| [50533](www.twilio.com/docs/api/errors/50533) | ERROR  <br/> Failed to parse ChannelMetadata Json                                                                 |
| [50534](www.twilio.com/docs/api/errors/50534) | ERROR  <br/> Failed to Read ChannelMetadata                                                                       |
| [50540](www.twilio.com/docs/api/errors/50540) | ERROR  <br/> Content variable key is too long                                                                     |
| [50541](www.twilio.com/docs/api/errors/50541) | ERROR  <br/> Content variable value is too long                                                                   |
| [50542](www.twilio.com/docs/api/errors/50542) | ERROR  <br/> Unsupported Content Template Type                                                                    |
| [50600](www.twilio.com/docs/api/errors/50600) | ERROR Programmable Chat <br/> Programmable Chat: Invite SID not provided                                          |
| [50601](www.twilio.com/docs/api/errors/50601) | ERROR Programmable Chat <br/> Programmable Chat: Invite not found                                                 |
| [50602](www.twilio.com/docs/api/errors/50602) | ERROR Programmable Chat <br/> Programmable Chat: Cannot decline invite when already channel member.               |
| [50610](www.twilio.com/docs/api/errors/50610) | WARNING Programmable Chat <br/> Address configuration deleted                                                     |
| [50611](www.twilio.com/docs/api/errors/50611) | WARNING Programmable Chat <br/> Address data cleaned up                                                           |
| [50700](www.twilio.com/docs/api/errors/50700) | ERROR  <br/> Virtual Agent provider is invalid.                                                                   |
| [50701](www.twilio.com/docs/api/errors/50701) | ERROR  <br/> Only one Virtual Agent participant is allowed per conversation.                                      |
| [50702](www.twilio.com/docs/api/errors/50702) | ERROR  <br/> Verify Agent participant must not have identity or address fields                                    |
| [50703](www.twilio.com/docs/api/errors/50703) | ERROR  <br/> DialogflowCX provider must contain module sid and addon sid.                                         |
| [50704](www.twilio.com/docs/api/errors/50704) | ERROR  <br/> Provided addon sid should have prefix XB.                                                            |
| [50705](www.twilio.com/docs/api/errors/50705) | ERROR  <br/> Provided module sid should have prefix XE.                                                           |
| [50706](www.twilio.com/docs/api/errors/50706) | ERROR  <br/> Updating Virtual Agent participant information is not allowed.                                       |
| [50707](www.twilio.com/docs/api/errors/50707) | ERROR  <br/> Virtual Agent participant creation is not available for your account.                                |
| [50708](www.twilio.com/docs/api/errors/50708) | ERROR  <br/> ChatbotConfiguration.FriendlyName is required parameter.                                             |
| [50709](www.twilio.com/docs/api/errors/50709) | ERROR  <br/> ChatbotConfiguration.FriendlyName is invalid.                                                        |
| [50710](www.twilio.com/docs/api/errors/50710) | ERROR  <br/> ChatbotConfiguration.InitialContext is invalid.                                                      |
| [50711](www.twilio.com/docs/api/errors/50711) | ERROR  <br/> ChatbotConfiguration.FriendlyName is reserved.                                                       |
| [50731](www.twilio.com/docs/api/errors/50731) | ERROR  <br/> Conversation Export failed                                                                           |
| [50732](www.twilio.com/docs/api/errors/50732) | ERROR  <br/> Transcript creation failed                                                                           |
| [51001](www.twilio.com/docs/api/errors/51001) | ERROR  <br/> Client Connection: Connections resource limit exceeded                                               |
| [51002](www.twilio.com/docs/api/errors/51002) | ERROR  <br/> Client Connection: Request rate limit exceeded                                                       |
| [51003](www.twilio.com/docs/api/errors/51003) | ERROR  <br/> Client Connection: identity too long                                                                 |
| [51004](www.twilio.com/docs/api/errors/51004) | ERROR  <br/> Client Connection: endpoint\_id too long                                                             |
| [51005](www.twilio.com/docs/api/errors/51005) | ERROR  <br/> Client Connection: Command or keepalive acknowledgement not received                                 |
| [51006](www.twilio.com/docs/api/errors/51006) | ERROR  <br/> Client Connection: Connection expired                                                                |
| [51007](www.twilio.com/docs/api/errors/51007) | ERROR  <br/> Client Connection: Token authentication is rejected                                                  |
| [51101](www.twilio.com/docs/api/errors/51101) | ERROR  <br/> Twilsock: Service instance not found                                                                 |
| [51102](www.twilio.com/docs/api/errors/51102) | ERROR  <br/> Twilsock: Service instance SID not specified                                                         |
| [51103](www.twilio.com/docs/api/errors/51103) | ERROR  <br/> Twilsock: Token doesn't contain required grants section                                              |
| [51104](www.twilio.com/docs/api/errors/51104) | ERROR  <br/> Twilsock: Token doesn't contain service instance                                                     |
| [51105](www.twilio.com/docs/api/errors/51105) | ERROR  <br/> Twilsock: Token doesn't contain identity                                                             |
| [51106](www.twilio.com/docs/api/errors/51106) | ERROR  <br/> Twilsock: Active product doesn't match with service instance product                                 |
| [51107](www.twilio.com/docs/api/errors/51107) | ERROR  <br/> Twilsock: Service can't be used                                                                      |
| [51108](www.twilio.com/docs/api/errors/51108) | ERROR  <br/> Twilsock: Service instance disabled                                                                  |
| [51109](www.twilio.com/docs/api/errors/51109) | ERROR  <br/> Twilsock: Service instance is under legal hold                                                       |
| [51110](www.twilio.com/docs/api/errors/51110) | ERROR  <br/> Twilsock: Token contains multiple grants of same product                                             |
| [51111](www.twilio.com/docs/api/errors/51111) | ERROR  <br/> Twilsock: Service instance limit reached                                                             |
| [51112](www.twilio.com/docs/api/errors/51112) | ERROR  <br/> Twilsock: Product usage disabled                                                                     |
| [51113](www.twilio.com/docs/api/errors/51113) | ERROR  <br/> Twilsock: Product usage is not enabled                                                               |
| [51114](www.twilio.com/docs/api/errors/51114) | ERROR  <br/> Twilsock: Invalid access token header                                                                |
| [51115](www.twilio.com/docs/api/errors/51115) | ERROR  <br/> Twilsock: Invalid access token subject                                                               |
| [51116](www.twilio.com/docs/api/errors/51116) | ERROR  <br/> Twilsock: Invalid access token grants                                                                |
| [51117](www.twilio.com/docs/api/errors/51117) | ERROR  <br/> Twilsock: Invalid access token signature                                                             |
| [51118](www.twilio.com/docs/api/errors/51118) | ERROR  <br/> Twilsock: Invalid claim set                                                                          |
| [51119](www.twilio.com/docs/api/errors/51119) | ERROR  <br/> Twilsock: Token expired                                                                              |
| [51120](www.twilio.com/docs/api/errors/51120) | ERROR  <br/> Twilsock: Token is not valid yet                                                                     |
| [51121](www.twilio.com/docs/api/errors/51121) | ERROR  <br/> Twilsock: Token expiration time exceeds maximum                                                      |
| [51122](www.twilio.com/docs/api/errors/51122) | ERROR  <br/> Twilsock: Authentication failed                                                                      |
| [51123](www.twilio.com/docs/api/errors/51123) | ERROR  <br/> Twilsock: Upstream not resolved                                                                      |
| [51124](www.twilio.com/docs/api/errors/51124) | ERROR  <br/> Twilsock: Too many connections                                                                       |
| [51125](www.twilio.com/docs/api/errors/51125) | ERROR  <br/> Twilsock: Too many updates                                                                           |
| [51126](www.twilio.com/docs/api/errors/51126) | ERROR  <br/> Twilsock: DNC limit has been reached                                                                 |
| [51127](www.twilio.com/docs/api/errors/51127) | ERROR  <br/> Twilsock: PNC limit has been                                                                         |
| [51128](www.twilio.com/docs/api/errors/51128) | ERROR  <br/> Twilsock: Too many messages per connection                                                           |
| [51129](www.twilio.com/docs/api/errors/51129) | ERROR  <br/> Twilsock: Too many messages per account                                                              |
| [51130](www.twilio.com/docs/api/errors/51130) | ERROR  <br/> Twilsock: Token is invalid!                                                                          |
| [51131](www.twilio.com/docs/api/errors/51131) | ERROR  <br/> Twilsock: Authentication failed                                                                      |
| [51201](www.twilio.com/docs/api/errors/51201) | ERROR Connect <br/> Twilsock : CPS, Init per Account                                                              |
| [51202](www.twilio.com/docs/api/errors/51202) | ERROR  <br/> Twilsock : CPS, Too many requests                                                                    |
| [51215](www.twilio.com/docs/api/errors/51215) | ERROR  <br/> Twilsock: Unauthorized                                                                               |
| [52000](www.twilio.com/docs/api/errors/52000) | ERROR  <br/> Internal notification error                                                                          |
| [52001](www.twilio.com/docs/api/errors/52001) | ERROR  <br/> Invalid destination binding                                                                          |
| [52002](www.twilio.com/docs/api/errors/52002) | ERROR  <br/> Invalid Credential Sid                                                                               |
| [52003](www.twilio.com/docs/api/errors/52003) | ERROR  <br/> Invalid Credential Type                                                                              |
| [52004](www.twilio.com/docs/api/errors/52004) | ERROR  <br/> Credential SID not specified                                                                         |
| [52051](www.twilio.com/docs/api/errors/52051) | ERROR  <br/> Internal error when sending notification via client connection                                       |
| [52052](www.twilio.com/docs/api/errors/52052) | WARNING  <br/> Client connection not created or closed                                                            |
| [52071](www.twilio.com/docs/api/errors/52071) | ERROR  <br/> Internal error when sending notification via mqtt client connection                                  |
| [52072](www.twilio.com/docs/api/errors/52072) | WARNING  <br/> Client mqtt connection not created or closed                                                       |
| [52101](www.twilio.com/docs/api/errors/52101) | ERROR  <br/> Invalid GCM Api Key or FCM Secret                                                                    |
| [52102](www.twilio.com/docs/api/errors/52102) | ERROR  <br/> Invalid GCM/FCM registration token                                                                   |
| [52103](www.twilio.com/docs/api/errors/52103) | ERROR  <br/> GCM/FCM client uninstalled or turned off notifications                                               |
| [52104](www.twilio.com/docs/api/errors/52104) | ERROR  <br/> Mismatched GCM/FCM sender ID                                                                         |
| [52105](www.twilio.com/docs/api/errors/52105) | ERROR  <br/> Invalid GCM/FCM package name                                                                         |
| [52106](www.twilio.com/docs/api/errors/52106) | ERROR  <br/> Notification too large for GCM/FCM                                                                   |
| [52107](www.twilio.com/docs/api/errors/52107) | ERROR  <br/> Invalid custom key for GCM/FCM                                                                       |
| [52108](www.twilio.com/docs/api/errors/52108) | ERROR  <br/> GCM/FCM device message rate exceeded                                                                 |
| [52109](www.twilio.com/docs/api/errors/52109) | ERROR  <br/> GCM/FCM unauthorized error                                                                           |
| [52110](www.twilio.com/docs/api/errors/52110) | ERROR  <br/> GCM/FCM service unavailable                                                                          |
| [52111](www.twilio.com/docs/api/errors/52111) | ERROR  <br/> GCM/FCM unknown error                                                                                |
| [52115](www.twilio.com/docs/api/errors/52115) | ERROR Notify <br/> Service account does not have permission to send FCM messages                                  |
| [52116](www.twilio.com/docs/api/errors/52116) | WARNING  <br/> Legacy FCM server key credential used to send notifications                                        |
| [52117](www.twilio.com/docs/api/errors/52117) | ERROR Notify <br/> Deprecated GCM/FCM API is used to send notifications                                           |
| [52118](www.twilio.com/docs/api/errors/52118) | ERROR Notify <br/> FCM Bad Request                                                                                |
| [52131](www.twilio.com/docs/api/errors/52131) | ERROR  <br/> Invalid APNs credentials                                                                             |
| [52133](www.twilio.com/docs/api/errors/52133) | ERROR  <br/> Invalid APNs device token size                                                                       |
| [52134](www.twilio.com/docs/api/errors/52134) | ERROR  <br/> Invalid APNs device token                                                                            |
| [52135](www.twilio.com/docs/api/errors/52135) | ERROR  <br/> Missing subject in APNs certificate                                                                  |
| [52136](www.twilio.com/docs/api/errors/52136) | ERROR  <br/> Missing payload for APNs delivery                                                                    |
| [52137](www.twilio.com/docs/api/errors/52137) | ERROR  <br/> Invalid size of subject in APNs certificate                                                          |
| [52138](www.twilio.com/docs/api/errors/52138) | ERROR  <br/> APNs payload too large                                                                               |
| [52139](www.twilio.com/docs/api/errors/52139) | ERROR  <br/> APN service shutdown                                                                                 |
| [52140](www.twilio.com/docs/api/errors/52140) | ERROR  <br/> Unknown APNs error                                                                                   |
| [52141](www.twilio.com/docs/api/errors/52141) | ERROR  <br/> The provided APNs device token has been unregistered                                                 |
| [52142](www.twilio.com/docs/api/errors/52142) | ERROR  <br/> The provided APNs device token is not correct                                                        |
| [52143](www.twilio.com/docs/api/errors/52143) | ERROR Programmable Voice, Verify <br/> The push notification was rejected by APNs                                 |
| [52144](www.twilio.com/docs/api/errors/52144) | ERROR  <br/> APNs experienced an internal error                                                                   |
| [52145](www.twilio.com/docs/api/errors/52145) | ERROR  <br/> Failed to authenticate with APNs                                                                     |
| [52147](www.twilio.com/docs/api/errors/52147) | WARNING  <br/> Too many APNs provider token updates                                                               |
| [52148](www.twilio.com/docs/api/errors/52148) | ERROR  <br/> Expired APNs provider token used                                                                     |
| [52149](www.twilio.com/docs/api/errors/52149) | ERROR  <br/> Invalid APNs provider token used                                                                     |
| [52161](www.twilio.com/docs/api/errors/52161) | ERROR  <br/> Empty Credentials                                                                                    |
| [52162](www.twilio.com/docs/api/errors/52162) | ERROR  <br/> Credentials do not belong to used account                                                            |
| [52163](www.twilio.com/docs/api/errors/52163) | ERROR  <br/> Incorrect URL used to retrieve Webhook Credentials                                                   |
| [52164](www.twilio.com/docs/api/errors/52164) | ERROR  <br/> No Credentials found for the supplied Binding Type                                                   |
| [52165](www.twilio.com/docs/api/errors/52165) | ERROR  <br/> No Credentials found for the supplied Identifier                                                     |
| [52166](www.twilio.com/docs/api/errors/52166) | ERROR  <br/> Webhook Credentials endpoint responded with Internal Error                                           |
| [52167](www.twilio.com/docs/api/errors/52167) | ERROR  <br/> Invalid Webhook Credentials response                                                                 |
| [52168](www.twilio.com/docs/api/errors/52168) | ERROR  <br/> Webhook Credentials request timed out                                                                |
| [52170](www.twilio.com/docs/api/errors/52170) | ERROR  <br/> Too many Webhook Credential requests                                                                 |
| [52171](www.twilio.com/docs/api/errors/52171) | ERROR  <br/> Webhook Credentials request signature was not verified                                               |
| [52172](www.twilio.com/docs/api/errors/52172) | WARNING  <br/> Unexpected Binding Type used for Webhook Credentials request                                       |
| [52173](www.twilio.com/docs/api/errors/52173) | WARNING  <br/> Unexpected Identifier used for Webhook Credentials request                                         |
| [52174](www.twilio.com/docs/api/errors/52174) | WARNING  <br/> Unexpected error response received for Webhook Credentials request                                 |
| [52181](www.twilio.com/docs/api/errors/52181) | ERROR  <br/> Too many SMS notification requests                                                                   |
| [52182](www.twilio.com/docs/api/errors/52182) | ERROR  <br/> Messaging Service not specified                                                                      |
| [52201](www.twilio.com/docs/api/errors/52201) | ERROR  <br/> Too many Facebook messenger notification requests                                                    |
| [52202](www.twilio.com/docs/api/errors/52202) | ERROR  <br/> Facebook page is not connected to Twilio                                                             |
| [52203](www.twilio.com/docs/api/errors/52203) | ERROR  <br/> Missing body for Facebook Messenger delivery attempt                                                 |
| [52211](www.twilio.com/docs/api/errors/52211) | ERROR  <br/> Too many Alexa notifications                                                                         |
| [52212](www.twilio.com/docs/api/errors/52212) | ERROR  <br/> Missing Alexa skill ID                                                                               |
| [52213](www.twilio.com/docs/api/errors/52213) | ERROR  <br/> Invalid Alexa user ID                                                                                |
| [52214](www.twilio.com/docs/api/errors/52214) | ERROR  <br/> Alexa skill is not connected to Twilio                                                               |
| [52215](www.twilio.com/docs/api/errors/52215) | ERROR  <br/> Missing Title parameter for Alexa                                                                    |
| [52301](www.twilio.com/docs/api/errors/52301) | WARNING  <br/> Resulted destination list for requested parameters is empty                                        |
| [52302](www.twilio.com/docs/api/errors/52302) | ERROR  <br/> Too many recipients                                                                                  |
| [52303](www.twilio.com/docs/api/errors/52303) | WARNING  <br/> Concurrent User update                                                                             |
| [52304](www.twilio.com/docs/api/errors/52304) | WARNING  <br/> User already exists                                                                                |
| [52305](www.twilio.com/docs/api/errors/52305) | WARNING  <br/> User already belongs to the segment                                                                |
| [52306](www.twilio.com/docs/api/errors/52306) | ERROR  <br/> Cannot delete User resource with Bindings                                                            |
| [52307](www.twilio.com/docs/api/errors/52307) | WARNING  <br/> No users with provided segments                                                                    |
| [52309](www.twilio.com/docs/api/errors/52309) | ERROR  <br/> Channel provider replied with an error                                                               |
| [52310](www.twilio.com/docs/api/errors/52310) | ERROR Notify <br/> Notification TTL has expired                                                                   |
| [52311](www.twilio.com/docs/api/errors/52311) | ERROR Notify <br/> Delivery callback invocation failed                                                            |
| [52400](www.twilio.com/docs/api/errors/52400) | ERROR Notify <br/> Exceeded maximum iterations in template rendering                                              |
| [52401](www.twilio.com/docs/api/errors/52401) | WARNING  <br/> Too many notification log events                                                                   |
| [52402](www.twilio.com/docs/api/errors/52402) | ERROR Notify <br/> General rendering problem with variables in a parsed template                                  |
| [52403](www.twilio.com/docs/api/errors/52403) | ERROR Notify <br/> Provided text template in the notification request cannot be parsed                            |
| [52404](www.twilio.com/docs/api/errors/52404) | ERROR Notify <br/> Undefined variable within the notification payload template                                    |
| [53000](www.twilio.com/docs/api/errors/53000) | ERROR Programmable Video <br/> Signaling connection error                                                         |
| [53001](www.twilio.com/docs/api/errors/53001) | ERROR Programmable Video <br/> Signaling connection disconnected                                                  |
| [53002](www.twilio.com/docs/api/errors/53002) | ERROR Programmable Video <br/> Signaling connection timed out                                                     |
| [53003](www.twilio.com/docs/api/errors/53003) | ERROR Programmable Video <br/> Client received an invalid signaling message                                       |
| [53004](www.twilio.com/docs/api/errors/53004) | ERROR Programmable Video <br/> Client sent an invalid signaling message                                           |
| [53006](www.twilio.com/docs/api/errors/53006) | ERROR Programmable Video <br/> Video server is busy                                                               |
| [53100](www.twilio.com/docs/api/errors/53100) | ERROR Programmable Video <br/> Room name is invalid                                                               |
| [53101](www.twilio.com/docs/api/errors/53101) | ERROR Programmable Video <br/> Room name is too long                                                              |
| [53102](www.twilio.com/docs/api/errors/53102) | ERROR Programmable Video <br/> Room name contains invalid characters                                              |
| [53103](www.twilio.com/docs/api/errors/53103) | ERROR Programmable Video <br/>  Unable to create Room                                                             |
| [53104](www.twilio.com/docs/api/errors/53104) | ERROR Programmable Video <br/> Unable to connect to Room                                                          |
| [53105](www.twilio.com/docs/api/errors/53105) | ERROR Programmable Video <br/> Room contains too many Participants                                                |
| [53106](www.twilio.com/docs/api/errors/53106) | ERROR Programmable Video <br/> Room not found                                                                     |
| [53107](www.twilio.com/docs/api/errors/53107) | ERROR Programmable Video <br/> MaxParticipants is out of range                                                    |
| [53108](www.twilio.com/docs/api/errors/53108) | ERROR Programmable Video <br/> RoomType is not valid                                                              |
| [53109](www.twilio.com/docs/api/errors/53109) | ERROR Programmable Video <br/> Timeout is out of range                                                            |
| [53110](www.twilio.com/docs/api/errors/53110) | ERROR Programmable Video <br/> StatusCallbackMethod is invalid                                                    |
| [53111](www.twilio.com/docs/api/errors/53111) | ERROR Programmable Video <br/> StatusCallback is invalid                                                          |
| [53112](www.twilio.com/docs/api/errors/53112) | ERROR Programmable Video <br/> Status is invalid                                                                  |
| [53113](www.twilio.com/docs/api/errors/53113) | ERROR Programmable Video <br/> Room creation failed                                                               |
| [53118](www.twilio.com/docs/api/errors/53118) | ERROR Programmable Video <br/> Room Completed Error                                                               |
| [53119](www.twilio.com/docs/api/errors/53119) | ERROR Programmable Video <br/> The concurrent Rooms quota was exceeded                                            |
| [53120](www.twilio.com/docs/api/errors/53120) | ERROR Programmable Video <br/>  Invalid Recording Rule(s)                                                         |
| [53121](www.twilio.com/docs/api/errors/53121) | WARNING Programmable Video <br/> Approaching room or participant concurrency quota                                |
| [53122](www.twilio.com/docs/api/errors/53122) | ERROR Programmable Video <br/> The recording operation requested is not supported for the Room type               |
| [53123](www.twilio.com/docs/api/errors/53123) | ERROR Programmable Video <br/> MaxParticipantDuration is out of range                                             |
| [53124](www.twilio.com/docs/api/errors/53124) | ERROR Programmable Video <br/> The AudioOnly flag is not supported for the Room type                              |
| [53125](www.twilio.com/docs/api/errors/53125) | ERROR Programmable Video <br/> The track kind is not supported by the Room                                        |
| [53126](www.twilio.com/docs/api/errors/53126) | ERROR Programmable Video <br/> Legacy room type no longer supported                                               |
| [53127](www.twilio.com/docs/api/errors/53127) | ERROR Programmable Video <br/> audioOnly no longer supported                                                      |
| [53200](www.twilio.com/docs/api/errors/53200) | ERROR Programmable Video <br/> Participant identity is invalid                                                    |
| [53201](www.twilio.com/docs/api/errors/53201) | ERROR Programmable Video <br/> Participant identity is too long                                                   |
| [53202](www.twilio.com/docs/api/errors/53202) | ERROR Programmable Video <br/> Participant identity contains invalid characters                                   |
| [53203](www.twilio.com/docs/api/errors/53203) | ERROR Programmable Video <br/> Room has reached the maximum number of published tracks                            |
| [53204](www.twilio.com/docs/api/errors/53204) | ERROR Programmable Video <br/> Participant not found                                                              |
| [53205](www.twilio.com/docs/api/errors/53205) | ERROR Programmable Video <br/> Participant disconnected because of duplicate identity                             |
| [53206](www.twilio.com/docs/api/errors/53206) | ERROR Programmable Video <br/> The Participant concurrency quota was exceeded                                     |
| [53207](www.twilio.com/docs/api/errors/53207) | ERROR Programmable Video <br/> MaxPublishedTracks is out of range                                                 |
| [53208](www.twilio.com/docs/api/errors/53208) | ERROR Programmable Video <br/> Participant's bandwidth profile configuration is invalid                           |
| [53209](www.twilio.com/docs/api/errors/53209) | ERROR Programmable Video <br/> Participant status is invalid                                                      |
| [53215](www.twilio.com/docs/api/errors/53215) | ERROR Programmable Video <br/> Invalid Subscribe Rule(s)                                                          |
| [53216](www.twilio.com/docs/api/errors/53216) | ERROR Programmable Video <br/> Participant session length exceeded                                                |
| [53217](www.twilio.com/docs/api/errors/53217) | ERROR Programmable Video <br/> maxAudioTracks or maxVideoTracks configuration is out of range                     |
| [53300](www.twilio.com/docs/api/errors/53300) | ERROR Programmable Video <br/> Track is invalid                                                                   |
| [53301](www.twilio.com/docs/api/errors/53301) | ERROR Programmable Video <br/> Track name is invalid                                                              |
| [53302](www.twilio.com/docs/api/errors/53302) | ERROR Programmable Video <br/> Track name is too long                                                             |
| [53303](www.twilio.com/docs/api/errors/53303) | ERROR Programmable Video <br/> Track name contains invalid characters                                             |
| [53304](www.twilio.com/docs/api/errors/53304) | ERROR Programmable Video <br/> Track name is duplicated                                                           |
| [53400](www.twilio.com/docs/api/errors/53400) | ERROR Programmable Video <br/> Client is unable to create or apply a local media description                      |
| [53401](www.twilio.com/docs/api/errors/53401) | ERROR Programmable Voice <br/> Server is unable to create or apply a local media description                      |
| [53402](www.twilio.com/docs/api/errors/53402) | ERROR Programmable Video <br/> Client is unable to apply a remote media description                               |
| [53403](www.twilio.com/docs/api/errors/53403) | ERROR Programmable Video <br/> Server is unable to apply a remote media description                               |
| [53404](www.twilio.com/docs/api/errors/53404) | ERROR Programmable Voice <br/> No supported codec                                                                 |
| [53405](www.twilio.com/docs/api/errors/53405) | ERROR Programmable Video <br/> Media connection failed or Media activity ceased                                   |
| [53406](www.twilio.com/docs/api/errors/53406) | ERROR Programmable Video <br/> The data channel used by the Data Track had a problem                              |
| [53407](www.twilio.com/docs/api/errors/53407) | ERROR Programmable Video <br/> Media connection failed due to DTLS handshake failure                              |
| [53408](www.twilio.com/docs/api/errors/53408) | ERROR Programmable Video <br/> ICE connection restart was attempted, but it is not allowed                        |
| [53500](www.twilio.com/docs/api/errors/53500) | ERROR Programmable Video <br/> Unable to acquire configuration                                                    |
| [53501](www.twilio.com/docs/api/errors/53501) | ERROR Programmable Video <br/> Unable to acquire TURN credentials                                                 |
| [53600](www.twilio.com/docs/api/errors/53600) | ERROR Programmable Video <br/> S3 URL for recording upload is invalid                                             |
| [53601](www.twilio.com/docs/api/errors/53601) | ERROR Programmable Video <br/> AWS credentials for recording upload are invalid                                   |
| [53602](www.twilio.com/docs/api/errors/53602) | ERROR Programmable Video <br/> AWS encryption key for recording upload is invalid                                 |
| [53603](www.twilio.com/docs/api/errors/53603) | ERROR Programmable Video <br/> Internal failure while processing a recording                                      |
| [53604](www.twilio.com/docs/api/errors/53604) | WARNING Programmable Video <br/> Failed to upload the recording to S3                                             |
| [53605](www.twilio.com/docs/api/errors/53605) | WARNING Programmable Video <br/> Internal failure when retrieving your account's recording settings               |
| [53606](www.twilio.com/docs/api/errors/53606) | WARNING Programmable Video <br/> Internal failure when creating the recording resource                            |
| [53607](www.twilio.com/docs/api/errors/53607) | WARNING Programmable Video <br/> Internal failure when updating the recording resource                            |
| [53610](www.twilio.com/docs/api/errors/53610) | WARNING Programmable Video <br/> Invalid URL for external S3 bucket in recording settings                         |
| [53611](www.twilio.com/docs/api/errors/53611) | WARNING Programmable Video <br/> Invalid AWS credentials to access external S3 bucket in recording settings       |
| [53612](www.twilio.com/docs/api/errors/53612) | WARNING Programmable Video <br/> Invalid public key for media tracks encryption in recording settings             |
| [53613](www.twilio.com/docs/api/errors/53613) | WARNING Programmable Video <br/> AWS credentials to access external S3 bucket could not be loaded                 |
| [53614](www.twilio.com/docs/api/errors/53614) | WARNING Programmable Video <br/> Public key credentials for media tracks encryption could not be loaded           |
| [53615](www.twilio.com/docs/api/errors/53615) | WARNING Programmable Video <br/> Access denied to external S3 bucket configured in recording settings             |
| [53616](www.twilio.com/docs/api/errors/53616) | WARNING Programmable Video <br/> Deleted a recording with custom configuration as time for retries was depleted   |
| [53617](www.twilio.com/docs/api/errors/53617) | ERROR Programmable Video <br/> Internal failure when bulk deleting compositions from your account                 |
| [53620](www.twilio.com/docs/api/errors/53620) | WARNING Programmable Video <br/> Invalid URL for external S3 bucket in composition settings                       |
| [53621](www.twilio.com/docs/api/errors/53621) | WARNING Programmable Video <br/> Invalid AWS credentials to access external S3 bucket in composition settings     |
| [53622](www.twilio.com/docs/api/errors/53622) | WARNING Programmable Video <br/> Invalid public key for media tracks encryption in composition settings           |
| [53623](www.twilio.com/docs/api/errors/53623) | WARNING Programmable Video <br/> AWS credentials to access external S3 bucket could not be loaded                 |
| [53624](www.twilio.com/docs/api/errors/53624) | WARNING Programmable Video <br/> Public key credentials for media tracks encryption could not be loaded           |
| [53625](www.twilio.com/docs/api/errors/53625) | WARNING Programmable Video <br/> Access denied to external S3 bucket configured in composition settings           |
| [53626](www.twilio.com/docs/api/errors/53626) | ERROR Programmable Video <br/> Internal failure while processing media composition                                |
| [53627](www.twilio.com/docs/api/errors/53627) | ERROR Programmable Video <br/> Internal failure when updating the composition resource                            |
| [53628](www.twilio.com/docs/api/errors/53628) | ERROR Programmable Video <br/> Room recordings deleted                                                            |
| [53630](www.twilio.com/docs/api/errors/53630) | ERROR Programmable Video <br/> Empty track list for composition                                                   |
| [53631](www.twilio.com/docs/api/errors/53631) | WARNING Programmable Video <br/> Failed to enqueue a room composition from a configured composition hook          |
| [53632](www.twilio.com/docs/api/errors/53632) | WARNING Programmable Video <br/> Failed to enqueue a room composition                                             |
| [53633](www.twilio.com/docs/api/errors/53633) | ERROR Programmable Video <br/> Composition is too large                                                           |
| [53660](www.twilio.com/docs/api/errors/53660) | WARNING Programmable Video <br/> Status Callback response timed out                                               |
| [53661](www.twilio.com/docs/api/errors/53661) | WARNING Programmable Video <br/> StatusCallbackMethod is invalid                                                  |
| [53662](www.twilio.com/docs/api/errors/53662) | WARNING Programmable Video <br/> StatusCallback is invalid                                                        |
| [53663](www.twilio.com/docs/api/errors/53663) | ERROR Programmable Video <br/> Internal failure when bulk deleting recordings from your account                   |
| [53664](www.twilio.com/docs/api/errors/53664) | ERROR Programmable Video <br/> Invalid URL for external S3 bucket in composition settings                         |
| [53665](www.twilio.com/docs/api/errors/53665) | ERROR Programmable Video <br/> Invalid AWS credentials to access external S3 bucket in composition settings       |
| [53666](www.twilio.com/docs/api/errors/53666) | ERROR Programmable Video <br/> Invalid public key for media tracks encryption in composition settings             |
| [53667](www.twilio.com/docs/api/errors/53667) | ERROR Programmable Video <br/> AWS credentials to access external S3 bucket could not be loaded                   |
| [53668](www.twilio.com/docs/api/errors/53668) | ERROR Programmable Video <br/> Public key credentials for media tracks encryption could not be loaded             |
| [53669](www.twilio.com/docs/api/errors/53669) | ERROR Programmable Video <br/> Access denied to external S3 bucket configured in composition settings             |
| [53670](www.twilio.com/docs/api/errors/53670) | ERROR Programmable Video <br/> Video Room Realtime Transcriptions: Configuration Error                            |
| [53671](www.twilio.com/docs/api/errors/53671) | ERROR Programmable Video <br/> Video Room Realtime Transcriptions: Provider Error                                 |
| [53672](www.twilio.com/docs/api/errors/53672) | ERROR Programmable Video <br/> Video Room Transcriptions: Unsupported attribute(s) in TranscriptionsConfiguration |
| [53673](www.twilio.com/docs/api/errors/53673) | ERROR Programmable Video <br/> Video Room Realtime Transcriptions: Internal Error                                 |
| [53674](www.twilio.com/docs/api/errors/53674) | WARNING Programmable Video <br/> Video Room Realtime Transcriptions: Intelligence Service Error                   |
| [53675](www.twilio.com/docs/api/errors/53675) | WARNING Programmable Video <br/> Video Room Realtime Transcriptions: Approaching transcription concurrency quota  |
| [53676](www.twilio.com/docs/api/errors/53676) | ERROR Programmable Video <br/> Video Room Realtime Transcriptions: Transcription concurrency quota exceeded       |
| [54003](www.twilio.com/docs/api/errors/54003) | ERROR Sync <br/> Invalid If-Match header                                                                          |
| [54006](www.twilio.com/docs/api/errors/54006) | ERROR Sync <br/> Request entity too large                                                                         |
| [54007](www.twilio.com/docs/api/errors/54007) | ERROR Sync <br/> Access forbidden for identity                                                                    |
| [54008](www.twilio.com/docs/api/errors/54008) | ERROR Sync <br/> Invalid JSON                                                                                     |
| [54009](www.twilio.com/docs/api/errors/54009) | ERROR Sync <br/> Rate limit exceeded                                                                              |
| [54010](www.twilio.com/docs/api/errors/54010) | ERROR Sync <br/> No parameters specified                                                                          |
| [54011](www.twilio.com/docs/api/errors/54011) | ERROR Sync <br/> Invalid TTL                                                                                      |
| [54050](www.twilio.com/docs/api/errors/54050) | ERROR Sync <br/> Service Instance not found                                                                       |
| [54051](www.twilio.com/docs/api/errors/54051) | ERROR Sync <br/> Invalid webhook URL                                                                              |
| [54053](www.twilio.com/docs/api/errors/54053) | ERROR Sync <br/> Invalid friendly name                                                                            |
| [54056](www.twilio.com/docs/api/errors/54056) | ERROR Sync <br/> Account cannot access requested Service Instance                                                 |
| [54100](www.twilio.com/docs/api/errors/54100) | ERROR Sync <br/> Document not found                                                                               |
| [54101](www.twilio.com/docs/api/errors/54101) | ERROR Sync <br/> Invalid Document data                                                                            |
| [54103](www.twilio.com/docs/api/errors/54103) | ERROR Sync <br/> Document revision mismatch                                                                       |
| [54150](www.twilio.com/docs/api/errors/54150) | ERROR Sync <br/> List not found                                                                                   |
| [54151](www.twilio.com/docs/api/errors/54151) | ERROR Sync <br/> List Item not found                                                                              |
| [54155](www.twilio.com/docs/api/errors/54155) | ERROR Sync <br/> List Item revision mismatch                                                                      |
| [54156](www.twilio.com/docs/api/errors/54156) | ERROR Sync <br/> Invalid List Item data                                                                           |
| [54200](www.twilio.com/docs/api/errors/54200) | ERROR Sync <br/> Map not found                                                                                    |
| [54201](www.twilio.com/docs/api/errors/54201) | ERROR Sync <br/> Map Item not found                                                                               |
| [54205](www.twilio.com/docs/api/errors/54205) | ERROR Sync <br/> Map Item revision mismatch                                                                       |
| [54206](www.twilio.com/docs/api/errors/54206) | ERROR Sync <br/> Invalid Map Item data                                                                            |
| [54208](www.twilio.com/docs/api/errors/54208) | ERROR Sync <br/> Map Item already exists                                                                          |
| [54209](www.twilio.com/docs/api/errors/54209) | ERROR Sync <br/> Invalid Map Item key                                                                             |
| [54250](www.twilio.com/docs/api/errors/54250) | ERROR Sync <br/> Message Stream not found                                                                         |
| [54251](www.twilio.com/docs/api/errors/54251) | ERROR Sync <br/> Invalid Message Stream Message data                                                              |
| [54300](www.twilio.com/docs/api/errors/54300) | ERROR Sync <br/> Unique name not found                                                                            |
| [54301](www.twilio.com/docs/api/errors/54301) | ERROR Sync <br/> Unique name already exists                                                                       |
| [54302](www.twilio.com/docs/api/errors/54302) | ERROR Sync <br/> Invalid unique name                                                                              |
| [54351](www.twilio.com/docs/api/errors/54351) | ERROR Sync <br/> Invalid identity                                                                                 |
| [54354](www.twilio.com/docs/api/errors/54354) | ERROR Sync <br/> Permission not found                                                                             |
| [54419](www.twilio.com/docs/api/errors/54419) | ERROR Sync <br/> Number of subscriptions per connection is over the limit                                         |
| [54450](www.twilio.com/docs/api/errors/54450) | ERROR Sync <br/> Invalid 'Direction' query parameter                                                              |
| [54451](www.twilio.com/docs/api/errors/54451) | ERROR Sync <br/> Invalid 'Order' query parameter                                                                  |
| [54452](www.twilio.com/docs/api/errors/54452) | ERROR Sync <br/> Invalid 'Bounds' query parameter                                                                 |
| [54453](www.twilio.com/docs/api/errors/54453) | ERROR Sync <br/> Invalid 'PageToken' query parameter                                                              |
| [54454](www.twilio.com/docs/api/errors/54454) | ERROR Sync <br/> Sync: Invalid 'PageSize' query parameter                                                         |
| [54458](www.twilio.com/docs/api/errors/54458) | ERROR Sync <br/> Invalid List Item index                                                                          |
| [54502](www.twilio.com/docs/api/errors/54502) | ERROR Sync <br/> Invalid index name                                                                               |
| [54507](www.twilio.com/docs/api/errors/54507) | ERROR Sync <br/> Invalid query                                                                                    |
| [54509](www.twilio.com/docs/api/errors/54509) | ERROR Sync <br/> Query expression contains too many operators                                                     |
| [54510](www.twilio.com/docs/api/errors/54510) | ERROR Sync <br/> Query expression contains an array with too many items                                           |
| [55555](www.twilio.com/docs/api/errors/55555) | ERROR TaskRouter <br/> Invalid Instruction passed to TaskRouter                                                   |
| [57001](www.twilio.com/docs/api/errors/57001) | ERROR Branded Comms <br/> 'Secret id' is empty                                                                    |
| [57002](www.twilio.com/docs/api/errors/57002) | ERROR Branded Comms <br/> 'Secret id' is too long                                                                 |
| [57003](www.twilio.com/docs/api/errors/57003) | ERROR Branded Comms <br/> 'Secret id' is invalid for this Partner                                                 |
| [57004](www.twilio.com/docs/api/errors/57004) | ERROR Branded Comms <br/> 'Category' is empty                                                                     |
| [57005](www.twilio.com/docs/api/errors/57005) | ERROR Branded Comms <br/> 'Category' is too long                                                                  |
| [57006](www.twilio.com/docs/api/errors/57006) | ERROR Branded Comms <br/> 'EventType' is empty                                                                    |
| [57007](www.twilio.com/docs/api/errors/57007) | ERROR Branded Comms <br/> 'EventType' is absent                                                                   |
| [57008](www.twilio.com/docs/api/errors/57008) | ERROR Branded Comms <br/> 'EventType' format must be String                                                       |
| [57009](www.twilio.com/docs/api/errors/57009) | ERROR Branded Comms <br/> 'EventType' is too long                                                                 |
| [57010](www.twilio.com/docs/api/errors/57010) | ERROR Branded Comms <br/> 'PartnerName' is absent                                                                 |
| [57011](www.twilio.com/docs/api/errors/57011) | ERROR Branded Comms <br/> Unsupported Partner name                                                                |
| [57012](www.twilio.com/docs/api/errors/57012) | ERROR Branded Comms <br/> Signature invalid                                                                       |
| [57013](www.twilio.com/docs/api/errors/57013) | ERROR Branded Comms <br/> 'Topic' is absent                                                                       |
| [57014](www.twilio.com/docs/api/errors/57014) | ERROR Branded Comms <br/> 'Event' data in payload is absent                                                       |
| [57016](www.twilio.com/docs/api/errors/57016) | ERROR Branded Comms <br/> 'Topic' is empty                                                                        |
| [57017](www.twilio.com/docs/api/errors/57017) | ERROR Branded Comms <br/> 'Topic' is too long                                                                     |
| [57018](www.twilio.com/docs/api/errors/57018) | ERROR Branded Comms <br/> 'Event' value type must be Map                                                          |
| [57019](www.twilio.com/docs/api/errors/57019) | ERROR Branded Comms <br/> 'Authorization' header is missing or is invalid                                         |
| [57020](www.twilio.com/docs/api/errors/57020) | ERROR Branded Comms <br/> Authorization failed                                                                    |
| [57021](www.twilio.com/docs/api/errors/57021) | ERROR Branded Comms <br/> Token invalid                                                                           |
| [57022](www.twilio.com/docs/api/errors/57022) | ERROR Branded Comms <br/> Required header is missing or invalid                                                   |

[Back to top](#)

## 60000-69999

| Code                                          | Description                                                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [60001](www.twilio.com/docs/api/errors/60001) | ERROR  <br/> Downstream Authentication Failed                                                                            |
| [60002](www.twilio.com/docs/api/errors/60002) | ERROR  <br/> End User Identification Timeout                                                                             |
| [60003](www.twilio.com/docs/api/errors/60003) | ERROR  <br/> End User Data is Not Available                                                                              |
| [60004](www.twilio.com/docs/api/errors/60004) | ERROR  <br/> Invalid Configuration                                                                                       |
| [60005](www.twilio.com/docs/api/errors/60005) | ERROR  <br/> Downstream Carrier Error                                                                                    |
| [60006](www.twilio.com/docs/api/errors/60006) | ERROR Verify <br/> Invalid Phone Number                                                                                  |
| [60007](www.twilio.com/docs/api/errors/60007) | ERROR  <br/> Downstream Verification Failed                                                                              |
| [60008](www.twilio.com/docs/api/errors/60008) | ERROR  <br/> Unsupported Carrier                                                                                         |
| [60200](www.twilio.com/docs/api/errors/60200) | ERROR Verify <br/> Invalid parameter                                                                                     |
| [60201](www.twilio.com/docs/api/errors/60201) | ERROR Verify <br/> Selected template translation is not approved                                                         |
| [60202](www.twilio.com/docs/api/errors/60202) | ERROR Verify <br/> Max check attempts reached                                                                            |
| [60203](www.twilio.com/docs/api/errors/60203) | ERROR Verify <br/> Max send attempts reached.                                                                            |
| [60204](www.twilio.com/docs/api/errors/60204) | ERROR Verify <br/> Service does not support this feature                                                                 |
| [60205](www.twilio.com/docs/api/errors/60205) | ERROR Verify <br/> SMS is not supported by landline phone number                                                         |
| [60206](www.twilio.com/docs/api/errors/60206) | ERROR Verify <br/> 'Amount' & 'Payee' params are required                                                                |
| [60207](www.twilio.com/docs/api/errors/60207) | ERROR Verify <br/> Max rate limits per service reached                                                                   |
| [60208](www.twilio.com/docs/api/errors/60208) | ERROR Verify <br/> Rate limit with that UniqueName already exists                                                        |
| [60209](www.twilio.com/docs/api/errors/60209) | ERROR Verify <br/> UniqueName format is invalid                                                                          |
| [60210](www.twilio.com/docs/api/errors/60210) | ERROR Verify <br/> Max Buckets per Rate limit reached                                                                    |
| [60211](www.twilio.com/docs/api/errors/60211) | ERROR Verify <br/> Bucket with the given Interval already exists                                                         |
| [60212](www.twilio.com/docs/api/errors/60212) | ERROR Verify <br/> Too many concurrent requests for phone number                                                         |
| [60213](www.twilio.com/docs/api/errors/60213) | ERROR Verify <br/> A Messaging Configuration already exists for the given country                                        |
| [60214](www.twilio.com/docs/api/errors/60214) | ERROR Verify <br/> Call channel is not supported when using PSD2                                                         |
| [60215](www.twilio.com/docs/api/errors/60215) | ERROR Verify <br/> Max number of mailers per account reached                                                             |
| [60217](www.twilio.com/docs/api/errors/60217) | ERROR Verify <br/> Invalid Service configuration                                                                         |
| [60218](www.twilio.com/docs/api/errors/60218) | ERROR Verify <br/> SendGrid Template is not active                                                                       |
| [60219](www.twilio.com/docs/api/errors/60219) | ERROR Verify <br/> SendGrid Template does not contain required placeholders                                              |
| [60220](www.twilio.com/docs/api/errors/60220) | ERROR Verify <br/> Messages to China require use case vetting                                                            |
| [60221](www.twilio.com/docs/api/errors/60221) | ERROR Verify <br/> No target verification specified                                                                      |
| [60222](www.twilio.com/docs/api/errors/60222) | ERROR Verify <br/> SendGrid The from address does not match a verified Sender Identity                                   |
| [60223](www.twilio.com/docs/api/errors/60223) | ERROR Verify <br/> Delivery channel disabled                                                                             |
| [60224](www.twilio.com/docs/api/errors/60224) | ERROR Verify <br/> Missing substitutions for selected template                                                           |
| [60225](www.twilio.com/docs/api/errors/60225) | ERROR Verify <br/> Translation already exists for the provided template                                                  |
| [60226](www.twilio.com/docs/api/errors/60226) | ERROR Verify <br/> Messages sent to china require friendly\_name                                                         |
| [60227](www.twilio.com/docs/api/errors/60227) | ERROR Verify <br/> The selected channel for template is not supported                                                    |
| [60228](www.twilio.com/docs/api/errors/60228) | ERROR Verify <br/> Template was not found                                                                                |
| [60229](www.twilio.com/docs/api/errors/60229) | ERROR Verify <br/> Template translation was not found                                                                    |
| [60231](www.twilio.com/docs/api/errors/60231) | ERROR Verify <br/> Sender id already exists for account                                                                  |
| [60232](www.twilio.com/docs/api/errors/60232) | ERROR Verify <br/> Sender id does not exist                                                                              |
| [60233](www.twilio.com/docs/api/errors/60233) | ERROR Verify <br/> Default sender id can't be deleted                                                                    |
| [60234](www.twilio.com/docs/api/errors/60234) | ERROR Verify <br/> Sender id can not be set as not default                                                               |
| [60235](www.twilio.com/docs/api/errors/60235) | ERROR Verify <br/> Sender Definitions does not match with requirements                                                   |
| [60236](www.twilio.com/docs/api/errors/60236) | ERROR Verify <br/> The domain could not be obtained from the given email                                                 |
| [60237](www.twilio.com/docs/api/errors/60237) | ERROR Verify <br/> The given domain is on a deny list                                                                    |
| [60238](www.twilio.com/docs/api/errors/60238) | ERROR Verify <br/> Verification Creation Attempt blocked by Twilio                                                       |
| [60239](www.twilio.com/docs/api/errors/60239) | WARNING Verify <br/> BYOT feature is not enabled                                                                         |
| [60240](www.twilio.com/docs/api/errors/60240) | WARNING Verify <br/> Templates not allowed                                                                               |
| [60241](www.twilio.com/docs/api/errors/60241) | WARNING Verify <br/> Static message required                                                                             |
| [60242](www.twilio.com/docs/api/errors/60242) | ERROR Verify <br/> WhatsApp template not found                                                                           |
| [60243](www.twilio.com/docs/api/errors/60243) | ERROR Verify <br/> Custom messages are not supported                                                                     |
| [60244](www.twilio.com/docs/api/errors/60244) | WARNING Verify <br/> Custom messages are not supported                                                                   |
| [60245](www.twilio.com/docs/api/errors/60245) | ERROR Verify <br/> You have exceeded your messaging limits                                                               |
| [60246](www.twilio.com/docs/api/errors/60246) | ERROR Verify <br/> Service already exists                                                                                |
| [60247](www.twilio.com/docs/api/errors/60247) | ERROR Verify <br/> Message Length Exceeded                                                                               |
| [60248](www.twilio.com/docs/api/errors/60248) | ERROR Verify <br/> Friendly Name contains a restricted word                                                              |
| [60250](www.twilio.com/docs/api/errors/60250) | ERROR Verify <br/> Missing Registration for Australia                                                                    |
| [60300](www.twilio.com/docs/api/errors/60300) | ERROR Verify <br/> Invalid Param                                                                                         |
| [60301](www.twilio.com/docs/api/errors/60301) | ERROR Verify <br/> Entity already exists                                                                                 |
| [60302](www.twilio.com/docs/api/errors/60302) | ERROR Verify <br/> FactorType already exists                                                                             |
| [60305](www.twilio.com/docs/api/errors/60305) | ERROR Verify <br/> Access Token parameters are invalid                                                                   |
| [60306](www.twilio.com/docs/api/errors/60306) | ERROR Verify <br/> Invalid Request                                                                                       |
| [60307](www.twilio.com/docs/api/errors/60307) | ERROR Verify <br/> Cannot resend push notifications to 'none' notification platform                                      |
| [60308](www.twilio.com/docs/api/errors/60308) | ERROR Verify <br/> Challenge verification attempts limit reached                                                         |
| [60309](www.twilio.com/docs/api/errors/60309) | ERROR Verify <br/> Push notifications limit reached for a Challenge                                                      |
| [60310](www.twilio.com/docs/api/errors/60310) | ERROR Verify <br/> Factor verification attempts reached                                                                  |
| [60311](www.twilio.com/docs/api/errors/60311) | ERROR Verify <br/> Factor verification failed                                                                            |
| [60312](www.twilio.com/docs/api/errors/60312) | ERROR Verify <br/> Challenge creation limit reached                                                                      |
| [60313](www.twilio.com/docs/api/errors/60313) | ERROR Verify <br/> Unauthorized factor creation                                                                          |
| [60314](www.twilio.com/docs/api/errors/60314) | ERROR Verify <br/> Factors binding format is invalid                                                                     |
| [60315](www.twilio.com/docs/api/errors/60315) | ERROR Verify <br/> Reached max limit of 20 push Factors associated per Entity                                            |
| [60317](www.twilio.com/docs/api/errors/60317) | ERROR Verify <br/> Factor already exists                                                                                 |
| [60318](www.twilio.com/docs/api/errors/60318) | ERROR Verify <br/> Factor is unverified                                                                                  |
| [60322](www.twilio.com/docs/api/errors/60322) | ERROR Verify <br/> Challenge already responded                                                                           |
| [60323](www.twilio.com/docs/api/errors/60323) | ERROR Verify <br/> Challenge expired                                                                                     |
| [60324](www.twilio.com/docs/api/errors/60324) | ERROR Verify <br/> Challenge verification failed                                                                         |
| [60325](www.twilio.com/docs/api/errors/60325) | WARNING Verify <br/> Translation for locale not found, using default                                                     |
| [60326](www.twilio.com/docs/api/errors/60326) | ERROR Verify <br/> Too many requests to create factors for the entity                                                    |
| [60327](www.twilio.com/docs/api/errors/60327) | WARNING Verify <br/> Channel not supported by template; Verify falling back to static message                            |
| [60328](www.twilio.com/docs/api/errors/60328) | ERROR Verify <br/> Entities rate limit exceeded                                                                          |
| [60329](www.twilio.com/docs/api/errors/60329) | ERROR Verify <br/> Verify SNA does not work with \`psd2\_enabled\`                                                       |
| [60330](www.twilio.com/docs/api/errors/60330) | ERROR Verify <br/> Failed to invoke the webhook                                                                          |
| [60331](www.twilio.com/docs/api/errors/60331) | ERROR Verify <br/> Locale requested is not supported by Verify Text-To-Speech conversion                                 |
| [60333](www.twilio.com/docs/api/errors/60333) | WARNING Verify <br/> The SMS message was sent using a brandless template.                                                |
| [60334](www.twilio.com/docs/api/errors/60334) | WARNING Verify <br/> The SMS message was sent using a brandful template.                                                 |
| [60335](www.twilio.com/docs/api/errors/60335) | WARNING Verify <br/> The SMS message was sent using a brandless template.                                                |
| [60361](www.twilio.com/docs/api/errors/60361) | ERROR Verify <br/> Account SID is invalid or not provided                                                                |
| [60362](www.twilio.com/docs/api/errors/60362) | ERROR Verify <br/> Factor SID invalid or not provided                                                                    |
| [60363](www.twilio.com/docs/api/errors/60363) | ERROR Verify <br/> Service SID invalid or not provided                                                                   |
| [60364](www.twilio.com/docs/api/errors/60364) | ERROR Verify <br/> Challenge SID invalid or not provided                                                                 |
| [60365](www.twilio.com/docs/api/errors/60365) | ERROR Verify <br/> Entity SID invalid or not provided                                                                    |
| [60366](www.twilio.com/docs/api/errors/60366) | ERROR Verify <br/> Entity invalid or not provided                                                                        |
| [60367](www.twilio.com/docs/api/errors/60367) | ERROR Verify <br/> Invalid entity identity                                                                               |
| [60368](www.twilio.com/docs/api/errors/60368) | ERROR Verify <br/> Challenge details invalid or not provided                                                             |
| [60369](www.twilio.com/docs/api/errors/60369) | ERROR Verify <br/> Factor type invalid or not provided                                                                   |
| [60370](www.twilio.com/docs/api/errors/60370) | ERROR Verify <br/> Factor config invalid or not provided                                                                 |
| [60371](www.twilio.com/docs/api/errors/60371) | ERROR Verify <br/> Relying party invalid or not provided                                                                 |
| [60372](www.twilio.com/docs/api/errors/60372) | ERROR Verify <br/> Relying party id invalid or not provided                                                              |
| [60373](www.twilio.com/docs/api/errors/60373) | ERROR Verify <br/> Invalid page size                                                                                     |
| [60374](www.twilio.com/docs/api/errors/60374) | ERROR Verify <br/> Invalid page token                                                                                    |
| [60375](www.twilio.com/docs/api/errors/60375) | ERROR Verify <br/> Invalid id                                                                                            |
| [60376](www.twilio.com/docs/api/errors/60376) | ERROR Verify <br/> Invalid rawId                                                                                         |
| [60377](www.twilio.com/docs/api/errors/60377) | ERROR Verify <br/> Authenticator attachment invalid or not provided                                                      |
| [60378](www.twilio.com/docs/api/errors/60378) | ERROR Verify <br/> Authenticator response invalid or not provided                                                        |
| [60379](www.twilio.com/docs/api/errors/60379) | ERROR Verify <br/> Authenticator data invalid or not provided                                                            |
| [60380](www.twilio.com/docs/api/errors/60380) | ERROR Verify <br/> Client data invalid or not provided                                                                   |
| [60381](www.twilio.com/docs/api/errors/60381) | ERROR Verify <br/> Signature invalid or not provided                                                                     |
| [60382](www.twilio.com/docs/api/errors/60382) | ERROR Verify <br/> Factor does not match the relying party of the challenge                                              |
| [60383](www.twilio.com/docs/api/errors/60383) | ERROR Verify <br/> Illegal factor status                                                                                 |
| [60384](www.twilio.com/docs/api/errors/60384) | ERROR Verify <br/> Invalid challenge timeout                                                                             |
| [60385](www.twilio.com/docs/api/errors/60385) | ERROR Verify <br/> Public key invalid or not provided                                                                    |
| [60386](www.twilio.com/docs/api/errors/60386) | ERROR Verify <br/> Attestation object invalid or not provided                                                            |
| [60387](www.twilio.com/docs/api/errors/60387) | ERROR Verify <br/> Attested credential data invalid or not provided                                                      |
| [60388](www.twilio.com/docs/api/errors/60388) | ERROR Verify <br/> User display name not provided                                                                        |
| [60390](www.twilio.com/docs/api/errors/60390) | ERROR Verify <br/> Factor not found                                                                                      |
| [60391](www.twilio.com/docs/api/errors/60391) | ERROR Verify <br/> Challenge not found                                                                                   |
| [60392](www.twilio.com/docs/api/errors/60392) | ERROR Verify <br/> Entity not found                                                                                      |
| [60401](www.twilio.com/docs/api/errors/60401) | ERROR Verify <br/> Network Error                                                                                         |
| [60402](www.twilio.com/docs/api/errors/60402) | ERROR Verify <br/> Mapper Error                                                                                          |
| [60403](www.twilio.com/docs/api/errors/60403) | ERROR Verify <br/> Storage Error                                                                                         |
| [60404](www.twilio.com/docs/api/errors/60404) | ERROR Verify <br/> Input Error                                                                                           |
| [60405](www.twilio.com/docs/api/errors/60405) | ERROR Verify <br/> Key Storage Error                                                                                     |
| [60406](www.twilio.com/docs/api/errors/60406) | ERROR Verify <br/> Initialization Error                                                                                  |
| [60407](www.twilio.com/docs/api/errors/60407) | ERROR Verify <br/> Authentication Token Error                                                                            |
| [60408](www.twilio.com/docs/api/errors/60408) | ERROR Verify <br/> TemplateSid is only supported for the SMS channel                                                     |
| [60409](www.twilio.com/docs/api/errors/60409) | WARNING Verify <br/> Custom message did not match any template                                                           |
| [60410](www.twilio.com/docs/api/errors/60410) | ERROR Verify <br/> Verification delivery attempt blocked                                                                 |
| [60411](www.twilio.com/docs/api/errors/60411) | ERROR Verify <br/> Phone Number or Phone Number Prefix already exists in Safelist                                        |
| [60412](www.twilio.com/docs/api/errors/60412) | ERROR Verify <br/> Verification blocked by Fraudulent Signup Prevention                                                  |
| [60420](www.twilio.com/docs/api/errors/60420) | ERROR Verify <br/> Invalid Contact ID format                                                                             |
| [60421](www.twilio.com/docs/api/errors/60421) | ERROR Verify <br/> Unexpected result when creating contact                                                               |
| [60422](www.twilio.com/docs/api/errors/60422) | ERROR Verify <br/> Contact not found                                                                                     |
| [60423](www.twilio.com/docs/api/errors/60423) | ERROR Verify <br/> Multiple contacts were found                                                                          |
| [60424](www.twilio.com/docs/api/errors/60424) | ERROR Verify <br/> Contact address not found                                                                             |
| [60425](www.twilio.com/docs/api/errors/60425) | ERROR Verify <br/> Verification SID invalid or not provided                                                              |
| [60426](www.twilio.com/docs/api/errors/60426) | ERROR Verify <br/> Verification ID invalid or not provided                                                               |
| [60427](www.twilio.com/docs/api/errors/60427) | ERROR Verify <br/> Factor ID invalid or not provided                                                                     |
| [60428](www.twilio.com/docs/api/errors/60428) | ERROR Verify <br/> Unsupported channel                                                                                   |
| [60431](www.twilio.com/docs/api/errors/60431) | ERROR Verify <br/> Verification not found                                                                                |
| [60432](www.twilio.com/docs/api/errors/60432) | ERROR Verify <br/> Unsupported passkeys relying party                                                                    |
| [60433](www.twilio.com/docs/api/errors/60433) | ERROR Verify <br/> Unsupported passkeys approval content type                                                            |
| [60434](www.twilio.com/docs/api/errors/60434) | ERROR Verify <br/> Unsupported passkeys verification content type                                                        |
| [60436](www.twilio.com/docs/api/errors/60436) | ERROR Verify <br/> Recipient invalid or not provided                                                                     |
| [60437](www.twilio.com/docs/api/errors/60437) | ERROR Verify <br/> Recipient type unsupported                                                                            |
| [60440](www.twilio.com/docs/api/errors/60440) | ERROR Verify <br/> Unsupported verification content type                                                                 |
| [60441](www.twilio.com/docs/api/errors/60441) | ERROR Verify <br/> Illegal status                                                                                        |
| [60500](www.twilio.com/docs/api/errors/60500) | ERROR Verify <br/> SNA Phone Number Mismatch                                                                             |
| [60510](www.twilio.com/docs/api/errors/60510) | ERROR Verify <br/> SNA Error                                                                                             |
| [60511](www.twilio.com/docs/api/errors/60511) | ERROR Verify <br/> SNA Downstream Error                                                                                  |
| [60517](www.twilio.com/docs/api/errors/60517) | ERROR Verify <br/> SNA User-Agent Mismatch Error                                                                         |
| [60519](www.twilio.com/docs/api/errors/60519) | ERROR Verify <br/> SNA Verification Result Pending                                                                       |
| [60520](www.twilio.com/docs/api/errors/60520) | ERROR Verify <br/> SNA URL Failed                                                                                        |
| [60531](www.twilio.com/docs/api/errors/60531) | ERROR Verify <br/> SNA Carrier Not Detected                                                                              |
| [60532](www.twilio.com/docs/api/errors/60532) | ERROR Verify <br/> SNA Potential Dual SIM Detected                                                                       |
| [60533](www.twilio.com/docs/api/errors/60533) | ERROR Verify <br/> SNA Carrier Header Error                                                                              |
| [60534](www.twilio.com/docs/api/errors/60534) | ERROR Verify <br/> SNA Downstream Carrier Error                                                                          |
| [60540](www.twilio.com/docs/api/errors/60540) | ERROR Verify <br/> SNA Carrier Identified Invalid Phone Number                                                           |
| [60550](www.twilio.com/docs/api/errors/60550) | ERROR Verify <br/> Auto Channel Failed: No channels selected due to validation errors. Check console.                    |
| [60600](www.twilio.com/docs/api/errors/60600) | ERROR Lookup <br/> Unprovisioned or out of coverage                                                                      |
| [60601](www.twilio.com/docs/api/errors/60601) | ERROR Lookup <br/> Authorization required for Canada lookups                                                             |
| [60602](www.twilio.com/docs/api/errors/60602) | ERROR Verify <br/> App hash can only be used with SMS channel                                                            |
| [60603](www.twilio.com/docs/api/errors/60603) | ERROR Verify <br/> SendGrid maximum credits exceeded                                                                     |
| [60604](www.twilio.com/docs/api/errors/60604) | ERROR Verify <br/> SendGrid Authenticated user is not authorized to send mail                                            |
| [60605](www.twilio.com/docs/api/errors/60605) | ERROR Verify <br/> Verification delivery attempt blocked                                                                 |
| [60606](www.twilio.com/docs/api/errors/60606) | ERROR Lookup <br/> Lookup Package is Not Enabled                                                                         |
| [60607](www.twilio.com/docs/api/errors/60607) | ERROR Lookup <br/> Lookup Unsupported Country                                                                            |
| [60608](www.twilio.com/docs/api/errors/60608) | ERROR Lookup <br/> Lookup Error                                                                                          |
| [60609](www.twilio.com/docs/api/errors/60609) | ERROR Lookup <br/> Live activity not enabled                                                                             |
| [60610](www.twilio.com/docs/api/errors/60610) | ERROR Lookup <br/> Phone number outside of coverage                                                                      |
| [60611](www.twilio.com/docs/api/errors/60611) | ERROR Lookup <br/> Lookup Package Quota Reached                                                                          |
| [60612](www.twilio.com/docs/api/errors/60612) | ERROR Lookup <br/> Requested phone number not mobile                                                                     |
| [60613](www.twilio.com/docs/api/errors/60613) | ERROR Lookup <br/> Lookup Provider Degradation                                                                           |
| [60614](www.twilio.com/docs/api/errors/60614) | ERROR Lookup <br/> Lookup Request Must Be Completed in Different Twilio Region                                           |
| [60616](www.twilio.com/docs/api/errors/60616) | ERROR Lookup <br/> Lookup rate limit exceeded                                                                            |
| [60617](www.twilio.com/docs/api/errors/60617) | ERROR Lookup <br/> Lookup Not Enough Request Parameters                                                                  |
| [60618](www.twilio.com/docs/api/errors/60618) | ERROR Lookup <br/> Lookup Malformed Request Parameter                                                                    |
| [60619](www.twilio.com/docs/api/errors/60619) | ERROR Lookup <br/> Lookup Request Cannot be Completed in Twilio Region                                                   |
| [60620](www.twilio.com/docs/api/errors/60620) | ERROR Lookup <br/> Lookup SIM Swap Information is Incomplete From Carrier                                                |
| [60621](www.twilio.com/docs/api/errors/60621) | ERROR Lookup <br/> Lookup Carrier Information Not Available                                                              |
| [60622](www.twilio.com/docs/api/errors/60622) | ERROR Lookup <br/> Invalid Magic Number                                                                                  |
| [60623](www.twilio.com/docs/api/errors/60623) | WARNING Lookup <br/> Verification Not Found                                                                              |
| [60624](www.twilio.com/docs/api/errors/60624) | ERROR Lookup <br/> Maximum rate limit for Trial Accounts                                                                 |
| [60625](www.twilio.com/docs/api/errors/60625) | ERROR Lookup <br/> Phone Number is Cancelled                                                                             |
| [60626](www.twilio.com/docs/api/errors/60626) | ERROR Lookup <br/> Phone number rate limit exceeded                                                                      |
| [60699](www.twilio.com/docs/api/errors/60699) | ERROR Lookup <br/> Lookup Usage Disabled                                                                                 |
| [60700](www.twilio.com/docs/api/errors/60700) | ERROR Branded Comms <br/> Something went wrong. Try again later                                                          |
| [60701](www.twilio.com/docs/api/errors/60701) | ERROR Branded Comms <br/> Invalid request                                                                                |
| [60702](www.twilio.com/docs/api/errors/60702) | WARNING Branded Comms <br/> Business Profile not found                                                                   |
| [60703](www.twilio.com/docs/api/errors/60703) | ERROR Branded Comms <br/> Invalid phone numbers format                                                                   |
| [60704](www.twilio.com/docs/api/errors/60704) | ERROR Branded Comms <br/> Phone number not branded by Twilio                                                             |
| [60706](www.twilio.com/docs/api/errors/60706) | ERROR Branded Comms <br/> Invalid Push Token                                                                             |
| [60707](www.twilio.com/docs/api/errors/60707) | WARNING Branded Comms <br/> Branded Channel not found                                                                    |
| [60708](www.twilio.com/docs/api/errors/60708) | WARNING Branded Comms <br/> Phone record number not found                                                                |
| [60709](www.twilio.com/docs/api/errors/60709) | WARNING Branded Comms <br/> Business Profile already exists                                                              |
| [60710](www.twilio.com/docs/api/errors/60710) | WARNING Branded Comms <br/> Phone number CPS not found                                                                   |
| [60711](www.twilio.com/docs/api/errors/60711) | ERROR Branded Comms <br/> Business status does not allow updates                                                         |
| [60712](www.twilio.com/docs/api/errors/60712) | ERROR Branded Comms <br/> Error communicating with Regulatory Compliance API                                             |
| [60713](www.twilio.com/docs/api/errors/60713) | ERROR Branded Comms <br/> Error communicating with Regulatory Identification API                                         |
| [60714](www.twilio.com/docs/api/errors/60714) | WARNING Branded Comms <br/> Brand not found                                                                              |
| [60715](www.twilio.com/docs/api/errors/60715) | ERROR Branded Comms <br/> Error reading logo file                                                                        |
| [60716](www.twilio.com/docs/api/errors/60716) | ERROR Branded Comms <br/> Selected logo is not a valid PNG file                                                          |
| [60717](www.twilio.com/docs/api/errors/60717) | ERROR Branded Comms <br/> Error uploading logo to the storage                                                            |
| [60719](www.twilio.com/docs/api/errors/60719) | WARNING Branded Comms <br/> Branded Call not found                                                                       |
| [60721](www.twilio.com/docs/api/errors/60721) | WARNING Branded Comms <br/> Phone Number(s) already used in a Branded Channel                                            |
| [60722](www.twilio.com/docs/api/errors/60722) | WARNING Branded Comms <br/> Business status does not allow dismissal                                                     |
| [60723](www.twilio.com/docs/api/errors/60723) | WARNING Branded Comms <br/> Brand status does not allow updates                                                          |
| [60724](www.twilio.com/docs/api/errors/60724) | WARNING Branded Comms <br/> Brand status does not allow dismissal                                                        |
| [60725](www.twilio.com/docs/api/errors/60725) | WARNING Branded Comms <br/> Brand status does not allow to have branded channels                                         |
| [60726](www.twilio.com/docs/api/errors/60726) | WARNING Branded Comms <br/> Business status does not allow to have brands                                                |
| [60727](www.twilio.com/docs/api/errors/60727) | WARNING Branded Comms <br/> Channel not found                                                                            |
| [60728](www.twilio.com/docs/api/errors/60728) | ERROR Verify <br/> Account exceeded the hourly messages limit                                                            |
| [61000](www.twilio.com/docs/api/errors/61000) | ERROR  <br/> Add-ons: Internal server error                                                                              |
| [61001](www.twilio.com/docs/api/errors/61001) | ERROR  <br/> Add-ons: Request timed out                                                                                  |
| [61002](www.twilio.com/docs/api/errors/61002) | ERROR  <br/> Add-ons: Provider could not complete request                                                                |
| [61003](www.twilio.com/docs/api/errors/61003) | ERROR  <br/> Add-ons: Requirements to invoke AddOns have not been met                                                    |
| [61004](www.twilio.com/docs/api/errors/61004) | WARNING  <br/> Add-ons: No results                                                                                       |
| [61005](www.twilio.com/docs/api/errors/61005) | ERROR  <br/> Add-ons: Bad request                                                                                        |
| [61006](www.twilio.com/docs/api/errors/61006) | WARNING  <br/> Add-ons: Add-ons unavailable for GET callbacks                                                            |
| [61007](www.twilio.com/docs/api/errors/61007) | ERROR  <br/> Add-ons: Response body too large                                                                            |
| [61008](www.twilio.com/docs/api/errors/61008) | ERROR  <br/> Add-ons:  HTTP too many redirects                                                                           |
| [61009](www.twilio.com/docs/api/errors/61009) | ERROR  <br/> Add-ons: Could not fulfill request with available data                                                      |
| [62000](www.twilio.com/docs/api/errors/62000) | ERROR Interconnect <br/> Failed to write to the database.                                                                |
| [62001](www.twilio.com/docs/api/errors/62001) | ERROR Interconnect <br/> Invalid SID                                                                                     |
| [62002](www.twilio.com/docs/api/errors/62002) | ERROR Interconnect <br/> Exchange not found                                                                              |
| [62003](www.twilio.com/docs/api/errors/62003) | ERROR Interconnect <br/> MPLS carrier not found.                                                                         |
| [62004](www.twilio.com/docs/api/errors/62004) | ERROR Interconnect <br/> Direct connect not found.                                                                       |
| [62005](www.twilio.com/docs/api/errors/62005) | ERROR Interconnect <br/>  Bandwidth reserve not found.                                                                   |
| [62006](www.twilio.com/docs/api/errors/62006) | ERROR Interconnect <br/>  MPLS carrier is not associated with the exchange.                                              |
| [62007](www.twilio.com/docs/api/errors/62007) | ERROR Interconnect <br/> Direct connect is not associated with the exchange.                                             |
| [62008](www.twilio.com/docs/api/errors/62008) | ERROR Interconnect <br/> Bandwidth reserve is not associated with the exchange.                                          |
| [62009](www.twilio.com/docs/api/errors/62009) | ERROR Interconnect <br/> Account SID was not found.                                                                      |
| [62010](www.twilio.com/docs/api/errors/62010) | ERROR Interconnect <br/> No authentication was provided.                                                                 |
| [62011](www.twilio.com/docs/api/errors/62011) | ERROR Interconnect <br/> Unauthorized                                                                                    |
| [62012](www.twilio.com/docs/api/errors/62012) | ERROR Interconnect <br/> Connection not found.                                                                           |
| [62013](www.twilio.com/docs/api/errors/62013) | ERROR Interconnect <br/> Unable to identify account owner of connection.                                                 |
| [62014](www.twilio.com/docs/api/errors/62014) | ERROR Interconnect <br/> Connection not ready                                                                            |
| [62015](www.twilio.com/docs/api/errors/62015) | ERROR Interconnect <br/> Connection in transition                                                                        |
| [62016](www.twilio.com/docs/api/errors/62016) | ERROR Interconnect <br/> Connection not active                                                                           |
| [62017](www.twilio.com/docs/api/errors/62017) | ERROR Interconnect <br/> No IP route specified                                                                           |
| [62018](www.twilio.com/docs/api/errors/62018) | ERROR Interconnect <br/> Invalid IP route                                                                                |
| [62019](www.twilio.com/docs/api/errors/62019) | ERROR Interconnect <br/> IP route exceeds permitted IP range                                                             |
| [62020](www.twilio.com/docs/api/errors/62020) | ERROR Interconnect <br/> Connection pending deletion.                                                                    |
| [62021](www.twilio.com/docs/api/errors/62021) | ERROR Interconnect <br/> IP Gateway Invalid                                                                              |
| [62022](www.twilio.com/docs/api/errors/62022) | ERROR Interconnect <br/> Missing account SID                                                                             |
| [62023](www.twilio.com/docs/api/errors/62023) | ERROR Interconnect <br/> Missing exchange                                                                                |
| [62024](www.twilio.com/docs/api/errors/62024) | ERROR Interconnect <br/> Missing connection type                                                                         |
| [62025](www.twilio.com/docs/api/errors/62025) | ERROR Interconnect <br/> Interconnect: Invalid connection type                                                           |
| [62026](www.twilio.com/docs/api/errors/62026) | ERROR Interconnect <br/> Interconnect: Missing MPLS carrier SID                                                          |
| [62027](www.twilio.com/docs/api/errors/62027) | ERROR Interconnect <br/> Interconnect: Extra MPLS parameter                                                              |
| [62028](www.twilio.com/docs/api/errors/62028) | ERROR Interconnect <br/> Interconnect: Connection expired.                                                               |
| [62034](www.twilio.com/docs/api/errors/62034) | ERROR Interconnect <br/> Interconnect: No useful parameters provided.                                                    |
| [62035](www.twilio.com/docs/api/errors/62035) | ERROR Interconnect <br/> Interconnect: No bandwidth was specified in the request                                         |
| [62052](www.twilio.com/docs/api/errors/62052) | ERROR Interconnect <br/> Interconnect: Account is not a subaccount of the Connection owner                               |
| [62053](www.twilio.com/docs/api/errors/62053) | ERROR Interconnect <br/> Interconnect: The subaccount is not authorized to access this connection.                       |
| [62100](www.twilio.com/docs/api/errors/62100) | ERROR Interconnect <br/> IP address(es) already linked to another connection                                             |
| [62200](www.twilio.com/docs/api/errors/62200) | ERROR Interconnect <br/> Provisioning failure - Network-API is unavailable!                                              |
| [62220](www.twilio.com/docs/api/errors/62220) | ERROR Interconnect <br/> Provisioning failure - Requested bandwidth not available on the network device.                 |
| [63001](www.twilio.com/docs/api/errors/63001) | ERROR Branded Comms <br/> Channel authentication failed. See Channel-specific error for details                          |
| [63002](www.twilio.com/docs/api/errors/63002) | ERROR Branded Comms <br/> Channel could not find the From address                                                        |
| [63003](www.twilio.com/docs/api/errors/63003) | ERROR Branded Comms <br/> Channel could not find To address                                                              |
| [63005](www.twilio.com/docs/api/errors/63005) | ERROR Branded Comms <br/> Channel rejected content. See Channel-specific error for details                               |
| [63006](www.twilio.com/docs/api/errors/63006) | ERROR Branded Comms <br/> Content could not be formatted for this channel. See Channel-specific error                    |
| [63007](www.twilio.com/docs/api/errors/63007) | ERROR Branded Comms, Whatsapp <br/> Twilio could not find a Channel with the specified 'From' address                    |
| [63008](www.twilio.com/docs/api/errors/63008) | ERROR Branded Comms <br/> Request failed: channel module misconfigured. Check Channel config in Twilio                   |
| [63009](www.twilio.com/docs/api/errors/63009) | ERROR Branded Comms <br/> Channel provider returned HTTP 5xx error. See Channel-specific error for details               |
| [63010](www.twilio.com/docs/api/errors/63010) | ERROR Branded Comms <br/> Twilio's platform encountered an internal error processing this message                        |
| [63011](www.twilio.com/docs/api/errors/63011) | ERROR Branded Comms <br/> Invalid Request: Twilio encountered an error while processing your request                     |
| [63012](www.twilio.com/docs/api/errors/63012) | ERROR Branded Comms <br/> Channel provider returned an internal service error                                            |
| [63013](www.twilio.com/docs/api/errors/63013) | ERROR Branded Comms, Whatsapp <br/> Channel policy violation                                                             |
| [63014](www.twilio.com/docs/api/errors/63014) | ERROR Branded Comms <br/> Channel message blocked by user action                                                         |
| [63015](www.twilio.com/docs/api/errors/63015) | ERROR Branded Comms, Whatsapp <br/> Channel Sandbox can only send messages to phone numbers that have joined the Sandbox |
| [63016](www.twilio.com/docs/api/errors/63016) | ERROR Branded Comms, Whatsapp <br/> Outside messaging window. For WhatsApp, use a Message Template instead               |
| [63017](www.twilio.com/docs/api/errors/63017) | ERROR Branded Comms <br/> Rate limit exceeded                                                                            |
| [63018](www.twilio.com/docs/api/errors/63018) | ERROR Branded Comms <br/> Rate limit exceeded for Channel                                                                |
| [63019](www.twilio.com/docs/api/errors/63019) | ERROR Branded Comms <br/> Media failed to download                                                                       |
| [63020](www.twilio.com/docs/api/errors/63020) | ERROR Branded Comms <br/> Twilio encountered a Business Manager account error                                            |
| [63021](www.twilio.com/docs/api/errors/63021) | ERROR Branded Comms <br/> Channel invalid content error                                                                  |
| [63022](www.twilio.com/docs/api/errors/63022) | ERROR Branded Comms <br/> Invalid vname certificate                                                                      |
| [63023](www.twilio.com/docs/api/errors/63023) | ERROR Branded Comms <br/> Channel generic error                                                                          |
| [63024](www.twilio.com/docs/api/errors/63024) | ERROR Branded Comms <br/> Invalid message recipient                                                                      |
| [63025](www.twilio.com/docs/api/errors/63025) | ERROR Branded Comms <br/> Media already exists                                                                           |
| [63026](www.twilio.com/docs/api/errors/63026) | ERROR Branded Comms <br/> Channel sender content flagged as spam                                                         |
| [63027](www.twilio.com/docs/api/errors/63027) | ERROR Branded Comms, Whatsapp, Content <br/> Template does not exist for a language and locale                           |
| [63028](www.twilio.com/docs/api/errors/63028) | ERROR Branded Comms <br/> Number of parameters provided does not match the expected number of parameters                 |
| [63029](www.twilio.com/docs/api/errors/63029) | ERROR Branded Comms, Whatsapp, Content <br/> The receiver failed to download the template                                |
| [63030](www.twilio.com/docs/api/errors/63030) | ERROR Branded Comms <br/> Unsupported parameter for type of channels message                                             |
| [63031](www.twilio.com/docs/api/errors/63031) | ERROR Branded Comms <br/> Channels message cannot have same 'From' and 'To'                                              |
| [63032](www.twilio.com/docs/api/errors/63032) | ERROR Branded Comms <br/> We cannot send this message to this user because of a WhatsApp limitation.                     |
| [63033](www.twilio.com/docs/api/errors/63033) | ERROR Branded Comms, Whatsapp <br/> Recipient opted out to receive message                                               |
| [63034](www.twilio.com/docs/api/errors/63034) | ERROR Branded Comms <br/> Media exceeds size limit                                                                       |
| [63035](www.twilio.com/docs/api/errors/63035) | ERROR Branded Comms, Rcs <br/> The RCS sender does not have permission to send to this recipient.                        |
| [63036](www.twilio.com/docs/api/errors/63036) | ERROR Branded Comms <br/> The specified phone number cannot be reached using RCS at this time.                           |
| [63037](www.twilio.com/docs/api/errors/63037) | WARNING Branded Comms <br/> Channel Media Upload Error                                                                   |
| [63038](www.twilio.com/docs/api/errors/63038) | ERROR Branded Comms <br/> Account exceeded the daily messages limit                                                      |
| [63039](www.twilio.com/docs/api/errors/63039) | ERROR Branded Comms <br/> Facebook warning: reduce message rate outside 24-hour window to avoid restrictions             |
| [63040](www.twilio.com/docs/api/errors/63040) | ERROR Branded Comms <br/> Template Rejected                                                                              |
| [63041](www.twilio.com/docs/api/errors/63041) | ERROR Branded Comms <br/> Template paused                                                                                |
| [63042](www.twilio.com/docs/api/errors/63042) | ERROR Branded Comms <br/> Template disabled                                                                              |
| [63043](www.twilio.com/docs/api/errors/63043) | ERROR Branded Comms, Content <br/> Link to a sample media file returns 403 Forbidden                                     |
| [63044](www.twilio.com/docs/api/errors/63044) | ERROR Branded Comms, Content <br/> Link to a sample media file returns 404 Not Found                                     |
| [63045](www.twilio.com/docs/api/errors/63045) | ERROR Branded Comms <br/> Link to a sample media file returned an unexpected error status                                |
| [63046](www.twilio.com/docs/api/errors/63046) | WARNING Branded Comms <br/> Template approved                                                                            |
| [63047](www.twilio.com/docs/api/errors/63047) | ERROR Branded Comms <br/> Link to a sample media file returned an invalid Content-Type                                   |
| [63049](www.twilio.com/docs/api/errors/63049) | ERROR Branded Comms <br/> Meta chose not to deliver this WhatsApp marketing message                                      |
| [63050](www.twilio.com/docs/api/errors/63050) | ERROR Branded Comms, Whatsapp <br/> WhatsApp User Opted Out of Receiving Marketing Messages                              |
| [63051](www.twilio.com/docs/api/errors/63051) | ERROR Branded Comms, Whatsapp <br/> WhatsApp Sender or Account is Locked                                                 |
| [63052](www.twilio.com/docs/api/errors/63052) | WARNING Branded Comms <br/> Legacy WhatsApp Template Used                                                                |
| [63053](www.twilio.com/docs/api/errors/63053) | ERROR Branded Comms <br/> Template sync can take up to 10 minutes. Wait, then retry sending your message.                |
| [63054](www.twilio.com/docs/api/errors/63054) | ERROR Branded Comms, Whatsapp, Content <br/> Template unavailable for use                                                |
| [63055](www.twilio.com/docs/api/errors/63055) | ERROR Branded Comms <br/> Only marketing messages supported on MM Lite API                                               |
| [63056](www.twilio.com/docs/api/errors/63056) | ERROR Branded Comms, Whatsapp <br/> Ineligible account type                                                              |
| [63057](www.twilio.com/docs/api/errors/63057) | ERROR  <br/> Template Submission Rate Limit Exceeded                                                                     |
| [63058](www.twilio.com/docs/api/errors/63058) | ERROR Branded Comms, Whatsapp <br/> Business is restricted from messaging users in this country                          |
| [63059](www.twilio.com/docs/api/errors/63059) | ERROR Branded Comms <br/> Phone number migrated to a different WhatsApp Business Account                                 |
| [63100](www.twilio.com/docs/api/errors/63100) | ERROR Branded Comms, Whatsapp <br/> Validation Error                                                                     |
| [63101](www.twilio.com/docs/api/errors/63101) | ERROR Branded Comms <br/> WABA ID provided is not valid or unable to be used                                             |
| [63102](www.twilio.com/docs/api/errors/63102) | ERROR Branded Comms <br/> Account already linked to another WABA ID                                                      |
| [63103](www.twilio.com/docs/api/errors/63103) | ERROR Branded Comms <br/> Cannot assign payment method to WABA provided                                                  |
| [63104](www.twilio.com/docs/api/errors/63104) | ERROR Branded Comms <br/> Maximum number of phone numbers reached for your WABA                                          |
| [63105](www.twilio.com/docs/api/errors/63105) | ERROR Branded Comms <br/> Channel does not support this action                                                           |
| [63106](www.twilio.com/docs/api/errors/63106) | ERROR Branded Comms, Rcs <br/> phone\_number is not a RCS capable number                                                 |
| [63107](www.twilio.com/docs/api/errors/63107) | ERROR Branded Comms <br/> phone\_number must be a valid E.164 formatted phone number                                     |
| [63108](www.twilio.com/docs/api/errors/63108) | ERROR Branded Comms, Rcs <br/> Sender is not ready to add test device                                                    |
| [63109](www.twilio.com/docs/api/errors/63109) | ERROR Branded Comms <br/> This Sender has been migrated into a different account                                         |
| [63110](www.twilio.com/docs/api/errors/63110) | ERROR Branded Comms <br/> The phone number registration error                                                            |
| [63111](www.twilio.com/docs/api/errors/63111) | ERROR Branded Comms, Whatsapp <br/> Sender's phone number or WABA returned "not found"                                   |
| [63112](www.twilio.com/docs/api/errors/63112) | ERROR Branded Comms, Whatsapp <br/> Meta disabled the WhatsApp Business Account connected to this Sender                 |
| [63113](www.twilio.com/docs/api/errors/63113) | ERROR Branded Comms <br/> Sender Cannot Be Verified                                                                      |
| [63114](www.twilio.com/docs/api/errors/63114) | ERROR Branded Comms, Whatsapp <br/> Too Many Verification Codes                                                          |
| [63115](www.twilio.com/docs/api/errors/63115) | ERROR Branded Comms <br/> Could not update Whatsapp business profile on the WhatsApp Sender                              |
| [63116](www.twilio.com/docs/api/errors/63116) | ERROR Branded Comms <br/> WhatsApp Sender failed to be automatically registered as OTP was not received                  |
| [63117](www.twilio.com/docs/api/errors/63117) | ERROR Branded Comms <br/> Downstream Service Unavailable at the moment                                                   |
| [63118](www.twilio.com/docs/api/errors/63118) | ERROR Branded Comms, Whatsapp <br/> PIN not retrieved due to sender configuration not being found                        |
| [63119](www.twilio.com/docs/api/errors/63119) | ERROR Branded Comms <br/> Meta rate limit exceeded                                                                       |
| [63120](www.twilio.com/docs/api/errors/63120) | ERROR Branded Comms <br/> Meta Business Account locked. Contact Meta Business Support to unlock                          |
| [64001](www.twilio.com/docs/api/errors/64001) | ERROR Programmable Voice <br/> Pay: Configuration Error                                                                  |
| [64002](www.twilio.com/docs/api/errors/64002) | ERROR Programmable Voice <br/> Pay: Service unavailable.                                                                 |
| [64003](www.twilio.com/docs/api/errors/64003) | ERROR Programmable Voice <br/> Pay: Invalid charge amount.                                                               |
| [64004](www.twilio.com/docs/api/errors/64004) | ERROR Programmable Voice <br/> Pay: Invalid paymentConnector attribute in TwiML.                                         |
| [64005](www.twilio.com/docs/api/errors/64005) | ERROR Programmable Voice <br/> Pay: Connector does not support tokenization.                                             |
| [64006](www.twilio.com/docs/api/errors/64006) | ERROR Programmable Voice <br/> Pay: Connector does not support token type.                                               |
| [64007](www.twilio.com/docs/api/errors/64007) | ERROR Programmable Voice <br/> Pay: Connector does not support creating charge.                                          |
| [64008](www.twilio.com/docs/api/errors/64008) | ERROR Programmable Voice <br/> Pay: Payment Gateway rejected charge creation.                                            |
| [64009](www.twilio.com/docs/api/errors/64009) | ERROR Programmable Voice <br/> Pay: Twilio is no longer authorized to initiate transactions on your behalf.              |
| [64010](www.twilio.com/docs/api/errors/64010) | ERROR Programmable Voice <br/> Pay: Payment Gateway rejected token creation.                                             |
| [64011](www.twilio.com/docs/api/errors/64011) | ERROR Programmable Voice <br/> Pay: Connector does not support the requested currency.                                   |
| [64012](www.twilio.com/docs/api/errors/64012) | ERROR Programmable Voice <br/> Pay: Payment Gateway rejected the card.                                                   |
| [64013](www.twilio.com/docs/api/errors/64013) | ERROR Programmable Voice <br/> Pay: Connector does not support supplied paymentMethod attribute.                         |
| [64014](www.twilio.com/docs/api/errors/64014) | ERROR Programmable Voice <br/> Pay: ECP/ACH requires AVSName Parameter in the \<Pay> verb.                               |
| [64015](www.twilio.com/docs/api/errors/64015) | ERROR Programmable Voice <br/> Pay: \`\<Pay>\` verb is missing a needed Parameter                                        |
| [64016](www.twilio.com/docs/api/errors/64016) | ERROR Programmable Voice <br/> Pay: Invalid Action URL                                                                   |
| [64017](www.twilio.com/docs/api/errors/64017) | ERROR Programmable Voice <br/> Pay: BankAccountType Parameter not supported with PaymentMethod = "credit-card"           |
| [64018](www.twilio.com/docs/api/errors/64018) | ERROR Programmable Voice <br/> Pay: Value needed for either Capture or Status parameters                                 |
| [64019](www.twilio.com/docs/api/errors/64019) | ERROR Programmable Voice <br/> Pay: Required payment information incomplete                                              |
| [64020](www.twilio.com/docs/api/errors/64020) | ERROR Programmable Voice <br/> Pay: Invalid Parameter Value                                                              |
| [64021](www.twilio.com/docs/api/errors/64021) | ERROR Programmable Voice <br/> Pay: Invalid Operation                                                                    |
| [64022](www.twilio.com/docs/api/errors/64022) | ERROR Programmable Voice <br/> Pay: Invalid Test Card Number                                                             |
| [64023](www.twilio.com/docs/api/errors/64023) | ERROR Programmable Voice <br/> Pay: Invalid Test Bank Account Number                                                     |
| [64024](www.twilio.com/docs/api/errors/64024) | ERROR Programmable Voice <br/> Pay: Connector Instance Not Approved                                                      |
| [64101](www.twilio.com/docs/api/errors/64101) | ERROR Programmable Voice <br/> ConversationRelay: Invalid Parameter                                                      |
| [64102](www.twilio.com/docs/api/errors/64102) | ERROR Programmable Voice <br/> ConversationRelay: Unable to Connect to Websocket URL                                     |
| [64103](www.twilio.com/docs/api/errors/64103) | ERROR Programmable Voice <br/> ConversationRelay: Internal Server Error                                                  |
| [64104](www.twilio.com/docs/api/errors/64104) | ERROR Programmable Voice <br/> ConversationRelay: Max call duration reached                                              |
| [64105](www.twilio.com/docs/api/errors/64105) | ERROR Programmable Voice <br/> ConversationRelay: Websocket ended                                                        |
| [64106](www.twilio.com/docs/api/errors/64106) | ERROR Programmable Voice <br/> ConversationRelay: Invalid argument                                                       |
| [64107](www.twilio.com/docs/api/errors/64107) | ERROR Programmable Voice <br/> ConversationRelay: Invalid Message Received                                               |
| [64108](www.twilio.com/docs/api/errors/64108) | ERROR Programmable Voice <br/> ConversationRelay: RTP Timeout                                                            |
| [64109](www.twilio.com/docs/api/errors/64109) | ERROR Programmable Voice <br/> ConversationRelay: Concurrency limit reached                                              |
| [64110](www.twilio.com/docs/api/errors/64110) | ERROR Programmable Voice <br/> ConversationRelay: Account has been opted out                                             |
| [64111](www.twilio.com/docs/api/errors/64111) | ERROR Programmable Voice <br/> ConversationRelay: TTS provider service error                                             |
| [64112](www.twilio.com/docs/api/errors/64112) | ERROR Programmable Voice <br/> ConversationRelay: TTS conversion error                                                   |
| [68001](www.twilio.com/docs/api/errors/68001) | ERROR Verify <br/> Network Error                                                                                         |
| [68002](www.twilio.com/docs/api/errors/68002) | ERROR Verify <br/> Mapper Error                                                                                          |
| [68003](www.twilio.com/docs/api/errors/68003) | ERROR Verify <br/> Storage Error                                                                                         |
| [68004](www.twilio.com/docs/api/errors/68004) | ERROR Verify <br/> Input Error                                                                                           |
| [68005](www.twilio.com/docs/api/errors/68005) | ERROR Verify <br/> Key Storage Error                                                                                     |
| [68006](www.twilio.com/docs/api/errors/68006) | ERROR Verify <br/> Initialization Error                                                                                  |
| [68007](www.twilio.com/docs/api/errors/68007) | ERROR Verify <br/> Authentication Token Error                                                                            |
| [68008](www.twilio.com/docs/api/errors/68008) | ERROR Verify <br/> Verify WhatsApp channel not configured                                                                |

[Back to top](#)

## 70000-79999

| Code                                          | Description                                                       |
| --------------------------------------------- | ----------------------------------------------------------------- |
| [70001](www.twilio.com/docs/api/errors/70001) | ERROR  <br/> Validation Failed                                    |
| [70002](www.twilio.com/docs/api/errors/70002) | ERROR  <br/> Bad request                                          |
| [70003](www.twilio.com/docs/api/errors/70003) | ERROR  <br/> Outdated Entity                                      |
| [70004](www.twilio.com/docs/api/errors/70004) | ERROR  <br/> Unauthorized                                         |
| [70005](www.twilio.com/docs/api/errors/70005) | ERROR  <br/> Failure Threshold Exceeded                           |
| [70051](www.twilio.com/docs/api/errors/70051) | ERROR  <br/> Authorization Failed                                 |
| [70052](www.twilio.com/docs/api/errors/70052) | ERROR  <br/> Public Key Client Validation Required For Account    |
| [70053](www.twilio.com/docs/api/errors/70053) | ERROR  <br/> Public Key Client Validation Not Enabled For Account |
| [70101](www.twilio.com/docs/api/errors/70101) | ERROR  <br/> Unsupported Public Key Algorithm                     |
| [70102](www.twilio.com/docs/api/errors/70102) | ERROR  <br/> Unsupported Public Key Length                        |
| [70103](www.twilio.com/docs/api/errors/70103) | ERROR  <br/> Unsupported Public Key Exponent                      |
| [70104](www.twilio.com/docs/api/errors/70104) | ERROR  <br/> Invalid Public Key                                   |
| [70105](www.twilio.com/docs/api/errors/70105) | ERROR  <br/> Invalid Type Specified in the Request                |
| [70106](www.twilio.com/docs/api/errors/70106) | ERROR  <br/> Invalid AWS credentials                              |
| [70151](www.twilio.com/docs/api/errors/70151) | ERROR  <br/> Maximum Number Of API Keys Exceeded                  |
| [70152](www.twilio.com/docs/api/errors/70152) | ERROR  <br/> Request Contains Invalid Flags                       |
| [70153](www.twilio.com/docs/api/errors/70153) | ERROR  <br/> Public Key Specified Does Not Exist                  |
| [70154](www.twilio.com/docs/api/errors/70154) | ERROR  <br/> Public Key Is Invalid                                |
| [70155](www.twilio.com/docs/api/errors/70155) | ERROR  <br/> Request Is Missing Required HTTP Headers             |
| [70156](www.twilio.com/docs/api/errors/70156) | ERROR  <br/> Request Hash Is Invalid                              |
| [70251](www.twilio.com/docs/api/errors/70251) | ERROR  <br/> Bad SSO Settings                                     |
| [70252](www.twilio.com/docs/api/errors/70252) | ERROR  <br/> Bad Saml Response                                    |
| [70253](www.twilio.com/docs/api/errors/70253) | ERROR  <br/> Invalid User Grants                                  |
| [71001](www.twilio.com/docs/api/errors/71001) | ERROR  <br/> Usage API version not eligible                       |
| [77701](www.twilio.com/docs/api/errors/77701) | ERROR Branded Comms <br/> Account Not Ready                       |

[Back to top](#)

## 80000-89999

| Code                                          | Description                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [80101](www.twilio.com/docs/api/errors/80101) | ERROR Proxy <br/> Number Already Added to Another Service                                            |
| [80102](www.twilio.com/docs/api/errors/80102) | WARNING Flex <br/> Participant Already In Interaction                                                |
| [80103](www.twilio.com/docs/api/errors/80103) | ERROR Proxy <br/> Participant Already In Session                                                     |
| [80104](www.twilio.com/docs/api/errors/80104) | WARNING Proxy <br/> Phone Number Already In Service                                                  |
| [80105](www.twilio.com/docs/api/errors/80105) | WARNING Branded Comms <br/> Short Code Already In Service                                            |
| [80201](www.twilio.com/docs/api/errors/80201) | WARNING Proxy <br/> No Available Voice Proxy                                                         |
| [80202](www.twilio.com/docs/api/errors/80202) | WARNING Proxy <br/> No Available Message Proxy                                                       |
| [80203](www.twilio.com/docs/api/errors/80203) | ERROR Proxy <br/> No Available Proxy For Country                                                     |
| [80205](www.twilio.com/docs/api/errors/80205) | WARNING Proxy <br/> No Proxies For Service                                                           |
| [80206](www.twilio.com/docs/api/errors/80206) | WARNING Proxy <br/> No Available Proxy                                                               |
| [80207](www.twilio.com/docs/api/errors/80207) | ERROR Proxy <br/>  No unreserved numbers in proxy pool.                                              |
| [80208](www.twilio.com/docs/api/errors/80208) | ERROR Proxy <br/> No Available Unused Proxy                                                          |
| [80301](www.twilio.com/docs/api/errors/80301) | ERROR Proxy <br/> Not Found Phone Number SID                                                         |
| [80303](www.twilio.com/docs/api/errors/80303) | WARNING Branded Comms <br/> Not Found Short Code Sid                                                 |
| [80304](www.twilio.com/docs/api/errors/80304) | WARNING Proxy <br/> Not Found Unmanaged Identifier                                                   |
| [80305](www.twilio.com/docs/api/errors/80305) | ERROR Proxy <br/> Not Found Unmanaged Identifier Sid                                                 |
| [80306](www.twilio.com/docs/api/errors/80306) | ERROR Proxy <br/> Not Found Chat Service                                                             |
| [80307](www.twilio.com/docs/api/errors/80307) | WARNING  <br/> Record to be updated was not found in database.                                       |
| [80308](www.twilio.com/docs/api/errors/80308) | ERROR Proxy <br/> Session with the unique name not found.                                            |
| [80401](www.twilio.com/docs/api/errors/80401) | WARNING Proxy <br/> Account Sid Invalid                                                              |
| [80402](www.twilio.com/docs/api/errors/80402) | WARNING Proxy <br/> Identifier Proxy Pair Invalid                                                    |
| [80403](www.twilio.com/docs/api/errors/80403) | WARNING Proxy <br/> Interaction Sid Invalid                                                          |
| [80404](www.twilio.com/docs/api/errors/80404) | ERROR Proxy <br/> Participant Identifier Invalid                                                     |
| [80405](www.twilio.com/docs/api/errors/80405) | WARNING Proxy <br/> Participant Sid Invalid                                                          |
| [80406](www.twilio.com/docs/api/errors/80406) | WARNING Proxy <br/> Phone Number Did Invalid                                                         |
| [80407](www.twilio.com/docs/api/errors/80407) | WARNING Proxy <br/> Phone Number Sid Invalid                                                         |
| [80408](www.twilio.com/docs/api/errors/80408) | WARNING Proxy <br/> Service Sid Invalid                                                              |
| [80409](www.twilio.com/docs/api/errors/80409) | WARNING Proxy <br/> Session Sid Invalid                                                              |
| [80501](www.twilio.com/docs/api/errors/80501) | ERROR Proxy <br/> Storage Operation Failed                                                           |
| [80502](www.twilio.com/docs/api/errors/80502) | ERROR Proxy <br/> Internal Server Error from Downstream                                              |
| [80503](www.twilio.com/docs/api/errors/80503) | WARNING Proxy <br/> No Records Updated                                                               |
| [80504](www.twilio.com/docs/api/errors/80504) | ERROR Proxy <br/> An internal server error has occurred.                                             |
| [80505](www.twilio.com/docs/api/errors/80505) | ERROR Flex <br/> Flex Configuration Error                                                            |
| [80506](www.twilio.com/docs/api/errors/80506) | ERROR Proxy <br/> Service Creation is restricted for new customers                                   |
| [80601](www.twilio.com/docs/api/errors/80601) | WARNING Proxy <br/> Phone Number Not Available                                                       |
| [80602](www.twilio.com/docs/api/errors/80602) | WARNING Proxy <br/> Non Unique Service Name                                                          |
| [80603](www.twilio.com/docs/api/errors/80603) | ERROR  <br/> Non Unique Session Name                                                                 |
| [80604](www.twilio.com/docs/api/errors/80604) | WARNING Proxy <br/> Proxy Identifier In Use                                                          |
| [80605](www.twilio.com/docs/api/errors/80605) | WARNING Proxy <br/> Proxy Identifier Not In Service                                                  |
| [80606](www.twilio.com/docs/api/errors/80606) | WARNING Proxy <br/> Proxy Identifier Not Owned By Account                                            |
| [80607](www.twilio.com/docs/api/errors/80607) | WARNING Proxy <br/> Session Closed                                                                   |
| [80608](www.twilio.com/docs/api/errors/80608) | ERROR Proxy <br/> Session Status Invalid                                                             |
| [80609](www.twilio.com/docs/api/errors/80609) | WARNING Proxy <br/> Too Many Added Participants                                                      |
| [80610](www.twilio.com/docs/api/errors/80610) | WARNING Proxy <br/> Unauthorized Operation                                                           |
| [80611](www.twilio.com/docs/api/errors/80611) | ERROR Proxy <br/> Proxy Number In Active Sessions                                                    |
| [80612](www.twilio.com/docs/api/errors/80612) | ERROR Proxy <br/> Duplicate Entry                                                                    |
| [80613](www.twilio.com/docs/api/errors/80613) | ERROR Proxy <br/> Downstream Request Rejected                                                        |
| [80614](www.twilio.com/docs/api/errors/80614) | WARNING Proxy <br/>  No Partner Participant Found                                                    |
| [80615](www.twilio.com/docs/api/errors/80615) | ERROR Proxy <br/> Account Sid on Legal Hold                                                          |
| [80616](www.twilio.com/docs/api/errors/80616) | ERROR Proxy <br/> Unsupported Identifier Type For Session Mode                                       |
| [80617](www.twilio.com/docs/api/errors/80617) | ERROR Proxy <br/> Flex Configuration Error                                                           |
| [80618](www.twilio.com/docs/api/errors/80618) | ERROR Proxy <br/> Chat Integration Error                                                             |
| [80619](www.twilio.com/docs/api/errors/80619) | ERROR Proxy <br/> Chat Channel Attribute Error                                                       |
| [80620](www.twilio.com/docs/api/errors/80620) | ERROR Proxy <br/> Chat Configured Proxy Identifier Not Found                                         |
| [80621](www.twilio.com/docs/api/errors/80621) | WARNING Proxy <br/> Requests Rate Limited on Endpoint                                                |
| [80622](www.twilio.com/docs/api/errors/80622) | ERROR Proxy <br/> Maximum Pool Size Error                                                            |
| [80623](www.twilio.com/docs/api/errors/80623) | ERROR Proxy <br/> Duplicate Participant Request                                                      |
| [80624](www.twilio.com/docs/api/errors/80624) | WARNING Proxy <br/> Approaching Maximium Number Pool Size                                            |
| [80625](www.twilio.com/docs/api/errors/80625) | ERROR Proxy <br/> Unauthorized Request. Signature is missing or is invalid                           |
| [80701](www.twilio.com/docs/api/errors/80701) | WARNING Proxy <br/> Parameter Validation Failed                                                      |
| [80801](www.twilio.com/docs/api/errors/80801) | ERROR Proxy <br/> Invalid attempt to Re-Open a Session                                               |
| [80802](www.twilio.com/docs/api/errors/80802) | ERROR Proxy <br/> Simultaneous requests to create the same Identifier in one or more Sessions        |
| [80901](www.twilio.com/docs/api/errors/80901) | WARNING Proxy <br/> Message Matched Stop Word                                                        |
| [80902](www.twilio.com/docs/api/errors/80902) | ERROR Proxy <br/> No Active Session                                                                  |
| [80903](www.twilio.com/docs/api/errors/80903) | WARNING Proxy <br/> Unknown Participant                                                              |
| [80904](www.twilio.com/docs/api/errors/80904) | WARNING Proxy <br/> Expired Proxy Session                                                            |
| [80905](www.twilio.com/docs/api/errors/80905) | WARNING Proxy <br/> Unknown Scenario                                                                 |
| [80906](www.twilio.com/docs/api/errors/80906) | WARNING Flex <br/> Interaction Not Open                                                              |
| [80907](www.twilio.com/docs/api/errors/80907) | WARNING Flex <br/> Open Interaction Not Found                                                        |
| [80908](www.twilio.com/docs/api/errors/80908) | WARNING Proxy <br/> Callback Error                                                                   |
| [80909](www.twilio.com/docs/api/errors/80909) | WARNING Proxy <br/> Inbound Contact Rejected                                                         |
| [80910](www.twilio.com/docs/api/errors/80910) | WARNING Proxy <br/> Message To Voice Only Session Rejected                                           |
| [80911](www.twilio.com/docs/api/errors/80911) | WARNING Proxy <br/> Call To Message Only Session Rejected                                            |
| [80913](www.twilio.com/docs/api/errors/80913) | ERROR Proxy <br/> Out-Of-Session Callback Error                                                      |
| [81000](www.twilio.com/docs/api/errors/81000) | WARNING Studio <br/> The Execution has exceeded max steps allowed for a flow                         |
| [81001](www.twilio.com/docs/api/errors/81001) | WARNING Studio <br/> The Widget has exceeded max steps in a loop                                     |
| [81002](www.twilio.com/docs/api/errors/81002) | WARNING Studio <br/> Unexpected event while processing Widget                                        |
| [81004](www.twilio.com/docs/api/errors/81004) | ERROR Studio <br/> Failed to add member to Chat Channel                                              |
| [81005](www.twilio.com/docs/api/errors/81005) | WARNING Studio <br/> Failed to transition because no match was found                                 |
| [81006](www.twilio.com/docs/api/errors/81006) | ERROR Studio <br/> Failed to create Chat Channel                                                     |
| [81007](www.twilio.com/docs/api/errors/81007) | ERROR Studio <br/> Connecting to a Call timed out                                                    |
| [81008](www.twilio.com/docs/api/errors/81008) | ERROR Studio <br/> Failed to connect to outgoing Call                                                |
| [81009](www.twilio.com/docs/api/errors/81009) | ERROR Studio <br/> Timed out enqueueing Call                                                         |
| [81010](www.twilio.com/docs/api/errors/81010) | ERROR Studio <br/> There was an internal error while processing a Function                           |
| [81011](www.twilio.com/docs/api/errors/81011) | ERROR Studio <br/> Failed to send Message                                                            |
| [81012](www.twilio.com/docs/api/errors/81012) | ERROR Studio <br/> Failed to update Sync service                                                     |
| [81013](www.twilio.com/docs/api/errors/81013) | ERROR Studio <br/> Failed to invoke Understand API                                                   |
| [81014](www.twilio.com/docs/api/errors/81014) | ERROR Studio <br/> There was an internal error while processing an HTTP request                      |
| [81015](www.twilio.com/docs/api/errors/81015) | ERROR Studio <br/> Failed to Create Task                                                             |
| [81016](www.twilio.com/docs/api/errors/81016) | ERROR Studio <br/> Outbound HTTP Request Failed                                                      |
| [81017](www.twilio.com/docs/api/errors/81017) | ERROR Studio <br/> Error in Twilio Function Response                                                 |
| [81018](www.twilio.com/docs/api/errors/81018) | WARNING Studio <br/> Template evaluation error in Studio widget                                      |
| [81019](www.twilio.com/docs/api/errors/81019) | ERROR Studio <br/> Twilio phone number using deprecated API version                                  |
| [81020](www.twilio.com/docs/api/errors/81020) | WARNING Studio <br/> Unsupported Trigger Type                                                        |
| [81021](www.twilio.com/docs/api/errors/81021) | ERROR Studio <br/> Flow revision must be an integer or enum(LatestPublished, LatestRevision)         |
| [81022](www.twilio.com/docs/api/errors/81022) | ERROR Studio <br/> Flow definition validation failed                                                 |
| [81023](www.twilio.com/docs/api/errors/81023) | ERROR Studio <br/> Creating an Execution via REST API failed due to malformed contact parameters     |
| [81024](www.twilio.com/docs/api/errors/81024) | ERROR Studio <br/> Subflow Error                                                                     |
| [81025](www.twilio.com/docs/api/errors/81025) | WARNING Studio <br/> Studio Flow exceeds maximum allowed widgets                                     |
| [81026](www.twilio.com/docs/api/errors/81026) | ERROR Studio <br/> Studio Execution failed because Flow exceeds maximum allowed widgets              |
| [81027](www.twilio.com/docs/api/errors/81027) | WARNING Studio <br/> Error parsing type in Studio widget                                             |
| [81028](www.twilio.com/docs/api/errors/81028) | WARNING Studio <br/> Invalid wait URL in Studio widget                                               |
| [82001](www.twilio.com/docs/api/errors/82001) | WARNING Functions <br/> Function invocation resulted in StatusCode 4xx                               |
| [82002](www.twilio.com/docs/api/errors/82002) | ERROR Functions <br/> Error on Twilio Function response                                              |
| [82003](www.twilio.com/docs/api/errors/82003) | ERROR Functions <br/> Deployment Installation Failure                                                |
| [82004](www.twilio.com/docs/api/errors/82004) | WARNING Functions <br/> Function execution resulted in a warning log                                 |
| [82005](www.twilio.com/docs/api/errors/82005) | ERROR Functions <br/> Function execution resulted in an error log                                    |
| [82006](www.twilio.com/docs/api/errors/82006) | ERROR Functions <br/> Environment Context too large                                                  |
| [82007](www.twilio.com/docs/api/errors/82007) | ERROR Functions <br/> Unsupported Runtime                                                            |
| [82008](www.twilio.com/docs/api/errors/82008) | ERROR Functions <br/> Headers or cookies too large                                                   |
| [82009](www.twilio.com/docs/api/errors/82009) | ERROR Functions <br/> Multi-valued headers not supported                                             |
| [83000](www.twilio.com/docs/api/errors/83000) | ERROR  <br/> Super SIM registration failed due to Internal Error                                     |
| [83001](www.twilio.com/docs/api/errors/83001) | ERROR  <br/> Parameter missing while registering a Super SIM                                         |
| [83002](www.twilio.com/docs/api/errors/83002) | ERROR  <br/> Super SIM cannot be registered                                                          |
| [83003](www.twilio.com/docs/api/errors/83003) | ERROR  <br/> The Super SIM already belongs to the requesting Account.                                |
| [83004](www.twilio.com/docs/api/errors/83004) | ERROR  <br/> Super SIM update operation failed due to Internal Error                                 |
| [83005](www.twilio.com/docs/api/errors/83005) | ERROR  <br/> Super SIM not found                                                                     |
| [83006](www.twilio.com/docs/api/errors/83006) | ERROR  <br/> Super SIM’s Target Fleet not found                                                      |
| [83007](www.twilio.com/docs/api/errors/83007) | ERROR  <br/> Unable to activate your Super SIM as it does not belong to a Fleet                      |
| [83008](www.twilio.com/docs/api/errors/83008) | ERROR  <br/> Unable to remove your Super SIM from its Fleet                                          |
| [83009](www.twilio.com/docs/api/errors/83009) | ERROR  <br/> Unable to update your Super SIM’s Fleet while it is in status scheduled                 |
| [83010](www.twilio.com/docs/api/errors/83010) | ERROR  <br/> Unable to update your Super SIM to the desired status                                   |
| [83011](www.twilio.com/docs/api/errors/83011) | ERROR  <br/> A Super SIM with the specified Unique Name exists already                               |
| [83400](www.twilio.com/docs/api/errors/83400) | ERROR  <br/> IP Commands error                                                                       |
| [83401](www.twilio.com/docs/api/errors/83401) | ERROR  <br/> The device was not attached to a cellular network                                       |
| [83402](www.twilio.com/docs/api/errors/83402) | ERROR  <br/> Received error response to IP Command callback request                                  |
| [83500](www.twilio.com/docs/api/errors/83500) | ERROR  <br/> No eSIM Profiles are available                                                          |
| [83600](www.twilio.com/docs/api/errors/83600) | ERROR  <br/>  An invalid parameter value was passed to the API                                       |
| [83601](www.twilio.com/docs/api/errors/83601) | ERROR  <br/> Request StartTime and/or EndTime must be aligned to UTC day boundaries                  |
| [83602](www.twilio.com/docs/api/errors/83602) | ERROR  <br/> Request StartTime and/or EndTime must be aligned to UTC hour boundaries.                |
| [83603](www.twilio.com/docs/api/errors/83603) | ERROR  <br/> The maximum allowed query period is 31 days for group by sim queries                    |
| [83604](www.twilio.com/docs/api/errors/83604) | ERROR Usage <br/> Query period exceeds the maximum allowed for the requested Granularity             |
| [83605](www.twilio.com/docs/api/errors/83605) | ERROR  <br/> StartTime parameter is too far in the past. It must be within the last 18 months.       |
| [83700](www.twilio.com/docs/api/errors/83700) | ERROR  <br/> Attachment Failed Due To Internal Error                                                 |
| [83701](www.twilio.com/docs/api/errors/83701) | ERROR  <br/> Data Session Establishment Failed Due To Internal Error                                 |
| [83702](www.twilio.com/docs/api/errors/83702) | ERROR  <br/> Attachment Rejected Due To Network Not Allowed                                          |
| [83703](www.twilio.com/docs/api/errors/83703) | ERROR  <br/> Attachment Rejected Due To Rate Limiting                                                |
| [83704](www.twilio.com/docs/api/errors/83704) | ERROR  <br/> Attachment Rejected Due To SIM In New State                                             |
| [83705](www.twilio.com/docs/api/errors/83705) | ERROR  <br/> Attachment Rejected Due To SIM In Inactive State                                        |
| [84000](www.twilio.com/docs/api/errors/84000) | WARNING  <br/> Execution has exceeded max steps allowed for a flow.                                  |
| [84001](www.twilio.com/docs/api/errors/84001) | ERROR  <br/> Workflow execution timed out.                                                           |
| [84002](www.twilio.com/docs/api/errors/84002) | ERROR  <br/> Workflow execution failed.                                                              |
| [84003](www.twilio.com/docs/api/errors/84003) | ERROR  <br/> Unable to render block.                                                                 |
| [84004](www.twilio.com/docs/api/errors/84004) | ERROR  <br/> Error while creating execution via REST API.                                            |
| [86001](www.twilio.com/docs/api/errors/86001) | ERROR Programmable Voice <br/> Invalid credential                                                    |
| [86002](www.twilio.com/docs/api/errors/86002) | ERROR Programmable Voice <br/> Session terminated: insufficient credits or funds for this credential |
| [86003](www.twilio.com/docs/api/errors/86003) | ERROR Programmable Voice <br/> Session with provider terminated due to provider issue                |
| [86004](www.twilio.com/docs/api/errors/86004) | ERROR Programmable Voice <br/> Invalid attribute                                                     |
| [86005](www.twilio.com/docs/api/errors/86005) | ERROR Programmable Voice <br/> Internal Server Error                                                 |
| [86006](www.twilio.com/docs/api/errors/86006) | ERROR Programmable Voice <br/> Max call duration reached                                             |
| [86007](www.twilio.com/docs/api/errors/86007) | ERROR Programmable Voice <br/> RTP Timeout                                                           |
| [86008](www.twilio.com/docs/api/errors/86008) | ERROR Programmable Voice <br/> Concurrency limit reached                                             |

[Back to top](#)

## 90000-99999

| Code                                          | Description                                                                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [90000](www.twilio.com/docs/api/errors/90000) | ERROR Flex <br/> Uncaught Flex JavaScript Exception                                                                                   |
| [90001](www.twilio.com/docs/api/errors/90001) | ERROR Branded Comms <br/> Message SID is invalid                                                                                      |
| [90002](www.twilio.com/docs/api/errors/90002) | ERROR Flex <br/> Too Many Errors                                                                                                      |
| [90003](www.twilio.com/docs/api/errors/90003) | ERROR Flex <br/> Unable to fetch plugins from the Custom Plugins URL                                                                  |
| [90004](www.twilio.com/docs/api/errors/90004) | ERROR Flex <br/> Message Truncated                                                                                                    |
| [90006](www.twilio.com/docs/api/errors/90006) | ERROR Branded Comms <br/> Invalid direction                                                                                           |
| [90007](www.twilio.com/docs/api/errors/90007) | ERROR Branded Comms <br/> Invalid validity period value                                                                               |
| [90009](www.twilio.com/docs/api/errors/90009) | ERROR Branded Comms <br/> The message SID already exists.                                                                             |
| [90010](www.twilio.com/docs/api/errors/90010) | ERROR  <br/> Account is not active                                                                                                    |
| [90011](www.twilio.com/docs/api/errors/90011) | ERROR  <br/> MessageSid is invalid                                                                                                    |
| [90012](www.twilio.com/docs/api/errors/90012) | ERROR  <br/> 'Recipients' list has too many items \[deprecated]                                                                       |
| [90013](www.twilio.com/docs/api/errors/90013) | ERROR  <br/> 'Template' or 'TemplateSid'&'TemplateLanguage' or 'MediaUrls' is required                                                |
| [90014](www.twilio.com/docs/api/errors/90014) | ERROR Branded Comms <br/> Validity Period should be positive integer                                                                  |
| [90015](www.twilio.com/docs/api/errors/90015) | ERROR  <br/> Body and Template (Body, Sid, Language, Args) are provided                                                               |
| [90016](www.twilio.com/docs/api/errors/90016) | ERROR  <br/> 'Template' or 'TemplateSid'/'TemplateLanguage' is required to send a Template Message                                    |
| [90017](www.twilio.com/docs/api/errors/90017) | ERROR  <br/> 'Template' and 'TemplateSid'/'TemplateLanguage' must not be specified together                                           |
| [90018](www.twilio.com/docs/api/errors/90018) | ERROR  <br/> 'Template' field is too long                                                                                             |
| [90019](www.twilio.com/docs/api/errors/90019) | ERROR  <br/> 'TemplateArgs' dictionary size is too large                                                                              |
| [90020](www.twilio.com/docs/api/errors/90020) | ERROR  <br/> One of 'TemplateArgs' dictionary key is blank                                                                            |
| [90021](www.twilio.com/docs/api/errors/90021) | ERROR  <br/> One of 'TemplateArgs' dictionary key is too long                                                                         |
| [90022](www.twilio.com/docs/api/errors/90022) | ERROR  <br/> One of 'TemplateArgs' dictionary value is too long                                                                       |
| [90023](www.twilio.com/docs/api/errors/90023) | ERROR  <br/> One of 'TemplateArgs' dictionary value is null                                                                           |
| [90024](www.twilio.com/docs/api/errors/90024) | ERROR  <br/> Template body has tag which is not provided in 'TemplateArgs'                                                            |
| [90025](www.twilio.com/docs/api/errors/90025) | ERROR  <br/> Template body has unsupported tag type                                                                                   |
| [90026](www.twilio.com/docs/api/errors/90026) | ERROR  <br/> Template body could not be parsed                                                                                        |
| [90027](www.twilio.com/docs/api/errors/90027) | ERROR  <br/> Broadcast 'FriendlyName' is too long                                                                                     |
| [90028](www.twilio.com/docs/api/errors/90028) | ERROR  <br/> Broadcast 'IdempotencyToken' is too long                                                                                 |
| [90029](www.twilio.com/docs/api/errors/90029) | ERROR  <br/> Broadcast 'CorrelationId' is empty                                                                                       |
| [90030](www.twilio.com/docs/api/errors/90030) | ERROR  <br/> Broadcast 'CorrelationId' is too long                                                                                    |
| [90031](www.twilio.com/docs/api/errors/90031) | ERROR Branded Comms <br/> Broadcast Recipients list is empty \[deprecated]                                                            |
| [90032](www.twilio.com/docs/api/errors/90032) | ERROR  <br/> Broadcast recipient's 'to' is invalid                                                                                    |
| [90033](www.twilio.com/docs/api/errors/90033) | ERROR  <br/> Broadcast recipient's 'to' is too long                                                                                   |
| [90034](www.twilio.com/docs/api/errors/90034) | ERROR  <br/> 'BroadcastStatusCallbackUrl' is too long                                                                                 |
| [90035](www.twilio.com/docs/api/errors/90035) | ERROR  <br/> Broadcast 'MessageStatusCallbackUrl' is too long                                                                         |
| [90036](www.twilio.com/docs/api/errors/90036) | ERROR  <br/> Broadcast recipient's 'body' is too long                                                                                 |
| [90037](www.twilio.com/docs/api/errors/90037) | ERROR  <br/> Broadcast has too many 'CorrelationId' items                                                                             |
| [90038](www.twilio.com/docs/api/errors/90038) | ERROR  <br/> 'BroadcastStatusCallbackUrl' is invalid                                                                                  |
| [90039](www.twilio.com/docs/api/errors/90039) | ERROR  <br/> Broadcast 'MessageStatusCallbackUrl' is invalid                                                                          |
| [90040](www.twilio.com/docs/api/errors/90040) | ERROR  <br/> Broadcast 'MediaUrls' list has too many items                                                                            |
| [90041](www.twilio.com/docs/api/errors/90041) | ERROR  <br/> Broadcast 'MediaUrl' field is too long                                                                                   |
| [90100](www.twilio.com/docs/api/errors/90100) | ERROR Understand <br/> Invalid Autopilot Actions JSON                                                                                 |
| [90101](www.twilio.com/docs/api/errors/90101) | ERROR Understand <br/> Unique Name Already Exists                                                                                     |
| [90102](www.twilio.com/docs/api/errors/90102) | ERROR Understand <br/> Assistant failure to start collection                                                                          |
| [90103](www.twilio.com/docs/api/errors/90103) | ERROR Understand <br/> Error processing answer during collection                                                                      |
| [90104](www.twilio.com/docs/api/errors/90104) | ERROR Understand <br/> Invalid Collect Field Type                                                                                     |
| [90403](www.twilio.com/docs/api/errors/90403) | ERROR Understand <br/> \[Autopilot] Signature validation failed                                                                       |
| [91000](www.twilio.com/docs/api/errors/91000) | ERROR Events <br/> Sink could not be created                                                                                          |
| [91001](www.twilio.com/docs/api/errors/91001) | ERROR Events <br/> Sink could not be found                                                                                            |
| [91002](www.twilio.com/docs/api/errors/91002) | ERROR Events <br/> Incorrect values for pagination                                                                                    |
| [91003](www.twilio.com/docs/api/errors/91003) | ERROR Events <br/> Account reached the max sink limit                                                                                 |
| [91004](www.twilio.com/docs/api/errors/91004) | ERROR Events <br/> Test event cannot be found                                                                                         |
| [91005](www.twilio.com/docs/api/errors/91005) | ERROR Events <br/> Test ID is invalid                                                                                                 |
| [91006](www.twilio.com/docs/api/errors/91006) | ERROR Events <br/> The sink sid is in an invalid format                                                                               |
| [91007](www.twilio.com/docs/api/errors/91007) | ERROR Events <br/> Sink still in use                                                                                                  |
| [91100](www.twilio.com/docs/api/errors/91100) | ERROR Events <br/> Subscription could not be created                                                                                  |
| [91101](www.twilio.com/docs/api/errors/91101) | ERROR Events <br/> Subscription could not be created                                                                                  |
| [91102](www.twilio.com/docs/api/errors/91102) | ERROR Events <br/> Subscription could not be found                                                                                    |
| [91103](www.twilio.com/docs/api/errors/91103) | ERROR Events <br/> Event type list is empty                                                                                           |
| [91104](www.twilio.com/docs/api/errors/91104) | ERROR Events <br/> Event type not found                                                                                               |
| [91201](www.twilio.com/docs/api/errors/91201) | ERROR Events <br/> Bad Request                                                                                                        |
| [91202](www.twilio.com/docs/api/errors/91202) | ERROR  <br/> Not Found                                                                                                                |
| [91203](www.twilio.com/docs/api/errors/91203) | ERROR  <br/> Method Not Allowed                                                                                                       |
| [92001](www.twilio.com/docs/api/errors/92001) | ERROR Branded Comms <br/> 'Types' Parameter Required                                                                                  |
| [92002](www.twilio.com/docs/api/errors/92002) | ERROR Branded Comms, Content <br/> The 'variables' parameter exceeds the allowed limit                                                |
| [92003](www.twilio.com/docs/api/errors/92003) | ERROR Branded Comms <br/> 'language' Parameter Required                                                                               |
| [92004](www.twilio.com/docs/api/errors/92004) | ERROR Branded Comms <br/> Invalid language code                                                                                       |
| [92005](www.twilio.com/docs/api/errors/92005) | ERROR Branded Comms, Content <br/> ContentSid Required                                                                                |
| [92006](www.twilio.com/docs/api/errors/92006) | ERROR Branded Comms, Content <br/> The Content Sid is Invalid                                                                         |
| [92007](www.twilio.com/docs/api/errors/92007) | ERROR Branded Comms <br/> The Content Variables Parameter is invalid                                                                  |
| [92008](www.twilio.com/docs/api/errors/92008) | ERROR Branded Comms, Content <br/> Unsupported Content Type                                                                           |
| [92009](www.twilio.com/docs/api/errors/92009) | ERROR Branded Comms, Content <br/> The template associated with this SID has already been submitted for approval.                     |
| [92010](www.twilio.com/docs/api/errors/92010) | ERROR Branded Comms <br/> Invalid Content update                                                                                      |
| [93100](www.twilio.com/docs/api/errors/93100) | ERROR Events <br/> Replay failed                                                                                                      |
| [93101](www.twilio.com/docs/api/errors/93101) | ERROR Events <br/> Unable to deliver events to sink                                                                                   |
| [93102](www.twilio.com/docs/api/errors/93102) | ERROR Events <br/> There was an error with your AWS role                                                                              |
| [93103](www.twilio.com/docs/api/errors/93103) | ERROR Events <br/> There was an error with your Kinesis stream                                                                        |
| [93104](www.twilio.com/docs/api/errors/93104) | ERROR Events <br/> There is an issue with the Kinesis Stream Name or Region                                                           |
| [93105](www.twilio.com/docs/api/errors/93105) | ERROR Flex <br/> Consent has already been provided for this account and vendor                                                        |
| [94000](www.twilio.com/docs/api/errors/94000) | ERROR  <br/> Transcriptions: request to transcribe audio error                                                                        |
| [94001](www.twilio.com/docs/api/errors/94001) | ERROR  <br/> Transcriptions: Invalid transcribe value                                                                                 |
| [94002](www.twilio.com/docs/api/errors/94002) | ERROR  <br/> Transcriptions: configuration not found                                                                                  |
| [94100](www.twilio.com/docs/api/errors/94100) | WARNING  <br/> Transcriptions: status callback response error                                                                         |
| [94101](www.twilio.com/docs/api/errors/94101) | WARNING  <br/> Transcriptions: status callback response timed out                                                                     |
| [94200](www.twilio.com/docs/api/errors/94200) | ERROR  <br/> Transcriptions Settings: Invalid encryptionEnabled value                                                                 |
| [94201](www.twilio.com/docs/api/errors/94201) | ERROR  <br/> Transcriptions Settings: encryptionKeySid invalid or not found                                                           |
| [94300](www.twilio.com/docs/api/errors/94300) | ERROR  <br/> Transcriptions Configurations: Invalid callback configuration                                                            |
| [94301](www.twilio.com/docs/api/errors/94301) | ERROR  <br/> Transcriptions Configurations: UniqueName is required                                                                    |
| [94302](www.twilio.com/docs/api/errors/94302) | ERROR  <br/> Transcriptions Configurations: UniqueName is invalid                                                                     |
| [94303](www.twilio.com/docs/api/errors/94303) | ERROR  <br/> Transcriptions Configurations: Language is required                                                                      |
| [94304](www.twilio.com/docs/api/errors/94304) | ERROR  <br/> Transcriptions Configurations: Language is invalid                                                                       |
| [94400](www.twilio.com/docs/api/errors/94400) | ERROR  <br/> Transcriptions: transcription internal error                                                                             |
| [94401](www.twilio.com/docs/api/errors/94401) | ERROR  <br/> Transcriptions: audio processing error                                                                                   |
| [94402](www.twilio.com/docs/api/errors/94402) | ERROR  <br/> Transcriptions: Encryption failed and transcription result files deleted                                                 |
| [94403](www.twilio.com/docs/api/errors/94403) | WARNING  <br/> Transcriptions: Invalid encryption credentials                                                                         |
| [94500](www.twilio.com/docs/api/errors/94500) | ERROR  <br/> Transcriptions: sourceSid invalid                                                                                        |
| [94501](www.twilio.com/docs/api/errors/94501) | ERROR  <br/> Transcriptions: Status invalid                                                                                           |
| [94600](www.twilio.com/docs/api/errors/94600) | ERROR  <br/> Filter limit exceeded                                                                                                    |
| [94601](www.twilio.com/docs/api/errors/94601) | ERROR  <br/> Date range is not valid                                                                                                  |
| [94602](www.twilio.com/docs/api/errors/94602) | ERROR  <br/> Invalid FromDate                                                                                                         |
| [94603](www.twilio.com/docs/api/errors/94603) | ERROR  <br/> Ttl is out of range                                                                                                      |
| [94604](www.twilio.com/docs/api/errors/94604) | ERROR  <br/> Account Sid on Legal Hold.                                                                                               |
| [95005](www.twilio.com/docs/api/errors/95005) | ERROR Understand <br/> Invalid media url                                                                                              |
| [95006](www.twilio.com/docs/api/errors/95006) | ERROR  <br/> Media url is empty                                                                                                       |
| [95100](www.twilio.com/docs/api/errors/95100) | ERROR  <br/> Failed to transcribe                                                                                                     |
| [95102](www.twilio.com/docs/api/errors/95102) | ERROR  <br/> Transcript media processing error                                                                                        |
| [95103](www.twilio.com/docs/api/errors/95103) | ERROR  <br/> Media file reached maximum size                                                                                          |
| [95104](www.twilio.com/docs/api/errors/95104) | ERROR  <br/> Invalid media type                                                                                                       |
| [95105](www.twilio.com/docs/api/errors/95105) | ERROR  <br/> Failed to download audio file                                                                                            |
| [95106](www.twilio.com/docs/api/errors/95106) | ERROR  <br/> Speech-to-Text engine error                                                                                              |
| [95108](www.twilio.com/docs/api/errors/95108) | ERROR  <br/> Failed to delete resource                                                                                                |
| [95109](www.twilio.com/docs/api/errors/95109) | ERROR  <br/> Media content is empty                                                                                                   |
| [95110](www.twilio.com/docs/api/errors/95110) | ERROR  <br/> Failed to download media: file was not found                                                                             |
| [95111](www.twilio.com/docs/api/errors/95111) | ERROR  <br/> Failed to download media file: unauthorized                                                                              |
| [95112](www.twilio.com/docs/api/errors/95112) | ERROR  <br/> Invalid sample rate found on media                                                                                       |
| [95113](www.twilio.com/docs/api/errors/95113) | ERROR  <br/> Corrupted media provided                                                                                                 |
| [95114](www.twilio.com/docs/api/errors/95114) | ERROR  <br/> Media duration is too long.                                                                                              |
| [95115](www.twilio.com/docs/api/errors/95115) | ERROR  <br/> Media has too many channels                                                                                              |
| [95116](www.twilio.com/docs/api/errors/95116) | WARNING  <br/> PCI Recordings are not supported                                                                                       |
| [95118](www.twilio.com/docs/api/errors/95118) | WARNING  <br/> Twilio Recordings with external storage are not supported                                                              |
| [95119](www.twilio.com/docs/api/errors/95119) | WARNING  <br/> Conversation Intelligence does not support encrypted recordings                                                        |
| [95120](www.twilio.com/docs/api/errors/95120) | WARNING  <br/> Twilio Recording is not in a valid status to be transcribed                                                            |
| [95121](www.twilio.com/docs/api/errors/95121) | ERROR  <br/> Public Key Encryption is disabled for this account                                                                       |
| [95122](www.twilio.com/docs/api/errors/95122) | ERROR  <br/> Twilio Recording is not found                                                                                            |
| [95123](www.twilio.com/docs/api/errors/95123) | ERROR  <br/> Public Key Encryption credential is invalid                                                                              |
| [95124](www.twilio.com/docs/api/errors/95124) | ERROR  <br/> Public Key Encryption does not support media redaction                                                                   |
| [95200](www.twilio.com/docs/api/errors/95200) | WARNING  <br/> Status callback response error                                                                                         |
| [95201](www.twilio.com/docs/api/errors/95201) | WARNING  <br/> Status callback response timed out                                                                                     |
| [95250](www.twilio.com/docs/api/errors/95250) | WARNING  <br/> AI/ML Features Addendum has not been accepted                                                                          |
| [95300](www.twilio.com/docs/api/errors/95300) | ERROR  <br/> Conversation Intelligence (classic) Service was not found                                                                |
| [95301](www.twilio.com/docs/api/errors/95301) | ERROR Programmable Voice, Understand <br/> Transcription language code does not match the Conversation Intelligence (classic) Service |
| [95302](www.twilio.com/docs/api/errors/95302) | ERROR  <br/> Conversation Intelligence Error                                                                                          |
| [95303](www.twilio.com/docs/api/errors/95303) | ERROR  <br/> Service requires redaction but request language is not available for redaction                                           |
| [95304](www.twilio.com/docs/api/errors/95304) | ERROR Understand <br/> Service requires media redaction but language is not supported for redaction                                   |
| [95400](www.twilio.com/docs/api/errors/95400) | ERROR  <br/> Configuration validation failed during processing                                                                        |
| [95402](www.twilio.com/docs/api/errors/95402) | ERROR  <br/> Operator execution timeout                                                                                               |
| [95403](www.twilio.com/docs/api/errors/95403) | ERROR  <br/> Operator output schema validation failed                                                                                 |
| [95404](www.twilio.com/docs/api/errors/95404) | ERROR  <br/> Operator guardrail violation                                                                                             |
| [95410](www.twilio.com/docs/api/errors/95410) | ERROR  <br/> Configuration validation failed                                                                                          |
| [95411](www.twilio.com/docs/api/errors/95411) | ERROR  <br/> Configuration version conflict                                                                                           |
| [95420](www.twilio.com/docs/api/errors/95420) | ERROR  <br/> Operator schema validation failed                                                                                        |
| [95421](www.twilio.com/docs/api/errors/95421) | ERROR  <br/> Operator version conflict                                                                                                |
| [97001](www.twilio.com/docs/api/errors/97001) | ERROR Account <br/> Unable to retrieve OAuth access token                                                                             |
| [99001](www.twilio.com/docs/api/errors/99001) | ERROR  <br/> General Service Error                                                                                                    |
| [99002](www.twilio.com/docs/api/errors/99002) | ERROR  <br/> Tool Execution Error                                                                                                     |
| [99003](www.twilio.com/docs/api/errors/99003) | ERROR  <br/> Guardrails input check failed                                                                                            |
| [99004](www.twilio.com/docs/api/errors/99004) | ERROR  <br/> Guardrails response check failed                                                                                         |
| [99005](www.twilio.com/docs/api/errors/99005) | ERROR  <br/> Invalid or Unresolved External Tool Endpoint                                                                             |
| [99006](www.twilio.com/docs/api/errors/99006) | ERROR  <br/> Tool input schema is invalid.                                                                                            |

[Back to top](#)

## 180000-189999

| Code                                            | Description                                                                        |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| [180017](www.twilio.com/docs/api/errors/180017) | ERROR Phone Numbers <br/> Require domestic emergency address                       |
| [181000](www.twilio.com/docs/api/errors/181000) | ERROR Programmable Voice <br/> Phone number provisioning failed - Unexpected Error |

[Back to top](#)

## 210000-219999

| Code                                            | Description                                                                      |
| ----------------------------------------------- | -------------------------------------------------------------------------------- |
| [216602](www.twilio.com/docs/api/errors/216602) | ERROR Branded Comms, Content <br/> Content Type is not supported on this channel |

[Back to top](#)

## 320000-329999

| Code                                            | Description                        |
| ----------------------------------------------- | ---------------------------------- |
| [321401](www.twilio.com/docs/api/errors/321401) | ERROR  <br/> Invalid credentials   |
| [321402](www.twilio.com/docs/api/errors/321402) | ERROR  <br/> Empty client\_id      |
| [321403](www.twilio.com/docs/api/errors/321403) | ERROR  <br/> Invalid grant\_type   |
| [321405](www.twilio.com/docs/api/errors/321405) | ERROR  <br/> Empty client\_secret  |
| [321406](www.twilio.com/docs/api/errors/321406) | ERROR  <br/> Too Many Requests     |
| [322401](www.twilio.com/docs/api/errors/322401) | ERROR  <br/> Too Many Requests     |
| [322402](www.twilio.com/docs/api/errors/322402) | ERROR  <br/> Invalid credentials   |
| [322403](www.twilio.com/docs/api/errors/322403) | ERROR  <br/> Bad Request           |
| [322501](www.twilio.com/docs/api/errors/322501) | ERROR  <br/> Internal Server Error |

[Back to top](#)

## 420000-429999

| Code                                            | Description                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------------- |
| [420001](www.twilio.com/docs/api/errors/420001) | ERROR Enterprise-Knowledge <br/> Knowledge could not be created        |
| [420002](www.twilio.com/docs/api/errors/420002) | WARNING Enterprise-Knowledge <br/> Partial knowledge refresh           |
| [420003](www.twilio.com/docs/api/errors/420003) | ERROR Enterprise-Knowledge <br/> Search query failed                   |
| [420004](www.twilio.com/docs/api/errors/420004) | ERROR Enterprise-Knowledge <br/> Content exceeds knowledge size limits |
| [420005](www.twilio.com/docs/api/errors/420005) | ERROR Enterprise-Knowledge <br/> Text resource ingest failed           |
| [420006](www.twilio.com/docs/api/errors/420006) | ERROR Enterprise-Knowledge <br/> Failed to crawl or fetch the URL      |
| [420007](www.twilio.com/docs/api/errors/420007) | WARNING Enterprise-Knowledge <br/> URL crawl partially timed out       |
| [420008](www.twilio.com/docs/api/errors/420008) | ERROR Enterprise-Knowledge <br/> File input failed                     |
| [420009](www.twilio.com/docs/api/errors/420009) | WARNING Enterprise-Knowledge <br/> Partial update, content skipped     |
| [420010](www.twilio.com/docs/api/errors/420010) | ERROR Enterprise-Knowledge <br/> Knowledge resource update failed      |
| [420011](www.twilio.com/docs/api/errors/420011) | ERROR Enterprise-Knowledge <br/> Knowledge resource deletion failed    |
| [420012](www.twilio.com/docs/api/errors/420012) | ERROR Enterprise-Knowledge <br/> Knowledge update validation failed    |
| [420013](www.twilio.com/docs/api/errors/420013) | ERROR Enterprise-Knowledge <br/> Knowledge base update failed          |
| [420014](www.twilio.com/docs/api/errors/420014) | ERROR Enterprise-Knowledge <br/> Knowledge base deletion failed        |
| [420015](www.twilio.com/docs/api/errors/420015) | ERROR Enterprise-Knowledge <br/> Knowledge search validation failed    |
| [420016](www.twilio.com/docs/api/errors/420016) | ERROR Enterprise-Knowledge <br/> Knowledge create validation failed    |
| [420017](www.twilio.com/docs/api/errors/420017) | ERROR Enterprise-Knowledge <br/> Knowledge not found                   |

[Back to top](#)

## 450000-459999

| Code                                            | Description                                                       |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| [456001](www.twilio.com/docs/api/errors/456001) | WARNING Flex <br/> Approaching Flex Plugin creation limit         |
| [456002](www.twilio.com/docs/api/errors/456002) | WARNING Flex <br/> Approaching Flex Plugin Version creation limit |

[Back to top](#)

## 520000-529999

| Code                                            | Description                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------ |
| [520001](www.twilio.com/docs/api/errors/520001) | ERROR Conversation-Memory <br/> Observation creation failed              |
| [520002](www.twilio.com/docs/api/errors/520002) | ERROR Conversation-Memory <br/> Observation update failed                |
| [520003](www.twilio.com/docs/api/errors/520003) | ERROR Conversation-Memory <br/> Observation not found                    |
| [520004](www.twilio.com/docs/api/errors/520004) | ERROR Conversation-Memory <br/> Profile already exists                   |
| [520005](www.twilio.com/docs/api/errors/520005) | ERROR Conversation-Memory <br/> Profile schema validation failed         |
| [520006](www.twilio.com/docs/api/errors/520006) | WARNING Conversation-Memory <br/> Profile created with defaults          |
| [520007](www.twilio.com/docs/api/errors/520007) | ERROR Conversation-Memory <br/> Invalid CSV format                       |
| [520008](www.twilio.com/docs/api/errors/520008) | ERROR Conversation-Memory <br/> Profile access denied                    |
| [520009](www.twilio.com/docs/api/errors/520009) | ERROR Conversation-Memory <br/> Profile not found                        |
| [520010](www.twilio.com/docs/api/errors/520010) | ERROR Conversation-Memory <br/> Bulk trait upsert failed                 |
| [520011](www.twilio.com/docs/api/errors/520011) | ERROR Conversation-Memory <br/> Trait not found                          |
| [520012](www.twilio.com/docs/api/errors/520012) | ERROR Conversation-Memory <br/> Identifier merge conflict                |
| [520013](www.twilio.com/docs/api/errors/520013) | WARNING Conversation-Memory <br/> Identifier formatting error            |
| [520014](www.twilio.com/docs/api/errors/520014) | ERROR Conversation-Memory <br/> Identifier not found                     |
| [520015](www.twilio.com/docs/api/errors/520015) | ERROR Conversation-Memory <br/> Bulk identifier add failed               |
| [520016](www.twilio.com/docs/api/errors/520016) | WARNING Conversation-Memory <br/> Identifiers skipped during bulk add    |
| [520017](www.twilio.com/docs/api/errors/520017) | ERROR Conversation-Memory <br/> Identifier not found for deletion        |
| [520018](www.twilio.com/docs/api/errors/520018) | WARNING Conversation-Memory <br/> Identifier partially deleted           |
| [520019](www.twilio.com/docs/api/errors/520019) | ERROR Conversation-Memory <br/> Trait group name already exists          |
| [520020](www.twilio.com/docs/api/errors/520020) | ERROR Conversation-Memory <br/> Trait group not found                    |
| [520021](www.twilio.com/docs/api/errors/520021) | ERROR Conversation-Memory <br/> Trait group deletion failed              |
| [520022](www.twilio.com/docs/api/errors/520022) | ERROR Conversation-Memory <br/> Memory store did not get created         |
| [520023](www.twilio.com/docs/api/errors/520023) | WARNING Conversation-Memory <br/> Memory store created with exceptions   |
| [520024](www.twilio.com/docs/api/errors/520024) | ERROR Conversation-Memory <br/> Identity resolution config error         |
| [520025](www.twilio.com/docs/api/errors/520025) | WARNING Conversation-Memory <br/> Identity resolution settings defaulted |
| [520026](www.twilio.com/docs/api/errors/520026) | ERROR Conversation-Memory <br/> Profile merge failed                     |
| [520027](www.twilio.com/docs/api/errors/520027) | WARNING Conversation-Memory <br/> Profile merge completed with conflicts |
| [520032](www.twilio.com/docs/api/errors/520032) | WARNING Conversation-Memory <br/> Profile skipped, bulk creation errors  |
| [520033](www.twilio.com/docs/api/errors/520033) | WARNING Conversation-Memory <br/> Unmapped columns skipped               |
| [520034](www.twilio.com/docs/api/errors/520034) | WARNING Conversation-Memory <br/> Identifiers skipped during bulk add    |
| [520035](www.twilio.com/docs/api/errors/520035) | ERROR Conversation-Memory <br/> Trait not deleted                        |
| [520036](www.twilio.com/docs/api/errors/520036) | ERROR Conversation-Memory <br/> CSV import / upload error                |
| [520037](www.twilio.com/docs/api/errors/520037) | ERROR Conversation-Memory <br/> Summary retrieval failed                 |
| [520038](www.twilio.com/docs/api/errors/520038) | ERROR Conversation-Memory <br/> Summary update failed                    |
| [520039](www.twilio.com/docs/api/errors/520039) | ERROR Conversation-Memory <br/> Summary deletion failed                  |
| [520040](www.twilio.com/docs/api/errors/520040) | ERROR Conversation-Memory <br/> Trait not registered                     |

[Back to top](#)

## 530000-539999

| Code                                            | Description                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| [530001](www.twilio.com/docs/api/errors/530001) | WARNING Conversation-Orchestrator <br/> Profile resolution skipped                   |
| [530002](www.twilio.com/docs/api/errors/530002) | WARNING Conversation-Orchestrator <br/> Profile lookup returned no matching profiles |
| [530003](www.twilio.com/docs/api/errors/530003) | WARNING Conversation-Orchestrator <br/> Profile lookup failed                        |
| [530004](www.twilio.com/docs/api/errors/530004) | ERROR Conversation-Orchestrator <br/> Profile creation failed                        |

[Back to top](#)
