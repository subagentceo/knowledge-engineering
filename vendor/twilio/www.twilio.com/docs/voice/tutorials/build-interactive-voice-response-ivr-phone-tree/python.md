# IVR: Phone Tree with Python and Flask

![Logo of a phone with 'Dial Home' and 'The Extra-Terrestrial Phone Home Service'.](https://docs-resources.prod.twilio.com/3d12c38e81044caff67625bc678e07a0bef359fa5e60904079e51a493d42d25c.png)

This Python [Flask](http://flask.pocoo.org/) sample application is modeled after a typical call center experience, but with more [Reese's Pieces](https://en.wikipedia.org/wiki/Reese%27s_Pieces#ET:_The_Extra-).

Stranded aliens can call a phone number and receive instructions on how to get out of earth safely, or call their [home planet](https://bit.ly/asogi) directly. In this tutorial, we'll show you the critical bits of code that make this work.

> \[!NOTE]
>
> To run this sample app yourself, [download the code and follow the instructions on GitHub](https://github.com/TwilioDevEd/ivr-phone-tree-python). You can also look at [this GitHub repository](https://github.com/TwilioDevEd/ivr-phone-tree-python) to see how we've structured our application's file structure.

*[Read how Livestream](https://customers.twilio.com/906/livestream/) and [others](https://customers.twilio.com/?q=use_cases_applied\&c=CQAA) built Interactive Voice Response with Twilio. Find source code for many web frameworks on our [IVR tutorial page](/docs/voice/interactive-voice-response).*

## Answering a Phone Call

To initiate the phone tree, we need to configure one of our Twilio numbers to send our web application an HTTP request when we get an incoming call.

[Click on one of your numbers](https://www.twilio.com/login?g=%2Fconsole%2Fphone-numbers%2Fincoming%3F\&t=98a31204d675661e83d6f3d24078fc1b9f3d6c8f85f0695f6c24ccb513fd05cf) and configure the Voice URL to point to our app. In our code, the route will be `/ivr/welcome`.

![Twilio console showing IVR webhook configuration for phone number with HTTP POST method.](https://docs-resources.prod.twilio.com/92fe3569695f645baff545fe291e03587fce2919b2cc501dce7254c16f40e152.png)

If you don't already have a server configured to use as your webhook, [ngrok](https://www.twilio.com/blog/test-your-webhooks-locally-with-ngrok.html) is an excellent tool for testing webhooks locally.

With our Twilio number configured, we are prepared to respond to the Twilio request.

## Respond to the Twilio request with TwiML

Our Twilio number is now configured to [send HTTP requests](/docs/voice/twiml#twilios-request-to-your-application) to this controller method on any incoming voice calls. Our app responds with [TwiML](/docs/voice/twiml) to tell Twilio what to do in response to the message.

In this case, we tell Twilio to [`Gather`](/docs/voice/twiml/gather) the input from the caller and then [`Play`](/docs/voice/twiml/play) a welcome message.

You may have noted we're using an unknown method, \`\`\` TwiML\` \`\`. This method comes from a custom view helper that takes a TwiML Response and transforms it into a valid HTTP Response. Check out the implementation:

```python
import flask

def twiml(resp):
    resp = flask.Response(str(resp))
    resp.headers['Content-Type'] = 'text/xml'
    return resp
```

```py title="Respond with TwiML to gather an option from the caller" description="ivr_phone_tree_python/views.py"
# !mark(21:30)
from flask import (
    flash,
    render_template,
    redirect,
    request,
    session,
    url_for,
)
from twilio.twiml.voice_response import VoiceResponse

from ivr_phone_tree_python import app
from ivr_phone_tree_python.view_helpers import twiml


@app.route('/')
@app.route('/ivr')
def home():
    return render_template('index.html')


@app.route('/ivr/welcome', methods=['POST'])
def welcome():
    response = VoiceResponse()
    with response.gather(
        num_digits=1, action=url_for('menu'), method="POST"
    ) as g:
        g.say(message="Thanks for calling the E T Phone Home Service. " +
              "Please press 1 for directions." +
              "Press 2 for a list of planets to call.", loop=3)
    return twiml(response)


@app.route('/ivr/menu', methods=['POST'])
def menu():
    selected_option = request.form['Digits']
    option_actions = {'1': _give_instructions,
                      '2': _list_planets}

    if option_actions.has_key(selected_option):
        response = VoiceResponse()
        option_actions[selected_option](response)
        return twiml(response)

    return _redirect_welcome()


@app.route('/ivr/planets', methods=['POST'])
def planets():
    selected_option = request.form['Digits']
    option_actions = {'2': "+19295566487",
                      '3': "+17262043675",
                      "4": "+16513582243"}

    if selected_option in option_actions:
        response = VoiceResponse()
        response.dial(option_actions[selected_option])
        return twiml(response)

    return _redirect_welcome()


# private methods

def _give_instructions(response):
    response.say("To get to your extraction point, get on your bike and go " +
                 "down the street. Then Left down an alley. Avoid the police" +
                 " cars. Turn left into an unfinished housing development." +
                 "Fly over the roadblock. Go past the moon. Soon after " +
                 "you will see your mother ship.",
                 voice="Polly.Amy", language="en-GB")

    response.say("Thank you for calling the E T Phone Home Service - the " +
                 "adventurous alien's first choice in intergalactic travel")

    response.hangup()
    return response


def _list_planets(response):
    with response.gather(
        numDigits=1, action=url_for('planets'), method="POST"
    ) as g:
        g.say("To call the planet Broh doe As O G, press 2. To call the " +
              "planet DuhGo bah, press 3. To call an oober asteroid " +
              "to your location, press 4. To go back to the main menu " +
              " press the star key.",
              voice="Polly.Amy", language="en-GB", loop=3)

    return response


def _redirect_welcome():
    response = VoiceResponse()
    response.say("Returning to the main menu", voice="Polly.Amy", language="en-GB")
    response.redirect(url_for('welcome'))

    return twiml(response)
```

*To see the full layout of this app, you can check out its [file structure in the GitHub repository](https://github.com/TwilioDevEd/ivr-phone-tree-python).*

After playing the audio and retrieving the caller's input, Twilio will send this input to our application.

## Where to send the caller's input

The *gather's* `action` parameter takes an absolute or relative URL as a value - in our case, this is the `menu` endpoint.

When the caller finishes entering digits, Twilio will make a `GET` or `POST` request to this URL and include a `Digits` parameter with the number our caller chose.

After making its request, Twilio will continue the current call using the TwiML received in your response. Note that any TwiML verbs occurring after a `<Gather>` are unreachable unless the caller does not enter any digits.

```py title="Send caller input to the intended route" description="ivr_phone_tree_python/views.py"
# !mark(33:44)
from flask import (
    flash,
    render_template,
    redirect,
    request,
    session,
    url_for,
)
from twilio.twiml.voice_response import VoiceResponse

from ivr_phone_tree_python import app
from ivr_phone_tree_python.view_helpers import twiml


@app.route('/')
@app.route('/ivr')
def home():
    return render_template('index.html')


@app.route('/ivr/welcome', methods=['POST'])
def welcome():
    response = VoiceResponse()
    with response.gather(
        num_digits=1, action=url_for('menu'), method="POST"
    ) as g:
        g.say(message="Thanks for calling the E T Phone Home Service. " +
              "Please press 1 for directions." +
              "Press 2 for a list of planets to call.", loop=3)
    return twiml(response)


@app.route('/ivr/menu', methods=['POST'])
def menu():
    selected_option = request.form['Digits']
    option_actions = {'1': _give_instructions,
                      '2': _list_planets}

    if option_actions.has_key(selected_option):
        response = VoiceResponse()
        option_actions[selected_option](response)
        return twiml(response)

    return _redirect_welcome()


@app.route('/ivr/planets', methods=['POST'])
def planets():
    selected_option = request.form['Digits']
    option_actions = {'2': "+19295566487",
                      '3': "+17262043675",
                      "4": "+16513582243"}

    if selected_option in option_actions:
        response = VoiceResponse()
        response.dial(option_actions[selected_option])
        return twiml(response)

    return _redirect_welcome()


# private methods

def _give_instructions(response):
    response.say("To get to your extraction point, get on your bike and go " +
                 "down the street. Then Left down an alley. Avoid the police" +
                 " cars. Turn left into an unfinished housing development." +
                 "Fly over the roadblock. Go past the moon. Soon after " +
                 "you will see your mother ship.",
                 voice="Polly.Amy", language="en-GB")

    response.say("Thank you for calling the E T Phone Home Service - the " +
                 "adventurous alien's first choice in intergalactic travel")

    response.hangup()
    return response


def _list_planets(response):
    with response.gather(
        numDigits=1, action=url_for('planets'), method="POST"
    ) as g:
        g.say("To call the planet Broh doe As O G, press 2. To call the " +
              "planet DuhGo bah, press 3. To call an oober asteroid " +
              "to your location, press 4. To go back to the main menu " +
              " press the star key.",
              voice="Polly.Amy", language="en-GB", loop=3)

    return response


def _redirect_welcome():
    response = VoiceResponse()
    response.say("Returning to the main menu", voice="Polly.Amy", language="en-GB")
    response.redirect(url_for('welcome'))

    return twiml(response)
```

Now that we have told Twilio where to send the caller's input, we can look at how to process that input.

## The Main Menu: Processing the caller's selection

This route handles processing the caller's input.

If our caller chooses '1' for directions, we use the [`_give_instructions`](https://github.com/TwilioDevEd/ivr-phone-tree-python/blob/61dba01c2a16ba23a24b703396bf4adfd9465355/ivr_phone_tree_python/views.py#L52-L63) method to respond with TwiML that will [`Say`](/docs/voice/twiml/say) directions to our caller's extraction point.

If the caller chooses '2' to call their home planet, then we need to gather more input from them. We wrote another method to handle this, [`_list_planets`](https://github.com/TwilioDevEd/ivr-phone-tree-python/blob/61dba01c2a16ba23a24b703396bf4adfd9465355/ivr_phone_tree_python/views.py#L66-L73), which we'll cover in the next step.

If the caller enters anything else, we respond with a TwiML [`Redirect`](/docs/voice/twiml/redirect) to the main menu.

```py title="Main menu and return instructions" description="ivr_phone_tree_python/views.py"
# !mark(64:97)
from flask import (
    flash,
    render_template,
    redirect,
    request,
    session,
    url_for,
)
from twilio.twiml.voice_response import VoiceResponse

from ivr_phone_tree_python import app
from ivr_phone_tree_python.view_helpers import twiml


@app.route('/')
@app.route('/ivr')
def home():
    return render_template('index.html')


@app.route('/ivr/welcome', methods=['POST'])
def welcome():
    response = VoiceResponse()
    with response.gather(
        num_digits=1, action=url_for('menu'), method="POST"
    ) as g:
        g.say(message="Thanks for calling the E T Phone Home Service. " +
              "Please press 1 for directions." +
              "Press 2 for a list of planets to call.", loop=3)
    return twiml(response)


@app.route('/ivr/menu', methods=['POST'])
def menu():
    selected_option = request.form['Digits']
    option_actions = {'1': _give_instructions,
                      '2': _list_planets}

    if option_actions.has_key(selected_option):
        response = VoiceResponse()
        option_actions[selected_option](response)
        return twiml(response)

    return _redirect_welcome()


@app.route('/ivr/planets', methods=['POST'])
def planets():
    selected_option = request.form['Digits']
    option_actions = {'2': "+19295566487",
                      '3': "+17262043675",
                      "4": "+16513582243"}

    if selected_option in option_actions:
        response = VoiceResponse()
        response.dial(option_actions[selected_option])
        return twiml(response)

    return _redirect_welcome()


# private methods

def _give_instructions(response):
    response.say("To get to your extraction point, get on your bike and go " +
                 "down the street. Then Left down an alley. Avoid the police" +
                 " cars. Turn left into an unfinished housing development." +
                 "Fly over the roadblock. Go past the moon. Soon after " +
                 "you will see your mother ship.",
                 voice="Polly.Amy", language="en-GB")

    response.say("Thank you for calling the E T Phone Home Service - the " +
                 "adventurous alien's first choice in intergalactic travel")

    response.hangup()
    return response


def _list_planets(response):
    with response.gather(
        numDigits=1, action=url_for('planets'), method="POST"
    ) as g:
        g.say("To call the planet Broh doe As O G, press 2. To call the " +
              "planet DuhGo bah, press 3. To call an oober asteroid " +
              "to your location, press 4. To go back to the main menu " +
              " press the star key.",
              voice="Polly.Amy", language="en-GB", loop=3)

    return response


def _redirect_welcome():
    response = VoiceResponse()
    response.say("Returning to the main menu", voice="Polly.Amy", language="en-GB")
    response.redirect(url_for('welcome'))

    return twiml(response)
```

If the caller chooses '2', we will take them to the Planet Directory to collect more input.

## The Planet Directory: Collecting more input from the caller

If our callers choose to call their home planet, we will read them the planet directory. Our planet directory is similar to a typical "company directory" feature of most IVRs.

In our TwiML response, we again use a `Gather` verb to get our caller's input. This time, the `action` verb points to the `planets` route, which will map our response to what the caller chooses.

Let's look at that route next. The TwiML response we return for that route uses a [`Dial`](/docs/voice/twiml/dial) verb with the appropriate phone number to connect our caller to their home planet.

```py title="Collect more input from the caller via the Planet Directory" description="ivr_phone_tree_python/views.py"
# !mark(79:89)
from flask import (
    flash,
    render_template,
    redirect,
    request,
    session,
    url_for,
)
from twilio.twiml.voice_response import VoiceResponse

from ivr_phone_tree_python import app
from ivr_phone_tree_python.view_helpers import twiml


@app.route('/')
@app.route('/ivr')
def home():
    return render_template('index.html')


@app.route('/ivr/welcome', methods=['POST'])
def welcome():
    response = VoiceResponse()
    with response.gather(
        num_digits=1, action=url_for('menu'), method="POST"
    ) as g:
        g.say(message="Thanks for calling the E T Phone Home Service. " +
              "Please press 1 for directions." +
              "Press 2 for a list of planets to call.", loop=3)
    return twiml(response)


@app.route('/ivr/menu', methods=['POST'])
def menu():
    selected_option = request.form['Digits']
    option_actions = {'1': _give_instructions,
                      '2': _list_planets}

    if option_actions.has_key(selected_option):
        response = VoiceResponse()
        option_actions[selected_option](response)
        return twiml(response)

    return _redirect_welcome()


@app.route('/ivr/planets', methods=['POST'])
def planets():
    selected_option = request.form['Digits']
    option_actions = {'2': "+19295566487",
                      '3': "+17262043675",
                      "4": "+16513582243"}

    if selected_option in option_actions:
        response = VoiceResponse()
        response.dial(option_actions[selected_option])
        return twiml(response)

    return _redirect_welcome()


# private methods

def _give_instructions(response):
    response.say("To get to your extraction point, get on your bike and go " +
                 "down the street. Then Left down an alley. Avoid the police" +
                 " cars. Turn left into an unfinished housing development." +
                 "Fly over the roadblock. Go past the moon. Soon after " +
                 "you will see your mother ship.",
                 voice="Polly.Amy", language="en-GB")

    response.say("Thank you for calling the E T Phone Home Service - the " +
                 "adventurous alien's first choice in intergalactic travel")

    response.hangup()
    return response


def _list_planets(response):
    with response.gather(
        numDigits=1, action=url_for('planets'), method="POST"
    ) as g:
        g.say("To call the planet Broh doe As O G, press 2. To call the " +
              "planet DuhGo bah, press 3. To call an oober asteroid " +
              "to your location, press 4. To go back to the main menu " +
              " press the star key.",
              voice="Polly.Amy", language="en-GB", loop=3)

    return response


def _redirect_welcome():
    response = VoiceResponse()
    response.say("Returning to the main menu", voice="Polly.Amy", language="en-GB")
    response.redirect(url_for('welcome'))

    return twiml(response)
```

Again, we show some options to the caller and instruct Twilio to collect the caller's choice.

## The Planet Directory: Connect the caller to another number

In this route, we grab the caller's digit selection from the HTTP request and store it in a variable called `selected_option`. We then use a [`Dial`](/docs/voice/twiml/dial) verb with the appropriate phone number to connect our caller to their home planet.

The current numbers are hardcoded, but you could update this code to read phone numbers from a database or a file.

```py title="Connect to another number based on caller input" description="ivr_phone_tree_python/views.py"
# !mark(47:59)
from flask import (
    flash,
    render_template,
    redirect,
    request,
    session,
    url_for,
)
from twilio.twiml.voice_response import VoiceResponse

from ivr_phone_tree_python import app
from ivr_phone_tree_python.view_helpers import twiml


@app.route('/')
@app.route('/ivr')
def home():
    return render_template('index.html')


@app.route('/ivr/welcome', methods=['POST'])
def welcome():
    response = VoiceResponse()
    with response.gather(
        num_digits=1, action=url_for('menu'), method="POST"
    ) as g:
        g.say(message="Thanks for calling the E T Phone Home Service. " +
              "Please press 1 for directions." +
              "Press 2 for a list of planets to call.", loop=3)
    return twiml(response)


@app.route('/ivr/menu', methods=['POST'])
def menu():
    selected_option = request.form['Digits']
    option_actions = {'1': _give_instructions,
                      '2': _list_planets}

    if option_actions.has_key(selected_option):
        response = VoiceResponse()
        option_actions[selected_option](response)
        return twiml(response)

    return _redirect_welcome()


@app.route('/ivr/planets', methods=['POST'])
def planets():
    selected_option = request.form['Digits']
    option_actions = {'2': "+19295566487",
                      '3': "+17262043675",
                      "4": "+16513582243"}

    if selected_option in option_actions:
        response = VoiceResponse()
        response.dial(option_actions[selected_option])
        return twiml(response)

    return _redirect_welcome()


# private methods

def _give_instructions(response):
    response.say("To get to your extraction point, get on your bike and go " +
                 "down the street. Then Left down an alley. Avoid the police" +
                 " cars. Turn left into an unfinished housing development." +
                 "Fly over the roadblock. Go past the moon. Soon after " +
                 "you will see your mother ship.",
                 voice="Polly.Amy", language="en-GB")

    response.say("Thank you for calling the E T Phone Home Service - the " +
                 "adventurous alien's first choice in intergalactic travel")

    response.hangup()
    return response


def _list_planets(response):
    with response.gather(
        numDigits=1, action=url_for('planets'), method="POST"
    ) as g:
        g.say("To call the planet Broh doe As O G, press 2. To call the " +
              "planet DuhGo bah, press 3. To call an oober asteroid " +
              "to your location, press 4. To go back to the main menu " +
              " press the star key.",
              voice="Polly.Amy", language="en-GB", loop=3)

    return response


def _redirect_welcome():
    response = VoiceResponse()
    response.say("Returning to the main menu", voice="Polly.Amy", language="en-GB")
    response.redirect(url_for('welcome'))

    return twiml(response)
```

That's it! We've just implemented an IVR phone tree that will help get ET back home.

## Where to Next?

If you're a Python/Flask developer working with Twilio, you might want to check out these other tutorials:

[Appointment Reminders](/docs/messaging/tutorials/appointment-reminders/python)

Use Twilio to automate the process of reaching out to your customers in advance of an upcoming appointment.

[Two-Factor Authentication with Authy](/docs/authy/tutorials/two-factor-authentication-python-flask)

Use Twilio and Twilio-powered Authy OneTouch to implement two-factor authentication (2FA) in your web app.
