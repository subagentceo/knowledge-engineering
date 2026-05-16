# Customer Geolocation in Flex Insights

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Geolocation of your customers is useful for understanding the geography of places where most of your customer volume comes from.

![Bar chart showing handled conversations by city, with Los Angeles leading.](https://docs-resources.prod.twilio.com/e5261d1277105bbf24282728da5e3fbc9a67e0704142826b5ccad46386996b08.png)

Geolocation data helps you understand critical issues and topics by region as well as being able to immediately identify escalated issues that may be caused by location-based problems. Some of specific benefits coming from customer geo-segmentation are:

* Understand where your customers are based
* Report call volume and spend time by customers in individual countries and areas
* Adjust work hours and agents scheduling to work great across multiple customer timezones
* Watch for spikes in conversations coming from different geographical locations
* Hire agents that live close to your customers and understand them

![Map showing data points across North America and Europe.](https://docs-resources.prod.twilio.com/4a191889993491173e3397c83368e137476d0216d1cb6060ab7d28e4b98ab9c4.png)

> \[!WARNING]
>
> Customer Geolocation information is not 100% accurate, and precision may differ based on how customers use their phone number and how number plans vary in different geographical regions. We strongly recommend that you evaluate the accuracy of your customers' geolocation data.

## Geolocation Attributes

A customer dataset contains the following location-based attributes from the highest level to the lowest level:

* **Region** - Highest level geographical unit. We use continents by default - Africa, Asia, Australia, Europe, Latin America, North America. You can use custom regions depending on how they segment their market. You can override defaults by using [customer attributes](/docs/flex/developer/insights/enhance-integration).
* **Country** - A UN member state such as Australia, Brazil, China, Great Britain, India, Russia, South Africa, United States of America and others. Check the [list of UN member states](https://en.wikipedia.org/wiki/List_of_sovereign_states).
* **State** - A state within the country. For example California in the United States.
* **Area** - A sub-level of state. *Area* may indicate a district, province, shire depending on administrative unit used in a given country or state.
* **City** - The closest major city.
* **ZIP** - ZIP or Postal code.
* **Geolocation** - GPS coordinates.

## Data from Customers' Phone Numbers

By default, Flex Insights extracts basic geographical information from customer phone numbers. The features differ by country as the numbering plans depend on a country.

* **Region, Country** - Available for all countries.
* **State** - Available in the United States.
* **Area** - Available by using custom attributes.
* **City** - Available in the United States.
* **ZIP** - Available by using custom attributes.
* **Geolocation** - Available in the United States. Geolocation is set on phone area code level. This means that all phone numbers with the same area code show on a single geographical location.

## Custom Geolocation Data

You can use [customer attributes](/docs/flex/developer/insights/enhance-integration) to provide additional details to customers' geographical location.
