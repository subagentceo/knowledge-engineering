# What is E.164?

Known as the [international public telecommunication numbering plan][itu-spec], this [International Telecommunication Union Telecommunication Standardization Sector (ITU-T)][itu-t] specification defines the format of all numbers available on the Public Switched Telephone Network (PSTN).

## E.164 numbering plan format

This numbering plan standard provides a globally unique number for each device on the PSTN. These devices can then route phone calls and text messages to individual devices in different countries.

According to the [official ITU E.164 recommendation][], the format must:

* Use decimal integers
* Be limited to a total of 15 digits in length
* Start with a `+`
* Exclude `0` as the first character as no E.164 [country code][country codes] starts with `0`

The following diagram shows the E.164 format:

```mermaid
flowchart LR
    A[+] --- B(Country Code)
    B --- C(National Destination Code)
    C --- D(Subscriber Number)
```

Country codes have a length between one and three digits. The combined length of the National Destination Code (NDC), also known as an area code, and Subscriber Number equals 15 minus the length of the country code.

## Examples of telephone numbers in E.164 format

| E.164 format  | Country       | Country code | NDC | Subscriber number |
| ------------- | ------------- | ------------ | --- | ----------------- |
| +14155552671  | US            | 1            | 415 | 555 2671          |
| +442071838750 | Great Britain | 44           | 20  | 7183 8750         |
| +551155256325 | Brazil        | 55           | 11  | 5525 6325         |

To learn more, see [How to build international phone number input in HTML and JavaScript][intl-blog], including how to transform the phone number input into E.164 format.

## Phone number validation

To [validate a phone number and its format][validate-phone], use the [Twilio Lookup API][api]. A regular expression (regex) can't guarantee a match with a valid number.

## Related topics

* [International telephone input and validation in the Twilio Code Exchange][code-exchange]

[country codes]: https://en.wikipedia.org/wiki/List_of_country_calling_codes

[code-exchange]: https://www.twilio.com/code-exchange/international-telephone-input

[official ITU E.164 recommendation]: https://www.itu.int/rec/T-REC-E.164/en

[validate-phone]: https://www.twilio.com/blog/validate-phone-number-input

[intl-blog]: https://www.twilio.com/blog/international-phone-number-input-html-javascript

[api]: /docs/lookup/v1-api

[ITU-spec]: https://www.itu.int/rec/T-REC-E.164-201011-I/en

[ITU-T]: https://www.itu.int/en/ITU-T/Pages/default.aspx
