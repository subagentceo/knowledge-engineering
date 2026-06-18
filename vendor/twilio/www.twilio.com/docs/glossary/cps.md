# CPS

Calls per second

The rate at which outbound calls are executed for a given account. By default each account is granted 1 CPS for Programmable Voice API calls and 1 CPS per trunk per region for Elastic SIP Trunking calls. Inbound calls and \<Dial> calls are not limited by CPS.

CPS can be managed in Console under Voice -> Settings -> General for Programmable Voice, and under Elastic SIP Trunking -> Trunk Name -> Termination. New accounts without an approved Business Profile cannot self-serve calls per second (CPS). [About Business Profiles](https://console.twilio.com/us1/account/trust-hub/customer-profiles).

In aggregate calls are executed at the rate defined by the CPS. Individual calls may not execute at the anticipated rate — you may see individual seconds with more or fewer CPS, especially for bursty traffic — but over a month the call execution rate will average the CPS rate set for that account or trunk.
