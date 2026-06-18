# Media Security

Twilio Programmable Video is based on the open standard WebRTC protocol. The security architecture is described [here](https://webrtc.org/) and the protocols used include TLS, DTLS, and SRTP. All communication between a Programmable Video client and the Twilio cloud is encrypted.

Each Participant in a Room has its own private key exchanged with the media server using DTLS 1.2/SRTP. All media published to or subscribed from the Room is transported through this secure connection. The encryption key exchange uses a technique known as Perfect Forward Secrecy (PFS).

In cases where TLS is required to establish the media path only TLS 1.2 is supported. The following is the supported cipher suite:

* ECDHE-ECDSA-AES128-GCM-SHA256
* ECDHE-RSA-AES128-GCM-SHA256
* ECDHE-ECDSA-AES256-GCM-SHA384
* ECDHE-RSA-AES256-GCM-SHA384
* DHE-RSA-AES128-GCM-SHA256
* DHE-RSA-AES256-GCM-SHA384
