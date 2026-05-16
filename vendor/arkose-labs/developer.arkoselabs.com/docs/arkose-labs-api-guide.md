# Arkose Labs API Guide

> ⚠️ API Policy
>
> Arkose Labs will fully support the current version of Arkose Labs’ API ( “API”) as well as the API version that is one version prior to the current version. Arkose Labs reserves the right to move unsupported API versions (i.e. two or more versions prior to the current version) to End-of-Life (“EoL”) and End-of-Support (“EoS”) status, and will notify its clients in writing at least sixty (60) days prior to transitioning any unsupported API version to EoL and/or EoS status, as applicable.

## Overview

This is an overview of the APIs exposed to customers on the Arkose Bot Manager, with a sample scenario for each. Note that some APIs are not applicable to our detection component; these are noted in their entries. Otherwise, both detection and enforcement use the API.

## Client API

The Client API is used on an application's client-side. It sets up the session, runs the detection engine, and determines if a session should receive an Enforcement Challenge (EC). If so, it loads a script that controls and runs the EC process. The EC actions do not apply for detection.

### Scenario

A user tries to sign on to a website. The application's app/webpage contacts the Arkose Labs server via the Client API in order to provide collected signals, create a session, run the detection engine, and, if running our enforcement component, determine if an EC is served. The Client API's response determines whether an EC is served. If so, a script is loaded that controls the EC process. The Client API's response provides a session verification token to validate on the server-side for detection metrics.

### More Information

For more information about the Client API and how to use it, see the [Client-Side Instructions](https://developer.arkoselabs.com/docs/standard-setup).

## Verify Response API

The Verify Response API verifies a session for both  our detection and enforcement components, the latter after the EC process. For security reasons, it is always called from the server-side. It is called for each session with the private key and session token, whether or not an EC was presented.

The response indicates if the session was verified. It can be in a simple 1 or 0 format, or in a full JSON format. The server-side code deals with handling the response.

### Scenario 1

A user tries to sign on to a website. No EC is presented, either because the site is running our detection component or because our enforcement component decides not to serve them an EC. The Verify Response API is called to validate the session token, with the verification response passed back to the customer’s server.

### Scenario 2

A user tries to sign on to a website configured with Arkose enforcement component. Our enforcement component decides to serve them an EC. The user completes the challenge. The Verify Response API is called to inspect the user’s actions and check their response, with the verification response passed back to the customer’s server.

### Scenario 3

A user tries to sign on to a website configured for detection. Arkose Bot Manager runs its detection engine. After completion, the Verify Response API is called to inspect the user’s response, with the verification response passed back to the customer’s server.

### More Information

For more information about the Verify Response API and how to use it, see [Server-Side Instructions](https://developer.arkoselabs.com/docs/server-side-instructions-v4)

## Data Exchange: Enhanced Detection and API Source Validation

The Data Exchange feature is a payload on the Verify Response API. Customers can pass pre-defined parameters between the customer’s servers and Arkose Labs' servers. The information can indicate a level of suspicion of the user, or it can pass information a customer knows about the user to supplement Arkose Labs' own data. In addition, customers can use it for API source validation.

Data Exchange information is encrypted using AES-256-GCM, which prevents fraudsters from data tampering.

### Scenario 1: Supplementing Arkose Bot Manager with additional flow-specific data.

Additional telemetry may be available in various customer flows that are not available to Arkose. Enhancing our standard telemetry with these fields can make Arkose detection more powerful. It can also make it easy to “sync up” on traffic segments between Arkose’s data and the customer’s for monitoring or pressuring purposes.

### Scenario 2: Catching handovers by cross-checking standard Arkose telemetry.

Attackers may use general-purpose tools or services to attempt to get around Arkose Bot Manager. These can appear very much like legitimate traffic. Such attacks generally involve a handover between a special-purpose attack targeted at the customer and a general-purpose service. But it is extremely difficult to do a seamless handover as they almost always have different signatures. By cross-checking what Arkose sees against what the customer sees, Arkose can far more effectively detect handovers.

### Scenario 3: API Source Validation

API Source Validation is an extension to Data Exchange. It prevents non-legitimate traffic from using the Arkose Labs API. In addition to stopping that kind of abuse, it also prevents those sessions from counting against a customer’s contractual API quota.

### More Information

For more information about how to set up and use data exchange, see the [Data Exchange Knowledge Base page](https://support.arkoselabs.com/hc/en-us/articles/4410529474323-Data-Exchange-Enhanced-Detection-and-API-Source-Validation) (requires an Arkose Labs support login to access).

## Truth Data API

The Truth Data API lets customers provide feedback about the accuracy of Arkose Labs' session analysis. There are two Truth Data APIs - one for legit sessions and one for non-legit sessions.

### Legit Sessions

Use the Truth Data API for legit sessions when our enforcement component challenged a user, but the customer, based on their own data, thinks they should not have been challenged. The customer sends session information back to the legit session API endpoint so Arkose can analyze the details. Not applicable for detection.

#### Scenario

A user tries to sign in to a website. Our enforcement component presents them with an EC. When the customer analyzes their data, they disagree that the user should have been challenged. The customer sends the session details to the legit sessions API for evaluation by Arkose's analysts. Not applicable for detection.

### Non-legit Sessions

Use the Truth Data API to notify Arkose Labs when a fraudster successfully completes a session. The customer sends session information back to the non-legit session API endpoint so Arkose can analyze the details.

#### Scenario

A fraudster tries to sign in to a website. They are not classified as a high risk session Arkose Bot Manager and they get through. The customer sends the session details to the non-legit sessions API for evaluation by Arkose's analysts.

### More Information

For more information about the Truth Data API and how to use it, see the [Truth Data API Knowledge Base page](https://support.arkoselabs.com/hc/en-us/articles/4410720074771-Truth-Data-System) (requires an Arkose Labs support login to access).

## Real-Time Logging (RTL)

Real-Time Logging (RTL) is a collection of detailed user activity logs from Arkose Labs servers. It is sent asynchronously, with only a few seconds delay, to wherever the customer specifies. This can be a customer's server or a third-party service that digests and packages logging data for analysis. RTL data is raw and uninterpreted so customers can interpret the Arkose Bot Manager's effectiveness. However, the data needs to be filtered to gain the best insights into what it is telling you.

RTL provides a complete picture of all of a customer’s traffic that created an Arkose session. The Verify API only provides a subset of that information e.g. the user abandons a session before verification with Arkose.

RTL data consists of events. An event covers the entire user experience, from session creation to conclusion.  They include telemetry data about the user, including what we know from their presence elsewhere on the Arkose Labs network.

### Scenario 1: Fraudster Traffic

A customer wants to discover trends in their site's traffic due to fraudsters. They receive RTL data and by filtering, separate out the fraudster traffic. Since this traffic tends to create a lot of noise, they also filter that out. They analyze this data to reveal information about different types of fraudsters.

### Scenario 2: Non-Suspicious Traffic

A customer wants to discover insights about non-suspicious users and their traffic on the site. They receive RTL data and filter out the fraudster traffic, leaving the traffic from non-suspicious users. They then analyze this data and its trends to reveal information about their good users.

### More Information

For more information about Real-Time Logging and how to use it, see the [Real-Time Logging Knowledge Base page](https://support.arkoselabs.com/hc/en-us/articles/4407820258835-Real-Time-Logging) (requires an Arkose Labs support login to access).