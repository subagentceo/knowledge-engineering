# Supported Languages

Arkose Enforcement Challenge (EC) can be invoked in many languages. A list of the available languages is shown below.

# Supported Languages

## Default Language Detection

Arkose Bot Manager's Enforcement Challenge automatically detects the browser or device language using the HTTP `Accept-Language` header and displays the most appropriate language from our supported list. No configuration is required for this default behaviour.

## Programmatically Setting Language

If you want to control language settings manually, pass the locale string to the configuration object using the `language` parameter. The locale string follows the ISO 639-1 language code format, optionally combined with an ISO 3166-1 alpha-2 region code (e.g., `en`, `en-gb`,`fr-ca`) or ISO 15924 (e.g. `zh-hans`).

```javascript
ArkoseEnforcement.configure({
  // other configuration
  language: 'fr-ca'
});
```

<br />

See [Configuration Object](https://developer.arkoselabs.com/docs/configuration-object) for more information about using the configuration object.

> **Note**: You must pass the complete locale string to the configuration object. Languages with regional variants will not display as expected if you omit the region code where applicable.

<br />

## Language Resolution

When determining which language to display, the system follows this resolution order:

1. **Language, Region & Script** — If a direct match exists for the provided value, it is used
2. **Language Match (ISO 639-1)** — If no language, region or script exactly match, the base language code is used (e.g., en-fr → en)
3. **Default** — If no match is found, English (en) is used.

## Supported Languages Table

Arkose Labs offers an extensive list of supported languages across Visual and Audio Challenges. All text elements are localized, including alt text and ARIA (Accessible Rich Internet Applications) labels that aid accessibility. This means that a user's screen reader will read out the relevant text to guide them through navigating the EC in their language.

Arkose Labs audio challenges offer the same extensive language support as visual challenges. This is achieved through our approach of using various sounds or music for the user to identify or answer questions about, rather than spoken words. As such, these audio clips do not require translation and are understood regardless of the user's locale.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Language
      </th>

      <th>
        Locale ID String
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Arabic
      </td>

      <td>
        ar
      </td>
    </tr>

    <tr>
      <td>
        Bulgarian
      </td>

      <td>
        bg
      </td>
    </tr>

    <tr>
      <td>
        Catalan
      </td>

      <td>
        ca
      </td>
    </tr>

    <tr>
      <td>
        Czech
      </td>

      <td>
        cs
      </td>
    </tr>

    <tr>
      <td>
        Danish
      </td>

      <td>
        da
      </td>
    </tr>

    <tr>
      <td>
        German
      </td>

      <td>
        de
      </td>
    </tr>

    <tr>
      <td>
        Greek
      </td>

      <td>
        el
      </td>
    </tr>

    <tr>
      <td>
        English
      </td>

      <td>
        en
      </td>
    </tr>

    <tr>
      <td>
        English (UK)
      </td>

      <td>
        en-gb
      </td>
    </tr>

    <tr>
      <td>
        Spanish (Europe)
      </td>

      <td>
        es
      </td>
    </tr>

    <tr>
      <td>
        Spanish (Latin America)
      </td>

      <td>
        es-ar

        es-bo

        es-cl

        es-co

        es-cr

        es-do

        es-ec

        es-gt

        es-hn

        es-la

        es-mx

        es-ni

        es-pa

        es-pe

        es-pr

        es-py

        es-sv
      </td>
    </tr>

    <tr>
      <td>
        Estonian
      </td>

      <td>
        et
      </td>
    </tr>

    <tr>
      <td>
        Finnish
      </td>

      <td>
        fi
      </td>
    </tr>

    <tr>
      <td>
        French
      </td>

      <td>
        fr
      </td>
    </tr>

    <tr>
      <td>
        French (Canada)
      </td>

      <td>
        fr-ca
      </td>
    </tr>

    <tr>
      <td>
        Hebrew
      </td>

      <td>
        he
      </td>
    </tr>

    <tr>
      <td>
        Hindi
      </td>

      <td>
        hi
      </td>
    </tr>

    <tr>
      <td>
        Croatian
      </td>

      <td>
        hr
      </td>
    </tr>

    <tr>
      <td>
        Hungarian
      </td>

      <td>
        hu
      </td>
    </tr>

    <tr>
      <td>
        Indonesian
      </td>

      <td>
        id
      </td>
    </tr>

    <tr>
      <td>
        Italian
      </td>

      <td>
        it
      </td>
    </tr>

    <tr>
      <td>
        Japanese
      </td>

      <td>
        ja
      </td>
    </tr>

    <tr>
      <td>
        Korean
      </td>

      <td>
        ko
      </td>
    </tr>

    <tr>
      <td>
        Lithuanian
      </td>

      <td>
        lt
      </td>
    </tr>

    <tr>
      <td>
        Latvian
      </td>

      <td>
        lv
      </td>
    </tr>

    <tr>
      <td>
        Malay
      </td>

      <td>
        ms
      </td>
    </tr>

    <tr>
      <td>
        Norwegian (Bokmål)
      </td>

      <td>
        no\
        no-no\
        nb\
        nb-no
      </td>
    </tr>

    <tr>
      <td>
        Dutch
      </td>

      <td>
        nl
      </td>
    </tr>

    <tr>
      <td>
        Polish
      </td>

      <td>
        pl
      </td>
    </tr>

    <tr>
      <td>
        Portuguese (Brazil)
      </td>

      <td>
        pt-br
      </td>
    </tr>

    <tr>
      <td>
        Portuguese (Europe)
      </td>

      <td>
        pt
      </td>
    </tr>

    <tr>
      <td>
        Romanian
      </td>

      <td>
        ro
      </td>
    </tr>

    <tr>
      <td>
        Russian
      </td>

      <td>
        ru
      </td>
    </tr>

    <tr>
      <td>
        Slovak
      </td>

      <td>
        sk
      </td>
    </tr>

    <tr>
      <td>
        Slovenian
      </td>

      <td>
        sl
      </td>
    </tr>

    <tr>
      <td>
        Serbian (Latin)
      </td>

      <td>
        sr
      </td>
    </tr>

    <tr>
      <td>
        Swedish
      </td>

      <td>
        sv
      </td>
    </tr>

    <tr>
      <td>
        Thai
      </td>

      <td>
        th
      </td>
    </tr>

    <tr>
      <td>
        Turkish
      </td>

      <td>
        tr
      </td>
    </tr>

    <tr>
      <td>
        Ukranian
      </td>

      <td>
        uk
      </td>
    </tr>

    <tr>
      <td>
        Vietnamese
      </td>

      <td>
        vi
      </td>
    </tr>

    <tr>
      <td>
        Chinese Simplified
      </td>

      <td>
        zh
      </td>
    </tr>

    <tr>
      <td>
        Chinese Traditional (Taiwan)
      </td>

      <td>
        zh-TW
      </td>
    </tr>

    <tr>
      <td>
        Chinese Traditional (Hong Kong)
      </td>

      <td>
        zh-HK
      </td>
    </tr>
  </tbody>
</Table>