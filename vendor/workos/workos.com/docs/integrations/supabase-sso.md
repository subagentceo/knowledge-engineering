# Supabase + WorkOS SSO

## Introduction

This guide outlines the steps to make WorkOS SSO connections available to your application using Supabase Auth. It will require a few changes to your existing Supabase application code.

If you are wanting to instead use AuthKit with your Supabase application, check out our [Supabase + AuthKit guide](https://workos.com/docs/integrations/supabase-authkit).

***

## (1) Copy WorkOS Client ID and API Key

Supabase uses the WorkOS Client ID and API Key to initiate the authentication flow and to return the SSO user profile. The first step is finding the Client ID and the API Key in the WorkOS dashboard.

In the WorkOS dashboard, go to **Configuration** and under the "Settings" tab and copy the Client ID.

![A screenshot showing where to find the Client ID in the WorkOS dashboard configurations page.](https://images.workoscdn.com/images/5cdbbd7e-2141-470c-8b86-b0876974e58a.png?auto=format\&fit=clip\&q=50)

Select **API Keys** on the left-side navigation bar and either copy an existing API Key or create a new API Key and copy it.

![A screenshot showing where the WorkOS API Key is in the dashboard.](https://images.workoscdn.com/images/fe6c9ad1-f04a-4335-9752-4ef149fa3147.png?auto=format\&fit=clip\&q=50)

***

## (2) Add your WorkOS credentials into your Supabase Project and configure the Redirect URL

Sign in to Supabase and then go to your Supabase Project Dashboard. Navigate to **Authentication** → **Explore Auth**.

![A screenshot showing when to the Authentication section is in the Supabase project dashboard.](https://images.workoscdn.com/images/f773aeb8-5bee-4eba-89a0-62441a79be11.png?auto=format\&fit=clip\&q=50)

Select the Providers tab and scroll down to WorkOS and enter the WorkOS URL as **https://api.workos.com**. Then enter the Client ID and API Key copied from the WorkOS Dashboard, toggle to enable WorkOS as a provider and click **Save**.

![A screenshot showing how to enable WorkOS as a provider in Supabase and input the WorkOS URL, Client ID and Secret Key.](https://images.workoscdn.com/images/c275b3f4-807c-4961-916b-c0ed2d6717dd.png?auto=format\&fit=clip\&q=50)

Copy the Redirect URL from the WorkOS provider section. In the [Applications](https://dashboard.workos.com/environment/applications) section of the WorkOS Dashboard, open your application and go to the **Redirects** tab to add the copied Redirect URL.

![A screenshot showing where to add the WorkOS Redirect URL.](https://images.workoscdn.com/images/27ad127c-3631-45d0-aedc-39ab90f03ed6.png?auto=format\&fit=clip\&q=50)

***

## (3) Add login code to your client app

When a user signs in, call `signInWithOAuth` with `workos` as the provider. Pass in a Connection ID, Organization ID, or provider type (for OAuth) under `queryParams`.

#### Connection

#### Organization

#### Provider

***

## Summary

With a few lines of code, you can add WorkOS as an SSO provider and enable features like the admin portal and dozens of integrations within your Supabase application.
