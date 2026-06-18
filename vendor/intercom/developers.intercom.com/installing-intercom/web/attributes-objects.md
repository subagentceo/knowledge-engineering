# Javascript API: Attributes & Objects

This page details the possible attributes that can be used when [Installing the Messenger](/installing-intercom/web/installation)

Visitors / Leads
```javascript
window.intercomSettings = { 
  app_id: YOUR_WORKSPACE_ID
  // customise installation with your attributes 
}
```

Logged In users
```javascript
window.intercomSettings = { 
  app_id: YOUR_WORKSPACE_ID,
  email: EMAIL_OF_CURRENTLY_LOGGED_IN_USER
  // cutomise installation with your attributes 
}
```

## Messenger Attributes

These attributes will modify the behaviour of the messenger. They do not modify user/lead data.

| Attribute in Javascript code | Type | Description |
|  --- | --- | --- |
| app_id | string | The ID of your Intercom Workspace which will indicate where to store any data |
| custom_launcher_selector | string | The CSS selector of an element to trigger Intercom("show") in order to activate the messenger ([See docs](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical)). To target an element by ID: "#id_of_element". To target elements by class ".classname_of_elements" |
| alignment | string | Dictate the alignment of the default launcher icon to be on the left/right. Possible values: "left" or "right" (any other value is treated as right). ([See docs](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical)) |
| vertical_padding | integer | Move the default launcher icon vertically. Padding from bottom of screen. Minimum value: 20. Does not work on mobile. ([See docs](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical)) |
| horizontal_padding | integer | Move the default launcher icon horizontally. Padding from right side of screen Minimum value: 20. Does not work on mobile. ([See docs](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical)) |
| z_index | integer | Specify the stack order of the Messenger. ([See docs](/installing-intercom/web/customization#messenger-z-index)) |
| hide_default_launcher | boolean | Hide the default launcher icon. Setting to false will forcefully show the launcher icon ([See docs](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/turn-off-show-or-hide-the-intercom-messenger)) |
| hide_notifications | boolean | Hide in-app notifications in the Messenger. `true` hides notifications, `false` shows them. Can also be controlled dynamically via the `Intercom('hideNotifications', hidden)` API. |
| theme_mode | 'light' | 'dark' | 'system' | Sets the theme mode of the Messenger. `'dark'` enables dark mode, `'light'` enables light mode, `'system'` uses the system preference. Can also be controlled dynamically via the `Intercom('update', {theme_mode: 'dark'})` API. |
| messenger_style_id | string | Specifies which messenger style configuration to load. Enables multi-brand setups where different visual styles (colors, logos, etc.) are needed per context. Style IDs are available in your workspace under **Settings → Messenger → Appearance → Manage Style**. Can also be switched dynamically via `Intercom('update', {messenger_style_id: '123456'})`. ([See docs](/installing-intercom/web/customization#messenger-style-override)) |
| session_duration | integer | Time in milliseconds for the Intercom session to be considered active. Must be a literal integer — for example, `300000` for 5 minutes (= 5 × 60 × 1000). String values such as `"5*60000"` are not evaluated and will be coerced to a number incorrectly (e.g. parsed as `5`, expiring the session in 5ms). This duration must be less than that set in your Messenger settings. ([See docs](https://www.intercom.com/help/en/articles/16845-how-do-i-end-a-session#set-a-session-duration)) |
| action_color | string* | Used in button links and more to highlight and emphasise |
| background_color | string* | Used behind your team profile and other attributes |
| link_color | string* | Used for hyperlinks in message content, independent of `action_color`. Defaults to the standard text color when unset |


* The color string can be any [valid CSS](https://www.w3schools.com/cssref/css_colors.asp) `Color Name` `HEX` or `RGB`

## Data Attributes

These attributes are used to update user/lead information.

- When user_id / email is provided, it will be saved as a **User** record
- When no user_id / email is provided, it will be considered a Visitor record which is not seen in the Intercom dashboard. When a Visitor sends a message via the Intercom messenger they will be converted to a **Lead** which is viewable in the Intercom dashboard
- Any other attribute not listed below and not in the [Messenger Attributes](#messenger-attributes) will be treated as a [custom user attribute](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-intercom-to-be-about-your-users/send-custom-user-attributes-to-intercom)
- If the value of a  [custom user attribute](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-intercom-to-be-about-your-users/send-custom-user-attributes-to-intercom) is set to an empty string, or a string with the value "undefined", or "null", this will appear as Unknown in Platform.
- If a value is set for a [custom user attribute](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-intercom-to-be-about-your-users/send-custom-user-attributes-to-intercom) that has been configured to prevent updates via the Messenger then this value will be ignored in the request.


| Attribute | Type | Description |
|  --- | --- | --- |
| email | string | The email address of the currently logged in user **(Only applicable to users)** |
| user_id | string | The user_id address of the currently logged in user **(Only applicable to users)** |
| created_at | timestamp | The [Unix timestamp](https://www.intercom.com/help/en/articles/3605703-how-dates-work-in-intercom) (in seconds) when the user signed up to your workspace **(Only applicable to users)** |
| name | string | Name of the current user/lead |
| phone | string | Phone number of the current user/lead |
| last_request_at | timestamp | This value can't actually be set by the Javascript API (it automatically uses the time of the last request but is a this is a reserved attribute) |
| unsubscribed_from_emails | boolean | Sets the [unsubscribe status](([https://docs.intercom.com/faqs-and-troubleshooting/unsubscribing-users/how-do-i-unsubscribe-users-from-receiving-emails](https://docs.intercom.com/faqs-and-troubleshooting/unsubscribing-users/how-do-i-unsubscribe-users-from-receiving-emails)) of the record |
| language_override | string | Set the [messenger language](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/localize-intercom-to-work-with-multiple-languages) programmatically (instead of relying on browser language settings) |
| utm_campaign | string | [UTM Campaign value](https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters)Note: All UTM parameters are updated automatically and can not be manually overidden |
| utm_content | string | [UTM Content value](https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters) |
| utm_medium | string | [UTM Medium value](https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters) |
| utm_source | string | [UTM Source value](https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters) |
| utm_term | string | [UTM Term value](https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters) |
| avatar | avatar object | Set the avatar/profile image associated to the current record (typically gathered via [social profiles via email address](https://docs.intercom.com/faqs-and-troubleshooting/your-users-and-leads-data-in-intercom/where-do-the-social-profiles-come-from)) |
| user_hash | string | Used for [identity verification](https://docs.intercom.com/configure-intercom-for-your-product-or-site/staying-secure/enable-identity-verification-on-your-web-product) **(Only applicable to users)** |
| company | company object | Current user's [company](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-intercom-to-be-about-your-users/group-your-users-by-company) **(Only applicable to users)** For field definitions see [Company Object](#section-company-object) in the section below **Important:** Company ID and company name are the minimum requirements to pass a company into Intercom. **Note:** If users are associated with multiple companies and you want your company targeted messages to be delivered based on a specific company, make sure to include those specific company details here. Intercom will ensure that any company-based rules for your outbound messages must match that company. |
| companies | array of company objects | An array of [companies](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-intercom-to-be-about-your-users/group-your-users-by-company) the user is associated to **(Only applicable to users)** |
| page_title | string | Used for keeping track of user page views. Default value is the [document title property](https://developer.mozilla.org/en-US/docs/Web/API/Document/title). |


## User Profile in Web Interface indicating corresponding attributes

![](/assets/40c39de-dev_docs_user_profile_annotated.dede36c9e6264548e1719982575acf17a7ca1a7b9a85649f8fdecf237dc5907a.71a4f21c.png)

## Avatar Object

Similar to the [API avatar object](https://developers.intercom.com/intercom-api-reference/reference#section-avatar-object)

```javascript
window.intercomSettings =  {
  app_id: YOUR_WORKSPACE_ID, 
  user_id: USER_ID_OF_CURRENTLY_LOGGED_IN_USER, 
  avatar: {
    "type": "avatar", 
    "image_url" :"https://yourwebsite.com/user_id/profile.png"
  }
 }
```

| Attribute in Javascript code | Attribute in API | Attribute / Data in Web interface | Type | Description |
|  --- | --- | --- | --- | --- |
| type | type |  | string | The value is "avatar" |
| image_url | image_url | The avatar/profile picture of the record | string | An avatar image URL. Note: needs to be https. |


## Company Object

Learn more about companies from [our Help Center article](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-intercom-to-be-about-your-users/group-your-users-by-company).
These are very similar to the [API company object](https://developers.intercom.com/intercom-api-reference/reference#company-model).
Attributes not listed below will be considered as a custom company attribute.
**Note:** Company ID and company name are the minimum requirements to pass a company into Intercom.

Single company
```javascript
window.intercomSettings = {
  app_id: YOUR_WORKSPACE_ID, 
  user_id: USER_ID_OF_CURRENTLY_LOGGED_IN_USER, 
  company: {
    company_id: "6",
    created_at: 1394531169,
    name: "Example Company Inc.",
    monthly_spend: 49,
    plan: "Pro",
    size: 85,
    website: "http://example.com",
    industry: "Technology"
  }
}
```

Multiple companies
```javascript
window.intercomSettings = {
  app_id: YOUR_WORKSPACE_ID,
  user_id: USER_ID_OF_CURRENTLY_LOGGED_IN_USER,
  companies: [
    {
      company_id: "6",
      name: "Company 1",
      monthly_spend: 32,
      plan: "Pro",
      size: 85,
      website: "http://example.com",
      industry: "Technology",
    },
    {
      company_id: "8",
      name: "Company 2",
      monthly_spend: 99,
      plan: "Essential",
      size: 32,
      website: "http://test.com",
      industry: "Hospitality",
    },
  ],
}
```

| Attribute in Javascript code | Attribute in API | Attribute / Data in Web interface | Type | Description |
|  --- | --- | --- | --- | --- |
| id / company_id | company_id | Company ID | string | The company ID of the company |
| name | name | Name | string | The name of the company |
| created_at / remote_created_at | remote_created_at | Company created at | timestamp | The time the company was created in your system |
| plan | plan | Plan | string | The name of the plan the company is on |
| monthly_spend | monthly_spend | Monthly spend | integer | How much revenue the company generates for your business |
| user_count | people | People | integer | Indicates the number of users in Intercom associated to the companyDoes not actually update the value but is a reserved keyword |
| size | size | Company Size | integer | The number of employees in the company |
| website | website | Company Website | string | The URL for the company website |
| industry | industry | Company Industry | string | The industry of the company |


## Company Profile in Web Interface indicating corresponding attributes

![](/assets/39099ce-dev_docs_company_annotated.20aeeb50336f131f52df6d30c67dad15873073c2cd5b203e0070149c53b37fa1.71a4f21c.png)