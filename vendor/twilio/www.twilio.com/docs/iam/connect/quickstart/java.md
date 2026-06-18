# Twilio Connect Java Quickstart

## Overview

Twilio Connect allows developers to obtain authorization to make
calls, send text messages, purchase phone numbers, read access logs and perform
other API functions on behalf of another Twilio account holder.

As an example, imagine you want to access the Twilio account of a user of
your web application to provide in-depth analytics of their Twilio account
activity. In this quickstart we'll solve this problem by creating your first
Twilio Connect App, placing the "Connect" button on your website so users can
authorize your app to access their Twilio account data and make API requests
against their account.

## Create your first Twilio Connect app

To create your first Connect App, log in to the Twilio Console and go to **Settings** > **Connect applications**. Click **Create a new connect app** and fill in the top section with the name of your application and your company information.

Next, assign an Authorize URL to your Connect application. The Authorize
URL is the URL that Twilio will redirect the user's browser to after they have
authorized your application to access their Twilio account. Later on in the
quickstart we'll demonstrate how the Authorize URL is used.

Lastly, select the access rights your Connect app requires on the user's
account. For this example we will access call logs for analytics, so
we'll choose "Read all account data".

Here's what our sample Connect application looks like:

![Rossum app settings with endpoints and permissions, including a possum .](https://docs-resources.prod.twilio.com/7e3c81234f34067cf6ef1e797c0eeaaa7bae9929fe0c031f456f9e9049df4437.png)

To create your first Connect App:

1. Log in to the Twilio Console.
2. Go to **Settings** > **Connect applications**.
3. Click **Create a new connect app**.
4. Complete the top section with the name of your application and your company information.
5. Assign an Authorize URL to your Connect application. After the end user authorizes your application to access their Twilio account, Twilio redirects the end user's browser to this URL.
6. Select the access rights your Connect app requires on the user's account. This example accesses call logs for analytics.
7. Choose **Read all account data**.
   The sample Connect application should resemble the following:

   ![Rossum app settings with endpoints and permissions, including a possum .](https://docs-resources.prod.twilio.com/7e3c81234f34067cf6ef1e797c0eeaaa7bae9929fe0c031f456f9e9049df4437.png)
8. Click **Save**.

## Place the Connect button on your website

![Twilio logo with red Connect button.](https://docs-resources.prod.twilio.com/c20cb3f374cb994eae7967ddb213e8f08fdce6380bfd173c0c05abfce0882dd4.png)

The Connect button is where your customers will start the process of
authorizing your Connect App to access their Twilio account.

To get the Connect button code, click **Generate connect button HTML** on your
Connect App details page. Copy the generated code and paste it into the HTML
of your website where you would like the button to appear.

## Test the authorization workflow

With the Twilio Connect button now on your website, browse to the page
where you placed the HTML and click the Connect button. Verify that the
information displayed on the authorization screen is correct.

After completing the app authorization process, you are redirected to the
Authorize URL you specified when creating your Connect App. Appended to that
URL is an Account Sid URL parameter with a value that looks like this:

```bash
http://www.example.com/twilio/authorize?AccountSid=AC12345
   Your Connect App's Authorize URL       Customer's SID

```

Your application should extract the AccountSid value from the URL and
associate it with the user's account within your application. After extracting
the AccountSid, we recommend that you redirect the user to another page within
your app so the AccountSid isn't hanging around. Let's show an example using
Java.

> \[!WARNING]
>
> This tutorial assumes you have a Java development environment with a Web server capable of running **Java servlets** and the **twilio-java** SDK. Please see [our post on setting up your environment](/docs/usage/tutorials/how-to-set-up-your-java-development-environment) if you need help installing those programs.

```java
package com.twilio;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import com.twilio.sdk.verbs.TwiMLResponse;
import com.twilio.sdk.verbs.TwiMLException;
import com.twilio.sdk.verbs.Sms;

public class TwilioServlet extends HttpServlet {

    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Retrieve the Connect user's Account Sid
        String accountSid = request.getParameter("AccountSid");

        // Store this account sid in your database, so you can retrieve it
        // later. You will need to write this section of the code.

        // Finally, redirect the user to your app after you've gathered their
        // SID
        response.sendRedirect("http://example.com/myapp");
    }
}
```

## Make an authorized request

With the user's Account Sid in hand, you can now request data from their
account via the Twilio REST API. A request to retrieve data from a user's
account is nearly identical to a request made against your account, with
one key difference. Instead of authenticating with your own AccountSid, you
authenticate with the Account Sid retrieved during the authorization process
and your account's Auth Token.

Here is a request to retrieve call logs from an account using the
[Java SDK](/docs/libraries). Pay special attention to line 4 where
the customer's Account Sid is specified instead of your own:

```java
import java.util.Map;
import java.util.HashMap;

import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.instance.Account;
import com.twilio.sdk.resource.instance.Call;
import com.twilio.sdk.resource.list.CallList;

public class CallRetriever {

    // The customer's Account Sid
    public static final String ACCOUNT_SID = "AC123";

    // Your own Auth Token
    public static final String AUTH_TOKEN = "456bef";

    public static void main(String[] args) throws TwilioRestException {

        TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);
        Account mainAccount = client.getAccount();
        CallList calls = mainAccount.getCalls();
        for (Call call : calls) {
            System.out.println("From: " + call.getFrom() + " To: " + call.getTo());
        }
    }
}

```

## You're Done! Now What?

Retrieving call logs on behalf of your customers is just the
start of what you can accomplish with Twilio Connect. Visit
the [complete Connect documentation](/docs/iam/connect) and [best
practices](/docs/iam/connect#best-practices) to learn more about how to integrate
Connect's additional capabilities to your applications.
