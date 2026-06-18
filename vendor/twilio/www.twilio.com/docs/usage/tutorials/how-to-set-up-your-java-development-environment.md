# Set up a your Java development environment

This tutorial covers creating your first Twilio voice application using Java. It starts with the set up of your Java development environment.

**Time to complete**: Approximately 30-60 minutes depending on your operating system, internet speed, and download times.

## Prerequisites

This tutorial requires the following tools and understanding:

* A stable internet connection for downloading Java, Maven, and IntelliJ IDEA.
* Basic familiarity with using the terminal or command line.
* A [Twilio account](https://www.twilio.com/try-twilio) which has a free tier available.
* Twilio Account SID and Auth Token from the [Twilio Console](https://www.twilio.com/console).
* A [Twilio phone number](https://1console.twilio.com/go?to=/account/account/__account__/us1/senders-hub/list/phone-numbers/inventory). This comes as part of your Twilio account.
* Familiarity with the [Twilio virtual phone](https://www.twilio.com/docs/messaging/guides/guide-to-using-the-twilio-virtual-phone) for testing if you don't want to use your personal phone number.
* [Java SDK](https://adoptium.net/installation)
* [Maven](https://maven.apache.org/install.html)
* [IntelliJ IDEA](https://www.jetbrains.com/help/idea/installation-guide.html)

## Create a Java project with IntelliJ IDEA

These are the steps to create a new Java project with IntelliJ IDEA:

1. Open IntelliJ IDEA.
2. Click **New Project** or **File > New > Project** with IntelliJ already open.
3. In the project creation wizard:
   * Select **New Project** from the left sidebar.
   * Choose your **Project SDK**: Select the Java version you installed. This will show Java 21.
   * Click **Next**.
4. Select **Create from archetype**.
5. Check **Create from archetype**.
6. Select **maven-archetype-quickstart** from the list.
7. Click **Next** to move to New Project screen with fields for **GroupId**, **ArtifactId**, and **Version**.
8. Click **Advanced Settings** arrow to expand additional options.
9. Add your project information:
   * Type `com.example` into the **GroupId** box.
   * Type `twilio-java-example` into the **ArtifactId** box.
   * Don't change the value in the **Version** box.
10. IntelliJ populates the **Project name** field on **ArtifactId** value.
11. Choose where to save your project and set it in the **Project location** box.
12. Click **Next**.
13. Click **Finish**.

IntelliJ creates the correct directory structure and open the project. Your application's source code goes in the `src/main/java` directory.

## Add Twilio functionality to your Java app

Your applications interact with Twilio in two ways:

* **Call the Twilio API from your code**—Send SMS messages, make phone calls, or use other Twilio services.
* **Have Twilio call your application using a [webhook](/docs/glossary/what-is-a-webhook)**—Respond to incoming messages, calls, or other events.

### Call the Twilio API from your code

To interact with Twilio services, add the Twilio Java helper library to your project through adding a *dependency* to your build configuration.

1. In IntelliJ, open the `pom.xml` file in your project root.
2. Find the `<dependencies>` section.
3. Add this dependency inside the `<dependencies>` tags:

   ```xml
   <dependency>
     <groupId>com.twilio.sdk</groupId>
     <artifactId>twilio</artifactId>
     <version>10.5.1</version>
   </dependency>
   ```
4. After adding the dependency, IntelliJ displays notification about Maven changes.
5. Click **Import Changes** or **Load Maven Changes** when prompted.

#### If you get "package com.twilio doesn't exist" error

If you encounter compilation errors saying the Twilio package doesn't exist, follow these steps:

**Force Maven to refresh dependencies**

1. Right-click on your project in the Project panel.
2. Select **Maven > Reload project**.
3. Or click the **Maven** tab on the right side of IntelliJ and click the refresh icon (🔄).

**Verify dependencies downloaded**

1. Open the **Maven** tool window (**View > Tool Windows > Maven**).
2. Expand your project → **Dependencies**.
3. Look for `twilio-10.5.1.jar` listed there.
4. If it's not there, the dependency wasn't downloaded properly.

**Clean and rebuild**

1. In IntelliJ, go to **Build > Clean**.
2. Then **Build > Rebuild Project**.
3. This forces IntelliJ to recompile everything with the new dependencies.

### Create your Twilio Java app code

These are the steps to create your first Twilio Java application using Java:

1. Create a Java file called `TwilioExample.java` in your `src/main/java` directory:

   ```java
       // !mark(8:9,15:17)
   import com.twilio.Twilio;
   import com.twilio.rest.api.v2010.account.Call;
   import com.twilio.type.PhoneNumber;
   import java.net.URI;

   public class TwilioExample {
       // Replace with your actual credentials (consider using environment variables)
       public static final String ACCOUNT_SID = "your_account_sid_here";
       public static final String AUTH_TOKEN = "your_auth_token_here";

       public static void main(String[] args) {
           // Initialize Twilio
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

           Call call = Call.creator(new com.twilio.type.PhoneNumber("+18005550100"),
                   new com.twilio.type.PhoneNumber("+18005550199"),
                   URI.create("http://demo.twilio.com/docs/voice.xml"))
               .create();
       }
   }
   ```
2. Replace `your_account_sid_here` and `your_auth_token_here` with your actual Twilio Account SID and Auth Token from the Twilio Console.
   For production applications, use [environment variables](https://www.twilio.com/en-us/blog/how-to-set-environment-variables-html) or configuration files to store credentials instead of hardcoding them.
   > \[!CAUTION]
   >
   > This quickstart hardcodes your credentials for faster setup. To keep credentials secret and control access when you deploy to production, use environment variables and [API keys](/docs/iam/api-keys).
   ```java
   // Using environment variables (recommended for production)
   public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
   public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

   // Initialize Twilio with environment variables
   Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
   ```
   **To set environment variables:**

   **On Windows (Command Prompt):**
   ```cmd
   set TWILIO_ACCOUNT_SID=your_account_sid_here
   set TWILIO_AUTH_TOKEN=your_auth_token_here
   ```
   **On Windows (PowerShell):**
   ```powershell
   $env:TWILIO_ACCOUNT_SID="your_account_sid_here"
   $env:TWILIO_AUTH_TOKEN="your_auth_token_here"
   ```
   **On macOS/Linux:**
   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   ```
3. To set the receiving, or To, phone number, replace the first `phoneNumber` in the `call` method.
4. To set the sending, or From, phone number, replace the second `phoneNumber` in the `call` method. This should be your Twilio phone number that you got as a part of the prerequisites.

### Run your application

These steps are how to run your Java application in IntelliJ:

1. Right-click on `TwilioExample.java` in IntelliJ.
2. Select **Run 'TwilioExample.main()'**.
3. Check the console output for the call SID confirmation.
4. Verify that the receiving phone number got the call.

## Next steps

You're ready to build out your Java application. Learn more with the following resources:

* [Programmable Voice quickstart](/docs/voice/quickstart/server)
* [WhatsApp Business Platform with Twilio quickstart](/docs/whatsapp/quickstart)
* [Receive and Reply to Incoming Messages—Java](/docs/messaging/tutorials/how-to-receive-and-reply/java)
