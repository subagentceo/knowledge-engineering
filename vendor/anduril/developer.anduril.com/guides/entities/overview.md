> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Entities overview

An **entity** is an interoperable data structure that powers the Lattice common operational picture (COP).

An entity consists of **components**. The presence or absence of components, rather than a strict type hierarchy,
determines what an entity is and how it should be interacted with. Think of an entity as a bag of components that
you can mix and match as needed. Entities might be incomplete at various points in time,
reflecting the real-time state of the COP. Partial states are valuable for situational awareness,
so your code must handle missing components robustly.

<br />

* **Components must not be duplicative** -- Avoid modeling the same underlying data on
  two different components.
* **Components are non-hierarchical** -- The data model is composable and not an
  inheritance tree.

## Entity model

An entity requires the following components:

Unique string identifier. Can be a Globally Unique Identifier (GUID).

A boolean that when set to <code>true</code>, creates, or updates the entity.
If set to <code>false</code>, while the entity is still live, it triggers a
<code>DELETE</code> event.

The future time, less than 30 days, at which the entity expires. When the <code>expiry\_time</code>
has passed, Lattice deletes the entity.

The name of the integration that created this entity.

Human-readable string that represents the name of an entity.

For more information, see [Entities](/reference/rest/entities/publish-entity#request)
in the *Lattice API Reference*.

## Entity templates

Although there is no strict type hierarchy, a user interface could group
entities according to its [ontology](/reference/rest/entities/publish-entity#ontology.template) component.
Lattice supports the following three top-level entity shapes:

### Asset

An *asset* is an entity under your control, or under the control of another operator or system.
Assets may accept tasks such as search or tracking. To create an asset, add the following components in addition
to the required components:

Add the ontology component and set [`template`](/reference/rest/entities/publish-entity#request.body.ontolog.template)
to <code>TEMPLATE\_ASSET</code> to render an asset in Lattice.

Add the [location](/reference/rest/entities/publish-entity#request.body.location) component
and set the asset's position using its latitude and longitude details.

Add the [milView](/reference/rest/entities/publish-entity#request.body.milView) component
and set the disposition, environment, and nationality of the asset.

**Example entity models**:

```json title="asset.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Asset",
    "ontology": {
        "template": "TEMPLATE_ASSET",
        "platform_type": "Submarine"
    },
    "location": {
        "position": {
            "latitudeDegrees": 50.91402185768586,
            "longitudeDegrees": 0.79203612077257,
            "altitudeHaeMeters": 2994,
            "altitudeAglMeters": 2972.8
        }
    },
    "milView": {
        "disposition": "DISPOSITION_FRIENDLY",
        "environment": "ENVIRONMENT_SUB_SURFACE"
    },
    "aliases": {
        "name": "Dive"
    },
    "provenance": {
        "integrationName": "your_integration_name",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "isLive": true,
    "createdTime": "2024-12-07T00:09:42.816877Z",
    "expiryTime": "2024-12-17T00:09:42.816878Z",
}
```

```json title="asset.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Asset",
    "ontology": {
        "template": "TEMPLATE_ASSET",
        "platform_type": "Radar"
    },
    "location": {
        "position": {
            "latitudeDegrees": 50.91402185768586,
            "longitudeDegrees": 0.79203612077257
        }
    },
    "milView": {
        "disposition": "DISPOSITION_FRIENDLY",
        "environment": "ENVIRONMENT_SURFACE"
    },
    "aliases": {
        "name": "Tower"
    },
    "provenance": {
        "integrationName": "your_integration_name",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "isLive": true,
    "createdTime": "2024-12-07T00:09:42.816877Z",
    "expiryTime": "2024-12-17T00:09:42.816878Z",
}
```

```json title="asset.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Asset",
    "ontology": {
        "template": "TEMPLATE_ASSET",
        "platform_type": "UAV"
    },
    "location": {
        "position": {
            "latitudeDegrees": 50.91402185768586,
            "longitudeDegrees": 0.79203612077257,
            "altitudeHaeMeters": 2994,
            "altitudeAglMeters": 2972.8
        }
    },
    "milView": {
        "disposition": "DISPOSITION_FRIENDLY",
        "environment": "ENVIRONMENT_AIR"
    },
    "aliases": {
        "name": "UAV"
    },
    "provenance": {
        "integrationName": "your_integration_name",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "isLive": true,
    "createdTime": "2024-12-07T00:09:42.816877Z",
    "expiryTime": "2024-12-17T00:09:42.816878Z"
}
```

### Track

A *track* represents any entity tracked by an asset or integration connected to Lattice.
Tracks are not directly under the control of friendly forces. This includes aircraft
tracks from radar or sensors, signal detections, vehicles, people, or animals detected through cameras.

Lattice supports the following track types:

Add the ontology component and set [`template`](/reference/rest/entities/publish-entity#request.body.ontolog.template)
to <code>TEMPLATE\_TRACK</code>  to render a generic track.

Add the [`location`](/reference/rest/entities/publish-entity#request.body.position) component
to set the latitude and longitude of the track.

Add the [`milView`](/reference/rest/entities/publish-entity#request.body.milView) component
to set the disposition, environment, and nationality of the track.

**Example entity models**:

```json title="track.json" maxLines=25 
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Airplane",
    "ontology": {
        "template": "TEMPLATE_TRACK",
        "platform_type": "Airplane"
    },
    "location": {
        "position": {
            "latitudeDegrees": 50.91402185768586,
            "longitudeDegrees": 0.79203612077257,
            "altitudeHaeMeters": 46.214997987295234
        }
    },
    "milView": {
        "disposition": "DISPOSITION_FRIENDLY",
        "environment": "ENVIRONMENT_AIR"
    },
    "aliases": {
        "name": "Friendly Airplane"
    },
    "provenance": {
        "integrationName": "your_integration_name",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "isLive": true,
    "createdTime": "2024-12-07T00:19:46.706195Z",
    "expiryTime": "2024-12-07T00:24:46.706196Z"
}
```

```json title="track.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Animal",
    "ontology": {
        "template": "TEMPLATE_TRACK",
        "platform_type": "Animal"
    },
    "location": {
        "position": {
            "latitudeDegrees": 50.91402185768586,
            "longitudeDegrees": 0.79203612077257,
            "altitudeHaeMeters": 46.214997987295234
        }
    },
    "milView": {
        "disposition": "DISPOSITION_NEUTRAL",
        "environment": "ENVIRONMENT_AIR"
    },
    "provenance": {
        "integrationName": "your_integration_name",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "aliases": {
        "name": "Bird"
    },
    "isLive": true,
    "createdTime": "2024-12-07T00:19:46.706195Z",
    "expiryTime": "2024-12-07T00:24:46.706196Z"
}
```

Add the ontology component and set [`template`](/reference/rest/entities/publish-entity#request.body.ontolog.template)
to <code>TEMPLATE\_SENSOR\_POINT\_OF\_INTEREST</code> to render a sensor detected at a specific location.

Add the [`location`](/reference/rest/entities/publish-entity#request.body.position) component
to set the latitude and longitude of the track.

Add the [`milView`](/reference/rest/entities/publish-entity#request.body.mil_view) component
to set the disposition, environment, and nationality of the track.

Optionally, add the [`sensors`](/reference/rest/entities/publish-entity#request.body.sensors) component to
identify details about the sensor type.

**Example entity models**:

```json title="track.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Sensor",
    "ontology": {
        "template": "TEMPLATE_SENSOR_POINT_OF_INTEREST",
        "platform_type": "Radar"
    },
    "location": {
        "position": {
            "latitudeDegrees": 50.91402185768586,
            "longitudeDegrees": 0.79203612077257,
            "altitudeHaeMeters": 46.214997987295234
        }
    },
    "milView": {
        "disposition": "DISPOSITION_ASSUMED_FRIENDLY",
        "environment": "ENVIRONMENT_SURFACE"
    },
    "sensors": {
        [
            {
                "operationalState": "OPERATIONAL_STATE_OPERATIONAL",
                "sensorType": "SENSOR_TYPE_RADAR"
            }
        ]
    },
    "provenance": {
        "integrationName": "Your Integration",
        "dataType": "Your Data Type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "aliases": {
        "name": "SPI"
    },
    "isLive": true,
    "createdTime": "2024-12-07T00:19:46.706195Z"
    "expiryTime": "2024-12-07T00:24:46.706196Z"
}
```

Add the ontology component and set [`template`](/reference/rest/entities/publish-entity#request.body.ontolog.template)
to <code>TEMPLATE\_SIGNAL\_OF\_INTEREST</code> to render a signal detection with characteristics
such as emitter notation, frequency, or lines of bearing.

Add the [`milView`](/reference/rest/entities/publish-entity#request.body.milView) component
to set the disposition, environment, and nationality of the signal track.

Add the [`signal`](/reference/rest/entities/publish-entity#request.body.signal) component
to set the emitter notation, frequency, lines of bearing, and other details about the signal.

Optionally, if <code>signal.fixed</code> is set, add [location](/reference/rest/entities/publish-entity#request.body.position)
and define the position of the signal track.

**Example entity models**:

```json title="track.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Signal",
    "isLive": true,
    "createdTime": "2024-12-07T00:19:46.706195Z",
    "expiryTime": "2024-12-07T00:24:46.706196Z",
    "location": {
        "position": {
            "latitudeDegrees": 50.91402185768586,
            "longitudeDegrees": 0.79203612077257,
            "altitudeHaeMeters": 46.214997987295234
        }
    },
    "aliases": {
        "name": "Satellite 1"
    },
    "milView": {
        "disposition": "DISPOSITION_SUSPICIOUS",
        "environment": "ENVIRONMENT_SPACE"
    },
    "ontology": {
        "template": "TEMPLATE_SIGNAL_OF_INTEREST",
        "platform_type": "Satellite"
    },
    "provenance": {
        "integrationName": "your_integration",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    }
}
```

### Geo-entity

A *geo-entity* is a shape, region, or point of interest drawn on the map.
Use geo-entities to represent any geographical areas of interest, such as airfields or a control zones,
for autonomous vehicles to operate in.

Add the ontology component and set [`template`](/reference/rest/entities/publish-entity#request.body.ontolog.template)
to <code>TEMPLATE\_GEO</code> to render a geo-entity shape.

Add the [`geo_details`](/reference/rest/entities/publish-entity#request.body.geoDetails) component.

Add the [`geo_shape`](/reference/rest/entities/publish-entity#request.body.geoShape) component.

Add the [`location`](/reference/rest/entities/publish-entity#request.body.location) component, if `geo_shape` is set to
[ellipse](/reference/rest/entities/publish-entity#request.body.geoShape.ellipse).

**Example entity models**

```json title="geo.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Geo point",
    "isLive": true,
    "createdTime": "2024-12-07T00:45:15.581592Z",
    "noExpiry": true,
    "provenance": {
        "integrationName": "your_integration_name",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "geoShape": {
    "point": {
        "position": {
            "latitudeDegrees": 50.91402185768586,
            "longitudeDegrees": 0.79203612077257,
            "altitudeHaeMeters": 46.214997987295234,
            "altitudeAglMeters": 0.5000067609670396
        }
    }
    },
    "geoDetails": {
        "type": "GEO_TYPE_GENERAL"
    },
    "aliases": {
        "name": "Point"
    },
    "ontology": {
        "template": "TEMPLATE_GEO"
    }
}
```

```json title="geo.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Polygon 1",
    "isLive": true,
    "createdTime": "2024-12-07T00:55:43.183738Z",
    "expiryTime": "2024-12-07T01:00:43.183743Z",
    "aliases": {
        "name": "Polygon"
    },
    "ontology": {
        "template": "TEMPLATE_GEO"
    },
    "provenance": {
        "integrationName": "your_integration_name",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "geoDetails": {
        "type": "GEO_TYPE_GENERAL"
    },
    "geoShape": {
        "polygon": {
            "rings": [
                {
                    "positions": [
                        {
                            "position": {
                            "latitudeDegrees": 49.01611140463143,
                            "longitudeDegrees": 1.5746513124955297
                            }
                        },
                        {
                            "position": {
                            "latitudeDegrees": 49.01924140463143,
                            "longitudeDegrees": 2.882469645828863
                            }
                        },
                        {
                            "position": {
                            "latitudeDegrees": 48.4172380712981,
                            "longitudeDegrees": 2.9189863124955298
                            }
                        },
                        {
                            "position": {
                            "latitudeDegrees": 49.01611140463143,
                            "longitudeDegrees": 1.5746513124955297
                            }
                        }
                    ]
                }
            ]
        }
    }
}
```

```json title="geo.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Geo ellipse",
    "isLive": true,
    "createdTime": "2024-12-07T01:06:32.834952Z",
    "expiryTime": "2024-12-07T01:11:32.834954Z",
    "aliases": {
        "name": "Ellipse"
    },
    "ontology": {
        "template": "TEMPLATE_GEO"
    },
    "provenance": {
        "integrationName": "your_integration_name",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "geoDetails": {
        "type": "GEO_TYPE_CONTROL_AREA"
    },
    "geoShape": {
        "ellipse": {
            "semiMajorAxisM": 20,
            "semiMinorAxisM": 20,
            "orientationD": 40
        }
    },
    "location": {
        "position": {
            "latitudeDegrees": 51.46,
            "longitudeDegrees": -0.16
        }
    }
}
```

```json title="geo.json" maxLines=25
{
    "entityId": "UNIQUE_ENTITY_ID",
    "description": "Geo line",
    "isLive": true,
    "createdTime": "2024-12-07T01:08:39.079826Z",
    "expiryTime": "2024-12-07T01:13:39.079828Z",
    "provenance": {
        "integrationName": "your_integration_name",
        "dataType": "your_data_type",
        "sourceUpdateTime": "2025-04-07T00:19:47.706196Z"
    },
    "geoShape": {
        "line": {
            "positions": [
            {
                "latitudeDegrees": 47.605,
                "longitudeDegrees": -122.329
            },
            {
                "latitudeDegrees": 47.61,
                "longitudeDegrees": -122.33
            }
            ]
        }
    },
    "geoDetails": {
        "type": "GEO_TYPE_GENERAL"
    },
    "aliases": {
        "name": "Line"
    },
    "ontology": {
        "template": "TEMPLATE_GEO"
    }
}
```

## Entity lifecycle

Entities have a well-defined lifecycle of **create**, **update**, and
**delete**. On each lifecycle update, Entity Manager emits the state
change event back to Lattice:

When an app or integration publishes an entity, Lattice emits a
state change event, setting the entity state to <code>CREATE</code>.

When data in the entity changes, Lattice emits the state change as an **update** event.
To optimize performance, Lattice relies on changes to <code>provenance.source\_update\_time</code>
to trigger an update. It does *not* compare the full proto definitions to set the state change.

An entity is deleted when its <code>expiry\_time</code> has lapsed, or an
update is sent with the <code>is\_live</code> component set to <code>false</code>.
Alternatively, you can use the <code>noExpiry</code> flag to create entities that
persist indefinitely. Use <code>noExpiry</code> only when the entity contains
information that should be available to other tasks or integrations beyond
its immediate operational context, such as long-living geographical entities.

<br />

* If both <code>noExpiry</code> and <code>expiryTime</code> are set, Lattice ignores
  <code>expiryTime</code>.

* If a service restart occurs and an entity hasn't been
  republished within the previous 5 minutes, the entity will not be restored, regardless of the
  <code>noExpiry</code> setting.

You should handle a delete event by removing all references to it in
memory or discarding it from your user interface.

## What's next?

* Learn more about the Entities API in [REST](/reference/rest/entities/publish-entity) and [gRPC](/reference/grpc/anduril-entitymanager-v-1/entity-manager-api/anduril-entitymanager-v-1-publish-entity).
* Learn how to [publish entities to Lattice](/guides/entities/publish).
* Check out the Lattice [sample apps](/samples/overview).