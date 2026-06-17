> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Query tasks

POST https://example.developer.anduril.com/api/v1/tasks/query
Content-Type: application/json

Searches for Tasks that match specified filtering criteria and returns matching tasks in paginated form.

This method allows filtering tasks based on multiple criteria including:
- Parent task relationships
- Task status (with inclusive or exclusive filtering)
- Update time ranges
- Task view (manager or agent perspective)
- Task assignee
- Task type (via exact URL matches or prefix matching)

Results are returned in pages. When more results are available than can be returned in a single
response, a page_token is provided that can be used in subsequent requests to retrieve the next
set of results.

By default, this returns the latest task version for each matching task from the manager's perspective.

Reference: https://developer.anduril.com/reference/rest/tasks/query-tasks

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: REST
  version: 1.0.0
paths:
  /api/v1/tasks/query:
    post:
      operationId: query-tasks
      summary: Query tasks
      description: >-
        Searches for Tasks that match specified filtering criteria and returns
        matching tasks in paginated form.


        This method allows filtering tasks based on multiple criteria including:

        - Parent task relationships

        - Task status (with inclusive or exclusive filtering)

        - Update time ranges

        - Task view (manager or agent perspective)

        - Task assignee

        - Task type (via exact URL matches or prefix matching)


        Results are returned in pages. When more results are available than can
        be returned in a single

        response, a page_token is provided that can be used in subsequent
        requests to retrieve the next

        set of results.


        By default, this returns the latest task version for each matching task
        from the manager's perspective.
      tags:
        - subpackage_tasks
      parameters:
        - name: Authorization
          in: header
          description: Bearer authentication
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Task query was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TaskQueryResults'
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
        '404':
          description: The specified resource was not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TaskQuery'
servers:
  - url: https://example.developer.anduril.com
    description: https://{server}
components:
  schemas:
    TaskQueryStatusFilterStatus:
      type: string
      enum:
        - STATUS_INVALID
        - STATUS_CREATED
        - STATUS_SCHEDULED_IN_MANAGER
        - STATUS_SENT
        - STATUS_MACHINE_RECEIPT
        - STATUS_ACK
        - STATUS_WILCO
        - STATUS_EXECUTING
        - STATUS_WAITING_FOR_UPDATE
        - STATUS_DONE_OK
        - STATUS_DONE_NOT_OK
        - STATUS_REPLACED
        - STATUS_CANCEL_REQUESTED
        - STATUS_COMPLETE_REQUESTED
        - STATUS_VERSION_REJECTED
      description: Status of the Task to filter by, inclusive.
      title: TaskQueryStatusFilterStatus
    TaskQueryStatusFilter:
      type: object
      properties:
        status:
          $ref: '#/components/schemas/TaskQueryStatusFilterStatus'
          description: Status of the Task to filter by, inclusive.
      title: TaskQueryStatusFilter
    Timestamp:
      type: string
      description: The datetime string in ISO 8601 format.
      title: Timestamp
    TaskQueryUpdateTimeRange:
      type: object
      properties:
        startTime:
          $ref: '#/components/schemas/Timestamp'
          description: If provided, returns Tasks only updated after this time.
        endTime:
          $ref: '#/components/schemas/Timestamp'
          description: If provided, returns Tasks only updated before this time.
      description: If provided, only provides Tasks updated within the time range.
      title: TaskQueryUpdateTimeRange
    TaskQuery:
      type: object
      properties:
        pageToken:
          type: string
          description: If set, returns results starting from the given pageToken.
        parentTaskId:
          type: string
          description: >-
            If present matches Tasks with this parent Task ID.

            Note: this is mutually exclusive with all other query parameters,
            for example, either provide parent task ID, or

            any of the remaining parameters, but not both.
        statusFilter:
          $ref: '#/components/schemas/TaskQueryStatusFilter'
        updateTimeRange:
          $ref: '#/components/schemas/TaskQueryUpdateTimeRange'
          description: If provided, only provides Tasks updated within the time range.
      description: >-
        Request to search for Tasks based on various filtering criteria.


        This message allows filtering and retrieving tasks that match specific
        conditions

        such as status, update time, parent-child relationships, assignee, or
        task type.

        Results are paginated, with the ability to request subsequent pages
        using a page token.


        By default, with no filters applied, this returns the latest version of
        all tasks.

        Filters can be combined to narrow down results, but note that
        parent_task_id filtering

        is mutually exclusive with other filtering options.
      title: TaskQuery
    TaskVersion:
      type: object
      properties:
        taskId:
          type: string
          description: >-
            The unique identifier for this task, used to distinguish it from all
            other tasks in the system.
        definitionVersion:
          type: integer
          format: uint
          description: |-
            Counter that increments on changes to the task definition.
             Unset (0) initially, starts at 1 on creation, and increments with each update to task fields.
        statusVersion:
          type: integer
          format: uint
          description: |-
            Counter that increments on changes to TaskStatus.
             Unset (0) initially, starts at 1 on creation, and increments with each status update.
      description: |-
        Versioning information for a task.

         TaskVersion provides a unique identifier for each task, along with separate version counters
         for tracking changes to the task's definition and its status. This versioning system enables
         optimistic concurrency control, ensuring that updates from multiple sources don't conflict.
      title: TaskVersion
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
    System:
      type: object
      properties:
        serviceName:
          type: string
          description: Name of the service associated with this System.
        entityId:
          type: string
          description: The Entity ID of the System.
        managesOwnScheduling:
          type: boolean
          description: >-
            Whether the System Principal (for example, an Asset) can own
            scheduling.
             This means we bypass manager-owned scheduling and defer to the system
             Principal to handle scheduling and give us status updates for the task.
             Regardless of the value defined by the client, the Task Manager will
             determine and set this value appropriately.
      description: System Principal representing some autonomous system.
      title: System
    User:
      type: object
      properties:
        userId:
          type: string
          description: The User ID associated with this User.
      description: A User Principal representing a human.
      title: User
    Agent:
      type: object
      properties:
        entityId:
          type: string
          description: Entity ID of the agent.
      description: Represents an agent capable of processing tasks.
      title: Agent
    Team:
      type: object
      properties:
        entityId:
          type: string
          description: Entity ID of the team
        members:
          type: array
          items:
            $ref: '#/components/schemas/Agent'
      description: Represents a team of agents
      title: Team
    Principal:
      type: object
      properties:
        system:
          $ref: '#/components/schemas/System'
        user:
          $ref: '#/components/schemas/User'
        team:
          $ref: '#/components/schemas/Team'
        onBehalfOf:
          $ref: '#/components/schemas/Principal'
          description: |-
            The Principal _this_ Principal is acting on behalf of.

             Likely only populated once in the nesting (i.e. the "on_behalf_of" Principal would not have another "on_behalf_of" in most cases).
      description: A Principal is an entity that has authority over this task.
      title: Principal
    TaskStatusStatus:
      type: string
      enum:
        - STATUS_INVALID
        - STATUS_CREATED
        - STATUS_SCHEDULED_IN_MANAGER
        - STATUS_SENT
        - STATUS_MACHINE_RECEIPT
        - STATUS_ACK
        - STATUS_WILCO
        - STATUS_EXECUTING
        - STATUS_WAITING_FOR_UPDATE
        - STATUS_DONE_OK
        - STATUS_DONE_NOT_OK
        - STATUS_REPLACED
        - STATUS_CANCEL_REQUESTED
        - STATUS_COMPLETE_REQUESTED
        - STATUS_VERSION_REJECTED
      description: Status of the task.
      title: TaskStatusStatus
    TaskErrorCode:
      type: string
      enum:
        - ERROR_CODE_INVALID
        - ERROR_CODE_CANCELLED
        - ERROR_CODE_REJECTED
        - ERROR_CODE_TIMEOUT
        - ERROR_CODE_FAILED
      description: Error code for task error.
      title: TaskErrorCode
    TaskError:
      type: object
      properties:
        code:
          $ref: '#/components/schemas/TaskErrorCode'
          description: Error code for task error.
        message:
          type: string
          description: Descriptive human-readable string regarding this error.
        errorDetails:
          $ref: '#/components/schemas/GoogleProtobufAny'
          description: Any additional details regarding this error.
      description: |-
        Error information associated with a task.

         TaskError contains structured error details, including an error code, a human-readable
         message, and optional extended error information. This structure is used when a task
         encounters problems during its lifecycle.
      title: TaskError
    Allocation:
      type: object
      properties:
        activeAgents:
          type: array
          items:
            $ref: '#/components/schemas/Agent'
          description: Agents actively being utilized in a task.
      description: Allocation contains a list of agents allocated to a task.
      title: Allocation
    TaskStatus:
      type: object
      properties:
        status:
          $ref: '#/components/schemas/TaskStatusStatus'
          description: Status of the task.
        taskError:
          $ref: '#/components/schemas/TaskError'
          description: Any errors associated with the task.
        progress:
          $ref: '#/components/schemas/GoogleProtobufAny'
          description: >-
            Any incremental progress on the task, should be from the
            tasks/v*/progress folder.
        result:
          $ref: '#/components/schemas/GoogleProtobufAny'
          description: Any final result of the task, should be from tasks/v*/result folder.
        startTime:
          type: string
          format: date-time
          description: >-
            Time the task began execution, may not be known even for executing
            Tasks.
        estimate:
          $ref: '#/components/schemas/GoogleProtobufAny'
          description: >-
            Any estimate for how the task will progress, should be from
            tasks/v*/estimates folder.
        allocation:
          $ref: '#/components/schemas/Allocation'
          description: Any allocated agents of the task.
      description: |-
        Comprehensive status information for a task at a given point in time.

         TaskStatus contains all status-related information for a task, including its current state,
         any error conditions, progress details, results, timing information, and resource allocations.
         This object evolves throughout a task's lifecycle, providing increasing detail as the task
         progresses from creation through execution to completion.
      title: TaskStatus
    Relations:
      type: object
      properties:
        assignee:
          $ref: '#/components/schemas/Principal'
          description: The system, user, or team assigned to the task.
        parentTaskId:
          type: string
          description: Identifies the parent task if the task is a sub-task.
      description: >-
        Describes the relationships associated with this task: the system
        assigned to
         execute the task, and the parent task, if one exists.
      title: Relations
    Replication:
      type: object
      properties:
        staleTime:
          type: string
          format: date-time
          description: The time by which this task should be assumed to be stale.
      description: Any metadata associated with the replication of a task.
      title: Replication
    Status:
      type: object
      properties:
        platformActivity:
          type: string
          description: |-
            A string that describes the activity that the entity is performing.
             Examples include "RECONNAISSANCE", "INTERDICTION", "RETURN TO BASE (RTB)", "PREPARING FOR LAUNCH".
        role:
          type: string
          description: >-
            A human-readable string that describes the role the entity is
            currently performing. E.g. "Team Member", "Commander".
      description: Contains status of entities.
      title: Status
    Position:
      type: object
      properties:
        latitudeDegrees:
          type: number
          format: double
          description: WGS84 geodetic latitude in decimal degrees.
        longitudeDegrees:
          type: number
          format: double
          description: WGS84 longitude in decimal degrees.
        altitudeHaeMeters:
          type: number
          format: double
          description: >-
            altitude as height above ellipsoid (WGS84) in meters. DoubleValue
            wrapper is used to distinguish optional from
             default 0.
        altitudeAglMeters:
          type: number
          format: double
          description: >-
            Altitude as AGL (Above Ground Level) if the upstream data source has
            this value set. This value represents the
             entity's height above the terrain. This is typically measured with a radar altimeter or by using a terrain tile
             set lookup. If the value is not set from the upstream, this value is not set.
        altitudeAsfMeters:
          type: number
          format: double
          description: >-
            Altitude as ASF (Above Sea Floor) if the upstream data source has
            this value set. If the value is not set from the upstream, this
            value is
             not set.
        pressureDepthMeters:
          type: number
          format: double
          description: >-
            The depth of the entity from the surface of the water through sensor
            measurements based on differential pressure
             between the interior and exterior of the vessel. If the value is not set from the upstream, this value is not set.
      description: |-
        WGS84 position. Position includes four altitude references.
         The data model does not currently support Mean Sea Level (MSL) references,
         such as the Earth Gravitational Model 1996 (EGM-96) and the Earth Gravitational Model 2008 (EGM-08).
         If the only altitude reference available to your integration is MSL, convert it to
         Height Above Ellipsoid (HAE) and populate the altitude_hae_meters field.
      title: Position
    ENU:
      type: object
      properties:
        e:
          type: number
          format: double
        'n':
          type: number
          format: double
        u:
          type: number
          format: double
      title: ENU
    Quaternion:
      type: object
      properties:
        x:
          type: number
          format: double
          description: x, y, z are vector portion, w is scalar
        'y':
          type: number
          format: double
        z:
          type: number
          format: double
        w:
          type: number
          format: double
      title: Quaternion
    Location:
      type: object
      properties:
        position:
          $ref: '#/components/schemas/Position'
          description: see Position definition for details.
        velocityEnu:
          $ref: '#/components/schemas/ENU'
          description: >-
            Velocity in an ENU reference frame centered on the corresponding
            position. All units are meters per second.
        speedMps:
          type: number
          format: double
          description: >-
            Speed is the magnitude of velocity_enu vector [sqrt(e^2 + n^2 +
            u^2)] when present, measured in m/s.
        acceleration:
          $ref: '#/components/schemas/ENU'
          description: The entity's acceleration in meters/s^2.
        attitudeEnu:
          $ref: '#/components/schemas/Quaternion'
          description: quaternion to translate from entity body frame to it's ENU frame
      description: Available for Entities that have a single or primary Location.
      title: Location
    EntityManager.TMat3:
      type: object
      properties:
        mxx:
          type: number
          format: double
        mxy:
          type: number
          format: double
        mxz:
          type: number
          format: double
        myy:
          type: number
          format: double
        myz:
          type: number
          format: double
        mzz:
          type: number
          format: double
      description: Symmetric 3d matrix only representing the upper right triangle.
      title: EntityManager.TMat3
    ErrorEllipse:
      type: object
      properties:
        probability:
          type: number
          format: double
          description: >-
            Defines the probability in percentage that an entity lies within the
            given ellipse: 0-1.
        semiMajorAxisM:
          type: number
          format: double
          description: >-
            Defines the distance from the center point of the ellipse to the
            furthest distance on the perimeter in meters.
        semiMinorAxisM:
          type: number
          format: double
          description: >-
            Defines the distance from the center point of the ellipse to the
            shortest distance on the perimeter in meters.
        orientationD:
          type: number
          format: double
          description: >-
            The orientation of the semi-major relative to true north in degrees
            from clockwise: 0-180 due to symmetry across the semi-minor axis.
      description: >-
        Indicates ellipse characteristics and probability that an entity lies
        within the defined ellipse.
      title: ErrorEllipse
    LocationUncertainty:
      type: object
      properties:
        positionEnuCov:
          $ref: '#/components/schemas/EntityManager.TMat3'
          description: >-
            Positional covariance represented by the upper triangle of the
            covariance matrix. It is valid to populate
             only the diagonal of the matrix if the full covariance matrix is unknown.
        velocityEnuCov:
          $ref: '#/components/schemas/EntityManager.TMat3'
          description: >-
            Velocity covariance represented by the upper triangle of the
            covariance matrix. It is valid to populate
             only the diagonal of the matrix if the full covariance matrix is unknown.
        positionErrorEllipse:
          $ref: '#/components/schemas/ErrorEllipse'
          description: >-
            An ellipse that describes the certainty probability and error
            boundary for a given geolocation.
      description: Uncertainty of entity position and velocity, if available.
      title: LocationUncertainty
    GeoPoint:
      type: object
      properties:
        position:
          $ref: '#/components/schemas/Position'
      description: |-
        A point shaped geo-entity.
         See https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2
      title: GeoPoint
    GeoLine:
      type: object
      properties:
        positions:
          type: array
          items:
            $ref: '#/components/schemas/Position'
      description: |-
        A line shaped geo-entity.
         See https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.4
      title: GeoLine
    GeoPolygonPosition:
      type: object
      properties:
        position:
          $ref: '#/components/schemas/Position'
          description: base position. if no altitude set, its on the ground.
        heightM:
          type: number
          format: double
          description: |-
            optional height above base position to extrude in meters.
             for a given polygon, all points should have a height or none of them.
             strictly GeoJSON compatible polygons will not have this set.
      description: A position in a GeoPolygon with an optional extruded height.
      title: GeoPolygonPosition
    LinearRing:
      type: object
      properties:
        positions:
          type: array
          items:
            $ref: '#/components/schemas/GeoPolygonPosition'
      description: A closed ring of points. The first and last point must be the same.
      title: LinearRing
    GeoPolygon:
      type: object
      properties:
        rings:
          type: array
          items:
            $ref: '#/components/schemas/LinearRing'
          description: >-
            An array of LinearRings where the first item is the exterior ring
            and subsequent items are interior rings.
        isRectangle:
          type: boolean
          description: >-
            An extension hint that this polygon is a rectangle. When true this
            implies several things:
             * exactly 1 linear ring with 5 points (starting corner, 3 other corners and start again)
             * each point has the same altitude corresponding with the plane of the rectangle
             * each point has the same height (either all present and equal, or all not present)
      description: |-
        A polygon shaped geo-entity.
         See https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6, only canonical representations accepted
      title: GeoPolygon
    GeoEllipse:
      type: object
      properties:
        semiMajorAxisM:
          type: number
          format: double
          description: >-
            Defines the distance from the center point of the ellipse to the
            furthest distance on the perimeter in meters.
        semiMinorAxisM:
          type: number
          format: double
          description: >-
            Defines the distance from the center point of the ellipse to the
            shortest distance on the perimeter in meters.
        orientationD:
          type: number
          format: double
          description: >-
            The orientation of the semi-major relative to true north in degrees
            from clockwise: 0-180 due to symmetry across the semi-minor axis.
        heightM:
          type: number
          format: double
          description: >-
            Optional height above entity position to extrude in meters. A
            non-zero value creates an elliptic cylinder
      description: |-
        An ellipse shaped geo-entity.
         For a circle, the major and minor axis would be the same values.
         This shape is NOT Geo-JSON compatible.
      title: GeoEllipse
    GeoEllipsoid:
      type: object
      properties:
        forwardAxisM:
          type: number
          format: double
          description: >-
            Defines the distance from the center point to the surface along the
            forward axis
        sideAxisM:
          type: number
          format: double
          description: >-
            Defines the distance from the center point to the surface along the
            side axis
        upAxisM:
          type: number
          format: double
          description: >-
            Defines the distance from the center point to the surface along the
            up axis
      description: |-
        An ellipsoid shaped geo-entity.
         Principal axis lengths are defined in entity body space
         This shape is NOT Geo-JSON compatible.
      title: GeoEllipsoid
    GeoShape:
      type: object
      properties:
        point:
          $ref: '#/components/schemas/GeoPoint'
        line:
          $ref: '#/components/schemas/GeoLine'
        polygon:
          $ref: '#/components/schemas/GeoPolygon'
        ellipse:
          $ref: '#/components/schemas/GeoEllipse'
        ellipsoid:
          $ref: '#/components/schemas/GeoEllipsoid'
      description: A component that describes the shape of a geo-entity.
      title: GeoShape
    GeoDetailsType:
      type: string
      enum:
        - GEO_TYPE_INVALID
        - GEO_TYPE_GENERAL
        - GEO_TYPE_HAZARD
        - GEO_TYPE_EMERGENCY
        - GEO_TYPE_ENGAGEMENT_ZONE
        - GEO_TYPE_CONTROL_AREA
        - GEO_TYPE_BULLSEYE
        - GEO_TYPE_ACM
      title: GeoDetailsType
    ControlAreaDetailsType:
      type: string
      enum:
        - CONTROL_AREA_TYPE_INVALID
        - CONTROL_AREA_TYPE_KEEP_IN_ZONE
        - CONTROL_AREA_TYPE_KEEP_OUT_ZONE
        - CONTROL_AREA_TYPE_DITCH_ZONE
        - CONTROL_AREA_TYPE_LOITER_ZONE
      title: ControlAreaDetailsType
    ControlAreaDetails:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ControlAreaDetailsType'
      description: |-
        Determines the type of control area being represented by the geo-entity,
         in which an asset can, or cannot, operate.
      title: ControlAreaDetails
    AcmDetailsAcmType:
      type: string
      enum:
        - ACM_DETAIL_TYPE_INVALID
        - ACM_DETAIL_TYPE_LANDING_ZONE
      title: AcmDetailsAcmType
    ACMDetails:
      type: object
      properties:
        acmType:
          $ref: '#/components/schemas/AcmDetailsAcmType'
        acmDescription:
          type: string
          description: >-
            Used for loosely typed associations, such as assignment to a
            specific fires unit.
             Limit to 150 characters.
      title: ACMDetails
    GeoDetails:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/GeoDetailsType'
        controlArea:
          $ref: '#/components/schemas/ControlAreaDetails'
        acm:
          $ref: '#/components/schemas/ACMDetails'
      description: A component that describes a geo-entity.
      title: GeoDetails
    AlternateIdType:
      type: string
      enum:
        - ALT_ID_TYPE_INVALID
        - ALT_ID_TYPE_TRACK_ID_2
        - ALT_ID_TYPE_TRACK_ID_1
        - ALT_ID_TYPE_SPI_ID
        - ALT_ID_TYPE_NITF_FILE_TITLE
        - ALT_ID_TYPE_TRACK_REPO_ALERT_ID
        - ALT_ID_TYPE_ASSET_ID
        - ALT_ID_TYPE_LINK16_TRACK_NUMBER
        - ALT_ID_TYPE_LINK16_JU
        - ALT_ID_TYPE_NCCT_MESSAGE_ID
        - ALT_ID_TYPE_CALLSIGN
        - ALT_ID_TYPE_MMSI_ID
        - ALT_ID_TYPE_VMF_URN
        - ALT_ID_TYPE_IMO_ID
        - ALT_ID_TYPE_VMF_TARGET_NUMBER
        - ALT_ID_TYPE_SERIAL_NUMBER
        - ALT_ID_TYPE_REGISTRATION_ID
        - ALT_ID_TYPE_IBS_GID
        - ALT_ID_TYPE_DODAAC
        - ALT_ID_TYPE_UIC
        - ALT_ID_TYPE_NORAD_CAT_ID
        - ALT_ID_TYPE_UNOOSA_NAME
        - ALT_ID_TYPE_UNOOSA_ID
      title: AlternateIdType
    AlternateId:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: '#/components/schemas/AlternateIdType'
      description: An alternate id for an Entity.
      title: AlternateId
    Aliases:
      type: object
      properties:
        alternateIds:
          type: array
          items:
            $ref: '#/components/schemas/AlternateId'
        name:
          type: string
          description: The best available version of the entity's display name.
      description: Available for any Entities with alternate ids in other systems.
      title: Aliases
    UInt32Range:
      type: object
      properties:
        lowerBound:
          type: integer
          format: uint
        upperBound:
          type: integer
          format: uint
      title: UInt32Range
    LlaAltitudeReference:
      type: string
      enum:
        - ALTITUDE_REFERENCE_INVALID
        - ALTITUDE_REFERENCE_HEIGHT_ABOVE_WGS84
        - ALTITUDE_REFERENCE_HEIGHT_ABOVE_EGM96
        - ALTITUDE_REFERENCE_UNKNOWN
        - ALTITUDE_REFERENCE_BAROMETRIC
        - ALTITUDE_REFERENCE_ABOVE_SEA_FLOOR
        - ALTITUDE_REFERENCE_BELOW_SEA_SURFACE
      description: |-
        Meaning of alt.
         altitude in meters above either WGS84 or EGM96, use altitude_reference to
         determine what zero means.
      title: LlaAltitudeReference
    LLA:
      type: object
      properties:
        lon:
          type: number
          format: double
        lat:
          type: number
          format: double
        alt:
          type: number
          format: double
        is2d:
          type: boolean
        altitudeReference:
          $ref: '#/components/schemas/LlaAltitudeReference'
          description: |-
            Meaning of alt.
             altitude in meters above either WGS84 or EGM96, use altitude_reference to
             determine what zero means.
      title: LLA
    Pose:
      type: object
      properties:
        pos:
          $ref: '#/components/schemas/LLA'
          description: Geospatial location defined by this Pose.
        attEnu:
          $ref: '#/components/schemas/Quaternion'
          description: >-
            The quaternion to transform a point in the Pose frame to the ENU
            frame. The Pose frame could be Body, Turret,
             etc and is determined by the context in which this Pose is used.
             The normal convention for defining orientation is to list the frames of transformation, for example
             att_gimbal_to_enu is the quaternion which transforms a point in the gimbal frame to the body frame, but
             in this case we truncate to att_enu because the Pose frame isn't defined. A potentially better name for this
             field would have been att_pose_to_enu.

             Implementations of this quaternion should left multiply this quaternion to transform a point from the Pose frame
             to the enu frame.

             Point<Pose\> posePt{1,0,0};
             Rotation<Enu, Pose\> attPoseToEnu{};
             Point<Enu\> = attPoseToEnu*posePt;

             This transformed point represents some vector in ENU space that is aligned with the x axis of the attPoseToEnu
             matrix.

             An alternative matrix expression is as follows:
             ptEnu = M x ptPose
      title: Pose
    TMat2:
      type: object
      properties:
        mxx:
          type: number
          format: double
        mxy:
          type: number
          format: double
        myy:
          type: number
          format: double
      description: >-
        symmetric 2d matrix only representing the upper right triangle, useful
        for
         covariance matrices
      title: TMat2
    AngleOfArrival:
      type: object
      properties:
        relativePose:
          $ref: '#/components/schemas/Pose'
          description: >-
            Origin (LLA) and attitude (relative to ENU) of a ray pointing
            towards the detection. The attitude represents a
             forward-left-up (FLU) frame where the x-axis (1, 0, 0) is pointing towards the target.
        bearingElevationCovarianceRad2:
          $ref: '#/components/schemas/TMat2'
          description: >-
            Bearing/elevation covariance matrix where bearing is defined in
            radians CCW+ about the z-axis from the x-axis of FLU frame
             and elevation is positive down from the FL/XY plane.
             mxx = bearing variance in rad^2
             mxy = bearing/elevation covariance in rad^2
             myy = elevation variance in rad^2
      description: The direction from which the signal is received
      title: AngleOfArrival
    Measurement:
      type: object
      properties:
        value:
          type: number
          format: double
          description: The value of the measurement.
        sigma:
          type: number
          format: double
          description: Estimated one standard deviation in same unit as the value.
      description: A component that describes some measured value with error.
      title: Measurement
    LineOfBearing:
      type: object
      properties:
        angleOfArrival:
          $ref: '#/components/schemas/AngleOfArrival'
          description: The direction pointing from this entity to the detection
        rangeEstimateM:
          $ref: '#/components/schemas/Measurement'
          description: The estimated distance of the detection
        maxRangeM:
          $ref: '#/components/schemas/Measurement'
          description: The maximum distance of the detection
      description: A line of bearing of a signal.
      title: LineOfBearing
    Tracked:
      type: object
      properties:
        trackQualityWrapper:
          type: integer
          description: Quality score, 0-15, nil if none
        sensorHits:
          type: integer
          description: Sensor hits aggregation on the tracked entity.
        numberOfObjects:
          $ref: '#/components/schemas/UInt32Range'
          description: >-
            Estimated number of objects or units that are represented by this
            entity. Known as Strength in certain contexts (Link16)
             if UpperBound == LowerBound; (strength = LowerBound)
             If both UpperBound and LowerBound are defined; strength is between LowerBound and UpperBound (represented as string "Strength: 4-5")
             If UpperBound is defined only (LowerBound unset), Strength ≤ UpperBound
             If LowerBound is defined only (UpperBound unset), LowerBound ≤ Strength
             0 indicates unset.
        radarCrossSection:
          type: number
          format: double
          description: >-
            The radar cross section (RCS) is a measure of how detectable an
            object is by radar. A large RCS indicates an object is more easily
             detected. The unit is “decibels per square meter,” or dBsm
        lastMeasurementTime:
          type: string
          format: date-time
          description: Timestamp of the latest tracking measurement for this entity.
        lineOfBearing:
          $ref: '#/components/schemas/LineOfBearing'
          description: >-
            The relative position of a track with respect to the entity that is
            tracking it. Used for tracks that do not yet have a 3D position.
             For this entity (A), being tracked by some entity (B), this LineOfBearing would express a ray from B to A.
      description: Available for Entities that are tracked.
      title: Tracked
    PrimaryCorrelation:
      type: object
      properties:
        secondaryEntityIds:
          type: array
          items:
            type: string
          description: The secondary entity IDs part of this correlation.
      title: PrimaryCorrelation
    Provenance:
      type: object
      properties:
        integrationName:
          type: string
          description: Name of the integration that produced this entity
        dataType:
          type: string
          description: 'Source data type of this entity. Examples: ADSB, Link16, etc.'
        sourceId:
          type: string
          description: An ID that allows an element from a source to be uniquely identified
        sourceUpdateTime:
          type: string
          format: date-time
          description: >-
            The time, according to the source system, that the data in the
            entity was last modified. Generally, this should
             be the time that the source-reported time of validity of the data in the entity. This field must be
             updated with every change to the entity or else Entity Manager will discard the update.
        sourceDescription:
          type: string
          description: >-
            Description of the modification source. In the case of a user this
            is the email address.
      description: Data provenance.
      title: Provenance
    CorrelationMetadataReplicationMode:
      type: string
      enum:
        - CORRELATION_REPLICATION_MODE_INVALID
        - CORRELATION_REPLICATION_MODE_LOCAL
        - CORRELATION_REPLICATION_MODE_GLOBAL
      description: >-
        Indicates how the correlation will be distributed. Because a correlation
        is composed of
         multiple secondaries, each of which may have been correlated with different replication
         modes, the distribution of the correlation is composed of distributions of the individual
         entities within the correlation set.
         For example, if there are two secondary entities A and B correlated against a primary C,
         with A having been correlated globally and B having been correlated locally, then the
         correlation set that is distributed globally than what is known locally in the node.
      title: CorrelationMetadataReplicationMode
    CorrelationMetadataType:
      type: string
      enum:
        - CORRELATION_TYPE_INVALID
        - CORRELATION_TYPE_MANUAL
        - CORRELATION_TYPE_AUTOMATED
      description: What type of (de)correlation was this entity added with.
      title: CorrelationMetadataType
    CorrelationMetadata:
      type: object
      properties:
        provenance:
          $ref: '#/components/schemas/Provenance'
          description: Who or what added this entity to the (de)correlation.
        replicationMode:
          $ref: '#/components/schemas/CorrelationMetadataReplicationMode'
          description: >-
            Indicates how the correlation will be distributed. Because a
            correlation is composed of
             multiple secondaries, each of which may have been correlated with different replication
             modes, the distribution of the correlation is composed of distributions of the individual
             entities within the correlation set.
             For example, if there are two secondary entities A and B correlated against a primary C,
             with A having been correlated globally and B having been correlated locally, then the
             correlation set that is distributed globally than what is known locally in the node.
        type:
          $ref: '#/components/schemas/CorrelationMetadataType'
          description: What type of (de)correlation was this entity added with.
      title: CorrelationMetadata
    SecondaryCorrelation:
      type: object
      properties:
        primaryEntityId:
          type: string
          description: The primary of this correlation.
        metadata:
          $ref: '#/components/schemas/CorrelationMetadata'
          description: Metadata about the correlation.
      title: SecondaryCorrelation
    PrimaryMembership:
      type: object
      properties: {}
      title: PrimaryMembership
    NonPrimaryMembership:
      type: object
      properties: {}
      title: NonPrimaryMembership
    CorrelationMembership:
      type: object
      properties:
        correlationSetId:
          type: string
          description: The ID of the correlation set this entity belongs to.
        primary:
          $ref: '#/components/schemas/PrimaryMembership'
          description: >-
            This entity is the primary of a correlation set meaning that it
            serves as the representative
             entity of the correlation set.
        nonPrimary:
          $ref: '#/components/schemas/NonPrimaryMembership'
          description: >-
            This entity is not the primary of the correlation set. Note that
            there may not
             be a primary at all.
        metadata:
          $ref: '#/components/schemas/CorrelationMetadata'
          description: Additional metadata on this correlation.
      title: CorrelationMembership
    DecorrelatedAll:
      type: object
      properties:
        metadata:
          $ref: '#/components/schemas/CorrelationMetadata'
          description: Metadata about the decorrelation.
      title: DecorrelatedAll
    DecorrelatedSingle:
      type: object
      properties:
        entityId:
          type: string
          description: The entity that was decorrelated against.
        metadata:
          $ref: '#/components/schemas/CorrelationMetadata'
          description: Metadata about the decorrelation.
      title: DecorrelatedSingle
    Decorrelation:
      type: object
      properties:
        all:
          $ref: '#/components/schemas/DecorrelatedAll'
          description: >-
            This will be specified if this entity was decorrelated against all
            other entities.
        decorrelatedEntities:
          type: array
          items:
            $ref: '#/components/schemas/DecorrelatedSingle'
          description: >-
            A list of decorrelated entities that have been explicitly
            decorrelated against this entity
             which prevents lower precedence correlations from overriding it in the future.
             For example, if an operator in the UI decorrelated tracks A and B, any automated
             correlators would be unable to correlate them since manual decorrelations have
             higher precedence than automatic ones. Precedence is determined by both correlation
             type and replication mode.
      title: Decorrelation
    Correlation:
      type: object
      properties:
        primary:
          $ref: '#/components/schemas/PrimaryCorrelation'
          description: >-
            This entity is the primary of a correlation meaning that it serves
            as the representative
             entity of the correlation set.
        secondary:
          $ref: '#/components/schemas/SecondaryCorrelation'
          description: >-
            This entity is a secondary of a correlation meaning that it will be
            represented by the
             primary of the correlation set.
        membership:
          $ref: '#/components/schemas/CorrelationMembership'
          description: If present, this entity is a part of a correlation set.
        decorrelation:
          $ref: '#/components/schemas/Decorrelation'
          description: >-
            If present, this entity was explicitly decorrelated from one or more
            entities.
             An entity can be both correlated and decorrelated as long as they are disjoint sets.
             An example would be if a user in the UI decides that two tracks are not actually the
             same despite an automatic correlator having correlated them. The user would then
             decorrelate the two tracks and this decorrelation would be preserved preventing the
             correlator from re-correlating them at a later time.
      description: >-
        Available for Entities that are a correlated (N to 1) set of entities.
        This will be present on
         each entity in the set.
      title: Correlation
    MilViewDisposition:
      type: string
      enum:
        - DISPOSITION_UNKNOWN
        - DISPOSITION_FRIENDLY
        - DISPOSITION_HOSTILE
        - DISPOSITION_SUSPICIOUS
        - DISPOSITION_ASSUMED_FRIENDLY
        - DISPOSITION_NEUTRAL
        - DISPOSITION_PENDING
      title: MilViewDisposition
    MilViewEnvironment:
      type: string
      enum:
        - ENVIRONMENT_UNKNOWN
        - ENVIRONMENT_AIR
        - ENVIRONMENT_SURFACE
        - ENVIRONMENT_SUB_SURFACE
        - ENVIRONMENT_LAND
        - ENVIRONMENT_SPACE
      title: MilViewEnvironment
    MilViewNationality:
      type: string
      enum:
        - NATIONALITY_INVALID
        - NATIONALITY_ALBANIA
        - NATIONALITY_ALGERIA
        - NATIONALITY_ARGENTINA
        - NATIONALITY_ARMENIA
        - NATIONALITY_AUSTRALIA
        - NATIONALITY_AUSTRIA
        - NATIONALITY_AZERBAIJAN
        - NATIONALITY_BELARUS
        - NATIONALITY_BELGIUM
        - NATIONALITY_BOLIVIA
        - NATIONALITY_BOSNIA_AND_HERZEGOVINA
        - NATIONALITY_BRAZIL
        - NATIONALITY_BULGARIA
        - NATIONALITY_CAMBODIA
        - NATIONALITY_CANADA
        - NATIONALITY_CHILE
        - NATIONALITY_CHINA
        - NATIONALITY_COLOMBIA
        - NATIONALITY_CROATIA
        - NATIONALITY_CUBA
        - NATIONALITY_CYPRUS
        - NATIONALITY_CZECH_REPUBLIC
        - NATIONALITY_DEMOCRATIC_PEOPLES_REPUBLIC_OF_KOREA
        - NATIONALITY_DENMARK
        - NATIONALITY_DOMINICAN_REPUBLIC
        - NATIONALITY_ECUADOR
        - NATIONALITY_EGYPT
        - NATIONALITY_ESTONIA
        - NATIONALITY_ETHIOPIA
        - NATIONALITY_FINLAND
        - NATIONALITY_FRANCE
        - NATIONALITY_GEORGIA
        - NATIONALITY_GERMANY
        - NATIONALITY_GREECE
        - NATIONALITY_GUATEMALA
        - NATIONALITY_GUINEA
        - NATIONALITY_HUNGARY
        - NATIONALITY_ICELAND
        - NATIONALITY_INDIA
        - NATIONALITY_INDONESIA
        - NATIONALITY_INTERNATIONAL_RED_CROSS
        - NATIONALITY_IRAQ
        - NATIONALITY_IRELAND
        - NATIONALITY_ISLAMIC_REPUBLIC_OF_IRAN
        - NATIONALITY_ISRAEL
        - NATIONALITY_ITALY
        - NATIONALITY_JAMAICA
        - NATIONALITY_JAPAN
        - NATIONALITY_JORDAN
        - NATIONALITY_KAZAKHSTAN
        - NATIONALITY_KUWAIT
        - NATIONALITY_KYRGHYZ_REPUBLIC
        - NATIONALITY_LAO_PEOPLES_DEMOCRATIC_REPUBLIC
        - NATIONALITY_LATVIA
        - NATIONALITY_LEBANON
        - NATIONALITY_LIBERIA
        - NATIONALITY_LITHUANIA
        - NATIONALITY_LUXEMBOURG
        - NATIONALITY_MADAGASCAR
        - NATIONALITY_MALAYSIA
        - NATIONALITY_MALTA
        - NATIONALITY_MEXICO
        - NATIONALITY_MOLDOVA
        - NATIONALITY_MONTENEGRO
        - NATIONALITY_MOROCCO
        - NATIONALITY_MYANMAR
        - NATIONALITY_NATO
        - NATIONALITY_NETHERLANDS
        - NATIONALITY_NEW_ZEALAND
        - NATIONALITY_NICARAGUA
        - NATIONALITY_NIGERIA
        - NATIONALITY_NORWAY
        - NATIONALITY_PAKISTAN
        - NATIONALITY_PANAMA
        - NATIONALITY_PARAGUAY
        - NATIONALITY_PERU
        - NATIONALITY_PHILIPPINES
        - NATIONALITY_POLAND
        - NATIONALITY_PORTUGAL
        - NATIONALITY_REPUBLIC_OF_KOREA
        - NATIONALITY_ROMANIA
        - NATIONALITY_RUSSIA
        - NATIONALITY_SAUDI_ARABIA
        - NATIONALITY_SENEGAL
        - NATIONALITY_SERBIA
        - NATIONALITY_SINGAPORE
        - NATIONALITY_SLOVAKIA
        - NATIONALITY_SLOVENIA
        - NATIONALITY_SOUTH_AFRICA
        - NATIONALITY_SPAIN
        - NATIONALITY_SUDAN
        - NATIONALITY_SWEDEN
        - NATIONALITY_SWITZERLAND
        - NATIONALITY_SYRIAN_ARAB_REPUBLIC
        - NATIONALITY_TAIWAN
        - NATIONALITY_TAJIKISTAN
        - NATIONALITY_THAILAND
        - NATIONALITY_THE_FORMER_YUGOSLAV_REPUBLIC_OF_MACEDONIA
        - NATIONALITY_TUNISIA
        - NATIONALITY_TURKEY
        - NATIONALITY_TURKMENISTAN
        - NATIONALITY_UGANDA
        - NATIONALITY_UKRAINE
        - NATIONALITY_UNITED_KINGDOM
        - NATIONALITY_UNITED_NATIONS
        - NATIONALITY_UNITED_REPUBLIC_OF_TANZANIA
        - NATIONALITY_UNITED_STATES_OF_AMERICA
        - NATIONALITY_URUGUAY
        - NATIONALITY_UZBEKISTAN
        - NATIONALITY_VENEZUELA
        - NATIONALITY_VIETNAM
        - NATIONALITY_YEMEN
        - NATIONALITY_ZIMBABWE
      title: MilViewNationality
    MilView:
      type: object
      properties:
        disposition:
          $ref: '#/components/schemas/MilViewDisposition'
        environment:
          $ref: '#/components/schemas/MilViewEnvironment'
        nationality:
          $ref: '#/components/schemas/MilViewNationality'
      description: Provides the disposition, environment, and nationality of an Entity.
      title: MilView
    OntologyTemplate:
      type: string
      enum:
        - TEMPLATE_INVALID
        - TEMPLATE_TRACK
        - TEMPLATE_SENSOR_POINT_OF_INTEREST
        - TEMPLATE_ASSET
        - TEMPLATE_GEO
        - TEMPLATE_SIGNAL_OF_INTEREST
      description: >-
        The template used when creating this entity. Specifies minimum required
        components.
      title: OntologyTemplate
    Ontology:
      type: object
      properties:
        platformType:
          type: string
          description: >-
            A string that describes the entity's high-level type with natural
            language.
        specificType:
          type: string
          description: A string that describes the entity's exact model or type.
        template:
          $ref: '#/components/schemas/OntologyTemplate'
          description: >-
            The template used when creating this entity. Specifies minimum
            required components.
      description: Ontology of the entity.
      title: Ontology
    SensorOperationalState:
      type: string
      enum:
        - OPERATIONAL_STATE_INVALID
        - OPERATIONAL_STATE_OFF
        - OPERATIONAL_STATE_NON_OPERATIONAL
        - OPERATIONAL_STATE_DEGRADED
        - OPERATIONAL_STATE_OPERATIONAL
        - OPERATIONAL_STATE_DENIED
      title: SensorOperationalState
    SensorSensorType:
      type: string
      enum:
        - SENSOR_TYPE_INVALID
        - SENSOR_TYPE_RADAR
        - SENSOR_TYPE_CAMERA
        - SENSOR_TYPE_TRANSPONDER
        - SENSOR_TYPE_RF
        - SENSOR_TYPE_GPS
        - SENSOR_TYPE_PTU_POS
        - SENSOR_TYPE_PERIMETER
        - SENSOR_TYPE_SONAR
      description: The type of sensor
      title: SensorSensorType
    Frequency:
      type: object
      properties:
        frequencyHz:
          $ref: '#/components/schemas/Measurement'
          description: Indicates a frequency of a signal (Hz) with its standard deviation.
      description: A component for describing frequency.
      title: Frequency
    FrequencyRange:
      type: object
      properties:
        minimumFrequencyHz:
          $ref: '#/components/schemas/Frequency'
          description: Indicates the lowest measured frequency of a signal (Hz).
        maximumFrequencyHz:
          $ref: '#/components/schemas/Frequency'
          description: Indicates the maximum measured frequency of a signal (Hz).
      description: A component to represent a frequency range.
      title: FrequencyRange
    Bandwidth:
      type: object
      properties:
        bandwidthHz:
          type: number
          format: double
      description: Describes the bandwidth of a signal
      title: Bandwidth
    BandwidthRange:
      type: object
      properties:
        minimumBandwidth:
          $ref: '#/components/schemas/Bandwidth'
        maximumBandwidth:
          $ref: '#/components/schemas/Bandwidth'
      description: A component that describes the min and max bandwidths of a sensor
      title: BandwidthRange
    RFConfiguration:
      type: object
      properties:
        frequencyRangeHz:
          type: array
          items:
            $ref: '#/components/schemas/FrequencyRange'
          description: Frequency ranges that are available for this sensor.
        bandwidthRangeHz:
          type: array
          items:
            $ref: '#/components/schemas/BandwidthRange'
          description: Bandwidth ranges that are available for this sensor.
      description: Represents RF configurations supported on this sensor.
      title: RFConfiguration
    ProjectedFrustum:
      type: object
      properties:
        upperLeft:
          $ref: '#/components/schemas/Position'
          description: Upper left point of the frustum.
        upperRight:
          $ref: '#/components/schemas/Position'
          description: Upper right point of the frustum.
        bottomRight:
          $ref: '#/components/schemas/Position'
          description: Bottom right point of the frustum.
        bottomLeft:
          $ref: '#/components/schemas/Position'
          description: Bottom left point of the frustum.
      description: >-
        Represents a frustum in which which all four corner points project onto
        the ground. All points in this message
         are optional, if the projection to the ground fails then they will not be populated.
      title: ProjectedFrustum
    EntityManager.Pose:
      type: object
      properties:
        pos:
          $ref: '#/components/schemas/Position'
          description: Geospatial location defined by this Pose.
        orientation:
          $ref: '#/components/schemas/Quaternion'
          description: >-
            The quaternion to transform a point in the Pose frame to the ENU
            frame. The Pose frame could be Body, Turret,
             etc and is determined by the context in which this Pose is used.
             The normal convention for defining orientation is to list the frames of transformation, for example
             att_gimbal_to_enu is the quaternion which transforms a point in the gimbal frame to the body frame, but
             in this case we truncate to att_enu because the Pose frame isn't defined. A potentially better name for this
             field would have been att_pose_to_enu.

             Implementations of this quaternion should left multiply this quaternion to transform a point from the Pose frame
             to the enu frame.
      title: EntityManager.Pose
    FieldOfViewMode:
      type: string
      enum:
        - SENSOR_MODE_INVALID
        - SENSOR_MODE_SEARCH
        - SENSOR_MODE_TRACK
        - SENSOR_MODE_WEAPON_SUPPORT
        - SENSOR_MODE_AUTO
        - SENSOR_MODE_MUTE
      description: >-
        The mode that this sensor is currently in, used to display for context
        in the UI. Some sensors can emit multiple
         sensor field of views with different modes, for example a radar can simultaneously search broadly and perform
         tighter bounded tracking.
      title: FieldOfViewMode
    FieldOfView:
      type: object
      properties:
        fovId:
          type: integer
          description: >-
            The Id for one instance of a FieldOfView, persisted across multiple
            updates to provide continuity during
             smoothing. This is relevant for sensors where the dwell schedule is on the order of
             milliseconds, making multiple FOVs a requirement for proper display of search beams.
        mountId:
          type: string
          description: The Id of the mount the sensor is on.
        projectedFrustum:
          $ref: '#/components/schemas/ProjectedFrustum'
          description: The field of view the sensor projected onto the ground.
        projectedCenterRay:
          $ref: '#/components/schemas/Position'
          description: Center ray of the frustum projected onto the ground.
        centerRayPose:
          $ref: '#/components/schemas/EntityManager.Pose'
          description: >-
            The origin and direction of the center ray for this sensor relative
            to the ENU frame. A ray which is aligned with
             the positive X axis in the sensor frame will be transformed into the ray along the sensor direction in the ENU
             frame when transformed by the quaternion contained in this pose.
        horizontalFov:
          type: number
          format: double
          description: Horizontal field of view in radians.
        verticalFov:
          type: number
          format: double
          description: Vertical field of view in radians.
        range:
          type: number
          format: double
          description: Sensor range in meters.
        mode:
          $ref: '#/components/schemas/FieldOfViewMode'
          description: >-
            The mode that this sensor is currently in, used to display for
            context in the UI. Some sensors can emit multiple
             sensor field of views with different modes, for example a radar can simultaneously search broadly and perform
             tighter bounded tracking.
      description: Sensor Field Of View closely resembling fov.proto SensorFieldOfView.
      title: FieldOfView
    Sensor:
      type: object
      properties:
        sensorId:
          type: string
          description: >-
            This generally is used to indicate a specific type at a more
            detailed granularity. E.g. COMInt or LWIR
        operationalState:
          $ref: '#/components/schemas/SensorOperationalState'
        sensorType:
          $ref: '#/components/schemas/SensorSensorType'
          description: The type of sensor
        sensorDescription:
          type: string
          description: A human readable description of the sensor
        rfConfiguraton:
          $ref: '#/components/schemas/RFConfiguration'
          description: RF configuration details of the sensor
        lastDetectionTimestamp:
          type: string
          format: date-time
          description: Time of the latest detection from the sensor
        fieldsOfView:
          type: array
          items:
            $ref: '#/components/schemas/FieldOfView'
          description: Multiple fields of view for a single sensor component
      description: Individual sensor configuration.
      title: Sensor
    Sensors:
      type: object
      properties:
        sensors:
          type: array
          items:
            $ref: '#/components/schemas/Sensor'
      description: List of sensors available for an entity.
      title: Sensors
    PayloadConfigurationEffectiveEnvironmentItems:
      type: string
      enum:
        - ENVIRONMENT_UNKNOWN
        - ENVIRONMENT_AIR
        - ENVIRONMENT_SURFACE
        - ENVIRONMENT_SUB_SURFACE
        - ENVIRONMENT_LAND
        - ENVIRONMENT_SPACE
      title: PayloadConfigurationEffectiveEnvironmentItems
    PayloadConfigurationPayloadOperationalState:
      type: string
      enum:
        - PAYLOAD_OPERATIONAL_STATE_INVALID
        - PAYLOAD_OPERATIONAL_STATE_OFF
        - PAYLOAD_OPERATIONAL_STATE_NON_OPERATIONAL
        - PAYLOAD_OPERATIONAL_STATE_DEGRADED
        - PAYLOAD_OPERATIONAL_STATE_OPERATIONAL
        - PAYLOAD_OPERATIONAL_STATE_OUT_OF_SERVICE
        - PAYLOAD_OPERATIONAL_STATE_UNKNOWN
      description: The operational state of this payload.
      title: PayloadConfigurationPayloadOperationalState
    PayloadConfiguration:
      type: object
      properties:
        capabilityId:
          type: string
          description: |-
            Identifying ID for the capability.
             This ID may be used multiple times to represent payloads that are the same capability but have different operational states
        quantity:
          type: integer
          format: uint
          description: The number of payloads currently available in the configuration.
        effectiveEnvironment:
          type: array
          items:
            $ref: '#/components/schemas/PayloadConfigurationEffectiveEnvironmentItems'
          description: The target environments the configuration is effective against.
        payloadOperationalState:
          $ref: '#/components/schemas/PayloadConfigurationPayloadOperationalState'
          description: The operational state of this payload.
        payloadDescription:
          type: string
          description: A human readable description of the payload
      title: PayloadConfiguration
    Payload:
      type: object
      properties:
        config:
          $ref: '#/components/schemas/PayloadConfiguration'
      description: Individual payload configuration.
      title: Payload
    Payloads:
      type: object
      properties:
        payloadConfigurations:
          type: array
          items:
            $ref: '#/components/schemas/Payload'
      description: List of payloads available for an entity.
      title: Payloads
    PowerSourcePowerStatus:
      type: string
      enum:
        - POWER_STATUS_INVALID
        - POWER_STATUS_UNKNOWN
        - POWER_STATUS_NOT_PRESENT
        - POWER_STATUS_OPERATING
        - POWER_STATUS_DISABLED
        - POWER_STATUS_ERROR
      description: Status of the power source.
      title: PowerSourcePowerStatus
    PowerSourcePowerType:
      type: string
      enum:
        - POWER_TYPE_INVALID
        - POWER_TYPE_UNKNOWN
        - POWER_TYPE_GAS
        - POWER_TYPE_BATTERY
      description: Used to determine the type of power source.
      title: PowerSourcePowerType
    PowerLevel:
      type: object
      properties:
        capacity:
          type: number
          format: double
          description: Total power capacity of the system.
        remaining:
          type: number
          format: double
          description: Remaining power capacity of the system.
        percentRemaining:
          type: number
          format: double
          description: Percent of power remaining.
        voltage:
          type: number
          format: double
          description: >-
            Voltage of the power source subsystem, as reported by the power
            source. If the source does not report this value
             this field will be null.
        currentAmps:
          type: number
          format: double
          description: >-
            Current in amps of the power source subsystem, as reported by the
            power source. If the source does not
             report this value this field will be null.
        runTimeToEmptyMins:
          type: number
          format: double
          description: >-
            Estimated minutes until empty. Calculated with consumption at the
            moment, as reported by the power source. If the source does not
             report this value this field will be null.
        consumptionRateLPerS:
          type: number
          format: double
          description: Fuel consumption rate in liters per second.
      description: Represents the power level of a system.
      title: PowerLevel
    PowerSource:
      type: object
      properties:
        powerStatus:
          $ref: '#/components/schemas/PowerSourcePowerStatus'
          description: Status of the power source.
        powerType:
          $ref: '#/components/schemas/PowerSourcePowerType'
          description: Used to determine the type of power source.
        powerLevel:
          $ref: '#/components/schemas/PowerLevel'
          description: >-
            Power level of the system. If absent, the power level is assumed to
            be unknown.
        messages:
          type: array
          items:
            type: string
          description: >-
            Set of human-readable messages with status of the power system.
            Typically this would be used in an error state
             to provide additional error information. This can also be used for informational messages.
        offloadable:
          type: boolean
          description: >-
            Whether the power source is offloadable. If the value is missing (as
            opposed to false) then the entity does not
             report whether the power source is offloadable.
      description: >-
        Represents the state of a single power source that is connected to this
        entity.
      title: PowerSource
    PowerState:
      type: object
      properties:
        sourceIdToState:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/PowerSource'
          description: >-
            This is a map where the key is a unique id of the power source and
            the value is additional information about the
             power source.
      description: Represents the state of power sources connected to this entity.
      title: PowerState
    OverrideStatus:
      type: string
      enum:
        - OVERRIDE_STATUS_INVALID
        - OVERRIDE_STATUS_APPLIED
        - OVERRIDE_STATUS_PENDING
        - OVERRIDE_STATUS_TIMEOUT
        - OVERRIDE_STATUS_REJECTED
        - OVERRIDE_STATUS_DELETION_PENDING
      description: status of the override
      title: OverrideStatus
    OverrideType:
      type: string
      enum:
        - OVERRIDE_TYPE_INVALID
        - OVERRIDE_TYPE_LIVE
        - OVERRIDE_TYPE_POST_EXPIRY
      description: >-
        The type of the override, defined by the stage of the entity lifecycle
        that the entity was in when the override
         was requested.
      title: OverrideType
    Override:
      type: object
      properties:
        requestId:
          type: string
          description: override request id for an override request
        fieldPath:
          type: string
          description: |-
            proto field path which is the string representation of a field.
             example: correlated.primary_entity_id would be primary_entity_id in correlated component
        maskedFieldValue:
          $ref: '#/components/schemas/Entity'
          description: >-
            new field value corresponding to field path. In the shape of an
            empty entity with only the changed value.
             example: entity: { mil_view: { disposition: Disposition_DISPOSITION_HOSTILE } }
        status:
          $ref: '#/components/schemas/OverrideStatus'
          description: status of the override
        provenance:
          $ref: '#/components/schemas/Provenance'
        type:
          $ref: '#/components/schemas/OverrideType'
          description: >-
            The type of the override, defined by the stage of the entity
            lifecycle that the entity was in when the override
             was requested.
        requestTimestamp:
          type: string
          format: date-time
          description: >-
            Timestamp of the override request. The timestamp is generated by the
            Entity Manager instance that receives the request.
      description: Details about an override. Last write wins.
      title: Override
    Overrides:
      type: object
      properties:
        override:
          type: array
          items:
            $ref: '#/components/schemas/Override'
      description: Metadata about entity overrides present.
      title: Overrides
    Indicators:
      type: object
      properties:
        simulated:
          type: boolean
        exercise:
          type: boolean
        emergency:
          type: boolean
        c2:
          type: boolean
        egressable:
          type: boolean
          description: |-
            Indicates the Entity should be egressed to external sources.
             Integrations choose how the egressing happens (e.g. if an Entity needs fuzzing).
        starred:
          type: boolean
          description: >-
            A signal of arbitrary importance such that the entity should be
            globally marked for all users
      description: Indicators to describe entity to consumers.
      title: Indicators
    HighValueTargetMatch:
      type: object
      properties:
        highValueTargetListId:
          type: string
          description: >-
            The ID of the high value target list that matches the target
            description.
        highValueTargetDescriptionId:
          type: string
          description: >-
            The ID of the specific high value target description within a high
            value target list that was matched against.
             The ID is considered to be a globally unique identifier across all high value target IDs.
      title: HighValueTargetMatch
    HighValueTarget:
      type: object
      properties:
        isHighValueTarget:
          type: boolean
          description: >-
            Indicates whether the target matches any description from a high
            value target list.
        targetPriority:
          type: integer
          format: uint
          description: >-
            The priority associated with the target. If the target's description
            appears on multiple high value target lists,
             the priority will be a reflection of the highest priority of all of those list's target description.

             A lower value indicates the target is of a higher priority, with 1 being the highest possible priority. A value of
             0 indicates there is no priority associated with this target.
        targetMatches:
          type: array
          items:
            $ref: '#/components/schemas/HighValueTargetMatch'
          description: >-
            All of the high value target descriptions that the target matches
            against.
        isHighPayoffTarget:
          type: boolean
          description: >-
            Indicates whether the target is a 'High Payoff Target'. Targets can
            be one or both of high value and high payoff.
      description: Describes whether something is a high value target or not.
      title: HighValueTarget
    Threat:
      type: object
      properties:
        isThreat:
          type: boolean
          description: Indicates that the entity has been determined to be a threat.
      description: Describes whether an entity is a threat or not.
      title: Threat
    TargetPriority:
      type: object
      properties:
        highValueTarget:
          $ref: '#/components/schemas/HighValueTarget'
          description: >-
            Describes the target priority in relation to high value target
            lists.
        threat:
          $ref: '#/components/schemas/Threat'
          description: Describes whether the entity should be treated as a threat
      description: The target prioritization associated with an entity.
      title: TargetPriority
    Fixed:
      type: object
      properties: {}
      description: >-
        A fix of a signal. No extra fields but it is expected that location
        should be populated when using this report.
      title: Fixed
    EmitterNotation:
      type: object
      properties:
        emitterNotation:
          type: string
        confidence:
          type: number
          format: double
          description: >-
            confidence as a percentage that the emitter notation in this
            component is accurate
      description: A representation of a single emitter notation.
      title: EmitterNotation
    PulseRepetitionInterval:
      type: object
      properties:
        pulseRepetitionIntervalS:
          $ref: '#/components/schemas/Measurement'
      description: A component that describe the length in time between two pulses
      title: PulseRepetitionInterval
    ScanCharacteristicsScanType:
      type: string
      enum:
        - SCAN_TYPE_INVALID
        - SCAN_TYPE_CIRCULAR
        - SCAN_TYPE_BIDIRECTIONAL_HORIZONTAL_SECTOR
        - SCAN_TYPE_BIDIRECTIONAL_VERTICAL_SECTOR
        - SCAN_TYPE_NON_SCANNING
        - SCAN_TYPE_IRREGULAR
        - SCAN_TYPE_CONICAL
        - SCAN_TYPE_LOBE_SWITCHING
        - SCAN_TYPE_RASTER
        - SCAN_TYPE_CIRCULAR_VERTICAL_SECTOR
        - SCAN_TYPE_CIRCULAR_CONICAL
        - SCAN_TYPE_SECTOR_CONICAL
        - SCAN_TYPE_AGILE_BEAM
        - SCAN_TYPE_UNIDIRECTIONAL_VERTICAL_SECTOR
        - SCAN_TYPE_UNIDIRECTIONAL_HORIZONTAL_SECTOR
        - SCAN_TYPE_UNIDIRECTIONAL_SECTOR
        - SCAN_TYPE_BIDIRECTIONAL_SECTOR
      title: ScanCharacteristicsScanType
    ScanCharacteristics:
      type: object
      properties:
        scanType:
          $ref: '#/components/schemas/ScanCharacteristicsScanType'
        scanPeriodS:
          type: number
          format: double
      description: A component that describes the scanning characteristics of a signal
      title: ScanCharacteristics
    Signal:
      type: object
      properties:
        frequencyCenter:
          $ref: '#/components/schemas/Frequency'
        frequencyRange:
          $ref: '#/components/schemas/FrequencyRange'
        bandwidthHz:
          type: number
          format: double
          description: Indicates the bandwidth of a signal (Hz).
        signalToNoiseRatio:
          type: number
          format: double
          description: Indicates the signal to noise (SNR) of this signal.
        lineOfBearing:
          $ref: '#/components/schemas/LineOfBearing'
        fixed:
          $ref: '#/components/schemas/Fixed'
        emitterNotations:
          type: array
          items:
            $ref: '#/components/schemas/EmitterNotation'
          description: Emitter notations associated with this entity.
        pulseWidthS:
          type: number
          format: double
          description: length in time of a single pulse
        pulseRepetitionInterval:
          $ref: '#/components/schemas/PulseRepetitionInterval'
          description: length in time between the start of two pulses
        scanCharacteristics:
          $ref: '#/components/schemas/ScanCharacteristics'
          description: describes how a signal is observing the environment
      description: A component that describes an entity's signal characteristics.
      title: Signal
    TransponderCodesMode4InterrogationResponse:
      type: string
      enum:
        - INTERROGATION_RESPONSE_INVALID
        - INTERROGATION_RESPONSE_CORRECT
        - INTERROGATION_RESPONSE_INCORRECT
        - INTERROGATION_RESPONSE_NO_RESPONSE
      description: The validity of the response from the Mode 4 interrogation.
      title: TransponderCodesMode4InterrogationResponse
    Mode5Mode5InterrogationResponse:
      type: string
      enum:
        - INTERROGATION_RESPONSE_INVALID
        - INTERROGATION_RESPONSE_CORRECT
        - INTERROGATION_RESPONSE_INCORRECT
        - INTERROGATION_RESPONSE_NO_RESPONSE
      description: The validity of the response from the Mode 5 interrogation.
      title: Mode5Mode5InterrogationResponse
    Mode5:
      type: object
      properties:
        mode5InterrogationResponse:
          $ref: '#/components/schemas/Mode5Mode5InterrogationResponse'
          description: The validity of the response from the Mode 5 interrogation.
        mode5:
          type: integer
          format: uint
          description: The Mode 5 code assigned to military assets.
        mode5PlatformId:
          type: integer
          format: uint
          description: The Mode 5 platform identification code.
      description: Describes the Mode 5 transponder interrogation status and codes.
      title: Mode5
    ModeS:
      type: object
      properties:
        id:
          type: string
          description: Mode S identifier which comprises of 8 alphanumeric characters.
        address:
          type: integer
          format: uint
          description: >-
            The Mode S ICAO aircraft address. Expected values are between 1 and
            16777214 decimal. The Mode S address is
             considered unique.
      description: Describes the Mode S codes.
      title: ModeS
    TransponderCodes:
      type: object
      properties:
        mode1:
          type: integer
          format: uint
          description: The mode 1 code assigned to military assets.
        mode2:
          type: integer
          format: uint
          description: The Mode 2 code assigned to military assets.
        mode3:
          type: integer
          format: uint
          description: The Mode 3 code assigned by ATC to the asset.
        mode4InterrogationResponse:
          $ref: '#/components/schemas/TransponderCodesMode4InterrogationResponse'
          description: The validity of the response from the Mode 4 interrogation.
        mode5:
          $ref: '#/components/schemas/Mode5'
          description: The Mode 5 transponder codes.
        modeS:
          $ref: '#/components/schemas/ModeS'
          description: The Mode S transponder codes.
        modeCAltitudeFt:
          type: integer
          description: >-
            The Mode C altitude reported by the transponder in feet. Mode C
            provides pressure altitude in 100-foot increments up
             to 10,000 feet MSL. Valid altitudes include 0 ft (sea level). An unset field indicates no Mode C response was received.
      description: >-
        A message describing any transponder codes associated with Mode 1, 2, 3,
        4, 5, S, C interrogations.
      title: TransponderCodes
    ClassificationInformationLevel:
      type: string
      enum:
        - CLASSIFICATION_LEVELS_INVALID
        - CLASSIFICATION_LEVELS_UNCLASSIFIED
        - CLASSIFICATION_LEVELS_CONTROLLED_UNCLASSIFIED
        - CLASSIFICATION_LEVELS_CONFIDENTIAL
        - CLASSIFICATION_LEVELS_SECRET
        - CLASSIFICATION_LEVELS_TOP_SECRET
      description: Classification level to be applied to the information in question.
      title: ClassificationInformationLevel
    ClassificationInformation:
      type: object
      properties:
        level:
          $ref: '#/components/schemas/ClassificationInformationLevel'
          description: Classification level to be applied to the information in question.
        caveats:
          type: array
          items:
            type: string
          description: >-
            Caveats that may further restrict how the information can be
            disseminated.
      description: >-
        Represents all of the necessary information required to generate a
        summarized
         classification marking.

         > example: A summarized classification marking of "TOPSECRET//NOFORN//FISA"
                    would be defined as: { "level": 5, "caveats": [ "NOFORN, "FISA" ] }
      title: ClassificationInformation
    FieldClassificationInformation:
      type: object
      properties:
        fieldPath:
          type: string
          description: |-
            Proto field path which is the string representation of a field.
             > example: signal.bandwidth_hz would be bandwidth_hz in the signal component
        classificationInformation:
          $ref: '#/components/schemas/ClassificationInformation'
          description: >-
            The information which makes up the field level classification
            marking.
      description: A field specific classification information definition.
      title: FieldClassificationInformation
    Classification:
      type: object
      properties:
        default:
          $ref: '#/components/schemas/ClassificationInformation'
          description: >-
            The default classification information which should be assumed to
            apply to everything in
             the entity unless a specific field level classification is present.
        fields:
          type: array
          items:
            $ref: '#/components/schemas/FieldClassificationInformation'
          description: >-
            The set of individual field classification information which should
            always precedence
             over the default classification information.
      description: A component that describes an entity's security classification levels.
      title: Classification
    TaskDefinition:
      type: object
      properties:
        taskSpecificationUrl:
          type: string
          description: Url path must be prefixed with `type.googleapis.com/`.
      description: >-
        Defines a supported task by the task specification URL of its "Any"
        type.
      title: TaskDefinition
    TaskCatalog:
      type: object
      properties:
        taskDefinitions:
          type: array
          items:
            $ref: '#/components/schemas/TaskDefinition'
      description: Catalog of supported tasks.
      title: TaskCatalog
    MediaItemType:
      type: string
      enum:
        - MEDIA_TYPE_INVALID
        - MEDIA_TYPE_IMAGE
        - MEDIA_TYPE_VIDEO
      description: The type of media for this item.
      title: MediaItemType
    MediaItem:
      type: object
      properties:
        itemIdentifier:
          type: string
          description: A unique identifier for this mediaItem.
        type:
          $ref: '#/components/schemas/MediaItemType'
          description: The type of media for this item.
        relativePath:
          type: string
          description: >-
            The path, relative to the environment base URL, where media related
            to an entity can be accessed
      title: MediaItem
    Media:
      type: object
      properties:
        media:
          type: array
          items:
            $ref: '#/components/schemas/MediaItem'
      description: Media associated with an entity.
      title: Media
    TrackedBy:
      type: object
      properties:
        activelyTrackingSensors:
          $ref: '#/components/schemas/Sensors'
          description: >-
            Sensor details of the tracking entity's sensors that were active and
            tracking the tracked entity. This may be
             a subset of the total sensors available on the tracking entity.
        lastMeasurementTimestamp:
          type: string
          format: date-time
          description: >-
            Latest time that any sensor in actively_tracking_sensors detected
            the tracked entity.
      description: >-
        Describes the relationship between the entity being tracked ("tracked
        entity") and the entity that is
         performing the tracking ("tracking entity").
      title: TrackedBy
    GroupChild:
      type: object
      properties: {}
      description: >-
        A GroupChild relationship is a uni-directional relationship indicating
        that (1) this entity
         represents an Entity Group and (2) the related entity is a child member of this group. The presence of this
         relationship alone determines that the type of group is an Entity Group.
      title: GroupChild
    GroupParent:
      type: object
      properties: {}
      description: >-
        A GroupParent relationship is a uni-directional relationship indicating
        that this entity is a member of
         the Entity Group represented by the related entity. The presence of this relationship alone determines that
         the type of group that this entity is a member of is an Entity Group.
      title: GroupParent
    MergedFrom:
      type: object
      properties: {}
      description: >-
        A MergedFrom relationship is a uni-directional relationship indicating
        that this entity is a merged entity whose
         data has at least partially been merged from the related entity.
      title: MergedFrom
    ActiveTarget:
      type: object
      properties: {}
      description: |-
        A target relationship is the inverse of TrackedBy; a one-way relation
         from sensor to target, indicating track(s) currently prioritized by a robot.
      title: ActiveTarget
    RelationshipType:
      type: object
      properties:
        trackedBy:
          $ref: '#/components/schemas/TrackedBy'
        groupChild:
          $ref: '#/components/schemas/GroupChild'
        groupParent:
          $ref: '#/components/schemas/GroupParent'
        mergedFrom:
          $ref: '#/components/schemas/MergedFrom'
        activeTarget:
          $ref: '#/components/schemas/ActiveTarget'
      description: Determines the type of relationship between this entity and another.
      title: RelationshipType
    Relationship:
      type: object
      properties:
        relatedEntityId:
          type: string
          description: The entity ID to which this entity is related.
        relationshipId:
          type: string
          description: >-
            A unique identifier for this relationship. Allows removing or
            updating relationships.
        relationshipType:
          $ref: '#/components/schemas/RelationshipType'
          description: The relationship type
      description: The relationship component indicates a relationship to another entity.
      title: Relationship
    Relationships:
      type: object
      properties:
        relationships:
          type: array
          items:
            $ref: '#/components/schemas/Relationship'
      description: >-
        The relationships between this entity and other entities in the common
        operational picture.
      title: Relationships
    Color:
      type: object
      properties:
        red:
          type: number
          format: double
          description: The amount of red in the color as a value in the interval [0, 1].
        green:
          type: number
          format: double
          description: The amount of green in the color as a value in the interval [0, 1].
        blue:
          type: number
          format: double
          description: The amount of blue in the color as a value in the interval [0, 1].
        alpha:
          type: number
          format: double
          description: >-
            The fraction of this color that should be applied to the pixel. That
            is,
             the final pixel color is defined by the equation:

             `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)`

             This means that a value of 1.0 corresponds to a solid color, whereas
             a value of 0.0 corresponds to a completely transparent color. This
             uses a wrapper message rather than a simple float scalar so that it is
             possible to distinguish between a default value and the value being unset.
             If omitted, this color object is rendered as a solid color
             (as if the alpha value had been explicitly given a value of 1.0).
      title: Color
    RangeRings:
      type: object
      properties:
        minDistanceM:
          type: number
          format: double
          description: The minimum range ring distance, specified in meters.
        maxDistanceM:
          type: number
          format: double
          description: The maximum range ring distance, specified in meters.
        ringCount:
          type: integer
          format: uint
          description: The count of range rings.
        ringLineColor:
          $ref: '#/components/schemas/Color'
          description: The color of range rings, specified in hex string.
      description: >-
        Range rings allow visual assessment of map distance at varying zoom
        levels.
      title: RangeRings
    VisualDetails:
      type: object
      properties:
        rangeRings:
          $ref: '#/components/schemas/RangeRings'
          description: The range rings to display around an entity.
      description: Visual details associated with the display of an entity in the client.
      title: VisualDetails
    Dimensions:
      type: object
      properties:
        lengthM:
          type: number
          format: double
          description: Length of the entity in meters
      title: Dimensions
    RouteDetails:
      type: object
      properties:
        destinationName:
          type: string
          description: Free form text giving the name of the entity's destination
        estimatedArrivalTime:
          type: string
          format: date-time
          description: Estimated time of arrival at destination
      title: RouteDetails
    CronWindow:
      type: object
      properties:
        cronExpression:
          type: string
          description: >-
            in UTC, describes when and at what cadence this window starts, in
            the quartz flavor of cron

             examples:
                This schedule is begins at 7:00:00am UTC everyday between Monday and Friday
                    0 0 7 ? * MON-FRI *
                This schedule begins every 5 minutes starting at 12:00:00pm UTC until 8:00:00pm UTC everyday
                    0 0/5 12-20 * * ? *
                This schedule begins at 12:00:00pm UTC on March 2nd 2023
                    0 0 12 2 3 ? 2023
        durationMillis:
          type: string
          description: describes the duration
      title: CronWindow
    ScheduleScheduleType:
      type: string
      enum:
        - SCHEDULE_TYPE_INVALID
        - SCHEDULE_TYPE_ZONE_ENABLED
        - SCHEDULE_TYPE_ZONE_TEMP_ENABLED
      description: The schedule type
      title: ScheduleScheduleType
    Schedule:
      type: object
      properties:
        windows:
          type: array
          items:
            $ref: '#/components/schemas/CronWindow'
          description: expression that represents this schedule's "ON" state
        scheduleId:
          type: string
          description: A unique identifier for this schedule.
        scheduleType:
          $ref: '#/components/schemas/ScheduleScheduleType'
          description: The schedule type
      description: A Schedule associated with this entity
      title: Schedule
    Schedules:
      type: object
      properties:
        schedules:
          type: array
          items:
            $ref: '#/components/schemas/Schedule'
      description: Schedules associated with this entity
      title: Schedules
    HealthConnectionStatus:
      type: string
      enum:
        - CONNECTION_STATUS_INVALID
        - CONNECTION_STATUS_ONLINE
        - CONNECTION_STATUS_OFFLINE
      description: >-
        Status indicating whether the entity is able to communicate with Entity
        Manager.
      title: HealthConnectionStatus
    HealthHealthStatus:
      type: string
      enum:
        - HEALTH_STATUS_INVALID
        - HEALTH_STATUS_HEALTHY
        - HEALTH_STATUS_WARN
        - HEALTH_STATUS_FAIL
        - HEALTH_STATUS_OFFLINE
        - HEALTH_STATUS_NOT_READY
      description: >-
        Top-level health status; typically a roll-up of individual component
        healths.
      title: HealthHealthStatus
    ComponentHealthHealth:
      type: string
      enum:
        - HEALTH_STATUS_INVALID
        - HEALTH_STATUS_HEALTHY
        - HEALTH_STATUS_WARN
        - HEALTH_STATUS_FAIL
        - HEALTH_STATUS_OFFLINE
        - HEALTH_STATUS_NOT_READY
      description: Health for this component.
      title: ComponentHealthHealth
    ComponentMessageStatus:
      type: string
      enum:
        - HEALTH_STATUS_INVALID
        - HEALTH_STATUS_HEALTHY
        - HEALTH_STATUS_WARN
        - HEALTH_STATUS_FAIL
        - HEALTH_STATUS_OFFLINE
        - HEALTH_STATUS_NOT_READY
      description: The status associated with this message.
      title: ComponentMessageStatus
    ComponentMessage:
      type: object
      properties:
        status:
          $ref: '#/components/schemas/ComponentMessageStatus'
          description: The status associated with this message.
        message:
          type: string
          description: The human-readable content of the message.
      description: A message describing the component's health status.
      title: ComponentMessage
    ComponentHealth:
      type: object
      properties:
        id:
          type: string
          description: Consistent internal ID for this component.
        name:
          type: string
          description: Display name for this component.
        health:
          $ref: '#/components/schemas/ComponentHealthHealth'
          description: Health for this component.
        messages:
          type: array
          items:
            $ref: '#/components/schemas/ComponentMessage'
          description: >-
            Human-readable describing the component state. These messages should
            be understandable by end users.
        updateTime:
          type: string
          format: date-time
          description: |-
            The last update time for this specific component.
             If this timestamp is unset, the data is assumed to be most recent
      description: Health of an individual component.
      title: ComponentHealth
    AlertLevel:
      type: string
      enum:
        - ALERT_LEVEL_INVALID
        - ALERT_LEVEL_ADVISORY
        - ALERT_LEVEL_CAUTION
        - ALERT_LEVEL_WARNING
      description: Alert level (Warning, Caution, or Advisory).
      title: AlertLevel
    AlertCondition:
      type: object
      properties:
        conditionCode:
          type: string
          description: >-
            Short, machine-readable code that describes this condition. This
            code is intended to provide systems off-asset
             with a lookup key to retrieve more detailed information about the condition.
        description:
          type: string
          description: >-
            Human-readable description of this condition. The description is
            intended for display in the UI for human
             understanding and should not be used for machine processing. If the description is fixed and the vehicle controller
             provides no dynamic substitutions, then prefer lookup based on condition_code.
      description: A condition which may trigger an alert.
      title: AlertCondition
    Alert:
      type: object
      properties:
        alertCode:
          type: string
          description: >-
            Short, machine-readable code that describes this alert. This code is
            intended to provide systems off-asset
             with a lookup key to retrieve more detailed information about the alert.
        description:
          type: string
          description: >-
            Human-readable description of this alert. The description is
            intended for display in the UI for human
             understanding and should not be used for machine processing. If the description is fixed and the vehicle controller
             provides no dynamic substitutions, then prefer lookup based on alert_code.
        level:
          $ref: '#/components/schemas/AlertLevel'
          description: Alert level (Warning, Caution, or Advisory).
        activatedTime:
          type: string
          format: date-time
          description: Time at which this alert was activated.
        activeConditions:
          type: array
          items:
            $ref: '#/components/schemas/AlertCondition'
          description: Set of conditions which have activated this alert.
      description: >-
        An alert informs operators of critical events related to system
        performance and mission
         execution. An alert is produced as a result of one or more alert conditions.
      title: Alert
    Health:
      type: object
      properties:
        connectionStatus:
          $ref: '#/components/schemas/HealthConnectionStatus'
          description: >-
            Status indicating whether the entity is able to communicate with
            Entity Manager.
        healthStatus:
          $ref: '#/components/schemas/HealthHealthStatus'
          description: >-
            Top-level health status; typically a roll-up of individual component
            healths.
        components:
          type: array
          items:
            $ref: '#/components/schemas/ComponentHealth'
          description: Health of individual components running on this Entity.
        updateTime:
          type: string
          format: date-time
          description: |-
            The update time for the top-level health information.
             If this timestamp is unset, the data is assumed to be most recent
        activeAlerts:
          type: array
          items:
            $ref: '#/components/schemas/Alert'
          description: >-
            Active alerts indicate a critical change in system state sent by the
            asset
             that must be made known to an operator or consumer of the common operating picture.
             Alerts are different from ComponentHealth messages--an active alert does not necessarily
             indicate a component is in an unhealthy state. For example, an asset may trigger
             an active alert based on fuel levels running low. Alerts should be removed from this list when their conditions
             are cleared. In other words, only active alerts should be reported here.
      description: General health of the entity as reported by the entity.
      title: Health
    EchelonArmyEchelon:
      type: string
      enum:
        - ARMY_ECHELON_INVALID
        - ARMY_ECHELON_FIRE_TEAM
        - ARMY_ECHELON_SQUAD
        - ARMY_ECHELON_PLATOON
        - ARMY_ECHELON_COMPANY
        - ARMY_ECHELON_BATTALION
        - ARMY_ECHELON_REGIMENT
        - ARMY_ECHELON_BRIGADE
        - ARMY_ECHELON_DIVISION
        - ARMY_ECHELON_CORPS
        - ARMY_ECHELON_ARMY
      title: EchelonArmyEchelon
    Echelon:
      type: object
      properties:
        armyEchelon:
          $ref: '#/components/schemas/EchelonArmyEchelon'
      description: >-
        Describes a Echelon group type.  Comprised of entities which are members
        of the
         same unit or echelon. Ex: A group of tanks within a armored company or that same company
         as a member of a battalion.
      title: Echelon
    GroupDetails:
      type: object
      properties:
        team:
          $ref: '#/components/schemas/Team'
        echelon:
          $ref: '#/components/schemas/Echelon'
      description: Details related to grouping for this entity
      title: GroupDetails
    Munition:
      type: object
      properties:
        munitionId:
          type: string
          description: Unique munition identifier
        name:
          type: string
          description: Long form name of the munition
        quantityUnits:
          type: integer
          format: uint
          description: Number of units
      description: Munition describes an entity's munitions stores
      title: Munition
    Fuel:
      type: object
      properties:
        fuelId:
          type: string
          description: Unique fuel identifier
        name:
          type: string
          description: Long form name of the fuel source.
        reportedDate:
          type: string
          format: date-time
          description: Timestamp the information was reported
        amountGallons:
          type: integer
          format: uint
          description: Amount of gallons on hand
        maxAuthorizedCapacityGallons:
          type: integer
          format: uint
          description: How much the asset is allowed to have available (in gallons)
        operationalRequirementGallons:
          type: integer
          format: uint
          description: Minimum required for operations (in gallons)
        dataClassification:
          $ref: '#/components/schemas/Classification'
          description: |-
            Fuel in a single asset may have different levels of classification
             Use case: fuel for a SECRET asset while diesel fuel may be UNCLASSIFIED
        dataSource:
          type: string
          description: Source of information
      description: >-
        Fuel describes an entity's repository of fuels stores including current
        amount, operational requirements, and maximum authorized capacity
      title: Fuel
    Supplies:
      type: object
      properties:
        munitions:
          type: array
          items:
            $ref: '#/components/schemas/Munition'
        fuel:
          type: array
          items:
            $ref: '#/components/schemas/Fuel'
      description: >-
        Represents the state of supplies associated with an entity (available
        but not in condition to use immediately)
      title: Supplies
    OrbitMeanElementsMetadataRefFrame:
      type: string
      enum:
        - ECI_REFERENCE_FRAME_INVALID
        - ECI_REFERENCE_FRAME_TEME
      description: Reference frame, assumed to be Earth-centered
      title: OrbitMeanElementsMetadataRefFrame
    OrbitMeanElementsMetadataMeanElementTheory:
      type: string
      enum:
        - MEAN_ELEMENT_THEORY_INVALID
        - MEAN_ELEMENT_THEORY_SGP4
      title: OrbitMeanElementsMetadataMeanElementTheory
    OrbitMeanElementsMetadata:
      type: object
      properties:
        creationDate:
          type: string
          format: date-time
          description: Creation date/time in UTC
        originator:
          type: string
          description: Creating agency or operator
        messageId:
          type: string
          description: ID that uniquely identifies a message from a given originator.
        refFrame:
          $ref: '#/components/schemas/OrbitMeanElementsMetadataRefFrame'
          description: Reference frame, assumed to be Earth-centered
        refFrameEpoch:
          type: string
          format: date-time
          description: >-
            Reference frame epoch in UTC - mandatory only if not intrinsic to
            frame definition
        meanElementTheory:
          $ref: '#/components/schemas/OrbitMeanElementsMetadataMeanElementTheory'
      title: OrbitMeanElementsMetadata
    MeanKeplerianElements:
      type: object
      properties:
        epoch:
          type: string
          format: date-time
          description: UTC time of validity
        semiMajorAxisKm:
          type: number
          format: double
          description: 'Preferred: semi major axis in kilometers'
        meanMotion:
          type: number
          format: double
          description: >-
            If using SGP/SGP4, provide the Keplerian Mean Motion in revolutions
            per day
        eccentricity:
          type: number
          format: double
        inclinationDeg:
          type: number
          format: double
          description: Angle of inclination in deg
        raOfAscNodeDeg:
          type: number
          format: double
          description: Right ascension of the ascending node in deg
        argOfPericenterDeg:
          type: number
          format: double
          description: Argument of pericenter in deg
        meanAnomalyDeg:
          type: number
          format: double
          description: Mean anomaly in deg
        gm:
          type: number
          format: double
          description: >-
            Optional: gravitational coefficient (Gravitational Constant x
            central mass) in kg^3 / s^2
      title: MeanKeplerianElements
    TleParameters:
      type: object
      properties:
        ephemerisType:
          type: integer
          format: uint
          description: Integer specifying TLE ephemeris type
        classificationType:
          type: string
          description: User-defined free-text message classification/caveats of this TLE
        noradCatId:
          type: integer
          format: uint
          description: 'Norad catalog number: integer up to nine digits.'
        elementSetNo:
          type: integer
          format: uint
        revAtEpoch:
          type: integer
          format: uint
          description: 'Optional: revolution number'
        bstar:
          type: number
          format: double
          description: Drag parameter for SGP-4 in units 1 / Earth radii
        bterm:
          type: number
          format: double
          description: Drag parameter for SGP4-XP in units m^2 / kg
        meanMotionDot:
          type: number
          format: double
          description: First time derivative of mean motion in rev / day^2
        meanMotionDdot:
          type: number
          format: double
          description: >-
            Second time derivative of mean motion in rev / day^3. For use with
            SGP or PPT3.
        agom:
          type: number
          format: double
          description: >-
            Solar radiation pressure coefficient A_gamma / m in m^2 / kg. For
            use with SGP4-XP.
      title: TleParameters
    OrbitMeanElements:
      type: object
      properties:
        metadata:
          $ref: '#/components/schemas/OrbitMeanElementsMetadata'
        meanKeplerianElements:
          $ref: '#/components/schemas/MeanKeplerianElements'
        tleParameters:
          $ref: '#/components/schemas/TleParameters'
      description: >-
        Orbit Mean Elements data, analogous to the Orbit Mean Elements Message
        in CCSDS 502.0-B-3
      title: OrbitMeanElements
    Orbit:
      type: object
      properties:
        orbitMeanElements:
          $ref: '#/components/schemas/OrbitMeanElements'
          description: >-
            Orbit Mean Elements data, analogous to the Orbit Mean Elements
            Message in CCSDS 502.0-B-3
      title: Orbit
    MilStd2525C:
      type: object
      properties:
        sidc:
          type: string
      title: MilStd2525C
    Symbology:
      type: object
      properties:
        milStd2525C:
          $ref: '#/components/schemas/MilStd2525C'
      description: Symbology associated with an entity.
      title: Symbology
    Entity:
      type: object
      properties:
        entityId:
          type: string
          description: >-
            A Globally Unique Identifier (GUID) for your entity. This is a
            required
             field.
        description:
          type: string
          description: >-
            A human-readable entity description that's helpful for debugging
            purposes and human
             traceability. If this field is empty, the Entity Manager API generates one for you.
        isLive:
          type: boolean
          description: >-
            Indicates the entity is active and should have a lifecycle state of
            CREATE or UPDATE.
             Set this field to true when publishing an entity.
        createdTime:
          type: string
          format: date-time
          description: >-
            The time when the entity was first known to the entity producer. If
            this field is empty, the Entity Manager API uses the
             current timestamp of when the entity is first received.
             For example, when a drone is first powered on, it might report its startup time as the created time.
             The timestamp doesn't change for the lifetime of an entity.
        expiryTime:
          type: string
          format: date-time
          description: |-
            Future time that expires an entity and updates the is_live flag.
             For entities that are constantly updating, the expiry time also updates.
             In some cases, this may differ from is_live.
             Example: Entities with tasks exported to an external system must remain
             active even after they expire.
             This field is required when publishing a prepopulated entity.
             The expiry time must be in the future, but less than 30 days from the current time.
        noExpiry:
          type: boolean
          description: >-
            Use noExpiry only when the entity contains information that should
            be available to other
             tasks or integrations beyond its immediate operational context. For example, use noExpiry
             for long-living geographical entities that maintain persistent relevance across multiple
             operations or tasks.
        status:
          $ref: '#/components/schemas/Status'
          description: Human-readable descriptions of what the entity is currently doing.
        location:
          $ref: '#/components/schemas/Location'
          description: >-
            Geospatial data related to the entity, including its position,
            kinematics, and orientation.
        locationUncertainty:
          $ref: '#/components/schemas/LocationUncertainty'
          description: Indicates uncertainty of the entity's position and kinematics.
        geoShape:
          $ref: '#/components/schemas/GeoShape'
          description: >-
            Geospatial representation of the entity, including entities that
            cover an area rather than a fixed point.
        geoDetails:
          $ref: '#/components/schemas/GeoDetails'
          description: >-
            Additional details on what the geospatial area or point represents,
            along with visual display details.
        aliases:
          $ref: '#/components/schemas/Aliases'
          description: >-
            Entity name displayed in the Lattice UI side panel. Also includes
            identifiers that other systems can use to reference the same entity.
        tracked:
          $ref: '#/components/schemas/Tracked'
          description: >-
            If this entity is tracked by another entity, this component contains
            data related to how it's being tracked.
        correlation:
          $ref: '#/components/schemas/Correlation'
          description: >-
            If this entity has been correlated or decorrelated to another one,
            this component contains information on the correlation or
            decorrelation.
        milView:
          $ref: '#/components/schemas/MilView'
          description: View of the entity.
        ontology:
          $ref: '#/components/schemas/Ontology'
          description: >-
            Ontology defines an entity's categorization in Lattice, and improves
            data retrieval and integration. Builds a standardized representation
            of the entity.
        sensors:
          $ref: '#/components/schemas/Sensors'
          description: Details an entity's available sensors.
        payloads:
          $ref: '#/components/schemas/Payloads'
          description: Details an entity's available payloads.
        powerState:
          $ref: '#/components/schemas/PowerState'
          description: Details the entity's power source.
        provenance:
          $ref: '#/components/schemas/Provenance'
          description: The primary data source provenance for this entity.
        overrides:
          $ref: '#/components/schemas/Overrides'
          description: Provenance of override data.
        indicators:
          $ref: '#/components/schemas/Indicators'
          description: >-
            Describes an entity's specific characteristics and the operations
            that can be performed on the entity.
             For example, "simulated" informs the operator that the entity is from a simulation, and "deletable"
             informs the operator (and system) that the delete operation is valid against the entity.
        targetPriority:
          $ref: '#/components/schemas/TargetPriority'
          description: >-
            The prioritization associated with an entity, such as if it's a
            threat or a high-value target.
        signal:
          $ref: '#/components/schemas/Signal'
          description: >-
            Describes an entity's signal characteristics, primarily used when an
            entity is a signal of interest.
        transponderCodes:
          $ref: '#/components/schemas/TransponderCodes'
          description: >-
            A message describing any transponder codes associated with Mode 1,
            2, 3, 4, 5, S, C interrogations. These are related to ADS-B modes.
        dataClassification:
          $ref: '#/components/schemas/Classification'
          description: >-
            Describes an entity's security classification levels at an overall
            classification level and on a per
             field level.
        taskCatalog:
          $ref: '#/components/schemas/TaskCatalog'
          description: A catalog of tasks that can be performed by an entity.
        media:
          $ref: '#/components/schemas/Media'
          description: >-
            Media associated with an entity, such as videos, images, or
            thumbnails.
        relationships:
          $ref: '#/components/schemas/Relationships'
          description: >-
            The relationships between this entity and other entities in the
            common operational picture (COP).
        visualDetails:
          $ref: '#/components/schemas/VisualDetails'
          description: >-
            Visual details associated with the display of an entity in the
            client.
        dimensions:
          $ref: '#/components/schemas/Dimensions'
          description: Physical dimensions of the entity.
        routeDetails:
          $ref: '#/components/schemas/RouteDetails'
          description: Additional information about an entity's route.
        schedules:
          $ref: '#/components/schemas/Schedules'
          description: Schedules associated with this entity.
        health:
          $ref: '#/components/schemas/Health'
          description: Health metrics or connection status reported by the entity.
        groupDetails:
          $ref: '#/components/schemas/GroupDetails'
          description: Details for the group associated with this entity.
        supplies:
          $ref: '#/components/schemas/Supplies'
          description: Contains relevant supply information for the entity, such as fuel.
        orbit:
          $ref: '#/components/schemas/Orbit'
          description: Orbit information for space objects.
        symbology:
          $ref: '#/components/schemas/Symbology'
          description: >-
            Symbology/iconography for the entity respecting an existing
            standard.
      description: >-
        The entity object represents a single known object within the Lattice
        operational environment. It contains
         all data associated with the entity, such as its name, ID, and other relevant components.
      title: Entity
    TaskEntity:
      type: object
      properties:
        entity:
          $ref: '#/components/schemas/Entity'
          description: The wrapped entity.
        snapshot:
          type: boolean
          description: >-
            Indicates that this entity was generated from a snapshot of a live
            entity.
      description: |-
        An entity wrapper used in task definitions, with additional metadata.

         TaskEntity wraps an entity reference with additional contextual information for task execution.
         This structure allows entities to be passed to tasks with supplementary metadata that aids
         in proper task execution, while also serving as an extension point for future capabilities.
      title: TaskEntity
    Owner:
      type: object
      properties:
        entityId:
          type: string
          description: Entity ID of the owner.
      description: Owner designates the entity responsible for writes of task data.
      title: Owner
    FixedRetry:
      type: object
      properties:
        retryInterval:
          type: string
          description: >-
            Specifies the interval between retries. A default interval of 5
            seconds is used if this field is not set.
      description: >-
        Defaults to an interval of 5 seconds. If the DeliverBefore field in the
        task's DeliveryConstraints isn't populated, Lattice does not retry
        delivery and instead logs a warning.
      title: FixedRetry
    RetryStrategy:
      type: object
      properties:
        fixedRetryStrategy:
          $ref: '#/components/schemas/FixedRetry'
      description: >-
        Sets an optional try strategy for tasks. Use this option to control how
        Lattice attempts to retry delivery of tasks to assets with intermittent
        access or network connectivity to your environment.
      title: RetryStrategy
    DeliveryStateStatus:
      type: string
      enum:
        - DELIVERY_STATUS_INVALID
        - DELIVERY_STATUS_DELIVERED
        - DELIVERY_STATUS_PENDING_EXECUTE
        - DELIVERY_STATUS_PENDING_CANCEL
        - DELIVERY_STATUS_PENDING_COMPLETE
      description: The current status of the delivery.
      title: DeliveryStateStatus
    DeliveryErrorCode:
      type: string
      enum:
        - DELIVERY_ERROR_CODE_INVALID
        - DELIVERY_ERROR_CODE_UNAVAILABLE
        - DELIVERY_ERROR_CODE_TIMEOUT
        - DELIVERY_ERROR_CODE_REJECTED
      description: Error code for Delivery error.
      title: DeliveryErrorCode
    DeliveryError:
      type: object
      properties:
        code:
          $ref: '#/components/schemas/DeliveryErrorCode'
          description: Error code for Delivery error.
        message:
          type: string
          description: Descriptive human-readable string regarding this delivery error.
      description: >-
        DeliveryError contains an error code and message associated with task
        delivery.
      title: DeliveryError
    DeliveryConstraints:
      type: object
      properties:
        deliverAfter:
          type: string
          format: date-time
          description: Optional earliest time the task can attempt to be delivered.
        deliverBefore:
          type: string
          format: date-time
          description: |-
            The latest time by which the task should be delivered.
             If this deadline passes without successful delivery of the task, then the task will time
             out with DELIVERY_ERROR_CODE_TIMEOUT.
             This field is only required for tasks with retry strategies.
      description: >-
        DeliveryConstraints defines when Lattice should deliver the task to the
        agent.
      title: DeliveryConstraints
    DeliveryState:
      type: object
      properties:
        status:
          $ref: '#/components/schemas/DeliveryStateStatus'
          description: The current status of the delivery.
        error:
          $ref: '#/components/schemas/DeliveryError'
          description: Errors associated with the delivery, if any.
        deliveryConstraints:
          $ref: '#/components/schemas/DeliveryConstraints'
          description: Optional scheduling constraints for Lattice delivery of the task.
      description: Defines the current state of a task's delivery.
      title: DeliveryState
    Task:
      type: object
      properties:
        version:
          $ref: '#/components/schemas/TaskVersion'
          description: Version of this task.
        displayName:
          type: string
          description: >-
            DEPRECATED: Human readable display name for this task, should be
            short (<100 chars).
        specification:
          $ref: '#/components/schemas/GoogleProtobufAny'
          description: >-
            The path for the Protobuf task definition, and the complete task
            data.
        createdBy:
          $ref: '#/components/schemas/Principal'
          description: >-
            Records who created this task. This field will not change after the
            task has been created.
        lastUpdatedBy:
          $ref: '#/components/schemas/Principal'
          description: Records who updated this task last.
        lastUpdateTime:
          type: string
          format: date-time
          description: Records the time of last update.
        status:
          $ref: '#/components/schemas/TaskStatus'
          description: The status of this task.
        scheduledTime:
          type: string
          format: date-time
          description: >-
            If the task has been scheduled to execute, what time it should
            execute at.
        relations:
          $ref: '#/components/schemas/Relations'
          description: >-
            Any related Tasks associated with this, typically includes an
            assignee for this task and/or a parent.
        description:
          type: string
          description: Longer, free form human readable description of this task
        isExecutedElsewhere:
          type: boolean
          description: >-
            If set, execution of this task is managed elsewhere, not by Task
            Manager.
             In other words, task manager will not attempt to update the assigned agent with execution instructions.
        createTime:
          type: string
          format: date-time
          description: Time of task creation.
        replication:
          $ref: '#/components/schemas/Replication'
          description: If populated, designates this to be a replicated task.
        initialEntities:
          type: array
          items:
            $ref: '#/components/schemas/TaskEntity'
          description: >-
            If populated, indicates an initial set of entities that can be used
            to execute an entity aware task
             For example, an entity Objective, an entity Keep In Zone, etc.
             These will not be updated during execution. If a taskable agent needs continuous updates on the entities from the
             COP, can call entity-manager, or use an AlternateId escape hatch.
        owner:
          $ref: '#/components/schemas/Owner'
          description: >-
            The networked owner of this task. It is used to ensure that linear
            writes occur on the node responsible
             for replication of task data to other nodes running Task Manager.
        retryStrategy:
          $ref: '#/components/schemas/RetryStrategy'
          description: >-
            Sets an optional try strategy for tasks. Use this option to control
            how Lattice attempts to retry delivery of tasks to assets with
            intermittent access or network connectivity to your environment.
        deliveryState:
          $ref: '#/components/schemas/DeliveryState'
          description: The current delivery state of a task.
      description: >-
        A task represents a structured unit of work that can be assigned to an
        agent for execution.

         Tasks are the fundamental building blocks of work assignment in the Lattice.
         Each task has a unique identifier, a specification defining what needs to be done,
         status information tracking its progress, and various metadata facilitating its lifecycle management.

         Tasks can be related to each other, through parent-child relationships, assigned to
         specific agents, and tracked through a well-defined state machine from creation to completion.
         They support rich status reporting, including progress updates, error handling, and results.
      title: Task
    TaskQueryResults:
      type: object
      properties:
        tasks:
          type: array
          items:
            $ref: '#/components/schemas/Task'
        nextPageToken:
          type: string
          description: >-
            Incomplete results can be detected by a non-empty nextPageToken
            field in the query results. In order to retrieve 

            the next page, perform the exact same request as previously and
            append a pageToken field with the value of 

            nextPageToken from the previous page. A new nextPageToken is
            provided on the following pages until all the 

            results are retrieved.
      description: >-
        Response containing tasks that match the query criteria.


        This message returns a list of Task objects that satisfy the filter
        conditions

        specified in the request. When there are more matching tasks than can be
        returned

        in a single response, a page_token is provided to retrieve the next
        batch in

        a subsequent request. An empty tasks list with no page_token indicates
        that

        there are no more matching tasks.
      title: TaskQueryResults
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

**Response**

```json
{
  "tasks": [
    {
      "version": {
        "taskId": "string",
        "definitionVersion": 1,
        "statusVersion": 1
      },
      "displayName": "string",
      "specification": {
        "@type": "string"
      },
      "createdBy": {
        "system": {
          "serviceName": "string",
          "entityId": "string",
          "managesOwnScheduling": true
        },
        "user": {
          "userId": "string"
        },
        "team": {
          "entityId": "string",
          "members": [
            {
              "entityId": "string"
            }
          ]
        },
        "onBehalfOf": {
          "system": {
            "serviceName": "string",
            "entityId": "string",
            "managesOwnScheduling": true
          },
          "user": {
            "userId": "string"
          },
          "team": {
            "entityId": "string",
            "members": [
              {
                "entityId": "string"
              }
            ]
          },
          "onBehalfOf": {
            "system": {
              "serviceName": "string",
              "entityId": "string",
              "managesOwnScheduling": true
            },
            "user": {
              "userId": "string"
            },
            "team": {
              "entityId": "string",
              "members": [
                {
                  "entityId": "string"
                }
              ]
            },
            "onBehalfOf": {
              "system": {
                "serviceName": "string",
                "entityId": "string",
                "managesOwnScheduling": true
              },
              "user": {
                "userId": "string"
              },
              "team": {
                "entityId": "string",
                "members": [
                  {
                    "entityId": "string"
                  }
                ]
              },
              "onBehalfOf": {
                "system": {
                  "serviceName": "string",
                  "entityId": "string",
                  "managesOwnScheduling": true
                },
                "user": {
                  "userId": "string"
                },
                "team": {
                  "entityId": "string",
                  "members": [
                    {
                      "entityId": "string"
                    }
                  ]
                },
                "onBehalfOf": {
                  "system": {
                    "serviceName": "string",
                    "entityId": "string",
                    "managesOwnScheduling": true
                  },
                  "user": {
                    "userId": "string"
                  },
                  "team": {
                    "entityId": "string",
                    "members": [
                      {
                        "entityId": "string"
                      }
                    ]
                  },
                  "onBehalfOf": {
                    "system": {
                      "serviceName": "string",
                      "entityId": "string",
                      "managesOwnScheduling": true
                    },
                    "user": {
                      "userId": "string"
                    },
                    "team": {
                      "entityId": "string",
                      "members": [
                        {
                          "entityId": "string"
                        }
                      ]
                    },
                    "onBehalfOf": {
                      "system": {
                        "serviceName": "string",
                        "entityId": "string",
                        "managesOwnScheduling": true
                      },
                      "user": {
                        "userId": "string"
                      },
                      "team": {
                        "entityId": "string",
                        "members": [
                          {
                            "entityId": "string"
                          }
                        ]
                      },
                      "onBehalfOf": {
                        "system": {
                          "serviceName": "string",
                          "entityId": "string",
                          "managesOwnScheduling": true
                        },
                        "user": {
                          "userId": "string"
                        },
                        "team": {
                          "entityId": "string",
                          "members": [
                            {
                              "entityId": {}
                            }
                          ]
                        },
                        "onBehalfOf": {
                          "system": {
                            "serviceName": {},
                            "entityId": {},
                            "managesOwnScheduling": {}
                          },
                          "user": {
                            "userId": {}
                          },
                          "team": {
                            "entityId": {},
                            "members": {}
                          },
                          "onBehalfOf": {
                            "system": {},
                            "user": {},
                            "team": {},
                            "onBehalfOf": {}
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "lastUpdatedBy": {
        "system": {
          "serviceName": "string",
          "entityId": "string",
          "managesOwnScheduling": true
        },
        "user": {
          "userId": "string"
        },
        "team": {
          "entityId": "string",
          "members": [
            {
              "entityId": "string"
            }
          ]
        },
        "onBehalfOf": {
          "system": {
            "serviceName": "string",
            "entityId": "string",
            "managesOwnScheduling": true
          },
          "user": {
            "userId": "string"
          },
          "team": {
            "entityId": "string",
            "members": [
              {
                "entityId": "string"
              }
            ]
          },
          "onBehalfOf": {
            "system": {
              "serviceName": "string",
              "entityId": "string",
              "managesOwnScheduling": true
            },
            "user": {
              "userId": "string"
            },
            "team": {
              "entityId": "string",
              "members": [
                {
                  "entityId": "string"
                }
              ]
            },
            "onBehalfOf": {
              "system": {
                "serviceName": "string",
                "entityId": "string",
                "managesOwnScheduling": true
              },
              "user": {
                "userId": "string"
              },
              "team": {
                "entityId": "string",
                "members": [
                  {
                    "entityId": "string"
                  }
                ]
              },
              "onBehalfOf": {
                "system": {
                  "serviceName": "string",
                  "entityId": "string",
                  "managesOwnScheduling": true
                },
                "user": {
                  "userId": "string"
                },
                "team": {
                  "entityId": "string",
                  "members": [
                    {
                      "entityId": "string"
                    }
                  ]
                },
                "onBehalfOf": {
                  "system": {
                    "serviceName": "string",
                    "entityId": "string",
                    "managesOwnScheduling": true
                  },
                  "user": {
                    "userId": "string"
                  },
                  "team": {
                    "entityId": "string",
                    "members": [
                      {
                        "entityId": "string"
                      }
                    ]
                  },
                  "onBehalfOf": {
                    "system": {
                      "serviceName": "string",
                      "entityId": "string",
                      "managesOwnScheduling": true
                    },
                    "user": {
                      "userId": "string"
                    },
                    "team": {
                      "entityId": "string",
                      "members": [
                        {
                          "entityId": "string"
                        }
                      ]
                    },
                    "onBehalfOf": {
                      "system": {
                        "serviceName": "string",
                        "entityId": "string",
                        "managesOwnScheduling": true
                      },
                      "user": {
                        "userId": "string"
                      },
                      "team": {
                        "entityId": "string",
                        "members": [
                          {
                            "entityId": "string"
                          }
                        ]
                      },
                      "onBehalfOf": {
                        "system": {
                          "serviceName": "string",
                          "entityId": "string",
                          "managesOwnScheduling": true
                        },
                        "user": {
                          "userId": "string"
                        },
                        "team": {
                          "entityId": "string",
                          "members": [
                            {
                              "entityId": {}
                            }
                          ]
                        },
                        "onBehalfOf": {
                          "system": {
                            "serviceName": {},
                            "entityId": {},
                            "managesOwnScheduling": {}
                          },
                          "user": {
                            "userId": {}
                          },
                          "team": {
                            "entityId": {},
                            "members": {}
                          },
                          "onBehalfOf": {
                            "system": {},
                            "user": {},
                            "team": {},
                            "onBehalfOf": {}
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "lastUpdateTime": "2024-01-15T09:30:00Z",
      "status": {
        "status": "STATUS_INVALID",
        "taskError": {
          "code": "ERROR_CODE_INVALID",
          "message": "string",
          "errorDetails": {
            "@type": "string"
          }
        },
        "progress": {
          "@type": "string"
        },
        "result": {
          "@type": "string"
        },
        "startTime": "2024-01-15T09:30:00Z",
        "estimate": {
          "@type": "string"
        },
        "allocation": {
          "activeAgents": [
            {
              "entityId": "string"
            }
          ]
        }
      },
      "scheduledTime": "2024-01-15T09:30:00Z",
      "relations": {
        "assignee": {
          "system": {
            "serviceName": "string",
            "entityId": "string",
            "managesOwnScheduling": true
          },
          "user": {
            "userId": "string"
          },
          "team": {
            "entityId": "string",
            "members": [
              {
                "entityId": "string"
              }
            ]
          },
          "onBehalfOf": {
            "system": {
              "serviceName": "string",
              "entityId": "string",
              "managesOwnScheduling": true
            },
            "user": {
              "userId": "string"
            },
            "team": {
              "entityId": "string",
              "members": [
                {
                  "entityId": "string"
                }
              ]
            },
            "onBehalfOf": {
              "system": {
                "serviceName": "string",
                "entityId": "string",
                "managesOwnScheduling": true
              },
              "user": {
                "userId": "string"
              },
              "team": {
                "entityId": "string",
                "members": [
                  {
                    "entityId": "string"
                  }
                ]
              },
              "onBehalfOf": {
                "system": {
                  "serviceName": "string",
                  "entityId": "string",
                  "managesOwnScheduling": true
                },
                "user": {
                  "userId": "string"
                },
                "team": {
                  "entityId": "string",
                  "members": [
                    {
                      "entityId": "string"
                    }
                  ]
                },
                "onBehalfOf": {
                  "system": {
                    "serviceName": "string",
                    "entityId": "string",
                    "managesOwnScheduling": true
                  },
                  "user": {
                    "userId": "string"
                  },
                  "team": {
                    "entityId": "string",
                    "members": [
                      {
                        "entityId": "string"
                      }
                    ]
                  },
                  "onBehalfOf": {
                    "system": {
                      "serviceName": "string",
                      "entityId": "string",
                      "managesOwnScheduling": true
                    },
                    "user": {
                      "userId": "string"
                    },
                    "team": {
                      "entityId": "string",
                      "members": [
                        {
                          "entityId": "string"
                        }
                      ]
                    },
                    "onBehalfOf": {
                      "system": {
                        "serviceName": "string",
                        "entityId": "string",
                        "managesOwnScheduling": true
                      },
                      "user": {
                        "userId": "string"
                      },
                      "team": {
                        "entityId": "string",
                        "members": [
                          {
                            "entityId": "string"
                          }
                        ]
                      },
                      "onBehalfOf": {
                        "system": {
                          "serviceName": "string",
                          "entityId": "string",
                          "managesOwnScheduling": true
                        },
                        "user": {
                          "userId": "string"
                        },
                        "team": {
                          "entityId": "string",
                          "members": [
                            {
                              "entityId": {}
                            }
                          ]
                        },
                        "onBehalfOf": {
                          "system": {
                            "serviceName": {},
                            "entityId": {},
                            "managesOwnScheduling": {}
                          },
                          "user": {
                            "userId": {}
                          },
                          "team": {
                            "entityId": {},
                            "members": {}
                          },
                          "onBehalfOf": {
                            "system": {},
                            "user": {},
                            "team": {},
                            "onBehalfOf": {}
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parentTaskId": "string"
      },
      "description": "string",
      "isExecutedElsewhere": true,
      "createTime": "2024-01-15T09:30:00Z",
      "replication": {
        "staleTime": "2024-01-15T09:30:00Z"
      },
      "initialEntities": [
        {
          "entity": {
            "entityId": "string",
            "description": "string",
            "isLive": true,
            "createdTime": "2024-01-15T09:30:00Z",
            "expiryTime": "2024-01-15T09:30:00Z",
            "noExpiry": true,
            "status": {
              "platformActivity": "string",
              "role": "string"
            },
            "location": {
              "position": {
                "latitudeDegrees": 1.1,
                "longitudeDegrees": 1.1,
                "altitudeHaeMeters": 1.1,
                "altitudeAglMeters": 1.1,
                "altitudeAsfMeters": 1.1,
                "pressureDepthMeters": 1.1
              },
              "velocityEnu": {
                "e": 1.1,
                "n": 1.1,
                "u": 1.1
              },
              "speedMps": 1.1,
              "acceleration": {
                "e": 1.1,
                "n": 1.1,
                "u": 1.1
              },
              "attitudeEnu": {
                "x": 1.1,
                "y": 1.1,
                "z": 1.1,
                "w": 1.1
              }
            },
            "locationUncertainty": {
              "positionEnuCov": {
                "mxx": 1.1,
                "mxy": 1.1,
                "mxz": 1.1,
                "myy": 1.1,
                "myz": 1.1,
                "mzz": 1.1
              },
              "velocityEnuCov": {
                "mxx": 1.1,
                "mxy": 1.1,
                "mxz": 1.1,
                "myy": 1.1,
                "myz": 1.1,
                "mzz": 1.1
              },
              "positionErrorEllipse": {
                "probability": 1.1,
                "semiMajorAxisM": 1.1,
                "semiMinorAxisM": 1.1,
                "orientationD": 1.1
              }
            },
            "geoShape": {
              "point": {
                "position": {
                  "latitudeDegrees": 1.1,
                  "longitudeDegrees": 1.1,
                  "altitudeHaeMeters": 1.1,
                  "altitudeAglMeters": 1.1,
                  "altitudeAsfMeters": 1.1,
                  "pressureDepthMeters": 1.1
                }
              },
              "line": {
                "positions": [
                  {
                    "latitudeDegrees": 1.1,
                    "longitudeDegrees": 1.1,
                    "altitudeHaeMeters": 1.1,
                    "altitudeAglMeters": 1.1,
                    "altitudeAsfMeters": 1.1,
                    "pressureDepthMeters": 1.1
                  }
                ]
              },
              "polygon": {
                "rings": [
                  {
                    "positions": [
                      {
                        "position": {
                          "latitudeDegrees": 1.1,
                          "longitudeDegrees": 1.1,
                          "altitudeHaeMeters": 1.1,
                          "altitudeAglMeters": 1.1,
                          "altitudeAsfMeters": 1.1,
                          "pressureDepthMeters": 1.1
                        },
                        "heightM": 1.1
                      }
                    ]
                  }
                ],
                "isRectangle": true
              },
              "ellipse": {
                "semiMajorAxisM": 1.1,
                "semiMinorAxisM": 1.1,
                "orientationD": 1.1,
                "heightM": 1.1
              },
              "ellipsoid": {
                "forwardAxisM": 1.1,
                "sideAxisM": 1.1,
                "upAxisM": 1.1
              }
            },
            "geoDetails": {
              "type": "GEO_TYPE_INVALID",
              "controlArea": {
                "type": "CONTROL_AREA_TYPE_INVALID"
              },
              "acm": {
                "acmType": "ACM_DETAIL_TYPE_INVALID",
                "acmDescription": "string"
              }
            },
            "aliases": {
              "alternateIds": [
                {
                  "id": "string",
                  "type": "ALT_ID_TYPE_INVALID"
                }
              ],
              "name": "string"
            },
            "tracked": {
              "trackQualityWrapper": 1,
              "sensorHits": 1,
              "numberOfObjects": {
                "lowerBound": 1,
                "upperBound": 1
              },
              "radarCrossSection": 1.1,
              "lastMeasurementTime": "2024-01-15T09:30:00Z",
              "lineOfBearing": {
                "angleOfArrival": {
                  "relativePose": {
                    "pos": {
                      "lon": 1.1,
                      "lat": 1.1,
                      "alt": 1.1,
                      "is2d": true,
                      "altitudeReference": "ALTITUDE_REFERENCE_INVALID"
                    },
                    "attEnu": {
                      "x": 1.1,
                      "y": 1.1,
                      "z": 1.1,
                      "w": 1.1
                    }
                  },
                  "bearingElevationCovarianceRad2": {
                    "mxx": 1.1,
                    "mxy": 1.1,
                    "myy": 1.1
                  }
                },
                "rangeEstimateM": {
                  "value": 1.1,
                  "sigma": 1.1
                },
                "maxRangeM": {
                  "value": 1.1,
                  "sigma": 1.1
                }
              }
            },
            "correlation": {
              "primary": {
                "secondaryEntityIds": [
                  "string"
                ]
              },
              "secondary": {
                "primaryEntityId": "string",
                "metadata": {
                  "provenance": {
                    "integrationName": "string",
                    "dataType": "string",
                    "sourceId": "string",
                    "sourceUpdateTime": "2024-01-15T09:30:00Z",
                    "sourceDescription": "string"
                  },
                  "replicationMode": "CORRELATION_REPLICATION_MODE_INVALID",
                  "type": "CORRELATION_TYPE_INVALID"
                }
              },
              "membership": {
                "correlationSetId": "string",
                "primary": {},
                "nonPrimary": {},
                "metadata": {
                  "provenance": {
                    "integrationName": "string",
                    "dataType": "string",
                    "sourceId": "string",
                    "sourceUpdateTime": "2024-01-15T09:30:00Z",
                    "sourceDescription": "string"
                  },
                  "replicationMode": "CORRELATION_REPLICATION_MODE_INVALID",
                  "type": "CORRELATION_TYPE_INVALID"
                }
              },
              "decorrelation": {
                "all": {
                  "metadata": {
                    "provenance": {
                      "integrationName": "string",
                      "dataType": "string",
                      "sourceId": "string",
                      "sourceUpdateTime": "2024-01-15T09:30:00Z",
                      "sourceDescription": "string"
                    },
                    "replicationMode": "CORRELATION_REPLICATION_MODE_INVALID",
                    "type": "CORRELATION_TYPE_INVALID"
                  }
                },
                "decorrelatedEntities": [
                  {
                    "entityId": "string",
                    "metadata": {
                      "provenance": {
                        "integrationName": "string",
                        "dataType": "string",
                        "sourceId": "string",
                        "sourceUpdateTime": "2024-01-15T09:30:00Z",
                        "sourceDescription": "string"
                      },
                      "replicationMode": "CORRELATION_REPLICATION_MODE_INVALID",
                      "type": "CORRELATION_TYPE_INVALID"
                    }
                  }
                ]
              }
            },
            "milView": {
              "disposition": "DISPOSITION_UNKNOWN",
              "environment": "ENVIRONMENT_UNKNOWN",
              "nationality": "NATIONALITY_INVALID"
            },
            "ontology": {
              "platformType": "string",
              "specificType": "string",
              "template": "TEMPLATE_INVALID"
            },
            "sensors": {
              "sensors": [
                {
                  "sensorId": "string",
                  "operationalState": "OPERATIONAL_STATE_INVALID",
                  "sensorType": "SENSOR_TYPE_INVALID",
                  "sensorDescription": "string",
                  "rfConfiguraton": {
                    "frequencyRangeHz": [
                      {
                        "minimumFrequencyHz": {
                          "frequencyHz": {
                            "value": 1.1,
                            "sigma": 1.1
                          }
                        },
                        "maximumFrequencyHz": {
                          "frequencyHz": {
                            "value": 1.1,
                            "sigma": 1.1
                          }
                        }
                      }
                    ],
                    "bandwidthRangeHz": [
                      {
                        "minimumBandwidth": {
                          "bandwidthHz": 1.1
                        },
                        "maximumBandwidth": {
                          "bandwidthHz": 1.1
                        }
                      }
                    ]
                  },
                  "lastDetectionTimestamp": "2024-01-15T09:30:00Z",
                  "fieldsOfView": [
                    {
                      "fovId": 1,
                      "mountId": "string",
                      "projectedFrustum": {
                        "upperLeft": {
                          "latitudeDegrees": 1.1,
                          "longitudeDegrees": 1.1,
                          "altitudeHaeMeters": 1.1,
                          "altitudeAglMeters": 1.1,
                          "altitudeAsfMeters": 1.1,
                          "pressureDepthMeters": 1.1
                        },
                        "upperRight": {
                          "latitudeDegrees": 1.1,
                          "longitudeDegrees": 1.1,
                          "altitudeHaeMeters": 1.1,
                          "altitudeAglMeters": 1.1,
                          "altitudeAsfMeters": 1.1,
                          "pressureDepthMeters": 1.1
                        },
                        "bottomRight": {
                          "latitudeDegrees": 1.1,
                          "longitudeDegrees": 1.1,
                          "altitudeHaeMeters": 1.1,
                          "altitudeAglMeters": 1.1,
                          "altitudeAsfMeters": 1.1,
                          "pressureDepthMeters": 1.1
                        },
                        "bottomLeft": {
                          "latitudeDegrees": 1.1,
                          "longitudeDegrees": 1.1,
                          "altitudeHaeMeters": 1.1,
                          "altitudeAglMeters": 1.1,
                          "altitudeAsfMeters": 1.1,
                          "pressureDepthMeters": 1.1
                        }
                      },
                      "projectedCenterRay": {
                        "latitudeDegrees": 1.1,
                        "longitudeDegrees": 1.1,
                        "altitudeHaeMeters": 1.1,
                        "altitudeAglMeters": 1.1,
                        "altitudeAsfMeters": 1.1,
                        "pressureDepthMeters": 1.1
                      },
                      "centerRayPose": {
                        "pos": {
                          "latitudeDegrees": 1.1,
                          "longitudeDegrees": 1.1,
                          "altitudeHaeMeters": 1.1,
                          "altitudeAglMeters": 1.1,
                          "altitudeAsfMeters": 1.1,
                          "pressureDepthMeters": 1.1
                        },
                        "orientation": {
                          "x": 1.1,
                          "y": 1.1,
                          "z": 1.1,
                          "w": 1.1
                        }
                      },
                      "horizontalFov": 1.1,
                      "verticalFov": 1.1,
                      "range": 1.1,
                      "mode": "SENSOR_MODE_INVALID"
                    }
                  ]
                }
              ]
            },
            "payloads": {
              "payloadConfigurations": [
                {
                  "config": {
                    "capabilityId": "string",
                    "quantity": 1,
                    "effectiveEnvironment": [
                      "ENVIRONMENT_UNKNOWN"
                    ],
                    "payloadOperationalState": "PAYLOAD_OPERATIONAL_STATE_INVALID",
                    "payloadDescription": "string"
                  }
                }
              ]
            },
            "powerState": {
              "sourceIdToState": {}
            },
            "provenance": {
              "integrationName": "string",
              "dataType": "string",
              "sourceId": "string",
              "sourceUpdateTime": "2024-01-15T09:30:00Z",
              "sourceDescription": "string"
            },
            "overrides": {
              "override": [
                {
                  "requestId": "string",
                  "fieldPath": "string",
                  "maskedFieldValue": {
                    "entityId": "string",
                    "description": "string",
                    "isLive": true,
                    "createdTime": "2024-01-15T09:30:00Z",
                    "expiryTime": "2024-01-15T09:30:00Z",
                    "noExpiry": true,
                    "status": {
                      "platformActivity": "string",
                      "role": "string"
                    },
                    "location": {
                      "position": {
                        "latitudeDegrees": 1.1,
                        "longitudeDegrees": 1.1,
                        "altitudeHaeMeters": 1.1,
                        "altitudeAglMeters": 1.1,
                        "altitudeAsfMeters": 1.1,
                        "pressureDepthMeters": 1.1
                      },
                      "velocityEnu": {
                        "e": 1.1,
                        "n": 1.1,
                        "u": 1.1
                      },
                      "speedMps": 1.1,
                      "acceleration": {
                        "e": 1.1,
                        "n": 1.1,
                        "u": 1.1
                      },
                      "attitudeEnu": {
                        "x": 1.1,
                        "y": 1.1,
                        "z": 1.1,
                        "w": 1.1
                      }
                    },
                    "locationUncertainty": {
                      "positionEnuCov": {
                        "mxx": 1.1,
                        "mxy": 1.1,
                        "mxz": 1.1,
                        "myy": 1.1,
                        "myz": 1.1,
                        "mzz": 1.1
                      },
                      "velocityEnuCov": {
                        "mxx": 1.1,
                        "mxy": 1.1,
                        "mxz": 1.1,
                        "myy": 1.1,
                        "myz": 1.1,
                        "mzz": 1.1
                      },
                      "positionErrorEllipse": {
                        "probability": 1.1,
                        "semiMajorAxisM": 1.1,
                        "semiMinorAxisM": 1.1,
                        "orientationD": 1.1
                      }
                    },
                    "geoShape": {
                      "point": {
                        "position": {
                          "latitudeDegrees": 1.1,
                          "longitudeDegrees": 1.1,
                          "altitudeHaeMeters": 1.1,
                          "altitudeAglMeters": 1.1,
                          "altitudeAsfMeters": 1.1,
                          "pressureDepthMeters": 1.1
                        }
                      },
                      "line": {
                        "positions": [
                          {
                            "latitudeDegrees": 1.1,
                            "longitudeDegrees": 1.1,
                            "altitudeHaeMeters": 1.1,
                            "altitudeAglMeters": 1.1,
                            "altitudeAsfMeters": 1.1,
                            "pressureDepthMeters": 1.1
                          }
                        ]
                      },
                      "polygon": {
                        "rings": [
                          {
                            "positions": [
                              {
                                "position": {
                                  "latitudeDegrees": 1.1,
                                  "longitudeDegrees": 1.1,
                                  "altitudeHaeMeters": 1.1,
                                  "altitudeAglMeters": 1.1,
                                  "altitudeAsfMeters": 1.1,
                                  "pressureDepthMeters": 1.1
                                },
                                "heightM": 1.1
                              }
                            ]
                          }
                        ],
                        "isRectangle": true
                      },
                      "ellipse": {
                        "semiMajorAxisM": 1.1,
                        "semiMinorAxisM": 1.1,
                        "orientationD": 1.1,
                        "heightM": 1.1
                      },
                      "ellipsoid": {
                        "forwardAxisM": 1.1,
                        "sideAxisM": 1.1,
                        "upAxisM": 1.1
                      }
                    },
                    "geoDetails": {
                      "type": "GEO_TYPE_INVALID",
                      "controlArea": {
                        "type": "CONTROL_AREA_TYPE_INVALID"
                      },
                      "acm": {
                        "acmType": "ACM_DETAIL_TYPE_INVALID",
                        "acmDescription": "string"
                      }
                    },
                    "aliases": {
                      "alternateIds": [
                        {
                          "id": "string",
                          "type": "ALT_ID_TYPE_INVALID"
                        }
                      ],
                      "name": "string"
                    },
                    "tracked": {
                      "trackQualityWrapper": 1,
                      "sensorHits": 1,
                      "numberOfObjects": {
                        "lowerBound": 1,
                        "upperBound": 1
                      },
                      "radarCrossSection": 1.1,
                      "lastMeasurementTime": "2024-01-15T09:30:00Z",
                      "lineOfBearing": {
                        "angleOfArrival": {
                          "relativePose": {
                            "pos": {
                              "lon": 1.1,
                              "lat": 1.1,
                              "alt": 1.1,
                              "is2d": true,
                              "altitudeReference": "ALTITUDE_REFERENCE_INVALID"
                            },
                            "attEnu": {
                              "x": 1.1,
                              "y": 1.1,
                              "z": 1.1,
                              "w": 1.1
                            }
                          },
                          "bearingElevationCovarianceRad2": {
                            "mxx": 1.1,
                            "mxy": 1.1,
                            "myy": 1.1
                          }
                        },
                        "rangeEstimateM": {
                          "value": 1.1,
                          "sigma": 1.1
                        },
                        "maxRangeM": {
                          "value": 1.1,
                          "sigma": 1.1
                        }
                      }
                    },
                    "correlation": {
                      "primary": {
                        "secondaryEntityIds": [
                          "string"
                        ]
                      },
                      "secondary": {
                        "primaryEntityId": "string",
                        "metadata": {
                          "provenance": {
                            "integrationName": "string",
                            "dataType": "string",
                            "sourceId": "string",
                            "sourceUpdateTime": "2024-01-15T09:30:00Z",
                            "sourceDescription": "string"
                          },
                          "replicationMode": "CORRELATION_REPLICATION_MODE_INVALID",
                          "type": "CORRELATION_TYPE_INVALID"
                        }
                      },
                      "membership": {
                        "correlationSetId": "string",
                        "primary": {},
                        "nonPrimary": {},
                        "metadata": {
                          "provenance": {
                            "integrationName": "string",
                            "dataType": "string",
                            "sourceId": "string",
                            "sourceUpdateTime": "2024-01-15T09:30:00Z",
                            "sourceDescription": "string"
                          },
                          "replicationMode": "CORRELATION_REPLICATION_MODE_INVALID",
                          "type": "CORRELATION_TYPE_INVALID"
                        }
                      },
                      "decorrelation": {
                        "all": {
                          "metadata": {
                            "provenance": {
                              "integrationName": "string",
                              "dataType": "string",
                              "sourceId": "string",
                              "sourceUpdateTime": "2024-01-15T09:30:00Z",
                              "sourceDescription": "string"
                            },
                            "replicationMode": "CORRELATION_REPLICATION_MODE_INVALID",
                            "type": "CORRELATION_TYPE_INVALID"
                          }
                        },
                        "decorrelatedEntities": [
                          {
                            "entityId": "string",
                            "metadata": {
                              "provenance": {
                                "integrationName": "string",
                                "dataType": "string",
                                "sourceId": "string",
                                "sourceUpdateTime": "2024-01-15T09:30:00Z",
                                "sourceDescription": "string"
                              },
                              "replicationMode": "CORRELATION_REPLICATION_MODE_INVALID",
                              "type": "CORRELATION_TYPE_INVALID"
                            }
                          }
                        ]
                      }
                    },
                    "milView": {
                      "disposition": "DISPOSITION_UNKNOWN",
                      "environment": "ENVIRONMENT_UNKNOWN",
                      "nationality": "NATIONALITY_INVALID"
                    },
                    "ontology": {
                      "platformType": "string",
                      "specificType": "string",
                      "template": "TEMPLATE_INVALID"
                    },
                    "sensors": {
                      "sensors": [
                        {
                          "sensorId": "string",
                          "operationalState": "OPERATIONAL_STATE_INVALID",
                          "sensorType": "SENSOR_TYPE_INVALID",
                          "sensorDescription": "string",
                          "rfConfiguraton": {
                            "frequencyRangeHz": [
                              {
                                "minimumFrequencyHz": {
                                  "frequencyHz": {
                                    "value": {},
                                    "sigma": {}
                                  }
                                },
                                "maximumFrequencyHz": {
                                  "frequencyHz": {
                                    "value": {},
                                    "sigma": {}
                                  }
                                }
                              }
                            ],
                            "bandwidthRangeHz": [
                              {
                                "minimumBandwidth": {
                                  "bandwidthHz": 1.1
                                },
                                "maximumBandwidth": {
                                  "bandwidthHz": 1.1
                                }
                              }
                            ]
                          },
                          "lastDetectionTimestamp": "2024-01-15T09:30:00Z",
                          "fieldsOfView": [
                            {
                              "fovId": 1,
                              "mountId": "string",
                              "projectedFrustum": {
                                "upperLeft": {
                                  "latitudeDegrees": 1.1,
                                  "longitudeDegrees": 1.1,
                                  "altitudeHaeMeters": 1.1,
                                  "altitudeAglMeters": 1.1,
                                  "altitudeAsfMeters": 1.1,
                                  "pressureDepthMeters": 1.1
                                },
                                "upperRight": {
                                  "latitudeDegrees": 1.1,
                                  "longitudeDegrees": 1.1,
                                  "altitudeHaeMeters": 1.1,
                                  "altitudeAglMeters": 1.1,
                                  "altitudeAsfMeters": 1.1,
                                  "pressureDepthMeters": 1.1
                                },
                                "bottomRight": {
                                  "latitudeDegrees": 1.1,
                                  "longitudeDegrees": 1.1,
                                  "altitudeHaeMeters": 1.1,
                                  "altitudeAglMeters": 1.1,
                                  "altitudeAsfMeters": 1.1,
                                  "pressureDepthMeters": 1.1
                                },
                                "bottomLeft": {
                                  "latitudeDegrees": 1.1,
                                  "longitudeDegrees": 1.1,
                                  "altitudeHaeMeters": 1.1,
                                  "altitudeAglMeters": 1.1,
                                  "altitudeAsfMeters": 1.1,
                                  "pressureDepthMeters": 1.1
                                }
                              },
                              "projectedCenterRay": {
                                "latitudeDegrees": 1.1,
                                "longitudeDegrees": 1.1,
                                "altitudeHaeMeters": 1.1,
                                "altitudeAglMeters": 1.1,
                                "altitudeAsfMeters": 1.1,
                                "pressureDepthMeters": 1.1
                              },
                              "centerRayPose": {
                                "pos": {
                                  "latitudeDegrees": 1.1,
                                  "longitudeDegrees": 1.1,
                                  "altitudeHaeMeters": 1.1,
                                  "altitudeAglMeters": 1.1,
                                  "altitudeAsfMeters": 1.1,
                                  "pressureDepthMeters": 1.1
                                },
                                "orientation": {
                                  "x": 1.1,
                                  "y": 1.1,
                                  "z": 1.1,
                                  "w": 1.1
                                }
                              },
                              "horizontalFov": 1.1,
                              "verticalFov": 1.1,
                              "range": 1.1,
                              "mode": "SENSOR_MODE_INVALID"
                            }
                          ]
                        }
                      ]
                    },
                    "payloads": {
                      "payloadConfigurations": [
                        {
                          "config": {
                            "capabilityId": "string",
                            "quantity": 1,
                            "effectiveEnvironment": [
                              "ENVIRONMENT_UNKNOWN"
                            ],
                            "payloadOperationalState": "PAYLOAD_OPERATIONAL_STATE_INVALID",
                            "payloadDescription": "string"
                          }
                        }
                      ]
                    },
                    "powerState": {
                      "sourceIdToState": {}
                    },
                    "provenance": {
                      "integrationName": "string",
                      "dataType": "string",
                      "sourceId": "string",
                      "sourceUpdateTime": "2024-01-15T09:30:00Z",
                      "sourceDescription": "string"
                    },
                    "overrides": {
                      "override": [
                        null
                      ]
                    },
                    "indicators": {
                      "simulated": true,
                      "exercise": true,
                      "emergency": true,
                      "c2": true,
                      "egressable": true,
                      "starred": true
                    },
                    "targetPriority": {
                      "highValueTarget": {
                        "isHighValueTarget": true,
                        "targetPriority": 1,
                        "targetMatches": [
                          {
                            "highValueTargetListId": "string",
                            "highValueTargetDescriptionId": "string"
                          }
                        ],
                        "isHighPayoffTarget": true
                      },
                      "threat": {
                        "isThreat": true
                      }
                    },
                    "signal": {
                      "frequencyCenter": {
                        "frequencyHz": {
                          "value": 1.1,
                          "sigma": 1.1
                        }
                      },
                      "frequencyRange": {
                        "minimumFrequencyHz": {
                          "frequencyHz": {
                            "value": 1.1,
                            "sigma": 1.1
                          }
                        },
                        "maximumFrequencyHz": {
                          "frequencyHz": {
                            "value": 1.1,
                            "sigma": 1.1
                          }
                        }
                      },
                      "bandwidthHz": 1.1,
                      "signalToNoiseRatio": 1.1,
                      "lineOfBearing": {
                        "angleOfArrival": {
                          "relativePose": {
                            "pos": {
                              "lon": 1.1,
                              "lat": 1.1,
                              "alt": 1.1,
                              "is2d": true,
                              "altitudeReference": "ALTITUDE_REFERENCE_INVALID"
                            },
                            "attEnu": {
                              "x": 1.1,
                              "y": 1.1,
                              "z": 1.1,
                              "w": 1.1
                            }
                          },
                          "bearingElevationCovarianceRad2": {
                            "mxx": 1.1,
                            "mxy": 1.1,
                            "myy": 1.1
                          }
                        },
                        "rangeEstimateM": {
                          "value": 1.1,
                          "sigma": 1.1
                        },
                        "maxRangeM": {
                          "value": 1.1,
                          "sigma": 1.1
                        }
                      },
                      "fixed": {},
                      "emitterNotations": [
                        {
                          "emitterNotation": "string",
                          "confidence": 1.1
                        }
                      ],
                      "pulseWidthS": 1.1,
                      "pulseRepetitionInterval": {
                        "pulseRepetitionIntervalS": {
                          "value": 1.1,
                          "sigma": 1.1
                        }
                      },
                      "scanCharacteristics": {
                        "scanType": "SCAN_TYPE_INVALID",
                        "scanPeriodS": 1.1
                      }
                    },
                    "transponderCodes": {
                      "mode1": 1,
                      "mode2": 1,
                      "mode3": 1,
                      "mode4InterrogationResponse": "INTERROGATION_RESPONSE_INVALID",
                      "mode5": {
                        "mode5InterrogationResponse": "INTERROGATION_RESPONSE_INVALID",
                        "mode5": 1,
                        "mode5PlatformId": 1
                      },
                      "modeS": {
                        "id": "string",
                        "address": 1
                      },
                      "modeCAltitudeFt": 1
                    },
                    "dataClassification": {
                      "default": {
                        "level": "CLASSIFICATION_LEVELS_INVALID",
                        "caveats": [
                          "string"
                        ]
                      },
                      "fields": [
                        {
                          "fieldPath": "string",
                          "classificationInformation": {
                            "level": "CLASSIFICATION_LEVELS_INVALID",
                            "caveats": [
                              "string"
                            ]
                          }
                        }
                      ]
                    },
                    "taskCatalog": {
                      "taskDefinitions": [
                        {
                          "taskSpecificationUrl": "string"
                        }
                      ]
                    },
                    "media": {
                      "media": [
                        {
                          "itemIdentifier": "string",
                          "type": "MEDIA_TYPE_INVALID",
                          "relativePath": "string"
                        }
                      ]
                    },
                    "relationships": {
                      "relationships": [
                        {
                          "relatedEntityId": "string",
                          "relationshipId": "string",
                          "relationshipType": {
                            "trackedBy": {
                              "activelyTrackingSensors": {
                                "sensors": [
                                  {
                                    "sensorId": {},
                                    "operationalState": {},
                                    "sensorType": {},
                                    "sensorDescription": {},
                                    "rfConfiguraton": {},
                                    "lastDetectionTimestamp": {},
                                    "fieldsOfView": {}
                                  }
                                ]
                              },
                              "lastMeasurementTimestamp": "2024-01-15T09:30:00Z"
                            },
                            "groupChild": {},
                            "groupParent": {},
                            "mergedFrom": {},
                            "activeTarget": {}
                          }
                        }
                      ]
                    },
                    "visualDetails": {
                      "rangeRings": {
                        "minDistanceM": 1.1,
                        "maxDistanceM": 1.1,
                        "ringCount": 1,
                        "ringLineColor": {
                          "red": 1.1,
                          "green": 1.1,
                          "blue": 1.1,
                          "alpha": 1.1
                        }
                      }
                    },
                    "dimensions": {
                      "lengthM": 1.1
                    },
                    "routeDetails": {
                      "destinationName": "string",
                      "estimatedArrivalTime": "2024-01-15T09:30:00Z"
                    },
                    "schedules": {
                      "schedules": [
                        {
                          "windows": [
                            {
                              "cronExpression": "string",
                              "durationMillis": "string"
                            }
                          ],
                          "scheduleId": "string",
                          "scheduleType": "SCHEDULE_TYPE_INVALID"
                        }
                      ]
                    },
                    "health": {
                      "connectionStatus": "CONNECTION_STATUS_INVALID",
                      "healthStatus": "HEALTH_STATUS_INVALID",
                      "components": [
                        {
                          "id": "string",
                          "name": "string",
                          "health": "HEALTH_STATUS_INVALID",
                          "messages": [
                            {
                              "status": "HEALTH_STATUS_INVALID",
                              "message": "string"
                            }
                          ],
                          "updateTime": "2024-01-15T09:30:00Z"
                        }
                      ],
                      "updateTime": "2024-01-15T09:30:00Z",
                      "activeAlerts": [
                        {
                          "alertCode": "string",
                          "description": "string",
                          "level": "ALERT_LEVEL_INVALID",
                          "activatedTime": "2024-01-15T09:30:00Z",
                          "activeConditions": [
                            {
                              "conditionCode": "string",
                              "description": "string"
                            }
                          ]
                        }
                      ]
                    },
                    "groupDetails": {
                      "team": {
                        "entityId": "string",
                        "members": [
                          {
                            "entityId": "string"
                          }
                        ]
                      },
                      "echelon": {
                        "armyEchelon": "ARMY_ECHELON_INVALID"
                      }
                    },
                    "supplies": {
                      "munitions": [
                        {
                          "munitionId": "string",
                          "name": "string",
                          "quantityUnits": 1
                        }
                      ],
                      "fuel": [
                        {
                          "fuelId": "string",
                          "name": "string",
                          "reportedDate": "2024-01-15T09:30:00Z",
                          "amountGallons": 1,
                          "maxAuthorizedCapacityGallons": 1,
                          "operationalRequirementGallons": 1,
                          "dataClassification": {
                            "default": {
                              "level": "CLASSIFICATION_LEVELS_INVALID",
                              "caveats": [
                                "string"
                              ]
                            },
                            "fields": [
                              {
                                "fieldPath": "string",
                                "classificationInformation": {
                                  "level": "CLASSIFICATION_LEVELS_INVALID",
                                  "caveats": [
                                    "string"
                                  ]
                                }
                              }
                            ]
                          },
                          "dataSource": "string"
                        }
                      ]
                    },
                    "orbit": {
                      "orbitMeanElements": {
                        "metadata": {
                          "creationDate": "2024-01-15T09:30:00Z",
                          "originator": "string",
                          "messageId": "string",
                          "refFrame": "ECI_REFERENCE_FRAME_INVALID",
                          "refFrameEpoch": "2024-01-15T09:30:00Z",
                          "meanElementTheory": "MEAN_ELEMENT_THEORY_INVALID"
                        },
                        "meanKeplerianElements": {
                          "epoch": "2024-01-15T09:30:00Z",
                          "semiMajorAxisKm": 1.1,
                          "meanMotion": 1.1,
                          "eccentricity": 1.1,
                          "inclinationDeg": 1.1,
                          "raOfAscNodeDeg": 1.1,
                          "argOfPericenterDeg": 1.1,
                          "meanAnomalyDeg": 1.1,
                          "gm": 1.1
                        },
                        "tleParameters": {
                          "ephemerisType": 1,
                          "classificationType": "string",
                          "noradCatId": 1,
                          "elementSetNo": 1,
                          "revAtEpoch": 1,
                          "bstar": 1.1,
                          "bterm": 1.1,
                          "meanMotionDot": 1.1,
                          "meanMotionDdot": 1.1,
                          "agom": 1.1
                        }
                      }
                    },
                    "symbology": {
                      "milStd2525C": {
                        "sidc": "string"
                      }
                    }
                  },
                  "status": "OVERRIDE_STATUS_INVALID",
                  "provenance": {
                    "integrationName": "string",
                    "dataType": "string",
                    "sourceId": "string",
                    "sourceUpdateTime": "2024-01-15T09:30:00Z",
                    "sourceDescription": "string"
                  },
                  "type": "OVERRIDE_TYPE_INVALID",
                  "requestTimestamp": "2024-01-15T09:30:00Z"
                }
              ]
            },
            "indicators": {
              "simulated": true,
              "exercise": true,
              "emergency": true,
              "c2": true,
              "egressable": true,
              "starred": true
            },
            "targetPriority": {
              "highValueTarget": {
                "isHighValueTarget": true,
                "targetPriority": 1,
                "targetMatches": [
                  {
                    "highValueTargetListId": "string",
                    "highValueTargetDescriptionId": "string"
                  }
                ],
                "isHighPayoffTarget": true
              },
              "threat": {
                "isThreat": true
              }
            },
            "signal": {
              "frequencyCenter": {
                "frequencyHz": {
                  "value": 1.1,
                  "sigma": 1.1
                }
              },
              "frequencyRange": {
                "minimumFrequencyHz": {
                  "frequencyHz": {
                    "value": 1.1,
                    "sigma": 1.1
                  }
                },
                "maximumFrequencyHz": {
                  "frequencyHz": {
                    "value": 1.1,
                    "sigma": 1.1
                  }
                }
              },
              "bandwidthHz": 1.1,
              "signalToNoiseRatio": 1.1,
              "lineOfBearing": {
                "angleOfArrival": {
                  "relativePose": {
                    "pos": {
                      "lon": 1.1,
                      "lat": 1.1,
                      "alt": 1.1,
                      "is2d": true,
                      "altitudeReference": "ALTITUDE_REFERENCE_INVALID"
                    },
                    "attEnu": {
                      "x": 1.1,
                      "y": 1.1,
                      "z": 1.1,
                      "w": 1.1
                    }
                  },
                  "bearingElevationCovarianceRad2": {
                    "mxx": 1.1,
                    "mxy": 1.1,
                    "myy": 1.1
                  }
                },
                "rangeEstimateM": {
                  "value": 1.1,
                  "sigma": 1.1
                },
                "maxRangeM": {
                  "value": 1.1,
                  "sigma": 1.1
                }
              },
              "fixed": {},
              "emitterNotations": [
                {
                  "emitterNotation": "string",
                  "confidence": 1.1
                }
              ],
              "pulseWidthS": 1.1,
              "pulseRepetitionInterval": {
                "pulseRepetitionIntervalS": {
                  "value": 1.1,
                  "sigma": 1.1
                }
              },
              "scanCharacteristics": {
                "scanType": "SCAN_TYPE_INVALID",
                "scanPeriodS": 1.1
              }
            },
            "transponderCodes": {
              "mode1": 1,
              "mode2": 1,
              "mode3": 1,
              "mode4InterrogationResponse": "INTERROGATION_RESPONSE_INVALID",
              "mode5": {
                "mode5InterrogationResponse": "INTERROGATION_RESPONSE_INVALID",
                "mode5": 1,
                "mode5PlatformId": 1
              },
              "modeS": {
                "id": "string",
                "address": 1
              },
              "modeCAltitudeFt": 1
            },
            "dataClassification": {
              "default": {
                "level": "CLASSIFICATION_LEVELS_INVALID",
                "caveats": [
                  "string"
                ]
              },
              "fields": [
                {
                  "fieldPath": "string",
                  "classificationInformation": {
                    "level": "CLASSIFICATION_LEVELS_INVALID",
                    "caveats": [
                      "string"
                    ]
                  }
                }
              ]
            },
            "taskCatalog": {
              "taskDefinitions": [
                {
                  "taskSpecificationUrl": "string"
                }
              ]
            },
            "media": {
              "media": [
                {
                  "itemIdentifier": "string",
                  "type": "MEDIA_TYPE_INVALID",
                  "relativePath": "string"
                }
              ]
            },
            "relationships": {
              "relationships": [
                {
                  "relatedEntityId": "string",
                  "relationshipId": "string",
                  "relationshipType": {
                    "trackedBy": {
                      "activelyTrackingSensors": {
                        "sensors": [
                          {
                            "sensorId": "string",
                            "operationalState": "OPERATIONAL_STATE_INVALID",
                            "sensorType": "SENSOR_TYPE_INVALID",
                            "sensorDescription": "string",
                            "rfConfiguraton": {
                              "frequencyRangeHz": [
                                {
                                  "minimumFrequencyHz": {
                                    "frequencyHz": {}
                                  },
                                  "maximumFrequencyHz": {
                                    "frequencyHz": {}
                                  }
                                }
                              ],
                              "bandwidthRangeHz": [
                                {
                                  "minimumBandwidth": {
                                    "bandwidthHz": {}
                                  },
                                  "maximumBandwidth": {
                                    "bandwidthHz": {}
                                  }
                                }
                              ]
                            },
                            "lastDetectionTimestamp": "2024-01-15T09:30:00Z",
                            "fieldsOfView": [
                              {
                                "fovId": 1,
                                "mountId": "string",
                                "projectedFrustum": {
                                  "upperLeft": {
                                    "latitudeDegrees": {},
                                    "longitudeDegrees": {},
                                    "altitudeHaeMeters": {},
                                    "altitudeAglMeters": {},
                                    "altitudeAsfMeters": {},
                                    "pressureDepthMeters": {}
                                  },
                                  "upperRight": {
                                    "latitudeDegrees": {},
                                    "longitudeDegrees": {},
                                    "altitudeHaeMeters": {},
                                    "altitudeAglMeters": {},
                                    "altitudeAsfMeters": {},
                                    "pressureDepthMeters": {}
                                  },
                                  "bottomRight": {
                                    "latitudeDegrees": {},
                                    "longitudeDegrees": {},
                                    "altitudeHaeMeters": {},
                                    "altitudeAglMeters": {},
                                    "altitudeAsfMeters": {},
                                    "pressureDepthMeters": {}
                                  },
                                  "bottomLeft": {
                                    "latitudeDegrees": {},
                                    "longitudeDegrees": {},
                                    "altitudeHaeMeters": {},
                                    "altitudeAglMeters": {},
                                    "altitudeAsfMeters": {},
                                    "pressureDepthMeters": {}
                                  }
                                },
                                "projectedCenterRay": {
                                  "latitudeDegrees": 1.1,
                                  "longitudeDegrees": 1.1,
                                  "altitudeHaeMeters": 1.1,
                                  "altitudeAglMeters": 1.1,
                                  "altitudeAsfMeters": 1.1,
                                  "pressureDepthMeters": 1.1
                                },
                                "centerRayPose": {
                                  "pos": {
                                    "latitudeDegrees": {},
                                    "longitudeDegrees": {},
                                    "altitudeHaeMeters": {},
                                    "altitudeAglMeters": {},
                                    "altitudeAsfMeters": {},
                                    "pressureDepthMeters": {}
                                  },
                                  "orientation": {
                                    "x": {},
                                    "y": {},
                                    "z": {},
                                    "w": {}
                                  }
                                },
                                "horizontalFov": 1.1,
                                "verticalFov": 1.1,
                                "range": 1.1,
                                "mode": "SENSOR_MODE_INVALID"
                              }
                            ]
                          }
                        ]
                      },
                      "lastMeasurementTimestamp": "2024-01-15T09:30:00Z"
                    },
                    "groupChild": {},
                    "groupParent": {},
                    "mergedFrom": {},
                    "activeTarget": {}
                  }
                }
              ]
            },
            "visualDetails": {
              "rangeRings": {
                "minDistanceM": 1.1,
                "maxDistanceM": 1.1,
                "ringCount": 1,
                "ringLineColor": {
                  "red": 1.1,
                  "green": 1.1,
                  "blue": 1.1,
                  "alpha": 1.1
                }
              }
            },
            "dimensions": {
              "lengthM": 1.1
            },
            "routeDetails": {
              "destinationName": "string",
              "estimatedArrivalTime": "2024-01-15T09:30:00Z"
            },
            "schedules": {
              "schedules": [
                {
                  "windows": [
                    {
                      "cronExpression": "string",
                      "durationMillis": "string"
                    }
                  ],
                  "scheduleId": "string",
                  "scheduleType": "SCHEDULE_TYPE_INVALID"
                }
              ]
            },
            "health": {
              "connectionStatus": "CONNECTION_STATUS_INVALID",
              "healthStatus": "HEALTH_STATUS_INVALID",
              "components": [
                {
                  "id": "string",
                  "name": "string",
                  "health": "HEALTH_STATUS_INVALID",
                  "messages": [
                    {
                      "status": "HEALTH_STATUS_INVALID",
                      "message": "string"
                    }
                  ],
                  "updateTime": "2024-01-15T09:30:00Z"
                }
              ],
              "updateTime": "2024-01-15T09:30:00Z",
              "activeAlerts": [
                {
                  "alertCode": "string",
                  "description": "string",
                  "level": "ALERT_LEVEL_INVALID",
                  "activatedTime": "2024-01-15T09:30:00Z",
                  "activeConditions": [
                    {
                      "conditionCode": "string",
                      "description": "string"
                    }
                  ]
                }
              ]
            },
            "groupDetails": {
              "team": {
                "entityId": "string",
                "members": [
                  {
                    "entityId": "string"
                  }
                ]
              },
              "echelon": {
                "armyEchelon": "ARMY_ECHELON_INVALID"
              }
            },
            "supplies": {
              "munitions": [
                {
                  "munitionId": "string",
                  "name": "string",
                  "quantityUnits": 1
                }
              ],
              "fuel": [
                {
                  "fuelId": "string",
                  "name": "string",
                  "reportedDate": "2024-01-15T09:30:00Z",
                  "amountGallons": 1,
                  "maxAuthorizedCapacityGallons": 1,
                  "operationalRequirementGallons": 1,
                  "dataClassification": {
                    "default": {
                      "level": "CLASSIFICATION_LEVELS_INVALID",
                      "caveats": [
                        "string"
                      ]
                    },
                    "fields": [
                      {
                        "fieldPath": "string",
                        "classificationInformation": {
                          "level": "CLASSIFICATION_LEVELS_INVALID",
                          "caveats": [
                            "string"
                          ]
                        }
                      }
                    ]
                  },
                  "dataSource": "string"
                }
              ]
            },
            "orbit": {
              "orbitMeanElements": {
                "metadata": {
                  "creationDate": "2024-01-15T09:30:00Z",
                  "originator": "string",
                  "messageId": "string",
                  "refFrame": "ECI_REFERENCE_FRAME_INVALID",
                  "refFrameEpoch": "2024-01-15T09:30:00Z",
                  "meanElementTheory": "MEAN_ELEMENT_THEORY_INVALID"
                },
                "meanKeplerianElements": {
                  "epoch": "2024-01-15T09:30:00Z",
                  "semiMajorAxisKm": 1.1,
                  "meanMotion": 1.1,
                  "eccentricity": 1.1,
                  "inclinationDeg": 1.1,
                  "raOfAscNodeDeg": 1.1,
                  "argOfPericenterDeg": 1.1,
                  "meanAnomalyDeg": 1.1,
                  "gm": 1.1
                },
                "tleParameters": {
                  "ephemerisType": 1,
                  "classificationType": "string",
                  "noradCatId": 1,
                  "elementSetNo": 1,
                  "revAtEpoch": 1,
                  "bstar": 1.1,
                  "bterm": 1.1,
                  "meanMotionDot": 1.1,
                  "meanMotionDdot": 1.1,
                  "agom": 1.1
                }
              }
            },
            "symbology": {
              "milStd2525C": {
                "sidc": "string"
              }
            }
          },
          "snapshot": true
        }
      ],
      "owner": {
        "entityId": "string"
      },
      "retryStrategy": {
        "fixedRetryStrategy": {
          "retryInterval": "string"
        }
      },
      "deliveryState": {
        "status": "DELIVERY_STATUS_INVALID",
        "error": {
          "code": "DELIVERY_ERROR_CODE_INVALID",
          "message": "string"
        },
        "deliveryConstraints": {
          "deliverAfter": "2024-01-15T09:30:00Z",
          "deliverBefore": "2024-01-15T09:30:00Z"
        }
      }
    }
  ],
  "nextPageToken": "string"
}
```