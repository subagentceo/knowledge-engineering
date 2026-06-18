# Supabase + AuthKit

## Introduction

This guide outlines the steps to use WorkOS as a Supabase [third-party auth provider](https://supabase.com/docs/guides/auth/third-party/overview). This will allow you to authenticate users with AuthKit and use AuthKit access tokens to access Supabase's REST and GraphQL APIs in your app.

## (1) Add a WorkOS third-party auth integration

Configure a WorkOS integration in the [Supabase dashboard](https://supabase.com/dashboard/project/_/auth/third-party).

![Supabase 3rd party auth dashboard](https://images.workoscdn.com/images/6494746d-f6d2-46a1-bf26-f4fe7370e12b.png?auto=format\&fit=clip\&q=50)

Your issuer URL is:

```txt title="WorkOS Issuer"
https://api_workos_com/user_management/client_123456789
```

![Supabase WorkOS Connection dialog](https://images.workoscdn.com/images/e4d5c238-a217-4c9c-a955-a882074919bb.png?auto=format\&fit=clip\&q=50)

## (2) Set up a JWT Template

Supabase RLS policies expect a `role` claim in the access token that corresponds to a database role. WorkOS already adds a `role` claim corresponding to the user's role in an organization. To configure the role claim for Supabase, set up a JWT template in the Authentication page of the [WorkOS Dashboard](https://dashboard.workos.com/environment/authentication/features). Under Features, choose JWT Template:

#### JWT template

We add a `user_role` claim so that your application can still determine the role assigned to that user.

## (3) Pass the access token to Supabase APIs

Pass in your WorkOS client ID and auth domain when initializing the [Supabase client library](https://supabase.com/docs/guides/auth/third-party/workos#setup-the-supabase-client-library).

#### Supabase client library initialization

That's it! Supabase will now accept the access tokens returned by AuthKit.
