# Noderoad

Noderoad is a Node.js API client for [Gumroad](https://gumroad.com) and a fork of [gumnode](https://npmjs.com/gumnode).

It's promise-based, slim, and supports the [latest API endpoints](https://app.gumroad.com/api).

> Submit an [Issue](https://github.com/noahbuscher/gumnode/issues) if you find an outdated or missing endpoint.

## Install

```
npm install gumnode

yarn install gumnode
```

## Usage

```javascript
const noderoad = require("noderoad")("YOUR_ACCESS_TOKEN");

noderoad
  .getProduct("PRODUCT_ID")
  .then((product) => console.log("Found product: ", JSON.stringify(product)))
  .catch((error) => console.error("Error: ", error.message));
``````
