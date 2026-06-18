# Connect Call To widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The **Connect Call To** widget allows you to bridge an in-progress call with another party. You can specify one of the following ways to connect to the other party:

* Single phone number
* Multiple phone numbers (simulring)
  * If you specify multiple phone numbers, all the numbers will be called simultaneously. Once one of the called parties connects, all the other calls will drop automatically.
* [Twilio Voice JavaScript SDK](/docs/voice/sdks/javascript) client identity
* [SIP endpoint](/docs/voice/api/sip-interface)
* [Twilio Voice Conference](/docs/voice/conference) SID

Use this widget as part of an [Interactive Voice Response (IVR)](/docs/glossary/what-is-ivr) menu, to connect your customer with a different department or a specific operator.

You're not able to use parallel calling including both calls to a SIP Domain alongside calls to a phone number, client user, or SIM.

![Connect call widget with options for connected call ended and caller hung up.](https://docs-resources.prod.twilio.com/da243b748a27779843ba80a164dec6aba9ecc2884c271dd2ade027ad8260cd97.png)

## Required configuration for Connect Call To widget

The required fields for this Widget are **Connect Call To** and **Caller ID**, which can be variables or hard-coded entries. Select the **Connect Call To** type from the dropdown in the **Inspector Panel**, then set the field value to the number(s)/address of your intended recipient(s).

| Name            | Description                                                                                                  | Example                                           | Default                       |
| --------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- | ----------------------------- |
| Connect Call To | The phone number(s), Twilio Voice JavaScript SDK identity, SIM SID, SIP endpoint, or Conference SID to call. | See Connect Call To configuration examples below. | N/A                           |
| Caller ID       | The phone number to use as the Caller ID when connecting the call.                                           | +12345678910                                      | \{\{contact.channel.address}} |

### Connect Call To configuration examples

You have several options when connecting a call to another party.

| Name                                                | Description                                                                                                                                                                                                                                                                                                                   | Example                                  |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Single number                                       | Specify a single phone number (in E.164 format) to dial and connect the caller to.                                                                                                                                                                                                                                            | +12345678910                             |
| Multiple numbers (Simulring)                        | Specify up to 10 numbers (in E.164 format) to potentially connect the call to. Each number will be dialed simultaneously. The first person to answer the call will be connected to the caller, and all other simultaneous calls will be dropped automatically. To specify multiple numbers, separate each number with commas. | +12345678910, +9876543210, +11112223333  |
| Client user                                         | Use this to connect to a Twilio Voice JavaScript SDK client. Specify the client identifier.                                                                                                                                                                                                                                   | bob                                      |
| SIP Endpoint (non-Twilio SIP)                       | Specify the SIP Endpoint address. There will also be an additional **Username** and **Password** field, which you should fill out if required by the destination.                                                                                                                                                             | `sip:jack@sample.com`                    |
| SIP Endpoint (Twilio Programmable Voice SIP Domain) | Put the fully qualified endpoint name in SIP Endpoint, and leave the additional **Username** and **Password** fields blank.                                                                                                                                                                                                   | `sip:{user}@{domain}.sip.us1.twilio.com` |
| Conference                                          | Specify the SID of the Conference resource to connect to.                                                                                                                                                                                                                                                                     | CFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx       |

Simultaneous dialing (Simulring) is useful when you have several phones or several people that you could route a caller to. The first call that connects will cancel all the other simultaneous calls. If you dial an office phone system or a cellphone in airplane mode, it may pick up after a single ring, preventing the other phone numbers from ringing long enough for a human ever to answer. (Reaching a phone's voicemail or an automated message is considered to be a connected call.) Use simultaneous dialing only in situations where you know the behavior of the called parties.

Simulring is only available for phone numbers in Studio. However, the [TwiML \<Dial> verb](/docs/voice/twiml/dial) allows you to simultaneously dial up to 10 [Twilio Voice JavaScript SDK clients](/docs/voice/twiml/client) or [SIP endpoints](/docs/voice/twiml/sip). You can build TwiML into a Studio Flow with the [Add TwiML Redirect widget](/docs/studio/widget-library/twiml-redirect) or by creating a [serverless function](/docs/serverless/functions-assets/functions) that runs the TwiML and using the [Run Function widget](/docs/studio/widget-library/run-function).

## Optional configuration for Connect Call To

The Connect Call To widget also accepts a number of configuration options that you can use to toggle recording or specify a timeout duration.

| Name       | Description                                                                                                                                                                                                                                                                                              | Example | Default |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| Record     | Boolean indicating whether to record the call and save it as an mp3 file.                                                                                                                                                                                                                                | true    | false   |
| Timeout    | An integer representing the number of seconds to wait for the dialed party to answer the call. The minimum allowed is 1 second, and the maximum value is 600 seconds.                                                                                                                                    | 10      | 30      |
| Time Limit | Maximum duration of the connected call in seconds. The connected call will automatically end when this limit is reached. If no value is provided, the default time limit on calls is 4 hours, unless you enable the "24-Hour Maximum Call Duration" feature in your Programmable Voice General Settings. | 3600    | Empty   |

## Connect Call To transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio Transitions, see Studio's [Getting Started](/docs/studio/user-guide/get-started#define-widget-transitions) guide.

| Name                 | Description                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connected Call Ended | The connecting call ended. This could be because the connected caller ended the call, the timeout ended the call before the call was connected, or the call failed. |
| Caller Hung Up       | The connecting call ended because the caller hung up.                                                                                                               |

## Connect Call To variables

After the Connect Call To widget executes, it stores the following variables for use throughout your Studio Flow. For more information on working with widget variables, see [Studio's Getting Started guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

Find definitions and examples for these variables at the [Call Resource](/docs/voice/api/call-resource#call-properties) page.

| Name               | Liquid Template Language                        |
| ------------------ | ----------------------------------------------- |
| Dial Call Duration | \{\{widgets.MY\_WIDGET\_NAME.DialCallDuration}} |
| Dial Call SID      | \{\{widgets.MY\_WIDGET\_NAME.DialCallSid}}      |
| Dial Call Status   | \{\{widgets.MY\_WIDGET\_NAME.DialCallStatus}}   |
| Recording URL      | \{\{widgets.MY\_WIDGET\_NAME.RecordingUrl}}     |

## Example: Call multiple numbers

This example shows a user being connected to multiple contacts. The first contact to pick up the phone (even through answering machine) will be the official recipient of the call while the others will have their calls canceled.

![Twilio Studio flow showing connect call widget with numbers +11234567890, +11234567891.](https://docs-resources.prod.twilio.com/00950f3f0c7c268ac2e64b8c0daf3e4ad97e66edddff62146299bc270ffa586f.png)

## Learn more

Now that you are familiar with the Connect Call To widget, you can start building it into Flows with other widgets.

* Check out the [Split Based On... Widget](/docs/studio/widget-library/split-based-on) to learn how to split your Flow based on user conditions. For example, using the Split Based On... widget after the Connect Call To widget, you could perform different actions depending on whether or not the call was answered (using the DialCallStatus variable from the Connect Call To widget).
* The Connect Call To widget is commonly used in IVR menu applications. Check out the [tutorial for building a full IVR using Studio](/docs/studio/tutorials/how-to-build-an-ivr).
* Learn how to [Forward Calls with Twilio Studio](/docs/studio/tutorials/how-to-forward-calls) using this widget
