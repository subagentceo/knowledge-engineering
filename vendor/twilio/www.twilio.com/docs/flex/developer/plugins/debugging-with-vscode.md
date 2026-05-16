# Debugging a Flex Plugin with VS Code

This is a guide on how to set up [VS Code](https://code.visualstudio.com/) to debug your Flex Plugin locally. This tutorial builds off of the Plugin from the [Plugin Development Quickstart](/docs/flex/quickstart/getting-started-plugin).

When debugging your Plugin, it is useful to set breakpoints in your application and to walk through it step-by-step. Luckily, VS Code already comes with a built-in debugger.

This tutorial requires that you have an existing Flex Plugin. It also requires that you already have VS Code installed on your operating system.

## Create launch.json

Open your Plugin folder in VS Code, then switch to the Debugger panel. There are currently no *launch.json* files. Click on the *Run and Debug* button and select *Web App (Chrome)*. This will automatically create a `launch.json` inside `.vscode` folder and open the file for you.

![VSCode debug panel with environment selection menu open, showing options like Chrome and Node.js.](https://docs-resources.prod.twilio.com/27283037d7be79c32c3806d18935500ee3cf958c5dfca0c33a6a06b3a54ca9b3.png)

Then, replace the value of `URL` in *launch.json* with `http://localhost:3000` and save the file.

## Start Debugging

Now that we have the Debugger set up, it's time to run our dev-server and launch the debugger.

First, start your Flex plugin using `twilio flex:plugins:start`. You may close the browser that this script starts as we'll launch another one shortly.

Next, go to the Debugger panel of your VS Code again. This time, in the dropdown menu, you should see a *Chrome* or *Launch Chrome* option. Make sure it is selected, and press the green play button.

![VSCode debugger panel with launch.json configuration for Chrome.](https://docs-resources.prod.twilio.com/13042a4c7c56d711e124cbdf0532fbf324c7abb740ea7d1d923dcf4d44a8c767.png)

This will launch a new Chrome page and start your application. You can now log into your Flex instance.

## Set Breakpoints

While running in debug mode, you will see a debugger toolbox in the top center of the VS Code editor.

![Toolbar with icons for play, undo, download, upload, refresh, and stop.](https://docs-resources.prod.twilio.com/d0399dc703fa2d20bde34e667ce8b4d37eae090cb78903ab45e1f2bdc82162ae.png)

Open the file where you'd like to set a breakpoint. Hover your cursor to the left of the line number. A little red dot should appear. Click to place the breakpoint. Now, click the green "*refresh*" button on the toolbox to restart the app.

![Visual Studio Code showing a breakpoint set at line 27 in a TypeScript file.](https://docs-resources.prod.twilio.com/04ed881dfe89811821488499f17456c0156e6d6204ec8f650e1a9158b852a73f.png)

That's it! You now have a breakpoint at this step of your application. You should be able to see the variables and the call stack, as well as step into the methods.
