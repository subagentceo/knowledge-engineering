# Remote agent sessions

The Agents window lets you connect to remote machines to start agent sessions or check in on existing ones. You can connect over SSH, through a dev tunnel, or use the Agents window directly in a browser from any device.

This is useful when you want to take advantage of a remote machine's resources, work from a mobile device, or check in on your agent's progress when you're away from your main development machine.

The Agents window connects to the remote machine by using the Agent Host Protocol (AHP) over SSH or a dev tunnel. When you connect, the Agents window automatically installs and starts the VS Code CLI on the remote machine. The remote machine must be powered on and accessible over the network.

## Connect via SSH

**Prerequisite**: the remote machine must be accessible over SSH. No extra agent installation is needed on the remote machine.

To start a session on a remote machine via SSH:

1.  Select **New** or press ⌘N (Windows, Linux Ctrl+N) to start a new agent session.
    
2.  In the workspace dropdown, select the **Remote** tab, and then select **SSH**. If you've already set up SSH connections, they appear as options in the dropdown.
    
    ![Screenshot showing how to select SSH in the workspace dropdown when starting a new agent session in the Agents window.](/assets/docs/agents/agents-window/agents-window-remote.png)
    
3.  Enter the SSH connection string for the remote machine (for example, `user@hostname`).
    
4.  Select the folder on the remote machine to use for the session.
    
5.  Type a prompt and press Enter to start the session.
    

## Connect via dev tunnel

**Prerequisite**: a dev tunnel is already running on the remote machine. See Developing with Remote Tunnels for setup instructions.

To start a session on a remote machine via dev tunnel:

1.  Select **New** or press ⌘N (Windows, Linux Ctrl+N) to start a new agent session.
    
2.  In the workspace dropdown, select the **Remote** tab, and then select **Tunnels** and choose your account type.
    
    ![Screenshot showing how to select Tunnels in the workspace dropdown when starting a new agent session in the Agents window.](/assets/docs/agents/agents-window/agents-window-remote.png)
    
3.  Choose the active dev tunnel from the list.
    
4.  Select the folder on the remote machine to use for the session.
    
5.  Type a prompt and press Enter to start the session.
    

Important

Ensure your dev tunnel requires authentication (GitHub or Microsoft account). If the tunnel allows anonymous access, anyone who discovers the URL can reach your machine and start agent sessions. This is especially dangerous when auto-approval modes are active, because unauthorized users can trigger AI-assisted command execution with your credentials. For more information, see Security.

## Use the Agents window in the browser

The Agents window is also available as a web client at https://insiders.vscode.dev/agents, so you can manage agent sessions from any device with a browser. This is useful when you're away from your main development machine, working from a mobile device, or want to check in on sessions running on a remote host without installing Visual Studio Code locally.

The browser-based Agents window connects to your development machine through a dev tunnel. Agent sessions run on the remote host, and the browser acts as a lightweight client for chatting, reviewing changes, and managing sessions.

### Set up a dev tunnel

Before you can use the Agents window in the browser, start a dev tunnel on the machine you want to connect to:

1.  On your remote host, run the following command to start a dev tunnel:
    
    ```
    code-insiders tunnel
    ```
    
    If you're using the stable release, run `code tunnel` instead.
    
    The first time you run this command, you're prompted to authenticate with your GitHub or Microsoft account. The tunnel requires authentication by default for security.
    
2.  After the tunnel is running, open https://insiders.vscode.dev/agents in a browser on any device.
    
3.  Sign in with **Continue with GitHub** when prompted. If you're already authenticated, the Agents window loads directly.
    
4.  Your tunnel host appears in the hosts bar at the top of the window. Select it to connect.
    
5.  Choose a folder on the remote machine, select an agent, and start a session.
    

### Host management

The hosts bar in the browser-based Agents window shows your available tunnel hosts. Each host displays its connection status:

*   **Online**: the host is reachable and you can start or continue sessions on it.
*   **Offline**: the tunnel on the host is not running. Start the tunnel on the host to bring it back online.

You can connect and disconnect from hosts directly through the hosts bar. If a host goes offline while you have an active session, the session shows a disconnected state. When the host comes back online, the session reconnects automatically.

## Related resources

*   Use the Agents window - agent-first workflows across multiple projects.
*   Using agents - agent types, where to work, and permission levels.
*   Developing with Remote Tunnels - set up and manage dev tunnels.
*   Security - trust boundaries and security considerations.

7/1/2026