# Edge API Response Parameters

# Overview

This section outlines how to make POST requests to the Arkose Labs **Edge API**, including endpoint structure, required headers, and request body format.

## Response Body Parameters

<br />

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Fields
      </th>

      <th>
        Sub-Fields
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
        `recommended_action`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        Recommended action values: `"allow"`, `"block"` or `"challenge"`

        <br />

        Note: `"challenge"` is a recommendation only. In this Product, Arkose Labs does not trigger any challenge or puzzle. Customer can decide on the appropriate end user action of whether to allow or block the user.
      </td>
    </tr>

    <tr>
      <td>
        `error`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        Error message, if any
      </td>
    </tr>

    <tr>
      <td>
        `session_details`
      </td>

      <td />

      <td>
        object
      </td>

      <td>
        Metadata about the evaluated session
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `session`
      </td>

      <td>
        string
      </td>

      <td>
        Unique session identifier
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `session_created`
      </td>

      <td>
        string
      </td>

      <td>
        Timestamp indicating when session was created
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `telltale_user`
      </td>

      <td>
        string
      </td>

      <td>
        Primary telltale reason or label
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `telltale_list`
      </td>

      <td>
        array
      </td>

      <td>
        List of all telltales associated with the session
      </td>
    </tr>

    <tr>
      <td>
        `ip_intelligence`
      </td>

      <td />

      <td>
        object
      </td>

      <td>
        Information about the IP address and its attributes
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `user_ip`
      </td>

      <td>
        string
      </td>

      <td>
        IP address of the user
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `is_proxy`
      </td>

      <td>
        boolean
      </td>

      <td>
        True if user is behind a known proxy
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `is_vpn`
      </td>

      <td>
        boolean
      </td>

      <td>
        True if user is using a VPN
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `is_tor`
      </td>

      <td>
        boolean
      </td>

      <td>
        True if user is using Tor
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `country`
      </td>

      <td>
        string
      </td>

      <td>
        Country where the IP is located
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `region`
      </td>

      <td>
        string
      </td>

      <td>
        Region/state of the IP
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `city`
      </td>

      <td>
        string
      </td>

      <td>
        City of the IP
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `isp`
      </td>

      <td>
        string
      </td>

      <td>
        Internet Service Provider
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `public_access_point`
      </td>

      <td>
        boolean
      </td>

      <td>
        True if connection is from a public access point
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `connection_type`
      </td>

      <td>
        string
      </td>

      <td>
        Type of network
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `latitude`
      </td>

      <td>
        string
      </td>

      <td>
        Latitude of IP geolocation
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `longitude`
      </td>

      <td>
        string
      </td>

      <td>
        Longitude of IP geolocation
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `timezone`
      </td>

      <td>
        string
      </td>

      <td>
        Timezone
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `asn`
      </td>

      <td>
        number
      </td>

      <td>
        Autonomous System Number associated with the IP
      </td>
    </tr>

    <tr>
      <td>
        `session_risk`
      </td>

      <td />

      <td>
        object
      </td>

      <td>
        Risk assessment results
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `risk_category`
      </td>

      <td>
        string
      </td>

      <td>
        Risk classification
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `risk_band`
      </td>

      <td>
        string
      </td>

      <td>
        Risk severity level: `"Low"`, `"Medium"`, `"High"`
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `global`
      </td>

      <td>
        object
      </td>

      <td>
        Covers the information related to Global Telltales
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `global.score`
      </td>

      <td>
        number
      </td>

      <td>
        Global risk score (0–100)
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `global.telltales`
      </td>

      <td>
        array
      </td>

      <td>
        Provides the breakdown of the telltales and the weight of each
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `global.telltales.name`
      </td>

      <td>
        string
      </td>

      <td>
        Provides the global telltale name
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `global.telltales.weight`
      </td>

      <td>
        number
      </td>

      <td>
        Provides the score associated with the global telltale
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `custom`
      </td>

      <td>
        object
      </td>

      <td>
        Covers the information related to Custom Telltales
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `custom.score`
      </td>

      <td>
        number
      </td>

      <td>
        Custom risk score (0–100)
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `custom.telltales`
      </td>

      <td>
        array
      </td>

      <td>
        Provides the breakdown of the telltales and the weight of each
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `custom.telltales.name`
      </td>

      <td>
        string
      </td>

      <td>
        Provides the custom telltale name
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `custom.telltales.weight`
      </td>

      <td>
        number
      </td>

      <td>
        Provides the score associated with the custom telltale
      </td>
    </tr>

    <tr>
      <td>
        email\_intelligence
      </td>

      <td>
        <Anchor label="Click here for fields details" target="_blank" href="https://support.arkoselabs.com/hc/en-us/articles/8722267392147-Email-Intelligence-API-Reference">Click here for fields details</Anchor>
      </td>

      <td>
        object
      </td>

      <td>
        *
      </td>
    </tr>

    <tr>
      <td>
        `aggregations`
      </td>

      <td />

      <td>
        object
      </td>

      <td>
        Aggregated request statistics for the IP
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `error`
      </td>

      <td>
        string
      </td>

      <td>
        Error String in case of errors during Aggregations
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `ip`
      </td>

      <td>
        object
      </td>

      <td>
        IP-level aggregation
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `ip.short_term`
      </td>

      <td>
        object
      </td>

      <td>
        Recent IP activity
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `ip.short_term`.`interval_minutes`
      </td>

      <td>
        int
      </td>

      <td>
        Time window in minutes
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `ip.short_term`.`count`
      </td>

      <td>
        int
      </td>

      <td>
        Number of events seen
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `ip.short_term.threshold`
      </td>

      <td>
        int
      </td>

      <td>
        Threshold for flagging
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `long_term`
      </td>

      <td>
        object
      </td>

      <td>
        Longer IP activity window (e.g., past 24 hours)
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `long_term`.`interval_minutes`
      </td>

      <td>
        int
      </td>

      <td>
        Time window in minutes
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `long_term`.`count`
      </td>

      <td>
        int
      </td>

      <td>
        Number of events seen
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `long_term`.`threshold`
      </td>

      <td>
        int
      </td>

      <td>
        Threshold for flagging
      </td>
    </tr>

    <tr>
      <td>
        `error`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        Error message if any occurred
      </td>
    </tr>
  </tbody>
</Table>

## Response Schema

The POST request should include a JSON body structure as show in the example below.

```json Response Schema
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "The edge-api response body schema",
  "type": "object",
  "properties": {
    "recommended_action": {
      "type": "string",
      "enum": [
        "",
        "allow",
        "block",
        "challenge"
      ]
    },
    "session_details": {
      "type": "object",
      "properties": {
        "session": {
          "type": "string",
          "default": ""
        },
        "session_created": {
          "type": [
            "string",
            "null"
          ],
          "format": "date-time",
          "default": null
        },
        "telltale_user": {
          "type": "string",
          "minLength": 0,
          "maxLength": 128
        },
        "telltale_list": {
          "type": [
            "array",
            "null"
          ],
          "items": {
            "type": "string",
            "minLength": 0,
            "maxLength": 128
          }
        }
      },
      "required": [
        "session",
        "session_created",
        "telltale_user",
        "telltale_list"
      ]
    },
    "ip_intelligence": {
      "type": "object",
      "properties": {
        "user_ip": {
          "anyOf": [
            {
              "type": "string",
              "format": "ipv4"
            },
            {
              "type": "string",
              "format": "ipv6"
            },
            {
              "type": "null"
            }
          ],
          "default": null
        },
        "is_tor": {
          "type": "boolean",
          "default": false
        },
        "is_vpn": {
          "type": "boolean",
          "default": false
        },
        "is_proxy": {
          "type": "boolean",
          "default": false
        },
        "country": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        },
        "region": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        },
        "city": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        },
        "isp": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        },
        "public_access_point": {
          "type": "boolean",
          "default": false
        },
        "connection_type": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        },
        "latitude": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        },
        "longitude": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        },
        "timezone": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        }
      },
      "required": [
        "user_ip",
        "is_tor",
        "is_vpn",
        "is_proxy",
        "country",
        "region",
        "city",
        "isp",
        "public_access_point",
        "connection_type",
        "latitude",
        "longitude",
        "timezone"
      ]
    },
    "session_risk": {
      "type": "object",
      "properties": {
        "risk_category": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        },
        "risk_band": {
          "type": [
            "string",
            "null"
          ],
          "default": null
        },
        "global": {
          "type": "object",
          "properties": {
            "score": {
              "type": "number"
            },
            "telltales": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "weight": {
                    "type": "number"
                  }
                }
              }
            }
          }
        },
        "custom": {
          "type": "object",
          "properties": {
            "score": {
              "type": "number"
            },
            "telltales": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "weight": {
                    "type": "number"
                  }
                }
              }
            }
          }
        }
      },
      "required": [
        "risk_category",
        "risk_band",
        "global",
        "custom"
      ]
    },
    "aggregations": {
      "type": "object",
      "properties": {
        "error": {
          "type": [
            "string",
            "null"
          ]
        },
        "ip": {
          "type": "object",
          "properties": {
            "short_term": {
              "type": "object",
              "properties": {
                "interval_minutes": {
                  "type": [
                    "integer",
                    "null"
                  ]
                },
                "count": {
                  "type": [
                    "integer",
                    "null"
                  ]
                },
                "threshold": {
                  "type": [
                    "integer",
                    "null"
                  ]
                }
              }
            },
            "long_term": {
              "type": "object",
              "properties": {
                "interval_minutes": {
                  "type": [
                    "integer",
                    "null"
                  ]
                },
                "count": {
                  "type": [
                    "integer",
                    "null"
                  ]
                },
                "threshold": {
                  "type": [
                    "integer",
                    "null"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "stateful_device_id": {
      "type": "object",
      "properties": {
        "cookie_value": {
          "type": "string",
          "default": ""
        }
      },
      "required": [
        "cookie_value"
      ]
    },
    "email_intelligence": {
      "type": "object",
      "properties": {
        "email_assessment": {
          "type": "object",
          "properties": {
            "anomalous_handle_composition": {
              "default": false,
              "type": "boolean"
            },
            "deenumerated_domain_length": {
              "type": "integer"
            },
            "deenumerated_email_address": {
              "default": "",
              "type": "string"
            },
            "deenumerated_email_handle_length": {
              "default": 0,
              "type": "integer"
            },
            "detumbled_email_address": {
              "default": "",
              "type": "string"
            },
            "detumbled_email_first_seen": {
              "default": "",
              "type": "string"
            },
            "detumbled_email_first_seen_in_days": {
              "default": 0,
              "type": "integer"
            },
            "domain_enrichment": {
              "properties": {
                "domain_age": {
                  "default": 0,
                  "type": "integer"
                },
                "domain_creation_date": {
                  "default": "",
                  "type": "string"
                },
                "domain_name_servers": {
                  "oneOf": [
                    {
                      "default": null,
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "domain_org": {
                  "default": "",
                  "type": "string"
                },
                "domain_registration_country": {
                  "default": "",
                  "type": "string"
                },
                "error": {
                  "type": "string"
                },
                "is_disposable": {
                  "default": false,
                  "type": "boolean"
                },
                "is_domain_missing": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            },
            "domain_metric_entropy": {
              "type": "number"
            },
            "domain_relative_usage_factor": {
              "default": 0,
              "type": "number"
            },
            "domain_shannon_entropy": {
              "type": "number"
            },
            "email_address": {
              "default": "",
              "type": "string"
            },
            "email_domain": {
              "default": "",
              "type": "string"
            },
            "email_handle_length": {
              "default": 0,
              "type": "integer"
            },
            "email_risk_score": {
              "default": 0,
              "type": "number"
            },
            "is_enumerated_email": {
              "default": false,
              "type": "boolean"
            },
            "is_invalid_email": {
              "default": false,
              "type": "boolean"
            },
            "is_mx_record_present": {
              "default": false,
              "type": "boolean"
            },
            "is_mx_valid": {
              "default": false,
              "type": "boolean"
            },
            "is_private_relay": {
              "default": false,
              "type": "boolean"
            },
            "is_role_email": {
              "default": false,
              "type": "boolean"
            },
            "is_suspicious_email_handle": {
              "default": false,
              "type": "boolean"
            },
            "is_tumbled_email": {
              "default": false,
              "type": "boolean"
            },
            "suggested_action": {
              "default": "",
              "type": "string"
            }
          }
        },
        "detumbled_email_stats": {
          "type": "object",
          "properties": {
            "handle_dvorak_typing_distance": {
              "default": 0,
              "type": "number"
            },
            "handle_length": {
              "default": 0,
              "type": "integer"
            },
            "handle_num_alpha_chars": {
              "default": 0,
              "type": "integer"
            },
            "handle_num_consonants": {
              "default": 0,
              "type": "integer"
            },
            "handle_num_numeric_chars": {
              "default": 0,
              "type": "integer"
            },
            "handle_num_special_chars": {
              "default": 0,
              "type": "integer"
            },
            "handle_num_vowels": {
              "default": 0,
              "type": "integer"
            },
            "handle_qwerty_typing_distance": {
              "default": 0,
              "type": "number"
            }
          }
        },
        "total_email_counts": {
          "type": "object",
          "properties": {
            "error": {
              "description": "Error message if counts could not be retrieved for the aggregation",
              "type": "string"
            },
            "long_term_count": {
              "description": "Numeric count of the aggregation metric in long term",
              "type": "integer"
            },
            "long_term_period_minutes": {
              "description": "The time period over which the long term count was aggregated in minutes",
              "type": "integer"
            },
            "short_term_count": {
              "default": 0,
              "description": "Numeric count of the aggregation metric in short term",
              "type": "integer"
            },
            "short_term_period_minutes": {
              "default": 0,
              "description": "The time period over which the short term count was aggregated in minutes",
              "type": "integer"
            }
          },
          "required": [
            "short_term_count",
            "short_term_period_minutes"
          ]
        },
        "detumbled_email_unique_counts": {
          "type": "object",
          "properties": {
            "error": {
              "description": "Error message if counts could not be retrieved for the aggregation",
              "type": "string"
            },
            "long_term_count": {
              "description": "Numeric count of the aggregation metric in long term",
              "type": "integer"
            },
            "long_term_period_minutes": {
              "description": "The time period over which the long term count was aggregated in minutes",
              "type": "integer"
            },
            "short_term_count": {
              "default": 0,
              "description": "Numeric count of the aggregation metric in short term",
              "type": "integer"
            },
            "short_term_period_minutes": {
              "default": 0,
              "description": "The time period over which the short term count was aggregated in minutes",
              "type": "integer"
            }
          },
          "required": [
            "short_term_count",
            "short_term_period_minutes"
          ]
        },
        "deenumerated_email_unique_counts": {
          "type": "object",
          "properties": {
            "error": {
              "description": "Error message if counts could not be retrieved for the aggregation",
              "type": "string"
            },
            "long_term_count": {
              "description": "Numeric count of the aggregation metric in long term",
              "type": "integer"
            },
            "long_term_period_minutes": {
              "description": "The time period over which the long term count was aggregated in minutes",
              "type": "integer"
            },
            "short_term_count": {
              "default": 0,
              "description": "Numeric count of the aggregation metric in short term",
              "type": "integer"
            },
            "short_term_period_minutes": {
              "default": 0,
              "description": "The time period over which the short term count was aggregated in minutes",
              "type": "integer"
            }
          },
          "required": [
            "short_term_count",
            "short_term_period_minutes"
          ]
        },
        "domain_instance_counts": {
          "type": "object",
          "properties": {
            "error": {
              "description": "Error message if counts could not be retrieved for the aggregation",
              "type": "string"
            },
            "long_term_count": {
              "description": "Numeric count of the aggregation metric in long term",
              "type": "integer"
            },
            "long_term_period_minutes": {
              "description": "The time period over which the long term count was aggregated in minutes",
              "type": "integer"
            },
            "short_term_count": {
              "default": 0,
              "description": "Numeric count of the aggregation metric in short term",
              "type": "integer"
            },
            "short_term_period_minutes": {
              "default": 0,
              "description": "The time period over which the short term count was aggregated in minutes",
              "type": "integer"
            }
          },
          "required": [
            "short_term_count",
            "short_term_period_minutes"
          ]
        },
        "detumbled_email_instance_counts": {
          "type": "object",
          "properties": {
            "error": {
              "description": "Error message if counts could not be retrieved for the aggregation",
              "type": "string"
            },
            "long_term_count": {
              "description": "Numeric count of the aggregation metric in long term",
              "type": "integer"
            },
            "long_term_period_minutes": {
              "description": "The time period over which the long term count was aggregated in minutes",
              "type": "integer"
            },
            "short_term_count": {
              "default": 0,
              "description": "Numeric count of the aggregation metric in short term",
              "type": "integer"
            },
            "short_term_period_minutes": {
              "default": 0,
              "description": "The time period over which the short term count was aggregated in minutes",
              "type": "integer"
            }
          },
          "required": [
            "short_term_count",
            "short_term_period_minutes"
          ]
        },
        "domain_stats": {
          "type": "object",
          "properties": {
            "domain_dvorak_typing_distance": {
              "type": "number"
            },
            "domain_length": {
              "type": "integer"
            },
            "domain_max_consec_consonants": {
              "type": "integer"
            },
            "domain_max_consec_vowels": {
              "type": "integer"
            },
            "domain_num_alpha_chars": {
              "type": "integer"
            },
            "domain_num_consonants": {
              "type": "integer"
            },
            "domain_num_numeric_chars": {
              "type": "integer"
            },
            "domain_num_special_chars": {
              "type": "integer"
            },
            "domain_num_vowels": {
              "type": "integer"
            },
            "domain_qwerty_typing_distance": {
              "type": "number"
            }
          }
        },
        "error": {
          "type": "string"
        }
      },
      "required": [
        "total_email_counts"
      ]
    },
    "error": {
      "description": "An description of the error that caused the request to fail (if any)",
      "type": "string"
    }
  },
  "required": [
    "recommended_action",
    "session_details",
    "error"
  ]
}
```

```json Response Example
{
  "recommended_action": "challenge",
  "session_details": {
    "session": "89818455d4249a528.5425182503",
    "session_created": "2025-06-02T23:22:50Z",
    "telltale_user": "g-rta-isp-velocity-short-term-abuse",
    "telltale_list": [
      "g-rta-isp-velocity-short-term-abuse"
    ]
  },
  "ip_intelligence": {
        "user_ip": "104.133.177.84",
        "is_proxy": false,
        "is_vpn": false,
        "is_tor": false,
        "country": "US",
        "region": "ca",
        "city": "mountain view",
        "isp": "google inc.",
        "public_access_point": false,
        "connection_type": "wired",
        "latitude": "37.41",
        "longitude": "-122.08",
        "timezone": "america/los_angeles",
        "asn": 36384
  },
  "session_risk": {
    "risk_category": "BOT-STD",
    "risk_band": "Low",
    "global": {
      "score": 20,
      "telltales": [
        {
          "name": "g-rta-isp-velocity-short-term-abuse",
          "weight": 20
        }
      ]
    },
    "custom": {
      "score": 0,
      "telltales": []
    }
  },
  "aggregations": {
    "ip": {
      "short_term": {
        "interval_minutes": 60,
        "count": 2,
        "threshold": 11
      },
      "long_term": {
        "interval_minutes": 1440,
        "count": 3,
        "threshold": 50
      }
    }
  },
  "email_intelligence": {
    "email_assessment": {
      "email_address": "example@emaildomain.com",
      "detumbled_email_address": "example@emaildomain.com",
      "deenumerated_email_address": "example@emaildomain.com",
      "suggested_action": "email_no_risk",
      "email_risk_score": 0,
      "email_domain": "emaildomain.com",
      "email_handle_length": 9,
      "is_tumbled_email": false,
      "is_enumerated_email": false,
      "deenumerated_email_handle_length": 9,
      "is_invalid_email": false,
      "is_role_email": false,
      "is_private_relay": false,
      "detumbled_email_first_seen": "2025-09-25T23:33:23Z",
      "detumbled_email_first_seen_in_days": 5,
      "domain_relative_usage_factor": 1.3333333333333333,
      "is_suspicious_email_handle": false,
      "domain_shannon_entropy": 2.95,
      "domain_metric_entropy": 0.3277777777777778,
      "deenumerated_domain_length": 9,
      "anomalous_handle_composition": false,
      "is_mx_record_present": true,
      "is_mx_valid": true,
      "domain_enrichment": {
        "is_domain_missing": false,
        "domain_age": 11007,
        "domain_creation_date": "2000-01-01",
        "domain_org": "Email Domain LLC",
        "domain_name_servers": [
          "ns1.emaildomain.com",
          "ns2.emaildomain.com"
        ],
        "is_disposable": false,
        "domain_registration_country": "US"
      }
    },
    "detumbled_email_stats": {
      "handle_length": 9,
      "handle_num_alpha_chars": 9,
      "handle_num_vowels": 3,
      "handle_num_consonants": 6,
      "handle_num_numeric_chars": 0,
      "handle_num_special_chars": 0,
      "handle_qwerty_typing_distance": 24.26455311860342,
      "handle_dvorak_typing_distance": 31.458193116710234
    },
    "total_email_counts": {
      "short_term_count": 1,
      "short_term_period_minutes": 360,
      "long_term_count": 5,
      "long_term_period_minutes": 10080
    },
    "detumbled_email_unique_counts": {
      "short_term_count": 1,
      "short_term_period_minutes": 1440,
      "long_term_count": 1,
      "long_term_period_minutes": 21600
    },
    "deenumerated_email_unique_counts": {
      "short_term_count": 1,
      "short_term_period_minutes": 360
    },
    "domain_instance_counts": {
      "short_term_count": 1,
      "short_term_period_minutes": 360,
      "long_term_count": 4,
      "long_term_period_minutes": 10080
    },
    "domain_stats": {
      "domain_length": 9,
      "domain_num_alpha_chars": 8,
      "domain_num_vowels": 3,
      "domain_num_consonants": 0,
      "domain_num_numeric_chars": 0,
      "domain_num_special_chars": 1,
      "domain_qwerty_typing_distance": 32.95709432711953,
      "domain_dvorak_typing_distance": 40.36356408778201,
      "domain_max_consec_consonants": 2,
      "domain_max_consec_vowels": 2
    }
  },
  "error": ""
}
```