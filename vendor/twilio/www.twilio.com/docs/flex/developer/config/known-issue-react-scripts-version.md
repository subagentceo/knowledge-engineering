# Known issue: Self-hosted Flex 2.7.0 and later requires specific react-scripts version

If you use self-hosted Flex and your custom application uses react-scripts v5, you must apply a workaround to use Flex UI 2.7.0 or later due to a react-scripts issue. Without the workaround, Flex will fail to initialize.

This happens because react-scripts v5 includes a known issue that prevents CommonJS modules from loading correctly and defines them incorrectly in the final bundle. At this time, there is no indication that this react-scripts issue will be fixed, so we are providing the following workaround to enable you to upgrade your Flex version.

## Workaround

You must modify the webpack configuration that is included with react-scripts v5 as shown in the example below. We recommend using [craco](https://github.com/dilanx/craco), but you can also use other packages that allow you to tweak the react-scripts configuration, such as [react-app-rewired](https://www.npmjs.com/package/react-app-rewired).

This example shows craco.config.js extends the react-scripts webpack configuration:

```js
module.exports = {
    webpack: {
        configure: (config) => {
            // ...
            const fileLoaderRule = getFileLoaderRule(config.module.rules);
            if(!fileLoaderRule) {
                throw new Error("File loader not found");
            }
            fileLoaderRule.exclude.push(/\.cjs$/);
            // ...
	    return config;
        }
    }
};

function getFileLoaderRule(rules) {
    for(const rule of rules) {
        if("oneOf" in rule) {
            const found = getFileLoaderRule(rule.oneOf);
            if(found) {
                return found;
            }
        } else if(rule.test === undefined && rule.type === 'asset/resource') {
            return rule;
        }
    }
}
```
