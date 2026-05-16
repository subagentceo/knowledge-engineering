# Domain Policy

Arkose Labs uses the following domains:

| Domain                            | Context                                 |
| :-------------------------------- | :-------------------------------------- |
| `<company>-api.arkoselabs.com`    | Client                                  |
| `cdn.arkoselabs.com`              | Client                                  |
| `<company>-verify.arkoselabs.com` | Server                                  |
| `status.arkoselabs.com`           | Client/Server (if using failover logic) |

# Content Security Policy (CSP)

The Arkose Labs client integration needs specific policies enabled in order work correctly.

If you are defining CSPs in your site, please refer to this page.

## CSP Domains

Arkose Labs supports a number of domains depending on the integration of choice.

When defining CSP resources we generally recommend using a wildcard domain. The wildcard will work with most integrations and also give you the most flexibility in case you decide to change your company name or add more integrations to a page.

```
*.arkoselabs.com
```

If you do not wish to use wildcards, you can simply specify the URL you load the Arkose script from.

```
client-api.arkoselabs.com 
or
<company>-api.arkoselabs.com
```

If you are using Vanity URLs, you’ll need to specify your vanity URL instead.

```
your-url.com 
```

## Main Policies

If any of these policies are currently defined in your page, they will need to include the correct resources.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Directive
      </th>

      <th>
        Explanation
      </th>

      <th>
        Resources
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `frame-src`
      </td>

      <td>
        The Arkose Labs challenge and modal are rendered in an iFrame in order to isolate CSS and avoid unwanted interactions with your page.

        `frame-src` needs to be defined in order to load this iFrame.
      </td>

      <td>
        `{arkose domain}`
      </td>
    </tr>

    <tr>
      <td>
        `connect-src`
      </td>

      <td>
        The Arkose Labs integration makes HTTPS requests in order to set up the customer session and load client configuration.

        `connect-src` must be defined, otherwise these requests will be blocked and the integration will not work.
      </td>

      <td>
        `{arkose domain}`
      </td>
    </tr>

    <tr>
      <td>
        `script-src`
      </td>

      <td>
        In order for `api.js` and subsequent JS files to load, we need to allow the Arkose domains from script-src.
      </td>

      <td>
        `{arkose domain}`
      </td>
    </tr>

    <tr>
      <td>
        `style-src`
      </td>

      <td>
        The Arkose challenge loads some inline CSS.

        We have two options to allow this CSS to load:\
        -define `style-src` with nonce\*\
        -define `style-src` with `unsafe-inline` (not recommended)
      </td>

      <td>
        nonce or `unsafe-inline`
      </td>
    </tr>
  </tbody>
</Table>

\*See “Using nonce for `style-src`”

## default-src

The `default-src` directive will be the fallback in case any directive is not defined. If `default-src` is defined, and any of the main directives above are not defined, they will need to include the necessary resources in `default-src`.

For example, if `default-src` is defined but `style-src` isn’t, we need to include a nonce or `unsafe-inline` in `default-src`.

If `default-src` is defined but `script-src` isn’t, we need to include `{arkose domain}` in `default-src`.

## Using nonce for `style-src`

The Arkose integration has nonce support for it’s `style-src` directive. This allows you to avoid using `unsafe-inline` in your CSP policy.

In order to use a nonce in your policy, follow these steps:

1. Generate nonce, for example `aabbcc`
2. When creating the `<script>` element for the Arkose integration, include a `data-nonce` attribute with value `aabbcc`
   ```
   <script src='...api.js' data-callback="setupEnforcement" data-nonce="aabbcc" ></script>
   ```
3. Include the nonce in your CSP policies
   ```
   style-src 'self' 'nonce-aabbcc';
   ```

## Sub Policies

The following policies are sub directives. If they are defined in your page, they also need to include the correct directive resources. Otherwise, they will inherit the policies from `script-src` and `style-src` respectively and will not need to be defined.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Directive
      </th>

      <th>
        Explanation
      </th>

      <th>
        Resources
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `script-src-elem`
      </td>

      <td>
        Part of the Arkose Labs challenge is loaded by `<script>` elements. This directive defines what domains can be loaded via these elements.

        If this directive is specified, the arkose domain needs to be included.
      </td>

      <td>
        `{arkose domain}`
      </td>
    </tr>

    <tr>
      <td>
        `style-src-elem`
      </td>

      <td>
        The Arkose Labs integration loads some `<style>` elements.

        If you specify this directive, either a nonce or `'unsafe-inline`' needs to be included.
      </td>

      <td>
        nonce or `'unsafe-inline'`
      </td>
    </tr>

    <tr>
      <td>
        `style-src-attr`
      </td>

      <td>
        The Arkose Labs integration loads some inline styles in the page. This directive allows inline styles to be loaded by our domain.

        If you specify this directive, either a nonce or `'unsafe-inline'` needs to be included.
      </td>

      <td>
        nonce or `'unsafe-inline'`
      </td>
    </tr>
  </tbody>
</Table>

As an example. If `style-src-elem` is not defined, the browser will first look for the `style-src` policy. If that doesn’t exist, it will look at `default-src`.

## CSP Examples

### Basic Example

```
 'Content-Security-Policy': 
          `connect-src 'self' *.arkoselabs.com; ` 
          `frame-src 'self' *.arkoselabs.com;` 
          `script-src 'self' *.arkoselabs.com;`
          `style-src 'self' 'nonce-aaabbcc';`
```

Script created with attribute `data-nonce="aabbcc"`.

### With sub-policies defined

```
'Content-Security-Policy': 
          `connect-src 'self' *.arkoselabs.com;` 
          `frame-src 'self' *.arkoselabs.com;` 
          `script-src 'self' *.arkoselabs.com;` 
          `script-src-elem 'self' *.arkoselabs.com;` 
          `style-src 'self' 'nonce-aaabbcc';` 
          `style-src-elem 'self' 'nonce-aaabbcc';` 
          `style-src-attr 'self' 'nonce-aaabbcc';`
```

### With default-src defined

```
'Content-Security-Policy': 
          `connect-src 'self' *.arkoselabs.com;`
          `frame-src 'self' *.arkoselabs.com;` 
          `script-src 'self' *.arkoselabs.com;` 
          `default-src 'self' 'nonce-aaabbcc';` 
```

In this example, `style-src` is omitted and `default-src` is included. This means that `default-src` needs to have the resources necessary for `style-src` to work (`'nonce-aaabbcc'`).

### With other CSP policies defined

```
'Content-Security-Policy': 
          `object-src 'self'`
```

In this example, we don’t define any directives required by Arkose, so we don’t need to specify anything for Arkose Labs.

## Update Policy

If Arkose Labs intends to add additional domains, customers will be informed at least 60 days in advance.