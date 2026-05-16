# Truth Data API

To automatically send Truth Data to Arkose, please follow the steps below:

**Step 1:** Create a Client ID and Client Secret pair via Arkose Command Center. You can do this by navigating to the sidebar > Manage > API Access > Tokens > Create Token. Add a description for your use. This is a one-time action and the same ID and secret can be used by all the keys under your account.

**Step 2:** Generate an authorization token for the client ID and secret by calling [https://client-api.arkoselabs.com/truth\_data\_api/v1/authorize](https://client-api.arkoselabs.com/truth_data_api/v1/authorize).

**Request Body:**

```json
{
  "client_id": "",
  "client_secret": ""
}
```

This method then verifies and authenticates the client id and secret via Auth0. Auth0 creates an access token that is valid for 24 hours. **You need to get an authorization token every 24 hours by implementing checks that monitor the "expires\_in" value to avoid unnecessary token creation on every request.**

```json
{
    "access_token": "<token>"
    "token_type": "Bearer",
    "expires_in": 86400
}
```

**Step 3:** Use the token received to invoke Arkose Labs Truth Data API. API URL: [https://client-api.arkoselabs.com/truth\_data\_api/v1/stream\_data](https://client-api.arkoselabs.com/truth_data_api/v1/stream_data)

The request body needs to be as the following:

```json
Request Header:
{
   Authorization: [Bearer <token>]
}
Request Body:
{
   "arkose_session_id": "32560e3747191b697.1304102202", // mandatory
   "public_key": "D6A0C8E8-F7E7-4A39-A515-5BE578369101", // mandatory
   "session_create_timestamp": "2021-10-30 12:31:29", // optional
   "decision_timestamp": "2021-10-30 12:31:30", // optional
   "is_legit": 0, // mandatory
   "event_type": 2, // optional
   "fraud_category": 3, // optional
   "fraud_type": 2 // optional
}
```

<Callout icon="📘" theme="info">
  Please let your Customer Success Manager know if you can't view the API Access section in Arkose Command Center.
</Callout>

## Truth Data API Fields

For the optional fields that accept string enums, Arkose improves our analysis by doing a strict validation against the defined enums. Please contact us if you want an additional enum added to the list.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        **Mandatory/Optional**
      </th>

      <th>
        **Description**
      </th>

      <th>
        **Format**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `arkose_session_id`
      </td>

      <td>
        Mandatory
      </td>

      <td>
        A primary link between the truth data and its Arkose session.
      </td>

      <td>
        `11663602dda317f65.6750167505`
      </td>
    </tr>

    <tr>
      <td>
        `public_key`
      </td>

      <td>
        Mandatory
      </td>

      <td>
        Public key against which the session was originally generated.

        *\***Sending a wrong public key will significantly impact Arkose Labs' ability to process these truth data sessions correctly.***
      </td>

      <td>
        `1F662B05-B798-D2A3-B687-C1D43DD4EB76`
      </td>
    </tr>

    <tr>
      <td>
        `session_create_time`
      </td>

      <td>
        Optional
      </td>

      <td>
        The date and timestamp when the customer created the session.
      </td>

      <td>
        `YYYY-MM-DD HH:MM:SS`
      </td>
    </tr>

    <tr>
      <td>
        `decision_time`
      </td>

      <td>
        Optional
      </td>

      <td>
        The date and timestamp when the customer decided if the session was good or bad.
      </td>

      <td>
        `YYYY-MM-DD HH:MM:SS`
      </td>
    </tr>

    <tr>
      <td>
        `is_legit`
      </td>

      <td>
        Mandatory
      </td>

      <td>
        A high level overview of whether the customer considers the session legit or non-legit.
      </td>

      <td>
        `0` (indicates non-legit)\
        `1` (indicates legit)
      </td>
    </tr>

    <tr>
      <td>
        `event_type`
      </td>

      <td>
        Optional
      </td>

      <td>
        Stage of a user’s lifecycle where the event occurred. This data helps Arkose create appropriate algorithms tailored to the specific event type, thus reducing false positives.
      </td>

      <td>
        `1` (registration)

        `2` (login)

        `3` (password\_reset)

        `4` (account\_settings)

        `5` (transaction)
      </td>
    </tr>

    <tr>
      <td>
        `fraud_category`
      </td>

      <td>
        Optional
      </td>

      <td>
        The overarching category that the fraud falls in. This information helps Arkose tune the appropriate algorithm’s parameters, thus reducing false positives.
      </td>

      <td>
        `1` (automation)

        `2`(fraud\_farm)

        `3` (human\_driven)
      </td>
    </tr>

    <tr>
      <td>
        `fraud_type`
      </td>

      <td>
        Optional
      </td>

      <td>
        A granular view of the committed fraud. This helps Arkose create and improve algorithms tailored to specific fraud type and/or verticals, improving our overall accuracy.
      </td>

      <td>
        `1 `(fake\_email)

        `2 `(fake\_phone\_number)

        `3` (stolen\_financial\_instrument)

        `4` (fraudulent\_chargeback)

        `5` (social\_engineering\_attempt)
      </td>
    </tr>
  </tbody>
</Table>

## Sending Batch Data Via the Truth Data API

To send batch requests, follow the steps:

**Step 1:** Create a Client ID and Client Secret pair via Arkose Command Center. You can do this by navigating to the sidebar > Manage > API Access > Tokens > Create Token. Add a description for your use. This is a one-time action and the same ID and Secret can be used by all the keys under your account.

**Step 2:** Generate an authorization token for the client ID and secret by calling [https://client-api.arkoselabs.com/truth\_data\_api/v1/authorize](https://client-api.arkoselabs.com/truth_data_api/v1/authorize).

**Request Body:**

```json
{
  "client_id": "",
  "client_secret": ""
}
```

This method then verifies and authenticates the client id and secret via Auth0. Auth0 creates an access token that is valid for 24 hours. **You need to get an authorization token every 24 hours by implementing checks that monitor the expires\_in value to avoid unnecessary token creation on every request.**

```json
{
    "access_token": "<token>"
    "token_type": "Bearer",
    "expires_in": 86400
}
```

**Step 3:** Use the token received to invoke the Arkose Labs Truth Data API. API URL: [https://client-api.arkoselabs.com/truth\_data\_api/v1/batch\_data](https://client-api.arkoselabs.com/truth_data_api/v1/batch_data)

The request body needs to be as the following:

```json
Request Header:
{
   Authorization: [Bearer <token>]
}
Request Body:
{"sessions": [{
   "arkose_session_id": "32560e3747191b697.1304102202", // mandatory
   "public_key": "D6A0C8E8-F7E7-4A39-A515-5BE578369101", // mandatory
   "session_create_timestamp": "2021-10-30 12:31:29", // optional
   "decision_timestamp": "2021-10-30 12:31:30", // optional
   "is_legit": 0, // mandatory
   "event_type": 2, // optional
   "fraud_category": 3, // optional
   "fraud_type": 2 // optional,
}, {
  "arkose_session_id": "42560e3747191b697.1304102202",
  "public_key": "07EAB4B8-2D80-4234-B897-A2CD1F194866",
  "session_create_timestamp": "2025-05-10 12:31:29",
  "decision_timestamp": "2025-05-10 12:31:30",
  "is_legit": 1,
  "event_type": 1
}]}
```

**Note:** 500 session limit per 1 batch request

**Sample Batch Response:**

* `200`: Call Succeeded
* `400`: Bad Request
* `401`: Unauthorized
* `500`: Internal Service Error
* `501`: The server does not support the functionality required to fulfill the request