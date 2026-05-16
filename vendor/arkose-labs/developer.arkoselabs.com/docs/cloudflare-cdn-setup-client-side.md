# Cloudflare CDN Setup - Client Side

# Overview

The purpose of the Cloudflare CDN Worker client side implementation is to inject the Arkose client side scripts into the HTML on a page such as Login or Registration. There are 2 versions available on the Github page, one for a Button trigger and the other for a Form Submission trigger. Both versions will store a Cookie containing the Arkose Token which can then be verified using a second worker.

## Cloudflare Setup

### Step 1. Creating a Worker

1. Log in to your Cloudflare account.

2. Navigate to the **Workers & Pages** section in the side navigation panel and select **Overview.**

<Image align="center" border={true} src="https://files.readme.io/6afa0a0-image.png" className="border" />

3. After the page loads, click on the **Create Application** button.

<Image align="center" border={true} src="https://files.readme.io/7032282-image.png" className="border" />

4. Select the **Workers** tab and click on **Create Worker**.

<Image align="center" border={true} src="https://files.readme.io/c82e03d-image.png" className="border" />

5. Provide a name for the worker, then select **Deploy**.

<Image align="center" border={true} src="https://files.readme.io/58c7215-image.png" className="border" />

6. The Worker has been created, the next step is editing workers code.

***

### Step 2. Edit Worker Code

1. After deploying the Worker, click on **Edit Code**.

<Image align="center" border={true} src="https://files.readme.io/504a47a-image.png" className="border" />

2. **Delete** the sample code from the `worker.js` file.

<Image align="center" border={true} src="https://files.readme.io/3abbe8b-image.png" className="border" />

3. Open [button-takeover](https://github.com/ArkoseLabs/arkose-examples/tree/main/cdn-examples/client/button-takeover) or [form-submit-takeover](https://github.com/ArkoseLabs/arkose-examples/tree/main/cdn-examples/client/form-submit-takeover)  depending if using a Button trigger or a Form trigger. Copy and paste the code into the `worker.js` file.\
   ![](https://files.readme.io/acfbebc-image.png)
4. Click on **Save and deploy**\
   ![](https://files.readme.io/91a59a4-image.png)

***

### Step 3. Adding Variables to the Worker

1. Navigate to the Workers summary and select the **Settings** tab.

<Image align="center" border={true} src="https://files.readme.io/23fece7-image.png" className="border" />

2. Select the **Variables** menu item from the side navigation panel.

   <Image border={false} src="https://files.readme.io/78f1e01c8d102351560a98eb6b4760f3240e4b1b8c1162bfa02e18f212a4c225-image.png" />
3. Add the following parameters as Worker Variables.

   | **Variable**                | **Description**                                                                                        | **Sample**                           |
   | --------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------ |
   | `publicKey`                 | Arkose labs public key obtained through [https://portal.arkoselabs.com](https://portal.arkoselabs.com) | XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX |
   | `arkoseMaxRetryCount`       | The number of retries to perform when there is an error                                                | 2                                    |
   | `arkoseCookieName`          | The name of the cookie that the Arkose token will be stored in                                         | arkose-Token                         |
   | `arkoseErrorCookieName`     | The name of the cookie that an Arkose error will be stored in                                          | arkoseError                          |
   | `arkoseCookieLife`          | The length of time the Arkose cookies should be active for (in milliseconds)                           | 300000 (5 minutes)                   |
   | `buttonSelector` (optional) | The querySelector string used for selecting the required button                                        | # submitButton                       |
   | `formSelector` (optional)   | The querySelector string used for selecting the required form to protect                               | # submitForm                         |
4. Click **Save and deploy**.

<Image border={false} src="https://files.readme.io/261a2cf4b51d31c3cacaeed188199c65b252b3ff9d69f07232e14a47a128583d-image.png" />

***

### Step 4. Adding Triggers to the Worker

1. Navigate to the Worker page and select the **Triggers** tab.

<Image align="center" border={true} src="https://files.readme.io/9bdc3b9-image.png" className="border" />

2. Click on **Add route**.

<Image align="center" border={true} src="https://files.readme.io/cc880cb-image.png" className="border" />

3. Enter the route name (no https is needed). This is the URL of the page containing the Login or Registration form.

<Image align="center" border={true} src="https://files.readme.io/0410449-image.png" className="border" />

4. Select the domain **Zone** from the dropdown menu.

<Image align="center" border={true} src="https://files.readme.io/141b958-image.png" className="border" />

5. Click on **Add route**.

<Image align="center" border={true} src="https://files.readme.io/491d42b-image.png" className="border" />

6. Once the route is added, the setup has been completed.