> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SERP



## OpenAPI

````yaml /api-reference/openapi.json post /v1/serp
openapi: 3.1.0
info:
  title: Nimble SDK
  version: 1.0.0
  description: The AI-Native SDK for Real-Time Web Data at scale
servers:
  - url: https://sdk.nimbleway.com
security: []
paths:
  /v1/serp:
    post:
      tags:
        - SERP
      summary: SERP
      requestBody:
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/SerpPayload'
              examples:
                - search_engine: google_search
                  query: NBA Allstar 2026
                  country: US
                  locale: en
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/SerpResponse'
                examples:
                  - url: >-
                      https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstar+2026&q=NBA+Allstar+2026
                    task_id: 4dd71f38-fc3b-4e70-9443-3e70de568395
                    status: success
                    data:
                      html: .....
                      parsing:
                        entities:
                          AnswerBox:
                            - display_link: ''
                              entity_type: AnswerBox
                              snippet: NBANBA
                              snippet_highlighted:
                                - NBANBA
                          OrganicResult:
                            - cleaned_domain: nba
                              displayed_url: https://www.nba.com › allstar › 2026 › roster
                              entity_type: OrganicResult
                              position: 1
                              snippet: "2026 All-Star · Latest · Events. Feb. 13: Ruffles All-Star Celebrity Game · Feb. 13: Castrol Rising Stars · Feb. 13: NBA HBCU Classic · Feb. 14: All-Star\_...Read more"
                              title: 2026 All-Star | Roster
                              url: https://www.nba.com/allstar/2026/roster
                            - cleaned_domain: wikipedia
                              displayed_url: >-
                                https://en.wikipedia.org › wiki ›
                                2026_NBA_All-Star_...
                              entity_type: OrganicResult
                              position: 2
                              snippet: "The 2026 NBA All-Star Game was a round-robin tournament played on February 15, 2026, the 75th edition. It was hosted by the Los Angeles Clippers at the Intuit\_...Read more"
                              title: 2026 NBA All-Star Game
                              url: >-
                                https://en.wikipedia.org/wiki/2026_NBA_All-Star_Game
                            - cleaned_domain: nba
                              displayed_url: https://nbaevents.nba.com › all-star
                              entity_type: OrganicResult
                              position: 3
                              snippet: "‍Experience basketball's biggest weekend as NBA All-Star 2026 takes over Los Angeles for its historic 75th celebration — a milestone moment that unites fans\_...Read more"
                              title: All Star 2026 - NBA Events
                              url: https://nbaevents.nba.com/all-star
                            - cleaned_domain: instagram
                              displayed_url: 2.3M+ followers
                              entity_type: OrganicResult
                              position: 4
                              snippet: "The 76th NBA All-Star game will be played on Sunday, Feb. 21, at Mortgage Matchup Center, home of the Suns. ... During 2026 @nbaallstar Weekend, we brought\_...Read more"
                              title: NBA All-Star (@nbaallstar)
                              url: https://www.instagram.com/nbaallstar/
                            - cleaned_domain: nba
                              displayed_url: https://www.nba.com › allstar › 2026 › schedule
                              entity_type: OrganicResult
                              position: 5
                              snippet: >-
                                The 2026 NBA All-Star Game will take place on
                                Sunday, Feb. 15, 2026 in Los Angeles, California
                                at the Intuit Dome, the home of the LA
                                Clippers.Read more
                              title: 2026 All-Star | Schedule
                              url: https://www.nba.com/allstar/2026/schedule
                            - cleaned_domain: youtube
                              displayed_url: 594.1K+ views  ·  2 months ago
                              entity_type: OrganicResult
                              position: 6
                              thumbnails:
                                - >-
                                  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzjGEYW3zhWa0jfSlNNBqXxpozKaGRxKaUf9rvNWhKlKh70vISyajAMA&s
                              title: The FULL 2026 NBA All-Star Teams Introductions
                              url: https://www.youtube.com/watch?v=W9X8fErBuhc
                            - cleaned_domain: reddit
                              displayed_url: 5 comments  ·  5 hours ago
                              entity_type: OrganicResult
                              position: 7
                              thumbnails:
                                - >-
                                  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9eajrHkAxVTtngwo_k0f73eAMS74WAXHy74NwvZcxZ0aQUiwcArGhyg&s
                              title: >-
                                [Highlights]Three straight All Star connections
                                that stopped the ...
                              url: >-
                                https://www.reddit.com/r/nba/comments/1t54eg4/highlightsthree_straight_all_star_connections/
                            - cleaned_domain: nba
                              displayed_url: https://www.nba.com › allstar › 2026
                              entity_type: OrganicResult
                              position: 8
                              snippet: "Luka, Giannis lead 2026 All-Star starters. The 10 All-Star starters were revealed on Monday and will participate in the 75th NBA All-Star Game on Feb. 15 in\_...Read more"
                              title: 2026 NBA All-Star
                              url: https://www.nba.com/allstar/2026
                            - cleaned_domain: youtube
                              displayed_url: 25K+ views  ·  5 months ago
                              entity_type: OrganicResult
                              position: 9
                              thumbnails:
                                - >-
                                  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjkVXDwwFS3YDphNtqyNlm1MKghOKiUrdaZSP3Dc1uru1MVq8qW6F6QQ&s
                              title: >-
                                2026 NBA All-Star Game format revealed - NBA
                                Showtime reacts
                              url: https://www.youtube.com/watch?v=7EVGFlnCIR8
                          Pagination:
                            - current_page: 1
                              entity_type: Pagination
                              next_page_url: >-
                                https://www.google.com/search?q=NBA+All+Star+2026&sca_esv=d3de13569ac369b6&hl=en&gl=us&ei=Jif7adSTGLuvwbkPo5bO2Qc&start=10&sa=N&sstk=Af77f_duOzNfhdIBXxH89EDT8YgwURfp_XRQz6yUUuwVRzuAId3NQrq_Cjx3St0GgjjzK2Cu4YcpCf0Pf6Ha1znM9o3fQp1fuoe3Qg&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ8NMDegQIMhAW
                              other_page_urls:
                                '3': >-
                                  https://www.google.com/search?q=NBA+All+Star+2026&sca_esv=d3de13569ac369b6&hl=en&gl=us&ei=Jif7adSTGLuvwbkPo5bO2Qc&start=20&sa=N&sstk=Af77f_duOzNfhdIBXxH89EDT8YgwURfp_XRQz6yUUuwVRzuAId3NQrq_Cjx3St0GgjjzK2Cu4YcpCf0Pf6Ha1znM9o3fQp1fuoe3Qg&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ8tMDegQIMhAG
                                '4': >-
                                  https://www.google.com/search?q=NBA+All+Star+2026&sca_esv=d3de13569ac369b6&hl=en&gl=us&ei=Jif7adSTGLuvwbkPo5bO2Qc&start=30&sa=N&sstk=Af77f_duOzNfhdIBXxH89EDT8YgwURfp_XRQz6yUUuwVRzuAId3NQrq_Cjx3St0GgjjzK2Cu4YcpCf0Pf6Ha1znM9o3fQp1fuoe3Qg&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ8tMDegQIMhAI
                                '5': >-
                                  https://www.google.com/search?q=NBA+All+Star+2026&sca_esv=d3de13569ac369b6&hl=en&gl=us&ei=Jif7adSTGLuvwbkPo5bO2Qc&start=40&sa=N&sstk=Af77f_duOzNfhdIBXxH89EDT8YgwURfp_XRQz6yUUuwVRzuAId3NQrq_Cjx3St0GgjjzK2Cu4YcpCf0Pf6Ha1znM9o3fQp1fuoe3Qg&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ8tMDegQIMhAK
                                '6': >-
                                  https://www.google.com/search?q=NBA+All+Star+2026&sca_esv=d3de13569ac369b6&hl=en&gl=us&ei=Jif7adSTGLuvwbkPo5bO2Qc&start=50&sa=N&sstk=Af77f_duOzNfhdIBXxH89EDT8YgwURfp_XRQz6yUUuwVRzuAId3NQrq_Cjx3St0GgjjzK2Cu4YcpCf0Pf6Ha1znM9o3fQp1fuoe3Qg&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ8tMDegQIMhAM
                                '7': >-
                                  https://www.google.com/search?q=NBA+All+Star+2026&sca_esv=d3de13569ac369b6&hl=en&gl=us&ei=Jif7adSTGLuvwbkPo5bO2Qc&start=60&sa=N&sstk=Af77f_duOzNfhdIBXxH89EDT8YgwURfp_XRQz6yUUuwVRzuAId3NQrq_Cjx3St0GgjjzK2Cu4YcpCf0Pf6Ha1znM9o3fQp1fuoe3Qg&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ8tMDegQIMhAO
                                '8': >-
                                  https://www.google.com/search?q=NBA+All+Star+2026&sca_esv=d3de13569ac369b6&hl=en&gl=us&ei=Jif7adSTGLuvwbkPo5bO2Qc&start=70&sa=N&sstk=Af77f_duOzNfhdIBXxH89EDT8YgwURfp_XRQz6yUUuwVRzuAId3NQrq_Cjx3St0GgjjzK2Cu4YcpCf0Pf6Ha1znM9o3fQp1fuoe3Qg&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ8tMDegQIMhAQ
                                '9': >-
                                  https://www.google.com/search?q=NBA+All+Star+2026&sca_esv=d3de13569ac369b6&hl=en&gl=us&ei=Jif7adSTGLuvwbkPo5bO2Qc&start=80&sa=N&sstk=Af77f_duOzNfhdIBXxH89EDT8YgwURfp_XRQz6yUUuwVRzuAId3NQrq_Cjx3St0GgjjzK2Cu4YcpCf0Pf6Ha1znM9o3fQp1fuoe3Qg&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ8tMDegQIMhAS
                                '10': >-
                                  https://www.google.com/search?q=NBA+All+Star+2026&sca_esv=d3de13569ac369b6&hl=en&gl=us&ei=Jif7adSTGLuvwbkPo5bO2Qc&start=90&sa=N&sstk=Af77f_duOzNfhdIBXxH89EDT8YgwURfp_XRQz6yUUuwVRzuAId3NQrq_Cjx3St0GgjjzK2Cu4YcpCf0Pf6Ha1znM9o3fQp1fuoe3Qg&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ8tMDegQIMhAU
                          RelatedQuestion:
                            - entity_type: RelatedQuestion
                              question: Where will the 2026 NBA All Stars be held?
                            - entity_type: RelatedQuestion
                              question: What NBA player never dunked in a game?
                            - entity_type: RelatedQuestion
                              question: Where is the dunk contest in 2026?
                            - entity_type: RelatedQuestion
                              question: Where is NBA All-Star 2027 going to be?
                          RelatedSearch:
                            - entity_type: RelatedSearch
                              position: '1'
                              query: Nba all-star 2026 tickets
                              url: >-
                                /search?sca_esv=d3de13569ac369b6&hl=en&gl=us&q=Nba+all-star+2026+tickets&sa=X&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ1QJ6BAg7EAE
                            - entity_type: RelatedSearch
                              position: '2'
                              query: Nba all star 2026 roster
                              url: >-
                                /search?sca_esv=d3de13569ac369b6&hl=en&gl=us&q=Nba+all+star+2026+roster&sa=X&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ1QJ6BAhKEAE
                            - entity_type: RelatedSearch
                              position: '3'
                              query: Nba all star 2026 schedule
                              url: >-
                                /search?sca_esv=d3de13569ac369b6&hl=en&gl=us&q=Nba+all+star+2026+schedule&sa=X&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ1QJ6BAhHEAE
                            - entity_type: RelatedSearch
                              position: '4'
                              query: Nba all star 2026 tickets
                              url: >-
                                /search?sca_esv=d3de13569ac369b6&hl=en&gl=us&q=Nba+all+star+2026+tickets&sa=X&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ1QJ6BAhJEAE
                            - entity_type: RelatedSearch
                              position: '5'
                              query: NBA All-Star 2026 3-Point Contest
                              url: >-
                                /search?sca_esv=d3de13569ac369b6&hl=en&gl=us&q=NBA+All-Star+2026+3-Point+Contest&sa=X&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ1QJ6BAhGEAE
                            - entity_type: RelatedSearch
                              position: '6'
                              query: NBA All-Star 2026 reserves
                              url: >-
                                /search?sca_esv=d3de13569ac369b6&hl=en&gl=us&q=NBA+All-Star+2026+reserves&sa=X&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ1QJ6BAhIEAE
                            - entity_type: RelatedSearch
                              position: '7'
                              query: NBA All-Star 2026 Dunk contest
                              url: >-
                                /search?sca_esv=d3de13569ac369b6&hl=en&gl=us&q=NBA+All-Star+2026+Dunk+contest&sa=X&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ1QJ6BAhDEAE
                            - entity_type: RelatedSearch
                              position: '8'
                              query: NBA All-Star 2026 Celebrity Game
                              url: >-
                                /search?sca_esv=d3de13569ac369b6&hl=en&gl=us&q=NBA+All-Star+2026+Celebrity+Game&sa=X&ved=2ahUKEwjUvobRyKSUAxW7VzABHSOLM3sQ1QJ6BAg-EAE
                        total_entities_count: 23
                        entities_count:
                          AnswerBox: 1
                          OrganicResult: 9
                          Pagination: 1
                          RelatedQuestion: 4
                          RelatedSearch: 8
                        metrics: {}
                    metadata:
                      query_time: '2026-05-06T11:33:50.730Z'
                      query_duration: 9701
                      response_parameters:
                        input_url: >-
                          https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstar+2026&q=NBA+Allstar+2026
                      driver: vx6
                    status_code: 200
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
    SerpPayload:
      type: object
      title: SerpPayload
      properties:
        search_engine:
          type: string
          description: The search engine to query
          examples:
            - google_search
          enum:
            - google_search
            - google_aio
            - google_maps_search
            - google_maps_reviews
            - google_maps_place
            - google_news
            - google_images
            - bing_search
            - yandex_search
        query:
          type: string
          description: >-
            The search query string. Required for google_search, google_news,
            google_images, and google_maps_search
          examples:
            - NBA Allstars 2026
        place_id:
          type: string
          description: >-
            Google Maps place identifier. Required for google_maps_place and
            google_maps_reviews
          examples:
            - ChIJtRq8oUjLw4kR_tN2GQKUOXs
        coordinates:
          type: object
          properties:
            latitude:
              type: string
              description: >-
                Google Maps place identifier. Required for google_maps_place and
                google_maps_reviews
              examples:
                - '40.7123695'
            longitude:
              type: string
              examples:
                - '-74.0357317'
          examples:
            - latitude: '40.7123695'
              longitude: '-74.0357317'
        time:
          type: string
          description: >-
            Filter results by time range. Only supported for google_search,
            google_news, and google_images
          examples:
            - hour
            - day
            - week
            - month
            - year
        country:
          type: string
          default: US
          description: >-
            Run the search as if from a specific country. Returns geo-localized
            results (optimized for US)
          examples:
            - US
        locale:
          type: string
          description: Language preference for the search results. Use LCID standard
          examples:
            - en
        location:
          type: string
          description: >-
            Location context for the search. Accepted for google_search,
            google_news, and google_images — not supported for Maps engines.
            Pass a location string (e.g. "United States", "New York, NY") or a
            raw Google UULE value.
          examples:
            - United States
            - New York, NY
        no_html:
          type: boolean
          default: false
          description: When set to true, removes the html_content field from the response
          examples:
            - true
        num_results:
          description: Number of results to return (1–100).
          examples:
            - 10
          maximum: 100
          minimum: 1
          type: integer
        start:
          description: Result offset for fetching beyond the first batch.
          examples:
            - 10
          type: integer
        include_pages_html:
          type: boolean
          default: false
          description: >-
            When set to true, returns raw HTML per individual result page
            instead of a single stitched HTML string.
          examples:
            - true
        device:
          type: string
          description: Emulate a specific device type.
          examples:
            - mobile
          enum:
            - mobile
        ads_optimization:
          type: boolean
          default: false
          description: >-
            When set to true, boosts sponsored results using incognito rendering
            (requires JS).
          examples:
            - true
      required:
        - search_engine
      description: Request body model for the fast serp endpoint
    SerpResponse:
      type: object
      title: SerpResponse
      description: >-
        Response from the Fast SERP realtime API. All engines share the same
        top-level envelope; entity types under parsing.entities vary by
        search_engine.
      properties:
        task_id:
          type: string
          description: Unique identifier for this request
          examples:
            - bd46cd9c-50f7-4736-9c4a-660a32e4dc87
        status:
          type: string
          enum:
            - success
            - error
          description: Request status
          examples:
            - success
        query_time:
          type: string
          format: date-time
          description: ISO timestamp of when the query ran
          examples:
            - '2026-03-05T13:47:16.435Z'
        status_code:
          type: integer
          description: HTTP status code from the upstream source
          examples:
            - 200
        url:
          type: string
          description: The upstream URL that was queried
          examples:
            - https://www.google.com/search?hl=en&gl=us&q=NBA+Allstar+2026
        input_url:
          type: string
          description: The original input URL before any redirects
          examples:
            - https://www.google.com/search?hl=en&gl=us&q=NBA+Allstar+2026
        html_content:
          type: string
          nullable: true
          description: Raw HTML of the response page. Omitted when no_html is true.
          examples:
            - <!DOCTYPE html>...
        driver:
          type: string
          description: Internal routing driver used for this request
          examples:
            - vx6
        parsing:
          type: object
          description: >-
            Structured parsing output. Entity types under entities vary by
            search_engine.
        nimble_links:
          type: object
          nullable: true
          description: Pagination links as ready-to-use Nimble API URLs (Maps engines)
          properties:
            next_page:
              type: string
              description: URL to fetch the next page of results
        nimble_payload:
          type: object
          nullable: true
          description: Next-page parameters as a structured object (web search engines)
      required:
        - task_id
        - status
        - status_code
        - parsing
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