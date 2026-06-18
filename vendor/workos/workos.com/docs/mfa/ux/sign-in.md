# Sign-In UX

## Introduction

Once a user has setup two-factor authentication, their sign-in process will be different from the standard sign-in flow. This guide will walk you through the adjustments you need to make to support this in your application.

## Prompt user to verify the extra factor

At the very least, assuming the user has enrolled in one method (e.g. SMS/Text message) you should present the user with a new screen for the extra verification step after they have entered their username and password.

## When the user has enrolled in multiple methods

If the user has enrolled in multiple methods, consider including both methods in the verification step after they have entered their username and password. Following what we discussed in the [enrollment guide](https://workos.com/docs/mfa/ux/enrollment/let-users-choose-their-primary-method), consider presenting the user with their primary method first as well as letting them switch.

***

## Full interactive UI example

The following interactive example shows a full UI for signing-in using MFA encompassing all the considerations mentioned above.
