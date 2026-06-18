

# Getting started with your WorkSpace
<a name="workspaces-user-getting-started"></a>

After your administrator creates your WorkSpace, you receive an invitation email. Complete the following tasks to start using your WorkSpace.

**Topics**
+ [Complete your user profile](#complete-registration)
+ [Choose a client](#choose-client)
+ [Determine your client version](#determine-version)
+ [Determine your streaming protocol](#determine-protocol)
+ [Verify networking requirements](#verify-requirements)
+ [Save your credentials](#client-save-credentials)
+ [(Optional) Change your password](#client-change-password)

## Complete your user profile
<a name="complete-registration"></a>

After your administrator creates your WorkSpace, you must complete your user profile within seven days; otherwise, your invitation expires. If your invitation expires, ask your administrator for another invitation.

**To complete your user profile**

1. Open the link in the invitation email.

1. Enter your password. Passwords are case-sensitive and must be between 8 and 64 characters in length, inclusive. Passwords must contain at least one character from each of the following categories:
   + Lowercase characters (a-z)
   + Uppercase characters (A-Z)
   + Numbers (0-9)
   + Non-alphanumeric characters (\~\!@\#$%^&\*\_-\+=`\|\\(){}[]:;"'<>,.?/)

1. Choose **Update User**.

You can change your WorkSpaces password anytime. For more information, see [(Optional) Change your password](#client-change-password).

## Choose a client
<a name="choose-client"></a>

You can connect to your WorkSpace using the client application for a supported device or a web browser. To run the WorkSpaces client application, you must have a Windows or Linux PC, Mac, iPad, Kindle, Chromebook, or Android tablet or phone. To run WorkSpaces Web Access, you must have a Windows PC or a Mac running a Chrome or Firefox web browser, or a Linux PC running a Firefox browser.

**Note**  
Linux WorkSpaces can be accessed using the Windows client application, the macOS client application, the Linux client application, and Web Access.

For information about connecting to your WorkSpace, see the following client documentation.
+ [Android Client Application](amazon-workspaces-android-client.md)
+ [iPad Client Application](amazon-workspaces-ipad-client.md)
+ [Linux Client Application](amazon-workspaces-linux-client.md)
+ [macOS Client Application](amazon-workspaces-osx-client.md)
+ [PCoIP Zero Client](amazon-workspaces-pcoip-zero-client.md)
+ [Web Access](amazon-workspaces-web-access.md)
+ [Windows Client Application](amazon-workspaces-windows-client.md)

## Determine your client version
<a name="determine-version"></a>

To see which version of the WorkSpaces client you have, choose **Amazon WorkSpaces**, **About Amazon WorkSpaces**, or click the gear icon in the upper-right corner and choose **About Amazon WorkSpaces**.

## Determine your streaming protocol
<a name="determine-protocol"></a>

Device or feature support might differ depending on which streaming protocol your WorkSpace is using, either PCoIP or DCV. In the 3.0\+ versions of the macOS and Windows client applications, you can see which protocol your WorkSpace is using by choosing **Support**, **About My WorkSpace**. The iPad, Android, and Linux client applications currently support only the PCoIP protocol.

## Verify networking requirements
<a name="verify-requirements"></a>

To ensure a good experience with your WorkSpace, verify that your client device meets the networking requirements.

### To verify networking requirements for 3.0\+ clients
<a name="verify-requirements-new-clients"></a>

1. Open your WorkSpaces client. If this is the first time you have opened the client, you are prompted to enter the registration code that you received in the invitation email.

1. Depending on which client you're using, do one of the following.    
[See the AWS documentation website for more details](http://docs.aws.amazon.com/workspaces/latest/userguide/workspaces-user-getting-started.html)

   The client application tests the network connection, ports, and round-trip time, and reports the results of these tests.

1. Close the **Network** dialog box to return to the sign-in page.

### To verify networking requirements for 1.0\+ and 2.0\+ clients
<a name="verify-requirements-legacy-clients"></a>

1. Open your WorkSpaces client. If this is the first time you have opened the client, you are prompted to enter the registration code that you received in the invitation email.

1. Choose **Network** in the lower-right corner of the client application. The client application tests the network connection, ports, and round-trip time, and reports the results of these tests.

1. Choose **Dismiss** to return to the sign-in page.

## Save your credentials
<a name="client-save-credentials"></a>

You can choose whether to save your sign-in credentials securely so that you can reconnect to your WorkSpace without re-entering your credentials while the client application remains running. Your credentials are securely cached in RAM only. You can disable this feature and enable it again at any time.

### To save your credentials for 3.0\+ clients
<a name="client-save-credentials-new-clients"></a>

1. Open your WorkSpaces client.

1. On the client login screen, select or clear the **Keep me logged in** check box to enable or disable this option as required.

### To save your credentials for 1.0\+ and 2.0\+ clients
<a name="client-save-credentials-legacy-clients"></a>

1. Open your WorkSpaces client.

1. On the client login screen, choose the gear icon (Windows) or the **Option** menu (macOS), and choose **Advanced Settings**.

1. Select or clear the **Remember Me** check box to enable or disable this option as required.

## (Optional) Change your password
<a name="client-change-password"></a>

You can change your WorkSpaces login password at any time.

**To change your password**

1. Open your WorkSpaces client.

1. On the client login screen, choose **Forgot Password?** under the **Sign In** button.
**Note**  
If **Forgot password? **isn't available on your login screen, contact your WorkSpaces administrator for assistance with resetting your password.  
**Forgot Password?** is not available in the AWS GovCloud (US-West) Region.

1. Enter your user name, and then enter the characters you see in the image.

1. Choose **Recover Password**.

1. You will receive an email with a password-reset link. Follow the instructions in the email to change your password. Passwords are case-sensitive and must be between 8 and 64 characters in length, inclusive. Passwords must contain at least one character from each of the following categories:
   + Lowercase characters (a-z)
   + Uppercase characters (A-Z)
   + Numbers (0-9)
   + Non-alphanumeric characters (\~\!@\#$%^&\*\_-\+=`\|\\(){}[]:;"'<>,.?/)

   Ensure you don't include non-printable unicode characters, such as white spaces, carriage reture tabs, line breaks, and null characters.
**Note**  
If you receive an error, contact your AWS Managed Microsoft AD administrator.