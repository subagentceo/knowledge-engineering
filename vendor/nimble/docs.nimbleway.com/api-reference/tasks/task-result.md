> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Task Result

> Retrieve the status and results of an async task by ID. Works for all async task types (extract, search, map, agent, crawl).



## OpenAPI

````yaml /openapi.json get /v1/tasks/{task_id}/results
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/tasks/{task_id}/results:
    get:
      tags:
        - Tasks
      summary: Task Result
      description: >-
        Retrieve the status and results of an async task by ID. Works for all
        async task types (extract, search, map, agent, crawl).
      parameters:
        - in: path
          name: task_id
          schema:
            type: string
            format: uuid
            description: The unique identifier of the async task
            examples:
              - 8e8cfde8-345b-42b8-b3e2-0c61eb11e00f
          required: true
          description: The unique identifier of the async task
      responses:
        '200':
          description: Async Task Results
          content:
            application/json:
              schema:
                anyOf:
                  - $ref: '#/components/schemas/AgentResponse'
                  - $ref: '#/components/schemas/ExtractResponse'
                examples:
                  - url: https://www.example.com/
                    task_id: e8ed8ef6-2657-43ba-98d5-a5c79ea7b551
                    status: success
                    status_code: 200
                    data:
                      html: ...
                      markdown: MARKDOWN
                      parsing: {}
                      cookies: {}
                      screenshot: iVBORw0KGgoAAAANSUhEUgAAA...
                      fetch_request: []
                      network_capture: []
                      browser_actions: []
                      headers: {}
                    metadata:
                      query_time: '2026-02-09T10:26:05.817Z'
                      query_duration: 1877
                      response_parameters:
                        input_url: https://www.example.com/
                      driver: vx8
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
        '404':
          description: Task Not Found
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    examples:
                      - failed
                  error:
                    type: string
                    examples:
                      - Task not found
                required:
                  - status
                  - error
              example:
                status: failed
                error: Task not found
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
    AgentResponse:
      type: object
      properties:
        url:
          type: string
          format: uri
          description: The URL that was extracted
        task_id:
          type: string
          format: uuid
          description: Unique identifier for the extraction task
        status:
          type: string
          description: Status of the extraction
          enum:
            - success
            - failed
        status_code:
          type: integer
          description: HTTP status code from the target website
        data:
          type: object
          description: Data from the extraction
          properties:
            html:
              type: string
              description: Raw HTML content of the page
            headers:
              type: object
              description: Response headers from the target website
            parsing:
              type: object
              description: Parsed data when parsing is enabled
            markdown:
              type: string
              description: Markdown content when markdown conversion is enabled
            cookies:
              type: object
              description: Cookies when cookie capture is enabled
            fetch_request:
              type: array
              description: Captured executed fetch requests when enabled
              items:
                type: object
            network_capture:
              type: array
              description: Captured network activity when enabled
              items:
                type: object
            browser_actions:
              type: array
              description: Browser actions results
              items:
                type: object
            screenshot:
              type: string
              description: Base64 encoded screenshot when enabled (requires rendering)
        metadata:
          type: object
          description: Metadata from the extraction
          properties:
            query_time:
              type: string
              format: date-time
              description: Timestamp when the query was executed
            input_url:
              type: string
              format: uri
              description: The original input URL
            driver:
              type: string
              description: >-
                Driver used for extraction (depends on target domain and
                rendering configuration)
              examples:
                - vx8
            agent:
              type: string
              description: Agent name used for extraction
              examples:
                - amazon_pdp
        warnings:
          type: array
          description: List of warnings
          items:
            type: string
      required:
        - url
        - task_id
        - status
        - status_code
        - data
        - metadata
    ExtractResponse:
      type: object
      properties:
        url:
          type: string
          format: uri
          description: The URL that was extracted
        task_id:
          type: string
          format: uuid
          description: Unique identifier for the extraction task
        status:
          type: string
          description: Status of the extraction
          enum:
            - success
            - failed
        status_code:
          type: integer
          description: HTTP status code from the target website
        data:
          type: object
          description: Data from the extraction
          properties:
            html:
              type: string
              description: Raw HTML content of the page
            headers:
              type: object
              description: Response headers from the target website
            parsing:
              type: object
              description: Parsed data when parsing is enabled
            markdown:
              type: string
              description: Markdown content when markdown conversion is enabled
            cookies:
              type: object
              description: Cookies when cookie capture is enabled
            fetch_request:
              type: array
              description: Captured executed fetch requests when enabled
              items:
                type: object
            network_capture:
              type: array
              description: Captured network activity when enabled
              items:
                type: object
            browser_actions:
              type: array
              description: Browser actions results
              items:
                type: object
            screenshot:
              type: string
              description: Base64 encoded screenshot when enabled (requires rendering)
        metadata:
          type: object
          description: Metadata from the extraction
          properties:
            query_time:
              type: string
              format: date-time
              description: Timestamp when the query was executed
            input_url:
              type: string
              format: uri
              description: The original input URL
            driver:
              type: string
              description: >-
                Driver used for extraction (depends on target domain and
                rendering configuration)
              examples:
                - vx8
        warnings:
          type: array
          description: List of warnings
          items:
            type: string
      required:
        - url
        - task_id
        - status
        - status_code
        - data
        - metadata
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