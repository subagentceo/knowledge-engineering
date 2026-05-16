# Verify API Response Fields and Examples

## Session Characteristics

These fields contain information about the session itself.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Field Name
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        Example Values
      </th>

      <th style={{ textAlign: "left" }}>
        Applicable Component
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        `solved`
      </td>

      <td style={{ textAlign: "left" }}>
        When a session's risk level does not qualify it for transparent mode (no challenge) it is shown an interactive challenge. In that case, this field's value indicates if the challenge was successfully solved or not.

        If it was in transparent mode, the field value for a valid session is `true`.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `session`
      </td>

      <td style={{ textAlign: "left" }}>
        A unique token for the Arkose Labs session. A session is the whole experience from solution load to verification.
      </td>

      <td style={{ textAlign: "left" }}>
        A unique token, e.g. `3595d2c014d3c5f01.1116018803`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `session_created`
      </td>

      <td style={{ textAlign: "left" }}>
        An ISO 8601 UTC timestamp signifying the time the session was created
      </td>

      <td style={{ textAlign: "left" }}>
        e.g. `2019-07-15T02:45:13+00:00`, or `null`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `check_answer`
      </td>

      <td style={{ textAlign: "left" }}>
        An ISO 8601 UTC timestamp signifying the time that the Enforcement Challenge user supplied answered were evaluated
      </td>

      <td style={{ textAlign: "left" }}>
        e.g. `2019-07-15T02:45:13+00:00`, or `null`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `verified`
      </td>

      <td style={{ textAlign: "left" }}>
        An ISO 8601 UTC timestamp signifying the time that the request to the verify endpoint was made.
      </td>

      <td style={{ textAlign: "left" }}>
        e.g. \`\`2019-07-15T02:45:13+00:00
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `attempted`
      </td>

      <td style={{ textAlign: "left" }}>
        Whether the user attempted to solve the Enforcement Challenge, or not.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `security_level`
      </td>

      <td style={{ textAlign: "left" }}>
        A number that indicates the security level used for this session.

        Be aware that `security_level` can have a null value - usually because the session was an audio mode session. Audio mode does not use `security_level`.
      </td>

      <td style={{ textAlign: "left" }}>
        A security level, e.g. `20`
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `session_is_legit`
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates if Arkose Labs certifies there are no telltales of non-legitimate activity in the session.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `previously_verified`
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates if a session has already been verified.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `session_timed_out`
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates if a session timed out before it was solved

        * *Note:* \*The default timeout value / token lifespan is 30 minutes.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `suppress_limited`
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates if the session qualified for low security, but failed verification. Low security is when a session has qualified to run in transparent mode, or use a no wrong answer enforcement challenge, such as the pick your favorite color challenge.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `theme_arg_invalid`
      </td>

      <td style={{ textAlign: "left" }}>
        Whether the theme arg setting at verification matched the original theme arg passed in at session setup.

        A theme arg is a parameter passed by a customer to Arkose Labs. It requests a security tier or UX test mode.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `suppressed`
      </td>

      <td style={{ textAlign: "left" }}>
        Suppressed is the old name for transparent mode. This field shows if the the user was offered transparent mode.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `punishable_actioned`
      </td>

      <td style={{ textAlign: "left" }}>
        Punishable is an attack mitigation tactic, which randomly fails verification attempts, even if the response was correct. This field indicates if punishable was activated.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`,` false`
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `telltale_user`
      </td>

      <td style={{ textAlign: "left" }}>
        The winning telltale from the list of telltales that were identified as possible candidates (telltale\_list field) during a session
      </td>

      <td style={{ textAlign: "left" }}>
        A string such as `999b-fwh`, or `null`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `telltale_origin`
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates the source configuration of a `telltale_user`.
      </td>

      <td style={{ textAlign: "left" }}>
        A string such as `999b-fwh`, or `null`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `failed_low_sec_validation`
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates that the intention was to offer the user a low security session, but they failed to qualify for it when the verification was attempted.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `lowsec_error`
      </td>

      <td style={{ textAlign: "left" }}>
        An identifier showing why a user was denied a low security session.
      </td>

      <td style={{ textAlign: "left" }}>
        `"user_credits"`, `"rate_limit_local"`, `"validation_checks"`, `"rate_limit_global"`, or `null`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `lowsec_level_denied`
      </td>

      <td style={{ textAlign: "left" }}>
        The low security level that was denied to the user.
      </td>

      <td style={{ textAlign: "left" }}>
        A security level, e.g. `5`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `ua`
      </td>

      <td style={{ textAlign: "left" }}>
        The User Agent string for the user that interacted with the EC.
      </td>

      <td style={{ textAlign: "left" }}>
        ```
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
        AppleWebKit/537.36 (KHTML, like Gecko)
        Chrome/92.0.4515.159 Safari/537.36“
        ```
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `ip_rep_list`
      </td>

      <td style={{ textAlign: "left" }}>
        An identifier which specifies which IP reputation database this IP address has been seen at.
      </td>

      <td style={{ textAlign: "left" }}>
        `null`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `optional`
      </td>

      <td style={{ textAlign: "left" }}>
        An object containing optional return values such as `client_encrypted_mode_key` or `get_pass values`.

        Also, relevant data being sent to Arkose Labs via our accepted methods (see: [Data Exchange](https://support.arkoselabs.com/hc/en-us/articles/4410529474323-Data-Exchange-Enhanced-Detection-and-API-Source-Validation) (Requires Support login)) appears in this object.

        The specific keys and values inside this object vary based on implementation
      </td>

      <td style={{ textAlign: "left" }}>
        ```
        {"blob":
        "lHpwagBqx3JOI7t9Ka0KUdIeHZbIjAYPPB72k
        Du2Zb5BwNiC6qJx5gS0f5c3EzcZ9d"}
        ```

        , or null
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `game_number_limit_reached`
      </td>

      <td style={{ textAlign: "left" }}>
        Game number limit is an optional setting that restricts the number of attempts a user can have at solving the EC. This field can show if the user reached the number of attempts allowed.
      </td>

      <td style={{ textAlign: "left" }}>
        `true`, `false`
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `user_language_shown`
      </td>

      <td style={{ textAlign: "left" }}>
        Shows the language code of the language in which the challenge was presented to the user.
      </td>

      <td style={{ textAlign: "left" }}>
        A string such as `“en“` or `null`
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `telltale_list`
      </td>

      <td style={{ textAlign: "left" }}>
        The list of telltales that were identified as possible candidates during a session.
      </td>

      <td style={{ textAlign: "left" }}>
        A string e.g. `"999b-fwh"`, or `null`
      </td>

      <td style={{ textAlign: "left" }}>
        Detection Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `challenge_type`
      </td>

      <td style={{ textAlign: "left" }}>
        The type of challenge that the end-user solved.
      </td>

      <td style={{ textAlign: "left" }}>
        A string e.g. `"audio"`, `"transparent"`, `"visual"`, `“pow"`, `"pow+visual"`, `“pow+audio`" or `null`
      </td>

      <td style={{ textAlign: "left" }}>
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

        <br />
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
        Detection Enforcement
      </td>
    </tr>
  </tbody>
</Table>

<br />

<br />

# Sample Verify API Responses

The following examples show different Verify API responses. They show the typical values in each field for each type of response.

```json Sucessfully Solved EC
{
  "session_details": {
    "solved": true,
    "session": "43217b823752a4848.1388061501",
    "session_created": "2026-02-28T21:17:26Z",
    "check_answer": "2026-02-28T21:17:36Z",
    "verified": "2026-02-28T21:17:47Z",
    "attempted": true,
    "security_level": 20,
    "session_is_legit": true,
    "previously_verified": false,
    "session_timed_out": false,
    "suppress_limited": false,
    "theme_arg_invalid": false,
    "suppressed": false,
    "punishable_actioned": false,
    "telltale_user": "g-reputation-hosting",
    "telltale_origin": "example-telltale-e-app",
    "failed_low_sec_validation": false,
    "lowsec_error": null,
    "lowsec_level_denied": null,
    "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "ip_rep_list": null,
    "optional": null,
    "game_number_limit_reached": false,
    "user_language_shown": "en",
    "telltale_list": [
      "g-reputation-hosting",
      "g-reputation-vpn"
    ],
    "challenge_type": "visual",
    "stateless_device_id": {
      "device_id": "a91cd4e726f8b3051d6e4a7c9f2b8d3e1c5a7f9b2d4e6a8c0f1b3d5e7a9c2b4",
      "device_id_previous": "3f5a7c9e1b2d4f6a8c0e2b4d6f8a1c3e5b7d9f1a3c5e7b9d2f4a6c8e0b1d3f5",
      "device_id_previous_version": "1.2",
      "device_id_version": "2.0"
    }
  },

  "data_exchange": {
    "blob_decrypted": null,
    "blob_received": null
  },

  "aggregations": {
    "error": null,
    "ip": {
      "short_term": {
        "count": 2,
        "interval_minutes": 60,
        "threshold": 360
      },
      "long_term": {
        "count": 2,
        "interval_minutes": 1440,
        "threshold": 100
      }
    }
  },

  "device_id": {
    "arkose_id": "f83be5d914c7a2069e5f8b1d4a3c6e9f2b7d1a4c8e3f5b9d2a6c0e4f7b1d3a8",
    "confidence_score": "99.986305",
    "device_first_seen": "2025-03-22T08:15:44Z",
    "device_last_seen": "2026-01-09T11:37:21Z",
    "device_spoofing_detected": "0",
    "stateful_challenge_bypassed": true,
    "stateful_challenges_bypassed": 1,
    "stateful_change_reasons": [
      "invalid_id",
      "invalid_nonce"
    ],
    "stateful_device_id": "8dd4a9dc-81de-4c3d-a685-b8eb546b382b",
    "stateless_device_id": "a91cd4e726f8b3051d6e4a7c9f2b8d3e1c5a7f9b2d4e6a8c0f1b3d5e7a9c2b4",
    "stateless_device_id_previous": "3f5a7c9e1b2d4f6a8c0e2b4d6f8a1c3e5b7d9f1a3c5e7b9d2f4a6c8e0b1d3f5",
    "stateless_device_id_previous_version": "1.2",
    "stateless_device_id_version": "2.0"
  },

  "stateful_device_id": {
    "stateful_device_id": "8dd4a9dc-81de-4c3d-a685-b8eb546b382b",
    "challenge_bypassed": true,
    "challenges_bypassed": 1,
    "change_reasons": [
      "invalid_id",
      "invalid_nonce"
    ]
  },

  "session_risk": {
    "risk_band": "Low",
    "risk_category": "BOT-STD",
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
      "behavior": false,
      "cpu_class": "X86",
      "hardware_concurrency": 8,
      "ja4_hash": "t13d1517h2_8daaf6152771_b6f405a00624",
      "max_resolution_supported": [1920, 1055],
      "operating_system": "OS X",
      "operating_system_version": "10.15.7",
      "platform": "MacIntel",
      "screen_resolution": [1920, 1080],
      "touch_support": false
    },
    "user_preferences": {
      "timezone_offset": 360
    }
  },

  "ip_intelligence": {
    "user_ip": "18.190.53.157",
    "is_tor": false,
    "is_vpn": true,
    "is_proxy": true,
    "country": "US",
    "region": "Ohio",
    "city": "Columbus",
    "isp": "Amazon.com",
    "public_access_point": false,
    "connection_type": "Data Center",
    "proxy_type": "data center",
    "latitude": "39.9587",
    "longitude": "-82.9987",
    "timezone": "America/New_York",
    "asn": 55256,
    "network_info_rtt": 100ms
  },

  "proof_of_work": {
    "challenged": false,
    "attempted": false,
    "passed": false,
    "difficulty_level": "high",
    "transparent": false
  },
  "email_intelligence": {
        "email_assessment": {
            "email_address": "anansmith@gmail.com",
            "detumbled_email_address": "anansmith@gmail.com",
            "deenumerated_email_address": "anansmith@gmail.com",
            "suggested_action": "email_no_risk",
            "email_risk_score": 0,
            "email_domain": "gmail.com",
            "email_handle_length": 9,
            "is_tumbled_email": false,
            "is_enumerated_email": false,
            "deenumerated_email_handle_length": 9,
            "is_invalid_email": false,
            "is_role_email": false,
            "is_private_relay": false,
            "detumbled_email_first_seen": "2026-03-11T01:56:18Z",
            "detumbled_email_first_seen_in_days": 0,
            "domain_relative_usage_factor": 2,
            "domain_enrichment": {
                "is_domain_missing": false,
                "domain_age": 11168,
                "domain_creation_date": "1995-08-13",
                "domain_org": "Google LLC",
                "domain_name_servers": [
                    "ns1.google.com",
                    "ns4.google.com",
                    "ns3.google.com",
                    "ns2.google.com"
                ],
                "is_disposable": false,
                "domain_registration_country": "us"
            },
            "is_suspicious_email_handle": false,
            "domain_shannon_entropy": 2.95,
            "domain_metric_entropy": 0.3277777777777778,
            "deenumerated_domain_length": 9,
            "anomalous_handle_composition": false,
            "is_mx_record_present": true,
            "is_mx_valid": true
        },
        "detumbled_email_stats": {
            "handle_length": 9,
            "handle_num_alpha_chars": 9,
            "handle_num_vowels": 3,
            "handle_num_consonants": 6,
            "handle_num_numeric_chars": 0,
            "handle_num_special_chars": 0,
            "handle_qwerty_typing_distance": 31.169465219861685,
            "handle_dvorak_typing_distance": 34.39834563766817
        },
        "total_email_counts": {
            "short_term_count": 1,
            "short_term_period_minutes": 360,
            "long_term_count": 3,
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
            "long_term_count": 1,
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
        "device_id": null,
        "telltale_list": [
            "g-reputation-hosting",
            "g-reputation-vpn",
            "example-telltale-e-app--2023-10-19-1718"
        ],
        "challenge_type": null,
        "stateless_device_id": null                       
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
            "screen_resolution": [1920, 1080],
            "max_resolution_supported": [1920, 1055],
            "behavior": false,
            "cpu_class": "unknown",
            "platform": "MacIntel",
            "touch_support": false,
            "hardware_concurrency": 8,
            "ja4_hash": null                               
        },
        "user_preferences": {
            "timezone_offset": 360
        }
    },
    "ip_intelligence": {
        "user_ip": "18.190.53.157",
        "is_tor": false,
        "is_vpn": true,
        "is_proxy": true,
        "country": "US",
        "region": "Ohio",
        "city": "Columbus",
        "isp": "Amazon.com",
        "public_access_point": false,
        "connection_type": "WiFi",
        "latitude": "39.9587",
        "longitude": "-82.9987",
        "timezone": "America/New_York",
        "asn": null,                                       
        "network_info_rtt": null                           
    },
    "session_risk": {
        "risk_category": "BOT-STD",
        "risk_band": "Low",
        "global": {
            "score": 36,
            "telltales": [
                { "name": "g-reputation-hosting", "weight": 20 },
                { "name": "g-reputation-vpn", "weight": 20 }
            ]
        },
        "custom": {
            "score": 0,
            "telltales": []
        }
    },
    "aggregations": {
        "error": null,                                     
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
        "device_id": "a325ssa5323a",
        "device_id_version": "1.3",
        "device_id_previous": "a325ssa5323b",
        "device_id_previous_version": "1.2"
    },
    "proof_of_work": {                                    
        "challenged": false,
        "attempted": false,
        "passed": false,
        "difficulty_level": null
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
        "telltale_user": "g-reputation-hosting",
        "telltale_origin": "example-telltale-e-app",       // ✅ ADDED
        "failed_low_sec_validation": false,
        "lowsec_error": "user_credits",
        "lowsec_level_denied": null,
        "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "ip_rep_list": null,
        "optional": null,
        "game_number_limit_reached": false,
        "user_language_shown": "en",
        "telltale_list": [
            "g-reputation-hosting",
            "g-reputation-vpn"
        ],
        "challenge_type": "visual",
        "stateless_device_id": null                        // ✅ ADDED (null when unavailable)
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
            "screen_resolution": [1920, 1080],
            "max_resolution_supported": [1920, 1055],
            "behavior": false,
            "cpu_class": "unknown",
            "platform": "MacIntel",
            "touch_support": false,
            "hardware_concurrency": 8,
            "ja4_hash": null                               // ✅ ADDED
        },
        "user_preferences": {
            "timezone_offset": 360
        }
    },
    "ip_intelligence": {
        "user_ip": "18.190.53.157",
        "is_tor": false,
        "is_vpn": true,
        "is_proxy": true,
        "country": "US",
        "region": "Ohio",
        "city": "Columbus",
        "isp": "Amazon.com",
        "public_access_point": false,
        "connection_type": "WiFi",
        "latitude": "39.9587",
        "longitude": "-82.9987",
        "timezone": "America/New_York",
        "asn": null,                                       // ✅ ADDED
        "network_info_rtt": null                           // ✅ ADDED
    },
    "session_risk": {
        "risk_category": "BOT-STD",
        "risk_band": "Low",
        "global": {
            "score": 36,
            "telltales": [
                { "name": "g-reputation-hosting", "weight": 20 },
                { "name": "g-reputation-vpn", "weight": 20 }
            ]
        },
        "custom": {
            "score": 0,
            "telltales": []
        }
    },
    "aggregations": {
        "error": null,                                     // ✅ ADDED
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
    "device_id": {                                         // ✅ ADDED (entire block)
        "arkose_id": null,
        "confidence_score": null,
        "device_first_seen": null,
        "device_last_seen": null,
        "device_spoofing_detected": null,
        "stateful_challenge_bypassed": null,
        "stateful_challenges_bypassed": null,
        "stateful_change_reasons": null,
        "stateful_device_id": null,
        "stateless_device_id": null,
        "stateless_device_id_previous": null,
        "stateless_device_id_previous_version": null,
        "stateless_device_id_version": null
    },
    "stateful_device_id": {                                // ✅ ADDED (entire block)
        "stateful_device_id": null,
        "challenge_bypassed": false,
        "challenges_bypassed": 0,
        "change_reasons": null
    },
    "stateless_device_id": {                               // ✅ ADDED (entire block)
        "device_id": null,
        "device_id_version": null,
        "device_id_previous": null,
        "device_id_previous_version": null
    },
    "proof_of_work": {                                     // ✅ ADDED (entire block)
        "challenged": false,
        "attempted": false,
        "passed": false,
        "difficulty_level": null
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
        "telltale_user": "g-reputation-hosting",
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
        "device_id": null,
        "telltale_list": [
            "g-reputation-hosting",
            "g-reputation-vpn"
        ],
        "challenge_type": null,
        "stateless_device_id": null                        
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
            "screen_resolution": [1920, 1080],
            "max_resolution_supported": [1920, 1055],
            "behavior": false,
            "cpu_class": "unknown",
            "platform": "MacIntel",
            "touch_support": false,
            "hardware_concurrency": 8,
            "ja4_hash": null                               
        },
        "user_preferences": {
            "timezone_offset": 360
        }
    },
    "ip_intelligence": {
        "user_ip": "18.190.53.157",
        "is_tor": false,
        "is_vpn": true,
        "is_proxy": true,
        "country": "US",
        "region": "Ohio",
        "city": "Columbus",
        "isp": "Amazon.com",
        "public_access_point": false,
        "connection_type": "WiFi",
        "latitude": "39.9587",
        "longitude": "-82.9987",
        "timezone": "America/New_York",
        "asn": 14618,
        "network_info_rtt": 50
    },
    "session_risk": {
        "risk_category": "BOT-STD",
        "risk_band": "Low",
        "global": {
            "score": 36,
            "telltales": [
                { "name": "g-reputation-hosting", "weight": 20 },
                { "name": "g-reputation-vpn", "weight": 20 }
            ]
        },
        "custom": {
            "score": 0,
            "telltales": []
        }
    },
    "aggregations": {
        "error": null,                                     
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
        "challenge_bypassed": false,
        "challenges_bypassed": 0,
        "change_reasons": null
    },
    "stateless_device_id": {                               
        "device_id": null,
        "device_id_version": null,
        "device_id_previous": null,
        "device_id_previous_version": null
    },
    "proof_of_work": {                                    
        "challenged": false,
        "attempted": false,
        "passed": false,
        "difficulty_level": null
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