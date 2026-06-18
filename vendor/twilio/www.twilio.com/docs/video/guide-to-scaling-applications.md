# Guide to Scaling Applications

## Overview

This section describes some implementation considerations for your video application to allow it to scale efficiently with Twilio; the account quotas are in place to help protect the Twilio Video platform from unnecessarily created Rooms through things like runaway processes, not to hinder your application from expanding. The Twilio Video platform is designed to scale with you as you grow.

When designing your video application for scale it is important to consider the efficient use of resources. The Twilio Video product has some preset Room and participant quotas on each account when it is created. In general these quotas can be updated to ensure there is plenty of room for your application to grow. The default quotas are documented [here](/docs/video/programmable-video-limits#room-and-participant-account-quotas).

The concurrent Room and participant quotas as well as the request rate quotas are specific to each individual account SID, meaning that they are not shared with [subaccounts](https://help.twilio.com/hc/en-us/articles/223136587-What-is-a-subaccount-). All of these quotas can be increased by [talking to sales](https://www.twilio.com/en-us/help/sales). The following are some additional considerations and troubleshooting steps.

## Concurrency Quota Considerations

There are two dimensions to consider when looking at concurrency:

1. The number of Rooms that are simultaneously in place to hold users of your application.
2. The total number of users that can be using your application at the same time; this is measured as the concurrent participants.

There are some considerations that could help your application better fit into these account quotas.

**Concurrent Rooms**

1. Consider looking over how many Rooms are being created, especially compared to that of the number of concurrent participants. If you are hitting the concurrent Rooms quota before the concurrent participant quota, then you are likely creating more Rooms than needed. Using [Ad-hoc Rooms](/docs/video/tutorials/understanding-video-rooms#comparing-rest-vs-ad-hoc-rooms) is a good way to solve this, since it only makes a Room when a participant is trying to join.
2. Rooms created via the REST API are automatically closed after 5 minutes of having no participants inside of them; this ensures Twilio cleans up open Rooms to not hit this limit as easily. Consider closing Rooms immediately after all participants leave to help eliminate unnecessary Rooms; this could be done by using [Ad-hoc Rooms](/docs/video/tutorials/understanding-video-rooms#comparing-rest-vs-ad-hoc-rooms) instead of creating them through the REST API.
3. [Talk to sales](https://www.twilio.com/en-us/help/sales) if this quota still needs to be increased.

**Concurrent Participants**

1. Concurrent participants is the number of participants that are connected in all Rooms in an account at any one point in time. Therefore the total number of people attending an event may not be equal to the peak concurrent participants, as participants may be leaving the event early or joining late. Do consider this when requesting an increase to the concurrent participant quota.
2. [Talk to sales](https://www.twilio.com/en-us/help/sales) if this quota needs to be increased.

When approaching either of these concurrency quotas, there will be a [53121 warning](/docs/api/errors/53121) that will show up in the Twilio Console when you have reached 70% of your concurrency quota. If you would like an email or webhook alert when this warning is fired, then see [this article on creating alert triggers.](https://help.twilio.com/hc/en-us/articles/223183788-Create-or-change-Twilio-Monitor-Alert-triggers) Applications should be set up to receive this and notify the developer to take one of the steps above before they receive a [53119 error](/docs/api/errors/53119) (for Room concurrency) or a [53206 error](/docs/api/errors/53206) (for participant concurrency).

## REST API Request Quota Considerations

**Read Requests**

1. Implementing [StatusCallbacks](/docs/video/api/status-callbacks#overview) for different events will decrease the number of REST API requests needed as Twilio will automatically send the corresponding events as they occur. See this documentation on [Avoiding Unnecessary Fetching](/docs/usage/rest-api-best-practices#avoid-unnecessary-fetching) to learn more.
2. [Talk to sales](https://www.twilio.com/en-us/help/sales) if this quota still needs to be increased.

**Write Requests**

1. If you are creating Rooms through the REST API, then using [Ad-hoc Rooms](/docs/video/tutorials/understanding-video-rooms#comparing-rest-vs-ad-hoc-rooms) can decrease the number of Write requests that you are making to the Video service.
2. [Talk to sales](https://www.twilio.com/en-us/help/sales) if this quota still needs to be increased.

If you are using multiple Twilio products and run into a [20429 error](/docs/api/errors/20429), the first step is to be sure that you are hitting the concurrency quota of the Twilio Video and not the [API concurrency limit of the Twilio platform](/docs/usage/rest-api-best-practices); when just using the Video product, you will run into the product's requests per second quota before you run into the platform concurrency limit. In either case, rely on callbacks instead of unnecessarily fetching data using the API, as well as implementing retries with exponential backoff; both of these methods are detailed in [this support article.](https://help.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests-)
