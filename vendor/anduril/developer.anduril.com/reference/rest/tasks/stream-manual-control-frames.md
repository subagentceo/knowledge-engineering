> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Stream manual control frames

POST https://example.developer.anduril.com/api/v1/tasks/{taskId}/manual-control/stream
Content-Type: application/json

Establishes a server streaming connection that delivers manual control frames to agents
using server-sent events (SSE).

This endpoint streams manual control frames, for example, for joystick movements, for a specific task
to the executing agent. The agent should open this stream before reporting `STATUS_EXECUTING`
to ensure it is ready to receive control input when the operator begins sending frames.

Each frame includes epoch and sequence metadata for handling concurrent control sessions
and detecting stale or out-of-order frames. Heartbeat messages are sent periodically to
maintain the connection.

The stream terminates automatically when the task reaches a terminal state
(`STATUS_DONE_OK` or `STATUS_DONE_NOT_OK`).

Reference: https://developer.anduril.com/reference/rest/tasks/stream-manual-control-frames

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: REST
  version: 1.0.0
paths:
  /api/v1/tasks/{taskId}/manual-control/stream:
    post:
      operationId: stream-manual-control-frames
      summary: Stream manual control frames
      description: >-
        Establishes a server streaming connection that delivers manual control
        frames to agents

        using server-sent events (SSE).


        This endpoint streams manual control frames, for example, for joystick
        movements, for a specific task

        to the executing agent. The agent should open this stream before
        reporting `STATUS_EXECUTING`

        to ensure it is ready to receive control input when the operator begins
        sending frames.


        Each frame includes epoch and sequence metadata for handling concurrent
        control sessions

        and detecting stale or out-of-order frames. Heartbeat messages are sent
        periodically to

        maintain the connection.


        The stream terminates automatically when the task reaches a terminal
        state

        (`STATUS_DONE_OK` or `STATUS_DONE_NOT_OK`).
      tags:
        - subpackage_tasks
      parameters:
        - name: taskId
          in: path
          description: The ID of the manual control task to receive frames for.
          required: true
          schema:
            type: string
        - name: Authorization
          in: header
          description: Bearer authentication
          required: true
          schema:
            type: string
      responses:
        '200':
          description: >-
            Returns a stream of manual control frames as they are sent by the
            operator.
          content:
            text/event-stream:
              schema:
                $ref: >-
                  #/components/schemas/Tasks_streamManualControlFrames_Response_200
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          description: Unauthorized to access resource
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ManualControlStreamRequest'
servers:
  - url: https://example.developer.anduril.com
    description: https://{server}
components:
  schemas:
    ManualControlStreamRequest:
      type: object
      properties:
        heartbeatIntervalMs:
          type: integer
          description: >-
            The time interval, in milliseconds, that determines the frequency at
            which to send heartbeat events. Defaults to 30000 (30 seconds).
      description: >-
        The request to establish a streaming connection using server-sent events
        (SSE) for receiving

        manual control frames for a specific task.
      title: ManualControlStreamRequest
    Timestamp:
      type: string
      description: The datetime string in ISO 8601 format.
      title: Timestamp
    StreamHeartbeatEvent:
      type: string
      enum:
        - heartbeat
      title: StreamHeartbeatEvent
    GoogleProtobufAny:
      type: object
      properties:
        '@type':
          type: string
          description: The type of the serialized message.
      description: >-
        Contains an arbitrary serialized message along with a @type that
        describes the type of the serialized message.
      title: GoogleProtobufAny
    ManualControlFrameEventEvent:
      type: string
      enum:
        - manual_control_frame
      title: ManualControlFrameEventEvent
    Tasks_streamManualControlFrames_Response_200:
      oneOf:
        - type: object
          properties:
            event:
              $ref: '#/components/schemas/StreamHeartbeatEvent'
            timestamp:
              $ref: '#/components/schemas/Timestamp'
              description: The timestamp at which the heartbeat message was sent.
          required:
            - event
          description: heartbeat variant
        - type: object
          properties:
            event:
              $ref: '#/components/schemas/ManualControlFrameEventEvent'
            taskId:
              type: string
              description: The ID of the manual control task this frame belongs to.
            epochMicros:
              type: string
              description: |-
                Unix timestamp in microseconds identifying the control session.
                 Increments each time a client opens a new stream for this task.
                 Agents should ignore frames with a lower epoch to handle stale streams
                 or operator handoffs.
            sequence:
              type: string
              description: |-
                The sequence number for a stream, incremented for each frame.
                 Agents can use this to detect out-of-order delivery within the same epoch.
            creationTime:
              type: string
              format: date-time
              description: |-
                The time at which this frame was created.
                 Agents can use this to detect stale frame data.
            specification:
              $ref: '#/components/schemas/GoogleProtobufAny'
              description: >-
                The control instructions for this frame, passed through from the
                client.
                 The format of each task is specific to the task, and not visible to Lattice.
          required:
            - event
          description: manual_control_frame variant
      discriminator:
        propertyName: event
      description: The stream event response.
      title: Tasks_streamManualControlFrames_Response_200
    Error:
      type: object
      properties:
        code:
          type: string
        message:
          type: string
      required:
        - code
        - message
      title: Error
  securitySchemes:
    OAuth:
      type: http
      scheme: bearer

```

## Examples



**Request**

```json
{}
```