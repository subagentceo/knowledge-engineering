# Get started with toll-free verification using the API

> \[!NOTE]
>
> By adding the [Compliance Embeddable][custom-embeddable] to their website, an independent software vendor (ISV) can onboard customers without using the Toll-Free Verification (TFV) API. The Compliance Embeddable lets customers submit compliance information through a self-service workflow. To learn more, see the [blog post][custom-embeddable-post] introducing the Compliance Embeddable for Toll-Free verification. To get additional guidance, see our support article for guidance on [TFV for ISVs][tsv-4-isv].

Toll-free phone numbers for the US and Canada use the North American Numbering Plan (NANP). NANP toll-free numbers begin with `800`, `888`, `877`, `866`, `855`, `844`, or `833`. To use these numbers to send SMS messages, your organization must comply with federal regulations. Compliance requires verifying how you plan to use your phone number to send texts. To verify your NANP toll-free phone number for regulatory compliance, use the Toll-Free Verification API.

> \[!NOTE]
>
> Registration includes properties for a business registration number and related compliance information.
>
> To reduce review times and minimize the risk of rejection, provide your business registration number and related details.
> To learn more, see [Toll-Free Verification Policy for Collecting Business Registration Number](https://help.twilio.com/articles/38266268244507-Toll-Free-Verification-Policy-for-Collecting-Business-Registration-Number).

> \[!WARNING]
>
> If your organization is a **527 political organization** and you are registering for the **POLITICAL\_ELECTION\_CAMPAIGNS** use case, you MUST provide a Campaign Verify (CV) token during toll-free verification. Failure to provide a valid CV token will result in rejection of your verification request.
>
> Read the [Campaign Verify section](#campaign-verify-for-political-messaging) below before starting the TFV process.

## Create a Trust Hub Primary Customer Profile

TFV requests with Twilio require your business to have a [Trust Hub Primary Customer Profile][th-customer-profiles]. A *Primary Customer Profile* is also known as a *Primary Business Profile*.

1. Open the [Trust Hub in the Twilio Console][tw-console-th].
2. [Create your Trust Hub Primary Customer Profile][pcp-create].
3. When you reach the **Business Information** step of the **Create Profile** workflow, set the value of **Select business identity**.
   * If you plan to use Twilio in a product you sell to customers, Twilio considers you an ISV. Choose **ISV Reseller or Partner**.
   * If you plan to use Twilio to communicate directly with customers or staff, Twilio considers you a direct customer. Choose **Direct Customer**.
4. At the **Notification settings** step, provide an email address at which Twilio can contact you about the status of your request.
5. After you submit your request to Twilio, Twilio reviews it and sends a notification of approval or rejection to the email address you provided.
6. After you receive notification of your profile status, open the [Trust Hub in the Twilio Console][tw-console-th]. Twilio approved your Primary Customer Profile.\
   Your **Profile Details** page displays a **Status** of **Twilio-Approved**.
7. Copy the **Business Profile SID** value of your parent account. This SID begins with `BU` with 32 hexadecimal digits.
   To [Create a TFV request][tfv-create], you need this Business Profile SID. The Create TFV resource names this parameter `CustomerProfileSid`. These refer to the same value.

Trust Hub Customer Profiles can link to a *parent* account or a [subaccount][]. Think of a parent account as the main organization and subaccounts as departments or subsidiaries. To create a parent account, you must use the [Twilio Console][tw-console-th]. You can create subaccounts using the [Twilio TrustHub API][th-customer-profiles].

To keep customers separate, production ISV parent accounts should link Trust Hub customer profiles to subaccounts.

## Create a TFV request

To use an NANP toll-free phone number for messaging, submit a verification request for the related business. As you have an approved Primary Customer Profile, your request only needs the parameters for the TFV. To learn more, see [Required Information for Toll-Free Verification](https://help.twilio.com/articles/13264118705051) in the Twilio Help Center.

### Provide business and compliance data

To support changes to toll-free messaging policy when submitting a TFV request, include additional metadata about your business. To avoid rejection and accelerate vetting, provide this information before its required. To learn more, see [Toll-Free Verification Policy for Collecting Business Registration Number](https://help.twilio.com/articles/38266268244507) in the Twilio Help Center.

1. Make a `POST` request to the `https://messaging.twilio.com/v1/Tollfree/Verifications` resource.\
   All parameters for this request are request body parameters.

   #### Click to review the request body parameters

   ### Request body parameters

   ```json
   {"schema":{"type":"object","title":"CreateTollfreeVerificationRequest","required":["BusinessName","BusinessWebsite","NotificationEmail","UseCaseCategories","UseCaseSummary","ProductionMessageSample","OptInImageUrls","OptInType","MessageVolume","TollfreePhoneNumberSid"],"properties":{"BusinessName":{"type":"string","description":"The name of the business or organization using the Tollfree number."},"BusinessWebsite":{"type":"string","description":"The website of the business or organization using the Tollfree number."},"NotificationEmail":{"type":"string","description":"The email address to receive the notification about the verification result. ."},"UseCaseCategories":{"type":"array","nullable":true,"description":"The category of the use case for the Tollfree Number. List as many as are applicable.","refName":"tollfree_verification_enum_use_case_categories","modelName":"tollfree_verification_enum_use_case_categories","items":{"type":"string","enum":["TWO_FACTOR_AUTHENTICATION","ACCOUNT_NOTIFICATIONS","CUSTOMER_CARE","CHARITY_NONPROFIT","DELIVERY_NOTIFICATIONS","FRAUD_ALERT_MESSAGING","EVENTS","HIGHER_EDUCATION","K12","MARKETING","POLLING_AND_VOTING_NON_POLITICAL","POLITICAL_ELECTION_CAMPAIGNS","PUBLIC_SERVICE_ANNOUNCEMENT","SECURITY_ALERT"]}},"UseCaseSummary":{"type":"string","description":"Use this to further explain how messaging is used by the business or organization."},"ProductionMessageSample":{"type":"string","description":"An example of message content, i.e. a sample message."},"OptInImageUrls":{"type":"array","description":"Link to an image that shows the opt-in workflow. Multiple images allowed and must be a publicly hosted URL.","items":{"type":"string"}},"OptInType":{"type":"string","enum":["VERBAL","WEB_FORM","PAPER_FORM","VIA_TEXT","MOBILE_QR_CODE","IMPORT","IMPORT_PLEASE_REPLACE"],"description":"Describe how a user opts-in to text messages.","refName":"tollfree_verification_enum_opt_in_type","modelName":"tollfree_verification_enum_opt_in_type"},"MessageVolume":{"type":"string","description":"Estimate monthly volume of messages from the Tollfree Number."},"TollfreePhoneNumberSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","description":"The SID of the Phone Number associated with the Tollfree Verification."},"CustomerProfileSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BU[0-9a-fA-F]{32}$","description":"Customer's Profile Bundle BundleSid."},"BusinessStreetAddress":{"type":"string","description":"The address of the business or organization using the Tollfree number."},"BusinessStreetAddress2":{"type":"string","description":"The address of the business or organization using the Tollfree number."},"BusinessCity":{"type":"string","description":"The city of the business or organization using the Tollfree number."},"BusinessStateProvinceRegion":{"type":"string","description":"The state/province/region of the business or organization using the Tollfree number."},"BusinessPostalCode":{"type":"string","description":"The postal code of the business or organization using the Tollfree number."},"BusinessCountry":{"type":"string","description":"The country of the business or organization using the Tollfree number."},"AdditionalInformation":{"type":"string","description":"Additional information to be provided for verification."},"BusinessContactFirstName":{"type":"string","description":"The first name of the contact for the business or organization using the Tollfree number."},"BusinessContactLastName":{"type":"string","description":"The last name of the contact for the business or organization using the Tollfree number."},"BusinessContactEmail":{"type":"string","description":"The email address of the contact for the business or organization using the Tollfree number."},"BusinessContactPhone":{"type":"string","format":"phone-number","description":"The E.164 formatted phone number of the contact for the business or organization using the Tollfree number."},"ExternalReferenceId":{"type":"string","description":"An optional external reference ID supplied by customer and echoed back on status retrieval."},"BusinessRegistrationNumber":{"type":"string","description":"A legally recognized business registration number. Required for all business types except SOLE_PROPRIETOR."},"BusinessRegistrationAuthority":{"type":"string","nullable":true,"enum":["EIN","CBN","CRN","PROVINCIAL_NUMBER","VAT","ACN","ABN","BRN","SIREN","SIRET","NZBN","USt-IdNr","CIF","NIF","CNPJ","UID","NEQ","OTHER"],"description":"The organizational authority for business registrations. Required for all business types except SOLE_PROPRIETOR.","refName":"tollfree_verification_enum_business_registration_authority","modelName":"tollfree_verification_enum_business_registration_authority"},"BusinessRegistrationCountry":{"type":"string","description":"The country where the business is registered. Required for all business types except SOLE_PROPRIETOR."},"BusinessType":{"type":"string","enum":["PRIVATE_PROFIT","PUBLIC_PROFIT","SOLE_PROPRIETOR","NON_PROFIT","GOVERNMENT"],"nullable":true,"description":"The type of business, valid values are PRIVATE_PROFIT, PUBLIC_PROFIT, NON_PROFIT, SOLE_PROPRIETOR, GOVERNMENT. Required field.","refName":"tollfree_verification_enum_business_type","modelName":"tollfree_verification_enum_business_type"},"BusinessRegistrationPhoneNumber":{"type":"string","description":"The E.164 formatted number associated with the business."},"DoingBusinessAs":{"type":"string","description":"Trade name, sub entity, or downstream business name of business being submitted for verification"},"OptInConfirmationMessage":{"type":"string","description":"The confirmation message sent to users when they opt in to receive messages."},"HelpMessageSample":{"type":"string","description":"A sample help message provided to users."},"PrivacyPolicyUrl":{"type":"string","description":"The URL to the privacy policy for the business or organization."},"TermsAndConditionsUrl":{"type":"string","description":"The URL to the terms and conditions for the business or organization."},"AgeGatedContent":{"type":"boolean","description":"Indicates if the content is age gated."},"OptInKeywords":{"type":"array","description":"List of keywords that users can text in to opt in to receive messages.","items":{"type":"string"}},"VettingProvider":{"type":"string","nullable":true,"enum":["CAMPAIGN_VERIFY"],"description":"The third-party political vetting provider.","refName":"tollfree_verification_enum_vetting_provider","modelName":"tollfree_verification_enum_vetting_provider"},"VettingId":{"type":"string","description":"The unique ID of the vetting"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"BusinessName\": \"Owl, Inc.\",\n  \"BusinessStreetAddress\": \"123 Main Street\",\n  \"BusinessStreetAddress2\": \"Suite 101\",\n  \"BusinessCity\": \"Anytown\",\n  \"BusinessStateProvinceRegion\": \"AA\",\n  \"BusinessPostalCode\": \"11111\",\n  \"BusinessCountry\": \"US\",\n  \"BusinessWebsite\": \"http://www.company.com\",\n  \"BusinessContactFirstName\": \"firstname\",\n  \"BusinessContactLastName\": \"lastname\",\n  \"BusinessContactEmail\": \"email@company.com\",\n  \"BusinessContactPhone\": \"+11231231234\",\n  \"NotificationEmail\": \"support@company.com\",\n  \"UseCaseCategories\": [\n    \"POLITICAL_ELECTION_CAMPAIGNS\"\n  ],\n  \"UseCaseSummary\": \"This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop\",\n  \"ProductionMessageSample\": \"lorem ipsum\",\n  \"OptInImageUrls\": [\n    \"https://testbusiness.com/images/image1.jpg\",\n    \"https://testbusiness.com/images/image2.jpg\"\n  ],\n  \"OptInType\": \"VERBAL\",\n  \"MessageVolume\": \"10\",\n  \"AdditionalInformation\": \"see our privacy policy here www.johnscoffeeshop.com/privacypolicy\",\n  \"TollfreePhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ExternalReferenceId\": \"abc123xyz567\",\n  \"BusinessRegistrationNumber\": \"123456789\",\n  \"BusinessRegistrationAuthority\": \"EIN\",\n  \"BusinessRegistrationCountry\": \"US\",\n  \"BusinessType\": \"PRIVATE_PROFIT\",\n  \"BusinessRegistrationPhoneNumber\": \"+13023334444\",\n  \"DoingBusinessAs\": \"Toms Widgets\",\n  \"AgeGatedContent\": false,\n  \"HelpMessageSample\": \"For help, reply HELP or visit our website.\",\n  \"OptInConfirmationMessage\": \"Thank you for opting in!\",\n  \"OptInKeywords\": [\n    \"START\"\n  ],\n  \"PrivacyPolicyUrl\": \"https://www.example.com/privacy\",\n  \"TermsAndConditionsUrl\": \"https://www.example.com/terms\",\n  \"VettingId\": \"cv|1.0|mno|tfree|a9792599-2156-457a-985b-f9045789b139|osfj78f1qrtue37\",\n  \"VettingProvider\": \"CAMPAIGN_VERIFY\"\n}","meta":"","code":"{\n  \"BusinessName\": \"Owl, Inc.\",\n  \"BusinessStreetAddress\": \"123 Main Street\",\n  \"BusinessStreetAddress2\": \"Suite 101\",\n  \"BusinessCity\": \"Anytown\",\n  \"BusinessStateProvinceRegion\": \"AA\",\n  \"BusinessPostalCode\": \"11111\",\n  \"BusinessCountry\": \"US\",\n  \"BusinessWebsite\": \"http://www.company.com\",\n  \"BusinessContactFirstName\": \"firstname\",\n  \"BusinessContactLastName\": \"lastname\",\n  \"BusinessContactEmail\": \"email@company.com\",\n  \"BusinessContactPhone\": \"+11231231234\",\n  \"NotificationEmail\": \"support@company.com\",\n  \"UseCaseCategories\": [\n    \"POLITICAL_ELECTION_CAMPAIGNS\"\n  ],\n  \"UseCaseSummary\": \"This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop\",\n  \"ProductionMessageSample\": \"lorem ipsum\",\n  \"OptInImageUrls\": [\n    \"https://testbusiness.com/images/image1.jpg\",\n    \"https://testbusiness.com/images/image2.jpg\"\n  ],\n  \"OptInType\": \"VERBAL\",\n  \"MessageVolume\": \"10\",\n  \"AdditionalInformation\": \"see our privacy policy here www.johnscoffeeshop.com/privacypolicy\",\n  \"TollfreePhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ExternalReferenceId\": \"abc123xyz567\",\n  \"BusinessRegistrationNumber\": \"123456789\",\n  \"BusinessRegistrationAuthority\": \"EIN\",\n  \"BusinessRegistrationCountry\": \"US\",\n  \"BusinessType\": \"PRIVATE_PROFIT\",\n  \"BusinessRegistrationPhoneNumber\": \"+13023334444\",\n  \"DoingBusinessAs\": \"Toms Widgets\",\n  \"AgeGatedContent\": false,\n  \"HelpMessageSample\": \"For help, reply HELP or visit our website.\",\n  \"OptInConfirmationMessage\": \"Thank you for opting in!\",\n  \"OptInKeywords\": [\n    \"START\"\n  ],\n  \"PrivacyPolicyUrl\": \"https://www.example.com/privacy\",\n  \"TermsAndConditionsUrl\": \"https://www.example.com/terms\",\n  \"VettingId\": \"cv|1.0|mno|tfree|a9792599-2156-457a-985b-f9045789b139|osfj78f1qrtue37\",\n  \"VettingProvider\": \"CAMPAIGN_VERIFY\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"BusinessName\"","#7EE787"],[":","#C9D1D9"]," ",["\"Owl, Inc.\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessStreetAddress\"","#7EE787"],[":","#C9D1D9"]," ",["\"123 Main Street\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessStreetAddress2\"","#7EE787"],[":","#C9D1D9"]," ",["\"Suite 101\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessCity\"","#7EE787"],[":","#C9D1D9"]," ",["\"Anytown\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessStateProvinceRegion\"","#7EE787"],[":","#C9D1D9"]," ",["\"AA\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessPostalCode\"","#7EE787"],[":","#C9D1D9"]," ",["\"11111\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessCountry\"","#7EE787"],[":","#C9D1D9"]," ",["\"US\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessWebsite\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.company.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessContactFirstName\"","#7EE787"],[":","#C9D1D9"]," ",["\"firstname\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessContactLastName\"","#7EE787"],[":","#C9D1D9"]," ",["\"lastname\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessContactEmail\"","#7EE787"],[":","#C9D1D9"]," ",["\"email@company.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessContactPhone\"","#7EE787"],[":","#C9D1D9"]," ",["\"+11231231234\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"NotificationEmail\"","#7EE787"],[":","#C9D1D9"]," ",["\"support@company.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UseCaseCategories\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"POLITICAL_ELECTION_CAMPAIGNS\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"UseCaseSummary\"","#7EE787"],[":","#C9D1D9"]," ",["\"This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ProductionMessageSample\"","#7EE787"],[":","#C9D1D9"]," ",["\"lorem ipsum\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"OptInImageUrls\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://testbusiness.com/images/image1.jpg\"","#A5D6FF"],[",","#C9D1D9"],"\n    ",["\"https://testbusiness.com/images/image2.jpg\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"OptInType\"","#7EE787"],[":","#C9D1D9"]," ",["\"VERBAL\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessageVolume\"","#7EE787"],[":","#C9D1D9"]," ",["\"10\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AdditionalInformation\"","#7EE787"],[":","#C9D1D9"]," ",["\"see our privacy policy here www.johnscoffeeshop.com/privacypolicy\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TollfreePhoneNumberSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ExternalReferenceId\"","#7EE787"],[":","#C9D1D9"]," ",["\"abc123xyz567\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessRegistrationNumber\"","#7EE787"],[":","#C9D1D9"]," ",["\"123456789\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessRegistrationAuthority\"","#7EE787"],[":","#C9D1D9"]," ",["\"EIN\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessRegistrationCountry\"","#7EE787"],[":","#C9D1D9"]," ",["\"US\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessType\"","#7EE787"],[":","#C9D1D9"]," ",["\"PRIVATE_PROFIT\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessRegistrationPhoneNumber\"","#7EE787"],[":","#C9D1D9"]," ",["\"+13023334444\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DoingBusinessAs\"","#7EE787"],[":","#C9D1D9"]," ",["\"Toms Widgets\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AgeGatedContent\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"HelpMessageSample\"","#7EE787"],[":","#C9D1D9"]," ",["\"For help, reply HELP or visit our website.\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"OptInConfirmationMessage\"","#7EE787"],[":","#C9D1D9"]," ",["\"Thank you for opting in!\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"OptInKeywords\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"START\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PrivacyPolicyUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://www.example.com/privacy\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TermsAndConditionsUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://www.example.com/terms\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VettingId\"","#7EE787"],[":","#C9D1D9"]," ",["\"cv|1.0|mno|tfree|a9792599-2156-457a-985b-f9045789b139|osfj78f1qrtue37\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VettingProvider\"","#7EE787"],[":","#C9D1D9"]," ",["\"CAMPAIGN_VERIFY\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"create2":{"value":{"lang":"json","value":"{\n  \"CustomerProfileSid\": \"BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"BusinessName\": \"Owl, Inc.\",\n  \"BusinessWebsite\": \"http://www.company.com\",\n  \"NotificationEmail\": \"support@company.com\",\n  \"UseCaseCategories\": [\n    \"TWO_FACTOR_AUTHENTICATION\",\n    \"MARKETING\"\n  ],\n  \"UseCaseSummary\": \"This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop\",\n  \"ProductionMessageSample\": \"lorem ipsum\",\n  \"OptInImageUrls\": [\n    \"https://testbusiness.com/images/image1.jpg\",\n    \"https://testbusiness.com/images/image2.jpg\"\n  ],\n  \"OptInType\": \"VERBAL\",\n  \"MessageVolume\": \"10\",\n  \"AdditionalInformation\": \"see our privacy policy here www.johnscoffeeshop.com/privacypolicy\",\n  \"TollfreePhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ExternalReferenceId\": \"abc123xyz567\",\n  \"BusinessRegistrationNumber\": \"123456789\",\n  \"BusinessRegistrationAuthority\": \"EIN\",\n  \"BusinessRegistrationCountry\": \"US\",\n  \"BusinessType\": \"PRIVATE_PROFIT\",\n  \"BusinessRegistrationPhoneNumber\": \"+13023334444\",\n  \"DoingBusinessAs\": \"Toms Widgets\",\n  \"AgeGatedContent\": false,\n  \"HelpMessageSample\": \"For help, reply HELP or visit our website.\",\n  \"OptInConfirmationMessage\": \"Thank you for opting in!\",\n  \"OptInKeywords\": [\n    \"START\"\n  ],\n  \"PrivacyPolicyUrl\": \"https://www.example.com/privacy\",\n  \"TermsAndConditionsUrl\": \"https://www.example.com/terms\"\n}","meta":"","code":"{\n  \"CustomerProfileSid\": \"BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"BusinessName\": \"Owl, Inc.\",\n  \"BusinessWebsite\": \"http://www.company.com\",\n  \"NotificationEmail\": \"support@company.com\",\n  \"UseCaseCategories\": [\n    \"TWO_FACTOR_AUTHENTICATION\",\n    \"MARKETING\"\n  ],\n  \"UseCaseSummary\": \"This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop\",\n  \"ProductionMessageSample\": \"lorem ipsum\",\n  \"OptInImageUrls\": [\n    \"https://testbusiness.com/images/image1.jpg\",\n    \"https://testbusiness.com/images/image2.jpg\"\n  ],\n  \"OptInType\": \"VERBAL\",\n  \"MessageVolume\": \"10\",\n  \"AdditionalInformation\": \"see our privacy policy here www.johnscoffeeshop.com/privacypolicy\",\n  \"TollfreePhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ExternalReferenceId\": \"abc123xyz567\",\n  \"BusinessRegistrationNumber\": \"123456789\",\n  \"BusinessRegistrationAuthority\": \"EIN\",\n  \"BusinessRegistrationCountry\": \"US\",\n  \"BusinessType\": \"PRIVATE_PROFIT\",\n  \"BusinessRegistrationPhoneNumber\": \"+13023334444\",\n  \"DoingBusinessAs\": \"Toms Widgets\",\n  \"AgeGatedContent\": false,\n  \"HelpMessageSample\": \"For help, reply HELP or visit our website.\",\n  \"OptInConfirmationMessage\": \"Thank you for opting in!\",\n  \"OptInKeywords\": [\n    \"START\"\n  ],\n  \"PrivacyPolicyUrl\": \"https://www.example.com/privacy\",\n  \"TermsAndConditionsUrl\": \"https://www.example.com/terms\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"CustomerProfileSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessName\"","#7EE787"],[":","#C9D1D9"]," ",["\"Owl, Inc.\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessWebsite\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.company.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"NotificationEmail\"","#7EE787"],[":","#C9D1D9"]," ",["\"support@company.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UseCaseCategories\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"TWO_FACTOR_AUTHENTICATION\"","#A5D6FF"],[",","#C9D1D9"],"\n    ",["\"MARKETING\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"UseCaseSummary\"","#7EE787"],[":","#C9D1D9"]," ",["\"This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ProductionMessageSample\"","#7EE787"],[":","#C9D1D9"]," ",["\"lorem ipsum\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"OptInImageUrls\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://testbusiness.com/images/image1.jpg\"","#A5D6FF"],[",","#C9D1D9"],"\n    ",["\"https://testbusiness.com/images/image2.jpg\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"OptInType\"","#7EE787"],[":","#C9D1D9"]," ",["\"VERBAL\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessageVolume\"","#7EE787"],[":","#C9D1D9"]," ",["\"10\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AdditionalInformation\"","#7EE787"],[":","#C9D1D9"]," ",["\"see our privacy policy here www.johnscoffeeshop.com/privacypolicy\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TollfreePhoneNumberSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ExternalReferenceId\"","#7EE787"],[":","#C9D1D9"]," ",["\"abc123xyz567\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessRegistrationNumber\"","#7EE787"],[":","#C9D1D9"]," ",["\"123456789\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessRegistrationAuthority\"","#7EE787"],[":","#C9D1D9"]," ",["\"EIN\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessRegistrationCountry\"","#7EE787"],[":","#C9D1D9"]," ",["\"US\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessType\"","#7EE787"],[":","#C9D1D9"]," ",["\"PRIVATE_PROFIT\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"BusinessRegistrationPhoneNumber\"","#7EE787"],[":","#C9D1D9"]," ",["\"+13023334444\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DoingBusinessAs\"","#7EE787"],[":","#C9D1D9"]," ",["\"Toms Widgets\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AgeGatedContent\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"HelpMessageSample\"","#7EE787"],[":","#C9D1D9"]," ",["\"For help, reply HELP or visit our website.\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"OptInConfirmationMessage\"","#7EE787"],[":","#C9D1D9"]," ",["\"Thank you for opting in!\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"OptInKeywords\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"START\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PrivacyPolicyUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://www.example.com/privacy\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TermsAndConditionsUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://www.example.com/terms\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
   ```

   > \[!NOTE]
   >
   > **Note about Campaign Verify parameters:** The `VettingId` and `VettingProvider` parameters shown in this example are **REQUIRED** if your organization is a 527 political organization and if you are registering for the POLITICAL\_ELECTION\_CAMPAIGNS use case. For all other organizations and use cases, these parameters are optional. See the [Campaign Verify section](#campaign-verify-for-political-messaging) for details.

   Submit a TFV Request using your Customer Profile

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function createTollfreeVerification() {
     const tollfreeVerification =
       await client.messaging.v1.tollfreeVerifications.create({
         additionalInformation: "privacy policy is geo-locked to NAMER region",
         businessName: "Owl, Inc.",
         businessWebsite: "http://www.example.com",
         customerProfileSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         messageVolume: "10",
         notificationEmail: "support@example.com",
         optInImageUrls: [
           "https://example.com/images/image1.jpg",
           "https://example.com/images/image2.jpg",
         ],
         optInType: "VERBAL",
         productionMessageSample: "lorem ipsum",
         tollfreePhoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         useCaseCategories: ["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
         useCaseSummary:
           "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
         vettingId:
           "cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4",
         vettingProvider: "CAMPAIGN_VERIFY",
       });

     console.log(tollfreeVerification.sid);
   }

   createTollfreeVerification();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   tollfree_verification = client.messaging.v1.tollfree_verifications.create(
       customer_profile_sid="BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
       business_name="Owl, Inc.",
       business_website="http://www.example.com",
       notification_email="support@example.com",
       use_case_categories=["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
       use_case_summary="This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
       production_message_sample="lorem ipsum",
       opt_in_image_urls=[
           "https://example.com/images/image1.jpg",
           "https://example.com/images/image2.jpg",
       ],
       opt_in_type="VERBAL",
       message_volume="10",
       additional_information="privacy policy is geo-locked to NAMER region",
       tollfree_phone_number_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
       vetting_id="cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4",
       vetting_provider="CAMPAIGN_VERIFY",
   )

   print(tollfree_verification.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Messaging.V1;
   using System.Threading.Tasks;
   using System.Collections.Generic;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var tollfreeVerification = await TollfreeVerificationResource.CreateAsync(
               customerProfileSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
               businessName: "Owl, Inc.",
               businessWebsite: "http://www.example.com",
               notificationEmail: "support@example.com",
               useCaseCategories: new List<string> { "TWO_FACTOR_AUTHENTICATION", "MARKETING" },
               useCaseSummary: "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
               productionMessageSample: "lorem ipsum",
               optInImageUrls: new List<
                   string> { "https://example.com/images/image1.jpg", "https://example.com/images/image2.jpg" },
               optInType: TollfreeVerificationResource.OptInTypeEnum.Verbal,
               messageVolume: "10",
               additionalInformation: "privacy policy is geo-locked to NAMER region",
               tollfreePhoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
               vettingId: "cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4",
               vettingProvider: TollfreeVerificationResource.VettingProviderEnum.CampaignVerify);

           Console.WriteLine(tollfreeVerification.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import java.util.Arrays;
   import com.twilio.Twilio;
   import com.twilio.rest.messaging.v1.TollfreeVerification;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           TollfreeVerification tollfreeVerification =
               TollfreeVerification
                   .creator("Owl, Inc.",
                       "http://www.example.com",
                       "support@example.com",
                       Arrays.asList("TWO_FACTOR_AUTHENTICATION", "MARKETING"),
                       "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
                       "lorem ipsum",
                       Arrays.asList("https://example.com/images/image1.jpg", "https://example.com/images/image2.jpg"),
                       TollfreeVerification.OptInType.VERBAL,
                       "10",
                       "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                   .setCustomerProfileSid("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                   .setAdditionalInformation("privacy policy is geo-locked to NAMER region")
                   .setVettingId(
                       "cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4")
                   .setVettingProvider(TollfreeVerification.VettingProvider.CAMPAIGN_VERIFY)
                   .create();

           System.out.println(tollfreeVerification.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	params := &messaging.CreateTollfreeVerificationParams{}
   	params.SetCustomerProfileSid("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
   	params.SetBusinessName("Owl, Inc.")
   	params.SetBusinessWebsite("http://www.example.com")
   	params.SetNotificationEmail("support@example.com")
   	params.SetUseCaseCategories([]string{
   		"TWO_FACTOR_AUTHENTICATION",
   		"MARKETING",
   	})
   	params.SetUseCaseSummary("This number is used to send out promotional offers and coupons to the customers of Owl, Inc.")
   	params.SetProductionMessageSample("lorem ipsum")
   	params.SetOptInImageUrls([]string{
   		"https://example.com/images/image1.jpg",
   		"https://example.com/images/image2.jpg",
   	})
   	params.SetOptInType("VERBAL")
   	params.SetMessageVolume("10")
   	params.SetAdditionalInformation("privacy policy is geo-locked to NAMER region")
   	params.SetTollfreePhoneNumberSid("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
   	params.SetVettingId("cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4")
   	params.SetVettingProvider("CAMPAIGN_VERIFY")

   	resp, err := client.MessagingV1.CreateTollfreeVerification(params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $tollfree_verification = $twilio->messaging->v1->tollfreeVerifications->create(
       "Owl, Inc.", // BusinessName
       "http://www.example.com", // BusinessWebsite
       "support@example.com", // NotificationEmail
       ["TWO_FACTOR_AUTHENTICATION", "MARKETING"], // UseCaseCategories
       "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.", // UseCaseSummary
       "lorem ipsum", // ProductionMessageSample
       [
           "https://example.com/images/image1.jpg",
           "https://example.com/images/image2.jpg",
       ], // OptInImageUrls
       "VERBAL", // OptInType
       "10", // MessageVolume
       "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // TollfreePhoneNumberSid
       [
           "customerProfileSid" => "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
           "additionalInformation" =>
               "privacy policy is geo-locked to NAMER region",
           "vettingId" =>
               "cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4",
           "vettingProvider" => "CAMPAIGN_VERIFY",
       ]
   );

   print $tollfree_verification->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   tollfree_verification = @client
                           .messaging
                           .v1
                           .tollfree_verifications
                           .create(
                             customer_profile_sid: 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                             business_name: 'Owl, Inc.',
                             business_website: 'http://www.example.com',
                             notification_email: 'support@example.com',
                             use_case_categories: [
                               'TWO_FACTOR_AUTHENTICATION',
                               'MARKETING'
                             ],
                             use_case_summary: 'This number is used to send out promotional offers and coupons to the customers of Owl, Inc.',
                             production_message_sample: 'lorem ipsum',
                             opt_in_image_urls: [
                               'https://example.com/images/image1.jpg',
                               'https://example.com/images/image2.jpg'
                             ],
                             opt_in_type: 'VERBAL',
                             message_volume: '10',
                             additional_information: 'privacy policy is geo-locked to NAMER region',
                             tollfree_phone_number_sid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                             vetting_id: 'cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4',
                             vetting_provider: 'CAMPAIGN_VERIFY'
                           )

   puts tollfree_verification.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:messaging:v1:tollfree:verifications:create \
      --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
      --business-name "Owl, Inc." \
      --business-website http://www.example.com \
      --notification-email support@example.com \
      --use-case-categories TWO_FACTOR_AUTHENTICATION MARKETING \
      --use-case-summary "This number is used to send out promotional offers and coupons to the customers of Owl, Inc." \
      --production-message-sample "lorem ipsum" \
      --opt-in-image-urls https://example.com/images/image1.jpg https://example.com/images/image2.jpg \
      --opt-in-type VERBAL \
      --message-volume 10 \
      --additional-information "privacy policy is geo-locked to NAMER region" \
      --tollfree-phone-number-sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
      --vetting-id "cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4" \
      --vetting-provider CAMPAIGN_VERIFY
   ```

   ```bash
   curl -X POST "https://messaging.twilio.com/v1/Tollfree/Verifications" \
   --data-urlencode "CustomerProfileSid=BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   --data-urlencode "BusinessName=Owl, Inc." \
   --data-urlencode "BusinessWebsite=http://www.example.com" \
   --data-urlencode "NotificationEmail=support@example.com" \
   --data-urlencode "UseCaseCategories=TWO_FACTOR_AUTHENTICATION" \
   --data-urlencode "UseCaseCategories=MARKETING" \
   --data-urlencode "UseCaseSummary=This number is used to send out promotional offers and coupons to the customers of Owl, Inc." \
   --data-urlencode "ProductionMessageSample=lorem ipsum" \
   --data-urlencode "OptInImageUrls=https://example.com/images/image1.jpg" \
   --data-urlencode "OptInImageUrls=https://example.com/images/image2.jpg" \
   --data-urlencode "OptInType=VERBAL" \
   --data-urlencode "MessageVolume=10" \
   --data-urlencode "AdditionalInformation=privacy policy is geo-locked to NAMER region" \
   --data-urlencode "TollfreePhoneNumberSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   --data-urlencode "VettingId=cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4" \
   --data-urlencode "VettingProvider=CAMPAIGN_VERIFY" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   Twilio reviews TFV requests within three business days.
2. Check the status of your TFV request.

   Check one TFV request

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function fetchTollfreeVerification() {
     const tollfreeVerification = await client.messaging.v1
       .tollfreeVerifications("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       .fetch();

     console.log(tollfreeVerification.sid);
   }

   fetchTollfreeVerification();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   tollfree_verification = client.messaging.v1.tollfree_verifications(
       "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
   ).fetch()

   print(tollfree_verification.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Messaging.V1;
   using System.Threading.Tasks;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var tollfreeVerification = await TollfreeVerificationResource.FetchAsync(
               pathSid: "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

           Console.WriteLine(tollfreeVerification.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.Twilio;
   import com.twilio.rest.messaging.v1.TollfreeVerification;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           TollfreeVerification tollfreeVerification =
               TollfreeVerification.fetcher("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

           System.out.println(tollfreeVerification.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	resp, err := client.MessagingV1.FetchTollfreeVerification("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $tollfree_verification = $twilio->messaging->v1
       ->tollfreeVerifications("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       ->fetch();

   print $tollfree_verification->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   tollfree_verification = @client
                           .messaging
                           .v1
                           .tollfree_verifications('HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                           .fetch

   puts tollfree_verification.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:messaging:v1:tollfree:verifications:fetch \
      --sid HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   ```

   ```bash
   curl -X GET "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   If you don't have your TFV request SID, use the API to get a list of TFV SIDs for your related toll-free number.

   #### Click to review the get list of TFV SIDs API request

   Get list of TFV requests

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function listTollfreeVerification() {
     const tollfreeVerifications =
       await client.messaging.v1.tollfreeVerifications.list({
         tollfreePhoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         limit: 20,
       });

     tollfreeVerifications.forEach((t) => console.log(t.sid));
   }

   listTollfreeVerification();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   tollfree_verifications = client.messaging.v1.tollfree_verifications.list(
       tollfree_phone_number_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit=20
   )

   for record in tollfree_verifications:
       print(record.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Messaging.V1;
   using System.Threading.Tasks;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var tollfreeVerifications = await TollfreeVerificationResource.ReadAsync(
               tollfreePhoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

           foreach (var record in tollfreeVerifications) {
               Console.WriteLine(record.Sid);
           }
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.Twilio;
   import com.twilio.rest.messaging.v1.TollfreeVerification;
   import com.twilio.base.ResourceSet;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           ResourceSet<TollfreeVerification> tollfreeVerifications =
               TollfreeVerification.reader()
                   .setTollfreePhoneNumberSid("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                   .limit(20)
                   .read();

           for (TollfreeVerification record : tollfreeVerifications) {
               System.out.println(record.getSid());
           }
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	params := &messaging.ListTollfreeVerificationParams{}
   	params.SetTollfreePhoneNumberSid("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
   	params.SetLimit(20)

   	resp, err := client.MessagingV1.ListTollfreeVerification(params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		for record := range resp {
   			if resp[record].Sid != nil {
   				fmt.Println(*resp[record].Sid)
   			} else {
   				fmt.Println(resp[record].Sid)
   			}
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $tollfreeVerifications = $twilio->messaging->v1->tollfreeVerifications->read(
       ["tollfreePhoneNumberSid" => "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
       20
   );

   foreach ($tollfreeVerifications as $record) {
       print $record->sid;
   }
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   tollfree_verifications = @client
                            .messaging
                            .v1
                            .tollfree_verifications
                            .list(
                              tollfree_phone_number_sid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              limit: 20
                            )

   tollfree_verifications.each do |record|
      puts record.sid
   end
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:messaging:v1:tollfree:verifications:list \
      --tollfree-phone-number-sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   ```

   ```bash
   curl -X GET "https://messaging.twilio.com/v1/Tollfree/Verifications?TollfreePhoneNumberSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=20" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```
3. Look for the `status` property in the response.

   ```json title="Response to a Check TFV request"
   // !focus(2,8,40,41)
   {
     "sid": "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "regulated_item_sid": null,
     "trust_product_sid": null,
     "business_name": "Owl, Inc.",
     "status": "PENDING_REVIEW",
     "date_created": "2021-01-27T14:18:35Z",
     "date_updated": "2021-01-27T14:18:36Z",
     "business_street_address": "123 Main Street",
     "business_street_address2": "Suite 101",
     "business_city": "Anytown",
     "business_state_province_region": "AA",
     "business_postal_code": "11111",
     "business_country": "US",
     "business_website": "http://www.example.com",
     "business_contact_first_name": "firstname",
     "business_contact_last_name": "lastname",
     "business_contact_email": "email@company.com",
     "business_contact_phone": "+11231231234",
     "notification_email": "support@example.com",
     "use_case_categories": [
       "TWO_FACTOR_AUTHENTICATION",
       "MARKETING"
     ],
     "use_case_summary": "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
     "production_message_sample": "lorem ipsum",
     "opt_in_image_urls": [
       "https://testbusiness.com/images/image1.jpg",
       "https://testbusiness.com/images/image2.jpg"
     ],
     "opt_in_type": "VERBAL",
     "message_volume": "10",
     "additional_information": "privacy policy is geo-locked to NAMER region",
     "tollfree_phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "rejection_reason": null,
     "error_code": null,
     "edit_expiration": null,
     "edit_allowed": null,
     "rejection_reasons": null,
     "resource_links": {},
     "url": "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "external_reference_id": "abc123xyz567",

       // New response fields for the 2026 update
      "business_registration_number": "123456789",
      "business_registration_authority": "EIN",
      "business_registration_country": "US",
      "doing_business_as": "Other Company",
      "business_type": "PRIVATE_PROFIT",
      "opt_in_confirmation_sample": "Opt in sample message",
      "help_message_sample": "Help sample",
      "privacy_policy_url": "http://www.example.com/privacy",
      "terms_and_condition_url": "http://www.example.com/terms",
      "age_gated_content": false,
      "opt_in_keywords": "STOP",
      
      // New response fields for CV Token update
      "vetting_id": "cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4",       
      "vetting_provider": "CAMPAIGN_VERIFY",
      "vetting_id_expiration": "2027-01-31T23:59:59Z"

   }
   ```

   If Twilio approved your TFV request, `status` reads as `"status": "TWILIO_APPROVED"`. The verified toll-free number can send Application to Person (A2P) SMS messages with minimal traffic filtering.

If you don't have a Trust Hub Customer Profile, you can create one at the same time as submitting your TFV request. To learn how to perform both tasks at once, see [this variation on the Create TFV request][pcp-create-with-tfv].

## Fix a rejected TFV request

If Twilio rejected your TFV request, your check request displays `"status": "TWILIO_REJECTED"`. The toll-free number isn't verified and you [can't use it to send messages][cant-send-sms]. To review common rejection reasons, see [Why Was My Toll-Free Verification Rejected?][tfv-reject] in the Twilio Help Center.

If the response includes `"edit_allowed": true`, you can resubmit your TFV request.

1. Check the status of your [TFV request][tfv-status-response].
2. In the response, find two properties:
   * The `edit_allowed` property
     * If this value is set to `true`, you can edit the TFV request and resubmit it.
     * You must submit the TFV request before the timestamp provided in the `edit_expiration` property. Twilio sets this property value to seven days from the initial request. After that date, the TFV request expires and you need to create another.
   * The `rejection_reasons` property array
     * This array returns the list of reasons why Twilio rejected your TFV as a human-readable `reason` and a `code` that links to details on this error.
3. To correct any errors in your TFV request, use the [**Edit a TFV Request** resource][edit-tfv-api].

   Edit a TFV Request

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function updateTollfreeVerification() {
     const tollfreeVerification = await client.messaging.v1
       .tollfreeVerifications("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       .update({
         additionalInformation:
           "See our privacy policy at www.example.com/privacypolicy",
         editReason: "Updated the ProductionMessageSample",
         messageVolume: "1,000",
         optInImageUrls: [
           "https://example.com/images/image1.jpg",
           "https://example.com/images/image2.jpg",
         ],
         optInType: "VERBAL",
         productionMessageSample:
           "Get 10% off when you save this coupon: https://bit.ly/owlcoupon",
         useCaseCategories: ["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
         useCaseSummary:
           "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
       });

     console.log(tollfreeVerification.sid);
   }

   updateTollfreeVerification();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   tollfree_verification = client.messaging.v1.tollfree_verifications(
       "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
   ).update(
       edit_reason="Updated the ProductionMessageSample",
       use_case_categories=["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
       use_case_summary="This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
       production_message_sample="Get 10% off when you save this coupon: https://bit.ly/owlcoupon",
       opt_in_image_urls=[
           "https://example.com/images/image1.jpg",
           "https://example.com/images/image2.jpg",
       ],
       opt_in_type="VERBAL",
       message_volume="1,000",
       additional_information="See our privacy policy at www.example.com/privacypolicy",
   )

   print(tollfree_verification.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Messaging.V1;
   using System.Threading.Tasks;
   using System.Collections.Generic;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var tollfreeVerification = await TollfreeVerificationResource.UpdateAsync(
               editReason: "Updated the ProductionMessageSample",
               useCaseCategories: new List<string> { "TWO_FACTOR_AUTHENTICATION", "MARKETING" },
               useCaseSummary: "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
               productionMessageSample: "Get 10% off when you save this coupon: https://bit.ly/owlcoupon",
               optInImageUrls: new List<
                   string> { "https://example.com/images/image1.jpg", "https://example.com/images/image2.jpg" },
               optInType: TollfreeVerificationResource.OptInTypeEnum.Verbal,
               messageVolume: "1,000",
               additionalInformation: "See our privacy policy at www.example.com/privacypolicy",
               pathSid: "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

           Console.WriteLine(tollfreeVerification.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import java.util.Arrays;
   import com.twilio.Twilio;
   import com.twilio.rest.messaging.v1.TollfreeVerification;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           TollfreeVerification tollfreeVerification =
               TollfreeVerification.updater("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                   .setEditReason("Updated the ProductionMessageSample")
                   .setUseCaseCategories(Arrays.asList("TWO_FACTOR_AUTHENTICATION", "MARKETING"))
                   .setUseCaseSummary(
                       "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.")
                   .setProductionMessageSample("Get 10% off when you save this coupon: https://bit.ly/owlcoupon")
                   .setOptInImageUrls(
                       Arrays.asList("https://example.com/images/image1.jpg", "https://example.com/images/image2.jpg"))
                   .setOptInType(TollfreeVerification.OptInType.VERBAL)
                   .setMessageVolume("1,000")
                   .setAdditionalInformation("See our privacy policy at www.example.com/privacypolicy")
                   .update();

           System.out.println(tollfreeVerification.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	params := &messaging.UpdateTollfreeVerificationParams{}
   	params.SetEditReason("Updated the ProductionMessageSample")
   	params.SetUseCaseCategories([]string{
   		"TWO_FACTOR_AUTHENTICATION",
   		"MARKETING",
   	})
   	params.SetUseCaseSummary("This number is used to send out promotional offers and coupons to the customers of Owl, Inc.")
   	params.SetProductionMessageSample("Get 10% off when you save this coupon: https://bit.ly/owlcoupon")
   	params.SetOptInImageUrls([]string{
   		"https://example.com/images/image1.jpg",
   		"https://example.com/images/image2.jpg",
   	})
   	params.SetOptInType("VERBAL")
   	params.SetMessageVolume("1,000")
   	params.SetAdditionalInformation("See our privacy policy at www.example.com/privacypolicy")

   	resp, err := client.MessagingV1.UpdateTollfreeVerification("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
   		params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $tollfree_verification = $twilio->messaging->v1
       ->tollfreeVerifications("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       ->update([
           "editReason" => "Updated the ProductionMessageSample",
           "useCaseCategories" => ["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
           "useCaseSummary" =>
               "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
           "productionMessageSample" =>
               "Get 10% off when you save this coupon: https://bit.ly/owlcoupon",
           "optInImageUrls" => [
               "https://example.com/images/image1.jpg",
               "https://example.com/images/image2.jpg",
           ],
           "optInType" => "VERBAL",
           "messageVolume" => "1,000",
           "additionalInformation" =>
               "See our privacy policy at www.example.com/privacypolicy",
       ]);

   print $tollfree_verification->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   tollfree_verification = @client
                           .messaging
                           .v1
                           .tollfree_verifications('HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                           .update(
                             edit_reason: 'Updated the ProductionMessageSample',
                             use_case_categories: [
                               'TWO_FACTOR_AUTHENTICATION',
                               'MARKETING'
                             ],
                             use_case_summary: 'This number is used to send out promotional offers and coupons to the customers of Owl, Inc.',
                             production_message_sample: 'Get 10% off when you save this coupon: https://bit.ly/owlcoupon',
                             opt_in_image_urls: [
                               'https://example.com/images/image1.jpg',
                               'https://example.com/images/image2.jpg'
                             ],
                             opt_in_type: 'VERBAL',
                             message_volume: '1,000',
                             additional_information: 'See our privacy policy at www.example.com/privacypolicy'
                           )

   puts tollfree_verification.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:messaging:v1:tollfree:verifications:update \
      --sid HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
      --edit-reason "Updated the ProductionMessageSample" \
      --use-case-categories TWO_FACTOR_AUTHENTICATION MARKETING \
      --use-case-summary "This number is used to send out promotional offers and coupons to the customers of Owl, Inc." \
      --production-message-sample "Get 10% off when you save this coupon: https://bit.ly/owlcoupon" \
      --opt-in-image-urls https://example.com/images/image1.jpg https://example.com/images/image2.jpg \
      --opt-in-type VERBAL \
      --message-volume 1,000 \
      --additional-information "See our privacy policy at www.example.com/privacypolicy"
   ```

   ```bash
   curl -X POST "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   --data-urlencode "EditReason=Updated the ProductionMessageSample" \
   --data-urlencode "UseCaseCategories=TWO_FACTOR_AUTHENTICATION" \
   --data-urlencode "UseCaseCategories=MARKETING" \
   --data-urlencode "UseCaseSummary=This number is used to send out promotional offers and coupons to the customers of Owl, Inc." \
   --data-urlencode "ProductionMessageSample=Get 10% off when you save this coupon: https://bit.ly/owlcoupon" \
   --data-urlencode "OptInImageUrls=https://example.com/images/image1.jpg" \
   --data-urlencode "OptInImageUrls=https://example.com/images/image2.jpg" \
   --data-urlencode "OptInType=VERBAL" \
   --data-urlencode "MessageVolume=1,000" \
   --data-urlencode "AdditionalInformation=See our privacy policy at www.example.com/privacypolicy" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "regulated_item_sid": null,
     "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "trust_product_sid": null,
     "status": "PENDING_REVIEW",
     "date_created": "2021-01-27T14:18:35Z",
     "date_updated": "2021-01-27T14:18:36Z",
     "business_name": "Owl, Inc.",
     "business_street_address": "123 Main Street",
     "business_street_address2": "Suite 101",
     "business_city": "Anytown",
     "business_state_province_region": "AA",
     "business_postal_code": "11111",
     "business_country": "US",
     "business_website": "http://www.company.com",
     "business_contact_first_name": "firstname",
     "business_contact_last_name": "lastname",
     "business_contact_email": "email@company.com",
     "business_contact_phone": "+11231231234",
     "notification_email": "support@company.com",
     "use_case_categories": [
       "TWO_FACTOR_AUTHENTICATION",
       "MARKETING"
     ],
     "use_case_summary": "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
     "production_message_sample": "Get 10% off when you save this coupon: https://bit.ly/owlcoupon",
     "opt_in_image_urls": [
       "https://example.com/images/image1.jpg",
       "https://example.com/images/image2.jpg"
     ],
     "opt_in_type": "VERBAL",
     "message_volume": "1,000",
     "additional_information": "See our privacy policy at www.example.com/privacypolicy",
     "tollfree_phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "rejection_reason": null,
     "error_code": null,
     "edit_expiration": null,
     "edit_allowed": null,
     "rejection_reasons": null,
     "resource_links": {},
     "url": "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "external_reference_id": null,
     "business_registration_number": "123456789",
     "business_registration_authority": "EIN",
     "business_registration_country": "US",
     "business_type": "PRIVATE_PROFIT",
     "business_registration_phone_number": "+13023334444",
     "doing_business_as": "Toms Widgets",
     "age_gated_content": false,
     "help_message_sample": "For help, reply HELP or visit our website.",
     "opt_in_confirmation_message": "Thank you for opting in!",
     "opt_in_keywords": [
       "START"
     ],
     "privacy_policy_url": "https://www.example.com/privacy",
     "terms_and_conditions_url": "https://www.example.com/terms",
     "tollfree_phone_number": "+18003334444",
     "vetting_id": null,
     "vetting_id_expiration": null,
     "vetting_provider": null
   }
   ```
4. Check your [TFV request status][tfv-status].

## Delete a failed TFV request

If you can't edit your TFV request, delete it. The delete resource requires the SID for the Verification record to delete. This SID starts with `HH` followed by 32 other hexadecimal digits.

If you don't have your TFV request SID, use the API to get a list of TFV SIDs for your related toll-free number.

#### Click to review the get list of TFV SIDs API request

Get list of TFV requests

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTollfreeVerification() {
  const tollfreeVerifications =
    await client.messaging.v1.tollfreeVerifications.list({
      tollfreePhoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      limit: 20,
    });

  tollfreeVerifications.forEach((t) => console.log(t.sid));
}

listTollfreeVerification();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

tollfree_verifications = client.messaging.v1.tollfree_verifications.list(
    tollfree_phone_number_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit=20
)

for record in tollfree_verifications:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollfreeVerifications = await TollfreeVerificationResource.ReadAsync(
            tollfreePhoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in tollfreeVerifications) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.TollfreeVerification;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollfreeVerification> tollfreeVerifications =
            TollfreeVerification.reader()
                .setTollfreePhoneNumberSid("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .limit(20)
                .read();

        for (TollfreeVerification record : tollfreeVerifications) {
            System.out.println(record.getSid());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.ListTollfreeVerificationParams{}
	params.SetTollfreePhoneNumberSid("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	params.SetLimit(20)

	resp, err := client.MessagingV1.ListTollfreeVerification(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
			}
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$tollfreeVerifications = $twilio->messaging->v1->tollfreeVerifications->read(
    ["tollfreePhoneNumberSid" => "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
    20
);

foreach ($tollfreeVerifications as $record) {
    print $record->sid;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

tollfree_verifications = @client
                         .messaging
                         .v1
                         .tollfree_verifications
                         .list(
                           tollfree_phone_number_sid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                           limit: 20
                         )

tollfree_verifications.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:tollfree:verifications:list \
   --tollfree-phone-number-sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://messaging.twilio.com/v1/Tollfree/Verifications?TollfreePhoneNumberSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Delete a TFV request record

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteTollfreeVerification() {
  await client.messaging.v1
    .tollfreeVerifications("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteTollfreeVerification();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messaging.v1.tollfree_verifications(
    "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await TollfreeVerificationResource.DeleteAsync(
            pathSid: "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.TollfreeVerification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TollfreeVerification.deleter("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	err := client.MessagingV1.DeleteTollfreeVerification("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$twilio->messaging->v1
    ->tollfreeVerifications("HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .messaging
  .v1
  .tollfree_verifications('HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:tollfree:verifications:remove \
   --sid HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Campaign Verify for Political Messaging

> \[!NOTE]
>
> This section applies to 527 political organizations registering for the POLITICAL\_ELECTION\_CAMPAIGNS use case for toll-free messaging.

Campaign Verify is a secure, non-partisan verification solution for US political organizations who wish to engage with voters via toll-free messaging.

All organizations sending political communications on behalf of a federal, state, or local political campaign must [be verified by Campaign Verify](https://www.campaignverify.org/#signup) to complete toll-free verification for political use cases.

> \[!WARNING]
>
> You should read the Campaign Verify [FAQ](https://www.campaignverify.org/faq) before continuing with this guide, as this process involves fees and identity verification.

### When Campaign Verify tokens are required

A Campaign Verify token is **REQUIRED** for toll-free verification when:

1. **Your organization is a 527 political organization**
2. **And you select POLITICAL\_ELECTION\_CAMPAIGNS** as a use case category.

Without a valid CV token, your toll-free verification will be rejected if you meet these criterias.

### Obtaining a Campaign Verify token

Verification involves submitting information about your political organization to Campaign Verify, as well as verifying your identity as an authorized person associated with the political organization.

1. Visit [Campaign Verify](https://www.campaignverify.org/#signup) to begin the verification process
2. Complete identity verification and provide required organization information
3. After approval, Campaign Verify issues you a CV token
4. Provide this CV token during TFV registration using the `VettingId` and `VettingProvider` parameters

### Campaign Verify token format

A full CV token is composed of 6 pipe (|) delimited fields, for example:

..`cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4`

When submitting your TFV request:

* Set `VettingProvider` to `CAMPAIGN_VERIFY`
* Set `VettingId` to your full CV token (all 6 fields, including the pipes)
* The token is case-sensitive and must match the format provided by Campaign Verify exactly

### Token expiration and management

* CV tokens expire after a period of time (expiration date provided by Campaign Verify)
* The `vetting_id_expiration` field in the TFV response shows when your token expires
* The CV token must be registered for the organization entity listed on the token. If your TFV request is rejected with an error code related to Campaign Verify, check that the token is valid and registered to the correct organization.
* If you are ISV and multiple customers sending political messaging, each customer needs a separate CV token.
* To update an expired token, edit your existing TFV request with a new CV token

> \[!WARNING]
>
> An organization that does not provide a Campaign Verify token when required will have their toll-free verification rejected. Even if approved without a token initially, carriers may block political messaging traffic that is not properly verified through Campaign Verify.

[cant-send-sms]: https://help.twilio.com/articles/5377174717595-Toll-Free-Message-Verification-for-US-Canada#h_01GTCNPTVZFNCK8FFNYRDD2TZR

[custom-embeddable-post]: https://www.twilio.com/en-us/blog/ISV-Compliance-Embeddable

[custom-embeddable]: /docs/messaging/compliance/toll-free/compliance-embeddable-onboarding

[edit-tfv-api]: /docs/messaging/api/tollfree-verification-resource#edit-one-tfv-request

[pcp-create-with-tfv]: /docs/messaging/api/tollfree-verification-resource#submit-one-tfv-request-without-an-existing-customer-profile

[pcp-create]: /docs/trust-hub/trusthub-rest-api/console-create-a-primary-customer-profile

[subaccount]: /docs/iam/api/subaccounts

[tfv-create]: /docs/messaging/compliance/toll-free/api-onboarding#create-a-tfv-request

[tfv-reject]: https://help.twilio.com/articles/9321443984155

[tfv-status-response]: #response-to-a-check-tfv-request

[tfv-status]: #code-check-one-tfv-request

[th-customer-profiles]: /docs/trust-hub/trusthub-rest-api/customer-profiles

[tsv-4-isv]: https://help.twilio.com/hc/en-us/articles/13263383206299-Toll-Free-Verification-for-ISVs

[tw-console-th]: https://console.twilio.com/us1/account/trust-hub/overview
