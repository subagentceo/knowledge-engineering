# What is an SMS Gateway?

An *SMS Gateway* enables a computer to send and receive SMS text messages to and from an SMS capable device over the global telecommunications network (normally to a mobile phone). The SMS Gateway translates the message sent, and makes it compatible for delivery over the network to be able to reach the recipient.

## Evolution of SMS Gateways

At one point, SMS Gateways were actual physical pieces of hardware with SIM cards and embedded radios. Each SMS Gateway was individually connected to mobile phone networks to send text messages in a very similar way to a regular cellular phone.

Nowadays, modern SMS Gateways usually route SMS text messages to the telco networks via an SMPP interface that networks expose, either directly or via an aggregator that sells messages to multiple networks.

SMPP, or *Short Message Peer-to-Peer,* is a protocol for exchanging SMS messages between Short Message Service Centers (SMSCs) and/or External Short Messaging Entities (ESMEs).

Computers can interact with SMS Gateways in multiple ways:

* Through a REST API, where software developers send and receive SMS text messages over HTTP to the REST API, like [Twilio Programmable SMS](https://www.twilio.com/en-us/messaging/channels/sms)
* Using a Web Page or Software, where customers upload their messages and list of phone numbers
