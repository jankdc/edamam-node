# Edamam Node API

```bash
npm install edamam-node
```

## Usage

```js
const { EdamamClient } = require("edamam-node");

const client = new EdamamClient("your-app-id", "your-app_key");
const search = await client.searchRecipesByQuery("your-query");
```

## Documentation

See https://developer.edamam.com for more details.
