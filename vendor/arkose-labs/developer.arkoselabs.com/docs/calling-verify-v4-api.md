# Calling Verify API

Requests to the Verify API can be sent via:

* An `application/json` body (POST) to the following endpoint:
  * `https://verify-api.arkoselabs.com/api/v4/verify/`
    * for development prior to a custom URL being made available.
  * `https://<company>-verify.arkoselabs.com/api/v4/verify/`
    * for development or production with a custom URL.

## POST Request Parameters

This table shows the parameters that should be included within the POST requests.

Information on the current Verify API request and response schema is in the documentation at [Verify Request and Response Schemas](https://developer.arkoselabs.com/docs/verify-request-and-response-schemas). The source information for it is at the following URLs. Please substitute your own customized URL for the descriptions and examples used in this document.

* **Verify request schema**:\
  `<company>-verify.arkoselabs.com/api/v4/verify/schema/request`

* **Verify response schema:**\
  `<company>-verify.arkoselabs.com/api/v4/verify/schema/response`

e.g.\
`https://acme-verify.arkoselabs.com/api/v4/verify/schema/request`\
`https://acme-verify.arkoselabs.com/api/v4/verify/schema/response`

Here is an example of how to get the response schema using cURL:

```curl
curl https://<company>-verify.arkoselabs.com/api/v4/verify/schema/request
```

The generic URLs will continue working until all customers are using their personalized URLs; e.g.

* `http://verify.arkoselabs.com/api/v4/verify/schema/request`
* `http://verify.arkoselabs.com/api/v4/verify/schema/response`

| Parameter Name  | Required / Optional | Description                                                                                                                                                                                                                                               |
| :-------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `private_key`   | Required            | The private key issued by Arkose Labs along with the public key used for the client-side API.                                                                                                                                                             |
| `session_token` | Required            | The token value contained within the `token` key of the client-side API response object. This object is provided within the client-side `onComplete` callback.                                                                                            |
| `log_data`      | Optional            | A freeform string that allows information to be passed to the Verify API. This can be used to pass basic information that you want stored by Arkose with the session data. This can be used internally by Arkose when performing manual traffic analysis. |

## POST request

The POST request requires the use of the request body. Below is an example of a JSON request body using the parameters from the table above. Note that you can send the `email_address` field only via POST requests.

> 👍 Arkose Email Intelligence Available As An Add-On Feature
>
> Email Intelligence, which involves assessing the risk based on the email address, is an add-on feature to Arkose Bot Manager. For more information, see the Knowledge Base (support login required) [here](https://support.arkoselabs.com/hc/en-us/articles/8695867238035-Email-Intelligence-Overview) and [here](https://support.arkoselabs.com/hc/en-us/articles/8722267392147-Email-Intelligence-API-Reference).
>
> Reach out to your CSM to check if you qualify for a free trial.

```json
{
  "private_key" : "_PRIVATE_KEY_HERE_",
  "session_token" : "_SESSION_TOKEN_HERE_",
  "log_data" : "_LOG_DATA_HERE_",
  "email_address" : "_EMAIL_ADDRESS_HERE_"
}
```