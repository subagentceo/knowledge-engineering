# Line Status

> \[!IMPORTANT]
>
> Line Status is in Private Beta. To access request, [submit the request form](https://forms.gle/Typc1RxiN2VUKPjZA).
>
> The Private Beta phase is a tightly controlled release. This release might experience service instability, API changes, or errors. Twilio doesn't recommend that mission-critical applications depend on the availability of the service. This data package queries data from the mobile network operators' Home Location Register (HLR) and returns it as-is. Twilio doesn't guarantee its accuracy.

To validate a phone number's status on the carrier network, use Line Status. It detects whether a number is active, inactive, reachable, unreachable, or unknown. This information can help you improve your contact data quality and campaign efficiency.

## Coverage

Line Status supports phone numbers worldwide.

**Note**: Line Status might not return data for some networks. Make sure that you test the coverage for your desired country and network.

## Run Line Status

Make a [`GET /v2/PhoneNumbers/{PhoneNumber}`](/docs/lookup/v2-api#making-a-request) request with the `Fields=line_status` query parameter.

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}?Fields=line_status" \ -u
$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Response properties

A Line Status request returns the following properties.

| Property    | Description                                                               |
| :---------- | :------------------------------------------------------------------------ |
| `Status`    | The status of the requested mobile phone number.                          |
| `ErrorCode` | The [error code](/docs/api/errors), if any, associated with your request. |

### `Status` property values

The following are the possible values for the `Status` property.

| Value         | Description                                                                                                                            |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `Active`      | The number is valid and active (but not necessarily reachable) on the mobile network.                                                  |
| `Reachable`   | The number is valid and the target handset is connected to the mobile network and reachable.                                           |
| `Unreachable` | The number is valid and active on the mobile network, but the target handset is switched off or out of network reach.                  |
| `Inactive`    | The number isn't assigned to any subscriber on the mobile network or is invalid.                                                       |
| `Unknown`     | The status is unknown. This might occur due to a lack of connectivity with the target network operator or other exceptions and errors. |
