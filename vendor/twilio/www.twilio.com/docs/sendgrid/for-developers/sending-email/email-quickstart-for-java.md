# Email API Quickstart for Java

In this quickstart, you'll learn how to send your first email using the [Twilio SendGrid Mail Send API](/docs/sendgrid/api-reference/mail-send/mail-send) and [Java](https://www.java.com/en/).

## Prerequisites

Be sure to perform the following prerequisites to complete this tutorial. You can skip ahead if you've already completed these tasks.

1. Sign up for a [SendGrid](https://signup.sendgrid.com/) account.
2. Enable [Two-factor authentication](https://authy.com/).
3. Create and store a SendGrid API Key with **Mail Send** > **Full Access** permissions.
4. Complete Domain Authentication.
5. Install [Java](https://www.java.com/en/).

### Sign up for a SendGrid account

When you sign up for a [SendGrid account](https://signup.sendgrid.com/), you can start a [free trial](/docs/sendgrid/ui/account-and-settings/upgrading-your-plan#free-trial)that allows you to send up to 100 emails per day for 60 days. After the 60-day trial period ends, you'll need to [upgrade your plan](/docs/sendgrid/ui/account-and-settings/upgrading-your-plan) to continue sending emails. For more plan options, see [SendGrid pricing](https://sendgrid.com/pricing/).

### Enable Two-factor authentication

Twilio SendGrid requires customers to enable Two-factor authentication (2FA). You can enable 2FA with SMS or by using the [Authy](https://authy.com/) app. See the [2FA section of our authentication documentation](/docs/sendgrid/for-developers/sending-email/authentication/#two-factor-authentication) for instructions.

### Create and store a SendGrid API key

Unlike a username and password — credentials that allow access to your full account — an API key is authorized to perform a limited scope of actions. If your API key is compromised, you can also cycle it (delete and create another) without changing your other account credentials.

Visit our [API Key documentation](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authentication#api-keys) for instructions on creating an API key and [storing an API key in an environment variable](/docs/sendgrid/ui/account-and-settings/api-keys#storing-an-api-key-in-an-environment-variable). To complete this tutorial, you can create a Restricted Access API key with **Mail Send** > **Full Access** permissions only, which will allow you to send email and schedule emails to be sent later. You can edit the permissions assigned to an API key later to work with additional services.

### Verify your Sender Identity

To ensure our customers maintain the best possible sender reputations and to uphold legitimate sending behavior, we require customers to verify their [Sender Identities](/docs/sendgrid/for-developers/sending-email/sender-identity/) by completing [Domain Authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication/). A Sender Identity represents your 'From' email address—the address your recipients see as the sender of your emails.

> \[!NOTE]
>
> To get started quickly, you may be able to skip Domain Authentication and begin by completing [Single Sender Verification](/docs/sendgrid/ui/sending-email/sender-verification). Single Sender Verification is recommended for testing only. Some email providers have [DMARC](/docs/sendgrid/glossary/dmarc) policies that restrict email from being delivered using their domains. For the best experience, please complete Domain Authentication. Domain Authentication is also required to upgrade from a free account.

## Install Java

If you do not already have a version of Java installed, visit the [Java website](https://www.java.com/en/) to download and install a version appropriate for your operating system.

> \[!NOTE]
>
> The Twilio SendGrid Java SDK supports Java 8 and 11.

### Java version check

Check your Java version by opening your terminal (also known as a command line or console) and typing the following command.

```shell
java -version
```

If you have Java installed, the terminal should print something like the following output.

```shell
java version "16.0.2" 2021-07-20
Java(TM) SE Runtime Environment (build 16.0.2+7-67)
Java HotSpot(TM) 64-Bit Server VM (build 16.0.2+7-67, mixed mode, sharing)
```

## Initialize your project

Using a [Twilio SendGrid SDK](https://github.com/sendgrid/sendgrid-java) is the fastest way to deliver your first email.

Start by creating a project folder for this app. You can name the project anything you like.

To avoid writing your API key in your Java code, it is best to [store it as an environment variable](/docs/usage/secure-credentials). That way you can share your code without exposing an API key that would give access to your SendGrid account. [IntelliJ](https://www.jetbrains.com/idea/download/) and [Eclipse](https://www.eclipse.org/downloads/) can manage environment variables for you, or you can set them manually. We will assume you have set an environment variable called `SENDGRID_API_KEY`.

The [Maven](https://maven.apache.org/download.cgi) package manager was included when you installed Java. You can use Maven to install the Twilio SendGrid SDK and save it as a project dependency. If you want to verify that Maven is installed, you can type the following into the terminal.

```bash
mvn -v
```

The terminal should print something like the following output.

```bash
Apache Maven 3.8.1 (05c21c65bdfed0f71a2f2ada8b84da59348c4c5d)
Maven home: /usr/local/Cellar/maven/3.8.1/libexec
Java version: 16.0.1, vendor: Homebrew, runtime: /usr/local/Cellar/openjdk/16.0.1/libexec/openjdk.jdk/Contents/Home
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "10.15.7", arch: "x86_64", family: "mac"
```

If Maven is still not installed, you can download and install Maven manually by following the instructions on the ["Installing Apache Maven"](https://maven.apache.org/install.html) page.

For those sending an email via Maven with Gradle config, add this in `build.gradle`:

```java
implementation 'com.sendgrid:sendgrid-java:4.10.3'
```

Prefer to use Maven, Gradle, or another build tool? The Twilio Java SDK docs has information on [how to install using a build automation tool](https://github.com/twilio/twilio-java#using-with-a-build-automation-tool).

### Install the SDK

Before installing the SendGrid SDK, you need a Maven project with a `pom.xml` file. If you don't already have one, create a Maven project by running the following command in your project directory:

```bash
mvn archetype:generate -DgroupId=com.example -DartifactId=sendgrid-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

This command creates a basic Maven project structure with a `pom.xml` file.

Now, add the Twilio SendGrid SDK as a dependency in your `pom.xml` file. Open `pom.xml` and add the following inside the `dependencies` section:

```xml
<dependency>
    <groupId>com.sendgrid</groupId>
    <artifactId>sendgrid-java</artifactId>
    <version>4.10.3</version>
</dependency>
```

> \[!NOTE]
>
> The latest version of the SendGrid Java SDK can be found on [Maven Central](https://search.maven.org/artifact/com.sendgrid/sendgrid-java).
> You can also check the [GitHub releases page](https://github.com/sendgrid/sendgrid-java/releases) for the latest version.

Change to your project directory and run the following command to download the SDK and its dependencies:

```bash
cd sendgrid-app
mvn clean install
```

The terminal should print something like the following output.

```bash
[INFO] Scanning for projects...
[INFO] --------Configuration-------
[INFO] Building sendgrid-app 1.0-SNAPSHOT
[INFO] --------Configuration-------
[INFO] 
[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ sendgrid-app ---
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ sendgrid-app ---
[INFO] Installing /Users/yourname/sendgrid-app/target/sendgrid-app-1.0-SNAPSHOT.jar
[INFO] Installing /Users/yourname/sendgrid-app/pom.xml
[INFO] BUILD SUCCESS
[INFO] Total time:  2.345 s
```

If you see `BUILD SUCCESS`, you successfully installed the SDK.

## How to Send an Email with the SendGrid API

You're now ready to write some code. First, create a file in your project directory.

### Complete code block

The following Java block contains all the code needed to successfully deliver a message with the SendGrid Mail Send API. You can copy this code, modify the `from` and `to` variables, and run the code if you like.

The following is the minimum needed code to send an email with the [/mail/send Helper](https://github.com/sendgrid/sendgrid-java/tree/main/src/main/java/com/sendgrid/helpers) ([here](https://github.com/sendgrid/sendgrid-java/blob/main/examples/helpers/mail/Example.java#L30) is a full example):

### With Mail Helper Class

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
  public static void main(String[] args) throws IOException {
    Email from = new Email("test@example.com");
    String subject = "Sending with Twilio SendGrid is Fun";
    Email to = new Email("test@example.com");
    Content content = new Content("text/plain", "and easy to do anywhere, even with Java");
    Mail mail = new Mail(from, subject, to, content);

    SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
    Request request = new Request();
    try {
      request.setMethod(Method.POST);
      request.setEndpoint("mail/send");
      request.setBody(mail.build());
      Response response = sg.api(request);
      System.out.println(response.getStatusCode());
      System.out.println(response.getBody());
      System.out.println(response.getHeaders());
    } catch (IOException ex) {
      throw ex;
    }
  }
}

```

### Build your API call

Your API call must have the following components:

* A host (the host for Web API v3 requests is always `https://api.sendgrid.com/v3/`)
* An API key passed in an Authorization Header
* A request (when submitting data to a resource via `POST` or `PUT`, you must submit your request body in JSON format)

In your java file, import the SendGrid SDK. The library will handle setting the Host, `https://api.sendgrid.com/v3/`, for you.

```java
import com.sendgrid.*;
```

Next, use the API key you set up earlier. Remember, the API key is stored in an environment variable, so you can use the `main` method to access it. This means we also need to import Java's library.

```java
import java.io.IOException;
```

Assign the key to a variable named `sg` using the SDK's `SendGrid()` method. The SDK will pass your key to the v3 API in an Authorization header using Bearer token authentication.

```java
SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
```

Now you're ready to set up the `from`, `to`, `subject`, and message body `content`. These values are passed to the API in a ["personalizations"](/docs/sendgrid/for-developers/sending-email/personalizations/) object when using the v3 Mail Send API. You can assign each of these values to variables, and the SendGrid library will handle creating a personalizations object for you.

First, import the library's `Mail`, `Email`, `To`, and `Content` classes.

```java
from sendgrid.helpers.mail import Mail, Email, To, Content
```

With the helpers imported, define and assign values for `from`, `to`, `subject`, and `content` variables. Assigning an email address like `from = "test@example.com"` will work. However, the constructors imported in the previous step allow you to pass data to them to be sure your final message is formatted properly. Be sure to assign the `to` to an address with an inbox you can access.

Note that the `Content()` helper takes two arguments: the content type and the content itself. You have two options for the content type: `text/plain` or `text/html`. The second parameter will take the plain text or HTML content you wish to send.

```java
Email from = new Email("test@example.com");  // Change to your verified sender
String subject = "Sending with Twilio SendGrid is Fun";
Email to = new Email("test@example.com");  // Change to your recipient
Content content = new Content("text/plain", "and easy to do anywhere, even with Java");
```

To properly construct the message, pass each of the previous variables into the SendGrid library's Mail constructor. You can assign this to a variable named `mail`.

```java
Mail mail = new Mail(from, subject, to, content);
```

You can assign this full call to a variable named `response` and print the response status code, body, and headers.

```java
Response response = sg.api(request);
System.out.println(response.getStatusCode());
System.out.println(response.getBody());
System.out.println(response.getHeaders());
```

With all this code in place, you can run your java file in your terminal to send the email.

```bash
javac <yourfilename>
```

If you receive a [`202` status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202) printed to the console, your message was sent successfully. Check the inbox of the `to` address, and you should see your demo message.

If you don't see the email, you may need to check your spam folder.

### Troubleshooting

If you receive an error message, you can reference our [response message documentation](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#status-codes) for clues about what may have gone wrong.

### API Response messages

All responses are returned in JSON format. We specify this by sending the `Content-Type` header. The Web API v3 provides a selection of [response codes](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#status-codes), [content-type headers](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#content-type-header), and [pagination](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#pagination) options to help you interpret the responses to your API requests.

### Additional Resources

* ["How to Send Email with Java and Twilio SendGrid"](https://youtu.be/06M3lZzZEMY) video
* ["How to Send Email in Java using Twilio SendGrid"](https://www.twilio.com/blog/how-to-send-email-in-java-using-sendgrid) blog post by Matthew Gilliard
