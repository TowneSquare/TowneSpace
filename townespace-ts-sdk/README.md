# SDK for TowneSpace

[![AIP-pr][github-image]][aip-pr-url]
[![Discord][discord-image]][discord-url]
[![NPM Package Version][npm-image-version]][npm-url]
[![NPM Package Downloads][npm-image-downloads]][npm-url]

Description: The TowneSpace TypeScript SDK allows developers to interact with townespace smart contract including minting and composibility.

## Installation

##### For use in Node.js or a web application

```ts
npm install townespace
```

You can also use yarn or pnpm.

##### For use in a browser

```ts
<script src="https://unpkg.com/townesquare@latest/dist/index.global.js" />
```

the SDK can then be accessed through `window.townesquareSDK`.

## Documentation and examples

- [The Townesquare documentation site](link-to-doc) provides step-by-step instructions, code snippets, and best practices to use this library.
- For in-depth examples, check out the [examples](./examples) folder with ready-made `package.json` files to get you going quickly!

### Testing

To run the full SDK tests, From the [root](link-to-sdk-gh-repo) of this package, run:

```ts
npm test
```

> If you see strange behavior regarding HTTP clients, try running the tests with `--detectOpenHandles`.

To test a single file in the SDK, From the [root](link-to-sdk-gh-repo) of this package, run:

```ts
npx jest -- <path/to/file.test.ts>
```

To use the local build in a local project:

```ts
// run from the root of this package
npm build
// run on your local project
npm add PATH_TO_LOCAL_SDK_PACKAGE
```

## Contributing

If you found a bug or would like to request a feature, please file an [issue](link-to-issues). If, based on the discussion on an issue you would like to offer a code change, please make a [pull request](./CONTRIBUTING.md). If neither of these describes what you would like to contribute, checkout out the [contributing guide](./CONTRIBUTING.md).

TODO: add links

[aip-pr-url]: link-here
[npm-image-version]: link-here
[npm-image-downloads]: link-here
[npm-url]: link-here
[discord-image]: link-here
[discord-url]: link-here
