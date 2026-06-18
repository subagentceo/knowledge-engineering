# API Keys

> \[!WARNING]
>
> Twilio SendGrid API keys are 69 characters long. Twilio can't make exceptions for third-party infrastructure unable to support a key of 69 characters.

Your application, mail client, or website can all use API (Application Programming Interface) keys to authenticate access to SendGrid services. They are the preferred alternative to using a username and password because you can revoke an API key at any time without having to change your username and password. We suggest that you use API keys for connecting to all of SendGrid's services.

## Types of API keys

*There are 3 different types of API keys:*

1. **Full Access** allows the API key to access `GET`, `PATCH`, `PUT`, `DELETE` and `POST` endpoints for all parts of your account, excluding billing and Email Address Validation.
2. **Custom Access** customizes levels of access for all parts of your account, excluding billing and Email Address Validation.
3. **Billing Access** allows the API key to access billing endpoints for the account.

### API key permissions

During the API key creation process, you will be given the option of selecting scopes, or specific permissions, that you would like to assign to your new API key. These permissions restrict which areas of your account your API key will be able to access.
When assigning permissions to your API key, you will be given the option to select one of the following levels of access:

* **No Access** prevents the API key from accessing any endpoint within the selected permission.
* **Read Access** allows the API key to access `GET` endpoints within the selected permission.
* **Full Access** allows the API key to access `GET`, `PATCH`, `PUT`, `DELETE`, and `POST` endpoints within the selected permission.

We require that you [create a separate API key](#creating-an-api-key) for making billing-related API calls. This segmentation adds an extra level of security by giving you more control over who has access to the various areas of your account.

## Managing API keys

When viewing the API keys page, you will see a list of your current API keys along with the following information:

**Name** - The name you defined for your API key.

**API Key ID** - The way you would reference your API key for management through the API (e.g. editing or deleting a key).

**Action** - Actions you can perform on your API keys, such as editing or deleting the key.

### Creating an API key

1. Navigate to **Settings** on the left navigation bar, and then select **API Keys**.
2. Click **Create API Key**.
3. Give your API key a name.
4. Select **Full Access**, **Custom Access**, or **Billing Access**.
5. If you're selecting **Custom Access**, or **Billing Access**, select the specific permissions to give each category. For more information, see [API key permissions](#api-key-permissions).
6. Click **Create & View**.
7. Copy your API key somewhere safe. For security reasons, do not put it directly in your code, or commit it somewhere public like GitHub.

> \[!WARNING]
>
> You will only be shown your API key one time. Please store it somewhere safe as we will not be able to retrieve or restore it.

There is a limit of 100 API Keys per account.

### Storing an API key in an environment variable

Twilio SendGrid recommends storing your API key in an environment variable or a config file that is not stored in version control.

When setting a variable in your program, that variable is readable by any person or system that can access the text file where it's set. However, a variable that's confined to the environment where the code is executed, stored outside the program itself, is called an environment variable. Only people and programs with access to the environment can read the value assigned to an environment variable. This makes environment variables a more secure choice for storing credentials such as API keys.

Once you assign your API key to an environment variable, you can then tell your program to look for and use that variable. Another benefit of this approach is the ability to set API keys with different permissions in different environments such as development, staging, and production without changing the code you deploy to those environments.

The examples below show how to store your key in a variable named `SENDGRID_API_KEY`. You can find additional examples in the [Twilio Documentation](/docs/usage/secure-credentials).

To store your SendGrid API key, open your terminal or command prompt and add the following:

```bash
export SENDGRID_API_KEY=the_key_you_copied_from_SendGrid
```

```bash
setx SENDGRID_API_KEY the_key_you_copied_from_SendGrid
```

To then access the variable, you can use the convention provided by your coding language.

```bash
var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
```

```go
apiKey := os.Getenv("SENDGRID_API_KEY")
```

```java
apiKey = System.getenv("SENDGRID_API_KEY");
```

```bash
const apiKey = process.env.SENDGRID_API_KEY;
```

```php
$apiKey = getenv('SENDGRID_API_KEY');
```

```python
api_key = os.environ.get('SENDGRID_API_KEY')
```

```ruby
api_key = ENV['SENDGRID_API_KEY']
```

## Editing an API key

Click the action menu in the same row as the key you would like to edit. From here you can delete a key, making it completely inactive, or you can edit your key's name and permissions.

## Deleting an API key

> \[!WARNING]
>
> Once you delete a key, it can no longer be used to access SendGrid's services.

Click the action menu in the same row as the key you want to delete. Select **Delete**. This will delete the key permanently, making it inactive. SendGrid will reject any subsequent API calls using this deleted API key.

## Replacing an old API key with a new one

1. Locate the API key you would like to replace in your list of keys and select the action menu drop down at the right on the same row, then select **Delete API key**.
2. Next, [create an API key](#creating-an-api-key).
3. Replace the old API key with the new one in your code.

You may not give an API key greater permissions than you currently have.

## Testing an API key

You can test your newly created API key using cURL:

```bash
curl -i --request POST \
--url https://api.sendgrid.com/v3/mail/send \
--header 'Authorization: Bearer YOUR_API_KEY_HERE' \
--header 'Content-Type: application/json' \
--data '{"personalizations": [{"to": [{"email": "recipient@example.com"}]}],"from": {"email": "sendeexampexample@example.com"},"subject": "Hello, World!","content": [{"type": "text/plain", "value": "Howdy!"}]}'
```

Look for a **202 Accepted** in the HTTP response headers.

## Do you want expert help to get your email program started on the right foot?

[IMPLEMENTATION SERVICES](https://sendgrid.com/solutions/email-implementation/)

Save time and feel confident you are set up for long-term success with Email Implementation. Our experts will work as an extension of your team to ensure your email program is correctly set up and delivering value for your business.
