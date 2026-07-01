Administrators on Team or Enterprise plans can deploy Claude Desktop automatically across their organization to manage installations and updates centrally. We offer MSIX packages for Windows deployments via Microsoft Intune, SCCM, Group Policy, or PowerShell.

## Installation requirements

- For individual installations with full feature support including Claude Cowork, administrator privileges are required. Users will see a Windows UAC prompt during installation. Users without admin access can still install Claude, but Cowork will not be available. Access the user-friendly installer from **[our download page](https://claude.com/download)**.

- For silent deployment without user interaction, use the MSIX package directly with your enterprise management tool.

## Cowork requirements

Claude Desktop for Windows requires the **[Virtual Machine Platform](https://support.microsoft.com/en-us/windows/enable-virtualization-on-windows-c5578302-6e43-4b4b-a449-8ced115f58e1)** to use Cowork. You can automate installation of this feature via most endpoint management solutions, but you may also run the following command to install it manually:

```
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All -NoRestart
```

## Download

- **[Claude MSIX (x64)](https://claude.ai/api/desktop/win32/x64/msix/latest/redirect)**

- **[Claude MSIX (arm64)](https://claude.ai/api/desktop/win32/arm64/msix/latest/redirect)**

## Installation commands

For manual installation on individual machines, use the following PowerShell commands:

### Install for single user

```
```powershell
Add-AppxPackage -Path "Claude.msix"
```
```

For more details, see Microsoft's **[Add-AppxPackage](https://learn.microsoft.com/en-us/powershell/module/appx/add-appxpackage?view=windowsserver2022-ps)** documentation.

### Install for all users (provisions machine-wide)

```
```powershell
Add-AppxProvisionedPackage -Online -PackagePath "Claude.msix" -SkipLicense -Regions "all"
```
```

For more details, see Microsoft's **[Add-AppxProvisionedPackage](https://learn.microsoft.com/en-us/powershell/module/dism/add-appxprovisionedpackage?view=windowsserver2022-ps)** documentation.

## Deploy via MDM

Claude Desktop can be deployed through various enterprise software distribution services. Choose the method that aligns with your organization's existing infrastructure:

- **[Microsoft Intune](https://docs.microsoft.com/en-us/windows/msix/desktop/managing-your-msix-deployment-intune)**

- **[Microsoft Endpoint Configuration Manager (SCCM)](https://learn.microsoft.com/en-us/windows/msix/desktop/managing-your-msix-deployment-mem-adminconsole)**

- **[Group Policy Software Installation](https://learn.microsoft.com/en-us/troubleshoot/windows-server/group-policy/use-group-policy-to-install-software)**

- **[Deployment Image Servicing and Management (DISM.exe)](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/preinstall-apps-using-dism?view=windows-10)**

- **[PowerShell Scripts](https://learn.microsoft.com/en-us/windows/msix/desktop/powershell-msix-cmdlets)**

### Manage auto-updates alongside your MDM

By default, Claude Desktop checks for updates approximately every four hours and applies them automatically—independent of the version your MDM has assigned. To keep the in-app updater and your MDM from conflicting, choose one of these approaches before you deploy:

**Option 1: Your MDM manages versions.** Set the `disableAutoUpdates` policy to `1` and push new MSIX builds through your MDM on your own schedule. See **[Enterprise configuration for Claude Desktop](https://support.claude.com/en/articles/12622667-enterprise-configuration-for-claude-desktop)** for the policy location.

**Option 2: Claude Desktop manages versions.** Leave `disableAutoUpdates` unset. Deploy the MSIX once via a Win32-wrapped `Add-AppxProvisionedPackage` install, then use a custom detection script that checks `Get-AppxPackage -Name Claude` for a version greater than or equal to the one you provisioned. This keeps your MDM reporting **Installed** after the app self-updates.

## Configuration

To configure Claude Desktop settings such as auto-updates, extensions, and MCP servers, see **[Enterprise configuration](https://support.claude.com/en/articles/12622667-enterprise-configuration)**.

---

## Troubleshooting

### MSIX package not working with AppLocker?

By default, packaged apps may be restricted by AppLocker policies. Ensure your AppLocker rules allow MSIX packages, or add Claude Desktop to your allowed applications list. Consult your organization's security policies before making changes.

### "The parameter is incorrect" after MDM deployment

This usually means the in-app updater and your MDM have both registered the package, leaving duplicate entries under the `Claude` package family. Pick a single update owner using the guidance in **[Manage auto-updates alongside your MDM](#h_1297fb34f3)** above.