# Visual Studio Code on Raspberry Pi

Although it's not officially supported, you can run Visual Studio Code on Raspberry Pi devices.

![Raspberry Pi Logo](/assets/docs/setup/raspberry-pi-os/RPi-Logo-Landscape-Reg-SCREEN.png)

By downloading and using Visual Studio Code, you agree to the license terms and privacy statement.

## Installation

Visual Studio Code is officially distributed via the Raspberry Pi OS (previously called Raspbian) APT repository, in both 32-bit and 64-bit variants.

You can install it by running:

```
sudo apt update
sudo apt install code
```

### Running VS Code

After installing the VS Code package, you can run VS Code by typing `code` in a terminal or launching it via the **Programming** menu.

![Visual Studio Code under the Programming menu on Raspberry Pi](/assets/docs/setup/raspberry-pi-os/vscode-under-programming.jpg)

## Updates

Your Raspberry Pi should handle updating VS Code in the same way as other packages on the system:

```
sudo apt update
sudo apt upgrade code
```

You can always check when a new release is available in our Updates page.

## System requirements

VS Code is not officially supported on Raspberry Pi. Check our community discussions for information on platforms that are known to work.

## Next steps

Once you have installed VS Code, these topics will help you learn more about it:

*   Additional Components - Learn how to install Git, Node.js, TypeScript, and tools like Yeoman.
*   User Interface - A quick orientation to VS Code.
*   User/Workspace Settings - Learn how to configure VS Code to your preferences through settings.

7/1/2026