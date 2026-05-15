> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Search



## OpenAPI

````yaml /openapi.json post /v1/search
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/search:
    post:
      tags:
        - Search
      summary: Search
      requestBody:
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/SearchPayload'
              examples:
                - query: Nike brand perception consumer reviews 2025
                  focus: social
                  max_results: 10
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/SearchResponse'
                examples:
                  - answer: The top web scraping tools in 2024 include...
                    total_results: 10
                    results:
                      - title: Top 10 Web Scraping Tools for 2024
                        description: Comprehensive guide to the best web scraping tools...
                        url: https://example.com/article1
                        content: Full parsed content from the page...
                        metadata:
                          published_date: '2024-01-15'
                      - title: Web Scraping Tools Comparison
                        description: Compare features, pricing, and performance...
                        url: https://example2.com/comparison
                        content: Full parsed content from the page...
                        metadata: {}
                    request_id: 123e4567-e89b-12d3-a456-426614174000
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
    SearchPayload:
      properties:
        query:
          type: string
          minLength: 1
          title: Query
          description: Search query string
        locale:
          description: Language/locale code (e.g., 'en', 'fr', 'de')
          examples:
            - en-US
          type: string
          default: en
        country:
          description: Country code for geo-targeted results (e.g., 'US', 'GB', 'IL')
          examples:
            - US
          type: string
          default: US
        output_format:
          type: string
          enum:
            - plain_text
            - markdown
            - simplified_html
          title: ParsingType
          description: 'Output format: plain_text, markdown, or simplified_html'
          default: markdown
        max_results:
          type: integer
          maximum: 100
          minimum: 1
          default: 3
          title: Num Results
          description: >-
            Maximum number of results to return. Actual count may be lower
            depending on availability
        focus:
          oneOf:
            - type: string
              enum:
                - general
                - news
                - location
                - coding
                - geo
                - shopping
                - social
                - academic
              title: Search Focus
              description: Search focus mode (e.g., '`general`', '`news`', '`shopping`')
            - type: array
              maxItems: 10
              items:
                type: string
              description: >-
                List of explicit subagent names (e.g., ['`amazon_serp`',
                '`target_serp`'])
        content_type:
          anyOf:
            - items:
                type: string
              type: array
              maxItems: 50
              nullable: true
          description: >-
            Filter by content type (only supported with focus=general). Supports
            semantic groups ('documents', 'spreadsheets', 'presentations') and
            specific formats ('pdf', 'docx', 'xlsx', etc.)
        search_depth:
          type: string
          enum:
            - lite
            - fast
            - deep
          default: lite
          title: Search Depth
          description: >-
            Controls content richness and latency. `lite` = metadata only
            (title, snippet, URL), `fast` = rich content (~2K chars), `deep` =
            full page scraping
        include_answer:
          type: boolean
          title: Include Answer
          description: >-
            Generate an LLM-powered answer summary based on search result
            snippets
          default: false
        exclude_domains:
          anyOf:
            - items:
                type: string
              type: array
              maxItems: 50
              nullable: true
          title: Exclude Domains
          description: List of domains to exclude from search results. Maximum 50 domains
        include_domains:
          anyOf:
            - items:
                type: string
              type: array
              maxItems: 50
              nullable: true
          title: Include Domains
          description: List of domains to include in search results. Maximum 50 domains
        start_date:
          anyOf:
            - type: string
              nullable: true
          title: Start Date
          description: 'Filter results after this date (format: YYYY-MM-DD or YYYY)'
        end_date:
          anyOf:
            - type: string
            - type: 'null'
          title: End Date
          description: 'Filter results before this date (format: YYYY-MM-DD or YYYY)'
        time_range:
          type: string
          enum:
            - hour
            - day
            - week
            - month
            - year
          title: TimeRange
          description: >-
            Filter by recency: hour, day, week, month, or year. Cannot be
            combined with start_date/end_date
        max_subagents:
          type: integer
          maximum: 10
          minimum: 1
          default: 3
          title: Max Subagents
          description: >-
            Maximum number of subagents to execute in parallel for WSA focus
            modes (shopping, social, geo). Ignored for SERP focus modes
      type: object
      required:
        - query
      title: SearchPayload
      description: Request body model for the /search endpoint
    SearchResponse:
      properties:
        answer:
          anyOf:
            - type: string
              nullable: true
          title: Answer
          description: >-
            AI-generated summary answer to your search query (only available
            when include_answer parameter is enabled). Returns null if disabled
            or if generation fails.
          examples:
            - The best web scraping tools in 2024 include...
        total_results:
          type: integer
          title: Total Results
          description: Total number of search results returned in this response
          examples:
            - 10
        results:
          items:
            properties:
              title:
                type: string
                title: Title
                description: Page title from the search result
                examples:
                  - Top 10 Web Scraping Tools for 2024
              description:
                type: string
                title: Description
                description: Meta description or snippet preview from the search result
                examples:
                  - Comprehensive guide to the best web scraping tools...
              url:
                type: string
                title: Url
                description: Full URL of the search result page
                examples:
                  - https://example.com/article1
              content:
                type: string
                title: Content
                description: >-
                  Full extracted page content. Populated only when
                  search_depth='deep'
                examples:
                  - Full parsed content from the page...
              extra_fields:
                anyOf:
                  - type: object
                    nullable: true
                title: Extra Fields
                description: >-
                  Additional metadata extracted from the page (e.g., published
                  date, author, tags). Content varies by page structure and
                  availability.
                examples:
                  - published_date: '2024-01-15'
            type: object
            required:
              - title
              - description
              - url
              - content
              - metadata
            title: SearchResultModel
            description: >-
              Individual search result containing page information. Each result
              includes title, description, URL, extracted content (in Deep
              Search mode), and optional additional metadata in extra_fields.
          type: array
          title: Results
          description: >-
            Array of search results, each containing title, description, URL,
            content (in Deep Search mode), and optional metadata
        request_id:
          type: string
          title: Request Id
          description: Unique identifier for tracking this search request
          examples:
            - 123e4567-e89b-12d3-a456-426614174000
      type: object
      required:
        - total_results
        - results
        - request_id
      title: SearchResponse
      description: >-
        Search API response containing search results with titles, descriptions,
        URLs, and content
      examples:
        - answer: The top web scraping tools in 2024 include...
          total_results: 10
          results:
            - title: Top 10 Web Scraping Tools for 2024
              description: Comprehensive guide to the best web scraping tools...
              url: https://example.com/article1
              content: Full parsed content from the page...
              metadata:
                published_date: '2024-01-15'
            - title: Web Scraping Tools Comparison
              description: Compare features, pricing, and performance...
              url: https://example2.com/comparison
              content: Full parsed content from the page...
              metadata: {}
          request_id: 123e4567-e89b-12d3-a456-426614174000
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