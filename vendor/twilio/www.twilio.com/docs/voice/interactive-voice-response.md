# Interactive Voice Response

Twilio enables you to build *IVR*, or *Interactive Voice Response*, into your business's contact center. IVR allows incoming voice dialers to navigate a phone menu to pull down the right information, perform automatic transactions and lookups, and find the right person to help. Supplement your human operators or bypass them completely for common transactions and information requests.

By combining decoded DTMF tones with some web application logic, you'll be building your call center's menu in no time. Here we've gathered snippets, tutorials, guides, and full sample applications for various IVR use cases across many web languages and frameworks.

**Not a developer? See our [IVR](https://www.twilio.com/en-us/solutions/ivr) page and our high level [Interactive Voice Response Buildout](/en-us/solutions/ivr) view.**

## Phone Tree IVR Tutorials

The most common IVR use case is to build a navigation menu for incoming callers. For common cases, this should get your customers - and potential customers - to the right department. These tutorials show how to use the [TwiML \<Gather> verb](/docs/voice/twiml/gather) with common web languages and frameworks to create a phone tree.

* [Node.js and Express.js](/docs/voice/tutorials/build-interactive-voice-response-ivr-phone-tree/node)
* [Python and Flask](/docs/voice/tutorials/build-interactive-voice-response-ivr-phone-tree/python)
* [Ruby on Rails](/docs/voice/tutorials/build-interactive-voice-response-ivr-phone-tree/ruby)
* [C# and ASP.NET MVC](/docs/voice/tutorials/build-interactive-voice-response-ivr-phone-tree/csharp)
* [Java Servlets](/docs/voice/tutorials/build-interactive-voice-response-ivr-phone-tree/java)
* [PHP and Laravel](/docs/voice/tutorials/build-interactive-voice-response-ivr-phone-tree/php)

## IVR Screening, Recording, and Transcription Guides

You can also add voicemail support to your contact center for when the call center's closed or a customer needs a callback. These sample applications use the [TwiML \<Record> Verb](/docs/voice/twiml/record) then automatically transcribe calls to text for your agents (and salespeople) to better route or handle.

* [Node.js and Express.js](https://www.twilio.com/blog/ivr-screening-recording-nodejs-express)
* [Ruby on Rails](https://www.twilio.com/blog/ivr-screening-recording-ruby-rails)
* [Java Servlets](https://www.twilio.com/blog/ivr-screening-recording-java-servlets)
* [PHP and Laravel](https://www.twilio.com/blog/ivr-screening-recording-php-laravel)
* [C# and ASP.NET MVC](https://www.twilio.com/blog/ivr-screening-recording-csharp-aspnet-mvc)

## IVR Sample Code and Customer Integrations

Your particular IVR setup will be unique to your business, but you can tie-in a lot of prior art and best practices from our sample applications and customer examples. We also give you the freedom you need to include your IVR and routing logic into Salesforce or your CRM. These links show how others have built IVRs with Twilio in the past - both with our library-supported languages and others as well.

* [Integrating a Twilio IVR with Salesforce and Call Tracking](https://www.twilio.com/blog/ringdna-twilio-call-tracking-ivr-virtual-call-center-salesforce-html)
* [RingDNA: Building a Twilio IVR with Haskell](https://www.twilio.com/blog/building-a-twilio-powered-ivr-using-haskell-html)
* [Using PHP and ngrok to Build a Jukebox Phone Tree](https://www.twilio.com/blog/emophone-how-to-build-a-twilio-powered-ivr-using-php-and-ngrok.html)
* [Implementing Long-running IVR Tasks in C# with a Twilio IVR](https://www.twilio.com/blog/handle-long-running-asynchronous-operations-studio)
* [Scaling a Twilio PHP IVR to Over 60,000 Calls a Day](https://www.twilio.com/blog/exchange-solutions-builds-an-ivr-platform-for-personal-customer-support-runs-660k-calls-in-10-days-html)
* [Building a Serverless and Codeless Twilio IVR with TaskRouter](https://www.twilio.com/blog/building-an-ivr-with-no-code-by-using-taskrouter-as-a-state-machine-html)
* [Validating Twilio IVR Webhooks with Python and Pyramid](https://www.twilio.com/blog/request-signature-authentication-ivr-python-pyramid-html)

## Help with Twilio IVR Implementation

Interactive Voice Response is both a tool and a means to an end in your contact center. The best setups tie seamlessly into tools such as [TaskRouter](/docs/taskrouter/api) to instantly assign tasks to human operators when needed, or use transcription and recording to assist your workforce. Your Twilio IVR build will save customer time and reduce negative feedback (and customer frustration!) while getting people where they need to go.

We're always ready to help you with your implementation and best practices - [get in touch with sales](https://www.twilio.com/en-us/help/sales) or [support](https://help.twilio.com) and we'll get you going with IVR in no-time flat.
