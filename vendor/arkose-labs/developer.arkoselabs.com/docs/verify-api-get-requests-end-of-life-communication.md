# Verify API GET Requests End Of Life Communication

## Why is this change happening?

As part of our ongoing efforts to enhance security and maintain compliance with industry standards, we are updating our API to eliminate the use of GET requests in Arkose Labs API, which may impact your integration.

## Reasons for Deprecation:

Sensitive data should not be used in query parameters of GET requests as they can be logged by various systems. For more information, refer to [Information exposure through query strings in url | OWASP Foundation](https://owasp.org/www-community/vulnerabilities/Information_exposure_through_query_strings_in_url) .

## What do I need to do?

We are asking all customers to migrate to POST requests for the /verify endpoint to ensure secure communication.

* **Review and update your integration**: Your implementation still uses GET requests for the /verify endpoint. Please update your system to use POST requests as soon as possible.
* **Follow our updated documentation:** Please refer to the updated documentation [Calling Verify API](https://developer.arkoselabs.com/docs/calling-verify-v4-api)  for detailed instructions on how to implement POST requests and ensure secure API calls.
* **Contact our Customer Success Team:** If you need assistance with the transition, our team is available to provide support and help you through the migration process.
* **Timeline**: Please update your systems by **April 1st, 2025** to avoid any potential disruptions.

## Who do I talk to if I have questions?

Please reach out to your CSM if you have any questions.