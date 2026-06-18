# Verify supported languages

Language translations are defined by a locale value, also known as a "language tag". For example, the locale value for English (American) is `en`.

For any type of Verify template used, the locale will automatically resolve based on the country code of the phone number provided for Verifications sent using the SMS, Voice, or WhatsApp channels, with `en` or a custom template's default language as the fallback locale if a translation is not available. See a list of [phone number country code to language mappings here](/docs/verify/default-phone-verification-languages). Using this automatic resolution is highly recommended. If a language override is desired, you can specify the `locale` parameter when creating a Verification.

The locale values follow country-region format as described in [IETF's BPC 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) for the languages listed below. If an unsupported override locale is given, a 404 error will be returned. In that case, we recommend that you retry the request without the `locale` parameter to implement a fallback to the country code's default language or English.

> \[!WARNING]
>
> SMS messages sent with Programmable Messaging or Verify are priced per [message segment](/docs/glossary/what-sms-character-limit).
>
> Messages sent in certain language locales, including `pt`, `pt_BR`, `cs`, and `el` or in non-GSM characters may be split into multiple message segments. You can check how many message segments your message will use with the [Messaging Segment Calculator tool](https://twiliodeved.github.io/message-segment-calculator/).
>
> Learn more about [how to limit message segments in our developer best practices](/docs/verify/developer-best-practices#limit-sms-messages-to-one-message-segment-to-avoid-extra-cost).

## Language support and template types

Language support depends on the type of Verify template used (Verify Default, pre-approved, custom, WhatsApp copy code authentication) and the channel (SMS, Voice, RCS, or WhatsApp) through which the message is sent. [Learn more about template types](/docs/verify/verification-templates).

**Note**: Verify Email and SNA channels don't support language translations.

### Verify Default templates

The Verify Default template is used automatically if no pre-approved or custom template is specified in your Verification request or set as the service default.

### Pre-approved templates

Pre-approved templates support only a subset of the languages available in Verify. Twilio continues to add more translations and expand language support over time.

* To check the available languages per-template via API:
  1. View available templates using the [Get a List of Available Templates endpoint](/docs/verify/api/templates#get-a-list-of-available-templates).
  2. Check the `translations` property of the template to see supported languages.
* To check the available languages per-template via Twilio Console:
  1. Navigate to [Twilio Console > Verify > Services](https://console.twilio.com/us1/develop/verify/services) page and select your Verify Service.
  2. On the **Settings** page under the **General** tab, select a **Message body** under the **Template configuration** heading.
  3. Check the **Message preview** section for **Locale Preview** dropdown for a list of supported languages.

### Custom templates

The template requester must provide translations when [making a request to create a custom template](https://help.twilio.com/hc/en-us/articles/9960174409627-Is-it-Possible-to-Customize-the-Verification-Message-for-Verify-?_ga=2.225611679.482191695.1669671495-1879743973.1650468405).

Each translation must be mapped to a locale value. The template requester can define the locale value, but it must follow these rules:

* The locale value must be in XX (e.g. `pt`) or XX-XX (e.g. `pt-br`) format.
* The locale value must use locale "component" values as defined by [IETF's BPC 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt).

### WhatsApp copy code authentication templates

WhatsApp OTP messages are sent via [WhatsApp copy code authentication templates](https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates/copy-code-button-authentication-templates)
that are pre-defined by Meta.

## Verify language support

***

Channel: RCS
Template type: Custom
Language: Abkhaz
Language tag/Verify locale: ab
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Abkhaz
Language tag/Verify locale: ab
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Abkhaz
Language tag/Verify locale: ab
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Afar
Language tag/Verify locale: aa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Afar
Language tag/Verify locale: aa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Afar
Language tag/Verify locale: aa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Afrikaans
Language tag/Verify locale: af
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Afrikaans
Language tag/Verify locale: af
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Akan
Language tag/Verify locale: ak
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Akan
Language tag/Verify locale: ak
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Akan
Language tag/Verify locale: ak
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Albanian
Language tag/Verify locale: sq
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Albanian
Language tag/Verify locale: sq
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Albanian
Language tag/Verify locale: sq
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Amharic
Language tag/Verify locale: am
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Amharic
Language tag/Verify locale: am
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Amharic
Language tag/Verify locale: am
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Arabic
Language tag/Verify locale: ar
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Arabic
Language tag/Verify locale: ar
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Aragonese
Language tag/Verify locale: an
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Aragonese
Language tag/Verify locale: an
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Aragonese
Language tag/Verify locale: an
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Armenian
Language tag/Verify locale: hy
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Armenian
Language tag/Verify locale: hy
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Armenian
Language tag/Verify locale: hy
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Assamese
Language tag/Verify locale: as
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Assamese
Language tag/Verify locale: as
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Assamese
Language tag/Verify locale: as
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Avaric
Language tag/Verify locale: av
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Avaric
Language tag/Verify locale: av
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Avaric
Language tag/Verify locale: av
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Avestan
Language tag/Verify locale: ae
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Avestan
Language tag/Verify locale: ae
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Avestan
Language tag/Verify locale: ae
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Aymara
Language tag/Verify locale: ay
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Aymara
Language tag/Verify locale: ay
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Aymara
Language tag/Verify locale: ay
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Azerbaijani
Language tag/Verify locale: az
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Azerbaijani
Language tag/Verify locale: az
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Azerbaijani
Language tag/Verify locale: az
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Bambara
Language tag/Verify locale: bm
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Bambara
Language tag/Verify locale: bm
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Bambara
Language tag/Verify locale: bm
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Bashkir
Language tag/Verify locale: ba
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Bashkir
Language tag/Verify locale: ba
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Bashkir
Language tag/Verify locale: ba
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Basque
Language tag/Verify locale: eu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Basque
Language tag/Verify locale: eu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Basque
Language tag/Verify locale: eu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Belarusian
Language tag/Verify locale: be
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Belarusian
Language tag/Verify locale: be
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Belarusian
Language tag/Verify locale: be
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Bengali
Language tag/Verify locale: bn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Bengali
Language tag/Verify locale: bn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Bengali
Language tag/Verify locale: bn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Bihari
Language tag/Verify locale: bh
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Bihari
Language tag/Verify locale: bh
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Bihari
Language tag/Verify locale: bh
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Bislama
Language tag/Verify locale: bi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Bislama
Language tag/Verify locale: bi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Bislama
Language tag/Verify locale: bi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Bosnian
Language tag/Verify locale: bs
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Bosnian
Language tag/Verify locale: bs
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Bosnian
Language tag/Verify locale: bs
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Breton
Language tag/Verify locale: br
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Breton
Language tag/Verify locale: br
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Breton
Language tag/Verify locale: br
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Bulgarian
Language tag/Verify locale: bg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Bulgarian
Language tag/Verify locale: bg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Bulgarian
Language tag/Verify locale: bg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Burmese
Language tag/Verify locale: my
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Burmese
Language tag/Verify locale: my
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Burmese
Language tag/Verify locale: my
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Catalan
Language tag/Verify locale: ca
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Catalan
Language tag/Verify locale: ca
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Catalan
Language tag/Verify locale: ca
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Chamorro
Language tag/Verify locale: ch
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Chamorro
Language tag/Verify locale: ch
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Chamorro
Language tag/Verify locale: ch
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Chechen
Language tag/Verify locale: ce
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Chechen
Language tag/Verify locale: ce
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Chechen
Language tag/Verify locale: ce
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Chichewa, Chewa, Nyanja
Language tag/Verify locale: ny
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Chichewa, Chewa, Nyanja
Language tag/Verify locale: ny
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Chichewa, Chewa, Nyanja
Language tag/Verify locale: ny
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Chinese (Simplified Hong Kong)
Language tag/Verify locale: zh-HK
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Chinese (Simplified Hong Kong)
Language tag/Verify locale: zh-HK
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Chinese (Simplified Hong Kong)
Language tag/Verify locale: zh-HK
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Chinese (Simplified mainland)
Language tag/Verify locale: zh or zh-CN
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Chinese (Simplified mainland)
Language tag/Verify locale: zh or zh-CN
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Chinese (Simplified mainland)
Language tag/Verify locale: zh or zh-CN
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Church Slavic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Church Slavic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Church Slavic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Church Slavonic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Church Slavonic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Church Slavonic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Chuvash
Language tag/Verify locale: cv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Chuvash
Language tag/Verify locale: cv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Chuvash
Language tag/Verify locale: cv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Cornish
Language tag/Verify locale: kw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Cornish
Language tag/Verify locale: kw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Cornish
Language tag/Verify locale: kw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Corsican
Language tag/Verify locale: co
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Corsican
Language tag/Verify locale: co
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Corsican
Language tag/Verify locale: co
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Cree
Language tag/Verify locale: cr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Cree
Language tag/Verify locale: cr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Cree
Language tag/Verify locale: cr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Croatian
Language tag/Verify locale: hr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Croatian
Language tag/Verify locale: hr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Czech
Language tag/Verify locale: cs
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Czech
Language tag/Verify locale: cs
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Danish
Language tag/Verify locale: da
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Danish
Language tag/Verify locale: da
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Danish
Language tag/Verify locale: da
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Divehi, Dhivehi, Maldivian
Language tag/Verify locale: dv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Divehi, Dhivehi, Maldivian
Language tag/Verify locale: dv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Divehi, Dhivehi, Maldivian
Language tag/Verify locale: dv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Dutch
Language tag/Verify locale: nl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Dutch
Language tag/Verify locale: nl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Dutch
Language tag/Verify locale: nl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: English (American)
Language tag/Verify locale: en
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: English (American)
Language tag/Verify locale: en
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: English (American)
Language tag/Verify locale: en
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: English (British)
Language tag/Verify locale: en-GB
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Esperanto
Language tag/Verify locale: eo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Esperanto
Language tag/Verify locale: eo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Esperanto
Language tag/Verify locale: eo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Estonian
Language tag/Verify locale: et
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Estonian
Language tag/Verify locale: et
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Ewe
Language tag/Verify locale: ee
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Ewe
Language tag/Verify locale: ee
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Ewe
Language tag/Verify locale: ee
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Faroese
Language tag/Verify locale: fo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Faroese
Language tag/Verify locale: fo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Faroese
Language tag/Verify locale: fo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Fijian
Language tag/Verify locale: fj
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Fijian
Language tag/Verify locale: fj
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Fijian
Language tag/Verify locale: fj
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Finnish
Language tag/Verify locale: fi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Finnish
Language tag/Verify locale: fi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Finnish
Language tag/Verify locale: fi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: French
Language tag/Verify locale: fr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: French
Language tag/Verify locale: fr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: French
Language tag/Verify locale: fr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Fula, Fulah, Pulaar, Pular
Language tag/Verify locale: ff
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Fula, Fulah, Pulaar, Pular
Language tag/Verify locale: ff
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Fula, Fulah, Pulaar, Pular
Language tag/Verify locale: ff
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Galician
Language tag/Verify locale: gl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Galician
Language tag/Verify locale: gl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Galician
Language tag/Verify locale: gl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Georgian
Language tag/Verify locale: ka
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Georgian
Language tag/Verify locale: ka
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Georgian
Language tag/Verify locale: ka
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: German
Language tag/Verify locale: de
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: German
Language tag/Verify locale: de
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: German
Language tag/Verify locale: de
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Greek
Language tag/Verify locale: el
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Greek
Language tag/Verify locale: el
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Guaraní
Language tag/Verify locale: gn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Guaraní
Language tag/Verify locale: gn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Guaraní
Language tag/Verify locale: gn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Gujarati
Language tag/Verify locale: gu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Gujarati
Language tag/Verify locale: gu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Gujarati
Language tag/Verify locale: gu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Haitian, Haitian Creole
Language tag/Verify locale: ht
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Haitian, Haitian Creole
Language tag/Verify locale: ht
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Haitian, Haitian Creole
Language tag/Verify locale: ht
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Hausa
Language tag/Verify locale: ha
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Hausa
Language tag/Verify locale: ha
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Hausa
Language tag/Verify locale: ha
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Hebrew
Language tag/Verify locale: he
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Hebrew
Language tag/Verify locale: he
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Herero
Language tag/Verify locale: hz
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Herero
Language tag/Verify locale: hz
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Herero
Language tag/Verify locale: hz
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Hindi
Language tag/Verify locale: hi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Hindi
Language tag/Verify locale: hi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Hiri Motu
Language tag/Verify locale: ho
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Hiri Motu
Language tag/Verify locale: ho
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Hiri Motu
Language tag/Verify locale: ho
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Hungarian
Language tag/Verify locale: hu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Hungarian
Language tag/Verify locale: hu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Icelandic
Language tag/Verify locale: is
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Icelandic
Language tag/Verify locale: is
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Icelandic
Language tag/Verify locale: is
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Ido
Language tag/Verify locale: io
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Ido
Language tag/Verify locale: io
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Ido
Language tag/Verify locale: io
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Igbo
Language tag/Verify locale: ig
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Igbo
Language tag/Verify locale: ig
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Igbo
Language tag/Verify locale: ig
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Indonesian
Language tag/Verify locale: id
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Indonesian
Language tag/Verify locale: id
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Interlingua
Language tag/Verify locale: ia
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Interlingua
Language tag/Verify locale: ia
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Interlingua
Language tag/Verify locale: ia
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Interlingue
Language tag/Verify locale: ie
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Interlingue
Language tag/Verify locale: ie
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Interlingue
Language tag/Verify locale: ie
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Inuktitut
Language tag/Verify locale: iu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Inuktitut
Language tag/Verify locale: iu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Inuktitut
Language tag/Verify locale: iu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Inupiaq
Language tag/Verify locale: ik
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Inupiaq
Language tag/Verify locale: ik
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Inupiaq
Language tag/Verify locale: ik
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Irish
Language tag/Verify locale: ga
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Irish
Language tag/Verify locale: ga
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Irish
Language tag/Verify locale: ga
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Italian
Language tag/Verify locale: it
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Italian
Language tag/Verify locale: it
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Italian
Language tag/Verify locale: it
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Japanese
Language tag/Verify locale: ja
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Japanese
Language tag/Verify locale: ja
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Japanese
Language tag/Verify locale: ja
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Javanese
Language tag/Verify locale: jv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Javanese
Language tag/Verify locale: jv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Javanese
Language tag/Verify locale: jv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kalaallisut, Greenlandic
Language tag/Verify locale: kl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kalaallisut, Greenlandic
Language tag/Verify locale: kl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kalaallisut, Greenlandic
Language tag/Verify locale: kl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Kannada
Language tag/Verify locale: kn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Kannada
Language tag/Verify locale: kn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kanuri
Language tag/Verify locale: kr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kanuri
Language tag/Verify locale: kr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kanuri
Language tag/Verify locale: kr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kashmiri
Language tag/Verify locale: ks
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kashmiri
Language tag/Verify locale: ks
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kashmiri
Language tag/Verify locale: ks
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kazakh
Language tag/Verify locale: kk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kazakh
Language tag/Verify locale: kk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kazakh
Language tag/Verify locale: kk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Khmer
Language tag/Verify locale: km
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Khmer
Language tag/Verify locale: km
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Khmer
Language tag/Verify locale: km
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kikuyu, Gikuyu
Language tag/Verify locale: ki
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kikuyu, Gikuyu
Language tag/Verify locale: ki
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kikuyu, Gikuyu
Language tag/Verify locale: ki
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kinyarwanda
Language tag/Verify locale: rw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kinyarwanda
Language tag/Verify locale: rw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kinyarwanda
Language tag/Verify locale: rw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kirghiz, Kyrgyz
Language tag/Verify locale: ky
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kirghiz, Kyrgyz
Language tag/Verify locale: ky
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kirghiz, Kyrgyz
Language tag/Verify locale: ky
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kirundi
Language tag/Verify locale: rn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kirundi
Language tag/Verify locale: rn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kirundi
Language tag/Verify locale: rn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Komi
Language tag/Verify locale: kv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Komi
Language tag/Verify locale: kv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Komi
Language tag/Verify locale: kv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kongo
Language tag/Verify locale: kg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kongo
Language tag/Verify locale: kg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kongo
Language tag/Verify locale: kg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Korean
Language tag/Verify locale: ko
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Korean
Language tag/Verify locale: ko
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Korean
Language tag/Verify locale: ko
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kurdish
Language tag/Verify locale: ku
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kurdish
Language tag/Verify locale: ku
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kurdish
Language tag/Verify locale: ku
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Kwanyama, Kuanyama
Language tag/Verify locale: kj
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Kwanyama, Kuanyama
Language tag/Verify locale: kj
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Kwanyama, Kuanyama
Language tag/Verify locale: kj
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Lao
Language tag/Verify locale: lo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Lao
Language tag/Verify locale: lo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Lao
Language tag/Verify locale: lo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Latin
Language tag/Verify locale: la
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Latin
Language tag/Verify locale: la
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Latin
Language tag/Verify locale: la
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Latvian
Language tag/Verify locale: lv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Latvian
Language tag/Verify locale: lv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Latvian
Language tag/Verify locale: lv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Limburgish, Limburgan, Limburger
Language tag/Verify locale: li
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Limburgish, Limburgan, Limburger
Language tag/Verify locale: li
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Limburgish, Limburgan, Limburger
Language tag/Verify locale: li
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Lingala
Language tag/Verify locale: ln
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Lingala
Language tag/Verify locale: ln
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Lingala
Language tag/Verify locale: ln
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Lithuanian
Language tag/Verify locale: lt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Lithuanian
Language tag/Verify locale: lt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Lithuanian
Language tag/Verify locale: lt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Lithuanian
Language tag/Verify locale: lt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Lithuanian
Language tag/Verify locale: lt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Luba-Katanga
Language tag/Verify locale: lu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Luba-Katanga
Language tag/Verify locale: lu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Luba-Katanga
Language tag/Verify locale: lu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Luganda
Language tag/Verify locale: lg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Luganda
Language tag/Verify locale: lg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Luganda
Language tag/Verify locale: lg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Luxembourgish, Letzeburgesch
Language tag/Verify locale: lb
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Luxembourgish, Letzeburgesch
Language tag/Verify locale: lb
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Luxembourgish, Letzeburgesch
Language tag/Verify locale: lb
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Macedonian
Language tag/Verify locale: mk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Macedonian
Language tag/Verify locale: mk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Macedonian
Language tag/Verify locale: mk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Malagasy
Language tag/Verify locale: mg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Malagasy
Language tag/Verify locale: mg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Malagasy
Language tag/Verify locale: mg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Malay
Language tag/Verify locale: ms
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Malay
Language tag/Verify locale: ms
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Malayalam
Language tag/Verify locale: ml
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Malayalam
Language tag/Verify locale: ml
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Malayalam
Language tag/Verify locale: ml
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Maltese
Language tag/Verify locale: mt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Maltese
Language tag/Verify locale: mt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Maltese
Language tag/Verify locale: mt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Manx
Language tag/Verify locale: gv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Manx
Language tag/Verify locale: gv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Manx
Language tag/Verify locale: gv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Māori
Language tag/Verify locale: mi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Māori
Language tag/Verify locale: mi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Māori
Language tag/Verify locale: mi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Marathi
Language tag/Verify locale: mr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Marathi
Language tag/Verify locale: mr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Marshallese
Language tag/Verify locale: mh
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Marshallese
Language tag/Verify locale: mh
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Marshallese
Language tag/Verify locale: mh
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Mongolian
Language tag/Verify locale: mn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Mongolian
Language tag/Verify locale: mn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Mongolian
Language tag/Verify locale: mn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Nauru
Language tag/Verify locale: na
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Nauru
Language tag/Verify locale: na
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Nauru
Language tag/Verify locale: na
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Navajo, Navaho
Language tag/Verify locale: nv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Navajo, Navaho
Language tag/Verify locale: nv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Navajo, Navaho
Language tag/Verify locale: nv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Ndonga
Language tag/Verify locale: ng
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Ndonga
Language tag/Verify locale: ng
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Ndonga
Language tag/Verify locale: ng
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Nepali
Language tag/Verify locale: ne
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Nepali
Language tag/Verify locale: ne
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Nepali
Language tag/Verify locale: ne
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: North Ndebele
Language tag/Verify locale: nd
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: North Ndebele
Language tag/Verify locale: nd
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: North Ndebele
Language tag/Verify locale: nd
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Northern Sami
Language tag/Verify locale: se
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Northern Sami
Language tag/Verify locale: se
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Northern Sami
Language tag/Verify locale: se
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Norwegian
Language tag/Verify locale: nb
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Norwegian
Language tag/Verify locale: no
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Norwegian
Language tag/Verify locale: nb
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Norwegian
Language tag/Verify locale: nb
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Norwegian
Language tag/Verify locale: no
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Norwegian
Language tag/Verify locale: no
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Norwegian Nynorsk
Language tag/Verify locale: nn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Norwegian Nynorsk
Language tag/Verify locale: nn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Norwegian Nynorsk
Language tag/Verify locale: nn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Nuosu
Language tag/Verify locale: ii
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Nuosu
Language tag/Verify locale: ii
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Nuosu
Language tag/Verify locale: ii
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Occitan
Language tag/Verify locale: oc
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Occitan
Language tag/Verify locale: oc
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Occitan
Language tag/Verify locale: oc
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Ojibwe, Ojibwa
Language tag/Verify locale: oj
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Ojibwe, Ojibwa
Language tag/Verify locale: oj
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Ojibwe, Ojibwa
Language tag/Verify locale: oj
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Old Bulgarian
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Old Bulgarian
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Old Bulgarian
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Old Church Slavonic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Old Church Slavonic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Old Church Slavonic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Old Slavonic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Old Slavonic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Old Slavonic
Language tag/Verify locale: cu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Oriya
Language tag/Verify locale: or
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Oriya
Language tag/Verify locale: or
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Oriya
Language tag/Verify locale: or
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Oromo
Language tag/Verify locale: om
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Oromo
Language tag/Verify locale: om
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Oromo
Language tag/Verify locale: om
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Ossetian, Ossetic
Language tag/Verify locale: os
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Ossetian, Ossetic
Language tag/Verify locale: os
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Ossetian, Ossetic
Language tag/Verify locale: os
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Pāli
Language tag/Verify locale: pi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Pāli
Language tag/Verify locale: pi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Pāli
Language tag/Verify locale: pi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Panjabi, Punjabi
Language tag/Verify locale: pa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Panjabi, Punjabi
Language tag/Verify locale: pa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Panjabi, Punjabi
Language tag/Verify locale: pa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Pashto, Pushto
Language tag/Verify locale: ps
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Pashto, Pushto
Language tag/Verify locale: ps
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Pashto, Pushto
Language tag/Verify locale: ps
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Persian
Language tag/Verify locale: fa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Persian
Language tag/Verify locale: fa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Persian
Language tag/Verify locale: fa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Polish
Language tag/Verify locale: pl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Polish
Language tag/Verify locale: pl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Polish
Language tag/Verify locale: pl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Portuguese
Language tag/Verify locale: pt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Portuguese
Language tag/Verify locale: pt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Portuguese
Language tag/Verify locale: pt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Portuguese (Brazilian)
Language tag/Verify locale: pt-BR
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Portuguese (Brazilian)
Language tag/Verify locale: pt-BR
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Portuguese (Brazilian)
Language tag/Verify locale: pt-BR
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Quechua
Language tag/Verify locale: qu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Quechua
Language tag/Verify locale: qu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Quechua
Language tag/Verify locale: qu
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Romanian
Language tag/Verify locale: ro
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Romanian
Language tag/Verify locale: ro
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Romansh
Language tag/Verify locale: rm
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Romansh
Language tag/Verify locale: rm
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Romansh
Language tag/Verify locale: rm
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Russian
Language tag/Verify locale: ru
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Russian
Language tag/Verify locale: ru
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Russian
Language tag/Verify locale: ru
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Samoan
Language tag/Verify locale: sm
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Samoan
Language tag/Verify locale: sm
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Samoan
Language tag/Verify locale: sm
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Sango
Language tag/Verify locale: sg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Sango
Language tag/Verify locale: sg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Sango
Language tag/Verify locale: sg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Sanskrit (Saṁskṛta)
Language tag/Verify locale: sa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Sanskrit (Saṁskṛta)
Language tag/Verify locale: sa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Sanskrit (Saṁskṛta)
Language tag/Verify locale: sa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Sardinian
Language tag/Verify locale: sc
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Sardinian
Language tag/Verify locale: sc
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Sardinian
Language tag/Verify locale: sc
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Scottish Gaelic, Gaelic
Language tag/Verify locale: gd
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Scottish Gaelic, Gaelic
Language tag/Verify locale: gd
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Scottish Gaelic, Gaelic
Language tag/Verify locale: gd
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Serbian
Language tag/Verify locale: sr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Serbian
Language tag/Verify locale: sr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Serbian
Language tag/Verify locale: sr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Shona
Language tag/Verify locale: sn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Shona
Language tag/Verify locale: sn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Shona
Language tag/Verify locale: sn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Sindhi
Language tag/Verify locale: sd
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Sindhi
Language tag/Verify locale: sd
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Sindhi
Language tag/Verify locale: sd
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Sinhala, Sinhalese
Language tag/Verify locale: si
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Sinhala, Sinhalese
Language tag/Verify locale: si
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Sinhala, Sinhalese
Language tag/Verify locale: si
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Slovak
Language tag/Verify locale: sk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Slovak
Language tag/Verify locale: sk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Slovene
Language tag/Verify locale: sl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Slovene
Language tag/Verify locale: sl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Slovene
Language tag/Verify locale: sl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Somali
Language tag/Verify locale: so
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Somali
Language tag/Verify locale: so
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Somali
Language tag/Verify locale: so
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: South Ndebele
Language tag/Verify locale: nr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: South Ndebele
Language tag/Verify locale: nr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: South Ndebele
Language tag/Verify locale: nr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Southern Sotho
Language tag/Verify locale: st
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Southern Sotho
Language tag/Verify locale: st
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Southern Sotho
Language tag/Verify locale: st
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Spanish
Language tag/Verify locale: es
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Spanish
Language tag/Verify locale: es
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Spanish
Language tag/Verify locale: es
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Sundanese
Language tag/Verify locale: su
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Sundanese
Language tag/Verify locale: su
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Sundanese
Language tag/Verify locale: su
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Swahili
Language tag/Verify locale: sw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Swahili
Language tag/Verify locale: sw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Swahili
Language tag/Verify locale: sw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Swati
Language tag/Verify locale: ss
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Swati
Language tag/Verify locale: ss
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Swati
Language tag/Verify locale: ss
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Swedish
Language tag/Verify locale: sv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Swedish
Language tag/Verify locale: sv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Default
Language: Swedish
Language tag/Verify locale: sv
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Tagalog
Language tag/Verify locale: tl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Tagalog
Language tag/Verify locale: tl
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Tahitian
Language tag/Verify locale: ty
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Tahitian
Language tag/Verify locale: ty
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Tahitian
Language tag/Verify locale: ty
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Tajik
Language tag/Verify locale: tg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Tajik
Language tag/Verify locale: tg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Tajik
Language tag/Verify locale: tg
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Tamil
Language tag/Verify locale: ta
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Tamil
Language tag/Verify locale: ta
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Tamil
Language tag/Verify locale: ta
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Tatar
Language tag/Verify locale: tt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Tatar
Language tag/Verify locale: tt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Tatar
Language tag/Verify locale: tt
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Telugu
Language tag/Verify locale: te
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Telugu
Language tag/Verify locale: te
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Thai
Language tag/Verify locale: th
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Thai
Language tag/Verify locale: th
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Tibetan Standard, Tibetan, Central
Language tag/Verify locale: bo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Tibetan Standard, Tibetan, Central
Language tag/Verify locale: bo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Tibetan Standard, Tibetan, Central
Language tag/Verify locale: bo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Tigrinya
Language tag/Verify locale: ti
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Tigrinya
Language tag/Verify locale: ti
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Tigrinya
Language tag/Verify locale: ti
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Tonga (Tonga Islands)
Language tag/Verify locale: to
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Tonga (Tonga Islands)
Language tag/Verify locale: to
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Tonga (Tonga Islands)
Language tag/Verify locale: to
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Tsonga
Language tag/Verify locale: ts
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Tsonga
Language tag/Verify locale: ts
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Tsonga
Language tag/Verify locale: ts
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Tswana
Language tag/Verify locale: tn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Tswana
Language tag/Verify locale: tn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Tswana
Language tag/Verify locale: tn
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Turkish
Language tag/Verify locale: tr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Turkish
Language tag/Verify locale: tr
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Turkmen
Language tag/Verify locale: tk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Turkmen
Language tag/Verify locale: tk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Turkmen
Language tag/Verify locale: tk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Twi
Language tag/Verify locale: tw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Twi
Language tag/Verify locale: tw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Twi
Language tag/Verify locale: tw
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Uighur, Uyghur
Language tag/Verify locale: ug
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Uighur, Uyghur
Language tag/Verify locale: ug
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Uighur, Uyghur
Language tag/Verify locale: ug
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Ukrainian
Language tag/Verify locale: uk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Ukrainian
Language tag/Verify locale: uk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Ukrainian
Language tag/Verify locale: uk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Ukrainian
Language tag/Verify locale: uk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Ukrainian
Language tag/Verify locale: uk
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Urdu
Language tag/Verify locale: ur
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Urdu
Language tag/Verify locale: ur
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Urdu
Language tag/Verify locale: ur
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Uzbek
Language tag/Verify locale: uz
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Uzbek
Language tag/Verify locale: uz
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Uzbek
Language tag/Verify locale: uz
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Venda
Language tag/Verify locale: ve
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Venda
Language tag/Verify locale: ve
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Venda
Language tag/Verify locale: ve
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Default
Language: Vietnamese
Language tag/Verify locale: vi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Default
Language: Vietnamese
Language tag/Verify locale: vi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Volapük
Language tag/Verify locale: vo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Volapük
Language tag/Verify locale: vo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Volapük
Language tag/Verify locale: vo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Walloon
Language tag/Verify locale: wa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Walloon
Language tag/Verify locale: wa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Walloon
Language tag/Verify locale: wa
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Welsh
Language tag/Verify locale: cy
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Welsh
Language tag/Verify locale: cy
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Welsh
Language tag/Verify locale: cy
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Western Frisian
Language tag/Verify locale: fy
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Western Frisian
Language tag/Verify locale: fy
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Western Frisian
Language tag/Verify locale: fy
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Wolof
Language tag/Verify locale: wo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Wolof
Language tag/Verify locale: wo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Wolof
Language tag/Verify locale: wo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Xhosa
Language tag/Verify locale: xh
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Xhosa
Language tag/Verify locale: xh
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Xhosa
Language tag/Verify locale: xh
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Yiddish
Language tag/Verify locale: yi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Yiddish
Language tag/Verify locale: yi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Yiddish
Language tag/Verify locale: yi
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Yoruba
Language tag/Verify locale: yo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Yoruba
Language tag/Verify locale: yo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Yoruba
Language tag/Verify locale: yo
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: RCS
Template type: Custom
Language: Zhuang, Chuang
Language tag/Verify locale: za
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: SMS
Template type: Custom
Language: Zhuang, Chuang
Language tag/Verify locale: za
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: Voice
Template type: Custom
Language: Zhuang, Chuang
Language tag/Verify locale: za
WhatsApp locale:&#x20;
Copy code text:&#x20;

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Afrikaans
Language tag/Verify locale: af
WhatsApp locale: af
Copy code text: Kopieer kode

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Albanian
Language tag/Verify locale: sq
WhatsApp locale: sq
Copy code text: Kopjo kodin

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Arabic
Language tag/Verify locale: ar
WhatsApp locale: ar
Copy code text: رمز النسخ

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Azerbaijani
Language tag/Verify locale: az
WhatsApp locale: az
Copy code text: Kodu kopyalayın

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Bengali
Language tag/Verify locale: bn
WhatsApp locale: bn
Copy code text: কোড কপি করুন

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Bulgarian
Language tag/Verify locale: bg
WhatsApp locale: bg
Copy code text: Копирайте кода

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Catalan
Language tag/Verify locale: ca
WhatsApp locale: ca
Copy code text: Copia el codi

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Chinese (Simplified mainland)
Language tag/Verify locale: zh-cn
WhatsApp locale: zh\_CN
Copy code text: 复制验证码

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Chinese (Simplified Hong Kong)
Language tag/Verify locale: zh-hk
WhatsApp locale: zh\_HK
Copy code text: 複製驗證碼

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Chinese (Traditional)
Language tag/Verify locale: zh-tw
WhatsApp locale: zh\_TW
Copy code text: 複製驗證碼

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Croatian
Language tag/Verify locale: hr
WhatsApp locale: hr
Copy code text: Kopiraj kod

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Czech
Language tag/Verify locale: cs
WhatsApp locale: cs
Copy code text: Kopírovat kód

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Danish
Language tag/Verify locale: da
WhatsApp locale: da
Copy code text: Kopiér kode

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Dutch
Language tag/Verify locale: nl
WhatsApp locale: nl
Copy code text: Kopieer code

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: English (American)
Language tag/Verify locale: en
WhatsApp locale: en
Copy code text: Copy code

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: English (British)
Language tag/Verify locale: en-gb
WhatsApp locale: en\_GB
Copy code text: Copy code

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: English (US)
Language tag/Verify locale: en-us
WhatsApp locale: en\_US
Copy code text: Copy code

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Estonian
Language tag/Verify locale: et
WhatsApp locale: et
Copy code text: Kopeeri kood

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Filipino
Language tag/Verify locale: fil
WhatsApp locale: fil
Copy code text: Kopyahin ang code

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Finnish
Language tag/Verify locale: fi
WhatsApp locale: fi
Copy code text: Kopioi koodi

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: French
Language tag/Verify locale: fr
WhatsApp locale: fr
Copy code text: Copier le code

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Georgian
Language tag/Verify locale: ka
WhatsApp locale: ka
Copy code text: დააკოპირეთ კოდი

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: German
Language tag/Verify locale: de
WhatsApp locale: de
Copy code text: Code kopieren

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Greek
Language tag/Verify locale: el
WhatsApp locale: el
Copy code text: Αντιγραφή κωδικού

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Gujarati
Language tag/Verify locale: gu
WhatsApp locale: gu
Copy code text: કોડ કૉપિ કરો

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Hausa
Language tag/Verify locale: ha
WhatsApp locale: ha
Copy code text: Kwafi lambar

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Hebrew
Language tag/Verify locale: he
WhatsApp locale: he
Copy code text: העתק קוד

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Hindi
Language tag/Verify locale: hi
WhatsApp locale: hi
Copy code text: कोड कॉपी करें

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Hungarian
Language tag/Verify locale: hu
WhatsApp locale: hu
Copy code text: Kód másolása

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Indonesian
Language tag/Verify locale: id
WhatsApp locale: id
Copy code text: Salin kode

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Irish
Language tag/Verify locale: ga
WhatsApp locale: ga
Copy code text: Cóipeáil cód

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Italian
Language tag/Verify locale: it
WhatsApp locale: it
Copy code text: Copia il codice

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Japanese
Language tag/Verify locale: ja
WhatsApp locale: ja
Copy code text: コードをコピーする

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Kannada
Language tag/Verify locale: kn
WhatsApp locale: kn
Copy code text: ಕೋಡ್ ನಕಲಿಸಿ

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Kazakh
Language tag/Verify locale: kk
WhatsApp locale: kk
Copy code text: Кодты көшіру

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Kinyarwanda
Language tag/Verify locale: rw
WhatsApp locale: rw\_RW
Copy code text: Gukoporora kode

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Korean
Language tag/Verify locale: ko
WhatsApp locale: ko
Copy code text: 코드 복사

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Kyrgyz
Language tag/Verify locale: ky
WhatsApp locale: ky\_KG
Copy code text: Кодду көчүрүү

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Lao
Language tag/Verify locale: lo
WhatsApp locale: lo
Copy code text: ສຳເນົາລະຫັດ

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Latvian
Language tag/Verify locale: lv
WhatsApp locale: lv
Copy code text: Kopēt kodu

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Lithuanian
Language tag/Verify locale: lt
WhatsApp locale: lt
Copy code text: Nukopijuokite kodą

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Macedonian
Language tag/Verify locale: mk
WhatsApp locale: mk
Copy code text: Копирајте го кодот

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Malay
Language tag/Verify locale: ms
WhatsApp locale: ms
Copy code text: Salin kod

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Malayalam
Language tag/Verify locale: ml
WhatsApp locale: ml
Copy code text: കോഡ് പകർത്തുക

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Marathi
Language tag/Verify locale: mr
WhatsApp locale: mr
Copy code text: कोड कॉपी करा

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Norwegian
Language tag/Verify locale: nb
WhatsApp locale: nb
Copy code text: Kopier koden

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Persian
Language tag/Verify locale: fa
WhatsApp locale: fa
Copy code text: کد را کپی کنید

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Polish
Language tag/Verify locale: pl
WhatsApp locale: pl
Copy code text: Skopiuj kod

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Portuguese (Brazilian\*)
Language tag/Verify locale: pt-br
WhatsApp locale: pt\_BR
Copy code text: Copiar código

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Portuguese (Portugal)
Language tag/Verify locale: pt-pt
WhatsApp locale: pt\_PT
Copy code text: Copiar código

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Panjabi, Punjabi
Language tag/Verify locale: pa
WhatsApp locale: pa
Copy code text: ਕੋਡ ਕਾਪੀ ਕਰੋ

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Romanian
Language tag/Verify locale: ro
WhatsApp locale: ro
Copy code text: Copiați codul

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Russian
Language tag/Verify locale: ru
WhatsApp locale: ru
Copy code text: Скопировать код

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Serbian
Language tag/Verify locale: sr
WhatsApp locale: sr
Copy code text: Копирај код

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Slovak
Language tag/Verify locale: sk
WhatsApp locale: sk
Copy code text: Kopírovať kód

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Slovene
Language tag/Verify locale: sl
WhatsApp locale: sl
Copy code text: Kopiraj kodo

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Spanish
Language tag/Verify locale: es
WhatsApp locale: es
Copy code text: Copiar código

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Spanish (Argentina)
Language tag/Verify locale: es-ar
WhatsApp locale: es\_AR
Copy code text: Copiar código

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Spanish (Spain)
Language tag/Verify locale: es-es
WhatsApp locale: es\_ES
Copy code text: Copiar código

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Spanish (Mexico)
Language tag/Verify locale: es-mx
WhatsApp locale: es\_MX
Copy code text: Copiar código

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Swahili
Language tag/Verify locale: sw
WhatsApp locale: sw
Copy code text: Nakili msimbo

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Swedish
Language tag/Verify locale: sv
WhatsApp locale: sv
Copy code text: Kopiera kod

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Tamil
Language tag/Verify locale: ta
WhatsApp locale: ta
Copy code text: குறியீட்டை நகலெடுக்கவும்

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Telugu
Language tag/Verify locale: te
WhatsApp locale: te
Copy code text: కాపీ కోడ్

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Thai
Language tag/Verify locale: th
WhatsApp locale: th
Copy code text: คัดลอกรหัส

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Turkish
Language tag/Verify locale: tr
WhatsApp locale: tr
Copy code text: Kodu kopyala

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Ukrainian
Language tag/Verify locale: uk
WhatsApp locale: uk
Copy code text: Скопіювати код

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Urdu
Language tag/Verify locale: ur
WhatsApp locale: ur
Copy code text: کوڈ کاپی کریں۔

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Uzbek
Language tag/Verify locale: uz
WhatsApp locale: uz
Copy code text: Kodni nusxalash

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Vietnamese
Language tag/Verify locale: vi
WhatsApp locale: vi
Copy code text: Sao chép mã

***

Channel: WhatsApp
Template type: WhatsApp copy code
Language: Zulu
Language tag/Verify locale: zu
WhatsApp locale: zu
Copy code text: Kopisha ikhodi

***

## Example: Send an SMS OTP in Spanish

The following example sends an SMS OTP in Spanish by specifying the `es` locale in the request.

Send an SMS OTP in Spanish

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "sms",
      locale: "es",
      to: "14155552345",
    });

  console.log(verification.status);
}

createVerification();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(to="14155552345", channel="sms", locale="es")

print(verification.status)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            to: "14155552345",
            channel: "sms",
            locale: "es",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Status);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification =
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "14155552345", "sms").setLocale("es").create();

        System.out.println(verification.getStatus());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetTo("14155552345")
	params.SetChannel("sms")
	params.SetLocale("es")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Status != nil {
			fmt.Println(*resp.Status)
		} else {
			fmt.Println(resp.Status)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "14155552345", // To
        "sms", // Channel
        ["locale" => "es"]
    );

print $verification->status;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 to: '14155552345',
                 channel: 'sms',
                 locale: 'es'
               )

puts verification.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to 14155552345 \
   --channel sms \
   --locale es
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "To=14155552345" \
--data-urlencode "Channel=sms" \
--data-urlencode "Locale=es" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "14155552345",
  "channel": "sms",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```
