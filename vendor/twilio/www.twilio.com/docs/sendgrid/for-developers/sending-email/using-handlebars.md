# Using Handlebars

Twilio SendGrid [Dynamic Transactional Templates](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates) and [Marketing Campaigns designs](/docs/sendgrid/ui/sending-email/working-with-marketing-campaigns-email-designs/) support the [Handlebars](https://handlebarsjs.com/) templating language to render the [Personalizations](/docs/sendgrid/for-developers/sending-email/personalizations/) you send via the API and the [Substitution Tags](/docs/sendgrid/for-developers/sending-email/substitution-tags/) stored on your Marketing Campaigns contacts.

Handlebars syntax allows you to personalize the messages in your templates by inserting customers' names and other data to make an email relevant to each individual recipient. For example, if you have a customer's name stored in a JSON property called `"name"`, you can insert the property's value into a template by adding `{{ name }}` wherever you want the customer's name to appear.

Handlebars syntax allows all of this dynamic templating to occur outside of your code base, meaning changes are done quickly in the template with no update to a code base required.

> \[!NOTE]
>
> If you prefer to use your own templating system, you can still insert dynamic data using [Substitution Tags](/docs/sendgrid/ui/sending-email/substitution-and-section-tags/).

## Personalizing email with Handlebars

> \[!NOTE]
>
> You can manage your templates programmatically with our [Mail Send with Dynamic Transactional Templates API](/docs/sendgrid/api-reference/transactional-templates/create-a-transactional-template).

The Handlebars language provides many features in addition to basic variable replacement, including iterations (loops) and conditional statements. Our templates and designs support most but not all of this Handlebars functionality. Currently, dynamic templates support the following helpers:

* [Substitution](#substitution)
* [Conditional statements](#conditional-statements)
* [Iterations](#iterations)

For a full helper reference, see the [Handlebars reference](#handlebars-reference) on this page.

## Use cases

The following use case examples come from the [dynamic-template section of our email templates GitHub repo](https://github.com/sendgrid/email-templates/tree/master/dynamic-templates). Each example links to files you can explore on GitHub. You can also work with these templates by uploading them using the [Code Editor](/docs/sendgrid/ui/sending-email/editor/#the-code-editor) available in [Dynamic Transactional Templates](https://mc.sendgrid.com/dynamic-templates) and the [Marketing Campaigns Design Library](https://mc.sendgrid.com/design-library/your-designs).

The following use cases are listed with the Handlebars helpers used to build them.

### Receipt

This [example receipt template](https://github.com/sendgrid/email-templates/tree/master/dynamic-templates/receipt) uses the following helpers:

* [Substitution](#substitution)
* [Conditional statements](#conditional-statements)
* [Iterations](#iterations)

### Password reset

This [example transactional template](https://github.com/sendgrid/email-templates/tree/master/dynamic-templates/transactional-actions) uses the following helpers:

* [Substitution](#substitution)

### Multiple languages

This is an [example template that lets you have content in multiple languages](https://github.com/sendgrid/email-templates/tree/master/dynamic-templates/different-languages), and it uses the following helpers:

* [Conditional statements](#conditional-statements) - `if/else`

### Newsletter

This [example newsletter template](https://github.com/sendgrid/email-templates/tree/master/dynamic-templates/newsletter) uses the following helpers:

* [Substitution](#substitution)
* [Iterations](#iterations)

### Advertisement

This is an [example template that is advertising items on sale](https://github.com/sendgrid/email-templates/tree/master/dynamic-templates/special-sale), and it uses the following helpers:

* [Substitution](#substitution)
* [Conditional statements](#conditional-statements) - `if/else`
* [Iterations](#iterations)

## Handlebars reference

The following reference provides sample code blocks for each helper, including HTML email snippets and JSON test data. The code examples are shown in three tabs. The first tab, Handlebars, shows the Handlebars tag. The second tab, JSON, shows example data that would be used to populate the Handlebars tag. The third tab, HTML, shows the final output that the Handlebars tag will be rendered to in your email. You can click each tab to switch between the code samples.

### Substitution

Twilio SendGrid templates support the following substitutions:

* [Basic replacement](#basic-replacement)
* [Dynamic link values](#dynamic-link-values)
* [Deep object replacement](#deep-object-replacement)
* [Object failure](#object-failure)
* [Replacement with HTML](#replacement-with-html)
* [formatDate](#formatdate)
* [Insert](#insert)

#### Basic replacement

```bash
<!-- Template -->
<p>Hello {{ firstName }}</p>
```

```json
// Test data
{ "firstName": "Ben" }
```

```html
<!-- Resulting HTML !-->
<p>Hello Ben</p>
```

#### Dynamic link values

```bash
<!-- Template -->
<p><a href="{{ url }}">Click Me</a></p>
```

```json
// Test data
{ "url": "https://example.com/shop" }
```

```html
<!-- Resulting HTML !-->
<p><a href="https://example.com/shop">Click Me</a></p>
```

#### Deep object replacement

```bash
<!-- Template -->
<p>Hello {{user.profile.firstName}}</p>
```

```json
// Test data
{
  "user": {
    "profile": {
      "firstName": "Ben"
    }
  }
}
```

```html
<!-- Resulting HTML -->
<p>Hello Ben</p>
```

#### Object failure

```bash
<!-- Template -->
<p>Hello {{user.profile.firstName}}</p>
```

```json
// Test data
{
  "user": {
    "orderHistory": [
      {
        "date": "2/1/2018",
        "item": "shoes"
      },
      {
        "date": "1/4/2017",
        "item": "hat"
      }
    ]
  }
}
```

```html
<!-- Resulting HTML -->
<p>Hello</p>
```

#### Replacement with HTML

> \[!NOTE]
>
> If you include the characters `'`, `"` or `&` in a subject line replacement be sure to use three brackets like below.

```bash
<!-- Template -->
<!-- Per Handlebars' documentation: If you don't want Handlebars to escape a value, use the "triple-stash", {{{ -->
<p>Hello {{{firstName}}}</p>
```

```json
// Test data
{ "firstName": "<strong>Ben</strong>" }
```

```html
<!-- Resulting HTML -->
<p>Hello <strong>Ben</strong></p>
```

#### formatDate

The formatDate helper takes a time in either epoch or ISO8601 format and converts it to a format you specify using the tokens in the following table. If you send a date field without converting it, it will be displayed in ISO8601 format with the full timestamp (e.g., `2020-01-01T23:00:00.000Z`). The following example display results are for Tuesday, January 1st, 2020 3:00:00PM Pacific Standard Time.

| Token | Displayed Result |
| ----- | ---------------- |
| YYYY  | 2020             |
| YY    | 20               |
| MMMM  | January          |
| MMM   | Jan              |
| MM    | 01               |
| M     | 1                |
| DD    | 01               |
| D     | 1                |
| dddd  | Tuesday          |
| ddd   | Tue              |
| hh    | 03               |
| h     | 3                |
| HH    | 00               |
| H     | 00               |
| mm    | 00               |
| m     | 0                |
| ss    | 00               |
| s     | 0                |
| A     | PM               |
| ZZ    | -0800            |
| Z     | -08:00           |

```bash
<!-- Template without timezone offset -->
<p>Join us {{formatDate timeStamp dateFormat}}</p>

<!-- Template with timezone offset -->
<p>Join us {{formatDate timeStamp dateFormat timezoneOffset}}</p>
```

```json
// Test data
{
  "timeStamp": "2020-01-01T23:00:00.000Z",
  "dateFormat": "MMMM DD, YYYY h:mm:ss A",
  "timezoneOffset": "-0800"
}
```

```html
<!-- Resulting HTML without timezone-->
<p>Join us January 01, 2020 11:00:00 PM</p>

<!-- Resulting HTML with timezone-->
<p>Join us January 01, 2020 3:00:00 PM</p>
```

#### Insert

```bash
<!-- Insert with a default value -->
<p>Hello {{insert name "default=Customer"}}! Thank you for contacting us about {{insert businessName "your business"}}.</p>
```

```json
// Test data with all values
{
   "name": "Ben",
   "businessName": "Twilio SendGrid"
}

// Test data with missing value
{
  "name": "Ben"
}
```

```html
<!-- Resulting HTML with all values -->
<p>Hello Ben! Thank you for contacting us about Twilio SendGrid.</p>

<!-- Resulting HTML with missing value and a default-->
<p>Hello Ben! Thank you for contacting us about your business.</p>
```

### Conditional statements

Twilio SendGrid templates support the following conditionals:

* [Basic If, Else, Else If](#basic-if-else-else-if)
* [If with a root](#if-with-a-root)
* [Unless](#unless)
* [greaterThan](#greaterthan)
* [lessThan](#lessthan)
* [Equals](#equals)
* [notEquals](#notequals)
* [And](#and)
* [Or](#or)
* [Length](#length)

#### Basic If, Else, Else If

```bash
<!-- Template -->
{{#if user.profile.male}}
   <p>Dear Sir</p>
{{else if user.profile.female}}
   <p>Dear Madame</p>
{{else}}
   <p>Dear Customer</p>
{{/if}}
```

```json
// Test data one
{
   "user":{
      "profile":{
         "male":true
      }
   }
}

// Test data two
{
   "user":{
      "profile":{
         "female":true
      }
   }
}

// Test data three
{
   "user":{
      "profile":{

      }
   }
}
```

```html
<!-- Resulting HTML from test data one -->
<p>Dear Sir</p>

<!-- Resulting HTML from test data two -->
<p>Dear Madame</p>

<!-- Resulting HTML from test data three -->
<p>Dear Customer</p>
```

#### If with a root

```bash
<!-- Template -->
{{#if user.suspended}}
   <p>Warning! Your account is suspended, please call: {{@root.supportPhone}}</p>
{{/if}}
```

```json
// Test data
{
  "user": {
    "suspended": true
  },
  "supportPhone": "1-800-555-5555"
}
```

```html
<!-- Resulting HTML -->
<p>Warning! Your account is suspended, please call: 1-800-555-5555</p>
```

#### Unless

```bash
<!-- Template -->
{{#unless user.active}}
   <p>Warning! Your account is suspended, please call: {{@root.supportPhone}}</p>
{{/unless}}
```

```json
// Test data
{
  "user": {
    "active": false
  },
  "supportPhone": "1-800-555-5555"
}
```

```html
<!-- Resulting HTML -->
<p>Warning! Your account is suspended, please call: 1800-555-5555</p>
```

#### greaterThan

##### Basic greaterThan

```bash
<!-- Template -->
<p>
Hello Ben!
{{#greaterThan scoreOne scoreTwo}}
    Congratulations, you have the high score today!
{{/greaterThan}}
 Thanks for playing.
</p>
```

```json
// Test data one
{
  "scoreOne": 100,
  "scoreTwo": 78
}

// Test data two
{
  "scoreOne": 55,
  "scoreTwo": 78
}
```

```html
<!-- Resulting HTML from test data one-->
<p>
  Hello Ben! Congratulations, you have the high score today! Thanks for playing.
</p>

<!-- Resulting HTML from test data two-->
<p>Hello Ben! Thanks for playing.</p>
```

##### greaterThan with else

```bash
<!-- Template -->
<p>
Hello Ben!
{{#greaterThan scoreOne scoreTwo}}
    Congratulations, you have the high score today!
{{else}}
    You were close, but you didn't get the high score today.
{{/greaterThan}}
 Thanks for playing.
</p>
```

```json
// Test data one
{
  "scoreOne": 100,
  "scoreTwo": 78
}

// Test data two
{
  "scoreOne": 55,
  "scoreTwo": 78
}
```

```html
<!-- Resulting HTML from test data one-->
<p>
  Hello Ben! Congratulations, you have the high score today! Thanks for playing.
</p>

<!-- Resulting HTML from test data two-->
<p>
  Hello Ben! You were close, but you didn't get the high score today. Thanks for
  playing.
</p>
```

#### lessThan

##### Basic lessThan

```bash
<!-- Template -->
<p>
Hello Ben!
{{#lessThan scoreOne scoreTwo}}
    You were close, but you didn't get the high score today.
{{/lessThan}}
 Thanks for playing.
</p>
```

```json
// Test data one
{
  "scoreOne": 55,
  "scoreTwo": 78
}

// Test data two
{
  "scoreOne": 100,
  "scoreTwo": 78
}
```

```html
<!-- Resulting HTML from test data one-->
<p>
  Hello Ben! You were close, but you didn't get the high score today. Thanks for
  playing.
</p>

<!-- Resulting HTML from test data two-->
<p>Hello Ben! Thanks for playing.</p>
```

##### lessThan with else

```bash
<!-- Template -->
<p>
Hello Ben!
{{#lessThan scoreOne scoreTwo}}
    You were close, but you didn't get the high score today.
{{else}}
    Congratulations, you have the high score today!
{{/lessThan}}
 Thanks for playing.
</p>
```

```json
// Test data one
{
  "scoreOne": 55,
  "scoreTwo": 78
}

// Test data two
{
  "scoreOne": 100,
  "scoreTwo": 78
}
```

```html
<!-- Resulting HTML from test data one-->
<p>
  Hello Ben! You were close, but you didn't get the high score today. Thanks for
  playing.
</p>

<!-- Resulting HTML from test data two-->
<p>
  Hello Ben! Congratulations, you have the high score today! Thanks for playing.
</p>
```

#### Equals

The `equals` comparison can check for equality between two values of the same data type. The `equals` helper will also attempt to coerce data types to make a comparison of values independent of their data type. For example, `{{#equals 3 "3"}}` will evaluate to `true`.

> \[!CAUTION]
>
> Please be aware that the editor's Preview page will not properly render the results of a comparison between coerced values. You will see proper comparisons between coerced values only in a delivered message.

When checking for truthiness, be aware that empty strings, zero integers, and zero floating point numbers evaluate to `false`. Non-empty strings, non-zero integers, and non-zero floating point numbers, including negative numbers, evaluate to `true`.

##### Basic equals

```bash
<!-- Template -->
<p>
Hello Ben!
{{#equals customerCode winningCode}}
    You have a winning code.
{{/equals}}
 Thanks for playing.
</p>
```

```json
// Test data one
{
  "customerCode": 289199,
  "winningCode": 289199
}

// Test data two
{
  "customerCode": 167320,
  "winningCode": 289199
}
```

```html
<!-- Resulting HTML from test data one-->
<p>Hello Ben! You have a winning code. Thanks for playing.</p>

<!-- Resulting HTML from test data two-->
<p>Hello Ben! Thanks for playing.</p>
```

##### Equals with else

```bash
<!-- Template -->
<p>
Hello Ben!
{{#equals customerCode winningCode}}
    You have a winning code.
{{else}}
    You do not have a winning code.
{{/equals}}
 Thanks for playing.
</p>
```

```json
// Test data one
{
  "customerCode": 289199,
  "winningCode": 289199
}

// Test data two
{
  "customerCode": 167320,
  "winningCode": 289199
}
```

```html
<!-- Resulting HTML from test data one-->
<p>Hello Ben! You have a winning code. Thanks for playing.</p>

<!-- Resulting HTML from test data two-->
<p>Hello Ben! You do not have a winning code. Thanks for playing.</p>
```

#### notEquals

The `notEquals` comparison can check for inequality between two values of the same data type. The `notEquals` helper will also attempt to coerce data types to make a comparison of values independent of their data type. For example, `{{#notequals 3 "3"}}` will return `true`.

When checking for truthiness, be aware that empty strings, zero integers, and zero floating point numbers evaluate to `false`. Non-empty strings, non-zero integers, and non-zero floating point numbers, including negative numbers, evaluate to `true`.

##### Basic notEquals

```bash
<!-- Template -->
<p>
Hello Ben!
{{#notEquals currentDate appointmentDate}}
    Your appointment is not today.
{{/notEquals}}
 We look forward to your visit.
</p>
```

```json
// Test data one
{
  "currentDate": 20230715,
  "appointmentDate": 20230715
}

// Test data two
{
  "currentDate": 20230710,
  "appointmentDate": 20230715
}
```

```html
<!-- Resulting HTML from test data one-->
<p>Hello Ben! We look forward to your visit.</p>

<!-- Resulting HTML from test data two-->
<p>Hello Ben! Your appointment is not today. We look forward to your visit.</p>
```

##### notEquals with else

```bash
<!-- Template -->
<p>
Hello Ben!
{{#notEquals currentDate appointmentDate}}
    Your appointment is not today.
{{else}}
    Your appointment is today.
{{/notEquals}}
 We look forward to your visit.
</p>
```

```json
// Test data one
{
  "currentDate": 20230715,
  "appointmentDate": 20230715
}

// Test data two
{
  "currentDate": 20230710,
  "appointmentDate": 20230715
}
```

```html
<!-- Resulting HTML from test data one-->
<p>Hello Ben! Your appointment is today. We look forward to your visit.</p>

<!-- Resulting HTML from test data two-->
<p>Hello Ben! Your appointment is not today. We look forward to your visit.</p>
```

#### And

When checking for truthiness, be aware that empty strings, zero integers, and zero floating point numbers evaluate to `false`. Non-empty strings, non-zero integers, and non-zero floating point numbers, including negative numbers, evaluate to `true`.

##### And without else

```bash
<!-- Template -->
<p>
Hello Ben!
{{#and favoriteFood favoriteDrink}}
   Thank you for letting us know your dining preferences.
{{/and}}.
 We look forward to sending you more delicious recipes.</p>
```

```json
// Test data one
{
  "favoriteFood": "Pasta",
  "favoriteDrink": ""
}

// Test data two
{
  "favoriteFood": "Pasta",
  "favoriteDrink": "Coffee"
}
```

```html
<!-- Resulting HTML from test data one -->
<p>Hi Ben! We look forward to sending you more delicious recipes.</p>

<!-- Resulting HTML from test data two -->
<p>
  Hi Ben! Thank you for letting us know your dining preferences. We look forward
  to sending you more delicious recipes.
</p>
```

##### And with else

```bash
<!-- Template -->
<p>
Hello Ben!
{{#and favoriteFood favoriteDrink}}
   Thank you for letting us know your dining preferences.
{{else}}
   If you finish filling out your dining preferences survey, we can deliver you recipes we think you'll be most interested in.
{{/and}}.
 We look forward to sending you more delicious recipes.</p>
```

```json
// Test data one
{
  "favoriteFood": "Pasta",
  "favoriteDrink": ""
}

// Test data two
{
  "favoriteFood": "Pasta",
  "favoriteDrink": "Coffee"
}
```

```html
<!-- Resulting HTML from test data one -->
<p>
  Hi Ben! If you finish filling out your dining preferences survey, we can
  deliver you recipes we think you'll be most interested in. We look forward to
  sending you more delicious recipes.
</p>

<!-- Resulting HTML from test data two -->
<p>
  Hi Ben! Thank you for letting us know your dining preferences. We look forward
  to sending you more delicious recipes.
</p>
```

#### Or

When checking for truthiness, be aware that empty strings, zero integers, and zero floating point numbers evaluate to `false`. Non-empty strings, non-zero integers, and non-zero floating point numbers, including negative numbers, evaluate to `true`.

##### Basic or

```bash
<!-- Template -->
<p>
Hello Ben!
{{#or isRunner isCyclist}}
   We think you might enjoy a map of trails in your area.
{{/or}}.
 Have a great day.
</p>
```

```json
// Test data one
{
  "isRunner": true,
  "isCyclist": false
}

// Test data two
{
  "isRunner": false,
  "isCyclist": false
}
// Test data three
{
  "isRunner": false,
  "isCyclist": true
}
```

```html
<!-- Resulting HTML from test data one -->
<p>
  Hi Ben! We think you might enjoy a map of trails in your area. You can find
  the map attached to this email. Have a great day.
</p>

<!-- Resulting HTML from test data two -->
<p>Hi Ben! Have a great day.</p>

<!-- Resulting HTML from test data three -->
<p>
  Hi Ben! We think you might enjoy a map of trails in your area. You can find
  the map attached to this email. Have a great day.
</p>
```

##### Or with else

```bash
<!-- Template -->
<p>
Hello Ben!
{{#or isRunner isCyclist}}
   We think you might enjoy a map of trails in your area. You can find the map attached to this email.
{{else}}
   We'd love to know more about the outdoor activities you enjoy. The survey linked below will take only a minute to fill out.
{{/or}}.
 Have a great day.
</p>
```

```json
// Test data one
{
  "isRunner": true,
  "isCyclist": false
}

// Test data two
{
  "isRunner": false,
  "isCyclist": false
}
// Test data three
{
  "isRunner": false,
  "isCyclist": true
}
```

```html
<!-- Resulting HTML from test data one -->
<p>
  Hi Ben! We think you might enjoy a map of trails in your area. You can find
  the map attached to this email. Have a great day.
</p>

<!-- Resulting HTML from test data two -->
<p>
  Hi Ben! We'd love to know more about the outdoor activities you enjoy. The
  survey linked below will take only a minute to fill out. Have a great day.
</p>

<!-- Resulting HTML from test data three -->
<p>
  Hi Ben! We think you might enjoy a map of trails in your area. You can find
  the map attached to this email. Have a great day.
</p>
```

#### Length

The length helper will return the number of characters in a given string or array. For non-string and non-array values, length will return 0. Length can be useful in combination with other helpers as shown with greaterThan in the following example.

```bash
<!-- Templates -->
<p>
Hello Ben!
{{#greaterThan (length cartItems) 0}}
 It looks like you still have some items in your shopping cart. Sign back in to continue checking out at any time.
{{else}}
 Thanks for browsing our site. We hope you'll come back soon.
{{/greaterThan}}
</p>
```

```json
// Test data one
{
  "cartItems": ["raft", "water bottle", "sleeping bag"]
}

// Test data two
{
  "cartItems": []
}
```

```html
<!-- Resulting HTML with test data one-->
<p>
  Hello Ben! It looks like you still have some items in your shopping cart. Sign
  back in to continue checking out at any time.
</p>

<!-- Resulting HTML with test data two-->
<p>Hello Ben! Thanks for browsing our site. We hope you'll come back soon.</p>
```

### Iterations

You can loop or iterate over data using the `{{#each }}` helper function to build lists and perform other useful templating actions.

#### Basic Iterator with each

```bash
<!-- Template -->
<ol>
  {{#each user.orderHistory}}
   <li>You ordered: {{this.item}} on: {{this.date}}</li>
  {{/each}}
</ol>
```

```json
// Test data
{
  "user": {
    "orderHistory": [
      {
        "date": "2/1/2018",
        "item": "shoes"
      },
      {
        "date": "1/4/2017",
        "item": "hat"
      }
    ]
  }
}
```

```html
<!-- Resulting HTML -->
<ol>
  <li>You ordered: shoes on: 2/1/2018</li>
  <li>You ordered: hat on: 1/42017</li>
</ol>
```

### Combined examples

The following examples show you how to combine multiple Handlebars functions to create a truly dynamic template.

* [Dynamic content creation](#dynamic-content-creation)
* [Dynamic content creation with dynamic parts 1](#dynamic-content-creation-with-dynamic-parts-1)
* [Dynamic content creation with dynamic parts 2](#dynamic-content-creation-with-dynamic-parts-2)

#### Dynamic content creation

```handlebars
<!-- Template -->
{{#each user.story}}
   {{#if this.male}}
      <p>{{this.date}}</p>
   {{else if this.female}}
      <p>{{this.item}}</p>
   {{/if}}
{{/each}}
```

```json
// Test data
{
  "user": {
    "story": [
      {
        "male": true,
        "date": "2/1/2018",
        "item": "shoes"
      },
      {
        "male": true,
        "date": "1/4/2017",
        "item": "hat"
      },
      {
        "female": true,
        "date": "1/1/2016",
        "item": "shirt"
      }
    ]
  }
}
```

```html
<!-- Resulting HTML -->
<p>2/1/2018</p>
<p>1/4/2017</p>
<p>shirt</p>
```

#### Dynamic content creation with dynamic parts 1

```bash
<!-- Template -->
{{#each user.story}}
   {{#if this.male}}
      {{#if this.date}}
         <p>{{this.date}}</p>
      {{/if}}
      {{#if this.item}}
         <p>{{this.item}}</p>
      {{/if}}
   {{else if this.female}}
      {{#if this.date}}
         <p>{{this.date}}</p>
      {{/if}}
      {{#if this.item}}
         <p>{{this.item}}</p>
      {{/if}}
   {{/if}}
{{/each}}
```

```json
// Test data
{
  "user": {
    "story": [
      {
        "male": true,
        "date": "2/1/2018",
        "item": "shoes"
      },
      {
        "male": true,
        "date": "1/4/2017"
      },
      {
        "female": true,
        "item": "shirt"
      }
    ]
  }
}
```

```html
<!-- Resulting HTML -->
<p>2/1/2018</p>
<p>shoes</p>
<p>1/4/2017</p>
<p>shirt</p>
```

#### Dynamic content creation with dynamic parts 2

```bash
<!-- Template -->
{{#if people}}
   <p>People:</p>
   {{#each people}}
      <p>{{this.name}}</p>
   {{/each}}
{{/if}}
```

```json
// Test data
{
  "people": [{ "name": "Bob" }, { "name": "Sally" }]
}
```

```html
<!-- Resulting HTML -->
<p>People:</p>
<p>Bob</p>
<p>Sally</p>
```

## Additional Resources

* [Sending Email with Dynamic Transactional Templates](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates)
* [Create and edit Dynamic Transactional Templates](/docs/sendgrid/ui/sending-email/create-and-edit-legacy-transactional-templates)
* [Dynamic Templates API](/docs/sendgrid/api-reference/transactional-templates/create-a-transactional-template)
* [How to send an email with dynamic templates](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates)
