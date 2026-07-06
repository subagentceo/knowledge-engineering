

`@lmstudio/sdk` is a library published on npm that allows you to use `lmstudio-js` in your own projects. It is open source and it's developed on GitHub. You can find the source code [here](https://github.com/lmstudio-ai/lmstudio-js).

Creating a New `node` Project [#creating-a-new-node-project]

Use the following command to start an interactive project setup:

<CodeBlockTabs defaultValue="TypeScript (Recommended)">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="TypeScript (Recommended)">
      TypeScript (Recommended)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Javascript">
      Javascript
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="TypeScript (Recommended)">
    ```bash
    lms create node-typescript
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Javascript">
    ```bash
    lms create node-javascript
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Add `lmstudio-js` to an Exiting Project [#add-lmstudio-js-to-an-exiting-project]

If you have already created a project and would like to use `lmstudio-js` in it, you can install it using npm, yarn, or pnpm.

<CodeBlockTabs defaultValue="npm">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="npm">
      npm
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="yarn">
      yarn
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="pnpm">
      pnpm
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="npm">
    ```bash
    npm install @lmstudio/sdk --save
    ```
  </CodeBlockTab>

  <CodeBlockTab value="yarn">
    ```bash
    yarn add @lmstudio/sdk
    ```
  </CodeBlockTab>

  <CodeBlockTab value="pnpm">
    ```bash
    pnpm add @lmstudio/sdk
    ```
  </CodeBlockTab>
</CodeBlockTabs>
