This article provides information on how to enable the Claude LTI integration in Canvas LMS. These steps are intended for Claude for Education administrators and Learning Management Systems (LMS) administrators.

## Creating Claude LTI Developer Key in Canvas

1. In Canvas, sign in as an administrator and navigate to **Admin -> Developer Keys**.

2. Click "+ Developer Key" then "+ LTI Key."

3. Enter the following:

4. **Key Name:** Claude LTI

5. **Description:** Enter a short description for the Canva LTI 1.3 app

6. **Redirect URIs:** <https://claude.ai/lti/launch>

7. **Title:** Claude LTI

8. **Target Link URI:** <https://claude.ai/lti/launch>

9. **OpenID Connect Initiation Url:** <https://claude.ai/api/lti/login>

10. **JWK method:** <https://claude.ai/api/lti/keys>

11. Under **Additional Settings**, toggle Privacy Level to **Public**.

12. Under **Placements**, we recommend removing the defaults and adding "Course Navigation" and "Assignment Edit" as the options.

13. Click "Save."

14. Toggle the state to **On**.

## Installing Claude LTI as an App

1. In Canvas, go to Admin -> Settings -> Apps.

2. Click "View App Configurations" then select "+ App."

3. Select **Configuration Type** “By Client ID.”

4. Input the Client ID generated for your developer key (from Step 6 under Creating Claude LTI Developer Key in Canvas).

5. Click "Install" and refresh the course page.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/1611422430/c8e0875feac1f2c7cb033be74fc9/AD_4nXfLU_bui3EXcCjQ0qm70HD97neqjGayKeDer_t76utlci8gZSUjYRhw6ZSOlDdqSEcwXBzd_shAh7pQEJ-8OoE0O21DM5coOgxmO_WD5hlwiuwtS2iYXcTavhIRyQT5zKFWvfn3NA?expires=1780164900&signature=84043e6850f7a57b68d5409a2e65c20ec807e0410dcb1ff85c5f9f4dca67f459&req=dSYmF818n4VcWfMW1HO4zTEDausfnfeIEv2ojHLMylbwYnAoSe%2BOzweBZ7iT%0AGWKOVqAA3BDBxAv2d7c%3D%0A)

## Turn on the Claude LTI Integration in Claude for Education organization settings

1. In Claude for Education, sign in as an administrator.

2. Navigate to **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**.

3. Find **Canvas** and click "Enable."

4. In the settings modal that pops up, input the required information to enable the integration

5. **Canvas Domain**

6. **Client ID** (found in Canvas Admin -> Developer Keys)

7. **Deployment ID** (found in Canvas Admin -> Settings -> Apps -> View App Configurations -> Claude LTI Settings Button -> Deployment ID)

8. Click "Save Changes." The integration should now show as enabled.

## Questions

If you have any questions about your Claude for Education plan account or the Claude LTI, we encourage you to contact your university’s administrator(s).
