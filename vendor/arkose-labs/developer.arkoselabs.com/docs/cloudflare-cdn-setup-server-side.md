# Cloudflare CDN Setup - Server Side

# Overview

The purpose of the Cloudflare CDN Worker server side implementation is to execute on each request (such as Login or Registration) and ensure the Arkose Token is valid before allowing that request to be fulfilled. The Token can be provided either in the request as either a header or stored as a Cookie depending on the client side configuration.

## Cloudflare Setup

### Step 1. Creating a Worker

1. Log in to your Cloudflare account.
2. Navigate to the **Workers & Pages** section in the side navigation panel and select Overview.

<Image align="center" className="border" border={true} src="https://files.readme.io/de6bb30-image.png" />

3. After the page loads, click **Create an Application** button.

<Image align="center" className="border" border={true} src="https://files.readme.io/f3bc6ce-image.png" />

4. Make sure you are on the **Workers tab** and select **Create Worker**.

<Image align="center" className="border" border={true} src="https://files.readme.io/b41d66a-image.png" />

5. Provide a name for the worker, then select **Deploy**.

<Image align="center" className="border" border={true} src="https://files.readme.io/bffd3e7-image.png" />

6. The Worker has been created, the next step is editing workers code.

***

### Step 2. Adding Arkose Labs Code to the Worker

1. Once the worker has been created, click on **Edit Code**.

<Image align="center" className="border" border={true} src="https://files.readme.io/ae22cce-image.png" />

2. **Delete** the sample code from the `worker.js` file.
3. Open [arkose-examples/cdn-examples/server/cloudflare-worker at main · ArkoseLabs/arkose-examples](https://github.com/ArkoseLabs/arkose-examples/tree/main/cdn-examples/server/cloudflare-worker) and copy and paste the code into the `worker.js` file.

<Image align="center" className="border" border={true} src="https://files.readme.io/a0d7b50-image.png" />

4. Click on **Save and deploy**.

<Image align="center" className="border" border={true} src="https://files.readme.io/c83d983-image.png" />

> 🚧
>
> * This example code includes a function called `handleFailure`, which will perform a redirect if the Arkose token fails to verify or if there is an error. If an implementation requires a different action to be performed in the event of an error or fail to verify, this function can be easily updated to perform the required action.
> * The example also allows for an arkose-token to be submitted via a header or a cookie, if an alternative method is required, the `getArkoseToken` function can be updated to use an alternative method.

***

### Step 3. Adding Variables to the Worker

1. Navigate to the Workers summary and select the **Settings** tab.

<Image align="center" className="border" border={true} src="https://files.readme.io/ee237dd-image.png" />

2. Select the **Variables** menu item from the side navigation panel.

<Image align="center" className="border" border={true} src="https://files.readme.io/c7a6f35-image.png" />

3. Add the following parameters as Worker Variables.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        **Variable**
      </th>

      <th>
        **Description**
      </th>

      <th>
        **Sample**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `privateKey`
      </td>

      <td>
        Arkose labs private key obtained through

        [https://portal.arkoselabs.com](https://portal.arkoselabs.com)
      </td>

      <td>
        XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
      </td>
    </tr>

    <tr>
      <td>
        `verifySubdomain`
      </td>

      <td>
        A customer specific subdomain to use for the verify call. For example companyname-api
      </td>

      <td>
        \<companyname>-api
      </td>
    </tr>

    <tr>
      <td>
        `errorUrl`
      </td>

      <td>
        A page to route the user to when an error occurs (outside of fail open)
      </td>

      <td>
        [https://www.arkoselabs.com](https://www.arkoselabs.com)
      </td>
    </tr>

    <tr>
      <td>
        `tokenIdentifier`
      </td>

      <td>
        The property name for the header / cookie that contains the Arkose Labs token
      </td>

      <td>
        arkose-Token
      </td>
    </tr>

    <tr>
      <td>
        `tokenMethod`
      </td>

      <td>
        The storage method of the Arkose Labs token, by default this is header but this can be either header or cookie
      </td>

      <td>
        cookie
      </td>
    </tr>

    <tr>
      <td>
        `verifyMaxRetryCount`
      </td>

      <td>
        A numeric string to represent the number of times we should retry Arkose Labs verification if there is an issue.
      </td>

      <td>
        3
      </td>
    </tr>

    <tr>
      <td>
        `failOpen`
      </td>

      <td>
        A boolean string to indicate if the current session should fail open if there is a problem with the Arkose Labs platform.
      </td>

      <td>
        true
      </td>
    </tr>
  </tbody>
</Table>

4. Make the `privateKey` encrypted by selecting the **Encrypt** button.

<Image align="center" className="border" border={true} src="https://files.readme.io/43cacf7-image.png" />

5. Click **Save and Deploy**.

<Image align="center" className="border" border={true} src="https://files.readme.io/5b13542-image.png" />

***

### Step 4. Adding Triggers to the Worker

1. Navigate to the Worker page and select the **Triggers** tab.

<Image align="center" className="border" border={true} src="https://files.readme.io/7e46324-image.png" />

2. Click on **Add route**.

<Image align="center" className="border" border={true} src="https://files.readme.io/236b6db-image.png" />

3. Enter the route name (no https is needed). This url is typically the one that the POST call is sent to during a Login or Registration event.

<Image align="center" className="border" border={true} src="https://files.readme.io/5fa13d2-image.png" />

4. Select the domain **Zone** from the dropdown menu.

<Image align="center" className="border" border={true} src="https://files.readme.io/cad4b30-image.png" />

5. Click on **Add route**.

<Image align="center" className="border" border={true} src="https://files.readme.io/d4a7275-image.png" />

6. Once the route is added, the setup has been completed.