# Troubleshooting your Trunk

## SIP Trunking Debugger Alerts \[#alerts]

Twilio will log a [`Debugger Alert record`](/user/account/monitor/alerts) when it encounters an error whilst making SIP requests to/from your SIP infrastructure. These may be very useful for debugging purposes. You can configure [Alert Triggers](/user/account/monitor/triggers/alert) to fire based on your preferences on any [Alert error code](/docs/api/errors); optionally, you can also send a corresponding webhook or an email notification. SIP specific error codes are in the `32xxx` series.

## Elastic SIP Trunking Call Logs

The Elastic SIP Trunking Call Log is a useful tool that can provide quick diagnosis of call behavior. To find it in Twilio Console, go to **Products & services** > **Elastic SIP Trunking** > **Logs** > **[Calls](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/logs/calls)**. You can also find it in the [legacy Console](https://www.twilio.com/console/sip-trunking/logs/calls). Filter by date, to and from numbers or SIP addresses, and call status to begin your troubleshooting. Customize the information available to show a number of data points related to your calls for a more complete picture of your call behavior, or remove columns unnecessary to your use case. Select the **Configure Columns** button in the **Filter Results** option pane. For more advanced manipulation, download the CSV from the same option pane and explore more technical details of your calls.

Values available to view in the Call Log or download to CSV include:

* Account Sid \*\*
* API Version \*\*
* Call Sid
* Called Via \*\*
* CNAM \*\*
* Cost \*\*\*
* Date \*\*\*
* Date Created \*\*
* Direction
* Duration
* End Time \*\*
* From
* Parent Call Sid \*
* Phone Number Sid \*\*
* Price \*\*
* Price Unit \*\*
* Provider Sid \*\*
* Recording \*\*\*
* Secure Trunking \*\*
* SIP Call ID \*
* Start Time \*\*
* Status
* STIR Status
* To
* Trunk Sid \*
* Type

\*Values must be toggled on in the Call Log

\*\* Only available in CSV download

\*\*\* Only available in Call Logs

## Elastic SIP Trunks

Trunks page allows you to create new SIP Trunks and provide you a summary of all the trunks that you have created. You can also use filters to search trunks based on Trunk SID, Trunk Name, Termination and Origination SIP URI.

## Common problems and solutions

Below you can find some common issues you might encounter when configuring your Elastic SIP Trunk. We provide an explanation of potential causes and some troubleshooting tips.

Remember that you can practice making a call and check that your communications infrastructure was properly configured with your Twilio Trunk, see [Test your Trunk](/docs/sip-trunking/trunk-verification).

### Termination calls (Your PBX/SBC to the PSTN)

* [You are not getting any response to your SIP requests](#problem1)
* [You are getting `403 Forbidden` responses to your INVITE requests](#problem2)
* [You are getting '603 Decline' responses to your INVITE requests](#problem33)
* [The call fails with a '400 Invalid Phone Number' error](#problem5)
* [The call fails with a '400 The number is unverified' error](#problem20)
* [The call fails with a '415 Unsupported media type' error](#problem8)
* [The call fails with a '403 Invalid Caller ID' error](#problem20)
* [The call fails with a '403 Phone number is blocked for verification' error](#problem21)
* [The call fails with a '403 No International Authorization' error](#problem22)
* [The call fails with a '503 Trunk CPS limit exceeded' error](#problem23)
* [The call fails with a '503 Trunk concurrent call limit exceeded' error](#problem24)
* [The call connects, but drops after 20 or 30 seconds](#problem30)

### Origination calls (from PSTN to your PBX/SBC)

* [There is no audio and the call drops after 20 or 30 seconds](#problem4)
* [The call connects, but drops after 20 or 30 seconds](#problem9)
* [The call is being rejected by the PBX with a `401 Unauthorized` Error, or are reaching the PBX, but timing out with no response](#problem6)
* [The call is being rejected by the PBX with a '407 Proxy Authentication Required' Error](#problem31)
* [The call is reaching the PBX, but timing out with no response](#problem25)
* [The INVITE is reaching the PBX, but timing out with no response, and the INVITE is not showing in the PBX logs](#problem7)
* [The call fails with a '408 Request Timeout' error or '504 Request Timeout' error](#problem26)
* [The call fails with a '422 Session Timer Too Small' error](#problem27)
* [The call does not reach your PBX, and does not show up in your Twilio Call-Logs](#problem28)
* [Your call fails with a '415 Unsupported media type' error](#problem8)

### One way audio issues

* [The person out on the PSTN can hear the person on your PBX but not vice versa](#problem3)
* [The person on your PBX can hear the person on the PSTN end of the call, but not vice-versa](#problem29)

## Termination calls (Your PBX/SBC to the PSTN) \[#termination-calls--your-pbx-sbc-to-the-pstn-2]

### You are not getting any response to your SIP requests \[#problem1]

**Cause:** Your firewall is blocking the outbound SIP requests to Twilio.

* Open ports on your firewall as per our [IP addresses](/docs/sip-trunking#ip-addresses).

**Cause:** Your PBX cannot access a DNS server on the public internet.

* We will push the Termination URI that you specified on your trunk to public DNS servers. You either need to configure a local DNS server to resolve this URI or allow your PBX access to public DNS servers.

**Cause:** You are not putting the Termination URI in the Request-URI on INVITE requests that you send to Twilio.

* If your request URI doesn't reference the Termination URI you configured on your trunk, we will view your SIP messages as malicious and drop them. The Request-URI you send us needs to be `sip:<e.164 formatted phone number>@<your termination URI>`

### You are getting '403 Forbidden' responses to your INVITE requests \[#problem2]

**Cause:** There is an ACL on your trunk and you are sending us INVITE requests from an IP address not on that ACL.

* Check the received parameter on the Via header of the 403 response that we send you: it will tell you the IP address from which we are receiving your SIP request. Either fix local routing so that you are sending us SIP from an address already in your ACL or add this other address to your ACL

**Cause:** There is a Credentials List on your trunk, and your INVITE's Authentication Digest is incorrect due to wrong username/password

* Confirm that your username/password matches one in your Credentials List. A test is to remove the Credentials List and see if the call works with just an ACL.

**Tip:** You can tell which cause it is by which INVITE is getting the 403. If it is the initial, "digest-less" INVITE, the problem is most likely the ACL not matching. If it is the INVITE with an Auth digest (after a 407 Authentication required), the problem is most likely the credentials not matching.

### You are getting '603 Decline' responses to your INVITE requests \[#problem33]

**Cause:** Your Twilio account may not be active. This may be due to the account being closed or suspended due to lack of funds or violation of the Terms of Service or Acceptable Use Policy.

* Check your account balance. Refill funds if necessary.
* Contact Twilio Customer Support through [Twilio Console](https://1console.twilio.com), the [legacy Console](https://console.twilio.com/), or [Help Center](https://help.twilio.com/hc) to inquire further.

### The call fails with a '400 Invalid Phone Number' error \[#problem5]

**Cause:** When sending calls out through Twilio, you need to give us the dialed number in E.164 format.

* Update the configuration on your PBX so that it puts the dialed number in E.164 format

### The call fails with a '403 Invalid Caller ID' or a '400 the number is unverified ' \[#problem20]

**Cause:** Free Trial accounts are required to use a Twilio-verified Caller-ID for both the TO and FROM number.

* Be sure to format the To and From number in full E.164 format, including the + sign. For example, `+15005551212`. It cannot be `5005551212`, `15005551212`.
* Be sure to set the From number to either a Twilio number assigned to your account or a verified Caller-ID number, in your Twilio account.
* If a `Remote-Party-ID` is included in the INVITE, be sure it is also set to a valid Caller-ID, as described above.

### The call fails with a '403 Phone number is blocked for verification' error \[#problem21]

**Cause:** The destination number is blocked by Twilio

* Contact Twilio Customer Support through [Twilio Console](https://1console.twilio.com), the [legacy Console](https://console.twilio.com/), or [Help Center](https://help.twilio.com/hc) if you unknowingly blocked this number.

### The call fails with a '403 No International Authorization' error \[#problem22]

**Cause:** You are attempting to make a call to a country that has not been enabled under your account's Voice Geographic Permissions

* Set the allowed countries in your account's Voice Geo Permissions. In Twilio Console, go to **Products & services** > **Voice** > **Settings** > **[Geo permissions](https://1console.twilio.com/go?to=/account/__account__/us1/voice/settings/geo-permissions-settings)**. You can also find these settings in the [legacy Console](https://www.twilio.com/console/voice/settings/geo-permissions).

### The call fails with a '503 Trunk CPS limit exceeded' error \[#problem23]

**Cause:** You are generating Termination calls at a rate greater than the CPS that is set for your account; by default this is 1 Call Per Second. For new accounts the maximum number of calls per second (CPS) will depend on the account configuration. Trial accounts and accounts without an approved Business Profile are limited to 1 CPS; accounts with an approved Business Profile can self-serve up to 5 CPS. [About Business Profiles.](https://console.twilio.com/us1/account/trust-hub/customer-profiles)

* Alternatively, reduce the rate at which your SIP Infrastructure queues up Termination calls to Twilio

### The call fails with a '503 Trunk concurrent call limit exceeded' error \[#problem24]

**Cause:** You are using a Trunk on a Twilio Trial Account, and you have more than 4 concurrent active calls; or, you have upgraded your account but do not have an approved Business Profile.

* You can remove this restriction by upgrading to a Paid Account and submitting a Business Profile for approval. [About Business Profiles.](https://console.twilio.com/us1/account/trust-hub/customer-profiles)
* Alternatively, reduce the number of concurrent calls on your Twilio Trunk.

### The call connects, there is two-way audio, but the call drops after 20 or 30 seconds \[#problem30]

**Cause:** You SIP communications infrastructure is incorrectly Sending an ACK to Twilio using an IP address other than the Contact header's IP address found in Twilio's `200 OK` in the Request-URI. This causes Twilio to not process the ACK, so the transaction times out after 30 seconds, and the call is torn down via a BYE sent from Twilio's side to both sides of the call.

* Your SIP communications infrastructure should use the IP address in the Contact header of Twilio's `200 OK` in the Request-URI of the ACK, and send the ACK to the IP address in the Record-Route header of the same `200 OK`.

**Cause:** Your SIP communications infrastructure is incorrectly adjusting/replacing the Twilio Private IP addresses in the URI and headers of the ACK they return with their own Public IP addresses. This is causing Twilio to route the ACK back to the SIP communications infrastructure, and as such not process it. Because the ACK is not processed, Twilio (correctly) times out and tears down the call.

* Your SIP communications infrastructure should never replace any of Twilio's own IP addresses; they should only adjust their own IP addresses.

## Origination calls (from PSTN to your PBX/SBC) \[#origination-calls--from-pstn-to-your-pbx-sbc-2]

### On Origination calls (from PSTN to your PBX): there is no audio and the call drops after 20 or 30 seconds \[#problem4]

**Cause:** Your SIP infrastructure is replacing a Twilio-specific private IP address in a stacked Via header with a different IP address in a `200 OK`. This is likely due to a Global replacement of certain private IP ranges. This will cause the `200 OK` to be dropped inside Twilio's infrastructure, preventing an ACK from being sent, and causing your infrastructure to terminate the call.

* Your SIP infrastructure should not change the IP addresses in the Via headers when responding to an INVITE from Twilio.

### On Origination calls (from PSTN to your PBX): there is two-way audio, but the call drops after 20 or 30 seconds \[#problem9]

**Cause:** Your SIP infrastructure is returning a `200 OK` with a Contact header which contains a Private IP Address. As Twilio is required to send the ACK back to the IP Address in the Contact header, the ACK is being sent out to that Private IP Address. Since Private IP Addresses are not publicly routable, the ACK never reaches your SIP Infrastructure, so the call times out on that end and is torn down.

* Your SIP infrastructure should use Publicly Routable IP addresses in the Contact header when responding to an INVITE from Twilio.

### On Origination calls (from PSTN to your PBX): The call is being rejected by the PBX with a '401 Unauthorized' Error, or are reaching the PBX, but timing out with no response \[#problem6]

**Cause:** Your PBX does not have the Twilio SIP Trunking IP addresses configured as Peers.

* Update the configuration on your PBX so that the Twilio SIP Trunking signaling IP addresses for each applicable region are Trusted Peers. Addresses are per our [IP addresses](/docs/sip-trunking#ip-addresses).

### The call is being rejected by the PBX with a '407 Proxy Authentication Required' Error \[#problem31]

**Cause:** Your PBX does not have the Twilio SIP Trunking IP addresses configured/allowed as Peers.

* Update the configuration on your PBX so that the Twilio SIP Trunking signaling IP addresses for each applicable region are Trusted Peers. Addresses are per our [IP addresses](/docs/sip-trunking#ip-addresses).

### The call is reaching the PBX, but timing out with no response \[#problem25]

**Cause:** Your PBX does not have the Twilio SIP Trunking IP addresses configured/allowed as Peers.

* Update the configuration on your PBX so that the Twilio SIP Trunking signaling IP addresses for each applicable region are Trusted Peers. Addresses are per our [IP addresses](/docs/sip-trunking#ip-addresses).

### The call fails with a '408 Request Timeout' error or '504 Request Timeout' error \[#problem26]

**Cause:** Twilio is getting no response from your SIP infrastructure

* Confirm that the SIP URI you have configured for your Trunk's Origination settings is correct.
* Check your firewall to be sure the Twilio [IP addresses and ports](/docs/sip-trunking#ip-addresses) are allowed
* Check your PBX to be sure the Twilio [IP addresses and ports](/docs/sip-trunking#ip-addresses) are allowed

### The call fails with a '422 Session Timer Too Small' error \[#problem27]

**Cause:** The customer's PBX is set up with a Session-Expires value which is larger than what is in the INVITE. Possible issues are:

* The customer's PBX has a very large Session-Expires value configured.
* The Carrier INVITE has a very small Session-Expires configured.

Twilio does not support Session-Timers at this time, so we remove the `Supported: Timer` header. As such, the Session-Expires value really should be ignored by the PBX, but many do not do so. As a workaround, you should lower your PBX `Session-Expires` value to something reasonable like the usual defaults of 1800 or 3600.

### The call does not reach your PBX, and does not show up in your Twilio Call-Logs \[#problem28]

**Cause:** Your have either not configured an Origination SIP URI for your Twilio SIP Trunk, or have configured a "bad" SIP URI that does not resolve

* Confirm that you have configured a valid, routable SIP URI for Origination.

### Your call fails with a '415 Unsupported media type' error \[#problem8]

**Cause:** Your SIP infrastructure does not list G.711 μ-law (PCMU) or A-law (PCMA) in its supported Codecs. Twilio currently supports only G.711 μ-law (PCMU) or A-law (PCMA) codecs.

* Make sure your SIP infrastructure supports G.711 μ-law (PCMU) or A-law (PCMA).

### On Origination calls (from PSTN to your PBX): The INVITE is reaching the PBX, but timing out with no response, and the INVITE is not showing in the PBX logs \[#problem7]

**Cause:** Your firewall does not have the Twilio SIP Trunking IP addresses allowed.

* Update the configuration on your firewall so that the Twilio SIP Trunking signaling IP addresses for each applicable region are allowed. Addresses are per our [IP addresses](/docs/sip-trunking#ip-addresses).

## One way audio issues \[#one-way-audio-issues-2]

### The person out on the PSTN can hear the person on your PBX but not vice versa \[#problem3]

**Cause:** Your PBX is putting it's LAN IP address into the SDP it sends to Twilio

* Update the configuration on your PBX so that it puts its WAN IP address in the SDP

**Cause:** Your firewall is blocking RTP packets from Twilio

* Update your firewall to allow/pass RTP from Twilio IP/ports as per our [IP addresses](/docs/sip-trunking#ip-addresses).

### The person on your PBX can hear the person on the PSTN end of the call, but not vice-versa \[#problem29]

**Cause:** Your firewall is blocking RTP packets from your PBX to Twilio

* Update your firewall to allow/pass RTP from your PBX IP addresses and ports

**Cause:** Your Internet Provider is blocking RTP packets from your PBX to Twilio

* Contact your Internet Provider to have them allow/pass RTP from your PBX IP addresses and ports

**Cause:** Your RTP packets are taking a route that reduces the TTL on the packets to a value too low to make it through Twilio's infrastructure (10 or less).
