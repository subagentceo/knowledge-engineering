# Segment

## Introduction

The Segment AuthKit Add-on allows you to register AuthKit as a Segment source and receive events about logins, sign ups, and many other AuthKit activities. You can forward that data to your Segment destinations, allowing you to better understand the effectiveness of your marketing campaigns and your users' full journeys across your website and AuthKit.

***

## Configuring the Add-on

### (1) Confirm your domain

To use the Add-on, your [Authentication API Domain](https://workos.com/docs/custom-domains/auth-api) must share the same root as the domain where you set up Segment through Analytics.js. This gives the Add-on access to your users' anonymous IDs, which the Add-on uses to identify users.

For example, if your Segment Analytics.js script lives at www.example.com:

- **Valid:** auth.example.com is a valid Authentication API Domain
- **Invalid:** auth.workos.com is not a valid Authentication API Domain

### (2) Visit the Add-ons page

In the WorkOS Dashboard, click the *Authentication* icon in the sidebar. Then click *Add-ons*.

![Add-ons page in the Authentication section of the WorkOS Dashboard](https://images.workoscdn.com/images/d5b867bb-8f04-440b-8443-4f9a1026a0cb.png?auto=format\&fit=clip\&q=50)

### (3) Enable the Add-on

Click *Enable* next to *Segment.*

![Segment modal containing a Write Key field in the WorkOS Dashboard](https://images.workoscdn.com/images/18d3da6b-0b59-4973-8a71-851e1ad4e5dc.png?auto=format\&fit=clip\&q=50)

In another browser tab, visit Segment to get your credentials. Click *Connections* in the left sidebar.

![Connections link in Segment](https://images.workoscdn.com/images/78899ff2-be15-4fc0-a9d4-1482af04703e.png?auto=format\&fit=clip\&q=50)

Next to *Sources*, click *Add more*.

![Add more link on the Connections page in Segment](https://images.workoscdn.com/images/5feab1ce-89d3-4998-b16e-9ffdb48b4b0f.png?auto=format\&fit=clip\&q=50)

Under *Choose a Source*, search "HTTP API." Below, click *HTTP API*. Then, in the lower right corner, click *Next.*

![HTTP API source in Segment](https://images.workoscdn.com/images/c6be5d31-307f-4371-82de-9486a034f478.png?auto=format\&fit=clip\&q=50)

Under *Create your source*, give your source a name, like *WorkOS AuthKit Add-on*. Click *Create Source*. Under *Configure this source in your HTTP API codebase*, find your *Write Key*, and click the *Copy* button next to it.

![Copy button next to a new Write Key for an HTTP API source in Segment](https://images.workoscdn.com/images/82093be1-5a27-4985-bdef-ce3899832ee6.png?auto=format\&fit=clip\&q=50)

Paste your write key in the *Write Key* field in the WorkOS Dashboard. Click *Save changes*. The Segment AuthKit Add-on is enabled and will begin sending AuthKit events to Segment.

***

## Events sent to Segment

The Add-on sends events to Segment when certain [WorkOS Events](https://workos.com/docs/events) occur:

- *Authentication* events
- *Email verification* events
- *Magic Auth* events
- *Password reset* events
- `session.created`
- `user.created`

All names of events in Segment will match the names of the [WorkOS Events](https://workos.com/docs/events).

***

## Verifying events

After enabling the Add-on, visit your website, click your sign in button, and sign in to your application. Visit Segment and click *Connections* in the sidebar. Click the source you created. Then click the *Debugger* tab. You should see an identify call including your anonymous ID and a track call with an authentication event.

If you do not see an authentication event, visit the Add-ons page in the WorkOS Dashboard to verify your Write Key matches the value from Segment. If after confirming the values match you still need support, please reach out to us in Slack.
