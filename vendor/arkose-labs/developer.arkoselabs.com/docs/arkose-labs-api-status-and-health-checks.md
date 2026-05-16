# Troubleshooting, API Status, and Health Checks

This page tells you:

* How to check on whether the Arkose Labs APIs are up.
* How to see regional health checks.
* How to troubleshoot problems with Arkose Bot Manager.
* How to handle errors you may encounter.

Note the following terminology:

**Fail-Open**: When we want the overall process to proceed, even when failure conditions for Arkose Titan are present.

**Fail-Close**: When we want to block the workflow (retry, hard no-go), because failure conditions for Arkose Titan are present.

In general, we recommend that you write your integration with Arkose Titan so that, in the rare event of a disruption of our servers, your system fails-open.

## Fail-Open Options: Reducing the Impact of Arkose API Service Disruption

We recommend you integrate and configure Arkose APIs so that they can be bypassed in the rare event of any Arkose API-related service disruption. The following sections discuss options for this and how to troubleshoot customer issues.

### Feature Flag

When writing your integration of Arkose Titan with your system:

1. Set up a Feature Flag or key that can turn off Arkose Labs Enforcement on both the Server and Client.

2. If the below issues/symptoms occur, call the Status API as shown later on this page.

3. If the Status response indicates a problem at Arkose Labs, use the Feature Flag to turn off Enforcement.

4. Periodically recheck Arkose’s status.

5. When it returns to being operational, use the Feature Flag to turn Enforcement back on.

### Client-Side Troubleshooting

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Issue
      </th>

      <th>
        Symptoms
      </th>

      <th>
        Mitigation Suggestions
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        The Arkose JS API script does not load.
      </td>

      <td>
        The `onReady` callback will **NOT** be called.
      </td>

      <td>
        1. Implement a timer that checks if the onReady callback has been triggered. If not:

           a. Ask the user to refresh the page

           b. Retry loading the Arkose API Script

        2. Use the Arkose Labs Status API to check for service issues. Based on the response (`none`, `partial`, `outage`), take customer specific action as necessary.
      </td>
    </tr>

    <tr>
      <td>
        The Arkose API runs, but fails session creation due to not being able to communicate with the Arkose servers.
      </td>

      <td>
        The `onError` callback is triggered.
      </td>

      <td>
        1. When the `onError` callback is triggered, call `reset `to retry creating the session. Then  run methods on the Arkose Enforcement Object.

        2. If `onError` is triggered multiple times, use the Arkose Labs Status API to check for service issues. Based on the response (`none`, `partial`, `outage`), take customer specific action as necessary.
      </td>
    </tr>

    <tr>
      <td>
        An Enforcement Challenge is shown, but there is a communication error between the EC and the Arkose servers.
      </td>

      <td>
        The EC shows an error screen, such as:

        `The connection to a verification server was interrupted. To prove you're not a spammer, please refresh this page`

        The EC automatically tries to reconnect with the Arkose servers and continue once it does
      </td>

      <td>
        1. Retry session creation by calling the `reset()` method on the Arkose Enforcement Object

           a. In lightbox mode, if the lightbox has been opened, `reset()` closes the lightbox and resets the challenge. To reopen it, call `run()`. However, if the error is thrown before the lightbox is triggered to open, just call `reset()`.

        2. Use the Arkose Labs Status API to check for service issues. Based on the response (`none`, `partial`, `outage`), take customer specific action as necessary.
      </td>
    </tr>
  </tbody>
</Table>

### Server-Side

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Symptoms
      </th>

      <th>
        Mitigation Suggestions
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Unexpectedly long response time from a Verify API call.
      </td>

      <td>
        1. Use the Arkose Labs Status API to check for service issues.  2. If there is an outage or disruption, your server should bypass any validity checks for the Arkose token and let the user continue the session.
      </td>
    </tr>

    <tr>
      <td>
        Verify API call returns an HTTP error code.
      </td>

      <td>
        1. Use the Arkose Labs Status API to check for service issues.  2. If there is an outage or disruption, your server should bypass any validity checks for the Arkose token and let the user continue the session.
      </td>
    </tr>
  </tbody>
</Table>

### Fail-Open Error Handling Sample Code

```html
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <!--
    The trigger element can exist anywhere in your page and can be added to the DOM at any time.
    -->
    <button id="enforcement-trigger">trigger element</button>
    <script>
      const publicKey = '<YOUR PUBLIC KEY>';
      const maxRetryCount = 3;
      const arkoseScriptSrc = `https://client-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js`; // Replace <YOUR_PUBLIC_KEY> with the public key that has been setup for your account.
      let scriptRetryCount = 0;
      let enforcementRetryCount = 0;

      function handleFailure() {
        // Handle Arkose script failure here
        // We strongly advise to confirm the status from the server side
      }

      function onArkoseScriptError(error) {
        if (scriptRetryCount === maxRetryCount) {
          removeArkoseScript();
          handleFailure();
          return;
        }
        // Retry loading of Arkose script
        removeArkoseScript();
        createArkoseScript();
        scriptRetryCount++;
      }

      function removeArkoseScript() {
        const arkoseScripts = document.querySelectorAll(
          `script[src="${arkoseScriptSrc}"]`
        );
        for (const script of arkoseScripts) {
          script.remove();
        }
      }

      function createArkoseScript() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = arkoseScriptSrc;
        script.setAttribute('data-callback', 'setupEnforcement');
        script.onerror = onArkoseScriptError;
        script.id = 'arkose-script';
        document.head.append(script);
      }

      async function checkArkoseAPIHealthStatus() {
        try {
          const healthResponse = await fetch(
            'https://status.arkoselabs.com/api/v2/status.json'
          );
          const healthJson = await healthResponse.json();
          const status = healthJson.status.indicator;
          return status === 'none'; // status "none" indicates Arkose systems are healthy
        } catch (error) {
          return false;
        }
      }
      /*
        This global function will be invoked when the API is ready. Ensure the name is the same name
        that is defined on the attribute `data-callback` in the script tag that loads the api for your
        public key.
        */
      function setupEnforcement(myEnforcement) {
        myEnforcement.setConfig({
          selector: '#enforcement-trigger',
          onCompleted: function (response) {
            console.log(response.token);
          },
          onError: async function (response) {
            const arkoseStatus = await checkArkoseAPIHealthStatus();
            if (arkoseStatus && enforcementRetryCount < maxRetryCount) {
              myEnforcement.reset();
              // To ensure the enforcement has been successfully reset, we need to set a timeout here
              setTimeout(function () {
                myEnforcement.run();
              }, 500);
              enforcementRetryCount++;
              return;
            }
            // The Arkose API is unhealthy or retry count has exceeded
            handleFailure();
          },
        });
      }
      createArkoseScript(); // load Arkose script on page load
    </script>
  </body>
</html>

```

## Real Time Arkose Labs API Status

You can view real-time status of the Arkose Labs APIs at: [http://status.arkoselabs.com](http://status.arkoselabs.com).

This takes you to a dashboard that shows the health of Arkose Labs services.

## Arkose Labs Status Endpoint

You can check whether the Arkose Labs services are up an via an API call, this should not be used as a first stop in the decision tree of if you should fail open. You should first implement the client side error checks outlined in this document above. Failure to do so may result in false positives that cause your code to fail open when services are functioning as expected.

The Status check API call is:

```http
GET https://status.arkoselabs.com/api/v2/components.json
```

The call returns a list of critical Arkose Components. At this time, they are worldwide status of the Global Titan as well as individual regional status of the Titan.

Arkose Labs has implemented regional failover. Typically this is a rapid process that should cause little impact to customers, but it is important to know how the components.json will report status and what each of those status values mean.

The list below is the possible values for the status field.

| Field      | Value                    |
| :--------- | :----------------------- |
| `"status"` | `"operational"`          |
| `"status"` | `"degraded_performance"` |
| `"status"` | `"partial_outage"`       |
| `"status"` | `"major_outage"`         |
| `"status"` | `"under_maintenance"`    |

For each of these fields here is the general definition

`operational` - All systems functioning as expected.

`degraded_performance` - One or more services within the Arkose Titan service ecosystem is not performing at expected levels but services are still functioning.

`partial_outage` - One or more services within the Arkose Titan are not functioning but core Titan functionality is generally functional.

`major_outage` - Arkose Titan is not functioning as expected in one or more regions.

`under_maintenance` - NOT YET IMPLEMENTED

<br />

### Scenario 1 - One or more region is impacted but failover has not yet completed

In this scenario one or more regions has a major outage, partial outage, or degraded performance and regional failover from the impacted region(s) is not yet complete. When this occurs, in components.json you will see several that status value reflected in two or more components. First in the Global Titan, and again in the individual regional Titan instances. Below is an example of a major outage in the EU-West-1 region.

Line 11 shows the GUID of the component representing the EU-West-1 region, 12 shows the name of the component representing the EU-West-1 region, line 13 shows the status of that component. Line 44 shows the GUID of the component representing the Global Titan, line 45 shows the name of the component representing the Global Titan, line 46 shows the status of that component.

In general you should focus on the global components, but knowing there is or was impact in a specific region may be helpful in your own troubleshooting if you notice you are only impacted in a specific area.

```json
{
  "page": {
    "id": "dscb4c091vpx",
    "name": "Arkose Labs",
    "url": "https://status.arkoselabs.com",
    "time_zone": "Etc/UTC",
    "updated_at": "2025-11-04T20:10:06.967Z"
  },
  "components": [
    {
      "id": "hx80gkjcymf1",
      "name": "Arkose Titan Ireland Healthcheck",
      "status": "major_outage",
      "created_at": "2025-04-07T18:31:50.639Z",
      "updated_at": "2025-11-04T20:10:06.911Z",
      "position": 1,
      "description": "EU-West-1 Region",
      "showcase": true,
      "start_date": "2025-04-07",
      "group_id": "16tf1xx379n7",
      "page_id": "dscb4c091vpx",
      "group": false,
      "only_show_if_degraded": false
    },
    {
      ...
    },
    {
     ...
    },
    {
     ...
    },
    {
     ...
    },
    {
     ...
    },
    {
     ...
    },
    {
      "id": "4dd3fb4w6qg8",
      "name": "Arkose Global Titan",
      "status": "major_outage",
      "created_at": "2025-11-03T23:53:10.517Z",
      "updated_at": "2025-11-04T20:10:06.924Z",
      "position": 6,
      "description": null,
      "showcase": true,
      "start_date": "2025-11-03",
      "group_id": null,
      "page_id": "dscb4c091vpx",
      "group": false,
      "only_show_if_degraded": false
    }
  ]
}
```

### Scenario 2 - One or more region is impacted and has been failed over

In this scenario one or more regions has a major outage, partial outage, or degraded performance and regional failover from the impacted region(s) is completed. Below is what that will look like in the components.json response.

As with the example above, lines 11, 12, and 13 still show that the EU-West-1 region has a major outage, this is expected as we will be working to restore service in that region but we are not sending customer traffic there so no impact to you.

Now on line 46, you will see that the status for the Global Titan reflects operational. This is the indicator that our global systems are functioning as expected and you do not need to fail open.

```json
{
  "page": {
    "id": "dscb4c091vpx",
    "name": "Arkose Labs",
    "url": "https://status.arkoselabs.com",
    "time_zone": "Etc/UTC",
    "updated_at": "2025-11-04T20:10:06.967Z"
  },
  "components": [
    {
      "id": "hx80gkjcymf1",
      "name": "Arkose Titan Ireland Healthcheck",
      "status": "major_outage",
      "created_at": "2025-04-07T18:31:50.639Z",
      "updated_at": "2025-11-04T20:10:06.911Z",
      "position": 1,
      "description": "EU-West-1 Region",
      "showcase": true,
      "start_date": "2025-04-07",
      "group_id": "16tf1xx379n7",
      "page_id": "dscb4c091vpx",
      "group": false,
      "only_show_if_degraded": false
    },
    {
      ...
    },
    {
     ...
    },
    {
     ...
    },
    {
     ...
    },
    {
     ...
    },
    {
     ...
    },
    {
      "id": "4dd3fb4w6qg8",
      "name": "Arkose Global Titan",
      "status": "operational",
      "created_at": "2025-11-03T23:53:10.517Z",
      "updated_at": "2025-11-04T20:10:06.924Z",
      "position": 6,
      "description": null,
      "showcase": true,
      "start_date": "2025-11-03",
      "group_id": null,
      "page_id": "dscb4c091vpx",
      "group": false,
      "only_show_if_degraded": false
    }
  ]
}
```

<br />

## Using the API Status Endpoint With Your Service

We use the term *Fail Open* to mean that even when failure conditions for the Arkose Platform are present, we want the overall process to proceed. We recommend you integrate and configure Arkose APIs so that they can be bypassed in the rare event of any Arkose API-related service disruption and your process can proceed.

### Client-Side

An unexpected failure of the Client API could stop a website from loading or negatively impact the user experience. Use the Arkose Client API's `onError()` callback to handle errors gracefully.

When the Client API request timeouts, use the Enforcement Object's `reset` callback to retry the call. If the issue persists, check the service's status by calling the Arkose Status API as shown above. If the response confirms an outage, switch to your system's fallback flow. You should check for other JavaScript or third-party errors before bypassing the Arkose Client API or switching to a fallback option.

### Server-Side

Once you have completed the Client-Side checks listed above, and found an error, please check Arkose Services' status by calling the `components.json` as shown above. You can use the response (`operational`, `degraded_performance`, `partial_outage`, `major_outage`, or `under_maintenance`) to decide on the right fallback flow. If there is an outage or disruption, then your server should bypass any validity checks for the Arkose token and let the user continue the session.