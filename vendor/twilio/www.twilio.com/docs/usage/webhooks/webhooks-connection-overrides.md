# Webhooks (HTTP callbacks): Connection Overrides

Twilio uses [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) callbacks ([webhooks](/docs/usage/webhooks/webhooks-overview)) to let your application know when events happen, such as receiving an SMS message or getting an incoming phone call. When the event occurs, Twilio makes an HTTP request (usually a [`POST` or a `GET`](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)) to the URL you configured for the webhook. Twilio's request will include details of the event such as the incoming phone number or the body of an incoming message.

Twilio's use of HTTP URLs conforms to the standard syntax of a [generic URI/URL](https://en.wikipedia.org/wiki/URL).

## Connection overrides

Twilio has implemented URL extensions, that can be added to the standard HTTP webhook URL. These extensions give you the ability to override Twilio's default HTTP callback connection settings on a per-request basis. The override settings allow you to specify:

* Longer timeouts to better support intermittent network issues between Twilio and your server/application
* Shorter timeouts to speed up failover (to fallback URL) in the case of an outage on your server/application
* HTTP callback connection retries on failures/timeouts
* The egress Twilio Edge for your HTTP callback
* The total timeout limit for all retries to complete
* The use of [Server Name Indication (SNI)](https://en.wikipedia.org/wiki/Server_Name_Indication) if your server/application requires SNI to ensure a proper TLS handshake for all attempts

Connection overrides will be passed on a per webhook URL basis in the form of "[fragments](https://en.wikipedia.org/wiki/Fragment_identifier)". These fragments will contain key-value pairs; key and value are separated by **=** , pairs are separated by **&** . The 1st key-value pair start with ***#***.

> \[!NOTE]
>
> If you're validating signatures from Twilio webhooks, note that these URL fragments do not make it into the signature computation and should be left out on your side as well.

> \[!NOTE]
>
> Voice webhooks that are retried are not displayed as separate requests in the **Request Inspector** section of a call's log page in the Console.

The following list details all supported overrides:

| Parameter       | Key   | Valid values                                                                                                                                                                                            | Default   | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connect Timeout | `ct`  | Min: 100, Max: 10000                                                                                                                                                                                    | 5000      | The timeout in milliseconds Twilio will wait to establish its TCP connection to your web server.                                                                                                                                                                                                                                                                                                                                                                      |
| Read Timeout    | `rt`  | Min: 100, Max: 15000                                                                                                                                                                                    | 15000     | The amount of time in milliseconds that Twilio will wait for the initial HTTP response packet after the webhook request is sent. Also applies to the amount of time Twilio will wait between individual packets within your HTTP response.                                                                                                                                                                                                                            |
| Total time      | `tt`  | Min: 100, Max: 15000                                                                                                                                                                                    | 15000     | The total time allowed for all timeouts including retries. If not set, Twilio enforces the maximum limit.                                                                                                                                                                                                                                                                                                                                                             |
| Retry count     | `rc`  | Min: 0, Max: 5                                                                                                                                                                                          | 1         | The number of retry attempts Twilio will make if its connection to your webhook fails. To make sure you capture the behaviors you need, make sure to set the Retry Policy (`rp`) value accordingly.                                                                                                                                                                                                                                                                   |
| Retry policy    | `rp`  | `4xx`, `5xx`, `ct`, `rt`, `all`                                                                                                                                                                         | `ct`      | The type of failure to retry on. `4xx` retries on any 4xx response from your web server. `5xx` retries on any 5xx response from your web server. `ct` retries on TCP connect or TLS handshake failure. `rt` retries on no response received within read timeout from your web server. Twilio doesn't retry on partial response, such as missing HTTP content. `all` retries on all of the previous types. You can also pass as a list of values, such as `rp=ct,rt`.  |
| SNI             | `sni` | `y`, `n`                                                                                                                                                                                                | `y`       | If set to `y` we use SNI (default). If set to `n` we disable SNI. **Note:** Only applies for secure connections (HTTPS).                                                                                                                                                                                                                                                                                                                                              |
| Edge Location   | `e`   | `ashburn`, `dublin`, `frankfurt`, `sao-paulo`, `singapore`, `sydney`, `tokyo`, or `umatilla`. For Twilio Interconnect only: `ashburn-ix`, `frankfurt-ix`, `london-ix`, `san-jose-ix`, or `singapore-ix` | `ashburn` | The Twilio edge location where webhooks egress. This can be a list, and we rotate through the list as retries occur. If [Static Proxy](https://www.twilio.com/en-us/editions) is enabled for the account, the `e` parameter is ignored. The order of precedence for edge location is: 1. Twilio Interconnect Edge, if specified in `e=`. 2. [Static Proxy](https://www.twilio.com/en-us/editions), if enabled. 3. Public Edge, if specified in `e=`. 4. Default Edge. |

The values with the `-ix` suffix are used for [Interconnect](/docs/interconnect) edges. To allow webhooks to traverse your interconnect, ensure the following:

* The URL or IP address that the webhook request targets is configured on your interconnect.
* You specify one of the interconnect edges.

Otherwise, the webhook will traverse the public internet.

There will be a new HTTP header (`I-Twilio-Idempotency-Token`), a unique string, that you can use to distinguish retry attempts.

> \[!WARNING]
>
> Due to the real-time nature of voice calls, there is a hard upper timeout of 15 seconds imposed by Twilio on all call-related HTTP requests. This hard limit overrides any of the timers described above on call-processing requests and is present to help to ensure a good end-user calling experience.
>
> There are also other product and resource-related timers which may supersede these timers; please review your product documentation to help you determine appropriate settings for your use case.

### Examples

(1) `https://example.com/foo?query=123#ct=1000`

Connection timeout (time to wait for a connection to be established) of one second.

(2) `https://example.com/foo?query=123#ct=1000&rt=1000`

Connection timeout (time to wait for a connection to be established) of one second and a Read timeout (time to wait for data to be returned on a connection) of one second.

(3) `https://example.com/foo?query=123#rt=5000&rp=ct,rt`

Retry on both connect and read timeout, while also reducing the read timeout to five seconds.

(4) `https://example.com/foo?query=123#e=ashburn,umatilla`

Retry on failure over different edge locations. The first attempt goes out over Ashburn, second attempt goes out over Umatilla (Oregon).

(5) `https://example.com/foo?query=123#rc=2&ct=1000`

Retry on connection failure, but with a one-second connection timeout. If there is no connection in one second, retry twice, i.e., for a total of three attempts to connect.

## **Where are these overrides available?**

Connection overrides are available on all product webhooks except for Twilio Conversations and Twilio Frontline. The overrides may be specified in webhook URLs in both the API resource properties and TwiML attributes.

If you have trouble implementing a connection override, you can reach out to our [support team](https://help.twilio.com/) for help.
