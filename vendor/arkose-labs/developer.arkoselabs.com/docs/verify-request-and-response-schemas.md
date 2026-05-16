# Verify Request and Response Schemas

The Verify request and response schemas follow the JSON Schema standard. See [JSON Schema](https://json-schema.org/) for more information about the standard.

When making a Verify request using POST (and only when using POST), you can include an optional `email_address` field with a String value. For information about how to send an email address and how Arkose uses it, see the Knowledge Base (support login required) [here](https://support.arkoselabs.com/hc/en-us/articles/8695867238035-Email-Intelligence-Overview) and [here](https://support.arkoselabs.com/hc/en-us/articles/8722267392147-Email-Intelligence-API-Reference). Do not use the `email_address` field until you have read its documentation and/or spoken to your Arkose rep about it.

```json Request Schema
{
    "type": "object",
    "properties": {
        "private_key": {
            "description": "The private key associated with EC that served this session",
            "type": "string"
        },
        "session_token": {
            "description": "The session token which identifies the session to verify",
            "type": "string"
        },
        "log_data": {
            "description": "A field to allow a free form piece of string data",
            "type": "string"
        }
    },
    "required": [
        "private_key",
        "session_token"
    ]
}
```

```json Response Schema
{
  "oneOf": [
    {
      "description": "error response",
      "properties": {
        "error": {
          "type": "string"
        },
        "verified": {
          "format": "date-time",
          "type": "string"
        }
      },
      "required": [
        "error",
        "verified"
      ],
      "type": "object"
    },
    {
      "default": 0,
      "description": "simple mode",
      "type": "integer"
    },
    {
      "properties": {
        "aggregations": {
          "properties": {
            "error": {
              "oneOf": [
                {
                  "description": "Error message if aggregations have failed or are incomplete",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "ip": {
              "description": "IP-based aggregation data",
              "properties": {
                "long_term": {
                  "properties": {
                    "count": {
                      "oneOf": [
                        {
                          "type": "integer"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "interval_minutes": {
                      "oneOf": [
                        {
                          "type": "integer"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "threshold": {
                      "oneOf": [
                        {
                          "type": "integer"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "short_term": {
                  "properties": {
                    "count": {
                      "oneOf": [
                        {
                          "type": "integer"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "interval_minutes": {
                      "oneOf": [
                        {
                          "type": "integer"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "threshold": {
                      "oneOf": [
                        {
                          "type": "integer"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    }
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          },
          "type": "object"
        },
        "data_exchange": {
          "properties": {
            "blob_decrypted": {
              "default": null,
              "oneOf": [
                {
                  "description": "Indicates if the customer provided DataExchange blob was successfully decrypted. If no blob was received; or DataExchange is not enabled for your key it will be null",
                  "type": "boolean"
                },
                {
                  "type": "null"
                }
              ]
            },
            "blob_received": {
              "default": null,
              "oneOf": [
                {
                  "description": "Indicates whether the customer request included a DataExchange blob. If this feature is not enabled for your key; it will be null",
                  "type": "boolean"
                },
                {
                  "type": "null"
                }
              ]
            }
          },
          "type": "object"
        },
        "device_id": {
          "properties": {
            "arkose_id": {
              "description": "Composite key of stateful \u0026 stateless id",
              "type": "string"
            },
            "confidence_score": {
              "description": "Confidence of the uniqueness of the arkose id",
              "type": "number"
            },
            "device_first_seen": {
              "description": "When the device was first seen",
              "type": "string"
            },
            "device_last_seen": {
              "description": "When the device was last seen",
              "type": "string"
            },
            "device_spoofing_detected": {
              "description": "Whether the current user has been detected spoofing their device",
              "type": "boolean"
            },
            "stateful_challenge_bypassed": {
              "description": "Whether the current challenge was bypassed",
              "type": "boolean"
            },
            "stateful_challenges_bypassed": {
              "description": "Number of challenges the user has been allowed to bypass since their last solve",
              "type": "integer"
            },
            "stateful_change_reasons": {
              "description": "Reasons why a challenge may have been presented",
              "items": {
                "type": "string"
              },
              "type": "array"
            },
            "stateful_device_id": {
              "description": "The Stateful Device ID attributed to this user",
              "type": "string"
            },
            "stateless_device_id": {
              "description": "The current device ID",
              "type": "string"
            },
            "stateless_device_id_previous": {
              "description": "Previous Stateless Device ID",
              "type": "string"
            },
            "stateless_device_id_previous_version": {
              "description": "Version of the previous Stateless Device ID",
              "type": "string"
            },
            "stateless_device_id_version": {
              "description": "Version of the Stateless Device ID",
              "type": "string"
            }
          },
          "type": "object"
        },
        "email_intelligence": {
          "properties": {
            "deenumerated_email_unique_counts": {
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
              ],
              "type": "object"
            },
            "detumbled_email_instance_counts": {
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
              ],
              "type": "object"
            },
            "detumbled_email_stats": {
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
              },
              "type": "object"
            },
            "detumbled_email_unique_counts": {
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
              ],
              "type": "object"
            },
            "domain_instance_counts": {
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
              ],
              "type": "object"
            },
            "domain_stats": {
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
              },
              "type": "object"
            },
            "email_assessment": {
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
              },
              "type": "object"
            },
            "error": {
              "type": "string"
            },
            "total_email_counts": {
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
              ],
              "type": "object"
            }
          },
          "required": [
            "total_email_counts"
          ],
          "type": "object"
        },
        "fingerprint": {
          "properties": {
            "browser_characteristics": {
              "properties": {
                "browser_name": {
                  "oneOf": [
                    {
                      "default": null,
                      "description": "Name of the browser used",
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "browser_version": {
                  "oneOf": [
                    {
                      "default": null,
                      "description": "Version of the browser used",
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "canvas_fingerprint": {
                  "default": null,
                  "oneOf": [
                    {
                      "description": "Canvas fingerprint value",
                      "type": "integer"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "color_depth": {
                  "default": null,
                  "oneOf": [
                    {
                      "description": "Color depth of the browser in bits per pixel",
                      "type": "integer"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "indexed_database": {
                  "default": false,
                  "description": "Whether indexed database is available in the browser",
                  "type": "boolean"
                },
                "session_storage": {
                  "default": false,
                  "description": "Whether session storage is available in the browser",
                  "type": "boolean"
                }
              },
              "required": [
                "browser_name",
                "browser_version",
                "color_depth",
                "session_storage",
                "indexed_database",
                "canvas_fingerprint"
              ],
              "type": "object"
            },
            "device_characteristics": {
              "properties": {
                "behavior": {
                  "default": false,
                  "description": "Information about device behavior",
                  "type": "boolean"
                },
                "cpu_class": {
                  "oneOf": [
                    {
                      "default": null,
                      "description": "CPU class of the device",
                      "examples": [
                        "x86",
                        "ARM"
                      ],
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "hardware_concurrency": {
                  "default": null,
                  "oneOf": [
                    {
                      "description": "Number of logical processors available to run threads on the device",
                      "type": "integer"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "ja4_hash": {
                  "oneOf": [
                    {
                      "default": null,
                      "description": "JA4 TLS fingerprint hash",
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "max_resolution_supported": {
                  "default": null,
                  "oneOf": [
                    {
                      "default": null,
                      "description": "Maximum resolution supported by the device [width",
                      "items": {
                        "type": "integer"
                      },
                      "type": "array"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "operating_system": {
                  "oneOf": [
                    {
                      "default": null,
                      "description": "Name of the operating system",
                      "examples": [
                        "Windows",
                        "OS X"
                      ],
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "operating_system_version": {
                  "oneOf": [
                    {
                      "default": null,
                      "description": "Version of the operating system",
                      "examples": [
                        "10",
                        "Mojave"
                      ],
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "platform": {
                  "oneOf": [
                    {
                      "default": null,
                      "description": "Platform of the device",
                      "examples": [
                        "MacIntel",
                        "Win32"
                      ],
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "screen_resolution": {
                  "default": null,
                  "oneOf": [
                    {
                      "default": null,
                      "description": "Screen resolution in pixels [width",
                      "items": {
                        "type": "integer"
                      },
                      "type": "array"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "touch_support": {
                  "default": false,
                  "description": "Whether touch is supported on the device",
                  "type": "boolean"
                }
              },
              "type": "object"
            },
            "user_preferences": {
              "properties": {
                "timezone_offset": {
                  "default": null,
                  "oneOf": [
                    {
                      "description": "Timezone offset in minutes from UTC",
                      "examples": [
                        1000,
                        -800,
                        0
                      ],
                      "type": "integer"
                    },
                    {
                      "type": "null"
                    }
                  ]
                }
              },
              "type": "object"
            }
          },
          "type": "object"
        },
        "ip_intelligence": {
          "properties": {
            "asn": {
              "default": null,
              "oneOf": [
                {
                  "description": "Autonomous System Number of the IP address",
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ]
            },
            "city": {
              "oneOf": [
                {
                  "default": null,
                  "description": "City of the IP address",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "connection_type": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Type of internet connection",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "country": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Country of the IP address",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "is_proxy": {
              "default": false,
              "description": "Whether the IP is from a proxy service",
              "type": "boolean"
            },
            "is_tor": {
              "default": false,
              "description": "Whether the IP is from a TOR exit node",
              "type": "boolean"
            },
            "is_vpn": {
              "default": false,
              "description": "Whether the IP is from a VPN service",
              "type": "boolean"
            },
            "isp": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Internet Service Provider associated with the IP",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "latitude": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Latitude of the IP address location",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "longitude": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Longitude of the IP address location",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "network_info_rtt": {
              "default": null,
              "oneOf": [
                {
                  "description": "Network round-trip time in milliseconds",
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ]
            },
            "proxy_type": {
              "default": "not a proxy",
              "description": "Type of proxy service",
              "examples": [
                "anonymous",
                "transparent",
                "corporate",
                "consumer-privacy",
                "public",
                "edu",
                "data center",
                "not a proxy"
              ],
              "type": "string"
            },
            "public_access_point": {
              "default": false,
              "description": "Whether the IP is from a public access point",
              "type": "boolean"
            },
            "region": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Region/state of the IP address",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "timezone": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Timezone of the IP address location",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "user_ip": {
              "default": null,
              "oneOf": [
                {
                  "format": "ipv4",
                  "type": "string"
                },
                {
                  "format": "ipv6",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
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
            "proxy_type",
            "latitude",
            "longitude",
            "timezone"
          ],
          "type": "object"
        },
        "mics_verdict": {
          "properties": {
            "app_check_account_check": {
              "type": "string"
            },
            "app_check_activity_level": {
              "type": "string"
            },
            "app_check_cert_check": {
              "type": "string"
            },
            "app_check_platform": {
              "type": "string"
            },
            "app_check_result": {
              "type": "string"
            },
            "app_check_risk_level": {
              "type": "string"
            },
            "app_check_timed_out": {
              "type": "boolean"
            },
            "device_check_platform": {
              "type": "string"
            },
            "device_check_result": {
              "type": "string"
            },
            "device_check_timed_out": {
              "type": "boolean"
            },
            "mics_response": {
              "type": "string"
            }
          },
          "type": "object"
        },
        "proof_of_work": {
          "properties": {
            "attempted": {
              "default": false,
              "description": "Indicates that user submitted an attempt at PoW",
              "type": "boolean"
            },
            "challenged": {
              "default": false,
              "description": "Indicates that PoW was enabled for the session",
              "type": "boolean"
            },
            "difficulty_level": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Indicates the difficulty level of the PoW",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "passed": {
              "default": false,
              "description": "Indicates that PoW attempt was passed by the user",
              "type": "boolean"
            },
            "transparent": {
              "default": false,
              "description": "Indicates that no UI was shown to the user",
              "type": "boolean"
            }
          },
          "required": [
            "challenged",
            "attempted",
            "passed",
            "difficulty_level",
            "transparent"
          ],
          "type": "object"
        },
        "session_details": {
          "properties": {
            "attempted": {
              "default": false,
              "description": "Whether an attempt was made to solve the challenge",
              "type": "boolean"
            },
            "challenge_type": {
              "oneOf": [
                {
                  "default": null,
                  "description": "The type of challenge that the end-user solved",
                  "enum": [
                    "audio",
                    "transparent",
                    "visual",
                    "pow",
                    "pow+visual",
                    "pow+audio",
                    null
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "check_answer": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Timestamp when the answer was checked",
                  "format": "date-time",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "device_id": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Device id returned from detection hub",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "failed_low_sec_validation": {
              "default": false,
              "description": "Whether low security validation failed",
              "type": "boolean"
            },
            "game_number_limit_reached": {
              "default": false,
              "description": "Whether the maximum number of game retries (if set) is reached",
              "type": "boolean"
            },
            "ip_rep_list": {
              "oneOf": [
                {
                  "default": null,
                  "description": "IP reputation list information",
                  "enum": [
                    "tor",
                    "sfs_tor",
                    "sfs",
                    null
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "lowsec_error": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Error message for low security validation failure",
                  "enum": [
                    "user_credits",
                    "rate_limit_local",
                    "validation_checks",
                    "rate_limit_global",
                    null
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "lowsec_level_denied": {
              "default": null,
              "oneOf": [
                {
                  "description": "Low security level that was denied",
                  "maximum": 500,
                  "minimum": 0,
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ]
            },
            "optional": {
              "default": null,
              "oneOf": [
                {
                  "description": "Optional data that may be included",
                  "type": "object"
                },
                {
                  "type": "null"
                }
              ]
            },
            "previously_verified": {
              "default": false,
              "description": "Whether the user was previously verified",
              "type": "boolean"
            },
            "punishable_actioned": {
              "default": false,
              "description": "Whether punishable action was taken",
              "type": "boolean"
            },
            "security_level": {
              "default": 0,
              "description": "The security level of the session",
              "maximum": 500,
              "minimum": 0,
              "type": "integer"
            },
            "session": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Unique identifier for the session",
                  "pattern": "^[0-9A-Fa-f]+\\.[0-9]{10}$",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "session_created": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Timestamp when the session was created",
                  "format": "date-time",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "session_is_legit": {
              "default": false,
              "description": "Whether the session is legitimate",
              "type": "boolean"
            },
            "session_timed_out": {
              "default": false,
              "description": "Whether the session timed out",
              "type": "boolean"
            },
            "solved": {
              "default": false,
              "description": "Whether the challenge was solved successfully",
              "type": "boolean"
            },
            "stateless_device_id": {
              "default": null,
              "oneOf": [
                {
                  "additionalProperties": false,
                  "description": "Stateless device id",
                  "properties": {
                    "device_id": {
                      "description": "The Stateless Device ID",
                      "type": "string"
                    },
                    "device_id_previous": {
                      "description": "Previous Stateless Device ID",
                      "type": "string"
                    },
                    "device_id_previous_version": {
                      "description": "Version of the previous Stateless Device ID",
                      "type": "string"
                    },
                    "device_id_version": {
                      "description": "Version of the Stateless Device ID",
                      "type": "string"
                    }
                  },
                  "type": "object"
                },
                {
                  "type": "null"
                }
              ]
            },
            "suppress_limited": {
              "default": false,
              "description": "Whether suppression was limited",
              "type": "boolean"
            },
            "suppressed": {
              "default": false,
              "description": "Whether the challenge was suppressed",
              "type": "boolean"
            },
            "telltale_list": {
              "oneOf": [
                {
                  "default": null,
                  "description": "The list of telltales that were identified as possible candidates during a session",
                  "items": {
                    "maxLength": 128,
                    "minLength": 0,
                    "type": "string"
                  },
                  "type": "array"
                },
                {
                  "type": "null"
                }
              ]
            },
            "telltale_origin": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Origin of the telltale information",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "telltale_user": {
              "oneOf": [
                {
                  "default": null,
                  "description": "User telltale information",
                  "maxLength": 128,
                  "minLength": 0,
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "theme_arg_invalid": {
              "default": false,
              "description": "Whether the theme argument was invalid",
              "type": "boolean"
            },
            "ua": {
              "oneOf": [
                {
                  "default": null,
                  "description": "User agent string of the browser",
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "user_language_shown": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Shows the language code of the language in which the challenge was presented to the user",
                  "maxLength": 10,
                  "minLength": 0,
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "verified": {
              "description": "Timestamp when the verification was completed",
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "solved",
            "session",
            "session_created",
            "check_answer",
            "verified",
            "attempted",
            "security_level",
            "session_is_legit",
            "previously_verified",
            "session_timed_out",
            "suppress_limited",
            "theme_arg_invalid",
            "suppressed",
            "punishable_actioned",
            "telltale_user",
            "failed_low_sec_validation",
            "lowsec_error",
            "lowsec_level_denied",
            "ua",
            "ip_rep_list",
            "optional",
            "game_number_limit_reached",
            "user_language_shown",
            "telltale_list",
            "challenge_type"
          ],
          "type": "object"
        },
        "session_risk": {
          "properties": {
            "custom": {
              "properties": {
                "score": {
                  "type": "number"
                },
                "telltales": {
                  "items": {
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "weight": {
                        "type": "number"
                      }
                    },
                    "type": "object"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            },
            "global": {
              "properties": {
                "score": {
                  "type": "number"
                },
                "telltales": {
                  "items": {
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "weight": {
                        "type": "number"
                      }
                    },
                    "type": "object"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            },
            "risk_band": {
              "type": "string"
            },
            "risk_category": {
              "type": "string"
            }
          },
          "required": [
            "risk_band",
            "global",
            "custom"
          ],
          "type": "object"
        },
        "stateful_device_id": {
          "properties": {
            "challenge_bypassed": {
              "default": false,
              "description": "Whether the current challenge was bypassed",
              "type": "boolean"
            },
            "challenges_bypassed": {
              "description": "Number of challenges the user has been allowed to bypass since their last solve",
              "type": "integer"
            },
            "change_reasons": {
              "oneOf": [
                {
                  "default": null,
                  "description": "Reasons why a challenge may have been presented",
                  "items": {
                    "examples": [
                      "invalid_id",
                      "expired_cookie"
                    ],
                    "type": "string"
                  },
                  "type": "array"
                },
                {
                  "type": "null"
                }
              ]
            },
            "stateful_device_id": {
              "description": "The Stateful Device ID attributed to this user",
              "type": "string"
            }
          },
          "required": [
            "stateful_device_id",
            "challenge_bypassed",
            "challenges_bypassed"
          ],
          "type": "object"
        }
      },
      "required": [
        "session_details",
        "data_exchange"
      ],
      "type": "object"
    }
  ]
}
```

<br />