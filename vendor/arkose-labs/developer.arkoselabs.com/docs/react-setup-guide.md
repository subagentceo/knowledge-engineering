# React Setup Guide

# Overview

This page describes how to use the Arkose Bot Manager JavaScript API with *single page applications (SPA)* built using React.

## Prerequisite: API Request Authentication Private/Public Key Pair

Arkose Labs authenticates your API requests using a private/public key pair retrievable from the [Arkose Labs Command Center](https://developer.arkoselabs.com/docs/arkose-labs-command-center). To get the key pair, go to the left menubar’s **Settings** entry and then to its **Keys** sub-entry as shown below. If you do not have access to the Command Center or do not have your private and public keys, contact your Arkose Sales Rep or Solution Consultant.

You need the private key to authenticate when using the Arkose Verify API. This private key **must NOT** be published on a client facing website, and **must only be used on your Verify API server-side implementation.**

<Image border={false} src="https://files.readme.io/6aa4068-image.png" />

## Loading the API

Your SPA loads the Arkose Bot Manager API via a `<script>` tag. It contains:

* The Arkose Bot Manager API’s URL.
* Your public key from the Arkose Labs Command Center
* As the value of `data-callback`, the name of a JavaScript function that configures the Arkose Bot Manager client API.

Full details about the script tag and function are in the [Client-Side Instructions](https://developer.arkoselabs.com/docs/standard-setup).

Remember to replace `<company>` with your company's personalized Client API URL name, and replace \<YOUR\_PUBLIC\_KEY> with the public key supplied to you by Arkose Labs.

**For Enforcement:**

`<script src="https://<company>-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" data-callback="setupEnforcement" />`

**For Detection:**\
`<script src="https://<company>-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" data-callback="setupDetect" />`

***

## Implementing Arkose Labs in React

We present two examples on how to implement Arkose Labs in React, one in modal/lightbox mode and one in inline mode. They are located in Arkose’s GitHub repo at:

* [React Example](https://github.com/ArkoseLabs/arkose-examples/tree/main/react-example)

<Callout icon="⚠️" theme="warn">
  Arkose strongly encourages you to develop in Modal rather than Inline. If you think you have to use Inline, please talk to your Arkose rep about it.
</Callout>

* arkose-modal: Arkose Enforcement Challenge over a Modal mode on an HTML page. To see the Arkose modal version, go to `http://localhost:3000/`
* arkose-inline: Arkose Enforcement Challenge in Inline mode on an HTML page. To see the Inline version, go to `http://localhost:3000/forgot-password`

The example project provides a simple React component that wraps around Arkose’s Client API. It contains a shared Arkose class, which allows for passing in different public keys and mode (lightbox or inline).

The `Readme.md` file contains instructions for how to load and run both examples. When Arkose Verification/Challenge is completed in a login page, it goes to `http://localhost:3000/dashboard`.

### Step 1: Adding Your Public Key(s) to the Environment

In the example, the start of the component files initializes the component and loads the Arkose script and passes the public key as `process.env.REACT_APP_ARKOSE_PUBLIC_KEY` in `/.env`

Below is the example content of the `/.env` file:

```
# Replace <YOUR_PUBLIC_KEY> with the public key that has been setup for your account

REACT_APP_ARKOSE_PUBLIC_KEY='<YOUR_PUBLIC_KEY>'
```

### Adding Multiple Keys to the Environment

Note that you can define multiple public key variables in the `/.env` file. For example, in the environment file, you could also define a login Arkose key with a different public key variable used for login workflows and a regKey for registration workflows. Shown here is `/.env` after adding an additional login Arkose key:

```
// Replace <YOUR_PUBLIC_KEY_1> and <YOUR_PUBLIC_KEY_2> with the public keys that have been setup for your account
REACT_APP_ARKOSE_PUBLIC_KEY='<YOUR_PUBLIC_KEY_1>'
REACT_APP_LOGIN_ARKOSE_PUBLIC_KEY='<YOUR_PUBLIC_KEY_2>'
```

### Step 2: Injecting the Arkose Labs Script

The next step is to inject the Arkose Labs script into your React component. To do this, just copy and paste the example code in `/src/components/Arkose.js` shown below where needed in your application's code, typically in the components folder.

<Callout icon="⚠️" theme="warn">
  Remember to replace `<company>` with your company's personalized Client API URL name. (See [Vanity URLs in the Knowledge Base](https://support.arkoselabs.com/hc/en-us/articles/5745765165971-Vanity-URLs) (support login required) for details)
</Callout>

```javascript
import React from 'react';
import PropTypes from 'prop-types';

export default class Arkose extends React.Component {
  constructor () {
    super();
    this.myEnforcement = null;
    this.scriptId = '';
  }

  removeScript = () => {
    const currentScript = document.getElementById(this.scriptId);
    if (currentScript) {
      currentScript.remove();
    }
  };

  // Append the JS tag to the Document Body.
  loadScript = () => {
    this.removeScript();
    const script = document.createElement('script');
    script.id = this.scriptId;
    script.type = 'text/javascript';
    script.src = `https://<company>-api.arkoselabs.com/v2/${this.props.publicKey}/api.js`;
    script.setAttribute('data-callback', 'setupEnforcement');
    if (this.props.nonce) {
      script.setAttribute('data-nonce', this.props.nonce);
    }
    document.body.appendChild(script);
    return script;
  };

  setupEnforcement = (myEnforcement) => {
    this.myEnforcement = myEnforcement;
    this.myEnforcement.setConfig({
      selector: this.props.selector,
      mode: this.props.mode,
      onReady: () => {
        this.props.onReady();
      },
      onShown: () => {
        this.props.onShown();
      },
      onShow: () => {
        this.props.onShow();
      },
      onSuppress: () => {
        this.props.onSuppress();
      },
      onCompleted: (response) => {
        this.props.onCompleted(response.token);
      },
      onReset: () => {
        this.props.onReset();
      },
      onHide: () => {
        this.props.onHide();
      },
      onError: (response) => {
        this.props.onError(response?.error);
      },
      onFailed: (response) => {
        this.props.onFailed(response);
      }
    });
  };

  componentDidMount () {
    this.scriptId = `arkose-script-${this.props.publicKey}`;
    const scriptElement = this.loadScript();
    // This will inject required html and css after the Arkose script is properly loaded
    scriptElement.onload = () => {
      console.log('Arkose API Script loaded');
      window.setupEnforcement = this.setupEnforcement.bind(this);
    };
    // If there is an error loading the Arkose script this callback will be called
    scriptElement.onerror = () => {
      console.log('Could not load the Arkose API Script!');
    };
  }

  componentWillUnmount () {
    if (window.setupEnforcement) {
      delete window.setupEnforcement;
    }
    this.removeScript();
  }

  render () {
    return (
      <>
        {this.props.mode === 'inline' && <div id={this.props?.selector?.slice(1)}></div>}
      </>
    );
  }
}

Arkose.propTypes = {
  publicKey: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['inline', 'lightbox']),
  selector: PropTypes.string, // Any valid DOM selector is allowed here
  nonce: PropTypes.string,
  onReady: PropTypes.func,
  onShown: PropTypes.func,
  onShow: PropTypes.func,
  onSuppress: PropTypes.func,
  onCompleted: PropTypes.func,
  onReset: PropTypes.func,
  onHide: PropTypes.func,
  onError: PropTypes.func,
  onFailed: PropTypes.func
};

Arkose.defaultProps = {
  onReady: () => {},
  onShown: () => {},
  onShow: () => {},
  onSuppress: () => {},
  onCompleted: () => {},
  onReset: () => {},
  onHide: () => {},
  onError: () => {},
  onFailed: () => {}
};
```

**Example: Injecting Arkose Labs into the applications**

For an example of how Arkose Labs is injected into the applications for a Login page, see `/src/components/Login.js`.

```javascript
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Arkose from './Arkose';

const Login = () => {
  const arkoseRef = useRef();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const publicKey = process.env.REACT_APP_ARKOSE_PUBLIC_KEY;

  const onSubmit = () => {
    if (!token) {
      arkoseRef.current.myEnforcement.run();
      return;
    }
    navigate('/dashboard');
  };

  const onCompleted = (token) => {
    console.log('Token:', token);
    setToken(token);
    navigate('/dashboard');
  };

  const onError = (error) => {
    console.log('Error:', error);
  };

  return (
    <>
      <h2>Login</h2>
      <input type="text" id="email" name="email" placeholder="Email" />
      <input type="text" id="password" name="password" placeholder="Password" />
      <button onClick={onSubmit}>Login</button>
      <br />
      <Link to="/forgot-password">Forgot Password</Link>
      <Arkose
        publicKey={publicKey}
        onCompleted={onCompleted}
        onError={onError}
        ref={arkoseRef}
      />
    </>
  );
};
export default Login;
```

### Step 3: Callback Functions and Event Emitters

When the script is injected, the passing public key stored on an environment file is also passed. Once the script is loaded, the workflow binds the callback function to a Window object. *See first[Client API: API Callbacks](https://developer.arkoselabs.com/docs/client-api#api-callbacks) for general details about Arkose Client API callbacks, followed by [Callbacks](https://developer.arkoselabs.com/docs/callbacks) for specific descriptions of the various callbacks.*

Also, callbacks are defined and added to the components configuration, using their association with an event emitter. For example:

```javascript
  const onCompleted = (token) => {
    console.log('Token:', token);
    setToken(token);
    navigate('/dashboard');
  };
```

In particular, note the definition of `onCompleted`, where we handle passing the response token to the Arkose Verify API.

The full list of callback functions and event emitters can be found in the example code above for `/src/components/Arkose.js`

***

## Summary

To use the Arkose Bot Manager in an React SPA, you need to do the following as part of the SPA’s definition.

1. Place all Arkose public keys you need to use (one per workflow) in environment variables.
2. Cut and paste the `Arkose.js` code where needed in your application’s code, typically in `components` folder.
3. Write a file that associates the callback functions with event emitters and defines what they do when called. e.g. `Login.js`