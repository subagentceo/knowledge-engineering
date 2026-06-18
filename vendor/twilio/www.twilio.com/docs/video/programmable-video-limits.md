# Programmable Video Quotas and Limits

## Overview

The Programmable Video service operates within certain quotas and limits that ensure a reliable and consistent operation. Quotas are account based and can be increased on request, whereas limits are system wide and independent of the account.

## Room and Participant Account Quotas

|                                        | **Default Quota [^1]** | **Notes**                                                                 |
| -------------------------------------- | ---------------------- | ------------------------------------------------------------------------- |
| Max Concurrent Rooms                   | 10,000 [^1]            | Maximum Rooms that can be in-flight at the same time                      |
| Max Concurrent Participants            | 10,000                 | Maximum Participants that can be connected to your Rooms at the same time |
| Max REST API Read Requests per second  | 80                     | Maximum Read requests, e.g get Room, get list of Participants, etc.       |
| Max REST API Write Requests per second | 20                     | Maximum Write requests, e.g create Room, update Participant, etc.         |

[^1]: More information on these quotas and how to design your application with these in mind can be found on the [Guide to Scaling Applications page](/docs/video/guide-to-scaling-applications). Should you need an increase then contact [sales](mailto:sales@twilio.com).

## Room and Participant System Limits

Below are the standard Room and Participant limits for Video Rooms:

* Maximum Participants: 50
  * Rooms can support up to 35 PSTN Participants. Learn more about [adding Programmable Voice Participants to Video Rooms](/docs/video/adding-programmable-voice-participants-video-rooms).
* Maximum Participant duration: 24 hours
* Maximum Room duration: 24 hours
* TURN server usage: Unlimited
* Maximum Room name length: 128 characters
* Maximum Participant identity length: 128 characters
* Maximum Track name length: 128 characters

## Room Track Limits

### Participant Bandwidth Limits

Below are the bandwidth limits for each Participant in a Room:

* Publisher bandwidth per Participant: 20,000 Kbps
* Subscription bandwidth per Participant: 4,000 Kbps

### Recommended Track Limits per Room

Below are the recommended limits for total tracks by media type per Room:

* Maximum audio track publications per Room: 60
* Maximum video track publications per Room: 60
* Maximum data track publications per Room: 50

### Recommended Track Limits per Participant

Below are the recommended limits for subscribed tracks per Participant:

* Maximum audio track subscriptions per Participant: 60
* Maximum video track subscriptions per Participant: 60
  * While it is possible to subscribe to many video tracks it is recommended that you limit the number of subscribed video tracks that receive media by using [clientTrackSwitchOffControl](/docs/video/tutorials/using-bandwidth-profile-api#understanding-clientTrackSwitchOffControl) when connecting to a Room using the network bandwidth profile.
* Maximum data track subscriptions per Participant: 49

Below are the recommended limits for published tracks per Participant:

* Maximum audio track publications per Participant: 2
* Maximum video track publications per Participant: 6
* Maximum data track publications per Participant: 1
