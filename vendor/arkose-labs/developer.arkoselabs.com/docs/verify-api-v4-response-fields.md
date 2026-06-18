> ## Documentation Index
> Fetch the complete documentation index at: https://developer.arkoselabs.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Verify API Response Fields and Examples

## Session Characteristics

These fields contain information about the session itself.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field Name
      </th>

      <th>
        Description
      </th>

      <th>
        Example Values
      </th>

      <th>
        Applicable Component
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `solved`
      </td>

      <td>
        When a session's risk level does not qualify it for transparent mode (no challenge) it is shown an interactive challenge. In that case, this field's value indicates if the challenge was successfully solved or not.If it was in transparent mode, the field value for a valid session is `true`.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `session`
      </td>

      <td>
        A unique token for the Arkose Labs session. A session is the whole experience from solution load to verification.
      </td>

      <td>
        A unique token, e.g. `3595d2c014d3c5f01.1116018803`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `session_created`
      </td>

      <td>
        An ISO 8601 UTC timestamp signifying the time the session was created
      </td>

      <td>
        e.g. `2019-07-15T02:45:13+00:00`, or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `check_answer`
      </td>

      <td>
        An ISO 8601 UTC timestamp signifying the time that the Enforcement Challenge user supplied answered were evaluated
      </td>

      <td>
        e.g. `2019-07-15T02:45:13+00:00`, or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `verified`
      </td>

      <td>
        An ISO 8601 UTC timestamp signifying the time that the request to the verify endpoint was made.
      </td>

      <td>
        e.g. \`\`2019-07-15T02:45:13+00:00
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `attempted`
      </td>

      <td>
        Whether the user attempted to solve the Enforcement Challenge, or not.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `security_level`
      </td>

      <td>
        A number that indicates the security level used for this session.Be aware that `security_level` can have a null value - usually because the session was an audio mode session. Audio mode does not use `security_level`.
      </td>

      <td>
        A security level, e.g. `20`
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `session_is_legit`
      </td>

      <td>
        Indicates if Arkose Labs certifies there are no telltales of non-legitimate activity in the session.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `previously_verified`
      </td>

      <td>
        Indicates if a session has already been verified.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `session_timed_out`
      </td>

      <td>
        Indicates if a session timed out before it was solved

        - _Note:_ \*The default timeout value / token lifespan is 30 minutes.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `suppress_limited`
      </td>

      <td>
        Indicates if the session qualified for low security, but failed verification. Low security is when a session has qualified to run in transparent mode, or use a no wrong answer enforcement challenge, such as the pick your favorite color challenge.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `theme_arg_invalid`
      </td>

      <td>
        Whether the theme arg setting at verification matched the original theme arg passed in at session setup.A theme arg is a parameter passed by a customer to Arkose Labs. It requests a security tier or UX test mode.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `suppressed`
      </td>

      <td>
        Suppressed is the old name for transparent mode. This field shows if the the user was offered transparent mode.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `punishable_actioned`
      </td>

      <td>
        Punishable is an attack mitigation tactic, which randomly fails verification attempts, even if the response was correct. This field indicates if punishable was activated.
      </td>

      <td>
        `true`,` false`
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `telltale_user`
      </td>

      <td>
        The winning telltale from the list of telltales that were identified as possible candidates (telltale\_list field) during a session
      </td>

      <td>
        A string such as `999b-fwh`, or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `telltale_origin`
      </td>

      <td>
        Indicates the source configuration of a `telltale_user`.
      </td>

      <td>
        A string such as `999b-fwh`, or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `failed_low_sec_validation`
      </td>

      <td>
        Indicates that the intention was to offer the user a low security session, but they failed to qualify for it when the verification was attempted.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `lowsec_error`
      </td>

      <td>
        An identifier showing why a user was denied a low security session.
      </td>

      <td>
        `"user_credits"`, `"rate_limit_local"`, `"validation_checks"`, `"rate_limit_global"`, or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `lowsec_level_denied`
      </td>

      <td>
        The low security level that was denied to the user.
      </td>

      <td>
        A security level, e.g. `5`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `ua`
      </td>

      <td>
        The User Agent string for the user that interacted with the EC.
      </td>

      <td>
        ```
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
        AppleWebKit/537.36 (KHTML, like Gecko)
        Chrome/92.0.4515.159 Safari/537.36“
        ```
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `ip_rep_list`
      </td>

      <td>
        An identifier which specifies which IP reputation database this IP address has been seen at.
      </td>

      <td>
        `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `optional`
      </td>

      <td>
        An object containing optional return values such as `client_encrypted_mode_key` or `get_pass values`.Also, relevant data being sent to Arkose Labs via our accepted methods (see: [Data Exchange](https://support.arkoselabs.com/hc/en-us/articles/4410529474323-Data-Exchange-Enhanced-Detection-and-API-Source-Validation) (Requires Support login)) appears in this object.The specific keys and values inside this object vary based on implementation
      </td>

      <td>
        ```
        {"blob":
        "lHpwagBqx3JOI7t9Ka0KUdIeHZbIjAYPPB72k
        Du2Zb5BwNiC6qJx5gS0f5c3EzcZ9d"}
        ```

        , or null
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `game_number_limit_reached`
      </td>

      <td>
        Game number limit is an optional setting that restricts the number of attempts a user can have at solving the EC. This field can show if the user reached the number of attempts allowed.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `user_language_shown`
      </td>

      <td>
        Shows the language code of the language in which the challenge was presented to the user.
      </td>

      <td>
        A string such as `“en“` or `null`
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `telltale_list`
      </td>

      <td>
        The list of telltales that were identified as possible candidates during a session.
      </td>

      <td>
        A string e.g. `"999b-fwh"`, or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `challenge_type`
      </td>

      <td>
        The type of challenge that the end-user solved.
      </td>

      <td>
        A string e.g. `"audio"`, `"transparent"`, `"visual"`, `“pow"`, `"pow+visual"`, `“pow+audio`" or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>
  </tbody>
</Table>

## Fingerprint

The following sections (Browser Characteristics, Device Characteristics, User Preference, IP Intelligence) are fields containing information that identify the browser, device, etc. the session ran on.

### Browser Characteristics

These fields contain information about the device the session ran on.

| Field Name           | Description                                         | Example Values                                   | Applicable Component  |
| :------------------- | :-------------------------------------------------- | :----------------------------------------------- | :-------------------- |
| `browser_name`       | The name of the browser the user was using.         | A string, e.g. `Chrome` or `null`                | Detection Enforcement |
| `browser_version`    | The version of the browser the user was using.      | A version number, e.g. `92.0.4515.159` or `null` | Detection Enforcement |
| `color_depth`        | The color depth of the device used for the session. | A number, e.g. `24` or `null`                    | Detection Enforcement |
| `session_storage`    | Whether session storage was available or not.       | `true`, `false`                                  | Detection Enforcement |
| `indexed_database`   | Whether the browser uses any indexed database API.  | `true`, `false`                                  | Detection Enforcement |
| `canvas_fingerprint` | The canvas fingerprint value of the browser.        | e.g. `1652956012` or `null`                      | Detection Enforcement |

### Device Characteristics

These fields contain information about the device the session ran on.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field Name
      </th>

      <th>
        Description
      </th>

      <th>
        Example Values
      </th>

      <th>
        Applicable Product
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `operating_system`
      </td>

      <td>
        The operating system used on the device.
      </td>

      <td>
        e.g. `Windows` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `operating_system_version`
      </td>

      <td>
        The version of the operating system used on the device.
      </td>

      <td>
        e.g. `XP` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `screen_resolution`
      </td>

      <td>
        The current screen resolution of the device.
      </td>

      <td>
        e.g. `[1920,1080]` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `max_resolution_supported`
      </td>

      <td>
        The maximum supported screen resolution of the device.
      </td>

      <td>
        e.g. `[1920,1080]` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `behavior`
      </td>

      <td>
        Whether the device / browser supports the

        [`addBehavior` method](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/ms535922\(v=vs.85\))

        . Note that `addBehavior` is considered obsolete with Windows 10.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `cpu_class`
      </td>

      <td>
        The CPU class identifier of the device.
      </td>

      <td>
        e.g. `X86` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `platform`
      </td>

      <td>
        The platform the device belongs to.
      </td>

      <td>
        e.g. `MacIntel` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `touch_support`
      </td>

      <td>
        Whether the device has touch support or not.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `hardware_concurrency`
      </td>

      <td>
        The hardware concurrency support of the device.
      </td>

      <td>
        e.g. `8` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `ja4_hash`
      </td>

      <td>
        TLS client fingerprint used to identify applications/browsers
      </td>

      <td>
        eg. `t13d6912h1\_8b2139ff7677\_c50a3655fff1`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>
  </tbody>
</Table>

### User Preference Field

This field contains information about the session set by its user.

| Field Name        | Description                   | Example Values        | Applicable Product    |
| :---------------- | :---------------------------- | :-------------------- | :-------------------- |
| `timezone_offset` | The timezone offset from UTC. | e.g. `1000` or `null` | Detection Enforcement |

### IP Intelligence Fields

These fields contain information related to and derived from the IP address associated with the session.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field Name
      </th>

      <th>
        Description
      </th>

      <th>
        Example Values
      </th>

      <th>
        Applicable Product
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `timezone`
      </td>

      <td>
        The timezone the session was originated from.
      </td>

      <td>
        A string, e.g. `America/Los_Angeles` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `user_ip`
      </td>

      <td>
        The IP address of the device used for the session.
      </td>

      <td>
        An IP address, e.g. `199.220.42.206`, or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `is_tor`
      </td>

      <td>
        Indicates if the IP is suspected of being a TOR connection (either active or previously hosted TOR nodes and exist).
      </td>

      <td>
        `true`,` false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `is_vpn`
      </td>

      <td>
        Indicates if the IP is suspected of being a VPN connection. For example, it has been on a VPN and can include data center ranges.
      </td>

      <td>
        `true`,` false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `is_proxy`
      </td>

      <td>
        Indicates if this IP address suspected to be a proxy.
      </td>

      <td>
        `true`,` false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `proxy_type`
      </td>

      <td>
        The specific type of proxy service detected for the IP address.
      </td>

      <td>
        `anonymous`, `transparent`, `corporate`, `consumer-privacy`, `public`, `edu`, `data center`, `not a proxy`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `country`
      </td>

      <td>
        Country the User IP belongs to.
      </td>

      <td>
        A string, e.g. `US` or `null`.
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `region`
      </td>

      <td>
        State/Region that the IP belongs to.
      </td>

      <td>
        A string, e.g. `California` or `null`.
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `city`
      </td>

      <td>
        The city the IP belongs to.
      </td>

      <td>
        A string, e.g. `Fremont` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `isp`
      </td>

      <td>
        The Internet Service Provider name.
      </td>

      <td>
        A string, e.g. `AT&T U-verse` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `public_access_point`
      </td>

      <td>
        Whether the IP address belongs to education and research institutions, corporates, or public WiFi such as hotel lobby, coffee shop, etc.
      </td>

      <td>
        `true`, `false`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `connection_type`
      </td>

      <td>
        Indicates how the IP address is connected to the internet. The following connection types are identified: `Mobile`, `WiFi`, `Wired`, `Satellite`, `Dialup`, `NAT`
      </td>

      <td>
        A string, e.g. `WiFi` or `null`


      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `latitude`
      </td>

      <td>
        The latitude coordinates of the device used for the session.
      </td>

      <td>
        e.g. `37.52809906` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `longitude`
      </td>

      <td>
        The longitude coordinates of the device used for the session.
      </td>

      <td>
        e.g. `-121.97319794` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `asn`
      </td>

      <td>
        Autonomous System Number (ASN)
      </td>

      <td>
        A int e.g. `14618` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `network_info_rtt`
      </td>

      <td>
        Estimated effective round-trip time of the current connection
      </td>

      <td>
        A int e.g. `50` or `null`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>
  </tbody>
</Table>

### Session Risk Field

This field contains risk score related to the session derived by triggered telltales.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field Name
      </th>

      <th>
        Description
      </th>

      <th>
        Example Values
      </th>

      <th>
        Applicable Component
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `risk_category`
      </td>

      <td>
        The type of threat detected on a session (standard bot, advanced bot, fraud farm, custom)
      </td>

      <td>
        A string e.g. `BOT-STD` or `BOT-ADV` or `FRD-FRM` or `CUSTOM`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `risk_band`
      </td>

      <td>
        The classification of a session as low / medium / high risk based on the Max value from the custom and global risk scores.
      </td>

      <td>
        A string e.g. `LOW` or `MEDIUM` or `HIGH`
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `global`
      </td>

      <td>
        This field object contains 2 subfields `score` & `telltales`.

        `score` - A value between 0 and 100 representing the risk associated with the session based on the global telltales that triggered on a session.

        `telltales` - List of global telltales triggered with 2 subfields `name` & `weight`.
      </td>

      <td>
        An object e.g.

        ```
        \{ "score":10, "telltales": [\{ "name":"g-reputation-recent-abuse-proxy", "weight":10 }]}
        ```
      </td>

      <td>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `custom`
      </td>

      <td>
        This field object contains 2 subfields `score` & `telltales`.

        `score`- A value between 0 and 100 representing the risk associated with teh session based on the customer telltales that triggered on a session.

        `telltales` - List of custom telltales triggered with 2 subfields `name` & `weight`.
      </td>

      <td>
        An object e.g.

        ```
        \{": "100", "telltales":[ \{ "name": "outdated-browser-yandex-2", "weight": "7" }]}
        ```
      </td>

      <td>
        Detection Enforcemen
      </td>
    </tr>
  </tbody>
</Table>

<br />

### Agent Trust Fields

This object contains information about the agent trust detection and Web-Bot-Auth verification outcome for the session.

| Field Name              | Description                                                                                                                                                               | Example Values                                                                                                                 | Applicable Component |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| `detected`              | Whether the session was classified as an agent trust client. Set to false if an agent was detected but no name could be resolved.                                         | `true`, `false`                                                                                                                | Enforcement          |
| `agent.name`            | Canonical name of the detected agent. Present only when detected is true.                                                                                                 | `"ClaudeBot", "GPTBot", "Atlas", "Fellou", "PerplexityBot", "Opera Neon"`                                                      | Enforcement          |
| `web_bot_auth`          | Outcome of RFC 9421 Web-Bot-Auth header verification captured at setup-session. Independent signal from detected/agent — a verified payload with detected=false is valid. | `{...}`, `null`                                                                                                                | Enforcement          |
| `provided`              | Whether WBA headers were present on the setup-session request.                                                                                                            | `true`, `false`                                                                                                                | Enforcement          |
| `agent`                 | Bare URI of the bot operator's JWKS directory origin.                                                                                                                     | `https://openai.com`, `null`                                                                                                   | Enforcement          |
| `key_id`                | RFC 7638 thumbprint of the signing key used to sign the request.                                                                                                          | `NzbLsXh8uDCcd-6MNwXF4W_7noWXFZAfHkxZsRGC9Xs`, `null`                                                                          | Enforcement          |
| `signature_verified`    | Whether the RFC 9421 signature cryptographically verified.                                                                                                                | `true`, `false`                                                                                                                | Enforcement          |
| `signature_fail_reason` | Reason verification failed; null on success.                                                                                                                              | `bad_signature`, `missing_key`, `directory_unreachable`, `malformed_input`, `signature_expired`, `unsupported_profile`, `null` | Enforcement          |

<br />

# Sample Verify API Responses

The following examples show different Verify API responses. They show the typical values in each field for each type of response.

```json Sucessfully Solved EC
{
    "session_details": {
        "solved": true,
        "session": "43217b823752a4848.1388061501",
        "session_created": "2024-02-28T21:17:26Z",
        "check_answer": "2024-02-28T21:17:36Z",
        "verified": "2024-02-28T21:17:47Z",
        "attempted": true,
        "security_level": 20,
        "session_is_legit": true,
        "previously_verified": false,
        "session_timed_out": false,
        "suppress_limited": false,
        "theme_arg_invalid": false,
        "suppressed": false,
        "punishable_actioned": false,
        "telltale_user": "example-telltale-e-app--2023-10-19-1718",
        "telltale_origin":"example-telltale-e-app",
        "failed_low_sec_validation": false,
        "lowsec_error": null,
        "lowsec_level_denied": null,
        "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "ip_rep_list": null,
        "optional": null,
        "game_number_limit_reached": false,
        "user_language_shown": "en",
        "device_id": "null",
        "telltale_list": [
            "g-reputation-hosting",
            "g-reputation-vpn",
            "example-telltale-e-app--2023-10-19-1718"
        ],
        "challenge_type": "visual"
    },
    "fingerprint": {
        "browser_characteristics": {
            "browser_name": "Chrome",
            "browser_version": "120.0.0.0",
            "color_depth": 24,
            "session_storage": true,
            "indexed_database": true,
            "canvas_fingerprint": 1131944312
        },
        "device_characteristics": {
            "operating_system": "OS X",
            "operating_system_version": "10.15.7",
            "screen_resolution": [
                1920,
                1080
            ],
            "max_resolution_supported": [
                1920,
                1055
            ],
            "behavior": false,
            "cpu_class": "unknown",
            "platform": "MacIntel",
            "touch_support": false,
            "hardware_concurrency": 8
        },
        "user_preferences": {
            "timezone_offset": 360
        }
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
            "score": 36,
            "telltales": [
                {
                    "name": "g-reputation-hosting",
                    "weight": 20
                },
                {
                    "name": "g-reputation-vpn",
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
                "threshold": 360
            },
            "long_term": {
                "interval_minutes": 1440,
                "count": 2,
                "threshold": 100
            }
        }
    },
    "data_exchange": {
        "blob_decrypted": null,
        "blob_received": null
    },
    "stateful_device_id": {
        "stateful_device_id": "8dd4a9dc-81de-4c3d-a685-b8eb546b382b",
        "challenge_bypassed": true,
        "challenges_bypassed": 1,
        "change_reasons": ["invalid_id", "invalid_nonce"]
    },
    "stateless_device_id": {
        "device_id": “a325ssa5323a”,        
        "device_id_version": “1.3”,        
        "device_id_previous": “a325ssa5323b”,        
        "device_id_previous_version":“1.2” 
    },
    "mics_verdict": {
        "app_check_account_check": "VALID",
        "app_check_activity_level": "LEVEL_1",
        "app_check_cert_check": "VALID",
        "app_check_platform": "ANDROID",
        "app_check_result": "PASSED",
        "app_check_risk_level": "LOW",
        "device_check_platform": "ANDROID",
        "device_check_result": "PASSED",
        "mics_response": "SUCCESS"
    },
    "agent_trust": {
        "detected": true,
        "agent": {
            "name": "ClaudeBot"
        },
        "web_bot_auth": {
            "provided": true,
            "agent": "https://www.anthropic.com/",
            "key_id": "xxxxxxXXXXXXXXXXxxxXXXXxxxxxxxxxxxxxx",
            "signature_verified": true,
            "signature_fail_reason": null
        }
    }
}
```
```json Failed EC
{
    "session_details": {
        "solved": false,
        "session": "43217b82394172236.2145822401",
        "session_created": "2024-02-28T21:19:41Z",
        "check_answer": null,
        "verified": "2024-02-28T21:20:22Z",
        "attempted": false,
        "security_level": 30,
        "session_is_legit": true,
        "previously_verified": false,
        "session_timed_out": false,
        "suppress_limited": false,
        "theme_arg_invalid": false,
        "suppressed": false,
        "punishable_actioned": false,
        "telltale_user": "example-telltale-e-app--2023-10-19-1718",
        "telltale_origin": "example-telltale-e-app",
        "failed_low_sec_validation": false,
        "lowsec_error": null,
        "lowsec_level_denied": null,
        "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "ip_rep_list": null,
        "optional": null,
        "game_number_limit_reached": true,
        "user_language_shown": "en",
        "device_id": "null",
        "telltale_list": [
            "g-reputation-hosting",
            "g-reputation-vpn",
            "example-telltale-e-app--2023-10-19-1718"
        ],
        "challenge_type": null
    },
    "fingerprint": {
        "browser_characteristics": {
            "browser_name": "Chrome",
            "browser_version": "120.0.0.0",
            "color_depth": 24,
            "session_storage": true,
            "indexed_database": true,
            "canvas_fingerprint": 1131944312
        },
        "device_characteristics": {
            "operating_system": "OS X",
            "operating_system_version": "10.15.7",
            "screen_resolution": [
                1920,
                1080
            ],
            "max_resolution_supported": [
                1920,
                1055
            ],
            "behavior": false,
            "cpu_class": "unknown",
            "platform": "MacIntel",
            "touch_support": false,
            "hardware_concurrency": 8
        },
        "user_preferences": {
            "timezone_offset": 360
        }
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
            "score": 36,
            "telltales": [
                {
                    "name": "g-reputation-hosting",
                    "weight": 20
                },
                {
                    "name": "g-reputation-vpn",
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
                "count": 3,
                "threshold": 360
            },
            "long_term": {
                "interval_minutes": 1440,
                "count": 3,
                "threshold": 100
            }
        }
    },
    "data_exchange": {
        "blob_decrypted": null,
        "blob_received": null
    },
    "stateful_device_id": {
        "stateful_device_id": "8dd4a9dc-81de-4c3d-a685-b8eb546b382b",
        "challenge_bypassed": true,
        "challenges_bypassed": 1,
        "change_reasons": ["invalid_id", "invalid_nonce"]
    },
    "stateless_device_id": {
        "device_id": “a325ssa5323a”,        
        "device_id_version": “1.3”,        
        "device_id_previous": “a325ssa5323b”,        
        "device_id_previous_version":“1.2” 
    },
    "mics_verdict": {
        "app_check_account_check": "VALID",
        "app_check_activity_level": "LEVEL_1",
        "app_check_cert_check": "VALID",
        "app_check_platform": "ANDROID",
        "app_check_result": "PASSED",
        "app_check_risk_level": "LOW",
        "device_check_platform": "ANDROID",
        "device_check_result": "PASSED",
        "mics_response": "SUCCESS"
    },
    "agent_trust": {
        "detected": true,
        "agent": {
            "name": "ClaudeBot"
        },
        "web_bot_auth": {
            "provided": true,
            "agent": "https://www.anthropic.com/",
            "key_id": "xxxxxxXXXXXXXXXXxxxXXXXxxxxxxxxxxxxxx",
            "signature_verified": true,
            "signature_fail_reason": null
        }
    }
}
```
```json Failed EC With Error Message
{
    "error": "DENIED ACCESS",
    "verified": "2021-08-30T22:15:00+00:00"
}
```
```json Successfully Solved EC With lowsec Error
{
    "session_details": {
        "solved": true,
        "session": "75517b8243b6f0441.7468814901",
        "session_created": "2024-02-28T21:31:39Z",
        "check_answer": "2024-02-28T21:32:11Z",
        "verified": "2024-02-28T21:32:21Z",
        "attempted": true,
        "security_level": 50,
        "session_is_legit": true,
        "previously_verified": false,
        "session_timed_out": false,
        "suppress_limited": false,
        "theme_arg_invalid": false,
        "suppressed": false,
        "punishable_actioned": false,
        "telltale_user": "example-telltale-e-app--2023-10-19-1718",
        "telltale_origin": "example-telltale-e-app",
        "failed_low_sec_validation": false,
        "lowsec_error": "user_credits",
        "lowsec_level_denied": null,
        "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "ip_rep_list": null,
        "optional": null,
        "game_number_limit_reached": false,
        "user_language_shown": "en",
        "device_id": "60116465c81ab3f640655106e42bf05994dd2e27b3afafb7e61a5cac0928c2e6",
        "telltale_list": [
            "g-reputation-hosting",
            "g-reputation-vpn",
            "example-telltale-e-app--2023-10-19-1718"
        ],
        "challenge_type": "visual"
    },
    "fingerprint": {
        "browser_characteristics": {
            "browser_name": "Chrome",
            "browser_version": "120.0.0.0",
            "color_depth": 24,
            "session_storage": true,
            "indexed_database": true,
            "canvas_fingerprint": 1131944312
        },
        "device_characteristics": {
            "operating_system": "OS X",
            "operating_system_version": "10.15.7",
            "screen_resolution": [
                1920,
                1080
            ],
            "max_resolution_supported": [
                1920,
                1055
            ],
            "behavior": false,
            "cpu_class": "unknown",
            "platform": "MacIntel",
            "touch_support": false,
            "hardware_concurrency": 8
        },
        "user_preferences": {
            "timezone_offset": 360
        }
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
            "score": 36,
            "telltales": [
                {
                    "name": "g-reputation-hosting",
                    "weight": 20
                },
                {
                    "name": "g-reputation-vpn",
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
                "count": 5,
                "threshold": 360
            },
            "long_term": {
                "interval_minutes": 1440,
                "count": 5,
                "threshold": 100
            }
        }
    },
    "data_exchange": {
        "blob_decrypted": null,
        "blob_received": null
    },
    "stateful_device_id": {
        "stateful_device_id": "8dd4a9dc-81de-4c3d-a685-b8eb546b382b",
        "challenge_bypassed": true,
        "challenges_bypassed": 1,
        "change_reasons": ["invalid_id", "invalid_nonce"]
    },
    "stateless_device_id": {
        "device_id": “a325ssa5323a”,        
        "device_id_version": “1.3”,        
        "device_id_previous": “a325ssa5323b”,        
        "device_id_previous_version":“1.2” 
    },
    "agent_trust": {
        "detected": true,
        "agent": {
            "name": "ClaudeBot"
        },
        "web_bot_auth": {
            "provided": true,
            "agent": "https://www.anthropic.com/",
            "key_id": "xxxxxxXXXXXXXXXXxxxXXXXxxxxxxxxxxxxxx",
            "signature_verified": true,
            "signature_fail_reason": null
        }
    }
}
```
```json Failed EC With Optional Data
{
    "session_details": {
        "solved": false,
        "session": "43217b82394172236.2145822401",
        "session_created": "2024-02-28T21:19:41Z",
        "check_answer": null,
        "verified": "2024-02-28T21:20:22Z",
        "attempted": false,
        "security_level": 30,
        "session_is_legit": true,
        "previously_verified": false,
        "session_timed_out": false,
        "suppress_limited": false,
        "theme_arg_invalid": false,
        "suppressed": false,
        "punishable_actioned": false,
        "telltale_user": "example-telltale-e-app--2023-10-19-1718",
        "telltale_origin": "example-telltale-e-app",
        "failed_low_sec_validation": false,
        "lowsec_error": null,
        "lowsec_level_denied": null,
        "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "ip_rep_list": null,
        "optional": {
           "blob": "BbfYFeKzwEwnGCAU.fCWy85IOHQ2j2SomSW6bf6Mibfgdlqn7MWyoY8JbYkVskPsLbqBqryeAR0EVC1pi5XosVJjPfvWZ4H6EBQgC5XYnHVeKwQ=="
        },
        "game_number_limit_reached": true,
        "user_language_shown": "en",
        "device_id": "null",
        "telltale_list": [
            "g-reputation-hosting",
            "g-reputation-vpn",
            "example-telltale-e-app--2023-10-19-1718"
        ],
        "challenge_type": null
    },
    "fingerprint": {
        "browser_characteristics": {
            "browser_name": "Chrome",
            "browser_version": "120.0.0.0",
            "color_depth": 24,
            "session_storage": true,
            "indexed_database": true,
            "canvas_fingerprint": 1131944312
        },
        "device_characteristics": {
            "operating_system": "OS X",
            "operating_system_version": "10.15.7",
            "screen_resolution": [
                1920,
                1080
            ],
            "max_resolution_supported": [
                1920,
                1055
            ],
            "behavior": false,
            "cpu_class": "unknown",
            "platform": "MacIntel",
            "touch_support": false,
            "hardware_concurrency": 8
        },
        "user_preferences": {
            "timezone_offset": 360
        }
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
            "score": 36,
            "telltales": [
                {
                    "name": "g-reputation-hosting",
                    "weight": 20
                },
                {
                    "name": "g-reputation-vpn",
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
                "count": 3,
                "threshold": 360
            },
            "long_term": {
                "interval_minutes": 1440,
                "count": 3,
                "threshold": 100
            }
        }
    },
    "data_exchange": {
        "blob_decrypted": null,
        "blob_received": null
    },
    "stateful_device_id": {
        "stateful_device_id": "8dd4a9dc-81de-4c3d-a685-b8eb546b382b",
        "challenge_bypassed": true,
        "challenges_bypassed": 1,
        "change_reasons": ["invalid_id", "invalid_nonce"]
    },
    "stateless_device_id": {
        "device_id": “a325ssa5323a”,        
        "device_id_version": “1.3”,        
        "device_id_previous": “a325ssa5323b”,        
        "device_id_previous_version":“1.2” 
    },
    "agent_trust": {
        "detected": true,
        "agent": {
            "name": "ClaudeBot"
        },
        "web_bot_auth": {
            "provided": true,
            "agent": "https://www.anthropic.com/",
            "key_id": "xxxxxxXXXXXXXXXXxxxXXXXxxxxxxxxxxxxxx",
            "signature_verified": true,
            "signature_fail_reason": null
        }
    }
}
```

# Data Exchange

> 📘 Data Exchange Response Structure
>
> To view the full Data Exchange Response Structure please visit **[Data Exchange: Enhanced Detection and API Source Validation](https://support.arkoselabs.com/hc/en-us/articles/4410529474323-Data-Exchange-Enhanced-Detection-and-API-Source-Validation)** (needs Zendesk authentication).

***

# Email Intelligence

> 📘 Email Intelligence Response Structure
>
> To view the full Email Intelligence Response Structure please visit **[Email Intelligence API Reference](https://support.arkoselabs.com/hc/en-us/articles/8722267392147-Email-Intelligence-API-Reference)** (needs Zendesk authentication).

***

# Device ID

> 📘 Device ID Response Structure
>
> To view the full Device ID Response Structure please visit [**Stateless Device ID**](https://support.arkoselabs.com/hc/en-us/articles/35530624484371-Stateless-Device-ID) and [**Stateful Device ID**](https://support.arkoselabs.com/hc/en-us/articles/35464994236819-Stateful-Device-ID) (needs Zendesk authentication).

***

# Proof of Work

> 📘 Proof of Work Response Structure
>
> To view the full Proof of Work Response Structure please visit [Proof of Work (Beta Preview)](https://support.arkoselabs.com/hc/en-us/articles/35531758890003-Proof-of-Work-Beta-Preview) (needs Zendesk authentication).

<br />