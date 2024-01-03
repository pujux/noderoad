# Noderoad

Noderoad is a Node.js API client for [Gumroad](https://gumroad.com) and a fork of noahbuscher/gumnode.

It's promise-based, slim, and supports the [latest API endpoints](https://app.gumroad.com/api).

> Submit an [Issue](https://github.com/pujux/noderoad/issues) if you find an outdated or missing endpoint.

## Install

```
npm install noderoad

yarn install noderoad
```

## Usage

```javascript
const noderoad = require("noderoad")("YOUR_ACCESS_TOKEN");

noderoad
  .getProduct("PRODUCT_ID")
  .then((product) => console.log("Found product: ", JSON.stringify(product)))
  .catch((error) => console.error("Error: ", error.message));
``````
