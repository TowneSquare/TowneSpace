# SDK for TowneSpace

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

- [The Townesquare documentation site](add) provides step-by-step instructions, code snippets, and best practices to use this library.
- For in-depth examples, check out the [examples](./examples) folder with ready-made `package.json` files to get you going quickly!

### Testing

To run the full SDK tests, From the [root](link to sdk gh repo) of this package, run:

```ts
npm test
```

> If you see strange behavior regarding HTTP clients, try running the tests with `--detectOpenHandles`.

To test a single file in the SDK, From the [root](link to sdk gh repo) of this package, run:

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

If you found a bug or would like to request a feature, please file an [issue](link to issues). If, based on the discussion on an issue you would like to offer a code change, please make a [pull request](./CONTRIBUTING.md). If neither of these describes what you would like to contribute, checkout out the [contributing guide](./CONTRIBUTING.md).

TODO: update this section

[npm-image-version]: https://img.shields.io/npm/v/aptos.svg
[npm-image-downloads]: https://img.shields.io/npm/dm/aptos.svg
[npm-url]: <link-here>
[discord-image]: https://img.shields.io/discord/945856774056083548?label=Discord&logo=discord&style=flat~~~~
[discord-url]: <link-here>