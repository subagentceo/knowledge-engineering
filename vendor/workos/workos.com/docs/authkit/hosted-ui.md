# Hosted UI

import { DocsAccordionHydrator } from "../../../components/docs-accordion-hydrator";
import { DocsAccordion } from "../../../components/docs-accordion";

## Introduction

Implementing authentication flows that handle every possible error state and edge case across multiple identity providers can be a daunting task. AuthKit makes this easy by providing a hosted, pre-built, customizable authentication UI with automatic handling of:

- Sign up, sign in, password reset, and [email verification](https://workos.com/docs/authkit/email-verification) flows.
- Enterprise [SSO](https://workos.com/docs/authkit/sso) routing and [MFA](https://workos.com/docs/authkit/mfa) enrollment.
- Automatic bot detection and blocking, to protect against brute force attacks.
- Customizable [domain](https://workos.com/docs/custom-domains/authkit) and [branding](https://workos.com/docs/authkit/branding).

![AuthKit sign-in UI](https://images.workoscdn.com/images/4d736ca3-eec8-4a90-bd14-2530c4210415.png?auto=format\&fit=clip\&q=80)

## Authentication flow

AuthKit is conceptually similar to a [Social Login (OAuth)](https://workos.com/docs/authkit/social-login) experience, but with the added benefit of being able to authenticate users with any identity provider.

AuthKit sits outside of your application code. When a user initiates a sign-in request, your application redirects them to the AuthKit URL. The user then completes the authentication process with WorkOS before being returned to the application.

Your application will exchange the resulting authorization code to retrieve an authenticated [User object](https://workos.com/docs/reference/authkit/user) and handle the session.

![AuthKit authentication flow diagram](https://images.workoscdn.com/images/0b3265fa-a209-4ca7-beaf-7d2514a3e00a.png?auto=format\&fit=clip\&q=80)\[border=false]

> The AuthKit flow abstracts away many of the UX and WorkOS API calling concerns automatically, for more guidance on integrating with AuthKit, see the [Quick Start](https://workos.com/docs/authkit) guide.

AuthKit also provides a signup flow for creating users. Available options are determined by the configured [authentication methods](https://workos.com/docs/authkit/hosted-ui/authentication-methods). If a user's email address is associated with an SSO connection, they will automatically be redirected to sign up via their IdP.

## Authentication methods

AuthKit's hosted UI supports all of the authentication methods available and will automatically adjust the available options depending on the configured methods in the *Authentication* section of the [WorkOS Dashboard](https://dashboard.workos.com).

![Dashboard displaying available authentication methods](https://images.workoscdn.com/images/ea3b2c3b-723e-462c-aa10-6b1cec1b635f.png?auto=format\&fit=clip\&q=80)

Email + Password authentication is enabled by default, though set up may be required to enable additional methods. See the relevant feature section for more information:

- [Single Sign-On](https://workos.com/docs/authkit/sso)
- [Email + Password](https://workos.com/docs/authkit/email-password)
- [Social Login](https://workos.com/docs/authkit/social-login)
- [Multi-Factor Auth](https://workos.com/docs/authkit/mfa)
- [Magic Auth](https://workos.com/docs/authkit/magic-auth)

## Localization

By default, AuthKit's hosted UI is automatically localized into many global languages.
Your users will be served in the locale that closest matches their device's OS preference.
All user-facing text, including error messages and transactional emails, are translated into the user's native tongue.

<DocsAccordion.Header as="h3">Supported locales</DocsAccordion.Header>

| Locale code | Language                | Autonym                 |
| ----------- | ----------------------- | ----------------------- |
| `af`        | Afrikaans               | Afrikaans               |
| `am`        | Amharic                 | አማርኛ                    |
| `ar`        | Arabic                  | العربية                 |
| `bg`        | Bulgarian               | Български               |
| `bn`        | Bengali (Bangla)        | বাংলা                   |
| `bs`        | Bosnian                 | Bosanski                |
| `ca`        | Catalan                 | Català                  |
| `cs`        | Czech                   | Čeština                 |
| `da`        | Danish                  | Dansk                   |
| `de`        | German                  | Deutsch                 |
| `de-DE`     | German (Germany)        | Deutsch (Deutschland)   |
| `el`        | Greek                   | Ελληνικά                |
| `en`        | English                 | English                 |
| `en-AU`     | English (Australia)     | English (Australia)     |
| `en-CA`     | English (Canada)        | English (Canada)        |
| `en-GB`     | English (UK)            | English (UK)            |
| `en-US`     | English (US)            | English (US)            |
| `es`        | Spanish                 | Español                 |
| `es-419`    | Spanish (Latin America) | Español (Latinoamérica) |
| `es-ES`     | Spanish (Spain)         | Español (España)        |
| `es-US`     | Spanish (US)            | Español (EE.UU.)        |
| `et`        | Estonian                | Eesti                   |
| `fa`        | Farsi (Persian)         | فارسی                   |
| `fi`        | Finnish                 | Suomi                   |
| `fil`       | Filipino (Tagalog)      | Filipino                |
| `fr`        | French                  | Français                |
| `fr-BE`     | French (Belgium)        | Français (Belgique)     |
| `fr-CA`     | French (Canada)         | Français (Canada)       |
| `fr-FR`     | French (France)         | Français (France)       |
| `fy`        | Frisian                 | Frysk                   |
| `gl`        | Galician                | Galego                  |
| `gu`        | Gujarati                | ગુજરાતી                 |
| `ha`        | Hausa                   | هَرْشٜن هَوْس           |
| `he`        | Hebrew                  | עברית                   |
| `hi`        | Hindi                   | हिन्दी                  |
| `hr`        | Croatian                | Hrvatski                |
| `hu`        | Hungarian               | Magyar                  |
| `hy`        | Armenian                | Հայերեն                 |
| `id`        | Indonesian              | Bahasa Indonesia        |
| `is`        | Icelandic               | Íslenska                |
| `it`        | Italian                 | Italiano                |
| `it-IT`     | Italian (Italy)         | Italiano (Italia)       |
| `ja`        | Japanese                | 日本語                  |
| `jv`        | Javanese                | ꦧꦱꦗꦮ                    |
| `ka`        | Georgian                | ქართული                 |
| `kk`        | Kazakh                  | Қазақ тілі              |
| `km`        | Khmer                   | ខេមរភាសា                |
| `kn`        | Kannada                 | ಕನ್ನಡ                   |
| `ko`        | Korean                  | 한국어                  |
| `lt`        | Lithuanian              | Lietuvių                |
| `lv`        | Latvian                 | Latviešu                |
| `mk`        | Macedonian              | Македонски              |
| `ml`        | Malayalam               | മലയാളം                  |
| `mn`        | Mongolian               | Монгол                  |
| `mr`        | Marathi                 | मराठी                   |
| `ms`        | Malay                   | Bahasa Melayu           |
| `my`        | Burmese                 | မြန်မာ                  |
| `nb`        | Norwegian Bokmål        | Norsk Bokmål            |
| `ne`        | Nepali                  | नेपाली भाषा             |
| `nl`        | Dutch                   | Nederlands              |
| `nl-BE`     | Flemish                 | Vlaams                  |
| `nl-NL`     | Dutch (Netherlands)     | Nederlands (Nederland)  |
| `nn`        | Norwegian Nynorsk       | Norsk Nynorsk           |
| `no`        | Norwegian               | Norsk                   |
| `pa`        | Punjabi                 | ਪੰਜਾਬੀ                  |
| `pl`        | Polish                  | Polski                  |
| `pt`        | Portuguese              | Português               |
| `pt-BR`     | Portuguese (Brazil)     | Português (Brasil)      |
| `pt-PT`     | Portuguese (Portugal)   | Português (Portugal)    |
| `ro`        | Romanian                | Română                  |
| `ru`        | Russian                 | Русский                 |
| `sk`        | Slovak                  | Slovenčina              |
| `sl`        | Slovenian               | Slovenščina             |
| `sq`        | Albanian                | Shqip                   |
| `sr`        | Serbian                 | Српски                  |
| `sv`        | Swedish                 | Svenska                 |
| `sw`        | Swahili                 | Kiswahili               |
| `ta`        | Tamil                   | தமிழ்                   |
| `te`        | Telugu                  | తెలుగు                  |
| `th`        | Thai                    | ไทย                     |
| `tr`        | Turkish                 | Türkçe                  |
| `uk`        | Ukrainian               | Українська              |
| `ur`        | Urdu                    | اُردُو                  |
| `uz`        | Uzbek                   | Ózbekça                 |
| `vi`        | Vietnamese              | Tiếng Việt              |
| `zh`        | Chinese                 | 中文                    |
| `zh-CN`     | Chinese (Simplified)    | 中文 (中国)             |
| `zh-HK`     | Chinese (Hong Kong)     | 中文（香港）            |
| `zh-TW`     | Chinese (Taiwan)        | 中文（台灣）            |
| `zu`        | Zulu                    | isiZulu                 |

In cases where a user's browser does not send their preferred locale, or when AuthKit cannot identify a match, the user is served in the environment's **fallback language**. The fallback language can be configured [in the dashboard](https://dashboard.workos.com/environment/authentication/features) in the *Authentication > Features > Localization* section.

![With localization, you can change the environment's fallback language](https://images.workoscdn.com/images/bb8c017b-f9cd-4882-baa2-b38e01a51875.png?auto=format\&fit=clip\&q=50)

## Integrating

Integration into your app is quick and easy, though the route you choose varies depending on your specific requirements:

### (A) Integrate with AuthKit's Hosted UI

In just a few lines of code, you can add AuthKit to your app and start authenticating users. See the [quick start](https://workos.com/docs/authkit) guide for more information.

### (B) Build your own authentication flows

While the hosted solution is the fastest way to get started, if you'd prefer to build and manage your own authentication UI, you can do so via the [AuthKit API](https://workos.com/docs/reference/authkit).

Examples of building custom UI are [available on GitHub](https://github.com/workos/authkit).
