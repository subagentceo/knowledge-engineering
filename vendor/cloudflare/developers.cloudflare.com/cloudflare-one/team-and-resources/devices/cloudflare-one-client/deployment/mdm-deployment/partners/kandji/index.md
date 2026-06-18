---
title: Kandji
description: Deploy the Cloudflare One Client with Kandji on macOS using a custom configuration profile.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Kandji

Kandji deploys the Cloudflare One Client (formerly WARP) as a custom app. For an overview of how Kandji deploys custom apps, refer to their [knowledge base article ↗](https://support.kandji.io/custom-apps-overview).

## macOS

For the simplest deployment, Kandji has created a downloadable configuration profile that enables the Cloudflare One Client's user notifications and configures its Privacy Preference Policy Control ([PPPC ↗](https://support.kandji.io/create-a-privacy-preferences-policy-control-profile)) to have Full Disk Access.

1. Download the [custom profile ↗](https://github.com/kandji-inc/support/blob/64e0d8c8fa393d0967d2519aea60b5c834754563/Configuration%20Profiles/cloudflare%5Fwarp.mobileconfig).
2. Add the custom profile:  
   1. Go to **Library** \> **Add New** \> **Add Library Item** \> **Custom Profile**.  
   2. Select **Add & Configure**.
3. Configure the custom profile:  
   1. Enter a **Name** for the custom configuration profile.  
   2. Assign your custom profile to a test Blueprint.  
   3. Set **Device Families** to _Mac_.  
   4. Upload the `cloudflare_warp.mobileconfig` file you previously downloaded.  
   5. Save the custom profile.  
![Configuring custom profile for the Cloudflare One Client in Kandji](https://developers.cloudflare.com/_astro/custom-profile.1_c6pwrU_Z1xGDVV.webp)  
_Note: Labels in this image may reflect a previous product name._
4. Add a custom app:  
   1. Go to **Library** \> **Add New** \> **Add Library Item** \> **Custom App**.  
   2. Select **Add & Configure**.
5. Configure the custom app:  
   1. Name the custom app.  
   2. Assign the custom app to the same test Blueprint used for the profile.  
   3. Select **Audit and Enforce** as the installation type.  
   4. Copy the **Audit and Enforce Script** [below](#audit-and-enforce-script) and paste it into the **Audit Script** text field.  
   5. To enforce a minimum app version, update the **ENFORCED\_VERSION** variable in the audit script with the version number the audit script should enforce (for example, `1.5.207.0`).  
   If **ENFORCED\_VERSION** is left blank (`""`), the audit script will not check for a version and will only check for the presence of the Cloudflare WARP.app in the Applications folder or a subfolder within **Applications**. Refer to the script comments for more details.  
   6. In the **Install Details** section, select **Installer Package**.  
   7. Under **Installer Package**, upload the `Cloudflare_WARP_<VERSION>.pkg` file. If you do not already have the installer package, [download it here](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#macos).  
   8. Select **Save**.

To verify that the Cloudflare One Client was installed, select the app in the **Custom App** library and view its **Status** tab.

After deploying the Cloudflare One Client, you can check its connection progress using the [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) messages displayed in the Cloudflare One Client GUI.

## Audit and Enforce Script

The following audit script checks if the Cloudflare One Client is installed and optionally enforces a minimum version number.

Python

```

#!/bin/zsh


###################################################################################################

# Created by Matt Wilson | se@kandji.io | Kandji, Inc. | Solutions Engineering

###################################################################################################

# Created on 07/30/2021

###################################################################################################

# Software Information

###################################################################################################

# This script is designed to check if an application is present. If the app is present, the

# script will check to see if a minimum version is being enforced. If a minimum app version is not

# being enforced, the script will only check to see if the app is installed or not.

###################################################################################################

# License Information

###################################################################################################

# Copyright 2021 Kandji, Inc.

#

# Permission is hereby granted, free of charge, to any person obtaining a copy of this

# software and associated documentation files (the "Software"), to deal in the Software

# without restriction, including without limitation the rights to use, copy, modify, merge,

# publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons

# to whom the Software is furnished to do so, subject to the following conditions:

#

# The above copyright notice and this permission notice shall be included in all copies or

# substantial portions of the Software.

#

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,

# INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR

# PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE

# FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR

# OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER

# DEALINGS IN THE SOFTWARE.

###################################################################################################


# Script version

_VERSION="1.0.0"


###################################################################################################

###################################### VARIABLES ##################################################

###################################################################################################

# If you would like to enforce a minimum version, be sure to update the ENFORCED_VERSION variable

# with the version number that the audit script should enforce. (Example version number

# 1.5.207.0). If ENFORCED_VERSION is left blank, the audit script will not check for a version and

# will only check for the presence of the Cloudflare WARP app at the defined APP_PATH.

ENFORCED_VERSION="1.5.207.0"


###################################################################################################


# Make sure that the application matches the name of the app that will be installed.

# This script will dynamically search for the application in the Applications folder. So

# there is no need to define an application path. The app must either install in the

# Applications folder or up to 3 sub-directories deep.

#   For example Applications/<app_folder_name>/<app_name.app>

APP_NAME="Cloudflare WARP.app"


# Change the PROFILE_PAYLOAD_ID_PREFIX variable to the profile prefix you want to wait on before

# running the installer. If the profile is not found, this audit and enforce script will exit 00

# and do nothing until the next kandji agent check-in.

PROFILE_PAYLOAD_ID_PREFIX="io.kandji.cloudflare.C59FD67"


###################################################################################################

###################################### FUNCTIONS ##################################################

###################################################################################################


return_installed_app_version() {

    # Return the currently installed application version

    #

    # $1 - Is the name of the application.

    local app_name="$1"

    local installed_version="" # Initialize local variable


    # Uses the find binary to look for the app inside of the Applications directory and

    # any subdirectories up to 3 levels deep.

    local find_app="$(/usr/bin/find /Applications -maxdepth 3 -name $app_name)"

    local ret="$?"


    # Check to see if the app is installed.

    if [[ "$ret" -eq 0 ]] && [[ -d "$find_app" ]] &&

        [[ "$app_name" == "$(/usr/bin/basename $find_app)" ]]; then

        # If the previous command returns true and the returned object is a directory

        # and the app name that we are looking for is exactly equal to the app name

        # found by the find command.


        # Gets the installed app version and replaces any "-" with "."

        installed_version=$(/usr/bin/defaults read \

            "$find_app/Contents/Info.plist" CFBundleShortVersionString |

            /usr/bin/sed "s/-/./g")


    else

        installed_version="None"

    fi


    echo "$installed_version"

}


###################################################################################################

###################################### MAIN LOGIC #################################################

###################################################################################################


# All of the main logic be here ... modify at your own risk.


# The profiles variable will be set to an array of profiles that match the prefix in

# the PROFILE_PAYLOAD_ID_PREFIX variable

profiles=$(/usr/bin/profiles show | grep "$PROFILE_PAYLOAD_ID_PREFIX" | sed 's/.*\ //')


# If the PROFILE_PAYLOAD_ID_PREFIX is not found, exit 0 to wait for the next agent run.

if [[ ${#profiles[@]} -eq 0 ]]; then

    echo "no profiles with ID $PROFILE_PAYLOAD_ID_PREFIX were found ..."

    echo "Waiting until the profile is installed before proceeding ..."

    echo "Will check again at the next Kandji agent check-in ..."

    exit 0


else

    echo "Profile prefix $PROFILE_PAYLOAD_ID_PREFIX present ..."


    # Uses the find binary to look for the app inside of the Applications directory and

    # any subdirectories up to 3 levels deep.

    find_app="$(/usr/bin/find /Applications -maxdepth 3 -name $APP_NAME)"

    ret="$?"


    # Check to see if the app is installed.

    if [[ "$ret" -eq 0 ]] && [[ -d "$find_app" ]] &&

        [[ "$APP_NAME" == "$(/usr/bin/basename $find_app)" ]]; then

        # If the previous command returns true and the returned object is a directory

        # and the app name that we are looking for is exactly equal to the app name

        # found by the find command.

        echo "$find_app was found ..."


        # Check to see if an ENFORCED_VERSION is set. If not, exit 0.

        if [[ "$ENFORCED_VERSION" == "" ]]; then

            echo "A minimum enforced version is not set ..."

            exit 0

        fi


        # Get the currently install version

        # Pass the APP_NAME variable from above to the return_installed_app_version function

        # Removing the periods from the version number so that we can make a comparison.

        installed_version="$(return_installed_app_version $APP_NAME | /usr/bin/sed 's/\.//g')"


        # Removing the periods from the version number so that we can make a comparison.

        enforced_version="$(echo $ENFORCED_VERSION | /usr/bin/sed 's/\.//g')"


        # Check to see if the installed_version is less than the enforced_version. If it is then

        # exit 1 to initiate the installation process.

        if [[ "$installed_version" -lt "$enforced_version" ]]; then

            echo "Installed app version $installed_version less than enforced version $ENFORCED_VERSION"

            echo "Starting the app install process ..."

            exit 1


        else

            echo "Enforced vers: $enforced_version"

            echo "Installed app version: $installed_version"

            echo "Minimum app version enforcement met ..."

            echo "No need to run the installer ..."

            exit 0

        fi


    else

        echo "$APP_NAME was not found in the Applications folder ..."

        echo "Need to install $APP_NAME ..."

        exit 1


    fi


fi


exit 0


```

## TLS decryption

The Kandji macOS agent uses certificate pinning, which is incompatible with [Gateway TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/). If Gateway TLS decryption is [turned on](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#turn-on-tls-decryption), you must create a [Do Not Inspect policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/common-policies/#skip-inspection-for-groups-of-applications) to exempt Kandji from SSL/TLS inspection. For more information, refer to the [Kandji documentation ↗](https://support.kandji.io/kb/using-kandji-on-enterprise-networks#SSL/TLS-Inspection).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/kandji/#page","headline":"Kandji · Cloudflare One docs","description":"Deploy the Cloudflare One Client with Kandji on macOS using a custom configuration profile.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/kandji/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MacOS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","name":"Managed deployment"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/","name":"Partners"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/kandji/","name":"Kandji"}}]}
```
