# Network Connections in Visual Studio Code

Visual Studio Code is built on top of Electron and benefits from all the networking stack capabilities of Chromium. This also means that VS Code users get much of the networking support available in Google Chrome.

## Common hostnames

A handful of features within VS Code require network communication to work, such as the auto-update mechanism, querying and installing extensions, and telemetry. For these features to work properly in a proxy environment, you must have the product correctly configured.

If you are behind a firewall that needs to allow specific domains used by VS Code, here's the list of hostnames you should allow communication to go through:

*   `update.code.visualstudio.com` - Visual Studio Code download and update server
*   `code.visualstudio.com` - Visual Studio Code documentation
*   `go.microsoft.com` - Microsoft link forwarding service
*   `marketplace.visualstudio.com` - Visual Studio Marketplace
*   `*.gallery.vsassets.io` - Visual Studio Marketplace
*   `*.gallerycdn.vsassets.io` - Visual Studio Marketplace
*   `rink.hockeyapp.net` - Crash reporting service
*   `raw.githubusercontent.com` - GitHub repository raw file access
*   `vsmarketplacebadges.dev` - Visual Studio Marketplace badge service
*   `*.vscode-cdn.net` - Visual Studio Code CDN
*   `vscode.download.prss.microsoft.com` - Visual Studio Code download CDN
*   `download.visualstudio.microsoft.com` - Visual Studio download server, provides dependencies for some VS Code extensions (C++, C#)
*   `vscode-sync.trafficmanager.net` - Visual Studio Code Settings Sync service
*   `vscode-sync-insiders.trafficmanager.net` - Visual Studio Code Settings Sync service (Insiders)
*   `vscode.dev` - Used as a fallback when logging in with GitHub or Microsoft for an extension or Settings Sync (just `vscode.dev/redirect`)
*   `*.vscode-unpkg.net` - Used when loading web extensions
*   `default.exp-tas.com` - Visual Studio Code Experiment Service, used to provide experimental user experiences

## Proxy server support

VS Code has exactly the same proxy server support as Google Chromium. Here's a snippet from Chromium's documentation:

```
"The Chromium network stack uses the system network settings so that users and administrators can control the network settings of all applications easily. The network settings include:

 - proxy settings
 - SSL/TLS settings
 - certificate revocation check settings
 - certificate and private key stores"
```

This means that your proxy settings should be picked up automatically.

Otherwise, you can use the following command-line arguments to control your proxy settings:

```
# Disable proxy
--no-proxy-server

# Manual proxy address
--proxy-server=<scheme>=<uri>[:<port>][;...] | <uri>[:<port>] | "direct://"

# Manual PAC address
--proxy-pac-url=<pac-file-url>

# Disable proxy per host
--proxy-bypass-list=(<trailing_domain>|<ip-address>)[:<port>][;...]
```

To learn more about these command-line arguments, see Chromium Network Settings.

### Authenticated proxies

Authenticated proxies should work seamlessly within VS Code with the addition of PR #22369.

The authentication methods supported are:

*   Basic
*   Digest
*   NTLM
*   Negotiate

When using VS Code behind an authenticated HTTP proxy, the following authentication popup should appear:

![proxy](/assets/docs/setup/network/proxy.png)

Note that SOCKS5 proxy authentication support isn't implemented yet; you can follow the issue in Chromium's issue tracker.

See Chromium HTTP authentication to read more about HTTP proxy authentication within VS Code.

### SSL certificates

Often HTTPS proxies rewrite SSL certificates of the incoming requests. Chromium was designed to reject responses which are signed by certificates which it doesn't trust. If you hit any SSL trust issues, there are a few options available for you:

*   Since Chromium uses the OS's certificate trust infrastructure, the preferred option is to add your proxy's certificate to your OS's trust chain. See the Chromium Root Certificate Policy documentation to learn more.
*   If your proxy runs in `localhost`, you can always try the --allow-insecure-localhost command-line flag.
*   If all else fails, you can tell VS Code to ignore all certificate errors using the --ignore-certificate-errors command-line flag. **Warning:** This is **dangerous** and **not recommended**, since it opens the door to security issues.

> **Note for Linux users**: To add your proxy's certificate on Linux, you need to add it to the system trust store and the NSS trust store. The exact steps vary by distribution:
> 
> *   For Ubuntu/Debian: Copy the certificate to `/usr/local/share/ca-certificates/` and run `sudo update-ca-certificates`
> *   For RHEL/CentOS/Fedora: Use `sudo trust anchor --store <certificate-file>` or place in `/etc/pki/ca-trust/source/anchors/` and run `sudo update-ca-trust`
> *   Additionally, use `certutil -A -n "ProxyCA" -t "CT,," -i <certificate-file> -d sql:$HOME/.pki/nssdb` to add it to the NSS trust store.

## Legacy proxy server support

Extensions don't benefit yet from the same proxy support that VS Code supports. You can follow this issue's development in GitHub.

Similarly to extensions, a few other VS Code features don't yet fully support proxy networking, namely the CLI interface. The CLI interface is what you get when running `code --install-extension vscodevim.vim` from a command prompt or terminal. You can follow this issue's development in GitHub.

Due to both of these constraints, the http.proxy Open in VS Code Open in VS Code Insiders , http.proxyStrictSSL Open in VS Code Open in VS Code Insiders and http.proxyAuthorization Open in VS Code Open in VS Code Insiders variables are still part of VS Code's settings, yet they are only respected in these two scenarios.

## Troubleshooting

Here are some helpful links that might help you troubleshoot networking issues in VS Code:

*   Network Settings
*   Debugging problems with the network proxy
*   Configuring a SOCKS proxy server in Chrome
*   Proxy settings and fallback (Windows)

7/1/2026