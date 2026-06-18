# NextAuth.js

## Introduction

In this guide, you'll learn how to use WorkOS to add Single Sign-On (SSO) to a Next.js app that uses [NextAuth.js](https://next-auth.js.org/) for handling authentication. You can check out the [complete source code](https://github.com/workos/workos-next-auth) of this guide on GitHub.

## Before getting started

To get the most out of this guide, you'll need:

- A [WorkOS account](https://dashboard.workos.com/)
- An IdP (e.g. Okta) account

## (1) Install sample application

In your a terminal, browse to the directory of your choice and run the following command to clone the starter project:

```bash title="Clone the Sample App"
git clone -b start-branch https://github.com/workos-inc/workos-next-auth
```

And install the dependencies

```bash title="Install the Dependencies"
npm install
```

This is a basic Next.js app built using TypeScript and styled using TailwindCSS.

## (2) Configuring the environment variables

In the project's root folder, rename the `.env.example` file to `.env`. You can find down below the values for the WorkOS client ID and API key.

```plain title=".env"
WORKOS_API_KEY='sk_example_123456789'
WORKOS_CLIENT_ID='client_123456789'
```

As a best practice, your WorkOS API key should be kept secret and set as an environment variable on process start. The SDK is able to read the key automatically if you store it in an environment variable named `WORKOS_API_KEY`; otherwise, you will need to set it manually. The [Client ID](https://workos.com/docs/glossary/client-id) should also be set dynamically based on the release environment.

## (3) SSO Setup with WorkOS

The first step is to create an organization, which can be done using the dashboard or [via the API](https://workos.com/docs/reference/organization/create). By default, WorkOS creates a demo organization called "foo-corp.com" which you can use for testing purposes.

Take note of the "Organization ID" which can be found in the organization's detailed view. You're going to need it to make SSO work.

![A screenshot highlighting the "Organization ID" in the WorkOS dashboard.](https://images.workoscdn.com/images/af4ef014-f6c4-44b2-b7cc-ccf2db24bde5.png?auto=format\&fit=clip\&q=50)

## (4) Configure redirect URIs

In the [Applications](https://dashboard.workos.com/environment/applications) section of the WorkOS Dashboard, open your application and go to the **Redirects** tab. Add `http://localhost:3000/api/auth/callback/workos` to the redirect URIs to test the SSO login flow locally. You'll also need to add the domain of your application when deploying to production.

![A screenshot highlighting the redirect URIs in the "Configuration" tab in the WorkOS dashboard.](https://images.workoscdn.com/images/7005a351-b083-4a08-a096-cb227c21caa5.png?auto=format\&fit=clip\&q=50)

## (5) Create an API endpoint

The next step is to create a `pages/api/auth/[...nextauth].ts` file which will contain all of your NextAuth.js configurations:

```js title="pages/api/auth/[...nextAuth].ts"
import NextAuth from 'next-auth';
import WorkOSProvider from 'next-auth/providers/workos';

export default NextAuth({
  providers: [
    WorkOSProvider({
      clientId: process.env.WORKOS_CLIENT_ID,
      clientSecret: process.env.WORKOS_API_KEY,
      client: {
        token_endpoint_auth_method: 'client_secret_post',
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  debug: true,
  secret: process.env.SECRET,
});
```

You're first configuring WorkOS by passing the necessary options to the `WorkOSProvider()` function. You're then defining a custom login page using the pages option which will be located at `/login`.

You then need to wrap the global `App` component with `SessionProvider` from `NextAuth.js`. Add the following code to the `pages/_app.tsx` file:

```js title="pages/_app.tsx"
import '../styles/index.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```

## (6) Creating a custom login page

In this step, you'll create a custom login page. To do that, create a new file located at `pages/login.tsx` and add the following code to it:

```js title="pages/login.tsx"
import React from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/react';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession();

  const onSubmit = async ({ team }) => {
    // TODO: send a request to the get-organization endpoint and return the
    // organizationId from your database
    const organization = 'ORGANIZATION_ID';
    signIn('workos', undefined, {
      organization,
    });
  };

  return (
    <>
      <Head>
        <title>Next Enterprise | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && (
        <div className="py-32 flex flex-col items-center justify-center px-8">
          <p>Signed in as {session.user.email}</p>
          <br />
          <button
            onClick={() => signOut()}
            className="max-w-sm flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign out
          </button>
        </div>
      )}
      {!session && (
        <div className="py-32 flex flex-col items-center justify-center px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <svg
              className="mx-auto h-12 w-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 35 32"
            >
              <path
                fill="#2563eb"
                d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"
              />
            </svg>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Continue using enterprise SSO
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto w-full max-w-sm">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="team"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Team name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('team', { required: true })}
                      id="team"
                      name="team"
                      type="text"
                      placeholder="team name"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
```

Next, start the development server by running the following command:

```bash title="Start Server"
npm run dev
```

The application will be running at `http://localhost:3000/login` and you'll be able to see the following page:

![A screenshot showing the landing page of the example application.](https://images.workoscdn.com/images/af8ddee4-e7f1-49a1-9e7c-05e190b31d6e.png?auto=format\&fit=clip\&q=50)

## (7) Testing the Single Sign-On flow

You should persist The Organization ID in your application's database and associate it with your enterprise customer. Then when a user tries to log in, you first check if they're an enterprise customer and then use the `signIn()` function from NextAuth.js to start the login flow.

To test the login flow, hardcode the Organization ID in the form submission handler.

```js title="pages/login.tsx"
// code above unchanged

const onSubmit = async ({ team }) => {
  // TODO: create an endpoint that returns the
  // organizationId from your database
  /* +diff-start */
  const organization = 'ORGANIZATION_ID';
  /* +diff-end */
  signIn('workos', undefined, {
    organization,
  });
};

// code below unchanged
```

If you type anything in the login form and click submit, you'll be redirected to Okta. You'll then need to use your IdP login credentials.

After you complete the login process you'll see the logged-in user's email and a "Sign out" button

![A screenshot showing the example application with a successfully logged in user.](https://images.workoscdn.com/images/7fd5daef-1cd9-401d-9884-3130b7b3a095.png?auto=format\&fit=clip\&q=50)

If you're interested in setting up a different Identity Provider, check out the [full list of tutorials](https://workos.com/docs/sso) for setting up an SSO connection.
