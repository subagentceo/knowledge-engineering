# Default Languages for Phone Number Country Codes

Verify will automatically resolve a verification's language based on the country code of the phone number provided. Phone verification messages for all countries **except those listed below** default to English. Using automatic language resolution is highly recommended. If required, you can override the default language by [specifying the `locale` parameter](/docs/verify/api/verification#start-new-verification) in the request.

You can [view a list of all supported languages here](/docs/verify/supported-languages).

## Default languages other than English

| Country              | Country Code | Language Tag |
| -------------------- | ------------ | ------------ |
| Argentina            | 54           | `es`         |
| Austria              | 43           | `de`         |
| Belgium              | 32           | `fr`         |
| Bolivia              | 591          | `es`         |
| Brazil               | 55           | `pt`         |
| Chile                | 56           | `es`         |
| China                | 86           | `zh-CN`      |
| Colombia             | 57           | `es`         |
| Costa Rica           | 506          | `es`         |
| Cuba                 | 53           | `es`         |
| Cyprus               | 357          | `el`         |
| Dominican Republic\* | 1809         | `es`         |
| Ecuador              | 593          | `es`         |
| Egypt                | 20           | `ar`         |
| El Salvador          | 503          | `es`         |
| Estonia              | 372          | `et`         |
| France               | 33           | `fr`         |
| Germany              | 49           | `de`         |
| Guatemala            | 502          | `es`         |
| Honduras             | 504          | `es`         |
| India                | 91           | `en`         |
| Indonesia            | 62           | `id`         |
| Italy                | 39           | `it`         |
| Japan                | 81           | `ja`         |
| Kuwait               | 965          | `ar`         |
| Lithuania            | 370          | `lt`         |
| Luxembourg           | 352          | `de`         |
| Mexico               | 52           | `es`         |
| Monaco               | 377          | `fr`         |
| Nicaragua            | 505          | `es`         |
| Oman                 | 968          | `ar`         |
| Panama               | 507          | `es`         |
| Paraguay             | 595          | `es`         |
| Peru                 | 51           | `es`         |
| Poland               | 48           | `pl`         |
| Portugal             | 351          | `pt`         |
| Romania              | 226          | `ro`         |
| San Marino           | 378          | `it`         |
| Saudi Arabia         | 966          | `ar`         |
| Slovakia             | 421          | `sk`         |
| South Africa         | 27           | `af`         |
| Spain                | 34           | `es`         |
| Switzerland          | 41           | `de`         |
| Ukraine              | 380          | `uk`         |
| United Arab Emirates | 971          | `ar`         |
| United Kingdom       | 44           | `en-GB`      |
| Uruguay              | 598          | `es`         |
| Vatican City         | 379          | `it`         |
| Venezuela            | 58           | `es`         |
| Vietnam              | 84           | `vi`         |

\*The Dominican Republic uses the country code and area code to default messages to Spanish.
