# Moving to Proxy Beta from Developer Preview

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

Proxy is now available in **beta**. If you are a customer who previously used the **developer preview** version of Proxy, you will need to update your code to use the new version.

There is no data migration between the preview version and the beta version. All objects must be created anew.

## Changes from preview to beta

Here we've collected the largest sticking points to keep in mind when moving your application to beta from developer preview. These sections detail how to

### Create a new Service using Proxy public beta

Via the API, the URL for Proxy changes.

#### NEW Beta version

`https://proxy.twilio.com/v1/Services`

#### (OLD Preview version)

`https://preview.twilio.com/Proxy/Services`

In the SDKs, the pattern is to drop the `preview` reference in your code.

For example, in Node.js, the code for creating a Service changes from:

#### New Node.js beta example

```bash
client.proxy.services
  .create({
    uniqueName: 'My Awesome Service',
    callbackUrl: 'https://www.example.com/',
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
```

#### (Old Node.js preview code)

```bash
client.preview.proxy.services.create(

   friendly_name: 'My Awesome Service',

   callback_url: 'https://www.example.com/'

)
```

**NOTE:** `friendly_name` is now `unique_name`. *This is a required change in Proxy beta!*\
For examples in all six supported languages and cURL on how to make this change, refer to [the quickstart guide](/docs/proxy/quickstart).

## Phone number migration

To add phone numbers to your new service, follow the steps in [the updated quickstart guide](/docs/proxy/quickstart). If you add phone numbers to the beta service currently attached to your developer preview service, they will move to be associated with the newly created service.

## Proxy beta resource specific changes

Also note the changes for Proxy Beta on specific *resources*. This page details the changes you'll need to make note of while moving to beta.

### Service

See the [REST resource page for Proxy Service](/docs/proxy/api/service) for descriptions of the new parameter features.

| **Old field** | **New field**           | **Notes**                          |
| ------------- | ----------------------- | ---------------------------------- |
| FriendlyName  | UniqueName              | Must be a unique name per service. |
|               | OutOfSessionCallbackUrl |                                    |
|               | InterceptCallbackUrl    |                                    |
|               | GeoMatchLevel           |                                    |
|               | NumberSelectionBehavior |                                    |
|               | DefaultTtl              |                                    |

### Session

See the REST resource page for Proxy Session for descriptions of the new parameter features.

| **Old field** | **New field**       | **Notes** |
| ------------- | ------------------- | --------- |
| StartTime     | DateStarted         |           |
| EndTime       | DateEnded           |           |
|               | Mode                |           |
|               | DateLastInteraction |           |
|               | ClosedReason        |           |

### Interaction

See the REST resource page for Proxy Interaction for a description of `Data`.

| **Old field** | **New field** | **Notes** |
| ------------- | ------------- | --------- |
| Description   | Data          |           |

### Participant

See the REST resource page for Proxy Participant for a description of `DateDeleted`.

| **Old field** | **New field** | **Notes** |
| ------------- | ------------- | --------- |
|               | DateDeleted   |           |
