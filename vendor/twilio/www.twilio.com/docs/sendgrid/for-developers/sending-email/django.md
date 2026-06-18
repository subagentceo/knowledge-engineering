# Django

Sending emails is a fundamental aspect of any application, be it for user notifications, password reset requests, or communication in general. Django, a popular Python web framework, provides a straightforward and versatile way to send emails. One of the options to supercharge your Django email sending capabilities is by integrating it with SendGrid, a trusted email delivery platform.

There is more detailed information about sending email over SMTP with Django on the [Django project website](https://docs.djangoproject.com/en/dev/topics/email/).

First start by adding the following to **settings.py:**

```python
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')

EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = 'apikey' # this is exactly the value 'apikey'
EMAIL_HOST_PASSWORD = SENDGRID_API_KEY
EMAIL_PORT = 587
EMAIL_USE_TLS = True
```

Then to send email you can do the following:
Inside yourapp.views.py

```python
from django.core.mail import send_mail
send_mail('Subject here', 'Here is the message.', 'from@example.com', ['to@example.com'], fail_silently=False)
```

With these lines of code, you can send emails from within your Django application. You can customize the subject, message, sender email address, and recipient(s) as needed for your specific use case.

Integrating Django with SendGrid allows you to harness the power of a reliable email delivery service while benefiting from Django's straightforward email sending capabilities. Whether you're sending account activation emails, newsletters, or notifications, this setup ensures that your emails reach your recipients efficiently and reliably.

For more in-depth information about sending email with Django, you can explore the Django project website, which provides detailed documentation and examples on how to configure and optimize email delivery within your Django applications.

> \[!NOTE]
>
> You may also send emails with Django by using the [django-sendgrid-v5](https://github.com/sklarsa/django-sendgrid-v5) library, which utilizes the [Web API](/docs/sendgrid/api-reference/mail-send/mail-send) instead of SMTP as the transport mechanism.
