# Error Codes

The API may send the following error codes. Other codes may be added in the future.

| Field | Description |
|  --- | --- |
| server_error | Generic server error |
| client_error | Generic client error |
| type_mismatch | The JSON value type is incorrect for the field |
| parameter_not_found | A required parameter was not supplied |
| parameter_invalid | A parameter's value is invalid |
| action_forbidden | The action is not authorized |
| conflict | There is existing data that clashes with the request data |
| api_plan_restricted | The API is not available on this App's Plan |
| rate_limit_exceeded | The rate limit for the App has been exceeded |
| unsupported | The operation is not supported |
| token_revoked | The token or API Key has been revoked |
| token_blocked | The API Key or App has been blocked |
| token_not_found | The token or API Key does not exist |
| token_unauthorized | The token or API Key is not allowed to access the resource |
| token_expired | The token is expired |
| missing_authorization | No authorization data was found on the request |
| retry_after | The client should wait for a time before retrying the request |
| job_closed | The client should start a new bulk job |
| not_restorable | This user was blocked and cannot be recreated |
| team_not_found | The team does not exist |
| team_unavailable | This team is deprecated so conversations cannot be assigned to it |
| admin_not_found | The admin does not exist |
| conversation_attribute_not_found | The conversation attribute does not exist |