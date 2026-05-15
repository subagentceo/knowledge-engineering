> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Extract Batch



## OpenAPI

````yaml /openapi.json post /v1/extract/batch
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/extract/batch:
    post:
      tags:
        - Extract
      summary: Extract Batch
      requestBody:
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/ExtractBatchPayload'
              examples:
                - inputs:
                    - url: https://www.example.com/page1
                    - url: https://www.example.com/page2
                    - url: https://www.example.com/page3
                    - url: https://www.example.com/page4
                  shared_inputs:
                    callback_url: https://example.com/webhook/callback
                    storage_type: s3
                    storage_url: s3://bucket-name/path/to/object
                    storage_compress: true
                    storage_object_name: result-2024-01-15.json
                    render: true
                    country: US
                    locale: en-US
      responses:
        '200':
          description: Extract Batch Created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BatchResponse'
              example:
                batch_id: 4b0a90bf-c951-42e4-95b3-a95a65ba69fc
                batch_size: 1
                tasks:
                  - id: 123e4567-e89b-12d3-a456-426614174000
                    state: pending
                    output_url: string
                    created_at: '2024-01-15T10:30:00Z'
                    modified_at: '2024-01-15T10:35:00Z'
                    account_name: string
                    input: null
                    batch_id: 4b0a90bf-c951-42e4-95b3-a95a65ba69fc
                    status_code: 200
                    api_type: extract
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
    ExtractBatchPayload:
      type: object
      properties:
        inputs:
          type: array
          items:
            anyOf:
              - $ref: '#/components/schemas/ExtractPayload'
        shared_inputs:
          allOf:
            - $ref: '#/components/schemas/AsyncOptions'
            - $ref: '#/components/schemas/ExtractPayload'
              required: []
    BatchResponse:
      type: object
      properties:
        batch_id:
          type: string
          description: Unique identifier for the batch.
        batch_size:
          type: number
          description: Number of tasks in the batch.
        tasks:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                minLength: 1
                description: Unique task identifier.
                examples:
                  - 123e4567-e89b-12d3-a456-426614174000
              state:
                type: string
                enum:
                  - pending
                  - success
                  - error
                description: Current state of the task.
                examples:
                  - pending
              output_url:
                description: Storage location of the output data.
                type: string
              status_url:
                type: string
                format: uri
                description: URL for checking the task status.
                examples:
                  - >-
                    https://sdk.nimbleway.com/v1/tasks/123e4567-e89b-12d3-a456-426614174000
              download_url:
                description: URL for downloading the task results.
                examples:
                  - >-
                    https://sdk.nimbleway.com/v1/tasks/123e4567-e89b-12d3-a456-426614174000/results
                type: string
                format: uri
              error:
                description: Error message if the task failed.
                examples:
                  - Connection timeout
                type: string
              error_type:
                description: Classification of the error type.
                examples:
                  - timeout_error
                type: string
              created_at:
                description: Timestamp when the task was created.
                examples:
                  - '2024-01-15T10:30:00Z'
                type: string
              modified_at:
                description: Timestamp when the task was last modified.
                examples:
                  - '2024-01-15T10:35:00Z'
                type: string
              account_name:
                description: Account name that owns the task.
                type: string
              input:
                description: Original input data for the task.
              _query: {}
              batch_id:
                description: Batch ID if this task is part of a batch.
                examples:
                  - 4b0a90bf-c951-42e4-95b3-a95a65ba69fc
                type: string
              status_code:
                description: HTTP status code from the task execution.
                examples:
                  - 200
                type: number
              api_type:
                type: string
                enum:
                  - web
                  - serp
                  - ecommerce
                  - social
                  - media
                  - agent
                  - extract
            required:
              - id
              - state
              - status_url
              - created_at
              - input
              - _query
            additionalProperties: false
          description: List of created tasks.
      additionalProperties: false
      description: Response when a batch of extract tasks is created successfully.
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
    ExtractPayload:
      type: object
      properties:
        url:
          type: string
          format: uri
          description: Target URL to scrape
          examples:
            - https://example.com/page
        country:
          description: Country used to access the target URL, use ISO Alpha-2 Codes
          examples:
            - US
          type: string
        state:
          description: >-
            State used to access the target URL (US and CA only), use ISO
            Alpha-2 Codes
          examples:
            - NY
          type: string
        city:
          description: City used to access the target URL
          examples:
            - new_york
          type: string
        locale:
          description: >-
            LCID standard locale used for the URL request. Alternatively, user
            can use 'auto' for automatic locale based on geo-location
          examples:
            - en-US
          type: string
        render:
          description: Whether to render JavaScript content using a browser
          examples:
            - true
          type: boolean
        parse:
          description: Whether to parse the response content
          type: boolean
        parser:
          $ref: '#/components/schemas/Parser'
        formats:
          description: Response format
          examples:
            - - html
              - markdown
          type: array
          items:
            type: string
            enum:
              - html
              - markdown
              - screenshot
              - headers
              - links
        driver:
          type: string
          enum:
            - vx6
            - vx8
            - vx8-pro
            - vx10
            - vx10-pro
          examples:
            - vx8
          title: Driver
          description: Browserless drivers available for web extraction
        network_capture:
          description: Intercept and capture network requests made by the page
          type: array
          items:
            $ref: '#/components/schemas/NetworkCaptureFilter'
        browser_actions:
          description: Array of actions to perform sequentially during browser rendering
          examples:
            - wait: 2s
            - click:
                selector: '#load-more'
                timeout: 5s
          type: array
          items:
            $ref: '#/components/schemas/BrowserAction'
        browser:
          anyOf:
            - type: string
              enum:
                - chrome
                - firefox
              description: Browser type to emulate
              examples:
                - chrome
            - type: object
              properties:
                name:
                  type: string
                  enum:
                    - chrome
                    - firefox
                version:
                  description: Specific browser version to emulate
                  examples:
                    - 144.0.0
                  type: string
              required:
                - name
        os:
          description: Operating system to emulate
          examples:
            - windows
          type: string
          enum:
            - windows
            - mac os
            - linux
            - android
            - ios
        no_userbrowser:
          description: Whether to disable browser-based rendering
          examples:
            - false
          type: boolean
        device:
          description: Device type for browser emulation
          examples:
            - desktop
          type: string
          enum:
            - desktop
            - mobile
            - tablet
        tag:
          description: User-defined tag for request identification
          examples:
            - campaign-2024-q1
          type: string
        is_xhr:
          description: Whether to emulate XMLHttpRequest behavior
          examples:
            - true
          type: boolean
        http2:
          description: Whether to use HTTP/2 protocol
          examples:
            - true
          type: boolean
        expected_status_codes:
          description: Expected HTTP status codes for successful requests
          examples:
            - 200
            - 201
          type: array
          items:
            type: integer
            minimum: -9007199254740991
            maximum: 9007199254740991
        referrer_type:
          description: Referrer policy for the request
          examples:
            - no-referrer
          anyOf:
            - type: string
              enum:
                - random
                - no-referer
                - same-origin
            - type: string
              enum:
                - google
                - bing
                - facebook
                - twitter
                - instagram
        method:
          description: HTTP method for the request
          examples:
            - GET
          type: string
          enum:
            - GET
            - POST
            - PUT
            - PATCH
            - DELETE
        render_options:
          type: object
          properties:
            render_type:
              description: Type of render completion to wait for
              examples:
                - idle2
              type: string
              enum:
                - domready
                - load
                - idle0
                - idle2
            headless:
              description: Whether to run browser in headless mode
              examples:
                - true
              type: boolean
            timeout:
              description: Maximum time in milliseconds to wait for page render
              examples:
                - 30000
              type: number
              minimum: 1
            userbrowser:
              description: Whether to use a persistent browser session
              examples:
                - true
              type: boolean
            include_iframes:
              description: Whether to include iframe content in the result
              examples:
                - true
              type: boolean
            disabled_resources:
              description: Types of resources to block from loading
              examples:
                - image
                - stylesheet
              type: array
              items:
                type: string
                enum:
                  - other
                  - document
                  - stylesheet
                  - image
                  - media
                  - font
                  - script
                  - texttrack
                  - xhr
                  - fetch
                  - eventsource
                  - websocket
                  - manifest
                  - signedexchange
                  - ping
                  - cspviolationreport
                  - prefetch
                  - preflight
                  - fedcm
            adblock:
              description: Whether to enable ad blocking
              examples:
                - true
              type: boolean
            blocked_domains:
              description: Domains to block from loading
              examples:
                - ads.example.com
                - tracker.com
              minItems: 1
              type: array
              items:
                type: string
                minLength: 1
            with_performance_metrics:
              description: Whether to collect performance metrics during rendering
              examples:
                - true
              type: boolean
            no_accept_encoding:
              description: Disable content encoding to avoid cached responses
              examples:
                - true
              type: boolean
      description: Request body model for the /extract endpoint
      required:
        - url
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
    Parser:
      type: object
      description: >-
        Custom extraction recipe defining what data to extract and how to
        structure it. Each property represents a field in the output.
      additionalProperties:
        oneOf:
          - type: object
            description: Terminal parser - extract a single value
            properties:
              type:
                type: string
                enum:
                  - terminal
              selector:
                $ref: '#/components/schemas/ParserSelector'
              extractor:
                $ref: '#/components/schemas/ParserExtractor'
            required:
              - type
              - selector
              - extractor
          - type: object
            description: Terminal list parser - extract multiple values
            properties:
              type:
                type: string
                enum:
                  - terminal_list
              selector:
                $ref: '#/components/schemas/ParserSelector'
              extractor:
                $ref: '#/components/schemas/ParserExtractor'
            required:
              - type
              - selector
              - extractor
          - type: object
            description: Schema parser - extract nested object
            properties:
              type:
                type: string
                enum:
                  - schema
              selector:
                $ref: '#/components/schemas/ParserSelector'
              fields:
                $ref: '#/components/schemas/Parser'
            required:
              - type
              - fields
          - type: object
            description: Schema list parser - extract list of objects
            properties:
              type:
                type: string
                enum:
                  - schema_list
              selector:
                $ref: '#/components/schemas/ParserSelector'
              fields:
                $ref: '#/components/schemas/Parser'
            required:
              - type
              - fields
          - type: object
            description: Or parser - try multiple strategies
            properties:
              type:
                type: string
                enum:
                  - or
              parsers:
                type: array
                items:
                  $ref: '#/components/schemas/Parser'
            required:
              - type
              - parsers
          - type: object
            description: Const parser - return fixed value
            properties:
              type:
                type: string
                enum:
                  - const
              value:
                description: Fixed value to return
            required:
              - type
              - value
    NetworkCaptureFilter:
      type: object
      description: Configuration for capturing network requests made by the page
      properties:
        method:
          type: string
          description: Filter by HTTP method
          enum:
            - GET
            - HEAD
            - POST
            - PUT
            - DELETE
            - CONNECT
            - OPTIONS
            - TRACE
            - PATCH
        url:
          type: object
          description: URL matching configuration
          properties:
            type:
              type: string
              description: How to match URLs
              enum:
                - exact
                - contains
            value:
              type: string
              description: The URL or URL pattern to match
          required:
            - value
        resource_type:
          description: Filter by request type
          type: array
          items:
            type: string
            enum:
              - xhr
              - fetch
              - stylesheet
              - script
              - document
              - image
          examples:
            - xhr
            - fetch
        validation:
          type: boolean
          description: Validate response content
        wait_for_requests_count:
          type: number
          description: Wait for this many matching requests
          minimum: 0
        wait_for_requests_count_timeout:
          type: number
          description: How long to wait in seconds
          minimum: 0
          maximum: 300000
    BrowserAction:
      type: object
      description: >-
        An action to perform in the browser (one of: goto, wait,
        wait_for_element, click, press, fill, scroll, auto_scroll, screenshot,
        get_cookies, fetch)
      properties:
        goto:
          description: Navigate to a URL
          oneOf:
            - type: string
              format: uri
            - type: object
              properties:
                url:
                  type: string
                  format: uri
                timeout:
                  type: number
                referer:
                  type: string
                wait_until:
                  type: string
                  enum:
                    - load
                    - domcontentloaded
                    - networkidle
                    - commit
              required:
                - url
        wait:
          description: Pause for a duration
          oneOf:
            - type: string
              examples:
                - 2s
            - type: object
              properties:
                duration:
                  type: string
                  examples:
                    - 2s
                required:
                  type: boolean
              required:
                - duration
        wait_for_element:
          description: Wait for element(s) to appear
          oneOf:
            - type: string
              description: CSS selector
            - type: array
              items:
                type: string
              description: Array of CSS selectors
            - type: object
              properties:
                selector:
                  oneOf:
                    - type: string
                    - type: array
                      items:
                        type: string
                timeout:
                  type: number
                visible:
                  type: boolean
              required:
                - selector
        click:
          description: Click an element or coordinates
          oneOf:
            - type: string
              description: CSS selector
            - type: object
              description: Click by selector or coordinates
              properties:
                selector:
                  type: string
                x:
                  type: number
                'y':
                  type: number
                relative_to:
                  type: string
                timeout:
                  type: string
                visible:
                  type: boolean
                delay:
                  type: string
                scroll:
                  type: boolean
                count:
                  type: number
                required:
                  type: boolean
        press:
          description: Press a keyboard key
          oneOf:
            - type: string
              examples:
                - Enter
            - type: object
              properties:
                key:
                  type: string
                  examples:
                    - Enter
                delay:
                  type: number
              required:
                - key
        fill:
          type: object
          description: Fill an input field with text
          properties:
            selector:
              type: string
              description: CSS selector of input element
            value:
              type: string
              description: Text to fill
            mode:
              type: string
              enum:
                - type
                - paste
            timeout:
              type: number
            typing_interval:
              type: number
              minimum: 10
              maximum: 1000
            click_on_element:
              type: boolean
            scroll:
              type: boolean
            visible:
              type: boolean
            delay:
              type: number
            required:
              type: boolean
          required:
            - selector
            - value
        scroll:
          description: Scroll the page
          oneOf:
            - type: number
              description: Pixels to scroll (positive = down, negative = up)
            - type: string
              description: Scroll to bottom or CSS selector
            - type: object
              properties:
                'y':
                  type: number
                x:
                  type: number
                to:
                  type: string
                  description: CSS selector to scroll to
                container:
                  type: string
                  description: CSS selector of container
                visible:
                  type: boolean
                required:
                  type: boolean
        auto_scroll:
          description: Automatically scroll to load dynamic content
          oneOf:
            - type: boolean
            - type: number
              description: Max duration in milliseconds
            - type: object
              properties:
                max_duration:
                  type: number
                delay_after_scroll:
                  type: number
                step_size:
                  type: number
                  description: Pixels to scroll per step
                click_selector:
                  type: string
                  description: CSS selector to click before scrolling
                container:
                  type: string
                  description: CSS selector of container
                idle_timeout:
                  type: number
                pause_on_selector:
                  type: string
                required:
                  type: boolean
        screenshot:
          description: Capture a screenshot
          oneOf:
            - type: boolean
            - type: object
              properties:
                full_page:
                  type: boolean
                format:
                  type: string
                  enum:
                    - png
                    - jpeg
                    - webp
                quality:
                  type: number
                  minimum: 0
                  maximum: 100
        get_cookies:
          description: Retrieve cookies
          oneOf:
            - type: boolean
            - type: object
              properties:
                domain:
                  type: string
                  description: Domain filter for cookies
        fetch:
          description: Make HTTP request from browser context
          oneOf:
            - type: string
              format: uri
            - type: object
              properties:
                url:
                  type: string
                  format: uri
                method:
                  type: string
                  enum:
                    - GET
                    - POST
                    - PUT
                    - DELETE
                    - PATCH
                headers:
                  type: object
                  additionalProperties:
                    type: string
                body:
                  type: string
                  description: Request body
                timeout:
                  type: number
              required:
                - url
    ParserSelector:
      oneOf:
        - type: object
          description: CSS selector
          properties:
            type:
              type: string
              enum:
                - css
            css_selector:
              type: string
              description: CSS selector string
          required:
            - type
            - css_selector
        - type: object
          description: XPath selector
          properties:
            type:
              type: string
              enum:
                - xpath
            path:
              type: string
              description: XPath expression
          required:
            - type
            - path
        - type: object
          description: JSON selector
          properties:
            type:
              type: string
              enum:
                - json
            path:
              type: string
              description: JSONPath expression
            coercion_filter:
              type: string
              description: JSONPath filter for multiple objects
          required:
            - type
            - path
        - type: object
          description: Sequence of selectors
          properties:
            type:
              type: string
              enum:
                - sequence
            sequence:
              type: array
              items:
                $ref: '#/components/schemas/ParserSelector'
          required:
            - type
            - sequence
        - type: object
          description: Root selector
          properties:
            type:
              type: string
              enum:
                - root
          required:
            - type
    ParserExtractor:
      oneOf:
        - type: object
          description: Extract text content
          properties:
            type:
              type: string
              enum:
                - text
            post_processor:
              $ref: '#/components/schemas/PostProcessor'
          required:
            - type
        - type: object
          description: Extract attribute value
          properties:
            type:
              type: string
              enum:
                - attr
            attr:
              type: string
              description: Attribute name (e.g., href, src)
            post_processor:
              $ref: '#/components/schemas/PostProcessor'
          required:
            - type
            - attr
        - type: object
          description: Extract as JSON
          properties:
            type:
              type: string
              enum:
                - json
            post_processor:
              $ref: '#/components/schemas/PostProcessor'
          required:
            - type
        - type: object
          description: Extract raw HTML
          properties:
            type:
              type: string
              enum:
                - raw
            post_processor:
              $ref: '#/components/schemas/PostProcessor'
          required:
            - type
    PostProcessor:
      type: object
      description: Transform extracted data
      properties:
        type:
          type: string
          enum:
            - number
            - string
            - date
            - regex
            - trim
            - lowercase
            - uppercase
      required:
        - type
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer

````