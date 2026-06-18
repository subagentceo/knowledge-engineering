> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Errors

## API errors

ElevenLabs uses standard HTTP status codes to indicate the success or failure of a request. Additionally, all API requests return a JSON object with a `detail` property that contains information about the error.

In general, a `200` HTTP status code indicates a successful request. A `4xx` code indicates a problem with the request, like an invalid parameter or missing required field. A `500` HTTP status code indicates a problem with ElevenLabs' servers, which should be rare.

### Error properties

| Property     | Description                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `type`       | The type of error that occurred. See the table below for possible values.                                                 |
| `code`       | The code of the error. These are more specific than the type, and can be used to determine the cause of the error.        |
| `message`    | The message of the error. This provides more details about the error.                                                     |
| `status`     | The status of the error. This is a legacy field that is no longer used, instead use the `code` property.                  |
| `request_id` | The request ID of the error. This is a unique identifier for the request that can be used to troubleshoot the error.      |
| `param`      | The parameter that caused the error. In the case of a validation error, this will indicate the parameter that is invalid. |

### Example error response

Here's the response for an API request that used an incorrect model ID:

```json
{
  "detail": {
    "type": "validation_error",
    "code": "invalid_parameters",
    "message": "The 'keyterms' parameter is only supported with the 'scribe_v2' model. You specified 'scribe_v1'.",
    "status": "invalid_parameters",
    "request_id": "3c807fc4c3a1705f9638ecc764a91c01",
    "param": "keyterms"
  }
}
```

Using the error properties, we can see that the error is a validation error, and the code is `invalid_parameters`. The message provides more details about the error, and the `request_id` is a unique identifier for the request that can be used to troubleshoot the error. The `param` property indicates the parameter that caused the error.

### SDK error handling

The ElevenLabs SDKs provide typed error classes that give you access to the error details.

```python
from elevenlabs import ElevenLabs, ApiError

elevenlabs = ElevenLabs()

try:
    audio = elevenlabs.text_to_speech.convert(
        voice_id="invalid-voice-id",
        model_id="eleven_v3",
        text="Hello, world!",
    )
except ApiError as e:
    print(f"Status code: {e.status_code}")

    # Access the error body
    if e.body and "detail" in e.body:
        detail = e.body["detail"]
        print(f"Error type: {detail.get('type')}")
        print(f"Error code: {detail.get('code')}")
        print(f"Message: {detail.get('message')}")
        print(f"Request ID: {detail.get('request_id')}")

        # Handle specific error types
        if detail.get("type") == "rate_limit_error":
            print("Rate limited - implement exponential backoff")
        elif detail.get("type") == "authentication_error":
            print("Check your API key")
```

```typescript
import { ElevenLabs, ElevenLabsError } from "elevenlabs";

const elevenlabs = new ElevenLabs();

try {
  const audio = await elevenlabs.textToSpeech.convert("invalid-voice-id", {
    text: "Hello, world!",
    modelId: "eleven_v3",
  });
} catch (error) {
  if (error instanceof ElevenLabsError) {
    console.log(`Status code: ${error.statusCode}`);

    // Access the error body
    const detail = (error.body as any)?.detail;
    if (detail) {
      console.log(`Error type: ${detail.type}`);
      console.log(`Error code: ${detail.code}`);
      console.log(`Message: ${detail.message}`);
      console.log(`Request ID: ${detail.request_id}`);

      // Handle specific error types
      if (detail.type === "rate_limit_error") {
        console.log("Rate limited - implement exponential backoff");
      } else if (detail.type === "authentication_error") {
        console.log("Check your API key");
      }
    }
  }
}
```

If you're unable to resolve the error, email Support at [team@elevenlabs.io](mailto:team@elevenlabs.io) with the `request_id` from the error response, the full error message, and steps to reproduce the issue.

#### Rate limiting and concurrency

If you receive a 429 HTTP status code, it means you have either made too many requests in a short period of time and exceeded the rate limit for the API endpoint, or you have exceeded the concurrency limit for the API endpoint. The error `code` will be `rate_limit_exceeded` or `concurrent_limit_exceeded` respectively.

In the case of rate limiting, you should implement exponential backoff in your code when a 429 error is received. This means adding a delay before retrying the request.

In the case of concurrency, you should wait for the current requests to complete before making new ones. See the [Concurrency and priority](/docs/overview/models#concurrency-and-priority) section for more information.

### Error types

An error comes with a `type` property that indicates the type of error that occurred. See the table below for possible values.

| Type                   | Description                                                                   | HTTP Status Code |
| ---------------------- | ----------------------------------------------------------------------------- | ---------------- |
| `validation_error`     | The request contains invalid parameter values.                                | 400              |
| `invalid_request`      | The request structure is malformed or missing required fields.                | 400              |
| `authentication_error` | Authentication failed - invalid or missing API key/token.                     | 401              |
| `payment_required`     | User has insufficient credits or payment is required.                         | 402              |
| `authorization_error`  | The authenticated user doesn't have the required permissions for this action. | 403              |
| `not_found`            | The requested resource was not found.                                         | 404              |
| `conflict`             | The request conflicts with the current state of the resource.                 | 409              |
| `rate_limit_error`     | Too many requests - try again later.                                          | 429              |
| `internal_error`       | An unexpected server error occurred.                                          | 500              |
| `service_unavailable`  | The service is temporarily unavailable, this should be a rare occurrence.     | 503              |

### Error codes

<table searchable>
  <thead>
    <tr>
      <th>
        Code
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `voice_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified voice ID does not exist. Verify the voice ID and try again.
      </td>
    </tr>

    <tr>
      <td>
        `sample_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified voice sample was not found.
      </td>
    </tr>

    <tr>
      <td>
        `voice_collection_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified voice collection does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `user_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified user was not found.
      </td>
    </tr>

    <tr>
      <td>
        `auth_account_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The authentication account was not found.
      </td>
    </tr>

    <tr>
      <td>
        `workspace_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified workspace does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `project_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified project was not found.
      </td>
    </tr>

    <tr>
      <td>
        `history_item_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified history item does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `collection_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified collection was not found.
      </td>
    </tr>

    <tr>
      <td>
        `document_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified document does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `file_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified file was not found.
      </td>
    </tr>

    <tr>
      <td>
        `conversation_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified conversation does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `agent_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified agent was not found.
      </td>
    </tr>

    <tr>
      <td>
        `dubbing_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified dubbing project does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `song_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified song was not found.
      </td>
    </tr>

    <tr>
      <td>
        `read_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified read was not found.
      </td>
    </tr>

    <tr>
      <td>
        `pronunciation_dictionary_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified pronunciation dictionary does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `knowledge_base_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified knowledge base was not found.
      </td>
    </tr>

    <tr>
      <td>
        `phone_number_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified phone number does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `tool_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified tool was not found.
      </td>
    </tr>

    <tr>
      <td>
        `snapshot_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified snapshot does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `task_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified task was not found.
      </td>
    </tr>

    <tr>
      <td>
        `model_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified model does not exist.
      </td>
    </tr>

    <tr>
      <td>
        `transcript_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified transcript was not found.
      </td>
    </tr>

    <tr>
      <td>
        `keywords_list_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified keywords list was not found.
      </td>
    </tr>

    <tr>
      <td>
        `category_not_found`
      </td>

      <td>
        `not_found`
      </td>

      <td>
        The specified category was not found.
      </td>
    </tr>

    <tr>
      <td>
        `text_too_long`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The provided text exceeds the maximum allowed length.
      </td>
    </tr>

    <tr>
      <td>
        `text_too_short`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The provided text is shorter than the minimum required length.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_text`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The provided text contains invalid characters or formatting.
      </td>
    </tr>

    <tr>
      <td>
        `empty_text`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The text field cannot be empty.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_parameters`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        One or more request parameters are invalid. Check the `param` property for the invalid
        parameter.
      </td>
    </tr>

    <tr>
      <td>
        `missing_required_field`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        A required field is missing from the request. Check the `param` property for the missing
        field.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_voice_settings`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The voice settings contain invalid values. Check the `param` property for the invalid voice
        settings.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_voice_id`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The voice ID format is invalid.
      </td>
    </tr>

    <tr>
      <td>
        `unsupported_model`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The specified model is not supported for this operation.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_audio`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The provided audio is invalid or corrupted.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_audio_format`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The specified audio format is not supported.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_output_format`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The requested output format is not supported.
      </td>
    </tr>

    <tr>
      <td>
        `audio_too_long`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The audio exceeds the maximum allowed duration.
      </td>
    </tr>

    <tr>
      <td>
        `audio_too_short`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The audio is shorter than the minimum required duration.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_file_type`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The file type is not supported.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_page_size`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The page size parameter is outside the allowed range.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_cursor`
      </td>

      <td>
        `validation_error`
      </td>

      <td>
        The pagination cursor is invalid or expired.
      </td>
    </tr>

    <tr>
      <td>
        `bad_request`
      </td>

      <td>
        `invalid_request`
      </td>

      <td>
        The request could not be understood by the server.
      </td>
    </tr>

    <tr>
      <td>
        `malformed_json`
      </td>

      <td>
        `invalid_request`
      </td>

      <td>
        The request body contains invalid JSON.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_content_type`
      </td>

      <td>
        `invalid_request`
      </td>

      <td>
        The Content-Type header is missing or invalid.
      </td>
    </tr>

    <tr>
      <td>
        `request_too_large`
      </td>

      <td>
        `invalid_request`
      </td>

      <td>
        The request body exceeds the maximum allowed size.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_api_key`
      </td>

      <td>
        `authentication_error`
      </td>

      <td>
        The provided API key is invalid.
      </td>
    </tr>

    <tr>
      <td>
        `missing_api_key`
      </td>

      <td>
        `authentication_error`
      </td>

      <td>
        No API key was provided in the request.
      </td>
    </tr>

    <tr>
      <td>
        `invalid_authorization_header`
      </td>

      <td>
        `authentication_error`
      </td>

      <td>
        The Authorization header format is invalid.
      </td>
    </tr>

    <tr>
      <td>
        `unauthorized`
      </td>

      <td>
        `authentication_error`
      </td>

      <td>
        Authentication is required to access this resource.
      </td>
    </tr>

    <tr>
      <td>
        `sign_in_required`
      </td>

      <td>
        `authentication_error`
      </td>

      <td>
        You must be signed in to perform this action.
      </td>
    </tr>

    <tr>
      <td>
        `forbidden`
      </td>

      <td>
        `authorization_error`
      </td>

      <td>
        Access to this resource is forbidden.
      </td>
    </tr>

    <tr>
      <td>
        `insufficient_permissions`
      </td>

      <td>
        `authorization_error`
      </td>

      <td>
        You do not have the required permissions for this action.
      </td>
    </tr>

    <tr>
      <td>
        `workspace_access_denied`
      </td>

      <td>
        `authorization_error`
      </td>

      <td>
        You do not have access to this workspace.
      </td>
    </tr>

    <tr>
      <td>
        `feature_not_available`
      </td>

      <td>
        `authorization_error`
      </td>

      <td>
        This feature is not available on your current plan.
      </td>
    </tr>

    <tr>
      <td>
        `subscription_required`
      </td>

      <td>
        `authorization_error`
      </td>

      <td>
        A paid subscription is required to access this feature.
      </td>
    </tr>

    <tr>
      <td>
        `voice_access_denied`
      </td>

      <td>
        `authorization_error`
      </td>

      <td>
        You do not have access to this voice.
      </td>
    </tr>

    <tr>
      <td>
        `model_access_denied`
      </td>

      <td>
        `authorization_error`
      </td>

      <td>
        You do not have access to this model.
      </td>
    </tr>

    <tr>
      <td>
        `conflict`
      </td>

      <td>
        `conflict`
      </td>

      <td>
        A conflict occurred.
      </td>
    </tr>

    <tr>
      <td>
        `resource_already_exists`
      </td>

      <td>
        `conflict`
      </td>

      <td>
        A resource with the same identifier already exists.
      </td>
    </tr>

    <tr>
      <td>
        `voice_already_exists`
      </td>

      <td>
        `conflict`
      </td>

      <td>
        A voice with this name already exists.
      </td>
    </tr>

    <tr>
      <td>
        `already_running`
      </td>

      <td>
        `conflict`
      </td>

      <td>
        The operation is already running.
      </td>
    </tr>

    <tr>
      <td>
        `already_processing`
      </td>

      <td>
        `conflict`
      </td>

      <td>
        The resource is already being processed.
      </td>
    </tr>

    <tr>
      <td>
        `concurrent_modification`
      </td>

      <td>
        `conflict`
      </td>

      <td>
        The resource was modified by another request. Retry with the latest version.
      </td>
    </tr>

    <tr>
      <td>
        `slug_already_exists`
      </td>

      <td>
        `conflict`
      </td>

      <td>
        A resource with this slug already exists.
      </td>
    </tr>

    <tr>
      <td>
        `rate_limit_exceeded`
      </td>

      <td>
        `rate_limit_error`
      </td>

      <td>
        Too many requests. Wait before retrying.
      </td>
    </tr>

    <tr>
      <td>
        `concurrent_limit_exceeded`
      </td>

      <td>
        `rate_limit_error`
      </td>

      <td>
        Maximum number of concurrent requests exceeded. Higher subscription tiers have a higher
        concurrency limit.
      </td>
    </tr>

    <tr>
      <td>
        `system_busy`
      </td>

      <td>
        `rate_limit_error`
      </td>

      <td>
        The system is currently busy. Try again later.
      </td>
    </tr>

    <tr>
      <td>
        `insufficient_credits`
      </td>

      <td>
        `payment_required`
      </td>

      <td>
        Your account does not have enough credits for this operation.
      </td>
    </tr>

    <tr>
      <td>
        `internal_error`
      </td>

      <td>
        `internal_error`
      </td>

      <td>
        An unexpected error occurred. Contact support if this persists.
      </td>
    </tr>

    <tr>
      <td>
        `service_unavailable`
      </td>

      <td>
        `service_unavailable`
      </td>

      <td>
        The service is temporarily unavailable. Try again later.
      </td>
    </tr>

    <tr>
      <td>
        `maintenance`
      </td>

      <td>
        `service_unavailable`
      </td>

      <td>
        The service is undergoing scheduled maintenance.
      </td>
    </tr>
  </tbody>
</table>