# Test your Elastic SIP Trunk

* [Test your Trunk for Termination](#verify-termination)
* [Test your Trunk for Origination](#verify-origination)
* [Test your Numbers for Emergency Calling](#verify-emergency)

## Test your Trunk for Termination \[#verify-termination]

If you want to practice making a call and check that your communications
infrastructure was properly configured with your Twilio Trunk, you can make a
test call to our friendly assistant `Play`. She will prompt you to record a
message, and then play it back for you - you will know right away if your
configuration is working.

Below, you will find the phone numbers you can use to reach `Play` and test your
Elastic SIP Trunk. These numbers may only be called via your Twilio Trunk and
are free of charge.

### United States

* `+1(650)4-TWILIO` (`+1(650)489-4546`)
* `+1(415)475-TEST` (`+1(415)475-8378`)

### Europe

* `+44-1-61-850-TEST` (`+44-1-61-850-8378`)

### South America

* `+55-1-940-42-22-55`

### Diagnosing common problems: \[#diagnose-termination]

* If your call didn't go through successfully, heard no ringing tone and/or simply got disconnected you probably have a problem with the number format you are using; please check that you're using [standard E.164 format][E164]. Or you may have a problem with your Authentication settings (see [Termination settings][termination]) or your communications infrastructure configuration (see [Configuration Guides][guides]). It is advisable to look at your communications infrastructure logs and/or PCAP which may indicate how the call failed.
* If you heard a ringing tone but didn't hear `Play's` voice, you probably have an IP addressing issue for the media ranges. Please make sure you're using your public IP addresses in your SIP/SDP and re-check your Firewall settings (see [IP addresses][ip-addresses]).
* If you heard `Play's` voice but didn't hear your own recorded message played back, you probably have a problem with your Firewall settings (see [IP addresses][ip-addresses]) or your communications infrastructure configuration (see [Configuration Guides][guides]).
* If you heard `Play's` voice and heard your recorded message, then your configuration is working just fine and you're good to go!

If you are still encountering issues, check out our
[Troubleshooting your Trunk](/docs/sip-trunking/troubleshooting) page, where you
can find some common issues you might encounter when configuring your Elastic SIP Trunk.

## Test your Trunk for Origination \[#verify-origination]

If you want to check that your communications infrastructure was properly configured to receive incoming calls from the PSTN via your Twilio Trunk, you can have our friendly assistant `Play` place a test call to any of your Numbers associated with this Trunk. She will prompt you to record a message, and then play it back for you - you will know right away if your configuration is working.
Test a Trunking Origination Call by selecting the number you want `Play` to call, and clicking on `Make a test call`: Test Complete!

If your phone rang, and you heard `Play's` voice and heard your recorded message, then your configuration is working just fine and you're good to go!

### Diagnosing common problems: \[#diagnose-origination]

* If your phone rang, you picked up but didn't hear `Play's` voice, you probably have an IP addressing issue for the media ranges. Please make sure you're using your public IP addresses in your SIP/SDP and re-check your Firewall settings (see [IP addresses][ip-addresses]).
* If your call didn't go through successfully, heard no ringing tone in 30 seconds on your phone and/or simply got disconnected you probably have a problem with your Firewall settings (see [IP addresses][ip-addresses]) or your communications infrastructure configuration (see [Configuration Guides][guides]).

#### Testing Your Caller Name Lookup

For Caller Name Lookup setup please ([CNAM][CNAM]).

Once you have saved changes to your Trunk in your Twilio Console, you should test Caller Name Lookups using a PBX enabled phone line.

To test this feature, first ensure that your phone line is connected to a Trunk where Caller Name Lookups are enabled.

Using an outside phone line that is connected to the PSTN (such as a personal cell-phone) place a call to the phone line, and you should expect to see your name in the 'From' or "P-Asserted Identity" header of the SIP INVITE for the incoming call.

Finally, check your Twilio Console Call log (Elastic SIP Trunking > Logs) and confirm to see that the Caller Name appears along with the telephone number in the 'From' column.

#### Things to Watch Out for

* Caller Name Lookups are enabled on a per-trunk basis.
* Please ensure you enable Caller Name Lookups for each trunk on which you wish to see incoming Caller ID.
* Caller Name Lookup only searches parameters sent in the "From" or "P-Asserted Identity" headers, this does not include remote-party ID

Note that Caller Name lookups for US/CAN numbers are billed per lookup, even if data may not be available. Currently, requesting Caller Name Lookup for international numbers will return null values, but will not be billed.

## Test your Numbers for Emergency Calling \[#verify-emergency]

You can check that your communications infrastructure was properly configured with your Twilio Numbers for Emergency Calling by placing a test call, click [here][911test] for details.

[guides]: /docs/sip-trunking/sample-configuration

[ip-addresses]: /docs/sip-trunking#ip-addresses

[termination]: /docs/sip-trunking#termination

[E164]: https://en.wikipedia.org/wiki/E.164

[911test]: /docs/sip-trunking/emergency-calling

[CNAM]: /docs/sip-trunking#CNAM
