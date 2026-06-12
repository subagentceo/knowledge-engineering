> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Media Download Async



## OpenAPI

````yaml /api-reference/openapi.json post /v1/media/async
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/media/async:
    post:
      tags:
        - Media
      summary: Media Download Async
      requestBody:
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/MediaPayload'
                - $ref: '#/components/schemas/AsyncOptions'
              examples:
                - url: https://example.com/product-image.jpg
                  country: US
                  locale: en-US
                  expected_mime_types:
                    - image/*
                  storage:
                    url: s3://my-bucket/media/
                    type: s3
                    object_name: my-image
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/AsyncResponse'
                examples:
                  - status: success
                    task:
                      id: 52907745-7672-470e-1231-a2f8feb52944
                      state: pending
                      created_at: '2026-03-02T12:00:00.000Z'
                      modified_at: '2026-03-02T12:00:00.000Z'
                      account_name: my-account
                      api_type: media
                      input:
                        url: https://example.com/product-image.jpg
                        country: US
                        locale: en-US
                        expected_mime_types:
                          - image/*
                        storage:
                          url: s3://my-bucket/media/
                          type: s3
                          object_name: product-123
        '400':
          description: Unprocessable Entity - Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error400'
        '402':
          description: Payment Required
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error402'
        '429':
          description: Rate Limit Exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error429'
        '500':
          description: Internal Server Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error500'
      security:
        - BearerAuth: []
components:
  schemas:
    MediaPayload:
      type: object
      required:
        - url
      properties:
        url:
          type: string
          format: uri
          description: URL of the media file to download
          example: https://example.com/image.jpg
        country:
          type: string
          default: US
          minLength: 2
          maxLength: 2
          description: Country used to access the target URL, use ISO Alpha-2 Codes
          example: US
        locale:
          type: string
          description: >-
            LCID standard locale used for the URL request. Alternatively, user
            can use 'auto' for automatic locale based on geo-location
          example: en-US
        expected_mime_types:
          type: array
          items:
            type: string
          description: Allowed MIME types (supports wildcards like image/*)
          example:
            - image/*
            - video/mp4
    AsyncOptions:
      type: object
      properties:
        storage_type:
          type: string
          description: >-
            Storage type for async results. Use s3 for Amazon S3 and gs for
            Google Cloud Platform.
          enum:
            - s3
            - gs
          examples:
            - s3
        storage_url:
          type: string
          description: >-
            Repository URL where output will be saved. Format:
            s3://Your.Bucket.Name/your/object/name/prefix/ - Output will be
            saved as TASK_ID.json
          examples:
            - s3://Your.Repository.Path/
        callback_url:
          type: string
          format: uri
          description: >-
            A URL to callback once the data is delivered. The API will send a
            POST request with task details (without the requested data) when the
            task completes.
          examples:
            - https://your.callback.url/path
        storage_compress:
          type: boolean
          description: >-
            When set to true, the response saved to storage_url will be
            compressed using GZIP format. If false or not set, response will be
            saved uncompressed.
          examples:
            - false
        storage_object_name:
          type: string
          description: Custom name for the stored object instead of the default task ID
          examples:
            - my task
    AsyncResponse:
      type: object
      properties:
        status:
          type: string
          examples:
            - success
        task:
          type: object
          properties:
            id:
              type: string
              format: uuid
              description: Unique task identifier
              examples:
                - 8e8cfde8-345b-42b8-b3e2-0c61eb11e00f
            state:
              type: string
              description: Current state of the task
              enum:
                - pending
                - processing
                - completed
                - failed
              examples:
                - pending
            created_at:
              type: string
              format: date-time
              description: Task creation timestamp
              examples:
                - '2026-01-24T12:36:24.685Z'
            account_name:
              type: string
              description: The user account name
              examples:
                - my-account
            api_type:
              type: string
              description: The api endpoint used
              enum:
                - agent
                - extract
              examples:
                - extract
            modified_at:
              type: string
              format: date-time
              description: Task last modification timestamp
              examples:
                - '2026-01-24T12:36:24.685Z'
            input:
              type: object
              description: Original request input parameters
          required:
            - id
            - state
            - created_at
            - modified_at
            - input
      required:
        - status
        - task
      examples:
        - status: success
          task:
            id: 8e8cfde8-345b-42b8-b3e2-0c61eb11e00f
            state: pending
            account_name: my-account
            api_type: extract
            created_at: '2026-01-24T12:36:24.685Z'
            modified_at: '2026-01-24T12:36:24.685Z'
            input: {}
    Error400:
      type: object
      title: Error400
      properties:
        status:
          type: string
          example: failed
          examples:
            - failed
        msg:
          type: string
          description: Validation error message describing what went wrong
          example: Invalid request parameters
          examples:
            - Invalid request parameters
        error:
          type: string
          description: The validation error type
          example: PARAMETERS_FAILED_JSON_SCHEMA_VALIDATION_ERROR
          examples:
            - PARAMETERS_FAILED_JSON_SCHEMA_VALIDATION_ERROR
        details:
          type: object
          description: Detailed validation error information
          example:
            schema_validation_errors:
              - instancePath: ''
                schemaPath: '#/required'
                keyword: required
                params:
                  missingProperty: search_engine
                message: must have required property 'search_engine'
      required:
        - status
        - msg
      example:
        status: failed
        msg: Invalid request parameters
        error: PARAMETERS_FAILED_JSON_SCHEMA_VALIDATION_ERROR
        details:
          schema_validation_errors:
            - instancePath: ''
              schemaPath: '#/required'
              keyword: required
              params:
                missingProperty: search_engine
              message: must have required property 'search_engine'
    Error402:
      type: object
      title: Error402
      properties:
        status:
          type: string
          example: failed
          examples:
            - failed
        msg:
          type: string
          description: Error message indicating the payment issue
          example: trial expired
          enum:
            - no budget
            - limit reached
            - trial expired
            - trial quota finished
      required:
        - status
        - msg
      example:
        status: failed
        msg: trial expired
    Error429:
      type: object
      title: Error429
      properties:
        status:
          type: string
          example: failed
          examples:
            - failed
        msg:
          type: string
          example: Rate limit exceeded
          examples:
            - Rate limit exceeded
      required:
        - status
        - msg
      example:
        status: failed
        msg: Rate limit exceeded
    Error500:
      type: object
      title: Error500
      properties:
        success:
          type: string
          example: 'false'
          examples:
            - 'false'
        task_id:
          type: string
          example: 1ed1dbeb-8f34-4fd1-bb2d-a72bacae2ef3
          examples:
            - 1ed1dbeb-8f34-4fd1-bb2d-a72bacae2ef3
        message:
          type: string
          example: can't download the query response - please try again
          examples:
            - can't download the query response - please try again
      required:
        - success
        - task_id
        - message
      example:
        success: 'false'
        task_id: 1ed1dbeb-8f34-4fd1-bb2d-a72bacae2ef3
        message: can't download the query response - please try again
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer

````