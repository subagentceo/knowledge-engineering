# Pipes Admin Widget

import * as pipesAdmin from "./pipes-admin.props";
import { PropsTableHydrator } from "../../../components/props-table-hydrator";

![Pipes Admin screenshot](https://images.workoscdn.com/images/42e15dab-db7f-4d8d-8a40-6ab469cd7470.png?auto=format\&fit=clip\&q=50)

The `<PipesAdmin />` widget lets organization administrators manage their
organization's [Pipes](https://workos.com/docs/pipes) connections. From a single list, an admin can
enable or disable providers for their organization's members, supply their
organization's own OAuth credentials (client ID and secret) for providers
configured to use customer credentials, and adjust the scopes requested when
members connect.

This widget is gated by the `widgets:pipes:manage` permission. End users who
only need to connect and manage their own accounts should use the
[Pipes widget](https://workos.com/docs/widgets/pipes) instead.

Read more in the [organization-scoped providers guide](https://workos.com/docs/pipes/organization-scoped-providers).

#### Widget Token

#### Access Token

## API Reference
