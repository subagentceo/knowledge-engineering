# Use 3D Secure authentication for Docker billing


Docker supports 3D Secure (3DS), an extra layer of authentication required
for certain credit card payments. If your bank or card issuer requires 3DS, you
may need to verify your identity before your payment can be completed.

## How it works

When a 3DS check is triggered during checkout, your bank or card issuer
may ask you to verify your identity. This can include:

- Entering a one-time password sent to your phone
- Approving the charge through your mobile banking app
- Answering a security question or using biometrics

The exact verification steps depend on your financial institution's
requirements.

## When you need to verify

You may be asked to verify your identity when performing any of the following
actions:

- Starting a [paid subscription](/subscription/manage/)
- Changing your [billing cycle](/billing/cycle/) from monthly to annual
- [Upgrading your subscription](/subscription/manage/#upgrade-plans)
- [Adding seats](/admin/organization/manage/manage-seats/) to an existing subscription

If 3DS is required and your payment method supports it, the verification prompt
will appear during checkout.

## Troubleshooting payment verification

If you're unable to complete your payment due to 3DS:

1. Retry your transaction. Make sure you're completing the verification
   prompt in the same browser tab.
1. Use a different payment method. Some cards may not support 3DS properly
   or be blocked.
1. Contact your bank. Your bank may be blocking the payment or the 3DS
   verification attempt.

> [!NOTE]
>
> Disabling ad blockers or browser extensions that block pop-ups can help
> the 3DS prompt display correctly.

